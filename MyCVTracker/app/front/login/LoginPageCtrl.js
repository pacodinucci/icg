
angular.module('BlurAdmin.front.login')

    .controller('LoginPageCtrl', ['$scope','$location','$http','AccessToken','$injector','$uibModal','Utilities','$rootScope','LoginSvc',

        function ($scope,$location,$http,AccessToken,$injector,$uibModal,Utilities,$rootScope,LoginSvc) {

            var $q = $injector.get('$q');

            $scope.user = {
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

            $scope.login = function () {

                LoginSvc.doLogin($scope.user.login).then(
                    function (response) {
                        $("#btn-login").html('Signing In ...');
                        Utilities.showSuccessMsg("Login is Successful,Please wait for the Home Page to open");
                        var baseURL = Utilities.baseUrl()+'?fromLogin';
                        // setTimeout($scope.openApp(baseURL),4000);
                        setTimeout(function(){location.href=baseURL} , 5000);
                    },

                    function (response) {
                        $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+response+' !</div>');
                        Utilities.showErrorMsg(response.message);
                        $("#btn-login").html('Sign in');
                    }
                );
            }

            $scope.openForgetPasswordModal = function () {
                $scope.modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/front/login/pages/forgot_password.html',
                    size: 'sm',
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });
            };

            $scope.openApp = function (baseURL) {
                window.location.href = baseURL;
            };

            $scope.forgotPasswordSubmit = function (userModel, userForm) {

                if ( userForm.$valid ) {

                    LoginSvc.forgotPassword(userModel.userName).then(

                        function (userData) {
                            Utilities.showSuccessMsg(Utilities.getAlerts('forgotPasswordSuccess').message);
                        },

                        function (response) {
                            Utilities.showErrorMsg(Utilities.getAlerts(response.status).message);
                        }
                    );
                }
            };

            $scope.hasParameter = function () {
                if(Utilities.getParameters().key){
                    return true;
                }else{
                    return false;
                }
            }

            $scope.resetPassword = function ($pwd1, $pwd, resetForm) {

                var activationKey = $location.url().split('?key=')[1];
                if (resetForm.$valid) {
                    if ($scope.user.resetPassword.newPwd1 == $scope.user.resetPassword.newPwd2) {
                        $scope.resetPassword = {
                            password: $scope.user.resetPassword.newPwd1,
                            activationKey: activationKey,
                        }
                        LoginSvc.resetNewPassword($scope.resetPassword).then(
                            function (data) {
                                Utilities.showSuccessMsg(Utilities.getAlerts('resetPasswordSuccess').message);
                                Utilities.gotoHomePage();
                            },

                            function (response) {
                                Utilities.showErrorMsg(Utilities.getAlerts(response.status));
                            }
                        );
                    }else{
                        Utilities.showErrorMsg(Utilities.getAlerts('confirmPasswordErorr').message);
                    }
                }
            }
        }
    ]);
