'use strict';



angular.module('quickFormApp')
  .service('formData', function formData() {

    //default
    this.name = "New Contact";
    this.fields = [
        {
          "display_name": "Name",
          "display_priority": "10",
          "display_common": true,
          "input_type": "text",
          "name": "1_Text",
          "id": 1,
          "value": "",
          "placeholder": {
            "value": ""
          },
          "required": true,
          "pattern": {
            "value": "",
            "regex": ""
          },
          "maxlength": {
            "value": ""
          }
        },
        {
          "display_name": "Telephone Number",
          "display_priority": "40",
          "display_common": false,
          "input_type": "tel",
          "name": "2_Telephone",
          "id": 2,
          "value": "",
          "placeholder": {
            "value": ""
          },
          "required": false,
          "pattern": {
            "value": "",
            "regex": ""
          },
          "maxlength": {
            "value": ""
          }
        },
        {
          "display_name": "Email Address",
          "display_priority": "20",
          "display_common": true,
          "input_type": "email",
          "name": "3_Email",
          "id": 3,
          "value": "",
          "placeholder": {
            "value": ""
          },
          "required": false,
          "pattern": {
            "value": "",
            "regex": ""
          },
          "maxlength": {
            "value": ""
          },
          "multiple": {
            "value": true
          }
        },
        {
          "display_name": "Contact Type",
          "display_priority": "40",
          "display_common": false,
          "input_type": "dropdown",
          "name": "4_Dropdown_List",
          "id": 4,
          "value": "",
          "required": true,
          "options": [
            {
              "name": "Customer",
              "value": "option 1",
              "$$hashKey": "02J"
            },
            {
              "name": "Supplier",
              "value": "option 2",
              "$$hashKey": "02K"
            },
            {
              "name": "Employee",
              "value": "option 3",
              "$$hashKey": "02L"
            }
          ]
        }
      ];


    this.idExists = function(id){
      var exists = false;
      angular.forEach(this.fields, function(field){
        if(id === field.id){
          exists = true
        }
      });
      return exists;
    };

    this.uniqueFieldId = function(testId){
      while(this.idExists(testId)){
        testId += 1;
      }
      return testId;
    };

    this.clearForm = function(){
      this.name = '';
      this.fields = [];
    };

    this.addField = function(object){

      //get new object
      var fieldObject = {};
      angular.copy(object, fieldObject);

      //get unique index
      fieldObject.id = this.uniqueFieldId(this.fields.length + 1);
      fieldObject.name = fieldObject.id + '_' + fieldObject.display_name.replace(/ /g, '_')

      //add to field array
      this.fields.push(fieldObject);

    };

    this.removeField = function(index){

      this.fields.splice(index, 1)

    };

    this.addOption = function(fieldIndex, optionData){

      this.fields[fieldIndex].options.push(optionData)

    };

    this.deleteOption = function(fieldIndex, optionIndex){

      this.fields[fieldIndex].options.splice(optionIndex, 1)

    };

    this.displayValue =  function(fieldName){
      var displayName = '';

      angular.forEach(this.fields, function(field){
        if(field.name === fieldName){
          displayName = field.display_name;
        }
      });

      return displayName;
    };

    return this;
  });

