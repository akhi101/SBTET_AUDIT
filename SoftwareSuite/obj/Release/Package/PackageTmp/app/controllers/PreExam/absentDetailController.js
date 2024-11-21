(function () {
    'use strict';
    angular.module('app')
        .controller('absentDetailController', ['$rootScope', '$scope','$state',
            function ($rootScope, $scope, $state) {                
                $scope.init = function () {

                    if ($state.params.absentId !== undefined) {
                   
                }
            };
    }]);
}());