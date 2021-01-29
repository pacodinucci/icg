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

      $scope.userManagement = {
        users : [],
        emailSearch : ""
      };

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

      $scope.init = function () {
        $scope.loadUsers();
      };

      $scope.init();
    }
  ]);
