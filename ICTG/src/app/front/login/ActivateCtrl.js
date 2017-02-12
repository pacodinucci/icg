
    angular.module('ICTG.front.login')

        .controller('ActivateCtrl', ['$location', '$rootScope', 'LoginSvc', 'Utilities',

            function ($location, $rootScope, LoginSvc, Utilities) {
                var activate = function () {
                    var key = Utilities.getParameters().key;
                    if (key) {
                        LoginSvc.doActivate(key).then(function() {
                            Utilities.showSuccessMsg(Utilities.getAlerts('activateSuccess').message);
                        }, function (response) {
                            Utilities.showErrorMsg(Utilities.getAlerts(response.status).message);
                        });
                    }
                }

                activate();
            }
        ]);
