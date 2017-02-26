(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payment', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var Authorization = angular.injector(['BlurAdmin.shared']).get('Authorization');
    $stateProvider
        .state('payment', {
          url: '/payment',
          templateUrl: 'app/pages/payment/templates/payment.html',
          title: 'Payment',
          shown:Authorization.getUserRole() == 'ADMIN',
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
