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
        sharingSuccess : false
      };

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
        ResumesSvc.downloadMyResume(id);
        toastr.success(Utilities.getAlerts("resumeDownloadSuccess").message);
      };

      $scope.openPreviewResume = function (id, fileType) {
        service.getResumeToken(id, referralLink)
          .then(function (data) {
            var url = "https://mycvtracker.com:8080/user/previewResume?accessToken=" + data.token;
            if (fileType !== "application/pdf") {
              url = "https://view.officeapps.live.com/op/embed.aspx?src=" + url;
            }

            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            link.remove();
          }, function () {
          });
      };

      $scope.ableToShare = function (status) {
        return !!parentLink && status === $scope.JOB_STATUS.APPLIED_JOB;
      };

      $scope.openShareResumeModal = function (resume) {
        $scope.referredResumes.shareResume = resume;
        $scope.resumesModal = service.getSharingResumeModal($scope, "ReferalModalCtrl");
      };

      $scope.shareReferredResumes = function () {
        var id = $scope.referredResumes.shareResume.id;
        $scope.referredResumes.sharing = true;

        service.shareResumeToParent(id, referralLink)
          .then(function () {
            $scope.referredResumes.shareResume.resumeStatus = $scope.JOB_STATUS.SHARED_WITH_TARGET;
            $scope.referredResumes.sharingSuccess = true;
            $scope.referredResumes.sharing = false;
          }, function () {
            $scope.referredResumes.shareResume.resumeStatus = $scope.JOB_STATUS.SHARED_WITH_TARGET;
            $scope.referredResumes.sharingSuccess = true;
            $scope.referredResumes.sharing = false;
          });
      };

      $scope.closeModal = function () {
        $scope.resumesModal.dismiss();
        $scope.referredResumes.shareId = null;
        $scope.referredResumes.sharing = false;
        $scope.referredResumes.sharingSuccess = false;
      };

      $scope.init = function () {
        var params = $location.search();
        referralLink = params.referralLink;
        parentLink = params.parentLink;

        $scope.loadListReferredResumes(referralLink);
      };

      $scope.init();
    }
  ]);
