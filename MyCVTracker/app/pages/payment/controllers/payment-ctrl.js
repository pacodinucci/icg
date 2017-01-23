angular.module('BlurAdmin.pages.payment')

    .controller('PaymentCtrl', ['toastr', '$scope', '$injector','$window',

        function (toastr, $scope, $injector,$window) {

            var Utilities = $injector.get('Utilities');
            var PaymentSvc = $injector.get('PaymentSvc');

            $scope.executePayment = function(ticksNo,planId,description,currency,price,tax) {
                var dataObj = {
                    description : description,
                    currency : currency,
                    price : price,
                    tax : tax,
                    ticksNo :ticksNo,
                    planId: planId
                };
                PaymentSvc.executePayment(dataObj).then(

                    function (response) {
                        $window.location.href =  response.returnURL;
                    }
                );
            };

            $scope.paymentSuccess = function () {
                toastr.error(Utilities.getAlerts('PaymentSuccessfullyExecuted'));
                Utilities.gotoProfilePage();
            };

            ////////////////////////////////////////////////////////////////////////////
            $scope.init = function () {
                $scope.getPaymentPlans();
            };

            $scope.getPaymentPlans = function () {

                $scope.payments = [];

                PaymentSvc.getPaymentPlans('GBP').then(

                    function (data) {

                        data.forEach(function (obj) {
                            $scope.payments.push(obj);
                        });
                    }
                );
            };
        }
    ]);
