'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();
var url = 'mongodb://adwz007:700zwda@ds119268.mlab.com:19268/schooldb';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error to  db:'));
db.once('open', function () {
    // we're connected!
    console.log('Connected correctly to server');
});
//Routers
const trustRouter = require('./components/trust/trust.route');
const loginRouter = require('./components/shared/login.route');
const superAdminRouter = require('./components/super-admin/super.admin.route');
const trustAdminRouter = require('./components/trust/trust-admin/trust.admin.route');
//Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));


//CORS Enable in Express
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//CORS OPTIONS Enable
app.options('*', cors());


//Routes
app.use('/', express.static(path.join(__dirname, './document')));
app.use('/api/trust', trustRouter);
app.use('/api/login', loginRouter);
app.use('/api/superadmin', superAdminRouter);
app.use('/api/trustadmin', trustAdminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
