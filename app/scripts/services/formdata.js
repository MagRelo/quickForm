'use strict';

angular.module('quickFormApp')
  .service('formData', function formData() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //defaults
    this.name = "Community Event";
    this.fields = [{"display_name":"Event Name","display_priority":"10","display_common":true,"input_type":"text","name":"","id":"","value":"","placeholder":"","required":true,"pattern":"","attributes":[{"type":"number","name":"maxlength"}],"options":{},"$$hashKey":"01D"},{"display_name":"Location","display_priority":"10","display_common":true,"input_type":"text","name":"","id":"","value":"","placeholder":"","required":true,"pattern":"","attributes":[{"type":"number","name":"maxlength"}],"options":{},"$$hashKey":"01J"},{"display_name":"Event Date","display_priority":"30","display_common":true,"input_type":"date","name":"","id":"","value":"","placeholder":"","required":true,"pattern":"","attributes":[{"type":"number","name":"min"},{"type":"number","name":"max"},{"type":"number","name":"step"}],"$$hashKey":"01P"},{"display_name":"Organizer","display_priority":"10","display_common":true,"input_type":"text","name":"","id":"","value":"","placeholder":"","required":false,"pattern":"","attributes":[{"type":"number","name":"maxlength"}],"options":{},"$$hashKey":"04T"},{"display_name":"Organizer Email","display_priority":"20","display_common":true,"input_type":"email","name":"","id":"","value":"","placeholder":"","required":false,"pattern":"","attributes":[{"type":"number","name":"maxlength"},{"type":"boolean","name":"multiple"}],"$$hashKey":"04Z"},{"display_name":"Expected turnout","display_priority":"55","display_common":"true","input_type":"number","name":"","id":"","value":"","placeholder":"","required":false,"pattern":"","attributes":[{"type":"number","name":"min"},{"type":"number","name":"max"},{"type":"number","name":"step"}],"$$hashKey":"055"}]

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

    this.removeOption = function(fieldIndex, optionIndex){

      this.fields[fieldIndex].options.splice(optionIndex, 1)

    };

    return this;
  });
