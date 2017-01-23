
	angular.module('BlurAdmin.pages.dashboard')

	    .controller('HomeCtrl', ['toastr', '$scope','$injector','$window',

	        function (toastr, $scope,$injector,$window) {

				$scope.authenticate = function () {
					var Utilities = $injector.get('Utilities');
					var AccessToken = $injector.get('AccessToken');

					if (!$scope.isAuthenticated(AccessToken)) {
						Utilities.gotoLoginPage();
					}
					else{
						//$window.location.reload();
						Utilities.gotoProfilePage();
					}
				}

				$scope.isAuthenticated = function(AccessToken) {
					var token = AccessToken.getToken();
					return token.getAccessToken() && token.getUserEmail();
				}
	        }
	    ]);
