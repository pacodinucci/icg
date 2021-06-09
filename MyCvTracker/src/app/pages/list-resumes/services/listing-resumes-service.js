angular.module("MyCvTracker.pages.resumeListing")
  .factory("ResumesListingService", [
    "toastr",
    "RestConfig",
    "$injector",
    function (
      toastr,
      RestConfig,
      $injector
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
        }
      };
    }
  ]);
