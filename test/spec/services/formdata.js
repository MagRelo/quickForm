'use strict';

describe('Service: formData', function () {

  // load the service's module
  beforeEach(module('quickFormApp'));

  // instantiate service
  var formData;
  beforeEach(inject(function (_formData_) {
    formData = _formData_;
  }));

  it('should do something', function () {
    expect(!!formData).toBe(true);
  });

});
