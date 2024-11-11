$(function () {
    'use strict';
    angular
        .module('app')
        .directive('saPan', function () {
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "customControls/sa-pan/sa-pan.html";
            directive.replace = false;
            directive.scope = {              
                objectname: '@objectname',
                objecttext: '@objecttext',
                object :'='
            };
            directive.require =  ['^form', 'ngModel'];
            directive.link = link;

            function link(scope, element, attrs, formCtrl) {
               
                scope.form = formCtrl[0];
                var ngModel = formCtrl[1];
              
                scope.$watch('object', function () {                   
                    ngModel.$setViewValue(scope.object);                    
                });

            }
            return directive;
        });
}());