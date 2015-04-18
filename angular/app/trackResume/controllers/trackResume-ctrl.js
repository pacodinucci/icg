
	angular.module('icg.trackResume')

	    .controller('TrackResumeCtrl', ['$rootScope', '$scope', '$injector',

	        function ($rootScope, $scope, $injector) {            	

				var Utilities = $injector.get('Utilities');
				var AccountSvc = $injector.get('AccountSvc');
				var ResumesSvc = $injector.get('ResumesSvc');
				var TrackResumeSvc = $injector.get('TrackResumeSvc');

				$scope.user = {
					myResumes: []
				};

				$scope.trackResume = {
					toRecruiter: '',
					recruiter: '',
					agency: '',
					subject: '',
					content: '',
					notes  : '',
					resumeId: '',
					userId: ''
				};

				$scope.getUserDetails = function () {

					AccountSvc.getUser().then(

						function (userData) {

							$scope.user = userData;
							$scope.trackResume.from = userData.userEmail;
							$scope.getMyResumes();
						},

						function (response) {
							$rootScope.addAlert(Utilities.getAlerts(response.status));
						}
					);
				};

				$scope.getMyResumes = function () {

					$scope.user.myResumes = [];
						
					ResumesSvc.getMyResumes($scope.user.id).then(

						function (resumesData) {
							$scope.user.myResumes = resumesData;
						}
					);
				};

			
				$scope.postRequest = function (requestForm, requestModel) {

					if ( requestForm.$valid ) {

						requestModel.userId = $scope.user.id;

						TrackResumeSvc.saveResumeTrackRequest(requestModel).then(

							function (resumeTrackRequestData) {
								$rootScope.addAlert(Utilities.getAlerts('resumeTrackRequestSuccess'));
								Utilities.gotoProfilePage();
							}
						);
					}
				};


				$scope.init = function () {
					$scope.getUserDetails();
				};

				$scope.init();           
	        }
	    ]);
