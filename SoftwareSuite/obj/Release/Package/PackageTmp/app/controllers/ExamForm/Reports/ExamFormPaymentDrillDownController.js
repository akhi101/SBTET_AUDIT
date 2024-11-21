define(['app'], function (app) {
    app.controller("ExamFormPaymentDrillDownController", function ($scope, $http, $localStorage, $state, AppSettings, DrillDownExamService) {
        $scope.ExamFormPaymentDrillDown = {};
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
        AppSettings.userName = authData.userName;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.TypeFlag = authData.TypeFlag;
        AppSettings.ExamInstID = $localStorage.ExamInstID;
        AppSettings.MngtTypID = authData.MngtTypID;

        //drilldowncoding
        $scope.adminuser = false;
        $scope.ifcoluser = false;
        var AcdYrList = DrillDownExamService.GetCurrentAcademicYearForDrillDown();
        AcdYrList.then(function (AcdYrdata, status, headers, config, error) {
            $scope.AcdYrList = AcdYrdata;
        }, function (error) {
            alert(error);
        });
        var DistrictList = DrillDownExamService.GetDistrictListByStateID(1);
        DistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.DistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });


        var BasicManagementTypedata = DrillDownExamService.GetBasicManagementTypeList();
        BasicManagementTypedata.then(function (data) {
            $scope.BasicManagementTypeList = data;
        }, function (error) {
            alert(error);
        });
        var DistrictList = DrillDownExamService.GetDistrictListByStateID(1);
        DistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.DistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });
        var BasicManagementTypedata = DrillDownExamService.GetBasicManagementTypeList();
        BasicManagementTypedata.then(function (data) {
            $scope.BasicManagementTypeList = data;
            if (AppSettings.CollegeID != 0) {
                for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                    if ($scope.BasicManagementTypeList[i].MngtTypID == AppSettings.MngtTypID) {
                        $scope.BasicManagementTypeList[i].Selected = true;
                        $scope.ifcoluser = true;
                    }
                }
            }
        }, function (error) {
            alert(error);
        });
        var MediumList = DrillDownExamService.GetBasicMediumList();
        MediumList.then(function (SecondLangdata, status, headers, config, error) {
            $scope.MediumList = SecondLangdata;
        }, function (error) {
            alert(error);
        });
        var CasteList = DrillDownExamService.GetCasteList();
        CasteList.then(function (Castedata, status, headers, config, error) {
            $scope.CasteList = Castedata;
        }, function (error) {
            alert(error);
        });
        if (AppSettings.CollegeID != 0) {
            $scope.adminuser = false;
            var CourseList = DrillDownExamService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (Coursedata, status, headers, config, error) {
                $scope.CourseList = Coursedata;
            }, function (error) {
                alert(error);
            });
        } else {
            $scope.adminuser = true;
            var CourseList = DrillDownExamService.GetBasicCourseList();
            CourseList.then(function (Coursedata, status, headers, config, error) {
                $scope.CourseList = Coursedata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillCoursePart = function (CourseID) {
            if ((CourseID != null) && (CourseID != undefined) || (CourseID != "")) {
                var MainGroupList = DrillDownExamService.GetMainGroupListByCollegeId(AppSettings.CollegeID, CourseID, AppSettings.AcdYrID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupListdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillMedium = function (MainGrpID) {
            if ((MainGrpID != null) && (MainGrpID != undefined) && (MainGrpID != "")) {
                var BranchList = DrillDownExamService.GetBasicBranchListByGroup(MainGrpID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                    $scope.ExamFormPaymentDrillDown.BranchID = BasicBranchdata[0].BranchID;
                    if (AppSettings.CollegeID != 0) {
                        var MediumList = DrillDownExamService.GetBasicMediumInRegStud(AppSettings.CollegeID, BasicBranchdata[0].BranchID, AppSettings.AcdYrID);
                        MediumList.then(function (SecondLangdata, status, headers, config, error) {
                            $scope.MediumList = SecondLangdata;
                        }, function (error) {
                            alert(error);
                        });
                    }
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.MngtTypIDs = "";
        $scope.Submit = function () {
            $scope.MngtTypIDs = "";
            for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                if ($scope.BasicManagementTypeList[i].Selected) {
                    if ($scope.MngtTypIDs == "") {
                        $scope.MngtTypIDs = $scope.BasicManagementTypeList[i].MngtTypID;
                    }
                    else {

                        $scope.MngtTypIDs = $scope.MngtTypIDs + ',' + $scope.BasicManagementTypeList[i].MngtTypID;
                    }
                }
            }
            if ($scope.MngtTypIDs == "") {
                alert("Select atleast single management type");
                return;
            }
            if (($scope.ExamFormPaymentDrillDown.AcdYrID == "") || ($scope.ExamFormPaymentDrillDown.AcdYrID == undefined)) {
                alert("Select Academic Year");
                return;
            }
            if (($scope.ExamFormPaymentDrillDown.CourseID == "") || ($scope.ExamFormPaymentDrillDown.CourseID == undefined)) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamFormPaymentDrillDown.DistrictID == "") || ($scope.ExamFormPaymentDrillDown.DistrictID == undefined)) {
                $scope.ExamFormPaymentDrillDown.DistrictID = 0;
            }
            if (($scope.ExamFormPaymentDrillDown.CourseID == "") || ($scope.ExamFormPaymentDrillDown.CourseID == undefined)) {
                $scope.ExamFormPaymentDrillDown.CourseID = 0;
            }
            if (($scope.ExamFormPaymentDrillDown.MainGrpID == "") || ($scope.ExamFormPaymentDrillDown.MainGrpID == undefined)) {
                $scope.ExamFormPaymentDrillDown.MainGrpID = 0;
            }
            if (($scope.ExamFormPaymentDrillDown.MediumID == "") || ($scope.ExamFormPaymentDrillDown.MediumID == undefined)) {
                $scope.ExamFormPaymentDrillDown.MediumID = 0;
            }
            if (($scope.ExamFormPaymentDrillDown.CasteID == "") || ($scope.ExamFormPaymentDrillDown.CasteID == undefined)) {
                $scope.ExamFormPaymentDrillDown.CasteID = 0;
            }

            $scope.MngtTypName = "ALL";
            $scope.CourseName = "ALL";
            $scope.MainGrpName = "ALL";
            $scope.MediumName = "ALL";
            $scope.CasteName = "ALL";
            $scope.AcdYrName = "ALL";
            $scope.CollegeDistName = "ALL";
            for (var i = 0; i < $scope.AcdYrList.length; i++) {
                if ($scope.AcdYrList[i].AcdYrID == $scope.ExamFormPaymentDrillDown.AcdYrID) {
                    $scope.AcdYrName = $scope.AcdYrList[i].AcdYrName;
                }
            }
            for (var i = 0; i < $scope.DistrictList.length; i++) {
                if ($scope.DistrictList[i].DistrictID == $scope.ExamFormPaymentDrillDown.DistrictID) {
                    $scope.CollegeDistName = $scope.DistrictList[i].DistName;
                }
            }
            for (var i = 0; i < $scope.CourseList.length; i++) {
                if ($scope.CourseList[i].CourseID == $scope.ExamFormPaymentDrillDown.CourseID) {
                    $scope.CourseName = $scope.CourseList[i].CourseName;
                }
            }
            for (var i = 0; i < $scope.MainGroupList.length; i++) {
                if ($scope.MainGroupList[i].MainGrpID == $scope.ExamFormPaymentDrillDown.MainGrpID) {
                    $scope.MainGrpName = $scope.MainGroupList[i].MainGrpName;
                }
            }
            for (var i = 0; i < $scope.MediumList.length; i++) {
                if ($scope.MediumList[i].MediumID == $scope.ExamFormPaymentDrillDown.MediumID) {
                    $scope.MediumName = $scope.MediumList[i].MediumName;
                }
            }

            $scope.DistrictIDs = "";
            $scope.ExamFormPaymentDrillDown.ExamID = 0;

            if ($scope.ExamFormPaymentDrillDown.CollegeDistrictID == null || $scope.ExamFormPaymentDrillDown.CollegeDistrictID == undefined) {
                $scope.ExamFormPaymentDrillDown.CollegeDistrictID = 0;
            }

            if (AppSettings.CollegeID == 0) {
                var TotalRecorddata = DrillDownExamService.GetExamFormPaymentDetailsDistrictwise(AppSettings.LoggedUserId, AppSettings.ExamInstID, $scope.ExamFormPaymentDrillDown.ExamID, $scope.DistrictIDs, $scope.ExamFormPaymentDrillDown.CollegeDistrictID, $scope.MngtTypIDs, $scope.ExamFormPaymentDrillDown.CourseID, $scope.ExamFormPaymentDrillDown.MainGrpID, $scope.ExamFormPaymentDrillDown.MediumID, $scope.ExamFormPaymentDrillDown.CasteID);
            }
            else {
                var gender = "";
                var TotalRecorddata = DrillDownExamService.GetExamFormPaymentDetails(AppSettings.ExamInstID, $scope.ExamFormPaymentDrillDown.ExamID, AppSettings.CollegeID, $scope.DistrictIDs, $scope.ExamFormPaymentDrillDown.DistrictID, $scope.MngtTypIDs, $scope.ExamFormPaymentDrillDown.CourseID, $scope.ExamFormPaymentDrillDown.MainGrpID, $scope.ExamFormPaymentDrillDown.MediumID, $scope.ExamFormPaymentDrillDown.CasteID);
            }
            TotalRecorddata.then(function (data) {
                if (data.length > 0) {
                    if (AppSettings.CollegeID == 0) {
                        $scope.DrillDownList = data;
                    }
                    else {
                        $scope.colPageAdmissionListForfirst = data;
                    }
                } else {
                    alert("Data Not Found.");
                    $scope.DrillDownList = [];
                    $scope.colPageAdmissionListForfirst = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillDistrictsByMgtyp = function (objlist) {
            var colTot = 0; var colMale = 0; var colFemale = 0; var colOther = 0;
            for (var i = 0; i < objlist.length; i++) {
                colTot = colTot + objlist[i].Total;
                colMale = colMale + objlist[i].Male;
                colFemale = colFemale + objlist[i].Female;
                colOther = colOther + objlist[i].Other;
            }
        }
        $scope.DrillDownList = [];
        $scope.colPageAdmissionListForfirst = [];
        $scope.FillDistrictsByMgtyp = function (obj) {
            var DrillDownExamdata = DrillDownExamService.GetDistrictsCollegeByMngtype(obj.MngtTypID);
            DrillDownExamdata.then(function (data) {
                $scope.DrillDownExamList = data;
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.DrillDownExamList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetTotalRecord = function (obj) {
            $scope.colPageAdmissionList = [];
            var TotalRecorddata = DrillDownExamService.GetExamFormPaymentDetails(AppSettings.ExamInstID, $scope.ExamFormPaymentDrillDown.ExamID, AppSettings.CollegeID, $scope.DistrictIDs, $scope.ExamFormPaymentDrillDown.DistrictID, $scope.MngtTypIDs, $scope.ExamFormPaymentDrillDown.CourseID, $scope.ExamFormPaymentDrillDown.MainGrpID, $scope.ExamFormPaymentDrillDown.MediumID, $scope.ExamFormPaymentDrillDown.CasteID);
            TotalRecorddata.then(function (data) {
                $scope.colPageAdmissionList = data;
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.colPageAdmissionList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        //col page

        $scope.GetColTotalRecord = function (obj) {
            $scope.studpageAdmissionList = [];
            //$scope.DistrictIDs = "";
            $scope.ExamFormPaymentDrillDown.ExamID = 0;
            //ExamInstID,                                 ExamID,     CollegeID,        DistrictIDs,     CollegeDistrictID,         MngtTypIDs,                                 CourseID,                                 MainGrpID,                                 MediumID,                                 CasteID
            var TotalRecorddata = DrillDownExamService.GetExamFormPaymentDetailsStudentList(AppSettings.ExamInstID, $scope.ExamFormPaymentDrillDown.ExamID, obj.CollegeID, $scope.DistrictIDs, obj.CollegeDistrictID, $scope.MngtTypIDs, $scope.ExamFormPaymentDrillDown.CourseID, $scope.ExamFormPaymentDrillDown.MainGrpID, $scope.ExamFormPaymentDrillDown.MediumID, $scope.ExamFormPaymentDrillDown.CasteID);
            TotalRecorddata.then(function (data) {
                $scope.studpageAdmissionList = data;
                $scope.SetDefault();
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.studpageAdmissionList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
    });
});