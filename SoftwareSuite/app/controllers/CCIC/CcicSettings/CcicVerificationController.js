define(['app'], function (app) {
    app.controller("CcicVerificationController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tmp = $localStorage.TempData;

        const $ctrl = this;
        $ctrl.$onInit = () => {


        }

        var GetCcicAcademicYears = CcicPreExaminationService.GetCcicAcademicYears()
        GetCcicAcademicYears.then(function (response) {
            $scope.loading = false;
            $scope.GetCcicAcademicYears = response.Table;
            //$scope.$emit('hideLoading', data);

        },
            function (error) {
                alert("data is not loaded");
                var err = JSON.parse(error);
                console.log(err.Message);
            });





        if ($scope.UserTypeID == 1 || $scope.UserTypeID == 5 || $scope.UserTypeID == 6 ||
            $scope.UserTypeID == 7 || $scope.UserTypeID == 8 || $scope.UserTypeID == 9 || $scope.UserTypeID == 10) {
            $scope.Pen = true;
            $scope.ApproveButton = true;
        }
        else if ($scope.UserTypeID == 4) {
            $scope.RecommendButton = true;

        }

        if ($scope.UserTypeID == 1 || $scope.UserTypeID == 4 || $scope.UserTypeID == 5 || $scope.UserTypeID == 6 ||
            $scope.UserTypeID == 7 || $scope.UserTypeID == 8 || $scope.UserTypeID == 9 || $scope.UserTypeID == 10) {
            $scope.loading = true;



            $scope.showAdminVerificationInsCount = function (AcademicYearID,Batch,InstitutionID) {

                $localStorage.TempData = {
                    AcademicYearID: AcademicYearID,
                    Batch: Batch,
                    InstitutionID: InstitutionID
                };

                $state.go('CcicDashboard.Academic.CcicAdmVerificationCourses');

            }

            $scope.getAdminVerReportCount = function (academicYear, batch) {
                var adminverificationreportinsCount = CcicPreExaminationService.GetAdminVerificationReportInsCount(academicYear, batch);
                adminverificationreportinsCount.then(function (response) {
                    try {
                        var Res = JSON.parse(response);
                    }
                    catch (err) {}
                    $scope.AdminVerificationReportInsCountTable = [];
                    var Enrolled = 0;
                    var Submitted = 0;
                    var Approved = 0;
                    var Pending = 0;
                    var Revised = 0;
                    var Rejected = 0;
                    var Recommended = 0;

                    if (Res.Table.length > 0) {
                        $scope.AdminVerificationReportInsCountTable = Res.Table;
                        $scope.AdminVerificationReportTable = true;
                        for (var i = 0; i < Res.Table.length; i++) {
                            if (Res.Table[i].Enrolled != null)
                                Enrolled = Enrolled + Res.Table[i].Enrolled;
                            if (Res.Table[i].Submitted != null)
                                Submitted = Submitted + Res.Table[i].Submitted;
                            if (Res.Table[i].Approved != null)
                                Approved = Approved + Res.Table[i].Approved;
                            if (Res.Table[i].Pending != null)
                                Pending = Pending + Res.Table[i].Pending;
                            if (Res.Table[i].Revised != null)
                                Revised = Revised + Res.Table[i].Revised;
                            if (Res.Table[i].Rejected != null)
                                Rejected = Rejected + Res.Table[i].Rejected;
                            if (Res.Table[i].Recommended != null)
                                Recommended = Recommended + Res.Table[i].Recommended;
                        }
                        $scope.Enrolled = Enrolled;
                        $scope.Submitted = Submitted;
                        $scope.Approved = Approved;
                        $scope.Pending = Pending;
                        $scope.Revised = Revised;
                        $scope.Rejected = Rejected;
                        $scope.Recommended = Recommended;
                        $scope.loading = false;
                    }
                    else {
                        $scope.loading = false;
                        $scope.AdminVerificationReportInsCountTable = [];
                    }
                },
                    function (error) {
                        //   alert("error while loading Notification");
                        var err = JSON.parse(error);
                    });

            }



        }

        else if ($scope.UserTypeID == 2) {

            $scope.getInsVerReportCount = function () {
                $scope.loading = true;
                $scope.VerificationReportCoursesTable = true;
                $scope.AdminVerificationReportTable = false;
                var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID

                var verrepcoursescount = CcicPreExaminationService.GetInsVerificationReportCoursesCount($scope.academicYear,$scope.batch,InstitutionID);
                verrepcoursescount.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    }
                    catch (err) { }
                    $scope.VerificationReportCoursesTable = [];
                    if (res.length >= 0) {
                        $scope.loading = false;
                        $scope.VerificationReportCoursesTable = res;
                        $scope.$emit('hideLoading', data);

                    } else {
                        $scope.loading = false
                        $scope.VerificationReportCoursesTable = [];
                        $scope.$emit('hideLoading', data);

                    }
                },
                    function (error) {
                        //   alert("error while loading Notification");
                        var err = JSON.parse(error);
                    });

            }

            $scope.showDetails = function (CourseID, ReportTypeID) {

                $localStorage.TempData2 = {
                    CourseID: CourseID,
                    ReportTypeID: ReportTypeID,

                };
                $state.go('CcicDashboard.Academic.CcicVerificationData');

            }


        }






    });
});















