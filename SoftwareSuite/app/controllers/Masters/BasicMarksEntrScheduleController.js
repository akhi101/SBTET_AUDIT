define(['app'], function (app) {
    app.controller("BasicMarksEntrScheduleController", function ($scope, $state, $stateParams, AppSettings, BasicMarksEntrScheduleService, BasicCourseService, BasicExamService, BasicDistrictsService, BasicCollegeService, BasicExamSubjectService) {
        $scope.BasicMarksEntrSchedule = { MarkEntrSchID: $stateParams.MarkEntrSchID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicMarksEntrScheduleRightsdata = [];
        $scope.DisableServiceFlag = false;
        $scope.isdeleteDisable = true;
        $scope.todayDate = "";

        $scope.isCouseDisable = false;
        $scope.isExamDisable = false;
        $scope.isExamSubjectDisable = false;
        $scope.isDistrictDisable = false;
        $scope.isCollegeDisable = false;

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
        }, function (CourseData, status, headers, config) {
            alert(error);
        })

        $scope.GetExamList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                if (CourseID == 1) {
                    var BasicExamList = BasicExamService.GetBasicExamListByIYearByCourseID(CourseID);
                    BasicExamList.then(function (ExamData, status, headers, config, error) {
                        $scope.BasicExamList = ExamData;
                        //if (CourseID == 1) {
                        //    $scope.BasicMarksEntrSchedule.ExamID = "2";
                        //    $scope.isExamDisable = true;
                        //}
                        //if (CourseID == 2) {
                        //    $scope.isExamDisable = false;
                        //}
                    }, function (ExamData, status, headers, config) {
                        alert(error);
                    })
                }
                if (CourseID == 2) {
                    var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                    BasicExamList.then(function (ExamData, status, headers, config, error) {
                        $scope.BasicExamList = ExamData;
                        //if (CourseID == 1) {
                        //    $scope.BasicMarksEntrSchedule.ExamID = "2";
                        //    $scope.isExamDisable = true;
                        //}
                        //if (CourseID == 2) {
                        //    $scope.isExamDisable = false;
                        //}
                    }, function (ExamData, status, headers, config) {
                        alert(error);
                    })
                }
            }
        }

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictList();
        BasicDistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.BasicDistrictList = Districtdata;
        }, function (error) {
            alert(error);
            });

        $scope.GetBasicCollegeList = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(DistrictID);
                BasicCollegeList.then(function (CollegeData, status, headers, config, error) {
                    $scope.BasicCollegeList = CollegeData;
                }, function (CollegeData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.GetOtherExamSubjectList = function (ExamID) {
            if (ExamID != "" || ExamID != undefined) {
                var BasicExamSubjectList = BasicExamSubjectService.GetOtherExamSubjectListForOtherMarkEntrySchedule(ExamID);
                BasicExamSubjectList.then(function (ExmSubjectData, status, headers, config, error) {
                    $scope.BasicExamSubjectList = ExmSubjectData;
                }, function (ExmSubjectData, status, headers, config) {
                    alert(error);
                })
            }
        }

        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            var BasicExamList = BasicExamService.GetExamListByCourseID(0);
            BasicExamList.then(function (ExamData, status, headers, config, error) {
                $scope.BasicExamList = ExamData;
                var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(0);
                BasicCollegeList.then(function (CollegeData, status, headers, config, error) {
                    $scope.BasicCollegeList = CollegeData;
                    var BasicExamSubjectList = BasicExamSubjectService.GetOtherExamSubjectListForOtherMarkEntryScheduleList();
                    BasicExamSubjectList.then(function (ExmSubjectData, status, headers, config, error) {
                        $scope.BasicExamSubjectList = ExmSubjectData;
                if ($scope.BasicMarksEntrSchedule.MarkEntrSchID > 0) {
                    var BasicMarksEntrScheduledata = BasicMarksEntrScheduleService.GetMarkEntryScheduleListByID($scope.BasicMarksEntrSchedule.MarkEntrSchID);
                    BasicMarksEntrScheduledata.then(function (data) {

                        $scope.BasicMarksEntrSchedule = data[0];
                        ///$scope.PreReqSchedule.ServiceID = data[0].ServiceID;

                        $("#StartDate").ejDatePicker({ value: data[0].StartDate, dateFormat: "dd/MMM/yyyy" });
                        $("#EndDate").ejDatePicker({ value: data[0].EndDate, dateFormat: "dd/MMM/yyyy" });
                        var StartTime = data[0].StartTime;
                        var EndTime = data[0].EndTime;

                        $scope.isCouseDisable = true;
                        $scope.isExamDisable = true;
                        $scope.isExamSubjectDisable = true;
                        $scope.isDistrictDisable = true;
                        $scope.isCollegeDisable = true;

                        $scope.isdeleteDisable = false;
                        // $scope.DisableServiceFlag = true;

                    }, function (error) {
                        alert(error);
                    });
                        }
                    }, function (ExmSubjectData, status, headers, config) {
                        alert(error);
                    });
                }, function (CollegeData, status, headers, config) {
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
                if ($scope.BasicMarksEntrSchedule.MarkEntrSchID == 0) {
                    if ($scope.BasicMarksEntrSchedule.MarkEntrSchID == undefined) { $scope.BasicMarksEntrSchedule.MarkEntrSchID = 0; }

                    if ($scope.BasicMarksEntrSchedule.DistrictID == undefined || $scope.BasicMarksEntrSchedule.DistrictID == "") { $scope.BasicMarksEntrSchedule.DistrictID = 0; }
                    $scope.isupdatableDisable = true;

                    $scope.BasicMarksEntrSchedule.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicMarksEntrSchedule.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.BasicMarksEntrSchedule.ExamInstID = 103;
                   // $scope.BasicMarksEntrSchedule.ExmSubID = 0;

                    $scope.BasicMarksEntrSchedule.ExmSchType = "1";

                    $scope.BasicMarksEntrSchedule.StartDate = $("#StartDate").val();
                    $scope.BasicMarksEntrSchedule.EndDate = $("#EndDate").val();

                    $scope.BasicMarksEntrSchedule.StartTime = window.moment($scope.BasicMarksEntrSchedule.StartTime).format('hh:mm a');
                    $scope.BasicMarksEntrSchedule.EndTime = window.moment($scope.BasicMarksEntrSchedule.EndTime).format('hh:mm a');

                    var getCheckDate = BasicMarksEntrScheduleService.PostCheckDatesValidations($scope.BasicMarksEntrSchedule); /*$("#StartDate").val(), $("#EndDate").val(), $("#FromLateDate1").val(), $("#FromLateDate2").val(), $("#FromLateDate3").val()*/
                    getCheckDate.then(function (data) {
                        if (data != "") {
                            alert(data);
                            $scope.isupdatableDisable = false;
                            return;
                        }
                        else {
                            //var BasicMarksEntrScheduledata = BasicMarksEntrScheduleService.GetCheckDuplicateEntryOfSchedule($scope.BasicMarksEntrSchedule.ExamID, $scope.BasicMarksEntrSchedule.ExamInstID, "1");
                            //BasicMarksEntrScheduledata.then(function (data) {
                            //    var data1 = data.length;
                            if ($scope.BasicMarksEntrSchedule.CollegeID == "" || $scope.BasicMarksEntrSchedule.CollegeID == undefined) {
                                $scope.BasicMarksEntrSchedule.CollegeID = 0;
                            }

                           // $scope.BasicMarksEntrSchedule.ExmSubID = $scope.BasicMarksEntrSchedule.ExmSubID;

                            var getPromise = BasicMarksEntrScheduleService.PostOtherMarkEntryScheduleInsert($scope.BasicMarksEntrSchedule);
                                    getPromise.then(function (msg) {
                                        alert("Added successfully!!");

                                        RedirectToListPage();
                                    }, function (error) {
                                        alert(error);
                                    });
                                //}
                                //else {
                                //    alert("Schedule is Already Fillled up For this Exam Year");
                                //}
                            //}, function (error) {
                            //    alert(error);
                            //});
                        }
                    }, function (error) {
                        alert(error);
                    });


                    //var getPromise = BasicMarksEntrScheduleService.PostMarkEntryScheduleInsert($scope.BasicMarksEntrSchedule);
                    //getPromise.then(function (msg) {
                    //    alert("Added successfully!!");

                    //    RedirectToListPage();
                    //}, function (error) {
                    //    alert(error);
                    //});

                }
                else {

                    //$scope.isdeleteDisable = true;

                    $scope.BasicMarksEntrSchedule.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicMarksEntrSchedule.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.BasicMarksEntrSchedule.ExamInstID = 103;
                    $scope.BasicMarksEntrSchedule.ExmSubID = 0;

                    $scope.BasicMarksEntrSchedule.ExmSchType = "1";

                    $scope.BasicMarksEntrSchedule.StartDate = $("#StartDate").val();
                    $scope.BasicMarksEntrSchedule.EndDate = $("#EndDate").val();

                    $scope.BasicMarksEntrSchedule.StartTime = window.moment($scope.BasicMarksEntrSchedule.StartTime).format('hh:mm a');
                    $scope.BasicMarksEntrSchedule.EndTime = window.moment($scope.BasicMarksEntrSchedule.EndTime).format('hh:mm a');

                    var getCheckDate = BasicMarksEntrScheduleService.PostCheckDatesValidations($scope.BasicMarksEntrSchedule); /*$("#StartDate").val(), $("#EndDate").val(), $("#FromLateDate1").val(), $("#FromLateDate2").val(), $("#FromLateDate3").val()*/
                    getCheckDate.then(function (data) {
                        if (data != "") {
                            alert(data);
                            $scope.isupdatableDisable = false;
                            return;
                        }
                        else {
                            var getPromise = BasicMarksEntrScheduleService.UpdateMarkEntrySchedule($scope.BasicMarksEntrSchedule);
                            getPromise.then(function (msg) {
                                alert("Update successfully!!");

                                RedirectToListPage();
                            }, function (error) {
                                alert(error);
                            });
                        }
                    }, function (error) {
                        alert(error);
                    });
                }
            }
        }

     
        $scope.DeleteBasicMarksEntrSchedule = function () {
            if ($scope.BasicMarksEntrSchedule.MarkEntrSchID > 0) {
                var getData = BasicMarksEntrScheduleService.GetDeleteMarkEntrySchedule($scope.BasicMarksEntrSchedule.MarkEntrSchID, AppSettings.LoggedUserId);
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

           // $scope.todayDate = new Date();

            //var StartDate = $scope.BasicMarksEntrSchedule.StartDate;

            //var EndDate = new Date($scope.BasicMarksEntrSchedule.EndDate);
           
            //if (($scope.BasicMarksEntrSchedule.DistrictID == undefined) || ($scope.BasicMarksEntrSchedule.DistrictID == "")) {
            //    alert("Please Select District");
            //    return false;
            //}
            //if (($scope.BasicMarksEntrSchedule.CollegeID == undefined) || ($scope.BasicMarksEntrSchedule.CollegeID == "")) {
            //    alert("Please Select College");
            //    return false;
            //}
            if (($scope.BasicMarksEntrSchedule.StartTime == undefined) || ($scope.BasicMarksEntrSchedule.StartTime == "")) {
                alert("Please Enter Start Time");
                return false;
            }
            if (($scope.BasicMarksEntrSchedule.EndTime == undefined) || ($scope.BasicMarksEntrSchedule.EndTime == "")) {
                alert("Please Enter End Time");
                return false;
            }

            //if (Date.parse($scope.BasicMarksEntrSchedule.StartTime) < Date.parse($scope.BasicMarksEntrSchedule.EndTime)) {
            //    alert("End Time Should be greater than Start Time");
            //    return false;
            //}
            else {
                return true;
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Masters.OtherMarkEntryScheduleList');
        }
        //$scope.openCalendarFromDate = function () {
        //    $scope.PreReqSchedule.FromDateIsOpen = true;
        //}
    });
});
