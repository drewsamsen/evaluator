'use strict';

angular.module('valueMash')

.controller('ValueShowCtrl', function($scope, API, $stateParams) {

  $scope.value = {};

  API.values.get($stateParams.valueId)
  .then(function(resp) {
    console.log('resp', resp);
    $scope.value = resp.data.value;
  });

  $scope.updateValue = function(value) {
    API.values.update(value.id, value)
    .then(function(resp) {
      console.log('resp', resp);
      if (resp && resp.data && resp.data.value) {
        $scope.value = resp.data.value;
      }
    });
  }

});