var express = require('express');
var ejs = require('ejs');
var bcrypt = require('bcrypt-nodejs');
var winston = require('./trackuser');
var Product = require('../models/product');
var ObjectId = require('mongoose').Types.ObjectId;
var User = require('../models/user');
var mq_client = require('../rpc/client');


exports.indexPage = function (req, res, next) {


    if (req.session.userid == null) {
        res.render('login');
    } else {
        res.render('index');
    }
};
/*
 exports.fetchAdvertisements = function (req, res, next) {

 winston.userTrack("User having id: " + req.session.userid + " is on the home page");
 var msg_payload = {
 sellerId: req.session.userid
 };
 mq_client.make_request('fetchAdvertisements_queue', msg_payload, function (err, results) {
 if (err) {
 throw err;
 }
 else {
 res.send(results);
 }
 });

 };*/


exports.fetchAdvertisements = function (req, res, next) {

    var msg_payload = {
        sellerId: "5819b283da57342444c81075"
    };
    mq_client.make_request('fetchAdvertisements_queue', msg_payload, function (err, results) {
        if (err) {
            throw err;
        }
        else {
            res.send(results);
        }
    });

};
function convertTime(time) {

    var totalSec = time;
    var days = Math.floor(totalSec / 86400);
    var hours = parseInt(totalSec / 3600) % 24;
    var minutes = parseInt(totalSec / 60) % 60;
    var seconds = totalSec % 60;
    return days + " days" + " " + hours + " hours" + " " + minutes + " minutes" + " " + seconds + " seconds";
}

exports.advertisementDetails = function (req, res, next) {


    //winston.userTrack("User having id: " + req.session.userid + " clicked on product having id:" + req.params.id);

    var msg_payload = {
        productId: new ObjectId(req.params.id)
    };

    mq_client.make_request('advertisementDetails_queue', msg_payload, function (err, results) {
        if (err) {
            throw err;
        }
        else {
            results[0].bidCompleteTime = convertTime(results[0].bidCompleteTime - Math.floor(Date.now() / 1000));
            res.render("advertisementDetail", {
                results: results
            });
        }
    });

};


exports.signOut = function (req, res, next) {
    winston.userTrack("User having id: " + req.session.userid + " logged out.");
    var msg_payload = {
        id: new ObjectId(req.session.userid),
        time: getDateTime()
    };

    mq_client.make_request('signOut_queue', msg_payload, function (err, results) {
        if (err) {
            throw err;
        }
        else {
            console.log("Last Login Updated");
            req.session.destroy();
            res.redirect('/');
        }
    });
};

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

}

