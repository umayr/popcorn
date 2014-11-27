var express = require('express');
var router = express.Router();
var tvShowFactory = require('../factories/tvShow');
var utils = require('../helpers/utils');

router.get('/', function (req, res) {

    var results = [];
    for (var i = 1; i < 500; i++) {
        var url = utils.url.withID('tv/%s', i);
        tvShowFactory.insert(url).then(function (result) {
            results.push(result);
        }).catch(function (error) {
            results.push(error);
        });
    }
    res.json(results);

});

router.get('/tv/:id', function (req, res) {

    var url = utils.url.withID('tv/%s', req.params.id);
    tvShowFactory.insert(url).then(function (result) {
        res.json(result);
    }).catch(function (error) {
        res.json(error);
    });
});

module.exports = router;


