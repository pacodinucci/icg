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
        extendToken = "";
      var fileType = "";
      var resumeId = "";

      $scope.resumePreview = {
        tokenValid : null,
        url : null
      };

      $scope.jobDetail = {};

      $scope.writingForm = {
        email : "",
        content : "",
        submitting : false,
        submitted : false,
        expired : false,
        emailInvalid : false,
        contentInvalid : false
      };

      $scope.extendForm = {
        submitting : false,
        submitted : false,
        failed : false
      };

      $scope.listReviews = [];

      $scope.loadJobSpec = function () {
        mainSvc.getJobDetail(accessToken, previewToken, extendToken)
          .then(function (data) {
            $scope.jobDetail = data;
            fileType = data.fileType;
            resumeId = data.resumeId;
            $scope.resumePreview.tokenValid = true;
            $scope.loadPreview();

            if (!extendToken) {
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

      $scope.extendPreview = function() {
        $scope.extendForm.submitting = true;
        mainSvc.extendResumePreview(extendToken).then(function () {
          $scope.extendForm.submitted = true;
          $scope.extendForm.failed = false;
          $scope.extendForm.submitting = false;
        }).catch(function() {
          $scope.extendForm.submitted = false;
          $scope.extendForm.failed = true;
          $scope.extendForm.submitting = false;
        });
      }

      $scope.submitReview = function () {
        var email = $scope.writingForm.email;
        var content = $scope.writingForm.content;

        var emailInvalid = !EMAIL_REGEX.test(email);
        $scope.writingForm.emailInvalid = emailInvalid;
        var contentInvalid = content.length <= 0;
        $scope.writingForm.contentInvalid = contentInvalid;

        if (!emailInvalid && !contentInvalid) {
          $scope.writingForm.submitting = true;
          mainSvc.submitResumeReview(accessToken, previewToken, email, content)
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

      $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
      };

      $scope.formatDateTime = function (utcStr) {
        return !!utcStr ? Utilities.getFormattedDate(utcStr) : "";
      };

      $scope.init = function () {
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

        // load job spec from access token
        $scope.loadJobSpec();
      };

      $scope.init();
    }
  ]);
