'use strict';

angular.module('valueMash')

.controller('MatchResultCtrl', function($scope, API) {

  $scope.results = {};

  API.match_results.all().then(function(resp) {
    console.log('resp', resp);
    $scope.results = resp.data.results;
  });

});