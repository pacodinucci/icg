angular.module("MyCvTracker.pages.cvBoxCandidates")
  .factory("CvBoxService", [
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
        getReferralDetail: function(referralLink) {
          var url = utilities.getReferralContentUrl();
          return RestConfig.getReferralContent(url, referralLink);
        }
      };
    }
  ]);
