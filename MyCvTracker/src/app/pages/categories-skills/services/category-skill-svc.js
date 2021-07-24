angular.module("MyCvTracker.pages.skillCategory")
  .factory("CategorySkillService", [
    "toastr",
    "RestConfig",
    "$injector",
    "Constants",
    function (
      toastr,
      RestConfig,
      $injector,
      Constants
    ) {
      var utilities = $injector.get("Utilities");

      return {
        getCreatingCategoryModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/categories-skills/templates/new-category-modal.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        getCreatingSkillModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/categories-skills/templates/adding-skill-confirm-modal.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        },
        getCategoryListSkillModal: function (scope, ctrlName) {
          var modalOpts = {
            templateUrl: 'app/pages/categories-skills/templates/skill-list-modal.html',
            controller: ctrlName,
            scope: scope,
            backdrop: 'static'
          };

          return $injector.get('$uibModal').open(modalOpts);
        }, getListSkills : function() {
          return RestConfig.listSkills();
        }, newSkill : function(name) {
          return RestConfig.addNewSkill(name);
        }, newCategory : function(name, skillIds) {
          return RestConfig.addNewCategorySkill(name, skillIds);
        }, getListSkillCategories : function() {
          return RestConfig.listSkillCategories();
        }, getListSkillOfCategory : function(categoryId) {
          return RestConfig.listSkillsOfCategory(categoryId);
        }
      };
    }
  ]);
