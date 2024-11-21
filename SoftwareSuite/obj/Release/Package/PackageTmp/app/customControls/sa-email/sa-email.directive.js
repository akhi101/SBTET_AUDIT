$(function () {
    'use strict';
    angular
        .module('app')
        .directive('saEmail', function () {
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "customControls/sa-email/sa-email.html";
            directive.replace = false;
            directive.scope = {              
                objectname: '@objectname',
                objecttext: '@objecttext',
                compulsory: '@compulsory',
                object :'='
            };
            directive.require =  ['^form', 'ngModel'];
            directive.link = link;

            function link(scope, element, attrs, formCtrl) {
               
                scope.compulsory = angular.isDefined(scope.compulsory) ? scope.compulsory : false;

                scope.form = formCtrl[0];
                var ngModel = formCtrl[1];               
                scope.$watch('object', function () {                   
                    ngModel.$setViewValue(scope.object);                    
                });

            }
            return directive;
        });
}());