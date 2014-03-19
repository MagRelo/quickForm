 'use strict';

angular.module('quickFormApp')
  .factory('outputFunctions', function () {

    function underScore(inputString){
      return inputString.replace(/ /g, '_');
    }
    var newline = String.fromCharCode(13);
    var tab = '  ';

    var htmlOutput = function(form, cssStyle, jsStyle){

      function angularFormAttr(form){
        if(jsStyle == 'angular'){
          return ' data-ng-submit="submit' + underScore(form.name) + '(' + underScore(form.name) + ')"';
        }
       return ''
      }
      function angularInputAttr(field){
        if(jsStyle == 'angular'){
          return 'data-ng-model="' + underScore(form.name) + '.' + underScore(field.display_name) + '" ';
        }
        return '';
      }

      function labelClass(){
        if(cssStyle == 'bootstrap'){
          return 'class="control-label" ';
        }
        return ''
      }
      function inputClass(){
        if(cssStyle == 'bootstrap'){
          return 'class="form-control" ';
        }
        return ''
      }
      function fieldGroupClass(){
        if(cssStyle == 'bootstrap'){
          return ' class="form-group"';
        }
        return '';
      }

      function labelAttrs(field){
        return 'for="' + field.id + '"';
      }
      function inputAttrs(field){
        var attrs = 'id="' + field.id + '" '
          + 'name="' + field.name + '" '
          + (field.value ? field.value !== '' ? ' value="' + field.value + '" ' :'':'')
          + (field.placeholder ? field.placeholder.value !== '' ? ' placeholder="' + field.placeholder.value + '" ' :'':'')
          + (field.checked ? 'checked = ' + field.checked.value + ' ' :'')
          + (field.min ? field.min.value !== '' ? ' min="' + field.min.value + '" ' :'':'')
          + (field.max ? field.max.value !== '' ? ' max="' + field.max.value + '" ' :'':'')
          + (field.maxlength ? field.maxlength.value !== '' ? ' maxlength="' + field.maxlength.value + '" ' :'':'')
          + (field.pattern ? field.pattern.value !== '' ? ' pattern="' + field.pattern.value + '" ' :'':'')
          + (field.required ? 'required ':'')

          //angular stuff
          + angularInputAttr(field)
          ;

        return attrs.trim();
      }

      function selectOptions(field){
        var optionsString = newline;
        angular.forEach(field.options, function(option){
          optionsString += tab + tab + tab + ' <option value="' + option.name + '">'+ option.name +'</option>' + newline
        });
        return optionsString
      }

      function labelElement(field){
        return '<label ' + labelClass() + labelAttrs(field) + '>' +  field.display_name + '</label>'
      }
      function inputElement(field){

        //dropdown
        if(field.input_type == 'dropdown'){
           return '<select ' + inputClass() + inputAttrs(field) + '>'
             + selectOptions(field)
             + tab + tab + '</select>';
        }

        //radio
        if(field.input_type == 'radio'){
          var radioString = '';
          angular.forEach(field.options, function(option){
            radioString += '<input type="radio" name="' + field.name +'" ' + 'value="' + option.name + '">' + option.name + newline + tab + tab
          });
          return radioString.trim()
        }

        //textarea
        if(field.input_type == 'textarea'){
          return '<textarea rows="3" ' + inputClass() + inputAttrs(field) + '></textarea>'
        }

        //standard input
        return '<input '+ inputClass() + 'type="' + field.input_type + '" '  + inputAttrs(field) + '>'
      }

      function fieldSet(fields){

        var fieldsString = '';
        angular.forEach(fields, function(field){

          //wrapper open
          fieldsString += tab + '<div' + fieldGroupClass() + '>' + newline;

          //label
          fieldsString += tab + tab + labelElement(field) + newline;

          //input
          fieldsString += tab + tab + inputElement(field) + newline;

          //wrapper close
          fieldsString += tab + '</div>' + newline;

          //white space
          fieldsString += newline;

        });

        return fieldsString;
      }

      return '<form role="form" name="' + underScore(form.name) + 'Form"' + angularFormAttr(form) + '>' + newline + newline
        //legend
        + tab + '<legend>' + form.name + '</legend>' + newline + newline
        //fields
        + fieldSet(form.fields)
        //button
        + tab + '<button type="submit">Submit</button>' + newline + newline
        //close form
        + '</form>'

    };

    var mongooseOutput = function(form){

      function mgRequired(required){
        if(required){
          return ', required: true'
        }
        return ''
      }

      function mgDataType(dataType){

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

        return 'String'
      }

      var fileBegin =  "'use strict';" + newline
        + "var mongoose = require('mongoose');" + newline
        + "Schema = mongoose.Schema;" + newline + newline
        + "/**" + newline
        + "* " + form.name + " Schema" + newline
        + "*/" + newline


      var model = function(){
        var modelString = "var " + underScore(form.name) + "Schema = new Schema({" + newline;

        //add fields
        angular.forEach(form.fields, function(field){
          modelString += tab + underScore(field.display_name) + ": " + '{type: '
            + mgDataType(field.input_type)
            + mgRequired(field.required)
            + '}' + "," + newline;
        });

        //close Schema
        modelString += "});" + newline + newline;

        return modelString
      };

      var validationsComment = "/**" + newline
        + "*  Validations" + newline
        + "*/" + newline;

      var validations = function(){
        var validationString = '';

        angular.forEach(form.fields, function(field){
          validationString += underScore(form.name) + "Schema" + '.schema.path("' + underScore(field.display_name) + '").validate(function (value) {' + newline
            + tab + '//insert validation here' + newline
            + '}, "Invalid message");' + newline + newline;
        });

        return validationString
      };

      var initializeComment = "/**" + newline
        + "*  Initialize" + newline
        + "*/" + newline;

      var initialize = "mongoose.model('" + underScore(form.name) + "', " + underScore(form.name) + "Schema);";

      return fileBegin + model() + validationsComment + validations(); // + initializeComment + initialize
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
      outputOptions: [

        {name: 'html',
          options: [
            {name: 'bootstrap', value: false},
            {name: 'angular', value: false}]
          }
        ,
        {name: 'mongoose',
          options: []
        },
        {name: 'firebase',
          options: []
        }
      ],

      outputFunction: function (form, outputType, cssStyle, jsStyle) {

        switch(outputType){
          case 'html':
            return htmlOutput(form, cssStyle, jsStyle);
          case 'mongoose':
            return mongooseOutput(form);
          case 'firebase':
            return firebaseOutput(form);
        }

        return 'no output'
      }
    };
  });
