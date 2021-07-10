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
        },
        getCandidates: function(referralLink) {
          return RestConfig.getBoxCandidates(referralLink);
        },
        unregisterCandidate: function(referralId, resumeId) {
          return RestConfig.removeCandidateFromBox(resumeId, referralId);
        },
        getRemoveCandidateModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/cvbox-candidates/templates/remove-candidate-modal.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        }
      };
    }
  ]);
