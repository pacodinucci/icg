(function () {
  'use strict';

  angular.module('BlurAdmin.pages.account', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('account', {
          url: '/account',
          templateUrl: 'app/pages/account/templates/account.html',
          title: 'Profile',
          sidebarMeta: {
            icon: 'fa fa-user',
            order: 2,
          },
        });

      $stateProvider
          .state('settings', {
              url: '/settings',
              templateUrl: 'app/pages/account/templates/settings.html',
              title: 'Settings'
          });

      $stateProvider
          .state('accountFromTrackingMail', {
              url: '/accountFromTrackingMail',
              templateUrl: 'app/pages/account/templates/accountFromMail.html',
              controller: 'AccountCtrl'
          });

      $stateProvider
          .state('accountFromNotificationMail', {
              url: '/accountFromNotificationMail',
              templateUrl: 'app/pages/account/templates/accountFromMail.html',
              controller: 'AccountCtrl'
          });
  }

})();
