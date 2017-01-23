/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.front.login', ['BlurAdmin.shared','ui.bootstrap','toastr']).run(['$http','Constants','AccessToken','$rootScope','toastr', function($http,Constants,AccessToken,$rootScope,toastr) {
        $rootScope.Constants = Constants;

        $rootScope.showSuccessMsg = function(message) {
            toastr.success(message);
        };
        $rootScope.showErrorMsg = function(message) {
            toastr.error(message, 'Error');
        };
    }]);

})();
