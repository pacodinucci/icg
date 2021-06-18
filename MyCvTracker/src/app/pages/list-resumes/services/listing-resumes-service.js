angular.module("MyCvTracker.pages.resumeListing")
  .factory("ResumesListingService", [
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
      var utilities = $injector.get("Utilities");

      return {
        listResumes : function (
          page,
          size
        ) {
          var url = utilities.getListingResumeUrl() + "?page=" + page + "&noOfRecords=" + size;
          return RestConfig.listingResumes(url);
        },
        updateResumeListingStatus : function (resumeId, listing) {
          var url = utilities.updateListingResumeStatusUrl() + "?listing=" + listing;
          url = url.replace("{resumeId}", resumeId);

          return RestConfig.toggleResumeListing(url);
        },
        getAdminExtendResumeModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/list-resumes/templates/extend-resume-modal.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        }, extendResumePreview: function(resumeId, original, extendDays) {
          var url = Constants.baseUrl + "/user/resume/preview/extend";
          return RestConfig.extendResumePreviewForAdmin(url, resumeId, original, extendDays);
        }
      };
    }
  ]);
