(function () {
  "use strict";

  angular.module("MyCvTracker.pages.referral", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("referral", {
        url : "/referral",
        templateUrl : "app/pages/referral/templates/index.html",
        title : "Referral",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }

})();
