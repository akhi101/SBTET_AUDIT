(function () {
    'use strict';
    angular.module('app')
        .controller('practicalTimeTableReportController', 
        function ($rootScope, $scope, practicalTimeTableService, basicCourseService, basicBranchService, basicExamService, basicSubjectService, basicExamSubjectService, AppSettings) {


                $scope.practicalTimeTableDetail = {};

                $scope.init = function () {
                    getAllBasicCourse();
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

                $scope.getPracticalTimeTable= function () {
                    if ($scope.practicalTimeTableForm.$valid && $scope.practicalTimeTableDetail.ExamID && $scope.practicalTimeTableDetail.BranchID) {
                        $scope.practicalTimeTableDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        practicalTimeTableService.getPracticalTimeTableReport($scope.practicalTimeTableDetail).then(function (results) {
                            if (results != "") {
                                $scope.practicalTimeTableDetail = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "PracticalTimeTable(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();
                            } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                        }, function (error) {
                            $scope.practicalTimeTableDetail = {};
                            alert(error.statusText);
                        });
                    }
                };

            });
}());