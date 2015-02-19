

	var Helper = require('../client/helper.js');

	var Utilities = {

		user: {

			getUsers: function () {
				return Helper.user.getUsers();	
			},

			getUser: function (userId) {
				return Helper.user.getUser(userId);
			},

			saveUser: function (userOb) {
				return Helper.user.saveUser(userOb);
			},

			deleteSession: function (userOb) {
				return Helper.user.deleteSession(userOb);				
			},

			getResumes: function (userOb) {
				return Helper.user.getResumes(userOb);
			},

			saveResume: function (userOb) {
				return Helper.user.saveResume(userOb);
			},

			saveResumeTrackRequest: function (requestOb) {
				return Helper.user.saveResumeTrackRequest(requestOb);
			}
		}
	};

	module.exports = Utilities;