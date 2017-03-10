(function () {
    'use strict';

    angular.module('ITCG.pages.events', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {

        $stateProvider

            .state('events', {
                url: '/events',
                templateUrl: 'app/pages/publicPages/events/events.html',
                title: 'events',
                sidebarMeta: {
                    icon: 'fa fa-info-circle',
                    order: 4,
                }
            })
    }

})();

