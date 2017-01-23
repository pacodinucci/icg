
	angular.module('BlurAdmin.pages.notifications')

	    .controller('NotificationsCtrl', ['toastr', '$scope', '$injector', '$http', '$filter',

	   function (toastr, $scope, $injector, $http, $filter) {
	    	// Variables initialization 
			var Utilities = $injector.get('Utilities');
			var NotificationsSvc = $injector.get('NotificationsSvc');
			
			//Used scopes
			$scope.user = {
				myNotifications: [],
				viewNotifications: []
			};
			
			//Listing Notifications Function
			$scope.getMyNotifications = function () {

				$scope.user.myNotifications = [];
					
				NotificationsSvc.getMyNotifications().then(

					function (notificationsData) {

						notificationsData.forEach(function (notifications) {
							notifications.lastTrackedTime = $filter('date')(new Date(notifications.lastTrackedTime), 'EEE,MMM dd yyyy HH:mm');
							$scope.user.myNotifications.push(notifications);
						});
					}
				);
			};

		   //Listing Notifications Function
		   $scope.viewFullNotifications = function (notificationId, index) {

			   $scope.user.viewNotifications = [];

			   NotificationsSvc.viewFullNotifications(notificationId).then(

				   function (notificationsData) {

					   notificationsData.forEach(function (notifications) {
						   notifications.lastTrackedTime = $filter('date')(new Date(notifications.lastTrackedTime), 'EEE,MMM dd yyyy HH:mm');
						   $scope.user.viewNotifications.push(notifications);
					   });

					  // viewFullNotifications($scope.user.myNotifications);
					   $scope.notificationsModal = NotificationsSvc.getViewNotificationsModal($scope, 'NotificationsCtrlModal');
				   }
			   );
		   };

		   //Close the resume model function
		   $scope.closeModal = function () {
			   $scope.notificationsModal.dismiss();
			   Utilities.gotoNotificationsPage();
		   };


		   //deleting Notifications Function
			$scope.deleteNotification = function (notificationId, index) {
				
			var url = Utilities.getDeleteNotificationsUrl()+"?id="+notificationId;
				$http.delete(url, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				})
				.success(function(data, status, headers, config) {
					console.debug(data+'  '+status+' ' +headers+'  '+config);
					toastr.error(Utilities.getAlerts('deleteNotificationSuccess'));
					$scope.user.myNotifications.splice(index, 1);
					})
					.error(function(data, status, headers, config) {
						$scope.closeModal();
						if(data.message=='notificationDeleteLeastError'){
							toastr.error(Utilities.getAlerts('notificationDeleteLeastError'));
						}
						else{
							toastr.error(Utilities.getAlerts('defaultError'));
						}
					});
				};

			$scope.init = function () {
				$scope.getMyNotifications();
			};

			$scope.init();
	    }
	]).controller('NotificationsCtrlModal', ['toastr', '$scope', '$injector', '$http', '$filter',

		function (toastr, $scope, $injector, $http, $filter) {

			$scope.modalNotifications = $scope.user.viewNotifications;

			$scope.closeModal = function (reason) {

				$scope.notificationsModal.dismiss();
				Utilities.gotoNotificationsPage();
				//$modalInstance.close(reason);
			};
		}]);

	angular.module('BlurAdmin.pages.notifications').directive('fileModel', ['$parse', function ($parse) {
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