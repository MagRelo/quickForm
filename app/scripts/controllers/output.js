'use strict';

angular.module('quickFormApp')
  .controller('OutputCtrl',['$scope', 'formData', 'outputFactory',
    function ($scope, formData, outputFactory) {

      //output
      $scope.outputButtons = outputFactory.outputTypes;

      //default style
      $scope.style = {type:'html'};
      $scope.codeSource = function(style){
        return outputFactory.outputFunction(formData, style);
      };

    }
  ]);
