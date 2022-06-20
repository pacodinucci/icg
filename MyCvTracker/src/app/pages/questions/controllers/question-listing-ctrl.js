angular.module("MyCvTracker.pages.questions")
  .controller("QuestionListingCtrl", [
    "Constants",
    "toastr",
    "$rootScope",
    "$scope",
    "$injector",
    "$http",
    "Authorization",
    "$location",
    "$sce",
    function (
      Constants,
      toastr,
      $rootScope,
      $scope,
      $injector,
      $http,
      Authorization,
      $location,
      $sce
    ) {
      var EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      var Utilities = $injector.get("Utilities");
      var mainSvc = $injector.get("QuestionDataSvc");


      var userDetail = Authorization.getUserDetails();
      var rqUserId = 0;
      var isAdminUser = false, isReviewer = false;
      if (!!userDetail) {
        rqUserId = userDetail.id;
        userEmail = userDetail.email;
        var role = userDetail.userRole;
        isAdminUser = role === "ADMIN";
        isReviewer = role === "REVIEWER";
      }

      $scope.questionDetail = {};
      $scope.questions = [];

      $scope.loadQuestions = function () {
       var type = $scope.interviewType;
        mainSvc.getQuestions(type)
          .then(function (data) {
            $scope.questions = data;
          });
      };

      $scope.editQuestions = function (question) {
          mainSvc.editQuestions(question)
            .then(function (data) {
              $scope.questions = data;
              toastr.success("Your question has been edited ");
            });
      };

    $scope.deleteQuestions = function (question) {
        mainSvc.deleteQuestions(question)
          .then(function (data) {
            $scope.questions = data;
            toastr.success("Your question has been deleted ");
          });
    };

     $scope.addQuestion = function (question) {
          mainSvc.addQuestions(question)
            .then(function (data) {
              $scope.questions = data;
              toastr.success("Your question has been submitted ");
            });
      };

      $scope.getResults = function(candidateDetails){

       mainSvc.getResults(candidateDetails)
       .then(function (data) {
        toastr.success("Your request has been submitted ");
        })
       .catch(function () {

        });
      };

      $scope.assignInterview = function(interviewRequest){
       mainSvc.assignInterview(interviewRequest)
      .then(function (data) {
        toastr.success("Your request has been submitted ");
      })
      .catch(function () {

      });
      };

      $scope.trustSrc = function (src, cdt) {
        return $sce.trustAsResourceUrl((src + "%26cdt=" + cdt));
      };

      $scope.formatDateTime = function (utcStr) {
        return !!utcStr ? Utilities.getFormattedDate(utcStr) : "";
      };

      $scope.init = function () {
        $scope.loadQuestions();

        $scope.candidateResultsEmail = "";
        $scope.token = "";

        $scope.candidateDetails = {
            candidate: "",
            token: ""
        }

        $scope.interviewRequest = {
             candidateName: "",
             candidateEmail: "",
             resultOwners: "",
             invite:"",
             interviewType:""
             };
        }

      $scope.$on("$destroy", function () {
        $rootScope.headerLoginRedirect = "";
      });

      $scope.init();
    }
  ]);
