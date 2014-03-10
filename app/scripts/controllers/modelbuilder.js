'use strict';

angular.module('quickFormApp')
  .controller('ModelbuilderCtrl', function ($scope, $http, $modal, $compile, inputTypes, outputfactory ) {

    //designer field types
    $scope.inputTypes = inputTypes.inputTypes;


    // preview form mode
    $scope.previewForm = {};
    $scope.previewMode = false;

    //defaults
    $scope.form = {
      name: '',
      fields: []
    };
    $scope.style = {type:'html'};

    var newFieldId = function(){

      var index = $scope.form.fields.length;

      if(index > 0){
        return $scope.form.fields[$scope.form.fields.length - 1].field_id + 1
      }

      return 1;

    };

    $scope.showFieldOptions = function(type){
      var options = false;
      angular.forEach(inputTypes.inputTypes, function(input){
        if(type == input.input_type){
          options = input.options;
        }
      });

      return options;
    };

    // add form field
    $scope.addNewField = function(type){

      var newField = {
        "field_id" : newFieldId(),
        "field_title" : type,
        "field_type" : type,
        "field_value" : '',
        "field_required": false,
        "field_hasOptions": $scope.showFieldOptions(type)
      };

      // put newField into fields array
      $scope.form.fields.push(newField);

    };
    $scope.deleteField = function (field_id){

      for(var i = 0; i < $scope.form.fields.length; i++){
        if($scope.form.fields[i].field_id == field_id){
          $scope.form.fields.splice(i, 1);
          break;
        }
      }
    };
    $scope.reset = function (){
      $scope.form.name = '';
      $scope.form.fields.splice(0, $scope.form.fields.length);
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

    // modal preview form
    $scope.previewOn = function(form){

      var modalInstance = $modal.open({
        templateUrl: './views/formPreview.html',
        controller: ModalInstanceCtrl,
        resolve: {
          form: function(){
            return form;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });

    };
    $scope.previewOff = function(){
      $scope.previewMode = !$scope.previewMode;
    }

    //output
    $scope.outputButtons = outputfactory.outputTypes;
    $scope.codeSource = function(form, style){
      return outputfactory.outputFunction(form, style);
    };



  });

//modal preview window controller
var ModalInstanceCtrl = function ($scope, $modalInstance, form) {

  $scope.form = form;

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};