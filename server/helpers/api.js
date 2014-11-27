/**
 * Created by Umayr on 11/24/2014.
 */

var request = require('request');
var Q = require('q');

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
    return deferred.promise;
};

module.exports = api;