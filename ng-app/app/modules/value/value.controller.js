'use strict';

angular.module('valueMash')

.controller('ValueCtrl', function($scope, API, Notifier, Value) {

  $scope.newValue = {};

  // For sorting
  $scope.sortDir = 1;
  $scope.sortField;

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

  $scope.sort = function(field) {
    // If we are sorting again by the currently sorted field, reverse directions
    if ($scope.sortField === field) {
      $scope.sortDir = $scope.sortDir * -1;

    // Otherwise reset sort direction
    } else {
      $scope.sortDir = 1;
    }

    $scope.sortField = field;

    Value.values.sort(function(a, b) {
      return a[field] + ($scope.sortDir * b[field]);
    });

  }

});