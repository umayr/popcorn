var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var rootRoutes = require('./routes/index');
var tvRoutes = require('./routes/tv');
var db = require('./data/db');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use('/', rootRoutes);
app.use('/tv', tvRoutes);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json(err);
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json(err);
});

db.once('open', function () {
    console.log('database connection succeeded.');
});

module.exports = app;
