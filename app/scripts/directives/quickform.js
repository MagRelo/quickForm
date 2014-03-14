'use strict';

angular.module('quickFormApp')
  .directive('quickForm', function () {

    return {
      templateUrl: './views/directive-templates/form/form.html',
      restrict: 'E',
      transclude: true
    };

  });
