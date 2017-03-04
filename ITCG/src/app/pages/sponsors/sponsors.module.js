(function () {
    'use strict';

    angular.module('ITCG.pages.sponsors', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {

        $stateProvider

            .state('sponsors', {
                url: '/sponsors',
                templateUrl: 'app/pages/sponsors/sponsors.html',
                title: 'sponsors',
                sidebarMeta: {
                    icon: 'fa fa-info-circle',
                    order: 4,
                }
            })
    }

})();

