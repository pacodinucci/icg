
	angular.module('ITCG.pages.register')

		.controller('RegisterCtrl', ['toastr', '$scope', '$injector','$http','$location','$filter','Constants','Authorization',

			function (toastr, $scope, $injector,$http,$location,$filter,Constants,Authorization) {
				$scope.confirmPassword = '';
				$scope.token = null;
				$scope.register = {
					    userName:'',
						email:'',
					    linkedInUrl:'',
						skills:'',
						password:''
				};

				$scope.registerUser = function () {
						console.log($scope.register);
						$http.post('http://localhost:8080/register', $scope.register).then(function(response) {
							console.log(response);
							return response.data.token;
						});
					}
	        }
	    ]);
