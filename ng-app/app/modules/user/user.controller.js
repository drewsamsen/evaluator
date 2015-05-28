'use strict';

angular.module('valueMash')

.controller('UserCtrl', function($scope, API) {

  $scope.users = {};

  API.users.all().then(function(resp) {
    console.log('resp', resp);
    $scope.users = resp.data.users;
  });

});