'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  'BlurAdmin.shared',
  'BlurAdmin.theme',
  'BlurAdmin.pages'
]).factory('interceptor', ['$q',
]).run(['$http','Constants','AccessToken','$rootScope', function($http,Constants,AccessToken,$rootScope) {
    $rootScope.Constants = Constants;
}]);
