

    angular.module('BlurAdmin.pages.notes')

    	.factory('NotesSvc', ['toastr', 'RestConfig', '$injector',

            function (toastr, RestConfig, $injector) {

                var Utilities = $injector.get('Utilities');

            	return  {

					getEditNotesModal: function (scope, ctrlName) {

						var modalOpts = {
							templateUrl: 'app/pages/notes/templates/edit_note.html',
							controller: ctrlName,
							scope: scope
						};

						return $injector.get('$uibModal').open(modalOpts);

					},

					getDeleteNotesModal: function (scope, ctrlName) {

						var modalOpts = {
							templateUrl: 'app/pages/notes/templates/delete_note.html',
							controller: ctrlName,
							scope: scope
						};

						return $injector.get('$uibModal').open(modalOpts);

					},

					getSendTrackedApplicationModal: function (scope, ctrlName) {

						var modalOpts = {
							templateUrl: 'app/pages/resumes/templates/warning.html',
							controller: ctrlName,
							scope: scope
						};

						return $injector.get('$uibModal').open(modalOpts);
					},

					getViewNotesModal: function (scope, ctrlName) {

						var modalOpts = {
							templateUrl: 'app/pages/notes/templates/view_note.html',
							controller: ctrlName,
							scope: scope
						};

						return $injector.get('$uibModal').open(modalOpts);

					},

					referCandidates: function(requestOb){
                    	var url = Utilities.referCandidatesUrl();
                    	return RestConfig.referCandidates(url,requestOb);
					},

            		getMyNotes: function (userId) {
            			var url = Utilities.getMyNotesUrl();
            			return  RestConfig.getMyNotes(url);
            		},

					viewMyNotes: function (noteId) {

						var url = Utilities.viewMyNotesUrl()+"?id=" + noteId;
						return  RestConfig.getMyNotes(url);
					},


					saveMyNotes: function (requestOb) {

						var url = Utilities.getEditNotesUrl();
						return RestConfig.saveNotesRequest(url, requestOb);
					},
					sendTrackedApplication: function (requestOb) {

						var url = Utilities.sendTrackedApplicationUrl();
						return RestConfig.sendTrackedApplication(url, requestOb);
					}
            	}; 
            }
        ]);