var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.send("Lala");
    console.log("test");
});

module.exports = router;
