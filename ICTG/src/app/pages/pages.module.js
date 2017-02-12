/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('ICTG.pages', [
        'ui.router',
        'ICTG.pages.jobs',
        'ICTG.pages.about',
    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider,$locationProvider) {
        $urlRouterProvider.otherwise('/jobs');
        $locationProvider.html5Mode(true);
    }

})();