'use strict';
var router = require('express').Router();
var rp = require('request-promise');
module.exports = router;

router.get('/', function (req, res, next) {
	// replace this temporary URL with deployed one for demonstration
	rp('http://127.0.0.1:8080/api/run?id=55a2fd2516778ee607f19eaa')
	.then(function (data) {
		res.json(data);
	})
	.catch(function (err) {
		console.error(`An error occured: ${err}`);
	})
})
