'use strict';

angular.module('ITCG', [
  'ui.router',
  'toastr',
  'ITCG.shared',
  'ITCG.theme',
  'ITCG.pages',
]).factory('interceptor', ['$q',
]).run(['$http','Constants','AccessToken','$rootScope', function($http,Constants,AccessToken,$rootScope) {
    $rootScope.Constants = Constants;
}]);
