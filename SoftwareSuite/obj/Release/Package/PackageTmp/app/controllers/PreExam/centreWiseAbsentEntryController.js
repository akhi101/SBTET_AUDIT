(function () {
    'use strict';
    angular.module('app')
        .controller('centreWiseAbsentEntryController',
        function ($rootScope, $scope, basicCourseService, basicExamService, examTimeTableService, absentDetailService, basicZoneService, basicBranchService, basicDistrictsService, AppSettings) {

                $scope.tempDetails = {};
                $scope.studentDetailList = [];
                $scope.postAbsentEntry = {};
                $scope.postAbsentEntry.studentDetailList = [];
                $scope.postAbsentEntry.absentEntryDetails = {};
                $scope.updatedStudentDetailList = [];
            $scope.isCorrect = false;

            $("#LoadImg").attr("src", AppSettings.LoadingImage);
            $scope.LoadImg = false;

                $scope.init = function () {
                    getAllBasicCourse();
                    //getAllZoneCenterCollege(AppSettings.ExamInstID);
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
            //var getAllZoneCenterCollege = function (ExamInstID) {
            //    // Current ExamInstID
            //    basicZoneService.getZoneCenterList(ExamInstID).then(function (results) {
            //            $scope.zoneCenterColleges = results;
            //        });
            //    };

                $scope.$watch('tempDetails.CourseID', function () {
                    if ($scope.tempDetails.CourseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.tempDetails.CourseID).then(function (results) {
                            $scope.basicBranches = results;
                        });
                        basicExamService.getBasicExamListByCourseID($scope.tempDetails.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });

                $scope.$watch('tempDetails.BranchID', function () {
                    if ($scope.tempDetails.BranchID !== undefined && $scope.tempDetails.ExamID !== undefined) {
                        $scope.tempDetails.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        absentDetailService.getExamTimeTableSubjectListByExamIDBranchID($scope.tempDetails.ExamID, $scope.tempDetails.BranchID, $scope.tempDetails.ExamInstID).then(function (results) {
                            $scope.examTimeTableSubjects = results;
                        });
                    }
                });
            $scope.$watch('tempDetails.DistrictID', function () {
                if ($scope.tempDetails.DistrictID !== undefined) {
                    basicZoneService.getPreZoneCenterName($scope.tempDetails.DistrictID, AppSettings.ExamInstID).then(function (results) {
                        $scope.preZoneCenters = results;
                    });
                }
            });
            //    $scope.$watch('tempDetails.exmSubID', function () {
                   
            //});

            $scope.showAbsentEntryDetail = function () {
                if ($scope.absentEntryDetailForm.$valid) {
                    $scope.LoadImg = true;
                    if ($scope.tempDetails.ExmSubID !== undefined && $scope.tempDetails.BranchID !== undefined && $scope.tempDetails.ExamID !== undefined && $scope.tempDetails.PreZoneCntrID && $scope.tempDetails.CourseID) {
                        $scope.studentDetailList = [];
                        $scope.tempDetails.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        absentDetailService.getStudentDetailsByExamSubject($scope.tempDetails).then(function (results) {
                            if (results.length > 0) {
                                $scope.LoadImg = false;
                                $scope.studentDetailList = results;
                            } else {
                                alert("Record not found");
                                $scope.studentDetailList = [];
                                $scope.LoadImg = false;
                            }
                        });
                    }
                }
            };

                $scope.postAbsentEntryDetail = function () {
                    if ($scope.absentEntryDetailForm.$valid && $scope.absentEntryForm.$valid && $scope.studentDetailList.length > 0) {
                        for (var i = 0; i < $scope.studentDetailList.length; i++) {
                            if ($scope.studentDetailList[i].RecordID > 0) {
                                if (($scope.studentDetailList[i].OldStatusFlag !== $scope.studentDetailList[i].StatusFlag)) {
                                    var temp = {};
                                    angular.copy($scope.studentDetailList[i], temp);
                                    $scope.updatedStudentDetailList.push(temp);
                                }
                            } else {
                                var temp = {};
                                angular.copy($scope.studentDetailList[i], temp);
                                $scope.updatedStudentDetailList.push(temp);
                            }
                        }
                        if ($scope.updatedStudentDetailList.length > 0) {
                            $scope.postAbsentEntry = {};
                            $scope.postAbsentEntry.studentDetailList = $scope.updatedStudentDetailList;
                            $scope.tempDetails.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                            $scope.tempDetails.CreLoginID = AppSettings.LoggedUserId; // Current CreLoginID
                            $scope.tempDetails.UpdLoginID = AppSettings.LoggedUserId; // Current UpdLoginID
                            $scope.postAbsentEntry.absentEntryDetails = $scope.tempDetails;  
                            absentDetailService.postAbsentEntry($scope.postAbsentEntry).then(function (results) {
                                if (results.IsSuccess) {                                   
                                    $scope.tempDetails = {};
                                    $scope.studentDetailList = [];
                                    $scope.updatedStudentDetailList = [];
                                    $scope.postAbsentEntry = {};
                                    $scope.postAbsentEntry.studentDetailList = [];
                                    $scope.postAbsentEntry.absentEntryDetails = {};   
                                    alert(results.Message);
                                } else {                                   
                                    $scope.tempDetails = {};
                                    $scope.studentDetailList = [];
                                    $scope.updatedStudentDetailList = [];
                                    $scope.postAbsentEntry = {};
                                    $scope.postAbsentEntry.studentDetailList = [];
                                    $scope.postAbsentEntry.absentEntryDetails = {}; 
                                    alert(results.Message);
                                }
                            }, function (error) {                               
                                $scope.tempDetails = {};
                                $scope.studentDetailList = [];
                                $scope.updatedStudentDetailList = [];
                                $scope.postAbsentEntry = {};
                                $scope.postAbsentEntry.studentDetailList = [];
                                $scope.postAbsentEntry.absentEntryDetails = {};      
                                alert("Record not found");
                            });
                        }
                        else {
                            $scope.tempDetails = {};
                            $scope.studentDetailList = [];
                            $scope.updatedStudentDetailList = [];
                            $scope.postAbsentEntry = {};
                            $scope.postAbsentEntry.studentDetailList = [];
                            $scope.postAbsentEntry.absentEntryDetails = {};
                        }
                    }
                };
            });
}());