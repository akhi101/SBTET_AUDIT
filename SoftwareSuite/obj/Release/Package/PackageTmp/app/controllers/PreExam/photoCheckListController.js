(function () {
    'use strict';
    angular.module('app')
        .controller('photoCheckListController',
            function ($rootScope, $scope, $state, $stateParams, basicCourseService, basicExamService, basicBranchService, photoCheckListService, basicMainGroupService, basicCollegeService, basicDistrictsService, AppSettings) {
                var DistrictId = 0;
                $scope.photoCheckListDetail = {};
               $scope.Disableflg = true;
                $scope.Enableflg = false;
                if (AppSettings.CollegeID != 0) {
                    $scope.Disableflg = false;
                    $scope.Enableflg = false;
                    $scope.init = function () {
                        getDistrictId();
                        getAllBasicCourse();
                    };
                } else {
                    $scope.Disableflg = true;
                    $scope.Enableflg = true;
                    $scope.init = function () {
                        getAllBasicCourse();
                        getAllBasicDistrict();
                    };
                }
                var getDistrictId = function () {
                    basicCollegeService.GetBasicCollegeByCollegeID(AppSettings.CollegeID).then(function (results) {
                        DistrictId = results[0].DistrictID;
                        basicDistrictsService.getBasicDistrictsList().then(function (results) {
                            $scope.basicDistricts = results;
                            $scope.photoCheckListDetail.DistrictID = parseInt(DistrictId);
                            basicCollegeService.getCollegeListByDistrict(DistrictId).then(function (results) {
                                $scope.basicColleges = results;
                                $scope.photoCheckListDetail.CollegeID = parseInt(AppSettings.CollegeID);
                            });
                        });
                    });
                };
                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                $scope.$watch('photoCheckListDetail.CourseID', function () {
                    if ($scope.photoCheckListDetail.CourseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.photoCheckListDetail.CourseID).then(function (results) {
                            $scope.basicBranches = results;
                        });
                        basicExamService.getBasicExamListByCourseID($scope.photoCheckListDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });
                $scope.$watch('photoCheckListDetail.BranchID', function () {
                    if ($scope.photoCheckListDetail.CollegeID == undefined || $scope.photoCheckListDetail.CollegeID == "") {
                        $scope.photoCheckListDetail.CollegeID = 0;
                    }
                    if ($scope.photoCheckListDetail.CollegeID != undefined && $scope.photoCheckListDetail.BranchID != undefined) {
                        basicMainGroupService.GetMainGroupListByCollegeIdBranchId($scope.photoCheckListDetail.CollegeID, $scope.photoCheckListDetail.BranchID).then(function (results) {
                            $scope.basicMainGroups = results;
                        });
                    }
                });

                $scope.$watch('photoCheckListDetail.DistrictID', function () {
                    if ($scope.photoCheckListDetail.DistrictID !== undefined) {

                        basicCollegeService.getCollegeListByDistrict($scope.photoCheckListDetail.DistrictID).then(function (results) {
                            $scope.basicColleges = results;
                        });
                    }
                });

                //
                var getAllBasicDistrict = function () {
                    basicDistrictsService.getBasicDistrictsList().then(function (results) {
                        $scope.basicDistricts = results;
                    });
                };
                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };
                $scope.$watch('photoCheckListDetail.CollegeID', function () {
                    if ($scope.photoCheckListDetail.BranchID == undefined || $scope.photoCheckListDetail.BranchID == "") {
                        $scope.photoCheckListDetail.BranchID = 0;
                    }
                    if ($scope.photoCheckListDetail.CollegeID != undefined && $scope.photoCheckListDetail.BranchID != undefined) {
                        basicMainGroupService.GetMainGroupListByCollegeIdBranchId($scope.photoCheckListDetail.CollegeID, $scope.photoCheckListDetail.BranchID).then(function (results) {
                            $scope.basicMainGroups = results;
                        });
                    }
                });
                //$scope.$watch('photoCheckListDetail.DistrictID', function () {
                //    if ($scope.photoCheckListDetail.DistrictID !== undefined) {

                //        basicCollegeService.getCollegeListByDistrict($scope.photoCheckListDetail.DistrictID).then(function (results) {
                //            $scope.basicColleges = results;
                //        });
                //    }
                //});
                //
                $scope.getPhotoCheckListReport = function () {
                    if ($scope.photoCheckListDetailForm.$valid) {
                        var CollegeID = AppSettings.CollegeID; //$scope.photoCheckListDetail.CollegeID
                        var ExamID = 1; //$scope.photoCheckListDetail.ExamID
                        var CourseID = $scope.photoCheckListDetail.CourseID;
                        var BranchID = $scope.photoCheckListDetail.BranchID;
                        var MainGrpID = $scope.photoCheckListDetail.MainGrpID;
                        photoCheckListService.getPhotoCheckListReportByType(CollegeID, ExamID, CourseID, BranchID, MainGrpID).then(function (results) {
                            if (results != "") {
                                $scope.photoCheckListDetail = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "PhotoCheckListReport(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();
                            } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                        }, function (error) {
                            $scope.photoCheckListDetail = {};
                            alert(error.statusText);
                        });
                    }
                };
            });
}());