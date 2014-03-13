'use strict';

angular.module('quickFormApp')
  .directive('quickForm', function () {

    return {
      controller: function($scope){

        $scope.submit = function(){
          alert('Form submitted..');
          $scope.form.submitted = true;
        };

        $scope.cancel = function(){
          alert('Form canceled..');
        }
      },

      templateUrl: './views/directive-templates/form/form.html',
      restrict: 'E',
      transclude: true
    };

  });
