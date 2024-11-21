////define(['app'], function (app) {
////    app.controller("CcicRegisterCoursesController", function ($scope, $localStorage, $state, CcicPreExaminationService) {

////        var authData = $localStorage.authorizationData;
////        $scope.UserName = authData.UserName;
////        $scope.UserTypeID = authData.UserTypeID;
////        var tmp = $localStorage.TempData;



////        const $ctrl = this;
////        $ctrl.$onInit = () => {


////        }




////        var regcourscount = CcicPreExaminationService.GetRegisterCoursesCount(InstitutionID, $scope.academicYear, $scope.batch);
////        regcourscount.then(function (response) {
////            try {
////                var res = JSON.parse(response);
////            }
////            catch (err) { }
////            $scope.RegisterCoursesCountTable = [];
////            if (res.length >= 0) {
////                $scope.RegisterCoursesCountTable = res;
////            } else {
////                $scope.RegisterCoursesCountTable = [];
////            }
////        },
////            function (error) {
////                //   alert("error while loading Notification");
////                var err = JSON.parse(error);
////            });


////        $scope.UserDetails = function (CourseID, ReportTypeID) {

////            $localStorage.TempData2 = {

////                CourseID: CourseID,
////                ReportTypeID: ReportTypeID,

////            };

////            $state.go('CcicDashboard.Academic.CcicRegisterReportData');


////        }



////    });
////});

