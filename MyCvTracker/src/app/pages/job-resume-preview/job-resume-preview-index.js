(function () {
  "use strict";

  angular.module("MyCvTracker.pages.jobResumePreview", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("jobResumePreview", {
        url : "/job-resume-preview",
        templateUrl : "app/pages/job-resume-preview/templates/index.html",
        title : "Resume Preview",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }
})();
