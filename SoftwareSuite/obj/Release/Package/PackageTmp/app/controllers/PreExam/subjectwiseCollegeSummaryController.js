(function () {
    'use strict';
    angular.module('app')
        .controller('subjectwiseCollegeSummaryController',
        function ($rootScope, $scope, $state, basicBranchService, basicCollegeService, basicCourseService, basicExamService, subjectwiseCollegeSummaryService, basicDistrictsService, AppSettings) {

                $scope.subjectwiseCollegeSummary = {};

                $scope.studentCount = {};
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
                //        // Add All In ArrayList Of Result
                //       $scope.basicColleges.splice(0, 0, { collegeID: 0, colName: "All" });
                //    });
                //};
                $scope.$watch('subjectwiseCollegeSummary.DistrictID', function () {
                    if ($scope.subjectwiseCollegeSummary.DistrictID !== undefined) {
                        basicCollegeService.getCollegeListByDistrict($scope.subjectwiseCollegeSummary.DistrictID).then(function (results) {
                            $scope.basicColleges = results;
                            // Add All In ArrayList Of Result
                            $scope.basicColleges.splice(0, 0, { CollegeID: 0, ColName: "All" });
                        });
                    }
                });

                $scope.$watch('subjectwiseCollegeSummary.CourseID', function () {
                    if ($scope.subjectwiseCollegeSummary.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.subjectwiseCollegeSummary.courseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});
                        basicExamService.getBasicExamListByCourseID($scope.subjectwiseCollegeSummary.CourseID).then(function (results) {
                            $scope.bacicExams = results;
                        });
                    }
                });

                $scope.getSubjectwiseCollegeSummary = function () {
                    if ($scope.subjectwiseCollegeSummaryForm.$valid) {
                        $scope.LoadImg = true;
                        $scope.subjectwiseCollegeSummary.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        subjectwiseCollegeSummaryService.getSubjectwiseCollegeSummary($scope.subjectwiseCollegeSummary).then(function (results) {
                            if (results != "") {                               
                                $scope.subjectwiseCollegeSummary = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "SubjectwiseCollegeSummary(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();
                                $scope.LoadImg = false;
                            } //if (results.isSuccess == false) $scope.subjectwiseCollegeSummary = {}; alert(results.message);
                        }, function (error) {
                            $scope.subjectwiseCollegeSummary = {};
                            alert(error.statusText);
                            $scope.LoadImg = false;
                        });
                    }
                };

            });
}());