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
  'BlurAdmin.pages',
]).factory('interceptor', ['$q',
]).run(['$http','Constants','AccessToken','$rootScope','editableOptions', function($http,Constants,AccessToken,$rootScope,editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    $rootScope.Constants = Constants;
}]);
