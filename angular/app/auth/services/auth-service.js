
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
                            
                            function(response) {
                                TokenSvc.saveToken(response.sessionId, 10800, response.user, response.id).then(function () {
                                    defered.resolve();
                                });
                                
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
                    
                    doActivate: function(key) {
                        var url = Utilities.getActivationUrl();
                        return RestConfig.doActivate(url, key);
            		},

                    doLogout: function () {

                        var defered = $q.defer();

                        var url = Utilities.getLogoutUrl();

                        var token = TokenSvc.getAccessToken();

                        RestConfig.doLogout(url, {token: token}).then(
                            function(logoutResponse) {
                                TokenSvc.removeToken().then(
                                    function(tokenResponse) {
                                        defered.resolve(true);
                                    }
                                );
                            }
                        );

                        return defered.promise;
                    },

                    forgotPassword: function(userModel) {
                        var url = Utilities.getForgotPasswordUrl();
                        return RestConfig.forgotPassword(url, userModel);
                    },
                    
                    reactivate: function(userModel) {
                        var url = Utilities.getReactivateUrl();
                        return RestConfig.reactivate(url, userModel);
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
                    
                    getReactivateModal: function (scope) {

                        var modalOpts = {
                            templateUrl: './app/auth/templates/reactivate.html',
                            controller: 'reactivateCtrl',
                            size: 'sm',
                            scope: scope
                        };

                        return $modal.open(modalOpts);
                    },
            	};

                return AuthSvc;
            }
        ]);
