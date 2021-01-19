(function () {
  "use strict";

  angular.module("MyCvTracker.pages.userManagement", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("user-management", {
        url : "/user-management",
        templateUrl : "app/pages/user-management/templates/index.html",
        title : "User Management",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }

})();
