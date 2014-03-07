'use strict';

angular.module('quickFormApp')
  .factory('outputfactory', function () {


    var htmlOutput = function(element){
      var newline = String.fromCharCode(13);
      var tab = String.fromCharCode(9);

      var formBegin = '<form name="' + element.name + 'Form">' +
        newline + newline +
        tab + '<legend>' + element.name + '</legend>'
        + newline + newline;

      var formEnd = '</form>';
      var fieldsRaw = '';

      var fields = function(element){

        for(var i = 0; i< element.fields.length; i++){

          //label
          fieldsRaw += tab + '<label for="'+  element.fields[i].field_id + '">' + element.fields[i].field_title + '</label>' + newline;

          //input
          fieldsRaw += tab + '<input type="' + element.fields[i].field_type + '" id="' + element.fields[i].field_id + '"' + (element.fields[i].field_required ? ' required':'') + '>' + newline;

          fieldsRaw += newline;

        }

        return fieldsRaw;

      };

      return formBegin + fields(element) + formEnd;
    };

    var angularOutput = function(element){
      var newline = String.fromCharCode(13);
      var tab = String.fromCharCode(9);

      var formBegin = '<form name="' + element.name + 'Form" novalidate>' +
        newline + newline +
        tab + '<legend>' + element.name + '</legend>'
        + newline + newline;

      var formEnd = '</form>';
      var fieldsRaw = '';

      var fields = function(element){

        for(var i = 0; i< element.fields.length; i++){

          //label
          fieldsRaw += tab + '<label for="'+  element.fields[i].field_id + '">' + element.fields[i].field_title + '</label>' + newline;

          //input
          fieldsRaw += tab + '<input type="' + element.fields[i].field_type + '" id="' + element.fields[i].field_id + '"' + ' data-ng-model="' + element.name + '.' +  element.fields[i].field_title.replace(/ /g, '') + '"' + (element.fields[i].field_required ? ' required':'') + '>' + newline;

          fieldsRaw += newline;

        }

        return fieldsRaw;

      };

      return formBegin + fields(element) + formEnd;
    };

    var mongooseOutput = function(element){
      var newline = String.fromCharCode(13);
      var tab = String.fromCharCode(9);

      var fileBegin =  "'use strict';" + newline
                      + "var mongoose = require('mongoose')," + newline
                      + "Schema = mongoose.Schema;" + newline + newline

      var model = function(){

        var modelRaw = "/**" + newline
        + "* " + element.name + " Schema" + newline
        + "*/" + newline
        + " var plutoPOIschema = new Schema({" + newline;

        for(var i = 0; i< element.fields.length; i++){

          modelRaw += tab + element.fields[i].field_title + ":" + element.fields[i].field_title + "," + newline

        }

        modelRaw += "});" + newline + newline;

        return modelRaw


      };

      var validations = "";

      var initialize = "";

      return fileBegin + model(element) + validations + initialize
    };

    // Public API here
    return {

      buttons: [
        {name: 'html form', type: 'html'}
        ,{name: 'html + angular form', type: 'angular'}
        ,{name: 'mongoose', type: 'mongoose'}
        ,{name: 'firebase', type: 'firebase'}
      ],

      //wrapper for functions
      output: function (element, style) {
        switch(style){
          case 'html':
            return htmlOutput(element);
          case 'angular':
            return angularOutput(element);
          case 'mongoose':
            return mongooseOutput(element);
        }

        return 'no output'
      }
    };
  });
