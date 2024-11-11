(function () {
    'use strict';
    angular.module('app')
        .controller('examTimeTableApprovalController',
            function ($rootScope, $scope, examTimeTableService, basicCourseService, basicBranchService, basicExamService, basicSubjectService, AppSettings) {


                $scope.examTimeTableApprovalDetail = {};
                $scope.examTimeTableApprovalDetail.approveExamTimeTable = {};
                $scope.approveExamTimeTable = [];
                $scope.examTimeTableDetails = [];

                $scope.init = function () {
                    getAllBasicCourse();
                    $scope.approveStatus = [
                        { statusNm: 'Yes', approveFlag: "Y" },
                        { statusNm: 'No', approveFlag: "N" }
                    ];
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                $scope.$watch('examTimeTableApprovalDetail.CourseID', function () {
                    if ($scope.examTimeTableApprovalDetail.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.examTimeTableApprovalDetail.CourseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});

                        basicExamService.getBasicExamListByCourseID($scope.examTimeTableApprovalDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });

                //    $scope.$watch('examTimeTableApprovalDetail.BranchID', function () {

                //});
                $scope.showExamTimeTableDetails = function () {
                    if ($scope.examTimeTableDetailForm.$valid && $scope.examTimeTableApprovalDetail.ExamID !== undefined) {
                        $scope.examTimeTableApprovalDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        //$scope.examTimeTableApprovalDetail.BranchID = 0;
                        var BranchID = 0;
                        examTimeTableService.getExamTimeTableByExamIDBranchID($scope.examTimeTableApprovalDetail.ExamID, BranchID, $scope.examTimeTableApprovalDetail.ExamInstID).then(function (results) {
                            if (results.length > 0) {
                                $scope.examTimeTableDetails = results;
                               // $scope.examTimeTableApprovalDetail.ApprovalFlag = "" + $scope.examTimeTableDetails[0].ApprovalFlag +"";
                            } else {
                                $scope.examTimeTableDetails = [];
                                alert("Result not found");                                
                            }
                        });
                    }
                };

                $scope.approveExamTimetable = function () {
                    if ($scope.examTimeTableDetailForm.$valid && $scope.examTimeTableApprovalForm.$valid) {
                        for (var i = 0; i < $scope.examTimeTableDetails.length; i++) {
                            var temp = {};
                            $scope.tempDetails = {};
                            $scope.tempDetails.ExmTmTbID = $scope.examTimeTableDetails[i].ExmTmTbID;
                            angular.copy($scope.tempDetails, temp);
                            $scope.approveExamTimeTable.push(temp);
                            $scope.tempDetails = {};
                        }
                        $scope.examTimeTableApprovalDetail.approveExamTimeTable = $scope.approveExamTimeTable;
                        examTimeTableService.postExamTimeTableApprovalStatus($scope.examTimeTableApprovalDetail).then(function (results) {
                            if (results.IsSuccess) {
                                $scope.examTimeTableApprovalDetail = {};
                                $scope.approveExamTimeTable = [];
                                $scope.examTimeTableDetails = [];
                                alert(results.Message);
                            } else {
                                $scope.examTimeTableApprovalDetail = {};
                                $scope.approveExamTimeTable = [];
                                alert(results.Message);
                            }
                        }, function (error) {
                            $scope.examTimeTableApprovalDetail = {};
                            $scope.approveExamTimeTable = [];
                            $scope.examTimeTableDetails = [];
                            alert(error.statusText);
                        });
                    };
                }
            });
}());

