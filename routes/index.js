var express = require('express')
var indexController = require('../controllers/indexController')
var router = express.Router()

/* GET home page. */
router.route('/').get(
  indexController.index
)


module.exports = router
