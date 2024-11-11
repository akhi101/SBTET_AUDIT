define(['app'], function (app) {
    app.controller("DRDCChartController", function ($scope, $state, AppSettings, DRDCChartService, BasicCourseService, BasicExamService) {
        $scope.DRDCChart = {};
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;

        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
        }, function (CourseData, status, headers, config) {
            alert(error);
        })
        var CampusList = DRDCChartService.GetPreCampusList(AppSettings.ExamInstID);
        CampusList.then(function (CampusData, status, headers, config, error) {
            $scope.CampusList = CampusData;
        }, function (CampusData, status, headers, config) {
            alert(error);
        })
        $scope.campusselect = false;
        $scope.chartshow = false;
        var blocked = "";
        $scope.FillDRDC = function (CampusID) {
            if (CampusID != undefined) {
                if (CampusID != "") {
                    blocked = "";
                    $scope.campusselect = true;
                    var DRDCList = DRDCChartService.GetPreDRDCListForDRDCChart(AppSettings.ExamInstID, CampusID);
                    DRDCList.then(function (DRDCListdata, status, headers, config, error) {
                        $scope.DRDCList = DRDCListdata;
                        for ( var i = 0; i < $scope.DRDCList.length; i++) {
                            if (($scope.DRDCList[i].BlockedDRDC != '') && ($scope.DRDCList[i].BlockedDRDC != null)) {
                                if (blocked != "") {
                                    blocked = blocked + "," + $scope.DRDCList[i].BlockedDRDC;
                                } else {
                                    blocked = $scope.DRDCList[i].BlockedDRDC;
                                }
                            } else {
                                $scope.DRDCList[i].Selected = false;
                            }
                        }
                        var res = blocked.split(",");
                        for (var i = 0; i < res.length; i++) {
                            var DRDCIDChK = res[i];
                            for (var j = 0; j < $scope.DRDCList.length; j++) {
                                if ($scope.DRDCList[j].DRDCID == DRDCIDChK) {
                                    $scope.DRDCList[j].Selected = true;
                                }
                            }
                        }
                    }, function (error) {
                        alert(error);
                    });
                }
            }
        }
        $scope.FillCoursePart = function (CourseID) {
            if (CourseID != undefined) {
                if (CourseID != "") {
                    var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                    BasicExamList.then(function (ExamData, status, headers, config, error) {
                        $scope.BasicExamList = ExamData;
                        var MainGroupList = DRDCChartService.GetMainGroupListByCourse(CourseID);
                        MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                            $scope.MainGroupList = MainGroupListdata;
                            
                        }, function (error) {
                            alert(error);
                        });
                    }, function (ExamData, status, headers, config) {
                        alert(error);
                    })
                }
            }
        }
        $scope.FillSubjects = function (ExamID) {
            if (ExamID != undefined) {
                if (ExamID != "") {
                    var SubjectsList = DRDCChartService.GetSubjectsListByGroup(0, ExamID);
                    SubjectsList.then(function (SubjListdata, status, headers, config, error) {
                        $scope.SubjectsList = SubjListdata;
                    }, function (error) {
                        alert(error);
                    });
                }
            }
        }
        $scope.SaveBlockedDRDC = function () {
            $scope.drdcIDs = "";
            for (var i = 0; i < $scope.DRDCList.length; i++) {
                if ($scope.DRDCList[i].Selected) {
                    if ($scope.drdcIDs == "") {
                        $scope.drdcIDs = $scope.DRDCList[i].DRDCID;
                    }
                    else {

                        $scope.drdcIDs = $scope.drdcIDs + ',' + $scope.DRDCList[i].DRDCID;
                    }
                }
            }
            if (($scope.DRDCChart.SubjectID == "") || ($scope.DRDCChart.SubjectID == undefined)) {
                alert("Select Subject");
                return;
            }
            if ($scope.drdcIDs == "") {
                alert("Select DRDC");
                return;
            }
            if (($scope.DRDCChart.CampusID == "") || ($scope.DRDCChart.CampusID == undefined)) {
                alert("Select Campus");
                return;
            }
            var SubjectsList = DRDCChartService.GetUpdateBlockedDR($scope.drdcIDs, $scope.DRDCChart.CampusID, AppSettings.ExamInstID);
            SubjectsList.then(function (SubjListdata, status, headers, config, error) {
                alert("Saved Blocked DRDC's");
                $scope.showChartdata();
            }, function (error) {
                alert(error);
            });
        }
        $scope.LoadImg = false;
        $scope.Show = function () {
            $scope.drdcIDs = "";
            $scope.CharHead = "";
            for (var i = 0; i < $scope.SubjectsList.length; i++) {
                if ($scope.SubjectsList[i].SubjectID == $scope.DRDCChart.SubjectID) {
                    $scope.CharHead = "DRDC Chart For Subject-" + $scope.SubjectsList[i].SubName + "";
                }
            }
            //for (var i = 0; i < $scope.DRDCList.length; i++) {
            //    if ($scope.DRDCList[i].Selected) {
            //        if ($scope.drdcIDs == "") {
            //            $scope.drdcIDs = $scope.DRDCList[i].DRDCID;
            //        }
            //        else {

            //            $scope.drdcIDs = $scope.drdcIDs + ',' + $scope.DRDCList[i].DRDCID;
            //        }
            //    }
            //}
            if (($scope.DRDCChart.SubjectID == "") || ($scope.DRDCChart.SubjectID == undefined)) {
                alert("Select Subject");
                return;
            }
            $scope.showChartdata();
            //if ($scope.drdcIDs != "") {
            //    $scope.showChartdata();
            //    //if (($scope.DRDCChart.CampusID == "") || ($scope.DRDCChart.CampusID == undefined)) {
            //    //    alert("Select Campus");
            //    //    return;
            //    //}
            //    //var SubjectsList = DRDCChartService.GetUpdateBlockedDR($scope.drdcIDs, $scope.DRDCChart.CampusID, AppSettings.ExamInstID);
            //    //SubjectsList.then(function (SubjListdata, status, headers, config, error) {
            //    //    $scope.showChartdata();
            //    //}, function (error) {
            //    //    alert(error);
            //    //});
            //}
            //else {
            //    $scope.showChartdata();
            //}
        }
        $scope.col1Total = 0;
        $scope.col2Total = 0;
        $scope.col2Total = 0;
        $scope.col3Total = 0;
        $scope.col4Total = 0;
        $scope.col5Total = 0;
        $scope.col6Total = 0;
        $scope.col7Total = 0;
        $scope.col8Total = 0;
        $scope.col9Total = 0;
        $scope.col10Total = 0;
        $scope.col11Total = 0;
        $scope.SriptsTotalValue = 0;
        $scope.ExmCntTotal = 0;
        $scope.showChartdata = function () {
            $scope.LoadImg = true;
            var SubjectsList = DRDCChartService.GetDRDCChart(AppSettings.ExamInstID, $scope.DRDCChart.SubjectID, $scope.DRDCChart.CourseID, $scope.DRDCChart.ExamID, $scope.DRDCChart.CampDays);
            SubjectsList.then(function (SubjListdata, status, headers, config, error) {
                if (SubjListdata.length == 0) {
                    alert("Data not found");
                    $scope.LoadImg = false;
                    return;
                } else {
                    $scope.DRDCChartdata = SubjListdata;
                    $scope.col1Total = 0;
                    $scope.col2Total = 0;
                    $scope.col2Total = 0;
                    $scope.col3Total = 0;
                    $scope.col4Total = 0;
                    $scope.col5Total = 0;
                    $scope.col6Total = 0;
                    $scope.col7Total = 0;
                    $scope.col8Total = 0;
                    $scope.col9Total = 0;
                    $scope.col10Total = 0;
                    $scope.col11Total = 0;
                    $scope.SriptsTotalValue = 0;
                    $scope.ExmCntTotal = 0;
                    $scope.col1Total = parseInt(450) * parseInt($scope.DRDCChartdata[0].ExmCnt);
                    $scope.col2Total = parseInt(450) * parseInt($scope.DRDCChartdata[1].ExmCnt);
                    $scope.col3Total = parseInt(450) * parseInt($scope.DRDCChartdata[2].ExmCnt);
                    $scope.col4Total = parseInt(450) * parseInt($scope.DRDCChartdata[3].ExmCnt);
                    $scope.col5Total = parseInt(450) * parseInt($scope.DRDCChartdata[4].ExmCnt);
                    $scope.col6Total = parseInt(450) * parseInt($scope.DRDCChartdata[5].ExmCnt);
                    $scope.col7Total = parseInt(450) * parseInt($scope.DRDCChartdata[6].ExmCnt);
                    $scope.col8Total = parseInt(450) * parseInt($scope.DRDCChartdata[7].ExmCnt);
                    $scope.col9Total = parseInt(450) * parseInt($scope.DRDCChartdata[8].ExmCnt);
                    $scope.col10Total = parseInt(450) * parseInt($scope.DRDCChartdata[9].ExmCnt);
                    $scope.col11Total = parseInt(450) * parseInt($scope.DRDCChartdata[10].ExmCnt);


                    for (var i = 0; i < $scope.DRDCChartdata.length; i++) {
                        //    if ($scope.DRDCChartdata[i].col1 != 'X') {
                        //        $scope.col1Total = parseInt(450) * parseInt($scope.DRDCChartdata[i].ExmCnt); 
                        //        //$scope.col1Total = parseInt($scope.col1Total) + parseInt($scope.DRDCChartdata[i].col1);
                        //    }
                        //    if ($scope.DRDCChartdata[i].col2 != 'X') {
                        //        $scope.col2Total = parseInt(450) * parseInt($scope.DRDCChartdata[i].ExmCnt); 
                        //        //$scope.col2Total = parseInt($scope.col2Total) + parseInt($scope.DRDCChartdata[i].col2);
                        //    }
                        //    if ($scope.DRDCChartdata[i].col3 != 'X') {
                        //        $scope.col3Total = parseInt(450) * parseInt($scope.DRDCChartdata[i].ExmCnt); 
                        //        //$scope.col3Total = parseInt($scope.col3Total) + parseInt($scope.DRDCChartdata[i].col3);
                        //    }
                        //    if ($scope.DRDCChartdata[i].col4 != 'X') {
                        //        $scope.col4Total = parseInt(450) * parseInt($scope.DRDCChartdata[i].ExmCnt); 
                        //        //$scope.col4Total = parseInt($scope.col4Total) + parseInt($scope.DRDCChartdata[i].col4);
                        //    }
                        //    if ($scope.DRDCChartdata[i].col5 != 'X') {
                        //        $scope.col5Total = parseInt(450) * parseInt($scope.DRDCChartdata[i].ExmCnt); 
                        //        //$scope.col5Total = parseInt($scope.col5Total) + parseInt($scope.DRDCChartdata[i].col5);
                        //    }
                        //    if ($scope.DRDCChartdata[i].col6 != 'X') {
                        //        $scope.col6Total = parseInt(450) * parseInt($scope.DRDCChartdata[i].ExmCnt); 
                        //        //$scope.col6Total = parseInt($scope.col6Total) + parseInt($scope.DRDCChartdata[i].col6);
                        //    }
                        //    if ($scope.DRDCChartdata[i].col7 != 'X') {
                        //        $scope.col7Total = parseInt(450) * parseInt($scope.DRDCChartdata[i].ExmCnt); 
                        //        //$scope.col7Total = parseInt($scope.col7Total) + parseInt($scope.DRDCChartdata[i].col7);
                        //    }
                        //    if ($scope.DRDCChartdata[i].col8 != 'X') {
                        //        $scope.col8Total = parseInt(450) * parseInt($scope.DRDCChartdata[i].ExmCnt); 
                        //        //$scope.col8Total = parseInt($scope.col8Total) + parseInt($scope.DRDCChartdata[i].col8);
                        //    }
                        //    if ($scope.DRDCChartdata[i].col9 != 'X') {
                        //        $scope.col9Total = parseInt(450) * parseInt($scope.DRDCChartdata[i].ExmCnt); 
                        //        //$scope.col9Total = parseInt($scope.col9Total) + parseInt($scope.DRDCChartdata[i].col9);
                        //    }
                        //    if ($scope.DRDCChartdata[i].col10 != 'X') {
                        //        $scope.col10Total = parseInt(450) * parseInt($scope.DRDCChartdata[i].ExmCnt); 
                        //        //$scope.col10Total = parseInt($scope.col10Total) + parseInt($scope.DRDCChartdata[i].col10);
                        //    }
                        //    if ($scope.DRDCChartdata[i].col11 != 'X') {
                        //        $scope.col11Total = parseInt(450) * parseInt($scope.DRDCChartdata[i].ExmCnt); 
                        //        //$scope.col11Total = parseInt($scope.col11Total) + parseInt($scope.DRDCChartdata[i].col11);
                        //    }
                        $scope.SriptsTotalValue = parseInt($scope.SriptsTotalValue) + parseInt($scope.DRDCChartdata[i].SriptsTotal);
                        $scope.ExmCntTotal = parseInt($scope.ExmCntTotal) + parseInt($scope.DRDCChartdata[i].ExmCnt);
                    }
                    for (var i = 0; i < $scope.DRDCChartdata.length; i++) {
                        if ($scope.DRDCChartdata[i].col1 != 'X') {
                            $scope.DRDCChartdata[i].col1 = '';
                        }
                        if ($scope.DRDCChartdata[i].col2 != 'X') {
                            $scope.DRDCChartdata[i].col2 = '';
                        }
                        if ($scope.DRDCChartdata[i].col3 != 'X') {
                            $scope.DRDCChartdata[i].col3 = '';
                        }
                        if ($scope.DRDCChartdata[i].col4 != 'X') {
                            $scope.DRDCChartdata[i].col4 = '';
                        }
                        if ($scope.DRDCChartdata[i].col5 != 'X') {
                            $scope.DRDCChartdata[i].col5 = '';
                        }
                        if ($scope.DRDCChartdata[i].col6 != 'X') {
                            $scope.DRDCChartdata[i].col6 = '';
                        }
                        if ($scope.DRDCChartdata[i].col7 != 'X') {
                            $scope.DRDCChartdata[i].col7 = '';
                        }
                        if ($scope.DRDCChartdata[i].col8 != 'X') {
                            $scope.DRDCChartdata[i].col8 = '';
                        }
                        if ($scope.DRDCChartdata[i].col9 != 'X') {
                            $scope.DRDCChartdata[i].col9 = '';
                        }
                        if ($scope.DRDCChartdata[i].col10 != 'X') {
                            $scope.DRDCChartdata[i].col10 = '';
                        }
                        if ($scope.DRDCChartdata[i].col11 != 'X') {
                            $scope.DRDCChartdata[i].col11 = '';
                        }
                    }
                    $scope.chartshow = true;
                    $scope.LoadImg = false;
                }
            }, function (error) {
                alert(error);
            });
        }

        $scope.Exit = function () {
            RedirectToListPage();
        }

        function RedirectToListPage() {
            $state.go('CenterManagemnet');
        }
        
        $scope.DRDCChart.CampDays = 15;
     });
});