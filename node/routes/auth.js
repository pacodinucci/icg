
	
	var uuid = require('node-uuid');
	var router = require('express').Router();
	var Utilities = require('../client/utilities.js');

	router.get('/', function(request, response) {	

		Utilities.user.getUsers().then(

			function (usersData) {
				response.status(200).json(usersData);
			},

			function (userResponse) {
				response.status(userResponse.status).json(userResponse);
			}
		);	
	});

	router.post('/login', function(request, response) {

		if( request.body.email ) {

			var data = {
				email: request.body.email,
				password: request.body.password
			};

			var requestOb = data;

			Utilities.user.getUser(requestOb).then(

				function (usersData) {
					usersData.token = uuid.v4().split("-").join("");
					response.status(200).json(usersData);
				},

				function (userResponse) {
					response.status(userResponse.status).json(userResponse);
				}
			);			
		}

		else {
			response.status(501).json({status: 'ERROR', error: 'Bad request'});
		}
	});

	router.post('/signup', function(request, response) {

		if( request.body.email ) {

			if ( false ) {
				response.status(409).json({status: 'ERROR', error: 'User already exists !'});
			}

			else {

				var data = {
					email: request.body.email,
					password: request.body.password,
					firstName: request.body.firstName,
					lastName: request.body.lastName,
					activationKey: '',
				};

				var requestOb = data;
				requestOb.activationKey = uuid.v4().split("-").join("");

				Utilities.user.saveUser(requestOb).then(

					function (usersData) {
						response.status(201).json(usersData);
					},

					function (response) {
						response.status(500).json(response);
					}
				);
			}			
		}

		else {
			response.status(501).json({status: 'ERROR', error: 'Bad request'});
		}
	});

	router.post('/logout', function(request, response) {

		var data = {
			userId: request.body.userId,
			sessionId: request.body.sessionId
		};

		var requestOb = data;

		Utilities.user.deleteSession(requestOb).then(

			function (usersData) {
				response.status(204).json({status: 'success'});
			},

			function (userResponse) {
				response.status(userResponse.status).json(userResponse);
			}
		);
	});

	module.exports = router;