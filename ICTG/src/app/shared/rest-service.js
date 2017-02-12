

	angular.module('ICTG.shared')

		.factory('RESTSvc', ['$rootScope', '$q', '$http', '$injector',

			function($rootScope, $q, $http, $injector) {

				return {

					get: function( url, data ) {

						var deferred = $q.defer();

						$http.get(
							url,
							data
						).success(function(response) {
							//$rootScope.clearAlerts();
							deferred.resolve(response);
						}).error(function(response, status) {
							//$rootScope.clearAlerts();
							deferred.reject({
								response: response,
								status: status
							});
						});

						return deferred.promise;
					},


					post: function( url, data ) {

						var deferred = $q.defer();

						$http.post(
							url,
							data
						).success(function(response) {
							//$rootScope.clearAlerts();
							deferred.resolve(response);
						}).error(function(response, status) {
							//$rootScope.clearAlerts();
							deferred.reject({
								response: response,
								status: status
							});
						});

						return deferred.promise;
					},


					put: function( url, data ) {

						var deferred = $q.defer();

						$http.put(
							url,
							data
						).success(function(response) {
							//$rootScope.clearAlerts();
							deferred.resolve(response);
						}).error(function(response, status) {
							//$rootScope.clearAlerts();
							deferred.reject({
								response: response,
								status: status
							});
						});

						return deferred.promise;
					},

					delete: function( url, data ) {

						var deferred = $q.defer();

						$http.delete(
							url,
							data
						).success(function(response) {
							//$rootScope.clearAlerts();
							deferred.resolve(response);
						}).error(function(response, status) {
							//$rootScope.clearAlerts();
							deferred.reject({
								response: response,
								status: status
							});
						});

						return deferred.promise;
					},
					download: function( url) {
						location.href = url;
					}
				};
			}
		]);
