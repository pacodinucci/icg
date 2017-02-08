

     angular.module('BlurAdmin.pages.notifications')

    	.factory('NotificationsSvc', ['toastr', 'RestConfig', '$injector',

            function (toastr, RestConfig, $injector) {
				var Utilities = $injector.get('Utilities');
				return {
					getMyNotifications: function (userId) {
						var url = Utilities.getMyNotificationsUrl();
						return RestConfig.getMyNotifications(url);
					},
					viewFullNotifications: function (notificationId,isLimited) {
						var Utilities = $injector.get('Utilities');

						var url = Utilities.getViewNotificationsUrl()  + notificationId + '&isLimited=' + isLimited;
						return RestConfig.viewFullNotifications(url);
					},

					getViewNotificationsModal: function (scope, ctrlName) {

						var modalOpts = {
							templateUrl: 'app/pages/notifications/templates/view_notifications.html',
							controller: ctrlName,
                            size: 'lg',
							scope: scope
						};

						return $injector.get('$uibModal').open(modalOpts);

					}

				};
			}
        ]);
