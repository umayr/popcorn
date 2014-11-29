/**
 * Created by Umayr on 11/29/2014.
 */
var express = require('express');
var router = express.Router();
var tvShowFactory = require('../factories/tvShow');
var is = require('is');
var errors = require('../helpers/errors');

router.get('/get/:id', function (req, res) {
    var id = parseInt(req.params.id);
    if (is.int(id)) {
        tvShowFactory.getByID(id).then(function (result) {
            res.json(result);
        }).catch(function (error) {
            res.json(error);
        });
    }
    else {
        res.json(errors.invalid);
    }
});

router.get('/search/', function (req, res) {
    var name = req.param("name");
    tvShowFactory.search(name).then(function (result) {
        res.json(result);
    }).catch(function (error) {
        res.json(error);
    });

});

module.exports = router;