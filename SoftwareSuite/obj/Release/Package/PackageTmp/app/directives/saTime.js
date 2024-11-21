$(function () {
    'use strict';
    angular
        .module('app')
		.directive('saTime', function ()  {
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "app/customControls/sa-time/sa-time.html";
            directive.replace = false;
            directive.scope = {
                objectname: '@objectname',
                objecttext: '@objecttext',
                compulsory: '@compulsory',
                object: '='
            };

            directive.link = link;

            function link(scope, element, attrs, formCtrl) {
                scope.compulsory = angular.isDefined(scope.compulsory) ? scope.compulsory : false;
                scope.hstep = 1;
                scope.mstep = 15;
                scope.ismeridian = true;
            }
            return directive;
        });
}());