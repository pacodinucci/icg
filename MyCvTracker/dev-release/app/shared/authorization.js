	
    angular.module('MyCvTracker.shared')

    	.factory('Authorization', ['$injector','$http','$window',

            function ($injector,$http,$window) {

                var $q = $injector.get('$q');

            	var authorization = {

                    getUserDetails : function () {
                        if($window.sessionStorage.loggedInUser){
                            return angular.fromJson($window.sessionStorage.loggedInUser);
                        }else {
                            return angular.fromJson($window.localStorage.loggedInUser);
                        }
                        return null;
                    },

                    getUserRole : function () {
                        return this.getUserDetails().userRole;
                    }
            	};

                return authorization;
            }
        ]);
