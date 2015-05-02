
	angular.module('icg.notifications')

	    .controller('NotificationsCtrl', ['$rootScope', '$scope', '$injector','$http',

	   function ($rootScope, $scope, $injector,$http) {
	    	// Variables initialization 
			var Utilities = $injector.get('Utilities');
			var NotificationsSvc = $injector.get('NotificationsSvc');
			
			//Used scopes
			$scope.user = {
				myNotifications: []
			};
			
			//Listing Notifications Function
			$scope.getMyNotifications = function () {

				$scope.user.myNotifications = [];
					
				NotificationsSvc.getMyNotifications().then(

					function (notificationsData) {

						notificationsData.forEach(function (notifications) {
							notifications.eventTime = Utilities.getFormattedDate(notifications.eventTime);
							$scope.user.myNotifications.push(notifications);
						});
					}
				);
			};
			$scope.init = function () {
				$scope.getMyNotifications();
			};

			$scope.init();
	    }
	]);
	angular.module('icg.notifications').directive('fileModel', ['$parse', function ($parse) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.fileModel);
	            var modelSetter = model.assign;
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
	                });
	            });
	        }
	    };
	}]);