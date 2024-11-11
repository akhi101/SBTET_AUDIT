define(['app'], function (app) {
    app.controller("SeatingArrangementBlockwiseController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService) {


        $scope.seatingArrangementBlockwises = [
            { blockNo: "1", capacity: "100" },
             { blockNo: "2", capacity: "90" },
             { blockNo: "3", capacity: "70" },
             { blockNo: "4", capacity: "80" },
        ]
    })
})