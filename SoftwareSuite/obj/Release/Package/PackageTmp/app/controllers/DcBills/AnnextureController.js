define(['app'], function (app) {
    app.controller("AnnextureController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
        $scope.Showdata = false;
        $scope.NoResult = false;
        $scope.LoadImg = false;

        var getExamMonth = PreExaminationService.GetExamMonthYear();
        getExamMonth.then(function (response) {
            var response = JSON.parse(response)
            if (response.Table.length > 0) {
                $scope.MonthAndYear = response.Table;
            } else {
                $scope.MonthAndYear = [];
                alert("error while loading Exam Month Years");
            }
        }, function (error) {
            alert("error while loading Exam Month Years");

        });

        $scope.GetExpenditure = function () {
            if ($scope.monthyear == null || $scope.monthyear == undefined || $scope.monthyear == "") {
                alert('Please select Exam month year.');
                return;
            }
            $scope.LoadImg = true;
            var loadDates = PreExaminationService.GetExpenditure($scope.monthyear);
            loadDates.then(function (res) {
                if (res.ExamSessionalExpenditureCharges.length > 0) {
                    $scope.UpdateTrue = true;
                    $scope.NoResult = false;
                    $scope.LoadImg = false;
                    $scope.ExamSessionalExpenditureCharges = res.ExamSessionalExpenditureCharges[0];
                    $scope.ExamEventExpenditureCharges = res.ExamEventExpenditureCharges[0];
                    $scope.Showdata = true;

                } else {
                    $scope.ExamSessionalExpenditureCharges = [];
                    $scope.ExamEventExpenditureCharges = [];
                    $scope.NoResult = true;
                    $scope.UpdateTrue = false;
                    $scope.LoadImg = false;
                    $scope.Showdata = false;
                    alert("Data not found.");
                }
            },
                function (error) {
                    $scope.ExamSessionalExpenditureCharges = [];
                    $scope.ExamEventExpenditureCharges = [];
                    $scope.NoResult = true;
                    $scope.UpdateTrue = false;
                    $scope.LoadImg = false;
                    $scope.Showdata = false;
                    alert("Data not found.");

                });
        }



        $scope.SetSessionalExpenditure = function () {

            var updateddata = {
                "ExamSessionalExpenditureCharges": [$scope.ExamSessionalExpenditureCharges],
                "ExamEventExpenditureCharges" : [$scope.ExamEventExpenditureCharges]
            };
          
            var UpdateCharges = PreExaminationService.SetSessionalExpenditure(updateddata);

            UpdateCharges.then(function (response) {               
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)

                } else if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription)
                } else {

                    alert("Something Went Wrong");
                }
            },
                function (error) {
                    alert("error while loading Data");
                    console.log(error);
                });
        }

    });
});