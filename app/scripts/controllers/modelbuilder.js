'use strict';

angular.module('quickFormApp')
  .controller('ModelbuilderCtrl', function ($scope, $http, $compile, fieldTypes ) {

    //designer field types
    $scope.fieldTypes = fieldTypes.fieldTypes;


    //element defaults
    $scope.element = {
      name: '',
      fields: []
    };

    // add form field
    $scope.addNewField = function(type){

      var newField = {
        "field_id" : '',
        "field_title" : type,
        "field_type" : type,
        "field_value" : '',
        "field_required" : false
      };

      // put newField into fields array
      $scope.element.fields.push(newField);

    };
    $scope.deleteField = function (field_id){
      for(var i = 0; i < $scope.form.form_fields.length; i++){
        if($scope.form.form_fields[i].field_id == field_id){
          $scope.form.form_fields.splice(i, 1);
          break;
        }
      }
    };
    $scope.reset = function (){
      $scope.form.form_fields.splice(0, $scope.form.form_fields.length);
      $scope.addField.lastAddedID = 0;
    }

    // decides whether field options block will be shown (true for dropdown and radio fields)
    $scope.showAddOptions = function (field){
      return (field.field_type == "radio" || field.field_type == "dropdown")
    };

    //field options
    $scope.addOption = function (field){

      if(!field.field_options){
        field.field_options = new Array();
      }

      var lastOptionID = 0;

      if(field.field_options[field.field_options.length-1]){
        lastOptionID = field.field_options[field.field_options.length-1].option_id;
      }

      // new option's id
      var option_id = lastOptionID + 1;

      var newOption = {
        "option_id" : option_id,
        "option_title" : "Option " + option_id,
        "option_value" : option_id
      };

      // put new option into field_options array
      field.field_options.push(newOption);
    };
    $scope.deleteOption = function (field, option){
      for(var i = 0; i < field.field_options.length; i++){
        if(field.field_options[i].option_id == option.option_id){
          field.field_options.splice(i, 1);
          break;
        }
      }
    };

    $scope.htmlSource = function(element){

      var formBegin = '<form name="' + element.name + '">';
      var formEnd = '</form>';

      var fields = function(element){

        var fieldsRaw = '';

        for(var i = 0; i< element.fields.length; i++){

          //label
          fieldsRaw += '<label>' + element.fields[i].field_title + '</label>';

          //input
          fieldsRaw += '<input type="' + element.fields[i].field_type + '">';

        }

        return fieldsRaw;

      };

      return formBegin + fields(element) + formEnd;

    };
  });
