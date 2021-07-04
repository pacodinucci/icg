angular.module("MyCvTracker.pages.referredResumes")
  .controller("ReferredResumesCtrl", [
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
      $scope.SHARED_LEVEL = Constants.resumeSharedLevel;

      var Utilities = $injector.get("Utilities");
      var service = $injector.get("ReferredResumesService");
      var ResumesSvc = $injector.get("ResumesSvc");

      var isAdmin = Authorization.getUserRole() === "ADMIN";
      var referralLink = "",
        parentLink = "";
      var childLinks = [];

      $scope.resumesModal = null;
      $scope.referredResumes = {
        list : [],
        shareResume : null,
        sharing : false,
        sharingSuccess : false,
        updateSttInput : "select",
        isChildRef : false,
        detail : {}
      };

      $scope.loadRefContent = function(refCode) {
        service.getReferralDetail(refCode).then(function (rpData) {
          $scope.referredResumes.detail = rpData;
        });
      }

      $scope.loadListReferredResumes = function (refCode) {
        service.getReferredResumes(refCode)
          .then(function (rpData) {
            if (rpData && rpData.length > 0) {
              var oldList = $scope.referredResumes.list;
              $scope.referredResumes.list = oldList.concat(rpData);
            }
          });
      };

      $scope.loadListChildLinks = function () {
        service.getChildLinks(referralLink)
          .then(function (rpData) {
            childLinks = rpData;

            $scope.loadListReferredResumesOfChild();
          });
      };

      $scope.loadListReferredResumesOfChild = function () {
        for (
          var i = 0,
            len = childLinks.length; i < len; i++
        ) {
          var link = childLinks[i];
          var childRefLink = link.referralLink;
          var status = link.jobAppStatus;
          if (status === $scope.JOB_STATUS.SHARED_WITH_TARGET) {
            $scope.loadListReferredResumes(childRefLink);
          }
        }
      };

      $scope.formatDateTime = function (utcStr) {
        return !!utcStr ? Utilities.getFormattedDate(utcStr) : "";
      };

      $scope.downloadMyResume = function (id) {
        service.getResumeToken(id, referralLink)
          .then(function (data) {
          console.log("token", data.token);
            // var url = "https://mycvtracker.com:8080/user/downloadResume?accessToken=" + data.token;
            //
            // const link = document.createElement('a');
            // link.href = url;
            // link.target = '_blank';
            // document.body.appendChild(link);
            // link.click();
            // toastr.success(Utilities.getAlerts("resumeDownloadSuccess").message);
            //
            // link.remove();
          }, function () {
          });
      };

      $scope.openPreviewResume = function (id, fileType) {
        service.getResumeToken(id, referralLink)
          .then(function (data) {
            // var url = "https://mycvtracker.com:8080/user/previewResume?accessToken=" + data.token;
            // if (fileType !== "application/pdf") {
            //   url = "https://view.officeapps.live.com/op/embed.aspx?src=" + url;
            // }
            var url =  "/job-resume-preview?accessToken=" + data.token;

            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            link.remove();
          }, function () {
          });
      };

      $scope.isShareToTarget = function(sharedLevel) {
        return !$scope.referredResumes.isChildRef && (!sharedLevel || sharedLevel === $scope.SHARED_LEVEL.PARENT);
      }

      $scope.ableToShare = function (sharedLevel) {
        if ($scope.referredResumes.isChildRef) {
          return sharedLevel === null;
        } else {
          return  !sharedLevel || sharedLevel === $scope.SHARED_LEVEL.PARENT;
        }
      };

      $scope.ableToUpdate = function (sharedLevel, resumeStatus) {
        return $scope.ableToShare(sharedLevel) && (resumeStatus === $scope.JOB_STATUS.APPLIED_JOB || resumeStatus === $scope.JOB_STATUS.SELECTED_FOR_INTERVIEW ||
          resumeStatus === $scope.JOB_STATUS.SELECTED_FOR_INTERVIEW);
      };

      $scope.openShareResumeModal = function (resume) {
        $scope.referredResumes.shareResume = resume;
        $scope.resumesModal = service.getSharingResumeModal($scope, "ReferalModalCtrl");
      };

      $scope.openStatusModal = function (resume) {
        var status= resume.resumeStatus;
        $scope.referredResumes.shareResume = resume;
        if (status === $scope.JOB_STATUS.APPLIED_JOB) {
          $scope.resumesModal = service.getInterviewResumeModal($scope, "ReferalModalCtrl");
        } else if (status === $scope.JOB_STATUS.SELECTED_FOR_INTERVIEW) {
          $scope.resumesModal = service.getJobResumeModal($scope, "ReferalModalCtrl");
        }
      };

      $scope.shareReferredResumes = function () {
        var resume = $scope.referredResumes.shareResume;
        var id = resume.id;
        var sharedLevel = resume.sharedWith;

        var isToTarget = $scope.isShareToTarget(sharedLevel);
        var shareFunc = isToTarget ? service.shareResumeToTarget : service.shareResumeToParent;

        $scope.referredResumes.sharing = true;
        shareFunc(id)
          .then(function () {
            $scope.referredResumes.shareResume.sharedWith = isToTarget ? $scope.SHARED_LEVEL.JOB_POSTER : $scope.SHARED_LEVEL.PARENT;
            $scope.referredResumes.sharingSuccess = true;
            $scope.referredResumes.sharing = false;
          });
      };

      $scope.updateInterviewStt = function () {
        var resume = $scope.referredResumes.shareResume;
        var id = resume.id;
        var stt = $scope.referredResumes.updateSttInput === "select" ? $scope.JOB_STATUS.SELECTED_FOR_INTERVIEW : $scope.JOB_STATUS.REJECTED_FOR_INTERVIEW;

        $scope.referredResumes.sharing = true;
        service.updateResumeInterviewStatus(id, stt)
          .then(function () {
            $scope.referredResumes.shareResume.resumeStatus = stt;
            $scope.referredResumes.sharingSuccess = true;
            $scope.referredResumes.sharing = false;
            $scope.closeModal();
          });
      };

      $scope.updateJobStt = function () {
        var resume = $scope.referredResumes.shareResume;
        var id = resume.id;
        var stt = $scope.referredResumes.updateSttInput === "select" ? $scope.JOB_STATUS.SELECTED_FOR_JOB : $scope.JOB_STATUS.REJECTED_FOR_JOB;

        $scope.referredResumes.sharing = true;
        service.updateResumeJobStatus(id, stt)
          .then(function () {
            $scope.referredResumes.shareResume.resumeStatus = stt;
            $scope.referredResumes.sharingSuccess = true;
            $scope.referredResumes.sharing = false;
            $scope.closeModal();
          });
      };

      $scope.closeModal = function () {
        $scope.resumesModal.dismiss();
        $scope.referredResumes.shareId = null;
        $scope.referredResumes.sharing = false;
        $scope.referredResumes.sharingSuccess = false;
        $scope.referredResumes.updateSttInput = "select";
      };

      $scope.init = function () {
        var params = $location.search();
        referralLink = params.referralLink;
        parentLink = params.parentLink;

        $scope.referredResumes.isChildRef = !!parentLink;
        $scope.loadListReferredResumes(referralLink);
        $scope.loadRefContent(referralLink);
      };

      $scope.init();
    }
  ]);
