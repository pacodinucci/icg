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
        generateLink : function(name, type, title, email) {
          var url = utilities.getReferralLinkNewUrl();
          return RestConfig.generateReferralLink(url, name, type, title, email);
        },
        generateLinkForUser : function(name, email, type, title, targetEmail) {
          var url = utilities.getReferralLinkNewUrlForUser();
          return RestConfig.generateReferralLinkForUser(url, email, name, type, title, targetEmail);
        },
        getNewReferralLinkModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referral/templates/new_referral_link.html',
            controller: ctrlName,
            scope: scope
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        getReferralDescriptionModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referral/templates/referral-description.html',
            controller: ctrlName,
            scope: scope
          };

          return $injector.get('$uibModal').open(modalOpts);
        }
      };
    }
  ]);
