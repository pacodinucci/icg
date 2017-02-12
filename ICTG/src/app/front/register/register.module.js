/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('ICTG.front.register', ['ICTG.shared','toastr']).run(['$http','Constants','AccessToken','$rootScope','toastr', function($http,Constants,AccessToken,$rootScope,toastr) {
        $rootScope.Constants = Constants;
        $rootScope.addSucessAlert = function(message){
            toastr.success(message.message, 'Success', {
                "autoDismiss": false,
                "positionClass": "toast-top-full-width",
                "type": "success",
                "timeOut": "5000",
                "extendedTimeOut": "2000",
                "allowHtml": false,
                "closeButton": false,
                "tapToDismiss": true,
                "progressBar": false,
                "newestOnTop": true,
                "maxOpened": 0,
                "preventDuplicates": false,
                "preventOpenDuplicates": false
            });
        };
        $rootScope.addErrorAlert = function(message){
            toastr.error(message.message, 'Error', {
                "autoDismiss": false,
                "positionClass": "toast-top-full-width",
                "type": "error",
                "timeOut": "5000",
                "extendedTimeOut": "2000",
                "allowHtml": false,
                "closeButton": false,
                "tapToDismiss": true,
                "progressBar": false,
                "newestOnTop": true,
                "maxOpened": 0,
                "preventDuplicates": false,
                "preventOpenDuplicates": false
            });
        };
    }]);

})();
