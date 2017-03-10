'use strict';

angular.module('ITCG', [
  'ui.router',
  'toastr',
  'ITCG.shared',
  'ITCG.theme',
  'ITCG.pages',
]).factory('interceptor', ['$q',
]).run(['$http','Constants','AccessToken','$rootScope','Authorization', function($http,Constants,AccessToken,$rootScope,Authorization) {
    $rootScope.Constants = Constants;
    $rootScope.Authorization = Authorization;
}]);
