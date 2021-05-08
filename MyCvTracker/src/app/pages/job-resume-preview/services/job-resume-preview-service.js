angular.module("MyCvTracker.pages.jobResumePreview")
  .factory("JobResumePreviewService", [
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
      };
    }
  ]);
