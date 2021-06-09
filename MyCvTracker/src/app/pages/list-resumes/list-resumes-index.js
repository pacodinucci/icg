(function () {
  "use strict";

  angular.module("MyCvTracker.pages.resumeListing", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("resumesList", {
        url : "/resumes-list",
        templateUrl : "app/pages/list-resumes/templates/index.html",
        title : "Resumes List",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }
})();
