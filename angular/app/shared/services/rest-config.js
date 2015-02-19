
	angular.module('icg.shared')

		.factory('RestConfig', ['RESTSvc', '$injector', 

			function(RESTSvc, $injector) {

				var RestConfig = {

					doLogin: function (url, loginData) {
						return RESTSvc.post(url, loginData);
					},

					doRegister: function (url, registationData) {
						return RESTSvc.post(url, registationData);
					},

					doLogout: function (url, userData) {
						return RESTSvc.post(url, userData);
					},
					


					getUser: function () {

                        var defered = $injector.get('$q').defer();
                        var token = $injector.get('TokenSvc').getToken();

                        if ( token ) {

                           var user = {

                                userId: token.getUserId(),
                                userRole: token.getUserRole(),
                                firstName: token.getFirstName(),
                                sessionId: token.getSessionId()
                            };

                            defered.resolve(user);
                        }

                        else { 
                            defered.reject({status: 401});
                        }                            

                        return defered.promise;
                    },

					getMyResumes: function (url) {
						return RESTSvc.get(url);
					},

					saveMyResume: function (url, resumeOb) {
						return RESTSvc.post(url, resumeOb);
					},

					saveResumeTrackRequest: function (url, requestOb) {
						return RESTSvc.post(url, requestOb);
					}
				};

				return RestConfig;
			}
		]);