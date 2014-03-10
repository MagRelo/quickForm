'use strict';

angular.module('quickFormApp')
  .factory('inputTypes', function () {

    return {
      inputTypes:[
        {
          display : 'Checkbox',
          display_priority: '40',
          input_type : 'checkbox',
          template_url: './views/directive-templates/field/checkbox.html',
          options: false,
          common: true
        },
        {
          display : 'Color',
          display_priority: '80',
          template_url: './views/directive-templates/field/textfield.html',
          input_type : 'color',
          options: false,
          common: false

        },
        {
          display : 'Date',
          display_priority: '50',
          template_url: './views/directive-templates/field/date.html',
          input_type : 'date',
          options: false,
          common: false

        },
        {
          display : 'Email',
          display_priority: '20',
          template_url: './views/directive-templates/field/email.html',
          input_type : 'email',
          options: false,
          common: true

        },
        {
          display : 'Month',
          display_priority: '55',
          template_url: './views/directive-templates/field/date.html',
          input_type : 'month',
          options: false,
          common: false
        },
        {
          display : 'Number',
          display_priority: '20',
          template_url: './views/directive-templates/field/textfield.html',
          input_type : 'number',
          options: false,
          common: false
        },
        {
          display : 'Password',
          display_priority: '30',
          template_url: './views/directive-templates/field/password.html',
          input_type : 'password',
          options: false,
          common: true
        },
        {
          display : 'Radio',
          display_priority: '40',
          template_url: './views/directive-templates/field/radio.html',
          input_type : 'radio',
          options: true,
          common: true

        },
        {
          display : 'Range',
          display_priority: '30',
          template_url: './views/directive-templates/field/textfield.html',
          input_type : 'range',
          options: false,
          common: false

        },
        {
          display : 'Telephone',
          display_priority: '30',
          template_url: './views/directive-templates/field/textfield.html',
          input_type : 'tel',
          options: false,
          common: false

        },
        {
          display : 'Text',
          display_priority: '10',
          input_type : 'text',
          template_url: './views/directive-templates/field/textfield.html',
          options: false,
          common: true

        },
        {
          display : 'Time',
          display_priority: '56',
          template_url: './views/directive-templates/field/textfield.html',
          input_type : 'time',
          options: false,
          common: false

        },
        {
          display : 'URL',
          display_priority : '30',
          template_url: './views/directive-templates/field/textfield.html',
          input_type : 'url',
          options: false,
          common: false
        },
        {
          display : 'Week',
          display_priority: '52',
          template_url: './views/directive-templates/field/textfield.html',
          value : 'week',
          options: false,
          common: false
        },
        {
          display : 'Dropdown List',
          display_priority: '40',
          template_url: './views/directive-templates/field/dropdown.html',
          input_type : 'dropdown',
          options: true,
          common: true
        }
      ]
    }

  });
