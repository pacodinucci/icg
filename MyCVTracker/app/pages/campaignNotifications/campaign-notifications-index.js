(function () {
  'use strict';

  angular.module('BlurAdmin.pages.campaignNotifications', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('CampaignNotifications', {
          url: '/CampaignNotifications',
          templateUrl: 'app/pages/campaignNotifications/templates/campaign_notifications.html',
          title: 'CV Marketing Notifications',
          sidebarMeta: {
              icon:'fa fa-paper-plane-o',
              order: 10
          },
        });
  }

})();
