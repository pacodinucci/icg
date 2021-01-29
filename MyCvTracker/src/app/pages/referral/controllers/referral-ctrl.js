angular.module("MyCvTracker.pages.referral")
  .controller("ReferralCtrl", [
    "toastr",
    "$rootScope",
    "$scope",
    "$injector",
    "$http",
    "Authorization",
    "$location",
    function (
      toastr,
      $rootScope,
      $scope,
      $injector,
      $http,
      Authorization,
      $location
    ) {
      var Utilities = $injector.get("Utilities");
      var AccountSvc = $injector.get("AccountSvc");
      var ReferralSvc = $injector.get("ReferralSvc");

      var userId = 0;
      var userEmail = "";

      $scope.referralModal = {};
      $scope.referral = {
        links : [],
        modal : null
      };
      $scope.newReferralForm = {
        context : null,
        generating : false
      };

      $scope.loadListReferralLinks = function () {
        if (!!userId) {
          ReferralSvc.getListReferralLinksOfUser(userId)
            .then(function (rpData) {
              $scope.referral.links = rpData;
            });
        } else {
          ReferralSvc.getListReferralLinks()
            .then(function (rpData) {
              $scope.referral.links = rpData;
            });
        }
      };

      $scope.openNewReferralLinkModal = function () {
        $scope.referralModal = ReferralSvc.getNewReferralLinkModal($scope, "ReferalModalCtrl");
      };

      $scope.closeModal = function () {
        // console.log($scope.referralModal);
        $scope.referralModal.dismiss();
        $scope.newReferralForm.context = null;
      };

      $scope.generateLink = function () {
        $scope.newReferralForm.generating = true;

        if (!!userId) {
          ReferralSvc.generateLinkForUser($scope.newReferralForm.context, userEmail)
            .then(function () {
              $scope.newReferralForm.generating = false;
              $scope.closeModal();
              $scope.loadListReferralLinks();
              var msg = Utilities.getAlerts("newReferralLinkSuccessMsg");
              toastr.success(msg, "Success");
            });
        } else {
          ReferralSvc.generateLink($scope.newReferralForm.context)
            .then(function () {
              $scope.newReferralForm.generating = false;
              $scope.closeModal();
              $scope.loadListReferralLinks();
              var msg = Utilities.getAlerts("newReferralLinkSuccessMsg");
              toastr.success(msg, "Success");
            });
        }
      };

      $scope.copyLink = function(link) {
        var text = "https://mycvtracker.com/topcvreviews.html?ref=" + link;
        var input = document.createElement('input');
        input.setAttribute('value', text);
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand('copy');
        document.body.removeChild(input);
        var msg = Utilities.getAlerts("referralLinkCopySuccessMsg");
        toastr.success(msg, "Success");
        return result;
      }

      $scope.init = function () {
        var params = $location.search();
        if (params.userId) {
          userId = params.userId;
        }
        if (params.emailName && params.emailDm) {
          userEmail = params.emailName + "@" + params.emailDm;
        }

        $scope.loadListReferralLinks();
      };

      $scope.init();

      // $scope.$watch('referralModal', function(newValue, oldValue) {
      //   console.log("newValue", newValue);
      // });
    }
  ]);

angular.module("MyCvTracker.pages.resumes")
  .controller("ReferalModalCtrl", [
    "$scope",
    "$injector",
    function (
      $scope,
      $injector
    ) {
      var utilities = $injector.get("Utilities");

    }
  ]);
