(function () {
    'use strict';

    angular.module('ITCG.pages.login', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {

        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'app/pages/login/login.html',
                title: 'login',
                sidebarMeta: {
                    icon: 'fa fa-info-circle',
                    order: 4,
                }
            })
    }

})();

