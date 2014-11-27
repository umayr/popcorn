/**
 * Created by Umayr on 11/28/2014.
 */

var api = require('../helpers/api');
var utils = require('../helpers/utils');
var tvShowModel = require('../models/tvShow');
var Q = require('q');

module.exports = factory = {};

var deferred = {};

var insert = function (data) {
    deferred.insert = Q.defer();
    var raw = utils.convert(data);
    tvShowModel.findOne({id: raw.id}, function (err, tvShow) {
        if (!err && !tvShow) {
            var document = new tvShowModel(raw);
            document.save(function (err) {
                if (err) deferred.insert.reject(err);
                deferred.insert.resolve("Document inserted successfully");
            });
        } else {
            deferred.insert.reject("Document already in collection");
        }
    });
    return deferred.insert.promise;

};

factory.insert = function (url) {
    return api.attempt(url)
        .then(function (response) {
            return insert(response)
                .then(function (message) {
                    return Q.resolve(message);
                })
                .catch(function (error) {
                    return Q.reject(error);
                });
        });
};