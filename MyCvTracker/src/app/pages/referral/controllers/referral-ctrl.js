angular.module("MyCvTracker.pages.referral")
  .controller("ReferralCtrl", [
    "Constants",
    "toastr",
    "$rootScope",
    "$scope",
    "$injector",
    "$http",
    "Authorization",
    "$location",
    function (
      Constants,
      toastr,
      $rootScope,
      $scope,
      $injector,
      $http,
      Authorization,
      $location
    ) {
      var JOB_STATUS = Constants.jobAppStatus;

      $scope.REFERRAL_TYPE = {
        TEXT_LINK : "TEXT_LINK",
        JOB_SPEC : "JOB_SPEC",
        SOCIAL_SHARE : "SOCIAL_SHARE"
      };

      var Utilities = $injector.get("Utilities");
      var AccountSvc = $injector.get("AccountSvc");
      var ReferralSvc = $injector.get("ReferralSvc");

      var userId = 0;
      var userEmail = "",
        parentLink = "";

      $scope.referralModal = {};
      $scope.referral = {
        links : [],
        modal : null,
        selectedDescription : "",
        selectedTargetEmail : "",
        descriptionConfig : {
          "height" : "470",
          "removePlugins" : "toolbar,resize",
          "readOnly" : "true"
        },
        shareReferral : {
          generating : false,
          refCode : ""
        },
        shareResume : {
          referral : null,
          sharing : false,
          success : false
        }
      };
      $scope.newReferralForm = {
        type : "JOB_SPEC",
        context : null,
        description : null,
        title : null,
        email : null,
        generating : false,
        REFERRAL_TYPE : {}
      };

      $scope.loadListReferralLinks = function () {
        if (!!userId) {
          ReferralSvc.getListReferralLinksOfUser(userId)
            .then(function (rpData) {
              $scope.referral.links = rpData;
            });
        } else {
          ReferralSvc.getListReferralLinks()
            .then(function (rpData) {
              $scope.referral.links = rpData;
            });
        }
      };

      $scope.openNewReferralLinkModal = function () {
        $scope.referralModal = ReferralSvc.getNewReferralLinkModal($scope, "ReferalModalCtrl");
      };

      $scope.openReferralDescriptionModal = function (
        desc,
        email
      ) {
        $scope.referral.selectedDescription = desc;
        $scope.referral.selectedTargetEmail = email;
        $scope.referralModal = ReferralSvc.getReferralDescriptionModal($scope, "ReferalModalCtrl");
      };

      $scope.openShareReferralModal = function () {
        var shareReferral = $scope.referral.shareReferral;
        shareReferral.generating = true;

        $scope.referralModal = ReferralSvc.getShareReferralModal($scope, "ReferalModalCtrl");

        ReferralSvc.shareReferralLink(parentLink)
          .then(function (data) {
            $scope.referral.shareReferral.refCode = data.referralLink;
            $scope.referral.shareReferral.generating = false;
          });
      };

      $scope.closeModal = function () {
        // console.log($scope.referralModal);
        $scope.referralModal.dismiss();
        $scope.newReferralForm.context = null;
        $scope.referral.selectedDescription = null;
        $scope.referral.selectedTargetEmail = null;
        $scope.referral.shareReferral.generating = false;
        $scope.referral.shareReferral.refCode = "";
        $scope.referral.shareResume.sharing = false;
        $scope.referral.shareResume.success = false;
        $scope.referral.shareResume.referral = null;

        if (!!parentLink) {
          $location.url("/referral");

          $scope.loadListReferralLinks();
        }
      };

      $scope.generateLink = function () {
        $scope.newReferralForm.generating = true;

        var context = "";
        var type = $scope.newReferralForm.type;
        var email = "",
          title = "";
        switch (type) {
          case $scope.REFERRAL_TYPE.TEXT_LINK:
            context = $scope.newReferralForm.context;
            break;
          case  $scope.REFERRAL_TYPE.JOB_SPEC:
            context = $scope.newReferralForm.description;
            title = $scope.newReferralForm.title;
            email = $scope.newReferralForm.email;
            break;
          case  $scope.REFERRAL_TYPE.SOCIAL_SHARE:
            context = $scope.newReferralForm.description;
            break;
        }

        if (!!userId) {
          ReferralSvc.generateLinkForUser(context, userEmail, type, title, email)
            .then(function () {
              $scope.newReferralForm.generating = false;
              $scope.closeModal();
              $scope.loadListReferralLinks();
              var msg = Utilities.getAlerts("newReferralLinkSuccessMsg");
              toastr.success(msg, "Success");
            });
        } else {
          ReferralSvc.generateLink(context, type, title, email)
            .then(function () {
              $scope.newReferralForm.generating = false;
              $scope.closeModal();
              $scope.loadListReferralLinks();
              var msg = Utilities.getAlerts("newReferralLinkSuccessMsg");
              toastr.success(msg, "Success");
            });
        }
      };

      $scope.shareReferredResumes = function () {
        var shareResume = $scope.referral.shareResume;
        var refCode = shareResume.referral.referralLink;
        shareResume.sharing = true;

        ReferralSvc.shareResumeToParent(refCode)
          .then(function () {
            $scope.referral.shareResume.referral.jobAppStatus = JOB_STATUS.SHARED_WITH_TARGET;
            shareResume.success = true;
            shareResume.sharing = false;
          }, function () {
            $scope.referral.shareResume.referral.jobAppStatus = JOB_STATUS.SHARED_WITH_TARGET;
            shareResume.success = true;
            shareResume.sharing = false;
          });
      };

      $scope.getResumesLink = function (
        link,
        parentLink
      ) {
        var url = "/referred-resumes?referralLink=" + link;
        if (!!parentLink && parentLink !== link) url = url + "&parentLink=" + parentLink;

        return url;
      };

      $scope.getReferralLink = function (referral) {
        var refType = referral.referralType;
        var link = referral.referralLink;

        var tt = "";
        var text = "";
        switch (refType) {
          case $scope.REFERRAL_TYPE.JOB_SPEC:
            text = "https://mycvtracker.com/job-spec.html?ref=";
            tt = referral.referralTargetSubject;
            break;
          case $scope.REFERRAL_TYPE.SOCIAL_SHARE:
            text = "https://mycvtracker.com/referral/social-share?ref=";
            tt = referral.referralTargetSubject;
            break;
          default:
            text = "https://mycvtracker.com/topcvreviews.html?ref=";
            tt = referral.referralDetails;
            break;
        }
        if (!tt) tt = "";

        tt = tt.replace(/  +/g, " ").replaceAll(" ", "-");

        return text + link + "&title=" + tt;
      };

      $scope.copyLink = function (referral) {
        var text = $scope.getReferralLink(referral);
        var input = document.createElement("input");
        input.setAttribute("value", text);
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand("copy");
        document.body.removeChild(input);
        var msg = Utilities.getAlerts("referralLinkCopySuccessMsg");
        toastr.success(msg, "Success");
        return result;
      };

      $scope.init = function () {
        var params = $location.search();
        if (params.parentLink) {
          parentLink = params.parentLink;
          $scope.openShareReferralModal();
        } else {
          if (params.userId) {
            userId = params.userId;
          }
          if (params.emailName && params.emailDm) {
            userEmail = params.emailName + "@" + params.emailDm;
          }

          $scope.loadListReferralLinks();
        }
      };

      $scope.init();

      // $scope.$watch('referralModal', function(newValue, oldValue) {
      //   console.log("newValue", newValue);
      // });
    }
  ]);

angular.module("MyCvTracker.pages.resumes")
  .controller("ReferalModalCtrl", [
    "$scope",
    "$injector",
    function (
      $scope,
      $injector
    ) {
      var utilities = $injector.get("Utilities");

    }
  ]);
