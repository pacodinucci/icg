(function () {
    'use strict';

    angular.module('MyCvTracker.pages.notes', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {

        $stateProvider

            .state('notes', {
                url: '/notes',
                templateUrl: 'app/pages/notes/templates/notes.html',
                title: 'Notes',
                sidebarMeta: {
                    icon: 'fa fa-pencil',
                    order: 3,
                }
            });
    }

})();
