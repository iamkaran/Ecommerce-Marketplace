"use strict";
const winston = require('winston');
const fs = require('fs');
const env = process.env.NOV_ENV || 'development';
const logDir = 'logs';
var logger;
var bidlog;

exports.initializeLogger = function () {
    console.log("inside initialize");
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    } else {

    }

    const tsFormat = () => (new Date()).toLocaleString();

    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({
                filename: `${logDir}/userTrack.log`,
                timestamp: tsFormat,
                level: env === 'development' ? 'debug' : 'info'
            })
        ]
    });

    bidlog = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({
                filename: `${logDir}/biddinglog.log`,
                timestamp: tsFormat,
                level: env === 'development' ? 'debug' : 'info'
            })
        ]
    });

};


exports.userTrack = function (msg) {

    logger.info(msg);
};

exports.bidlog = function (msg) {

    bidlog.info(msg);
};