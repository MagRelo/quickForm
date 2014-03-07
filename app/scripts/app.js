'use strict';

angular.module('quickFormApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'hljs'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/modelbuilder.html',
        controller: 'ModelbuilderCtrl'
      })
      .when('/modelBuilder', {
        templateUrl: 'views/modelbuilder.html',
        controller: 'ModelbuilderCtrl'
      })
      .when('/navBar', {
        templateUrl: 'views/navbar.html',
        controller: 'NavbarCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
