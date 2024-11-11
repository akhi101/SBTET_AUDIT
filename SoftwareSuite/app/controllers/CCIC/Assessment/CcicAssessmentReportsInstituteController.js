define(['app'], function (app) {
    app.controller("CcicAssessmentReportsInstituteController", function ($scope, $state, $uibModal, $localStorage, CcicPreExaminationService, CcicAssessmentService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        $scope.finalList = [];
        $scope.edit = true;
        $scope.update = false;
        var examCenters = [];
        const $ctrl = this;
        $ctrl.$onInit = () => {

        }


        var AcademicYearID = sessionStorage.getItem("AcademicYearID");
        var ExamMonthYearID = sessionStorage.getItem("ExamMonthYearID");
        var ExamTypeID = sessionStorage.getItem("ExamTypeID");
        var InstitutionID = sessionStorage.getItem("InstitutionID");


        $scope.clearSessionStorage = function () {
            sessionStorage.removeItem("AcademicYearID");
            sessionStorage.removeItem("ExamMonthYearID");
            sessionStorage.removeItem("ExamTypeID");
            sessionStorage.removeItem("InstitutionID");
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




        if (AcademicYearID != null || AcademicYearID != undefined || AcademicYearID != '') {
            $scope.AcademicYear = AcademicYearID;
            $scope.monthyear = ExamMonthYearID;
            $scope.examtype = ExamTypeID;

            var getCcicAcademicYearBatch = CcicPreExaminationService.GetExamMonthYears($scope.AcademicYear)
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
                    //alert("data is not loaded");
                    var err = JSON.parse(error);
                });
            var Count = CcicAssessmentService.GetAssessmentInstituteCount($scope.AcademicYear, $scope.monthyear, $scope.examtype);
            Count.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch (err) { }
                $scope.AssessmentInstituteCount = [];
                var TotalRecords = 0;
                var MarksPosted = 0;
                var MarksNotPosted = 0;
                var Submitted = 0;
                var NotSubmitted = 0;
                if (Res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.AssessmentInstituteCount = Res.Table;
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
                    $scope.AssessmentInstituteCount = [];

                    $scope.NoData = true;
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });
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

        var getExamTypes = CcicAssessmentService.getExamTypes()
            getExamTypes.then(function (res) {
                //try {
                //    var res = JSON.parse(res);
                //}
                //catch (err) { }

                if (res.length > 0) {
                    $scope.GetExamTypes = res;
                }
                else {
                    $scope.GetExamTypes = [];
                }
               
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });

        








        $scope.getAssessmentInstituteCount = function () {
            if (($scope.AcademicYear == undefined) || ($scope.AcademicYear == null) || ($scope.AcademicYear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.monthyear == undefined) || ($scope.monthyear == null) || ($scope.monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            if (($scope.examtype == undefined) || ($scope.examtype == null) || ($scope.examtype == "")) {
                alert("Select Exam Exam Type");
                return false;
            }
            var Count = CcicAssessmentService.GetAssessmentInstituteCount($scope.AcademicYear, $scope.monthyear, $scope.examtype);
            Count.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch (err) { }
                $scope.AssessmentInstituteCount = [];
                var TotalRecords = 0;
                var MarksPosted = 0;
                var MarksNotPosted = 0;
                var Submitted = 0;
                var NotSubmitted = 0;
                if (Res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.AssessmentInstituteCount = Res.Table;
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
                    $scope.AssessmentInstituteCount = [];

                    $scope.NoData = true;
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });
        }




        $scope.getAssessmentInstituteCountExcel = function () {
            $scope.loading = true;
            if (($scope.AcademicYear == undefined) || ($scope.AcademicYear == null) || ($scope.AcademicYear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.monthyear == undefined) || ($scope.monthyear == null) || ($scope.monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            if (($scope.examtype == undefined) || ($scope.examtype == null) || ($scope.examtype == "")) {
                alert("Select Exam Exam Type");
                return false;
            }
            var ReportExcel = CcicAssessmentService.GetAssessmentInstituteCountExcel(parseInt($scope.AcademicYear), parseInt($scope.monthyear), parseInt($scope.examtype));
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
                ExamTypeID: $scope.examtype,
                InstitutionID: InstitutionID

            };

            $state.go('CcicDashboard.Assessment.AssessmentReportsCourse');


        }





    })
})