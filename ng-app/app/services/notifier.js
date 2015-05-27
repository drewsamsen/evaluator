'use strict';

angular.module('valueMash')

.service('Notifier', function($mdToast) {

  var notifierService = {

    show: function(message) {
      $mdToast.show(
        $mdToast.simple()
        .content(message)
        .position('top left')
        .hideDelay(1000)
      );
    }

  };

  return notifierService;

});