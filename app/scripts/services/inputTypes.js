'use strict';

angular.module('quickFormApp')
  .factory('inputTypes', function () {

    return {

      inputTypes:[

        {
          display_name : 'Checkbox',
          display_priority: '40',
          display_common: false,
          input_type: 'checkbox',
          name: '',
          id: '',
          value: '',
          required: false,
          checked: {
            value: false
          }
        },

        {
          display_name : 'Color',
          display_priority: '80',
          display_common: false,
          input_type: 'color',
          name: '',
          id: '',
          value: '',
          required: false
        },

        {
          display_name : 'Date',
          display_priority: '30',
          display_common: true,
          input_type: 'date',
          name: '',
          id: '',
          value: '',
          min: {
            text: ''
          },
          max: {
            text: ''
          },
          required: false
        },

        {
          display_name : 'Dropdown List',
          display_priority: '40',
          display_common: false,
          input_type: 'dropdown',
          name: '',
          id: '',
          value: '',
          required: false,
          options: [
            {name: 'option 1', value: 'option 1'},
            {name: 'option 2', value: 'option 2'},
            {name: 'option 3', value: 'option 3'}
          ]
        },

        {
          display_name : 'Email',
          display_priority: '20',
          display_common: true,
          input_type: 'email',
          name: '',
          id: '',
          value: '',
          placeholder: {
            text: ''
          },
          required: false,
          pattern: {
            text: '', regex: ''
          },
          maxlength: {
            value: ''
          },
          multiple: {
            value: true
          }
        },

        {
          display_name : 'Month',
          display_priority: '55',
          display_common: false,
          input_type: 'month',
          name: '',
          id: '',
          value: '',
          min: {
            text: ''
          },
          max: {
            text: ''
          },
          required: false
        },

        {
          display_name : 'Number',
          display_priority: '55',
          display_common: 'true',
          input_type: 'number',
          name: '',
          id: '',
          value: '',
          min: {
            text: ''
          },
          max: {
            text: ''
          },
          required: false
        },

        {
          display_name : 'Password',
          display_priority: '30',
          display_common: false,
          input_type: 'password',
          name: '',
          id: '',
          value: '',
          required: false,
          maxlength: {
            value: ''
          }
        },

        {
          display_name : 'Radio',
          display_priority: '40',
          display_common: false,
          input_type: 'radio',
          name: '',
          id: '',
          value: '',
          required: false,
          options: [
            {name: 'option 1', value: 'option 1'},
            {name: 'option 2', value: 'option 2'},
            {name: 'option 3', value: 'option 3'}
          ]
        },

        {
          display_name : 'Range',
          display_priority: '30',
          display_common: false,
          input_type: 'range',
          name: '',
          id: '',
          value: '',
          min: {
            text: ''
          },
          max: {
            text: ''
          },
          required: false
        },

        {
          display_name : 'Telephone',
          display_priority: '40',
          display_common: false,
          input_type: 'tel',
          name: '',
          id: '',
          value: '',
          placeholder: {
            text: ''
          },
          required: false,
          pattern: {
            text: '', regex: ''
          },
          maxlength: {
            value: ''
          }
        },

        {
          display_name : 'Text',
          display_priority: '10',
          display_common: true,
          input_type: 'text',
          name: '',
          id: '',
          value: '',
          placeholder: {
            text: ''
          },
          required: false,
          pattern: {
            text: '', regex: ''
          },
          maxlength: {
            value: ''
          }
        },

        {
          display_name : 'Text Area',
          display_priority: '10',
          display_common: false,
          input_type: 'textarea',
          name: '',
          id: '',
          value: '',
          required: false
        },

        {
          display_name : 'Time',
          display_priority: '56',
          display_common: false,
          input_type: 'time',
          name: '',
          id: '',
          value: '',
          min: {
            text: ''
          },
          max: {
            text: ''
          },
          required: false
        },

        {
          display_name : 'URL',
          display_priority: '30',
          display_common: false,
          input_type: 'url',
          name: '',
          id: '',
          value: '',
          placeholder: {
            text: ''
          },
          required: false,
          pattern: {
            text: '', regex: ''
          },
          maxlength: {
            value: ''
          }
        },

        {
          display_name : 'Week',
          display_priority: '52',
          display_common: false,
          input_type: 'week',
          name: '',
          id: '',
          value: '',
          min: {
            text: ''
          },
          max: {
            text: ''
          },
          required: false
        }


      ]
    }

  });


