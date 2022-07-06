

    angular.module('MyCvTracker.shared')

        .constant('Constants', {

        	contentType: 'application/json',
            accessCookie: 'MyCVTracker.user.auth',

            appName:'MyCVTracker',

            headers: {
                authorization: 'Authorization'
            },

            // baseUrl: 'http://ec2-18-221-201-185.us-east-2.compute.amazonaws.com:8080',
           // baseUrl: 'http://localhost:8080',
            baseUrl: 'https://mycvtracker.com:8080',
            viewUrl : 'https://mycvtracker.com',
            websocket:{
                reconnect: 5000,
                // webSocketUrl: 'http://localhost:20000/messages',
                webSocketUrl: 'https://mycvtracker.com:8080/messages',
                notificationsDestination: '/topic/notifications',
                sendUrl: '/app/messages'
            },

            fileUpload: {
                fileSizeLimitInByte : 5000000
            },

            jobsSearchCriteriaType: {
                JOBS_CRITERIA_TYPE_SALARY : '1',
                JOBS_CRITERIA_TYPE_LOCATION : '2',
                JOBS_CRITERIA_TYPE_JOB_TYPE : '3',
                JOBS_CRITERIA_TYPE_RECRUITER : '4',
                JOBS_CRITERIA_TYPE_JOB_TITLE : '5'
            },

            jobAppStatus : {
                APPLIED_JOB : "APPLIED_JOB",
                SHARED_WITH_TARGET : "SHARED_WITH_TARGET",
                SELECTED_FOR_INTERVIEW : "SELECTED_FOR_INTERVIEW",
                REJECTED_FOR_INTERVIEW : "REJECTED_FOR_INTERVIEW",
                REJECTED_FOR_JOB : "REJECTED_FOR_JOB",
                SELECTED_FOR_JOB : "SELECTED_FOR_JOB"
            },

            resumeSharedLevel : {
                PARENT : "PARENT",
                JOB_POSTER : "JOB_POSTER"
            },

            jobStatusText: [
                {
                    id: 1,
                    name: " Pending"
                },
                {
                    id: 2,
                    name: " Waiting for Authorization"
                },
                {
                    id: 3,
                    name: " Approved"
                },
                {
                    id: 4,
                    name: " Waiting for Ticker Authorization"
                },
                {
                    id: 5,
                    name: " Rejected"
                },
                {
                    id: 6,
                    name: " Active"
                }
            ],

            jobsSearchCriteriaSortDropDown: [
                {
                    "id": 1,
                    "name": " Created Date"
                },
                {
                    "id": 2,
                    "name": " Job Title"
                }
            ],

            jobTypeDropDown: [
                {
                    "id": 5,
                    "name": " Full Time"
                },
                {
                    "id": 6,
                    "name": " Part Time"
                }
            ],

            apis: {

            	register: {
            		url: '/auth/signup'
            	},

                activate: {
                    url: '/auth/activate'
                },

            	login: {
            		url: '/auth/login'
            	},

                logout: {
                    url: '/auth/logout'
                },

                forgotPassword: {
                    url: '/auth/forgotPassword'
                },

                reactivate: {
                    url: '/auth/reactivate'
                },

                changePassword: {
                    url: '/auth/changePassword'
                },

                myResumes: {
                	url: '/user/resumesList'
                },

                allMyResumes: {
                    url: '/user/allResumesList'
                },

                otherResumes: {
                    url: '/user/otherResumesList'
                },

                saveResume: {
                	url: '/user/uploadQuickResume'
                },

                pushToDrive: {
                    url: '/user/submitResume'
                },

                deleteResume: {
                	url: '/user/deleteResume'
                },

                findResume: {
                	url: '/user/findResume?id='
                },

                trackResume: {
                    url: '/user/saveMyNote'
                },

                favNotes: {
                    url: '/user/favNotes'
                },

                CvMarketing: {
                    url: '/user/saveCVMarketingRequest'
                },

                CvMarketingEdit: {
                    url: '/user/editCVMarketingRequest'
                },

                CvMarketingClone: {
                    url: '/user/cloneCVMarketingRequest'
                },

                CvMarketingDelete: {
                    url: '/user/deleteCVMarketingRequest'
                },

                CampaignNotes: {
                    url: '/user/CampaignNotesList'
                },
                viewCampaignNotes: {
                    url: '/user/viewCampaignNotes'
                },
                deleteCampaignNotes : {
                    url : '/user/deleteCampaignNotes'
                },
                addGroup : {
                    url : '/cvmarketdata/addGroup'
                },
                editGroup : {
                    url : '/cvmarketdata/editGroup'
                },
                groupsList : {
                    url : '/cvmarketdata/groupsList'
                },
                addMembers : {
                    url : '/cvmarketdata/addMembers'
                },
                editMembers : {
                    url : '/cvmarketdata/editMembers'
                },
                deleteMembers : {
                    url : '/cvmarketdata/deleteMembers'
                },
                getMembers : {
                    url : '/cvmarketdata/getGroupMembers'
                },
                editMembers : {
                    url : '/cvmarketdata/editMembers'
                },
                bulkUploadMembers : {
                    url : '/cvmarketdata/addBulkMembers'
                },
                questionList : {
                    url : '/interviews/questionslist'
                },
                editQuestionList : {
                    url : '/interviews/editQuestion'
                },
                deleteQuestionList : {
                    url : '/interviews/deleteQuestion'
                },
                addQuestionUrl: {
                    url : '/interviews/addQuestion'
                },
                assignInterview: {
                    url : '/interviews/assignInterview'
                },
                sendReminder: {
                    url : '/interviews//sendReminders'
                },
                getResults: {
                    url : '/interviews/candidateResults'
                },
                notes: {
                    url: '/user/notesList'
                },

                viewNotes: {
                    url: '/user/viewNotes'
                },

                referCandidates: {
                    url: '/user/referCandidates'
                },

                campaignCandidates: {
                    url: '/user/campaignCandidates'
                },

                downloadResume: {
                    url: '/user/downloadResume?id='
                },
                notifications: {
                	url: '/user/notificationsList'
                },
                campaigns: {
                    url: '/user/campaigns'
                },
                deleteNotifications: {
                    url: '/user/deleteNotification'
                },
                viewNotifications: {
                    url: '/user/notificationsListById?id='
                },
                campaignNotifications: {
                    url: '/user/campaignNotificationsList'
                },
                deleteCampaignNotifications: {
                    url: '/user/deleteCampaignNotification'
                },
                viewCampaignNotifications: {
                    url: '/user/campaignNotificationsListById?id='
                },
                deleteNotes : {
                  url : '/user/deleteNotes'
                },
                editNotes : {
                    url : '/user/editNotes'
                },
                editCampaignNotes : {
                    url : '/user/editCampaignNotes'
                },
                sendTrackedApplication : {
                    url : '/user/sendTrackedApplication'
                },
                authenticateUser: {
                	url: '/auth/user'
                },
                executePayment: {
                    url: '/user/createPayment'
                },
                paymentPlans: {
                    url: '/user/plans'
                },
                UserTick: {
                    url: '/user/UserTick'
                },
                validateUserTickNumber: {
                    url: '/user/validateUserTickNumber'
                },

                jobsList: {
                    url: '/user/jobsList',
                },

                editJob: {
                    url: '/user/editJob'
                },

                viewJob:{
                    url: '/user/viewJob'
                },

                applyJob: {
                    url: '/user/applyJob'
                },

                sendTrackApp: {
                    url: '/user/SendTrackApp'
                },

                activateJob: {
                    url: '/user/activateJob'
                },

                resetNewPassword: {
                    url: '/auth/resetPassword'
                },

                resetPasswordAndActivate: {
                    url: '/auth/activateOut'
                },

                saveProfileSettings: {
                    url: '/auth/saveProfileSettings'
                },

                getUserProfileSettings: {
                    url: '/auth/getUserProfileSettings'
                },

                unSubscribeMail: {
                    url: '/auth/unSubscribeMail'
                },
                collectCV: {
                    url: '/collect/cvcollect'
                },
                collectCVFromEmail: {
                    url: '/collect/emailcollect'
                },
                jobCriteriaList: {
                    url: '/user/jobCriteriaList'
                },
                citiesList: {
                    url: '/user/getCitiesList'
                },
                referralList : {
            	      url : "/links/referrals"
                },
                referralListOfOther : {
                    url : "/links/referrals"
                },
                newReferralLink : {
                    url : "/links/referrals"
                },
                newReferralLinkForUser : {
                    url : "/links/referralsForOtherUser"
                },
                shareReferralLink : {
                    url : "/links/shareInsideReferral"
                },
                shareResumeToParentLink : {
                    url : "/links/shareWithParent"
                },
                shareResumeToTarget : {
                    url : "/links/shareWithTarget"
                },
                updateResumeInterviewStt : {
                    url : "/user/resume/interview/update"
                },
                updateResumeJobStt : {
                    url : "/user/resume/job-status/update"
                },
                deleteReferralLink : {
                    url : "/links/referrals"
                },
                referredResumesList : {
                    url : "/links/resumes"
                },
                targetResumeDetailLink : {
                    url : "/user/resume/{id}/detail"
                },
                jobSpecList : {
                    url : "/links/jobReferrals"
                },
                listChildRefLinks : {
                    url : "/links/childRefLinks"
                },
                referralContent : {
                    url : "/links/referral/{referralLink}/detail"
                },
                resumeTokenLink : {
                    url : "/user/getSharedResumeAccessToken"
                }
        	}
        });
