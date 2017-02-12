(function () {
  'use strict';

  angular.module('BlurAdmin.pages.trackResume', ['ng.ckeditor'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
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
