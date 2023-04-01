angular.module("MyCvTracker.pages.resumeListing")
  .controller("ResumesListingCtrl", [
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
      var NO_RECORDS = 12;
      var Utilities = $injector.get("Utilities");
      var mainSvc = $injector.get("ResumesListingService");

      var userDetail = Authorization.getUserDetails();
      var role = !!userDetail ? Authorization.getUserRole() : "";
      var isAdmin =  role=== "ADMIN";
      var isReviewer =  role=== "REVIEWER";
      var isRecruiter =  role=== "RECRUITER";
      var isManagement = isAdmin || isReviewer || isRecruiter;

      $scope.listResumes = [];
      $scope.loadInfo = {
        page : 1,
        hasNext : false,
        loading : false,
        isAdmin : isAdmin,
        isReviewer : isReviewer,
        isRecruiter : isRecruiter,
        isManagement : isManagement
      };
      $scope.extendModal = null;
      $scope.extendForm = {
        days : 7,
        extendOriginal : false,
        resume : null,
        extending : false
      };
      $scope.cvBoxForm = {
        resume : null,
        selectedReferralId : -1,
        findingBox : false,
        foundBoxes : null,
        boxName : "",
        addingToBox : false
      };
      $scope.jobCategorizingForm = {
        resumeId : null,
        skills : []
      };

      $scope.getResume = function () {
        $scope.loadInfo.loading = true;

        var page = $scope.loadInfo.page;
        mainSvc.listResumes(page, NO_RECORDS)
          .then(function (rpData) {
            var len = rpData.length;
            if (len > 0) {
              var hasNext = len >= NO_RECORDS;
              if (hasNext) {
                len = NO_RECORDS;
              }

              for (var i = 0; i < len; i++) {
                var resume = rpData[i];
                initExpiration(resume);
                $scope.listResumes.push(resume);
              }

              $scope.loadInfo.hasNext = hasNext;
              $scope.loadInfo.loading = false;
            }
          });
      };

      $scope.toggleListingActive = function (resume) {
        var timeout = resume.timeout;
        if (!!timeout) {
          clearTimeout(timeout);
        }

        var id = resume.id;
        var listingActive = !resume.listingActive;
        resume.listingActive = listingActive;

        resume.timeout = setTimeout(function () {
          mainSvc.updateResumeListingStatus(id, listingActive);
        }, 1000);
      };

      $scope.loadMore = function () {
        $scope.loadInfo.page++;
        $scope.getResume();
      };

      $scope.findCvBox = function() {
        if ($scope.cvBoxForm.findingBox) return;

        $scope.cvBoxForm.findingBox = true;
        $scope.cvBoxForm.foundBoxes = [];
        $scope.cvBoxForm.selectedReferralId = -1;
        var name = $scope.cvBoxForm.boxName;

        mainSvc.findCvBoxByName(name).then(function(data) {
          $scope.cvBoxForm.foundBoxes = data;
          $scope.cvBoxForm.findingBox = false;
        });
      }

      $scope.addCvToBox = function() {
        if ($scope.cvBoxForm.addingToBox) return;

        $scope.cvBoxForm.addingToBox = true;
        var selectedReferralId = $scope.cvBoxForm.selectedReferralId;
        var resumeId = $scope.cvBoxForm.resume.id;

        mainSvc.addResumeToCvBox(selectedReferralId, resumeId).then(function() {
          toastr.success("Resume has been added to cv box successfully.");
          $scope.closeModal();
        }).catch(function() {
          toastr.error("Adding resume to cv box has failed!");
          $scope.closeModal();
        });
      }

      $scope.getFormattedPostDate = function (utc) {
        if (!!utc) {
          var dateObj = new Date(utc);

          var date = dateObj.getDate();
          date = date < 10 ? ("0" + date) : ("" + date);
          var month = dateObj.getMonth();
          month = month < 10 ? ("0" + month) : ("" + month);
          var hour = dateObj.getHours();
          hour = hour < 10 ? ("0" + hour) : ("" + hour);
          var minutes = dateObj.getMinutes();
          minutes = minutes < 10 ? ("0" + minutes) : ("" + minutes);
          return date + "/" + month + "/" + dateObj.getFullYear() + " " + hour + ":" + minutes;
        }

        return "";
      };

      $scope.getFormattedDate = function (utc) {
        if (!!utc) {
          var dateObj = new Date(utc);

          var date = dateObj.getDate();
          date = date < 10 ? ("0" + date) : ("" + date);
          var month = dateObj.getMonth() + 1;
          month = month < 10 ? ("0" + month) : ("" + month);
          var hour = dateObj.getHours();
          hour = hour < 10 ? ("0" + hour) : ("" + hour);
          var minutes = dateObj.getMinutes();
          minutes = minutes < 10 ? ("0" + minutes) : ("" + minutes);
          return date + "/" + month + "/" + dateObj.getFullYear();
        }

        return "";
      };

      function isExpired(date) {
        var now = new Date();
        return (!!date && now.getTime() > date.getTime());
      }

      function initExpiration(resume) {
        var maskedExpiresAt = resume.previewExpiresAt;
        var originalExpiresAt = resume.originalPreviewExpiresAt;

        if (!!maskedExpiresAt) {
          var dateObj = new Date(maskedExpiresAt);
          resume.maskedExpired = isExpired(dateObj);
        }

        if (!!originalExpiresAt) {
          var dateObj = new Date(originalExpiresAt);
          resume["originalExpired"] = isExpired(dateObj);
        }
      }

      function extendResumeDays(resume, noOfDays, extendOriginal) {
        var now = new Date();
        var maskedExpiresAt = resume.previewExpiresAt;
        var originalExpiresAt = resume.originalPreviewExpiresAt;

        var dateObj = null;
        if (!extendOriginal) {
           dateObj = new Date(maskedExpiresAt);
        } else {
          dateObj = new Date(originalExpiresAt);
        }

        if (now.getTime() > dateObj.getTime()) {
          dateObj = now;
        }

        dateObj.setDate(dateObj.getDate() + noOfDays);
        if (!extendOriginal) {
          resume.previewExpiresAt = dateObj.toISOString();
        } else {
          resume.originalPreviewExpiresAt = dateObj.toISOString();
        }
        initExpiration(resume);
      }

      $scope.openExtendModal = function(resume, original) {
        $scope.extendForm.resume = resume;
        $scope.extendForm.extendOriginal = original;
        $scope.extendModal = mainSvc.getAdminExtendResumeModal($scope, "ReferalModalCtrl");
      }

      $scope.openAddToCvBoxModal = function(resume) {
        $scope.cvBoxForm.resume = resume;
        $scope.extendModal = mainSvc.getCvBoxSelectionModal($scope, "ReferalModalCtrl");
      }

      $scope.openUpdateSkillModal = function (id) {
        mainSvc.getResumeCategories(id).then(function(data) {
          $scope.jobCategorizingForm.skills = data;
        });
        $scope.extendModal = mainSvc.getUpdatingResumeSkillModal($scope, "ReferalModalCtrl");
      };

      $scope.closeModal = function () {
        $scope.extendModal.dismiss();
        $scope.extendForm.days = 7;
        $scope.extendForm.extending = false;
        $scope.extendForm.resume = null;
        $scope.cvBoxForm = {
          resume : null,
          selectedReferralId : -1,
          findingBox : false,
          foundBoxes : null,
          boxName : ""
        };
        $scope.jobCategorizingForm.skills = [];
      }

      $scope.extendResume = function() {
        $scope.extendForm.extending = true;
        var resume = $scope.extendForm.resume;
        var resumeId = resume.id;
        var extendOriginal = $scope.extendForm.extendOriginal;
        var extendDays = $scope.extendForm.days;
        mainSvc.extendResumePreview(resumeId, extendOriginal, extendDays).then(function() {
          extendResumeDays(resume, extendDays, extendOriginal);
          $scope.closeModal();
          var msg = Utilities.getAlerts("extendResumeSuccessMessage");
          toastr.success(msg, "Success");
        }).catch(function() {
          $scope.closeModal();
          var msg = Utilities.getAlerts("extendResumeSuccessFail");
          toastr.error(msg, "Error");
        });
      }

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

        var resumeId = $scope.jobCategorizingForm.resumeId;
        var categoryIds = [];
        var categories = $scope.jobCategorizingForm.categories;
        for (var i = 0, len = categories.length; i < len; i++) {
          categoryIds.push(categories[i].categoryId);
        }

        mainSvc.categorizeResumeSkills(resumeId, categoryIds).then(function() {
          toastr.success("Resume has been updated successfully.", "Success");
          $scope.closeModal();
        }).catch(function() {
          toastr.error("Updating resume has failed!", "Failed");
          $scope.closeModal();
        });
      }

      $scope.addNewResumeModel = function () {

        $scope.resumeModal = mainSvc.getNewResumeModal($scope, "ResumeCtrl");
        $scope.myFile = null;
        $scope.id = null;
        $scope.resumeTitle = null;
        $scope.resumeType = null;
      };

      $scope.closeNewResumeModal = function() {
        $scope.resumeModal.dismiss();
        $scope.myFile = null;
        $scope.id = null;
        $scope.resumeTitle = null;
        $scope.resumeType = null;
      };

      //Save Resume Function, Used for both new and edit resume
      $scope.saveMyResume = function (
        file,
        resumeTitle,
        resumeType
      ) {
        if ($scope.formProcessing) {
          return;
        }
        $scope.formProcessing = true;

        var fd = new FormData();
        const userEmail = userDetail.email;
        fd.append("userEmail", userEmail);
        fd.append("file", file);
        fd.append("resumeReference", resumeTitle);
        fd.append("resumeType", resumeType);
        fd.append("resumeReviewer", "randeep");

        //ResumesSvc.saveMyResume(fd).
        //This must be changed to call the service layer
        var url = Utilities.getSaveResumesUrl();
        console.log("url", url);
        $http.post(url, fd, {
          transformRequest : angular.identity,
          headers : { "Content-Type" : undefined }
        })
          .success(function (
            data,
            status,
            headers,
            config
          ) {
            console.log("success");
            $scope.closeNewResumeModal();
            // $rootScope.$broadcast("quickCV");
            toastr.success(Utilities.getAlerts("resumeAddedSuccess").message);

            $scope.listResumes.unshift(data);
            $scope.formProcessing = false;
          })
          .error(function (
            data,
            status,
            headers,
            config
          ) {
            console.log("error");
            $scope.formProcessing = false;
            $scope.closeNewResumeModal();

            if (data.message == "resumeSaveTitleDuplicatedError") {
              toastr.error(Utilities.getAlerts("resumeSaveTitleDuplicatedError").message);
            } else if (data.message == "resumeSaveTypeDuplicatedError") {
              toastr.error(Utilities.getAlerts("resumeSaveTypeDuplicatedError").message);
            } else if (data.message == "resumeSaveLimitError") {
              toastr.error(Utilities.getAlerts("resumeSaveLimitError").message);
            } else if (data.message == "resumeSaveNameDuplicatedError") {
              toastr.error(Utilities.getAlerts("resumeSaveNameDuplicatedError").message);
            } else {
              toastr.error(Utilities.getAlerts("defaultError"));
            }
          });
      };

      $scope.editLinkForm = {
        selectedResume : null,
        linkId : "",
        type : null,
        inUse : false,
        editing : false
      };
      $scope.closeEditPreviewLinkModal = function() {
        $scope.resumeModal.dismiss();
        $scope.editLinkForm.selectedResume = null;
        $scope.editLinkForm.linkId = "";
        $scope.editLinkForm.type = null;
        $scope.editLinkForm.editing = false;
        $scope.editLinkForm.inUse = false;
      }

      $scope.openEditPreviewLink = function (
        resume,
        type
      ) {
        $scope.editLinkForm.selectedResume = resume;
        var linkId = "";
        if (type === "MASKED") {
          linkId = !!resume.maskedLinkId ? resume.maskedLinkId : "";
        } else {
          linkId = !!resume.originalLinkId ? resume.originalLinkId : "";
        }
        $scope.editLinkForm.linkId = linkId;
        $scope.editLinkForm.type = type;

        $scope.resumeModal = mainSvc.getEditPreviewLinkModal($scope, "ResumeCtrl");
      };

      $scope.editResumeLink = function () {
        var linkId = $scope.editLinkForm.linkId;
        var resumeId = $scope.editLinkForm.selectedResume.id;
        var type = $scope.editLinkForm.type;

        mainSvc.updateResumeLink(resumeId, linkId, type)
          .then(function () {
            if (type === "MASKED") {
              $scope.editLinkForm.selectedResume.maskedLinkId = linkId;
            } else if (type === "ORIGINAL") {
              $scope.editLinkForm.selectedResume.originalLinkId = linkId;
            }

            toastr.success("Preview link has been updated successfully.");
            $scope.closeEditPreviewLinkModal();
          })
          .catch(function () {
            toastr.error("Updating preview link has failed!", "Error");
            $scope.closeEditPreviewLinkModal();
          });
      };

      $scope.checkPreviewId = function () {
        if ($scope.editLinkForm.editing) return;
        $scope.editLinkForm.editing = true;

        var linkId = $scope.editLinkForm.linkId;
        if (!linkId) {
          $scope.editLinkForm.editing = false;
          return;
        }

        var resumeId = $scope.editLinkForm.selectedResume.id;
        var type = $scope.editLinkForm.type;

        mainSvc.checkResumePreviewLink(linkId)
          .then(function () {
            $scope.editResumeLink();
          })
          .catch(function () {
            $scope.editLinkForm.inUse = true;
            $scope.editLinkForm.editing = false;
          });
      };

      $scope.init = function () {
        $scope.getResume();

        mainSvc.getListSkillCategories()
          .then(function (data) {
            $scope.jobCategorizingForm.defaultCategories = data;
          });
      };

      $scope.init();
    }
  ]);

angular.module("MyCvTracker.pages.resumeListing")
  .controller("ExtendResumeModalCtrl", [
    "$scope",
    "$injector",
    function (
      $scope,
      $injector
    ) {
      var utilities = $injector.get("Utilities");

    }
  ]);

angular.module("MyCvTracker.pages.resumeListing")
  .controller("ResumeCtrl", [
    "$scope",
    "$injector",
    function (
      $scope,
      $injector
    ) {
      var Utilities = $injector.get("Utilities");

      $scope.saveResume = function () {
        var file = $scope.myFile;
        var resumeTitle = $scope.resumeTitle;
        var resumeType = $scope.resumeType;
        if (file != null && file.size >= 5000000) {
          $scope.addAlert(Utilities.getAlerts("InputFileInputSizeValidation"));
          $scope.myFile = null;
          return false;
        }
        if (file != null) {
          $scope.saveMyResume(file, resumeTitle, resumeType);
        } else {
          $scope.addAlert(Utilities.getAlerts("InputFileInputRequiredValidation"));
        }

      };
    }
  ]);
