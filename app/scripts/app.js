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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/modelBuilder', {
        templateUrl: 'views/modelbuilder.html',
        controller: 'ModelbuilderCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
