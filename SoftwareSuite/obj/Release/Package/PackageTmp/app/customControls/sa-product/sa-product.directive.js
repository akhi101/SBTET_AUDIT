$(function () {
    'use strict';
    angular
        .module('app')
        .directive('saProduct',['productService', function (productService) {

            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "customControls/sa-product/sa-product.html";
            directive.replace = true;
            directive.scope = {
                object: '='               
            };

            directive.require = ['^form', 'ngModel'];
            directive.link = link;

            function link(scope, element, attrs, formCtrl) {

                //scope.products = [];
                //productService.getAll().then(function (results) {
                //    scope.products = results.data;
                //});

                scope.compulsory = angular.isDefined(scope.compulsory) ? scope.compulsory : false;

                scope.form = formCtrl[0];
                var ngModel = formCtrl[1];

                scope.$watch('object', function () {
                   ngModel.$setViewValue(scope.object);
                });

            }

            return directive;
        }]);
}());