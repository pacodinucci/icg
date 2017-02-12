
angular.module('ICTG.front.register')

    .controller('RegisterPageCtrl', ['$scope','$location','$http','AccessToken','$injector','RegisterSvc','$rootScope','Utilities',

        function ($scope,$location,$http,AccessToken,$injector,RegisterSvc,$rootScope,Utilities) {

            var $q = $injector.get('$q');

            $scope.user = {

                register: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                }
            };

            $scope.register = function (registerModel, registerForm) {

                if (registerForm.$valid) {

                    RegisterSvc.doRegister(registerModel).then(
                        function (registrationData) {
                            if (registrationData) {
                                $rootScope.addSucessAlert(Utilities.getAlerts('regsitrationSuccess'));
                                setTimeout(' window.location.href = "auth.html"; ',4000);
                            }
                        },
                        function (response) {
                            $rootScope.addErrorAlert(Utilities.getAlerts(response.status));
                        }
                    );
                }
            };
        }
    ]);
