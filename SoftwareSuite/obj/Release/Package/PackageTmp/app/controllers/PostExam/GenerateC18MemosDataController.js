define(['app'], function (app) {
    app.controller("GenerateC18MemosDataController", function ($scope, $http, $localStorage, $state, $location, $window, $stateParams, AppSettings, PreExaminationService) {

        $scope.GradePoints='130'

        var ExamYearMonths = PreExaminationService.getExamYearMonths();
        ExamYearMonths.then(function (response) {
            if (response.Table.length > 0) {
                $scope.getExamMonthYears = response.Table;

            } else {
                $scope.getExamMonthYears = [];
                alert("No Exam Month Years found.");
            }
        },
         function (error) {
             alert("error while loading Exam Month Years");
             console.log(error);
         });

        $scope.GetGradepoints = [
        { "Value": "100" },
        { "Value": "110" },
        { "Value": "120" },
        { "Value": "130" },
        { "Value": "140" },
        { "Value": "150" }]

        $scope.ChangeGrade = function () {
         
                if (confirm("Are you sure you want Change Grade Points?") == true) {
                 
                } else {
                    userPreference = "Save Canceled!";
                    $scope.GradePoints = '130'
                }
         

        }

        $scope.ClearData = function () {
            $scope.ExamMonthYear = "";
            $scope.GradePoints = "";
            $scope.Day = "";
            $scope.Month = "";
            $scope.Year = "";
            $scope.Pin = "";
        }

        $scope.Submit = function () {
            $scope.loading = true;
            $scope.Data = false;
            $scope.Noresult = false;
            $scope.Error1 = false;

            var loadData2 = PreExaminationService.GenerateC18MemosData($scope.ExamMonthYear, $scope.GradePoints,$scope.Day,$scope.Month,$scope.Year)
            loadData2.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode == '200') {
                    $scope.loading = false;
                    var msg = response[0].ResponceDescription;
                    alert(msg)
                    var location = response[0].file;
                    window.location.href = location;
                    console.log(location)
                    $scope.Noresult = false;
                } else if (response[0].ResponceCode == '400') {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = false;
                    $scope.Error1 = true;
                    $scope.ErrMsg1 = response[0].ResponceDescription;
                    alert($scope.ErrMsg1)
                } else {
                    $scope.loading = false;
                    $scope.Data = false
                    alert("No Data Found");
                    $scope.Noresult = true;
                    $scope.Error1 = false;

                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = true;
                    $scope.Error = false;
                    alert("error while loading data");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }

        $scope.Submit1 = function () {
            $scope.loading = true;
            $scope.Data = false;
            $scope.Noresult = false;
            $scope.Error1 = false;

            var loadData2 = PreExaminationService.GenerateC18MemosDataByPin($scope.ExamMonthYear, $scope.GradePoints, $scope.Day, $scope.Month, $scope.Year, $scope.Pin)
            loadData2.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode == '200') {
                    $scope.loading = false;
                    var msg = response[0].ResponceDescription;
                    alert(msg)
                    var location = response[0].file;
                    window.location.href = location;
                    console.log(location)
                    $scope.Noresult = false;
                } else if (response[0].ResponceCode == '400') {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = false;
                    $scope.Error1 = true;
                    $scope.ErrMsg1 = response[0].ResponceDescription;
                    alert($scope.ErrMsg1)
                } else {
                    $scope.loading = false;
                    $scope.Data = false
                    alert("No Data Found");
                    $scope.Noresult = true;
                    $scope.Error1 = false;

                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = true;
                    $scope.Error = false;
                    alert("error while loading data");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }


    })
})