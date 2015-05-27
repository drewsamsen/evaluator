'use strict';

angular.module('valueMash')

.service('User', function($auth) {

  var userService = {

    isGuest: function() {
      console.log($auth.validateUser());
      return $auth.validateUser();
    },

    isAuth: function() {
      console.log(!!$auth.validateUser());
      return !!$auth.validateUser();
    }

  };

  return userService;

});