(function () {
    'use strict';

    angular.module('ITCG.pages.contact', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {

        $stateProvider

            .state('contact', {
                url: '/contact',
                templateUrl: 'app/pages/publicPages/contact/contact.html',
                title: 'contact',
                sidebarMeta: {
                    icon: 'fa fa-info-circle',
                    order: 4,
                }
            })
    }

})();

