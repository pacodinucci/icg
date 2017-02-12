(function () {
    'use strict';

    angular.module('ICTG.pages.about', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {

        $stateProvider

            .state('about', {
                url: '/about',
                templateUrl: 'app/pages/about/about.html',
                title: 'About us',
                sidebarMeta: {
                    icon: 'fa fa-info-circle',
                    order: 4,
                }
            })
    }

})();
