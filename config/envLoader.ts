import * as dotenv from 'dotenv';
import path from 'path';

// 1. Decide env (default = dev)
const env = process.env.ENV || 'dev';

// 2. Load correct file
dotenv.config({
  path: path.resolve(`config/env/.env.${env}`)
});

// 3. Validate required variables
const requiredEnv = ['BASE_URL', 'API_BASE_URL'];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
});

// 4. Export clean config object
export const config = {
  baseURL: process.env.BASE_URL as string,
  apiBaseURL: process.env.API_BASE_URL as string,
  headless: process.env.HEADLESS === 'true',
  browser: process.env.BROWSER || 'chromium',
  retry: Number(process.env.RETRY_COUNT) || 0,
  workers: Number(process.env.WORKERS) || 1,

  slackWebhook: process.env.SLACK_WEBHOOK_URL,
  jiraBaseUrl: process.env.JIRA_BASE_URL,
  jiraEmail: process.env.JIRA_EMAIL,
  jiraToken: process.env.JIRA_API_TOKEN
};