
	angular.module('ITCG.pages.login')

		.controller('LoginCtrl', ['toastr', '$scope', '$injector','$http','$location','$filter','Constants','Authorization','ipCookie','Constants','Utilities',

			function (toastr, $scope, $injector,$http,$location,$filter,Constants,Authorization,ipCookie,Constants,Utilities) {
				$scope.rememberme=false;
				$scope.token = null;
				$scope.user = {
					    email:'',
					    password:''
				};

                $scope.login = function () {
                    $http.post(Utilities.getLoginUrl(),$scope.user).success(function(token) {
                        Utilities.showSuccessMsg('Login is successful');
                        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                        ipCookie(Constants.accessCookie,token);
                        var baseURL = Utilities.baseUrl()+'/dashboard';
                        setTimeout(function(){location.href=baseURL} , 5000);
                    }).error(function(response) {
                        Utilities.showErrorMsg('Register Failed');
                    });
                }

                var activate = function () {
                    var key = Utilities.getParameters().key;
                    if (key) {
                        $http.get(Utilities.getActivationUrl()+'?key='+key).success(function(response) {
                            Utilities.showSuccessMsg(Utilities.getAlerts('activateSuccess').message);
                            $location.path('/login');
                        }).error(function(response) {
                            Utilities.showErrorMsg(Utilities.getAlerts(response.status).message);
                        });
                    }
                }

                activate();
	        }
	    ]);
