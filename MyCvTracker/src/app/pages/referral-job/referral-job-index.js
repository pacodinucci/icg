(function () {
  "use strict";

  angular.module("MyCvTracker.pages.referralJobSpec", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("referralJobSpec", {
        url : "/referral/job-spec",
        templateUrl : "app/pages/referral-job/templates/job-spec.html",
        title : "Job Spec",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }

})();
