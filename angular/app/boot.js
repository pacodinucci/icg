
    (function () {

    	var appConfig = {

    		appName: 'IT Contractors Group',
    		appLogo: 'img/logo.jpg',
    	}
        
        try {

        	angular.module('icg.config', []).constant('appConfig', appConfig);

            angular.element(document).ready(function () {
                angular.bootstrap(document, ['icg']);
            });

        } catch (exception) {
            
        }

    })();