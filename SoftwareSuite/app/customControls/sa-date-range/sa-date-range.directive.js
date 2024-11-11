$(function () {
    'use strict';
    angular
        .module('app')
    .directive('saDateRange', function () {
        var directive = {};
        directive.restrict = 'E';
        directive.templateUrl = "customControls/sa-date-range/sa-date-range.html";
        directive.replace = true;
        directive.scope = {
            object: '=',
            objectname: '@objectname',
            objecttext: '@objecttext',
            compulsory: '=?',
            filterfunction:'&'
        };
        directive.require = ['ngModel'];
        directive.link = link;

        function link(scope, element, attrs, formCtrl) {

            scope.opts = {
                locale: {
                    applyClass: 'btn-green',
                    firstDay: 1,
                    applyLabel: "FILTER",
                    format: 'DD-MMM-YYYY'
                },
                ranges: {
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()]
                },
                eventHandlers: {
                    'apply.daterangepicker': function (ev, picker) { scope.filterfunction(); }
                }
            };

            scope.compulsory = angular.isDefined(scope.compulsory) ? scope.compulsory : false;

            var ngModel = formCtrl[0];

            scope.$watch('object', function () {
                ngModel.$setViewValue(scope.object);
            });


        }
        return directive;
    });
}());