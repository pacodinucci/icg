angular.module("MyCvTracker.pages.userManagement")
  .controller("UserManagementCtrl", [
    "toastr",
    "$rootScope",
    "$scope",
    "$injector",
    "$http",
    function (
      toastr,
      $rootScope,
      $scope,
      $injector,
      $http
    ) {
      var userManagementService = $injector.get("UserManagementService");
      var deletingId = 0, deletingIdx = 0;

      $scope.userManagement = {
        users : [],
        emailSearch : "",
        inDeleting : false
      };
      $scope.modal = null;

      $scope.loadUsers = function () {
        var emailSearch = $scope.userManagement.emailSearch;
        emailSearch = emailSearch.trim();
        $scope.userManagement.users = [];
        if (!!emailSearch) {
          userManagementService.searchUser(emailSearch)
            .then(function (user) {
              $scope.userManagement.users.push(user);
            });
        } else {
          userManagementService.getUsers()
            .then(function (userList) {
              $scope.userManagement.users = userList;
            });
        }
      };

      $scope.getReferralDirect = function (
        id,
        email
      ) {
        var emailParts = email.split("@");
        var href = "/referral?userId=" + id + "&emailDm=" + emailParts[1] + "&emailName=" + emailParts[0];
        return href;
      };

      $scope.deleteUser = function() {
        $scope.userManagement.inDeleting = true;

        userManagementService.deleteUser(deletingId)
          .then(function () {
            $scope.userManagement.users.splice(deletingIdx, 1);
            $scope.closeModal();
            $scope.userManagement.inDeleting = false;
          });
      }

      $scope.openDeleteModal = function(id, idx) {
        var modalOpts = {
          templateUrl: 'app/pages/user-management/templates/delete-user-confirm.html',
          controller: "UserManagementModalCtrl",
          scope: $scope,
          backdrop: 'static'
        };

        $scope.modal = $injector.get('$uibModal').open(modalOpts);
        deletingId = id;
        deletingIdx = idx;
      }

      $scope.closeModal = function() {
        $scope.modal.dismiss();
        deletingId = 0;
        deletingIdx = 0;
      }

      $scope.init = function () {
        $scope.loadUsers();
      };

      $scope.init();
    }
  ]);

angular.module("MyCvTracker.pages.userManagement")
  .controller("UserManagementModalCtrl", [
    "$scope",
    "$injector",
    function (
      $scope,
      $injector
    ) {
      var utilities = $injector.get("Utilities");

    }
  ]);