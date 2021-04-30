angular.module("MyCvTracker.pages.socialRegistrations")
  .controller("SocialRegistrationCtrl", [
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
      $scope.SHARED_LEVEL = Constants.resumeSharedLevel;

      var Utilities = $injector.get("Utilities");
      var service = $injector.get("SocialRegistrationService");
      var resumesService = $injector.get("ReferredResumesService");

      var referralLink = "",
        parentLink = "";

      $scope.referredResumes = {
        list : [],
        shareResume : null,
        sharing : false,
        sharingSuccess : false,
        updateSttInput : "select",
        isChildRef : false,
        detail : {}
      };

      $scope.formatDateTime = function (utcStr) {

        return !!utcStr ? Utilities.getFormattedDate(utcStr) : "";
      };

      $scope.loadRefContent = function(refCode) {
        resumesService.getReferralDetail(refCode).then(function (rpData) {
          $scope.referredResumes.detail = rpData;
        });
      }

      $scope.loadListRegistrations = function (refCode) {
        service.getSocialRegistrations(refCode)
          .then(function (rpData) {
            if (rpData && rpData.length > 0) {
              var oldList = $scope.referredResumes.list;
              $scope.referredResumes.list = oldList.concat(rpData);
            }
          });
      };

      $scope.ableToShare = function (sharedLevel) {
        if ($scope.referredResumes.isChildRef) {
          return sharedLevel === null;
        }
      };

      $scope.shareSocialRegistration = function () {
        var resume = $scope.referredResumes.shareResume;
        var id = resume.id;

        $scope.referredResumes.sharing = true;
        service.shareSocialToParent(id)
          .then(function () {
            $scope.referredResumes.shareResume.sharedWith = $scope.SHARED_LEVEL.PARENT;
            $scope.referredResumes.sharingSuccess = true;
            $scope.referredResumes.sharing = false;
          });
      };

      $scope.openShareModal = function (resume) {
        $scope.referredResumes.shareResume = resume;

        var modalOpts = {
          templateUrl: 'app/pages/social-registrations/templates/share-registration-modal.html',
          controller: "SocialRegistrationModalCtrl",
          scope: $scope,
          backdrop: 'static'
        };

        $scope.resumesModal = $injector.get('$uibModal').open(modalOpts);
      };

      $scope.closeModal = function () {
        $scope.resumesModal.dismiss();
        $scope.referredResumes.sharing = false;
        $scope.referredResumes.sharingSuccess = false;
        $scope.referredResumes.shareResume = null;
      };

      $scope.init = function () {
        var params = $location.search();
        referralLink = params.referralLink;
        parentLink = params.parentLink;

        $scope.referredResumes.isChildRef = !!parentLink;

        $scope.loadRefContent(referralLink);
        $scope.loadListRegistrations(referralLink);
      };

      $scope.init();
    }
  ]);

angular.module("MyCvTracker.pages.socialRegistrations")
  .controller("SocialRegistrationModalCtrl", [
    "$scope",
    "$injector",
    function (
      $scope,
      $injector
    ) {
      var utilities = $injector.get("Utilities");

    }
  ]);
