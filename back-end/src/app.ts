import express = require('express');
require('dotenv').config();
const cors = require('cors');
const ParseServer = require('parse-server').ParseServer;
const app = express();
const server = require('http').createServer(app);
const fs = require('fs').promises
const path = require('path')
const LOG_DIR = path.join(__dirname, '../..', 'logs');
import winston = require('winston');
import DailyRotateFile = require('winston-daily-rotate-file');

export const LoggerAdapter: winston.Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new DailyRotateFile({
      filename: 'logs-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH-mm',
      dirname: './logs',
      zippedArchive: true,
      utc: true,
      maxSize: '5000m', // Maximum size before rotation, adjust as needed
      frequency: '2m',
    }),
  ],
});
import mobileAuth = require('./cloudCode/utils/mobileAuth');

// Move readLogFile function here, outside of main
async function readLogFile(filename: string) {
  try {
    const content = await fs.readFile(path.join(LOG_DIR, filename), 'utf-8');
    return content.split('\n')
      .filter((line: string) => line.trim() !== '')
      .map((line: string) => {
        try {
          return JSON.parse(line);
        } catch (error) {
          console.error(`Error parsing line: ${line}`);
          return null;
        }
      })
      .filter((entry: any) => entry !== null);
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return [];
  }
}

async function main(): Promise<void> {
  const config: any = {
    liveQuery: {
      classNames: ['Msg'],
    },
    auth: {
      continueWithMobileAuth: {
        enabled: true,
        module: mobileAuth,
      },
    },
    loggerAdapter: LoggerAdapter,
    databaseURI: process.env.databaseURI,
    appName: process.env.appName,
    appId: process.env.appId,
    restAPIKey: process.env.restAPIKey,
    cloud: './build/src/cloudCode/main.js',
    masterKey: process.env.masterKey,
    javascriptKey: process.env.javascriptKey,
    serverURL: process.env.serverURL,
    masterKeyIps: ['::/0', '0.0.0.0/0'],
    publicServerURL: process.env.publicServerURL,
    mountPath: '/api',
    allowClientClassCreation: true,
  };

  const api = new ParseServer(config);
  await api.start();
  app.use(cors());
  app.use('/api', api.app);

  // Endpoint to read all log files
  app.get('/logs', async (req, res) => {
    try {
      const {startDate,endDate,limit,skip} = req.query
      const files = await fs.readdir(LOG_DIR);
      let logFiles = files.filter((file:string) => file.startsWith('logs-'));
      if(startDate && endDate){
        logFiles = logFiles.filter((file:string) => {
          let fileDate = file.split('gs-').pop()?.split('.').shift();
          return fileDate && fileDate >= startDate && fileDate <= endDate;
        });
      }

      const skipNumber = parseInt(skip as string) || 0;
      logFiles = logFiles.slice(skipNumber);
      
      const limitNumber = parseInt(limit as string) || logFiles.length;
      logFiles = logFiles.slice(0, limitNumber);
      
      const allLogs = await Promise.all(
        logFiles.map(async (file: string) => {
          return {
            date: file.split('gs-').pop(),
            logs: await readLogFile(file)
          };
        })
      );

      

      res.json(allLogs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Endpoint to get logs for a specific date
  app.get('/logs/:date', async (req, res) => {
    const { date } = req.params;
    const filename = `logs-${date}.log`;
    console.log(filename);
    try {
      const logs = await readLogFile(filename)

      res.json({
        error: logs
      });
    } catch (error: any) {
      console.log('asdf')
      res.status(500).json({ error: error.message });
    }
  });
  server.listen(1337, function () {
    console.log('The Server is up and running on port 1337.');
  });
  ParseServer.createLiveQueryServer(server);
}
  // Endpoint to get logs for a specific month and export to Excel
  app.get('/logs/month/:month', async (req, res) => {
    const { month } = req.params;

    try {
      const logFiles = await fs.readdir(LOG_DIR);

      const monthLogFile = logFiles.find((file: string) => {
        return file && file.includes(month);
      });

      const monthLogs = await readLogFile(monthLogFile)
         
      res.status(200).json(monthLogs);

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });


main();

console.log('---app.js File Initialized---');
