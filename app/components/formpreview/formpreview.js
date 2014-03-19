'use strict';

angular.module('quickFormApp')
  .controller('FormpreviewCtrl', ['$scope', 'formData',
    function ($scope, formData) {

      $scope.form = formData;

    }
  ]);
