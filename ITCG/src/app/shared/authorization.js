	
    angular.module('ITCG.shared')

    	.factory('Authorization', ['$injector','$http','ipCookie','Constants',

            function ($injector,$http,ipCookie,Constants) {

                var $q = $injector.get('$q');
                var AccessToken = $injector.get('AccessToken');
                
            	var authorization = {
                    isAuthenticated: function () {
                            var token = ipCookie(Constants.accessCookie);
                            return token!=null;
                    },

                    getUserRole : function () {
                        return AccessToken.getToken().userRole;
                    }
            	};

                return authorization;
            }
        ]);
