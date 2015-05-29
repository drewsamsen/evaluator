'use strict';

angular.module('valueMash')

.service('API', function($http, $auth, Notifier, API_URL) {

  // Query wrapper
  var _query = function(params) {
    params = angular.extend({
      auth: true,
      method: '',
      url: ''
    }, params);

    var http_params = {
      method: params.method,
      url: API_URL + '/' + params.url,
      data: params.data || null
    };
    return $http(http_params);
  };

  var reportErrors = function(resp) {
    console.warn('reportErrors', resp);
    if (angular.isArray(resp.errors)) {
      Notifier.show(resp.errors[0]);
    }
  };

  var api = {

    users: {

      all: function() {
        return _query({
          method: 'GET',
          url: 'users.json'
        });
      }

    },

    values: {

      all: function() {
        return _query({
          method: 'GET',
          url: 'values.json'
        });
      },

      create: function(data) {
        return _query({
          method: 'POST',
          url: 'values.json',
          data: data
        });
      },

      get: function(id) {
        return _query({
          method: 'GET',
          url: 'values/'+id+'.json'
        });
      },

      update: function(id, data) {
        return _query({
          method: 'PUT',
          url: 'values/'+id+'.json',
          data: data
        });
      },

      getPlayers: function() {
        return _query({
          method: 'GET',
          url: 'values/players.json'
        });
      },

      score: function(winnderId, loserId) {
        return _query({
          method: 'POST',
          url: 'values/score.json',
          data: {
            winnderId: winnderId,
            loserId: loserId
          }
        })
      }

    }

  };

  return api;

});