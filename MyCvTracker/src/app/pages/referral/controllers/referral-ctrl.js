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

      $scope.referral = {
        referLink : ""
      };

      $scope.generateReferralLink = function() {
        $scope.referral.referLink = "https://mycvtracker.com/ref=testRef"
      }
    }
  ]);
