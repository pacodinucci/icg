angular.module("MyCvTracker.pages.bulkFolderResumes")

  .controller("BulkFolderResumeCtrl", [
    "Constants",
    "toastr",
    "$rootScope",
    "$scope",
    "$injector",
    "$http",
    "Authorization",

    function (
      Constants,
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
        resumeFiles : [],
        errorMap : {},
        invalidSize : false,
        invalidType : false,
        uploaded : false
      }

      $scope.listFolderResumes = function() {
        mainSvc.listResumes().then(function(data) {
          $scope.resumes = data;
        });
      }

      $scope.openNewResumeModal = function() {
        $scope.bulkFolderModal = mainSvc.getUploadModal($scope, "BulkFolderResumeModalCtrl");
      }

      var noOfUploading = 0;
      var noOfUploaded = 0;
      function onFileUploaded(name, err) {
        console.log("error", name, err);
        $scope.uploadForm.errorMap[name] = err;
        noOfUploaded++;
        console.log("noOfUploading", noOfUploading);
        console.log("noOfUploaded", noOfUploaded);
        if (noOfUploading === noOfUploaded) {
          console.log("uploaded ne");
          $scope.listFolderResumes();
          $scope.uploading = false;
          $scope.uploadForm.uploaded = true;
        }
      }

      function callUploadingApi(rFile) {
        var rName = rFile.name;
        mainSvc.uploadResumeToFolder(rFile).then(function(data) {
          onFileUploaded(rName, null);
        }).catch(function(err) {
          var msg = "Uploading resume has failed!"
          var rp = err.response;
          if (!!rp && !!rp.message) {
            msg = rp.message;
          }
          onFileUploaded(rName, msg);
        });
      }

      $scope.uploadResume = function() {
        var rFiles = $scope.uploadForm.resumeFiles;
        noOfUploading = rFiles.length;
        if (noOfUploading === 0) {
          return;
        }

        if ($scope.uploading) return;
        $scope.uploading = true;
        $scope.uploadForm.uploaded = false;
        noOfUploaded = 0;

        for (var k = 0; k < noOfUploading; k++) {
          callUploadingApi(rFiles[k])
        }
      }

      $scope.closeModal = function() {
        $scope.bulkFolderModal.dismiss();
        $scope.uploadForm.resumeFiles = [];
        $scope.uploadForm.errorMap = {};
        $scope.uploadForm.invalidSize = false;
        $scope.uploadForm.invalidType = false;
        $scope.uploadForm.uploaded = false;
        $scope.uploading = false;
      }

      $scope.getDownloadLink = function(name) {
        return Constants.baseUrl + '/user/bulk-folder/download/' + userId + '/' + name;
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
              scope.uploadForm.errorMap = {};
              scope.uploadForm.invalidSize = false;
              scope.uploadForm.invalidType = false;
              scope.uploadForm.resumeFiles = [];
              scope.uploadForm.uploaded = false;

              var files = element[0].files;
              if (files.size > 10) return;

              var invalidSize = false;
              var invalidType = false;
              for (var i = 0, len = files.length; i < len; i++) {
                var validExts = [
                  "application/pdf",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ];
                var fileType = files[i].type;

                invalidSize = files[i].size > 5000000;
                invalidType = validExts.indexOf(fileType) < 0;

                if (invalidSize || invalidType) {
                  break;
                }
              }

              scope.uploadForm.invalidSize = invalidSize;
              scope.uploadForm.invalidType = invalidType;
              if (!invalidSize && !invalidType) {
                modelSetter(scope, element[0].files);
              }

              // scope.uploadForm.invalidSize = false;
              // scope.uploadForm.invalidType = false;
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
