var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const time = new Date();
    const year = time.getFullYear();
    const month = ("0"+(time.getMonth()+1)).slice(-2);
    const date = ("0"+time.getDate()).slice(-2);
    const hours = ("0"+time.getHours()).slice(-2);
    const minutes = ("0"+time.getMinutes()).slice(-2);
    const seconds = ("0"+time.getSeconds()).slice(-2);
    res.send(`${year}/${month}/${date} ${hours}:${minutes}:${seconds}`);
});

module.exports = router;
