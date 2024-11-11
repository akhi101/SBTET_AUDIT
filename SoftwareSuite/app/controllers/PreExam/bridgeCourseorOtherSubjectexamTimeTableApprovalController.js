(function () {
    'use strict';
    angular.module('app')
        .controller('bridgeCourseorOtherSubjectexamTimeTableApprovalController',
            function ($rootScope, $scope, examTimeTableService, basicCourseService, basicExamService, AppSettings) {


                $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail = {};
                $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail.approveExamTimetable = {};
                $scope.approveExamTimeTable = [];
                $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetails = [];
                $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail.ExamInstID = 0;

                $scope.init = function () {
                    getAllBasicCourse();
                   // $scope.basicCourses = [{ CourseName: 'Vocational', CourseID: 2 }];
                    $scope.approveStatus = [
                        { statusNm: 'Yes', approveFlag: 'Y' },
                        { statusNm: 'No', approveFlag: 'N' }
                    ];

                    $scope.basicEvalTypes = [{ EvalTypeName: 'Theory', EvalTypeID: 1 },
                        { EvalTypeName: 'Practical', EvalTypeID: 2 }];

                    $scope.basicSubjectTypes = [{ SubjectTypeName: 'BridgeCourse', SubjectTypeID: 1 },
                    { SubjectTypeName: 'OtherSubject', SubjectTypeID: 2 }];
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                $scope.$watch('vocbridgeorotherSubjectexamTimeTableApprovalDetail.CourseID', function () {
                    if ($scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.examTimeTableApprovalDetail.CourseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});

                        basicExamService.getBasicExamListByCourseID($scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });


                        //basicMainGroupService.getMainGroupListByCourseID($scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail.CourseID).then(function (results) {
                        //    $scope.basicMainGroups = results;
                        //});
                    }
                });

                //    $scope.$watch('examTimeTableApprovalDetail.BranchID', function () {

                //});
                $scope.showExamTimeTableDetails = function () {
                    if ($scope.vocationalexamTimeTableDetailForm.$valid && $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail.ExamID !== undefined) {

                        $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID

                        //$scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail.ExamInstID = 102;

                        examTimeTableService.GetBridgeCourseExamTimeTableExamID($scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail.ExamID, $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail.SubjectTypeID, $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail.ExamInstID, $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail.EvalTypeID).then(function (results) {
                            if (results.length > 0) {
                                $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetails = results;
                                $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail.approveFlag = 'Y';
                            } else {
                                $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetails = [];
                                alert("Result not found");
                            }
                        });
                    }
                };

                $scope.approveExamTimetable = function () {
                    if ($scope.vocationalexamTimeTableDetailForm.$valid && $scope.vocationalexamTimeTableApprovaleApprovalForm.$valid) {
                        for (var i = 0; i < $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetails.length; i++) {
                            var temp = {};
                            $scope.tempDetails = {};
                            $scope.tempDetails.ExmTmTbID = $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetails[i].ExmTmTbID;
                            //$scope.tempDetails.ExamID = $scope.vocationalexamTimeTableDetails[i].ExamID;
                            angular.copy($scope.tempDetails, temp);
                            $scope.approveExamTimeTable.push(temp);
                            $scope.tempDetails = {};
                        }
                        $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail.approveExamTimeTable = $scope.approveExamTimeTable;
                        examTimeTableService.postBridgeOROtherExamTimeTableApproval($scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail).then(function (results) {
                            if (results.IsSuccess) {
                                $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail = {};
                                $scope.approveExamTimeTable = [];
                                $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetails = [];
                                alert(results.Message);
                            } else {
                                $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail = {};
                                $scope.approveExamTimeTable = [];
                                alert(results.Message);
                            }
                        }, function (error) {
                            $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetail = {};
                            $scope.approveExamTimeTable = [];
                            $scope.vocbridgeorotherSubjectexamTimeTableApprovalDetails = [];
                            alert(error.statusText);
                        });
                    };
                }
            });
}());

