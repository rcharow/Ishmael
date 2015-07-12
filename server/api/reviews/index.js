'use strict';
var router = require('express').Router();
var rp = require('request-promise');
module.exports = router;

router.get('/', function (req, res, next) {
	// replace this temporary URL with deployed one for demonstration
	rp('http://127.0.0.1:8080/api/run?id=559fea82d9de68f207f6b1ea')
	.then(function (data) {
		res.json(data);
	})
	.catch(function (err) {
		console.error(`An error occured: ${err}`);
	})
})
