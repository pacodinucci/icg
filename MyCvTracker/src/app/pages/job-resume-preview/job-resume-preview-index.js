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

(function () {
  "use strict";

  angular.module("MyCvTracker.pages.jobResumeLink", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("jobResumeLink", {
        url : "/resumes/:linkId",
        templateUrl : "app/pages/job-resume-preview/templates/index.html",
        title : "Resume Preview",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }
})();

(function () {
  "use strict";

  angular.module("MyCvTracker.pages.jobResumeLinkContext", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("jobResumeLinkContext", {
        url : "/resumes/:linkId/:contextId",
        templateUrl : "app/pages/job-resume-preview/templates/index.html",
        title : "Resume Preview",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }
})();
