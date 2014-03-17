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
        templateUrl: 'views/main.html'
      })
      .when('/formbuilder', {
        templateUrl: 'views/formbuilder.html'
      })
      .when('/formpreview', {
        templateUrl: 'views/formpreview.html'
      })
      .when('/output', {
        templateUrl: 'views/output.html'
      })
      .when('/newForm', {
        templateUrl: 'views/newform.html',
        controller: 'NewformCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
