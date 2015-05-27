'use strict';

angular.module('valueMash')

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('!');

  $urlRouterProvider.otherwise('/login');

  $stateProvider

  /**
   * Routes for guests
   */
  .state('layout_guest', {
    abstract: true,
    isPublic: true,
    views: {
      'root': {
        templateUrl: 'modules/layout/layout_guest.html',
        controller: 'LayoutGuestCtrl'
      }
    }
  })

  .state('layout_guest.login', {
    url: '/login',
    templateUrl: 'modules/guest/login.html',
    controller: 'LoginCtrl',
    guestOnly: true,
    isPublic: true,
  })

  /**
   * Routes for authorized users
   */
  .state('layout_app', {
    abstract: true,
    isPublic: false,
    views: {
      'root': {
        templateUrl: 'modules/layout/layout_app.html',
        controller: 'LayoutAppCtrl'
      },
      'sidebar@layout_app': {
        templateUrl: 'modules/layout/_layout_app_sidebar.html',
        controller: 'LayoutAppCtrl'
      }
    }
  })

  .state('layout_app.dashboard', {
    url: '/dashboard',
    isPublic: false,
    templateUrl: 'modules/dashboard/dashboard.html',
    controller: 'DashboardCtrl',
    resolve: {
      auth: function($auth) {
        return $auth.validateUser();
      }
    }
  });

});