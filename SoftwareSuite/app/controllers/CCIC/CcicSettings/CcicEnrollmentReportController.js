define(['app'], function (app) {
    app.controller("CcicEnrollmentReport", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tmp = $localStorage.TempData;
        var InstitutionID = authData.InstitutionID;

        var newtemp = $localStorage.NewTemp;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.AdminRegisterInsTable = false;
            $scope.RegisterCoursesTable = false;
            $scope.DropDownTable = true;
            //$scope.GetNewAdmDetails(newtemp.academicYear,newtemp.batch);
        }

        var AcademicYearID = sessionStorage.getItem("AcademicYearID");
        var ExamMonthYearID = sessionStorage.getItem("ExamMonthYearID");
        var CourseID = sessionStorage.getItem("CourseID");

        $scope.clearSessionStorage = function () {
            sessionStorage.removeItem("AcademicYearID");
            sessionStorage.removeItem("ExamMonthYearID");
            sessionStorage.removeItem("CourseID");
        };

        // Function to detect browser refresh
        $scope.detectRefresh = function () {
            if (!performance.navigation.type || performance.navigation.type === 1) {
                // Browser refresh detected, clear session storage
                $scope.clearSessionStorage();
            }
        };

        // Call detectRefresh on page load
        $scope.detectRefresh();
        //var data = [];
        //$scope.$emit('showLoading', data);

        $scope.loading = false;
        $scope.getAdminEnrollReportCount = function (academicYear, batch) {
            if ($scope.UserTypeID == 1 || $scope.UserTypeID == 4 || $scope.UserTypeID == 5 || $scope.UserTypeID == 6 ||
                $scope.UserTypeID == 7 || $scope.UserTypeID == 8 || $scope.UserTypeID == 9 || $scope.UserTypeID == 10) {
                $scope.GetAdmDetails(academicYear, batch);
            }
            else if ($scope.UserTypeID == 2)
                $scope.showEnrollCoursesCount(InstitutionID, academicYear, batch);
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

       


        $scope.GetAdmDetails = function (academicYear, batch) {
            if ($scope.academicYear == null || $scope.academicYear == undefined || $scope.academicYear == "") {
                alert('Select Academic Year');
                return;
            }
            if ($scope.batch == null || $scope.batch == undefined || $scope.batch == "") {
                alert('Select Batch');
                return;
            }

            $scope.loading = true;
            $scope.DropDownTable = true;
            $scope.AdminRegisterInsTable = true;
            $scope.RegisterCoursesTable = false;
            var registerreportCount = CcicPreExaminationService.GetAdminRegisterReportCount(academicYear, batch);
            registerreportCount.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch (err) { }
                $scope.AdmEnrollReportInsCountTable = [];
                var Enrolled = 0;
                var Submitted = 0;
                var Approved = 0;
                var Pending = 0;
                var Revised = 0;
                var Rejected = 0;

                if (Res.length > 0) {
                    $scope.AdmEnrollReportInsCountTable = Res;
                    for (var i = 0; i < Res.length; i++) {
                        if (Res[i].Enrolled != null)
                            Enrolled = Enrolled + Res[i].Enrolled;
                        if (Res[i].Submitted != null)
                            Submitted = Submitted + Res[i].Submitted;
                        if (Res[i].Approved != null)
                            Approved = Approved + Res[i].Approved;
                        if (Res[i].Pending != null)
                            Pending = Pending + Res[i].Pending;
                        if (Res[i].Revised != null)
                            Revised = Revised + Res[i].Revised;
                        if (Res[i].Rejected != null)
                            Rejected = Rejected + Res[i].Rejected;
                    }
                    $scope.Enrolled = Enrolled;
                    $scope.Submitted = Submitted;
                    $scope.Approved = Approved;
                    $scope.Pending = Pending;
                    $scope.Revised = Revised;
                    $scope.Rejected = Rejected;
                    $scope.loading = false;
                    $scope.NoData = false;
                }
                else {
                    $scope.loading = false;
                    $scope.AdmEnrollReportInsCountTable = [];
                    $scope.NoData = true;


                    //$scope.$emit('hideLoading', data);

                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });
        }




        $scope.showEnrollCoursesCount = function (InstitutionID, academicYear, batch) {
            if (InstitutionID == null || InstitutionID == undefined || InstitutionID == "") {
                alert('Select Institution ID');
                return;
            }

            if ($scope.academicYear == null || $scope.academicYear == undefined || $scope.academicYear == "") {
                alert('Select Academic Year');
                return;
            }
            if ($scope.batch == null || $scope.batch == undefined || $scope.batch == "") {
                alert('Select Batch');
                return;
            }
            $scope.loading = true;
            $scope.AdminRegisterInsTable = false;
            $scope.RegisterCoursesTable = true;
            $scope.DropDownTable = true;
            var regcourscount = CcicPreExaminationService.GetRegisterCoursesCount(InstitutionID, academicYear, batch);
            regcourscount.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.EnrollCoursesCountTable = [];
                if (res.length >= 0) {
                    $scope.loading = false;
                    $scope.EnrollCoursesCountTable = res;
                    $scope.NoData = false;
                    //$scope.$emit('hideLoading', data);

                } else {
                    $scope.loading = false;
                    $scope.EnrollCoursesCountTable = [];
                    $scope.NoData = true;
                    //    $scope.$emit('hideLoading', data);
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });



        }




        if ($scope.UserTypeID == 2) {
            /*$scope.UserDetails(InstitutionID);*/
            $scope.UserDetails = function (InstitutionID, CourseID, ReportTypeID, academicYear, batch) {

                $localStorage.TempData2 = {
                    InstitutionID: InstitutionID,
                    CourseID: CourseID,
                    ReportTypeID: ReportTypeID,
                    academicYear: academicYear,
                    batch: batch,
                };
                $state.go('CcicDashboard.Academic.CcicEnrollmentReportData');


            }
        }







        if ($scope.UserTypeID == 1 || $scope.UserTypeID == 4 || $scope.UserTypeID == 5 || $scope.UserTypeID == 6 ||
            $scope.UserTypeID == 7 || $scope.UserTypeID == 8 || $scope.UserTypeID == 9 || $scope.UserTypeID == 10) {
            $scope.showAdminEnrollCoursesCount = function (InstitutionID, academicYear, batch, Institution) {

                $localStorage.TempData = {
                    InstitutionID: InstitutionID,
                    academicYear: academicYear,
                    batch: batch,
                    Institution: Institution
                };

                $state.go('CcicDashboard.Academic.CcicAdmEnrollReportCourses');

            }

        }

    });
});




