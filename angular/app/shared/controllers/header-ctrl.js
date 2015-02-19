

    angular.module('icg.shared')

        .controller('HeaderCtrl', ['$rootScope', '$scope', '$injector',

            function ($rootScope, $scope, $injector) {

            	var $state = $injector.get('$state');
                var AuthSvc = $injector.get('AuthSvc');

                $scope.menuItems = [];

            	$scope.menuItemsForGuestsUser = [{

            		text: 'Home',
            		state: 'base.home',
            		active: false
            	}, {

                    text: 'Login / Register',
                    state: 'base.auth',
                    active: false
                }];


                $scope.menuItemsForLoggedInUser = [{

                    text: 'Home',
                    state: 'base.home',
                    active: false
                }, {

                    text: 'Profile',
                    state: 'base.account',
                    active: false
                }, {

                    text: 'Jobs',
                    state: 'base.jobs',
                    active: false
                }, {

                    text: 'My Resumes',
                    state: 'base.resumes',
                    active: false
                }, {

                    text: 'Track Resume',
                    state: 'base.trackResume',
                    active: false
                }, {

                    text: 'Logout',
                    state: 'base.logout',
                    active: false
                }];





            	$scope.menuStateMaps = {};

                $scope.checkStateInMenu = function (stateName) {

                    var flag = false;

                    $scope.menuItems.forEach(function(menuItem) {
                        
                        if (menuItem.state === stateName) {
                            flag = true;
                        }
                    });

                    return flag;
                };

                $scope.getCurrentState = function () {
                    return $state.current.name;
                };
            	

            	$scope.makeAllMenusInactive = function () {

            		$scope.menuItems.forEach(function(menuItem) {
	            		menuItem.active = false;
	            	});
            	};

                $scope.init = function () {

                    if ( AuthSvc.isAuthenticated() ) {
                        $scope.menuItems = $scope.menuItemsForLoggedInUser;
                    } else {
                        $scope.menuItems = $scope.menuItemsForGuestsUser;
                    }

                    $scope.menuItems.forEach(function(menuItem) {
                        $scope.menuStateMaps[menuItem.state] = menuItem;
                    });

                    $scope.makeAllMenusInactive();

                    if ( $scope.checkStateInMenu($scope.getCurrentState()) ) {
                        $scope.menuStateMaps[$scope.getCurrentState()].active = true;
                    }
                };

                $scope.init();


                $rootScope.$on('token:changed', function(event, data) {
                    $scope.init();
                });

                $scope.navbarCollapsed = true;

            	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

                    $scope.navbarCollapsed = true;

            		$scope.makeAllMenusInactive();

                    if ( $scope.checkStateInMenu(toState.name) ) {
                        $scope.menuStateMaps[toState.name].active = true;
                    }            		
                });

            }
        ]);
