angular.module("MyCvTracker.pages.account")

  .controller("AccountCtrl", [
    "toastr",
    "$scope",
    "$injector",
    "$location",
    "baConfig",
    "baUtil",
    "Authorization",

    function (
      toastr,
      $scope,
      $injector,
      $location,
      baConfig,
      baUtil,
      Authorization
    ) {
      var isAdmin = Authorization.getUserRole() === "ADMIN";
      var isReviewer = Authorization.getUserRole() === "REVIEWER";
      var isRecruiter = Authorization.getUserRole() === "RECRUITER";

      var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
      $scope.charts = [
        {
          color : pieColor,
          description : "My Notes",
          link : "notes",
          icon : "notes",
          showMenu : true
        },
        // {
        //     color: pieColor,
        //     description: 'Jobs',
        //     link:'jobs',
        //     icon: 'jobs',
        //     showMenu:true
        // },
        {
          color : pieColor,
          description : "Resume List",
          link : "resumes-list",
          icon : "resume",
          showMenu : isReviewer || isAdmin || isRecruiter
        },
        {
          color : pieColor,
          description : "Resume Folder",
          link : "bulk-folder-resumes",
          icon : "resume",
          showMenu : isReviewer || isAdmin || isRecruiter
        },
        {
          color : pieColor,
          description : "Resume Management",
          link : "resumes",
          icon : "resume",
          showMenu : false
        },
        {
          color : pieColor,
          description : "Referral",
          link : "referral",
          icon : "resume",
          showMenu : true
        },
        {
          color : pieColor,
          description : "Group Data",
          link : "groupdata",
          icon : "groupdata",
          showMenu : (isAdmin || isReviewer)
        },
        {
          color : pieColor,
          description : "Track Resume",
          link : "trackResume",
          icon : "trackResume",
          showMenu : false
        },
        {
          color : pieColor,
          description : "Notifications",
          link : "notifications",
          icon : "notification",
          showMenu : true
        },
        {
          color : pieColor,
          description : "User Management",
          link : "user-management",
          icon : "resume",
          showMenu : isAdmin
        },
        {
          color : pieColor,
          description : "CV Marketing Notes",
          link : "CampaignNotes",
          icon : "notes",
          showMenu : Authorization.getUserRole() == "ADMIN"
        },
        {
          color : pieColor,
          description : "CV Marketing",
          link : "CvMarketing",
          icon : "marketing",
          showMenu : Authorization.getUserRole() == "ADMIN"
        },
        {
          color : pieColor,
          description : "CV Marketing Notifications",
          link : "CampaignNotifications",
          icon : "notification",
          showMenu : Authorization.getUserRole() == "ADMIN"
        },
        {
          color : pieColor,
          description : "Categories & Skills",
          link : "skill-category-list",
          icon : "resume",
          showMenu : isReviewer || isAdmin
        },
        {
          color : pieColor,
          description : "Settings",
          link : "settings",
          icon : "settings",
          showMenu : true
        }
      ];

      var AuthSvc = $injector.get("AuthSvc");
      var Utilities = $injector.get("Utilities");
      var AccountSvc = $injector.get("AccountSvc");
      var PaymentSvc = $injector.get("PaymentSvc");

      $scope.user = Authorization.getUserDetails();

      $scope.adminFeatures = [];

      $scope.settings = {
        emailSubscribes : [],
        tracking : false,
        notification : false,
        subject : "hello",
        content : "I am looking for new role",
        firstName : "",
        lastName : "",
        emailAddress : ""
      };

      $scope.getUserProfileSettings = function () {

        AccountSvc.getUserProfileSettings()
          .then(
            function (response) {
              $scope.settings.emailSubscribes = response.emailSubscribes;
              $scope.settings.trackingMode = response.trackingMode;
              $scope.settings.firstName = response.firstName;
              $scope.settings.lastName = response.lastName;
              $scope.settings.emailAddress = response.emailAddress;

              angular.forEach($scope.settings.emailSubscribes, function (state) {
                if (state.emailType === "tracking") {
                  $scope.settings.tracking = state.subscribe;
                } else {
                  $scope.settings.notification = state.subscribe;
                }
              });
            },
            function (response) {
              toastr.error(Utilities.getAlerts(response.status).message);
            }
          );
      };

      $scope.redirectToProfilePage = function () {
        var currentUrl = window.location.href;
        $location.path("/account");
        var emailType = null;
        if (currentUrl.indexOf("accountFromTrackingMail") > -1) {
          emailType = "tracking";
        } else {
          emailType = "notification";
        }

        AccountSvc.unSubscribeMail(emailType)
          .then(
            function () {

              toastr.error(Utilities.getAlerts("unsubscribeSucess").message);
            },
            function (response) {
              toastr.error(Utilities.getAlerts(response.status).message);

            }
          );
      };

      $scope.menuClick = function (menu) {
        if (menu == "cvMarketingNotes") {
          $scope.cvMarketingNotes();
        }
        if (menu == "cvMarketing") {
          $scope.cvMarketing();
        }
        if (menu == "cvMarketingNotifications") {
          $scope.cvMarketingNotifications();
        }
        if (menu == "settingsPage") {
          $scope.settingsPage();
        }
      };

      $scope.searchJob = function () {
        Utilities.gotoJobPage();
      };

      $scope.notes = function () {
        Utilities.gotoNotesPage();
      };

      $scope.myResumes = function () {
        Utilities.gotoMyResumesPage();
      };

      $scope.jobs = function () {
        Utilities.gotoJobPage();
      };

      $scope.trackResume = function () {
        Utilities.gotoTrackResumePage();
      };

      $scope.notifications = function () {
        Utilities.gotoNotificationsPage();
      };

      $scope.cvMarketing = function () {
        Utilities.gotoCVMarketingPage();
      };
      $scope.cvMarketingNotes = function () {
        Utilities.gotoCampaignNotesPage();
      };

      $scope.cvMarketingNotifications = function () {
        Utilities.gotoCampaignNotificationsPage();
      };

      $scope.settingsPage = function () {
        Utilities.gotoSettingsPage();
      };

      $scope.newSkill = function () {

        $scope.skillLevel = 0;
        $scope.skillType = "";
      };

      $scope.saveForm = function (model) {

        angular.forEach(model.emailSubscribes, function (state) {
          if (state.emailType == "tracking") {
            state.subscribe = model.tracking;
          } else {
            state.subscribe = model.notification;
          }
        });
        AccountSvc.saveProfileSettings(model)
          .then(
            function () {
              toastr.success(Utilities.getAlerts("profileSaveSucess").message);
              Utilities.gotoProfilePage();

            },
            function (response) {
              toastr.error(Utilities.getAlerts(response.status).message);

            }
          );
      };

      $scope.cancelForm = function () {
        Utilities.gotoProfilePage();
      };
    }
  ]);
