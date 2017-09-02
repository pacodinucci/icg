
	angular.module('BlurAdmin.pages.trackBulkResume')

	    .controller('TrackBulkResumeCtrl', ['toastr', '$scope', '$injector','localStorageService',

	        function (toastr, $scope, $injector,localStorageService) {

				var Utilities = $injector.get('Utilities');
				var AccountSvc = $injector.get('AccountSvc');
				var ResumesSvc = $injector.get('ResumesSvc');
				var TrackResumeSvc = $injector.get('TrackResumeSvc');
				var PaymentSvc = $injector.get('PaymentSvc');

				$scope.user = {
					myResumes: []
				};

				$scope.trackBulkResumeObj = {
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
				$scope.trackBulkResumeObj.from = localStorageService.get('trackBulkResumeObj.from');
				$scope.trackBulkResumeObj.targetList = localStorageService.get('trackBulkResumeObj.targetList');
				$scope.trackBulkResumeObj.subject = localStorageService.get('trackBulkResumeObj.subject');
				$scope.trackBulkResumeObj.content = localStorageService.get('trackBulkResumeObj.content');
				$scope.trackBulkResumeObj.notes = localStorageService.get('trackBulkResumeObj.notes');
				$scope.trackBulkResumeObj.resumeId = localStorageService.get('trackBulkResumeObj.resumeId');
				$scope.trackBulkResumeObj.userId = localStorageService.get('trackBulkResumeObj.userId');

				$scope.$watch(function(scope) { return scope.trackBulkResumeObj.toRecruiter },
					function(newValue, oldValue) {
						localStorageService.set('trackBulkResumeObj.toRecruiter',newValue);
					}
				);

				$scope.$watch(function(scope) { return scope.trackBulkResumeObj.targetList },
					function(newValue, oldValue) {
						localStorageService.set('trackBulkResumeObj.targetList',newValue);
					}
				);


				$scope.$watch(function(scope) { return scope.trackBulkResumeObj.subject },
					function(newValue, oldValue) {
						localStorageService.set('trackBulkResumeObj.subject',newValue);
					}
				);

				$scope.$watch(function(scope) { return scope.trackBulkResumeObj.content },
					function(newValue, oldValue) {
						localStorageService.set('trackBulkResumeObj.content',newValue);
					}
				);

				$scope.$watch(function(scope) { return scope.trackBulkResumeObj.notes },
					function(newValue, oldValue) {
						localStorageService.set('trackBulkResumeObj.notes',newValue);
					}
				);

				$scope.$watch(function(scope) { return scope.trackBulkResumeObj.resumeId },
					function(newValue, oldValue) {
						localStorageService.set('trackBulkResumeObj.resumeId',newValue);
					}
				);

				$scope.$watch(function(scope) { return scope.trackBulkResumeObj.userId },
					function(newValue, oldValue) {
						localStorageService.set('trackBulkResumeObj.userId',newValue);
					}
				);

				$scope.$watch(function(){
					return localStorageService.get('trackBulkResumeObj.toRecruiter');
				}, function(value){
					$scope.trackBulkResumeObj.toRecruiter = value;
				});

				$scope.$watch(function(){
					return localStorageService.get('trackBulkResumeObj.from');
				}, function(value){
					$scope.trackBulkResumeObj.from = value;
				});

                $scope.$watch(function(){
                    return localStorageService.get('trackBulkResumeObj.targetList');
                }, function(value){
                    $scope.trackBulkResumeObj.targetList = value;
                });


                $scope.$watch(function(){
					return localStorageService.get('trackBulkResumeObj.subject');
				}, function(value){
					$scope.trackBulkResumeObj.subject = value;
				});

				$scope.$watch(function(){
					return localStorageService.get('trackBulkResumeObj.content');
				}, function(value){
					$scope.trackBulkResumeObj.content = value;
				});

				$scope.$watch(function(){
					return localStorageService.get('trackBulkResumeObj.notes');
				}, function(value){
					$scope.trackBulkResumeObj.notes = value;
				});

				$scope.$watch(function(){
					return localStorageService.get('trackBulkResumeObj.resumeId');
				}, function(value){
					$scope.trackBulkResumeObj.resumeId = value;
				});

				$scope.$watch(function(){
					return localStorageService.get('trackBulkResumeObj.userId');
				}, function(value){
					$scope.trackBulkResumeObj.userId = value;
				});
				/////////////////////////////////////////////////////////////////////////////////////

				$scope.getUserDetails = function () {

					AccountSvc.getUser().then(

						function (userData) {

							$scope.user = userData;
							$scope.trackBulkResumeObj.from = userData.userEmail;
							$scope.getMyResumes();
						},

						function (response) {
							toastr.error(Utilities.getAlerts(response.status));
						}
					);
				};

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

						TrackResumeSvc.saveTrackBulkResumeRequest(requestModel).then(

							function (resumeTrackRequestData) {
								toastr.success(Utilities.getAlerts('resumeTrackRequestSuccess'));
                                Utilities.gotoTrackBulkResumePage();
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
					$scope.validateUserTick();
                };

				$scope.init();
	        }
	    ]);
