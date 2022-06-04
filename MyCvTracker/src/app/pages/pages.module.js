/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  "use strict";

  angular.module("MyCvTracker.pages", [
    "ui.router",
    "MyCvTracker.pages.auth",
    "MyCvTracker.pages.account",
    "MyCvTracker.pages.notes",
    "MyCvTracker.pages.resumes",
    "MyCvTracker.pages.referral",
    "MyCvTracker.pages.referredResumes",
    "MyCvTracker.pages.userManagement",
    "MyCvTracker.pages.payment",
    "MyCvTracker.pages.notifications",
    "MyCvTracker.pages.CampaignNotes",
    "MyCvTracker.pages.CvMarketing",
    "MyCvTracker.pages.campaignNotifications",
    "MyCvTracker.pages.groupdata",
    "MyCvTracker.pages.jobs",
    "MyCvTracker.pages.jobList",
    "MyCvTracker.pages.targetResumeDetail",
    "MyCvTracker.pages.socialRegistrations",
    "MyCvTracker.pages.jobResumePreview",
    "MyCvTracker.pages.resumeListing",
    "MyCvTracker.pages.cvBoxCandidates",
    "MyCvTracker.pages.skillCategory",
    "MyCvTracker.pages.jobResumeLink",
    "MyCvTracker.pages.jobResumeLinkContext",
    "MyCvTracker.pages.bulkFolderResumes"
  ])
    .run(run);

  function run(
    Constants,
    $rootScope,
    $http,
    $location,
    Utilities,
    $auth
  ) {
    // keep user logged in after page refresh
    // // redirect to login page if not logged in and trying to access a restricted page
    if ($auth.isAuthenticated()) {
      var loggedInUser = null;
      if (sessionStorage.loggedInUser) {
        loggedInUser = angular.fromJson(sessionStorage.loggedInUser);
      } else {
        loggedInUser = angular.fromJson(localStorage.loggedInUser);
      }
      $rootScope.loggedInUser = loggedInUser;
    }

    $rootScope.$on(
      "$locationChangeSuccess",
      function (
        event,
        next,
        current
      ) {
        var publicPages = [
          "/login",
          "/register",
          "/activateAccount",
          "/resetPassword",
          "/activateOut",
          "/jobs",
          "/jobs-list",
          "/job-resume-preview",
          "/target-resume-detail",
          "/viewJob",
          "/findjobs",
          "/resumes-list",
          "/terms"
        ];
        var restrictedPage = publicPages.indexOf($location.path()) === -1 && $location.path()
          .indexOf("/resumes/") === -1;
        $rootScope.loginModal = false;
        // console.log(event);
        // console.log(next);
        // console.log(current);
        var authPages = [
          "/login",
          "/register",
          "/activateAccount",
          "/resetPassword"
        ];
        // console.log($location.path());
        var isAuthPages = authPages.indexOf($location.path()) !== -1;
        // console.log(isAuthPages);
        var frontPage = next.endsWith("/") || next.endsWith(".com");
        var forwardPage = next.endsWith("/forward.html");
        var coursePage = next.endsWith("/java_experts.html");
        var activatePage = next.endsWith("/activate.html");
        var selfcomposePage = next.endsWith("/selfcompose.html");
        var termsPage = next.endsWith("/terms.html");
        var cvwritingPage = next.endsWith("/cvwritingpackages.html");
        var freeCvReviewServicePage = next.endsWith("/cv-writing-page.html");
        var eleven_plus_spelling_game = next.endsWith("/eleven_plus_spelling_game.html");
        var eleven_plus_synonym_game = next.endsWith("/eleven_plus_synonym_game.html");
        var java_interview = next.endsWith("/jobInterview.html");
        var eleven_plus_antonym_game = next.endsWith("/eleven_plus_antonym_game.html");
        var landingQuickRevampPage = next.endsWith("/linkedin-profile-writing.html");
        var landingGraduateCvPage = next.endsWith("/cover-letter-page.html");
        var landingProfessionalCvPage = next.endsWith("/cv-writing-packages.html");
        var landingCareerShiftingCvPage = next.endsWith("/cv-writing-package-2.html");
        var landingCoverLetterPage = next.endsWith("/graduate-package-1.html");
        var landingLinkedInProfileReviewPage = next.endsWith("/graduate-package-2.html");
        var landingExecutiveCvPage = next.endsWith("/cv-writing-package-3.html");
        var cvMarketingPage = next.endsWith("/cvmarketing.html");
        var jobSpecPage = next.endsWith("/job-spec.html");
        var jobkeywordsPage = next.endsWith("/jobkeywords-match.html");
        var paidInternships = next.endsWith("/how-to-get-tech-internships.html");
        var selfFundedInternships = next.endsWith("/my-cv-tracker-internships.html");
        var pdfViewerPage = next.endsWith("/pdf-viewer.html");
        var networkSharePage = next.endsWith("/network-share.html");
        var contextLinkPage = next.endsWith("/context-link.html");
        var cvBoxFrontPage = next.endsWith("/cv-box.html");
        var cvHostingPage =  next.endsWith("/cvhosting.html");
        var cvOffersPage =  next.endsWith("/cvoffers.html");

        if (frontPage) {
          window.location.href = Utilities.baseUrl() + "/topcvreviews.html";
        } else if (jobSpecPage) {
          window.location.href = Utilities.baseUrl() + "/job-spec.html";
        }
        else if (jobkeywordsPage) {
                  window.location.href = Utilities.baseUrl() + "/jobkeywords-match.html";
        }
         else if (contextLinkPage) {
          window.location.href = Utilities.baseUrl() + "/context-link.html";
        } else if (pdfViewerPage) {
          window.location.href = Utilities.baseUrl() + "/pdf-viewer.html";
        } else if (networkSharePage) {
          window.location.href = Utilities.baseUrl() + "/network-share.html";
        } else if (cvBoxFrontPage) {
          window.location.href = Utilities.baseUrl() + "/cv-box.html";
        } else if (forwardPage) {
          window.location.href = Utilities.baseUrl() + "/forward.html";
        } else if (activatePage) {
          window.location.href = Utilities.baseUrl() + "/activate.html";
        } else if (selfcomposePage) {
          window.location.href = Utilities.baseUrl() + "/selfcompose.html";
        } else if (coursePage) {
          window.location.href = Utilities.baseUrl() + "/java_experts.html";
        } else if (termsPage) {
          window.location.href = Utilities.baseUrl() + "/terms.html";
        }
        else if (cvHostingPage) {
           window.location.href = Utilities.baseUrl() + "/cvhosting.html";
        }
        else if (cvOffersPage) {
             window.location.href = Utilities.baseUrl() + "/cvoffers.html";
        }
        else if(paidInternships) {
             window.location.href = Utilities.baseUrl() + "/how-to-get-paid-internships.html";
        }
        else if(selfFundedInternships) {
             window.location.href = Utilities.baseUrl() + "/my-cv-tracker-internships.html";
        }
        else if(eleven_plus_spelling_game) {
             window.location.href = Utilities.baseUrl() + "/eleven_plus_spelling_game.html";
        }
        else if(eleven_plus_synonym_game) {
             window.location.href = Utilities.baseUrl() + "/eleven_plus_synonym_game.html";
        }
        else if(eleven_plus_antonym_game) {
             window.location.href = Utilities.baseUrl() + "/eleven_plus_antonym_game.html";
        }
        else if(java_interview) {
                 window.location.href = Utilities.baseUrl() + "/jobInterview.html";
         }
        else if (cvwritingPage) {
          window.location.href = Utilities.baseUrl() + "/cvwritingpackages.html";
        } else if (cvMarketingPage) {
          window.location.href = Utilities.baseUrl() + "/cvmarketing.html";
        } else if (freeCvReviewServicePage) {
          window.location.href = Utilities.baseUrl() + "/cv-writing-page.html";
        } else if (landingQuickRevampPage) {
          window.location.href = Utilities.baseUrl() + "/linkedin-profile-writing.html";
        } else if (landingGraduateCvPage) {
          window.location.href = Utilities.baseUrl() + "/cover-letter-page.html";
        } else if (landingProfessionalCvPage) {
          window.location.href = Utilities.baseUrl() + "/cv-writing-packages.html";
        } else if (landingCoverLetterPage) {
          window.location.href = Utilities.baseUrl() + "/graduate-package-1.html";
        } else if (landingLinkedInProfileReviewPage) {
          window.location.href = Utilities.baseUrl() + "/graduate-package-2.html";
        } else if (restrictedPage && !$auth.isAuthenticated()) {
          $location.url("/login");
        } else if (isAuthPages && $auth.isAuthenticated()) {
          var params = $location.search();
          var redirectUrl = params.redirect;
          var url = !!redirectUrl ? redirectUrl : "/account";
          $location.url(url);
        }
      }
    );
  }

})();
