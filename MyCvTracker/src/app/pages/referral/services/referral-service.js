angular.module("MyCvTracker.pages.referral")
  .factory("ReferralSvc", [
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
        getListReferralLinks : function () {
          var url = utilities.getReferralLinkListUrl();
          return RestConfig.getReferralLinks(url);
        },
        getListReferralLinksOfUser : function (userId) {
          var url = utilities.getReferralLinkListUrlOfUser();
          return RestConfig.getReferralLinksOfUser(url, userId);
        },
        generateLink : function(name) {
          var url = utilities.getReferralLinkNewUrl();
          return RestConfig.generateReferralLink(url, name);
        },
        generateLinkForUser : function(name, email) {
          var url = utilities.getReferralLinkNewUrlForUser();
          return RestConfig.generateReferralLinkForUser(url, email, name);
        },
        getNewReferralLinkModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referral/templates/new_referral_link.html',
            controller: ctrlName,
            scope: scope
          };

          return $injector.get('$uibModal').open(modalOpts);
        }
      };
    }
  ]);
