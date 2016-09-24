var myApp=angular.module('challengeApp');
myApp.controller('homeController',['$scope', '$http', '$localStorage','VoteService', '$state' ,function($scope, $http, $localStorage, VoteService, $state) {

	$scope.$localStorage = $localStorage;
	if ($scope.$localStorage.paths.length === 0) {
		$http.get('https://hackerearth.0x10.info/api/learning-paths?type=json&query=list_paths').then(function(response) {
			$scope.paths = response.data.paths;
			$scope.tags = getTags($scope.paths);
			angular.forEach($scope.paths, function(path) {
				path.upVotes = 0;
				path.downVotes = 0;
				path.hours = parseInt(path.hours.substring(0, path.hours.length - 1));
			})
			console.log('paths from api', $scope.paths);
			$scope.$localStorage.paths = $scope.paths;
		}, function(error) {
			console.log(error);
		});
	} else {
		$scope.paths = $scope.$localStorage.paths;
		$scope.tags = getTags($scope.paths);
		console.log('paths from localStorage', $scope.paths);
	}

	function getTags(paths) {
		var tags = [];
		angular.forEach(paths, function(path) {
			var temp = path.tags.split(",");
			for (var i = 0; i < temp.length; i++) {
				if (temp[i].trim() !== '') {
					temp[i] = {name : temp[i].trim()};
				}
			 }
			 temp = temp.filter(Boolean);
			console.log('temp', temp);
			tags = tags.concat(temp);
		})
		console.log('tags', tags);
		return tags;
	}
	$scope.upVote = function(id) {
		VoteService.upVote(id);
	}
	$scope.downVote = function(id) {
		VoteService.downVote(id);
	}
	$scope.goToProfile = function(path) {
		console.log(path);
		$state.go('view-profile', {path : path});
	}
	$scope.callback = function() {
		console.log('callback');
	}
	$scope.propertyName = 'learner';
  $scope.reverse = true;
	$scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };
}]);
