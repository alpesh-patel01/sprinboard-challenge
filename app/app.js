'use strict';

// Declare app level module which depends on views, and components
var challengeApp = angular.module('challengeApp', [
  'ui.router',
  'restangular',
  'ngStorage'
  ]);
challengeApp.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        // route to show our basic form (/form)
        .state('base', {
            abstract: true,
            url: '',
            templateUrl: 'app/views/base.html'
        }).state('home', {
            url: '/home',
            templateUrl: 'app/views/home.html',
            parent: 'base',
            controller: 'homeController'
        }).state('view-profile', {
          url: '/profile',
          parent: 'base',
          templateUrl: 'app/views/profile.html',
          controller: 'profileController',
          params: {
            path : null,
          }
      });
});
