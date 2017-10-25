/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function () {
  'use strict';

  angular.module('MyCvTracker.theme')
    .run(themeRun);

  /** @ngInject */
  function themeRun($timeout, $rootScope, layoutPaths, preloader, $q, baSidebarService, themeLayoutSettings,$injector,$auth,$state) {

    
    var whatToWait = [
      $timeout(3000)
    ];

    baSidebarService.setMenuCollapsed(true);
    $rootScope.$isAuthenticated = $auth.isAuthenticated();

    $q.all(whatToWait).then(function () {
      $rootScope.$pageFinishedLoading = true;
    });

    $timeout(function () {
      if (!$rootScope.$pageFinishedLoading) {
        $rootScope.$pageFinishedLoading = true;
      }
    }, 7000);

    $rootScope.$baSidebarService = baSidebarService;

      $rootScope.$state = $state;
  }

})();