var express = require('express');
var router = express.Router();
var marketstackCTL = require("../controllers/restAPI");
router.get('',marketstackCTL.getMarketStacksExterneAPI);
module.exports = router;
