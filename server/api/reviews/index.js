'use strict';
var router = require('express').Router();
var rp = require('request-promise');
module.exports = router;

router.get('/', function (req, res, next) {
	// replace this temporary URL with deployed one for demonstration
	rp('http://127.0.0.1:8080/api/run?id=559ec36dd0c78bfa0752d3c8')
	.then(function (data) {
		res.json(data);
	})
	.catch(function (err) {
		console.error(`An error occured: ${err}`);
	})
})
