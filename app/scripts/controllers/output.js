'use strict';

angular.module('quickFormApp')
  .controller('OutputCtrl',['$scope', 'formData', 'outputFactory',
    function ($scope, formData, outputFactory) {

      //output options
      //$scope.options = outputFactory.outputOptions;

      //defaults
      $scope.outputType = 'html';
      $scope.cssStyle = '';
      $scope.jsStyle = 'angular';

      //default style
      $scope.codeSource = function(){
        return outputFactory.outputFunction(formData, $scope.outputType, $scope.cssStyle, $scope.jsStyle);
      };

    }
  ]);
