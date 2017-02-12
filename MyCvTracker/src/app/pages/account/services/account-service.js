

    angular.module('BlurAdmin.pages.account')

    	.factory('AccountSvc', ['toastr', 'RestConfig', '$injector',

            function (toastr, RestConfig, $injector) {

                var $q = $injector.get('$q');
                var AccessToken = $injector.get('AccessToken');
                var Utilities = $injector.get('Utilities');

                //AccessToken.removeToken();

            	return  {

                    getUser: function () {

                        var defered = $q.defer();

                        var token = AccessToken.getToken();

                        if ( token ) {

                            var user = {

                                id: token.getUserId(),
                                userRole: token.getUserRole(),
                                email: token.getUserEmail(),
                                firstName: token.getFirstName(),
                                lastName: token.getLastName()
                            };

                            defered.resolve(user);
                        }

                        else {
                            defered.reject({status: 401});
                        }

                        return defered.promise;
                    },

                    saveProfileSettings: function(obj){
                        var url = Utilities.saveProfileSettingsUrl();
                        return RestConfig.saveProfileSettings(url, obj);
                    },

                    getUserProfileSettings: function(){
                        var url = Utilities.getUserProfileSettingsUrl();
                        return RestConfig.getUserProfileSettings(url);
                    },

                    unSubscribeMail: function(type){
                        var url = Utilities.unSubscribeMailUrl()+"?emailType="+type;
                        return RestConfig.unSubscribeMail(url);
                    },

                    openUnsubscribeModal: function (scope, ctrlName) {

                        var modalOpts = {
                            templateUrl: '/app/pagesresumes/templates/warning.html',
                            controller: ctrlName,
                            scope: scope
                        };

                        return $injector.get('$uibModal').open(modalOpts);
                    }
            	};
            }
        ]);
