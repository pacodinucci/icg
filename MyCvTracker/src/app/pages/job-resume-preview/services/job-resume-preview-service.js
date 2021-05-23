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
        getJobDetail: function(accessToken, previewToken, extendToken) {
          var url = Constants.baseUrl + "/user/resume/ref/detail";
          return RestConfig.getJobSpecDetailFromAccessToken(url, accessToken, previewToken, extendToken);
        },
        getResumeReviews: function(resumeId) {
          var url = Constants.baseUrl + "/user/resume/" + resumeId + "/reviews/list";
          return RestConfig.getResumeReviews(url);
        },
        extendResumePreview: function(token) {
          var url = Constants.baseUrl + "/user/resume/preview/extend";
          return RestConfig.extendResumePreviewFromToken(url, token);
        },
        submitResumeReview: function(accessToken, previewToken, email, review) {
          var url = Constants.baseUrl + "/user/resume/review/new";

          return RestConfig.leaveResumeReview(url, accessToken, previewToken, email, review);
        }
      };
    }
  ]);
