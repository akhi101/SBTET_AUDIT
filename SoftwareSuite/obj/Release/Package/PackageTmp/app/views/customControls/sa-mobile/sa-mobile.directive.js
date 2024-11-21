$(function () {
    'use strict';
    angular
        .module('app')
        .directive('saMobile', function () {
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "customControls/sa-mobile/sa-mobile.html";
            directive.replace = true;
            directive.scope = {
                object: '=',
                objectname: '@objectname',
                objecttext: '@objecttext',
                compulsory: '@compulsory'
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