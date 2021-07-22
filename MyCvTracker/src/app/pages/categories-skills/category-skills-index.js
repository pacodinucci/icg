(function () {
  "use strict";

  angular.module("MyCvTracker.pages.skillCategory", [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state("skillCategory", {
        url : "/skill-category-list",
        templateUrl : "app/pages/categories-skills/templates/category-list.html",
        title : "Skill Categories",
        sidebarMeta : {
          icon : "fa fa-book",
          order : 5,
        },
      });
  }
})();
