

    angular.module('icg.notifications')

    	.factory('NotificationsSvc', ['$rootScope', 'RestConfig', '$injector',

            function ($rootScope, RestConfig, $injector) {
		    		var Utilities = $injector.get('Utilities');
		        	return  {
		        		getMyNotifications: function (userId) {
		                    var url = Utilities.getMyNotificationsUrl();
		                    return RestConfig.getMyNotifications(url);
		                }
		        	}; 	
            }
        ]);
