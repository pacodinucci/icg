
    angular.module('icg.auth')

        .controller('AuthCtrl', ['$rootScope', '$scope', 'AuthSvc', 'Utilities',

            function ($rootScope, $scope, AuthSvc, Utilities) {

                if ( AuthSvc.isAuthenticated() ) {
                    Utilities.gotoHomePage();
                }

                $scope.modalInstance = {

                };

                $scope.user = {

                    register: {
                    	firstName: '',
                    	lastName: '',
                    	email: '',
                        password: ''
                    },

                    login: {
                        email: '',
                        password: ''
                    }
                };


                $scope.LogoutCtrl = function ($scope) {


                    $scope.init = function () {
                        AuthSvc.doLogout();
                    };

                    $scope.init();
                };



                $scope.login = function (loginModel, loginForm) {

                    if (loginForm.$valid) {

                        $rootScope.formProcessing = true;

                        AuthSvc.doLogin(loginModel).then(

                        	function (loginData) {

                        		if ( loginData ) {
                                    Utilities.gotoProfilePage();
                            	} 
    	                    }, 

    	                    function (response) {
                                $rootScope.addAlert(Utilities.getAlerts(response.status));
    	                    }
    	                );
                    } 
                };

                $scope.register = function (registerModel, registerForm) {

                    if (registerForm.$valid) {

                        $rootScope.formProcessing = true;

                        AuthSvc.doRegister(registerModel).then(

                            function (registrationData) {

                            	if (registrationData) {
                                    $rootScope.addAlert(Utilities.getAlerts('regsitrationSuccess'));
                                    Utilities.gotoHomePage();
                            	}                            
                            },

                            function (response) {
                                $rootScope.addAlert(Utilities.getAlerts(response.status));
                            }
                        );
                    }
                };


                $scope.showForgotPasswordModal = function () {
                    $scope.modalInstance = AuthSvc.getForgotPasswordModal($scope);
                };

                $scope.forgotPasswordCtrl = function ($scope) {

                    $scope.closeForgotPasswordModal = function () {
                        $scope.modalInstance.close();
                    };

                    $scope.user = {
                        userName: ''
                    };

                    $scope.forgotPassword = function (userModel, userForm) {

                        if ( userForm.$valid ) {                       

                            AuthSvc.forgotPassword(userModel.userName).then(

                                function (userData) {
                                    $scope.closeForgotPasswordModal();
                                    $rootScope.addAlert(Utilities.getAlerts('forgotPasswordSuccess'));
                                },

                                function (response) {
                                    $rootScope.addAlert(Utilities.getAlerts(response.status));
                                }
                            ); 
                        }
                    };
                };
            }
        ]);
