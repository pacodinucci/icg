angular.module("MyCvTracker.pages.targetResumeDetail")
  .factory("TargetResumeDetailService", [
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
        getResumeDetail: function(id, token) {
          var url = utilities.getTargetResumeDetailUrl(id);
          return RestConfig.getTargetResumeDetail(url, token);
        },
        getInterviewResumeModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/target-resume-detail/templates/update-resume-interview.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        getJobResumeModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/target-resume-detail/templates/update-resume-job.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        updateResumeInterviewStatus : function(id, targetAccessToken, resumeStatus) {
          var url = utilities.getTargetUpdateResumeInterviewStatusUrl();
          return RestConfig.targetUpdateResumeInterview(url, id, resumeStatus, targetAccessToken);
        },
        updateResumeJobStatus : function(id, targetAccessToken, resumeStatus) {
          var url = utilities.getTargetUpdateResumeJobStatusUrl();
          return RestConfig.targetUpdateResumeJob(url, id, resumeStatus, targetAccessToken);
        }
      };
    }
  ]);
