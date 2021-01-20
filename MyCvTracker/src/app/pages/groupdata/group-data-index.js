(function () {
  'use strict';

  angular.module('MyCvTracker.pages.groupdata', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('groupdata', {
          url: '/groupdata',
          templateUrl: 'app/pages/groupdata/templates/groups.html',
          title: 'Group Members Data',
          controller: 'GroupDataCtrl',
          shown: false,
          requiresPermission:true,
          sidebarMeta: {
            icon:'fa fa-paper-plane-o',
            order: 9
          },
        });
  }

})();
