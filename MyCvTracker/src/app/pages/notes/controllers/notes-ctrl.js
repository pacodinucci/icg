
	angular.module('BlurAdmin.pages.notes')
	  		.controller('NotesCtrl', ['toastr', '$scope', '$injector', '$http', '$filter','$window',

			function (toastr, $scope, $injector, $http, $filter,$window) {

				var Utilities = $injector.get('Utilities');
				var NotesSvc = $injector.get('NotesSvc');
				var AccountSvc = $injector.get('AccountSvc');

				//$scope.notesModal = {};
				//Used scopes
				$scope.user = {
					myNotes: []
				};

				$scope.getMyNotes = function () {

					$scope.user.myNotes = [];

					NotesSvc.getMyNotes().then(

						function (notesData) {
							notesData.forEach(function (note) {
								note.createdDate = $filter('date')(new Date(note.createdDate), 'EEE,MMM dd yyyy HH:mm:ss');
								$scope.user.myNotes.push(note);
							});
						}
					);
				};

				/////////////////////////////////////////////////////////////////////////////////////
				//open edit Notes Model Function
				$scope.editNotesModel = function (note) {

					$scope.selectedNote =  {
						id : note.id,
						toRecruiter : note.toRecruiter,
						recruiter : note.recruiter,
						agency : note.agency,
						subject : note.subject,
						content : note.content,
						resumeId : note.resumeId,
						userId : note.userId,
						notes : note.notes,
						createdDate : note.createdDate
					};
					$scope.notesModal = NotesSvc.getEditNotesModal($scope, 'NotesCtrl');
				};

				$scope.viewNotesModel = function (noteId, index) {
					$scope.user.viewNotes = [];
					$scope.noteId = noteId;
					$scope.index = index;

					NotesSvc.viewMyNotes(noteId).then(

						function (notesData) {
							$scope.notesContent = notesData.content;
							$scope.viewNotesModal = NotesSvc.getViewNotesModal($scope, 'NotesCtrl');
						}
					);
				};

				$scope.sendTrackedApplicaion = function (note, index) {

					$scope.notesModal = NotesSvc.getSendTrackedApplicationModal($scope, 'NotesCtrl');
					$scope.note=note;
					$scope.modelType='Delete';
					//Setting the title and message
					$scope.modelTitle = Utilities.getAlerts('sendTrackedApplicationModelTitle').message;
					$scope.modelMessage = Utilities.getAlerts('sendTrackedApplicationlMessage').message;
				};

				//deleting Notes Function
				$scope.deleteNotes = function (noteId, index) {
					$scope.noteId = noteId;
					$scope.index = index;
					$scope.deleteNotesModal = NotesSvc.getDeleteNotesModal($scope, $scope.NotesCtrl);
				};

				$scope.NotesCtrl = function () {

					//deleting Notes Function
					$scope.deleteConfirmNotes = function (noteId, index) {
						$scope.closeDeleteNoteModal();
						var url = Utilities.getDeleteNotesUrl() + "?id=" + noteId;
						//console.log(Utilities.getDeleteNotesUrl() + "?id=" + noteId);
						$http.delete(url, {
							transformRequest: angular.identity,
							headers: {'Content-Type': undefined}
						})
							.success(function (data, status, headers, config) {
								console.debug(data + '  ' + status + ' ' + headers + '  ' + config);
								toastr.success(Utilities.getAlerts('deleteNotesSuccess'));
								// new code edited
								angular.forEach($scope.user.myNotes, function(obj, i) {
									if(noteId==obj.id){
										$scope.user.myNotes.splice(i, 1);
									}
								});

							})
							.error(function (data, status, headers, config) {
								$scope.closeDeleteNoteModal();
								toastr.error(Utilities.getAlerts('defaultError'));

							});
					};

					$scope.closeDeleteNoteModal = function () {
						$scope.deleteNotesModal.dismiss();
					};
				};

				//Close the resume model function
				$scope.closeModal = function () {

					$scope.notesModal.dismiss();
					Utilities.gotoNotesPage();
					$scope.recruiter=null;
					$scope.id=null;
					$scope.agency=null;
					$scope.createdDate=null;
					$scope.note=null;


				};

				//Close the resume model function


				//Close the resume model function
				$scope.closeViewNoteModal = function () {
					$scope.viewNotesModal.dismiss();
				};

				$scope.saveNote = function (notesForm, notesModel) {

					if (notesForm.$valid ) {

						//notesModel.userId = $scope.note.userId;
						notesModel.createdDate = new Date();

						NotesSvc.saveMyNotes(notesModel).then(

							function (notesData) {
								$scope.notesModal.dismiss();
								toastr.error(Utilities.getAlerts('resumeTrackRequestSuccess'));
								angular.forEach($scope.user.myNotes, function(obj, i) {
									if(notesData.id==obj.id){
										$scope.user.myNotes[i] = notesData;
									}
								});
							}
						);
					}
				};

				$scope.modelFunction = function () {
					if($scope.modelType=='Delete'){
						$scope.sendTrackedApplication();
					}
				};

				$scope.sendTrackedApplication = function () {

					$scope.note.tracked = $scope.note.tracked ? false :true;
					$scope.note.createdDate = null;
					NotesSvc.sendTrackedApplication($scope.note).then(
						function (notesData) {
							$scope.notesModal.dismiss();
							$scope.note.createdDate = notesData.createdDate;
							$scope.note.tracked = notesData.tracked;
							toastr.error(notesData.tracked ? Utilities.getAlerts('sendTrackedApplicationSuccess'):Utilities.getAlerts('sendUnTrackedApplicationSuccess'));
							Utilities.gotoNotesPage();
						}
					);
				};

				// edit Notes Function

				$scope.init = function () {
					$scope.getMyNotes();
				};

				$scope.init();
			}
		]);