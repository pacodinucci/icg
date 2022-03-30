angular.module("MyCvTracker.pages.notifications")

  .controller("NotificationsCtrl", [
    "toastr",
    "$scope",
    "$injector",
    "$http",
    "$filter",

    function (
      toastr,
      $scope,
      $injector,
      $http,
      $filter
    ) {
      // Variables initialization
      var Utilities = $injector.get("Utilities");
      var NotificationsSvc = $injector.get("NotificationsSvc");

      //Used scopes
      $scope.user = {
        myNotifications : [],
        viewNotifications : []
      };
      $scope.modalNotifications = [];
      $scope.modalNotiCount = 0;
      $scope.isFullLoaded = false;

      //Listing Notifications Function
      $scope.getMyNotifications = function () {

        $scope.user.myNotifications = [];

        NotificationsSvc.getMyNotifications()
          .then(
            function (notificationsData) {
              notificationsData.forEach(function (notifications) {
                notifications.lastTrackedTime = $filter("date")(
                  new Date(notifications.lastTrackedTime),
                  "EEE,MMM dd yyyy HH:mm:ss"
                );
                $scope.user.myNotifications.push(notifications);
              });
            }
          );
      };


      //deleting Notifications Function
      $scope.deleteNotification = function (
        notificationId,
        index
      ) {
        var url = Utilities.getDeleteNotificationsUrl() + "?id=" + notificationId;
        $http.delete(url, {
          transformRequest : angular.identity,
          headers : { "Content-Type" : undefined }
        })
          .success(function (
            data,
            status,
            headers,
            config
          ) {
            $scope.getMyNotifications();
            toastr.success(Utilities.getAlerts("deleteNotificationSuccess"));
            $scope.modalNotifications.splice(index, 1);
          })
          .error(function (
            data,
            status,
            headers,
            config
          ) {
            $scope.closeModal();
            if (data.message == "notificationDeleteLeastError") {
              toastr.error(Utilities.getAlerts("notificationDeleteLeastError"));
            } else {
              toastr.error(Utilities.getAlerts("defaultError"));
            }
          });
      };

      //Listing Notifications Function
      $scope.viewFullNotifications = function (
        notificationId,
        isLimited,
        count,
        isFull
      ) {
        if (isFull) {
          $scope.isFullLoaded = true;
        }
        $scope.modalNotiCount = count;

        NotificationsSvc.viewFullNotifications(notificationId, isLimited)
          .then(
            function (notificationsData) {
              $scope.modalNotifications = [];
              notificationsData.forEach(function (notifications) {
                notifications.lastTrackedTime = $filter("date")(
                  new Date(notifications.lastTrackedTime),
                  "EEE,MMM dd yyyy HH:mm:ss"
                );
                $scope.modalNotifications.push(notifications);
              });

              // viewFullNotifications($scope.user.myNotifications);
              if (!isFull) {
                $scope.notificationsModal = NotificationsSvc.getViewNotificationsModal($scope, "NotificationsCtrlModal");
              }
            }
          );
      };

      //Close the resume model function
      $scope.closeModal = function () {
        $scope.notificationsModal.dismiss();
        $scope.modalNotifications = [];
        $scope.modalNotiCount = 0;
        $scope.isFullLoaded = false;
      };

      $scope.init = function () {
        $scope.getMyNotifications();
      };

      $scope.init();
    }
  ])
  .controller("NotificationsCtrlModal", [
    "toastr",
    "$scope",
    "$injector",
    "$http",
    "$filter",

    function (
      toastr,
      $scope,
      $injector,
      $http,
      $filter
    ) {
      var Utilities = $injector.get("Utilities");
      // $scope.closeModal = function (reason) {
      //
      //   $scope.notificationsModal.dismiss();
      //   Utilities.gotoNotificationsPage();
      //   //$modalInstance.close(reason);
      // };
    }
  ]);

angular.module("MyCvTracker.pages.notifications")
  .directive("fileModel", [
    "$parse",
    function ($parse) {
      return {
        restrict : "A",
        link : function (
          scope,
          element,
          attrs
        ) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          element.bind("change", function () {
            scope.$apply(function () {
              modelSetter(scope, element[0].files[0]);
            });
          });
        }
      };
    }
  ]);
