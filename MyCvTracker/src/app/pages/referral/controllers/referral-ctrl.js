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
      var NO_RECORDS = 12;

      $scope.REFERRAL_TYPE = {
        TEXT_LINK : "TEXT_LINK",
        JOB_SPEC : "JOB_SPEC",
        SOCIAL_SHARE : "SOCIAL_SHARE",
        CV_BOX : "CV_BOX"
      };
      $scope.PREVIEW_TYPE = {
        NONE : "NONE",
        WEB_PAGE_URL : "WEB_PAGE_URL",
        FILE : "FILE"
      };

      var Utilities = $injector.get("Utilities");
      var AccountSvc = $injector.get("AccountSvc");
      var ReferralSvc = $injector.get("ReferralSvc");

      var userId = 0;
      var userEmail = "",
        parentLink = "";
      var userDetail = Authorization.getUserDetails();
      var role = !!userDetail ? Authorization.getUserRole() : "";
      var isAdmin = role === "ADMIN";
      var isReviewer = role === "REVIEWER";
      var isManagement = isAdmin || isReviewer;

      $scope.referralModal = {};
      $scope.referral = {
        isManagement : isManagement,
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
          refCode : "",
          referralType : "",
          referralTargetSubject : ""
        },
        shareResume : {
          referral : null,
          sharing : false,
          success : false
        },
        page : 1,
        listing : false,
        hasNext : false
      };
      $scope.newReferralForm = {
        type : $scope.REFERRAL_TYPE.JOB_SPEC,
        isChildRef : false,
        editing : false,
        description : null,
        title : null,
        email : null,
        location : null,
        jobType : null,
        previewType : $scope.PREVIEW_TYPE.WEB_PAGE_URL,
        previewLink : null,
        previewFile : null,
        refPublic : false,
        bountyEnable : false,
        generating : false,
        previewLinkInvalid : false,
        previewFileInvalidSize : false,
        previewFileInvalidType : false,
        editingReferral : {},
        REFERRAL_TYPE : {},
        showError : false
      };
      $scope.jobCategorizingForm = {
        jobId : null,
        defaultCategories : [],
        categories : [],
        newCategoryId : null,
        updating : false
      }

      $scope.deletingReferralLink = "";
      $scope.deletingReferralIdx = -1;
      $scope.inDeletingReferral = false;

      $scope.reloadListReferralLinks = function () {
        $scope.referral.page = 1;
        $scope.referral.links = [];
        $scope.referral.hasNext = true;

        $scope.loadListReferralLinks();
      };

      $scope.loadListReferralLinks = function () {
        if (!!userId) {
          // ReferralSvc.getListReferralLinksOfUser(userId)
          //   .then(function (rpData) {
          //     $scope.referral.links = rpData;
          //   });
        } else {
          if (!$scope.referral.listing) {
            $scope.referral.listing = true;
            var page = $scope.referral.page;

            ReferralSvc.getListReferralLinks(page, NO_RECORDS)
              .then(function (rpData) {
                var newLinks = rpData;
                var noRecords = newLinks.length;
                var hasNext = noRecords >= NO_RECORDS;

                for (
                  var i = 0,
                    len = Math.min(NO_RECORDS, noRecords); i < len; i++
                ) {
                  $scope.referral.links.push(newLinks[i]);
                }

                $scope.referral.hasNext = hasNext;
                $scope.referral.listing = false;
              });
          }
        }
      };

      $scope.loadNextPage = function () {
        $scope.referral.page++;
        $scope.loadListReferralLinks();
      };

      $scope.newReferralTypeChanged = function() {
        var type = $scope.newReferralForm.type;
        if (type === $scope.REFERRAL_TYPE.CV_BOX) {
          $scope.newReferralForm.previewType = $scope.PREVIEW_TYPE.NONE;
        } else {
          $scope.newReferralForm.previewType = $scope.PREVIEW_TYPE.WEB_PAGE_URL;
        }
      }

      $scope.openNewReferralLinkModal = function (referral) {
        $scope.newReferralForm.editing = !!referral;
        if (!!referral) {
          $scope.newReferralForm.description = referral.referralDetails;
          $scope.newReferralForm.type = referral.referralType;
          $scope.newReferralForm.title = referral.referralTargetSubject;
          $scope.newReferralForm.email = referral.referralTargetEmail;
          $scope.newReferralForm.location = referral.jobLocation;
          $scope.newReferralForm.jobType = referral.jobType;
          $scope.newReferralForm.previewType = referral.previewType;
          $scope.newReferralForm.previewLink = referral.previewLink;
          $scope.newReferralForm.bountyEnable = referral.bountyEnable;
          $scope.newReferralForm.refPublic = referral.refPublic;
          $scope.newReferralForm.editingReferral = referral;
          $scope.newReferralForm.isChildRef = !!referral.parentReferralId;
        }

        $scope.referralModal = ReferralSvc.getNewReferralLinkModal($scope, "ReferalModalCtrl");
      };

      $scope.openDeleteReferralLinkModal = function (referralLink, idx) {
        $scope.deletingReferralLink = referralLink;
        $scope.deletingReferralIdx = idx;
        $scope.referralModal = ReferralSvc.getDeleteReferralLinkModal($scope, "ReferalModalCtrl");
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
            $scope.referral.shareReferral.referralType = data.referralType;
            $scope.referral.shareReferral.referralTargetSubject = data.referralTargetSubject;
            $scope.referral.shareReferral.generating = false;
          });
      };

      $scope.openUpdateSkillModal = function (id, referralLink) {
        ReferralSvc.getJobCategories(referralLink).then(function(data) {
          $scope.jobCategorizingForm.categories = data;
        });
        $scope.jobCategorizingForm.jobId = id;
        $scope.referralModal = ReferralSvc.getUpdatingJobSkillsModal($scope, "ReferalModalCtrl");
      };

      $scope.removeCategoryFromList = function(idx) {
        $scope.jobCategorizingForm.categories.splice(idx, 1);
      }

      $scope.addCategoryToList = function() {
        var newCategoryId = $scope.jobCategorizingForm.newCategoryId;
        if (!newCategoryId) return;
        newCategoryId = parseInt(newCategoryId);

        // check whether new category exist
        for (var i = 0, len = $scope.jobCategorizingForm.categories.length; i < len; i++) {
          var category = $scope.jobCategorizingForm.categories[i];
          if (newCategoryId === category.categoryId) {
            $scope.jobCategorizingForm.newCategoryId = null;
            return;
          }
        }

        var categories = $scope.jobCategorizingForm.defaultCategories;
        for (var i = 0, len = categories.length; i < len; i++) {
          var category = categories[i];
          var id = category.id;
          var name = category.name;

          if (id === newCategoryId) {
            $scope.jobCategorizingForm.categories.push({
              categoryId : id,
              name : name
            });
            $scope.jobCategorizingForm.newCategoryId = null;
            break;
          }
        }
      }

      $scope.categorizeJob = function() {
        if ($scope.jobCategorizingForm.updating) return;
        $scope.jobCategorizingForm.updating = true;

        var jobId = $scope.jobCategorizingForm.jobId;
        var categoryIds = [];
        var categories = $scope.jobCategorizingForm.categories;
        for (var i = 0, len = categories.length; i < len; i++) {
          categoryIds.push(categories[i].categoryId);
        }

        ReferralSvc.categorizeJobSkills(jobId, categoryIds).then(function() {
          toastr.success("Job has been updated successfully.", "Success");
          $scope.closeModal();
        }).catch(function() {
          toastr.error("Updating job has failed!", "Failed");
          $scope.closeModal();
        });
      }

      $scope.closeModal = function () {
        // console.log($scope.referralModal);
        $scope.referralModal.dismiss();
        $scope.newReferralForm.editing = false;
        $scope.newReferralForm.description = null;
        $scope.newReferralForm.title = null;
        $scope.newReferralForm.email = null;
        $scope.newReferralForm.location = null;
        $scope.newReferralForm.jobType = null;
        $scope.newReferralForm.previewType = $scope.PREVIEW_TYPE.WEB_PAGE_URL;
        $scope.newReferralForm.previewLink = null;
        $scope.newReferralForm.previewFile = null;
        $scope.newReferralForm.bountyEnable = false;
        $scope.newReferralForm.refPublic = false;
        $scope.newReferralForm.previewLinkInvalid = false;
        $scope.newReferralForm.previewFileInvalidSize = false;
        $scope.newReferralForm.previewFileInvalidType = false;
        $scope.newReferralForm.generating = false;
        $scope.newReferralForm.isChildRef = false;
        $scope.newReferralForm.editingReferral = {};
        $scope.referral.selectedDescription = null;
        $scope.referral.selectedTargetEmail = null;
        $scope.referral.shareReferral.generating = false;
        $scope.referral.shareReferral.refCode = "";
        $scope.referral.shareResume.sharing = false;
        $scope.referral.shareResume.success = false;
        $scope.referral.shareResume.referral = null;
        $scope.deletingReferralLink = "";
        $scope.deletingReferralIdx = -1;
        $scope.jobCategorizingForm.categories = [];
        $scope.jobCategorizingForm.jobId = null;
        $scope.jobCategorizingForm.newCategoryId = null;
        $scope.jobCategorizingForm.updating = false;
        $scope.inDeletingReferral = false;

        if (!!parentLink) {
          $location.url("/referral");

          $scope.loadListReferralLinks();
        }
      };

      function isUrlValid(userInput) {
        var regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
        var url = new RegExp(regexQuery, "i");
        return url.test(userInput);
      }

      $scope.generateLink = function () {
        if ($scope.newReferralForm.isChildRef) {
          return;
        }

        $scope.newReferralForm.generating = true;

        var context = "";
        var type = $scope.newReferralForm.type;
        var email = "",
          title = "",
          location = "",
          jobType = "",
          previewLink = "",
          previewFile = null,
          previewType = $scope.PREVIEW_TYPE.NONE,
          refPublic = false,
          bountyEnable = false;
        switch (type) {
          case  $scope.REFERRAL_TYPE.JOB_SPEC:
            email = $scope.newReferralForm.email;
            location = $scope.newReferralForm.location;
            jobType = $scope.newReferralForm.jobType;
            break;
          case  $scope.REFERRAL_TYPE.SOCIAL_SHARE:
            break;
          case $scope.REFERRAL_TYPE.TEXT_LINK:
            break;
        }

        title = $scope.newReferralForm.title;
        context = $scope.newReferralForm.description;
        refPublic = $scope.newReferralForm.refPublic;
        bountyEnable = $scope.newReferralForm.bountyEnable;
        previewType = $scope.newReferralForm.previewType;
        var previewFileCheck = true;
        if ($scope.newReferralForm.editing) {
          var oldPreviewType = $scope.newReferralForm.editingReferral.previewType;
          previewFileCheck = previewType !== oldPreviewType;
        }

        var previewLinkInvalid = false,
          previewFileInvalidSize = false,
          previewFileInvalidType = false;
        switch (previewType) {
          case $scope.PREVIEW_TYPE.FILE:
            previewFileInvalidType = previewFileCheck;
            previewFile = $scope.newReferralForm.previewFile;
            if (!!previewFile) {
              var validExts = [
                "application/pdf",
                "image/jpeg",
                "image/png"
              ];
              var fileType = previewFile.type;

              previewFileInvalidSize = previewFile.size > 5000000;
              previewFileInvalidType = validExts.indexOf(fileType) < 0;
            }
            break;
          case $scope.PREVIEW_TYPE.WEB_PAGE_URL:
            previewLink = $scope.newReferralForm.previewLink;
            previewLinkInvalid = !isUrlValid(previewLink);
            break;
        }

        $scope.newReferralForm.previewLinkInvalid = previewLinkInvalid;
        $scope.newReferralForm.previewFileInvalidSize = previewFileInvalidSize;
        $scope.newReferralForm.previewFileInvalidType = previewFileInvalidType;
        if (previewLinkInvalid || previewFileInvalidSize || previewFileInvalidType) {
          $scope.newReferralForm.generating = false;
          return;
        }

        if (!!userId) {
          // ReferralSvc.generateLinkForUser(context, userEmail, type, title, email, jobType, location)
          //   .then(function () {
          //     $scope.newReferralForm.generating = false;
          //     $scope.closeModal();
          //     $scope.loadListReferralLinks();
          //     var msg = Utilities.getAlerts("newReferralLinkSuccessMsg");
          //     toastr.success(msg, "Success");
          //   });
        } else {
          if (!$scope.newReferralForm.editing) {
            ReferralSvc.generateLink(
              context,
              type,
              title,
              email,
              jobType,
              location,
              refPublic,
              bountyEnable,
              previewType,
              previewLink,
              previewFile
            )
              .then(function () {
                $scope.newReferralForm.generating = false;
                $scope.closeModal();
                $scope.reloadListReferralLinks();
                var msg = Utilities.getAlerts("newReferralLinkSuccessMsg");
                toastr.success(msg, "Success");
              });
          } else {
            var referralLink = $scope.newReferralForm.editingReferral.referralLink;
            ReferralSvc.editRefLink(
              referralLink,
              title,
              context,
              jobType,
              location,
              refPublic,
              bountyEnable,
              previewType,
              previewLink,
              previewFile
            )
              .then(function () {
                $scope.newReferralForm.editingReferral.referralTargetSubject = title;
                $scope.newReferralForm.editingReferral.referralDetails = context;
                $scope.newReferralForm.editingReferral.jobType = jobType;
                $scope.newReferralForm.editingReferral.jobLocation = location;
                $scope.newReferralForm.editingReferral.refPublic = refPublic;
                $scope.newReferralForm.editingReferral.bountyEnable = bountyEnable;
                $scope.newReferralForm.editingReferral.previewType = previewType;
                $scope.newReferralForm.editingReferral.previewLink = previewLink;

                $scope.newReferralForm.generating = false;
                $scope.closeModal();

                var msg = Utilities.getAlerts("editReferralLinkSuccessMsg");
                toastr.success(msg, "Success");
              });
          }
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

      $scope.deleteReferral = function () {
        if ($scope.inDeletingReferral) return;
        $scope.inDeletingReferral = true;

        ReferralSvc.deleteReferralLink($scope.deletingReferralLink)
          .then(function () {
            $scope.referral.links.splice($scope.deletingReferralIdx, 1);
            $scope.inDeletingReferral = false;
            $scope.closeModal();
            var msg = Utilities.getAlerts("deleteReferralLinkSuccessMsg");
            toastr.success(msg, "Success");
          })
          .catch(function () {
            toastr.error("Deleting the referral has failed!", "Error");
            $scope.inDeletingReferral = false;
            $scope.closeModal();
          });
      };

      $scope.getResumesLink = function (
        type,
        link,
        parentLink
      ) {
        var path = "";
        switch (type) {
          case $scope.REFERRAL_TYPE.SOCIAL_SHARE:
            path = "/social-registrations";
            break;
          case $scope.REFERRAL_TYPE.CV_BOX:
            path = "/cvbox";
            break;
          default:
            path = "/referred-resumes";
            break;
        }
        var url = path + "?referralLink=" + link;
        if (!!parentLink && parentLink !== link) url = url + "&parentLink=" + parentLink;

        return url;
      };

      $scope.getReferralLink = function (referral) {
        var refType = referral.referralType;
        var link = referral.referralLink;
        var tt = referral.referralTargetSubject;

        return $scope.getRefLink(refType, link, tt);
      };

      $scope.getRefLink = function (
        refType,
        link,
        subject
      ) {
        var text = "";
        switch (refType) {
          case $scope.REFERRAL_TYPE.JOB_SPEC:
            text = "https://mycvtracker.com/job-spec.html?ref=";
            break;
          case $scope.REFERRAL_TYPE.SOCIAL_SHARE:
            text = "https://mycvtracker.com/network-share.html?ref=";
            break;
          case $scope.REFERRAL_TYPE.CV_BOX:
            text = "https://mycvtracker.com/cv-box.html?ref=";
            break;
          default:
            text = "https://mycvtracker.com/context-link.html?ref=";
            break;
        }
        if (!subject) subject = "";

        subject = subject.replace(/  +/g, " ")
          .replaceAll(" ", "-");

        return text + link + (!!subject ? "&title=" + encodeURIComponent(subject) : "");
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

        ReferralSvc.getListSkillCategories()
          .then(function (data) {
            $scope.jobCategorizingForm.defaultCategories = data;
          });
      };

      $scope.init();

      // $scope.$watch('referralModal', function(newValue, oldValue) {
      //   console.log("newValue", newValue);
      // });
    }
  ]);

angular.module("MyCvTracker.pages.referral")
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

angular.module("MyCvTracker.pages.referral")
  .directive("previewFileModel", [
    "$parse",
    "$injector",
    "Constants",
    function (
      $parse,
      $injector,
      Constants
    ) {
      return {
        restrict : "A",
        link : function (
          scope,
          element,
          attrs
        ) {
          var model = $parse(attrs.previewFileModel);
          var modelSetter = model.assign;
          var Utilities = $injector.get("Utilities");

          element.bind("change", function () {
            scope.$apply(function () {
              modelSetter(scope, element[0].files[0]);
              var file = scope.newReferralForm.previewFile;
              // var validExts = ["application/pdf", "image/jpeg", "image/png"];
              // var fileExt = file.type;
              var input = $("#fileUpload");
              // if (validExts.indexOf(fileExt) < 0) {
              //   alert("Wrong file");
              //   scope.newReferralForm.previewFile=null;
              //   return false;
              // }
              //
              // if(file.size>=Constants.fileUpload.fileSizeLimitInByte){
              //   scope.newReferralForm.previewFile
              //   return false;
              // }
            });
          });
        }
      };
    }
  ]);
