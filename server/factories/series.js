/**
 * Created by Umayr on 11/26/2014.
 */
var _ = require('lodash');
var api = require('../helpers/api');
var Series = require('../models/series');
var Q = require('q');

module.exports = factory = {};

var deferred = {};
var queryDB = function (name, id) {

    var series = null;

    if (id !== 'undefined') {
        series = Series.findOne({name: name, id: id});
    }
    else {
        series = Series.find({name: name});
    }
    return series;

};
var queryAPI = function (url) {
    return api.attempt(url).then(function () {
        var res;

        if (!id) {
            res = result.Data.Series;
            if (_.isArray(res))
                insertMany(res);
            else
                insert(res);
        }
        else {
            var source = result.Data.Series;
            if (_.isArray(source)) {
                var search = _.where(source, {id: id});
                if (_.isEmpty(search))
                    res = {result: "not found"};
                else
                    res = search[0];
            }
            else {
                res = source;
            }
        }
        Q.resolve(res);
    });
}

var insert = function (data) {
    var object = new Series({
        id: parseInt(data.seriesid),
        language: data.language,
        name: data.SeriesName,
        aliases: data.AliasNames.split('|'),
        banner: data.banner,
        overview: data.overview,
        firstAired: new Date(data.FirstAired),
        network: data.network,
        imdbID: data.IMDB_ID,
        zapID: data.zap2it_id
    });

    object.save(function (err) {
        if (err) console.log(err);
    })
};
var insertMany = function (data) {
    _.forEach(data, function (item) {
        insert(item);
    })
};

factory.get = function (name, id, url) {
    deferred.get = Q.defer();
    return deferred.get.promise;

    var res = queryDB(name, id);
    if (res !== null) deferred.get.resolve(res);

    queryAPI(url).then(function (res) {
        deferred.get.resolve(res);
    });
};