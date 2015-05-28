'use strict';

angular.module('valueMash')

.service('API', function($http, $auth, Notifier) {

  // Query wrapper
  var _query = function(params) {
    params = angular.extend({
      auth: true,
      method: '',
      url: ''
    }, params);

    var http_params = {
      method: params.method,

      // Prod
      url: '/' + params.url,
      // Dev
      // url: 'http://localhost:3000/' + params.url,

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

    getUsers: function() {
      return _query({
        method: 'GET',
        url: 'users.json'
      });
    },

    getValues: function() {
      return _query({
        method: 'GET',
        url: 'values.json'
      });
    }

  };

  return api;

});