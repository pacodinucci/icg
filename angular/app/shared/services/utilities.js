
	angular.module('icg.shared')

		.factory('Utilities', ['Configs', '$state', '$injector', 

			function(Configs, $state, $injector) {

				var alerts = {
					401: {
						type: 'danger',
						message: 'Unauthorized Access !',
					},
					403: {
						type: 'danger',
						message: 'Authentication Failure. The username or password doesn’t match. Please retry or use the Password Recover option to reset the password.',
					},
					409: {
						type: 'danger',
						message: 'User already exists !!',
					},
					regsitrationSuccess: {
						type: 'success',
						message: 'An activation link has been successfully sent to the registered E-mail ID. Please activate your account to continue with the Registration Process.',
					},
					activateSuccess: {
						type: 'success',
						message: 'Your account have been activated.',
					},
					forgotPasswordSuccess: {
						type: 'warning',
						message: 'A password reset link has been successfully sent to the registered E-mail ID.',
					},
                    reactivateSuccess: {
						type: 'warning',
						message: 'An activation link has been successfully sent to the registered E-mail',
					},
					resumeAddedSuccess: {
						type: 'success',
						message: 'Resume has been added successfully.',
					},
					resumeEditSuccess: {
						type: 'success',
						message: 'Resume has been Edited successfully.',
					},
					resumeSaveTitleDuplicatedError: {
						type: 'danger',
						message: 'This Resume Title is duplicated !',
					},
					resumeSaveTypeDuplicatedError: {
						type: 'danger',
						message: 'This Resume Type is duplicated !',
					},
					resumeTrackRequestSuccess: {
						type: 'success',
						message: 'Your request has been saved.',						
					},
					deleteResumeuccess: {
						type: 'success',
						message: 'Resume has been deleted successfully.',						
					},
					defaultError: {
						type: 'danger',
						message: 'Oops ! Something went wrong.',
					},
					defaultWarning: {
						type: 'warning',
						message: 'This may hurt.',
					},
					defaultSuccess: {
						type: 'success',
						message: 'Operation performed successfully.',
					},
					notActivated: {
						type: 'warning',
						message: 'Your account has not been activated yet. Have you got activation link?'
					},
					deleteModelTitle:{
						type: '',
						message: 'Delete Resume'
					},
					deleteModelMessage:{
						type: '',
						message: 'Are you sure you want to delete this Resume?'
					},
					downloadModelTitle:{
						type: '',
						message: 'Download Resume'
					},
					downloadModelMessage:{
						type: '',
						message: 'Are you sure you want to download this Resume?'
					},
					resumeDownloadSuccess: {
						type: 'success',
						message: 'Resume have been downloaded successfully.',
					},
					resumeSaveLimitError: {
						type: '',
						message: 'You have reached the number of resumes'
					},
					resumeSaveLeastError: {
						type: '',
						message: 'You have at least one resume'
					}
				};

				var Utilities = {

					getAlerts: function (statusCode) {
						return alerts[statusCode ? statusCode : 'defaultError'];
					},


					getTextDay: function(numDay) {
						var textDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
						return textDays[numDay];
					},

					getMonthDay: function(numMonth) {
						var textMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
							'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
						];
						return textMonths[numMonth];
					},

					getFormattedDate: function(dateOb) {
						var newDate = new Date(dateOb);
						return this.getTextDay(newDate.getDay()) + ', ' + this.getMonthDay(newDate.getMonth()) + ' ' + newDate.getDate() + ' ' + newDate.getFullYear();
					},

















					getLoginUrl: function () {
						return Configs.baseUrl + Configs.apis.login.url;
					},

					getRegisterUrl: function () {
						return Configs.baseUrl + Configs.apis.register.url;
					},
                    
                    getActivationUrl: function () {
						return Configs.baseUrl + Configs.apis.activate.url;
					},

					getLogoutUrl: function () {
						return Configs.baseUrl + Configs.apis.logout.url;
					},

					getForgotPasswordUrl: function () {
						return Configs.baseUrl + Configs.apis.forgotPassword.url;						
					},
                    
                    getReactivateUrl: function () {
						return Configs.baseUrl + Configs.apis.reactivate.url;						
					},

					getChangePasswordUrl: function () {
						return Configs.baseUrl + Configs.apis.changePassword.url;						
					},

					getMyResumesUrl: function () {
						return Configs.baseUrl + Configs.apis.myResumes.url;						
					},
					
					getSaveResumesUrl: function () {
						return Configs.baseUrl + Configs.apis.saveResume.url;						
					},
					
					geDeleteResumesUrl: function(){
						return Configs.baseUrl + Configs.apis.deleteResume.url;
					},
					
					getFindResumeUrl: function () {
						return Configs.baseUrl + Configs.apis.findResume.url;						
					},
					
					getDownloadResumeUrl: function () {
						return Configs.baseUrl + Configs.apis.downloadResume.url;						
					},
					
					getTrackResumeUrl: function () {
						return Configs.baseUrl + Configs.apis.trackResume.url;						
					},

					gotoHomePage: function () {
						$state.go('base.home');
					},

					gotoProfilePage: function () {
						$state.go('base.account');
					},

					gotoJobPage: function () {
						$state.go('base.jobs');
					},

					gotoMyResumesPage: function () {
						$state.go('base.resumes');
					},

					gotoTrackResumePage: function () {
						$state.go('base.trackResume');
					},

				};

				return Utilities;
			}
		]);