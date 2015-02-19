
	angular.module('icg.jobs')

	    .controller('JobsCtrl', ['$rootScope', '$scope',

	        function ($rootScope, $scope) {
	        	
				$scope.allJobs = [];

				$scope.getAllJobs = function () {

					$scope.allJobs = [];

					$scope.allJobs = [{"ID":"1","REC_ID":"1","JOB_TITLE":"(IT) Java Developer","JOB_PUB_DATE":"Fri, 16 May 2014 14:26:18 GMT","JOB_RATE":"\u00a346k per annum","JOB_TYPE":"Permanent","JOB_LOC":"City of London","JOB_COUNTRY":"UK","JOB_CATEGORY":"JS-1966220-3-BB"},{"ID":"2","REC_ID":"2","JOB_TITLE":"(IT) QA Automation Engineer (Day Rate Contract)","JOB_PUB_DATE":"Fri, 16 May 2014 14:05:12 GMT","JOB_RATE":"\u00a3300 - 400 per day + (Contract)","JOB_TYPE":"Contract","JOB_LOC":"Norwich Norfolk","JOB_COUNTRY":"England","JOB_CATEGORY":"JSI4R005731"},{"ID":"3","REC_ID":"3","JOB_TITLE":"(IT) Test Analyst","JOB_PUB_DATE":"Fri, 16 May 2014 13:58:47 GMT","JOB_RATE":"\u00a328k - \u00a340k","JOB_TYPE":"Permanent","JOB_LOC":"Guildford, Surrey","JOB_COUNTRY":"UK","JOB_CATEGORY":"ASAP"},{"ID":"4","REC_ID":"3","JOB_TITLE":"(IT) Senior Test Analyst","JOB_PUB_DATE":"Fri, 16 May 2014 13:56:29 GMT","JOB_RATE":"\u00a340k - \u00a350k","JOB_TYPE":"Permanent","JOB_LOC":"London","JOB_COUNTRY":"UK","JOB_CATEGORY":"ASAP"},{"ID":"5","REC_ID":"4","JOB_TITLE":"(IT) Android Developer","JOB_PUB_DATE":"Fri, 16 May 2014 13:37:12 GMT","JOB_RATE":"Permanent","JOB_TYPE":"London","JOB_LOC":"UK","JOB_COUNTRY":"ASOS","JOB_CATEGORY":""},{"ID":"6","REC_ID":"4","JOB_TITLE":"(IT) Senior QA","JOB_PUB_DATE":"Fri, 16 May 2014 13:27:01 GMT","JOB_RATE":"Permanent","JOB_TYPE":"London","JOB_LOC":"UK","JOB_COUNTRY":"ASOS","JOB_CATEGORY":""},{"ID":"7","REC_ID":"4","JOB_TITLE":"(IT) Senior QA - Mobile","JOB_PUB_DATE":"Fri, 16 May 2014 13:26:23 GMT","JOB_RATE":"Permanent","JOB_TYPE":"London","JOB_LOC":"UK","JOB_COUNTRY":"ASOS","JOB_CATEGORY":""},{"ID":"8","REC_ID":"5","JOB_TITLE":"(IT) Java Developer (Application Developer)","JOB_PUB_DATE":"Fri, 16 May 2014 13:17:23 GMT","JOB_RATE":"\u00a345k - \u00a355k per annum","JOB_TYPE":"Permanent","JOB_LOC":"City of London","JOB_COUNTRY":"UK","JOB_CATEGORY":""},{"ID":"9","REC_ID":"6","JOB_TITLE":"(IT) Software Developer in Test\/Mobile Automation Test","JOB_PUB_DATE":"Fri, 16 May 2014 13:07:21 GMT","JOB_RATE":"\u00a3300 - \u00a3375 per Day","JOB_TYPE":"Contract","JOB_LOC":"City of London","JOB_COUNTRY":"UK","JOB_CATEGORY":""},{"ID":"10","REC_ID":"7","JOB_TITLE":"(Finance) QTP Test Manager - Investment Banking","JOB_PUB_DATE":"Fri, 16 May 2014 13:01:20 GMT","JOB_RATE":"\u00a3500 - \u00a3600 per annum","JOB_TYPE":"Contract","JOB_LOC":"City of London","JOB_COUNTRY":"UK","JOB_CATEGORY":"JS-28030"}];

				};











				$scope.init = function () {
					$scope.getAllJobs();
				};

				$scope.init();
	        }
	    ]);
