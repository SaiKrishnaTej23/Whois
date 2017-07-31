angular.module('whoisController', [])

	.controller('mainController', ['$scope','$http','whois', function($scope, $http, whois) {
		$scope.formData = {};
		$scope.result = null;

		$scope.getDomainDetails =  function() {
			whois.get($scope.formData.text).success(function(res){
				$scope.result = res;
				console.log(res);
			}).error(function (err) {console.log(err);});
		};
	}]);