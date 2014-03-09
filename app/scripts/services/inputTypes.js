'use strict';

angular.module('quickFormApp')
  .factory('inputTypes', function () {

    return {
      inputTypes:[
        {
          display : 'Checkbox',
          value : 'checkbox',
          options: false,
          common: true,
          priority: '40'
        },
        {
          display : 'Color',
          value : 'color',
          options: false,
          common: false,
          priority: '80'
        },
        {
          display : 'Date',
          value : 'date',
          options: false,
          common: false,
          priority: '50'
        },
        {
          display : 'Email',
          value : 'email',
          options: false,
          common: true,
          priority: '20'
        },
//        {
//          display : 'File',
//          value : 'file',
//          options: false,
//          common: false
//        },
//        {
//          display : 'Hidden',
//          value : 'hidden',
//          options: false,
//          common: true
//        },
//        {
//          display : 'Image',
//          value : 'image',
//          options: false,
//          common: false
//        },
        {
          display : 'Month',
          value : 'month',
          options: false,
          common: false,
          priority: '55'
        },
        {
          display : 'Number',
          value : 'number',
          options: false,
          common: false,
          priority: '20'
        },
        {
          display : 'Password',
          value : 'password',
          options: false,
          common: true,
          priority: '30'
        },
        {
          display : 'Radio',
          value : 'radio',
          options: true,
          common: true,
          priority: '40'
        },
        {
          display : 'Range',
          value : 'range',
          options: false,
          common: false,
          priority: '30'
        },
        {
          display : 'Telephone',
          value : 'tel',
          options: false,
          common: false,
          priority: '30'
        },
        {
          display : 'Textbox',
          value : 'text',
          options: false,
          common: true,
          priority: '10'
        },
        {
          display : 'Time',
          value : 'time',
          options: false,
          common: false,
          priority: '56'
        },
        {
          display : 'URL',
          value : 'url',
          options: false,
          common: false,
          priority: '30'
        },
        {
          display : 'Week',
          value : 'week',
          options: false,
          common: false,
          priority: '52'
        }

        ,{
          display : 'Dropdown List',
          value : 'dropdown',
          options: true,
          common: true,
          priority: '40'
        }

      ]
    }

  });
