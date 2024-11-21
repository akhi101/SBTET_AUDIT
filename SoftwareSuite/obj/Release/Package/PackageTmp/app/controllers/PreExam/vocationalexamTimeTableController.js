(function () {
    'use strict';
    angular.module('app')
        .controller('vocationalexamTimeTableController',
            function ($rootScope, $scope, examTimeTableService, basicCourseService, basicBranchService, basicExamService, basicSubjectService, basicExamSubjectService, basicMainGroupService, AppSettings) {


                $scope.vocationalexamTimeTableDetail = {};
                $scope.vocationalexamTimeTableDetail.examTimeTableSubjects = {};
                $scope.examTimeTableSubjectDetails = [];
                $scope.isValid = false;
                $scope.ExamInstID = 0;

                $scope.init = function () {
                    // getAllBasicCourse();
                    $scope.basicCourses = [{ CourseName: 'Vocational', CourseID: 2 }];
                    $scope.examSessions = [
                        { examSessionName: 'ForeNoon', examSession: 'M' },
                        { examSessionName: 'AfterNoon', examSession: 'A' }

                        //{ examSessionName: 'Evening', examSession: 'E' }
                        //{ examSessionName: 'Morning', examSession: 'M' },
                        //{ examSessionName: 'Afternoon', examSession: 'A' },
                        //{ examSessionName: 'Evening', examSession: 'E' }
                    ];
                };

                //var getAllBasicCourse = function () {
                //    basicCourseService.getAllBasicCourse().then(function (results) {
                //        $scope.basicCourses = results;
                //    });
                //};

                $scope.$watch('vocationalexamTimeTableDetail.CourseID', function () {
                    if ($scope.vocationalexamTimeTableDetail.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.examTimeTableDetail.CourseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});
                        basicExamService.getBasicExamListByCourseID($scope.vocationalexamTimeTableDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });

                        basicMainGroupService.getMainGroupListByCourseID($scope.vocationalexamTimeTableDetail.CourseID).then(function (results) {
                            $scope.basicMainGroups = results;
                        });
                    }
                });

                //$scope.$watch('examTimeTableDetail.branchID', function () {

                //});


                $scope.showVocationalexamTimeTableSubjects = function () {
                    if ($scope.vocationalexamTimeTableDetail.ExamID !== undefined) {
                        //$scope.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        //$scope.ExamInstID = AppSettings.ExamInstID;
                        $scope.ExamInstID = 103;
                        examTimeTableService.getVocationalExamTimeTableSubjectByExamIDMainGrpID($scope.vocationalexamTimeTableDetail.ExamID, $scope.vocationalexamTimeTableDetail.MainGrpID, $scope.ExamInstID).then(function (results) {
                            $scope.examTimeTableSubjects = results;
                            for (var i = 0; i < $scope.examTimeTableSubjects.length; i++) {
                                if ($scope.examTimeTableSubjects[i].StringStartDate != null) {
                                    $scope.examTimeTableSubjects[i].StartDate = new Date($scope.examTimeTableSubjects[i].StartDate);
                                }
                            }
                        });
                    }
                };

                $scope.saveVocationalExamTimeTable = function () {
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
                                        ////$scope.tempDetails.evalTypID = $scope.examTimeTableSubjects[i].evalTypID;
                                        $scope.tempDetails.evalTypID = 1;
                                        $scope.tempDetails.ExamSession = $scope.examTimeTableSubjects[i].ExamSession;
                                        $scope.tempDetails.ExmSubID = $scope.examTimeTableSubjects[i].ExmSubID;
                                        $scope.tempDetails.ExmTmTbID = $scope.examTimeTableSubjects[i].ExmTmTbID;
                                        $scope.tempDetails.ExamInstID = AppSettings.ExamInstID;
                                        //$scope.tempDetails.ExamInstID = 102;
                                        $scope.tempDetails.ExmSubCode = $scope.examTimeTableSubjects[i].ExmSubCode;
                                        $scope.tempDetails.ExamID = $scope.examTimeTableSubjects[i].ExamID;
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
                        if ($scope.examTimeTableSubjectDetails.length > 0 && $scope.isValid) {
                            $scope.vocationalexamTimeTableDetail.examTimeTableSubjects = $scope.examTimeTableSubjectDetails;
                            examTimeTableService.putVocationalExamTimeTable($scope.vocationalexamTimeTableDetail).then(function (results) {
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