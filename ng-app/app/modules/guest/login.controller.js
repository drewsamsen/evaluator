'use strict';

angular.module('valueMash')
  .controller('LoginCtrl', function ($scope, $rootScope, $window, $state,
    CacheFactory, Notifier, API, $auth) {

    $scope.model = {
      login: '',
      password: '',
      inProgress: false
    };

    $scope.showNotice = function() {
      Notifier.show('Test please');
    };

    $scope.attemptAuth = function(credentials) {
      API.login(credentials);
    };

    $scope.attemptRegister = function(credentials) {
      API.register(credentials);
    }

    // $scope.loginProcess = function() {
    //   $scope.model.inProgress = true;

    //   var data = {
    //     'login': $scope.model.login,
    //     'password': $scope.model.password
    //   };

    //   if ($scope.$storage.claimToken) {
    //     data.user = {claim_token: $scope.$storage.claimToken};
    //     delete $scope.$storage.claimToken;
    //   }

    //   Tether.login(data)
    //     .success(function(resp) {
    //       if (resp.geo_blocked) {
    //         CacheFactory.get('Tether.getGeoInfo').removeAll();
    //         $state.go('layout_guest.geo');
    //       }
    //       if (resp.status=="success") {
    //         User.bootstrap();

    //         $state.go('layout_app.send_funds');
    //       } else {
    //         $scope.model.inProgress = false;
    //       }
    //     })
    //     .error(function(resp) {
    //       console.log(resp);
    //       $scope.model.inProgress = false;
    //     });
    // };

  });