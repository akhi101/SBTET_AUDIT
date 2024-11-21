define(['app'], function (app) {
    app.controller("CcicRegisterController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

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

        //var data = [];
        //$scope.$emit('showLoading', data);

        $scope.loading = false;
        $scope.getAdminRegisterReportCount = function (academicYear, batch) {
            if ($scope.UserTypeID == 1 || $scope.UserTypeID == 4 || $scope.UserTypeID == 5 || $scope.UserTypeID == 6 ||
                $scope.UserTypeID == 7 || $scope.UserTypeID == 8 || $scope.UserTypeID == 9 || $scope.UserTypeID == 10) {
                $scope.GetAdmDetails(academicYear, batch);
            }
            else if ($scope.UserTypeID == 2)
                $scope.showRegisterCoursesCount(InstitutionID,academicYear, batch);
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

        //$scope.GetNewAdmDetails = function () {
        //    if (newtemp.academicYear == null || newtemp.academicYear == undefined || newtemp.academicYear == "") {
        //        alert('Select Academic Year');
        //        return;
        //    }
        //    if (newtemp.batch == null || newtemp.batch == undefined || newtemp.batch == "") {
        //        alert('Select Batch');
        //        return;
        //    }

        //    $scope.loading = true;
        //    $scope.DropDownTable = true;
        //    $scope.AdminRegisterInsTable = true;
        //    $scope.RegisterCoursesTable = false;
        //    var registerreportCount = CcicPreExaminationService.GetAdminRegisterReportCount(newtemp.academicYear, newtemp.batch);
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
            var registerreportCount = CcicPreExaminationService.GetAdminRegisterReportCount(academicYear,batch);
            registerreportCount.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch (err) { }
                $scope.AdmRegisterReportInsCountTable = [];
                var Enrolled = 0;
                var Submitted = 0;
                var Approved = 0;
                var Pending = 0;
                var Revised = 0;
                var Rejected = 0;

                if (Res.length > 0) {
                    $scope.AdmRegisterReportInsCountTable = Res;
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
                    $scope.AdmRegisterReportInsCountTable = [];
                    $scope.NoData = true;


                    //$scope.$emit('hideLoading', data);

                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });
        }




        $scope.showRegisterCoursesCount = function (InstitutionID, academicYear, batch) {
            if (InstitutionID == null || InstitutionID == undefined || InstitutionID == "")  {
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
                $scope.RegisterCoursesCountTable = [];
                if (res.length >= 0) {
                    $scope.loading = false;
                    $scope.RegisterCoursesCountTable = res;
                    $scope.NoData = false;
                    //$scope.$emit('hideLoading', data);

                } else {
                    $scope.loading = false;
                    $scope.RegisterCoursesCountTable = [];
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
                  $state.go('CcicDashboard.Academic.CcicRegisterReportData');

              
            }
        }


           
        
     


        if ($scope.UserTypeID == 1 || $scope.UserTypeID == 4 || $scope.UserTypeID == 5 || $scope.UserTypeID == 6 ||
            $scope.UserTypeID == 7 || $scope.UserTypeID == 8 || $scope.UserTypeID == 9 || $scope.UserTypeID==10) {
            $scope.showAdminRegisterCoursesCount = function (InstitutionID, academicYear, batch, Institution) {

                $localStorage.TempData = {
                    InstitutionID: InstitutionID,
                    academicYear: academicYear,
                    batch: batch,
                    Institution: Institution
                };

                $state.go('CcicDashboard.Academic.CcicAdmRegisterReportCourses');

            }

        }
       
    });
});




