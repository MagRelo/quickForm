'use strict';

angular.module('quickFormApp', [
  'ngRoute',
  'ui.bootstrap',
  'hljs'
])


  //common config
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/main.html'
      })
      .otherwise({
        redirectTo: '/'
    });
  }])

  //formbuilder config
  .config(['$provide', '$routeProvider', function($provide, $routeProvider) {
    $routeProvider
      .when('/formbuilder', {
        templateUrl: 'components/formbuilder/formbuilder.html'
      });

  }])

  //formpreview config
  .config(['$provide', '$routeProvider', function($provide, $routeProvider) {
    $routeProvider
      .when('/formpreview', {
        templateUrl: 'components/formpreview/formPreview.html'
      });





    $provide.decorator('ngModelDirective', ['$delegate', function($delegate) {

      var ngModel = $delegate[0], controller = ngModel.controller;

      ngModel.controller = ['$scope', '$element', '$attrs', '$injector', function(scope, element, attrs, $injector) {

        //use $injector to get the interpolate service
        var $interpolate = $injector.get('$interpolate');

        //use the $interpolate service to evaluate the name expression and set attribute
        attrs.$set('name', $interpolate(attrs.name  || '')(scope));


        if(scope.field){
          this.mgl_displayName = scope.field.display_name || '';
        }

        this.mgl_displayErrorIcon = function(){

          return this.$dirty && this.$invalid;
        };


        this.mgl_displaySuccessIcon = function(){

          return this.$valid && this.$dirty && this.$modelValue !== '';
        };

        this.mgl_errorArray = function(){
          var errorFields = [];

          //angular.forEach(this.function)
        };


        //invoke will use these locals first
        $injector.invoke(controller, this, {
          '$scope': scope,
          '$element': element,
          '$attrs': attrs
        });
      }];

      return $delegate;
    }]);


//    $provide.decorator('formDirective', function($delegate) {
//
//      var directive = $delegate[0];
//      var controllerFunction = directive.controller;
//
//      directive.controller[5] = controllerFunction;
//
//      return $delegate;
//    });


  }])

  //output config
  .config(['$provide', '$routeProvider', function($provide, $routeProvider) {
    $routeProvider
      .when('/output', {
        templateUrl: 'components/output/output.html'
      });

  }])

;
