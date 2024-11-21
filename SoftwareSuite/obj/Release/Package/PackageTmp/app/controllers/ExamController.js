define(['app'], function (app) {
    app.controller("ExamController", function ($scope, $http, $localStorage, $state, AppSettings, MenuService, DrillDownExamService) {
        $scope.Exam = {};
        $scope.ShowBtn = false;
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
        AppSettings.DistrictIDs = authData.DistrictIDs;
        var ExamInstIDData = MenuService.GetCurretnExamInst(AppSettings.AcdYrID);
        ExamInstIDData.then(function (data) {
            AppSettings.ExamInstID = data;
            $localStorage.ExamInstID = AppSettings.ExamInstID;
            var BasicExamInstanceList = DrillDownExamService.GetCurrentBasicExamInstanceForDrillDown(AppSettings.ExamInstID);
            BasicExamInstanceList.then(function (ExamInstancedata, status, headers, config, error) {
                $scope.BasicExamInstanceList = ExamInstancedata;
            }, function (error) {
                alert(error);
            });
        }, function (error) {
            alert(error);
        });
        if (AppSettings.TypeFlag != 'B') {
            var CollegeNameList = MenuService.GetCollegeNameForExamModule(AppSettings.CollegeID);
            CollegeNameList.then(function (data, status, headers, config, error) {
                AppSettings.college_name1 = data;
                $scope.college_name1 = AppSettings.college_name1;
            }, function (error) {
            });
        }
        if (AppSettings.UserRights.length == 0) { AppSettings.UserRights = authData.UserRights; }
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        var programsList = [];
        var ReportsList = [];
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ModuleRouteName == "Exam") {
                if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                }
                else {
                    if ((UsersRightsdata[i].ProgramType == "T") || (UsersRightsdata[i].ProgramType == "M")) {
                        var obj = {};
                        obj.SysProgName = UsersRightsdata[i].SysProgName;
                        obj.SysProgID = UsersRightsdata[i].SysProgID;
                        obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                        obj.PrgImgClass = UsersRightsdata[i].PrgImgClass;
                        programsList.push(obj);
                    } else {
                        var obj = {};
                        obj.SysProgName = UsersRightsdata[i].SysProgName;
                        obj.SysProgID = UsersRightsdata[i].SysProgID;
                        obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                        ReportsList.push(obj);
                    }
                }
            }
        }
        $scope.programsList = programsList;
        $scope.ReportsList = ReportsList;
        //for (var i = 0; i < UsersRightsdata.length; i++) {
        //    if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
        //        $scope[UsersRightsdata[i].GridFormToOpen] = false;
        //    }
        //    else {
        //        $scope[UsersRightsdata[i].GridFormToOpen] = true;
        //    }
        //    $scope[UsersRightsdata[i].GridFormToOpen + 'Name'] = UsersRightsdata[i].SysProgName;
        //}
        $scope.OpenProgram = function (GridFormToOpen) {
            var strroute = '' + GridFormToOpen;
            $state.go(strroute);
        }
        $scope.OpenDashboard = function () {
            $state.go('Dashboard')
        }
        $scope.GoToHome = function () {
            $state.go('Exam');
        }
        $scope.MyProfile = function () {
            alert("ok");
        }
        $scope.MyCollege = function () {
            if (AppSettings.TypeFlag == 'C') {
                $state.go('Exam.CollegeInfo');
            }
            else {
                alert("This is not College user");
                return;
            }
        }
        $scope.logOut = function () {
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;
            var InsertLoginList = MenuService.GetUpdateLogoutInfo(AppSettings.LoggedUserId, $scope.userName);
            InsertLoginList.then(function (Districtdata, status, headers, config, error) {
            }, function (error) {
                alert(error);
            });
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
            $state.go('login');
        }
        //$scope.$on('onUnload', function(e) {
        //    delete $localStorage.authorizationData;
        //    sessionStorage.loggedIn = "no";
        //});
        //drilldowncoding
        $scope.adminuser = false;
        $scope.ifcoluser = false;
        
        //var DistrictList = DrillDownExamService.GetDistrictListByStateID(1);
        //DistrictList.then(function (Districtdata, status, headers, config, error) {
        //    $scope.DistrictList = Districtdata;
        //}, function (error) {
        //    alert(error);
        //});

        if (AppSettings.DistrictIDs == null) { AppSettings.DistrictIDs = "";}
        var DistrictList = DrillDownExamService.GetDistrictListByDistrictIDs(AppSettings.DistrictIDs);
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
        //var DistrictList = DrillDownExamService.GetDistrictListByStateID(1);
        //DistrictList.then(function (Districtdata, status, headers, config, error) {
        //    $scope.DistrictList = Districtdata;
        //}, function (error) {
        //    alert(error);
        //});
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
                $scope.Exam.CourseID = "" + $scope.CourseList[0].CourseID + "";
                $scope.Exam.ExamInstID = "" + AppSettings.ExamInstID + "";
                $scope.FillCoursePart($scope.Exam.CourseID);
            }, function (error) {
                alert(error);
            });
        } else {
            $scope.adminuser = true;
            var CourseList = DrillDownExamService.GetBasicCourseList();
            CourseList.then(function (Coursedata, status, headers, config, error) {
                $scope.CourseList = Coursedata;
                $scope.Exam.CourseID = "" + $scope.CourseList[0].CourseID + "";
                  $scope.Exam.ExamInstID = "" + AppSettings.ExamInstID + "";
                $scope.FillCoursePart($scope.Exam.CourseID);
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillCoursePart = function (CourseID) {
            if ((CourseID != null) && (CourseID != undefined) || (CourseID != "")) {
                var MainGroupList = DrillDownExamService.GetMainGroupListByCollegeId(AppSettings.CollegeID, CourseID, AppSettings.AcdYrID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupListdata;
                    var ExamList = DrillDownExamService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                    ExamList.then(function (BasicExamdata, status, headers, config, error) {
                        $scope.ExamList = BasicExamdata;
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillMedium = function (MainGrpID) {
            if((MainGrpID != null) && (MainGrpID != undefined) && (MainGrpID != "")) {
                var BranchList = DrillDownExamService.GetBasicBranchListByGroup(MainGrpID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                    $scope.Exam.BranchID = BasicBranchdata[0].BranchID;
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
        $scope.LoadImg = false;
        $scope.Submit = function () {
            $scope.MngtName = "";
            var ExamInstSelect = document.getElementById("ExamInstID");
            var ExamInstSelectText = ExamInstSelect.options[ExamInstSelect.selectedIndex].text;
            var DistrictSelect = document.getElementById("DistrictID");
            var DistrictSelectText = DistrictSelect.options[DistrictSelect.selectedIndex].text;
            var CourseSelect = document.getElementById("CourseID"); 
            var CourseSelectText = CourseSelect.options[CourseSelect.selectedIndex].text;
            var ExamSelect = document.getElementById("ExamID"); 
            var ExamSelectText = ExamSelect.options[ExamSelect.selectedIndex].text;
            var MainGrpSelect = document.getElementById("MainGrpID");
            var MainGrpSelectText = MainGrpSelect.options[MainGrpSelect.selectedIndex].text; 
            var MediumSelect = document.getElementById("MediumID");
            var MediumSelectText = MediumSelect.options[MediumSelect.selectedIndex].text; 
            var CasteSelect = document.getElementById("CasteID");
            var CasteSelectText = CasteSelect.options[CasteSelect.selectedIndex].text;
            document.getElementById('HeadLabel').innerHTML = 'Exam Fee Transaction Report <br/>'
                + 'Exam Instance: ' + ExamInstSelectText + ' &emsp;&emsp; District: ' + DistrictSelectText + ' &emsp;&emsp; Stream: ' + CourseSelectText +
                '<br/>Year: ' + ExamSelectText + '&emsp;&emsp;Group: ' + MainGrpSelectText + '&emsp;&emsp;Medium: ' + MediumSelectText + '&emsp;&emsp;Caste/Community: ' + CasteSelectText;

            $scope.MngtTypIDs = "";
            $scope.LoadImg = true;
            for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                if ($scope.BasicManagementTypeList[i].Selected) {
                    if ($scope.MngtTypIDs == "") {
                        $scope.MngtTypIDs = $scope.BasicManagementTypeList[i].MngtTypID;
                        $scope.MngtName = $scope.BasicManagementTypeList[i].MngtTypName; // for printing
                    }
                    else {                   
                        $scope.MngtTypIDs = $scope.MngtTypIDs + ',' + $scope.BasicManagementTypeList[i].MngtTypID;
                        $scope.MngtName += ',' + $scope.BasicManagementTypeList[i].MngtTypName; // for printing
                    }
                }
            }
            if (AppSettings.CollegeID != 0) {
                for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                    if ($scope.BasicManagementTypeList[i].MngtTypID == AppSettings.MngtTypID) {
                        $scope.BasicManagementTypeList[i].Selected = true;
                        $scope.MngtTypIDs = $scope.BasicManagementTypeList[i].MngtTypID;
                        $scope.MngtName = $scope.BasicManagementTypeList[i].MngtTypName; // for printing
                    }
                }
            }
            $("#MangtLabel").text('Management Type: ' + $scope.MngtName);
            if ($scope.MngtTypIDs == "") {
                alert("Select atleast single management type");
                return;
            }
            if (($scope.Exam.ExamInstID == "") || ($scope.Exam.ExamInstID == undefined)) {
                alert("Select Exam Instance");
                return;
            }
            if (($scope.Exam.CourseID == "") || ($scope.Exam.CourseID == undefined)) {
                alert("Select Stream");
                return;
            }
            if (($scope.Exam.ExamID == "") || ($scope.Exam.ExamID == undefined)) {
                alert("Select Exam");
                return;
            }
            if (($scope.Exam.DistrictID == "") || ($scope.Exam.DistrictID == undefined)) {
                $scope.Exam.DistrictID = 0;
            }
            if (($scope.Exam.CourseID == "") || ($scope.Exam.CourseID == undefined)) {
                $scope.Exam.CourseID = 0;
            }
            if (($scope.Exam.MainGrpID == "") || ($scope.Exam.MainGrpID == undefined)) {
                $scope.Exam.MainGrpID = 0;
            }
            if (($scope.Exam.MediumID == "") || ($scope.Exam.MediumID == undefined)) {
                $scope.Exam.MediumID = 0;
            }
            if (($scope.Exam.CasteID == "") || ($scope.Exam.CasteID == undefined)) {
                $scope.Exam.CasteID = 0;
            }

            $scope.MngtTypName = "ALL";
            $scope.CourseName = "ALL";
            $scope.MainGrpName = "ALL";
            $scope.MediumName = "ALL";
            $scope.CasteName = "ALL";
            $scope.AcdYrName = "ALL";
            $scope.CollegeDistName = "ALL";
            for (var i = 0; i < $scope.BasicExamInstanceList.length; i++) {
                if ($scope.BasicExamInstanceList[i].ExamInstID == $scope.Exam.ExamInstID) {
                    $scope.AcdYrName = $scope.BasicExamInstanceList[i].ExamInstanceRemark;
                }
            }
            for (var i = 0; i < $scope.DistrictList.length; i++) {
                if ($scope.DistrictList[i].DistrictID == $scope.Exam.DistrictID) {
                    $scope.CollegeDistName = $scope.DistrictList[i].DistName;
                }
            }
            for (var i = 0; i < $scope.CourseList.length; i++) {
                if ($scope.CourseList[i].CourseID == $scope.Exam.CourseID) {
                    $scope.CourseName = $scope.CourseList[i].CourseName;
                }
            }
            for (var i = 0; i < $scope.MainGroupList.length; i++) {
                if ($scope.MainGroupList[i].MainGrpID == $scope.Exam.MainGrpID) {
                    $scope.MainGrpName = $scope.MainGroupList[i].MainGrpName;
                }
            }
            for (var i = 0; i < $scope.MediumList.length; i++) {
                if ($scope.MediumList[i].MediumID == $scope.Exam.MediumID) {
                    $scope.MediumName = $scope.MediumList[i].MediumName;
                }
            }


            if (AppSettings.CollegeID == 0) {
                var TotalRecorddata = DrillDownExamService.GetCollegedataByMngtypeAndDistrict(AppSettings.ExamInstID, AppSettings.AcdYrID, $scope.Exam.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs, $scope.Exam.CourseID, $scope.Exam.ExamID, $scope.Exam.MainGrpID, $scope.Exam.MediumID, $scope.Exam.CasteID);
            }
            else {
                var gender = "";
                var TotalRecorddata = DrillDownExamService.GetCollegedataByMngtypeAndDistrictByCollege(AppSettings.ExamInstID, AppSettings.AcdYrID, $scope.Exam.DistrictID, AppSettings.CollegeID, gender, $scope.MngtTypIDs, $scope.Exam.CourseID, $scope.Exam.ExamID, $scope.Exam.MainGrpID, $scope.Exam.MediumID, $scope.Exam.CasteID);
            }
            TotalRecorddata.then(function (data) {
                $scope.LoadImg = false;
                if (data.length > 0) {
                    if (AppSettings.CollegeID == 0) {
                        $scope.DrillDownList = data;
                    }
                    else {
                        $scope.colPageAdmissionListForfirst = data;
                    }
                    $scope.ShowBtn = true;
                } else {
                    alert("Data Not Found.");
                    $scope.DrillDownList = [];
                    $scope.colPageAdmissionListForfirst = [];
                    $scope.ShowBtn = false;
                }
            }, function (error) {
                alert(error);
                $scope.LoadImg = false;
                $scope.ShowBtn = false;
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
        $scope.gender = "";
        $scope.GetTotalRecord = function (obj) {
            $scope.colPageAdmissionList = [];
            var gender = "";
            $scope.gender = "";
            var TotalRecorddata = DrillDownExamService.GetCollegedataByMngtypeAndDistrictByCollege(AppSettings.ExamInstID, AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.Exam.CourseID, $scope.Exam.ExamID, $scope.Exam.MainGrpID, $scope.Exam.MediumID, $scope.Exam.CasteID);
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
        $scope.GetMaleRecord = function (obj) {
            var gender = "M";
            $scope.gender = gender;
            $scope.colPageAdmissionList = [];
            var MaleRecorddata = DrillDownExamService.GetCollegedataByMngtypeAndDistrictByCollege(AppSettings.ExamInstID, AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.Exam.CourseID, $scope.Exam.ExamID, $scope.Exam.MainGrpID, $scope.Exam.MediumID, $scope.Exam.CasteID);
            MaleRecorddata.then(function (data) {
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
        $scope.GetFemaleRecord = function (obj) {
            var gender = "F";
            $scope.gender = gender;
            $scope.colPageAdmissionList = [];
            var MaleRecorddata = DrillDownExamService.GetCollegedataByMngtypeAndDistrictByCollege(AppSettings.ExamInstID, AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.Exam.CourseID, $scope.Exam.ExamID, $scope.Exam.MainGrpID, $scope.Exam.MediumID, $scope.Exam.CasteID);
            MaleRecorddata.then(function (data) {
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
        $scope.GetOtherRecord = function (obj) {
            var gender = "O";
            $scope.gender = gender;
            $scope.colPageAdmissionList = [];
            var MaleRecorddata = DrillDownExamService.GetCollegedataByMngtypeAndDistrictByCollege(AppSettings.ExamInstID, AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.Exam.CourseID, $scope.Exam.ExamID, $scope.Exam.MainGrpID, $scope.Exam.MediumID, $scope.Exam.CasteID);
            MaleRecorddata.then(function (data) {
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
        $scope.GetMaleOrFemaleRecord = function (obj) {
            $scope.TotalRecordList = [];
            var TotalRecorddata = DrillDownExamService.GetCollegedataByMngtypeAndDistrictByCollege(AppSettings.ExamInstID, AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.Exam.CourseID, $scope.Exam.ExamID, $scope.Exam.MainGrpID, $scope.Exam.MediumID, $scope.Exam.CasteID);
            TotalRecorddata.then(function (data) {
                $scope.TotalRecordList = data;
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.TotalRecordList = [];
                }
            }, function (error) {
                alert(error);
            });

        }
        $scope.GetDrillDownStudentDetailsListByID = function (obj) {
            $scope.ExamForms = [];
            var TotalRecorddata = DrillDownExamService.GetExamFormDetailsListByID(obj.ExmFrmID);
            TotalRecorddata.then(function (data) {
                $scope.ExamForms = data[0];
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.ExamForms = [];
                }
            }, function (error) {
                alert(error);
            });

        }

        //col page

        $scope.GetColTotalRecord = function (obj) {
            $scope.studpageAdmissionList = [];
            var gender = "";
            if ($scope.gender != "") { gender = $scope.gender }
            else {
                gender = ""
            }
            var TotalRecorddata = DrillDownExamService.GetCollegedataByMngtypeAndDistrictByCollegeDistrictID(AppSettings.ExamInstID, AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.Exam.CourseID, $scope.Exam.ExamID, $scope.Exam.MainGrpID, $scope.Exam.MediumID, $scope.Exam.CasteID);
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
        $scope.GetColMaleRecord = function (obj) {
            var gender = "";
            if ($scope.gender != "") { gender = $scope.gender }
            else {
                gender = "M"
            }
            $scope.studpageAdmissionList = [];
            var TotalRecorddata = DrillDownExamService.GetCollegedataByMngtypeAndDistrictByCollegeDistrictID(AppSettings.ExamInstID, AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.Exam.CourseID, $scope.Exam.ExamID, $scope.Exam.MainGrpID, $scope.Exam.MediumID, $scope.Exam.CasteID);
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
        $scope.GetColFemaleRecord = function (obj) {
            var gender = "";
            if ($scope.gender != "") { gender = $scope.gender }
            else {
                gender = "F"
            }
            $scope.studpageAdmissionList = [];
            var TotalRecorddata = DrillDownExamService.GetCollegedataByMngtypeAndDistrictByCollegeDistrictID(AppSettings.ExamInstID, AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.Exam.CourseID, $scope.Exam.ExamID, $scope.Exam.MainGrpID, $scope.Exam.MediumID, $scope.Exam.CasteID);
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
        $scope.GetColOtherRecord = function (obj) {
            var gender = "";
            if ($scope.gender != "") { gender = $scope.gender }
            else {
                gender = "O"
            }
            $scope.studpageAdmissionList = [];
            var TotalRecorddata = DrillDownExamService.GetCollegedataByMngtypeAndDistrictByCollegeDistrictID(AppSettings.ExamInstID, AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.Exam.CourseID, $scope.Exam.ExamID, $scope.Exam.MainGrpID, $scope.Exam.MediumID, $scope.Exam.CasteID);
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

        $scope.PrintDashBoard = function ()
        {
            var divName = "";
            if ($scope.adminuser == true) {
                divName = "idtoDivPrintAdmin";
            }
            else {
                divName = "DivIdToPrint";
            }

            var divToPrint = document.getElementById(divName);

            var newWin = window.open('', 'Print-Window');

            newWin.document.open();

            newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');

            newWin.document.close();

            setTimeout(function () { newWin.close(); }, 10);
        } 
    });
});












