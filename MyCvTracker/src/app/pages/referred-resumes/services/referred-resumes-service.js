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
        getReferredResumes: function(referralLink) {
          var url = utilities.getReferredResumeListUrl();
          return RestConfig.getReferredResumeList(url, referralLink);
        },
        getChildLinks: function(parentLink) {
          var url = utilities.getChildRefLinks();
          return RestConfig.getChildRefLinkList(url, parentLink);
        },
        shareResumeToParent : function(id, parentLink) {
          var url = utilities.getShareResumeToParentLinkUrl();
          return RestConfig.shareResumeToParentLink(url, parentLink, id);
        },
        getSharingResumeModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/referred-resumes/templates/share-resumes-modal.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        }
      };
    }
  ]);
