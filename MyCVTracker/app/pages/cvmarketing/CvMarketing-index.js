(function () {
    'use strict';

    angular.module('BlurAdmin.pages.CvMarketing', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('CvMarketing', {
                url: '/CvMarketing',
                templateUrl: 'app/pages/cvmarketing/templates/CVMarketing.html',
                title: 'CV Marketing',
                sidebarMeta: {
                    icon:'fa fa-paper-plane-o',
                    order: 9
                },
            });

        $stateProvider
            .state('collectCV', {
                url: '/collectCV',
                templateUrl: 'app/pages/cvmarketing/templates/collectCV.html',
                controller: 'CvMarketingCtrl'
            });

        $stateProvider
            .state('collectCVFromEmail', {
                url: '/collectCVFromEmail',
                templateUrl: 'app/pages/cvmarketing/templates/collectCVFromMail.html',
                controller: 'CvMarketingCtrl'
            });
    }

})();
