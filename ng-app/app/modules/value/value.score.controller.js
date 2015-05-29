'use strict';

angular.module('valueMash')

.controller('ValueScoreCtrl', function($scope, API, Value, hotkeys) {

  // - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Keyboard shortcuts
  // - - - - - - - - - - - - - - - - - - - - - - - - - -

  hotkeys.bindTo($scope)
  .add({
    combo: 'right',
    description: 'Select value on the right',
    callback: function() { $scope.score($scope.right, $scope.left); }
  })
  .add({
    combo: 'left',
    description: 'Select value on the left',
    callback: function() { $scope.score($scope.left, $scope.right); }
  })
  .add({
    combo: 'down',
    description: 'Skip value matchup',
    callback: function() { $scope.skipMatch(); }
  });


  // - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Store some data
  // - - - - - - - - - - - - - - - - - - - - - - - - - -

  var valueStack = [];


  // - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Private methods
  // - - - - - - - - - - - - - - - - - - - - - - - - - -

  var loadNextTwoValues = function() {
    $scope.left = valueStack.shift();
    $scope.right = valueStack.shift();

    // shift again if the values are the same (prevent same value against itself)
    if ($scope.left.id === $scope.right.id) {
      valueStack.push($scope.right);
      $scope.right = valueStack.shift();
    }

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


  // - - - - - - - - - - - - - - - - - - - - - - - - - -
  // On-Load bootstrapping
  // - - - - - - - - - - - - - - - - - - - - - - - - - -

  getSomeValues().then(loadNextTwoValues);
  $scope.left = {};
  $scope.right = {};


  // - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Public methods
  // - - - - - - - - - - - - - - - - - - - - - - - - - -

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

  $scope.skipMatch = function() {
    loadNextTwoValues();
    getMoreValuesIfNeeded();
  };

});