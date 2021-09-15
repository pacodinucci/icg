(function () {
  "use strict";

  angular.module("MyCvTracker.pages.bulkFolderResumes", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("bulkFolderResumes", {
        url : "/bulk-folder-resumes",
        templateUrl : "app/pages/bulk-folder-resume/templates/resumes.html",
        title : "Bulk Folder Resumes",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }
})();
