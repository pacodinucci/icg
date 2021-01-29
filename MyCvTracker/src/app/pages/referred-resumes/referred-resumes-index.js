(function () {
  "use strict";

  angular.module("MyCvTracker.pages.referredResumes", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("referredResumes", {
        url : "/referred-resumes",
        templateUrl : "app/pages/referred-resumes/templates/index.html",
        title : "Referred Resumes",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }
})();
