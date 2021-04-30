(function () {
  "use strict";

  angular.module("MyCvTracker.pages.socialRegistrations", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("socialRegistrations", {
        url : "/social-registrations",
        templateUrl : "app/pages/social-registrations/templates/index.html",
        title : "Social Registrations",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }
})();
