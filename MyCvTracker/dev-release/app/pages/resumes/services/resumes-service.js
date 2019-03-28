

    angular.module('MyCvTracker.pages.resumes')

    	.factory('ResumesSvc', ['toastr', 'RestConfig', '$injector',

            function (toastr, RestConfig, $injector) {

                var Utilities = $injector.get('Utilities');

            	return  {

                    getAllMyResumes: function (userId) {

                        var url = Utilities.getAllMyResumesUrl();
                        return RestConfig.getMyResumes(url);
                    },
                    getMyResumes: function (userId) {

                        var url = Utilities.getMyResumesUrl();
                        return RestConfig.getMyResumes(url);
                    },

                    getOtherResumes: function (userId,userEmailAddress) {

                        var url = Utilities.getOtherResumesUrl() + "?userEmailAddress="+ userEmailAddress ;
                        return RestConfig.getMyResumes(url);
                    },

                    saveMyResume: function (userResumeOb) {

                        var url = Utilities.getSaveResumesUrl();
                        return RestConfig.saveMyResume(url, userResumeOb);                        
                    },
                    deleteMyResume: function (requestObj) {

                        var url = Utilities.geDeleteResumesUrl();
                        return RestConfig.deleteMyResume(url, requestObj);
                    },
                    
                    findMyResume: function (id) {

                    	var url = Utilities.getFindResumeUrl() + id;
                        return RestConfig.findMyResumes(url);                        
                    },
                    
                    downloadMyResume: function (id) {

                    	var url = Utilities.getDownloadResumeUrl() + id;
                    	return RestConfig.downloadMyResume(url);           
                    },

                    getQuickUploadResumeModal: function (scope, ctrlName) {

                        var modalOpts = {
                            templateUrl: 'app/pages/resumes/templates/quick_upload_resume.html',
                            controller: ctrlName,
                            scope: scope
                        };

                        return $injector.get('$uibModal').open(modalOpts);
                    },
                    getNewResumeModal: function (scope, ctrlName) {

                        var modalOpts = {
                            templateUrl: 'app/pages/resumes/templates/new_resume.html',
                            controller: ctrlName,
                            scope: scope
                        };

                        return $injector.get('$uibModal').open(modalOpts);
                    },
                    getEditResumeModal: function (scope, ctrlName) {

                        var modalOpts = {
                            templateUrl: 'app/pages/resumes/templates/edit_resume.html',
                            controller: ctrlName,
                            scope: scope
                        };

                        return $injector.get('$uibModal').open(modalOpts);
                    },
                    getWarningModal: function (scope, ctrlName) {

                        var modalOpts = {
                            templateUrl: 'app/pages/resumes/templates/warning.html',
                            controller: ctrlName,
                            scope: scope
                        };

                        return $injector.get('$uibModal').open(modalOpts);
                    }
            	}; 
            }
        ]);
