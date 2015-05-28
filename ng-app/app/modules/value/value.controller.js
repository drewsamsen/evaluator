'use strict';

angular.module('valueMash')

.controller('ValueCtrl', function($scope, API) {

  $scope.values = {};

  API.getValues().then(function(resp) {
    console.log('resp', resp);
    $scope.values = resp.data.values;
  });

});