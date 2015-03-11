

    angular.module('icg.shared')

        .factory('TokenSvc', ['$rootScope', 'RESTSvc', 'Configs', 'Utilities', 'ipCookie', '$q', 

            function($rootScope, RESTSvc, Configs, Utilities, ipCookie, $q) {

                var defaultExpirySeconds = 3599;

                var Token = function(accessToken, userId, userRole, userEmail, firstName, sessionId) {
               
                    this.accessToken = accessToken;
                    this.userId = userId;
                    this.userRole = userRole;
                    this.userEmail = userEmail;
                    this.firstName = firstName;
                    this.sessionId = sessionId;

                    this.getAccessToken = function() {
                        return this.accessToken;
                    };

                    this.getUserId = function() {
                        return this.userId;
                    };

                    this.getUserRole = function() {
                        return this.userRole;
                    };

                    this.getUserEmail = function() {
                        return this.userEmail;
                    };

                    this.getFirstName = function () {
                        return this.firstName;
                    };

                    this.getSessionId = function () {
                        return this.sessionId;
                    };
                };        



                var TokenSvc = {

                    getTokenHeader: function(accessToken) {
                        return 'Bearer ' + accessToken;
                    },

                    hasToken: function () {

                        if ( this.getAccessToken() ) {
                            return true;
                        } else {
                            return false;
                        }
                    },

                    getAccessToken: function () {
                        return this.getToken().getAccessToken();
                    },

                    getToken: function () {

                        var tokenCookie = ipCookie(Configs.accessCookie);

                        if ( tokenCookie ) {
                            return new Token(tokenCookie.accessToken, tokenCookie.userId, tokenCookie.userRole, tokenCookie.userEmail, tokenCookie.firstName, tokenCookie.sessionId);
                        }
                        
                        return new Token(null, null, null);
                    },

                    saveToken: function(accessToken, expiresIn, user, sessionId) {
                        var defered = $q.defer();
                        var token = new Token( accessToken, user.id, user.userRole, user.email, user.firstName, sessionId);
                        ipCookie(Configs.accessCookie, JSON.stringify(token), {expirationUnit: 'seconds', expires: expiresIn ? expiresIn : defaultExpirySeconds});
                        $rootScope.$broadcast('token:changed', true);
                        defered.resolve(true);
                        return defered.promise;
                    },

                    removeToken: function () {
                        var defered = $q.defer();
                        ipCookie.remove(Configs.accessCookie);
                        $rootScope.$broadcast('token:changed', false);
                        defered.resolve(false);
                        return defered.promise;
                    }
                    
                };

                return TokenSvc;
            }
        ]);