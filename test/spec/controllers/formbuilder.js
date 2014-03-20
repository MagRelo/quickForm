'use strict';

describe('Controller: FormbuilderCtrl', function () {

  // load the controller's module
  beforeEach(module('quickFormApp')
  );

  var FormbuilderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormbuilderCtrl = $controller('FormbuilderCtrl', {
      $scope: scope
    });
  }));

  it('should load the input types array', function () {
    expect(scope.inputTypes.length).toBeGreaterThan(0);
  });
});
