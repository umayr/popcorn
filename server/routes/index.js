var express = require('express');
var router = express.Router();
var tvShowFactory = require('../factories/tvShow');
var utils = require('../helpers/utils');
var Q = require('q');

router.get('/', function (req, res) {

    var results = [];
    var promises = [];
    for (var i = 501; i < 1000; i++) {
        var url = utils.url.withID('tv/%s', i);
        var promise = tvShowFactory.insert(url).then(function (result) {
            results.push(result);
        }).catch(function (error) {
            results.push(error);
        });

        promises.push(promise);
    }
    Q.all(promises).then(function () {
        res.json(results);
    });


});

module.exports = router;


