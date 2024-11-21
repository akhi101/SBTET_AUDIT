define(['app'], function (app) {
    app.controller("TransactionReportController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService, MarksEntryService) {
        $scope.StudentType = [];
        $scope.ExcelView = false;
        $scope.isShowResults = false;
        $scope.RegularDisable = false;

        var LoadExamTypeBysem = MarksEntryService.getStudentType();
        LoadExamTypeBysem.then(function (response) {

            if (response.Table.length > 0) {

                $scope.StudentType = response.Table;

            } else {
                $scope.StudentType = [];

            }
        },


            function (error) {
                alert("error while Data");
                console.log(error);
            });


        var LoadExamTypeBysem = MarksEntryService.getExamtype();
        LoadExamTypeBysem.then(function (response) {

            if (response.Table.length > 0) {

                $scope.ExamType = response.Table;

            } else {
                $scope.ExamType = [];

            }
        },

            function (error) {
                alert("error while Data");
                console.log(error);
            });


        $scope.GetTransaction = function () {

            $scope.isShowResults = true;

            var studenttType = $scope.Student.id;
            var ExamType = $scope.Examtype;

            var fromdate = moment($scope.setFromDate).format("DD-MM-YYYY");
            var todate = moment($scope.setToDate).format("DD-MM-YYYY");
            fromdate = fromdate.toString() + " 00:00:00";
            todate = todate.toString() + " 23:59:59";
            if (ExamType === undefined || ExamType == '') {
                ExamType = 1;
            }
            var GetTransaction = PreExaminationService.GetFeePaymentReports(studenttType, fromdate.toString(), todate.toString(), ExamType);
            GetTransaction.then(function (response) {
                if (response != null && response.length > 1) {
                    var location = window.location.origin
                    window.location.href = '/Reports' + response;
                    $scope. NoResult = false;

                } else {
                    alert("Error Generating The Report");
                    $scope. NoResult = true;

                }
            },
                function (error) {
                    alert("error data is not getting");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }
        $scope.Setdate = function () {
            if (Date.parse($scope.setFromDate) > Date.parse($scope.setToDate)) {
                alert("To Date Should Not Less Then From Date");
                $scope.setToDate = '';

                return false;
            }
        };
        $scope.Todate = function () {
            if (Date.parse($scope.setFromDate) > Date.parse($scope.setToDate)) {
                alert("To Date Should Not Less Then From Date");
                $scope.setFromDate = '';

                return false;
            }
        };
        $scope.changeStuentType = function (studentType) {
            if (studentType == '1') {

                $scope.RegularDisable = false;
                $scope.Examtype = '';

            } else if (studentType == '2') {
                $scope.RegularDisable = true;
                $scope.Examtype = '';

            }

        };


    });
});