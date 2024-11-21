(function () {
    'use strict';
    angular.module('app')
        .controller('examTimeTableController',
        function ($rootScope, $scope, examTimeTableService, basicCourseService, basicBranchService, basicExamService, basicSubjectService, basicExamSubjectService, AppSettings) {


                $scope.examTimeTableDetail = {};
                $scope.examTimeTableDetail.examTimeTableSubjects = {};
                $scope.examTimeTableSubjectDetails = [];
                $scope.isValid = false;

                $scope.init = function () {
                    getAllBasicCourse();
                    $scope.examSessions = [
                        { examSessionName: 'ForeNoon', examSession: 'M' },
                        { examSessionName: 'AfterNoon', examSession: 'A' }
                        //{ examSessionName: 'Morning', examSession: 'M' },
                        //{ examSessionName: 'Afternoon', examSession: 'A' },
                        //{ examSessionName: 'Evening', examSession: 'E' }
                    ];
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                $scope.$watch('examTimeTableDetail.CourseID', function () {
                    if ($scope.examTimeTableDetail.CourseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.examTimeTableDetail.CourseID).then(function (results) {
                            $scope.basicBranches = results;
                        });
                        basicExamService.getBasicExamListByCourseID($scope.examTimeTableDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });

                //$scope.$watch('examTimeTableDetail.branchID', function () {

                //});
                $scope.showExamTimeTableSubjects = function () {
                    if ($scope.examTimeTableForm.$valid && $scope.examTimeTableDetail.BranchID !== undefined && $scope.examTimeTableDetail.ExamID !== undefined) {
                        $scope.examTimeTableDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        examTimeTableService.getExamTimeTableSubjectByExamIDBranchID($scope.examTimeTableDetail.ExamID, $scope.examTimeTableDetail.BranchID, $scope.examTimeTableDetail.ExamInstID).then(function (results) {
                            $scope.examTimeTableSubjects = results;
                            for (var i = 0; i < $scope.examTimeTableSubjects.length; i++) {
                                if ($scope.examTimeTableSubjects[i].StringStartDate != null) {
                                    $scope.examTimeTableSubjects[i].StartDate = new Date($scope.examTimeTableSubjects[i].StartDate);
                                }
                            }
                        });
                    }
                };

                $scope.saveExamTimeTable = function () {
                    if ($scope.examTimeTableForm.$valid && $scope.examTimeTableSubjectsForm.$valid) {
                        $scope.examTimeTableSubjectDetails = [];
                        for (var i = 0; i < $scope.examTimeTableSubjects.length; i++) {
                            if ($scope.examTimeTableSubjectDetails.length > 0) {
                                for (var j = 0; j < $scope.examTimeTableSubjectDetails.length; j++) {
                                    if (window.moment(new Date($scope.examTimeTableSubjects[i].StartDate)).format("YYYY-MM-DD") != $scope.examTimeTableSubjectDetails[j].StartDate) {
                                        $scope.isValid = true;
                                    } else {
                                        $scope.isValid = false;
                                        alert("Date should not be same as previous one");
                                        break;
                                    }
                                }
                                if ($scope.isValid === false) {
                                    break;
                                }
                            } else $scope.isValid = true;                                             
                            if ($scope.isValid) {
                                if ($scope.examTimeTableSubjects[i].StartTime != null && $scope.examTimeTableSubjects[i].EndTime != null) {
                                    if (Date.parse($scope.examTimeTableSubjects[i].StartTime) < Date.parse($scope.examTimeTableSubjects[i].EndTime)) {
                                        var temp = {};
                                        $scope.tempDetails = {};
                                        $scope.tempDetails.StartDate = window.moment(new Date($scope.examTimeTableSubjects[i].StartDate)).format("YYYY-MM-DD");
                                        $scope.tempDetails.EndDate = window.moment(new Date($scope.examTimeTableSubjects[i].StartDate)).format("YYYY-MM-DD");
                                        $scope.tempDetails.StartTime = window.moment($scope.examTimeTableSubjects[i].StartTime).format('hh:mm a');
                                        $scope.tempDetails.EndTime = window.moment($scope.examTimeTableSubjects[i].EndTime).format('hh:mm a');
                                        //$scope.tempDetails.evalTypID = $scope.examTimeTableSubjects[i].evalTypID;
                                        $scope.tempDetails.ExamSession = $scope.examTimeTableSubjects[i].ExamSession;
                                        $scope.tempDetails.ExmSubID = $scope.examTimeTableSubjects[i].ExmSubID;
                                        $scope.tempDetails.ExmTmTbID = $scope.examTimeTableSubjects[i].ExmTmTbID;
                                        $scope.tempDetails.ExamInstID = AppSettings.ExamInstID;
                                        $scope.tempDetails.CreLoginID = AppSettings.LoggedUserId;
                                        $scope.tempDetails.UpdLoginID = AppSettings.LoggedUserId;
                                        angular.copy($scope.tempDetails, temp);
                                        $scope.examTimeTableSubjectDetails.push(temp);
                                        $scope.tempDetails = {};
                                        $scope.isValid = true; 
                                    }
                                    else {
                                        alert("End time should be grater than start time");
                                        $scope.isValid = false;
                                        break;
                                    }
                                } else {
                                    alert("Please enter time");
                                    $scope.isValid = false;
                                    break;
                                } 
                            }                                       
                        }
                        if ($scope.examTimeTableSubjectDetails.length>0 && $scope.isValid) {
                            $scope.examTimeTableDetail.examTimeTableSubjects = $scope.examTimeTableSubjectDetails;
                            examTimeTableService.putExamTimeTable($scope.examTimeTableDetail).then(function (results) {
                                if (results.IsSuccess) {
                                    $scope.examTimeTableDetail = {};
                                    $scope.examTimeTableSubjects = [];
                                    alert(results.Message);
                                } else {
                                    $scope.examTimeTableDetail = {};
                                    $scope.examTimeTableSubjects = [];
                                    alert(results.Message);
                                }
                            }, function (error) {
                                $scope.examTimeTableDetail = {};
                                $scope.examTimeTableSubjects = [];
                                alert(error.statusText);
                            });
                        }
                    }
                };
            });
}());