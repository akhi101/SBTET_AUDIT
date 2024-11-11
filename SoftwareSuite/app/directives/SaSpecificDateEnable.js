$(function () {
    'use strict';
    angular
        .module('app')
        .directive('saDate', function () {
            var directive = {};
            directive.restrict = 'A';
           // directive.templateUrl = "app/customControls/sa-date/sa-date.html";
            directive.replace = true;
            directive.scope = {
                object: '=',
                specificdates:'?='               

            };
            directive.require = [ 'ngModel'];
            directive.link = link;

            function link(scope, element, attrs) {

                element.datepicker({
                    format: 'dd-mm-yyyy',
                    autoclose: true,
                    todayHighlight: true,
                    showAnim: "slideDown",
                    beforeShowDay: function (date) {
                        var dmy = date.getDate();
                        if (date.getDate() < 10)
                            dmy = "0" + dmy;
                        dmy += "-";
                        if (date.getMonth() + 1 < 10)
                            dmy += "0";
                        dmy += (date.getMonth() + 1) + "-" + date.getFullYear();

                        if ($.inArray(dmy, specificdates) != -1) {
                            return true;
                        } else {
                            return false;
                        }
                        scope.$apply();
                    }
                        
                    });

                scope.$watch('datenewoptions', function () {
                    if (scope.datenewoptions !== undefined) {
                        scope.dateoptions = scope.datenewoptions;
                    }
                });

                

            }
            return directive;
        });
}());

