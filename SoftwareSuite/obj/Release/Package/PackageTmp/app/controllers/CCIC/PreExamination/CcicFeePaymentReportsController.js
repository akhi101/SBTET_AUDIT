define(['app'], function (app) {
    app.controller("CcicFeePaymentReportsController", function ($scope, $state, $uibModal, $localStorage, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        $scope.finalList = [];
        $scope.edit = true;
        $scope.update = false;
        var examCenters = [];
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

        $scope.getexamMonthYearData = function (AcademicYearID) {
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








        $scope.getAdminFeePaymentCount = function () {
            if (($scope.AcademicYear == undefined) || ($scope.AcademicYear == null) || ($scope.AcademicYear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.monthyear == undefined) || ($scope.monthyear == null) || ($scope.monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            var Count = CcicPreExaminationService.GetAdminFeePaymentInstituteCount($scope.AcademicYear, $scope.monthyear);
            Count.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch (err) { }
                $scope.AdminFeePaymentInstituteCount = [];
                var Regular = 0;
                var RegularFeePaid = 0;
                var Backlog = 0;
                var BacklogFeePaid = 0;
                var Registration = 0;
                var RegistrationFeePaid = 0;
                if (Res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.AdminFeePaymentInstituteCount = Res.Table;
                    for (var i = 0; i < Res.Table.length; i++) {
                        if (Res.Table[i].Regular != null)
                            Regular = Regular + Res.Table[i].Regular;
                        if (Res.Table[i].RegularFeePaid != null)
                            RegularFeePaid = RegularFeePaid + Res.Table[i].RegularFeePaid;
                        if (Res.Table[i].Backlog != null)
                            Backlog = Backlog + Res.Table[i].Backlog;
                        if (Res.Table[i].BacklogFeePaid != null)
                            BacklogFeePaid = BacklogFeePaid + Res.Table[i].BacklogFeePaid;
                        if (Res.Table[i].Registration != null)
                            Registration = Registration + Res.Table[i].Registration;
                        if (Res.Table[i].RegistrationFeePaid != null)
                            RegistrationFeePaid = RegistrationFeePaid + Res.Table[i].RegistrationFeePaid;
                    }
                    $scope.Regular = Regular;
                    $scope.RegularFeePaid = RegularFeePaid;
                    $scope.Backlog = Backlog;
                    $scope.BacklogFeePaid = BacklogFeePaid;
                    $scope.Registration = Registration;
                    $scope.RegistrationFeePaid = RegistrationFeePaid;
                    $scope.loading = false;

                }
                else {
                    $scope.loading = false;

                    $scope.loading = false;
                    $scope.AdminFeePaymentInstituteCount = [];

                    $scope.NoData = true;
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });
        }




        $scope.getAdmFeePaymentInstituteCountExcel = function () {
            $scope.loading = true;
            if (($scope.AcademicYear == undefined) || ($scope.AcademicYear == null) || ($scope.AcademicYear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.monthyear == undefined) || ($scope.monthyear == null) || ($scope.monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            var ReportExcel = CcicPreExaminationService.GetAdmFeePaymentInstituteCountExcel(parseInt($scope.AcademicYear), parseInt($scope.monthyear));
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

        $scope.getAdminFeePaymentCourseCount = function () {
            if (($scope.Academicyear == undefined) || ($scope.Academicyear == null) || ($scope.Academicyear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.Monthyear == undefined) || ($scope.Monthyear == null) || ($scope.Monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            var Count = CcicPreExaminationService.GetAdminFeePaymentCourseCount($scope.Academicyear, $scope.Monthyear);
            Count.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch (err) { }
                $scope.AdminFeePaymentCourseCount = [];
                var Regular = 0;
                var RegularFeePaid = 0;
                var Backlog = 0;
                var BacklogFeePaid = 0;
                if (Res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.AdminFeePaymentCourseCount = Res.Table;
                    for (var i = 0; i < Res.Table.length; i++) {
                        if (Res.Table[i].Regular != null)
                            Regular = Regular + Res.Table[i].Regular;
                        if (Res.Table[i].RegularFeePaid != null)
                            RegularFeePaid = RegularFeePaid + Res.Table[i].RegularFeePaid;
                        if (Res.Table[i].Backlog != null)
                            Backlog = Backlog + Res.Table[i].Backlog;
                        if (Res.Table[i].BacklogFeePaid != null)
                            BacklogFeePaid = BacklogFeePaid + Res.Table[i].BacklogFeePaid;
                    }
                    $scope.Regular = Regular;
                    $scope.RegularFeePaid = RegularFeePaid;
                    $scope.Backlog = Backlog;
                    $scope.BacklogFeePaid = BacklogFeePaid;
                    $scope.loading = false;

                }
                else {
                    $scope.loading = false;

                    $scope.loading = false;
                    $scope.AdminFeePaymentCourseCount = [];

                    $scope.NoData = true;
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });
        }




        $scope.getAdmFeePaymentCourseCountExcel = function () {
            $scope.loading = true;
            if (($scope.Academicyear == undefined) || ($scope.Academicyear == null) || ($scope.Academicyear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.Monthyear == undefined) || ($scope.Monthyear == null) || ($scope.Monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            var ReportExcel = CcicPreExaminationService.GetAdmFeePaymentCourseCountExcel(parseInt($scope.Academicyear), parseInt($scope.Monthyear));
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

        $scope.getCoursewiseCount = function (InstitutionID) {

            $localStorage.TempData = {
                AcademicYearID: $scope.AcademicYear,
                ExamMonthYearID: $scope.monthyear,
                InstitutionID: InstitutionID

            };

            $state.go('CcicDashboard.PreExamination.CoursewiseFeePaymentReports');


        }

        $scope.getInstitutewiseCount = function (CourseID) {

            $localStorage.TempData1 = {
                AcademicYearID: $scope.Academicyear,
                ExamMonthYearID: $scope.Monthyear,
                CourseID: CourseID

            };

            $state.go('CcicDashboard.PreExamination.InstitutewiseFeePaymentReports');


        }



    })
})