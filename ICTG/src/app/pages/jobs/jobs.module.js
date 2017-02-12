(function () {
  'use strict';

  angular.module('ICTG.pages.jobs', ['angularUtils.directives.dirPagination','ng.ckeditor'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {

        $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('jobs', {
          url: '/jobs',
          templateUrl: 'app/pages/jobs/templates/jobs.html',
          title: 'Jobs',
          sidebarMeta: {
            icon: 'fa fa-list',
            order: 4,
          }
        })
        //
        // // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('viewJob', {
          url: '/viewJob',
          templateUrl: 'app/pages/jobs/templates/view_job.html',
          title: 'Job Details'
        });
        //
        $stateProvider
        .state('activateJob', {
          url: '/activateJob',
          templateUrl: 'app/pages/jobs/templates/activateJobFromMail.html',
          controller: 'JobsCtrl'
        });
  }

})();
