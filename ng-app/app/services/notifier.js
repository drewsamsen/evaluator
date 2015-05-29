'use strict';

angular.module('valueMash')

.service('Notifier', function() {

  var notifierService = {

    show: function(message) {
      console.log('Notifier.show('+message+')');
      // $mdToast.show(
      //   $mdToast.simple()
      //   .content(message)
      //   .position('top left')
      //   .hideDelay(1000)
      // );
    }

  };

  return notifierService;

});