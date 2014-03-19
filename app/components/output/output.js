'use strict';

angular.module('quickFormApp')
  .controller('OutputCtrl',['$scope', 'formData', 'outputFunctions',
    function ($scope, formData, outputFunctions) {

      //output options
      //$scope.options = outputFactory.outputOptions;

      //defaults
      $scope.outputType = 'html';
      $scope.cssStyle = '';
      $scope.jsStyle = 'angular';

      //default style
      $scope.codeSource = function(){
        return outputFunctions.outputFunction(formData, $scope.outputType, $scope.cssStyle, $scope.jsStyle);
      };

    }
  ]);
