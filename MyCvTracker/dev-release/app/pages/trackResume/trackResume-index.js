(function () {
  'use strict';

  angular.module('MyCvTracker.pages.trackResume', ['ng.ckeditor', 'LocalStorageModule'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('trackResumeForm');
    $stateProvider
        .state('trackResume', {
          url: '/trackResume',
          templateUrl: 'app/pages/trackResume/templates/trackResume.html',
          title: 'Track Resume',
          sidebarMeta: {
            icon: 'fa fa-location-arrow',
            order: 6,
          },
        });
  }

})();
