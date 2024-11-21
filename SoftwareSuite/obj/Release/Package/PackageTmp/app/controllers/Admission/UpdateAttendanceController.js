define(['app'], function (app) {
    app.controller("UpdateAttendanceController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, ReportService) {
        $scope.searchResult = false;

        $scope.ViewDetails = function () {
        var SearchstudentInfo = ReportService.GetStudentByPin($scope.StudentPin);
        SearchstudentInfo.then(function (data) {
            console.log(data);
            $scope.searchResult = true;
            $scope.AdmissioneReports = data.Table2;
        }, function (error) {
            $scope.searchResult = false;
            $scope.LoadImg = false;
            $scope.StudentDetailsFound = false;
            alert("error");

        });
        }

        $scope.submitData = function () {
            if ($scope.attendance == null && $scope.attendance == '' && $scope.attendance == undefined) {
                alert("Please Enter Attendance Percentage")
               
            }else{
                alert($scope.attendance)
            }
          
        }



    })
})