angular.module("MyCvTracker.pages.referralJobSpec")
  .factory("JobSpecSvc", [
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
        getJobSpec : function (refCode) {
          var url = utilities.getReferralContentUrl();
          return RestConfig.getReferralDetails(url, refCode);
        }
      };
    }
  ]);
