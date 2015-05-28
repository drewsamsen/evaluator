'use strict';

angular.module('valueMash')

.controller('ValueCtrl', function($scope, API) {

  $scope.values = [];

  API.values.all().then(function(resp) {
    console.log('resp', resp);
    $scope.values = resp.data.values;
  });

  $scope.createValue = function(data) {
    API.values.create(data).then(function(resp) {
      console.log('resp', resp);
      if (resp && resp.data && resp.data.value) {
        $scope.values.push(resp.data.value);
      }
    });
  }

});