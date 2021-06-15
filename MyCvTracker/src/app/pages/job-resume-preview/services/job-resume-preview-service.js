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
        getJobDetail: function(accessToken, previewToken, extendToken, originalToken, extendOriginalToken) {
          var url = Constants.baseUrl + "/user/resume/ref/detail";
          return RestConfig.getJobSpecDetailFromAccessToken(url, accessToken, previewToken, extendToken, originalToken, extendOriginalToken);
        },
        getResumeReviews: function(resumeId) {
          var url = Constants.baseUrl + "/user/resume/" + resumeId + "/reviews/list";
          return RestConfig.getResumeReviews(url);
        },
        getReview: function(token) {
          var url = Constants.baseUrl + "/user/resume/review/detail?token=" + token;
          return RestConfig.getReviewDetail(url);
        },
        extendResumePreview: function(token, originalToken) {
          var url = Constants.baseUrl + "/user/resume/preview/extend";
          return RestConfig.extendResumePreviewFromToken(url, token, originalToken);
        },
        submitResumeReview: function(accessToken, previewToken, originalToken, email, review) {
          var url = Constants.baseUrl + "/user/resume/review/new";

          return RestConfig.leaveResumeReview(url, accessToken, previewToken, originalToken, email, review);
        },
        submitReviewComment : function(reviewId, content, reviewToken) {
          var url = Constants.baseUrl + "/user/resume/review/reply";

          return RestConfig.leaveReviewComment(url, reviewId, content, reviewToken);
        },
        getReviewComments: function(reviewId, reviewToken) {
          var url = Constants.baseUrl + "/user/reviews/" + reviewId + "/reply/list" + (!!reviewToken ? ("?reviewToken=" + reviewToken) : "");
          return RestConfig.getReviewComments(url);
        },
      };
    }
  ]);
