	
    angular.module('BlurAdmin.pages.auth')

    	.factory('AuthSvc', ['$rootScope', 'RestConfig', '$injector','$http','$uibModal',

            function ($rootScope, RestConfig, $injector,$http,$uibModal) {

                var $q = $injector.get('$q');
                var $modal = $uibModal;
                var AccessToken = $injector.get('AccessToken');
                var Utilities = $injector.get('Utilities');

            	var AuthSvc = {
                    
            			isAuthenticated: function () {
                            var token = AccessToken.getToken();
                            return token.getAccessToken() && token.getUserEmail();
                        },
            			
            		doLogin: function(credentials) {
            			
            			var url = Utilities.getAuthenticatedUserUrl();

                        var headers = {authorization : "Basic "
                            + btoa(credentials.email + ":" + credentials.password)};

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
            			
                        var defered = $q.defer();
                                            
                        return defered.promise;
            		},

            		doRegister: function(registerModel) {
                        var url = Utilities.getRegisterUrl();
                        return RestConfig.doRegister(url, registerModel);
            		},

                    resetNewPassword: function(passwordModel) {
                        var url = Utilities.resetNewPasswordUrl();
                        return RestConfig.resetNewPassword(url, passwordModel);
                    },
                    
                    doActivate: function(key) {
                        var url = Utilities.getActivationUrl();
                        return RestConfig.doActivate(url, key);
            		},

                    doLogout: function () {

                        var defered = $q.defer();

                        var url = Utilities.getLogoutUrl();
                        
                        RestConfig.doLogout(url).then(
                            function(logoutResponse) {
                            	AccessToken.removeToken().then(
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
                    
                    reactivate: function(key,password1,password2) {
                        var url = Utilities.getReactivateUrl();
                        return RestConfig.reactivate(url, key,password1,password2);
                    },

                    getForgotPasswordModal: function (scope) {

                        var modalOpts = {
                            templateUrl: '/app/pagesauth/templates/forgot_password.html',
                            controller: 'forgotPasswordCtrl',
                            size: 'sm',
                            scope: scope
                        };

                        return $modal.open(modalOpts);
                    },

                    changePassword: function(scope) {
                        var url = Utilities.getChangePasswordUrl();
                        return RestConfig.changePassword(url, userModel);
                    },




                    
                    getReactivateModal: function (scope) {

                        var modalOpts = {
                            templateUrl: '/app/pagesauth/templates/reactivate.html',
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
