(function () {
    'use strict';
    angular.module('app')
        .controller('vocationalPracticalBatchTimeTableNewGeoController',
            function ($rootScope, $scope, examTimeTableService, basicCourseService, basicDistrictsService, BasicMainGroupService, PrePractCenterService, AppSettings) {


                $scope.vocationalPracticalBatchTimeTable = {};
                $scope.isValid = false;

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllbasicDistricts();
                    getBasicSubjectList();
                    //getAllbasicMainGroup();
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                        $scope.vocationalPracticalBatchTimeTable.CourseID = $scope.basicCourses[0].CourseID;
                        $scope.vocationalPracticalBatchTimeTable.CourseName = $scope.basicCourses[0].CourseName;
                    });
                };

                var getAllbasicDistricts = function () {
                    basicDistrictsService.getGetBasicDistrictsByDistrictID(AppSettings.DistrictIDs).then(function (results) {
                        $scope.basicDistricts = results;
                        $scope.vocationalPracticalBatchTimeTable.DistrictID = $scope.basicDistricts[0].DistrictID;
                        $scope.vocationalPracticalBatchTimeTable.DistCode = $scope.basicDistricts[0].DistCode;
                    });
                };

                var getAllbasicMainGroup = function () {
                    BasicMainGroupService.GetBasicMainGroupListForVocationalPractical().then(function (results) {
                        $scope.basicMainGroupList = results;
                    });
                };

                $scope.$watch('vocationalPracticalBatchTimeTable.DistrictID', function () {
                    if ($scope.vocationalPracticalBatchTimeTable.DistrictID !== undefined) {
                        PrePractCenterService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, 2, AppSettings.DistrictIDs).then(function (results) {
                            $scope.PraCenterList = results;
                        });
                    }
                });
                $scope.$watch('vocationalPracticalBatchTimeTable.PrePractCntrID', function () {
                    $scope.PracticalBatchesList = [];
                    if ($scope.vocationalPracticalBatchTimeTable.PrePractCntrID !== undefined) {
                        $scope.PracticalBatchesList = [];
                        //$scope.vocationalPracticalBatchTimeTable.ExmSubID = "";
                        //PrePractCenterService.GetExamTimeTableSubjectListByExamIDBranchIDForGeo().then(function (results) {
                        //    $scope.basicSubjectList = results;
                        //});
                    }
                });
                var getBasicSubjectList = function () {
                    PrePractCenterService.GetExamTimeTableSubjectListByExamIDBranchIDForGeo().then(function (results) {
                        $scope.basicSubjectList = results;
                        $scope.vocationalPracticalBatchTimeTable.ExmSubID = $scope.basicSubjectList[0].ExmSubID;
                        $scope.vocationalPracticalBatchTimeTable.ExmSubName = $scope.basicSubjectList[0].ExmSubName;
                    });
                };

                $scope.$watch('vocationalPracticalBatchTimeTable.ExmSubID', function () {
                    if ($scope.vocationalPracticalBatchTimeTable.DistrictID == undefined) { $scope.vocationalPracticalBatchTimeTable.DistrictID = 0; }
                    if ($scope.vocationalPracticalBatchTimeTable.ExmSubID == undefined) { $scope.vocationalPracticalBatchTimeTable.ExmSubID = 0; }
                    for (var i = 0; i < $scope.basicSubjectList.length; i++) {
                        if ($scope.basicSubjectList[i].ExmSubID == $scope.vocationalPracticalBatchTimeTable.ExmSubID) {
                            $scope.vocationalPracticalBatchTimeTable.ExmSubCode = $scope.basicSubjectList[i].ExmSubCode;
                        }
                    }
                    if ($scope.vocationalPracticalBatchTimeTable.ExmSubID !== undefined) {
                        if ($scope.vocationalPracticalBatchTimeTable.cheExaminerAll == true) {
                            PrePractCenterService.GetExamineForVocationalPracticalForGeo(0, $scope.vocationalPracticalBatchTimeTable.ExmSubID).then(function (results) {
                                $scope.BasicExaminerListForChange = results;
                                if ($scope.BasicExaminerListForChange.length > 0) {
                                    $scope.vocationalPracticalBatchTimeTable.ExaminerCode = $scope.BasicExaminerListForChange[0].ExaminerCode;
                                } else {
                                    $scope.vocationalPracticalBatchTimeTable.ExaminerCode = 0;
                                }
                                $scope.PracticalBatchesList = [];
                            });
                        }
                        else {
                            PrePractCenterService.GetExamineForVocationalPracticalForGeo($scope.vocationalPracticalBatchTimeTable.DistrictID, $scope.vocationalPracticalBatchTimeTable.ExmSubID).then(function (results) {
                                $scope.BasicExaminerListForChange = results;
                                if ($scope.BasicExaminerListForChange.length > 0) {
                                    $scope.vocationalPracticalBatchTimeTable.ExaminerCode = $scope.BasicExaminerListForChange[0].ExaminerCode;
                                } else {
                                    $scope.vocationalPracticalBatchTimeTable.ExaminerCode = 0;
                                }
                                $scope.PracticalBatchesList = [];
                            });
                        }
                    }
                });
                $scope.showdisable = false;
                $scope.BasicExaminerListForChange = [];
                $scope.GetPracticalBatchesByGroup = function () {
                    if ($scope.BasicExaminerListForChange.length > 0) {
                        $scope.vocationalPracticalBatchTimeTable.ExaminerCode = $scope.BasicExaminerListForChange[0].ExaminerCode;
                    } else {
                        $scope.vocationalPracticalBatchTimeTable.ExaminerCode = 0;
                    }
                    $scope.showdisable = true;
                    $scope.vocationalPracticalBatchTimeTable.ExamID = 2;
                    if ($scope.vocationalPracticalBatchTimeTable.DistrictID == undefined) { $scope.vocationalPracticalBatchTimeTable.DistrictID = 0; }
                    if ($scope.vocationalPracticalBatchTimeTable.ExmSubID == undefined) { $scope.vocationalPracticalBatchTimeTable.ExmSubID = 0; }
                    var PracticalBatchesData = PrePractCenterService.GetBatchListForVocationalPracticalForGeo($scope.vocationalPracticalBatchTimeTable.DistrictID,
                        $scope.vocationalPracticalBatchTimeTable.ExmSubID, $scope.vocationalPracticalBatchTimeTable.PrePractCntrID,
                        $scope.vocationalPracticalBatchTimeTable.ExamID, AppSettings.ExamInstID);
                    PracticalBatchesData.then(function (MainGroupData, status, headers, config, error) {
                        if (MainGroupData.length == 0) {
                            $scope.showdisable = false;
                            alert("Data not found");
                            return;
                        } else {
                            $scope.showdisable = false;
                            $scope.savedisable = false;
                            for (var i = 0; i < MainGroupData.length; i++) {
                                MainGroupData[i].srno = i + 1;
                                MainGroupData[i].ExaminerID = "" + MainGroupData[i].ExaminerID + "";

                                //if (MainGroupData[i].AppointmentID > 0) {
                                //    MainGroupData[i].disablerow = true;
                                //    MainGroupData[i].disablename = true;
                                //    MainGroupData[i].disableExmId = true;
                                //} else {
                                //    MainGroupData[i].disablerow = false;
                                //    MainGroupData[i].disablename = false;
                                //    MainGroupData[i].disableExmId = false;
                                //}
                            }
                            $scope.PracticalBatchesList.BasicExaminerListForChange = $scope.BasicExaminerListForChange;
                            $scope.PracticalBatchesList = MainGroupData;
                        }
                    }, function (CourseData, status, headers, config) {
                        alert(error);
                    })
                }
                $scope.vocationalPracticalBatchTimeTable.cheExaminerAll = false;
                $scope.getfillAllExaminer = function (cheExaminerAll) {
                    if ($scope.vocationalPracticalBatchTimeTable.ExmSubID == undefined) { $scope.vocationalPracticalBatchTimeTable.ExmSubID = 0; }
                    if (cheExaminerAll == true) {
                        PrePractCenterService.GetExamineForVocationalPracticalForGeo(0, $scope.vocationalPracticalBatchTimeTable.ExmSubID).then(function (results) {
                            $scope.BasicExaminerListForChange = results;
                            if ($scope.BasicExaminerListForChange.length > 0) {
                                $scope.vocationalPracticalBatchTimeTable.ExaminerCode = $scope.BasicExaminerListForChange[0].ExaminerCode;
                            } else {
                                $scope.vocationalPracticalBatchTimeTable.ExaminerCode = 0;
                            }
                            $scope.PracticalBatchesList = [];
                        });
                    } else {
                        PrePractCenterService.GetExamineForVocationalPracticalForGeo($scope.vocationalPracticalBatchTimeTable.DistrictID, $scope.vocationalPracticalBatchTimeTable.ExmSubID).then(function (results) {
                            $scope.BasicExaminerListForChange = results;
                            if ($scope.BasicExaminerListForChange.length > 0) {
                                $scope.vocationalPracticalBatchTimeTable.ExaminerCode = $scope.BasicExaminerListForChange[0].ExaminerCode;
                            } else {
                                $scope.vocationalPracticalBatchTimeTable.ExaminerCode = 0;
                            }
                            $scope.PracticalBatchesList = [];
                        });
                    }
                }
                $scope.Examinerchange = function (BasicExaminer, index) {
                    if ((BasicExaminer.full_name == null) || (BasicExaminer.full_name == undefined)) {
                        BasicExaminer.full_name = "";
                    }
                    if (BasicExaminer.ExaminerID == "Select") {
                        BasicExaminer.ExaminerID = 0;
                    }
                    if (BasicExaminer.disablerow == false) {
                        if (BasicExaminer.ExaminerID == 0) {
                            BasicExaminer.disableExmId = false;
                            BasicExaminer.disablename = false;
                        }
                        else {
                            BasicExaminer.disableExmId = false;
                            BasicExaminer.disablename = true;
                        }
                        if ((BasicExaminer.ExaminerID == 0) && (BasicExaminer.full_name == "")) {
                            BasicExaminer.disableExmId = false;
                            BasicExaminer.disablename = false;
                        }
                    }

                    BasicExaminer.examinerNo = "";
                    BasicExaminer.full_name = "";
                    BasicExaminer.mobile_no = "";
                    for (var i = 0; i < $scope.BasicExaminerListForChange.length; i++) {
                        if ($scope.BasicExaminerListForChange[i].ExaminerID == BasicExaminer.ExaminerID) {
                            BasicExaminer.examinerNo = $scope.BasicExaminerListForChange[i].examinerNo;
                            BasicExaminer.full_name = $scope.BasicExaminerListForChange[i].full_name;
                            BasicExaminer.mobile_no = $scope.BasicExaminerListForChange[i].mobile_no;
                        }
                    }

                }
                $scope.getexmcode = function (BasicExaminer, index) {

                    if ((BasicExaminer.ExaminerID == undefined) || (BasicExaminer.ExaminerID == "Select")) { BasicExaminer.ExaminerID = 0; }
                    if (BasicExaminer.full_name == null) { BasicExaminer.full_name = ""; }
                    if (BasicExaminer.ExaminerID == 0) {
                        if (BasicExaminer.full_name != "") {
                            var addzero = "";
                            var codlen = $scope.vocationalPracticalBatchTimeTable.ExaminerCode;
                            codlen = codlen.length;
                            if (codlen == 1) {
                                addzero = "00";
                            } else if (codlen == 2) {
                                addzero = "0";
                            }
                            if ((BasicExaminer.TempFlag == null) || (BasicExaminer.TempFlag == "N")) {
                                $scope.vocationalPracticalBatchTimeTable.ExaminerCode = parseInt($scope.vocationalPracticalBatchTimeTable.ExaminerCode) + 1;
                                for (var i = 0; i < $scope.BasicExaminerListForChange.length; i++) {
                                    if ($scope.vocationalPracticalBatchTimeTable.ExaminerCode == $scope.BasicExaminerListForChange[i].examinerNo) {
                                        BasicExaminer.examinerNo = $scope.vocationalPracticalBatchTimeTable.ExaminerCode;
                                        break;
                                    }
                                }
                                if (codlen == 8) {
                                    BasicExaminer.examinerNo = $scope.vocationalPracticalBatchTimeTable.ExaminerCode;
                                } else {
                                    BasicExaminer.examinerNo = $scope.vocationalPracticalBatchTimeTable.DistCode + "" + $scope.vocationalPracticalBatchTimeTable.GroupCode + addzero + "" + $scope.vocationalPracticalBatchTimeTable.ExaminerCode;
                                    $scope.vocationalPracticalBatchTimeTable.ExaminerCode = $scope.vocationalPracticalBatchTimeTable.DistCode + "" + $scope.vocationalPracticalBatchTimeTable.GroupCode + addzero + "" + $scope.vocationalPracticalBatchTimeTable.ExaminerCode;
                                }
                                BasicExaminer.TempFlag = "Y";
                            }
                            else if (BasicExaminer.TempFlag == "Y") {
                                if (BasicExaminer.examinerNo == undefined) { BasicExaminer.examinerNo = ""; }
                                if (BasicExaminer.examinerNo == "") {
                                    $scope.vocationalPracticalBatchTimeTable.ExaminerCode = parseInt($scope.vocationalPracticalBatchTimeTable.ExaminerCode) + 1;
                                    for (var i = 0; i < $scope.BasicExaminerListForChange.length; i++) {
                                        if ($scope.vocationalPracticalBatchTimeTable.ExaminerCode == $scope.BasicExaminerListForChange[i].examinerNo) {
                                            BasicExaminer.examinerNo = $scope.vocationalPracticalBatchTimeTable.ExaminerCode;
                                            break;
                                        }
                                    }
                                    //if (alpres == false) {
                                    //    BasicExaminer.examinerNo = $scope.vocationalPracticalBatchTimeTable.DistCode + "" + $scope.vocationalPracticalBatchTimeTable.GroupCode + addzero + "" + $scope.vocationalPracticalBatchTimeTable.ExaminerCode;
                                    //    $scope.vocationalPracticalBatchTimeTable.ExaminerCode = $scope.vocationalPracticalBatchTimeTable.DistCode + "" + $scope.vocationalPracticalBatchTimeTable.GroupCode + addzero + "" + $scope.vocationalPracticalBatchTimeTable.ExaminerCode;
                                    //} else {
                                    //    BasicExaminer.examinerNo = $scope.vocationalPracticalBatchTimeTable.ExaminerCode;
                                    //}
                                    BasicExaminer.examinerNo = $scope.vocationalPracticalBatchTimeTable.DistCode + "" + $scope.vocationalPracticalBatchTimeTable.GroupCode + addzero + "" + $scope.vocationalPracticalBatchTimeTable.ExaminerCode;
                                    $scope.vocationalPracticalBatchTimeTable.ExaminerCode = $scope.vocationalPracticalBatchTimeTable.DistCode + "" + $scope.vocationalPracticalBatchTimeTable.GroupCode + addzero + "" + $scope.vocationalPracticalBatchTimeTable.ExaminerCode;
                                    BasicExaminer.TempFlag = "Y";
                                }
                            }
                        } else {
                            BasicExaminer.examinerNo = "";
                        }
                    }
                }
                $scope.savedisable = true;
                $scope.saveVocatinalBatchExamTimeTable = function () {
                    if (($scope.vocationalPracticalBatchTimeTable.CourseID == undefined) || ($scope.vocationalPracticalBatchTimeTable.CourseID == "")) {
                        alert("Please Select Course");
                        return false;
                    }
                    if (($scope.vocationalPracticalBatchTimeTable.DistrictID == undefined) || ($scope.vocationalPracticalBatchTimeTable.DistrictID == "")) {
                        alert("Please Select District");
                        return false;
                    }
                    if (($scope.vocationalPracticalBatchTimeTable.PrePractCntrID == undefined) || ($scope.vocationalPracticalBatchTimeTable.PrePractCntrID == "")) {
                        alert("Please Select Practical Center");
                        return false;
                    }
                    if ($scope.PracticalBatchesList.length == 0) {
                        alert("Batches Data not found");
                        return
                    }
                    $scope.preVocBatchesList = [];

                    //var ExaminerIDs = "";
                    //for (var i = 0; i < $scope.PracticalBatchesList.length; i++) {
                    //    if (ExaminerIDs != "") {
                    //        ExaminerIDs = ExaminerIDs + "," + $scope.PracticalBatchesList[i].ExaminerID;
                    //    } else {
                    //        ExaminerIDs =  $scope.PracticalBatchesList[i].ExaminerID;
                    //    }
                    //}
                    //var examinerresult = false;
                    //examTimeTableService.GetExaminerAvailable($scope.PracticalBatchesList[i].AppointMentDate, $scope.PracticalBatchesList[i].InstanceID, $scope.PracticalBatchesList[i].ExaminerIDs).then(function (results) {
                    //    if (results.length != 0) {
                    //        alert("" + $scope.PracticalBatchesList[i].full_name + " Examiner is already appointed in another center");
                    //        return;
                    //    }
                    //});

                    for (var i = 0; i < $scope.PracticalBatchesList.length; i++) {
                        if ($scope.preVocBatchesList.length > 0) {

                            //for (var j = 0; j < $scope.preVocBatchesList.length; j++) {
                            //if (window.moment(new Date($scope.PracticalBatchesList[i].AppointMentDate)).format("YYYY-MM-DD") != $scope.preVocBatchesList[j].AppointMentDate) {
                            //    $scope.isValid = true;
                            //} else {
                            //    $scope.isValid = false;
                            //    alert("Date should not be same as previous one, for srno =" + $scope.PracticalBatchesList[i].srno + "");
                            //    break;
                            //}
                            //if ((window.moment(new Date($scope.PracticalBatchesList[i].AppointMentDate)).format("YYYY-MM-DD") == $scope.preVocBatchesList[j].AppointMentDate)
                            //    && ($scope.PracticalBatchesList[i].ExaminerID == $scope.PracticalBatchesList[j].ExaminerID)) {
                            //    $scope.isValid = false;
                            //    alert("Examiner should not be same as previous one, for srno =" + $scope.PracticalBatchesList[i].srno + "");
                            //    break;
                            //} else {
                            //    $scope.isValid = true;
                            //}
                            //if (($scope.PracticalBatchesList[i].ExaminerID == "") || ($scope.PracticalBatchesList[i].ExaminerID == undefined)) {
                            //    if (($scope.PracticalBatchesList[i].full_name == "") || ($scope.PracticalBatchesList[i].full_name == undefined)) {
                            //        alert("Examiner should not be blank , for srno =" + $scope.PracticalBatchesList[i].srno + "");
                            //        $scope.isValid = false;
                            //        break;
                            //    }
                            //}
                            if ($scope.PracticalBatchesList[i].AppointMentDate == null) {
                                $scope.isValid = false;
                                alert("Date should not be blank, for srno =" + $scope.PracticalBatchesList[i].srno + "");
                                break;
                            }
                            //for (var k = 0; k < $scope.preVocBatchesList.length; k++) {
                            //    if ($scope.PracticalBatchesList[i].PrDaySeq == $scope.PracticalBatchesList[k].PrDaySeq) {
                            //        if ((window.moment(new Date($scope.PracticalBatchesList[i].AppointMentDate)).format("YYYY-MM-DD") != $scope.preVocBatchesList[k].AppointMentDate)) {
                            //            $scope.isValid = false;
                            //            alert("Date should not be different for Sr. No. " + $scope.PracticalBatchesList[i].srno + " and " + $scope.PracticalBatchesList[k].srno + "");
                            //            break;
                            //        }
                            //    }
                            //    if (window.moment(new Date($scope.PracticalBatchesList[i].AppointMentDate)).format("YYYY-MM-DD") == $scope.preVocBatchesList[k].AppointMentDate) {
                            //        if ($scope.PracticalBatchesList[i].PrDaySeq != $scope.PracticalBatchesList[k].PrDaySeq) {
                            //            $scope.isValid = false;
                            //            alert("Date should not be same for Sr. No. " + $scope.PracticalBatchesList[i].srno + " and " + $scope.PracticalBatchesList[k].srno + "");
                            //            break;
                            //        }
                            //    }
                            //}
                            //if ($scope.PracticalBatchesList[i].mobile_no == "")  {
                            //    alert("Mobile no. should not be blank , for srno =" + $scope.PracticalBatchesList[i].srno + "");
                            //    $scope.isValid = false;
                            //    break;
                            //}
                            //}
                            if ($scope.isValid === false) {
                                break;
                            }
                        } else $scope.isValid = true;
                        if ($scope.isValid) {
                            if ($scope.PracticalBatchesList[i].AppointMentDate != null) {
                                var temp = {};
                                $scope.tempDetails = {};
                                $scope.tempDetails.AppointMentDate = window.moment(new Date($scope.PracticalBatchesList[i].AppointMentDate)).format("YYYY-MM-DD");
                                $scope.tempDetails.ExaminerID = $scope.PracticalBatchesList[i].ExaminerID;
                                $scope.tempDetails.full_name = $scope.PracticalBatchesList[i].full_name;
                                $scope.tempDetails.examinerNo = $scope.PracticalBatchesList[i].examinerNo;
                                $scope.tempDetails.mobile_no = $scope.PracticalBatchesList[i].mobile_no;
                                $scope.tempDetails.Session = $scope.PracticalBatchesList[i].Session;
                                $scope.tempDetails.ExmSubCode = $scope.PracticalBatchesList[i].ExmSubCode;
                                $scope.tempDetails.BatchName = $scope.PracticalBatchesList[i].BatchName;
                                $scope.tempDetails.NoofStudents = $scope.PracticalBatchesList[i].NoofStudents;
                                $scope.tempDetails.MFNumber = $scope.PracticalBatchesList[i].MFNumber;
                                $scope.tempDetails.ExamInstID = AppSettings.ExamInstID;
                                $scope.tempDetails.InstanceID = AppSettings.ExamInstID;
                                $scope.tempDetails.CreLoginID = AppSettings.LoggedUserId;
                                $scope.tempDetails.UpdLoginID = AppSettings.LoggedUserId;
                                $scope.tempDetails.PrePractCntrID = $scope.vocationalPracticalBatchTimeTable.PrePractCntrID;
                                $scope.tempDetails.MainGrpID = $scope.vocationalPracticalBatchTimeTable.MainGrpID;
                                $scope.tempDetails.ExamID = $scope.vocationalPracticalBatchTimeTable.ExamID;
                                $scope.tempDetails.CourseID = $scope.vocationalPracticalBatchTimeTable.CourseID;
                                $scope.tempDetails.DistCode = $scope.vocationalPracticalBatchTimeTable.DistCode;
                                $scope.tempDetails.DistrictID = $scope.vocationalPracticalBatchTimeTable.DistrictID;
                                $scope.tempDetails.GroupCode = $scope.vocationalPracticalBatchTimeTable.GroupCode;
                                $scope.tempDetails.PrDaySeq = $scope.PracticalBatchesList[i].PrDaySeq;
                                $scope.tempDetails.AppointmentID = $scope.PracticalBatchesList[i].AppointmentID;
                                $scope.tempDetails.ExmSubID = $scope.vocationalPracticalBatchTimeTable.ExmSubID;
                                angular.copy($scope.tempDetails, temp);
                                $scope.preVocBatchesList.push(temp);
                                $scope.tempDetails = {};
                                $scope.isValid = true;
                            } else {
                                alert("Please select date, for srno =" + $scope.PracticalBatchesList[i].srno + "");
                                $scope.isValid = false;
                                break;
                            }
                        }
                    }
                    if ($scope.preVocBatchesList.length > 0 && $scope.isValid) {
                        $scope.savedisable = true;
                        $scope.vocationalPracticalBatchTimeTable.preVocBatchesList = $scope.preVocBatchesList;
                        examTimeTableService.PutvocationalPracticalBatchTimeTableGeo($scope.vocationalPracticalBatchTimeTable).then(function (results) {
                            if (results.IsSuccess) {
                                $scope.preVocBatchesList = {};
                                $scope.PracticalBatchesList = [];
                                alert(results.Message);
                                $state.go('PreExam');
                                $scope.savedisable = false;
                            } else {
                                //$scope.preVocBatchesList = {};
                                //$scope.PracticalBatchesList = [];
                                alert(results.Message);
                                $scope.savedisable = false;
                            }
                        }, function (error) {
                            $scope.preVocBatchesList = {};
                            $scope.PracticalBatchesList = [];
                            alert(error.statusText);
                        });
                    }
                };
                $scope.getnamechange = function (BasicExaminer) {
                    if ((BasicExaminer.full_name == null) && (BasicExaminer.full_name == undefined)) {
                        BasicExaminer.full_name == "";
                    }
                    if (BasicExaminer.disablerow == false) {
                        if (BasicExaminer.full_name != "") {
                            BasicExaminer.disableExmId = true;
                            BasicExaminer.disablename = false;
                        }
                        else {
                            BasicExaminer.disableExmId = false;
                            BasicExaminer.disablename = true;
                        }
                        if (BasicExaminer.ExaminerID == "Select") {
                            BasicExaminer.ExaminerID = 0;
                        }
                        if ((BasicExaminer.ExaminerID == 0) && (BasicExaminer.full_name == "")) {
                            BasicExaminer.disableExmId = false;
                            BasicExaminer.disablename = false;
                        }
                    }

                }
                $scope.getchangedate = function (BasicExaminer, index) {

                    for (var j = 0; j < $scope.preVocBatchesList.length; j++) {
                        if ((BasicExaminer.ExmSubCode == "21") && ($scope.preVocBatchesList[i].ExmSubCode == "71")) {
                            if (BasicExaminer.PrDaySeq == $scope.preVocBatchesList[i].PrDaySeq) {
                                $scope.preVocBatchesList[i].AppointMentDate = BasicExaminer.AppointMentDate;
                            }
                        }
                        if ((BasicExaminer.ExmSubCode == "22") && ($scope.preVocBatchesList[i].ExmSubCode == "72")) {
                            if (BasicExaminer.PrDaySeq == $scope.preVocBatchesList[i].PrDaySeq) {
                                $scope.preVocBatchesList[i].AppointMentDate = BasicExaminer.AppointMentDate;
                            }
                        }
                        if ((BasicExaminer.ExmSubCode == "23") && ($scope.preVocBatchesList[i].ExmSubCode == "73")) {
                            if (BasicExaminer.PrDaySeq == $scope.preVocBatchesList[i].PrDaySeq) {
                                $scope.preVocBatchesList[i].AppointMentDate = BasicExaminer.AppointMentDate;
                            }
                        }
                    }
                    //if ((window.moment(new Date(BasicExaminer.AppointMentDate)).format("YYYY-MM-DD") == $scope.preVocBatchesList[j].AppointMentDate)
                    //    && ($scope.PracticalBatchesList[i].ExaminerID == $scope.PracticalBatchesList[j].ExaminerID)) {
                    //    $scope.isValid = false;
                    //    alert("Examiner should not be same as previous one, for srno =" + $scope.PracticalBatchesList[i].srno + "");
                    //    break;
                    //} else {
                    //    $scope.isValid = true;
                    //}
                }
            });
}());