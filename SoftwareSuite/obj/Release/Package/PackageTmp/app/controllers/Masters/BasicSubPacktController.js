define(['app'], function (app) {
    app.controller("BasicSubPacktController", function ($scope, $state, $stateParams, AppSettings, BasicSubPacktService, BasicPacketService, BasicExamSubjectService, BasicCourseService, BasicExamService, BasicMainGroupService) {
        $scope.BasicSubPackt = { SubPacktID: $stateParams.SubPacktID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicSubPacktRightsdata = [];
        var BasicPreExamSubjectList = "";

         $scope.MainGroupDisable = true;

        BasicSubPacktRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicSubPacktRightsdata.length; i++) {
            if (BasicSubPacktRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicSubPackt.SubPacktID == 0) {
                    if (BasicSubPacktRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicSubPacktRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicSubPacktRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        } var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            var BasicExamList = BasicExamService.GetExamListByCourseID(0);
            BasicExamList.then(function (ExamData, status, headers, config, error) {
                $scope.BasicExamList = ExamData;
                var BasicPacketList = BasicPacketService.GetBasicPacketList(0);
                BasicPacketList.then(function (PacketData, status, headers, config, error) {
                    $scope.BasicPacketList = PacketData;
                    var MedList = BasicSubPacktService.GetBasicMediumList();
                    MedList.then(function (Mediumdata, status, headers, config, error) {
                        $scope.MediumList = Mediumdata;
                        //var BasicExamSubjectList = BasicExamSubjectService.GetBasicExamSubjectList(0);
                        //BasicExamSubjectList.then(function (SubjectData, status, headers, config, error) {
                        //    $scope.BasicExamSubjectList = SubjectData;
                        if ($scope.BasicSubPackt.SubPacktID > 0) {
                            var BasicSubPacktdata = BasicSubPacktService.GetBasicSubPacktById($scope.BasicSubPackt.SubPacktID);
                            BasicSubPacktdata.then(function (data) {
                                $scope.BasicSubPackt = data[0];
                                BasicPreExamSubjectList = BasicExamSubjectService.GetBasicExamSubjectListforUpdateSubPacket(data[0].CourseID, data[0].ExamID, data[0].ExmSubID);
                                BasicPreExamSubjectList.then(function (BasicPreExamSubjectdata, status, headers, config, error) {
                                    $scope.BasicPreExamSubjectList = BasicPreExamSubjectdata;
                                    $scope.BasicPreExamSubjectList[0].QpCode = data[0].QpCode;
                                    $scope.BasicPreExamSubjectList[0].checkSub = true;
                                    $scope.BasicPreExamSubjectList[0].MediumID = "" + data[0].MediumID + "";
                                    $scope.BasicSubPackt.MediumID = "" + data[0].MediumID + "";


                                }, function (BasicPreExamSubjectdata, status, headers, config) {
                                    alert(error);
                                });

                                //BasicPreExamSubjectList.QpCode = data[0].QpCode;

                                //$scope.BasicPreExamSubjectList[0].checkSub = true;
                            }, function (error) {
                                alert(error);
                            });
                        }
                    }, function (error) {
                        alert(error);
                    });
                    //}, function (SubjectData, status, headers, config) {
                    //    alert(error);
                    //});
                }, function (PacketData, status, headers, config) {
                    alert(error);
                });
            }, function (ExamData, status, headers, config) {
                alert(error);
            });
        }, function (CourseData, status, headers, config) {
            alert(error);
        });

        $scope.BasicSubPackt.ExamInstID = 0;
        $scope.SaveBasicSubPackt = function () {
            var BasicPreExamSubjectList = [];
            //if ($scope.BasicPreExamSubjectList.length > 0) {
            for (var k = 0; k < $scope.BasicPreExamSubjectList.length; k++) {
                var obj = {};

                if ($scope.BasicPreExamSubjectList[k].checkSub == true) {

                    //if ($scope.BasicPreExamSubjectList[k].MediumID == "") { $scope.BasicPreExamSubjectList[k].MediumID = 0; }
                    //if ($scope.BasicPreExamSubjectList[k].MediumID == undefined) { $scope.BasicPreExamSubjectList[k].MediumID = 0; }

                    //if ($scope.BasicPreExamSubjectList[k].MediumID != 0) {
                        obj.ExmSubID = $scope.BasicPreExamSubjectList[k].ExmSubID;
                        obj.ExmSubName = $scope.BasicPreExamSubjectList[k].ExmSubName;
                        obj.ExmSubCode = $scope.BasicPreExamSubjectList[k].ExmSubCode;
                        obj.QpCode = $scope.BasicPreExamSubjectList[k].QpCode;
                       // obj.MediumID = $scope.BasicPreExamSubjectList[k].MediumID;
                        BasicPreExamSubjectList.push(obj);
                    //}
                    //else {
                    //    alert("Please Choose Medium For Subject");
                    //}
                }
            }
            //}
            //else {
            //    alert("Please Select One Subject");
            //    return false;
            //}
            $scope.BasicSubPackt.BasicPreExamSubjectList = BasicPreExamSubjectList;
            $scope.isupdatableDisable = true;
            if ($scope.BasicSubPackt.SubPacktID == undefined) { $scope.BasicSubPackt.SubPacktID = 0; }
            if ($scope.BasicSubPackt.MediumID == undefined) { $scope.BasicSubPackt.MediumID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicSubPackt.SubPacktID == 0) {

                    $scope.BasicSubPackt.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicSubPackt.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.BasicSubPackt.ExamInstID = AppSettings.ExamInstID;

                    var getPromise = BasicSubPacktService.PostBasicSubPacktInsert($scope.BasicSubPackt);
                    getPromise.then(function (msg) {
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    if ($scope.BasicSubPackt.SubPacktID == undefined) { $scope.BasicSubPackt.SubPacktID = 0; }
                    if ($scope.BasicSubPackt.MediumID == undefined) { $scope.BasicSubPackt.MediumID = 0; }
                    if ($scope.BasicSubPackt.MediumID == "") { $scope.BasicSubPackt.MediumID = 0; }
                    $scope.BasicSubPackt.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicSubPacktService.UpdateBasicSubPackt($scope.BasicSubPackt);
                    getPromise.then(function (msg) {
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteBasicSubPackt = function () {
            var getData = BasicSubPacktService.DeleteBasicSubPackt($scope.BasicSubPackt.SubPacktID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicSubPackt.CourseID == undefined) || ($scope.BasicSubPackt.CourseID == 0)) {
                alert("Please Select Course ");
                return false;
            }
            else if (($scope.BasicSubPackt.ExamID == undefined) || ($scope.BasicSubPackt.ExamID == 0)) {
                alert("Please Select Exam ");
                return false;
            }
            else if (($scope.BasicSubPackt.PcktID == undefined) || ($scope.BasicSubPackt.PcktID == 0)) {
                alert("Please Select Packet ");
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
            $state.go('Masters.BasicSubPacktList');
        }


        $scope.GetExamList = function (CourseID) {
            FillExam(CourseID);
            FillMainGrpList(CourseID);
            FillMediumList(CourseID);

            if (CourseID == 2) {
                $scope.MainGroupDisable = false;
            }
            else {
                $scope.MainGroupDisable = true;
            }
        }

        $scope.GetExamSubjectList = function (ExamID) {
            if (ExamID == 1 || ExamID == 2) {

                FillExamSubject(ExamID);
            }

        }
        $scope.GetVocationalExamSubjectList = function (ExamID ,MainGrpID) {
            if (ExamID == 3 || ExamID == 4) {
                FillExamVocatinalSubject(ExamID, MainGrpID);
            }
        }
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
        }, function (error) {
            alert(error);
            });

        function FillMediumList(CourseID) {
            if (CourseID == 1) {
                var MedList = BasicSubPacktService.GetBasicMediumList();
                MedList.then(function (Mediumdata, status, headers, config, error) {
                    $scope.MediumList = Mediumdata;
                }, function (error) {
                    alert(error);
                });
            }
            else {
                var MedList = BasicSubPacktService.GetBasicMediumByMediumID(1);
                MedList.then(function (Mediumdata, status, headers, config, error) {
                    $scope.MediumList = Mediumdata;

                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.GetVocationalLanguageSubject = function (ExamID) {
            if ($scope.BasicSubPackt.CourseID == 2) {
                if ($scope.BasicSubPackt.SubjectType == "LS") {

                    $scope.MainGroupDisable = true;
                    var MainGrpID = 0;
                    FillExamVocatinalSubject(ExamID, MainGrpID);

                }
                else {
                    $scope.MainGroupDisable = false;
                }
            }
            else {
                    if ($scope.BasicSubPackt.CourseID == 1) {
                        if ($scope.BasicSubPackt.SubjectType == "LS") {
                            $scope.MainGroupDisable = true;
                            FillExamSubject(ExamID);
                        }
                    }
                }
            }
        


        function FillMainGrpList(CourseID) {
            var BasicMainGrpList = BasicMainGroupService.GetMainGroupListByCourseIDForSubjectPacket(CourseID);
            BasicMainGrpList.then(function (MainGrpData, status, headers, config, error) {
                $scope.BasicMainGrpList = MainGrpData;
            }, function (error) {
                alert(error);
            });
        }


        function FillExam(CourseID) {
            var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
            BasicExamList.then(function (Examdata, status, headers, config, error) {
                $scope.BasicExamList = Examdata;
            }, function (Examdata, status, headers, config) {
                alert(error);
            });
        }



        function FillExamSubject(ExamID) {
            if ($scope.BasicSubPackt.MediumID == undefined || $scope.BasicSubPackt.MediumID == "") {
                $scope.BasicSubPackt.MediumID = 0;
            }
            var BasicPreExamSubjectList = BasicExamSubjectService.GetBasicExamSubjectListForSubjectPckt($scope.BasicSubPackt.CourseID, ExamID, $scope.BasicSubPackt.SubjectType, $scope.BasicSubPackt.PcktID, $scope.BasicSubPackt.MediumID);
            BasicPreExamSubjectList.then(function (Examdata, status, headers, config, error) {
                //$scope.BasicExamSubjectList = Examdata;
                $scope.BasicPreExamSubjectList = Examdata;
                //for (var k = 0; k < $scope.BasicPreExamSubjectList.length; k++) {
                //    // $scope.BasicPreExamSubjectList[k].MediumID = "" + $scope.MediumList[0].MediumID + "";
                //    if ($scope.BasicPreExamSubjectList[k].QpCode == undefined) {
                //        $scope.BasicPreExamSubjectList[k].QpCode = "";
                //    }
                //    $scope.BasicPreExamSubjectList[k].QpCode = $scope.BasicPreExamSubjectList[k].QpCode;
                //}
            }, function (Examdata, status, headers, config) {
                alert(error);
            });
        }

        function FillExamVocatinalSubject(ExamID, MainGrpID) {

            if ($scope.BasicSubPackt.MainGrpID == undefined || $scope.BasicSubPackt.MainGrpID == "") {
                $scope.BasicSubPackt.MainGrpID = 0;
            }
            var BasicPreExamSubjectList = BasicExamSubjectService.GetExamSubjectByCourseExamMainGroupID($scope.BasicSubPackt.CourseID, ExamID, $scope.BasicSubPackt.MainGrpID, $scope.BasicSubPackt.SubjectType);
            BasicPreExamSubjectList.then(function (Examdata, status, headers, config, error) {
                //$scope.BasicExamSubjectList = Examdata;
                $scope.BasicPreExamSubjectList = Examdata;

                $scope.BasicSubPackt.MediumID = "" + $scope.MediumList[0].MediumID + "";

                for (var k = 0; k < $scope.BasicPreExamSubjectList.length; k++) {
                   // $scope.BasicPreExamSubjectList[k].MediumID = "" + $scope.MediumList[0].MediumID + "";
                    if ($scope.BasicPreExamSubjectList[k].QpCode == undefined) {
                        $scope.BasicPreExamSubjectList[k].QpCode = "";
                    }
                    $scope.BasicPreExamSubjectList[k].QpCode =  $scope.BasicPreExamSubjectList[k].QpCode;
                }
            }, function (Examdata, status, headers, config) {
                alert(error);
            });
        }

        //function FillExamSubject(ExamID) {
        //    var BasicExamSubjectList = BasicExamSubjectService.GetBasicExamSubjectListReport($scope.BasicSubPackt.CourseID, ExamID);
        //    BasicExamSubjectList.then(function (Examdata, status, headers, config, error) {
        //        $scope.BasicExamSubjectList = Examdata;
        //        $scope.BasicExamSubjectdata = Examdata;
        //    }, function (Examdata, status, headers, config) {
        //        alert(error);
        //    });
        //}


        //var BasicExamSubjectList = BasicExamSubjectService.GetBasicExamSubjectList();
        //BasicExamSubjectList.then(function (SubjectData, status, headers, config, error) {
        //	$scope.BasicExamSubjectList = SubjectData;
        //}, function (error) {
        //	alert(error);
        //});

        //var BasicPacketList = BasicPacketService.GetBasicPacketList();
        //BasicPacketList.then(function (PacketData, status, headers, config, error) {
        //	$scope.BasicPacketList = PacketData;
        //}, function (error) {
        //	alert(error);
        //});


    });
});
