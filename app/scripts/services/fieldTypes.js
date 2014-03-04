'use strict';

angular.module('quickFormApp')
  .factory('fieldTypes', function () {

    return {
      fieldTypes:[
        {
          name : 'text',
          value : 'Text',
          options: false
        },
        {
          name : 'email',
          value : 'E-mail',
          options: false
        },
        {
          name : 'date',
          value : 'Date',
          options: false
        },
        {
          name : 'textarea',
          value : 'Text Area',
          options: false
        },
        {
          name : 'checkbox',
          value : 'Checkbox',
          options: false
        },
        {
          name : 'radio',
          value : 'Radio Buttons',
          options: true
        },
        {
          name : 'dropdown',
          value : 'Dropdown List',
          options: true
        }

      ]
    }

  });
