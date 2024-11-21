$(function () {
    'use strict';
    angular
        .module('app')
        .directive('saTypeaheadValue',function (){
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "customControls/sa-typeahead-value/sa-typeahead-value.html";
            directive.replace = true;
            directive.scope = {
                object: '=',
                objectname: '@objectname',
                objecttext: '@objecttext',
                compulsory: '=?',
                icontype: '@icontype',
                getoptions: '&',
                displaycolumn: '@',
                valuecolumn: '@'
            };
            directive.require = ['^form', 'ngModel'];
            directive.link = link;

            function link(scope, element, attrs, formCtrl) {

                scope.compulsory = angular.isDefined(scope.compulsory) ? scope.compulsory : false;              

                scope.form = formCtrl[0];
                var ngModel = formCtrl[1];

            }

            return directive;
        });
}());