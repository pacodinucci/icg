'use strict';

angular.module('ICTG', [
  'ui.router',
  'toastr',
  'ICTG.shared',
  'ICTG.theme',
  'ICTG.pages',
  'ngMaterial',
]).factory('interceptor', ['$q',
]).run(['$http','Constants','AccessToken','$rootScope', function($http,Constants,AccessToken,$rootScope) {
    $rootScope.Constants = Constants;
}]);
