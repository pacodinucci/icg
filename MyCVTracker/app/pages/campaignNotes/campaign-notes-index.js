(function () {
  'use strict';

  angular.module('BlurAdmin.pages.CampaignNotes', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('CampaignNotes', {
          url: '/CampaignNotes',
          templateUrl: 'app/pages/campaignNotes/templates/notes.html',
          title: 'CV Marketing Notes',
          sidebarMeta: {
            icon:'fa fa-paper-plane-o',
            order: 8
          },
        });
  }

})();
