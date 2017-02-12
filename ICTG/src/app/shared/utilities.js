
	angular.module('ICTG.shared')

		.factory('Utilities', ['Constants', '$injector','$location','toastr',

			function(Constants, $injector,$location,toastr) {

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
						type: 'success',
						message: 'A password reset link has been successfully sent to the registered E-mail ID.',
					},
                    reactivateSuccess: {
						type: 'success',
						message: 'An activation link has been successfully sent to the registered E-mail',
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
					sendTrackedApplicationModelTitle:{
						type: '',
						message: 'Send Tracked Application'
					},
					jobContentSaveSucess: {
						type: 'success',
						message: 'The Job content is Updated Successfully'
					},
					jobActivateSaveSucess: {
						type: 'success',
						message: 'The Job is activated Successfully'
					},
					applyJobTitle: {
						type: '',
						message: 'Apply Job'
					},
					applyJobMessage:{
						type: '',
						message: 'Are you sure you want to apply to this job?'
					},
					applyJobSucsessMessage:{
						type: 'success',
						message: 'The Job is applied Successfully'
					},
					editJobTitle: {
						type: '',
						message: 'Edit Job'
					},
					editJobMessage:{
						type: '',
						message: 'Are you sure you want to edit to this job?'
					},
					approveJobTitle: {
						type: '',
						message: 'Approve Job'
					},
					approveJobMessage:{
						type: '',
						message: 'Are you sure you want to approve this job?'
					},
					approveJobSuccessMessage:{
						type: 'success',
						message: 'The job is approved successfully'
					},
					rejectJobTitle: {
						type: '',
						message: 'Reject Job'
					},
					rejectJobMessage:{
						type: '',
						message: 'Are you sure you want to reject this job?'
					},
					rejectJobSuccessMessage:{
						type: 'success',
						message: 'The job is rejected successfully'
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
						return Constants.baseUrl + Constants.apis.login.url;
					},

					getRegisterUrl: function () {
						return Constants.baseUrl + Constants.apis.register.url;
					},

                    getActivationUrl: function () {
						return Constants.baseUrl + Constants.apis.activate.url;
					},

					getLogoutUrl: function () {
						return Constants.baseUrl + Constants.apis.logout.url;
					},

					getForgotPasswordUrl: function () {
						return Constants.baseUrl + Constants.apis.forgotPassword.url;
					},

                    getReactivateUrl: function () {
						return Constants.baseUrl + Constants.apis.reactivate.url;
					},

					getChangePasswordUrl: function () {
						return Constants.baseUrl + Constants.apis.changePassword.url;
					},

					sendTrackedApplicationUrl: function () {
						return Constants.baseUrl + Constants.apis.sendTrackedApplication.url;
					},

					getJobsListUrl: function () {
						return Constants.baseUrl + Constants.apis.jobsList.url;
					},

					getEditJobUrl: function () {
						return Constants.baseUrl + Constants.apis.editJob.url;
					},

					getViewJobUrl: function () {
						return Constants.baseUrl + Constants.apis.viewJob.url;
					},

					getActivateJobUrl: function () {
						return Constants.baseUrl + Constants.apis.activateJob.url;
					},

					getApplyJobUrl: function () {
						return Constants.baseUrl + Constants.apis.applyJob.url;
					},

					getSendTrackAppUrl: function () {
						return Constants.baseUrl + Constants.apis.sendTrackApp.url;
					},

                    getJobCriteriaListUrl: function () {
                        return Constants.baseUrl + Constants.apis.jobCriteriaList.url;
                    },

					getCitiesListUrl: function () {
						return Constants.baseUrl + Constants.apis.citiesList.url;
					},

					gotoJobPage: function () {
						$location.path('jobs');
					},

					gotoViewJobPage: function () {
						$location.path('jobs.viewJob');
					},

					gotoLoginPage: function () {
						//$location.path('base.auth', {reload: true});
						$location.path('auth', {}	, { reload: true });
					},

					gotoRegisterPage: function () {
						//$location.path('base.auth', {reload: true});
						$location.path('register', {}	, { reload: true });
					},

                    baseUrl: function(){
						var pathparts = location.pathname.split('/');
						if (location.host.indexOf('localhost') !== -1) {
							var url = location.origin;
						}else{
							var url = location.origin;
						}
						return url;
                	},

                    getParameters : function () {
                        var query_string = {};
                        var query = window.location.search.substring(1);
                        var vars = query.split("&");
                        for (var i=0;i<vars.length;i++) {
                            var pair = vars[i].split("=");
                            // If first entry with this name
                            if (typeof query_string[pair[0]] === "undefined") {
                                query_string[pair[0]] = decodeURIComponent(pair[1]);
                                // If second entry with this name
                            } else if (typeof query_string[pair[0]] === "string") {
                                var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                                query_string[pair[0]] = arr;
                                // If third or later entry with this name
                            } else {
                                query_string[pair[0]].push(decodeURIComponent(pair[1]));
                            }
                        }
                        return query_string;
                    },

                    showSuccessMsg : function(msg) {
                    toastr.success(msg);
					},

					showInfoMsg : function(msg) {
						toastr.info(msg, 'Information');
					},

					showErrorMsg : function(msg) {
						toastr.error(msg, 'Error');
					},

					showWarningMsg : function(msg) {
						toastr.warning(msg, 'Warning');
					}

				};

				return Utilities;
			}
		]);
