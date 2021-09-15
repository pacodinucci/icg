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
        editRefLink : function(referralLink, title, description, jobType, location, refPublic, bountyEnabled, previewType, previewLink, previewFile) {
          var url = utilities.getReferralLinkEditUrl();
          return RestConfig.editReferralLink(url, referralLink, description, title, jobType, location, refPublic, bountyEnabled, previewType, previewLink, previewFile);
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
        },
        findMatchingResumesInFolder : function(id) {
          return RestConfig.scanMatchingResumesInFolder(id);
        },
        getUpdatingJobSkillsModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referral/templates/categorizing-modal.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        getBuildingSmartCategoryModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referral/templates/building-smart-category-modal.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        getScanFolderResultModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referral/templates/matching-folder-resume.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        }, getListSkillCategories : function() {
          return RestConfig.listSkillCategories();
        }, getJobCategories : function(referralLink) {
          return RestConfig.listCategoriesOfJob(referralLink);
        }, categorizeJobSkills : function(jobId, categoryIds) {
          return RestConfig.updateJobSkillCategories(jobId, categoryIds);
        }, buildSmartCategories : function(jobId) {
          return RestConfig.getSmartCategoriesOfJob(jobId);
        }, newCategory : function(name, skillIds) {
          return RestConfig.addNewCategorySkill(name, skillIds);
        }
      };
    }
  ]);
