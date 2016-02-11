function dateFormat(date){
  return (date < 10) ? date = "0" + date : date.toString();
}

angular.module('MLBScoresApp', [])
	//Controllers
	.controller('MainCtrl',['$scope', 'games', function($scope, games){
  	games.success(function(data){
      $scope.games = data;
    });
    $scope.status = function(game) {
      if(game.status.status === 'Final'){
        return 'Final';
      }
      return (game.status.top_inning === 'Y') ? 'Top ' : 'Bottom ' + game.status.inning;
    };
	}])
	//services
	.factory('games', ['$http', function($http){
		var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    day = dateFormat(day);
    month = dateFormat(month);
    year = dateFormat(year);

    // 'http://gd2.mlb.com/components/game/mlb/year_'+ year + '/month_' + month + '/day_'+ day + '/master_scoreboard.json'
		 return $http.get('http://gd2.mlb.com/components/game/mlb/year_2015/month_07/day_11/master_scoreboard.json')
     		.success(function(data){
       		return data;
     		})
       	.error(function(err){
       		return err;
     		})
	}]);
