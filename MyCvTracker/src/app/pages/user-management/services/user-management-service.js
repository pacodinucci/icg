angular.module("MyCvTracker.pages.userManagement")
  .factory("UserManagementService", [
    "toastr",
    "RestConfig",
    "$injector",
    function (
      toastr,
      RestConfig,
      $injector
    ) {
      var utilities = $injector.get("Utilities");

      return {
        getUsers : function() {
          var url =  utilities.getAuthUserListUrl();
          return RestConfig.getAuthUsers(url);
        },
        searchUser : function(email) {
          var url =  utilities.getAuthUserByEmailUrl();
          return RestConfig.getAuthUserByEmail(url, email);
        },
        deleteUser : function(id) {
          var url =  utilities.getDeleteUserUrl();
          return RestConfig.deleteUserAccount(url, id);
        }
      };
    }
  ]);
