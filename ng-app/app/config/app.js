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
    'angular-cache',
    'ng-token-auth'
  ])

.config(function($httpProvider, $authProvider) {
  /**
   * Fix for hotmail.com users (when /#!/ becomes /#%21/)
   */
  if (window.location.hash.substr(0, 4) === '#%21') {
    window.location.replace(window.location.href.split('#%21').join('#!'));
  }

  // $httpProvider.defaults.transformRequest = function( data ) {
  //   return angular.isObject( data ) && String( data ) !== '[object File]' ? $.param( data ) : data;
  // };

  $httpProvider.defaults.withCredentials = true;

  $authProvider.configure({
    // apiUrl: 'https://whispering-wildwood-2811.herokuapp.com'
    apiUrl: ''
  });

})

.run(function($rootScope, Notifier) {

  // $auth events
  $rootScope.$on('auth:login-success', function(ev, user) {
    Notifier.show('auth:login-success');
  });

  $rootScope.$on('auth:login-error', function(ev, user) {
    Notifier.show('auth:login-error');
  });

});