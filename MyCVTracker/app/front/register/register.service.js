	
    angular.module('BlurAdmin.front.register')

    	.factory('RegisterSvc', ['$rootScope', 'RestConfig', '$injector','$http',

            function ($rootScope, RestConfig, $injector) {

                var $q = $injector.get('$q');
                var AccessToken = $injector.get('AccessToken');
                var Utilities = $injector.get('Utilities');

            	var RegisterSvc = {

            		doRegister: function(registerModel) {
                        var url = Utilities.getRegisterUrl();
                        return RestConfig.doRegister(url, registerModel);
            		}
            	};

                return RegisterSvc;
            }
        ]);
