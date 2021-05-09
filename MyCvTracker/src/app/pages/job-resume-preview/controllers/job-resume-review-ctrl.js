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
      var accessToken = "";
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

      $scope.listReviews = [];

      $scope.loadJobSpec = function () {
        mainSvc.getJobDetail(accessToken)
          .then(function (data) {
            $scope.jobDetail = data;
            $scope.resumePreview.tokenValid = true;
            $scope.loadPreview();
            $scope.loadListReviews();
          })
          .catch(function () {
            $scope.resumePreview.tokenValid = false;
          });
      };

      $scope.loadPreview = function () {
        var url = "https://mycvtracker.com:8080/user/previewResume?accessToken=" + accessToken;
        if (fileType !== "pdf") {
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

      $scope.submitReview = function () {
        var email = $scope.writingForm.email;
        var content = $scope.writingForm.content;

        var emailInvalid = !EMAIL_REGEX.test(email);
        $scope.writingForm.emailInvalid = emailInvalid;
        var contentInvalid = content.length <= 0;
        $scope.writingForm.contentInvalid = contentInvalid;

        if (!emailInvalid && !contentInvalid) {
          $scope.writingForm.submitting = true;
          mainSvc.submitResumeReview(accessToken, email, content)
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
        accessToken = params.accessToken;
        fileType = params.fileType;
        resumeId = params.id;

        // load job spec from access token
        $scope.loadJobSpec();
      };

      $scope.init();
    }
  ]);
