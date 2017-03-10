
	angular.module('ITCG.pages.register')

		.controller('RegisterCtrl', ['toastr', '$scope', '$injector','$http','$location','$filter','Constants','Authorization','Utilities',

			function (toastr, $scope, $injector,$http,$location,$filter,Constants,Authorization,Utilities) {
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
                    $http.post(Utilities.getRegisterUrl(),$scope.register).success(function(response) {
                        Utilities.showSuccessMsg('Register is Successful,please activate your account first');
                        $location.path('/login');
                    }).error(function(response) {
                        Utilities.showErrorMsg('Register Failed');
                    });
				}
	        }
	    ]);
