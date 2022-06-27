const express = require('express');
const router = express.Router();

const bookRoute = require('./book.route')
/* GET home page. */
router.use('/',  bookRoute);

module.exports = router;
