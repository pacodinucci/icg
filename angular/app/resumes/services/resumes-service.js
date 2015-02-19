

    angular.module('icg.resumes')

    	.factory('ResumesSvc', ['$rootScope', 'RestConfig', '$injector',

            function ($rootScope, RestConfig, $injector) {

                var Utilities = $injector.get('Utilities');

            	return  {

                    getMyResumes: function (userId) {

                        var url = Utilities.getMyResumesUrl() + '/' + userId;
                        return RestConfig.getMyResumes(url);
                    },

                    saveMyResume: function (userResumeOb) {

                        var url = Utilities.getMyResumesUrl();
                        return RestConfig.saveMyResume(url, userResumeOb);                        
                    },

                    getNewResumeModal: function (scope, ctrlName) {

                        var modalOpts = {
                            templateUrl: './app/resumes/templates/new_resume.html',
                            controller: ctrlName,
                            scope: scope
                        };

                        return $injector.get('$modal').open(modalOpts);
                    }
            	}; 
            }
        ]);
