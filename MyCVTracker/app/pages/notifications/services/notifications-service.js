

     angular.module('BlurAdmin.pages.notifications')

    	.factory('NotificationsSvc', ['toastr', 'RestConfig', '$injector',

            function (toastr, RestConfig, $injector) {
				var Utilities = $injector.get('Utilities');
				return {
					getMyNotifications: function (userId) {
						var url = Utilities.getMyNotificationsUrl();
						return RestConfig.getMyNotifications(url);
					},
					viewFullNotifications: function (notificationId) {
						var Utilities = $injector.get('Utilities');

						var url = Utilities.getViewNotificationsUrl()  + notificationId;
						return RestConfig.viewFullNotifications(url);
					},

					getViewNotificationsModal: function (scope, ctrlName) {

						var modalOpts = {
							templateUrl: 'app/pages/notifications/templates/view_notifications.html',
							controller: ctrlName,
							scope: scope
						};

						return $injector.get('$uibModal').open(modalOpts);

					}

				};
			}
        ]);
