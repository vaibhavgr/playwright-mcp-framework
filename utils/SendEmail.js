const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function sendResultEmail() {
    // 1. Environment variables se SMTP credentials read karenge
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS; // App Password (not your actual email password)
    const emailTo = process.env.EMAIL_TO;

    if (!smtpUser || !smtpPass || !emailTo) {
        console.error("❌ Error: Missing SMTP credentials (SMTP_USER, SMTP_PASS, EMAIL_TO). Skipping email dispatch.");
        process.exit(1);
    }

    // 2. Playwright JSON report ko read aur parse karenge
    const reportPath = path.resolve('reports/report.json');
    if (!fs.existsSync(reportPath)) {
        console.error("❌ Error: report.json not found! Cannot generate mail summary.");
        process.exit(1);
    }

    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

    // Web aur API ke counters
    let webStats = { total: 0, passed: 0, failed: 0, skipped: 0 };
    let apiStats = { total: 0, passed: 0, failed: 0, skipped: 0 };

    // Function to parse the suite tree and collect counts
    function parseSuite(suite) {
        if (suite.specs) {
            for (const spec of suite.specs) {
                // Agar file path mein 'api' folder ya text hai to API test, nahi to Web test
                const isApi = spec.file && (spec.file.includes('/api/') || spec.file.includes('\\api\\') || spec.file.includes('api.spec'));
                const stats = isApi ? apiStats : webStats;

                for (const test of spec.tests) {
                    stats.total++;
                    const resultStatus = test.results && test.results[0] ? test.results[0].status : 'skipped';

                    if (resultStatus === 'passed') {
                        stats.passed++;
                    } else if (resultStatus === 'failed' || resultStatus === 'timedOut') {
                        stats.failed++;
                    } else {
                        stats.skipped++;
                    }
                }
            }
        }
        if (suite.suites) {
            for (const childSuite of suite.suites) {
                parseSuite(childSuite);
            }
        }
    }

    // Saare suites ko traverse karenge
    if (report.suites) {
        for (const suite of report.suites) {
            parseSuite(suite);
        }
    }

    // Combined summary metrics
    const totalTests = webStats.total + apiStats.total;
    const totalPassed = webStats.passed + apiStats.passed;
    const totalFailed = webStats.failed + apiStats.failed;
    const totalSkipped = webStats.skipped + apiStats.skipped;

    // Pass Rate percentage
    const webPassRate = webStats.total > 0 ? ((webStats.passed / webStats.total) * 100).toFixed(1) + '%' : 'N/A';
    const apiPassRate = apiStats.total > 0 ? ((apiStats.passed / apiStats.total) * 100).toFixed(1) + '%' : 'N/A';
    const totalPassRate = totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(1) + '%' : 'N/A';

    // Status aur Colors handle karenge
    const runStatus = totalFailed === 0 ? "PASSED" : "FAILED";
    const statusColor = totalFailed === 0 ? "#2ec4b6" : "#e71d36"; // Teal Green vs Alert Red

    // 3. Premium HTML Email template design
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333; }
            .container { max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e1e4e8; }
            .header { background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: #ffffff; text-align: center; padding: 30px 20px; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px; }
            .header p { margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; }
            .content { padding: 30px 25px; text-align: center; }
            .status-badge { display: inline-block; padding: 8px 20px; border-radius: 20px; font-weight: bold; text-transform: uppercase; font-size: 16px; color: #ffffff; margin-bottom: 25px; background-color: ${statusColor}; }
            .section-title { font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #f0f0f0; padding-bottom: 5px; color: #1e3c72; text-align: left; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px; text-align: left; }
            th { background-color: #f7f9fa; color: #555; font-weight: 600; padding: 12px 10px; border-bottom: 2px solid #dee2e6; }
            td { padding: 12px 10px; border-bottom: 1px solid #eceff1; }
            .bold { font-weight: bold; }
            .text-passed { color: #2ec4b6; font-weight: bold; }
            .text-failed { color: #e71d36; font-weight: bold; }
            .footer { background-color: #f7f9fa; padding: 20px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #e1e4e8; }
            .button { display: inline-block; background-color: #1e3c72; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px; margin-top: 15px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Playwright Automation Report</h1>
                <p>E2E Regression Test Suite Run</p>
            </div>
            
            <div class="content">
                <div class="status-badge">${runStatus}</div>
                
                <div class="section-title">Execution Summary</div>
                <table>
                    <thead>
                        <tr>
                            <th>Test Category</th>
                            <th>Total</th>
                            <th>Passed</th>
                            <th>Failed</th>
                            <th>Skipped</th>
                            <th>Pass Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="bold">Web UI Tests</td>
                            <td>${webStats.total}</td>
                            <td class="text-passed">${webStats.passed}</td>
                            <td class="text-failed">${webStats.failed}</td>
                            <td>${webStats.skipped}</td>
                            <td class="bold">${webPassRate}</td>
                        </tr>
                        <tr>
                            <td class="bold">API Tests</td>
                            <td>${apiStats.total}</td>
                            <td class="text-passed">${apiStats.passed}</td>
                            <td class="text-failed">${apiStats.failed}</td>
                            <td>${apiStats.skipped}</td>
                            <td class="bold">${apiPassRate}</td>
                        </tr>
                        <tr style="background-color: #f8f9fa;">
                            <td class="bold" style="color: #1e3c72;">Total Run</td>
                            <td class="bold">${totalTests}</td>
                            <td class="text-passed">${totalPassed}</td>
                            <td class="text-failed">${totalFailed}</td>
                            <td class="bold">${totalSkipped}</td>
                            <td class="bold" style="color: #1e3c72;">${totalPassRate}</td>
                        </tr>
                    </tbody>
                </table>
                
                <p style="font-size: 14px; color: #666; text-align: left;">
                    💡 <strong>Note:</strong> The detailed interactive Playwright HTML report is attached to this email as a ZIP file. Download and extract it to view trace files, screenshots, and test step timelines.
                </p>
                
                <a href="https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}" class="button" target="_blank">View GitHub Action Run</a>
            </div>
            
            <div class="footer">
                <p>This email was automatically generated by GitHub Actions CI/CD Pipeline.</p>
                <p>© 2026 Playwright Automation Framework</p>
            </div>
        </div>
    </body>
    </html>
    `;

    // 4. Nodemailer Transport configure karenge
    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // SSL ke liye true, TLS (587) ke liye false
        auth: {
            user: smtpUser,
            pass: smtpPass
        }
    });

    // 5. ZIP attachment configure karenge (agar pipeline mein generate ho gaya ho)
    const attachments = [];
    
    // Mail options set karenge
    const mailOptions = {
        from: `"Playwright E2E Reporter" <${smtpUser}>`,
        to: emailTo,
        subject: `[Playwright CI] Status: ${runStatus} | Pass Rate: ${totalPassRate} (${totalPassed}/${totalTests})`,
        html: htmlTemplate,
        
    };

    // Mail send karenge
    console.log(`✉️ Attempting to send automation report email to: ${emailTo}...`);
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully! MessageID: ${info.messageId}`);
    } catch (error) {
        console.error("❌ Failed to send email via SMTP:", error);
        process.exit(1);
    }
}

sendResultEmail();
