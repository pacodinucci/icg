(function () {
  "use strict";

  angular.module("MyCvTracker.pages.cvBoxCandidates", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("cvBoxCandidates", {
        url : "/cvbox",
        templateUrl : "app/pages/cvbox-candidates/templates/candidates-list.html",
        title : "Cv Box",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }
})();
