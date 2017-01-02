var User = require('../models/user');

exports.getprofile_request = function (msg, callback) {

    User.find({_id: msg.id}, function (err, results) {
        if (err) {
            throw err;
        }
        else {
            callback(null, results);
        }
    });
};


exports.updateprofile_request = function (msg, callback) {

    var conditions = {_id: msg.id};
    var update = {
        'handle': msg.handle,
        'contact': msg.contact,
        'birthdate': msg.birthdate,
        'location': msg.location
    };
    User.update(conditions, update, function (err, results) {

        if (err) {
            throw err;
        } else {
            callback(null, results);
        }
    });
};
