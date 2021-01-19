angular.module("MyCvTracker.pages.referral")
  .controller("ReferralCtrl", [
    "toastr",
    "$rootScope",
    "$scope",
    "$injector",
    "$http",
    function (
      toastr,
      $rootScope,
      $scope,
      $injector,
      $http
    ) {
      var Utilities = $injector.get("Utilities");
      var AccountSvc = $injector.get("AccountSvc");
      var ReferralSvc = $injector.get("ReferralSvc");
      var ResumesSvc = $injector.get("ResumesSvc");

      $scope.referralModal = {};
      $scope.referral = {
        links : [],
        modal : null
      };
      $scope.newReferralForm = {
        context : null,
        generating : false
      }

      $scope.generateReferralLink = function () {
      };

      $scope.loadListReferralLinks = function () {
        ReferralSvc.getListReferralLinks()
          .then(function (rpData) {
            $scope.referral.links = rpData;
          });
      };

      //Get User Details Function
      $scope.getUserDetails = function () {
        AccountSvc.getUser()
          .then(
            function (userData) {
              $scope.user = userData;
              $scope.loadListReferralLinks();
            },

            function (response) {
              toastr.error(Utilities.getAlerts(response.status));
            }
          );
      };

      $scope.openNewReferralLinkModal = function () {
        $scope.referralModal = ReferralSvc.getNewReferralLinkModal($scope, "ReferalModalCtrl");
      };

      $scope.closeModal = function () {
        // console.log($scope.referralModal);
        $scope.referralModal.dismiss();
        $scope.newReferralForm.context = null;
      };

      $scope.generateLink = function() {
        $scope.newReferralForm.generating = true;

        ReferralSvc.generateLink($scope.newReferralForm.context).then(function() {
          $scope.newReferralForm.generating = false;
          $scope.closeModal();
          $scope.loadListReferralLinks();
          var msg = Utilities.getAlerts("newReferralLinkSuccessMsg");
          toastr.success(msg, "Success");
        })
      }

      $scope.init = function () {
        $scope.getUserDetails();
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
