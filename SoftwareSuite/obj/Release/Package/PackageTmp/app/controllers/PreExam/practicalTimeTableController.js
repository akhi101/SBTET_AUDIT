(function () {
    'use strict';
    angular.module('app')
        .controller('practicalTimeTableController', 
        function ($rootScope, $scope, practicalTimeTableService, basicCourseService, basicBranchService, basicExamService, basicSubjectService, basicExamSubjectService, AppSettings) {


                $scope.practicalTimeTableDetail = {};
                $scope.practicalTimeTableSubjects = [];
                $scope.practicalTimeTableDetail.practicalTimeTableSubjects = {};
                
                $scope.practicalTimeTableSubjectDetails = [];
                $scope.isValid = false;

                $scope.init = function () {
                    getAllBasicCourse();
                    $scope.practicalSessions = [
                        { practicalSessionName: 'ForeNoon', practicalSession: 'M' },
                        { practicalSessionName: 'AfterNoon', practicalSession: 'A' }
                        //{ practicalSessionName: 'Evening', practicalSession: 'E' }
                    ];
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                $scope.$watch('practicalTimeTableDetail.CourseID', function () {
                    if ($scope.practicalTimeTableDetail.CourseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.practicalTimeTableDetail.CourseID).then(function (results) {
                            $scope.basicBranches = results;
                        });
                        basicExamService.getBasicExamListByCourseID($scope.practicalTimeTableDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });

                //$scope.$watch('practicalTimeTableDetail.branchID', function () {
                    
                //});

                $scope.showPracticalTimeTableSubjects = function () {
                    if ($scope.practicalTimeTableForm.$valid && $scope.practicalTimeTableDetail.BranchID !== undefined && $scope.practicalTimeTableDetail.ExamID !== undefined) {
                        $scope.practicalTimeTableDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        practicalTimeTableService.getPracticalTimeTableSubjectByExamIDBranchID($scope.practicalTimeTableDetail.ExamID, $scope.practicalTimeTableDetail.BranchID, $scope.practicalTimeTableDetail.ExamInstID).then(function (results) {
                            if (results.length > 0) {
                                $scope.practicalTimeTableSubjects = results;
                                for (var i = 0; i < $scope.practicalTimeTableSubjects.length; i++) {
                                    if ($scope.practicalTimeTableSubjects[i].StringStartDate != null) {
                                        $scope.practicalTimeTableSubjects[i].StartDate = new Date($scope.practicalTimeTableSubjects[i].StartDate);
                                    }
                                }
                            } else {
                                $scope.practicalTimeTableSubjects = [];
                                alert("Record not found");

                            }
                            
                        });
                    }
                };
                $scope.savePracticalTimeTable = function () {
                    if ($scope.practicalTimeTableForm.$valid && $scope.practicalTimeTableSubjectsForm.$valid) {
                        $scope.practicalTimeTableSubjectDetails = [];
                        $scope.isValid = true;
                        for (var i = 0; i < $scope.practicalTimeTableSubjects.length; i++) {
                            
                            //if ($scope.practicalTimeTableSubjectDetails.length > 0) {
                            //    for (var j = 0; j < $scope.practicalTimeTableSubjectDetails.length; j++) {
                            //        if (window.moment(new Date($scope.practicalTimeTableSubjects[i].StartDate)).format("YYYY-MM-DD") != $scope.practicalTimeTableSubjectDetails[j].StartDate) {
                            //            $scope.isValid = true;
                            //        } else {
                            //            $scope.isValid = false;
                            //            alert("Date should not be same as previous one");
                            //            break;
                            //        }
                            //    }
                            //    if ($scope.isValid === false) {
                            //        break;
                            //    }
                            //} else $scope.isValid = true;   
                            if ($scope.isValid) {
                                if ($scope.practicalTimeTableSubjects[i].StartTime != null && $scope.practicalTimeTableSubjects[i].EndTime != null) {
                                    if (Date.parse($scope.practicalTimeTableSubjects[i].StartTime) < Date.parse($scope.practicalTimeTableSubjects[i].EndTime)) {                                       
                                    var temp = {};
                                    $scope.tempDetails = {};
                                        $scope.tempDetails.StartDate = window.moment(new Date($scope.practicalTimeTableSubjects[i].StartDate)).format("YYYY-MM-DD");
                                        $scope.tempDetails.EndDate = window.moment(new Date($scope.practicalTimeTableSubjects[i].StartDate)).format("YYYY-MM-DD");
                                        $scope.tempDetails.StartTime = window.moment($scope.practicalTimeTableSubjects[i].StartTime).format('hh:mm a');
                                        $scope.tempDetails.EndTime = window.moment($scope.practicalTimeTableSubjects[i].EndTime).format('hh:mm a');
                                    $scope.tempDetails.evalTypID = 2;
                                    $scope.tempDetails.ExamSession = $scope.practicalTimeTableSubjects[i].ExamSession;
                                    $scope.tempDetails.ExmSubID = $scope.practicalTimeTableSubjects[i].ExmSubID;
                                    $scope.tempDetails.ExmTmTbID = $scope.practicalTimeTableSubjects[i].ExmTmTbID;
                                    angular.copy($scope.tempDetails, temp);
                                    $scope.practicalTimeTableSubjectDetails.push(temp);
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
                        if ($scope.practicalTimeTableSubjectDetails.length > 0 && $scope.isValid) {
                            $scope.practicalTimeTableDetail.practicalTimeTableSubjects = $scope.practicalTimeTableSubjectDetails;
                            $scope.practicalTimeTableDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                            $scope.practicalTimeTableDetail.CreLoginID = AppSettings.LoggedUserId; // Current CreLoginID
                            $scope.practicalTimeTableDetail.UpdLoginID = AppSettings.LoggedUserId; // Current UpdLoginID
                            practicalTimeTableService.putPracticalTimeTable($scope.practicalTimeTableDetail).then(function (results) {
                                if (results.IsSuccess) {
                                    $scope.practicalTimeTableDetail = {};
                                    $scope.practicalTimeTableSubjects = [];
                                    alert(results.Message);
                                } else {
                                    $scope.practicalTimeTableDetail = {};
                                    $scope.practicalTimeTableSubjects = [];
                                    alert(results.Message);
                                }
                            }, function (error) {
                                $scope.practicalTimeTableDetail = {};
                                $scope.practicalTimeTableSubjects = [];
                                alert(error.statusText);
                            });
                        }
                    }
                };
            });
}());