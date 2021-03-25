angular.module("MyCvTracker.pages.jobList")
  .factory("JobSpecListService", [
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
        listJobSpecs: function(page, title, location) {
          var url = utilities.getJobSpecListUrl() + "?page=" + page;
          if (!!title) {
            url = url + "&title=" + title;
          }
          if (!!location) {
            url = url + "&location=" + location;
          }

          return RestConfig.getJobSpecList(url);
        }
      };
    }
  ]);
