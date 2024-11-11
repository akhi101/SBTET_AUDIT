﻿define(['app'], function (app) {

    app.controller("MarksEntrySubjectListController", function ($scope, $http, $localStorage, $state,$route, $stateParams, $location, AppSettings, MenuService, AssessmentService, SessionalsService) {
        $scope.college = null;
        $scope.AcademicId = 0;
        $scope.Admission = {};
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        $scope.CollegeID = authData.CollegeID;
        $scope.College_Code = authData.College_Code;
        $scope.College_Name = authData.College_Name;
        $scope.SystemUserTypeId = authData.SystemUserTypeId;
        $scope.BranchId = authData.BranchId;
        var StudentTypeId = $localStorage.assessment.StudentTypeId;
        var AcademicYearId = $localStorage.assessment.AcademicYearId

        $scope.LoadImgForSubject = true;
        $scope.exams = [];
        var cur = this;
        cur.reloadData = function () {
            $route.reload();
        }
        var subjectDetailsApi;

        $scope.subjectDetailsView = false;

        var subType = 0;
        function getSemSubjects(examName) {
            if (examName.examname == 'Internals') {
                subType = 1;
            }
            else if (examName.examname == 'Rubricks') {
                subType = 4;
            } else {
                subType = 2;
            }
            $scope.subjectDetailsView = true;
        }
        $scope.Showsubjects = function (exam) {


        }

        // For Getting Scheme for label
        var schemeStatus = AssessmentService.getSchemeStatus();
        schemeStatus.then(function (response) {
            var SchemesList = response.Table;
            SchemesList.forEach(function (scheme) {
                if ($scope.selectedsem.current_schemeid === scheme.SchemeID) {
                    $scope.loadedScheme = scheme;
                }
            });

        }, function (error) {
            alert("error");
        });

        $scope.AcademicYearsActiveResponse = $localStorage.AcademicYearsActiveResponse;
        $scope.selectedsem = $localStorage.selectedsem;
        $scope.branch = $localStorage.branchName;
        console.log($location.path());
        $scope.path = $localStorage.ModuleRouteName.replace(/[^a-zA-Z0-9]+/ig, "");
        $localStorage.modulesList.forEach(function (modules) {
            if (modules.ModuleRouteName == $scope.path) {
                $scope.examName = modules.ExamNames[0][0];
                $scope.exams = modules.ExamNames[0];

            }
        });

        $scope.getSemSubjectsResponse = [];
        $scope.loadedScheme = {};
        $scope.loadedScheme.SchemeID = $scope.selectedsem.current_schemeid;
        var getSemSubjectsService = SessionalsService.getSemSubjects($scope.selectedsem.semid, $localStorage.branchCode, $scope.loadedScheme.SchemeID, subType, StudentTypeId, AcademicYearId);

        getSemSubjectsService.then(function (response) {
            $scope.getSemSubjectsResponse = [];
            if (response.Table !== undefined && response.Table.length > 0) {
                $scope.LoadImgForSubject = false;
                $scope.subjectDetailsView = true;
                $scope.getSemSubjectsResponse = response.Table;
            }
            else {
                $scope.LoadImgForSubject = false;
                $scope.subjectDetailsView = false;
                alert("no subjects");
            }
        }, function (error) {
            alert("some thing went wrong");
        });

        $scope.getsubjects = function () {
           // getSemSubjects($scope.examName);
            $scope.getSemSubjectsResponse = [];
            $scope.loadedScheme = {};
            $scope.loadedScheme.SchemeID = $scope.selectedsem.current_schemeid;
            var getSemSubjectsService = SessionalsService.getSemSubjects($scope.selectedsem.semid, $localStorage.branchCode, $scope.loadedScheme.SchemeID, subType);

            getSemSubjectsService.then(function (response) {
                $scope.getSemSubjectsResponse = [];
                if (response.Table !== undefined && response.Table.length > 0) {
                    $scope.LoadImgForSubject = false;
                    $scope.subjectDetailsView = true;
                    $scope.getSemSubjectsResponse = response.Table;
                }
                else {
                    $scope.LoadImgForSubject = false;
                    $scope.subjectDetailsView = false;
                    alert("no subjects");
                }
            }, function (error) {
                alert("some thing went wrong");
            });
        };
      


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
            $localStorage.selectSubjectDetails = subject;
            $state.go("theory.marksEntry");
        }


        $scope.logOut = function () {
            $scope.$emit("logout", authData.userName);
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;
           
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };

        }
    });
});
