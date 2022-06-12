(function () {
  "use strict";

  angular.module("MyCvTracker.pages.questions", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("interviewQuestions", {
        url : "/question-data",
        templateUrl : "app/pages/questions/templates/index.html",
        title : "Question Data",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }

  /** @ngInject */
 function routeConfig($stateProvider) {
      $stateProvider
        .state("interviewQuestionsAdd", {
          url : "/question-add",
          templateUrl : "app/pages/questions/templates/addQuestion.html",
          title : "Add Question Data",
          sidebarMeta : {
            icon : "fa fa-book",
            order : 6,
          },
        });
    }

/** @ngInject */
 function routeConfig($stateProvider) {
      $stateProvider
        .state("interviewQuestionsAdd", {
          url : "/assign-interview",
          templateUrl : "app/pages/questions/templates/assignInterview.html",
          title : "Assign Interview Data",
          sidebarMeta : {
            icon : "fa fa-book",
            order : 6,
          },
        });
    }
})();


