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

.run(function($rootScope, Notifier, User, $state) {

  /**
   * Check access for requested pages
   */
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    // if (!toState.isPublic && User.isGuest()) {
    //   event.preventDefault();
    //   Notifier.show('Please log in');
    //   $state.go('layout_guest.login');
    // }
  });

  // On page load:
  $rootScope.$on('auth:validation-success', function(ev, user) {
    console.log('auth:validation-success');
  });
  $rootScope.$on('auth:validation-error', function(ev, user) {
    console.log('auth:validation-error');
  });
  $rootScope.$on('auth:validation-expired', function(ev, user) {
    console.log('auth:validation-expired');
  });

  // $auth login events
  $rootScope.$on('auth:login-success', function(ev, user) {
    console.log('auth:login-success');
  });
  $rootScope.$on('auth:login-error', function(ev, user) {
    console.log('auth:login-error');
  });

  // $auth register events
  $rootScope.$on('auth:registration-email-success', function(ev, user) {
    console.log('auth:registration-email-success');
  });
  $rootScope.$on('auth:registration-email-error', function(ev, user) {
    console.log('auth:registration-email-error');
  });

});