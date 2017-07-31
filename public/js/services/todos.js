angular.module('whoisService', [])

	// super simple service
	// each function returns a promise object 
	.factory('whois', ['$http',function($http) {
		return {
			get : function(domain) {
				return $http.get('/api/domain?domain='+domain);
			}
		}
	}]);