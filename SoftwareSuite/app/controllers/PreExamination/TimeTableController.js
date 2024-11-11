define(['app'], function (app) {
    app.controller("TimeTableController", function ($scope, $http, $localStorage, $state, AppSettings,$uibModal) {
      
        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.expanded = false;
        }

        $scope.examSessions = [
                     { examSessionName: 'ForeNoon', examSession: 'M' },
                     { examSessionName: 'AfterNoon', examSession: 'A' }
                     //{ examSessionName: 'Morning', examSession: 'M' },
                     //{ examSessionName: 'Afternoon', examSession: 'A' },
                     //{ examSessionName: 'Evening', examSession: 'E' }
        ];

        $scope.examTimeTableSubjects = [
        { Slots: "Slot 1", type: "1", StartTime: "10:00:00", EndTime: "12:00:00", ExamSession: "AN" },
         { Slots: "Slot 3", type: "1", StartTime: "10:00:00", EndTime: "12:00:00", ExamSession: "AN" },
         
        ]
        console.log($scope.examTimeTableSubjects);

        $scope.examTimeTableSubjects2 = [
      { Slots: "Slot 2", type: "3", StartTime: "10:00:00", EndTime: "12:00:00", ExamSession: "AN" },
       { Slots: "Slot 4", type: "3", StartTime: "10:00:00", EndTime: "12:00:00", ExamSession: "AN" },

        ]
        console.log($scope.examTimeTableSubjects2);

        $scope.Sessions = [{ "name": "Session 1", "Id": "1" },
            { "name": "Session 2", "Id": "2" },
            { "name": "Session 3", "Id": "3" },
            { "name": "Session 4", "Id": "4" },
        ]

        $scope.Types = [
            { "name": "Theory", "id": "1" },
            { "name": "Drawing", "id": "2" },
            { "name": "Optional", "id": "3" }
        ]

        $scope.Holidays = [
           { "date": "12-12-2019(Wednesday)", "id": "1" },
           { "date": "13-12-2019(Thursday)", "id": "2" },
           { "date": "14-12-2019(Friday)", "id": "3" },
        { "date": "15-12-2019(Saturday)", "id": "4" },
    { "date": "16-12-2019(Sunday)", "id": "5" }
        ]

        $scope.tableData = [
            { "slot": "Day-1(S1)", "time": "9:30 - 10:30", "g1": "Theory", "g2": "Theory", "g3": "Theory", "g4": "Theory" },
             { "slot": "Day-1(S2)", "time": "2:00 - 3:00", "g1": "Theory", "g2": "Theory", "g3": "Theory", "g4": "Theory" },
              { "slot": "Day-2(S1)", "time": "9:30 - 10:30", "g1": "Theory", "g2": "Theory", "g3": "Theory", "g4": "Theory" },
               { "slot": "Day-2(S2)", "time": "2:00 - 3:00", "g1": "Theory", "g2": "Theory", "g3": "Theory", "g4": "Theory" },
                { "slot": "Day-3(S1)", "time": "9:30 - 10:30", "g1": "Theory", "g2": "-", "g3": "Drawing", "g4": "-" },
                 { "slot": "Day-3(S2)", "time": "11:30 - 12:30", "g1": "-", "g2": "Theory", "g3": "", "g4": "Drawing" },
                  { "slot": "Day-3(S3)", "time": "2:00 - 3:00", "g1": "Drawing", "g2": "-", "g3": "Theory", "g4": "-" },
                   { "slot": "Day-3(S4)", "time": "4:00 - 5:00", "g1": "-", "g2": "Drawing", "g3": "-", "g4": "Theory" },
        ]


      
      //  alert($scope.expanded)
        $scope.showCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxes");
            if (!$scope.expanded) {
                checkboxes.style.display = "block";
                $scope.expanded = true;
            } else {
                checkboxes.style.display = "none";
                $scope.expanded = false;
            }
        }

        $scope.closeCheckbox = function () {
            var checkboxes = document.getElementById("checkboxes");
            if (!$scope.expanded) {
                checkboxes.style.display = "block";
                $scope.expanded = true;
            } else {
                checkboxes.style.display = "none";
                $scope.expanded = false;
            }
        }

        $scope.toggleAll = function () {
          
            var toggleStatus = $scope.isAllSelected;
            angular.forEach($scope.Holidays, function (itm) { itm.selected = toggleStatus; });
            $scope.arr = [];
            angular.forEach($scope.Holidays, function (value, key) {
                if (value.selected === true) {
                    console.log(value);
                    $scope.arr.push({ "id": value.Id })
                }

            });
            console.log($scope.arr)
            console.log($scope.Holidays)
        }

        $scope.GetStudentAttData = function (pin, name) {




            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/PreExamination/Viewtimetablepopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',

            });
        }
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