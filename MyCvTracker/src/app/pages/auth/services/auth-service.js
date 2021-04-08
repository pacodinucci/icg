	
    angular.module('MyCvTracker.pages.auth')

    	.factory('AuthSvc', ['$rootScope', 'RestConfig', '$injector','$http','$uibModal',

            function ($rootScope, RestConfig, $injector,$http,$uibModal) {

                var $q = $injector.get('$q');
                var $modal = $uibModal;
                var Utilities = $injector.get('Utilities');

            	var AuthSvc = {
                    
                    doActivate: function(key) {
                        var url = Utilities.getActivationUrl();
                        return RestConfig.doActivate(url, key);
            		},

                    doLogout: function () {
                        var defered = $q.defer();
                        var url = Utilities.getLogoutUrl();
                        RestConfig.doLogout(url).then(
                            function(logoutResponse) {
                                defered.resolve(true);
                            }
                        );
                        return defered.promise;
                    },

                    forgotPassword: function(userModel) {
                        var url = Utilities.getForgotPasswordUrl();
                        return RestConfig.forgotPassword(url, userModel);
                    },

                    resetNewPassword: function(passwordModel) {
                        var url = Utilities.resetNewPasswordUrl();
                        return RestConfig.resetNewPassword(url, passwordModel);
                    },
                    resetPasswordAndActivate: function(passwordModel) {
                        var url = Utilities.resetPasswordAndActivate();
                        return RestConfig.resetPasswordAndActivate(url, passwordModel);
                    },
            	};

                return AuthSvc;
            }
        ]);
