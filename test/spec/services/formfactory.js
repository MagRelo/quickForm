'use strict';

describe('Service: formFactory', function () {

  // load the service's module
  beforeEach(module('quickFormApp'));

  // instantiate service
  var formFactory;
  beforeEach(inject(function (_formFactory_) {
    formFactory = _formFactory_;
  }));

  it('should do something', function () {
    expect(!!formFactory).toBe(true);
  });

});
