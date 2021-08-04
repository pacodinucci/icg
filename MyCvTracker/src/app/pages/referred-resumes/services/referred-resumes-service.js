angular.module("MyCvTracker.pages.referredResumes")
  .factory("ReferredResumesService", [
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
        },
        getReferredResumes: function(referralLink) {
          var url = utilities.getReferredResumeListUrl();
          return RestConfig.getReferredResumeList(url, referralLink);
        },
        getMatchingResumes: function(referralLink) {
          return RestConfig.getMatchingResumesOfJob(referralLink);
        },
        getChildLinks: function(parentLink) {
          var url = utilities.getChildRefLinks();
          return RestConfig.getChildRefLinkList(url, parentLink);
        },
        shareResumeToParent : function(id) {
          var url = utilities.getShareResumeToParentLinkUrl();
          return RestConfig.shareResumeToParentLink(url, id);
        },
        shareResumeToTarget : function(id) {
          var url = utilities.getShareResumeToTargetUrl();
          return RestConfig.shareResumeToTargetLink(url, id);
        },
        updateResumeInterviewStatus : function(id, stt) {
          var url = utilities.getUpdateResumeInterviewStatusUrl();
          return RestConfig.updateResumeInterview(url, id, stt);
        },
        updateResumeJobStatus : function(id, stt) {
          var url = utilities.getUpdateResumeJobStatusUrl();
          return RestConfig.updateResumeJob(url, id, stt);
        },
        getSharingResumeModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referred-resumes/templates/share-resumes-modal.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        getMatchingSkillsOfResumeModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referred-resumes/templates/list-matching-skills-modal.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        getInterviewResumeModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referred-resumes/templates/update-resume-interview.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        getJobResumeModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referred-resumes/templates/update-resume-job.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        getResumeToken: function(id, referralLink) {
          var url = utilities.getResumeTokenUrl();
          return RestConfig.getResumeTokenToPreview(url, referralLink, id);
        },
        getMatchingSkills: function(matchingId) {
          return RestConfig.getListMatchingSkills(matchingId);
        }
      };
    }
  ]);
