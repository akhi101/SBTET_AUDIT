define(['app'], function (app) {
    app.controller("CcicPrinterNRDownloadController", function ($scope, CcicPreExaminationService) {


        const $ctrl = this;
        $ctrl.$onInit = () => {
        }


        var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
        getCcicCurrentAcademicYear.then(function (response) {

            $scope.GetCcicCurrentAcademicYear = response;

        },
            function (error) {
                alert("error while loading CurrentAcademicYear");
                var err = JSON.parse(error);

            });

        $scope.GetCurrentBatchData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;
            }

            $scope.AcademicYearID = AcademicYearID;
            $scope.loading = true;
            var getCcicAcademicYearBatch = CcicPreExaminationService.GetCurrentBatch(AcademicYearID)
            getCcicAcademicYearBatch.then(function (Res) {
                try {
                    var res = JSON.parse(Res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.CurrentBatchData = res.Table;
                    $scope.NoData = false;
                }
                else {
                    $scope.loading = false;
                    $scope.CurrentBatchData = [];
                    $scope.NoData = true;

                }

            },
                function (error) {
                    $scope.loading = false;
                    $scope.NoData = true;
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });

        }

        $scope.getAYBatchExamMonthYear = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }


            $scope.AcademicYearID = AcademicYearID;



            var getAYbatchexammonthyear = CcicPreExaminationService.GetExamMonthYears(AcademicYearID)
            getAYbatchexammonthyear.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.ExamMonthYearData = res.Table;
                }
                else {
                    $scope.ExamMonthYearData = [];
                }

            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });


        }


        $scope.getExamDates = function () {

            var examdate = CcicPreExaminationService.GetExamDates($scope.academicYear, $scope.monthyear);
            examdate.then(function (response) {
                var Res = JSON.parse(response)

                $scope.ExamDates = Res.Table;

            },
                function (error) {
                    alert("error while loading Dates");
                    var err = JSON.parse(error);

                });

        }


        //$scope.getNRStudentDetails = function () {
        //    $scope.LoadImg = true;
        //    var getNrReports = CcicPreExaminationService.NrReports($scope.academicYear, $scope.monthyear,$scope.ExamDate,$scope.UserName);
        //    getNrReports.then(function (res) {
        //        $scope.LoadImg = false;
        //        if (res.length > 0) {
        //            if (res.length > 4) {
        //                window.location.href = '/Reports/' + res + '.pdf';
        //            } else {
        //                alert("No NR Report Present");
        //            }
        //        } else {
        //            alert("No NR Report Present");
        //        }
        //    }, function (err) {
        //        $scope.LoadImg = false;
        //        alert("Error while loading");
        //    });

        //};


        $scope.getNRStudentDetails = function () {
            $scope.loading = true;
            if (($scope.academicYear == undefined) || ($scope.academicYear == null) || ($scope.academicYear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.monthyear == undefined) || ($scope.monthyear == null) || ($scope.monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            var printernrExcel = CcicPreExaminationService.GetNRStudentDetails($scope.academicYear, $scope.monthyear);
            printernrExcel.then(function (res) {
                $scope.loading = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = res;
                    } else {
                        alert("No Printer NR Data Present")
                    }
                } else {
                    alert("No Printer NR Data Present")
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        };


    })
})


