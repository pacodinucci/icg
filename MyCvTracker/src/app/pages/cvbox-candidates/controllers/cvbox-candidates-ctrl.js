angular.module("MyCvTracker.pages.cvBoxCandidates")
  .controller("CvBoxCtrl", [
    "Constants",
    "toastr",
    "$rootScope",
    "$scope",
    "$injector",
    "$http",
    "$location",
    function (
      Constants,
      toastr,
      $rootScope,
      $scope,
      $injector,
      $http,
      $location
    ) {
      var referralLink = "";

      var Utilities = $injector.get("Utilities");
      var service = $injector.get("CvBoxService");

      $scope.mainModal = null;
      $scope.cvboxDetail = {};
      $scope.candidates = [];
      $scope.removingInfo = {
        resume : null,
        idx : -1,
        removing : false
      };

      $scope.formatDateTime = function (utcStr) {
        return !!utcStr ? Utilities.getFormattedDate(utcStr) : "";
      };

      $scope.loadRefContent = function(refCode) {
        service.getReferralDetail(refCode).then(function (rpData) {
          $scope.cvboxDetail = rpData;
        });
      }

      $scope.loadBoxCandidates = function(refCode) {
        service.getCandidates(refCode).then(function (rpData) {
          $scope.candidates = rpData;
        });
      }

      $scope.removeCandidate = function() {
        $scope.removingInfo.removing = true;

        var idx = $scope.removingInfo.idx;
        var resumeId = $scope.removingInfo.resume.resumeId;
        var referralId = $scope.cvboxDetail.id;

        service.unregisterCandidate(referralId, resumeId).then(function () {
          $scope.candidates.splice(idx, 1);
          $scope.closeModal();
          toastr.success("The candidate has been removed successfully!");
        }).catch(function() {
          $scope.closeModal();
          toastr.error("Removing candidate has failed!");
        });
      }

      $scope.openPreviewResume = function (resume) {
        var url =  "/job-resume-preview?previewToken=" + resume.previewToken;

        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

      $scope.openRemoveModal = function(resume, idx) {
        $scope.removingInfo = {
          resume : resume,
          idx : idx
        };
        $scope.mainModal = service.getRemoveCandidateModal($scope, "CvBoxModalCtrl");
      }

      $scope.closeModal = function() {
        $scope.mainModal.dismiss();
        $scope.removingInfo = {
          resume : null,
          idx : -1,
          removing : false
        };
      }

      $scope.init = function () {
        var params = $location.search();
        referralLink = params.referralLink;

        $scope.loadRefContent(referralLink);
        $scope.loadBoxCandidates(referralLink);
      };

      $scope.init();
    }
  ]);


angular.module("MyCvTracker.pages.cvBoxCandidates")
  .controller("CvBoxModalCtrl", [
    "$scope",
    "$injector",
    function (
      $scope,
      $injector
    ) {
      var utilities = $injector.get("Utilities");

    }
  ]);
