angular.module('challengeApp')
	.factory('VoteService',['$rootScope','$localStorage',function($rootScope,$localStorage) {
  		var votesFunctions={};
      console.log('VoteService');
  		if (!$localStorage.paths) {
  			$localStorage.paths = [] ;
  		}

      votesFunctions.upVote = function(id){
        var path = $localStorage.paths.find(function(path) {
            return path.id === id;
        });
        path.upVotes++;
			};
			votesFunctions.downVote = function(id){
        var path = $localStorage.paths.find(function(path) {
            return path.id === id;
        });
        path.downVotes++;
			};
		return votesFunctions;
	}]);
