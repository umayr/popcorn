/**
 * Created by Umayr on 11/27/2014.
 */
var mongoose = require('mongoose');
var schema = require('../schemas/tvShow');

module.exports = model = mongoose.model('tvShow', schema);