(function () {
    'use strict';
    angular.module('app')
        .controller('otherMarkEnrtyController',
        function ($rootScope, $scope, basicCourseService, basicExamService, examTimeTableService, otherMarkEnrtyService, basicZoneService, basicBranchService, basicDistrictsService, basicCollegeService,  AppSettings) {
                
                $scope.otherMarkEnrtyDetail = {};
                $scope.studentInfoList = [];
                $scope.postotherMarkEnrty = {};
                $scope.postotherMarkEnrty.studentInfoList = [];
                $scope.postotherMarkEnrty.otherMarkEnrtyDetails = {};
                $scope.updatedStudentInfoList = [];
                $scope.LoadImg = false;
                $scope.isCorrect = false;
                $scope.CollegeID = AppSettings.CollegeID;
                $scope.CollegeHide = false;
                $scope.HideMarks = true;
                $scope.ExamDisable = true;
                
                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                    if ($scope.CollegeID != undefined && $scope.CollegeID != "" && $scope.CollegeID != "0") {
                        getDistrictByCollegeID();
                        $scope.ColClass = "";
                        $scope.CollegeHide = true;
                        $scope.otherMarkEnrtyDetail.CollegeID = $scope.CollegeID;
                    }
                    else {
                        $scope.ColClass = "col-md-offset-2";
                        $scope.CollegeHide = false;
                    }
                    //getAllZoneCenterCollege();
                };

                var getDistrictByCollegeID = function () {
                    otherMarkEnrtyService.getDistrictDetails($scope.CollegeID).then(function (results) {
                        $scope.otherMarkEnrtyDetail.DistrictID = results[0].DistrictID;
                    });
                };

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

                //var getAllZoneCenterCollege = function () {
                //    basicZoneService.getZoneCenterList().then(function (results) {
                //        $scope.zoneCenterColleges = results;
                //    });
                //};

                $scope.$watch('otherMarkEnrtyDetail.CourseID', function () {
                    if ($scope.otherMarkEnrtyDetail.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.otherMarkEnrtyDetail.CourseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});
                        basicExamService.getBasicExamListByCourseID($scope.otherMarkEnrtyDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                            $scope.otherMarkEnrtyDetail.ExamID = results[0].ExamID;
                            $scope.otherMarkEnrtyDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                            otherMarkEnrtyService.getExamTimeTableSubjectListByExamIDBranchID($scope.otherMarkEnrtyDetail.ExamID, 0, $scope.otherMarkEnrtyDetail.ExamInstID).then(function (results) {
                                $scope.examTimeTableSubjects = results;
                            });
                        });
                    }
            });
            $scope.$watch('otherMarkEnrtyDetail.DistrictID', function () {
                //if ($scope.otherMarkEnrtyDetail.DistrictID !== undefined) {
                //    basicZoneService.getPreZoneCenterName($scope.otherMarkEnrtyDetail.DistrictID, AppSettings.ExamInstID).then(function (results) {
                //        $scope.preZoneCenters = results;
                //    });
                //}
                if ($scope.otherMarkEnrtyDetail.DistrictID !== undefined) {
                    basicCollegeService.getCollegeListByDistrict($scope.otherMarkEnrtyDetail.DistrictID).then(function (results) {
                        $scope.basiccolleges = results;
                    });
                }
            });

                //$scope.$watch('otherMarkEnrtyDetail.BranchID', function () {
                //    if ($scope.otherMarkEnrtyDetail.BranchID !== undefined && $scope.otherMarkEnrtyDetail.ExamID !== undefined) {
                //        $scope.otherMarkEnrtyDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                //        otherMarkEnrtyService.getExamTimeTableSubjectListByExamIDBranchID($scope.otherMarkEnrtyDetail.ExamID, $scope.otherMarkEnrtyDetail.BranchID, $scope.otherMarkEnrtyDetail.ExamInstID).then(function (results) {
                //            $scope.examTimeTableSubjects = results;
                //        });
                //    }
                //});

                //$scope.$watch('otherMarkEnrtyDetail.ExmSubID', function () {                    
                //    if ($scope.otherMarkEnrtyDetail.ExmSubID !== undefined) {
                //        otherMarkEnrtyService.getEvalTypeByExmSubID($scope.otherMarkEnrtyDetail.ExmSubID).then(function (results) {
                //            $scope.evalTypes = results;
                //        });
                //    }
                //});

            //    $scope.$watch('otherMarkEnrtyDetail.EvalTypID', function () {
                    
            //});

            $scope.MarksChange = function (Index, StatusType) {
                $scope.studentDetailList[Index].TotalMarks = $scope.studentDetailList[Index].MarksTh + $scope.studentDetailList[Index].MarksPr;
            };

            $scope.StatusChange = function (Index, StatusType, Status) {
                if (StatusType == "Th") {
                    if (Status == "P") {
                    }
                    else if (Status == "A") {
                        $scope.studentDetailList[Index].MarksTh = "";
                        //$scope.MarksThDisable = '$scope.MarksThDisable' + '_' + Index;
                        //('$scope.MarksThDisable_' + Index) = true;
                        //$scope.MarksThDisable = true;
                    }
                    else if (Status == "N") {
                        $scope.studentDetailList[Index].MarksTh = "";
                        $scope.studentDetailList[Index].MarksPr = "";
                        $scope.studentDetailList[Index].StatusFlagPr = "N";
                        //$scope.MarksThDisable = '$scope.MarksThDisable' + '_' + Index;
                        //$scope.MarksThDisable = true;
                    }
                }
                else if (StatusType == "Pr") {
                    if (Status == "P") {
                    }
                    else if (Status == "A") {
                        $scope.studentDetailList[Index].MarksPr = "";
                        //$scope.MarksPrDisable = '$scope.MarksPrDisable' + '_' + Index;
                        //$scope.MarksPrDisable = true;
                    }
                    else if (Status == "N") {
                        $scope.studentDetailList[Index].MarksTh = "";
                        $scope.studentDetailList[Index].MarksPr = "";
                        $scope.studentDetailList[Index].StatusFlagTh = "N";
                        //$scope.MarksPrDisable = '$scope.MarksPrDisable' + '_' + Index;
                        //$scope.MarksPrDisable = true;
                    }
                }
                $scope.studentDetailList[Index].TotalMarks = $scope.studentDetailList[Index].MarksTh + $scope.studentDetailList[Index].MarksPr;
            };


                $scope.showStudentDetail = function () {
                //&& $scope.otherMarkEnrtyDetail.EvalTypID !== undefined && $scope.otherMarkEnrtyDetail.BranchID !== undefined
                if ($scope.otherMarkEnrtyStudentDetailForm.$valid && $scope.otherMarkEnrtyDetail.ExmSubID !== undefined && $scope.otherMarkEnrtyDetail.ExamID !== undefined && $scope.otherMarkEnrtyDetail.CollegeID && $scope.otherMarkEnrtyDetail.CourseID) {
                    $scope.LoadImg = true;
                    $scope.studentDetailList = [];
                    $scope.otherMarkEnrtyDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                    otherMarkEnrtyService.getStudentDetailsByExamSubject($scope.otherMarkEnrtyDetail).then(function (results) {
                        if (results.length > 0) {
                            if (results[0].ErrMsg != "" && results[0].ErrMsg != null) {
                                alert(results[0].ErrMsg);
                                $scope.LoadImg = false;
                                return;
                            }
                            else {
                                $scope.studentDetailList = results;
                                $scope.LoadImg = false;
                                for (var i = 0; i < $scope.studentDetailList.length; i++) {
                                    if ($scope.studentDetailList[i].MarksTh == 0) {
                                        $scope.studentDetailList[i].MarksTh = "";
                                    }
                                    if ($scope.studentDetailList[i].MarksPr == 0) {
                                        $scope.studentDetailList[i].MarksPr = "";
                                    }
                                    $scope.studentDetailList[i].TotalMarks = $scope.studentDetailList[i].MarksTh + $scope.studentDetailList[i].MarksPr;
                                }
                                $scope.HideMarks = (($scope.studentDetailList[0].ChkListFlag == 'V') ? true : false);
                            }
                        } else {
                            alert("Record not found");
                            $scope.studentDetailList = [];
                            $scope.LoadImg = false;
                        }
                    });
                }
            }
            $scope.submitOtherMarkEnrtyDetail = function () {
                var _confirm = confirm("Once Submit you cannot edit. Are you confirm?");
                if (_confirm == true) {
                    $scope.postotherMarkEnrty = {};
                    $scope.postotherMarkEnrty.UpdateLoginID = AppSettings.LoggedUserId;
                    $scope.postotherMarkEnrty.RecordIDs = "";
                    for (var i = 0; i < $scope.studentDetailList.length; i++) {
                        $scope.postotherMarkEnrty.RecordIDs += $scope.studentDetailList[i].RecordID + ',';
                    }
                    $scope.postotherMarkEnrty.RecordIDs = $scope.postotherMarkEnrty.RecordIDs.slice(0, -1);

                    otherMarkEnrtyService.postOtherMarkVerification($scope.postotherMarkEnrty).then(function (results) {
                        if (results.IsSuccess) {
                            $scope.otherMarkEnrtyDetail = {};
                            $scope.studentDetailList = [];
                            $scope.updatedStudentInfoList = [];
                            $scope.postotherMarkEnrty = {};
                            $scope.postotherMarkEnrty.studentInfoList = [];
                            $scope.postotherMarkEnrty.otherMarkEnrtyDetails = {};
                            alert(results.Message);
                            $scope.LoadImg = false;
                            if ($scope.CollegeID != undefined && $scope.CollegeID != "" && $scope.CollegeID != "0") {
                                $scope.otherMarkEnrtyDetail.CollegeID = $scope.CollegeID;
                            }
                        } else {
                            $scope.otherMarkEnrtyDetail = {};
                            $scope.studentDetailList = [];
                            $scope.updatedStudentInfoList = [];
                            $scope.postotherMarkEnrty = {};
                            $scope.postotherMarkEnrty.studentInfoList = [];
                            $scope.postotherMarkEnrty.otherMarkEnrtyDetails = {};
                            alert(results.Message);
                            $scope.LoadImg = false;
                        }
                    }, function (error) {
                        $scope.otherMarkEnrtyDetail = {};
                        $scope.updatedStudentInfoList = [];
                        $scope.studentDetailList = [];
                        $scope.postotherMarkEnrty = {};
                        $scope.postotherMarkEnrty.studentInfoList = [];
                        $scope.postotherMarkEnrty.otherMarkEnrtyDetails = {};
                        alert(error.statusText);
                        $scope.LoadImg = false;
                    });
                } else {
                    //
                }
            };
                $scope.postOtherMarkEnrtyDetail = function () {                   
                    if ($scope.otherMarkEnrtyStudentDetailForm.$valid && $scope.otherMarkEnrtyDetailForm.$valid && $scope.studentDetailList.length > 0) {
                        $scope.LoadImg = true;
                        $scope.updatedStudentInfoList = [];
                        for (var i = 0; i < $scope.studentDetailList.length; i++) {
                            if (($scope.studentDetailList[i].StatusFlagTh == "A" || $scope.studentDetailList[i].StatusFlagTh == "M" || $scope.studentDetailList[i].StatusFlagTh == "N") && $scope.studentDetailList[i].MarksTh > 0) {
                                var statusName = $scope.studentDetailList[i].StatusFlagTh == "A" ? "Absent" : $scope.studentDetailList[i].StatusFlagTh == "M" ? "Malpractice" : $scope.studentDetailList[i].StatusFlagTh == "N" ? "Not Applicable" : "";
                                alert("You have entered Theory Marks against HTNo " + $scope.studentDetailList[i].HTNO + ", but you have selected " + statusName + ", please enter valid data.");
                                $scope.LoadImg = false;
                                $scope.isCorrect = false;
                                break;
                            }
                            if (($scope.studentDetailList[i].StatusFlagPr == "A" || $scope.studentDetailList[i].StatusFlagPr == "M" || $scope.studentDetailList[i].StatusFlagPr == "N") && $scope.studentDetailList[i].MarksPr > 0) {
                                var statusName = $scope.studentDetailList[i].StatusFlagPr == "A" ? "Absent" : $scope.studentDetailList[i].StatusFlagPr == "M" ? "Malpractice" : $scope.studentDetailList[i].StatusFlagPr == "N" ? "Not Applicable" : "";
                                alert("You have entered Practical Marks against HTNo " + $scope.studentDetailList[i].HTNO + ", but you have selected " + statusName + ", please enter valid data.");
                                $scope.LoadImg = false;
                                $scope.isCorrect = false;
                                break;
                            }
                            if (($scope.studentDetailList[i].StatusFlagTh == "N") && ($scope.studentDetailList[i].StatusFlagPr != "N")) {
                                var statusName = $scope.studentDetailList[i].StatusFlagPr == "A" ? "Absent" : $scope.studentDetailList[i].StatusFlagPr == "P" ? "Present" : "";
                                alert("You have selected Theory subject as Not Applicable and Practical subject as " + statusName + " for HTNo " + $scope.studentDetailList[i].HTNO + ", Please enter valid data.");
                                $scope.LoadImg = false;
                                $scope.isCorrect = false;
                                break;
                            }
                            if (($scope.studentDetailList[i].StatusFlagTh != "N") && ($scope.studentDetailList[i].StatusFlagPr == "N")) {
                                var statusName = $scope.studentDetailList[i].StatusFlagTh == "A" ? "Absent" : $scope.studentDetailList[i].StatusFlagTh == "P" ? "Present" : "";
                                alert("You have selected Practical subject as Not Applicable and Theory subject as " + statusName + " for HTNo " + $scope.studentDetailList[i].HTNO + ", Please enter valid data.");
                                $scope.LoadImg = false;
                                $scope.isCorrect = false;
                                break;
                            }
                            if (($scope.studentDetailList[i].StatusFlagTh == "P") && ($scope.studentDetailList[i].MarksTh.replace(" ", "") == "")) {
                                alert("You have selected Theory subject as Present for HTNo " + $scope.studentDetailList[i].HTNO + " and haven't entered Marks, Please enter Theory marks.");
                                $scope.LoadImg = false;
                                $scope.isCorrect = false;
                                break;
                            }
                            if (($scope.studentDetailList[i].StatusFlagPr == "P") && ($scope.studentDetailList[i].MarksPr.replace(" ", "") == "")) {
                                alert("You have selected Practical subject as Present for HTNo " + $scope.studentDetailList[i].HTNO + " and haven't entered Marks, Please enter Theory marks.");
                                $scope.LoadImg = false;
                                $scope.isCorrect = false;
                                break;
                            }
                            $scope.isCorrect = true;
                            if ($scope.studentDetailList[i].recordID > 0) {
                                if (($scope.studentDetailList[i].OldMarksTh !== $scope.studentDetailList[i].MarksTh) || ($scope.studentDetailList[i].OldStatusFlagTh !== $scope.studentDetailList[i].StatusFlagTh) || ($scope.studentDetailList[i].OldMarksPr !== $scope.studentDetailList[i].MarksPr) || ($scope.studentDetailList[i].OldStatusFlagPr !== $scope.studentDetailList[i].StatusFlagPr)) {
                                    var temp = {};
                                    angular.copy($scope.studentDetailList[i], temp);
                                    $scope.updatedStudentInfoList.push(temp);
                                }
                            } else {
                                var temp = {};
                                angular.copy($scope.studentDetailList[i], temp);
                                $scope.updatedStudentInfoList.push(temp);
                            }    
                            //if ($scope.studentDetailList[i].Marks <= 0 || $scope.studentDetailList[i].Marks.replace(" ", "") == "") {
                            //    alert("Please enter correct marks for Hall Ticket No:" + $scope.studentDetailList[i].HTNO);
                            //    return false;
                            //}
                        }
                        if ($scope.isCorrect) {
                            if ($scope.updatedStudentInfoList.length > 0) {
                                $scope.postotherMarkEnrty = {};
                                $scope.postotherMarkEnrty.studentInformationList = $scope.updatedStudentInfoList;
                                $scope.otherMarkEnrtyDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                                $scope.otherMarkEnrtyDetail.CreLoginID = AppSettings.LoggedUserId; // Current CreLoginID
                                $scope.otherMarkEnrtyDetail.UpdLoginID = AppSettings.LoggedUserId; // Current UpdLoginID
                                $scope.postotherMarkEnrty.otherMarkEnrtyDetails = $scope.otherMarkEnrtyDetail;
                                otherMarkEnrtyService.postOtherMarkEnrty($scope.postotherMarkEnrty).then(function (results) {
                                    if (results.IsSuccess) {
                                        $scope.otherMarkEnrtyDetail = {};
                                        $scope.studentDetailList = [];
                                        $scope.updatedStudentInfoList = [];
                                        $scope.postotherMarkEnrty = {};
                                        $scope.postotherMarkEnrty.studentInfoList = [];
                                        $scope.postotherMarkEnrty.otherMarkEnrtyDetails = {};
                                        alert(results.Message);
                                        $scope.LoadImg = false;
                                        if ($scope.CollegeID != undefined && $scope.CollegeID != "" && $scope.CollegeID != "0") {
                                            $scope.otherMarkEnrtyDetail.CollegeID = $scope.CollegeID;
                                        }
                                    } else {
                                        $scope.otherMarkEnrtyDetail = {};
                                        $scope.studentDetailList = [];
                                        $scope.updatedStudentInfoList = [];
                                        $scope.postotherMarkEnrty = {};
                                        $scope.postotherMarkEnrty.studentInfoList = [];
                                        $scope.postotherMarkEnrty.otherMarkEnrtyDetails = {};
                                        alert(results.Message);
                                        $scope.LoadImg = false;
                                    }
                                }, function (error) {
                                    $scope.otherMarkEnrtyDetail = {};
                                    $scope.updatedStudentInfoList = [];
                                    $scope.studentDetailList = [];
                                    $scope.postotherMarkEnrty = {};
                                    $scope.postotherMarkEnrty.studentInfoList = [];
                                    $scope.postotherMarkEnrty.otherMarkEnrtyDetails = {};
                                    alert(error.statusText);
                                    $scope.LoadImg = false;
                                });
                            } else {
                                $scope.otherMarkEnrtyDetail = {};
                                $scope.updatedStudentInfoList = [];
                                $scope.studentDetailList = [];
                                $scope.postotherMarkEnrty = {};
                                $scope.postotherMarkEnrty.studentInfoList = [];
                                $scope.postotherMarkEnrty.otherMarkEnrtyDetails = {};
                                $scope.LoadImg = false;
                            }
                        }
                    }
                };         
                
            });
}());