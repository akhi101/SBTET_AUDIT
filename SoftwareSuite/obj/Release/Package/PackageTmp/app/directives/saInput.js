$(function () {
    'use strict';
    angular
        .module('app').directive('saInput',function (){
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "app/customControls/sa-input/sa-input.html";
            directive.replace = true;
            directive.scope = {
                object: '=',
                objectname: '@objectname',
                objecttext: '@objecttext',
                compulsory: '=?',
                icontype: '@icontype',               
                length: '=?',
                isfocus: '=?',
                isdisabled: '=?',
                ispascal: '=?'
            };
            directive.require = [ 'ngModel'];
            directive.link = link;

            function link(scope, element, attrs, formCtrl) {

                scope.compulsory = angular.isDefined(scope.compulsory) ? scope.compulsory : false;

                scope.isdisabled = angular.isDefined(scope.isdisabled) ? scope.isdisabled : false;

                //scope.ispascal = angular.isDefined(scope.ispascal) ? scope.ispascal : true;

               // scope.form = formCtrl[0];
                var ngModel = formCtrl[0];

                scope.$watch('object', function () {
                    if (scope.ispascal) {
                        ngModel.$setViewValue(titleCase(scope.object));
                    }else{
                        ngModel.$setViewValue(scope.object);              
                    }  
                    
                });
               
                function titleCase(str) {
                    if (scope.ispascal) {
                        if (!angular.isUndefined(str)) {
                            if (str !== null) {
                                return str.split(' ').map(function (val) {
                                    return val.charAt(0).toUpperCase() + val.substr(1);
                                }).join(' ').trim();
                            }
                        }
                    } else {
                        return str;
                    }
                }
            }
            return directive;
        });
}());