
	angular.module('BlurAdmin.pages.CampaignNotes')
	  		.controller('CampaignNotesCtrl', ['toastr', '$scope', '$injector', '$http', '$filter','$window',

			function (toastr, $scope, $injector, $http, $filter,$window) {

				var Utilities = $injector.get('Utilities');
				var NotesSvc = $injector.get('CampaignNotesSvc');
				var AccountSvc = $injector.get('AccountSvc');
				var NotificationsSvc = $injector.get('CampaignNotificationsSvc');

				//$scope.notesModal = {};
				//Used scopes
				$scope.user = {
					myNotes: [],
					myCampaigns : []
				};

				/////////////////////////////////////////////////////////////////////////////////////
				//open edit Notes Model Function
				$scope.editNotesModel = function (note) {
					$scope.clearAlerts();
					$scope.note = note;
					$scope.notesModal = NotesSvc.getEditNotesModal($scope, 'CampaignNotesCtrl');
				};

				$scope.saveNote = function () {

					var userId = $scope.user.id;
					var notes = $scope.note;

					$scope.saveMyNotes(userId,notes);

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

				$scope.saveMyNotes = function(userId,notes){

					NotesSvc.saveMyNotes(requestModel).then(
						function (myNotesData) {
							toastr.error(Utilities.getAlerts('resumeTrackRequestSuccess'));
							Utilities.gotoProfilePage();
						}
					);
				};

				//Close the resume model function
				$scope.closeModal = function () {

					$scope.notesModal.dismiss();
					Utilities.gotoCampaignNotesPage();
					$scope.recruiter=null;
					$scope.id=null;
					$scope.agency=null;
					$scope.createdDate=null;
					$scope.note=null;


				};

				//Close the resume model function
				$scope.closeDeleteNoteModal = function () {
					$scope.deleteNotesModal.dismiss();
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

				$scope.viewNotesModel = function (noteId, index) {

					$scope.user.viewNotes = [];
					$scope.noteId = noteId;
					$scope.index = index;

					NotesSvc.viewMyNotes(noteId).then(

						function (notesData) {
							$scope.notesContent = notesData.content;
							$scope.viewNotesModal = NotesSvc.getViewNotesModal($scope, 'CampaignNotesCtrl');
						}
					);
				};

				//Close the resume model function
				$scope.closeViewNoteModal = function () {
					$scope.viewNotesModal.dismiss();
				};

				$scope.postRequest = function (notesForm, notesModel) {

					if (notesForm.$valid ) {

						notesModel.userId = $scope.note.userId;
						notesModel.createdDate = new Date();

						NotesSvc.saveMyNotes(notesModel).then(

							function (notesData) {
								$scope.notesModal.dismiss();
								toastr.error(Utilities.getAlerts('resumeTrackRequestSuccess'));
								Utilities.gotoCampaignNotesPage();
							}
						);
					}
				};

				//deleting Notes Function
				$scope.deleteNotes = function (noteId, index) {
					$scope.noteId = noteId;
					$scope.index = index;
					$scope.deleteNotesModal = NotesSvc.getDeleteNotesModal($scope, 'CampaignNotesCtrl');
				};

				//deleting Notes Function
				$scope.deleteConfirmNotes = function (noteId, index) {

					$scope.closeDeleteNoteModal();
					var url = Utilities.getDeleteCampaignNotesUrl() + "?id=" + noteId;
					$http.delete(url, {
						transformRequest: angular.identity,
						headers: {'Content-Type': undefined}
					})
					.success(function (data, status, headers, config) {
						console.debug(data + '  ' + status + ' ' + headers + '  ' + config);
						toastr.error(Utilities.getAlerts('deleteNotesSuccess'));
						$scope.user.myNotes.splice(index, 1);

						/*//new code edited
						angular.forEach($scope.user.myNotes, function(obj, i) {
							if(noteId==obj.id){
								$scope.user.myNotes.splice(i, 1);
							}
						});*/

						//$scope.getMyNotes();
						document.location.reload(true);

					})
					.error(function (data, status, headers, config) {
						$scope.closeDeleteNoteModal();
						toastr.error(Utilities.getAlerts('defaultError'));

					});
				};

				// edit Notes Function

				$scope.init = function () {
					$scope.getMyNotes();
					$scope.getMyCampaigns();
				};

				$scope.init();
			}
		]);