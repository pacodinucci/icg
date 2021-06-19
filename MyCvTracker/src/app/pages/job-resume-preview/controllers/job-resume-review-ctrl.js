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
      var reviewToken = "";
      var pdfViewerHeight = window.innerHeight - 100;

      var userDetail = Authorization.getUserDetails();
      var rqUserId = 0;
      var isAdminUser = false;
      if (!!userDetail) {
        rqUserId = userDetail.id;
        userEmail = userDetail.email;
        var role = userDetail.userRole;
        isAdminUser = role === "ADMIN";
      }

      $scope.resumePreview = {
        tokenValid : null,
        url : null,
        rqUserId : rqUserId,
        loginRedirect : "",
        withReviewToken : false,
        reviewTokenExpired : false,
        pdfViewerHeight : pdfViewerHeight,
        isAdminUser : isAdminUser
      };

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
              if (!reviewToken) {
                $scope.loadListReviews();
              } else {
                $scope.loadReviewByToken();
              }
            } else {
              $scope.jobDetail["isExtend"] = true;
            }
          })
          .catch(function () {
            $scope.resumePreview.pdfViewerHeight = 0;
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
        var url = "";
        if (fileType !== "application/pdf") {
          url = "https://view.officeapps.live.com/op/embed.aspx?src=" + url;
        } else {
          url = "https://mycvtracker.com/pdf-viewer.html?pdf=https://mycvtracker.com:8080/user/previewResume?" + param;
        }

        $scope.resumePreview.url = url;
      };

      $scope.loadListReviews = function () {
        mainSvc.getResumeReviews(resumeId)
          .then(function (data) {
            $scope.listReviews = data;
          });
      };

      $scope.loadReviewByToken = function () {
        mainSvc.getReview(reviewToken)
          .then(function (data) {
            $scope.listReviews.push(data);
          })
          .catch(function () {
            reviewToken = null;
            $scope.resumePreview.reviewTokenExpired = true;
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

      $scope.activeReply = function (review) {
        if (!review["replyActive"]) {
          review.listReply = [];
          review["replyActive"] = true;

          var reviewId = review.id;

          // load list comments
          mainSvc.getReviewComments(reviewId, reviewToken)
            .then(function (data) {
              review.listReply = data;
            });
        }
      };

      $scope.writeReviewComment = function (review) {
        if (!review.inReviewSubmitting) {
          review.inReviewSubmitting = true;
          var reviewId = review.id;
          var content = review.replyContent;

          if (!!content) {
            review.replyContent = "";

            mainSvc.submitReviewComment(reviewId, content, reviewToken)
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
                toastr.error("You are not authorized to reply to this thread!");
                review.inReviewSubmitting = false;
              });
          }
        }
      };

      $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
      };

      $scope.formatDateTime = function (utcStr) {
        return !!utcStr ? Utilities.getFormattedDate(utcStr) : "";
      };

      $scope.init = function () {
        var searchQuery = window.location.search;
        var reviewTokenIdx = searchQuery.indexOf("&accToken=");
        if (reviewTokenIdx > 0) {
          var newQuery = searchQuery.substring(0, reviewTokenIdx);
          var leftPart = searchQuery.substring(reviewTokenIdx + 1);
          var nextQueryIdx = leftPart.indexOf("&");
          var nextQuery = "";
          if (nextQueryIdx > 0) {
            nextQuery = leftPart.substring(nextQueryIdx);
          }

          searchQuery = newQuery + nextQuery;
        }

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
        if (!!params.accToken) {
          reviewToken = params.accToken;
        }

        $scope.resumePreview.loginRedirect = currentUrl;
        $rootScope.headerLoginRedirect = currentUrl;

        if (!!reviewToken) {
          $scope.resumePreview.withReviewToken = true;
        }

        // var iframeE = document.querySelector(".resume-preview-iframe iframe");
        // iframeE.setAttribute("height", pdfViewerHeight + "px");

        // load job spec from access token
        $scope.loadJobSpec();
      };

      $scope.$on("$destroy", function () {
        $rootScope.headerLoginRedirect = "";
      });

      $scope.init();
    }
  ]);
