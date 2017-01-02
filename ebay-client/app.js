var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var register = require('./routes/registration');
var checkEmail = require('./routes/checkEmail');
var profile = require('./routes/profile');
var item = require('./routes/item');
var cart = require('./routes/cart');
var bid = require('./routes/bid');
var cron = require('./routes/cronBid');
var checkout = require('./routes/checkout');
var history = require('./routes/history');
var winston = require('./routes/trackuser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('./routes/passport')(passport);
var flash = require('connect-flash');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ebay');
const session = require('express-session');
const MongoSessions = require('connect-mongo')(session);
var mongo = require('mongodb').MongoClient;
var db_url = 'mongodb://localhost:27017/ebay';


var app = express();
app.use(passport.initialize());

// view engine setup
winston.initializeLogger();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: '6692940916',
    resave: false,
    saveUninitialized: false,
    duration: 40 * 60 * 1000,
    activeDuration: 10 * 60 * 1000,
    store: new MongoSessions({
        url: db_url
    })
}));

app.get('/', routes.indexPage);
app.post('/register', register.registration);
app.get('/loginSignUp', register.loginpage);

app.post('/login', register.loginPassport);


app.post('/checkEmail', checkEmail.checkEmail);
app.get('/advertisements', routes.fetchAdvertisements);
app.get('/advertisements/:id', routes.advertisementDetails);
app.get('/profile', profile.getprofile);
app.post('/updateProfile', profile.updateProfile);
app.get('/displaySellItemPage', item.SellPage);
app.post('/sellItem', item.postItem);
app.get('/profile/:handle', profile.profile);
app.post('/addCart', cart.addCart);
app.get('/renderCartPage', cart.renderCart);
app.get('/CartData', cart.getCartData);
app.post('/updateCart', cart.updateCart);
app.post('/deleteCartItem', cart.deleteCartItem);
app.post('/updateBasePrice', bid.updateBasePrice);
app.post('/checkOutData', cart.checkOutData);
app.get('/checkout', cart.checkOutPage);
app.post('/shippingDetails', checkout.getShippingDetails);
app.post('/payment', checkout.payment);
app.post('/orderhistory', history.orderhistory);
app.get('/renderOrderHistoryPage', history.orderhistorypage);
app.post('/soldHistory', history.soldhistory);
app.get('/rendersoldHistoryPage', history.soldhistorypage);
app.get('/signout', routes.signOut);


// catch 404 and forward to error handler

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
