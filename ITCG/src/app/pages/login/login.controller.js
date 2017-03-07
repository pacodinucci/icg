
	angular.module('ITCG.pages.login')

		.controller('LoginCtrl', ['toastr', '$scope', '$injector','$http','$location','$filter','Constants','Authorization',

			function (toastr, $scope, $injector,$http,$location,$filter,Constants,Authorization) {
				$scope.confirmPassword = '';
				$scope.token = null;
				$scope.user = {
					    email:'',
					    password:'',
                        rememberme:''
				};

                $scope.login = function () {
                    $http.post('http://localhost:8080/login', $scope.register).then(function(token) {
                        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                    });
                }
	        }
	    ]);
