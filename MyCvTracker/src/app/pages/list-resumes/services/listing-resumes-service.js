angular.module("MyCvTracker.pages.resumeListing")
  .factory("ResumesListingService", [
    "toastr",
    "RestConfig",
    "$injector",
    "Constants",
    function (
      toastr,
      RestConfig,
      $injector,
      Constants
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
        },
        getAdminExtendResumeModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/list-resumes/templates/extend-resume-modal.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        }, extendResumePreview: function(resumeId, original, extendDays) {
          var url = Constants.baseUrl + "/user/resume/preview/extend";
          return RestConfig.extendResumePreviewForAdmin(url, resumeId, original, extendDays);
        },
        getCvBoxSelectionModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/list-resumes/templates/cv-box-selection-modal.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        getUpdatingResumeSkillModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/list-resumes/templates/categorizing-modal.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        }, getListSkillCategories : function() {
          return RestConfig.listSkillCategories();
        }, findCvBoxByName : function (
          name
        ) {
          return RestConfig.findCvBox(name);
        }, addResumeToCvBox : function (
          referralId,
          resumeId
        ) {
          return RestConfig.addResumeToCvBox(referralId, resumeId);
        }, getResumeCategories : function(resumeId) {
          return RestConfig.listCategoriesOfResume(resumeId);
        }, categorizeResumeSkills : function(resumeId, categoryIds) {
          return RestConfig.updateResumeSkillCategories(resumeId, categoryIds);
        },
        getNewResumeModal : function (
          scope,
          ctrlName
        ) {

          var modalOpts = {
            templateUrl : "app/pages/list-resumes/templates/new_resume.html",
            controller : ctrlName,
            scope : scope
          };

          return $injector.get("$uibModal")
            .open(modalOpts);
        },
        getEditPreviewLinkModal : function (
          scope,
          ctrlName
        ) {

          var modalOpts = {
            templateUrl : "app/pages/list-resumes/templates/edit-link.html",
            controller : ctrlName,
            scope : scope
          };

          return $injector.get("$uibModal")
            .open(modalOpts);
        },
        checkResumePreviewLink : function (id) {
          return RestConfig.checkUniquePreviewLink(id);
        },
        updateResumeLink : function (resumeId, linkId, type) {
          return RestConfig.updateResumePreviewLink(resumeId, linkId, type);
        },
      };
    }
  ]);
