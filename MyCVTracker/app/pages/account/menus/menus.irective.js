/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.account')
      .directive('menus', menus);

  /** @ngInject */
  function menus() {
    return {
      restrict: 'E',
      controller: 'MenusCtrl',
      templateUrl: 'app/pages/account/menus/menus.html'
    };
  }
})();