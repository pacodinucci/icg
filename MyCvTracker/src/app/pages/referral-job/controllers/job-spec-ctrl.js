angular.module("MyCvTracker.pages.referralJobSpec")
  .controller("JobSpecCtrl", [
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
      var refCode = "";
      var JobSpecSvc = $injector.get('JobSpecSvc');

      $scope.jobDetail = {
        title : "...",
        spec: "...",
        recruiterEmail : "..."
      }

      $scope.loadDetail = function() {
        $scope.jobDetail.title = "...";
        $scope.jobDetail.spec = "...";
        $scope.jobDetail.recruiterEmail = "...";

        JobSpecSvc.getJobSpec(refCode).then(function({
          referralDetails,
          referralTargetEmail,
          referralTargetSubject
        }) {
          $scope.jobDetail.title = referralTargetSubject;
          $scope.jobDetail.spec = referralDetails;
          $scope.jobDetail.recruiterEmail = referralTargetEmail;
        })
      }

      $scope.init = function () {
        var params = $location.search();
        if (params.ref) {
          refCode = params.ref;
        }

        $scope.viewJobEditor = {
          "height": "470",
          "removePlugins": "toolbar,resize",
          "readOnly" : "true"
        };
        $scope.disableEditor = false;

        $scope.loadDetail();
      };

      $scope.init();

      // $scope.$watch('referralModal', function(newValue, oldValue) {
      //   console.log("newValue", newValue);
      // });
    }
  ]);
