
	angular.module('BlurAdmin.pages.CvMarketing')

	    .controller('CvMarketingCtrl', ['toastr', '$scope', '$injector','$location',

	        function (toastr, $scope, $injector,$location) {

				var Utilities = $injector.get('Utilities');
				var AccountSvc = $injector.get('AccountSvc');
				var ResumesSvc = $injector.get('ResumesSvc');
				var CvMarketingSvc = $injector.get('CvMarketingSvc');
				var NotificationsSvc = $injector.get('CampaignNotificationsSvc');

				$scope.user = {
					myResumes: [],
					myCampaigns : []
				};

				$scope.CvMarketing = {
					subject: '',
					content: '',
					category: '',
					notes  : '',
					phoneNo : '',
					resumeId: '',
					userAccount: '',
					userPassword: '',
					target: '',
					userId: ''
				};

				$scope.getUserDetails = function () {

					AccountSvc.getUser().then(

						function (userData) {

							$scope.user = userData;
							$scope.getMyResumes();
						},

						function (response) {
							toastr.error(Utilities.getAlerts(response.status));
						}
					);
				};

				//Listing Notifications Function
				$scope.getMyCampaigns = function () {

					$scope.user.myCampaigns = [];

					NotificationsSvc.getMyCampaigns().then(

						function (campaignsData) {

							campaignsData.forEach(function (campaigns) {
								$scope.user.myCampaigns.push(campaigns);
							});
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

						CvMarketingSvc.saveCvMarketingRequest(requestModel).then(

							function (CvMarketingRequestData) {
								toastr.error(Utilities.getAlerts('CvMarketingRequestSuccess'));
								Utilities.gotoProfilePage();
							}
						);
				}
				};


				$scope.init = function () {
					$scope.getUserDetails();
					$scope.getMyCampaigns();
				};

				$scope.callCollectCVApi = function () {
					var trackingId = $location.search().trackingId;
					CvMarketingSvc.collectCV(trackingId).then(

						function (obj) {
							console.log('sucess');
						}
					);
				};

				$scope.callCollectCVFromMailApi = function () {
					var trackingId = $location.search().trackingId;
					CvMarketingSvc.collectCVFromEmail(trackingId).then(

						function (obj) {
							console.log('sucess');
						}
					);
				};

				$scope.init();           
	        }
	    ]);
