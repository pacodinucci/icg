(function () {
    'use strict';

    angular.module('ITCG.pages.register', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {

        $stateProvider

            .state('register', {
                url: '/register',
                templateUrl: 'app/pages/publicPages/register/register.html',
                title: 'register',
                sidebarMeta: {
                    icon: 'fa fa-info-circle',
                    order: 4,
                }
            })
    }

})();

