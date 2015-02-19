

    angular.module('icg.shared')

        .constant('Configs', {

        	contentType: 'application/json',
            accessCookie: 'icg.user.auth',

            headers: {
                authorization: 'Authorization'
            },
       
       		baseUrl: 'http://localhost:3000',

            apis: {

            	register: {
            		url: '/auth/signup'
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

                changePassword: {
                    url: '/auth/changePassword'                
                },

                myResumes: {
                    url: '/user/resumes'
                },

                trackResume: {
                    url: '/user/trackResume'
                }
        	}        
        });