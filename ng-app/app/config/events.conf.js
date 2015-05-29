'use strict';

angular.module('valueMash')

.run(function($rootScope, $state, Notifier) {

  $rootScope.$on('auth:registration-email-success', function(ev, data) {
    console.log('auth:registration-email-success');
  });

  $rootScope.$on('auth:registration-email-error', function(ev, data) {
    console.log('auth:registration-email-error');
  });

  $rootScope.$on('auth:email-confirmation-success', function(ev, data) {
    console.log('auth:email-confirmation-success');
  });

  $rootScope.$on('auth:email-confirmation-error', function(ev, data) {
    console.log('auth:email-confirmation-error');
  });

  $rootScope.$on('auth:password-reset-request-success', function(ev, data) {
    console.log('auth:password-reset-request-success');
  });

  $rootScope.$on('auth:password-reset-request-error', function(ev, data) {
    console.log('auth:password-reset-request-error');
  });

  $rootScope.$on('auth:password-reset-confirm-error', function(ev, data) {
    console.log('auth:password-reset-confirm-error');
  });

  $rootScope.$on('auth:password-reset-confirm-success', function(ev, data) {
    console.log('auth:password-reset-confirm-success');
    $('change-pw-modal').openModal();
  });

  $rootScope.$on('auth:password-change-success', function(ev, data) {
    console.log('auth:password-change-success');
  });

  $rootScope.$on('auth:password-change-error', function(ev, data) {
    console.log('auth:password-change-error');
  });

  $rootScope.$on('auth:logout-success', function(ev, data) {
    console.log('auth:logout-success');
    Notifier.show('Logged out');
    $state.go('layout_guest.login');
  });

  $rootScope.$on('auth:logout-error', function(ev, data) {
    console.log('auth:logout-error');
  });

  $rootScope.$on('auth:account-update-success', function(ev, data) {
    console.log('auth:account-update-success');
  });

  $rootScope.$on('auth:account-update-error', function(ev, data) {
    console.log('auth:account-update-error');
  });

  $rootScope.$on('auth:account-destroy-success', function(ev, data) {
    console.log('auth:account-destroy-success');
  });

  $rootScope.$on('auth:account-destroy-error', function(ev, data) {
    console.log('auth:account-destroy-error');
  });

  $rootScope.$on('auth:validation-success', function(ev, data) {
    console.log('auth:validation-success');
  });

  $rootScope.$on('auth:validation-error', function(ev, data) {
    console.log('auth:validation-error');
  });

  $rootScope.$on('auth:validation-expired', function(ev, data) {
    console.log('auth:validation-expired');
  });

  $rootScope.$on('auth:login-success', function(ev, data) {
    console.log('auth:login-success');
  });

  $rootScope.$on('auth:login-error', function(ev, data) {
    console.log('auth:login-error');
  });

  $rootScope.$on('auth:registration-email-success', function(ev, data) {
    console.log('auth:registration-email-success');
  });

  $rootScope.$on('auth:registration-email-error', function(ev, data) {
    console.log('auth:registration-email-error');
  });

});