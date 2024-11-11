$(function () {
    'use strict';
    angular
        .module('app')
        .directive('saCheckbox', function () {

            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "customControls/sa-checkbox/sa-checkbox.html";
            directive.replace = true;
            directive.scope = {
                object: '=',
                objectname: '@objectname',
                objecttext: '@objecttext',
                ontext: '@ontext',
                offtext: '@offtext'
            };
            directive.require = ['^form', 'ngModel'];
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