'use strict';

angular.module('valueMash')

.service('API', function($http, $auth) {

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

  }

  var api = {

    login: function(data) {

      $auth.submitLogin(data)
      .then(function(resp) {
        // console.info('success', resp);
      });

      // return _query({
      //   auth: false,
      //   method: 'POST',
      //   url: 'sessions.json',
      //   data: data
      // });

    }

  };

  return api;

});