/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('MyCvTracker.pages', [
        'ui.router',
        'MyCvTracker.pages.auth',
        'MyCvTracker.pages.account',
        'MyCvTracker.pages.notes',
        'MyCvTracker.pages.jobs',
        'MyCvTracker.pages.resumes',
        'MyCvTracker.pages.trackResume',
        'MyCvTracker.pages.payment',
        'MyCvTracker.pages.notifications',
        'MyCvTracker.pages.CampaignNotes',
        'MyCvTracker.pages.CvMarketing',
        'MyCvTracker.pages.campaignNotifications'
    ]).run(run);

    function run(Constants, $rootScope, $http, $location, Utilities, $auth) {
        // keep user logged in after page refresh
        // // redirect to login page if not logged in and trying to access a restricted page
        if($auth.isAuthenticated()){
            var loggedInUser = null;
            if(sessionStorage.loggedInUser){
                loggedInUser =  angular.fromJson(sessionStorage.loggedInUser);
            }else {
                loggedInUser = angular.fromJson(localStorage.loggedInUser);
            }
            $rootScope.loggedInUser = loggedInUser;
        }

        $rootScope.$on('$locationChangeSuccess', function (event, next, current) {
            var publicPages = ['/login','/register','/activateAccount','/resetPassword'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            $rootScope.loginModal = false;
            // console.log(event);
            // console.log(next);
            // console.log(current);
            var authPages = ['/login','/register','/activateAccount','/resetPassword'];
            // console.log($location.path());
            var isAuthPages = authPages.indexOf($location.path()) !== -1;
            // console.log(isAuthPages);
            var frontPage = next.endsWith("/") || next.endsWith(".com");
            var forwardPage = next.endsWith("/forward.html");
            var activatePage = next.endsWith("/activate.html");
            if (frontPage) {
                window.location.href = Utilities.baseUrl() + "/front.html";
            }
            if (forwardPage) {
                window.location.href = Utilities.baseUrl() + "/forward.html";
            }
            if (activatePage) {
                window.location.href = Utilities.baseUrl() + "/activate.html";
            }
            else if (restrictedPage && !$auth.isAuthenticated()) {
                    $location.url("/login");
            }else if(isAuthPages && $auth.isAuthenticated()){
                $location.url("/account");
            }
        });
    }

})();