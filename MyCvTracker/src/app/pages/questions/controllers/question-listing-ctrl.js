angular.module("MyCvTracker.pages.questions")
  .controller("QuestionListingCtrl", [
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
      var mainSvc = $injector.get("QuestionDataSvc");


      var userDetail = Authorization.getUserDetails();
      var rqUserId = 0;
      var isAdminUser = false, isReviewer = false;
      if (!!userDetail) {
        rqUserId = userDetail.id;
        userEmail = userDetail.email;
        var role = userDetail.userRole;
        isAdminUser = role === "ADMIN";
        isReviewer = role === "REVIEWER";
      }

      $scope.questionDetail = {};
      $scope.questions = [];

      $scope.loadQuestions = function () {
       var type = $scope.interviewType;
        mainSvc.getQuestions(type)
          .then(function (data) {
            $scope.questions = data;
          });
      };

      $scope.editQuestions = function (question) {
          mainSvc.editQuestions(question)
            .then(function (data) {
              $scope.questions = data;
            });
      };

     $scope.addQuestion = function (question) {
          mainSvc.addQuestions(question)
            .then(function (data) {
              $scope.questions = data;
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


      $scope.trustSrc = function (src, cdt) {
        return $sce.trustAsResourceUrl((src + "%26cdt=" + cdt));
      };

      $scope.formatDateTime = function (utcStr) {
        return !!utcStr ? Utilities.getFormattedDate(utcStr) : "";
      };

      $scope.init = function () {
        $scope.loadQuestions();
      };

      $scope.$on("$destroy", function () {
        $rootScope.headerLoginRedirect = "";
      });

      $scope.init();
    }
  ]);
