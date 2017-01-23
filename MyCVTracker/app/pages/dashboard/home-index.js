(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/pages/dashboard/templates/home.html',
          title: 'Dashboard',
          sidebarMeta: {
                icon: 'ion-android-laptop',
                order: 1,
            },
        });
  }

})();
