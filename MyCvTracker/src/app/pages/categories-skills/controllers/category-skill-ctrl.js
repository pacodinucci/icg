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
        name : "",
        skills : [],
        suggestionItems : [],
        skillNameSearch : "",
        suggestFocused : false,
        creating : false
      };
      $scope.addingSkillForm = {
        name : "",
        adding : false
      };
      $scope.categorySkillModal = {
        skills : []
      };

      $scope.skillCategories = [];

      $scope.mainModal = null;
      $scope.confirmModal = null;

      $scope.openNewCategoryModal = function () {
        $scope.mainModal = mainSvc.getCreatingCategoryModal($scope, "SkillCategoryModalCtrl");
      };

      $scope.openNewSkillModal = function () {
        $scope.confirmModal = mainSvc.getCreatingSkillModal($scope, "SkillCategoryModalCtrl");
      };

      $scope.closeModal = function () {
        $scope.mainModal.dismiss();

        $scope.newCategoryForm.suggestionItems = [];
        $scope.newCategoryForm.name = "";
        $scope.newCategoryForm.skills = [];
        $scope.newCategoryForm.creating = false;
        $scope.newCategoryForm.skillNameSearch = "";
        $scope.newCategoryForm.suggestFocused = false;

        $scope.categorySkillModal.skills = [];
      };

      $scope.closeConfirmModal = function() {
        $scope.confirmModal.dismiss();

        $scope.addingSkillForm.name = "";
        $scope.addingSkillForm.adding = false;
      }

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
        var nameSearch =  $scope.newCategoryForm.skillNameSearch.toLowerCase();

        var foundItems = [];
        if (!nameSearch) {
          foundItems = defaultSkills.slice(0, 10);
        } else {
          var noFound = 0;
          for (var i = 0, len = defaultSkills.length; i < len; i++) {
            var skill = defaultSkills[i];
            var idx = skill.compareName.indexOf(nameSearch);

            if (idx >= 0) {
              noFound++;
              foundItems.push(skill);
            }

            if (noFound > 20) {
              break;
            }
          }
        }

        if (foundItems.length === 0) {
          foundItems.push({
            id : -1,
            name : "No matching. Click add to create new skill."
          })
        }

        $scope.newCategoryForm.suggestionItems = foundItems;
      }

      $scope.applySkillToCategory = function() {
        // $scope.subModal = mainSvc.getCreatingCategoryModal($scope, "SkillCategoryModalCtrl");
        var nameSearch =  $scope.newCategoryForm.skillNameSearch;
        var compareName = nameSearch.toLowerCase();
        for (var i = 0, len = defaultSkills.length; i < len; i++) {
          var skill = defaultSkills[i];
          if (skill.compareName === compareName) {
            $scope.newCategoryForm.skills.push(skill);
            $scope.newCategoryForm.skillNameSearch = "";

            return;
          }
        }

        // if not exists then open create new modal
        $scope.addingSkillForm.name = nameSearch;
        $scope.openNewSkillModal();
      }

      $scope.removeSkillFromCategory = function(idx) {
        $scope.newCategoryForm.skills.splice(idx, 1);
      }

      $scope.selectSuggestion = function(item) {
        $scope.newCategoryForm.skillNameSearch = item.name;
      }

      $scope.registerNewSkill = function() {
        if ($scope.addingSkillForm.adding) return;
        $scope.addingSkillForm.adding = true;

        var name = $scope.addingSkillForm.name.trim();
        if (!name) {
          return;
        }

        mainSvc.newSkill(name).then(function(data) {
          // adding skill to list
          var id = data.id;
          defaultSkills.push({
            id : id,
            name : name,
            compareName : name.toLowerCase()
          });
          defaultSkills.sort(sortSkillByName);

          $scope.applySkillToCategory();

          $scope.closeConfirmModal();
        });
      }

      $scope.registerCategory = function() {
        if ($scope.newCategoryForm.creating) return;
        $scope.newCategoryForm.creating = true;

        var name = $scope.newCategoryForm.name.trim();
        var skills = $scope.newCategoryForm.skills;
        if (!name || skills.length <= 0) {
          return;
        }

        var skillIds = [];
        for (var i = 0, len = skills.length; i < len; i++) {
          skillIds.push(skills[i].id);
        }
        mainSvc.newCategory(name, skillIds).then(function(data) {
          $scope.skillCategories.push(data);
          $scope.skillCategories.sort(sortSkillByName);

          toastr.success("New category has been created successfully.", "Success");
          $scope.closeModal();
        }).catch(function() {
          toastr.error("Creating category has failed!.", "Failed");
          $scope.closeModal();
        });
      }

      $scope.openModalShowingCategorySkills = function(categoryId) {
        mainSvc.getListSkillOfCategory(categoryId).then(function(data) {
          $scope.categorySkillModal.skills = data;
        });

        $scope.mainModal = mainSvc.getCategoryListSkillModal($scope, "SkillCategoryModalCtrl");
      }

      function sortSkillByName(
        a,
        b
      ) {
        return a.name.localeCompare(b.name);
      }

      $scope.init = function () {
        mainSvc.getListSkillCategories().then(function (data) {
          data.sort(sortSkillByName);
          $scope.skillCategories = data;
        });

        mainSvc.getListSkills()
          .then(function (data) {
            for (var i = 0, len = data.length; i < len; i++) {
              var skill = data[i];
              skill.compareName = skill.name.toLowerCase();
            }

            data.sort(sortSkillByName);
            defaultSkills = data;
          });

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
