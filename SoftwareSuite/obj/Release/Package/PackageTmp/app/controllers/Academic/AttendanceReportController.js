define(['app'], function (app) {
    app.controller("AttendanceReportController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {

        var LoadBacklogSemesters = PreExaminationService.getAllSemester();
        LoadBacklogSemesters.then(function (response) {
            $scope.ActiveSemesters = response.Table;
        },
            function (error) {
                var err = JSON.parse(error);
                console.log(err.Message);
            });

        var LoadAcademicYears = PreExaminationService.GetAcademicYears();
        LoadAcademicYears.then(function (response) {
            if (response.Table.length > 0) {
                $scope.GetAcademicYears = response.Table;
            } else {
                $scope.GetAcademicYears = [];
                alert("No Exam Types found.");
            }
        },
            function (error) {
                alert("error while loading Exam Types");
                console.log(error);
            });

    $scope.Submit = function () {
    $scope.loading = true;
    $scope.Noresult = false
        var loadData1 = PreExaminationService.GetAttendanceReportData($scope.AcademicYear, $scope.Semester)
    loadData1.then(function (res) {
        var data = JSON.parse(res)
        if (data[0].ResponceCode == '200') {
            $scope.Noresult = false
            $scope.loading = false;
            var location = data[0].file;
            window.location.href = location;

        } else
            if (data[0].ResponceCode == '400') {
                $scope.Noresult = true
                $scope.loading = false;
                alert(data[0].ResponceDescription);
            }
            else {
                $scope.Noresult = true
                $scope.loading = false;
                alert('Something Went Wrong')
            }

    }, function (error) {
        $scope.Noresult = true
        $scope.loading = false;
    });
        }

    })
})