define(['app'], function (app) {
    app.controller("ThreeBacklogODCReportController", function ($scope, $http, $window, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
        $scope.LoadImg = false;

        $scope.DownloadtoExcel1 = function () {
            if (($scope.Fromdate == undefined) || ($scope.Fromdate == null) || ($scope.Fromdate == "")) {
                alert("Enter From Date.");
                return;
            }

            if (($scope.Todate == undefined) || ($scope.Todate == null) || ($scope.Todate == "")) {
                alert("Enter to date.");
                return;
            }
            if (($scope.Pin == undefined) || ($scope.Pin == null) || ($scope.Pin == "")) {
                alert("Enter to date.");
                return;
            }

            // if (($scope.printday == undefined) || ($scope.printday == null) || ($scope.printday == "")) {
            //     alert("Enter day.");
            //     return;
            // }
            // if (($scope.printMonth == undefined) || ($scope.printMonth == null) || ($scope.printMonth == "")) {
            //     alert("Enter Month.");
            //     return;
            // }
            // if (($scope.Year == undefined) || ($scope.Year == null) || ($scope.Year == "")) {
            //     alert("Enter Year.");
            //     return;
            // }
            // if (($scope.ExamYearMonth == undefined) || ($scope.ExamYearMonth == null) || ($scope.ExamYearMonth == "")) {
            //     alert("Enter Exam Year Month.");
            //     return;
            // }
            var fromdate = moment($scope.Fromdate).format("YYYY-MM-DD");
            var todate = moment($scope.Todate).format("YYYY-MM-DD");
            $scope.LoadImg = true;
            var ThreeBacklogODCReports = PreExaminationService.ThreeBacklogODCByPin(fromdate, todate, $scope.Pin);
            ThreeBacklogODCReports.then(function (res) {
                $scope.LoadImg = false;
                alert(res)
                if (res === "No Data Found") {
                    aert("No Data Found")
                } else {
                    if (res.length > 4) {
                        window.location.href = "/Reports/" + res;
                    } else {
                        alert("No Excel Report Present")
                    }
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        }

        $scope.DownloadtoExcel = function () {
            if (($scope.Fromdate == undefined) || ($scope.Fromdate == null) || ($scope.Fromdate == "")) {
                alert("Enter From Date.");
                return;
            }

            if (($scope.Todate == undefined) || ($scope.Todate == null) || ($scope.Todate == "")) {
                alert("Enter to date.");
                return;
            }
            // if (($scope.printday == undefined) || ($scope.printday == null) || ($scope.printday == "")) {
            //     alert("Enter day.");
            //     return;
            // }
            // if (($scope.printMonth == undefined) || ($scope.printMonth == null) || ($scope.printMonth == "")) {
            //     alert("Enter Month.");
            //     return;
            // }
            // if (($scope.Year == undefined) || ($scope.Year == null) || ($scope.Year == "")) {
            //     alert("Enter Year.");
            //     return;
            // }
            // if (($scope.ExamYearMonth == undefined) || ($scope.ExamYearMonth == null) || ($scope.ExamYearMonth == "")) {
            //     alert("Enter Exam Year Month.");
            //     return;
            // }
            var fromdate = moment($scope.Fromdate).format("YYYY-MM-DD");
            var todate = moment($scope.Todate).format("YYYY-MM-DD");
            $scope.LoadImg = true;
            var ThreeBacklogODCReports = PreExaminationService.ThreeBacklogODCReports(fromdate, todate);
            ThreeBacklogODCReports.then(function (res) {
                $scope.LoadImg = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = "/Reports/" + res;
                    } else {
                        alert("No Excel Report Present")
                    }
                } else {
                    alert("No Report Present")
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        }
        $scope.Setdate = function () {
            if (Date.parse($scope.Fromdate) > Date.parse($scope.Todate)) {
                alert("To Date Should Not Less Then From Date");
                $scope.Todate = '';

                return false;
            }
        };
        $scope.setTodate = function () {
            if (Date.parse($scope.Fromdate) > Date.parse($scope.Todate)) {
                alert("To Date Should Not Less Then From Date");
                $scope.Fromdate = '';

                return false;
            }
        };
    })
})