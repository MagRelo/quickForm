'use strict';

angular.module('quickFormApp')
  .factory('outputfactory', function () {

    var newline = String.fromCharCode(13);
    var tab = '  ';

    var htmlOutput = function(element){

      var formBegin = '<form name="' + element.name + 'Form">' +
        newline + newline +
        tab + '<legend>' + element.name + '</legend>'
        + newline + newline;

      var fields = function(element){
        var fieldsRaw = '';

        for(var i = 0; i< element.fields.length; i++){

          //label
          fieldsRaw += tab + '<label for="'+  element.fields[i].field_id + '">' + element.fields[i].field_title + '</label>' + newline;

          //input
          fieldsRaw += tab + '<input type="' + element.fields[i].field_type + '" id="' + element.fields[i].field_id + '"' + (element.fields[i].field_required ? ' required':'') + '>' + newline;

          fieldsRaw += newline;

        }

        return fieldsRaw;

      };

      var button = tab + '<button type="submit">Submit</button>' + newline + newline;

      var formEnd = '</form>';

      return formBegin + fields(element) + button + formEnd;
    };

    var angularOutput = function(element){

      var formBegin = '<form name="' + element.name + 'Form" data-ng-submit="submit' + element.name + '('+ element.name +')" novalidate>' +
        newline + newline +
        tab + '<legend>' + element.name + '</legend>'
        + newline + newline;

      var formEnd = '</form>';

      var fields = function(element){
        var fieldsRaw = '';

        for(var i = 0; i< element.fields.length; i++){

          //label
          fieldsRaw += tab + '<label for="'+  element.fields[i].field_id + '">' + element.fields[i].field_title + '</label>' + newline;

          //input
          fieldsRaw += tab + '<input type="' + element.fields[i].field_type + '" id="' + element.fields[i].field_id + '"' + ' data-ng-model="' + element.name + '.' +  element.fields[i].field_title.replace(/ /g, '') + '"' + (element.fields[i].field_required ? ' required':'') + '>' + newline;

          fieldsRaw += newline;

        }

        return fieldsRaw;

      };

      var button = tab + '<button type="submit">Submit</button>' + newline + newline;

      return formBegin + fields(element) + button + formEnd;
    };

    var mongooseOutput = function(element){

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
        + "* " + element.name + " Schema" + newline
        + "*/" + newline
        + " var " + element.name + "Schema = new Schema({" + newline;

      var model = function(){
        var modelRaw = '';
        for(var i = 0; i< element.fields.length; i++){

          modelRaw += tab + element.fields[i].field_title + ": " + '{type: '
            + mgDataType(element.fields[i].field_type)
            + mgRequired(element.fields[i].field_required)
            + '}' + "," + newline
          }

        modelRaw += "});" + newline + newline;
        return modelRaw
      };

      var validations = "/**" + newline
        + "*  Validations" + newline
        + "*/" + newline + newline;

      var initialize = "mongoose.model('" + element.name + "', " + element.name + "Schema);";

      return fileBegin + model() + validations + initialize
    };

    var firebaseOutput = function(element){

      function fbRequiredFieldsString(){

        var fields = '';
        element.fields.forEach(function(field){

          if(field.field_required){
            fields += "'" + field.field_title.replace(/\s+/g, '') + "',";
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

      var begin = '"' + element.name + '": {' + newline
        + tab + '"$' + element.name + '": {' + newline
        + tab + tab + '".read": true,' + newline
        + tab + tab + '".write": true,' + newline
        + tab + tab + '".validate": "newData.hasChildren([' + fbRequiredFieldsString() + '])",' + newline;

      //fields
      function fieldValidations(){
        var fields = '';

        element.fields.forEach(function(field){
          fields += tab + tab + '"' + field.field_title +  '": {' + newline
            + tab + tab + tab + '".validate": "' + fbDataType(field.field_type) + fbRequired(field.field_required) + '"},' + newline;
        });

        //slice off last comma
        return fields.slice(0,fields.length - 2) + newline;
      }

      var end = tab + '}' + newline + '}' + newline;

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
          {name: 'mongoose', type: 'mongoose'},
          {name: 'firebase', type: 'firebase'}
        ]
      },

      outputFunction: function (element, style) {
        switch(style){
          case 'html':
            return htmlOutput(element);
          case 'angular':
            return angularOutput(element);
          case 'mongoose':
            return mongooseOutput(element);
          case 'firebase':
            return firebaseOutput(element);
        }

        return 'no output'
      }
    };
  });
