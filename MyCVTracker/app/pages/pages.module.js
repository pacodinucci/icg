/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.account',
    'BlurAdmin.pages.notes',
    'BlurAdmin.pages.jobs',
    'BlurAdmin.pages.resumes',
    'BlurAdmin.pages.trackResume',
    'BlurAdmin.pages.payment',
    'BlurAdmin.pages.notifications',
    'BlurAdmin.pages.auth',
    'BlurAdmin.pages.CampaignNotes',
    'BlurAdmin.pages.CvMarketing',
    'BlurAdmin.pages.campaignNotifications'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider,$locationProvider) {
      // use the HTML5 History API
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/dashboard');
  }

})();
