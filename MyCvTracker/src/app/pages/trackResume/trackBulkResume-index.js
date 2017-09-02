(function () {
  'use strict';

    angular.module('BlurAdmin.pages.trackBulkResume', ['ng.ckeditor', 'LocalStorageModule'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('trackBulkResumeForm');
        $stateProvider
            .state('trackBulkResume', {
                url: '/trackBulkResume',
                templateUrl: 'app/pages/trackResume/templates/trackBulkResume.html',
                title: 'Multiple Track Resume',
                sidebarMeta: {
                    icon: 'fa fa-location-arrow',
                    order: 7,
                },
            });
    }

})();
