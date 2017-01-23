
	angular.module('BlurAdmin.pages.campaignNotifications')

	    .controller('CampaignNotificationsCtrl', ['toastr', '$scope', '$injector', '$http', '$filter',

	   function (toastr, $scope, $injector, $http, $filter) {
	    	// Variables initialization 
			var Utilities = $injector.get('Utilities');
			var NotificationsSvc = $injector.get('CampaignNotificationsSvc');

			//Used scopes
			$scope.user = {
				myNotifications: [],
				viewNotifications: [],
				myCampaigns : []
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
		   $scope.getMyCampaigns = function () {

			   $scope.user.myCampaigns = [];

			   NotificationsSvc.getMyCampaigns().then(

				   function (campaignsData) {

					   campaignsData.forEach(function (campaigns) {
						   $scope.user.myCampaigns.push(campaigns);
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
					   $scope.notificationsModal = NotificationsSvc.getViewNotificationsModal($scope, 'CampaignNotificationsCtrlModal');
				   }
			   );
		   };

		   //Close the resume model function
		   $scope.closeModal = function () {
			   $scope.notificationsModal.dismiss();
			   Utilities.gotoCampaignNotificationsPage();
		   };


		   //deleting Notifications Function
			$scope.deleteNotification = function (notificationId, index) {
				
			var url = Utilities.getDeleteCampaignNotificationsUrl()+"?id="+notificationId;
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
				$scope.getMyCampaigns();
			};

			$scope.init();
	    }
	]).controller('CampaignNotificationsCtrlModal', ['toastr', '$scope', '$injector', '$http', '$filter',

		function (toastr, $scope, $injector, $http, $filter) {

			$scope.modalNotifications = $scope.user.viewNotifications;

			$scope.closeModal = function (reason) {

				$scope.notificationsModal.dismiss();
				Utilities.gotoCampaignNotificationsPage();
				//$modalInstance.close(reason);
			};
		}]);

	angular.module('BlurAdmin.pages.campaignNotifications').directive('fileModel', ['$parse', function ($parse) {
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

	//angular.module('App.filters', []).filter('companyFilter', [function () {
	//	return function (clients, selectedCompany) {
	//		if (!angular.isUndefined(clients) && !angular.isUndefined(selectedCompany) && selectedCompany.length > 0) {
	//			var tempClients = [];
	//			angular.forEach(selectedCompany, function (id) {
	//				angular.forEach(clients, function (client) {
	//					if (angular.equals(client.company.id, id)) {
	//						tempClients.push(client);
	//					}
	//				});
	//			});
	//			return tempClients;
	//		} else {
	//			return clients;
	//		}
	//	};
	//}]);