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
      var Utilities = $injector.get("Utilities");
      var mainSvc = $injector.get("JobResumePreviewService");

    }
  ]);
