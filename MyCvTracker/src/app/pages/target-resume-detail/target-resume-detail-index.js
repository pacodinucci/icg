(function () {
  "use strict";

  angular.module("MyCvTracker.pages.targetResumeDetail", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("targetResumeDetail", {
        url : "/target-resume-detail",
        templateUrl : "app/pages/target-resume-detail/templates/index.html",
        title : "Resume",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }
})();
