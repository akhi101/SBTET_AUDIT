define(['app'], function (app) {
    app.controller("NrExcelReportController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService) {

        $scope.ArrayBarimg = [];
        $scope.ArrayBarcode = [];
        $scope.BarcodeElements = [];
        $scope.examTypeId = "0";
        $scope.Exams = [
            { id: 1, exam: "Mid 1" },
            { id: 2, exam: "Mid 2" },
            { id: 5, exam: "Semester" }
        ];
        var authData = $localStorage.authorizationData;
        $scope.DetailsFound = false;
        PreExaminationService.GetExamMonthYears().then(function (res) {
            $scope.ExamMonthYears = res.Table;
        },
            function (error) {
                alert("error while loading Exam Month Years");
                console.log(error);
            });

        var LoadExamTypeBysem = PreExaminationService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });


        $scope.changedVal = function () {
            $scope.DetailsFound = false;
        }

        $scope.getNrExcel = function (StudentType, ExamTypeId) {
            $scope.LoadImg = true;
            var getNrReports = PreExaminationService.NrExcelReports(StudentType, authData.College_Code.toString(), ExamTypeId, $scope.selectedEmy);
            getNrReports.then(function (res) {
                $scope.LoadImg = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = res;
                    } else {
                        alert("No NR Excel Report Present")
                    }
                } else {
                    alert("No NR Report Present")
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        };

    })
})