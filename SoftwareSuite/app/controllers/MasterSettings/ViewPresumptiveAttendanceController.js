define([
    'app'], function (app) {
        app.controller("ViewPresumptiveAttendanceController", function ($scope, $http, $localStorage, $state, $window, $stateParams, AppSettings, MasterSettingsService, SystemUserService, PreExaminationService) {
        $scope.ShowData = false;
        var authData = $localStorage.authorizationData;
       
        $scope.userName = authData.userName;

        var getExamMonth = PreExaminationService.GetExamMonthYear();
        getExamMonth.then(function (response) {
            var response = JSON.parse(response)
            if (response.Table.length > 0) {
                $scope.MonthAndYear = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Exam Month Years");
                console.log(error);

            });
        $scope.Array = [
               { "Id": "1", "Value": "1 Day" },
               { "Id": "2", "Value": "2 Days" },
               { "Id": "3", "Value": "3 Days" },
               { "Id": "4", "Value": "4 Days" },
               { "Id": "5", "Value": "5 Days" },
               { "Id": "6", "Value": "6 Days" },
               { "Id": "7", "Value": "7 Days" },
               { "Id": "8", "Value": "8 Days" },
               { "Id": "9", "Value": "9 Days" },
               { "Id": "10", "Value": "10 Days" },
               { "Id": "11", "Value": "11 Days" },
               { "Id": "12", "Value": "12 Days" },
               { "Id": "13", "Value": "13 Days" },
               { "Id": "14", "Value": "14 Days" },
               { "Id": "15", "Value": "15 Days" },
               { "Id": "16", "Value": "16 Days" },
               { "Id": "17", "Value": "17 Days" },
               { "Id": "18", "Value": "18 Days" },
               { "Id": "19", "Value": "19 Days" },
               { "Id": "20", "Value": "20 Days" },
               { "Id": "21", "Value": "21 Days" },
               { "Id": "22", "Value": "22 Days" },
               { "Id": "23", "Value": "23 Days" },
               { "Id": "24", "Value": "24 Days" }
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
               //{ "Id": "2", "Value": "2 Days" },
        ]
       // console.log($scope.Array)


        $scope.GetDetails = function () {
            //var Puropse = $scope.Puropse;
            //$scope.Update = true;
            $scope.loading = true;
            $scope.Noresult = false;
            $scope.ShowData = false;
            var EditData = MasterSettingsService.getAttendanceByPin($scope.Pin, $scope.ExamMonthYear)
            EditData.then(function (response) { 
                //console.log(response
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.Noresult = false;
                    $scope.ShowData = true;
                $scope.UserData = response[0];
                } else {
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.ShowData = false;
                alert('No data found')
                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.ShowData = false;
                    alert("Something Went Wrong");
                    var err = JSON.parse(error);
                    console.log(err.Message);

                });


        }
        $scope.EditAttendance = function(){
            $scope.ShowAttendance = true;
        }

       
        $scope.UpdateAttendance = function (AddDays) {
          //  var ip = '192.100.10.26'
            $scope.UpdateBtn = true;
            $scope.loading = true;
            $scope.Noresult = false;
            $scope.ShowData = true;
            var UpdateData = MasterSettingsService.UpdatePresumptiveAttendance($scope.Pin, AddDays, $scope.userName, $scope.ExamMonthYear)
            UpdateData.then(function (response) {
                //console.log(response
                if (response[0].ResponseCode == '200') {
                    $scope.UpdateBtn = false;
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.ShowData = false;
                    alert(response[0].ResponseDescription)
                    $scope.GetDetails();
                } else if (response[0].ResponseCode == '400') {
                    $scope.UpdateBtn = false;
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.ShowData = false;
                    alert(response[0].ResponceDescription)
                } else {
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.ShowData = false;
                    $scope.UpdateBtn = false;
                    alert('Something Went Wrong')
                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.ShowData = false;
                    $scope.UpdateBtn = false;
                    alert("Something Went Wrong");
                    var err = JSON.parse(error);
                    console.log(err.Message);

                });
        }
    })
})