(function () {
  'use strict';

  angular.module('MyCvTracker.pages.GroupData', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('GroupData', {
          url: '/groupdata',
          templateUrl: 'app/pages/GroupData/templates/groups.html',
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
