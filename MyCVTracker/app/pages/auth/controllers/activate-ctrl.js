
    angular.module('BlurAdmin.pages.auth')

        .controller('ActivateCtrl', ['$location', '$rootScope', 'AuthSvc', 'Utilities',

            function ($location, $rootScope, AuthSvc, Utilities) {
                var key = $location.search().key;
                if (!AuthSvc.isAuthenticated()) {
                    if (key) {
                        AuthSvc.doActivate(key).then(function() {
                            $rootScope.addAlert(Utilities.getAlerts('activateSuccess'));
                            Utilities.gotoHomePage();
                        }, function (response) {
                            $rootScope.addAlert(Utilities.getAlerts(response.status));
                            Utilities.gotoHomePage();
                        });
                    }
                } else {
                    Utilities.gotoHomePage();
                }
            }
        ]);
