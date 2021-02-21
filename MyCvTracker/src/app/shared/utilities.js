angular.module('MyCvTracker.shared')

    .factory('Utilities', ['Constants', '$injector', '$location', 'toastr',

        function (Constants, $injector, $location, toastr) {

            var alerts = {
                401: {
                    type: 'danger',
                    message: 'Unauthorized Access!',
                },
                403: {
                    type: 'danger',
                    message: 'Authentication Failure. The username or password doesn’t match. Please retry or use the Forgot Password option to reset the password.',
                },
                409: {
                    type: 'danger',
                    message: 'User already exists!',
                },
                regsitrationSuccess: {
                    type: 'success',
                    message: 'An activation link has been sent to the registered E-mail ID. Please activate your account to continue with the Registration Process.',
                },
                activateSuccess: {
                    type: 'success',
                    message: 'Your account has been activated.',
                },
                forgotPasswordSuccess: {
                    type: 'success',
                    message: 'A password reset link has been sent to the registered E-mail ID.',
                },
                reactivateSuccess: {
                    type: 'success',
                    message: 'An activation link has been sent to the registered E-mail.',
                },
                resumeAddedSuccess: {
                    type: 'success',
                    message: 'Resume has been successfully added.',
                },
                resumePushedSuccess: {
                    type: 'success',
                    message: 'Resume has been successfully pushed to Drive.',
                },
                resumeEditSuccess: {
                    type: 'success',
                    message: 'This Resume has been successfully edited.',
                },
                resumeSaveNameDuplicatedError: {
                    type: 'danger',
                    message: 'This Resume Name and Resume Reference already exists!',
                },
                resumeSaveTitleDuplicatedError: {
                    type: 'danger',
                    message: 'This Resume Title is duplicated!',
                },
                resumeSaveTypeDuplicatedError: {
                    type: 'danger',
                    message: 'This Resume Type is duplicated!',
                },
                resumeTrackRequestSuccess: {
                    type: 'success',
                    message: 'Your request has been saved.',
                },
                resumePushToDriveError: {
                    type: 'danger',
                    message: 'Pushing resume to Drive has failed!',
                },
                favNotesSaveLimitError: {
                    type: '',
                    message: 'You have exceeded the limit for number of Fav Notes.'
                },
                favNotesAlreadyExitsError: {
                    type: '',
                    message: 'This Fav Note name already exists. Please choose a different name.'
                },
                CvMarketingRequestSuccess: {
                    type: 'success',
                    message: 'Your request has been received and we will contact you soon.',
                },
                deleteResumeuccess: {
                    type: 'success',
                    message: 'This Resume has been successfully deleted.',
                },
                deleteNotificationSuccess: {
                    type: 'success',
                    message: 'This Notification has been successfully deleted.',
                },
                deleteCampaignNotificationSuccess: {
                    type: 'success',
                    message: 'This Campaign Notification has been successfully deleted.',
                },
                deleteNotesSuccess: {
                    type: 'success',
                    message: 'Note has been successfully deleted.',
                },
                updateNoteSuccess: {
                    type: 'success',
                    message: 'Note has been updated successfully.',
                },
                sendTrackedApplicationSuccess: {
                    type: 'success',
                    message: 'This note has been added to tracking.',
                },
                sendUnTrackedApplicationSuccess: {
                    type: 'success',
                    message: 'This note has been removed from tracking.',
                },
                defaultError: {
                    type: 'danger',
                    message: 'Oops! Something went wrong.',
                },
                defaultWarning: {
                    type: 'warning',
                    message: 'This may hurt.',
                },
                defaultSuccess: {
                    type: 'success',
                    message: 'Operation performed successfully.',
                },
                notActivated: {
                    type: 'warning',
                    message: 'Your account has not been activated yet. Have you got an activation link?'
                },


                deleteModelTitle: {
                    type: '',
                    message: 'Delete Resume'
                },

                sendTrackedApplicationModelTitle: {
                    type: '',
                    message: 'Send Tracked Application'
                },


                deleteModelMessage: {
                    type: '',
                    message: 'Are you sure you want to delete this Resume?'
                },

                sendTrackedApplicationlMessage: {
                    type: '',
                    message: 'Are you sure you want to send Tracked Application?'
                },

                unsubscribeeModelTrackingTitle: {
                    type: '',
                    message: 'You have succesfully unsubscribed to Tracking Mail.'
                },
                unsubscribeModelTrackingMessage: {
                    type: '',
                    message: 'Are you sure you want to unsubscribe to Tracking Mail?'
                },

                unsubscribeeModelNotificationTitle: {
                    type: '',
                    message: 'You have successfully unsubscribed to Notification Mail.'
                },
                unsubscribeModelNotificationMessage: {
                    type: '',
                    message: 'Are you sure you want to unsubscribe to Notification Mail?'
                },

                downloadModelTitle: {
                    type: '',
                    message: 'Download Resume'
                },
                downloadModelMessage: {
                    type: '',
                    message: 'Are you sure you want to download this Resume?'
                },
                resumeDownloadSuccess: {
                    type: 'success',
                    message: 'Resume has been successfully downloaded.',
                },
                resumeSaveLimitError: {
                    type: '',
                    message: 'You have reached your resume limit.'
                },
                resumeSaveLeastError: {
                    type: '',
                    message: 'You have at least one resume.'
                },
                notificationDeleteLeastError: {
                    type: '',
                    message: 'You have at least one note to delete.'
                },

                InputFileInputTypeValidation: {
                    type: '',
                    message: 'Please upload a PDF, Doc, Docx file only.'
                },
                InputFileInputSizeValidation: {
                    type: '',
                    message: 'Please select a file that is less than 500KB.'
                },
                InputFileInputRequiredValidation: {
                    type: '',
                    message: 'Please select the resume file!'
                },
                PaymentSuccessfullyExecuted: {
                    type: 'success',
                    message: 'The payment executed successfully.'
                },
                userTickException: {
                    type: 'warning',
                    message: 'You have exceeded your ticks.'
                },
                resetPasswordSuccess: {
                    type: 'success',
                    message: 'Your password has been successfully changed.',
                },
                confirmPasswordErorr: {
                    type: 'warning',
                    message: 'Please make sure your passwords match.'
                },
                profileSaveSucess: {
                    type: 'success',
                    message: 'These settings have been saved.'
                },

                unsubscribeSucess: {
                    type: 'success',
                    message: 'The unsubscribe proccess has been successfully completed.'
                },
                jobContentSaveSucess: {
                    type: 'success',
                    message: 'This job content has been successfully updated.'
                },
                jobActivateSaveSucess: {
                    type: 'success',
                    message: 'This job has been successfully activated.'
                },
                applyJobTitle: {
                    type: '',
                    message: 'Apply Job'
                },
                applyJobMessage: {
                    type: '',
                    message: 'Are you sure you want to apply to this job?'
                },
                applyJobSucsessMessage: {
                    type: 'success',
                    message: 'Your job application has been sent successfully.'
                },
                editJobTitle: {
                    type: '',
                    message: 'Edit Job'
                },
                editJobMessage: {
                    type: '',
                    message: 'Are you sure you want to edit to this job?'
                },
                approveJobTitle: {
                    type: '',
                    message: 'Approve Job'
                },
                approveJobMessage: {
                    type: '',
                    message: 'Are you sure you want to approve this job?'
                },
                approveJobSuccessMessage: {
                    type: 'success',
                    message: 'This job has been successfully approved.'
                },
                rejectJobTitle: {
                    type: '',
                    message: 'Reject Job'
                },
                rejectJobMessage: {
                    type: '',
                    message: 'Are you sure you want to reject this job?'
                },
                rejectJobSuccessMessage: {
                    type: 'success',
                    message: 'You have sucessfully rejected this job.'
                },
                newReferralLinkSuccessMsg : "New referral link has been generated",
                referralLinkCopySuccessMsg : "Copied",
            };

            var Utilities = {

                getAlerts: function (statusCode) {
                    return alerts[statusCode ? statusCode : 'defaultError'];
                },


                getTextDay: function (numDay) {
                    var textDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    return textDays[numDay];
                },

                getMonthDay: function (numMonth) {
                    var textMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                    ];
                    return textMonths[numMonth];
                },

                getFormattedDate: function (dateOb) {
                    var newDate = new Date(dateOb);
                    return this.getTextDay(newDate.getDay()) + ', ' + this.getMonthDay(newDate.getMonth()) + ' ' + newDate.getDate() + ' ' + newDate.getFullYear();
                },

                getLoginUrl: function () {
                    return Constants.baseUrl + Constants.apis.login.url;
                },

                getRegisterUrl: function () {
                    return Constants.baseUrl + Constants.apis.register.url;
                },

                getActivationUrl: function () {
                    return Constants.baseUrl + Constants.apis.activate.url;
                },

                getLogoutUrl: function () {
                    return Constants.baseUrl + Constants.apis.logout.url;
                },

                getForgotPasswordUrl: function () {
                    return Constants.baseUrl + Constants.apis.forgotPassword.url;
                },

                getReactivateUrl: function () {
                    return Constants.baseUrl + Constants.apis.reactivate.url;
                },

                getChangePasswordUrl: function () {
                    return Constants.baseUrl + Constants.apis.changePassword.url;
                },

                getMyResumesUrl: function () {
                    return Constants.baseUrl + Constants.apis.myResumes.url;
                },

                getAllMyResumesUrl: function () {
                    return Constants.baseUrl + Constants.apis.allMyResumes.url;
                },

                getOtherResumesUrl: function () {
                    return Constants.baseUrl + Constants.apis.otherResumes.url;
                },

                getSaveResumesUrl: function () {
                    return Constants.baseUrl + Constants.apis.saveResume.url;
                },

                getPushResumeToDriveUrl: function () {
                    return Constants.baseUrl + Constants.apis.pushToDrive.url;
                },

                geDeleteResumesUrl: function () {
                    return Constants.baseUrl + Constants.apis.deleteResume.url;
                },

                getFindResumeUrl: function () {
                    return Constants.baseUrl + Constants.apis.findResume.url;
                },

                getDownloadResumeUrl: function () {
                    return Constants.baseUrl + Constants.apis.downloadResume.url;
                },

                getTrackResumeUrl: function () {
                    return Constants.baseUrl + Constants.apis.trackResume.url;
                },

                getFavNotesUrl: function () {
                    return Constants.baseUrl + Constants.apis.favNotes.url;
                },

                getCvMarketingUrl: function () {
                    return Constants.baseUrl + Constants.apis.CvMarketing.url;
                },

                getCvMarketingEditUrl: function () {
                    return Constants.baseUrl + Constants.apis.CvMarketingEdit.url;
                },

                getCvMarketingCloneUrl: function () {
                    return Constants.baseUrl + Constants.apis.CvMarketingClone.url;
                },

                getCvMarketingDeleteUrl: function () {
                    return Constants.baseUrl + Constants.apis.CvMarketingDelete.url;
                },

                getMyNotificationsUrl: function () {
                    return Constants.baseUrl + Constants.apis.notifications.url;
                },

                getMyCampaignNotificationsUrl: function () {
                    return Constants.baseUrl + Constants.apis.campaignNotifications.url;
                },

                getMyCampaignsUrl: function () {
                    return Constants.baseUrl + Constants.apis.campaigns.url;
                },
                bulkCampaignNotesUrl: function () {
                    return Constants.baseUrl + Constants.apis.bulkEditCampaignNotes.url;
                },
                getMyCampaignNotesUrl: function () {
                    return Constants.baseUrl + Constants.apis.CampaignNotes.url;
                },
                viewMyCampaignNotesUrl: function () {
                    return Constants.baseUrl + Constants.apis.viewCampaignNotes.url;
                },
                getDeleteCampaignNotesUrl: function () {
                    return Constants.baseUrl + Constants.apis.deleteCampaignNotes.url;
                },
                getMyNotesUrl: function () {
                    return Constants.baseUrl + Constants.apis.notes.url;
                },

                viewMyNotesUrl: function () {
                    return Constants.baseUrl + Constants.apis.viewNotes.url;
                },

                referCandidatesUrl: function () {
                    return Constants.baseUrl + Constants.apis.referCandidates.url;
                },

                campaignCandidatesUrl: function () {
                    return Constants.baseUrl + Constants.apis.campaignCandidates.url;
                },

                getDeleteNotificationsUrl: function () {
                    return Constants.baseUrl + Constants.apis.deleteNotifications.url;
                },

                getDeleteCampaignNotificationsUrl: function () {
                    return Constants.baseUrl + Constants.apis.deleteCampaignNotifications.url;
                },

                getViewNotificationsUrl: function () {
                    return Constants.baseUrl + Constants.apis.viewNotifications.url;
                },

                getViewCampaignNotificationsUrl: function () {
                    return Constants.baseUrl + Constants.apis.viewCampaignNotifications.url;
                },

                getDeleteNotesUrl: function () {
                    return Constants.baseUrl + Constants.apis.deleteNotes.url;
                },

                getEditNotesUrl: function () {
                    return Constants.baseUrl + Constants.apis.editNotes.url;
                },
                addGroupsUrl: function () {
                    return Constants.baseUrl + Constants.apis.addGroup.url;
                },
                editGroupsUrl: function () {
                    return Constants.baseUrl + Constants.apis.editGroup.url;
                },
                getGroupsUrl: function () {
                    return Constants.baseUrl + Constants.apis.groupsList.url;
                },
                getGroupMembersUrl: function () {
                    return Constants.baseUrl + Constants.apis.getMembers.url;
                },
                getEditMembersUrl: function () {
                    return Constants.baseUrl + Constants.apis.editMembers.url;
                },
                getDeleteMembersUrl: function () {
                    return Constants.baseUrl + Constants.apis.deleteMembers.url;
                },

                getEditCampaignNotesUrl: function () {
                    return Constants.baseUrl + Constants.apis.editNotes.url;
                },

                getAuthenticatedUserUrl: function () {
                    return Constants.baseUrl + Constants.apis.authenticateUser.url;
                },

                getExecutePaymentrUrl: function () {
                    return Constants.baseUrl + Constants.apis.executePayment.url;
                },

                getPaymentPlansrUrl: function () {
                    return Constants.baseUrl + Constants.apis.paymentPlans.url;
                },

                getUserTickUrl: function () {
                    return Constants.baseUrl + Constants.apis.UserTick.url;
                },

                getValidateUserTickNumberUrl: function () {
                    return Constants.baseUrl + Constants.apis.validateUserTickNumber.url;
                },

                resetNewPasswordUrl: function () {
                    return Constants.baseUrl + Constants.apis.resetNewPassword.url;
                },

                saveProfileSettingsUrl: function () {
                    return Constants.baseUrl + Constants.apis.saveProfileSettings.url;
                },

                getUserProfileSettingsUrl: function () {
                    return Constants.baseUrl + Constants.apis.getUserProfileSettings.url;
                },

                unSubscribeMailUrl: function () {
                    return Constants.baseUrl + Constants.apis.unSubscribeMail.url;
                },

                sendTrackedApplicationUrl: function () {
                    return Constants.baseUrl + Constants.apis.sendTrackedApplication.url;
                },

                getJobsListUrl: function () {
                    return Constants.baseUrl + Constants.apis.jobsList.url;
                },

                getEditJobUrl: function () {
                    return Constants.baseUrl + Constants.apis.editJob.url;
                },

                getViewJobUrl: function () {
                    return Constants.baseUrl + Constants.apis.viewJob.url;
                },

                getActivateJobUrl: function () {
                    return Constants.baseUrl + Constants.apis.activateJob.url;
                },

                getApplyJobUrl: function () {
                    return Constants.baseUrl + Constants.apis.applyJob.url;
                },

                getSendTrackAppUrl: function () {
                    return Constants.baseUrl + Constants.apis.sendTrackApp.url;
                },

                getcollectCVUrl: function () {
                    return Constants.baseUrl + Constants.apis.collectCV.url;
                },

                getcollectCVFromMailUrl: function () {
                    return Constants.baseUrl + Constants.apis.collectCVFromEmail.url;
                },

                getJobCriteriaListUrl: function () {
                    return Constants.baseUrl + Constants.apis.jobCriteriaList.url;
                },

                getCitiesListUrl: function () {
                    return Constants.baseUrl + Constants.apis.citiesList.url;
                },

                getReferralLinkListUrl: function () {
                    return Constants.baseUrl + Constants.apis.referralList.url;
                },

                getReferralLinkListUrlOfUser: function () {
                    return Constants.baseUrl + Constants.apis.referralListOfOther.url;
                },

                getReferralLinkNewUrl: function () {
                    return Constants.baseUrl + Constants.apis.newReferralLink.url;
                },

                getReferralLinkNewUrlForUser: function () {
                    return Constants.baseUrl + Constants.apis.newReferralLinkForUser.url;
                },


                getShareReferralLinkUrl: function () {
                    return Constants.baseUrl + Constants.apis.shareReferralLink.url;
                },

                getReferralContentUrl: function () {
                    return Constants.baseUrl + Constants.apis.referralContent.url;
                },

                getAuthUserListUrl: function () {
                    return Constants.baseUrl + "/auth/users";
                },

                getAuthUserByEmailUrl: function () {
                    return Constants.baseUrl + "/auth/userByEmail";
                },

                getReferredResumeListUrl: function () {
                    return Constants.baseUrl + Constants.apis.referredResumesList.url;
                },

                getChildRefLinks: function () {
                    return Constants.baseUrl + Constants.apis.listChildRefLinks.url;
                },

                gotoFrontPage: function () {
                    $location.path('base.front');
                },

                gotoHomePage: function () {
                    $location.path('home');
                },

                gotoProfilePage: function () {
                    $location.path('account');
                },

                gotoJobPage: function () {
                    $location.path('jobs');
                },

                gotoViewJobPage: function () {
                    $location.path('jobs.viewJob');
                },

                gotoMyResumesPage: function () {
                    $location.path('resumes');
                },

                gotoLoginPage: function () {
                    //$location.path('base.auth', {reload: true});
                    $location.path('auth', {}, {reload: true});
                },

                gotoRegisterPage: function () {
                    //$location.path('base.auth', {reload: true});
                    $location.path('register', {}, {reload: true});
                },

                gotoFrontPageWithReload: function () {
                    $location.path('front', {reload: true});
                },

                gotoHomePageWithReload: function () {
                    $location.path('home', {reload: true});
                },

                gotoTrackResumePage: function () {
                    $location.path('trackResume');
                },

                gotoNotificationsPage: function () {
                    $location.path('notifications');
                },

                gotoCampaignNotificationsPage: function () {
                    $location.path('CampaignNotifications');
                },

                gotoCVMarketingPage: function () {
                    $location.path('CvMarketing');
                },
                gotoNotesPage: function () {
                    $location.path('notes', {}, {reload: true});
                },
                gotoCampaignNotesPage: function () {
                    $location.path('CampaignNotes');
                },

                gotoPaymentPage: function () {
                    $location.path('payment');
                },

                gotoSettingsPage: function () {
                    $location.path('settings');
                },
                collectCV: function () {
                    $location.path('collectCV');
                },

                baseUrl: function () {
                    var pathparts = location.pathname.split('/');
                    if (location.host.indexOf('localhost') !== -1) {
                        var url = location.origin;
                    } else {
                        var url = location.origin;
                    }
                    return url;
                },

                getParameters: function () {
                    var query_string = {};
                    var query = window.location.search.substring(1);
                    var vars = query.split("&");
                    for (var i = 0; i < vars.length; i++) {
                        var pair = vars[i].split("=");
                        // If first entry with this name
                        if (typeof query_string[pair[0]] === "undefined") {
                            query_string[pair[0]] = decodeURIComponent(pair[1]);
                            // If second entry with this name
                        } else if (typeof query_string[pair[0]] === "string") {
                            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                            query_string[pair[0]] = arr;
                            // If third or later entry with this name
                        } else {
                            query_string[pair[0]].push(decodeURIComponent(pair[1]));
                        }
                    }
                    return query_string;
                },

                showSuccessMsg: function (msg) {
                    toastr.success(msg);
                },

                showInfoMsg: function (msg) {
                    toastr.info(msg, 'Information');
                },

                showErrorMsg: function (msg) {
                    toastr.error(msg, 'Error');
                },

                showWarningMsg: function (msg) {
                    toastr.warning(msg, 'Warning');
                }

            };

            return Utilities;
        }
    ]);
