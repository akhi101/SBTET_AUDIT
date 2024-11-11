$(function () {
    'use strict';
    angular
        .module('app')
        .directive('saDateRng',function () {
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "app/customControls/sa-date-rng/sa-date-rng.html";
            directive.replace = true;
            directive.scope = {
                object: '=',
                objectname: '@objectname',
                objecttext: '@objecttext',
                compulsory: '@compulsory',
                displaylabel: '@displaylabel',
                datenewoptions: '='
               
            };
            directive.require = ['^form', 'ngModel'];
            directive.link = link;

            function link(scope, element, attrs, formCtrl) {

               // scope.displaylabel = angular.isDefined(scope.displaylabel) ? scope.displaylabel : true;

                scope.$watch('datenewoptions', function () {
                    if (scope.datenewoptions !== undefined) {
                        scope.dateoptions = scope.datenewoptions;
                    }                   
                });

                scope.form = formCtrl[0];
                var ngModel = formCtrl[1];

                scope.$watch('object', function () {
                    if (scope.object === undefined || scope.object === null) {
                        ngModel.$setViewValue(scope.object);
                    } else {
                        if (scope.object instanceof Date) {
                            ngModel.$setViewValue(scope.object);
                        } else {
                            ngModel.$setViewValue(new Date(scope.object));
                        }

                    }
                });
                            
                scope.compulsory = angular.isDefined(scope.compulsory) ? scope.compulsory : false;

                if (scope.compulsory) {
                    if (scope.object === undefined || scope.object === null) {
                        scope.object = new Date();
                    } else {
                        if (scope.object instanceof Date) {

                        } else {
                            scope.object = new Date();
                        }

                    }
                }

                scope.clear = function () {
                    scope.object = null;
                };
                var dateTemp = new Date();                

                scope.dateoptions = {
                    formatYear: 'yy',
                   // maxDate: dateTemp.setDate(dateTemp.getDate() + 1),
                    //minDate: new Date(),
                    startingDay: 1
                };

                scope.toggleMin = function () {

                    var todayTimeStamp = +new Date(); // Unix timestamp in milliseconds
                    var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
                    var diff = todayTimeStamp - oneDayTimeStamp;
                    var yesterdayDate = new Date(diff);                  
                   // scope.dateOptions.minDate = yesterdayDate;
                };

                scope.toggleMin();

                scope.open = function () {
                    scope.popup.opened = true;
                    scope.startDate = new Date();
                };

                scope.format = 'dd-MMMM-yyyy';

                scope.popup = {
                    opened: false
                };

            }
            return directive;
        });
}());

//$(function () {
//    'use strict';
//    angular.module('customControls')
//  .directive('datetimepickerNeutralTimezone', function () {
//      return {
//          restrict: 'A',
//          priority: 1,
//          require: 'ngModel',
//          link: function (scope, element, attrs, ctrl) {
//              ctrl.$formatters.push(function (value) {
//                  var date = new Date(Date.parse(value));
//                  date = new Date(date.getTime() + (60000 * date.getTimezoneOffset()));
//                  return date;
//              });

//              ctrl.$parsers.push(function (value) {
//                  var date = new Date(value.getTime() - (60000 * value.getTimezoneOffset()));
//                  return date;
//              });
//          }
//      };
//  });
//}());