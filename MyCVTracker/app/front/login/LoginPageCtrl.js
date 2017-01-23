
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
                    function () {
                        $("#btn-login").html('Signing In ...');
                        $rootScope.showSuccessMsg("Login is Successful,Please wait for the Home Page to open");
                        var baseURL = Utilities.baseUrl();
                        // setTimeout($scope.openApp(baseURL),4000);
                        setTimeout(function(){location.href=baseURL} , 5000);
                    },

                    function (response) {
                        $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+response+' !</div>');
                        $rootScope.showErrorMsg(response.message);
                        $("#btn-login").html('Sign in');
                    }
                );
            }

            $scope.openForgetPasswordModal = function () {
                $scope.modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/front/login/forgot_password.html',
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
            }

            $scope.forgotPasswordSubmit = function (userModel, userForm) {

                if ( userForm.$valid ) {

                    LoginSvc.forgotPassword(userModel.userName).then(

                        function (userData) {
                            $rootScope.showSuccessMsg(Utilities.getAlerts('forgotPasswordSuccess').message);
                        },

                        function (response) {
                            $rootScope.showErrorMsg(Utilities.getAlerts(response.status).message);
                        }
                    );
                }
            };
        }
    ]);
