'use strict';

angular.module('valueMash', [
    'ngMaterial',
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ui.router',
    'ngStorage',
    'toaster',
    'angular-cache'
  ])

  .config(function($httpProvider) {
    /**
     * Fix for hotmail.com users (when /#!/ becomes /#%21/)
     */
    if (window.location.hash.substr(0, 4) === '#%21') {
      window.location.replace(window.location.href.split('#%21').join('#!'));
    }

    $httpProvider.defaults.transformRequest = function( data ) {
      return angular.isObject( data ) && String( data ) !== '[object File]' ? $.param( data ) : data;
    };

    $httpProvider.defaults.withCredentials = true;

  });
