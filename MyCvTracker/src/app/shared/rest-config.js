angular.module("MyCvTracker.shared")

  .factory("RestConfig", [
    "RESTSvc",
    "$injector",

    function (
      RESTSvc,
      $injector
    ) {

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
        getReferralLinks : function (url) {
          return RESTSvc.get(url);
        },
        getReferralLinksOfUser : function (url, userId) {
          url = url + "?userId="+ userId;
          return RESTSvc.get(url);
        },
        generateReferralLink : function (
          url,
          contextName,
          referralType,
          referralTargetSubject,
          referralTargetEmail,
          jobType,
          jobLocation
        ) {
          var request = {
            referralDetails : contextName,
            referralLink : "",
            referralType : referralType,
            referralTargetSubject : referralTargetSubject,
            referralTargetEmail : referralTargetEmail,
            jobType : jobType,
            jobLocation : jobLocation
          }

          return RESTSvc.post(url, request);
        },
        generateReferralLinkForUser : function (
          url,
          userEmail,
          contextName,
          referralType,
          referralTargetSubject,
          referralTargetEmail,
          jobType,
          jobLocation
        ) {
          var request = {
            referralDetails : contextName,
            referralLink : userEmail,
            referralType : referralType,
            referralTargetSubject : referralTargetSubject,
            referralTargetEmail : referralTargetEmail,
            jobType : jobType,
            jobLocation : jobLocation
          }

          return RESTSvc.post(url, request);
        },
        shareParentReferralLink : function (
          url,
          refCode
        ) {
          var request = {
            referralLink : refCode
          }

          return RESTSvc.post(url, request);
        },
        shareResumeToParentLink : function (
          url,
          id
        ) {
          // url = url + "?referralLink=" + parentLink;
          var request = {
            "resumeId": id
          }

          return RESTSvc.post(url, request);
        },
        shareResumeToTargetLink : function (
          url,
          id
        ) {
          // url = url + "?referralLink=" + parentLink;
          var request = {
            "resumeId": id
          }

          return RESTSvc.post(url, request);
        },
        updateResumeInterview : function (
          url,
          id,
          resumeStatus
        ) {
          // url = url + "?referralLink=" + parentLink;
          var request = {
            "id": id,
            "resumeStatus" : resumeStatus
          }

          return RESTSvc.post(url, request);
        },
        updateResumeJob : function (
          url,
          id,
          resumeStatus
        ) {
          // url = url + "?referralLink=" + parentLink;
          var request = {
            "id": id,
            "resumeStatus" : resumeStatus
          }

          return RESTSvc.post(url, request);
        },
        deleteReferralLink : function (
          url,
          referralLink
        ) {
          url = url + "?referralLink=" + referralLink;
          return RESTSvc.delete(url);
        },
        getResumeTokenToPreview : function (
          url,
          referralLink,
          id
        ) {
          // url = url + "?referralLink=" + parentLink;
          var request = {
            "referralLink" : referralLink,
            "resumeId": id
          }

          return RESTSvc.post(url, request);
        },
        getAuthUsers : function(url) {
          return RESTSvc.get(url);
        },
        getAuthUserByEmail : function(url, email) {
          url = url + "?email=" + email;
          return RESTSvc.get(url);
        },
        getReferredResumeList : function (url, link) {
          url = url + "?referralLink="+ link;
          return RESTSvc.get(url);
        },
        getChildRefLinkList : function (url, link) {
          url = url + "?parentRefLink="+ link;
          return RESTSvc.get(url);
        },
        getReferralDetails : function (url, refCode) {
          url = url + "?referralLink="+ refCode;
          return RESTSvc.get(url);
        },
        getJobSpecList : function (url) {
          return RESTSvc.get(url);
        },
        getTargetResumeDetail : function (url, token) {
          url = url + "?token="+ token;
          return RESTSvc.get(url);
        },
      };

      return RestConfig;
    }
  ]);
