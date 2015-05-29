'use strict';

angular.module('valueMash')

.service('Value', function(API) {

  var valueService = {

    values: [],

    getValues: function() {
      // Dob't re-GET if we already have values
      if (valueService.values.length > 0) { return false; }
      API.values.all().then(function(resp) {
        valueService.values = resp.data.values;
      });
    },

    // Find value in the in-memory collection and update score. This will
    // ensure that the values cached on the main value listing will have the
    // latest scores without having to re-GET from the server.
    updateScore: function(valueId, newScore) {
      console.log('update valueId ' + valueId + ' to ' + newScore );
      for (var i = 0; i < valueService.values.length; i++) {
        if (valueService.values[i].id === valueId) {
          valueService.values[i].score = newScore;
          break;
        }
      }
    },

    sortValues: function() {
      valueService.values.sort(function(a,b) {
        return b.score - a.score;
      });
    }

  };

  return valueService;

});