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
        users : []
      };

      $scope.loadUsers = function () {
        userManagementService.getUsers()
          .then(function (userList) {
            $scope.userManagement.users = userList;
          });
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
