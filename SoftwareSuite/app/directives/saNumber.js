$(function () {
    'use strict';
    angular
        .module('app')
        .directive('saNumber', function () {
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "app/customControls/sa-number/sa-number.html";
            directive.replace = true;
            directive.scope = {
                object: '=',
                min: '@min',
                max: '@max',
                objectname: '@objectname',
                objecttext: '@objecttext',
                compulsory: '=?',
                icontype: '@icontype',
                disabled: '=?'
            };
            directive.require = ['^form', 'ngModel'];
            directive.link = link;

            function link(scope, element, attrs, formCtrl) {

                scope.compulsory = angular.isDefined(scope.compulsory) ? scope.compulsory : false;
                scope.disabled = angular.isDefined(scope.disabled) ? scope.disabled : false;

                scope.form = formCtrl[0];
                var ngModel = formCtrl[1];
                scope.$watch('object', function () {
                    ngModel.$setViewValue(scope.object);
                });

                scope.keyPressed = function (evt) {
                    evt = (evt) ? evt : window.event;
                    var charCode = (evt.which) ? evt.which : evt.keyCode;
                    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                        evt.preventDefault();
                        return false;
                    }
                    return true;
                };
            }
            return directive;
        });
}());