define(['app'], function (app) {
    app.controller("ComingSoonController", function ($scope,  $state) {
        $scope.Loginboclogin = function () {
            $state.go('login');
        }
    });
    
    });