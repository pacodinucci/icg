angular.module("MyCvTracker.pages.bulkFolderResumes")
  .factory("BulkFolderResumeService", [
    "toastr",
    "RestConfig",
    "$injector",
    "Constants",
    function (
      toastr,
      RestConfig,
      $injector,
      Constants
    ) {

      return {
        listResumes : function () {
          return RestConfig.getBulkFolderResumes();
        },
        uploadResumeToFolder : function(file) {
          return RestConfig.uploadFolderResume(file);
        },
        getUploadModal : function(scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/bulk-folder-resume/templates/upload-resume-modal.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        }
      };
    }
  ]);
