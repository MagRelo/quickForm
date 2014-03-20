'use strict';

describe('Controller: OutputCtrl', function () {

  // load the controller's module
  beforeEach(module('quickFormApp'));

  var OutputCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OutputCtrl = $controller('OutputCtrl', {
      $scope: scope
    });
  }));

  it('should set the default outputType', function () {
    expect(scope.outputType).toBe('html');
  });

  it('should set the default cssStyle', function () {
    expect(scope.cssStyle).toBe('');
  });

  it('should set the default jsStyle', function () {
    expect(scope.jsStyle).toBe('angular');
  });


});
