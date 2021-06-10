angular.module("MyCvTracker.pages.jobResumePreview")
  .controller("JobResumePreviewCtrl", [
    "Constants",
    "toastr",
    "$rootScope",
    "$scope",
    "$injector",
    "$http",
    "Authorization",
    "$location",
    "$sce",
    function (
      Constants,
      toastr,
      $rootScope,
      $scope,
      $injector,
      $http,
      Authorization,
      $location,
      $sce
    ) {
      var EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      var Utilities = $injector.get("Utilities");
      var mainSvc = $injector.get("JobResumePreviewService");
      var accessToken = "",
        previewToken = "",
        extendToken = "",
        originalToken = "",
        extendOriginalToken = "";
      var fileType = "";
      var resumeId = "";
      var userEmail = "";

      $scope.resumePreview = {
        tokenValid : null,
        url : null,
        rqUserId : 0,
        loginRedirect : ""
      };

      var userDetail = Authorization.getUserDetails();
      if (!!userDetail) {
        $scope.resumePreview.rqUserId = userDetail.id;
        userEmail = userDetail.email;
      }

      $scope.jobDetail = {};

      $scope.writingForm = {
        email : userEmail,
        content : "",
        submitting : false,
        submitted : false,
        expired : false,
        emailInvalid : false,
        contentInvalid : false,
        inAuth : !!userEmail
      };

      $scope.extendForm = {
        submitting : false,
        submitted : false,
        failed : false
      };

      $scope.listReviews = [];

      $scope.loadJobSpec = function () {
          mainSvc.getJobDetail(accessToken, previewToken, extendToken, originalToken, extendOriginalToken)
            .then(function (data) {
              $scope.jobDetail = data;
              fileType = data.fileType;
              resumeId = data.resumeId;
              $scope.resumePreview.tokenValid = true;
              $scope.loadPreview();

              if (!extendToken && !extendOriginalToken) {
                $scope.loadListReviews();
              } else {
                $scope.jobDetail["isExtend"] = true;
              }
            })
            .catch(function () {
              $scope.resumePreview.tokenValid = false;
            });
      };

      $scope.loadPreview = function () {
        var param = "";
        if (!!accessToken) {
          param = "accessToken=" + accessToken;
        } else if (!!previewToken) {
          param = "token=" + previewToken;
        } else if (!!extendToken) {
          param = "extendToken=" + extendToken;
        } else if (!!originalToken) {
          param = "originalToken=" + originalToken;
        } else if (!!extendOriginalToken) {
          param = "extendOriginalToken=" + extendOriginalToken;
        }
        var url = "https://mycvtracker.com:8080/user/previewResume?" + param;
        if (fileType !== "application/pdf") {
          url = "https://view.officeapps.live.com/op/embed.aspx?src=" + url;
        }

        $scope.resumePreview.url = url;
      };

      $scope.loadListReviews = function () {
        mainSvc.getResumeReviews(resumeId)
          .then(function (data) {
            $scope.listReviews = data;
          });
      };

      $scope.extendPreview = function () {
        $scope.extendForm.submitting = true;
        mainSvc.extendResumePreview(extendToken, extendOriginalToken)
          .then(function () {
            $scope.extendForm.submitted = true;
            $scope.extendForm.failed = false;
            $scope.extendForm.submitting = false;
          })
          .catch(function () {
            $scope.extendForm.submitted = false;
            $scope.extendForm.failed = true;
            $scope.extendForm.submitting = false;
          });
      };

      $scope.submitReview = function () {
        var email = $scope.writingForm.email;
        var content = $scope.writingForm.content;

        var emailInvalid = !EMAIL_REGEX.test(email);
        $scope.writingForm.emailInvalid = emailInvalid;
        var contentInvalid = content.length <= 0;
        $scope.writingForm.contentInvalid = contentInvalid;

        if (!emailInvalid && !contentInvalid) {
          $scope.writingForm.submitting = true;
          mainSvc.submitResumeReview(accessToken, previewToken, originalToken, email, content)
            .then(function () {
              $scope.writingForm.submitted = true;
              $scope.writingForm.submitting = false;
            })
            .catch(function () {
              $scope.writingForm.expired = true;
              $scope.writingForm.submitting = false;
            });
        }
      };

      $scope.activeReply = function(review) {
        if (!review["replyActive"]) {
          review.listReply = [];
          review["replyActive"] = true;

          var reviewId = review.id;

          // load list comments
          mainSvc.getReviewComments(reviewId)
            .then(function (data) {
              review.listReply = data;
            });
        }
      }

      $scope.writeReviewComment = function(review) {
        if (!review.inReviewSubmitting) {
          review.inReviewSubmitting = true;
          var reviewId = review.id;
          var content = review.replyContent;

          if (!!content) {
            review.replyContent = "";

            mainSvc.submitReviewComment(reviewId, content)
              .then(function (data) {
                data.userEmail = "You";
                review.listReply.push(data);

                var noReply = review.noOfReply;
                if (!noReply) noReply = 0;
                noReply++;
                review.noOfReply = noReply;

                review.inReviewSubmitting = false;
              })
              .catch(function () {
                toastr.error("You are not authorized to leave a comment!");
                review.inReviewSubmitting = false;
              });
          }
        }
      }

      $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
      };

      $scope.formatDateTime = function (utcStr) {
        return !!utcStr ? Utilities.getFormattedDate(utcStr) : "";
      };

      $scope.init = function () {
        var searchQuery = window.location.search;
        var pathName = window.location.pathname;
        var currentUrl = pathName + searchQuery;

        var params = $location.search();
        if (!!params.accessToken) {
          accessToken = params.accessToken;
        }
        if (!!params.previewToken) {
          previewToken = params.previewToken;
        }
        if (!!params.extendToken) {
          extendToken = params.extendToken;
        }
        if (!!params.originalToken) {
          originalToken = params.originalToken;
        }
        if (!!params.extendOriginalToken) {
          extendOriginalToken = params.extendOriginalToken;
        }

        $scope.resumePreview.loginRedirect = currentUrl;
        $rootScope.headerLoginRedirect = currentUrl;

        // load job spec from access token
        $scope.loadJobSpec();
      };

      $scope.$on("$destroy", function() {
        $rootScope.headerLoginRedirect = "";
      });

      $scope.init();
    }
  ]);
