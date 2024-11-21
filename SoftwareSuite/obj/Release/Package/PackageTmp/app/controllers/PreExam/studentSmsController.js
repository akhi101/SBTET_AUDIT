(function () {
    'use strict';
    angular.module('app')
        .controller('studentSmsController',
        function ($rootScope, $scope, basicCourseService, basicCollegeService, basicBranchService, basicExamService, studentSMSService, basicMainGroupService, basicDistrictsService, AppSettings) {

                $scope.studentSmsDetail = {};
                $scope.basicMainGroups = [];
                $scope.init = function () {
                    getAllBasicCourse();
                    //getAllBasicCollege();
                    getAllBasicDistrict();
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                var getAllBasicDistrict = function () {
                    basicDistrictsService.getBasicDistrictsList().then(function (results) {
                        $scope.basicDistricts = results;
                    });
                };

                //var getAllBasicCollege = function () {
                //    basicCollegeService.getAllBasicCollege().then(function (results) {
                //        $scope.basicColleges = results;
                //        // Add All In ArrayList Of Result
                //        $scope.basicColleges.splice(0, 0, { CollegeID: 0, ColName: "All" });
                //    });
                //};

                $scope.$watch('studentSmsDetail.CourseID', function () {
                    if ($scope.studentSmsDetail.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.studentSmsDetail.courseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});

                        basicExamService.getBasicExamListByCourseID($scope.studentSmsDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });
                $scope.$watch('studentSmsDetail.DistrictID', function () {
                    if ($scope.studentSmsDetail.DistrictID !== undefined) {
                        basicCollegeService.getCollegeListByDistrict($scope.studentSmsDetail.DistrictID).then(function (results) {
                            $scope.basicColleges = results;
                        });
                    }
                });

                $scope.$watch('studentSmsDetail.CollegeID', function () {
                    if ($scope.studentSmsDetail.CollegeID !== undefined) {
                        basicMainGroupService.getAllBasicMainGroup($scope.studentSmsDetail.CollegeID).then(function (results) {
                            $scope.basicMainGroups = results;
                        });
                    }
                });

                $scope.$watch('studentSmsDetail.HTNo', function () {
                    if ($scope.studentSmsDetail.HTNo !== undefined && $scope.studentSmsDetail.HTNo.toString().length >= 10) { // && $scope.studentSmsDetail.CollegeID !== undefined
                        $scope.studentSmsDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        studentSMSService.getStudentInfoByHTNO($scope.studentSmsDetail.HTNo, $scope.studentSmsDetail.ExamInstID).then(function (results) {
                            if (results.Data.length > 0) {
                                $scope.tempStudentName = results.Data[0].StudName;
                                $scope.tempStudentFatherName = results.Data[0].Fathername;
                                $scope.tempStudentMotherName = results.Data[0].MotherName;
                            }
                            else {
                                alert("Result not found");
                            }
                        });
                    }
                });

                $scope.sendStudentSms = function () {
                    if ($scope.studentSmsDetailForm.$valid) {
                        $scope.studentSmsDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        studentSMSService.sendStudentSMS($scope.studentSmsDetail).then(function (results) {
                            if (results.IsSuccess) {
                                alert(results.Message);
                                $scope.studentSmsDetail = {};
                                $scope.tempStudentName = null;
                                $scope.tempStudentFatherName = null;
                                $scope.tempStudentMotherName = null;
                            }
                            else {
                                alert(results.Message);
                                $scope.studentSmsDetail = {};
                                $scope.tempStudentName = null;
                                $scope.tempStudentFatherName = null;
                                $scope.tempStudentMotherName = null;
                                $scope.basicMainGroups = [];
                            }
                        });
                    }
                };
            });
}());