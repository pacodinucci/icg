
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
                    
                    doActivate: function (url, key) {
						return RESTSvc.get(url + '?key=' + key);
					},

					doLogout: function (url, userData) {
						return RESTSvc.post(url, userData);
					},
					
					forgotPassword: function (url, email) {
						return RESTSvc.post(url, email);
					},
                    
                    reactivate: function (url, email) {
						return RESTSvc.post(url, email);
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
					
					findMyResumes: function (url) {
						return RESTSvc.get(url);
					},

					saveMyResume: function (url, resumeOb) {
						return RESTSvc.post(url, resumeOb);
					},
					
					deleteMyResume: function (url, id) {
						return RESTSvc.delete(url, id);
					},
					
					saveResumeTrackRequest: function (url, requestOb) {
						return RESTSvc.post(url, requestOb);
					},
					downloadMyResume: function (url) {
						return RESTSvc.download(url);
					}
				};

				return RestConfig;
			}
		]);