define(['app'], function (app) {
    app.controller("PostAttendanceController", function ($scope, PreExaminationService, $http, $localStorage, $state, AppSettings, $uibModal ) {

        $scope.LoadImg = false;
        $scope.GetDetails = function () {
            
            if ($scope.StartDate == null || $scope.StartDate == undefined || $scope.StartDate == "") {
                alert("Please select Date")
                return;
            }
            $scope.LoadImg = true
            var FromDate = moment($scope.StartDate).format("YYYY-MM-DD");
            var LoadExamTypeBysem = PreExaminationService.GetAttendanceDataByDate(FromDate);
            LoadExamTypeBysem.then(function (response) {
                var res = JSON.parse(response)
                if (res.StatusCode == '200') {
                    $scope.LoadImg = false
                   
                    var resp = JSON.parse(res.Content)
                    $scope.respdata = JSON.parse(resp.data)
                    console.log($scope.respdata)
                    $scope.PostAttendance()
                } else {
                    $scope.LoadImg = false
                    alert("No Data Found from TSTS")
                }
        },
                function (error) {
                    $scope.LoadImg = false
                alert("error while loading Student Types");
                console.log(error);
            });
        }

        
        $scope.PostAttendance = function () {
            if ($scope.respdata.data) {       
            $scope.LoadImg = true
            var LoadExamTypeBysem = PreExaminationService.PostAttendance($scope.respdata);
            LoadExamTypeBysem.then(function (response) {
                var res = JSON.parse(response)
                if (res.respcode == '200') {
                    alert(res.respdesc)
                    $scope.LoadImg = false
                } else {
                    $scope.LoadImg = false
                    alert("error while Pushing Data");
                }
                //var res = JSON.parse(response)
                //if (res.StatusCode == '200') {
                //    var resp = JSON.parse(res.Content)
                //    $scope.respdata = JSON.parse(resp.data)
                //    console.log($scope.respdata)
                //}
            },
                function (error) {
                    $scope.LoadImg = false
                    alert("Something Went Wrong");
                    console.log(error);
                });
            } else {
                alert("No Data Found from TSTS")
                return;
            }
        }
            
       

    })
})