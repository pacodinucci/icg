
	angular.module('icg.resumes')

	    .controller('ResumesCtrl', ['$rootScope', '$scope', '$injector','$http',

	        function ($rootScope, $scope, $injector,$http) {            	
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
							$rootScope.addAlert(Utilities.getAlerts(response.status));
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
				//////////////////////////////////////////////////////////////////////////////////////
				//Open Edit Resume Model Function
				$scope.openEditResumeModel = function (resumeId) {
					$scope.findMyResume(resumeId);
					$scope.resumeModal = ResumesSvc.getEditResumeModal($scope, 'ResumeCtrl');
					$scope.id=resumeId;
				};
				///////////////////////////////////////////////////////////////////////////////////////
				//Open Delete Resume Model Function
				$scope.openDeleteResumeModel = function (resumeId) {
					$scope.resumeModal = ResumesSvc.getDeleteResumeModal($scope, 'ResumeCtrl');
					$scope.id=resumeId;
				};
				//////////////////////////////////////////////////////////////////////////////////////
				/*
				 * Shared Functions
				 */
				//Define the resume model controller
				$scope.ResumeCtrl = function ($scope) {
					$scope.saveResume = function () {
						var file = $scope.myFile;
						var id = $scope.id;
				        var userId = $scope.user.id;
						var resumeTitle = $scope.resumeTitle;
						var resumeType = $scope.resumeType;
					    console.log('file is ' + JSON.stringify(file));
					    if(file!=null){
					    	$scope.saveMyResume(file,id,userId,resumeTitle, resumeType);
					    }
					    else{
					    	$("#saveMessage").html("Please,Select the resume file!");
					    }
					};
					$scope.deleteResume = function () {
						var id = $scope.id;
						$scope.deleteMyResume(id);
					};
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
						$rootScope.addAlert(Utilities.getAlerts(id==null ? 'resumeAddedSuccess' : 'resumeEditSuccess'));
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
			        		$rootScope.addAlert(Utilities.getAlerts('resumeSaveTitleDuplicatedError'));
			        	}
			        	else if(data.message=='resumeSaveTypeDuplicatedError'){
			        		$rootScope.addAlert(Utilities.getAlerts('resumeSaveTypeDuplicatedError'));
			        	}
			        	else{
			        		$rootScope.addAlert(Utilities.getAlerts('defaultError'));
			        	}
						console.debug(data+'  '+status+' ' +headers+'  '+config);
					});
				};
				
				//Delete Resume Function
				$scope.deleteMyResume = function (id) {
//					ResumesSvc.deleteMyResume(id)
					//This must be changed to call the service layer
					var url = Utilities.geDeleteResumesUrl()+"?id="+id;
					$http.delete(url, {
			            transformRequest: angular.identity,
			            headers: {'Content-Type': undefined}
			        })
			        .success(function(data, status, headers, config) {
						console.debug(data+'  '+status+' ' +headers+'  '+config);
						$scope.closeModal();
						$rootScope.addAlert(Utilities.getAlerts('deleteResumeuccess'));
						angular.forEach($scope.user.myResumes, function(obj, i) {
								if(id==obj.id){
									$scope.user.myResumes.splice(i, 1);    
						         }
						});
					})
			        .error(function(data, status, headers, config) {
			        	$scope.closeModal();
			        	$rootScope.addAlert(Utilities.getAlerts('defaultError'));
						console.debug(data+'  '+status+' ' +headers+'  '+config);
					});
				};
				////////////////////////////////////////////////////////////////////////////
				$scope.init = function () {
					$scope.getUserDetails();
				};

				$scope.init();
	    }
	]);
	angular.module('icg.resumes').directive('fileModel', ['$parse', function ($parse) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.fileModel);
	            var modelSetter = model.assign;
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
	                });
	            });
	        }
	    };
	}]);