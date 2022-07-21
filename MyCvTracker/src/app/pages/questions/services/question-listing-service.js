angular.module('MyCvTracker.pages.questions')

    	.factory('QuestionDataSvc', ['toastr', 'RestConfig', '$injector',

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
                    getQuestions: function (type) {
                        var url = Utilities.getQuestionsListUrl() + "?interviewType=" + type;
                        return  RestConfig.getQuestionsList(url);
                    },
                    editQuestions: function(questions) {
                        var url = Utilities.editQuestionsListUrl();
                        return  RestConfig.editQuestionsList(url,questions);
                    },
                    deleteQuestions: function(questions) {
                        var url = Utilities.deleteQuestionsListUrl();
                        return  RestConfig.deleteQuestionsList(url,questions);
                    },
                    addQuestions: function(questions) {
                        var url = Utilities.addQuestionUrl();
                        return RestConfig.addQuestions(url,questions);
                    },
                    assignInterview: function(interviewRequest) {
                       var url = Utilities.assignInterviewUrl();
                       return RestConfig.assignInterview(url,interviewRequest);
                    },
                    sendReminders: function(interviewRequest) {
                       var url = Utilities.sendReminderUrl();
                       return RestConfig.sendReminders(url,interviewRequest);
                    },
                    getResults: function(candidateDetails){
                     var url = Utilities.getResultsUrl();
                      return RestConfig.getResults(url,candidateDetails);
                    }
            	};
            }
        ]);