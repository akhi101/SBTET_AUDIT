define(['app'], function (app) {
    app.controller("ReportsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MenuService, AssessmentService, PracticalsService) {


        $scope.branch = $localStorage.assessment.branchName;
        var authData = $localStorage.authorizationData;
        $scope.College_Code = authData.College_Code;
        var authData = $localStorage.authorizationData;
        $scope.BranchId = authData.BranchId;
        $scope.subjectDetailsView = false;
        $scope.LoadImgForSubject = true;
        $scope.exams = [];
        $scope.ExamMonthYear = $localStorage.assessment.ExamMonthYear;
        $scope.AcademicYearsActiveResponse = $localStorage.assessment.AcademicYearsActiveResponse;
        $scope.selectedsem = $localStorage.assessment.selectedsem;
        //$scope.SchemeId = $localStorage.assessment.Scheme;
        $scope.branch = $localStorage.assessment.branchName;
        var branchCode = $localStorage.assessment.branchCode;
        var StudentTypeId = $localStorage.assessment.StudentTypeId;
        var AcademicYearId = $localStorage.assessment.AcademicYearId
        $scope.SchemeId = $localStorage.assessment.SchemeId;
        $scope.scheme = $localStorage.assessment.Scheme;

        var subjectDetailsApi;


        var examName = $localStorage.assessment.entryList;
        var examTypeid = $localStorage.assessment.entryListid;
        var subType = $localStorage.assessment.SubjectTypeId;

        // For Getting Scheme for label
        var schemeStatus = AssessmentService.getSchemeStatus();
        schemeStatus.then(function (response) {
            var SchemesList = response.Table;
            SchemesList.forEach(function (scheme) {
                if ($scope.SchemeId === scheme.SchemeID) {
                    $scope.loadedScheme = scheme;
                }
            });

        }, function (error) {
            alert("error");
        });

       
        $scope.getSemSubjectsResponse = [];
        $scope.loadedScheme = {};
        $scope.loadedScheme.SchemeID = $scope.SchemeId;
        var getSemSubjectsService = PracticalsService.getSemSubjects($scope.selectedsem.semid, branchCode, $scope.SchemeId, subType, examTypeid, $scope.College_Code, StudentTypeId, AcademicYearId, $scope.ExamMonthYear);
        getSemSubjectsService.then(function (response) {
            $scope.getSemSubjectsResponse = [];
            if (response.Table !== undefined && response.Table.length > 0) {
                $scope.LoadImgForSubject = false;
                $scope.subjectDetailsView = true;
                $scope.getSemSubjectsResponse = response.Table;
                var Total = 0;
                var NotPosted = 0;
                var Absent = 0;
                var MallPractice = 0;

                var TcTaken = 0;
                for (var i = 0; i < $scope.getSemSubjectsResponse.length; i++) {
                    if ($scope.getSemSubjectsResponse[i].total != null)
                        Total = Total + $scope.getSemSubjectsResponse[i].total;
                    if ($scope.getSemSubjectsResponse[i].notPosted != null)
                        NotPosted = NotPosted + $scope.getSemSubjectsResponse[i].notPosted;
                    if ($scope.getSemSubjectsResponse[i].absent != null)
                        Absent = Absent + $scope.getSemSubjectsResponse[i].absent;
                    if ($scope.getSemSubjectsResponse[i].mallPractice != null)
                        MallPractice = MallPractice + $scope.getSemSubjectsResponse[i].mallPractice;

                }
                $scope.Total = Total;
                $scope.NotPosted = NotPosted;
                $scope.Absent = Absent;
                $scope.MallPractice = MallPractice;
            }
            else {
                $scope.LoadImgForSubject = false;
                $scope.subjectDetailsView = false;
                alert("no subjects");
                $state.go("Dashboard.AssessmentDashboard.practicals");
            }
        }, function (error) {
            alert("some thing went wrong");
        });

        //$scope.getsubjects = function () {
        //    // getSemSubjects($scope.examName);
        //    $scope.getSemSubjectsResponse = [];
        //    $scope.loadedScheme = {};
        //    $scope.loadedScheme.SchemeID = $scope.selectedsem.current_schemeid;
        //    var getSemSubjectsService = PracticalsService.getSemSubjects($scope.selectedsem.semid, $localStorage.branchCode, $scope.loadedScheme.SchemeID, subType);

        //    getSemSubjectsService.then(function (response) {
        //        $scope.getSemSubjectsResponse = [];
        //        if (response.Table !== undefined && response.Table.length > 0) {
        //            $scope.LoadImgForSubject = false;
        //            $scope.subjectDetailsView = true;
        //            $scope.getSemSubjectsResponse = response.Table;
        //        }
        //        else {
        //            $scope.LoadImgForSubject = false;
        //            $scope.subjectDetailsView = false;
        //            alert("no subjects");
        //        }
        //    }, function (error) {
        //        alert("some thing went wrong");
        //    });
        //};



        //$scope.getExamStatus = function (exam) {
        //    $scope.examName = exam;
        //    $scope.homeDashBoard = false;
        //    $scope.getsubjects();
        //}

        $scope.OpenDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("Dashboard");
        }


        $scope.selectSubjectDetails = function (subject) {
            $localStorage.assessment.selectSubjectDetails = subject;
            $state.go("Dashboard.AssessmentDashboard.PracticalSummary");
        }


        $scope.logOut = function () {
            $scope.$emit("logout", authData.userName);
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;
            delete $localStorage.assessment;
           
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };

        }
    })
})