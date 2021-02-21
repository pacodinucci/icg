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
      var ResumesSvc = $injector.get('ResumesSvc');

      var isAdmin = Authorization.getUserRole() === "ADMIN";
      var referralLink = "";
      var childLinks = [];

      $scope.referredResumes = {
        list : []
      };

      $scope.loadListReferredResumes = function(refCode) {
        service.getReferredResumes(refCode).then(function(rpData) {
          if (rpData && rpData.length > 0) {
            var oldList = $scope.referredResumes.list;
            $scope.referredResumes.list = oldList.concat(rpData);
          }
        });
      }

      $scope.loadListChildLinks = function() {
        service.getChildLinks(referralLink).then(function(rpData) {
          childLinks = rpData;

          $scope.loadListReferredResumesOfChild();
        });
      }

      $scope.loadListReferredResumesOfChild = function() {
        for (var i = 0, len = childLinks.length; i < len; i++) {
          var childRefLink = childLinks[i].referralLink;
          $scope.loadListReferredResumes(childRefLink);
        }
      }

      $scope.formatDateTime = function(utcStr) {
        return !!utcStr ?  Utilities.getFormattedDate(utcStr) : ""
      }

      $scope.downloadMyResume = function (id) {
        ResumesSvc.downloadMyResume(id);
        toastr.success(Utilities.getAlerts('resumeDownloadSuccess').message);
      };

      $scope.init = function() {
        var params = $location.search();
        referralLink = params.referralLink;

        $scope.loadListReferredResumes(referralLink);
        $scope.loadListChildLinks();
      }

      $scope.init();
    }
  ]);
