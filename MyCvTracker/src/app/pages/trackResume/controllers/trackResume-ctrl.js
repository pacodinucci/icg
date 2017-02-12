
	angular.module('BlurAdmin.pages.trackResume')

	    .controller('TrackResumeCtrl', ['toastr', '$scope', '$injector',

	        function (toastr, $scope, $injector) {

				var Utilities = $injector.get('Utilities');
				var AccountSvc = $injector.get('AccountSvc');
				var ResumesSvc = $injector.get('ResumesSvc');
				var TrackResumeSvc = $injector.get('TrackResumeSvc');
				var PaymentSvc = $injector.get('PaymentSvc');

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
							toastr.error(Utilities.getAlerts(response.status));
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
								toastr.error(Utilities.getAlerts('resumeTrackRequestSuccess'));
								Utilities.gotoProfilePage();
							}
						);
				}
				};

				$scope.getUserTick = function () {
					$scope.userTick = null;
					PaymentSvc.getUserTick().then(
						function (data) {
							$scope.userTick = data;
						}
					);
				};

				$scope.validateUserTick = function () {
					var PaymentSvc = $injector.get('PaymentSvc');
					PaymentSvc.validateUserTickNumber().then(
						function (resume) {
						},
						function (response) {
							toastr.error(Utilities.getAlerts('userTickException'));
							Utilities.gotoPaymentPage();
						}
					);
				};


				$scope.init = function () {
					$scope.getUserDetails();
					$scope.getUserTick();
					$scope.validateUserTick();
				};

				$scope.init();
	        }
	    ]);
