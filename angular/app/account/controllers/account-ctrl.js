
	angular.module('icg.account')

	    .controller('AccountCtrl', ['$rootScope', '$scope', '$injector',

	        function ($rootScope, $scope, $injector) {            	

				var AuthSvc = $injector.get('AuthSvc');
				var Utilities = $injector.get('Utilities');
				var AccountSvc = $injector.get('AccountSvc');

				$scope.user = {

				};

				$scope.getUserDetails = function () {

					AccountSvc.getUser().then(

						function (userData) {
							$scope.user = userData;
						},

						function (response) {
							$rootScope.addAlert(Utilities.getAlerts(response.status));
						}
					);
				};


				$scope.searchJob = function () {
					Utilities.gotoJobPage();
				};

				$scope.myResumes = function () {
					Utilities.gotoMyResumesPage();
				};


				$scope.trackResume = function () {
					Utilities.gotoTrackResumePage();
				};
				
				$scope.notifications = function () {
					Utilities.gotoNotificationsPage();
				};

				$scope.init = function () {
					$scope.getUserDetails();
				};

				$scope.init();           
	        }
	    ]);
