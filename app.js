'use strict';
//Imports
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var debug = require('debug');
const upload = require('express-fileupload');
import{ DatabaseConfig } from './config';


//Connect to DB
mongoose.connect(DatabaseConfig.MongoURL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error to  db:'));
db.once('open', function () {
    console.log('Connected correctly to server');
});


//Routers

//Middlewares
var app = express();
app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//imageUploadRouter.use(upload());

//CORS Enable in Express
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//CORS OPTIONS Enable
app.options('*', cors());


//Routes


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

app.set('port', process.env.PORT || 3005);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
