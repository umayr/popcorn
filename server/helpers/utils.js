/**
 * Created by Umayr on 11/28/2014.
 */

var _ = require('lodash');
var util = require('util');
var constants = require('../constants');
var sortObj = require('sort-object');
var utils = {};

utils.convert = convert;
utils.sort = sort;
utils.trim = trim;

utils.url = {
    withID: withID,
    tv: _tvUrls

};

function convert(object) {
    var parsed = _.isObject(object) ? object : JSON.parse(object);
    var prepare = _.clone(parsed, true);
    if (_.has(parsed, 'name')) {
        prepare['_name'] = parsed['name'].toLowerCase();
    }
    return sort(prepare);
}

function withID(pattern, id) {
    var raw = constants.BASE + pattern + '?api_key=' + constants.API;
    return util.format(raw, id);
}

function _tvUrls(id) {
    var raw = [
            constants.BASE + 'tv/%s?api_key=' + constants.API,
            constants.BASE + 'tv/%s/content_ratings?api_key=' + constants.API,
            constants.BASE + 'tv/%s/credits?api_key=' + constants.API,
            constants.BASE + 'tv/%s/external_ids?api_key=' + constants.API,
            constants.BASE + 'tv/%s/images?api_key=' + constants.API,
            constants.BASE + 'tv/%s/keywords?api_key=' + constants.API,
            constants.BASE + 'tv/%s/videos?api_key=' + constants.API
    ];
    for (var i = 0; i < raw.length; i++) {
        raw[i] = util.format(raw[i], id);
    }
    return raw;
}

function sort(o) {
    return sortObj(o);
}

function trim(o) {
    var trimmed = {};
    _.forIn(o, function (value, key) {

        if (!(key.indexOf('_') === 0) && !_.isFunction(value)) {
            if (_.isArray(value)) {
                trimmed[key] = _trimArray(value);
            }
            else if (_.isObject(value)) {
                trimmed[key] = _trimObject(value)
            }
            trimmed[key] = value;
        }
    });

    return trimmed;
}

function _trimArray(array) {
    var _trimmed = [];
    _.forEach(array, function (o) {
        if (_.isObject(o)) {
            _trimmed.push(_trimObject(o));
        }
        else {
            _trimmed.push(o);
        }
    });
    return _trimmed;
}
function _trimObject(o) {
    var _trimmed = {};
    _.forIn(o, function (value, key) {
        if (!(key.indexOf('_') === 0)) {
            _trimmed[key] = value;
        }
    });
    return _trimmed;
}
module.exports = utils;