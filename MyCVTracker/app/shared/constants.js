

    angular.module('BlurAdmin.shared')

        .constant('Constants', {

        	contentType: 'application/json',
            accessCookie: 'MyCVTracker.user.auth',

            appName:'MyCVTracker',

            headers: {
                authorization: 'Authorization'
            },

            baseUrl: 'https://www.mycvtracker.com:8080',

            websocket:{
                reconnect: 5000,
                // webSocketUrl: 'http://localhost:20000/messages',
                webSocketUrl: 'https://mycvtracker.com:8080/messages',
                notificationsDestination: '/topic/notifications',
                sendUrl: '/app/messages'
            },

            fileUpload: {
                fileSizeLimitInByte : 2100100
            },

            jobsSearchCriteriaType: {
                JOBS_CRITERIA_TYPE_SALARY : '1',
                JOBS_CRITERIA_TYPE_LOCATION : '2',
                JOBS_CRITERIA_TYPE_JOB_TYPE : '3',
                JOBS_CRITERIA_TYPE_RECRUITER : '4',
                JOBS_CRITERIA_TYPE_JOB_TITLE : '5'
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

                saveResume: {
                	url: '/user/saveResume'
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

                CvMarketing: {
                    url: '/user/saveCVMarketingRequest'
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
                notes: {
                    url: '/user/notesList'
                },

                viewNotes: {
                    url: '/user/viewNotes'
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
                editNotes : {
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
                }
        	}
        });
