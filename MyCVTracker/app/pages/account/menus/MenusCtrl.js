/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.account')
      .controller('MenusCtrl', MenusCtrl);

  /** @ngInject */
  function MenusCtrl($scope, $timeout, baConfig, baUtil,$rootScope,AccessToken) {
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    $scope.charts = [{
        color: pieColor,
        description: 'My Notes',
        link:'notes',
        icon: 'pencil',
        showMenu:true
      }, {
        color: pieColor,
        description: 'Jobs',
        link:'jobs',
        icon: 'list',
        showMenu:true
      }, {
        color: pieColor,
        description: 'Resume Management',
        link:'resumes',
        icon: 'book',
        showMenu:true
      }, {
        color: pieColor,
        description: 'Track Resume',
        link:'trackResume',
        icon: 'location-arrow',
        showMenu:true
      }, {
        color: pieColor,
        description: 'Notifications',
        link:'notifications',
        icon: 'bell',
        showMenu:true
      }, {
        color: pieColor,
        description: 'CV Marketing Notes',
        link:'CampaignNotes',
        icon: 'paper-plane-o',
        showMenu:AccessToken.getToken().userRole == 'ADMIN'
      }, {
        color: pieColor,
        description: 'CV Marketing',
        link:'CvMarketing',
        icon: 'paper-plane-o',
        showMenu:AccessToken.getToken().userRole == 'ADMIN'
      }, {
        color: pieColor,
        description: 'CV Marketing Notifications',
        link:'CampaignNotifications',
        icon: 'paper-plane-o',
        showMenu:AccessToken.getToken().userRole == 'ADMIN'
      }, {
        color: pieColor,
        description: 'Settings',
        link:'settings',
        icon: 'cogs',
        showMenu:AccessToken.getToken().userRole == 'ADMIN'
     }
    ];
  }
})();