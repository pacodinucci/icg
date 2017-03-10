(function () {
    'use strict';

    angular.module('ITCG.pages.dashboard', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {

        $stateProvider

            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/pages/authenticatedPages/dashboard/dashboard.html',
                title: 'dashboard',
                sidebarMeta: {
                    icon: 'fa fa-info-circle',
                    order: 4,
                }
            })
    }

})();
