'use strict';

angular.module('quickFormApp')
  .controller('ModelbuilderCtrl', function ($scope, $http, $modal, $compile, inputTypes, outputfactory ) {

    //designer field types
    $scope.inputTypes = inputTypes.inputTypes;
    $scope.outputButtons = outputfactory.outputTypes;

    // preview form mode
    $scope.previewForm = {};
    $scope.previewMode = false;

    //defaults
    $scope.element = {
      name: '',
      fields: []
    };
    $scope.style = {type:'html'};

    var newFieldId = function(){

      var index = $scope.element.fields.length;

      if(index > 0){
        return $scope.element.fields[$scope.element.fields.length - 1].field_id + 1
      }

      return 1;

    };

    // add form field
    $scope.addNewField = function(type){

      var newField = {
        "field_id" : newFieldId(),
        "field_title" : type,
        "field_type" : type,
        "field_value" : '',
        "field_required" : false
      };

      // put newField into fields array
      $scope.element.fields.push(newField);

    };
    $scope.deleteField = function (field_id){

      for(var i = 0; i < $scope.element.fields.length; i++){
        if($scope.element.fields[i].field_id == field_id){
          $scope.element.fields.splice(i, 1);
          break;
        }
      }
    };
    $scope.reset = function (){
      $scope.element.name = '';
      $scope.element.fields.splice(0, $scope.element.fields.length);
    };

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

    //output
    $scope.codeSource = function(element, style){

      return outputfactory.outputFunction(element, style);

    };

    // preview form
    $scope.previewOn = function(element){

      var modalInstance = $modal.open({
        templateUrl: './views/formPreview.html',
        controller: ModalInstanceCtrl,
        resolve: {
          form: function(){
            return element;
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