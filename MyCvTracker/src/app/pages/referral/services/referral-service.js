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
        generateLink : function(name) {
          var url = utilities.getReferralLinkNewUrl();
          return RestConfig.generateReferralLink(url, name);
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
