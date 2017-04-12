

     angular.module('BlurAdmin.pages.campaignNotifications')

    	.factory('CampaignNotificationsSvc', ['toastr', 'RestConfig', '$injector',

            function (toastr, RestConfig, $injector) {
				var Utilities = $injector.get('Utilities');
				return {
					getMyNotifications: function (userId) {
						var url = Utilities.getMyCampaignNotificationsUrl();
						return RestConfig.getMyNotifications(url);
					},
					getMyCampaigns: function (userId) {
						var url = Utilities.getMyCampaignsUrl();
						return RestConfig.getMyCampaigns(url);
					},
					viewFullNotifications: function (notificationId) {
						var Utilities = $injector.get('Utilities');

						var url = Utilities.getViewCampaignNotificationsUrl()  + notificationId;
						return RestConfig.viewFullNotifications(url);
					},

					getViewNotificationsModal: function (scope, ctrlName) {

						var modalOpts = {
							templateUrl: '/app/pages/campaignNotifications/templates/campaign_view_notifications.html',
							controller: ctrlName,
                            size: 'lg',
							scope: scope
						};

						return $injector.get('$uibModal').open(modalOpts);

					}

				};
			}
        ]);
