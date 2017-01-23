/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages', [
        'ui.router',
        // 'BlurAdmin.pages.dashboard',
        'BlurAdmin.pages.account',
        'BlurAdmin.pages.notes',
        'BlurAdmin.pages.jobs',
        'BlurAdmin.pages.resumes',
        'BlurAdmin.pages.trackResume',
        'BlurAdmin.pages.payment',
        'BlurAdmin.pages.notifications',
        'BlurAdmin.pages.auth',
        'BlurAdmin.pages.CampaignNotes',
        'BlurAdmin.pages.CvMarketing',
        'BlurAdmin.pages.campaignNotifications'
    ]).run(run).config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider,$locationProvider) {
        // use the HTML5 History API
        //$urlRouterProvider.otherwise('/account');
        $locationProvider.html5Mode(true);
    }


    function run(Constants,AccessToken,$rootScope, $http, $location,Utilities) {
        // keep user logged in after page refresh
        var token = AccessToken.getToken().getAccessToken();
        if(token!=null)
            $http.defaults.headers.common[Constants.headers.authorization] = token.authorization;

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/jobs'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            var frontPage = next.endsWith("/") || next.endsWith(".com");
            if (frontPage) {
                window.location.href = Utilities.baseUrl() + "/front.html";
            }
            else if (restrictedPage && token == null) {
                window.location.href = Utilities.baseUrl() + "/auth.html";
            }
        });
    }

})();