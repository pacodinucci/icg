

    angular.module('BlurAdmin.pages.CampaignNotes')

    	.factory('CampaignNotesSvc', ['toastr', 'RestConfig', '$injector',

            function (toastr, RestConfig, $injector) {

                var Utilities = $injector.get('Utilities');

            	return  {

					getEditNotesModal: function (scope, ctrlName) {

						var modalOpts = {
							templateUrl: '/app/pagescampaignNotes/templates/edit_note.html',
							controller: ctrlName,
							scope: scope
						};

						return $injector.get('$uibModal').open(modalOpts);

					},

					getDeleteNotesModal: function (scope, ctrlName) {

						var modalOpts = {
							templateUrl: '/app/pagescampaignNotes/templates/delete_note.html',
							controller: ctrlName,
							scope: scope
						};

						return $injector.get('$uibModal').open(modalOpts);

					},

					getViewNotesModal: function (scope, ctrlName) {

						var modalOpts = {
							templateUrl: '/app/pagescampaignNotes/templates/view_note.html',
							controller: ctrlName,
							scope: scope
						};

						return $injector.get('$uibModal').open(modalOpts);

					},

            		getMyNotes: function (userId) {

            			var url = Utilities.getMyCampaignNotesUrl();
            			return  RestConfig.getMyNotes(url);
            		},

					viewMyNotes: function (noteId) {

						var url = Utilities.viewMyCampaignNotesUrl() +"?id=" + noteId;
						return  RestConfig.getMyNotes(url);
					},


					saveMyNotes: function (requestOb) {

						var url = Utilities.getEditCampaignNotesUrl();
						return RestConfig.saveNotesRequest(url, requestOb);
					}
            	}; 
            }
        ]);