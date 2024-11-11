$(function () {
    'use strict';
    angular
        .module('app')
        .directive('saTable', function () {
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "app/customControls/sa-table/sa-table.html";
            directive.replace = true;
            directive.scope = {
                tabledata: '=',               
                //objectname: '@objectname',
                //objecttext: '@objecttext',
                //compulsory: '@compulsory',
                //displaylabel: '@displaylabel',
                //datenewoptions: '='

            };          
          
            return directive;
        });
}());

