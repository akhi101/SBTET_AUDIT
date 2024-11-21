(function () {
    'use strict';
    angular.module('app')
        .controller('practicalDetailEntryCollegeBulkOTPController',
            function ($rootScope, $scope, $state, basicCourseService, basicExamService, examTimeTableService, practicalEntryService, basicZoneService, basicBranchService, basicDistrictsService, AppSettings) {
                $scope.practicalEntryDetailCollegeBulkOTP = {};
                $scope.studentInfoList = [];
                $scope.postPracticalEntry = {};
                $scope.postPracticalEntry.studentInfoList = [];
                $scope.postPracticalEntry.practicalEntryDetailCollegeBulkOTPs = {};
                $scope.updatedStudentInfoList = [];

                $scope.isCorrect = false;

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse($scope.practicalEntryDetailCollegeBulkOTP.CourseID).then(function (results) {
                        $scope.basicCourses = results;
                        $scope.practicalEntryDetailCollegeBulkOTP.CourseID = $scope.basicCourses[0].CourseID;
                    });
                };
                var getAllBasicDistrict = function () {
                    basicDistrictsService.getBasicDistrictsList().then(function (results) {
                        $scope.basicDistricts = results;
                    });
                };
                $scope.$watch('practicalEntryDetailCollegeBulkOTP.CourseID', function () {
                    if ($scope.practicalEntryDetailCollegeBulkOTP.CourseID !== undefined) {
                        basicBranchService.getBasicBranchListByCourseId($scope.practicalEntryDetailCollegeBulkOTP.CourseID).then(function (results) {
                            $scope.basicBranches = results;
                        });
                        basicExamService.getBasicExamListByCourseID($scope.practicalEntryDetailCollegeBulkOTP.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                        practicalEntryService.getCheckCenterCollegePresentByDieo(AppSettings.DistrictIDs, AppSettings.ExamInstID, $scope.practicalEntryDetailCollegeBulkOTP.CourseID).then(function (results) {
                            if (results == 0) {
                                alert("Center not generated.");
                                $state.go('PreExam');
                            } else {
                                $scope.practicalEntryDetailCollegeBulkOTP.PrePractCntrID = "" + results[0].PrePractCntrID + "";
                                $scope.practicalEntryDetailCollegeBulkOTP.ZoneID = results[0].ZoneID;
                            }
                        });
                    }
                });
                $scope.$watch('practicalEntryDetailCollegeBulkOTP.ExamID', function () {
                    if ($scope.practicalEntryDetailCollegeBulkOTP.ExamID !== undefined) {
                        practicalEntryService.getFillBatchData(AppSettings.ExamInstID, $scope.practicalEntryDetailCollegeBulkOTP.ExamID).then(function (results) {
                            $scope.examBatches = results;
                        });
                    }
                    if ($scope.practicalEntryDetailCollegeBulkOTP.BranchID !== undefined && $scope.practicalEntryDetailCollegeBulkOTP.ExamID !== undefined) {
                        $scope.practicalEntryDetailCollegeBulkOTP.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        practicalEntryService.getExamTimeTableSubjectListByExamIDBranchID($scope.practicalEntryDetailCollegeBulkOTP.ExamID, $scope.practicalEntryDetailCollegeBulkOTP.BranchID, $scope.practicalEntryDetailCollegeBulkOTP.ExamInstID).then(function (results) {
                            $scope.examTimeTableSubjects = results;
                        });
                    }
                    if ($scope.practicalEntryDetailCollegeBulkOTP.CourseID == 1) {
                        $scope.practicalEntryDetailCollegeBulkOTP.ZoneType = 2;
                    } else {
                        $scope.practicalEntryDetailCollegeBulkOTP.ZoneType = 3;
                    }
                    var PracticalCenterList = practicalEntryService.GetPrePractCenterByDistrictId(AppSettings.DistrictIDs, AppSettings.ExamInstID);
                    PracticalCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                        $scope.PracticalCenterList = PracticalCenterData;
                    }, function (PracticalCenterData, status, headers, config) {
                        alert(error);
                    })
                    if ($scope.practicalEntryDetailCollegeBulkOTP.ExamID !== undefined) {
                        practicalEntryService.getExamTimeSchedulePresent($scope.practicalEntryDetailCollegeBulkOTP.ExamID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollegeBulkOTP.PrePractCntrID, $scope.practicalEntryDetailCollegeBulkOTP.ZoneType).then(function (results) {
                            if (results.length == 0) {
                                alert("Mark Entry Schedule not available");
                                $state.go('PreExam');
                            } else {
                                $scope.StartTime = results[0].StartTimeStr;
                                $scope.EndTime = results[0].EndTimeStr;
                                $scope.practicalEntryDetailCollegeBulkOTP.CreateLoginID = AppSettings.LoggedUserId;
                                $scope.practicalEntryDetailCollegeBulkOTP.Prdate = new Date();
                            }
                        });
                    }
                    //practicalEntryService.getExaminerDatabyCenter(AppSettings.CollegeID, AppSettings.ExamInstID, $scope.practicalEntryDetailCollegeBulkOTP.ExamID, 0).then(function (results) {
                    //    $scope.studentDetailList = results;
                    //});
                });
                $scope.$watch('practicalEntryDetailCollegeBulkOTP.BranchID', function () {
                    if ($scope.practicalEntryDetailCollegeBulkOTP.BranchID !== undefined && $scope.practicalEntryDetailCollegeBulkOTP.ExamID !== undefined) {
                        $scope.practicalEntryDetailCollegeBulkOTP.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        practicalEntryService.getExamTimeTableSubjectListByExamIDBranchID($scope.practicalEntryDetailCollegeBulkOTP.ExamID, $scope.practicalEntryDetailCollegeBulkOTP.BranchID, $scope.practicalEntryDetailCollegeBulkOTP.ExamInstID).then(function (results) {
                            $scope.examTimeTableSubjects = results;
                        });
                    }
                });
                $scope.$watch('practicalEntryDetailCollegeBulkOTP.DistrictID', function () {
                    if ($scope.practicalEntryDetailCollegeBulkOTP.DistrictID !== undefined) {
                        practicalEntryService.getPrePractCenterByDistrictId($scope.practicalEntryDetailCollegeBulkOTP.DistrictID, AppSettings.ExamInstID).then(function (results) {
                            $scope.prePractCenters = results;
                        });
                    }
                });
                $scope.OTPDisable = false;
                $scope.SubmitDisable = false;
                $scope.SendOTP = function () {
                    if (($scope.practicalEntryDetailCollegeBulkOTP.CourseID == undefined) || ($scope.practicalEntryDetailCollegeBulkOTP.CourseID == "")) {
                        alert("Select Course");
                        return;
                    }
                    if (($scope.practicalEntryDetailCollegeBulkOTP.ExamID == undefined) || ($scope.practicalEntryDetailCollegeBulkOTP.ExamID == "")) {
                        alert("Select Exam");
                        return;
                    }
                    if (($scope.practicalEntryDetailCollegeBulkOTP.BranchID == undefined) || ($scope.practicalEntryDetailCollegeBulkOTP.BranchID == "")) {
                        alert("Select Branch");
                        return;
                    }
                    $scope.studentDetailList = [];
                    $scope.practicalEntryDetailCollegeBulkOTP.CenterCollegeID = AppSettings.CollegeID;
                    $scope.practicalEntryDetailCollegeBulkOTP.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                    $scope.practicalEntryDetailCollegeBulkOTP.CreateLoginID = AppSettings.LoggedUserId;
                    $scope.practicalEntryDetailCollegeBulkOTP.DateOfMarkEntry = $scope.practicalEntryDetailCollegeBulkOTP.Prdate;
                    $scope.practicalEntryDetailCollegeBulkOTP.EvalTypeID = 2;
                    if ($scope.practicalEntryDetailCollegeBulkOTP.CourseID == 1) {
                        $scope.practicalEntryDetailCollegeBulkOTP.ZoneType = 2;
                    } else {
                        $scope.practicalEntryDetailCollegeBulkOTP.ZoneType = 3;
                    }
                    practicalEntryService.GetOTPMarkEntryPresentInOTPTable($scope.practicalEntryDetailCollegeBulkOTP).then(function (resultsPre) {
                        if (resultsPre.length > 0) {
                            $scope.practicalEntryDetailCollegeBulkOTP.OTPSended = resultsPre[0].OTP;
                            alert("OTP already Sent");
                            $scope.txtOTPDisable = false;
                            $scope.SubmitDisable = false;
                        } else {
                            practicalEntryService.GetGenerateOTP($scope.practicalEntryDetailCollegeBulkOTP.MobileNO).then(function (results) {
                                $scope.practicalEntryDetailCollegeBulkOTP.OTPSended = results;
                                alert("Sent OTP Successfully,Submit that OTP.");
                                $scope.txtOTPDisable = false;
                                $scope.SubmitDisable = false;
                            });
                        }
                    });
                }
                $scope.otoSuccess = false;
                $scope.showStudentDetails = function () {
                    $scope.SubmitDisable = true;
                    if (($scope.practicalEntryDetailCollegeBulkOTP.CourseID == undefined) || ($scope.practicalEntryDetailCollegeBulkOTP.CourseID == "")) {
                        alert("Select Course");
                        return;
                    }
                    if (($scope.practicalEntryDetailCollegeBulkOTP.ExamID == undefined) || ($scope.practicalEntryDetailCollegeBulkOTP.ExamID == "")) {
                        alert("Select Exam");
                        return;
                    }
                    if (($scope.practicalEntryDetailCollegeBulkOTP.BranchID == undefined) || ($scope.practicalEntryDetailCollegeBulkOTP.BranchID == "")) {
                        alert("Select Branch");
                        return;
                    }
                    if (($scope.practicalEntryDetailCollegeBulkOTP.BatchName == undefined) || ($scope.practicalEntryDetailCollegeBulkOTP.BatchName == "")) {
                        alert("Select Batch No.");
                        return;
                    }
                    if ($scope.practicalEntryDetailCollegeBulkOTPForm.$valid && $scope.practicalEntryDetailCollegeBulkOTP.BranchID !== undefined && $scope.practicalEntryDetailCollegeBulkOTP.ExamID !== undefined && $scope.practicalEntryDetailCollegeBulkOTP.CourseID) {
                        $scope.studentDetailList = [];
                        $scope.practicalEntryDetailCollegeBulkOTP.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        if ($scope.practicalEntryDetailCollegeBulkOTP.CourseID == 1) {
                            $scope.practicalEntryDetailCollegeBulkOTP.ZoneType = 2;
                        } else {
                            $scope.practicalEntryDetailCollegeBulkOTP.ZoneType = 3;
                        }
                        practicalEntryService.getExaminerDatabyCenterForBulkOTP(AppSettings.DistrictIDs,AppSettings.ExamInstID, $scope.practicalEntryDetailCollegeBulkOTP.ExamID, $scope.practicalEntryDetailCollegeBulkOTP.ZoneType).then(function (results) {
                            if (results.length > 0) {
                                $scope.studentDetailList = results;
                                $scope.SubmitDisable = false;
                                $scope.txtOTPDisable = true;
                            } else {
                                $scope.studentDetailList = [];
                                alert("Record not found");
                                $scope.SubmitDisable = false;
                                $scope.txtOTPDisable = false;
                            }
                        });
                    }
                };
                $scope.$watch('practicalEntryDetailCollegeBulkOTP.PrBatchID', function () {
                    if ($scope.practicalEntryDetailCollegeBulkOTP.PrBatchID != undefined && $scope.practicalEntryDetailCollegeBulkOTP.PrBatchID != undefined) {
                        for (var i = 0; i < $scope.examBatches.length; i++) {
                            if ($scope.practicalEntryDetailCollegeBulkOTP.PrBatchID == $scope.examBatches[i].PrBatchID) {
                                $scope.practicalEntryDetailCollegeBulkOTP.BatchName = $scope.examBatches[i].BatchName;
                            }
                        }
                    }
                });
                $scope.postpracticalEntryDetailCollegeBulkOTP = function () {
                    if ($scope.practicalEntryDetailCollegeBulkOTPForm.$valid && $scope.studentDetailList.length > 0) {
                        $scope.isCorrect = true;
                        if ($scope.isCorrect) {
                            if ($scope.studentDetailList.length > 0) {
                                $scope.postPracticalEntry = {};
                                if ($scope.practicalEntryDetailCollegeBulkOTP.CourseID == 1) {
                                    $scope.practicalEntryDetailCollegeBulkOTP.ZoneType = 2;
                                } else {
                                    $scope.practicalEntryDetailCollegeBulkOTP.ZoneType = 3;
                                }
                                for (var i = 0; i < $scope.studentDetailList.length; i++) {
                                    $scope.studentDetailList[i].CourseID = $scope.practicalEntryDetailCollegeBulkOTP.CourseID;
                                    $scope.studentDetailList[i].ExamID = $scope.practicalEntryDetailCollegeBulkOTP.ExamID;
                                    $scope.studentDetailList[i].BranchID = $scope.practicalEntryDetailCollegeBulkOTP.BranchID;
                                    $scope.studentDetailList[i].BatchName = $scope.practicalEntryDetailCollegeBulkOTP.BatchName;
                                    $scope.studentDetailList[i].InstanceID = AppSettings.ExamInstID;
                                    $scope.studentDetailList[i].ExamInstID = AppSettings.ExamInstID;
                                    $scope.studentDetailList[i].CreLoginID = AppSettings.LoggedUserId;
                                    $scope.studentDetailList[i].CreateLoginID = AppSettings.LoggedUserId;
                                    $scope.studentDetailList[i].DateOfMarkEntry = $scope.practicalEntryDetailCollegeBulkOTP.Prdate;
                                    $scope.studentDetailList[i].BatchNo = $scope.practicalEntryDetailCollegeBulkOTP.BatchName;
                                    $scope.studentDetailList[i].ZoneType = $scope.practicalEntryDetailCollegeBulkOTP.ZoneType
                                }
                                $scope.postPracticalEntry = $scope.studentDetailList;
                                practicalEntryService.PostInsertOTPMarkEntryList($scope.postPracticalEntry).then(function (results) {
                                    $scope.studentDetailList = [];
                                    $scope.postPracticalEntry = {};
                                    alert("Send OTP Successfully.");
                                }, function (error) {
                                    $scope.studentDetailList = [];
                                    $scope.postPracticalEntry = {};
                                    alert(error.statusText);
                                });
                            } else {
                                $scope.studentDetailList = [];
                                $scope.postPracticalEntry = {};
                            }
                        }
                    }
                };

            });
}());