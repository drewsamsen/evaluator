'use strict';

angular.module('valueMash')

.controller('ValueCtrl', function($scope, API, Notifier, Value) {

  $scope.newValue = {};

  // For sorting
  $scope.sortDir = 1;

  Value.getValues();

  $scope.createValue = function(data) {
    API.values.create(data)
    .then(function(resp) {
      if (resp.status === 200) {
        Notifier.show('Success: Added new value');
        $scope.newValue = {};
        Value.values.push(resp.data.value);
      }
    });
  }

  $scope.resetForm = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
  }

  $scope.sortScore = function() {
    // Always flip sort direction. meh.
    $scope.sortDir = $scope.sortDir * -1;
    Value.values.sort(function(a, b) {
      return $scope.sortDir * (b.score - a.score);
    });
  }

  $scope.sortAverageDiff = function() {
    var aDiff, bDiff;
    // Always flip sort direction. meh.
    $scope.sortDir = $scope.sortDir * -1;
    Value.values.sort(function(a, b) {
      // Make them all positive for ease of sorting...
      aDiff = a.score - a.average + 1000;
      bDiff = b.score - b.average + 1000;
      return $scope.sortDir * (bDiff - aDiff);
    });
  }

});