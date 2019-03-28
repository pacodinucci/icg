(function () {
  'use strict';

  angular.module('MyCvTracker.pages.resumes', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('resumes', {
          url: '/resumes',
          templateUrl: 'app/pages/resumes/templates/resumes.html',
          title: 'My Resumes',
          sidebarMeta: {
            icon: 'fa fa-book',
            order: 5,
          },
        });
  }

})();
