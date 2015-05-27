'use strict';

angular.module('valueMash')

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('!');

  $urlRouterProvider.otherwise('/dashboard');

  $stateProvider

  /**
   * Routes for guests
   */
  .state('layout_guest', {
    abstract: true,
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
    isPublic: true,
    guestOnly: true
  })

  /**
   * Routes for authorized users
   */
  .state('layout_app', {
    abstract: true,
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
    templateUrl: 'modules/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  })

  ;

});