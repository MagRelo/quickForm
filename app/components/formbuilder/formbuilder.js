'use strict';

angular.module('quickFormApp')
  .controller('FormbuilderCtrl', ['$scope', 'inputTypes','formData',
    function ($scope, inputTypes, formData) {

      //input types
      $scope.inputTypes = inputTypes.inputTypes;


      //form data and form builder functions
      $scope.formData = formData;

    }

  ]);
