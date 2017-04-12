
    angular.module('BlurAdmin.pages.CvMarketing')

    	.factory('CvMarketingSvc', ['toastr', 'RestConfig', '$injector',

            function (toastr, RestConfig, $injector) {

                var Utilities = $injector.get('Utilities');

            	return  {

                    saveCvMarketingRequest: function (requestOb) {

                        var url = Utilities.getCvMarketingUrl();
                        return RestConfig.saveCvMarketingRequest(url, requestOb);
                    },

                    editCvMarketingRequest: function (requestOb) {
                        var url = Utilities.getCvMarketingEditUrl();
                        return RestConfig.editCvMarketingRequest(url, requestOb);
                    },

                    cloneCvMarketingRequest: function (requestOb) {
                        var url = Utilities.getCvMarketingCloneUrl();
                        return RestConfig.cloneCvMarketingRequest(url, requestOb);
                    },

                    deleteCvMarketingRequest: function (noteId) {
                        var url = Utilities.getCvMarketingDeleteUrl()+"?id=" + noteId;;
                        return RestConfig.deleteCvMarketingRequest(url);
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
