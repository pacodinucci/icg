angular.module("MyCvTracker.pages.referredResumes")
  .controller("ReferredResumesCtrl", [
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
      var service = $injector.get("ReferredResumesService");

      var isAdmin = Authorization.getUserRole() === "ADMIN";
      var referralLink = "";

      $scope.referredResumes = {
        list : []
      };

      $scope.loadListReferredResumes = function() {
        service.getReferredResumes(referralLink).then(function(rpData) {

        })
      }

      $scope.init = function() {
        var params = $location.search();
        referralLink = params.referralLink;

        $scope.loadListReferredResumes();
      }

      $scope.init();
    }
  ]);
