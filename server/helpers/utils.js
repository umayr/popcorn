/**
 * Created by Umayr on 11/28/2014.
 */

var _ = require('lodash');
var util = require('util');
var constants = require('../constants');
var utils = {};

utils.convert = parse;
utils.isDate = isDate;
utils.url = {
    withID: withID
};

function parse(object) {
    var parsed = _.isObject(object) ? object : JSON.parse(object);
    var prepare = {};
    _.forIn(parsed, function (value, key) {
        if (!_.isNull(value)) {
            if (_.isArray(value)) {
                prepare[key] = [];
                _.forEach(value, function (item) {
                    prepare[key].push(item);
                });
            }
            else if (_.isObject(value)) {
                prepare[key] = parse(value);
            }
            else if (isDate(value)) {
                prepare[key] = new Date(value);
            }
            else {
                prepare[key] = value;
            }
        }
    });

    return parsed;
}
function isDate(value) {
    var dateFormat;
    if (toString.call(value) === '[object Date]') {
        return true;
    }
    if (typeof value.replace === 'function') {
        value.replace(/^\s+|\s+$/gm, '');
    }
    dateFormat = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/;
    return dateFormat.test(value);
}

function withID(pattern, id) {
    var raw = constants.BASE + pattern + '?api_key=' + constants.API;
    return util.format(raw, id);
}

module.exports = utils;