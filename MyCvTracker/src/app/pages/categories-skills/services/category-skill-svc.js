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
        }, getListSkillCategories : function() {
          return RestConfig.listSkillCategories();
        }
      };
    }
  ]);
