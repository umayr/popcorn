/**
 * Created by Umayr on 11/24/2014.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/popcorn');

var db = mongoose.connection;

mongoose.set('debug, true');

module.exports = db;
