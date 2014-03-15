'use strict';

angular.module('quickFormApp')
  .directive('quickFormField', function ($http, $compile) {

    var linker = function(scope, element) {

      var templateUrl = '';

      switch (scope.field.input_type){
        case 'checkbox':
          templateUrl = './views/directive-templates/field/checkbox.html';
          break;
        case 'color':
          templateUrl = './views/directive-templates/field/color.html';
          break;
        case 'date' :
          templateUrl = './views/directive-templates/field/date.html';
          break;
        case 'dropdown' :
          templateUrl = './views/directive-templates/field/dropdown.html';
          break;
        case 'email':
          templateUrl = './views/directive-templates/field/email.html';
          break;
        case 'month' :
          templateUrl = './views/directive-templates/field/date.html';
          break;
        case 'number':
          templateUrl = './views/directive-templates/field/number.html';
          break;
        case 'password':
          templateUrl = './views/directive-templates/field/password.html';
          break;
        case 'radio':
          templateUrl = './views/directive-templates/field/radio.html';
          break;
        case 'range':
          templateUrl = './views/directive-templates/field/range.html';
          break;
        case 'tel':
          templateUrl = './views/directive-templates/field/telephone.html';
          break;
        case 'text':
          templateUrl = './views/directive-templates/field/textfield.html';
          break;
        case 'textarea':
          templateUrl = './views/directive-templates/field/textarea.html';
          break;
        case 'time':
          templateUrl = './views/directive-templates/field/time.html';
          break;
        case 'url':
          templateUrl = './views/directive-templates/field/url.html';
          break;
        case 'week' :
          templateUrl = './views/directive-templates/field/date.html';
          break;
        default:
          templateUrl = './views/directive-templates/field/textfield.html';
          break
      }

      //get field template
      $http.get(templateUrl).success(function(data) {
        element.html(data);
        $compile(element.contents())(scope);
      });

      //prevents FOUC flicker - pre-render???
      element.html('');
    };

    return {
      controller: function($scope)
      {
        //angular-ui calendar setup
        function calenderSetup(){
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

        }
        if($scope.field.input_type == 'date' || $scope.field.input_type == 'month' || $scope.field.input_type == 'week'  ){
          calenderSetup();
        }

      },
      template: '<div>{{field}}</div>',
      restrict: 'E',
      scope: {
        field:'='
      },
      link: linker
    };
  });
