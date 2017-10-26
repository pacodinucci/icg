(function () {
  'use strict';

  angular.module('MyCvTracker.pages.jobs', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {

          var loggedInUser = null;
          if(sessionStorage.loggedInUser){
              loggedInUser =  angular.fromJson(sessionStorage.loggedInUser);
          }else {
              loggedInUser = angular.fromJson(localStorage.loggedInUser);
          }
        $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('jobs', {
          url: '/jobs',
          templateUrl: 'app/pages/jobs/templates/jobs.html',
          title: 'Jobs',
          shown:loggedInUser.userRole == 'ADMIN' || loggedInUser.userRole == 'ITCG',
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
