/**
 * Created by Umayr on 11/28/2014.
 */

var api = require('../helpers/api');
var utils = require('../helpers/utils');
var tvShowModel = require('../models/tvShow');
var Q = require('q');
var errors = require('../helpers/errors');

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
                deferred.insert.resolve(raw);
            });
        }
        else {
            deferred.insert.reject(errors.wrong);
        }
    });
    return deferred.insert.promise;

};

factory.insert = function (id) {
    return api.getTvShowByID(id)
        .then(insert)
        .then(function (result) {
            return Q.resolve(result);
        })
        .catch(function (error) {
            return Q.reject(error);
        });
};
factory.getByID = function (id) {
    deferred.getByID = Q.defer();
    tvShowModel.findOne({id: id}, function (err, tvShow) {
        if (!err) {
            if (!tvShow) {
                factory.insert(id)
                    .then(function (response) {
                        deferred.getByID.resolve(utils.sort(response));
                    })
                    .catch(function (error) {
                        deferred.getByID.reject(error);
                    });
            }
            else {
                deferred.getByID.resolve(tvShow);
            }
        } else {
            // TODO: Throw a motherfucking-something-went-wrong-error!
        }
    });
    return deferred.getByID.promise;
};
factory.search = function (name) {
    deferred.search = Q.defer();
    tvShowModel.find({_name: new RegExp(name, 'i')}, function (err, result) {
        if (!err) {
            if (!result) {
                deferred.search.resolve(errors.notfound);
            }
            else {
                deferred.search.resolve(result);
            }
        } else {
            // TODO: Throw a motherfucking-something-went-wrong-error!
        }
    });
    return deferred.search.promise;

};