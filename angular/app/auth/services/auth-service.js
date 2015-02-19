
    angular.module('icg.auth')

    	.factory('AuthSvc', ['$rootScope', 'RestConfig', '$injector',

            function ($rootScope, RestConfig, $injector) {

                var $q = $injector.get('$q');
                var $modal = $injector.get('$modal');
                var TokenSvc = $injector.get('TokenSvc');
                var Utilities = $injector.get('Utilities');
                var AccountSvc = $injector.get('AccountSvc');

            	var AuthSvc = {

                    isAuthenticated: function () {
                        var token = TokenSvc.getToken();
                        return token.getAccessToken() && token.getUserId();
                    },

            		doLogin: function(loginModel) {

                        var defered = $q.defer();

                        var url = Utilities.getLoginUrl();

                        RestConfig.doLogin(url, loginModel).then(
                            
                            function(userResponse) {

                                TokenSvc.saveToken(userResponse.token, 10800, userResponse).then(

                                    function(tokenResponse) {

                                        if ( tokenResponse ) {                                        
                                            defered.resolve(userResponse);
                                        }
                                    }
                                );                         
                            },

                            function (response) {
                                defered.reject(response);
                            }
                        );
                                            
                        return defered.promise;
            		},

            		doRegister: function(registerModel) {
                        var url = Utilities.getRegisterUrl();
                        return RestConfig.doRegister(url, registerModel);
            		},

                    doLogout: function () {

                        var defered = $q.defer();

                        var url = Utilities.getLogoutUrl();

                        AccountSvc.getUser().then(

                            function (userData) {

                                RestConfig.doLogout(url, userData).then(

                                    function(logoutResponse) {

                                        TokenSvc.removeToken().then(

                                            function(tokenResponse) {

                                                defered.resolve(true);
                                            }
                                        );                            
                                    }
                                );
                            }
                        );                        

                        return defered.promise;
                    },

                    forgotPassword: function(userModel) {
                        var url = Utilities.getForgotPasswordUrl();
                        //return RestConfig.forgotPassword(url, userModel);
                        var defered = $q.defer();
                        defered.resolve(true);
                        return defered.promise;
                    },

                    getForgotPasswordModal: function (scope) {

                        var modalOpts = {
                            templateUrl: './app/auth/templates/forgot_password.html',
                            controller: 'forgotPasswordCtrl',
                            size: 'sm',
                            scope: scope
                        };

                        return $modal.open(modalOpts);
                    },
            	};

                return AuthSvc;
            }
        ]);
