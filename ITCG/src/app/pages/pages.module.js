/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('ITCG.pages', [
        'ui.router',
        'ITCG.pages.home',
        'ITCG.pages.about',
        'ITCG.pages.jobs',
        'ITCG.pages.events',
        'ITCG.pages.sponsors',
        'ITCG.pages.register',
        'ITCG.pages.login',
        'ITCG.pages.contact',
    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider,$locationProvider) {
        $urlRouterProvider.otherwise('/jobs');
        $locationProvider.html5Mode(true);
    }

})();