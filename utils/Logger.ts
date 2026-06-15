import fs from 'fs';
import path from 'path';


export interface LogMetadata {
    testName?: string;
    browser?: string;
    suite?: string;
    duration?: number;
    status?: string;
    url?: string;
    [key: string]: any;
}
export class Logger {

    //creating file to save logs 

    static getLogFilePath(): string {
        const today = new Date().toISOString().split('T')[0]; // Result: '2026-06-11'
        return path.resolve(`logs/execution-${today}.log`);
    }


    static info(message: string, metadata?: LogMetadata) {
        console.log(`[INFO] ${message}`);
        const logFile = this.getLogFilePath();
        const dir = path.dirname(logFile);
        // Folder check & creation
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const timestamp = new Date().toISOString();
        const logEntry = {
            level: 'info',
            timestamp: timestamp,
            message: message,
            runID: process.env.RUN_ID,
            ...metadata
        };
        // File me save
        fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    }




    // 2. Error method 
    static error(message: string, errorDetails?: string, metadata?: LogMetadata) {
        console.error(`[ERROR] ${message} - ${errorDetails || ''}`);
        const logFile = this.getLogFilePath();
        const dir = path.dirname(logFile);
        // Folder check & creation (Duplicate Code)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const timestamp = new Date().toISOString();
        const logEntry = {
            level: 'error',
            timestamp: timestamp,
            message: message,
            error: errorDetails || '',
            runId: process.env.RUN_ID || 'run_local',
            ...metadata
        };
        // File me save (Duplicate Code)
        fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    }
}







