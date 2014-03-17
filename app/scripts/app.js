'use strict';

angular.module('quickFormApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'hljs'
])

.config(['$provide', '$routeProvider', function($provide, $routeProvider) {

  $provide.decorator('formDirective', function($delegate) {
    var form = $delegate[0], controller = form.controller;
    form.controller = ['$scope', '$element', '$attrs', '$injector', function(scope, element, attrs, $injector) {
      var $interpolate = $injector.get('$interpolate');
      attrs.$set('name', $interpolate(attrs.name || attrs.ngForm || '')(scope));
      $injector.invoke(controller, this, {
        '$scope': scope,
        '$element': element,
        '$attrs': attrs
      });
    }];
    return $delegate;
  });

  $provide.decorator('ngModelDirective', function($delegate) {
    var ngModel = $delegate[0], controller = ngModel.controller;
    ngModel.controller = ['$scope', '$element', '$attrs', '$injector', function(scope, element, attrs, $injector) {
      var $interpolate = $injector.get('$interpolate');
      attrs.$set('name', $interpolate(attrs.name || '')(scope));
      $injector.invoke(controller, this, {
        '$scope': scope,
        '$element': element,
        '$attrs': attrs
      });
    }];
    return $delegate;
  });

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
    .otherwise({
      redirectTo: '/'
    });

}]);
