    'use strict';

angular.module('MyCvTracker', [
    ///////3rd party libs////////
    'ngAnimate',
    'ui.bootstrap',
    'ui.sortable',
    'ngSanitize',
    'ui.router',
    'ngTouch',
    'toastr',
    "xeditable", // for jobs
    'ui.slimscroll', //scroll arrow
    'ngJsTree', // for jobs
    'angularUtils.directives.dirPagination', // for jobs
    'ng.ckeditor', // for jobs
    'satellizer',
    'infinite-scroll',
    /////////////////////////
    'MyCvTracker.shared',
    'MyCvTracker.theme',
    'MyCvTracker.pages',
]).factory('interceptor', ['$q',
]).run(['$http', 'Constants', '$rootScope', 'editableOptions', function ($http, Constants, $rootScope, editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    $rootScope.Constants = Constants;
}])
    .config(function ($authProvider,Constants,$stateProvider,$locationProvider) {
        $locationProvider.html5Mode(true);
        $authProvider.httpInterceptor = function () {return true;};
        $authProvider.withCredentials = false;
        $authProvider.tokenRoot = null;
        $authProvider.baseUrl = Constants.baseUrl;
        $authProvider.loginUrl = '/auth/login';
        $authProvider.signupUrl = '/auth/signup';
        $authProvider.unlinkUrl = '/auth/unlink/';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = '';
        $authProvider.tokenHeader = 'Authorization';
        $authProvider.tokenType = 'Bearer';
        $authProvider.facebook({
            clientId: '1391187710989021'
        });
        if(localStorage.token){
            $authProvider.storageType = 'localStorage';
        }else {
            $authProvider.storageType = 'sessionStorage';
        }
    });


    // rsingh078@gmail.com - mycvtracker@gmail.com
    // test12345
