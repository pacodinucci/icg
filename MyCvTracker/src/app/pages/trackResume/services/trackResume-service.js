

    angular.module('MyCvTracker.pages.trackResume')

    	.factory('TrackResumeSvc', ['toastr', 'RestConfig', '$injector',

            function (toastr, RestConfig, $injector) {

                var Utilities = $injector.get('Utilities');

            	return  {

                    saveResumeTrackRequest: function (requestOb) {

                        var url = Utilities.getTrackResumeUrl();
                        return RestConfig.saveResumeTrackRequest(url, requestOb);
                    },

                    getFavNotes: function () {
                        var url = Utilities.getFavNotesUrl();
                        return RestConfig.getMyFavNotes(url);
                    }
            	};
            }
        ]);
