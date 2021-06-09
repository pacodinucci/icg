angular.module("MyCvTracker.pages.resumeListing")
  .controller("ResumesListingCtrl", [
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
      var NO_RECORDS = 24;
      var Utilities = $injector.get("Utilities");
      var mainSvc = $injector.get("ResumesListingService");

      var userDetail = Authorization.getUserDetails();
      var role = !!userDetail ? Authorization.getUserRole() : "";
      var isAdmin =  role=== "ADMIN";
      var isReviewer =  role=== "REVIEWER";

      $scope.listResumes = [];
      $scope.loadInfo = {
        page : 1,
        hasNext : false,
        loading : false,
        isAdmin : isAdmin,
        isReviewer : isReviewer
      };

      $scope.getResume = function () {
        $scope.loadInfo.loading = true;

        var page = $scope.loadInfo.page;
        mainSvc.listResumes(page, NO_RECORDS + 1)
          .then(function (rpData) {
            var len = rpData.length;
            if (len > 0) {
              var hasNext = len > NO_RECORDS;
              if (hasNext) {
                len = NO_RECORDS;
              }

              for (var i = 0; i < len; i++) {
                $scope.listResumes.push(rpData[i]);
              }

              $scope.loadInfo.hasNext = hasNext;
              $scope.loadInfo.loading = false;
            }
          });
      };

      $scope.toggleListingActive = function (resume) {
        var timeout = resume.timeout;
        if (!!timeout) {
          clearTimeout(timeout);
        }

        var id = resume.id;
        var listingActive = !resume.listingActive;
        resume.listingActive = listingActive;

        resume.timeout = setTimeout(function () {
          mainSvc.updateResumeListingStatus(id, listingActive);
        }, 1000);
      };

      $scope.loadMore = function () {
        $scope.loadInfo.page++;
        $scope.getResume();
      };

      $scope.getFormattedPostDate = function (utc) {
        if (!!utc) {
          var dateObj = new Date(utc);

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
        $scope.getResume();
      };

      $scope.init();
    }
  ]);
