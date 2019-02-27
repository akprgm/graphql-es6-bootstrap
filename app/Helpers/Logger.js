/**
 * Logger helper
 */
import fs from 'fs';
import path from 'path';
import winston from 'winston';
import rfs from 'rotating-file-stream';

const logFile = process.env.LOG_FILE || 'app';

// logs middleware
const logDirectory = path.join(__dirname, '../../storage/logs');

// ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// create a rotating write stream
rfs('app.log', {
  size: '10M',
  interval: '1d',
  path: logDirectory,
  compress: 'gzip',
});

const transports = [new (winston.transports.File)({ filename: path.join(`${logDirectory}/${logFile}.log`) })];

if (process.env.APP_ENV === 'development') {
  transports.push(new (winston.transports.Console)({ prettyPrint: true }));
}

const Logger = new winston.createLogger({
  transports,
});

module.exports = Logger;
