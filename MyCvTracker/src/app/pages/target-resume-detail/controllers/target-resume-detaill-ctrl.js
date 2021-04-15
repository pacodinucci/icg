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
      var Utilities = $injector.get("Utilities");
      var mainSvc = $injector.get("TargetResumeDetailService");

      var accesstoken = null, resumeId = null;

      $scope.loadResumeDetail = function() {
        if (!!accesstoken && !!resumeId) {
          mainSvc.getResumeDetail(resumeId, accesstoken).then(function(rpData) {
            console.log("resume", rpData);
          });
        }
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
