'use strict';

describe('Controller: ModelbuilderCtrl', function () {

  // load the controller's module
  beforeEach(module('quickFormApp'));

  var ModelbuilderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModelbuilderCtrl = $controller('ModelbuilderCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
