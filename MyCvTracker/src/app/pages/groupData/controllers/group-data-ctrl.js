
	angular.module('MyCvTracker.pages.GroupData')
	  		.controller('GroupDataCtrl', ['toastr', '$scope', '$injector', '$http', '$filter','$window',

			function (toastr, $scope, $injector, $http, $filter,$window) {

				var Utilities = $injector.get('Utilities');
				var GroupDataSvc = $injector.get('GroupDataSvc');
				var AccountSvc = $injector.get('AccountSvc');
				var NotificationsSvc = $injector.get('CampaignNotificationsSvc');

				//$scope.notesModal = {};
				//Used scopes
				$scope.user = {
					myNotes: [],
					myGroups : [],
					groupMembers : []
				};

				$scope.isAdmin = false;

                $scope.newMemberData = {
                    id: '',
                    memberFirstName : '',
                    memberLastName : '',
                    memberEmail : '',
                    cvMarketingGroup : {
                        id : ''
                    }
                };

                $scope.selectedMembers = '';

				$scope.groupData = {
				    id: '',
                    groupName: '',
                    groupType: '',
                    groupLocation: ''

       			};

       			$scope.addGroup = function(groupForm,groupData){

       			    GroupDataSvc.addGroups(groupData).then(function(groupData){

                        $scope.getMyGroups();

       			    }, function(data){

       			    });
       			}

       			$scope.editGroup = function(groupForm,groupData){

                    GroupDataSvc.editGroups(groupData).then(function(groupData){


                    }, function(data){

                    });
                }

                 $scope.editMember = function(memberData,groupId){

                 if(groupId != null){
                    memberData.cvMarketingGroup.id = groupId;
                 }

                 GroupDataSvc.saveMembers(memberData).then(function(selectedMembers){

                  $scope.newMemberData = {
                                         id: '',
                                         memberFirstName : '',
                                         memberLastName : '',
                                         memberEmail : '',
                                         cvMarketingGroup : {
                                             id : ''
                                         }
                                     };
                                     $scope.getGroupMembers(memberData.cvMarketingGroup.id);


                 }, function(data){
                 });

                 }

                 $scope.removeMember = function(memberData){

                 if(memberData.id == ''){
                    return;
                 }

                  GroupDataSvc.deleteMembers(memberData).then(function(selectedMembers){


                   $scope.newMemberData =
                   {
                      id: '',
                      memberFirstName : '',
                      memberLastName : '',
                      memberEmail : '',
                      cvMarketingGroup : {
                          id : ''
                      }
                   };

                   $scope.getGroupMembers(memberData.cvMarketingGroup.id);


                  }, function(response){
                        alert(response.data);
                        alert(response.status);
                  });

                  }


                 $scope.copyMember = function(memberData){
                    $scope.newMemberData.memberFirstName = memberData.memberFirstName;
                    $scope.newMemberData.memberLastName = memberData.memberLastName;
                    $scope.newMemberData.memberEmail = memberData.memberEmail;
                    $scope.newMemberData.cvMarketingGroup.id = memberData.cvMarketingGroup.id;
                 }


				//Listing Notifications Function
				$scope.getMyGroups = function () {

					$scope.user.myGroups = [];

					GroupDataSvc.getGroups().then(

						function (groupsData) {

							groupsData.forEach(function (groups) {
								$scope.user.myGroups.push(groups);
							});
						}
					);
				};

				$scope.getUserDetails = function () {

                    AccountSvc.getUser().then(

                        function (userData) {

                            if(userData.userRole == 'ADMIN'){
                                $scope.isAdmin = true;

                            }else{
                                $scope.isAdmin = false;
                            }
                        }
                    );
                };

				//Listing Notifications Function
                $scope.getGroupMembers = function (groupId) {

                    $scope.user.groupMembers = [];

                    $scope.user.myGroups.forEach(function(groups){
                        if(groups.id == groupId){
                        $scope.groupData.id = groups.id;
                        $scope.groupData.groupName = groups.groupName;
                        $scope.groupData.groupType = groups.groupType
                        $scope.groupData.groupLocation = groups.groupLocation;

                        }
                    });

                    GroupDataSvc.getMembers(groupId).then(

                        function (membersData) {

                        membersData.forEach(function (members) {
                        	$scope.user.groupMembers.push(members);
                        });
                        }
                    );
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


				// edit Notes Function

				$scope.init = function () {
					//$scope.getMyGroups();
					$scope.getMyGroups();
					$scope.getUserDetails();
				};

				$scope.init();
			}
		]);