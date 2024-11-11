define(['app'], function (app) { 
    app.controller("MigrationCertificateController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings) {

      

        $scope.today = new Date();

        $scope.printForm = function () {
            $scope.name = "Kodurupaka Raj Kumar";
            $scope.father = "Srinivas";
            $scope.pin = '13383-MNG-053';
            $scope.BranchYear = "Mining Enginering MAR/APR-2017";
            $scope.Class = "First Class";
            $scope.year = "3";
            setTimeout(function () {
                document.title = 'Migration_Certificate';
                window.print();
                document.title = tempTitle;
            }, 500);
        }
    })
})