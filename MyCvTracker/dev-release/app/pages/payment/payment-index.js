(function () {
  'use strict';

  angular.module('MyCvTracker.pages.payment', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('payment', {
          url: '/payment',
          templateUrl: 'app/pages/payment/templates/payment.html',
          title: 'Payment',
          shown: false,
          requiresPermission:true,
            sidebarMeta: {
            icon: 'fa fa-money',
            order: 800,
          },
        });

      $stateProvider
          .state('paymentSuccess', {
              url: '/paymentSuccess',
              templateUrl: 'app/pages/payment/templates/paymentSuccess.html',
              controller: 'PaymentCtrl'
          });
  }

})();
