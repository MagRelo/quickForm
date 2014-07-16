'use strict';

angular.module('quickFormApp')
  .directive('quickFormField', ['$http', '$compile', function ($http, $compile) {

    var linkFunction;
    linkFunction = function (scope, element) {

      //angular-ui calendar setup
      if (scope.field.input_type == 'date' || scope.field.input_type == 'month' || scope.field.input_type == 'week') {

        //Date
        scope.today = function () {
          scope.dt = new Date();
        };
        scope.today();

        scope.showWeeks = false;
        scope.toggleWeeks = function () {
          scope.showWeeks = !scope.showWeeks;
        };

        scope.clear = function () {
          scope.dt = null;
        };

        scope.open = function (event) {
          event.preventDefault();
          event.stopPropagation();
          scope.opened = !scope.opened;
        };

        scope.dateOptions = {
          'year-format': "'yyyy'",
          'starting-day': 1
        };

        scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
        scope.format = scope.formats[0];
      }

      //set template URL
      var templateUrl = './components/formpreview/inputTemplates/' + scope.field.input_type + '.html';

      //get template
      $http.get(templateUrl).success(function (data) {
        element.html(data);
        $compile(element.contents())(scope);
      });

    };

    return {
      restrict: 'E',
      link: linkFunction
    };
  }]);
