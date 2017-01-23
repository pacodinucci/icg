
	angular.module('BlurAdmin.pages.account')

	    .controller('AccountCtrl', ['toastr', '$scope', '$injector','$location',

	        function (toastr, $scope, $injector,$location) {

				var AuthSvc = $injector.get('AuthSvc');
				var Utilities = $injector.get('Utilities');
				var AccountSvc = $injector.get('AccountSvc');
				var PaymentSvc = $injector.get('PaymentSvc');

				$scope.user = {

				};

				$scope.adminFeatures = [];

				$scope.settings = {
					emailSubscribes: [],
					tracking: false,
					notification: false,
					subject: "hello",
					content: "I am looking for new role"
				};

				$scope.getUserProfileSettings = function () {

					AccountSvc.getUserProfileSettings().then(
						function (response) {
							$scope.settings.emailSubscribes = response.emailSubscribes;
							$scope.settings.trackingMode = response.trackingMode;
							angular.forEach($scope.settings.emailSubscribes, function (state) {
								if (state.emailType == 'tracking') {
									$scope.settings.tracking = state.subscribe;
								}
								else{
									$scope.settings.notification = state.subscribe;
								}
							});
						},
						function (response) {
							toastr.error(Utilities.getAlerts(response.status));
						}
					);
				};

				$scope.redirectToProfilePage = function () {
					var currentUrl = window.location.href;
					$location.path('/account');
					var emailType = null;
					if (currentUrl.indexOf("accountFromTrackingMail") > -1) {
						emailType = 'tracking';
					}else{
						emailType = 'notification';
					}

					AccountSvc.unSubscribeMail(emailType).then(
						function () {

							toastr.error(Utilities.getAlerts('unsubscribeSucess'));
						},
						function (response) {
							toastr.error(Utilities.getAlerts(response.status));

						}
					);
					//$scope.resumeModal = AccountSvc.openUnsubscribeModal($scope, 'AccountCtrl');
					//$scope.modelType='Confirm';
					//if(currentUrl.indexOf("accountFromTrackingMail") > -1){
					//	$scope.id='tracking';
					//	$scope.modelTitle = Utilities.getAlerts('unsubscribeeModelTrackingTitle').message;
					//	$scope.modelMessage = Utilities.getAlerts('unsubscribeModelTrackingMessage').message;
					//}else{
					//	$scope.id='notification`';
					//	$scope.modelTitle = Utilities.getAlerts('unsubscribeeModelNotificationTitle').message;
					//	$scope.modelMessage = Utilities.getAlerts('unsubscribeModelNotificationMessage').message;
					//}
				};

				//$scope.AccountCtrl = function ($scope) {
				//	$scope.modelFunction = function () {
				//
				//		AccountSvc.unSubscribeMail().then(
				//			function () {
				//
				//				toastr.error(Utilities.getAlerts('unsubscribeSucess'));
				//			},
				//			function (response) {
				//				toastr.error(Utilities.getAlerts(response.status));
				//
				//			}
				//		);
				//	};
				//};
				//$scope.closeModal = function () {
				//	alert('fdbdfbdfgdfgdfgdgfd');
				//	$scope.resumeModal.dismiss();
				//};

				$scope.getUserDetails = function () {

					AccountSvc.getUser().then(

						function (userData) {
							$scope.user = userData;
							if($scope.user.userRole == 'ADMIN'){
								$scope.adminFeatures = [{
									background: 'tile-thumb bg-info',
									icon: 'fa fa-paper-plane-o fa-2x',
									title: 'CV Marketing Notes',
									action: 'cvMarketingNotes'
								}, {
									background: 'tile-thumb bg-info',
									icon: 'fa fa-paper-plane-o fa-2x',
									title: 'CV Marketing',
									action: 'cvMarketing'
								}, {
									background: 'tile-thumb bg-info',
									icon: 'fa fa-paper-plane-o fa-2x',
									title: 'CV Marketing Notifications',
									action: 'cvMarketingNotifications'
								}, {
									background: 'tile-thumb bg-gray',
									icon: 'fa fa-cog fa-2x',
									title: 'Settings',
									action: 'settingsPage'
								}];
							}else{
								$scope.adminFeatures = [];
							}
						},

						function (response) {
							toastr.error(Utilities.getAlerts(response.status));
						}
					);
				};

				$scope.menuClick = function (menu) {
					if(menu == 'cvMarketingNotes'){
						$scope.cvMarketingNotes();
					}
					if(menu == 'cvMarketing'){
						$scope.cvMarketing();
					}
					if(menu == 'cvMarketingNotifications'){
						$scope.cvMarketingNotifications();
					}
					if(menu == 'settingsPage'){
						$scope.settingsPage();
					}
				};

				$scope.searchJob = function () {
					Utilities.gotoJobPage();
				};

				$scope.notes = function () {
					Utilities.gotoNotesPage();
				};

				$scope.myResumes = function () {
					Utilities.gotoMyResumesPage();
				};

				$scope.jobs = function () {
					Utilities.gotoJobPage();
				};

				$scope.trackResume = function () {
					Utilities.gotoTrackResumePage();
				};

				$scope.notifications = function () {
					Utilities.gotoNotificationsPage();
				};

				$scope.cvMarketing = function () {
					Utilities.gotoCVMarketingPage();
				};
				$scope.cvMarketingNotes = function () {
					Utilities.gotoCampaignNotesPage();
				};

				$scope.cvMarketingNotifications = function () {
					Utilities.gotoCampaignNotificationsPage();
				};

				$scope.settingsPage = function () {
					Utilities.gotoSettingsPage();
				};

				$scope.getUserTick = function () {
					$scope.userTick = null;
					PaymentSvc.getUserTick().then(
						function (data) {
							$scope.userTick = data;
						}
					);
				};

				$scope.init = function () {
					$scope.getUserDetails();
				};

				$scope.saveForm = function(model){

					angular.forEach(model.emailSubscribes, function (state) {
						if (state.emailType == 'tracking') {
							 state.subscribe = model.tracking;
						}
						else{
							state.subscribe = model.notification;
						}
					});
					AccountSvc.saveProfileSettings(model).then(
						function () {
							toastr.error(Utilities.getAlerts('profileSaveSucess'));
							Utilities.gotoProfilePage();

						},
						function (response) {
							toastr.error(Utilities.getAlerts(response.status));

						}
					);
				};

				$scope.cancelForm = function(){
					Utilities.gotoProfilePage();
				};

				$scope.init();
	        }
	    ]);
