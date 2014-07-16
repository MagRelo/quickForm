'use strict';

angular.module('quickFormApp', [
  'ngRoute',
  'ui.bootstrap',
  'hljs'
])


  //common config
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/main.html'
      })
      .otherwise({
        redirectTo: '/'
    });
  }])

  //formbuilder config
  .config(['$provide', '$routeProvider', function($provide, $routeProvider) {
    $routeProvider
      .when('/formbuilder', {
        templateUrl: 'components/formbuilder/formbuilder.html'
      });

  }])

  //formpreview config
  .config(['$provide', '$routeProvider', function($provide, $routeProvider) {
    $routeProvider
      .when('/formpreview', {
        templateUrl: 'components/formpreview/formPreview.html'
      });





    $provide.decorator('ngModelDirective', ['$delegate', function($delegate) {

      var ngModel = $delegate[0], controller = ngModel.controller;

      ngModel.controller = ['$scope', '$element', '$attrs', '$injector', function(scope, element, attrs, $injector) {

        //use $injector to get the interpolate service
        var $interpolate = $injector.get('$interpolate');

        //use the $interpolate service to evaluate the name expression and set attribute
        attrs.$set('name', $interpolate(attrs.name  || '')(scope));


        if(scope.field){
          this.mgl_displayName = scope.field.display_name || '';
        }

        this.mgl_displayErrorIcon = function(){

          return this.$dirty && this.$invalid;
        };


        this.mgl_displaySuccessIcon = function(){

          return this.$valid && this.$dirty && this.$modelValue !== '';
        };

        this.mgl_errorArray = function(){
          var errorFields = [];

          //angular.forEach(this.function)
        };


        //invoke will use these locals first
        $injector.invoke(controller, this, {
          '$scope': scope,
          '$element': element,
          '$attrs': attrs
        });
      }];

      return $delegate;
    }]);


//    $provide.decorator('formDirective', function($delegate) {
//
//      var directive = $delegate[0];
//      var controllerFunction = directive.controller;
//
//      directive.controller[5] = controllerFunction;
//
//      return $delegate;
//    });


  }])

  //output config
  .config(['$provide', '$routeProvider', function($provide, $routeProvider) {
    $routeProvider
      .when('/output', {
        templateUrl: 'components/output/output.html'
      });

  }])

;

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


'use strict';

angular.module('quickFormApp')
  .factory('inputTypes', function () {

    return {

      inputTypes:[

        {
          display_name : 'Checkbox',
          display_priority: '30',
          display_common: false,
          input_type: 'checkbox',
          name: '',
          id: '',
          value: '',
          checked: {
            value: false
          }
        },

        {
          display_name : 'Color',
          display_priority: '80',
          display_common: false,
          input_type: 'color',
          name: '',
          id: '',
          value: '',
          required: false
        },

        {
          display_name : 'Date',
          display_priority: '20',
          display_common: true,
          input_type: 'date',
          name: '',
          id: '',
          value: '',
          min: {
            value: ''
          },
          max: {
            value: ''
          },
          required: false
        },

        {
          display_name : 'Dropdown List',
          display_priority: '40',
          display_common: false,
          input_type: 'dropdown',
          name: '',
          id: '',
          value: '',
          required: false,
          options: [
            {name: 'option 1', value: 'option 1'},
            {name: 'option 2', value: 'option 2'},
            {name: 'option 3', value: 'option 3'}
          ]
        },

        {
          display_name : 'Email',
          display_priority: '40',
          display_common: true,
          input_type: 'email',
          name: '',
          id: '',
          value: '',
          placeholder: {
            value: ''
          },
          required: false,
          pattern: {
            value: '', regex: ''
          },
          maxlength: {
            value: ''
          },
          multiple: {
            value: true
          }
        },

        {
          display_name : 'Month',
          display_priority: '75',
          display_common: false,
          input_type: 'month',
          name: '',
          id: '',
          value: '',
          min: {
            value: ''
          },
          max: {
            value: ''
          },
          required: false
        },

        {
          display_name : 'Number',
          display_priority: '30',
          display_common: true,
          input_type: 'number',
          name: '',
          id: '',
          value: '',
          min: {
            value: ''
          },
          max: {
            value: ''
          },
          required: false
        },

        {
          display_name : 'Password',
          display_priority: '40',
          display_common: false,
          input_type: 'password',
          name: '',
          id: '',
          value: '',
          required: false,
          maxlength: {
            value: ''
          }
        },

        {
          display_name : 'Radio group',
          display_priority: '90',
          display_common: false,
          input_type: 'radio',
          name: '',
          id: '',
          value: '',
          required: false,
          options: [
            {name: 'option 1', value: 'option 1'},
            {name: 'option 2', value: 'option 2'},
            {name: 'option 3', value: 'option 3'}
          ]
        },

        {
          display_name : 'Range',
          display_priority: '60',
          display_common: false,
          input_type: 'range',
          name: '',
          id: '',
          value: '',
          min: {
            value: ''
          },
          max: {
            value: ''
          },
          required: false
        },

        {
          display_name : 'Telephone',
          display_priority: '20',
          display_common: false,
          input_type: 'tel',
          name: '',
          id: '',
          value: '',
          placeholder: {
            value: ''
          },
          required: false,
          pattern: {
            value: '', regex: ''
          },
          maxlength: {
            value: ''
          }
        },

        {
          display_name : 'Text',
          display_priority: '10',
          display_common: true,
          input_type: 'text',
          name: '',
          id: '',
          value: '',
          placeholder: {
            value: ''
          },
          required: false,
          pattern: {
            value: '', regex: ''
          },
          maxlength: {
            value: ''
          }
        },

        {
          display_name : 'Text Area',
          display_priority: '90',
          display_common: false,
          input_type: 'textarea',
          name: '',
          id: '',
          value: '',
          required: false
        },

        {
          display_name : 'Time',
          display_priority: '76',
          display_common: false,
          input_type: 'time',
          name: '',
          id: '',
          value: '',
          min: {
            value: ''
          },
          max: {
            value: ''
          },
          required: false
        },

        {
          display_name : 'URL',
          display_priority: '50',
          display_common: false,
          input_type: 'url',
          name: '',
          id: '',
          value: '',
          placeholder: {
            value: ''
          },
          required: false,
          pattern: {
            value: '', regex: ''
          },
          maxlength: {
            value: ''
          }
        },

        {
          display_name : 'Week',
          display_priority: '72',
          display_common: false,
          input_type: 'week',
          name: '',
          id: '',
          value: '',
          min: {
            value: ''
          },
          max: {
            value: ''
          },
          required: false
        }


      ]
    }

  });



'use strict';

angular.module('quickFormApp')
  .controller('FormbuilderCtrl', ['$scope', 'inputTypes','formData',
    function ($scope, inputTypes, formData) {

      //input types
      $scope.inputTypes = inputTypes.inputTypes;


      //form data and form builder functions
      $scope.formData = formData;

    }

  ]);

'use strict';

angular.module('quickFormApp')
  .directive('quickFormField', ['$http', '$compile', function ($http, $compile) {

    var linkFunction;
    linkFunction = function (scope, element) {

      //angular-ui calendar setup
      if (scope.field.input_type == 'date' || scope.field.input_type == 'month' || scope.field.input_type == 'week') {

        //Date
        scope.today = function () {
          scope.dt = new Date();
        };
        scope.today();

        scope.showWeeks = false;
        scope.toggleWeeks = function () {
          scope.showWeeks = !scope.showWeeks;
        };

        scope.clear = function () {
          scope.dt = null;
        };

        scope.open = function (event) {
          event.preventDefault();
          event.stopPropagation();
          scope.opened = !scope.opened;
        };

        scope.dateOptions = {
          'year-format': "'yyyy'",
          'starting-day': 1
        };

        scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
        scope.format = scope.formats[0];
      }

      //set template URL
      var templateUrl = './components/formpreview/inputTemplates/' + scope.field.input_type + '.html';

      //get template
      $http.get(templateUrl).success(function (data) {
        element.html(data);
        $compile(element.contents())(scope);
      });

    };

    return {
      restrict: 'E',
      link: linkFunction
    };
  }]);

'use strict';

angular.module('quickFormApp')
  .controller('FormpreviewCtrl', ['$scope', 'formData',
    function ($scope, formData) {

      $scope.formData = formData;

    }
  ]);

'use strict';

angular.module('quickFormApp')
  .controller('OutputCtrl',['$scope', 'formData', 'outputFunctions',
    function ($scope, formData, outputFunctions) {

      //output options
      //$scope.options = outputFactory.outputOptions;

      //defaults
      $scope.outputType = 'html';
      $scope.cssStyle = '';
      $scope.jsStyle = 'angular';

      //default style
      $scope.codeSource = function(){
        return outputFunctions.outputFunction(formData, $scope.outputType, $scope.cssStyle, $scope.jsStyle);
      };

    }
  ]);

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
