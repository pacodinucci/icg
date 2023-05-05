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
        getJobDetail: function(accessToken, previewToken, extendToken, originalToken, extendOriginalToken, previewLinkId) {
          var url = Constants.baseUrl + "/user/resume/ref/detail";
          return RestConfig.getJobSpecDetailFromAccessToken(url, accessToken, previewToken, extendToken, originalToken, extendOriginalToken, previewLinkId);
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
        submitResumeReview: function(accessToken, previewToken, originalToken, email, review, name) {
          var url = Constants.baseUrl + "/user/resume/review/new";
          console.log("name", name);
          return RestConfig.leaveResumeReview(url, accessToken, previewToken, originalToken, email, review, name);
        },
        submitReviewComment : function(reviewId, content, reviewToken) {
          var url = Constants.baseUrl + "/user/resume/review/reply";

          return RestConfig.leaveReviewComment(url, reviewId, content, reviewToken);
        },
        getReviewComments: function(reviewId, reviewToken) {
          var url = Constants.baseUrl + "/user/reviews/" + reviewId + "/reply/list" + (!!reviewToken ? ("?reviewToken=" + reviewToken) : "");
          return RestConfig.getReviewComments(url);
        },
        maskExtraTextsInResume : function(resumeId, texts) {
          var url = Constants.baseUrl + "/user/resume/edit/text-mask";

          return RestConfig.maskTextsInResume(url, resumeId, texts);
        }
      };
    }
  ]);
