define(['app'], function (app) {
    app.controller("CcicInstitutewiseFeePaymentReportsController", function ($scope, $uibModal, $localStorage, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        var tmpData = $localStorage.TempData1;
        $scope.UserName = authData.UserName

        $scope.finalList = [];
        $scope.edit = true;
        $scope.update = false;
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getInstitutewiseCount();
        }





        $scope.getInstitutewiseCount = function () {
            var Count = CcicPreExaminationService.GetInstitutewiseFeePaymentCount(tmpData.AcademicYearID, tmpData.ExamMonthYearID, tmpData.CourseID);
            Count.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch (err) { }
                $scope.InstitutewiseCount = [];
                var Regular = 0;
                var RegularFeePaid = 0;
                var Backlog = 0;
                var BacklogFeePaid = 0;
                if (Res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.InstitutewiseCount = Res.Table;
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
                    $scope.InstitutewiseCount = [];

                    $scope.NoData = true;
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });
        }




        $scope.getInstitutewiseCountExcel = function () {
            $scope.loading = true;
            var ReportExcel = CcicPreExaminationService.GetInstitutewiseFeePaymentCountExcel(tmpData.AcademicYearID, tmpData.ExamMonthYearID, tmpData.CourseID);
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

        $scope.getAdminFeePaymentInstituteCount = function () {
            if (($scope.Academicyear == undefined) || ($scope.Academicyear == null) || ($scope.Academicyear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.Monthyear == undefined) || ($scope.Monthyear == null) || ($scope.Monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            var Count = CcicPreExaminationService.GetAdminFeePaymentInstituteCount($scope.Academicyear, $scope.Monthyear);
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
            if (($scope.Academicyear == undefined) || ($scope.Academicyear == null) || ($scope.Academicyear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.Monthyear == undefined) || ($scope.Monthyear == null) || ($scope.Monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            var ReportExcel = CcicPreExaminationService.GetAdmFeePaymentInstituteCountExcel(parseInt($scope.Academicyear), parseInt($scope.Monthyear));
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







    })
})