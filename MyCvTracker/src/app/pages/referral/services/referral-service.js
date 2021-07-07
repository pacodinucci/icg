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
        getListReferralLinks : function (page, noOfRecords) {
          var url = utilities.getReferralLinkListUrl();
          return RestConfig.getReferralLinks(url, page, noOfRecords);
        },
        getListReferralLinksOfUser : function (userId) {
          var url = utilities.getReferralLinkListUrlOfUser();
          return RestConfig.getReferralLinksOfUser(url, userId);
        },
        generateLink : function(name, type, title, email, jobType, location, refPublic, bountyEnabled, previewType, previewLink, previewFile) {
          var url = utilities.getReferralLinkNewUrl();
          return RestConfig.generateReferralLink(url, name, type, title, email, jobType, location, refPublic, bountyEnabled, previewType, previewLink, previewFile);
        },
        editRefLink : function(referralLink, title, description, jobType, location, previewLink, refPublic, bountyEnabled) {
          var url = utilities.getReferralLinkEditUrl();
          return RestConfig.editReferralLink(url, referralLink, description, title, jobType, location, previewLink, refPublic, bountyEnabled);
        },
        generateLinkForUser : function(name, email, type, title, targetEmail, jobType, location, previewLink) {
          var url = utilities.getReferralLinkNewUrlForUser();
          return RestConfig.generateReferralLinkForUser(url, email, name, type, title, targetEmail, jobType, location, previewLink);
        },
        shareReferralLink : function(refCode) {
          var url = utilities.getShareReferralLinkUrl();
          return RestConfig.shareParentReferralLink(url, refCode);
        },
        getNewReferralLinkModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referral/templates/new_referral_link.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        getDeleteReferralLinkModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referral/templates/delete-referral-confirm.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        getReferralDescriptionModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referral/templates/referral-description.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        getShareReferralModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referral/templates/share-referral-link.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        deleteReferralLink : function(referralLink) {
          var url = utilities.getDeleteReferralUrl();
          return RestConfig.deleteReferralLink(url, referralLink);
        }
      };
    }
  ]);
