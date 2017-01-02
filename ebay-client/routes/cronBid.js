var express = require('express');
var ejs = require('ejs');
var cron = require('node-cron');
var User = require('../models/user');
var Transaction = require('../models/transaction');
var Product = require('../models/product');
var Cart = require('../models/cart');
var Bid = require('../models/bid');
var mq_client = require('../rpc/client');

cron.schedule('*/5 * * * * *', function (req, res, next) {


    var msg_payload ={
        currentTime:Math.floor(Date.now() / 1000)
    };
    mq_client.make_request('bidCron_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Bidding Cron Success");
        }
    });



});


