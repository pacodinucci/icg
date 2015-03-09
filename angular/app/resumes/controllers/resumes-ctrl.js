
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

	angular.module('icg.resumes').service('fileUpload', ['$http', function ($http) {
	    this.uploadFileToUrl = function(file, resumeTitle, resumeType,uploadUrl){
	        var fd = new FormData();
	        fd.append('file', file);
			fd.append('resumeTitle',resumeTitle);
			fd.append('resumeType',resumeType);
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .success(function(data, status, headers, config) {
				console.debug(data+'  '+status+' ' +headers+'  '+config);
			})
	        .error(function(data, status, headers, config) {
					console.debug(data+'  '+status+' ' +headers+'  '+config);
			});
	    }
	}]);

	angular.module('icg.resumes').controller('myCtrl', ['$scope', 'fileUpload','$injector', function($scope, fileUpload ,$injector){
	    var Utilities = $injector.get('Utilities');
	    $scope.uploadFile = function(){		
	        var file = $scope.myFile;
			var resumeTitle = $scope.resumeTitle;
			var resumeType = $scope.resumeType;
		    console.log('file is ' + JSON.stringify(file));
	        //var uploadUrl = "http://localhost:8090/user/resumes";
			var uploadUrl = Utilities.getMyResumesUrl();
	        fileUpload.uploadFileToUrl(file,resumeTitle, resumeType,uploadUrl);
	    };
	    
	}]);