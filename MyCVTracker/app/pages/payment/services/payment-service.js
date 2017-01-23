angular.module('BlurAdmin.pages.payment')

    .factory('PaymentSvc', ['toastr', 'RestConfig', '$injector',

        function (toastr, RestConfig, $injector) {

            var Utilities = $injector.get('Utilities');

            return {
                executePayment: function (paymentObj) {

                    var url = Utilities.getExecutePaymentrUrl();
                    return RestConfig.executePayment(url,paymentObj);
                },
                getPaymentPlans: function (data) {

                    var url = Utilities.getPaymentPlansrUrl()+"?currency="+data;
                    return RestConfig.getPaymentPlans(url);
                },
                getUserTick: function () {

                    var url = Utilities.getUserTickUrl();
                    return RestConfig.getUserTick(url);
                },
                validateUserTickNumber: function () {

                    var url = Utilities.getValidateUserTickNumberUrl();
                    return RestConfig.getValidateUserTickNumber(url);
                }
            };
        }
    ]);
