
	angular.module('MyCvTracker.pages.trackResume')

	    .controller('TrackResumeCtrl', ['toastr', '$scope', '$injector','localStorageService',

	        function (toastr, $scope, $injector,localStorageService) {

				var Utilities = $injector.get('Utilities');
				var AccountSvc = $injector.get('AccountSvc');
				var ResumesSvc = $injector.get('ResumesSvc');
				var TrackResumeSvc = $injector.get('TrackResumeSvc');
				var PaymentSvc = $injector.get('PaymentSvc');

				$scope.user = {
					myResumes: [],
                    myFavNotes : []
				};

				$scope.trackResumeObj = {
					toRecruiter: '',
					from: '',
                    targetList: '',
					subject: '',
					content: '',
					notes  : '',
					resumeId: '',
					userId: ''
				};

                $scope.currentNotesType = '';

				///////////////////////////////////Save Values on Refresh////////////////////////////////////////////
				$scope.trackResumeObj.toRecruiter = localStorageService.get('trackResumeObj.toRecruiter');
				$scope.trackResumeObj.from = localStorageService.get('trackResumeObj.from');
				$scope.trackResumeObj.recruiter = localStorageService.get('trackResumeObj.recruiter');
				$scope.trackResumeObj.agency = localStorageService.get('trackResumeObj.agency');
				$scope.trackResumeObj.subject = localStorageService.get('trackResumeObj.subject');
				$scope.trackResumeObj.content = localStorageService.get('trackResumeObj.content');
				$scope.trackResumeObj.notes = localStorageService.get('trackResumeObj.notes');
				$scope.trackResumeObj.resumeId = localStorageService.get('trackResumeObj.resumeId');
				$scope.trackResumeObj.userId = localStorageService.get('trackResumeObj.userId');
				$scope.trackResumeObj.targetList = localStorageService.get('trackResumeObj.targetList');


                $scope.$watch(function(scope) { return scope.trackResumeObj.toRecruiter },
					function(newValue, oldValue) {
						localStorageService.set('trackResumeObj.toRecruiter',newValue);
					}
				);

				$scope.$watch(function(scope) { return scope.trackResumeObj.recruiter },
					function(newValue, oldValue) {
						localStorageService.set('trackResumeObj.recruiter',newValue);
					}
				);

				$scope.$watch(function(scope) { return scope.trackResumeObj.agency },
					function(newValue, oldValue) {
						localStorageService.set('trackResumeObj.agency',newValue);
					}
				);

				$scope.$on('quickCV', function () {
					console.log('got the event');
					$scope.getMyResumes();
                });

				$scope.$watch(function(scope) { return scope.trackResumeObj.subject },
					function(newValue, oldValue) {
						localStorageService.set('trackResumeObj.subject',newValue);
					}
				);

				$scope.$watch(function(scope) { return scope.trackResumeObj.content },
					function(newValue, oldValue) {
						localStorageService.set('trackResumeObj.content',newValue);
					}
				);

				$scope.$watch(function(scope) { return scope.trackResumeObj.notes },
					function(newValue, oldValue) {
						localStorageService.set('trackResumeObj.notes',newValue);
					}
				);

				$scope.$watch(function(scope) { return scope.trackResumeObj.resumeId },
					function(newValue, oldValue) {
						localStorageService.set('trackResumeObj.resumeId',newValue);
					}
				);

				$scope.$watch(function(scope) { return scope.trackResumeObj.userId },
					function(newValue, oldValue) {
						localStorageService.set('trackResumeObj.userId',newValue);
					}
				);

				$scope.$watch(function(){
					return localStorageService.get('trackResumeObj.toRecruiter');
				}, function(value){
					$scope.trackResumeObj.toRecruiter = value;
				});

				$scope.$watch(function(){
					return localStorageService.get('trackResumeObj.from');
				}, function(value){
					$scope.trackResumeObj.from = value;
				});

				$scope.$watch(function(){
					return localStorageService.get('trackResumeObj.recruiter');
				}, function(value){
					$scope.trackResumeObj.recruiter = value;
				});

				$scope.$watch(function(){
					return localStorageService.get('trackResumeObj.agency');
				}, function(value){
					$scope.trackResumeObj.agency = value;
				});

				$scope.$watch(function(){
					return localStorageService.get('trackResumeObj.subject');
				}, function(value){
					$scope.trackResumeObj.subject = value;
				});

				$scope.$watch(function(){
					return localStorageService.get('trackResumeObj.content');
				}, function(value){
					$scope.trackResumeObj.content = value;
				});

				$scope.$watch(function(){
					return localStorageService.get('trackResumeObj.notes');
				}, function(value){
					$scope.trackResumeObj.notes = value;
				});

				$scope.$watch(function(){
					return localStorageService.get('trackResumeObj.resumeId');
				}, function(value){
					$scope.trackResumeObj.resumeId = value;
				});

				$scope.$watch(function(){
					return localStorageService.get('trackResumeObj.userId');
				}, function(value){
					$scope.trackResumeObj.userId = value;
				});

                $scope.$watch(function(){
                    return localStorageService.get('trackResumeObj.targetList');
                }, function(value){
                    $scope.trackResumeObj.targetList = value;
                });
				/////////////////////////////////////////////////////////////////////////////////////

				$scope.getUserDetails = function () {

					AccountSvc.getUser().then(

						function (userData) {

							$scope.user = userData;
							$scope.trackResumeObj.from = userData.userEmail;
							$scope.getMyResumes();
						},

						function (response) {
							toastr.error(Utilities.getAlerts(response.status));
						}
					);
				};

                $scope.getMyFavNotes = function () {

					TrackResumeSvc.getFavNotes().then(
                    	function (favNotes) {
                            $scope.user.myFavNotes = [];
                    		favNotes.forEach(function (favNote) {
								$scope.user.myFavNotes.push(favNote);
                            });
                        }

					);

                };

                $scope.getMyFavNote = function (favNoteToMatch) {

                    $scope.user.myFavNotes.forEach(function (favNote) {
                        if(favNote == favNoteToMatch){
							favNote.id = '';
                            $scope.trackResumeObj = favNote;
						}
                    });
                }


				$scope.getMyResumes = function () {

					$scope.user.myResumes = [];

					ResumesSvc.getAllMyResumes($scope.user.id).then(

						function (resumesData) {
							$scope.user.myResumes = resumesData;
						}
					);
				};

				$scope.postRequest = function (requestForm, requestModel) {

					if ( requestForm.$valid ) {

						requestModel.userId = $scope.user.id;
                        requestModel.notesType = $scope.currentNotesType;

						TrackResumeSvc.saveResumeTrackRequest(requestModel).then(

							function (resumeTrackRequestData) {
								toastr.success(Utilities.getAlerts('resumeTrackRequestSuccess'));
                                Utilities.gotoTrackResumePage();
							},
							function(data){
								if(data.response.message=='favNotesSaveLimitError'){
                                    toastr.error(Utilities.getAlerts('favNotesSaveLimitError'));
                                }
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
					//$scope.validateUserTick();
                    $scope.getMyFavNotes();

                };

				$scope.init();
	        }
	    ]);
