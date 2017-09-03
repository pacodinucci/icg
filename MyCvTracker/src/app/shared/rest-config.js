
	angular.module('BlurAdmin.shared')

		.factory('RestConfig', ['RESTSvc', '$injector',

			function(RESTSvc, $injector) {

				var RestConfig = {

					doLogin: function (url, loginData) {
						return RESTSvc.post(url,loginData);
					},

					doRegister: function (url, registationData) {
						return RESTSvc.post(url, registationData);
					},

                    doActivate: function (url, key) {
						return RESTSvc.get(url + '?key=' + key);
					},

					doLogout: function (url, userData) {
						return RESTSvc.post(url);
					},

					forgotPassword: function (url, email) {
						return RESTSvc.post(url, email);
					},

                    reactivate: function (url, email) {
						return RESTSvc.post(url, email);
					},

					getMyResumes: function (url) {
						return RESTSvc.get(url);
					},

					findMyResumes: function (url) {
						return RESTSvc.get(url);
					},

					saveMyResume: function (url, resumeOb) {
						return RESTSvc.post(url, resumeOb);
					},

					deleteMyResume: function (url, id) {
						return RESTSvc.delete(url, id);
					},

					saveResumeTrackRequest: function (url, requestOb) {
						return RESTSvc.post(url, requestOb);
					},
                    getMyFavNotes :function (url) {
						return RESTSvc.get(url);
                    },
					saveCvMarketingRequest: function (url, requestOb) {
						return RESTSvc.post(url, requestOb);
					},

                    cloneCvMarketingRequest: function (url, requestOb) {
                        return RESTSvc.post(url, requestOb);
                    },

                    editCvMarketingRequest: function (url, requestOb) {
                        return RESTSvc.put(url, requestOb);
                    },

                    deleteCvMarketingRequest: function (url) {
                        return RESTSvc.delete(url);
                    },

					downloadMyResume: function (url) {
						return RESTSvc.download(url);
					},
					getMyNotifications: function (url) {
						return RESTSvc.get(url);
					},
					viewFullNotifications: function (url) {
						return RESTSvc.get(url);
					},
					executePayment: function (url,paymentObj) {
						return RESTSvc.post(url,paymentObj);
					},
					getPaymentPlans: function (url,data) {
						return RESTSvc.get(url,data);
					},
					getUserTick: function (url) {
						return RESTSvc.get(url);
					},
					getValidateUserTickNumber: function (url) {
						return RESTSvc.get(url);
					},
					resetNewPassword : function(url,data){
						return RESTSvc.post(url,data);
					},
					getMyNotes : function(url){
						return RESTSvc.get(url);
					},
					viewMyNotes : function(url){
						return RESTSvc.get(url);
					},
					saveNotesRequest : function(url,data){
						return RESTSvc.put(url,data);
					},
					saveProfileSettings: function (url, Ob) {
						return RESTSvc.post(url, Ob);
					},
					getUserProfileSettings : function(url){
						return RESTSvc.get(url);
					},
					unSubscribeMail: function (url, Ob) {
						return RESTSvc.post(url, Ob);
					},
					getMyCampaigns: function (url) {
						return RESTSvc.get(url);
					},
					sendTrackedApplication : function(url,data){
						return RESTSvc.put(url,data);
					},
					getJobs : function(url,obj){
						return RESTSvc.put(url,obj);
					},
                    getJobCriteriaList : function(url){
                        return RESTSvc.get(url);
                    },
					viewJob : function(url,key){
						return RESTSvc.get(url+ '?key=' + key);
					},
					saveJob: function (url, obj) {
						return RESTSvc.post(url, obj);
					},
					applyJob: function (url, obj) {
						return RESTSvc.post(url, obj);
					},
					activateJob: function (url, action, obj) {
						return RESTSvc.post(url + '?action='+action,obj);
					},
					collectCV: function (url) {
						return RESTSvc.get(url);
					},
					getCitiesList: function (url) {
						return RESTSvc.get(url);
					}
				};

				return RestConfig;
			}
		]);
