

    angular.module('icg.shared')

        .constant('Configs', {

        	contentType: 'application/json',
            accessCookie: 'icg.user.auth',

            headers: {
                authorization: 'Authorization'
            },
       
            // dev
            //baseUrl: 'http://localhost:8080',
            //baseUrl: 'http://localhost:8080',
        
            // prod
            baseUrl: 'http://itcontractorsgroup.com:8080',
            

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
                	url: '/user/resumesList?userId='
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
                
                downloadResume: {
                    url: '/user/downloadResume?id='
                },
                notifications: {
                	url: '/notifications/notificationsList'
                }
        	}
        });