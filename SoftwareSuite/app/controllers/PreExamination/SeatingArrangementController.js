define(['app'], function (app) {
    app.controller("SeatingArrangementController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService) {
        $scope.ExamMonthYears = [];
        $scope.StudentType = [];
        $scope.ExamDates = [];
        $scope.selectedEmy = "";
        $scope.studentTypeId = "";
        $scope.selectedExamDate = "";
        $scope.timeSlot = "";
        $scope.isLoading = false;
        $scope.seatingPerBench = "";
        $scope.seatingDataHtml = "";
        var authData = $localStorage.authorizationData;

        $scope.HallName = "";
        $scope.Rows = 8;
        $scope.Columns = 4;
        $scope.SeatingPerBench = 2;
        $scope.ExamHalls = [];

        for (var i = 0; i < 20; i++) {
            $scope.ExamHalls.push({ HallName: "Hall " + (i + 1), Rows: $scope.Rows, Columns: $scope.Columns, SeatingPerBench: $scope.SeatingPerBench });
        }

        $scope.studentsperbenchlist = [{ val: 1,lbl:1 },{val:2,lbl:2}]

        PreExaminationService.GetExamMonthYears().then(function (res) {
            $scope.ExamMonthYears = res.Table;
        }, function (error) {
            alert("error while loading Exam Month Years");
            console.log(error);
        });

        $scope.DetailsFound = false;
        var LoadExamTypeBysem = PreExaminationService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        }, function (error) {
            alert("error while loading Student Types");
            console.log(error);
        });

        $scope.changedStudentType = function () {
            $scope.DetailsFound = false;
            if ($scope.StudentTypeId != "" && $scope.selectedEmy != "") {
                var getCurrentExamDates = PreExaminationService.CurrentExamDatesForNr($scope.selectedEmy, $scope.studentTypeId, 5);
                getCurrentExamDates.then(function (response) {
                    if (response.Table.length > 0) {
                        $scope.ExamDates = response.Table;
                    } else {
                        $scope.ExamDates = [];
                        alert("No ExamDates Founded");
                    }
                }, function (error) {
                    alert("error while loading Exam Dates");
                    console.log(error);
                });
            }
        }

        $scope.getSeatingData = function () {
            $scope.isLoading = true;
            var examHallString = JSON.stringify($scope.ExamHalls);
            if ($scope.selectedEmy == "" || $scope.studentTypeId == "" || $scope.selectedExamDate == "" || $scope.timeSlot == "" || $scope.examTypeId == "") {
                $scope.isLoading = false;
                alert("Select All Values");
                return;
            }
            if ($scope.ExamHalls.length == 0) {
                $scope.isLoading = false;
                alert("Add Exam Halls");
                return;
            }
            var seatingData = PreExaminationService.GetSeatingData($scope.selectedEmy, $scope.studentTypeId, authData.College_Code, $scope.selectedExamDate, $scope.timeSlot, 2, $scope.examTypeId, examHallString);
            seatingData.then(function (res) {
                $scope.isLoading = false;
                if (res.includes("ERROR:")) {
                    alert(res);
                } else {
                    window.location.href = res;
                }
            }, function (err) {
                $scope.isLoading = false;
            });
        }

        $scope.AddHall = function () {
            if ($scope.HallName == "") {
                alert("Enter Hall Name");
                return;
            }
            if ($scope.Rows == "" || $scope.Rows == 0) {
                alert("Enter Rows");
                return;
            }
            if ($scope.Columns == "" || $scope.Columns == 0) {
                alert("Enter Columns");
                return;
            }
            if ($scope.SeatingPerBench == "" || $scope.SeatingPerBench == 0 || $scope.SeatingPerBench == undefined) {
                alert("Enter students per bench.");
                return;
            }
            var data = { HallName: $scope.HallName, Rows: $scope.Rows, Columns: $scope.Columns, SeatingPerBench: $scope.SeatingPerBench};
            $scope.ExamHalls.push(data);
            $scope.HallName = "";
            $scope.Rows = 8;
            $scope.Columns = 4;
        }

        $scope.RemoveHall = function (index) {
            var name = $scope.ExamHalls[index].HallName;
            if (window.confirm("Do you want to delete ExamHall: " + name)) {
                $scope.ExamHalls.splice(index, 1);
            }
        }
    })
})