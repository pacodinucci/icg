(function () {
  'use strict';

  angular.module('BlurAdmin.pages.campaignNotifications', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var Authorization = angular.injector(['BlurAdmin.shared']).get('Authorization');
    $stateProvider
        .state('CampaignNotifications', {
          url: '/CampaignNotifications',
          templateUrl: 'app/pages/campaignNotifications/templates/campaign_notifications.html',
          title: 'CV Marketing Notifications',
          controller: 'CampaignNotificationsCtrl',
          shown:Authorization.getUserRole() == 'ADMIN',
          sidebarMeta: {
              icon:'fa fa-paper-plane-o',
              order: 10,
          },
        });
  }

})();
