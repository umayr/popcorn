/**
 * Created by Umayr on 11/24/2014.
 */

var request = require('request');
var Q = require('q');
var utils = require('../helpers/utils');
var _ = require('lodash');
var api = {};

api.attempt = function (url) {

    var deferred = Q.defer();
    request.get(url,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                deferred.resolve(body, response);
            } else {
                deferred.reject(error, response)
            }
        });
};
api.getTvShowByID = function (id) {

    var deferred = Q.defer();
    var response = {};

    var urls = utils.url.tv(id);
    request.get(urls[0], base);

    function base(err, res, body) {
        if (!err && res.statusCode == 200) {
            response = _.clone(JSON.parse(body), true);
            response.content_ratings = [];
            response.credits = {};
            response.external_ids = {};
            response.images = {};
            response.keywords = {};
            response.videos = {};
            request.get(urls[1], contentRating)
        } else {
            deferred.reject(err || "error inserting base tv show object", response)
        }
    }

    function contentRating(err, res, body) {
        if (!err && res.statusCode == 200) {
            body = JSON.parse(body);
            response.content_ratings = _.clone(body.results, true);
            request.get(urls[2], credits)
        } else {
            deferred.reject(err || "error inserting content ratings", response)
        }
    }

    function credits(err, res, body) {
        if (!err && res.statusCode == 200) {
            response.credits = _.clone(JSON.parse(body), true);
            request.get(urls[3], externalIDs)
        } else {
            deferred.reject(err || "error inserting credits", response)
        }
    }

    function externalIDs(err, res, body) {
        if (!err && res.statusCode == 200) {
            response.external_ids = _.clone(JSON.parse(body), true)
            request.get(urls[4], images)
        } else {
            deferred.reject(err || "error inserting external IDs", response)
        }
    }

    function images(err, res, body) {
        if (!err && res.statusCode == 200) {
            response.images = _.clone(JSON.parse(body), true);
            request.get(urls[5], keywords)
        } else {
            deferred.reject(err || "error inserting images", response)
        }
    }

    function keywords(err, res, body) {
        if (!err && res.statusCode == 200) {
            body = JSON.parse(body);
            response.keywords = _.clone(body.results, true);
            request.get(urls[6], videos)
        } else {
            deferred.reject(err || "error inserting keywords", response)
        }
    }

    function videos(err, res, body) {
        if (!err && res.statusCode == 200) {
            body = JSON.parse(body);
            response.videos = _.clone(body.results, true);
            end();
        } else {
            deferred.reject(err || "error inserting videos", response)
        }
    }

    function end() {
        deferred.resolve(response);
    }

    return deferred.promise;
};

module.exports = api;