'use strict';

angular.module('valueMash')

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

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
      },
      'sidebar': {
        templateUrl: 'modules/layout/_layout_app_sidebar.html',
        controller: 'LayoutAppCtrl'
      },
      'header': {
        templateUrl: 'modules/layout/_layout_app_header.html',
        controller: 'LayoutAppCtrl'
      }
    }
  })

  .state('layout_guest.login', {
    url: '/login',
    templateUrl: 'modules/guest/login.html',
    controller: 'LoginCtrl',
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
      'sidebar': {
        templateUrl: 'modules/layout/_layout_app_sidebar.html',
        controller: 'LayoutAppCtrl'
      },
      'header': {
        templateUrl: 'modules/layout/_layout_app_header.html',
        controller: 'LayoutAppCtrl'
      },
      'footer': {
        templateUrl: 'modules/layout/_layout_app_footer.html',
        controller: 'LayoutAppCtrl'
      }
    },
    // Blocks unauthenticated users, redirecting to /login (applies to all
    // child states also)
    resolve: {
      auth: function($auth) {
        return $auth.validateUser();
      }
    }
  })

  .state('layout_app.dashboard', {
    url: '/dashboard',
    templateUrl: 'modules/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  })

  .state('layout_app.users', {
    url: '/users',
    templateUrl: 'modules/user/user.html',
    controller: 'UserCtrl'
  })

  .state('layout_app.values', {
    url: '/values',
    templateUrl: 'modules/value/value.html',
    controller: 'ValueCtrl'
  })

  .state('layout_app.values.show', {
    url: '/{valueId:[0-9]+}',
    templateUrl: 'modules/value/value.show.html',
    controller: 'ValueShowCtrl'
  })

  .state('layout_app.values.score', {
    url: '/score',
    templateUrl: 'modules/value/value.score.html',
    controller: 'ValueScoreCtrl'
  })

  .state('layout_app.match_results', {
    url: '/match_results',
    templateUrl: 'modules/match_result/match_result.html',
    controller: 'MatchResultCtrl'
  });

});