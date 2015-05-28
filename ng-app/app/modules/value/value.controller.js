'use strict';

angular.module('valueMash')

.controller('ValueCtrl', function($scope, API, Notifier) {

  $scope.values = [];
  $scope.newValue = {};

  API.values.all().then(function(resp) {
    $scope.values = resp.data.values;
  });

  $scope.createValue = function(data) {
    API.values.create(data)
    .then(function(resp) {
      if (resp.status === 200) {
        Notifier.show('Success: Added new value');
        $scope.newValue = {};
        $scope.values.push(resp.data.value);
      }
    });
  }

  $scope.resetForm = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
  }

});