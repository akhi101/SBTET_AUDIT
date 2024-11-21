define(['app'], function (app) {
    app.controller("CcicAdmRegisterReportCourses", function ($scope, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tmp = $localStorage.TempData;

        $scope.Institution = tmp.Institution;

        const $ctrl = this;
        $ctrl.$onInit = () => {


        }

        $scope.goBack = function () {
            $localStorage.NewTemp = {
                academicYear: tmp.academicYear,
                batch: tmp.batch

            };
            $state.go('CcicDashboard.Academic.Register');
            //$scope.GetAdmDetails();
        }

        //$scope.GetAdmDetails = function () {
        //    if (tmp.academicYear == null || tmp.academicYear == undefined || tmp.academicYear == "") {
        //        alert('Select Academic Year');
        //        return;
        //    }
        //    if (tmp.batch == null || tmp.batch == undefined || tmp.batch == "") {
        //        alert('Select Batch');
        //        return;
        //    }

        //    $scope.loading = true;
        //    $scope.DropDownTable = true;
        //    $scope.AdminRegisterInsTable = true;
        //    $scope.RegisterCoursesTable = false;
        //    var registerreportCount = CcicPreExaminationService.GetAdminRegisterReportCount(tmp.academicYear, tmp.batch);
        //    registerreportCount.then(function (response) {
        //        try {
        //            var Res = JSON.parse(response);
        //        }
        //        catch (err) { }
        //        $scope.AdmRegisterReportInsCountTable = [];
        //        var Enrolled = 0;
        //        var Submitted = 0;
        //        var Approved = 0;
        //        var Pending = 0;
        //        var Revised = 0;
        //        var Rejected = 0;

        //        if (Res.length > 0) {
        //            $scope.AdmRegisterReportInsCountTable = Res;
        //            for (var i = 0; i < Res.length; i++) {
        //                if (Res[i].Enrolled != null)
        //                    Enrolled = Enrolled + Res[i].Enrolled;
        //                if (Res[i].Submitted != null)
        //                    Submitted = Submitted + Res[i].Submitted;
        //                if (Res[i].Approved != null)
        //                    Approved = Approved + Res[i].Approved;
        //                if (Res[i].Pending != null)
        //                    Pending = Pending + Res[i].Pending;
        //                if (Res[i].Revised != null)
        //                    Revised = Revised + Res[i].Revised;
        //                if (Res[i].Rejected != null)
        //                    Rejected = Rejected + Res[i].Rejected;
        //            }
        //            $scope.Enrolled = Enrolled;
        //            $scope.Submitted = Submitted;
        //            $scope.Approved = Approved;
        //            $scope.Pending = Pending;
        //            $scope.Revised = Revised;
        //            $scope.Rejected = Rejected;
        //            $scope.loading = false;
        //        }
        //        else {
        //            $scope.loading = false;
        //            $scope.AdmRegisterReportInsCountTable = [];
        //            $scope.NoData = true;


        //            //$scope.$emit('hideLoading', data);

        //        }
        //    },
        //        function (error) {
        //            //   alert("error while loading Notification");
        //            var err = JSON.parse(error);
        //        });
        //}

        var data = [];
        $scope.$emit('showLoading', data);

        $scope.loading = true;
        var InstitutionID = (authData.InstitutionID == undefined || authData.InstitutionID == '' || authData.InstitutionID == 0) ? tmp.InstitutionID : authData.InstitutionID
        var registerreportcoursesCount = CcicPreExaminationService.GetInsRegisterReportCoursesCount(InstitutionID,tmp.academicYear,tmp.batch);
        registerreportcoursesCount.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.RegisterReportCoursesTable = [];
            if (res.length >= 0) {
                $scope.loading = false;
                $scope.RegisterReportCoursesTable = res;
                $scope.$emit('hideLoading', data);

            } else {
                $scope.loading = false;
                $scope.RegisterReportCoursesTable = [];
                $scope.$emit('hideLoading', data);

            }
        },
            function (error) {
                //   alert("error while loading Notification");
                var err = JSON.parse(error);
            });


    



        $scope.ShowDetails = function (InstitutionID, CourseID, ReportTypeID, academicYear, batch, Course) {

            $localStorage.TempData2 = {
                InstitutionID: InstitutionID,
                CourseID: CourseID,
                ReportTypeID: ReportTypeID,
                academicYear: academicYear,
                batch: batch,
                Course: Course,
                Institution: $scope.Institution

            };

            $state.go('CcicDashboard.Academic.CcicAdmRegisterReportData');


        }



    });
});

