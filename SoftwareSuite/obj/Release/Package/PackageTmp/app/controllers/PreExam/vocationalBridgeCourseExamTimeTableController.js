(function () {
    'use strict';
    angular.module('app')
        .controller('vocationalBridgeCourseExamTimeTableController',
            function ($rootScope, $scope, examTimeTableService, basicCourseService, basicBranchService, basicExamService, basicSubjectService, basicExamSubjectService, AppSettings) {

                $scope.vocationalBridgeCourseExamTimeTableDetail = {};
                $scope.vocationalBridgeCourseExamTimeTableDetail.examTimeTableSubjects = {};
                $scope.examTimeTableSubjectDetails = [];
                $scope.isValid = false;
                //$scope.vocationalBridgeCourseExamTimeTableDetail.ExamInstID = 0;

                $scope.init = function () {
                    getAllBasicCourse();
                    //$scope.basicCourses = [{ CourseName: 'Vocational', CourseID: 2 }];

                    $scope.basicSubjectTypes = [{ SubjectTypeName: 'BridgeCourse', SubjectTypeID: 1 },
                    { SubjectTypeName: 'OtherSubject', SubjectTypeID: 2 }];

                    $scope.basicEvalTypes = [{ EvalTypeName: 'Theory', EvalTypeID: 1 },
                    { EvalTypeName: 'Practical', EvalTypeID: 2 }];

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

                $scope.$watch('vocationalBridgeCourseExamTimeTableDetail.CourseID', function () {
                    if ($scope.vocationalBridgeCourseExamTimeTableDetail.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.examTimeTableDetail.CourseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});
                        basicExamService.getBasicExamListByCourseID($scope.vocationalBridgeCourseExamTimeTableDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });

                        //basicMainGroupService.getMainGroupListByCourseID($scope.vocationalBridgeCourseExamTimeTableDetail.CourseID).then(function (results) {
                        //    $scope.basicMainGroups = results;
                        //});
                    }
                });

                //$scope.$watch('examTimeTableDetail.branchID', function () {

                //});


                $scope.showvocationalBridgeCourseExamTimeTableSubjects = function () {
                    if ($scope.vocationalBridgeCourseExamTimeTableDetail.ExamID !== undefined) {
                        // $scope.examTimeTableDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        //$scope.ExamInstID = AppSettings.ExamInstID;
                          //$scope.ExamInstID = 102;
                        examTimeTableService.GetBridgeCourseExamSubjectListByExamID($scope.vocationalBridgeCourseExamTimeTableDetail.ExamID, $scope.vocationalBridgeCourseExamTimeTableDetail.SubjectTypeID, $scope.vocationalBridgeCourseExamTimeTableDetail.EvalTypeID).then(function (results) {
                            $scope.examTimeTableSubjects = results;
                            for (var i = 0; i < $scope.examTimeTableSubjects.length; i++) {
                                if ($scope.examTimeTableSubjects[i].StringStartDate != null) {
                                    $scope.examTimeTableSubjects[i].StartDate = new Date($scope.examTimeTableSubjects[i].StartDate);
                                }
                            }
                        });
                    }
                };

                $scope.saveBridgeCourseVocationalExamTimeTable = function () {

                    //$scope.vocationalBridgeCourseExamTimeTableDetail.ExamInstID = AppSettings.ExamInstID;

                    if ($scope.examTimeTableForm.$valid && $scope.examTimeTableSubjectsForm.$valid) {
                        $scope.examTimeTableSubjectDetails = [];
                        for (var i = 0; i < $scope.examTimeTableSubjects.length; i++) {
                            if ($scope.examTimeTableSubjectDetails.length > 0) {
                                for (var j = 0; j < $scope.examTimeTableSubjectDetails.length; j++) {
                                    //if (window.moment(new Date($scope.examTimeTableSubjects[i].StartDate)).format("YYYY-MM-DD") != $scope.examTimeTableSubjectDetails[j].StartDate) {
                                    //    $scope.isValid = true;
                                    //} else {
                                    //    $scope.isValid = false;
                                    //    alert("Date should not be same as previous one");
                                    //    break;
                                    //}

                                    $scope.isValid = true;
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
                                        $scope.tempDetails.EvalTypID = $scope.examTimeTableSubjects[i].EvalTypID;
                                        $scope.tempDetails.ExamSession = $scope.examTimeTableSubjects[i].ExamSession;
                                        $scope.tempDetails.ExmSubID = $scope.examTimeTableSubjects[i].ExmSubID;
                                        $scope.tempDetails.ExmTmTbID = $scope.examTimeTableSubjects[i].ExmTmTbID;
                                        //$scope.tempDetails.ExamInstID = AppSettings.ExamInstID; /please un comment Hard coded
                                        $scope.tempDetails.ExamInstID = 102;
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
                            $scope.vocationalBridgeCourseExamTimeTableDetail.examTimeTableSubjects = $scope.examTimeTableSubjectDetails;
                            examTimeTableService.putBridgeOROtherExamTimeTable($scope.vocationalBridgeCourseExamTimeTableDetail).then(function (results) {
                                if (results.IsSuccess) {
                                    $scope.vocationalBridgeCourseExamTimeTableDetail = {};
                                    $scope.examTimeTableSubjects = [];
                                    alert(results.Message);
                                } else {
                                    $scope.vocationalBridgeCourseExamTimeTableDetail = {};
                                    $scope.examTimeTableSubjects = [];
                                    alert(results.Message);
                                }
                            }, function (error) {
                                $scope.vocationalBridgeCourseExamTimeTableDetail = {};
                                $scope.examTimeTableSubjects = [];
                                alert(error.statusText);
                            });
                        }
                    }
                };
            });
}());