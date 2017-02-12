
    angular.module('ICTG.pages.jobs')

        .factory('JobsSvc', ['toastr', 'RESTSvc', '$injector','Utilities',

            function (toastr, RESTSvc, $injector,Utilities) {

                var viewJobData = {};
                function setViewJobData(data) {
                    viewJobData = data;
                }
                function getViewJobData() {
                    return viewJobData;
                }

                return  {

                    getJobs: function (jobsSearchObj) {

                        var url = Utilities.getJobsListUrl();
                        return RESTSvc.put(url,jobsSearchObj);
                    },

                    getJobCriteriaList: function (currentPage,pageSize) {

                        var url = Utilities.getJobCriteriaListUrl();
                        return RESTSvc.get(url);
                    },

                    getCitiesList: function () {

                        var url = Utilities.getCitiesListUrl();
                        return RESTSvc.get(url);
                    },

                    viewJob: function (key) {

                        var url = Utilities.getViewJobUrl();
                        return RESTSvc.get(url,key);
                    },

                    activateJob: function (actionParam,object) {

                        var url = Utilities.getActivateJobUrl();
                        return RESTSvc.get(url,actionParam,object);
                    },

                    getViewJobDetailsModal: function (scope, ctrlName) {

                        var modalOpts = {
                            templateUrl: '/app/pages/jobs/templates/view_job.html',
                            controller: ctrlName,
                            scope: scope
                        };

                        return $injector.get('$uibModal').open(modalOpts);

                    },

                    saveJob: function (obj) {

                        var url = Utilities.getEditJobUrl();
                        return RESTSvc.post(url, obj);
                    },

                    getWarningModal: function (scope, ctrlName) {

                        var modalOpts = {
                            templateUrl: '/app/pages/resumes/templates/warning.html',
                            controller: ctrlName,
                            scope: scope
                        };

                        return $injector.get('$uibModal').open(modalOpts);
                    },

                    applyJob: function (obj) {

                        var url = Utilities.getApplyJobUrl();
                        return RESTSvc.post(url, obj);
                    },

                    getEditJobModal: function (scope, ctrlName) {

                        var modalOpts = {
                            templateUrl: '/app/pages/jobs/templates/edit_job.html',
                            controller: ctrlName,
                            scope: scope
                        };

                        return $injector.get('$uibModal').open(modalOpts);

                    },
                    getAdvancedSearchModal: function (scope, ctrlName) {

                        var modalOpts = {
                            templateUrl: '/app/pages/jobs/templates/advanced_search.html',
                            controller: ctrlName,
                            scope: scope
                        };

                        return $injector.get('$uibModal').open(modalOpts);

                    },
                    setViewJobData: setViewJobData,
                    getViewJobData: getViewJobData
                };
            }
        ]);
