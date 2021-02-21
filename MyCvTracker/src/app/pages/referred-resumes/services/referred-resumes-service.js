angular.module("MyCvTracker.pages.referredResumes")
  .factory("ReferredResumesService", [
    "toastr",
    "RestConfig",
    "$injector",
    function (
      toastr,
      RestConfig,
      $injector
    ) {
      var utilities = $injector.get("Utilities");

      return {
        getReferredResumes: function(referralLink) {
          var url = utilities.getReferredResumeListUrl();
          return RestConfig.getReferredResumeList(url, referralLink);
        },
        getChildLinks: function(parentLink) {
          var url = utilities.getChildRefLinks();
          return RestConfig.getChildRefLinkList(url, parentLink);
        }
      };
    }
  ]);
