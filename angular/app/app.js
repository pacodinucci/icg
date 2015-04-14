

    angular.module('icg', [

        'ui.router',
        'ui.bootstrap',
        'icg.config',
        'icg.shared',
        'icg.home',
        'icg.auth',
        'icg.account',
        'icg.resumes',
        'icg.trackResume',
        'icg.jobs'
    ])

    .factory('interceptor', ['$q', '$injector', 'Configs',

        function ($q, $injector, Configs) {

            return {

                request: function (config) {

                    document.body.style.cursor = 'wait';

                    if ( config.url.indexOf('login') < 0 && config.url.indexOf('signup') < 0 ) {
                        config.headers[ Configs.headers.authorization ] = $injector.get('TokenSvc').getToken().getAccessToken();                                    
                    }

                    return config || $q.when(config);                   
                },

                requestError: function(request) {

                    document.body.style.cursor = 'auto';
                    return $q.reject(request);
                },

                response: function (response) {

                    document.body.style.cursor = 'auto';
                    return response || $q.when(response);
                },

                responseError: function (response) {

                    document.body.style.cursor = 'auto';

                    var callback = function () {
                        var $state = $injector.get('$state');
                        $state.transitionTo($state.current, $injector.get('$stateParams'), {
                            reload: true,
                            inherit: true,
                            notify: true
                        });
                    };

                    if (response.status === 401) {

                    } 

                    else if(response.status === 403) {

                       
                    }

                    return $q.reject(response);
                }
            };
        }
    ])
    
    .config(['$httpProvider', 

        function ($httpProvider) {

            $httpProvider.interceptors.push('interceptor');
            $httpProvider.defaults.useXDomain = true;
        }
    ])

    .run(['$rootScope', '$injector',

        function ($rootScope, $injector) {

            $rootScope.appConfig = $injector.get('appConfig');


            $rootScope.slimHeader = false;

            angular.element(window).on('scroll', function (eve) {

                if ( window.scrollY >= 80 ) {
                    $rootScope.$apply(
                        function() {
                            $rootScope.slimHeader = true;
                        }
                    );
                } else {
                    $rootScope.$apply(
                        function() {
                            $rootScope.slimHeader = false;
                        }
                    );
                }
            });



            var $timeout = $injector.get('$timeout');

            $rootScope.alerts = [];
            $rootScope.formProcessing = false;

            $rootScope.clearAlerts = function () {
                $rootScope.alerts = [];
                $rootScope.formProcessing = false;
            };
            
            $rootScope.addAlert = function (alertOb) {
                $rootScope.alerts.push(alertOb);
                $rootScope.formProcessing = false;
                $timeout( $rootScope.clearAlerts, ( 3 * 1000 ) );
            };
        }
    ])


    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',

        function($stateProvider, $urlRouterProvider, $locationProvider) {

            $stateProvider

                .state('base', {
                    abstract: true,
                    views: {
                        'header@': {
                            templateUrl: 'app/shared/templates/header.html',
                            controller: 'HeaderCtrl'
                        },
                        'footer@': {
                            templateUrl: 'app/shared/templates/footer.html',
                            controller: 'FooterCtrl'
                        }
                    }
                })

                .state('base.home', {
                    url: '/home',
                    views: {
                        'main@': {
                            templateUrl: 'app/home/templates/home.html',
                            controller: 'HomeCtrl'
                        }
                    }
                })

                .state('base.jobs', {
                    url: '/jobs',
                    views: {
                        'main@': {
                            templateUrl: 'app/jobs/templates/jobs.html',
                            controller: 'JobsCtrl'
                        }
                    }
                })

                .state('base.account', {
                    url: '/account',
                    views: {
                        'main@': {
                            templateUrl: 'app/account/templates/account.html',
                            controller: 'AccountCtrl'
                        }
                    }
                })

                .state('base.resumes', {
                    url: '/resumes',
                    views: {
                        'main@': {
                            templateUrl: 'app/resumes/templates/resumes.html',
                            controller: 'ResumesCtrl'
                        }
                    }
                })

                .state('base.trackResume', {
                    url: '/trackResume',
                    views: {
                        'main@': {
                            templateUrl: 'app/trackResume/templates/trackResume.html',
                            controller: 'TrackResumeCtrl'
                        }
                    }
                })

                .state('base.auth', {
                    url: '/auth',
                    views: {
                        'main@': {
                            templateUrl: 'app/auth/templates/auth.html',
                            controller: 'AuthCtrl'
                        }
                    }
                })
            
                .state('base.activate', {
                    url: '/activate',
                    views: {
                        'main@': {
                            controller: 'ActivateCtrl'
                        }
                    }
                })

                .state('base.logout', {
                    url: '/logout',
                    views: {
                        'main@': {
                            templateUrl: 'app/auth/templates/logout.html',
                            controller: 'AuthCtrl'
                        }
                    }
                })

                ;

            $urlRouterProvider.otherwise('/home');
            $locationProvider.hashPrefix('!');
        }
    ]);


