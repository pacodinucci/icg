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
        'MyCvTracker.pages.resumes',
        'MyCvTracker.pages.payment',
        'MyCvTracker.pages.notifications',
        'MyCvTracker.pages.CampaignNotes',
        'MyCvTracker.pages.CvMarketing',
        'MyCvTracker.pages.campaignNotifications',
        'MyCvTracker.pages.GroupData'
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
            var publicPages = ['/login','/register','/activateAccount','/resetPassword', '/jobs', '/viewJob', '/findjobs', '/terms'];
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
            var coursePage =  next.endsWith("/java_experts.html");
            var activatePage = next.endsWith("/activate.html");
            var selfcomposePage = next.endsWith("/selfcompose.html");
            var termsPage = next.endsWith("/terms.html");
            var cvwritingPage = next.endsWith("/cvwritingpackages.html");
            var cvMarketingPage = next.endsWith("/cvmarketing.html");


            if (frontPage) {
                window.location.href = Utilities.baseUrl() + "/front.html";
            }
            else if (forwardPage) {
                window.location.href = Utilities.baseUrl() + "/forward.html";
            }
            else if (activatePage) {
                window.location.href = Utilities.baseUrl() + "/activate.html";
            }
            else if (selfcomposePage) {
                window.location.href = Utilities.baseUrl() + "/selfcompose.html";
            }
            else if(coursePage){
                 window.location.href = Utilities.baseUrl() + "/java_experts.html";
            }
            else if(termsPage) {
                window.location.href = Utilities.baseUrl() + "/terms.html";
            }
            else if(cvwritingPage) {
                window.location.href = Utilities.baseUrl() + "/cvwritingpackages.html";
             }
             else if(cvMarketingPage) {
                   window.location.href = Utilities.baseUrl() + "/cvmarketing.html";
             }
            else if (restrictedPage && !$auth.isAuthenticated()) {
                    $location.url("/login");
            }else if(isAuthPages && $auth.isAuthenticated()){
                $location.url("/account");
            }
        });
    }

})();