'use strict';

angular.module('quickFormApp')
  .service('formData', function formData() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //default data
    this.name = "Community Event";
    this.fields = [
      {"display_name":"Event Name","display_priority":"10","display_common":true,"input_type":"text","name":"","id":"","value":"","placeholder":"","required":true,"pattern":"","attributes":[{"type":"number","name":"maxlength"}]},
      {"display_name":"Location","display_priority":"10","display_common":true,"input_type":"text","name":"","id":"","value":"","placeholder":"","required":true,"pattern":"","attributes":[{"type":"number","name":"maxlength"}]},
      {"display_name":"Event Date","display_priority":"30","display_common":true,"input_type":"date","name":"","id":"","value":"","placeholder":"","required":true,"pattern":"","attributes":[{"type":"number","name":"min"},{"type":"number","name":"max"},{"type":"number","name":"step"}]},
      {"display_name":"Organizer","display_priority":"10","display_common":true,"input_type":"text","name":"","id":"","value":"","placeholder":"","required":false,"pattern":"","attributes":[{"type":"number","name":"maxlength"}]},
      {"display_name":"Organizer Email","display_priority":"20","display_common":true,"input_type":"email","name":"","id":"","value":"","placeholder":"","required":false,"pattern":"","attributes":[{"type":"number","name":"maxlength"},{"type":"boolean","name":"multiple"}]},
      {"display_name":"Expected turnout","display_priority":"55","display_common":"true","input_type":"number","name":"","id":"","value":"","placeholder":"","required":false,"pattern":"","attributes":[{"type":"number","name":"min"},{"type":"number","name":"max"},{"type":"number","name":"step"}]}
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
