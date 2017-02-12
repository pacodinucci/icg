(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    // $stateProvider
    //     .state('login', {
    //       url: '/login',
    //       templateUrl: 'app/pages/auth/templates/login.html',
    //       title: 'Login',
    //       sidebarMeta: {
    //         order: 800,
    //       },
    //     });

    $stateProvider
        .state('resetPassword', {
          url: '/resetPassword',
          templateUrl: 'app/pages/auth/templates/resetPassword.html',
          controller: 'AuthCtrl'
        });
  }

})();
