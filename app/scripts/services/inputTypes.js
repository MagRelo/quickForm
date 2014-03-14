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
          placeholder: '',
          required: false,
          pattern: '',
          attributes: [
            {
              type: 'checkbox',
              name: 'checked'
            }
          ]
        },

        {
          display_name : 'Color',
          display_priority: '80',
          display_common: false,
          input_type: 'color',
          name: '',
          id: '',
          value: '',
          placeholder: '',
          required: false,
          pattern: '',
          attributes: []
        },

        {
          display_name : 'Date',
          display_priority: '30',
          display_common: true,
          input_type: 'date',
          name: '',
          id: '',
          value: '',
          placeholder: '',
          required: false,
          pattern: '',
          attributes: [
            {type: 'number', name: 'min'},
            {type: 'number', name: 'max'},
            {type: 'number', name: 'step'}
          ]
        },

        {
          display_name : 'Dropdown List',
          display_priority: '40',
          display_common: false,
          input_type: 'dropdown',
          name: '',
          id: '',
          value: '',
          placeholder: '',
          required: false,
          pattern: '',
          options: []
        },

        {
          display_name : 'Email',
          display_priority: '20',
          display_common: true,
          input_type: 'email',
          name: '',
          id: '',
          value: '',
          placeholder: '',
          required: false,
          pattern: '',
          attributes: [
            {type: 'number', name: 'maxlength'},
            {type: 'boolean', name: 'multiple'}
          ]
        },

        {
          display_name : 'Month',
          display_priority: '55',
          display_common: false,
          input_type: 'month',
          name: '',
          id: '',
          value: '',
          placeholder: '',
          required: false,
          pattern: '',
          attributes: [
            {type: 'number', name: 'min'},
            {type: 'number', name: 'max'},
            {type: 'number', name: 'step'}
          ]
        },

        {
          display_name : 'Number',
          display_priority: '55',
          display_common: 'true',
          input_type: 'number',
          name: '',
          id: '',
          value: '',
          placeholder: '',
          required: false,
          pattern: '',
          attributes: [
            {type: 'number', name: 'min'},
            {type: 'number', name: 'max'},
            {type: 'number', name: 'step'}
          ]
        },

        {
          display_name : 'Password',
          display_priority: '30',
          display_common: false,
          input_type: 'password',
          name: '',
          id: '',
          value: '',
          placeholder: '',
          required: false,
          pattern: '',
          attributes: [
            {type: 'number', name: 'maxlength'}
          ]
        },

        {
          display_name : 'Radio',
          display_priority: '40',
          display_common: false,
          input_type: 'radio',
          name: '',
          id: '',
          value: '',
          placeholder: '',
          required: false,
          pattern: '',
          attributes: [],
          options: {}
        },

        {
          display_name : 'Range',
          display_priority: '30',
          display_common: false,
          input_type: 'range',
          name: '',
          id: '',
          value: '',
          placeholder: '',
          required: false,
          pattern: '',
          attributes: [
            {type: 'number', name: 'min'},
            {type: 'number', name: 'max'},
            {type: 'number', name: 'step'}
          ],
          options: {}
        },

        {
          display_name : 'Telephone',
          display_priority: '40',
          display_common: false,
          input_type: 'tel',
          name: '',
          id: '',
          value: '',
          placeholder: '',
          required: false,
          pattern: '',
          attributes: [
            {type: 'number', name: 'maxlength'}
          ],
          options: {}
        },

        {
          display_name : 'Text',
          display_priority: '10',
          display_common: true,
          input_type: 'text',
          name: '',
          id: '',
          value: '',
          placeholder: '',
          required: false,
          pattern: '',
          attributes: [
            {type: 'number', name: 'maxlength'}
          ],
          options: {}
        },

        {
          display_name : 'Time',
          display_priority: '56',
          display_common: false,
          input_type: 'time',
          name: '',
          id: '',
          value: '',
          placeholder: '',
          required: false,
          pattern: '',
          attributes: [
            {type: 'number', name: 'min'},
            {type: 'number', name: 'max'},
            {type: 'number', name: 'step'}
          ],
          options: {}
        },

        {
          display_name : 'URL',
          display_priority: '30',
          display_common: false,
          input_type: 'url',
          name: '',
          id: '',
          value: '',
          placeholder: '',
          required: false,
          pattern: '',
          attributes: [
            {type: 'number', name: 'maxlength'}
          ],
          options: {}
        },

        {
          display_name : 'Week',
          display_priority: '52',
          display_common: false,
          input_type: 'week',
          name: '',
          id: '',
          value: '',
          placeholder: '',
          required: false,
          pattern: '',
          attributes: [
            {type: 'number', name: 'min'},
            {type: 'number', name: 'max'},
            {type: 'number', name: 'step'}
          ],
          options: {}
        }


      ]
    }

  });


