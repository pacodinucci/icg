

    angular.module('ITCG.shared')

        .constant('Constants', {

        	contentType: 'application/json',
            accessCookie: 'ITCG.user.auth',

            appName:'IT Contractors Group',

            headers: {
                authorization: 'Authorization'
            },

            baseUrl: 'http://www.mycvtracker.com:20001',

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
            		url: '/register'
            	},

                activate: {
                    url: '/activate'
                },

            	login: {
            		url: '/login'
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

                jobsList: {
                    url: '/jobsList',
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

                jobCriteriaList: {
                    url: '/user/jobCriteriaList'
                },
                citiesList: {
                    url: '/user/getCitiesList'
                }
        	}
        });
