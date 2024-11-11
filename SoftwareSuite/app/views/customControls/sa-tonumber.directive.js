$(function () {
    'use strict';
    angular
        .module('app')
        .directive('input', function () {
            var directive = {};
            directive.restrict = 'E';
            directive.require = '?ngModel';
            
            directive.link = link;

            function link(scope, element, attrs, ngModel) {

                if ('undefined' !== typeof attrs.type && 'number' === attrs.type && ngModel) {
                    
                    ngModel.$formatters.push(function (modelValue) {                       
                        if(modelValue===null){
                            return modelValue;
                        }else{
                            return Number(modelValue);    
                        }                                                             
                    });

                    ngModel.$parsers.push(function (viewValue) {                      
                        if (viewValue === null) {
                            return viewValue;
                        } else {
                            return Number(viewValue);
                        }
                    });
                }

            }
            return directive;
        });
}());