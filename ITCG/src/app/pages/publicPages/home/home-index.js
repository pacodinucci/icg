(function () {
    'use strict';

    angular.module('ITCG.pages.home', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {

        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'app/pages/publicPages/home/home.html',
                title: 'Home',
                sidebarMeta: {
                    icon: 'fa fa-info-circle',
                    order: 4,
                }
            })
    }

})();
