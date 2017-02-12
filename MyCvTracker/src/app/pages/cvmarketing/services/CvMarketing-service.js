

    angular.module('BlurAdmin.pages.CvMarketing')

    	.factory('CvMarketingSvc', ['toastr', 'RestConfig', '$injector',

            function (toastr, RestConfig, $injector) {

                var Utilities = $injector.get('Utilities');

            	return  {

                    saveCvMarketingRequest: function (requestOb) {

                        var url = Utilities.getCvMarketingUrl();
                        return RestConfig.saveCvMarketingRequest(url, requestOb);
                    },

                    collectCV: function (trackingId) {

                        var url = Utilities.getcollectCVUrl()+'/'+trackingId;
                        return RestConfig.collectCV(url);
                    },

                    collectCVFromEmail: function (trackingId) {

                        var url = Utilities.getcollectCVFromMailUrl()+'/'+trackingId;
                        return RestConfig.collectCV(url);
                    }
            	}; 
            }
        ]);
