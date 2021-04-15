angular.module("MyCvTracker.pages.targetResumeDetail")
  .factory("TargetResumeDetailService", [
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
        getResumeDetail: function(id, token) {
          var url = utilities.getTargetResumeDetailUrl(id);
          return RestConfig.getTargetResumeDetail(url, token);
        }
      };
    }
  ]);
