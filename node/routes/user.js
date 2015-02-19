
	var multer = require('multer');
	var router = require('express').Router();
	var Utilities = require('../client/utilities.js');



	router.get('/', function(request, response) {

		Utilities.user.getUsers().then(

			function (usersData) {
				response.status(200).json(usersData);
			},

			function (response) {
				response.status(500).json(response);
			}
		);
	});

	router.get('/:userId', function(request, response) {

		var userId = request.params.userId;

		Utilities.user.getUser(userId).then(

			function (userData) {
				response.status(200).json(userData);
			},

			function (response) {
				response.status(500).json(response);
			}
		);
	});

	router.get('/resumes/:userId', function(request, response) {

		var data = {
			userId: request.params.userId,
			sessionId: request.headers.Authorization
		};

		console.dir(data);

		var requestOb = data;

		Utilities.user.getResumes(requestOb).then(

			function (resumesData) {
				response.status(200).json(resumesData);
			},

			function (resumesResponse) {
				response.status(resumesResponse.status).json(resumesResponse);
			}
		);
	});

	router.post('/resumes', function(request, response) {

		var data = {
			userId: request.body.userId,
			resumeTitle: request.body.resumeTitle,
			resumeType: request.body.resumeType,
			resumeFile: request.body.resumeFile,
			sessionId: request.headers.Authorization
		};

		var requestOb = data;

		delete requestOb.sessionId;

		Utilities.user.saveResume(requestOb).then(

			function (resumesData) {
				response.status(201).json({status: 201});
			},

			function (resumesResponse) {
				response.status(resumesResponse.status).json(resumesResponse);
			}
		);
	});




	router.post('/trackResume', function(request, response) {

		var data = {
			userId: request.body.userId,
			from: request.body.from,
			to: request.body.to,
			agency: request.body.agency,
			recruiter: request.body.recruiter,
			subject: request.body.subject,
			content: request.body.content,
			resume: request.body.resume,
			sessionId: request.headers.Authorization
		};

		var requestOb = data;

		delete requestOb.sessionId;

		Utilities.user.saveResumeTrackRequest(requestOb).then(

			function (resumesData) {
				response.status(201).json({status: 201});
			},

			function (resumesResponse) {
				response.status(resumesResponse.status).json(resumesResponse);
			}
		);
	});




	module.exports = router;