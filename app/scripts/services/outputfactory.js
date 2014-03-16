 'use strict';

angular.module('quickFormApp')
  .factory('outputFactory', function () {

    var newline = String.fromCharCode(13);
    var tab = '  ';

    function noSpace(inputString){
      return inputString.replace(/ /g, '');
    }

    function underScore(inputString){
      return inputString.replace(/ /g, '_');
    }

    var htmlOutput = function(form){

      var formBegin = '<form name="' + underScore(form.name) + 'Form">' +
        newline + newline +
        tab + '<legend>' + form.name + '</legend>'
        + newline + newline;

      var fields = function(form){
        var fieldsRaw = '';

        for(var i = 0; i< form.fields.length; i++){

          //label
          fieldsRaw += tab + '<label for="'+  form.fields[i].id + '">' + form.fields[i].display_name + '</label>' + newline;

          //input
          fieldsRaw += tab + '<input type="' + form.fields[i].input_type + '" id="' + form.fields[i].id + '"' + (form.fields[i].required ? ' required':'') + '>' + newline;

          fieldsRaw += newline;

        }

        return fieldsRaw;

      };

      var button = tab + '<button type="submit">Submit</button>' + newline + newline;

      var formEnd = '</form>';

      return formBegin + fields(form) + button + formEnd;
    };

    var angularOutput = function(form){

      var formBegin = '<form name="' + underScore(form.name) + 'Form" data-ng-submit="submit' + underScore(form.name) + '('+ underScore(form.name)+')" novalidate>' +
        newline + newline +
        tab + '<legend>' + form.name + '</legend>'
        + newline + newline;

      var formEnd = '</form>';

      var fields = function(form){
        var fieldsRaw = '';

        for(var i = 0; i< form.fields.length; i++){

          //label
          fieldsRaw += tab + '<label for="'+  form.fields[i].id + '">' + form.fields[i].display_name + '</label>' + newline;

          //input
          fieldsRaw += tab + '<input type="' + form.fields[i].input_type + '" id="' + form.fields[i].id + '"' + ' data-ng-model="' + underScore(form.name) + '.' +  underScore(form.fields[i].display_name) + '"' + (form.fields[i].required ? ' required':'') + '>' + newline;

          fieldsRaw += newline;

        }

        return fieldsRaw;

      };

      var button = tab + '<button type="submit">Submit</button>' + newline + newline;

      return formBegin + fields(form) + button + formEnd;
    };

    var mongooseOutput = function(form){

      function mgRequired(required){
        if(required){
          return ', required: true'
        }
        return ''
      }

      function mgDataType(dataType){

        //String
        if(dataType == 'text' || dataType == 'textarea' || dataType == 'email' || dataType == 'radio' || dataType == 'dropdown'){
          return 'String'
        }
        //Number
        if(dataType == 'number'){
          return 'Number'
        }
        //Boolean
        if(dataType == 'checkbox'){
          return 'Boolean'
        }
        //Date
        if(dataType == 'date'){
          return 'Date'
        }

        //Buffer
        //Mixed
        //ObjectID
        //Array
        return 'n/a'
      }

      var fileBegin =  "'use strict';" + newline
        + "var mongoose = require('mongoose')," + newline
        + "Schema = mongoose.Schema;" + newline + newline
        + "/**" + newline
        + "* " + form.name + " Schema" + newline
        + "*/" + newline
        + " var " + underScore(form.name) + "Schema = new Schema({" + newline;

      var model = function(){
        var modelRaw = '';
        for(var i = 0; i< form.fields.length; i++){

          modelRaw += tab + underScore(form.fields[i].display_name) + ": " + '{type: '
            + mgDataType(form.fields[i].input_type)
            + mgRequired(form.fields[i].required)
            + '}' + "," + newline
          }

        modelRaw += "});" + newline + newline;
        return modelRaw
      };

      var validations = "/**" + newline
        + "*  Validations" + newline
        + "*/" + newline + newline;

      var initialize = "mongoose.model('" + underScore(form.name) + "', " + underScore(form.name) + "Schema);";

      return fileBegin + model() + validations + initialize
    };

    var firebaseOutput = function(form){

      function fbRequiredFieldsString(){

        var fields = '';
        form.fields.forEach(function(field){

          if(field.required){
            fields += "'" + underScore(field.display_name) + "',";
          }

        });

        //slice off last comma
        return fields.slice(0,fields.length - 1);

        //return '';
      }

      function fbDataType(type){

        if(type !== 'checkbox' && type !== 'number'){
          return 'newData.isString()'
        }
        if(type == 'checkbox'){
          return 'newData.isBoolean()'
        }
        if(type == 'number'){
          return 'newData.isNumber()'
        }

        return '';

      }

      function fbRequired(required){
        if(required){
          return " && newData.val() != ''";
        }
        return '';
      }

      var begin = '{' + newline
        + '"' + underScore(form.name) + '": {' + newline
        + tab + '"$' + underScore(form.name) + '": {' + newline
        + tab + tab + '".read": true,' + newline
        + tab + tab + '".write": true,' + newline
        + tab + tab + '".validate": "newData.hasChildren([' + fbRequiredFieldsString() + '])",' + newline;

      //fields
      function fieldValidations(){
        var fields = '';

        form.fields.forEach(function(field){
          fields += tab + tab + '"' + underScore(field.display_name) +  '": {' + newline
            + tab + tab + tab + '".validate": "' + fbDataType(field.input_type) + fbRequired(field.required) + '"},' + newline;
        });

        //slice off last comma
        return fields.slice(0,fields.length - 2) + newline;
      }

      var end = tab + tab + '}' + newline + tab + '}' + newline + '}';

      return begin + fieldValidations() + end;

    };

    // Public API here
    return {
      outputTypes: {
        frontend: [
          {name: 'html', type: 'html'},
          {name: 'angular', type: 'angular'}
        ],
        backend: [
          {name: 'mongoose schema', type: 'mongoose'},
          {name: 'firebase security', type: 'firebase'}
        ]
      },

      outputFunction: function (form, style) {
        switch(style){
          case 'html':
            return htmlOutput(form);
          case 'angular':
            return angularOutput(form);
          case 'mongoose':
            return mongooseOutput(form);
          case 'firebase':
            return firebaseOutput(form);
        }

        return 'no output'
      }
    };
  });
