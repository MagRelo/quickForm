'use strict';

angular.module('quickFormApp')
  .service('formData', function formData() {
    // AngularJS will instantiate a singleton by calling "new" on this function

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
      ],
      "$$hashKey": "05B"
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
      "$$hashKey": "05N"
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
      ],
      "$$hashKey": "05T"
    },
    {
      "display_name": "Contact Type",
      "display_priority": "40",
      "display_common": false,
      "input_type": "dropdown",
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
          "value": "option 1",
          "$$hashKey": "063"
        },
        {
          "name": "Supplier",
          "value": "option 2",
          "$$hashKey": "064"
        },
        {
          "name": "Employee",
          "value": "option 3",
          "$$hashKey": "065"
        }
      ],
      "$$hashKey": "05Z"
    }
  ];


    this.clearForm = function(){
      this.name = '';
      this.fields = [];
    };

    this.addField = function(object){

      var newFieldObject = {};
      angular.copy(object, newFieldObject);
      this.fields.push(newFieldObject);

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
