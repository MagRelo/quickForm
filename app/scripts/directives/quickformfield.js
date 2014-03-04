'use strict';

angular.module('quickFormApp')
  .directive('quickFormField', function ($http, $compile) {

    var getTemplateUrl = function(field) {
      var type = field.field_type;
      var templateUrl = '';

      switch(type) {
        case 'text':
          templateUrl = './views/directive-templates/field/textfield.html';
          break;
        case 'email':
          templateUrl = './views/directive-templates/field/email.html';
          break;
        case 'textarea':
          templateUrl = './views/directive-templates/field/textarea.html';
          break;
        case 'checkbox':
          templateUrl = './views/directive-templates/field/checkbox.html';
          break;
        case 'date':
          templateUrl = './views/directive-templates/field/date.html';
          break;
        case 'dropdown':
          templateUrl = './views/directive-templates/field/dropdown.html';
          break;
        case 'hidden':
          templateUrl = './views/directive-templates/field/hidden.html';
          break;
        case 'password':
          templateUrl = './views/directive-templates/field/password.html';
          break;
        case 'radio':
          templateUrl = './views/directive-templates/field/radio.html';
          break;
      }
      return templateUrl;
    };

    var linker = function(scope, element) {
      // GET template content from path
      var templateUrl = getTemplateUrl(scope.field);
      $http.get(templateUrl).success(function(data) {
        element.html(data);
        $compile(element.contents())(scope);
      });
    };

    return {
      controller: function($scope)
      {
        //Date
        $scope.today = function() {
          $scope.dt = new Date();
        };
        $scope.today();

        $scope.showWeeks = true;
        $scope.toggleWeeks = function () {
          $scope.showWeeks = ! $scope.showWeeks;
        };

        $scope.clear = function () {
          $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
          return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
          $scope.minDate = ( $scope.minDate ) ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();

          $scope.opened = !$scope.opened;
        };

        $scope.dateOptions = {
          'year-format': "'yy'",
          'starting-day': 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
        $scope.format = $scope.formats[0];

      },
      template: '<div>{{field}}</div>',
      restrict: 'E',
      scope: {
        field:'='
      },
      transclude: true,
      link: linker
    };
  });
