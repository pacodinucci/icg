angular.module("MyCvTracker.pages.socialRegistrations")
  .factory("SocialRegistrationService", [
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
        getSocialRegistrations : function(refLink) {
          var url = utilities.getSocialRegistrationListUrl();
          return RestConfig.getSocialRegistrationList(url, refLink);
        },
        shareSocialToParent : function(id) {
          var url = utilities.getShareSocialToParentLinkUrl();
          return RestConfig.shareSocialToParentLink(url, id);
        },
      };
    }
  ]);
