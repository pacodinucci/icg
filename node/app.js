

	var express = require('express');
	var bodyParser = require('body-parser');

	var app = express();

	app.set('port', (process.env.PORT || 3000));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
		res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
		next();
	});


	var auth = require('./routes/auth.js');
	var user = require('./routes/user.js');

	app.use('/auth', auth);
	app.use('/user', user);


	app.get('/', function (request, response) {
		response.send('Welcome');
	});

	app.listen(app.get('port'), function() {
		console.dir('Running at localhost:' + app.get('port'));
	});
	
	module.exports = app;