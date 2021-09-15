angular.module("MyCvTracker.shared")

  .factory("RestConfig", [
    "RESTSvc",
    "$injector",

    function (
      RESTSvc,
      $injector
    ) {
      var utilities = $injector.get("Utilities");

      var RestConfig = {
        doLogin : function (
          url,
          loginData
        ) {
          return RESTSvc.post(url, loginData);
        },

        doRegister : function (
          url,
          registationData
        ) {
          return RESTSvc.post(url, registationData);
        },

        doActivate : function (
          url,
          key
        ) {
          return RESTSvc.get(url + "?key=" + key);
        },

        doLogout : function (
          url,
          userData
        ) {
          return RESTSvc.post(url);
        },

        forgotPassword : function (
          url,
          email
        ) {
          return RESTSvc.post(url, email);
        },

        reactivate : function (
          url,
          email
        ) {
          return RESTSvc.post(url, email);
        },

        getMyResumes : function (url) {
          return RESTSvc.get(url);
        },

        findMyResumes : function (url) {
          return RESTSvc.get(url);
        },

        saveMyResume : function (
          url,
          resumeOb
        ) {
          return RESTSvc.post(url, resumeOb);
        },

        deleteMyResume : function (
          url,
          id
        ) {
          return RESTSvc.delete(url, id);
        },
        checkUniquePreviewLink : function (
          id
        ) {
          var url = utilities.getCheckResumeLinkUrl() + "?id=" + id;
          return RESTSvc.get(url);
        },
        updateResumePreviewLink : function (
          resumeId,
          linkId,
          type
        ) {
          var url = utilities.getUpdateResumeLinkUrl();
          return RESTSvc.put(url, {
            resumeId : resumeId,
            linkId : linkId,
            type : type
          });
        },

        saveResumeTrackRequest : function (
          url,
          requestOb
        ) {
          return RESTSvc.post(url, requestOb);
        },
        getMyFavNotes : function (url) {
          return RESTSvc.get(url);
        },
        saveCvMarketingRequest : function (
          url,
          requestOb
        ) {
          return RESTSvc.post(url, requestOb);
        },

        cloneCvMarketingRequest : function (
          url,
          requestOb
        ) {
          return RESTSvc.post(url, requestOb);
        },

        editCvMarketingRequest : function (
          url,
          requestOb
        ) {
          return RESTSvc.put(url, requestOb);
        },

        deleteCvMarketingRequest : function (url) {
          return RESTSvc.delete(url);
        },

        downloadMyResume : function (url) {
          return RESTSvc.download(url);
        },
        getMyNotifications : function (url) {
          return RESTSvc.get(url);
        },
        viewFullNotifications : function (url) {
          return RESTSvc.get(url);
        },
        executePayment : function (
          url,
          paymentObj
        ) {
          return RESTSvc.post(url, paymentObj);
        },
        getPaymentPlans : function (
          url,
          data
        ) {
          return RESTSvc.get(url, data);
        },
        getUserTick : function (url) {
          return RESTSvc.get(url);
        },
        getValidateUserTickNumber : function (url) {
          return RESTSvc.get(url);
        },
        resetNewPassword : function (
          url,
          data
        ) {
          return RESTSvc.post(url, data);
        },
        resetPasswordAndActivate : function (
          url,
          data
        ) {
          return RESTSvc.post(url, data);
        },
        addGroup : function (
          url,
          data
        ) {
          return RESTSvc.post(url, data);
        },
        editGroup : function (
          url,
          data
        ) {
          return RESTSvc.put(url, data);
        },
        addMembers : function (
          url,
          data
        ) {
          return RESTSvc.post(url, data);
        },
        saveMembersList : function (
          url,
          data
        ) {
          return RESTSvc.put(url, data);
        },
        getMembersList : function (
          url,
          data
        ) {
          return RESTSvc.get(url, data);
        },
        getGroupsList : function (
          url,
          data
        ) {
          return RESTSvc.get(url, data);
        },
        editGroupMembersList : function (
          url,
          data
        ) {
          return RESTSvc.put(url, data);
        },
        deleteGroupMembersList : function (
          url,
          data
        ) {
          return RESTSvc.put(url, data);
        },
        getMyNotes : function (
          url,
          data
        ) {
          return RESTSvc.get(url, data);
        },
        referCandidates : function (
          url,
          data
        ) {
          return RESTSvc.put(url, data);
        },
        campaignCandidates : function (
          url,
          data
        ) {
          return RESTSvc.put(url, data);
        },
        viewMyNotes : function (url) {
          return RESTSvc.get(url);
        },
        saveNotesRequest : function (
          url,
          data
        ) {
          return RESTSvc.put(url, data);
        },
        saveProfileSettings : function (
          url,
          Ob
        ) {
          return RESTSvc.post(url, Ob);
        },
        getUserProfileSettings : function (url) {
          return RESTSvc.get(url);
        },
        unSubscribeMail : function (
          url,
          Ob
        ) {
          return RESTSvc.post(url, Ob);
        },
        getMyCampaigns : function (url) {
          return RESTSvc.get(url);
        },
        sendTrackedApplication : function (
          url,
          data
        ) {
          return RESTSvc.put(url, data);
        },
        getJobs : function (
          url,
          obj
        ) {
          return RESTSvc.put(url, obj);
        },
        getJobCriteriaList : function (url) {
          return RESTSvc.get(url);
        },
        viewJob : function (
          url,
          key
        ) {
          return RESTSvc.get(url + "?key=" + key);
        },
        saveJob : function (
          url,
          obj
        ) {
          return RESTSvc.post(url, obj);
        },
        applyJob : function (
          url,
          obj
        ) {
          return RESTSvc.post(url, obj);
        },
        activateJob : function (
          url,
          action,
          obj
        ) {
          return RESTSvc.post(url + "?action=" + action, obj);
        },
        collectCV : function (url) {
          return RESTSvc.get(url);
        },
        getCitiesList : function (url) {
          return RESTSvc.get(url);
        },
        getReferralLinks : function (
          url,
          page,
          noOfRecords
        ) {
          url = url + "?page=" + page + "&noOfRecords=" + noOfRecords;
          return RESTSvc.get(url);
        },
        getReferralLinksOfUser : function (
          url,
          userId
        ) {
          url = url + "?userId=" + userId;
          return RESTSvc.get(url);
        },
        generateReferralLink : function (
          url,
          contextName,
          referralType,
          referralTargetSubject,
          referralTargetEmail,
          jobType,
          jobLocation,
          refPublic,
          bountyEnable,
          previewType,
          previewLink,
          previewFile
        ) {
          var request = new FormData();
          request.append("referralDetails", contextName);
          request.append("referralType", referralType);
          request.append("referralTargetSubject", referralTargetSubject);
          if (!!referralTargetEmail) {
            request.append("referralTargetEmail", referralTargetEmail);
          }
          if (!!jobType) {
            request.append("jobType", jobType);
          }
          if (!!jobLocation) {
            request.append("jobLocation", jobLocation);
          }
          if (!!previewType) {
            request.append("previewType", previewType);
          }
          if (!!previewLink) {
            request.append("previewLink", previewLink);
          }
          if (!!previewFile) {
            request.append("previewFile", previewFile);
          }
          request.append("refPublic", refPublic);
          request.append("bountyEnable", bountyEnable);
          return RESTSvc.formPost(url, request);
        },
        editReferralLink : function (
          url,
          referralLink,
          description,
          referralTargetSubject,
          jobType,
          jobLocation,
          refPublic,
          bountyEnable,
          previewType,
          previewLink,
          previewFile
        ) {
          var request = new FormData();
          request.append("referralDetails", description);
          request.append("referralLink", referralLink);
          request.append("referralTargetSubject", referralTargetSubject);
          if (!!jobType) {
            request.append("jobType", jobType);
          }
          if (!!jobLocation) {
            request.append("jobLocation", jobLocation);
          }
          if (!!previewType) {
            request.append("previewType", previewType);
          }
          if (!!previewLink) {
            request.append("previewLink", previewLink);
          }
          if (!!previewFile) {
            request.append("previewFile", previewFile);
          }
          request.append("refPublic", refPublic);
          request.append("bountyEnable", bountyEnable);

          return RESTSvc.formPut(url, request);
        },
        generateReferralLinkForUser : function (
          url,
          userEmail,
          contextName,
          referralType,
          referralTargetSubject,
          referralTargetEmail,
          jobType,
          jobLocation,
          previewLink
        ) {
          var request = {
            referralDetails : contextName,
            referralLink : userEmail,
            referralType : referralType,
            referralTargetSubject : referralTargetSubject,
            referralTargetEmail : referralTargetEmail,
            jobType : jobType,
            jobLocation : jobLocation,
            previewLink : previewLink
          };

          return RESTSvc.post(url, request);
        },
        shareParentReferralLink : function (
          url,
          refCode
        ) {
          var request = {
            referralLink : refCode
          };

          return RESTSvc.post(url, request);
        },
        shareResumeToParentLink : function (
          url,
          id
        ) {
          // url = url + "?referralLink=" + parentLink;
          var request = {
            "resumeId" : id
          };

          return RESTSvc.post(url, request);
        },
        shareResumeToTargetLink : function (
          url,
          id
        ) {
          // url = url + "?referralLink=" + parentLink;
          var request = {
            "resumeId" : id
          };

          return RESTSvc.post(url, request);
        },
        shareSocialToParentLink : function (
          url,
          id
        ) {
          // url = url + "?referralLink=" + parentLink;
          var request = {
            "registrationId" : id
          };

          return RESTSvc.post(url, request);
        },
        updateResumeInterview : function (
          url,
          id,
          resumeStatus
        ) {
          // url = url + "?referralLink=" + parentLink;
          var request = {
            "id" : id,
            "resumeStatus" : resumeStatus
          };

          return RESTSvc.post(url, request);
        },
        updateResumeJob : function (
          url,
          id,
          resumeStatus
        ) {
          // url = url + "?referralLink=" + parentLink;
          var request = {
            "id" : id,
            "resumeStatus" : resumeStatus
          };

          return RESTSvc.post(url, request);
        },
        targetUpdateResumeInterview : function (
          url,
          id,
          resumeStatus,
          targetAccessToken
        ) {
          // url = url + "?referralLink=" + parentLink;
          var request = {
            "id" : id,
            "resumeStatus" : resumeStatus,
            "targetAccessToken" : targetAccessToken
          };

          return RESTSvc.post(url, request);
        },
        targetUpdateResumeJob : function (
          url,
          id,
          resumeStatus,
          targetAccessToken
        ) {
          // url = url + "?referralLink=" + parentLink;
          var request = {
            "id" : id,
            "resumeStatus" : resumeStatus,
            "targetAccessToken" : targetAccessToken
          };

          return RESTSvc.post(url, request);
        },
        deleteReferralLink : function (
          url,
          referralLink
        ) {
          url = url + "?referralLink=" + referralLink;
          return RESTSvc.delete(url);
        },
        scanMatchingResumesInFolder : function(id) {
          var url = utilities.findMatchingResumesInFolderUrl();
          url = url.replace("{jobId}", id);
          return RESTSvc.get(url);
        },
        getResumeTokenToPreview : function (
          url,
          referralLink,
          id
        ) {
          // url = url + "?referralLink=" + parentLink;
          var request = {
            "referralLink" : referralLink,
            "resumeId" : id
          };

          return RESTSvc.post(url, request);
        },
        getListMatchingSkills : function (
          matchingId
        ) {
          var url = utilities.getSkillsOfMatching();
          url = url.replace("{matchingId}", matchingId);
          return RESTSvc.get(url);
        },
        getAuthUsers : function (url) {
          return RESTSvc.get(url);
        },
        deleteUserAccount : function (
          url,
          id
        ) {
          url = url.replace("{userId}", id);
          return RESTSvc.delete(url);
        },
        getAuthUserByEmail : function (
          url,
          email
        ) {
          url = url + "?email=" + email;
          return RESTSvc.get(url);
        },
        getReferralContent : function (
          url,
          link
        ) {
          url = url.replace("{referralLink}", link);
          return RESTSvc.get(url);
        },
        getMatchingResumesOfJob : function (
          link
        ) {
          var url = utilities.getMatchingResumeListUrl();
          url = url.replace("{referralLink}", link);
          return RESTSvc.get(url);
        },
        getReferredResumeList : function (
          url,
          link
        ) {
          url = url + "?referralLink=" + link;
          return RESTSvc.get(url);
        },
        getBoxCandidates : function (
          referralLink
        ) {
          var url = utilities.getCvBoxCandidateListUrl();
          url = url + "?referralLink=" + referralLink;
          return RESTSvc.get(url);
        },
        removeCandidateFromBox : function (
          resumeId,
          referralId
        ) {
          var data = {
            resumeId : resumeId,
            referralId : referralId
          };
          var url = utilities.getRemovingCandidateUrl();
          return RESTSvc.post(url, data);
        },
        getChildRefLinkList : function (
          url,
          link
        ) {
          url = url + "?parentRefLink=" + link;
          return RESTSvc.get(url);
        },
        getReferralDetails : function (
          url,
          refCode
        ) {
          url = url + "?referralLink=" + refCode;
          return RESTSvc.get(url);
        },
        getJobSpecList : function (url) {
          return RESTSvc.get(url);
        },
        getTargetResumeDetail : function (
          url,
          token
        ) {
          url = url + "?token=" + token;
          return RESTSvc.get(url);
        },
        getSocialRegistrationList : function (
          url,
          link
        ) {
          url = url.replace("{referralLink}", link);
          return RESTSvc.get(url);
        },
        getJobSpecDetailFromAccessToken : function (
          url,
          accessToken,
          previewToken,
          extendToken,
          originalToken,
          extendOriginalToken,
          previewLinkId
        ) {
          var param = "";
          if (!!accessToken) {
            param = "accessToken=" + accessToken;
          } else if (!!previewToken) {
            param = "token=" + previewToken;
          } else if (!!extendToken) {
            param = "extendToken=" + extendToken;
          } else if (!!originalToken) {
            param = "originalToken=" + originalToken;
          } else if (!!extendOriginalToken) {
            param = "extendOriginalToken=" + extendOriginalToken;
          } else if (!!previewLinkId) {
            param = "linkId=" + previewLinkId;
          }

          url = url + "?" + param;
          return RESTSvc.get(url);
        },
        extendResumePreviewFromToken : function (
          url,
          token,
          originalToken
        ) {
          return RESTSvc.post(url, {
            token : !!token ? token : null,
            originalToken : !!originalToken ? originalToken : null
          });
        },
        extendResumePreviewForAdmin : function (
          url,
          resumeId,
          original,
          extendDays
        ) {
          return RESTSvc.post(url, {
            resumeId : resumeId,
            original : original,
            extendDays : extendDays
          });
        },
        getResumeReviews : function (url) {
          return RESTSvc.get(url);
        },
        getReviewDetail : function (url) {
          return RESTSvc.get(url);
        },
        getReviewComments : function (url) {
          return RESTSvc.get(url);
        },
        leaveResumeReview : function (
          url,
          resumeAccessToken,
          previewToken,
          originalToken,
          email,
          review
        ) {
          return RESTSvc.post(url, {
            resumeAccessToken : !!resumeAccessToken ? resumeAccessToken : null,
            previewToken : !!previewToken ? previewToken : null,
            originalToken : !!originalToken ? originalToken : null,
            email : email,
            fistName : "",
            lastName : "",
            review : review
          });
        },
        leaveReviewComment : function (
          url,
          reviewId,
          content,
          reviewToken
        ) {
          var data = {
            reviewId : reviewId,
            content : content
          };

          if (!!reviewToken) {
            data["reviewToken"] = reviewToken;
          }
          return RESTSvc.post(url, data);
        },
        maskTextsInResume : function (
          url,
          resumeId,
          texts
        ) {
          var data = {
            resumeId : resumeId,
            texts : texts
          };

          return RESTSvc.post(url, data);
        },
        listingResumes : function (url) {
          return RESTSvc.get(url);
        },
        toggleResumeListing : function (url) {
          return RESTSvc.put(url);
        },
        findCvBox : function (name) {
          var url = utilities.findCvBoxListUrl() + "?name=" + name;
          return RESTSvc.get(url);
        },
        addResumeToCvBox : function (
          referralId,
          resumeId
        ) {
          var data = {
            referralId : referralId,
            resumeId : resumeId
          };
          var url = utilities.getAddingCandidateUrl();
          return RESTSvc.post(url, data);
        },
        addNewSkill : function (name) {
          var url = utilities.getAddingSkillUrl();

          return RESTSvc.post(url, {
            name : name
          });
        },
        addNewCategorySkill : function (
          name,
          skillIds
        ) {
          var url = utilities.getAddingCategorySkillUrl();

          return RESTSvc.post(url, {
            name : name,
            skillIds : skillIds
          });
        },
        listSkills : function () {
          var url = utilities.getListingSkillUrl();

          return RESTSvc.get(url);
        },
        listSkillCategories : function () {
          var url = utilities.getListingSkillCategoriesUrl();

          return RESTSvc.get(url);
        },
        listSkillsOfCategory : function (categoryId) {
          var url = utilities.getListingSkillOfCategoryUrl();
          url = url.replace("{categoryId}", categoryId);

          return RESTSvc.get(url);
        },
        listCategoriesOfJob : function (referralLink) {
          var url = utilities.getListingJobCategoriesUrl();
          url = url.replace("{referralLink}", referralLink);

          return RESTSvc.get(url);
        },
        listCategoriesOfResume : function (resumeId) {
          var url = utilities.getListingResumeCategoriesUrl();
          url = url.replace("{resumeId}", resumeId);

          return RESTSvc.get(url);
        },
        updateJobSkillCategories : function (
          jobId,
          categoryIds
        ) {
          var url = utilities.getUpdatingJobCategoriesUrl();

          return RESTSvc.post(url, {
            jobId : jobId,
            categoryIds : categoryIds
          });
        },
        updateResumeSkillCategories : function (
          resumeId,
          categoryIds
        ) {
          var url = utilities.getUpdatingResumeCategoriesUrl();

          return RESTSvc.post(url, {
            resumeId : resumeId,
            categoryIds : categoryIds
          });
        },
        getSmartCategoriesOfJob : function (jobId) {
          var url = utilities.getSmartJobCategoriesUrl();
          url = url.replace("{jobId}", jobId);

          return RESTSvc.post(url);
        },
        getBulkFolderResumes: function() {
          var url = utilities.getBulkFolderListing();
          return RESTSvc.get(url);
        },
        uploadFolderResume: function(file) {
          var url = utilities.uploadFolderResumeUrl();
          var request = new FormData();
          request.append("file", file);
          return RESTSvc.formPost(url, request);
        }
      };

      return RestConfig;
    }
  ]);
