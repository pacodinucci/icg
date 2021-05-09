angular.module("MyCvTracker.pages.jobResumePreview")
  .factory("JobResumePreviewService", [
    "Constants",
    "toastr",
    "RestConfig",
    "$injector",
    function (
      Constants,
      toastr,
      RestConfig,
      $injector
    ) {
      var utilities = $injector.get("Utilities");

      return {
        getJobDetail: function(accessToken) {
          var url = Constants.baseUrl + "/user/resume/ref/detail";
          return RestConfig.getJobSpecDetailFromAccessToken(url, accessToken);
        },
        getResumeReviews: function(resumeId) {
          var url = Constants.baseUrl + "/user/resume/" + resumeId + "/reviews/list";
          return RestConfig.getResumeReviews(url);
        },
        submitResumeReview: function(accessToken, email, review) {
          var url = Constants.baseUrl + "/user/resume/review/new";

          return RestConfig.leaveResumeReview(url, accessToken, email, review);
        }
      };
    }
  ]);
