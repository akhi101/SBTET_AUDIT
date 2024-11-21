$(function () {
    'use strict';
    angular
        .module('app')
        .directive('saTextarea', function () {

            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "app/customControls/sa-textarea/sa-textarea.html";
            directive.replace = true;
            directive.scope = {
                object: '=',
                objectname: '@objectname',
                objecttext: '@objecttext',
                compulsory: '@compulsory',
                icontype: '@icontype',
            };
            directive.require = ['^form', 'ngModel'];
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