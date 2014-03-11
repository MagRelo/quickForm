'use strict';

angular.module('quickFormApp')
  .directive('quickFormField', function ($http, $compile, inputTypes) {

    var linker = function(scope, element) {

      //get field template url
      var templateUrl = '';
      angular.forEach(inputTypes.inputTypes, function(input){
        if(scope.field.field_type == input.input_type){
          templateUrl =  input.template_url;
        }
      });

      //get field template
      $http.get(templateUrl).success(function(data) {
        element.html(data);
        $compile(element.contents())(scope);
      });

    };

    return {
      controller: function($scope)
      {

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

        if($scope.field.field_type == 'date'){
          calenderSetup();
        }

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
