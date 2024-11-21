(function () {
    'use strict';
    angular.module('app')
        .controller('vocationalexamTimeTableApprovalController',
            function ($rootScope, $scope, examTimeTableService, basicCourseService, basicExamService, basicMainGroupService, AppSettings) {


                $scope.vocationalexamTimeTableApprovalDetail = {};
                $scope.vocationalexamTimeTableApprovalDetail.approveExamTimetable = {};
                $scope.approveExamTimeTable = [];
                $scope.vocationalexamTimeTableDetails = [];

                $scope.init = function () {
                    //getAllBasicCourse();
                    $scope.basicCourses = [{ CourseName: 'Vocational', CourseID: 2 }];
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

                $scope.$watch('vocationalexamTimeTableApprovalDetail.CourseID', function () {
                    if ($scope.vocationalexamTimeTableApprovalDetail.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.examTimeTableApprovalDetail.CourseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});

                        basicExamService.getBasicExamListByCourseID($scope.vocationalexamTimeTableApprovalDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });


                        basicMainGroupService.getMainGroupListByCourseID($scope.vocationalexamTimeTableApprovalDetail.CourseID).then(function (results) {
                            $scope.basicMainGroups = results;
                        });
                    }
                });

                //    $scope.$watch('examTimeTableApprovalDetail.BranchID', function () {

                //});
                $scope.showExamTimeTableDetails = function () {
                    if ($scope.vocationalexamTimeTableDetailForm.$valid && $scope.vocationalexamTimeTableApprovalDetail.ExamID !== undefined) {
                        $scope.vocationalexamTimeTableApprovalDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID

                       // $scope.vocationalexamTimeTableApprovalDetail.ExamInstID = 102;

                        examTimeTableService.getVocationalExamTimeTableByExamIDMainGrpID($scope.vocationalexamTimeTableApprovalDetail.ExamID, $scope.vocationalexamTimeTableApprovalDetail.MainGrpID, $scope.vocationalexamTimeTableApprovalDetail.ExamInstID).then(function (results) {
                            if (results.length > 0) {
                                $scope.vocationalexamTimeTableDetails = results;
                            } else {
                                $scope.vocationalexamTimeTableDetails = [];
                                alert("Result not found");
                            }
                        });
                    }
                };

                $scope.approveExamTimetable = function () {
                    if ($scope.vocationalexamTimeTableDetailForm.$valid && $scope.vocationalexamTimeTableApprovaleApprovalForm.$valid) {
                        for (var i = 0; i < $scope.vocationalexamTimeTableDetails.length; i++) {
                            var temp = {};
                            $scope.tempDetails = {};
                            $scope.tempDetails.ExmTmTbID = $scope.vocationalexamTimeTableDetails[i].ExmTmTbID;
                            //$scope.tempDetails.ExamID = $scope.vocationalexamTimeTableDetails[i].ExamID;
                            angular.copy($scope.tempDetails, temp);
                            $scope.approveExamTimeTable.push(temp);
                            $scope.tempDetails = {};
                        }
                        $scope.vocationalexamTimeTableApprovalDetail.approveExamTimeTable = $scope.approveExamTimeTable;
                        examTimeTableService.postVocationalExamTimeTableApproval($scope.vocationalexamTimeTableApprovalDetail).then(function (results) {
                            if (results.IsSuccess) {
                                $scope.vocationalexamTimeTableApprovalDetail = {};
                                $scope.approveExamTimeTable = [];
                                $scope.vocationalexamTimeTableDetails = [];
                                alert(results.Message);
                            } else {
                                $scope.vocationalexamTimeTableApprovalDetail = {};
                                $scope.approveExamTimeTable = [];
                                alert(results.Message);
                            }
                        }, function (error) {
                            $scope.vocationalexamTimeTableApprovalDetail = {};
                            $scope.approveExamTimeTable = [];
                            $scope.vocationalexamTimeTableDetails = [];
                            alert(error.statusText);
                        });
                    };
                }
            });
}());

