'use strict';



angular.module('quickFormApp')
  .service('formData', function formData() {

    //default
    this.name = "Contact",
    this.fields = [
      {
        "display_name": "Name",
        "display_priority": "10",
        "display_common": true,
        "input_type": "text",
        "name": "",
        "id": "",
        "value": "",
        "placeholder": {
          "text": ""
        },
        "required": true,
        "pattern": {
          "text": "",
          "regex": ""
        },
        "attributes": [
          {
            "type": "number",
            "name": "maxlength"
          }
        ]
      },
      {
        "display_name": "Email",
        "display_priority": "20",
        "display_common": true,
        "input_type": "email",
        "name": "",
        "id": "",
        "value": "",
        "placeholder": {
          "text": ""
        },
        "required": false,
        "pattern": {
          "text": "",
          "regex": ""
        },
        "attributes": [
          {
            "type": "number",
            "name": "maxlength"
          },
          {
            "type": "boolean",
            "name": "multiple"
          }
        ],
      },
      {
        "display_name": "Telephone",
        "display_priority": "40",
        "display_common": false,
        "input_type": "tel",
        "name": "",
        "id": "",
        "value": "",
        "placeholder": {
          "text": ""
        },
        "required": false,
        "pattern": {
          "text": "",
          "regex": ""
        },
        "attributes": [
          {
            "type": "number",
            "name": "maxlength"
          }
        ]
      },
      {
        "display_name": "Contact Type",
        "display_priority": "40",
        "display_common": false,
        "input_type": "radio",
        "name": "",
        "id": "",
        "value": "",
        "placeholder": {
          "text": ""
        },
        "required": true,
        "options": [
          {
            "name": "Customer",
            "value": "option 1"
          },
          {
            "name": "Supplier",
            "value": "option 2"
          },
          {
            "name": "Employee",
            "value": "option 3"
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
      fieldObject.name = fieldObject.display_name.replace(/ /g, '_') + fieldObject.id;

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

    return this;
  });

