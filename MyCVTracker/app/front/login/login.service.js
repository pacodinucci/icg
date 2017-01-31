	
    angular.module('BlurAdmin.front.login')

    	.factory('LoginSvc', ['$rootScope', 'RestConfig', '$injector','$http',

            function ($rootScope, RestConfig, $injector,$http) {

                var $q = $injector.get('$q');
                var AccessToken = $injector.get('AccessToken');
                var Utilities = $injector.get('Utilities');

            	var LoginSvc = {

                    doLogin: function(credentials) {

                        var url = Utilities.getAuthenticatedUserUrl();
                        var headers = {authorization : "Basic "
                        + btoa(credentials.email + ":" + credentials.password)};

                        var defered = $q.defer();

                        $http.get(url, {headers : headers}).success(function(response) {
                            var userData = {
                                userId:response.principal.id,
                                userRole:response.authorities[0].authority,
                                userEmail:response.principal.email,
                                firstName:response.principal.firstName,
                                lastName:response.principal.lastName
                            };
                            $rootScope.authenticatedUser = userData;
                            $rootScope.authenticated = true;
                            if(credentials.rememberme){
                                AccessToken.saveTokenNotExpired(headers,response.principal.id,response.authorities[0].authority,response.principal.email,response.principal.firstName,response.principal.lastName).then(function () {
                                    defered.resolve();
                                });
                            }
                            else{
                                AccessToken.saveToken(headers,7200,response.principal.id,response.authorities[0].authority,response.principal.email,response.principal.firstName,response.principal.lastName).then(function () {
                                    defered.resolve();
                                });
                            }
                        }).error(function(response) {
                            $rootScope.authenticated = false;
                            defered.reject(response);
                        });

                        return defered.promise;
                    },

                    forgotPassword: function(userModel) {
                        var url = Utilities.getForgotPasswordUrl();
                        return RestConfig.forgotPassword(url, userModel);
                    },

                    isAuthenticated: function () {
                        var token = AccessToken.getToken();
                        return token.getAccessToken() && token.getUserEmail();
                    },
                    doActivate: function(key) {
                        var url = Utilities.getActivationUrl();
                        return RestConfig.doActivate(url, key);
                    },
                    resetNewPassword: function(passwordModel) {
                        var url = Utilities.resetNewPasswordUrl();
                        return RestConfig.resetNewPassword(url, passwordModel);
                    }
            	};

                return LoginSvc;
            }
        ]);
