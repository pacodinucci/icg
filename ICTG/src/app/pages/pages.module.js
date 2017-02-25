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
        'ICTG.pages.home',
    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider,$locationProvider) {
        $urlRouterProvider.otherwise('/jobs');
        $locationProvider.html5Mode(true);
    }

})();