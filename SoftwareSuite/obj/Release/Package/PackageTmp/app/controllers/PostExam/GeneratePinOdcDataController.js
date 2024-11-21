define(['app'], function (app) {
    app.controller("GeneratePinOdcDataController", function ($scope, $http, $localStorage, $state, $location, $window, $stateParams, AppSettings, PreExaminationService) {
      

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

        $scope.Submit = function () {
            $scope.loading = true;
            $scope.Data = false;
            $scope.Noresult = false;
            $scope.Error = false;
            //if ($scope.ExamMonthYear == null || $scope.ExamMonthYear == '' || $scope.ExamMonthYear == undefined) {
            //    alert('Please Select Exam Month Year')
            //    return
            //}           
            var loadData2 = PreExaminationService.GenerateOdcDataByPin($scope.Pin)
            loadData2.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponseCode == '200') {
                    $scope.loading = false;
                   
                    alert(response.Table[0].ResponseDescription)
                    $scope.Error = false;
                    $scope.Noresult = false;
                } else if (response.Table[0].ResponseCode == '400') {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = false;
                    $scope.Error = true;
                    $scope.ErrMsg = response.Table[0].ResponseDescription;
                    alert($scope.ErrMsg)
                } else {
                    $scope.loading = false;
                    $scope.Data = false
                    alert("No Data Found");
                    $scope.Noresult = true;
                    $scope.Error = false;

                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = true;
                    $scope.Error = false;
                    alert("error while loading Semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }
 
    })
})