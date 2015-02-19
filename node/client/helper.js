

	var Q = require('q');
	var uuid = require('node-uuid');
	var db = require('../client/repository.js');

	var helper = {

		collections: {

			users: {

				name: 'users',
				schema: {

					id: {
						name: 'id',
						type: 'int'
					},

					email: {
						name: 'email',
						type: 'varchar'
					},

					password: {
						name: 'password',
						type: 'varchar'
					},

					firstName: {
						name: 'firstName',
						type: 'varchar'
					},

					lastName: {
						name: 'lastName',
						type: 'varchar'
					},
				}
			},

			sessions: {

				name: 'sessions',
				schema: {

					id: {
						name: 'id',
						type: 'int'
					},

					userId: {
						name: 'userId',
						type: 'int'
					},

					sessionId: {
						name: 'sessionId',
						type: 'varchar'
					},

					createdAt: {
						name: 'createdAt',
						type: 'timestamp'
					},
				}
			},

			resumes: {

				name: 'resumes',
				schema: {

					id: {
						name: 'id',
						type: 'int'
					},

					userId: {
						name: 'userId',
						type: 'int'
					},

					resumeTitle: {
						name: 'resumeTitle',
						type: 'varchar'
					},

					resumeType: {
						name: 'resumeType',
						type: 'varchar'
					},

					resumeFile: {
						name: 'resumeFile',
						type: 'varchar'
					},

					uploadedAt: {
						name: 'uploadedAt',
						type: 'timestamp'
					},
				}
			},

			trackResume: {

				name: 'resume_track_requests',
				schema: {

					id: {
						name: 'id',
						type: 'int'
					},

					userId: {
						name: 'userId',
						type: 'int'
					},

					from: {
						name: 'from',
						type: 'varchar'
					},

					to: {
						name: 'to',
						type: 'varchar'
					},

					agency: {
						name: 'agency',
						type: 'varchar'
					},

					recruiter: {
						name: 'recruiter',
						type: 'varchar'
					},

					subject: {
						name: 'subject',
						type: 'varchar'
					},

					content: {
						name: 'content',
						type: 'varchar'
					},

					resume: {
						name: 'resume',
						type: 'varchar'
					},

					createdAt: {
						name: 'createdAt',
						type: 'timestamp'
					},
				}
			}
		},

		user: {

			saveUser: function (userOb) {

				var defered = Q.defer();

				var sql = 'INSERT INTO ' + helper.collections.users.name + ' SET ?'

				db.query( sql, userOb, function(error, result) {

					if ( error ) {
						defered.reject({status: 404});
					}
					else {
						defered.resolve('Registered !');
					}						
				});

				return defered.promise;
			},

			getUser: function (userOb) {

				var defered = Q.defer();

				//? AND password = ??

				var sql = 'SELECT * FROM ' + helper.collections.users.name + ' WHERE ' + helper.collections.users.schema.email.name + ' = ?';

				

				db.query( sql, [userOb.email], function(error, rows, fields) {

					if ( error ) {
						defered.reject({status: 404});
					}

					else {

						if ( rows.length ) {

							var user = rows[0];
							user.userId = user.id;
							user.sessionId = uuid.v4().split("-").join("");;
							delete user.id; 

							helper.user.createSession(user.userId, user.sessionId).then(

								function () {
									defered.resolve(user);
								},

								function () {
									defered.reject('Session not created !');
								}
							);						

						} else {
							defered.reject({status: 403});
						}
					}
				});

				return defered.promise;	
			},

			createSession: function (userId, sessionId) {

				var userSessionOb = {
					userId: userId,
					sessionId: sessionId
				};

				var defered = Q.defer();

				var sql = 'INSERT INTO ' + helper.collections.sessions.name + ' SET ?';

				db.query( sql, userSessionOb, function(error, result) {

					if ( error ) {
						defered.reject({status: 404});
					}
					else {
						defered.resolve('Registered Created !');
					}						
				});

				return defered.promise;
			},

			deleteSession: function (userOb) {

				var userSessionOb = {
					userId: userOb.userId,
					sessionId: userOb.sessionId
				};

				var defered = Q.defer();

				var sql = 'DELETE FROM ' + helper.collections.sessions.name + ' WHERE ' + helper.collections.sessions.schema.userId.name + ' = ' + db.escape(userSessionOb.userId) +  ' AND ' + helper.collections.sessions.schema.sessionId.name + ' = ' + db.escape(userSessionOb.sessionId);
				
				db.query( sql, function(error, result) {

					if ( error ) {
						defered.reject({status: 404});
					}
					else {
						defered.resolve('Session Deleted !');
					}						
				});

				return defered.promise;
			},



			getResumes: function (userOb) {

				var defered = Q.defer();

				var sql = 'SELECT * FROM ' + helper.collections.resumes.name + ' WHERE ' + helper.collections.resumes.schema.userId.name + ' = ' + db.escape(userOb.userId);
				
				db.query( sql, function(error, rows, fields) {

					if ( error ) {
						defered.reject({status: 404});
					}

					else {
						defered.resolve(rows);
					}
				});

				return defered.promise;	
			},


			saveResume: function (resumeOb) {

				var defered = Q.defer();

				var sql = 'INSERT INTO ' + helper.collections.resumes.name + ' SET ?';

				db.query( sql, resumeOb, function(error, result) {

					if ( error ) {
						defered.reject({
							status: 404,
							error: error
						});
					}
					
					else {
						defered.resolve('Resume is saved !');
					}						
				});

				return defered.promise;
			},


			saveResumeTrackRequest: function (requestOb) {

				console.dir(requestOb);

				var defered = Q.defer();

				var sql = 'INSERT INTO ' + helper.collections.trackResume.name + ' SET ?';

				db.query( sql, requestOb, function(error, result) {

					if ( error ) {
						defered.reject({
							status: 404,
							error: error
						});
					}
					
					else {
						defered.resolve('Request is saved !');
					}						
				});

				return defered.promise;
			},
		}
	};

	module.exports = helper;