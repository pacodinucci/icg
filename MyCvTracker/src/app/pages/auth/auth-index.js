(function () {
  'use strict';

  angular.module('MyCvTracker.pages.auth', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/pages/auth/templates/login.html',
          title: 'Login',
          controller: 'AuthCtrl',
          shown:false,
          sidebarMeta: {
            order: 800,
          },
        });

      $stateProvider
          .state('register', {
              url: '/register',
              controller: 'AuthCtrl',
              templateUrl: 'app/pages/auth/templates/register.html',
              title: 'Sign Up',
              shown:false,
              sidebarMeta: {
                  order: 800,
              },
          });

      $stateProvider
          .state('resetPassword', {
              url: '/resetPassword',
              controller: 'AuthCtrl',
              templateUrl: 'app/pages/auth/templates/resetPassword.html',
              title: 'Reset Password',
              shown:false,
              sidebarMeta: {
                  order: 800,
              },
          });

       $stateProvider
        .state('activateOut', {
            url: '/activateOut',
            controller: 'AuthCtrl',
            templateUrl: 'app/pages/auth/templates/activateout.html',
            title: 'Reset Password & Activate Account',
            shown:false,
            sidebarMeta: {
                order: 800,
            },
        });

      $stateProvider
          .state('activateAccount', {
              url: '/activateAccount',
              controller: 'AuthCtrl',
              templateUrl: 'app/pages/auth/templates/reactivate.html',
              title: 'activate',
              shown:false,
              sidebarMeta: {
                  order: 800,
              },
          });
  }

})();
