angular.module("MyCvTracker.pages.resumes")

  .controller("ResumesCtrl", [
    "Constants",
    "toastr",
    "$rootScope",
    "$scope",
    "$injector",
    "$http",

    function (
      Constants,
      toastr,
      $rootScope,
      $scope,
      $injector,
      $http
    ) {
      // Variables initialization
      var Utilities = $injector.get("Utilities");
      var AccountSvc = $injector.get("AccountSvc");
      var ResumesSvc = $injector.get("ResumesSvc");
      var Constants = $injector.get("Constants");

      //Used scopes
      $scope.resumeModal = {};
      $scope.user = {
        myResumes : []
      };
      $scope.editLinkForm = {
        selectedResume : null,
        linkId : "",
        type : null,
        inUse : false,
        editing : false
      };

      //Get User Details Function
      $scope.getUserDetails = function () {
        AccountSvc.getUser()
          .then(
            function (userData) {

              $scope.user = userData;
              $scope.getMyResumes();
            },

            function (response) {
              toastr.error(Utilities.getAlerts(response.status));
            }
          );
      };
      //////////////////////////////////////////////////////////////////////////////////////
      //Listing Resumes Function
      $scope.getMyResumes = function () {

        $scope.user.myResumes = [];

        ResumesSvc.getMyResumes($scope.user.id)
          .then(
            function (resumesData) {
              var len = resumesData.length;
              for (var i = 0; i < len; i++) {
                var resume = resumesData[i];
                initExpiration(resume);
                $scope.user.myResumes.push(resume);
              }
            }
          );
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
      /////////////////////////////////////////////////////////////////////////////////////
      //open new Resume Model Function
      $scope.addNewResumeModel = function () {

        $scope.resumeModal = ResumesSvc.getNewResumeModal($scope, "ResumeCtrl");
        $scope.myFile = null;
        $scope.id = null;
        $scope.resumeTitle = null;
        $scope.resumeType = null;
      };

      /////////////////////////////////////////////////////////////////////////////////////
      //open new push to drive modal
      $scope.openPushResumeModel = function (
        id,
        name
      ) {
        const userEmail = $scope.user.email;
        if (userEmail.endsWith("@gmail.com")) {
          $scope.resumeModal = ResumesSvc.getPushResumeModal($scope, "ResumeCtrl");
          $scope.recruiterName = null;
          $scope.recruiterEmail = null;
          $scope.agencyName = null;
          $scope.formNotes = null;
          $scope.selectedResumeId = id;
          $scope.selectedResumeName = name;
        } else {
          $scope.resumeModal = ResumesSvc.getGmailAuthenticationAdviceModal($scope, "ResumeCtrl");
        }
      };

      /////////////////////////////////////////////////////////////////////////////////////
      //open new Resume Model Function
      $scope.addNewResumeModelFromTrackResumeModel = function () {

        $scope.resumeModal = ResumesSvc.getQuickUploadResumeModal($scope, "ResumeCtrl");
        $scope.myFile = null;
        $scope.id = null;
        $scope.resumeTitle = null;
        $scope.resumeType = "quickCV";
      };
      //////////////////////////////////////////////////////////////////////////////////////
      //Open Edit Resume Model Function
      $scope.openEditResumeModel = function (resumeId) {

        $scope.findMyResume(resumeId);
        $scope.resumeModal = ResumesSvc.getEditResumeModal($scope, "ResumeCtrl");
        $scope.id = resumeId;
      };
      ///////////////////////////////////////////////////////////////////////////////////////
      //Open Delete Resume Model Function
      $scope.openDeleteResumeModel = function (
        resumeId,
        resumeName
      ) {
        $scope.resumeModal = ResumesSvc.getWarningModal($scope, "ResumeCtrl");
        $scope.id = resumeId;
        $scope.resumeName = resumeName;
        $scope.modelType = "Delete";
        //Setting the title and message
        $scope.modelTitle = Utilities.getAlerts("deleteModelTitle").message;
        $scope.modelMessage = Utilities.getAlerts("deleteModelMessage").message;
      };
      //////////////////////////////////////////////////////////////////////////////////////
      //Open Download Resume Model Function
      $scope.openDownloadResumeModel = function (resumeId) {
        $scope.resumeModal = ResumesSvc.getWarningModal($scope, "ResumeCtrl");
        $scope.id = resumeId;
        $scope.modelType = "Download";
        //Setting the title and message
        $scope.modelTitle = Utilities.getAlerts("downloadModelTitle").message;
        $scope.modelMessage = Utilities.getAlerts("downloadModelMessage").message;
      };

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

        $scope.resumeModal = ResumesSvc.getEditPreviewLinkModal($scope, "ResumeCtrl");
      };

      //Close the resume model function
      $scope.closeModal = function () {
        $scope.resumeModal.dismiss();
        $scope.myFile = null;
        $scope.id = null;
        $scope.resumeTitle = null;
        $scope.resumeType = null;

        $scope.editLinkForm.selectedResume = null;
        $scope.editLinkForm.linkId = "";
        $scope.editLinkForm.type = null;
        $scope.editLinkForm.editing = false;
        $scope.editLinkForm.inUse = false;
        $scope.formProcessing = false;
      };
      ///////////////////////////////////////////////////////////////////////////////////////////
      /*
       * CRUD Functions
       */
      //Find Resume by Function: used in both edit and delete resume model function
      $scope.findMyResume = function (id) {

        ResumesSvc.findMyResume(id)
          .then(
            function (resumesData) {
              $scope.resumeTitle = resumesData.resumeTitle;
              $scope.resumeType = resumesData.resumeType;
              $scope.resumeName = resumesData.resumeName;
              var file = new File([resumesData.resumeFile], resumesData.resumeName);
              file.name = resumesData.resumeName;
              file.type = "application/msword";
              $scope.myFile = file;
            }
          );
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
        const userEmail = $scope.user.email;
        fd.append("userEmail", userEmail);
        fd.append("file", file);
        fd.append("resumeReference", resumeTitle);
        fd.append("resumeType", resumeType);
        fd.append("resumeReviewer", "randeep");

        //ResumesSvc.saveMyResume(fd).
        //This must be changed to call the service layer
        var url = Utilities.getSaveResumesUrl();
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
            $scope.closeModal();
            $rootScope.$broadcast("quickCV");
            toastr.success(Utilities.getAlerts("resumeAddedSuccess").message);

            data.uploadedAt = Utilities.getFormattedDate(data.uploadedAt);
            $scope.user.myResumes.unshift(data);
            $scope.formProcessing = false;
          })
          .error(function (
            data,
            status,
            headers,
            config
          ) {
            $scope.formProcessing = false;
            $scope.closeModal();

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

      $scope.pushToDrive = function () {
        var trackingId = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 31; i++)
          trackingId += possible.charAt(Math.floor(Math.random() * possible.length));

        $scope.formProcessing = true;
        $scope.closeModal();

        var data = {
          toRecruiter : $scope.recruiterEmail,
          targetList : $scope.recruiterEmail,
          recruiter : $scope.recruiterName,
          notesType : "job_board",
          agency : $scope.agencyName,
          subject : "email",
          trackingId : trackingId,
          content : "pls check",
          resumeId : $scope.selectedResumeId,
          userId : 6, // once we get token after user auth we can use it
          notes : $scope.formNotes,
          createdDate : new Date()
        };

        var url = Utilities.getPushResumeToDriveUrl();
        $http.post(url, data)
          .success(function (
            data,
            status,
            headers,
            config
          ) {
            $scope.formProcessing = false;
            toastr.success(Utilities.getAlerts("resumePushedSuccess").message);
          })
          .error(function (
            data,
            status,
            headers,
            config
          ) {
            $scope.formProcessing = false;
            toastr.error(Utilities.getAlerts("resumePushToDriveError"));
          });
      };

      $scope.checkUserRole = function () {

        if ($scope.user.userRole == "ADMIN") {
          return false;
        } else {
          return true;
        }
      };

      $scope.loadResume = function (resumeLookUp) {

        $scope.user.myResumes = [];

        ResumesSvc.getOtherResumes($scope.user.id, resumeLookUp)
          .then(
            function (resumesData) {
              $scope.user.myResumes = resumesData;
            }
          );

      };

      //Delete Resume Function
      $scope.deleteMyResume = function () {
        var id = $scope.id;
        var resumeName = $scope.resumeName;

        //ResumesSvc.deleteMyResume(fd)
        //This must be changed to call the service layer
        var url = Utilities.geDeleteResumesUrl() + "?id=" + id + "&resumeName=" + resumeName;
        $http.delete(url, {
          transformRequest : angular.identity,
          headers : { "Content-Type" : undefined }
        })
          .success(function (
            data,
            status,
            headers,
            config
          ) {
            $scope.closeModal();
            toastr.success(Utilities.getAlerts("deleteResumeuccess").message);
            angular.forEach(
              $scope.user.myResumes,
              function (
                obj,
                i
              ) {
                if (id == obj.id) {
                  $scope.user.myResumes.splice(i, 1);
                }
              }
            );
          })
          .error(function (
            data,
            status,
            headers,
            config
          ) {
            $scope.closeModal();
            if (data.message == "resumeSaveLeastError") {
              toastr.error(Utilities.getAlerts("resumeSaveLeastError").message);
            } else {
              toastr.error(Utilities.getAlerts("defaultError").message);
            }
          });
      };
      //Download Resume Function
      $scope.downloadMyResume = function (id) {
        ResumesSvc.getResumeToken(id)
          .then(function (data) {
            var url = Constants.baseUrl + "/user/downloadResume?accessToken=" + data.token;

            const link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            toastr.success(Utilities.getAlerts("resumeDownloadSuccess").message);

            link.remove();
          }, function () {
          });
      };
      ////////////////////////////////////////////////////////////////////////////
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

        ResumesSvc.checkResumePreviewLink(linkId)
          .then(function () {
            $scope.editResumeLink();
          })
          .catch(function () {
            $scope.editLinkForm.inUse = true;
            $scope.editLinkForm.editing = false;
          });
      };

      $scope.editResumeLink = function () {
        var linkId = $scope.editLinkForm.linkId;
        var resumeId = $scope.editLinkForm.selectedResume.id;
        var type = $scope.editLinkForm.type;

        ResumesSvc.updateResumeLink(resumeId, linkId, type)
          .then(function () {
            if (type === "MASKED") {
              $scope.editLinkForm.selectedResume.maskedLinkId = linkId;
            } else if (type === "ORIGINAL") {
              $scope.editLinkForm.selectedResume.originalLinkId = linkId;
            }

            toastr.success("Preview link has been updated successfully.");
            $scope.closeModal();
          })
          .catch(function () {
            toastr.error("Updating preview link has failed!", "Error");
            $scope.closeModal();
          });
      };

      $scope.init = function () {
        $scope.getUserDetails();
      };

      $scope.init();

      $scope.alerts = [];
      $scope.formProcessing = false;
      var $timeout = $injector.get("$timeout");

      $scope.addAlert = function (alertOb) {
        $scope.alerts.push(alertOb);
      };
    }
  ]);

angular.module("MyCvTracker.pages.resumes")
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

      $scope.modelFunction = function () {
        if ($scope.modelType == "Delete") {
          $scope.deleteMyResume();
        }
        if ($scope.modelType == "Download") {
          $scope.downloadMyResume();
        }
      };
    }
  ]);


angular.module("MyCvTracker.pages.resumes")
  .directive("fileModel", [
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
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          var Utilities = $injector.get("Utilities");

          element.bind("change", function () {
            scope.$apply(function () {
              modelSetter(scope, element[0].files[0]);
              var file = scope.myFile;
              var validExts = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              ];
              var fileExt = file.type;
              var input = $("#fileUpload");
              if (validExts.indexOf(fileExt) < 0) {
                scope.addAlert(Utilities.getAlerts("InputFileInputTypeValidation"));
                scope.myFile = null;
                return false;
              }

              if (file.size >= Constants.fileUpload.fileSizeLimitInByte) {
                scope.addAlert(Utilities.getAlerts("InputFileInputSizeValidation"));
                scope.myFile = null;
                return false;
              }
            });
          });
        }
      };
    }
  ]);
