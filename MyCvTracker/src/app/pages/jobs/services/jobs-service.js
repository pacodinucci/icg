
    angular.module('BlurAdmin.pages.jobs')

        .factory('JobsSvc', ['toastr', 'RestConfig', '$injector','Utilities',

            function (toastr, RestConfig, $injector,Utilities) {

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
                        return RestConfig.getJobs(url,jobsSearchObj);
                    },

                    getJobCriteriaList: function (currentPage,pageSize) {

                        var url = Utilities.getJobCriteriaListUrl();
                        return RestConfig.getJobCriteriaList(url);
                    },

                    getCitiesList: function () {

                        var url = Utilities.getCitiesListUrl();
                        return RestConfig.getCitiesList(url);
                    },

                    viewJob: function (key) {

                        var url = Utilities.getViewJobUrl();
                        return RestConfig.viewJob(url,key);
                    },

                    activateJob: function (actionParam,object) {

                        var url = Utilities.getActivateJobUrl();
                        return RestConfig.activateJob(url,actionParam,object);
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
                        return RestConfig.saveJob(url, obj);
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
                        return RestConfig.applyJob(url, obj);
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
