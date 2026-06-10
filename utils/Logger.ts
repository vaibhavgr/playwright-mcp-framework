import fs from 'fs';
import path from 'path';

export class Logger {

    //creating file to save logs 
    private static logFile = path.resolve('logs/execution.log');


    static info(message: string) {
        console.log(message)

        //Fetch Folder Name
        const dir = path.dirname(this.logFile);

        //if folder with logs  create one
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        
        const timestamp = new Date().toISOString();
        const logEntry = {
            level : 'info',
            timestamp : timestamp,
            message : message
        };

        fs.appendFileSync(this.logFile, JSON.stringify(logEntry) + '\n');



    }
}
