	
    angular.module('BlurAdmin.shared')

    	.factory('Authorization', ['$injector','$http',

            function ($injector,$http) {

                var $q = $injector.get('$q');
                var AccessToken = $injector.get('AccessToken');
                
            	var authorization = {
                    isAuthenticated: function () {
                            var token = AccessToken.getToken();
                            return token.getAccessToken() && token.getUserEmail();
                    },

                    getUserRole : function () {
                        return AccessToken.getToken().userRole;
                    }
            	};

                return authorization;
            }
        ]);
