
    angular.module('BlurAdmin.pages.auth')

        .controller('AuthCtrl', ['$rootScope', '$scope', 'AuthSvc', 'Utilities','$location',

            function ($rootScope, $scope, AuthSvc, Utilities,$location) {

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
                        password: '',
                        rememberme: ''
                    },
                    resetPassword: {
                        newPwd1: '',
                        newPwd2: '',
                    }
                };


                $scope.LogoutCtrl = function ($scope) {
                    if (AuthSvc.isAuthenticated() ) {
                        $scope.init = function () {
                            AuthSvc.doLogout();
                        };
                        $scope.init();
                    }else {
                        Utilities.gotoHomePage();
                    }
                };

                $scope.resetPassword = function ($pwd1, $pwd, resetForm) {

                    var activationKey = $location.url().split('?key=')[1];
                    if (resetForm.$valid) {
                        if ($scope.user.resetPassword.newPwd1 == $scope.user.resetPassword.newPwd2) {
                            $rootScope.formProcessing = true;
                            $scope.resetPassword = {
                                password: $scope.user.resetPassword.newPwd1,
                                activationKey: activationKey,
                            };;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
                            AuthSvc.resetNewPassword($scope.resetPassword).then(
                                function (data) {
                                    $rootScope.addAlert(Utilities.getAlerts('resetPasswordSuccess'));
                                    Utilities.gotoHomePage();
                                },

                                function (response) {
                                    $rootScope.addAlert(Utilities.getAlerts(response.status));
                                }
                            );
                        }else{
                            $rootScope.addAlert(Utilities.getAlerts('confirmPasswordErorr'));
                        }
                    }
                };


                $scope.showReactivateModal = function () {
                    $scope.modalInstance = AuthSvc.getReactivateModal($scope);
                };

                $scope.reactivateCtrl = function ($scope) {

                    $scope.closeReactivateModal = function () {
                        $scope.modalInstance.close();
                    };

                    $scope.user = {
                        userName: ''
                    };

                    $scope.reactivate = function (resetForm, key,password1,password2) {

                        if ( resetForm.$valid ) {

                            AuthSvc.reactivate(key,password1,password2).then(

                                function (userData) {
                                    $scope.closeReactivateModal();
                                    $scope.showReactivate = false;
                                    $rootScope.addAlert(Utilities.getAlerts('reactivateSuccess'));
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

    var parseQueryString = function() {

        var str = window.location.search;
        var objURL = {};

        str.replace(
            new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
            function( $0, $1, $2, $3 ){
                objURL[ $1 ] = $3;
            }
        );
        return objURL;
    };