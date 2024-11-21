define(['app'], function (app) {
    app.controller("CcicAssessmentReportsCourseController", function ($scope, $state, $uibModal, $localStorage, CcicPreExaminationService, CcicAssessmentService, CcicSystemUserService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName
        var tmpData = $localStorage.TempData;
        $scope.finalList = [];
        $scope.edit = true;
        $scope.update = false;
        var examCenters = [];
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getAssessmentInstituteCourseCount();
        }


        $scope.back = function () {

            var AcademicYearID = tmpData.AcademicYearID
            var ExamMonthYearID = tmpData.ExamMonthYearID
            var ExamTypeID = tmpData.ExamTypeID
            var InstitutionID = tmpData.InstitutionID
            sessionStorage.setItem("AcademicYearID", AcademicYearID);
            sessionStorage.setItem("ExamMonthYearID", ExamMonthYearID);
            sessionStorage.setItem("ExamTypeID", ExamTypeID);
            sessionStorage.setItem("InstitutionID", InstitutionID);
            $state.go("CcicDashboard.Assessment.AssessmentReports");
        }

      
        $scope.getAssessmentInstituteCourseCount = function () {
            var Count = CcicAssessmentService.GetAssessmentInstituteCourseCount(tmpData.AcademicYearID, tmpData.ExamMonthYearID, tmpData.ExamTypeID,tmpData.InstitutionID);
            Count.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch (err) { }
                $scope.AssessmentInstituteCourseCount = [];
                var TotalRecords = 0;
                var MarksPosted = 0;
                var MarksNotPosted = 0;
                var Submitted = 0;
                var NotSubmitted = 0;
                if (Res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.AssessmentInstituteCourseCount = Res.Table;
                    for (var i = 0; i < Res.Table.length; i++) {
                        if (Res.Table[i].TotalRecords != null)
                            TotalRecords = TotalRecords + Res.Table[i].TotalRecords;
                        if (Res.Table[i].MarksPosted != null)
                            MarksPosted = MarksPosted + Res.Table[i].MarksPosted;
                        if (Res.Table[i].MarksNotPosted != null)
                            MarksNotPosted = MarksNotPosted + Res.Table[i].MarksNotPosted;
                        if (Res.Table[i].Submitted != null)
                            Submitted = Submitted + Res.Table[i].Submitted;
                        if (Res.Table[i].NotSubmitted != null)
                            NotSubmitted = NotSubmitted + Res.Table[i].NotSubmitted;
                    }
                    $scope.TotalRecords = TotalRecords;
                    $scope.MarksPosted = MarksPosted;
                    $scope.MarksNotPosted = MarksNotPosted;
                    $scope.Submitted = Submitted;
                    $scope.NotSubmitted = NotSubmitted;
                    $scope.loading = false;

                }
                else {
                    $scope.loading = false;

                    $scope.loading = false;
                    $scope.AssessmentInstituteCourseCount = [];

                    $scope.NoData = true;
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });
        }




       


        $scope.getInstituteCourseSubjectwiseCount = function (CourseID) {

            $localStorage.TempData1 = {
                AcademicYearID: tmpData.AcademicYearID,
                ExamMonthYearID: tmpData.ExamMonthYearID,
                ExamTypeID: tmpData.ExamTypeID,
                InstitutionID: tmpData.InstitutionID,
                CourseID: CourseID

            };

            $state.go('CcicDashboard.Assessment.AssessmentReportsSubject');


        }



        $scope.logOut = function () {
            //$scope.$emit("logout", authData.UserName);
            sessionStorage.loggedIn = "no";
            var GetCcicUserLogout = CcicSystemUserService.PostCcicUserLogout($scope.UserName, $scope.SessionID);

            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;

            $scope.authentication = {
                isAuth: false,
                UserID: 0,
                UserName: ""
            };
            $state.go('CcicLogin');
        }





    })
})