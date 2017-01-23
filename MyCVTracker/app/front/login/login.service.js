	
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
                    }
            	};

                return LoginSvc;
            }
        ]);
