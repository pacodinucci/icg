(function () {
  'use strict';

  angular.module('MyCvTracker.pages.notifications', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('notifications', {
          url: '/notifications',
          templateUrl: 'app/pages/notifications/templates/notifications.html',
          title: 'Notifications',
          sidebarMeta: {
            icon: 'fa fa-bell',
            order: 7,
          },
        });
  }

})();
