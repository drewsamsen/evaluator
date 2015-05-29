'use strict';

angular.module('valueMash')

.service('Notifier', function() {

  var notifierService = {

    show: function(message) {
      Materialize.toast(message, 2000);
    }

  };

  return notifierService;

});