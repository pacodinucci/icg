
	angular.module('ITCG.pages.jobs')

		.controller('JobsCtrl', ['toastr', '$scope', '$injector','$http','$location','$filter','Constants','Authorization',

			function (toastr, $scope, $injector,$http,$location,$filter,Constants,Authorization) {

				$scope.allJobs = [];

				var JobsSvc = $injector.get('JobsSvc');
				var Utilities = $injector.get('Utilities');

				$scope.user = {

				};

                $scope.dragData = [];

                $scope.basicConfig = {
                    core: {
                        multiple: false,
                        check_callback: true,
                        worker: true
                    },
                    'types': {
                        'folder': {
                            'icon': 'ion-navicon-round'
                        },
                        'default': {
                            'icon': 'ion-ios-minus-empty'
                        }
                    },
                    'plugins': ['types'],
                    'version': 1
                };

				$scope.disableEditor = true;

				$scope.viewJobEditor= {};

				$scope.isAdmin = false;

                $scope.searchMode = false;

				$scope.isFromMail = false;

				$scope.selectedJob = JobsSvc.getViewJobData();

				$scope.currentPage = 1;
				$scope.pageSize = 10;
				$scope.totalJobs = 0;

				$scope.searchText = '';

				$scope.jobTypeList = Constants.jobTypeDropDown;

				$scope.jobsSearchCriteriaSortDropDown = Constants.jobsSearchCriteriaSortDropDown;
				$scope.jobStatustDropDown = Constants.jobStatusText;

				$scope.JobsSearch = {
					pageNumber :'',
					pageSize: '',
					criteriaDetails:'',
					criteriaType:'',
					sortyBy: 1
				};

				$scope.getJobStatus = function (jobStatus) {
					var jobStatusTextArray = Constants.jobStatusText;
					var jobStatusTextLength = jobStatusTextArray.length;
					var jobStatusText = '';
					for (var i = 0; i < jobStatusTextLength; i++) {
						var obj = jobStatusTextArray[i];
						if(obj.id == jobStatus){
							jobStatusText = obj.name;
						}
					}
					return jobStatusText;
				};

				//////////////////////////////////////////////////////////////////////////////////////
				//Listing Jobs Function
				$scope.getAllJobs = function () {

					$scope.allJobs = [];
					JobsSvc.getJobs($scope.JobsSearch).then(

						function (jobsData) {
							$scope.totalJobs = jobsData.totalElements;
							jobsData.content.forEach(function (jobOb) {
								jobOb.createdDate = $filter('date')(new Date(jobOb.createdDate), 'EEE,MMM dd yyyy HH:mm:ss');
								$scope.allJobs.push(jobOb);
							});
						},
                        function (response) {
                            toastr.error(Utilities.getAlerts(response.status));
                        }
					);
				};

				$scope.getCitiesList = function () {
					$scope.citiesList = [];
					JobsSvc.getCitiesList().then(
						function (response) {
							response.forEach(function (obj) {
								$scope.citiesList.push(obj);
							});
						}
					);
				};

				$scope.searchForJobs = function () {
                    $scope.searchMode = true;
					$scope.JobsSearch.pageNumber=  0;
					$scope.JobsSearch.pageSize= $scope.pageSize;
					$scope.JobsSearch.criteriaDetails= $scope.searchText;
					$scope.JobsSearch.criteriaType= Constants.jobsSearchCriteriaType.JOBS_CRITERIA_TYPE_JOB_TITLE;
					$scope.getAllJobs();
				};

				$scope.updateSortedJobs = function () {
					$scope.JobsSearch.pageNumber=  0;
					$scope.JobsSearch.pageSize= $scope.pageSize;
					$scope.getAllJobs();
				};

                $scope.slideToggle = function (input) {
                    $(input).find('div').slideToggle();
                };

                $scope.getJobCriteriaList = function () {

                    $scope.jobCriteriaList = [];

                    JobsSvc.getJobCriteriaList().then(

                        function (response) {
                            response.forEach(function (jobCriteriaResponseObj) {
                                // obj.open = true;
                                // $scope.jobCriteriaList.push(obj);
                                var jobCriteriaObj = {
                                    "id": jobCriteriaResponseObj.id,
                                    "parent": "#",
                                    "type": "folder",
                                    "text": jobCriteriaResponseObj.name,
                                    "state": {
                                        "opened": true
                                    }
                                };
                                $scope.dragData.push(jobCriteriaObj);
                                jobCriteriaResponseObj.jobCriteriaDetailsList.forEach(function (jobCriteriaDetailsResponseObj) {
                                    var jobCriteriaDetailsObj = {
                                        "id": jobCriteriaDetailsResponseObj.id,
                                        "parent": jobCriteriaResponseObj.id,
                                        "text": jobCriteriaDetailsResponseObj.name,
                                        "state": {
                                            "opened": true
                                        }
                                    };
                                    $scope.dragData.push(jobCriteriaDetailsObj);
                                });
                            });
                        },
                        function (response) {
                            toastr.error(Utilities.getAlerts(response.status));
                        }
                    );
                };

				$scope.pageChanged = function(newPage) {
					$scope.JobsSearch.pageNumber=  newPage -1;
					$scope.JobsSearch.pageSize= $scope.pageSize;
					$scope.getAllJobs();
				};

                $scope.selectNode = function(event,selected) {
                	if(selected.node.parent != '#'){
                        $scope.searchMode = true;
                			var jobCriteriaDetails = {
                				id:selected.node.id,
								name:selected.node.text
							};
                			var jobCriteria = {id:selected.node.parent};
                        $scope.filterJobs(jobCriteriaDetails,jobCriteria);
					}
                }

				$scope.filterJobs = function (jobCriteriaDetails,jobCriteria) {
					$scope.JobsSearch.pageNumber=  0;
					$scope.JobsSearch.pageSize= $scope.pageSize;
					if(jobCriteria.id == Constants.jobsSearchCriteriaType.JOBS_CRITERIA_TYPE_LOCATION || jobCriteria.id == Constants.jobsSearchCriteriaType.JOBS_CRITERIA_TYPE_RECRUITER){
						$scope.JobsSearch.criteriaDetails= jobCriteriaDetails.name;
					}
					else{
						$scope.JobsSearch.criteriaDetails= jobCriteriaDetails.id;
					}
					$scope.JobsSearch.criteriaType= jobCriteria.id;
					$scope.getAllJobs();
				};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

				/////////////////////////////////////////////////////////////////////////////////////

				$scope.viewJobsDetailsModel = function (jobDetails, index) {

					$scope.index = index;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
					JobsSvc.setViewJobData(jobDetails);
					// Utilities.gotoViewJobPage();
				};

				$scope.getUserDetails = function () {
                    if($scope.user.userRole == 'ADMIN'){
                        $scope.isAdmin = true;
                        $scope.disableEditor = false;
                        $scope.viewJobEditor= {
                            "height": "370",
                            "removePlugins": "resize"
                        };
                    }else{
                        $scope.isAdmin = false;
                        $scope.disableEditor = true;
                        $scope.viewJobEditor= {
                            "height": "470",
                            "removePlugins": "toolbar,resize",
                            "readOnly" : "true"
                        };
                    }
				};

				$scope.init = function () {
					$scope.searchMode = false;
					$scope.getUserDetails();
					$scope.JobsSearch.pageNumber=  0;
					$scope.JobsSearch.pageSize= $scope.pageSize;
					$scope.getAllJobs();
                    $scope.getJobCriteriaList();
				};

                $scope.resetJobSearch = function () {
                    $scope.JobsSearch = {
                        pageNumber :'',
                        pageSize: '',
                        criteriaDetails:'',
                        criteriaType:'',
                        sortyBy: 1
                    };
                    $scope.searchText = '';
                    $scope.searchMode = false;
                    $scope.JobsSearch.pageNumber=  0;
                    $scope.JobsSearch.pageSize= $scope.pageSize;
                    $scope.getAllJobs();
                };

				$scope.initJiewPage = function () {
					$scope.selectedJob.jobLocation = parseInt($scope.selectedJob.jobLocation, 10);
					$scope.selectedJob.jobType = parseInt($scope.selectedJob.jobType, 10);
					$scope.selectedJob.salaryRange = parseInt($scope.selectedJob.salaryRange, 10);
					$scope.getCitiesList();
					$scope.formProcessing = true;
					$scope.getUserDetails();
					var key = $location.search().key;
					if(key!=null){
						$scope.isFromMail = true;
						JobsSvc.viewJob(key).then(
							function (obj) {
								$scope.selectedJob = obj;
								$scope.formProcessing = false;
							}
						);
					}
				};

				$scope.JobsCtrl = function ($scope) {
					$scope.applyJob = function(){
						$scope.formProcessing = true;
						JobsSvc.applyJob($scope.selectedJob).then(
							function (obj) {
								$scope.closeModal();
								// Utilities.gotoJobPage();
								toastr.error(Utilities.getAlerts('applyJobSucsessMessage'));
								$scope.formProcessing = false;
							}
						);
					};
					$scope.editJob = function(){
						$scope.formProcessing = true;
						JobsSvc.saveJob($scope.selectedJob).then(
							function (obj) {
								$scope.closeModal();
								toastr.error(Utilities.getAlerts('jobContentSaveSucess'));
								$scope.formProcessing = false;
							}
						);
					};
					$scope.activateJob = function(action,successMessage){
						$scope.formProcessing = true;
						JobsSvc.activateJob(action,$scope.selectedJob).then(
							function (obj) {
								$scope.closeModal();
								Utilities.gotoJobPage();
								toastr.error(Utilities.getAlerts(successMessage));
								$scope.formProcessing = false;
							}
						);
					};
					$scope.modelFunction = function () {
						if($scope.modelType=='EditJob'){
							$scope.editJob();
						}
						if($scope.modelType=='ApplyJob'){
							$scope.applyJob();
						}
						if($scope.modelType=='ApproveJob'){
							$scope.activateJob('approve','approveJobSuccessMessage');
						}
						if($scope.modelType=='RejectJob'){
							$scope.activateJob('rejected','rejectJobSuccessMessage');
						}
					};
				};

				$scope.openAdvancedSearchModel = function () {
					$scope.jobModal = JobsSvc.getAdvancedSearchModal($scope, $scope.JobsCtrl);
					$scope.modelType='AdvancedSearch';
				};

				$scope.openApplyJobModel = function () {
					$scope.jobModal = JobsSvc.getWarningModal($scope, $scope.JobsCtrl);
					$scope.id=$scope.selectedJob.id;
					$scope.modelType='ApplyJob';
					$scope.modelTitle = Utilities.getAlerts('applyJobTitle').message;
					$scope.modelMessage = Utilities.getAlerts('applyJobMessage').message;
				};

				$scope.openEditJobModel = function () {
					$scope.jobModal = JobsSvc.getWarningModal($scope, $scope.JobsCtrl);
					$scope.id=$scope.selectedJob.id;
					$scope.modelType='EditJob';
					$scope.modelTitle = Utilities.getAlerts('editJobTitle').message;
					$scope.modelMessage = Utilities.getAlerts('editJobMessage').message;
				};

				$scope.openApproveJobModel = function () {
					$scope.jobModal = JobsSvc.getWarningModal($scope, $scope.JobsCtrl);
					$scope.id=$scope.selectedJob.id;
					$scope.modelType='ApproveJob';
					$scope.modelTitle = Utilities.getAlerts('approveJobTitle').message;
					$scope.modelMessage = Utilities.getAlerts('approveJobMessage').message;
				};

				$scope.openRejectJobModel = function () {
					$scope.jobModal = JobsSvc.getWarningModal($scope, $scope.JobsCtrl);
					$scope.id=$scope.selectedJob.id;
					$scope.modelType='RejectJob';
					$scope.modelTitle = Utilities.getAlerts('rejectJobTitle').message;
					$scope.modelMessage = Utilities.getAlerts('rejectJobMessage').message;
				};

				$scope.backButton = function () {
					Utilities.gotoJobPage();
				};

				$scope.closeModal = function () {
					$scope.jobModal.dismiss();
				};

				$scope.redirectToProfilePage = function () {

					var key = $location.search().key;

					JobsSvc.activateJob(key,2,$scope.selectedJob).then(
						function () {

							toastr.error(Utilities.getAlerts('jobActivateSaveSucess'));
						},
						function (response) {
							toastr.error(Utilities.getAlerts(response.status));

						}
					);
				};
	        }
	    ]);
