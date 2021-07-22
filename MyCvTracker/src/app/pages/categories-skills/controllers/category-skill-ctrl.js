angular.module("MyCvTracker.pages.skillCategory")
  .controller("CategoriesListingCtrl", [
    "Constants",
    "toastr",
    "$rootScope",
    "$scope",
    "$injector",
    "$http",
    "Authorization",
    "$location",
    "$timeout",
    function (
      Constants,
      toastr,
      $rootScope,
      $scope,
      $injector,
      $http,
      Authorization,
      $location,
      $timeout
    ) {
      var mainSvc = $injector.get("CategorySkillService");

      var defaultSkills = [];
      $scope.newCategoryForm = {
        skills : [],
        suggestionItems : [],
        skillNameSearch : "",
        suggestFocused : false
      };

      $scope.mainModal = null;
      $scope.subModal = null;

      $scope.openNewCategoryModal = function () {
        $scope.mainModal = mainSvc.getCreatingCategoryModal($scope, "SkillCategoryModalCtrl");
      };

      $scope.closeModal = function () {
        $scope.mainModal.dismiss();

        $scope.newCategoryForm.suggestionItems = [];
        $scope.newCategoryForm.skills = [];
        $scope.newCategoryForm.skillNameSearch = "";
        $scope.newCategoryForm.suggestFocused = false;
      };

      $scope.focusSuggestionInput = function() {
        $scope.newCategoryForm.suggestFocused = true;
        $scope.findSuggestionItems();
      }

      $scope.leaveSuggestionInput = function() {
        $timeout(function() {
          $scope.newCategoryForm.suggestFocused = false;
        }, 100);
      }

      $scope.findSuggestionItems = function() {
        var nameSearch =  $scope.newCategoryForm.skillNameSearch;

        var foundItems = [];
        if (!nameSearch) {
          foundItems = defaultSkills.slice(0, 10);
        } else {
          var noFound = 0;
          for (let i = 0, len = defaultSkills.length; i < len; i++) {
            var skill = defaultSkills[i];
            var idx = skill.name.indexOf(nameSearch);

            if (idx >= 0) {
              noFound++;
              foundItems.push(skill);
            }

            if (noFound > 100) {
              break;
            }
          }
        }

        $scope.newCategoryForm.suggestionItems = foundItems;
      }

      $scope.applySkillToCategory = function() {
        // $scope.subModal = mainSvc.getCreatingCategoryModal($scope, "SkillCategoryModalCtrl");
        var nameSearch =  $scope.newCategoryForm.skillNameSearch;
        $scope.newCategoryForm.skillNameSearch = "";
        for (let i = 0, len = defaultSkills.length; i < len; i++) {
          var skill = defaultSkills[i];
          if (skill.name === nameSearch) {
            $scope.newCategoryForm.skills.push(skill);
            break;
          }
        }
      }

      $scope.removeSkillFromCategory = function(idx) {
        $scope.newCategoryForm.skills.splice(idx, 1);
      }

      $scope.selectSuggestion = function(item) {
        $scope.newCategoryForm.skillNameSearch = item.name;
      }

      function sortSkillByName(
        a,
        b
      ) {
        return a.name.localeCompare(b.name);
      }

      $scope.init = function () {
        mainSvc.getListSkillCategories()
          .then(function (data) {
            data.sort(sortSkillByName);
            defaultSkills = data;
          });

        $scope.openNewCategoryModal();
      };

      $scope.init();
    }
  ]);

angular.module("MyCvTracker.pages.skillCategory")
  .controller("SkillCategoryModalCtrl", [
    "$scope",
    "$injector",
    function (
      $scope,
      $injector
    ) {
      var utilities = $injector.get("Utilities");

    }
  ]);
