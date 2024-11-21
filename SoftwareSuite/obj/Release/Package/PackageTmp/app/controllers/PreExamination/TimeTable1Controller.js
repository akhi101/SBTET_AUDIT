define(['app'], function (app) {
    app.controller("TimeTable1Controller", function ($scope, $http, $localStorage, $state, AppSettings) {
        $scope.Result1 = false;
        $scope.Table1 = false;
        $scope.Table2 = false;
        $scope.TimeTable = [];
        $scope.TimeTableform = [];

        $scope.add = function () {
            $scope.Table1 = true;
            $scope.Table2 = true;
            $scope.Result1 = true;

            $scope.TimeTable = [
                { 'Sloat': '1', 'Brnach': 'ECE' },
                 { 'Sloat': '2', 'Brnach': 'EEE' },
                  { 'Sloat': '3', 'Brnach': 'CSE' },
                   { 'Sloat': '4', 'Brnach': 'EEE' },
             

            ];

        }
        $scope.add1 = function () {
          
          
       

            $scope.TimeTableform = [
                { 'Sloat': '1', 'Day': 'Sunday' },
                 { 'Sloat': '2', 'Day': 'Monday' },
                  { 'Sloat': '3', 'Day': 'Tuesday' },
                   { 'Sloat': '4', 'Day': 'Monday' }


            ];

        }


    })

})