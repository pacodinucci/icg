
	angular.module('icg.resumes')

	    .controller('ResumesCtrl', ['$rootScope', '$scope', '$injector',

	        function ($rootScope, $scope, $injector) {            	

				var Utilities = $injector.get('Utilities');
				var AccountSvc = $injector.get('AccountSvc');
				var ResumesSvc = $injector.get('ResumesSvc');

				$scope.user = {
					myResumes: []
				};

				$scope.getUserDetails = function () {

					AccountSvc.getUser().then(

						function (userData) {

							$scope.user = userData;
							$scope.getMyResumes();
						},

						function (response) {
							$rootScope.addAlert(Utilities.getAlerts(response.status));
						}
					);
				};

				$scope.getMyResumes = function () {

					$scope.user.myResumes = [];
						
					ResumesSvc.getMyResumes($scope.user.userId).then(

						function (resumesData) {

							resumesData.forEach(function (resumeOb) {

								resumeOb.uploadedAt = Utilities.getFormattedDate(resumeOb.uploadedAt);
								$scope.user.myResumes.push(resumeOb);
							});
						}
					);
				};



				$scope.addNewResumeModal = {

				};


				$scope.addNewResume = function () {
					$scope.addNewResumeModal = ResumesSvc.getNewResumeModal($scope, 'AddNewResumeCtrl');
				};

				$scope.AddNewResumeCtrl = function ($scope) {

					$scope.newResume = {
						userId: '',
						resumeTitle: '',
						resumeType: '',
						resumeFile: '',
					};

					$scope.addResume = function (resumeForm, resumeModel) {

						if ( resumeForm.$valid ) {

							resumeModel.userId = $scope.user.userId;
							resumeModel.resumeFile = 'dsadsadsa';

							ResumesSvc.saveMyResume(resumeModel).then(

								function (resumeData) {
									$scope.closeModal();
									$rootScope.addAlert(Utilities.getAlerts('resumeAddedSuccess'));
									$scope.getMyResumes();
								},

								function (response) {
									$rootScope.addAlert(Utilities.getAlerts(response.status));
								}
							);
						}
					};

					$scope.closeModal = function () {
						$scope.addNewResumeModal.dismiss();
					};
				};


				$scope.init = function () {
					$scope.getUserDetails();
				};

				$scope.init();           
	        }
	    ]);
