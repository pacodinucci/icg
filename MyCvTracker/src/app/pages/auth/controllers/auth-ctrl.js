
    angular.module('MyCvTracker.pages.auth')

        .controller('AuthCtrl', ['$scope','$location','$http','$injector','$uibModal','Utilities','$rootScope','$auth','$window','$state','AuthSvc','baSidebarService',

            function ($scope,$location,$http,$injector,$uibModal,Utilities,$rootScope,$auth,$window,$state,AuthSvc,baSidebarService) {

            $scope.loginModal = $rootScope.loginModal;
                $scope.user = {
                    register: {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    },
                        login: {
                        email: '',
                        password: '',
                        rememberme: ''
                    },
                    resetPassword: {
                        newPwd1: '',
                        newPwd2: '',
                    },
                    userName: ''
                };

                $scope.register = function (registerModel, registerForm) {

                    var activationKey = Utilities.getParameters().key;
                    if (registerForm.$valid) {
                        if ($scope.user.register.password == $scope.user.register.confirmPassword) {
                            $("#btn-register").html('Signing up');
                            $auth.signup(registerModel)
                                .then(function (response) {
                                    Utilities.showSuccessMsg(Utilities.getAlerts('regsitrationSuccess').message);
                                    if ($scope.loginModal) {
                                        $scope.$close();
                                        $rootScope.loginModal = false;
                                        $scope.loginModal = false;
                                    }
                                    $state.go("login");
                                    $("#btn-register").html('Sign up');
                                })
                                .catch(function (response) {
                                    Utilities.showErrorMsg(Utilities.getAlerts(response.status));
                                    $("#btn-register").html('Sign up');
                                });
                        } else {
                            Utilities.showErrorMsg(Utilities.getAlerts('confirmPasswordErorr').message);
                        }
                    }
                };

                $scope.login = function () {

                    $("#btn-login").html('Signing in');

                    if($scope.user.login.rememberme){
                        $auth.setStorageType('localStorage');
                    }else {
                        $auth.setStorageType('sessionStorage');
                    }
                    $auth.login($scope.user.login)
                        .then(function(response) {
                            var user = angular.toJson(response.data.user);
                            if(!$scope.user.login.rememberme){
                                $window.sessionStorage.loggedInUser = user;
                            }else {
                                $window.localStorage.loggedInUser = user;
                            }
                            $rootScope.loggedInUser = response.data.user;
                            $rootScope.$isAuthenticated = $auth.isAuthenticated();
                            Utilities.showSuccessMsg("Login is Successful");
                            if($scope.loginModal){
                                $scope.$close();
                                $rootScope.loginModal=false;
                                $scope.loginModal = false;
                            }
                            $state.go("account");
                            //var baseURL = Utilities.baseUrl()+'?fromLogin';
                            //setTimeout(function(){location.href=baseURL} , 5000);
                        })
                        .catch(function(response) {
                            console.log(response);
                            $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+response+' !</div>');
                            Utilities.showErrorMsg(response.message);
                            $("#btn-login").html('Sign in');
                        });
                };

                $scope.authenticate = function(provider) {
                    $auth.authenticate(provider);
                };

                $scope.logout = function () {
                    AuthSvc.doLogout().then(function (response) {
                        $auth.logout();
                        if(sessionStorage.loggedInUser){
                            sessionStorage.removeItem('loggedInUser');
                        }else {
                            localStorage.removeItem('loggedInUser');
                        }
                        $rootScope.loggedInUser = null;
                        $rootScope.$isAuthenticated = $auth.isAuthenticated();
                        baSidebarService.setMenuCollapsed(true);
                        $state.go("login");
                    });
                }

                $scope.openForgetPasswordModal = function () {
                    $scope.modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'app/pages/auth/templates/forgot_password.html',
                        restrict: 'E',
                        component:'forgetPasswordModal',
                        size: 'sm',
                        controller:'AuthCtrl',
                        resolve: {
                            items: function () {
                                return $scope.items;
                            }
                        }
                    });
                };

                $scope.forgotPasswordSubmit = function (userModel, userForm) {

                    if ( userForm.$valid ) {

                        AuthSvc.forgotPassword(userModel.userName).then(

                            function (userData) {
                                Utilities.showSuccessMsg(Utilities.getAlerts('forgotPasswordSuccess').message);
                                $scope.$close();
                            },

                            function (response) {
                                Utilities.showErrorMsg(Utilities.getAlerts(response.status).message);
                                $scope.$close();

                            }
                        );
                    }
                };

                $scope.resetPassword = function ($pwd1, $pwd, resetForm) {

                    var activationKey = Utilities.getParameters().key;
                    if (resetForm.$valid) {
                        if ($scope.user.resetPassword.newPwd1 == $scope.user.resetPassword.newPwd2) {
                            $scope.resetPassword = {
                                password: $scope.user.resetPassword.newPwd1,
                                activationKey: activationKey,
                            }
                            AuthSvc.resetNewPassword($scope.resetPassword).then(
                                function (data) {
                                    Utilities.showSuccessMsg(Utilities.getAlerts('resetPasswordSuccess').message);
                                    $state.go("login");
                                },

                                function (response) {
                                    Utilities.showErrorMsg(Utilities.getAlerts(response.status));
                                }
                            );
                        }else{
                            Utilities.showErrorMsg(Utilities.getAlerts('confirmPasswordErorr').message);
                        }
                    }
                };

                $scope.activate = function () {
                    var key = Utilities.getParameters().key;
                    if (key) {
                        AuthSvc.doActivate(key).then(function() {
                            Utilities.showSuccessMsg(Utilities.getAlerts('activateSuccess').message);
                            $state.go("login");
                        }, function (response) {
                            Utilities.showErrorMsg(Utilities.getAlerts(response.status).message);
                            $state.go("login");
                        });
                    }
                };
            }
        ]);
