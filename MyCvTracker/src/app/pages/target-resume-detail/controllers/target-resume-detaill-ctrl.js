angular.module("MyCvTracker.pages.targetResumeDetail")
  .controller("TargetResumeDetailCtrl", [
    "Constants",
    "toastr",
    "$rootScope",
    "$scope",
    "$injector",
    "$http",
    "Authorization",
    "$location",
    function (
      Constants,
      toastr,
      $rootScope,
      $scope,
      $injector,
      $http,
      Authorization,
      $location
    ) {
      $scope.JOB_STATUS = Constants.jobAppStatus;

      var Utilities = $injector.get("Utilities");
      var mainSvc = $injector.get("TargetResumeDetailService");

      var accesstoken = null, resumeId = null;

      $scope.resumeData = {
        detail : {},
        job : {},
        updateSttInput : "select",
        sharing : false
      }

      $scope.formatDateTime = function (utcStr) {
        return !!utcStr ? Utilities.getFormattedDate(utcStr) : "";
      };

      $scope.loadResumeDetail = function() {
        if (!!accesstoken && !!resumeId) {
          mainSvc.getResumeDetail(resumeId, accesstoken).then(function(rpData) {
            $scope.resumeData.detail = rpData.resume;
            $scope.resumeData.job = rpData.referral;
          });
        }
      }

      $scope.updateInterviewStt = function() {
        var stt = $scope.resumeData.updateSttInput === "select" ? $scope.JOB_STATUS.SELECTED_FOR_INTERVIEW : $scope.JOB_STATUS.REJECTED_FOR_INTERVIEW;
        $scope.resumeData.sharing = true;
        mainSvc.updateResumeInterviewStatus(resumeId, accesstoken, stt)
          .then(function () {
            $scope.resumeData.detail.resumeStatus = stt;
            $scope.resumeData.sharing = false;
            $scope.closeModal();
          });
      }

      $scope.updateJobStt = function() {
        var stt = $scope.resumeData.updateSttInput === "select" ? $scope.JOB_STATUS.SELECTED_FOR_JOB : $scope.JOB_STATUS.REJECTED_FOR_JOB;
        $scope.resumeData.sharing = true;
        mainSvc.updateResumeJobStatus(resumeId, accesstoken, stt)
          .then(function () {
            $scope.resumeData.detail.resumeStatus = stt;
            $scope.resumeData.sharing = false;
            $scope.closeModal();
          });
      }

      $scope.openPreviewResume = function () {
        var url = "https://mycvtracker.com:8080/user/resume/" + resumeId + "/poster-preview?token=" + accesstoken;
        if ($scope.resumeData.detail.fileType !== "application/pdf") {
          url = "https://view.officeapps.live.com/op/embed.aspx?src=" + url;
        }

        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        link.remove();
      };

      $scope.downloadResume = function () {
        var url = "https://mycvtracker.com:8080/user/resume/" + resumeId + "/poster-download?token=" + accesstoken;

        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        toastr.success(Utilities.getAlerts("resumeDownloadSuccess").message);

        link.remove();
      };

      $scope.openStatusModal = function() {
        var status= $scope.resumeData.detail.resumeStatus;
        if (status === $scope.JOB_STATUS.APPLIED_JOB) {
          $scope.resumesModal = mainSvc.getInterviewResumeModal($scope, "ReferalModalCtrl");
        } else if (status === $scope.JOB_STATUS.SELECTED_FOR_INTERVIEW) {
          $scope.resumesModal = mainSvc.getJobResumeModal($scope, "ReferalModalCtrl");
        }
      }

      $scope.closeModal = function() {
        $scope.resumesModal.dismiss();
        $scope.resumeData.updateSttInput = "select";
        $scope.resumeData.sharing = false;
      }

      $scope.init = function () {
        var params = $location.search();
        accesstoken = params.token;
        resumeId = params.id;

        $scope.loadResumeDetail();
      };

      $scope.init();
    }
  ]);
