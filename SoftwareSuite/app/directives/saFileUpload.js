$(function () {
    'use strict';
    angular
        .module('app').directive('saFileUpload', function ($parse) {
            var directive = {};
            directive.restrict = 'A';
           // directive.templateUrl = "app/customControls/sa-file-upload/sa-file-upload.html";
           // directive.replace = true;
            //directive.scope = {             
            //    saFileUpload:'=',
            //};
          //  directive.transclude= true,
          //  directive.require = ['ngModel'];
                directive.link = link;

            //directive.controller: function ($scope) {                
            //    alert($scope.myVar);
            //    // here you can access the controller scope by using $parent
            //    }
            //};

            //function link(scope, element, attrs, formCtrl) {
            //    var fileInput = element;
            //    fileInput.bind('change', function (element) {
            //        scope.notReady = element.target.files.length == 0;
            //        scope.saFileUpload = [];
            //        for (var i in element.target.files) {
            //            if (typeof element.target.files[i] == 'object')
            //                scope.saFileUpload.push(element.target.files[i]);
            //            console.log("directive scope" + scope);
            //        }
            //    });
              
            //}

            //    scope.UploadFile = scope.files;
            //    scope.upload = function () {
            //        //console.log(scope.file);
            //        scope.$parent.file = scope.files;
            //    }
               
            //}
            function link(scope, element, attrs) {
                var model = $parse(attrs.saFileUpload);
                var modelSetter = model.assign;
               // scope.saFileUpload = element[0].files[0];
                element.bind('change', function () {
                    scope.$apply(function () {
                        
                        modelSetter(scope, element[0].files[0]);
                        scope.myFile = element[0].files[0];
                    });
                });
            }
            return directive;
        });
}());
