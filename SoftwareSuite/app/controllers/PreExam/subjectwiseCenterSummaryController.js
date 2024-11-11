(function () {
    'use strict';
    angular.module('app')
        .controller('subjectwiseCenterSummaryController',
        function ($rootScope, $scope, $state, basicCourseService, basicExamService, subjectwiseCenterSummaryService, basicDistrictsService, basicCollegeService, basicExamSubjectService, AppSettings) {

                $scope.subjectwiseCenterSummary = {};

            $("#LoadImg").attr("src", AppSettings.LoadingImage);
            $scope.LoadImg = false;

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.courses = results;
                    });
                };

                var getAllBasicDistrict = function () {
                    basicDistrictsService.getBasicDistrictsList().then(function (results) {
                        $scope.basicDistricts = results;
                    });
                };

                $scope.$watch('subjectwiseCenterSummary.CourseID', function () {
                    if ($scope.subjectwiseCenterSummary.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.subjectwiseCenterSummary.courseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});
                        basicExamService.getBasicExamListByCourseID($scope.subjectwiseCenterSummary.CourseID).then(function (results) {
                            $scope.bacicExams = results;
                            $scope.basicDistricts = "";
                            $scope.basicCenters = "";
                            $scope.basicExamSubjects = "";
                            getAllBasicDistrict();
                        });
                    }
                });

                $scope.$watch('subjectwiseCenterSummary.DistrictID', function () {
                    if ($scope.subjectwiseCenterSummary.DistrictID !== undefined) {
                        basicCollegeService.getTheroyExamCenterCollegeList($scope.subjectwiseCenterSummary.DistrictID, AppSettings.ExamInstID).then(function (results) {
                            $scope.basicCenters = results;
                        });
                    }
                });

                $scope.$watch('subjectwiseCenterSummary.PreZoneCntrID', function () {
                    if ($scope.subjectwiseCenterSummary.PreZoneCntrID !== undefined) {
                        basicExamSubjectService.getExamSubjectForCenterWiseSummeryReport($scope.subjectwiseCenterSummary.ExamID, AppSettings.ExamInstID, $scope.subjectwiseCenterSummary.DistrictID, $scope.subjectwiseCenterSummary.PreZoneCntrID).then(function (results) {
                            $scope.basicExamSubjects = results;
                        });
                    }
                });

                $scope.getSubjectwiseCenterSummary = function () {
                    if ($scope.subjectwiseCenterSummaryForm.$valid) {
                        $scope.LoadImg = true;
                        if ($scope.subjectwiseCenterSummaryForm.PreZoneCntrID == undefined || $scope.subjectwiseCenterSummaryForm.PreZoneCntrID == "") {
                            $scope.subjectwiseCenterSummaryForm.PreZoneCntrID = 0;
                        }
                        if ($scope.subjectwiseCenterSummaryForm.ExmSubID == undefined || $scope.subjectwiseCenterSummaryForm.ExmSubID == "") {
                            $scope.subjectwiseCenterSummaryForm.ExmSubID = 0;
                        }
                        $scope.subjectwiseCenterSummary.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        subjectwiseCenterSummaryService.getSubjectwiseCenterSummary($scope.subjectwiseCenterSummary).then(function (results) {
                            if (results != "") {
                                $scope.subjectwiseCenterSummary = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "SubjectwiseCenterSummary(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();
                                $scope.LoadImg = false;
                            } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                        }, function (error) {
                            $scope.subjectwiseCenterSummary = {};
                            alert(error.statusText);
                            $scope.LoadImg = false;
                        });
                    }
                };

            });
}());