$(function () {
    'use strict';
    angular
        .module('app').directive('saSelectDisabled', function () {

            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "app/customControls/sa-select-Disabled/sa-select-Disabled.html";
            directive.replace = true;
            directive.scope = {
                object: '=',
                options: '=',
                valuecolumn: '@',
                displaycolumn: '@',
                objectname: '@objectname',
                objecttext: '@objecttext',
                compulsory: '@compulsory',
                icontype: '@icontype',
                Disable: '@'
            };

            directive.require = ['^form', 'ngModel'];
            directive.link = link;

            function link(scope, element, attrs, formCtrl) {

                scope.compulsory = angular.isDefined(scope.compulsory) ? scope.compulsory : false;
                scope.Disable = angular.isDefined(scope.Disable) ? scope.Disable : true;

                scope.form = formCtrl[0];
                var ngModel = formCtrl[1];

                scope.$watch('object', function () {
                    ngModel.$setViewValue(scope.object);
                });

            }
            return directive;
        });
}());