

    angular.module('icg.account')

    	.factory('AccountSvc', ['$rootScope', 'RestConfig', '$injector',

            function ($rootScope, RestConfig, $injector) {

                var $q = $injector.get('$q');
                var TokenSvc = $injector.get('TokenSvc');
                var Utilities = $injector.get('Utilities');

                //TokenSvc.removeToken();

            	return  {

                    getUser: function () {

                        var defered = $q.defer();

                        var token = TokenSvc.getToken();

                        if ( token ) {

                            var user = {

                                userId: token.getUserId(),
                                userRole: token.getUserRole(),
                                userEmail: token.getUserEmail(),
                                firstName: token.getFirstName(),
                                sessionId: token.getSessionId()
                            };

                            defered.resolve(user);
                        }

                        else { 
                            defered.reject({status: 401});
                        }                            

                        return defered.promise;
                    }
            	}; 
            }
        ]);
