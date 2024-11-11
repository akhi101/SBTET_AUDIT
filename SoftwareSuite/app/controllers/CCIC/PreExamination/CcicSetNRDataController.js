define(['app'], function (app) {
    app.controller("CcicSetNRDataController", function ($scope, CcicPreExaminationService) {


        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.currentAcademicYear();
            $scope.getCourseDurations();
        }

        var getbatches = CcicPreExaminationService.GetBatches();
        getbatches.then(function (response) {

            $scope.GetBatchesData = response;

        },
            function (error) {
                alert("error while loading Batches");
                var err = JSON.parse(error);

            });


        $scope.currentAcademicYear = function () {
            var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
            getCcicCurrentAcademicYear.then(function (response) {

                $scope.GetCcicCurrentAcademicYear = response;
                $scope.AcademicYearID = response[0].AcademicYearID;
                $scope.GetExamMonthYearData($scope.AcademicYearID);
                

            },
                function (error) {
                    alert("error while loading CurrentAcademicYear");
                    var err = JSON.parse(error);

                });
        }

        $scope.getCourseDurations = function () {
            var getCourseDuration = CcicPreExaminationService.GetCourseDurations();
            getCourseDuration.then(function (response) {

                $scope.CourseDurationData = response;


            },
                function (error) {
                    alert("error while loading Course Durations");
                    var err = JSON.parse(error);

                });
        }

        $scope.GetExamMonthYearData = function (AcademicYearID) {
            //if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
            //    return;

            //}


            var getCcicAcademicYearBatch = CcicPreExaminationService.GetExamMonthYears(AcademicYearID)
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetExamMonthYearTable = res.Table;
                }
                else {
                    $scope.GetExamMonthYearTable = [];
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

        $scope.getCcicCourseDurationBatches = function (courseduration) {

            if (courseduration == null || courseduration == undefined || courseduration == "") {
                return
            }
            $scope.courseduration = courseduration;
            var getCcicCourseDurations = CcicPreExaminationService.GetCcicCourseDurationBatches(courseduration);
            getCcicCourseDurations.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.CourseDurationBatchesData = res.Table;
                }
                else {
                    $scope.CourseDurationBatchesData = [];
                }


            },

                function (error) {
                    alert("error while loading CourseDuration");
                    var err = JSON.parse(error);

                });
        }

        $scope.getFeePaymentNRData = function () {
            if ($scope.monthyear == null || $scope.monthyear == undefined || $scope.monthyear == "") {
                return;
            }

            $scope.loading = true;
            var getfeepaymentnrdata = CcicPreExaminationService.GetFeePaymentNRData($scope.monthyear)
            getfeepaymentnrdata.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.loading = false;
                    $scope.FeePaymentNRData = res;
                    $scope.ExamMonthYearID = res[0].ExamMonthYearID;
                    $scope.AcademicYearID = res[0].AcademicYearID;
                    $scope.CourseDurationID = res[0].CourseDurationID;
                    $scope.BatchID = res[0].BatchID;
                    //$scope.getCourseDurations();
                    //$scope.currentAcademicYear();
                    //$scope.GetExamMonthYearData(res[0].AcademicYearID);
                    //$scope.getCcicCourseDurationBatches(res[0].CourseDurationID);
                    $scope.NoData = false;
                }
                else {
                    $scope.loading = false;
                    $scope.FeePaymentNRData = [];
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


        $scope.addNRData = function (monthyear, courseduration, academicYear, BaTch) {
     
            if ($scope.monthyear == '' || $scope.monthyear == undefined || $scope.monthyear == null) {
                alert('Please Select Exam Month Year')
                return;
            }


            if ($scope.courseduration == '' || $scope.courseduration == undefined || $scope.courseduration == null) {
                alert('Please Select Course Duration')
                return;
            }


            if ($scope.academicYear == '' || $scope.academicYear == undefined || $scope.academicYear == null) {
                alert('Please Select Academic Year')
                return;
            }

            if ($scope.BaTch == '' || $scope.BaTch == undefined || $scope.BaTch == null) {
                alert('Please Select Batch')
                return;
            }
            var StudentTypeID = 1;
            var paramObj = {
                "StudentTypeID": StudentTypeID,
                "ExamMonthYearID": monthyear,
                "CourseDurationID": courseduration,
                "AcademicYearID": academicYear,
                "BatchID": BaTch,
                "UserName": $scope.UserName,
            };
            var addnrdata = CcicPreExaminationService.AddNRDataforFeePayment(paramObj);
            addnrdata.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                }

                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                }

                else {
                    alert('Something Went Wrong')
                }



            }, function (error) {

                var err = JSON.parse(error);
            })



        }

        $scope.modify = function (ind) {
            $scope.viewField = true;
            $scope.modifyField = true;

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
                ele1[j].style['-webkit-appearance'] = "auto";
                ele1[j].style['-moz-appearance'] = "auto";
            }
            $scope['edit' + ind] = false;

        };

    })
})


