define(['app'], function (app) {
    app.controller("CcicNRDownloadController", function ($scope, $window,$localStorage, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        //console.log(authData)
        const $ctrl = this;
        $ctrl.$onInit = () => {


        }


        //$scope.ClickPhotoAttendenceSheet = function () {
        //    alert('Photo Attendence Sheet will be Resumed Soon');
        //    return;
        //}

        var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
        getCcicCurrentAcademicYear.then(function (response) {

            $scope.GetCcicCurrentAcademicYear = response;

        },
            function (error) {
                alert("error while loading CurrentAcademicYear");
                var err = JSON.parse(error);

            });



        $scope.GetExamMonthYearData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }

            $scope.AcademicYearID = AcademicYearID;
            var getCcicAcademicYearBatch = CcicPreExaminationService.GetExamMonthYears(AcademicYearID)
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetExamMonthYear = res.Table;
                }
                else {
                    $scope.GetExamMonthYear = [];
                }
                for (var j = 1; j < res.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });

        }

        $scope.getNRExcelData = function () {
            if (($scope.AcademicYear == undefined) || ($scope.AcademicYear == null) || ($scope.AcademicYear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.monthyear == undefined) || ($scope.monthyear == null) || ($scope.monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            $scope.loading = true;
            var getdata = CcicPreExaminationService.GetNRExcelData($scope.AcademicYear, $scope.monthyear, $scope.UserName);
            getdata.then(function (res) {
                try {
                    var Res = JSON.parse(res)
                }
                catch (error) {

                }
                if (Res.Table.length > 0) {
                    $scope.GetNRExcelData = Res.Table;
                    $scope.loading = false;
                }
                else {
                    $scope.GetNRExcelData = [];
                    $scope.loading = false;
                    $scope.NoData = true;
                }

            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });
        }
        $scope.getNRExcel = function () {
            $scope.loading = true;
            if (($scope.AcademicYear == undefined) || ($scope.AcademicYear == null) || ($scope.AcademicYear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.monthyear == undefined) || ($scope.monthyear == null) || ($scope.monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            var ReportExcel = CcicPreExaminationService.GetNRExcel($scope.AcademicYear, $scope.monthyear, $scope.UserName);
            ReportExcel.then(function (res) {
                $scope.loading = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = res;
                    } else {
                        alert("No  Excel Report Present")
                    }
                } else {
                    alert("No Excel Report Present")
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        };

        $scope.getExamDates = function () {
            var examdate = CcicPreExaminationService.GetExamDates($scope.academicyear,$scope.MonthYear);
            examdate.then(function (response) {
                var resp = JSON.parse(response);
                $scope.ExamDates = resp.Table;

            },
                function (error) {
                    alert("error while loading Exam Dates");
                    var err = JSON.parse(error);

                });
        }

        $scope.getNRStudentDetails = function () {
            $scope.loading = true;
            var getNrReports = CcicPreExaminationService.NrReports($scope.academicyear, $scope.MonthYear, $scope.ExamDate, $scope.UserName);
            getNrReports.then(function (res) {
                $scope.loading = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        //window.location.href = '/Reports/' + res + '.pdf';
                        $window.open('/Reports/' + res + '.pdf', '_blank');
                    } else {
                        alert("No NR Report Present");
                    }
                } else {
                    alert("No NR Report Present");
                }
            }, function (err) {
                $scope.loading = false;
                alert("Error while loading");
            });

        };
        

    })
})