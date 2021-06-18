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
      var isManagement = isAdmin || isReviewer;

      $scope.listResumes = [];
      $scope.loadInfo = {
        page : 1,
        hasNext : false,
        loading : false,
        isAdmin : isAdmin,
        isReviewer : isReviewer,
        isManagement : isManagement
      };
      $scope.extendModal = null;
      $scope.extendForm = {
        days : 7,
        extendOriginal : false,
        resume : null,
        extending : false
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
                var resume = rpData[i];
                initExpiration(resume);
                $scope.listResumes.push(resume);
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

      $scope.getFormattedDate = function (utc) {
        if (!!utc) {
          var dateObj = new Date(utc);

          var date = dateObj.getDate();
          date = date < 10 ? ("0" + date) : ("" + date);
          var month = dateObj.getMonth() + 1;
          month = month < 10 ? ("0" + month) : ("" + month);
          var hour = dateObj.getHours();
          hour = hour < 10 ? ("0" + hour) : ("" + hour);
          var minutes = dateObj.getMinutes();
          minutes = minutes < 10 ? ("0" + minutes) : ("" + minutes);
          return date + "/" + month + "/" + dateObj.getFullYear();
        }

        return "";
      };

      function isExpired(date) {
        var now = new Date();
        return (!!date && now.getTime() > date.getTime());
      }

      function initExpiration(resume) {
        var maskedExpiresAt = resume.previewExpiresAt;
        var originalExpiresAt = resume.originalPreviewExpiresAt;

        if (!!maskedExpiresAt) {
          var dateObj = new Date(maskedExpiresAt);
          resume.maskedExpired = isExpired(dateObj);
        }

        if (!!originalExpiresAt) {
          var dateObj = new Date(originalExpiresAt);
          resume["originalExpired"] = isExpired(dateObj);
        }
      }

      function extendResumeDays(resume, noOfDays, extendOriginal) {
        var now = new Date();
        var maskedExpiresAt = resume.previewExpiresAt;
        var originalExpiresAt = resume.originalPreviewExpiresAt;

        var dateObj = null;
        if (!extendOriginal) {
           dateObj = new Date(maskedExpiresAt);
        } else {
          dateObj = new Date(originalExpiresAt);
        }

        if (now.getTime() > dateObj.getTime()) {
          dateObj = now;
        }

        dateObj.setDate(dateObj.getDate() + noOfDays);
        if (!extendOriginal) {
          resume.previewExpiresAt = dateObj.toISOString();
        } else {
          resume.originalPreviewExpiresAt = dateObj.toISOString();
        }
        initExpiration(resume);
      }

      $scope.openExtendModal = function(resume, original) {
        $scope.extendForm.resume = resume;
        $scope.extendForm.extendOriginal = original;
        $scope.extendModal = mainSvc.getAdminExtendResumeModal($scope, "ReferalModalCtrl");
      }

      $scope.closeModal = function () {
        $scope.extendModal.dismiss();
        $scope.extendForm.days = 7;
        $scope.extendForm.extending = false;
        $scope.extendForm.resume = null;
      }

      $scope.extendResume = function() {
        $scope.extendForm.extending = true;
        var resume = $scope.extendForm.resume;
        var resumeId = resume.id;
        var extendOriginal = $scope.extendForm.extendOriginal;
        var extendDays = $scope.extendForm.days;
        mainSvc.extendResumePreview(resumeId, extendOriginal, extendDays).then(function() {
          extendResumeDays(resume, extendDays, extendOriginal);
          $scope.closeModal();
          var msg = Utilities.getAlerts("extendResumeSuccessMessage");
          toastr.success(msg, "Success");
        }).catch(function() {
          $scope.closeModal();
          var msg = Utilities.getAlerts("extendResumeSuccessFail");
          toastr.error(msg, "Error");
        });
      }

      $scope.init = function () {
        $scope.getResume();
      };

      $scope.init();
    }
  ]);

angular.module("MyCvTracker.pages.resumeListing")
  .controller("ExtendResumeModalCtrl", [
    "$scope",
    "$injector",
    function (
      $scope,
      $injector
    ) {
      var utilities = $injector.get("Utilities");

    }
  ]);
