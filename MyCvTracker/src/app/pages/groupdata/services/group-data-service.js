angular.module('MyCvTracker.pages.groupdata')

    	.factory('GroupDataSvc', ['toastr', 'RestConfig', '$injector',

            function (toastr, RestConfig, $injector) {

                var Utilities = $injector.get('Utilities');

            	return  {

					getEditNotesModal: function (scope, ctrlName) {

						var modalOpts = {
							templateUrl: 'app/pages/campaignNotes/templates/edit_note.html',
							controller: ctrlName,
							scope: scope
						};

						return $injector.get('$uibModal').open(modalOpts);

					},

					getDeleteNotesModal: function (scope, ctrlName) {

						var modalOpts = {
							templateUrl: 'app/pages/campaignNotes/templates/delete_note.html',
							controller: ctrlName,
							scope: scope
						};

						return $injector.get('$uibModal').open(modalOpts);

					},

					getViewNotesModal: function (scope, ctrlName) {

						var modalOpts = {
							templateUrl: 'app/pages/campaignNotes/templates/view_note.html',
							controller: ctrlName,
							scope: scope
						};

						return $injector.get('$uibModal').open(modalOpts);

					},

					bulkUpload: function(file,groupId){

		                return RestConfig.bulkUpload(url,request);
					},

					addGroups: function (groupData) {
                        var url = Utilities.addGroupsUrl();
                        return  RestConfig.addGroup(url,groupData);
                    },

                    editGroups: function (groupData) {
                        var url = Utilities.editGroupsUrl();
                        return  RestConfig.editGroup(url,groupData);
                    },

            		getGroups: function (userId) {
            			var url = Utilities.getGroupsUrl();
            			return  RestConfig.getGroupsList(url);
            		},

                    getMembers: function (groupId) {
            			var url = Utilities.getGroupMembersUrl(groupId)+"?groupId=" + groupId;
            			return  RestConfig.getMembersList(url);
            		},
                    saveMembers: function (requestOb) {
                        var url = Utilities.getEditMembersUrl();
                        return  RestConfig.saveMembersList(url,requestOb);
                    },
                    deleteMembers: function (requestOb) {
                        var url = Utilities.getDeleteMembersUrl();
                        return  RestConfig.deleteGroupMembersList(url,requestOb);
                    },
					viewMyNotes: function (noteId) {

						var url = Utilities.viewMyCampaignNotesUrl() +"?id=" + noteId;
						return  RestConfig.getMyNotes(url);
					},

                    bulkUpdateNotes: function (requestOb) {
                        var url = Utilities.bulkCampaignNotesUrl();
                        return RestConfig.bulkUpdateNotes(url, requestOb);
                    },

					saveMyNotes: function (requestOb) {

						var url = Utilities.getEditCampaignNotesUrl();
						return RestConfig.saveNotesRequest(url, requestOb);
					}
            	}; 
            }
        ]);