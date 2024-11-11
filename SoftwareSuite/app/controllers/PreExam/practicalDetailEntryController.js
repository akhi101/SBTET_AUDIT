(function () {
    'use strict';
    angular.module('app')
        .controller('practicalDetailEntryController',
            function ($rootScope, $scope, basicCourseService, basicExamService, examTimeTableService, practicalEntryService, basicZoneService, basicBranchService, basicDistrictsService, AppSettings) {

                $scope.practicalEntryDetail = {};
                $scope.studentInfoList = [];
                $scope.postPracticalEntry = {};
                $scope.postPracticalEntry.studentInfoList = [];
                $scope.postPracticalEntry.practicalEntryDetails = {};
                $scope.updatedStudentInfoList = [];

                $scope.isCorrect = false;

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                    //getAllZoneCenterCollege();
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
                //var getAllZoneCenterCollege = function () {
                //    basicZoneService.getZoneCenterList().then(function (results) {
                //        $scope.zoneCenterColleges = results;
                //    });
                //};

                $scope.$watch('practicalEntryDetail.CourseID', function () {
                    if ($scope.practicalEntryDetail.CourseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.practicalEntryDetail.CourseID).then(function (results) {
                            $scope.basicBranches = results;
                        });
                        basicExamService.getBasicExamListByCourseID($scope.practicalEntryDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });

                $scope.$watch('practicalEntryDetail.BranchID', function () {
                    if ($scope.practicalEntryDetail.BranchID !== undefined && $scope.practicalEntryDetail.ExamID !== undefined) {
                        $scope.practicalEntryDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        practicalEntryService.getExamTimeTableSubjectListByExamIDBranchID($scope.practicalEntryDetail.ExamID, $scope.practicalEntryDetail.BranchID, $scope.practicalEntryDetail.ExamInstID).then(function (results) {
                            $scope.examTimeTableSubjects = results;
                        });
                    }
                });

                $scope.$watch('practicalEntryDetail.DistrictID', function () {
                    if ($scope.practicalEntryDetail.DistrictID !== undefined) {
                        practicalEntryService.getPrePractCenterByDistrictId($scope.practicalEntryDetail.DistrictID, AppSettings.ExamInstID).then(function (results) {
                            $scope.prePractCenters = results;
                        });
                    }
                });

                //    $scope.$watch('practicalEntryDetail.ExmSubID', function () {

                //});

                $scope.showStudentDetails = function () {
                    if ($scope.practicalEntryDetailForm.$valid && $scope.practicalEntryDetail.ExmSubID !== undefined && $scope.practicalEntryDetail.BranchID !== undefined && $scope.practicalEntryDetail.ExamID !== undefined && $scope.practicalEntryDetail.PrePractCntrID && $scope.practicalEntryDetail.CourseID) {
                        $scope.studentDetailList = [];
                        $scope.practicalEntryDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        practicalEntryService.getStudentDetailsByExamSubject($scope.practicalEntryDetail).then(function (results) {
                            if (results.length > 0) {
                                $scope.studentDetailList = results;
                            } else {
                                $scope.studentDetailList = [];
                                alert("Record not found");
                            }
                        });
                    }
                };
                $scope.postPracticalEntryDetail = function () {
                    if ($scope.practicalStudentDetailForm.$valid &&  $scope.practicalEntryDetailForm.$valid && $scope.studentDetailList.length > 0) {
                        for (var i = 0; i < $scope.studentDetailList.length; i++) {
                            if (($scope.studentDetailList[i].StatusFlag == "A" || $scope.studentDetailList[i].StatusFlag == "M" || $scope.studentDetailList[i].StatusFlag == "N") && $scope.studentDetailList[i].Marks > 0) {
                                var statusName = $scope.studentDetailList[i].StatusFlag == "A" ? "Absent" : $scope.studentDetailList[i].StatusFlag == "M" ? "Malpractice" : $scope.studentDetailList[i].StatusFlag == "N" ? "Not Offered" : "";
                                alert("You have entered the marks against HTNo " + $scope.studentDetailList[i].HTNO + ", but you have selected " + statusName + ", please conform.");
                                $scope.isCorrect = false;
                                break;
                            }
                            $scope.isCorrect = true;
                            if ($scope.studentDetailList[i].recordID > 0) {
                                if (($scope.studentDetailList[i].OldMarks !== $scope.studentDetailList[i].Marks) || ($scope.studentDetailList[i].OldStatusFlag !== $scope.studentDetailList[i].StatusFlag)) {
                                    var temp = {};
                                    angular.copy($scope.studentDetailList[i], temp);
                                    $scope.updatedStudentInfoList.push(temp);
                                }
                            } else {
                                var temp = {};
                                angular.copy($scope.studentDetailList[i], temp);
                                $scope.updatedStudentInfoList.push(temp);
                            }
                        }
                        if ($scope.isCorrect) {
                            if ($scope.updatedStudentInfoList.length > 0) {
                                $scope.postPracticalEntry = {};
                                $scope.postPracticalEntry.studentInfoList = $scope.updatedStudentInfoList;
                                $scope.practicalEntryDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                                $scope.practicalEntryDetail.CreLoginID = AppSettings.LoggedUserId; // Current CreLoginID
                                $scope.practicalEntryDetail.UpdLoginID = AppSettings.LoggedUserId; // Current UpdLoginID
                                $scope.postPracticalEntry.practicalEntryDetails = $scope.practicalEntryDetail;
                                practicalEntryService.postPracticalEntry($scope.postPracticalEntry).then(function (results) {
                                    if (results.IsSuccess) {
                                        $scope.practicalEntryDetail = {};
                                        $scope.studentDetailList = [];
                                        $scope.updatedStudentInfoList = [];
                                        $scope.postPracticalEntry = {};
                                        $scope.postPracticalEntry.studentInfoList = [];
                                        $scope.postPracticalEntry.practicalEntryDetails = {};
                                        alert(results.Message);
                                    } else {
                                        $scope.practicalEntryDetail = {};
                                        $scope.studentDetailList = [];
                                        $scope.updatedStudentInfoList = [];
                                        $scope.postPracticalEntry = {};
                                        $scope.postPracticalEntry.studentInfoList = [];
                                        $scope.postPracticalEntry.practicalEntryDetails = {};
                                        alert(results.Message);
                                    }
                                }, function (error) {
                                    $scope.practicalEntryDetail = {};
                                    $scope.updatedStudentInfoList = [];
                                    $scope.studentDetailList = [];
                                    $scope.postPracticalEntry = {};
                                    $scope.postPracticalEntry.studentInfoList = [];
                                    $scope.postPracticalEntry.practicalEntryDetails = {};
                                    alert(error.statusText);
                                });
                            } else {
                                $scope.practicalEntryDetail = {};
                                $scope.updatedStudentInfoList = [];
                                $scope.studentDetailList = [];
                                $scope.postPracticalEntry = {};
                                $scope.postPracticalEntry.studentInfoList = [];
                                $scope.postPracticalEntry.practicalEntryDetails = {};
                            }
                        }
                    }
                };

            });
}());