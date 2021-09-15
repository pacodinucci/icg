angular.module("MyCvTracker.pages.bulkFolderResumes")

  .controller("BulkFolderResumeCtrl", [
    "toastr",
    "$rootScope",
    "$scope",
    "$injector",
    "$http",
    "Authorization",

    function (
      toastr,
      $rootScope,
      $scope,
      $injector,
      $http,
      Authorization
    ) {
      var mainSvc = $injector.get("BulkFolderResumeService");
      var utilities = $injector.get("Utilities");
      var userDetail = Authorization.getUserDetails();
      var userId = userDetail.id;

      $scope.resumes = [];
      $scope.bulkFolderModal = null;
      $scope.uploading = false;
      $scope.uploadForm = {
        resumeFile : null,
        invalidSize : false,
        invalidType : false
      }

      $scope.listFolderResumes = function() {
        mainSvc.listResumes().then(function(data) {
          $scope.resumes = data;
        });
      }

      $scope.openNewResumeModal = function() {
        $scope.bulkFolderModal = mainSvc.getUploadModal($scope, "BulkFolderResumeModalCtrl");
      }

      $scope.uploadResume = function() {
        var rFile = $scope.uploadForm.resumeFile;
        if (rFile == null) {
          return;
        }

        if ($scope.uploading) return;
        $scope.uploading = true;
        var validExts = [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];
        var fileType = rFile.type;

        var invalidSize = rFile.size > 5000000;
        var invalidType = validExts.indexOf(fileType) < 0;

        $scope.uploadForm.invalidSize = invalidSize;
        $scope.uploadForm.invalidType = invalidType;

        if (invalidSize || invalidType) {
          $scope.uploading = false;
          return;
        }

        mainSvc.uploadResumeToFolder(rFile).then(function(data) {
          $scope.listFolderResumes();
          toastr.success("Resume has been uploaded to bulk folder successfully.", "Success");
          $scope.closeModal();
        }).catch(function(err) {
          var msg = "Uploading resume has failed!"
          var rp = err.response;
          if (!!rp && !!rp.message) {
             msg = rp.message;
          }

          toastr.error(msg, "Error");
          $scope.closeModal();
        });
      }

      $scope.closeModal = function() {
        $scope.bulkFolderModal.dismiss();
        $scope.uploadForm.resumeFile = null;
        $scope.uploadForm.invalidSize = false;
        $scope.uploadForm.invalidType = false;
        $scope.uploading = false;
      }

      $scope.getDownloadLink = function(name) {
        return 'https://mycvtracker.com:8080/user/bulk-folder/download/' + userId + '/' + name;
      }

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

      function init() {
        $scope.listFolderResumes();
      }

      init();
    }
  ]);

angular.module("MyCvTracker.pages.bulkFolderResumes")
  .controller("BulkFolderResumeModalCtrl", [
    "$scope",
    "$injector",
    function (
      $scope,
      $injector
    ) {
      var utilities = $injector.get("Utilities");

    }
  ]);

angular.module("MyCvTracker.pages.bulkFolderResumes")
  .directive("resumeFileModel", [
    "$parse",
    "$injector",
    "Constants",
    function (
      $parse,
      $injector,
      Constants
    ) {
      return {
        restrict : "A",
        link : function (
          scope,
          element,
          attrs
        ) {
          var model = $parse(attrs.resumeFileModel);
          var modelSetter = model.assign;
          var Utilities = $injector.get("Utilities");

          element.bind("change", function () {
            scope.$apply(function () {
              modelSetter(scope, element[0].files[0]);
              scope.uploadForm.invalidSize = false;
              scope.uploadForm.invalidType = false;
              // var file = scope.myFile;
              // var validExts = [
              //   "application/pdf",
              //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              // ];
              // var fileExt = file.type;
              // var input = $("#fileUpload");
              // if (validExts.indexOf(fileExt) < 0) {
              //   scope.addAlert(Utilities.getAlerts("InputFileInputTypeValidation"));
              //   scope.resumeFile = null;
              //   return false;
              // }
              //
              // if (file.size >= Constants.fileUpload.fileSizeLimitInByte) {
              //   scope.addAlert(Utilities.getAlerts("InputFileInputSizeValidation"));
              //   scope.resumeFile = null;
              //   return false;
              // }
            });
          });
        }
      };
    }
  ]);
