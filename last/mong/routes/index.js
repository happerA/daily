var express = require('express');
var router = express.Router();
var api = require('../operate')

/* GET home page. */
router.get('/', function(req, res, next) {
  api.find({})
		.then(result => {
			console.log(result)
		})
  res.render('index', { title: 'Express' });
});

module.exports = router;
