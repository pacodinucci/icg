(function () {
  "use strict";

  angular.module("MyCvTracker.pages.jobList", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("jobList", {
        url : "/jobs-list",
        templateUrl : "app/pages/list-jobs/templates/index.html",
        title : "Job List",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }
})();
