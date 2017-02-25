(function () {
    'use strict';

    angular.module('ICTG.pages.home', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/pages/home/home.html'
            })
    }

})();
