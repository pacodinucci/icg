
	angular.module('MyCvTracker.pages.CvMarketing')

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

                $scope.manualUpload = 0;

                $scope.specialValue = {
                    "id": "12345",
                    "value": "green"
                };

				$scope.CvMarketing = {
					subject: '',
					content: '',
					category: '',
					notes  : 'campaignType:<emailBrite>,campaignTemplate:<eventpromo>,campaignURL:<https://javacourse.eventbrite.com/?aff=cvtracker>,campaignTitle:<Java Course>',
					phoneNo : '',
					resumeId: '',
					userAccount: '',
					userPassword: '',
					trackingNotescreated: '0',
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

							console.log("campaign Data" , campaignsData);
								$scope.user.myCampaigns = campaignsData;
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

				$scope.update = function (mycampaign,campaignData) {

					console.log("campaign to update " , mycampaign);

                    $scope.user.myCampaigns.forEach(function (campaign) {

                    	console.log("please match ", campaign.id)
                    	if(mycampaign == campaign.id){
                    		console.log("matched ");
                            $scope.CvMarketing = campaign;
						}
                    });

                    $scope.user.myCampaigns = [];

                    NotificationsSvc.getMyCampaigns().then(

                        function (campaignsData) {

                            console.log("campaign Data" , campaignsData);
                            $scope.user.myCampaigns = campaignsData;

                        }
                    );

                }

                $scope.loadResume = function (resumeLookUp) {

                    $scope.user.myResumes = [];

                    ResumesSvc.getOtherResumes($scope.user.id,resumeLookUp).then(

                        function (resumesData) {
                            $scope.user.myResumes = resumesData;
                        }
                    );

                }

				$scope.postRequest = function (requestForm, requestModel) {

                    if ( requestForm.$valid ) {

                        requestModel.userId = $scope.user.id;

                        CvMarketingSvc.saveCvMarketingRequest(requestModel).then(

                            function (CvMarketingRequestData) {
                                toastr.success(Utilities.getAlerts('CvMarketingRequestSuccess'));
                                Utilities.gotoProfilePage();
                            }
                        );
                    }
                };

                $scope.editRequest = function (requestForm, requestModel) {

                    if ( requestForm.$valid ) {

                        requestModel.userId = $scope.user.id;

                        CvMarketingSvc.editCvMarketingRequest(requestModel).then(

                            function (CvMarketingRequestData) {
                                toastr.success(Utilities.getAlerts('CvMarketingRequestSuccess'));
                                Utilities.gotoProfilePage();
                            }
                        );
                    }
                };

                $scope.bulkUpdate = function (requestForm, requestModel) {

                    if ( requestForm.$valid ) {

                        requestModel.userId = $scope.user.id;

                        CvMarketingSvc.bulkUpdateMarketingRequest(requestModel).then(

                            function (CvMarketingRequestData) {
                                toastr.success(Utilities.getAlerts('CvMarketingRequestSuccess'));
                                Utilities.gotoProfilePage();
                            }
                        );
                    }
                };

                $scope.cloneRequest = function (requestForm, requestModel) {

                    if ( requestForm.$valid ) {

                        requestModel.userId = $scope.user.id;

                        CvMarketingSvc.cloneCvMarketingRequest(requestModel).then(

                            function (CvMarketingRequestData) {
                                toastr.success(Utilities.getAlerts('CvMarketingRequestSuccess'));
                                Utilities.gotoProfilePage();
                            }
                        );
                    }
                };

                $scope.deleteRequest = function (requestForm, requestModel) {

                    if ( requestForm.$valid ) {

                        requestModel.userId = $scope.user.id;

                        CvMarketingSvc.deleteCvMarketingRequest(requestModel.id).then(

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
