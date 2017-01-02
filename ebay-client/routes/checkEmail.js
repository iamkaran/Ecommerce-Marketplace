var ejs = require('ejs');
var User = require('../models/user');
var mq_client = require('../rpc/client');


exports.checkEmail = function (req, res, next) {

    var msg_payload = {
        email:req.param("email")
    };

    mq_client.make_request('checkEmail_queue', msg_payload, function (err, results) {
        if (err) {
            console.log(err);
        }
        else {
            if (results.length > 0) {
                res.send("0");
            }
            else {
                res.send("1");
            }
        }
    });

};

