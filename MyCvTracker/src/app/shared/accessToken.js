

    angular.module('BlurAdmin.shared')

        .factory('AccessToken', ['Constants', 'ipCookie', '$q',

            function(Constants, ipCookie, $q) {

                var defaultExpirySeconds = 3599;

                var Token = function(accessToken, userId, userRole, userEmail, firstName,lastName, sessionId) {

                    this.accessToken = accessToken;
                    this.userId = userId;
                    this.userRole = userRole;
                    this.userEmail = userEmail;
                    this.firstName = firstName;
                    this.lastName = lastName;

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

                    this.getLastName = function () {
                        return this.lastName;
                    };
                };



                var TokenSvc = {

                    getTokenHeader: function(accessToken) {
                        return 'Basic ' + accessToken;
                    },

                    hasToken: function () {

                        if ( this.getAccessToken() ) {
                            return true;
                        } else {
                            return false;
                        }
                    },

                    getAccessToken: function () {
                    	var csrfToken = ipCookie('XSRF-TOKEN');
                    	if(csrfToken !=null){
                    		csrfToken.authorization;
                    	}
                    },

                    getToken: function () {

                        var tokenCookie = ipCookie(Constants.accessCookie);

                        if ( tokenCookie ) {
                            return new Token(tokenCookie.accessToken, tokenCookie.userId, tokenCookie.userRole, tokenCookie.userEmail, tokenCookie.firstName,tokenCookie.lastName,tokenCookie.sessionId);
                        }

                        return null;
                    },

                    saveToken: function(accessToken,expiresIn, userId, userRole, userEmail, firstName,lastName) {
                        var defered = $q.defer();
                        var token = new Token( accessToken, userId, userRole,userEmail, firstName,lastName);
                        ipCookie(Constants.accessCookie, JSON.stringify(token), {expirationUnit: 'seconds', expires: expiresIn ? expiresIn : defaultExpirySeconds});
                        defered.resolve(true);
                        return defered.promise;
                    },

                    saveTokenNotExpired: function(accessToken,userId, userRole, userEmail, firstName,lastName) {
                        var defered = $q.defer();
                        var token = new Token(accessToken, userId, userRole,userEmail, firstName,lastName);
                        ipCookie(Constants.accessCookie, JSON.stringify(token));
                        defered.resolve(true);
                        return defered.promise;
                    },

                    removeToken: function () {
                        var defered = $q.defer();
                        ipCookie.remove(Constants.accessCookie);
                        defered.resolve(false);
                        return defered.promise;
                    }

                };

                return TokenSvc;
            }
        ]);
