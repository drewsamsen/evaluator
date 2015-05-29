'use strict';

angular.module('valueMash')

.controller('ValueScoreCtrl', function($scope, API, Value) {

  var valueStack = [];

  var loadNextTwoValues = function() {
    $scope.left = valueStack.shift();
    $scope.right = valueStack.shift();
    console.log('stack size: ' + valueStack.length);
  };

  var getMoreValuesIfNeeded = function() {
    if (valueStack.length < 2) {
      console.log('getting more values!');
      getSomeValues();
    }
  };

  var getSomeValues = function() {
    return API.values.getPlayers()
    .then(function(resp) {
      if (resp.status === 200) {
        // TODO: prevent duplications, or check for them somehow
        valueStack = valueStack.concat(resp.data.values);
        console.info('refreshed stack. size: ' + valueStack.length);
      }
    });
  };

  getSomeValues().then(loadNextTwoValues);

  $scope.left = {};
  $scope.right = {};

  $scope.score = function(winner,loser) {
    loadNextTwoValues();
    getMoreValuesIfNeeded();

    API.values.score(winner, loser)
    .then(function(resp) {
      if (resp.status === 200) {
        Value.updateScore(resp.data.winnerId, resp.data.winnerScore);
        Value.updateScore(resp.data.loserId, resp.data.loserScore);
        Value.sortValues();
      }
    });
  };

});