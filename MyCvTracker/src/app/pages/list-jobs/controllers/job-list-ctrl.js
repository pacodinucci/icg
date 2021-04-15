angular.module("MyCvTracker.pages.jobList")
  .controller("JobSpecListCtrl", [
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
      var mainSvc = $injector.get("JobSpecListService");

      $scope.searchForm = {
        title : "",
        location : "",
        page : 1,
      };
      $scope.listJob = [];
      $scope.loading = false;
      $scope.hasNext = true;

      $scope.getJobList = function () {
        $scope.loading = true;

        var page = $scope.searchForm.page;
        var title = $scope.searchForm.title;
        var location = $scope.searchForm.location;

        mainSvc.listJobSpecs(page, title, location)
          .then(function (rpData) {
            var len = rpData.length;
            if (len > 0) {
              for (var i = 0; i < len; i++) {
                var newJob = rpData[i];
                if (!!newJob.referralTargetSubject && !!newJob.jobLocation && !!newJob.jobType) {
                  $scope.listJob.push(newJob);
                }
              }
            }
            $scope.loading = false;
            $scope.hasNext = len >= 12;
          });
      };

      $scope.searchJobList = function () {
        $scope.searchForm.page = 1;
        $scope.listJob = [];
        $scope.getJobList();
      };

      $scope.loadMore = function () {
        $scope.searchForm.page += 1;
        $scope.getJobList();
      };

      $scope.getFormattedPostDate = function (utc) {
        if (!!utc) {
          var dateObj = new Date(utc + "Z");

          var date = dateObj.getDate();
          date = date < 10 ? ("0" + date) : ("" + date);
          var month = dateObj.getMonth();
          month = month < 10 ? ("0" + month) : ("" + month);
          var hour = dateObj.getHours();
          hour = hour < 10 ? ("0" + hour) : ("" + hour);
          var minutes = dateObj.getMinutes();
          minutes = minutes < 10 ? ("0" + minutes) : ("" + minutes);
          return date + "/" + month + "/" + dateObj.getFullYear() + " " + hour + ":" + minutes;
        }

        return "";
      };

      $scope.init = function () {
        $scope.getJobList();
      };

      $scope.init();
    }
  ]);
