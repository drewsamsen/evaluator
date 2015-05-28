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
      url: '/' + params.url,
      data: params.data || null
    };
    return $http(http_params);
  };

  var reportErrors = function(resp) {
    if (angular.isArray(resp.errors)) {
      Notifier.show(resp.errors[0]);
    }
  };

  var api = {

    login: function(data) {
      return $auth.submitLogin(data)
      .then(function(resp) {
        // console.info('success', resp);
      }).catch(function(resp) { reportErrors(resp); });
    },

    register: function(data) {
      $auth.submitRegistration(data)
      .then(function(resp) {
        // something
      }).catch(function(resp) { reportErrors(resp); });
    }

  };

  return api;

});