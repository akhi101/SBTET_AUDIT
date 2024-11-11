(function () {
        'use strict';
        angular.module('app')
            .controller('practicalTimeTableApprovalController', 
            function ($rootScope, $scope, practicalTimeTableService, basicCourseService, basicBranchService, basicExamService, basicSubjectService, AppSettings) {


                    $scope.practicalTimeTableApprovalDetail = {};
                    $scope.practicalTimeTableApprovalDetail.approvePracticalTimeTable = {};
                $scope.approvePracticalTimeTable = [];
                $scope.practicalTimeTableDetails = [];

                    $scope.init = function () {
                        getAllBasicCourse();
                        $scope.approveStatus = [
                            { statusNm: 'Yes', approveFlag: 'Y' },
                            { statusNm: 'No', approveFlag: 'N' }
                        ];
                    };

                    var getAllBasicCourse = function () {
                        basicCourseService.getAllBasicCourse().then(function (results) {
                            $scope.basicCourses = results;
                        });
                    };

                    $scope.$watch('practicalTimeTableApprovalDetail.CourseID', function () {
                        if ($scope.practicalTimeTableApprovalDetail.CourseID !== undefined) {
                            basicBranchService.getBasicBranchListByCourseId($scope.practicalTimeTableApprovalDetail.CourseID).then(function (results) {
                                $scope.basicBranches = results;
                            });

                            basicExamService.getBasicExamListByCourseID($scope.practicalTimeTableApprovalDetail.CourseID).then(function (results) {
                                $scope.basicExams = results;
                            });
                        }
                    });
                    
                    //$scope.$watch('practicalTimeTableApprovalDetail.BranchID', function () {
                        
                    //});

                $scope.showPracticalTimeTableDetails = function () {
                    if ($scope.practicalTimeTableDetailForm.$valid && $scope.practicalTimeTableApprovalDetail.BranchID !== undefined && $scope.practicalTimeTableApprovalDetail.ExamID !== undefined) {
                        $scope.practicalTimeTableApprovalDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        practicalTimeTableService.getPracticalTimeTableByExamIDBranchID($scope.practicalTimeTableApprovalDetail.ExamID, $scope.practicalTimeTableApprovalDetail.BranchID, $scope.practicalTimeTableApprovalDetail.ExamInstID).then(function (results) {
                            if (results.length > 0) {
                                $scope.practicalTimeTableDetails = results;
                            } else {
                                $scope.practicalTimeTableDetails = [];
                                alert("Result not found");
                            }
                        });
                    }
                }
                    $scope.approvePracticalTimetable = function () {
                        if ($scope.practicalTimeTableDetailForm.$valid && $scope.practicalTimeTableApprovalForm.$valid) {
                            for (var i = 0; i < $scope.practicalTimeTableDetails.length; i++) {
                                var temp = {};
                                $scope.tempDetails = {};
                                $scope.tempDetails.ExmTmTbID = $scope.practicalTimeTableDetails[i].ExmTmTbID;
                                angular.copy($scope.tempDetails, temp);
                                $scope.approvePracticalTimeTable.push(temp);
                                $scope.tempDetails = {};
                            }
                            $scope.practicalTimeTableApprovalDetail.approvePracticalTimeTable = $scope.approvePracticalTimeTable;
                            practicalTimeTableService.postPracticalTimeTableApprovalStatus($scope.practicalTimeTableApprovalDetail).then(function (results) {
                                if (results.IsSuccess) {
                                    $scope.practicalTimeTableApprovalDetail = {};
                                    $scope.approvePracticalTimeTable = [];
                                    $scope.practicalTimeTableDetails = [];
                                    alert(results.Message);
                                } else {
                                    $scope.practicalTimeTableApprovalDetail = {};
                                    $scope.approvePracticalTimeTable = [];
                                    alert(results.Message);
                                }
                            }, function (error) {
                                $scope.practicalTimeTableApprovalDetail = {};
                                $scope.approvePracticalTimeTable = [];
                                $scope.practicalTimeTableDetails = [];
                                alert(error.statusText);
                            });
                        };
                    }
                });
    }());

  