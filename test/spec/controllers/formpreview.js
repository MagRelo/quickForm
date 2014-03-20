'use strict';

describe('Controller: FormpreviewCtrl', function () {

  // load the controller's module
  beforeEach(module('quickFormApp'));

  var FormpreviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormpreviewCtrl = $controller('FormpreviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a form data to the scope', function () {
    expect(scope.form.fields.length).toBeGreaterThan(0);
  });
});
