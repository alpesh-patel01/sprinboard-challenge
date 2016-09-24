var myApp=angular.module('challengeApp');
myApp.controller('profileController',['$scope', '$stateParams', '$state', 'VoteService', function($scope, $stateParams, $state, VoteService) {
  if ($stateParams.path === null) {
    $state.go('home');
  }
  else {
    $scope.path = $stateParams.path
    $scope.tags = $scope.path.tags.split(",");
    console.log('path', $scope.path);
  }
  $scope.upVote = function(id) {
		VoteService.upVote(id);
	}
	$scope.downVote = function(id) {
		VoteService.downVote(id);
	}
}]);
