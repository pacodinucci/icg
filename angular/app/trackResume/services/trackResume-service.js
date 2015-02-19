

    angular.module('icg.trackResume')

    	.factory('TrackResumeSvc', ['$rootScope', 'RestConfig', '$injector',

            function ($rootScope, RestConfig, $injector) {

                var Utilities = $injector.get('Utilities');

            	return  {

                    saveResumeTrackRequest: function (requestOb) {

                        var url = Utilities.getTrackResumeUrl();
                        return RestConfig.saveResumeTrackRequest(url, requestOb);
                    }
            	}; 
            }
        ]);
