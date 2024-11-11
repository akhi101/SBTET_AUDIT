define(['app'], function (app) {
    app.controller("VocBridgePracticalExamScheduleController", function ($scope, $state, $stateParams, AppSettings, BasicMarksEntrScheduleService, BasicCourseService, BasicExamService, BasicDistrictsService, BasicCollegeService, PrePractCenterService, PreVocationalCenterService) {
        $scope.BasicMarksEntrSchedule = { PrePracScheID: $stateParams.PrePracScheID };
        $scope.BasicMarksEntrSchedule.PrePracScheID = $stateParams.PrePracScheID
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicMarksEntrScheduleRightsdata = [];
        $scope.DisableServiceFlag = false;
        $scope.isdeleteDisable = true;
        $scope.todayDate = "";
        $scope.isCouseDisable = false;
        $scope.isExamDisable = false;
        $scope.isDistrictDisable = false;
        $scope.isCenterDisable = false;

        BasicMarksEntrScheduleRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicMarksEntrScheduleRightsdata.length; i++) {
            if (BasicMarksEntrScheduleRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicMarksEntrSchedule.MarkEntrSchID == 0) {
                    if (BasicMarksEntrScheduleRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicMarksEntrScheduleRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicMarksEntrScheduleRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        $("#StartDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#EndDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });

        $("#StartDate").ejDatePicker({ value: new Date() });
        $("#EndDate").ejDatePicker({ value: new Date() });

        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            $scope.BasicMarksEntrSchedule.CourseID = "2";

            GetExamList($scope.BasicMarksEntrSchedule.CourseID);

        }, function (CourseData, status, headers, config) {
            alert(error);
        })


        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictList();
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });


        $scope.FillCollegeList = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                    var PraCenterList = PrePractCenterService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, 4 , $scope.BasicMarksEntrSchedule.DistrictID);
                    PraCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                        $scope.PraCenterList = PracticalCenterData;
                    }, function (PracticalCenterData, status, headers, config) {
                        alert(error);
                    })
            }
        }


          function GetExamList (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                    $scope.BasicMarksEntrSchedule.ExamID = "4";
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }

        //$scope.GetExamList = function (CourseID) {
        //    if (CourseID != "" || CourseID != undefined) {
        //        var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
        //        BasicExamList.then(function (ExamData, status, headers, config, error) {
        //            $scope.BasicExamList = ExamData;
        //        }, function (ExamData, status, headers, config) {
        //            alert(error);
        //        })
        //    }
        //}

        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            var BasicExamList = BasicExamService.GetExamListByCourseID(0);
            BasicExamList.then(function (ExamData, status, headers, config, error) {
                $scope.BasicExamList = ExamData;
                var BasicDistrictList = BasicDistrictsService.GetBasicDistrictList(0);
                BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                    $scope.BasicDistrictList = DistrictData;
                    var PraCenterList = PrePractCenterService.GetBridgeVocationalPracticalCenterList(AppSettings.ExamInstID);
                    PraCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                        $scope.PraCenterList = PracticalCenterData;
                        if ($scope.BasicMarksEntrSchedule.PrePracScheID > 0) {
                            var BasicMarksEntrScheduledata = BasicMarksEntrScheduleService.GetVocBridgePracticalEntryScheduleListByID($scope.BasicMarksEntrSchedule.PrePracScheID);
                            BasicMarksEntrScheduledata.then(function (data) {

                                $scope.BasicMarksEntrSchedule = data[0];

                                $scope.BasicMarksEntrSchedule.CourseID = "" + data[0].CourseID + "";
                                $scope.BasicMarksEntrSchedule.ExamID = "" + data[0].ExamID + "";
                                ///$scope.PreReqSchedule.ServiceID = data[0].ServiceID;

                                $("#StartDate").ejDatePicker({ value: data[0].StartDate, dateFormat: "dd/MMM/yyyy" });
                                $("#EndDate").ejDatePicker({ value: data[0].EndDate, dateFormat: "dd/MMM/yyyy" });
                                //$scope.isCouseDisable = true;
                                //$scope.isExamDisable = true;
                                $scope.isDistrictDisable = true;
                                $scope.isCenterDisable = true;

                                $scope.isdeleteDisable = false;
                            }, function (error) {
                                alert(error);
                            });
                        }
                    }, function (PracticalCenterData, status, headers, config) {
                        alert(error);
                    });
                }, function (DistrictData, status, headers, config) {
                    alert(error);
                });
            }, function (ExamData, status, headers, config) {
                alert(error);
            });
        }, function (CourseData, status, headers, config) {
            alert(error);
        });

        $scope.SaveBasicMarksEntrSchedule = function () {
            if (CheckValidation() == true) {

                if ($scope.BasicMarksEntrSchedule.PrePracScheID == undefined || $scope.BasicMarksEntrSchedule.PrePracScheID == 0) {
                    $scope.BasicMarksEntrSchedule.PrePracScheID = 0;
                }
                if ($scope.BasicMarksEntrSchedule.PrePracScheID == 0) {
                    if ($scope.BasicMarksEntrSchedule.MarkEntrSchID == undefined) { $scope.BasicMarksEntrSchedule.MarkEntrSchID = 0; }

                    if ($scope.BasicMarksEntrSchedule.DistrictID == undefined || $scope.BasicMarksEntrSchedule.DistrictID == "") { $scope.BasicMarksEntrSchedule.DistrictID = 0; }

                    $scope.isupdatableDisable = true;

                    $scope.BasicMarksEntrSchedule.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicMarksEntrSchedule.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.BasicMarksEntrSchedule.ExamInstID = AppSettings.ExamInstID;
                    $scope.BasicMarksEntrSchedule.ExmSubID = 0;

                    $scope.BasicMarksEntrSchedule.ExmSchType = "4";
                    $scope.BasicMarksEntrSchedule.ZoneType = "4";

                    $scope.BasicMarksEntrSchedule.StartDate = $("#StartDate").val();
                    $scope.BasicMarksEntrSchedule.EndDate = $("#EndDate").val();

                    $scope.BasicMarksEntrSchedule.StartTime = window.moment($scope.BasicMarksEntrSchedule.StartTime).format('hh:mm a');
                    $scope.BasicMarksEntrSchedule.EndTime = window.moment($scope.BasicMarksEntrSchedule.EndTime).format('hh:mm a');
                    $scope.BasicMarksEntrSchedule.AfterNoonStartTime = window.moment($scope.BasicMarksEntrSchedule.AfterNoonStartTime).format('hh:mm a');
                    $scope.BasicMarksEntrSchedule.AfterNoonEndTime = window.moment($scope.BasicMarksEntrSchedule.AfterNoonEndTime).format('hh:mm a');

                    var getCheckDate = BasicMarksEntrScheduleService.PostCheckDatesValidations($scope.BasicMarksEntrSchedule); /*$("#StartDate").val(), $("#EndDate").val(), $("#FromLateDate1").val(), $("#FromLateDate2").val(), $("#FromLateDate3").val()*/
                    getCheckDate.then(function (data) {
                        if (data != "") {
                            alert(data);
                            $scope.isupdatableDisable = false;
                            return;
                        }
                        else {
                            var getPromise = BasicMarksEntrScheduleService.PostVocBridgePracticalMarkEntryScheduleInsert($scope.BasicMarksEntrSchedule);
                            getPromise.then(function (msg) {
                                alert("Added successfully!!");

                                RedirectToListPage();
                            }, function (error) {
                                alert(error);
                            });
                        }
                    }, function (error) {
                        alert(error);
                    });
                }
                else {

                    $scope.BasicMarksEntrSchedule.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicMarksEntrSchedule.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.BasicMarksEntrSchedule.ExamInstID = AppSettings.ExamInstID;
                    $scope.BasicMarksEntrSchedule.ExmSubID = 0;

                    $scope.BasicMarksEntrSchedule.ExmSchType = "4";

                    $scope.BasicMarksEntrSchedule.ZoneType = "4";

                    $scope.BasicMarksEntrSchedule.StartDate = $("#StartDate").val();
                    $scope.BasicMarksEntrSchedule.EndDate = $("#EndDate").val();

                    $scope.BasicMarksEntrSchedule.StartTime = window.moment($scope.BasicMarksEntrSchedule.StartTime).format('hh:mm a');
                    $scope.BasicMarksEntrSchedule.EndTime = window.moment($scope.BasicMarksEntrSchedule.EndTime).format('hh:mm a');
                    $scope.BasicMarksEntrSchedule.AfterNoonStartTime = window.moment($scope.BasicMarksEntrSchedule.AfterNoonStartTime).format('hh:mm a');
                    $scope.BasicMarksEntrSchedule.AfterNoonEndTime = window.moment($scope.BasicMarksEntrSchedule.AfterNoonEndTime).format('hh:mm a');

                    var getPromise = BasicMarksEntrScheduleService.PostPracticalMarkEntrySchedule($scope.BasicMarksEntrSchedule);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");

                        RedirectToListPage();
                    }, function (error) {
                        alert(error);
                    });
                }
            }
        }


        $scope.DeleteBasicMarksEntrSchedule = function () {
            if ($scope.BasicMarksEntrSchedule.PrePracScheID > 0) {
                var getData = BasicMarksEntrScheduleService.GetVocBridgeDeletePrePracCenterSchedule($scope.BasicMarksEntrSchedule.PrePracScheID, AppSettings.LoggedUserId);
                getData.then(function (msg) {
                    alert('Record Deleted');
                    RedirectToListPage();
                }, function (error) {
                    alert(error);
                });
            }
        }

        function CheckValidation() {
            if (($scope.BasicMarksEntrSchedule.CourseID == undefined) || ($scope.BasicMarksEntrSchedule.CourseID == "")) {
                alert("Please Select Course");
                return false;
            }
            if (($scope.BasicMarksEntrSchedule.ExamID == undefined) || ($scope.BasicMarksEntrSchedule.ExamID == "")) {
                alert("Please Select Exam");
                return false;
            }
            if (($scope.BasicMarksEntrSchedule.StartTime == undefined) || ($scope.BasicMarksEntrSchedule.StartTime == "")) {
                alert("Please Enter Start Time");
                return false;
            }
            if (($scope.BasicMarksEntrSchedule.EndTime == undefined) || ($scope.BasicMarksEntrSchedule.EndTime == "")) {
                alert("Please Enter End Time");
                return false;
            }
            if (($scope.BasicMarksEntrSchedule.AfterNoonStartTime == undefined) || ($scope.BasicMarksEntrSchedule.AfterNoonStartTime == "")) {
                alert("Please Enter After Noon Start Time");
                return false;
            }
            if (($scope.BasicMarksEntrSchedule.AfterNoonEndTime == undefined) || ($scope.BasicMarksEntrSchedule.AfterNoonEndTime == "")) {
                alert("Please Enter After Noon End Time");
                return false;
            }
            else {
                return true;
            }
        }

        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Masters.VocBridgePracticalExamScheduleList');
        }
        
    });
});
