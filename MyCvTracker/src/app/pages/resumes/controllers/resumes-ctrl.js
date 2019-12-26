
	angular.module('MyCvTracker.pages.resumes')

	    .controller('ResumesCtrl', ['toastr','$rootScope', '$scope', '$injector','$http',

	        function (toastr, $rootScope, $scope, $injector,$http) {
	    		// Variables initialization 
				var Utilities = $injector.get('Utilities');
				var AccountSvc = $injector.get('AccountSvc');
				var ResumesSvc = $injector.get('ResumesSvc');

				//Used scopes
				$scope.resumeModal = {};
				$scope.user = {
					myResumes: []
				};

				//Get User Details Function
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
				//////////////////////////////////////////////////////////////////////////////////////
				//Listing Resumes Function
				$scope.getMyResumes = function () {

					$scope.user.myResumes = [];
						
					ResumesSvc.getMyResumes($scope.user.id).then(

						function (resumesData) {

							resumesData.forEach(function (resumeOb) {

								resumeOb.uploadedAt = Utilities.getFormattedDate(resumeOb.uploadedAt);
								$scope.user.myResumes.push(resumeOb);
							});
						}
					);
				};
				/////////////////////////////////////////////////////////////////////////////////////
				//open new Resume Model Function
				$scope.addNewResumeModel = function () {

					$scope.resumeModal = ResumesSvc.getNewResumeModal($scope, 'ResumeCtrl');
					$scope.myFile=null;
					$scope.id=null;
					$scope.resumeTitle=null;
					$scope.resumeType=null;
				};

                /////////////////////////////////////////////////////////////////////////////////////
                //open new Resume Model Function
                $scope.addNewResumeModelFromTrackResumeModel = function () {

                    $scope.resumeModal = ResumesSvc.getQuickUploadResumeModal($scope, 'ResumeCtrl');
                    $scope.myFile=null;
                    $scope.id=null;
                    $scope.resumeTitle=null;
                    $scope.resumeType="quickCV";
                };
				//////////////////////////////////////////////////////////////////////////////////////
				//Open Edit Resume Model Function
				$scope.openEditResumeModel = function (resumeId) {

					$scope.findMyResume(resumeId);
					$scope.resumeModal = ResumesSvc.getEditResumeModal($scope, 'ResumeCtrl');
					$scope.id=resumeId;
				};
				///////////////////////////////////////////////////////////////////////////////////////
				//Open Delete Resume Model Function
				$scope.openDeleteResumeModel = function (resumeId,resumeName) {
					$scope.resumeModal = ResumesSvc.getWarningModal($scope, 'ResumeCtrl');
					$scope.id=resumeId;
					$scope.resumeName=resumeName;
					$scope.modelType='Delete';
					//Setting the title and message
					$scope.modelTitle = Utilities.getAlerts('deleteModelTitle').message;
					$scope.modelMessage = Utilities.getAlerts('deleteModelMessage').message;
				};
				//////////////////////////////////////////////////////////////////////////////////////
				//Open Download Resume Model Function
				$scope.openDownloadResumeModel = function (resumeId) {
					$scope.resumeModal = ResumesSvc.getWarningModal($scope, 'ResumeCtrl');
					$scope.id=resumeId;
					$scope.modelType='Download';
					//Setting the title and message
					$scope.modelTitle = Utilities.getAlerts('downloadModelTitle').message;
					$scope.modelMessage = Utilities.getAlerts('downloadModelMessage').message;
				};
				
				//Close the resume model function
				$scope.closeModal = function () {
					$scope.resumeModal.dismiss();
					$scope.myFile=null;
					$scope.id=null;
					$scope.resumeTitle=null;
					$scope.resumeType=null;
				};
				///////////////////////////////////////////////////////////////////////////////////////////
				/*
				 * CRUD Functions
				 */
				//Find Resume by Function: used in both edit and delete resume model function
				$scope.findMyResume = function (id) {
						
					ResumesSvc.findMyResume(id).then(

						function (resumesData) {
							$scope.resumeTitle = resumesData.resumeTitle;
							$scope.resumeType = resumesData.resumeType;
							var file = new File([resumesData.resumeFile], resumesData.resumeName);
							file.name=resumesData.resumeName;
							file.type="application/msword";
							$scope.myFile = file;
						}
					);
				};
				//Save Resume Function, Used for both new and edit resume
				$scope.saveMyResume = function (file,id,userId,resumeTitle, resumeType) {
					$scope.formProcessing = true;
					var fd = new FormData();
			        if(id!=null){
			        	fd.append('id', id);
			        }
			        fd.append('userId', userId);
			        fd.append('file', file);
					fd.append('resumeTitle',resumeTitle);
					fd.append('resumeType',resumeType);
					//ResumesSvc.saveMyResume(fd).
					//This must be changed to call the service layer
					var url = Utilities.getSaveResumesUrl();
					$http.post(url, fd, {
			            transformRequest: angular.identity,
			            headers: {'Content-Type': undefined}
			        })
			        .success(function(data, status, headers, config) {
						console.debug(data+'  '+status+' ' +headers+'  '+config);
						$scope.closeModal();
                        $rootScope.$broadcast('quickCV');
						toastr.success(Utilities.getAlerts(id==null ? 'resumeAddedSuccess' : 'resumeEditSuccess'));

						data.uploadedAt = Utilities.getFormattedDate(data.uploadedAt);
						if(id!=null){
							angular.forEach($scope.user.myResumes, function(obj, i) {
								if(id==obj.id){
									$scope.user.myResumes[i] = data;
						          }
						        });
						}
						else{
							$scope.user.myResumes.push(data);
						}
					})
			        .error(function(data, status, headers, config) {
			        	$scope.closeModal();

			        	if(data.message=='resumeSaveTitleDuplicatedError'){
			        		toastr.error(Utilities.getAlerts('resumeSaveTitleDuplicatedError'));
			        	}
			        	else if(data.message=='resumeSaveTypeDuplicatedError'){
			        		toastr.error(Utilities.getAlerts('resumeSaveTypeDuplicatedError'));
			        	}
			        	else if(data.message=='resumeSaveLimitError'){
			        		toastr.error(Utilities.getAlerts('resumeSaveLimitError'));
			        	}
                        else if(data.message=='resumeSaveNameDuplicatedError'){
                            toastr.error(Utilities.getAlerts('resumeSaveNameDuplicatedError'));
                        }
                        else{
			        		toastr.error(Utilities.getAlerts('defaultError'));
			        	}
						console.debug(data+'  '+status+' ' +headers+'  '+config);
					});
				};

				$scope.checkUserRole = function () {

                    if($scope.user.userRole == 'ADMIN'){
                    	return false;
                    }else {
                    	return true;
					}
                }

                $scope.loadResume = function (resumeLookUp) {

                    $scope.user.myResumes = [];

                    ResumesSvc.getOtherResumes($scope.user.id,resumeLookUp).then(

                        function (resumesData) {
                            $scope.user.myResumes = resumesData;
                        }
                    );

                }
				
				//Delete Resume Function
				$scope.deleteMyResume = function () {
					var id = $scope.id;
					var resumeName = $scope.resumeName;

					//ResumesSvc.deleteMyResume(fd)
					//This must be changed to call the service layer
					var url = Utilities.geDeleteResumesUrl()+"?id="+id + "&resumeName="+ resumeName;
					$http.delete(url,{
			            transformRequest: angular.identity,
			            headers: {'Content-Type': undefined}
			        })
			        .success(function(data, status, headers, config) {
						console.debug(data+'  '+status+' ' +headers+'  '+config);
						$scope.closeModal();
						toastr.success(Utilities.getAlerts('deleteResumeuccess'));
						angular.forEach($scope.user.myResumes, function(obj, i) {
								if(id==obj.id){
									$scope.user.myResumes.splice(i, 1);    
						         }
						});
					})
			        .error(function(data, status, headers, config) {
			        	$scope.closeModal();
			        	if(data.message=='resumeSaveLeastError'){
			        		toastr.error(Utilities.getAlerts('resumeSaveLeastError'));
			        	}
			        	else{
			        		toastr.error(Utilities.getAlerts('defaultError'));
			        	}
					});
				};
				//Download Resume Function
				$scope.downloadMyResume = function () {
					var id = $scope.id;
					ResumesSvc.downloadMyResume(id);
					$scope.closeModal();
					toastr.success(Utilities.getAlerts('resumeDownloadSuccess').message);
				};
				////////////////////////////////////////////////////////////////////////////
				$scope.init = function () {
					$scope.getUserDetails();
				};

				$scope.init();

				$scope.alerts = [];
				$scope.formProcessing = false;
				var $timeout = $injector.get('$timeout');

				$scope.addAlert = function (alertOb) {
					$scope.alerts.push(alertOb);
				};
	    }
	]);

	angular.module('MyCvTracker.pages.resumes')
		.controller('ResumeCtrl', ['$scope', '$injector',
			function ($scope, $injector) {
				var Utilities = $injector.get('Utilities');

				$scope.saveResume = function () {
					var file = $scope.myFile;
					var id = $scope.id;
					var userId = $scope.user.id;
					var resumeTitle = $scope.resumeTitle;
					var resumeType = $scope.resumeType;
					if (file != null) {
						$scope.saveMyResume(file, id, userId, resumeTitle, resumeType);
					}
					else {
						$scope.addAlert(Utilities.getAlerts('InputFileInputRequiredValidation'));
					}
				};


				$scope.modelFunction = function () {
					if ($scope.modelType == 'Delete') {
						$scope.deleteMyResume();
					}
					if ($scope.modelType == 'Download') {
						$scope.downloadMyResume();
					}
				};
			}
	]);

	angular.module('MyCvTracker.pages.resumes')
	.directive('fileModel', ['$parse','$injector','Constants', function ($parse,$injector,Constants) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.fileModel);
	            var modelSetter = model.assign;
				var Utilities = $injector.get('Utilities');
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
						var file = scope.myFile;
						var validExts = ["application/pdf", "application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
						var fileExt = file.type;
						var input = $("#fileUpload");
						if (validExts.indexOf(fileExt) < 0) {
							scope.addAlert(Utilities.getAlerts('InputFileInputTypeValidation'));
							scope.myFile=null;
							return false;
						}

						if(file.size>=Constants.fileUpload.fileSizeLimitInByte){
							scope.addAlert(Utilities.getAlerts('InputFileInputSizeValidation'));
							scope.myFile=null;
							return false;
						}
	                });
	            });
	        }
	    };
	}]);