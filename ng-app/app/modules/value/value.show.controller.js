'use strict';

angular.module('valueMash')

.controller('ValueShowCtrl', function($scope, API, $stateParams, Notifier) {

  $scope.value = {};

  API.values.get($stateParams.valueId)
  .then(function(resp) {
    console.log('resp', resp);
    $scope.value = resp.data.value;
  });

  $scope.updateValue = function(value) {
    API.values.update(value.id, value)
    .then(function(resp) {
      if (resp.status === 200) {
        Notifier.show('Success: Value updated');
        $scope.value = resp.data.value;
      }
    });
  }

});