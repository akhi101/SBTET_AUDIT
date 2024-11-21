(function () {
    'use strict';
    angular.module('app')
        .controller('collegewiseSubjectSummaryController',
            function ($rootScope, $scope, $state, basicBranchService, basicCollegeService, basicCourseService, basicExamService, collegewiseSubjectSummaryService, basicDistrictsService, AppSettings) {

                $scope.collegewiseSubjectSummary = {};
                $("#LoadImg").attr("src", AppSettings.LoadingImage);
                $scope.LoadImg = false;
                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                    //getAllBasicCollege();
                };
                var getAllBasicDistrict = function () {
                    basicDistrictsService.getBasicDistrictsList().then(function (results) {
                        $scope.basicDistricts = results;
                    });
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.courses = results;
                    });
                };

                //var getAllBasicCollege = function () {
                //    basicCollegeService.getAllBasicCollege().then(function (results) {
                //        $scope.basicColleges = results;
                //    });
                //};

                $scope.$watch('collegewiseSubjectSummary.CourseID', function () {
                    if ($scope.collegewiseSubjectSummary.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.collegewiseSubjectSummary.courseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});
                        basicExamService.getBasicExamListByCourseID($scope.collegewiseSubjectSummary.CourseID).then(function (results) {
                            $scope.bacicExams = results;
                        });
                    }
                });

                $scope.$watch('collegewiseSubjectSummary.DistrictID', function () {
                    if ($scope.collegewiseSubjectSummary.DistrictID !== undefined) {
                        basicCollegeService.getCollegeListByDistrict($scope.collegewiseSubjectSummary.DistrictID).then(function (results) {
                            $scope.basicColleges = results;
                        });
                    }
                });

                $scope.getCollegewiseSubjectSummary = function () {
                    if ($scope.collegewiseSubjectSummaryForm.$valid) {
                        $scope.LoadImg = true;
                        $scope.collegewiseSubjectSummary.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        collegewiseSubjectSummaryService.getCollegewiseSubjectSummary($scope.collegewiseSubjectSummary).then(function (results) {
                            if (results != "") {
                                $scope.collegewiseSubjectSummary = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "CollegewiseSubjectSummary(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();
                                $scope.LoadImg = false;
                            } //if (results.isSuccess == false) $scope.collegewiseSubjectSummary = {}; alert(results.message);
                        }, function (error) {
                            $scope.collegewiseSubjectSummary = {};
                            alert(error.statusText);
                            $scope.LoadImg = false;
                        });
                    }
                };

            });
}());