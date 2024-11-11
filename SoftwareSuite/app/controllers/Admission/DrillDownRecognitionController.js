define(['app'], function (app) {
    app.controller("DrillDownRecognitionController", function ($scope, $http, $localStorage, $state, AppSettings, DrillDownService) {
        $scope.DrillDownRecognition = {};
        $scope.adminuser = false;
        $scope.ifcoluser = false;
        var AcdYrList = DrillDownService.GetCurrentAcademicYearForDrillDown();
        AcdYrList.then(function (AcdYrdata, status, headers, config, error) {
            $scope.AcdYrList = AcdYrdata;
        }, function (error) {
            alert(error);
        });
        var DistrictList = DrillDownService.GetDistrictListByStateID(1);
        DistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.DistrictList = Districtdata;
        }, function (error) {
            alert(error);
            });

        var BasicManagementTypedata = DrillDownService.GetBasicManagementTypeListWithAll();
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
            else {
                for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                    if ($scope.BasicManagementTypeList[i].MngtTypID == 1) {
                        $scope.BasicManagementTypeList[i].Selected = true;
                        $scope.ifcoluser = false;
                    }
                }
                $("select#AcdYrID")[0].selectedIndex = 1;
                //$scope.Admission.AcdYrID = AppSettings.AcdYrID;
            }
        }, function (error) {
            alert(error);
        });
        var MediumList = DrillDownService.GetBasicMediumList();
        MediumList.then(function (SecondLangdata, status, headers, config, error) {
            $scope.MediumList = SecondLangdata;
        }, function (error) {
            alert(error);
        });
        var CasteList = DrillDownService.GetCasteList();
        CasteList.then(function (Castedata, status, headers, config, error) {
            $scope.CasteList = Castedata;
        }, function (error) {
            alert(error);
        });
        if (AppSettings.CollegeID != 0) {
            $scope.adminuser = false;
            var CourseList = DrillDownService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (Coursedata, status, headers, config, error) {
                $scope.CourseList = Coursedata;
            }, function (error) {
                alert(error);
            });
        } else {
            $scope.adminuser = true;
            var CourseList = DrillDownService.GetBasicCourseList();
            CourseList.then(function (Coursedata, status, headers, config, error) {
                $scope.CourseList = Coursedata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillCoursePart = function (CourseID) {
            if ((CourseID != null) && (CourseID != undefined) || (CourseID != "")) {
                var MainGroupList = DrillDownService.GetMainGroupListByCollegeId(AppSettings.CollegeID, CourseID, AppSettings.AcdYrID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupListdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillMedium = function (MainGrpID) {
            if((MainGrpID != null) && (MainGrpID != undefined) && (MainGrpID != "")) {
                var BranchList = DrillDownService.GetBasicBranchListByGroup(MainGrpID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                    $scope.DrillDownRecognition.BranchID = BasicBranchdata[0].BranchID;
                    if (AppSettings.CollegeID != 0) {
                        var MediumList = DrillDownService.GetBasicMediumInRegStud(AppSettings.CollegeID, BasicBranchdata[0].BranchID, AppSettings.AcdYrID);
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
                        $scope.MngtTypName = $scope.BasicManagementTypeList[i].MngtTypName;
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
            if (($scope.DrillDownRecognition.AcdYrID == "") || ($scope.DrillDownRecognition.AcdYrID == undefined)) {
                alert("Select Academic Year");
                return;
            }
            if (($scope.DrillDownRecognition.CourseID == "") || ($scope.DrillDownRecognition.CourseID == undefined)) {
                alert("Select Stream");
                return;
            }
            if (($scope.DrillDownRecognition.DistrictID == "") || ($scope.DrillDownRecognition.DistrictID == undefined)) {
                $scope.DrillDownRecognition.DistrictID = 0;
            }
            if (($scope.DrillDownRecognition.CourseID == "") || ($scope.DrillDownRecognition.CourseID == undefined)) {
                $scope.DrillDownRecognition.CourseID = 0;
            }
            if (($scope.DrillDownRecognition.MainGrpID == "") || ($scope.DrillDownRecognition.MainGrpID == undefined)) {
                $scope.DrillDownRecognition.MainGrpID = 0;
            }
            if (($scope.DrillDownRecognition.MediumID == "") || ($scope.DrillDownRecognition.MediumID == undefined)) {
                $scope.DrillDownRecognition.MediumID = 0;
            }
            if (($scope.DrillDownRecognition.CasteID == "") || ($scope.DrillDownRecognition.CasteID == undefined)) {
                $scope.DrillDownRecognition.CasteID = 0;
            }
            var Feestatus = 0;
            $scope.MngtTypName = "ALL";
            $scope.CourseName = "ALL";
            $scope.MainGrpName = "ALL";
            $scope.MediumName = "ALL";
            $scope.CasteName = "ALL";
            $scope.AcdYrName = "ALL";
            $scope.CollegeDistName = "ALL";
            for (var i = 0; i < $scope.AcdYrList.length; i++) {
                if ($scope.AcdYrList[i].AcdYrID == $scope.DrillDownRecognition.AcdYrID) {
                    $scope.AcdYrName = $scope.AcdYrList[i].AcdYrName;
                }
            }
            for (var i = 0; i < $scope.DistrictList.length; i++) {
                if ($scope.DistrictList[i].DistrictID == $scope.DrillDownRecognition.DistrictID) {
                    $scope.CollegeDistName = $scope.DistrictList[i].DistName;
                }
            }
            for (var i = 0; i < $scope.CourseList.length; i++) {
                if ($scope.CourseList[i].CourseID == $scope.DrillDownRecognition.CourseID) {
                    $scope.CourseName = $scope.CourseList[i].CourseName;
                }
            }
            for (var i = 0; i < $scope.MainGroupList.length; i++) {
                if ($scope.MainGroupList[i].MainGrpID == $scope.DrillDownRecognition.MainGrpID) {
                    $scope.MainGrpName = $scope.MainGroupList[i].MainGrpName;
                }
            }
            for (var i = 0; i < $scope.MediumList.length; i++) {
                if ($scope.MediumList[i].MediumID == $scope.DrillDownRecognition.MediumID) {
                    $scope.MediumName = $scope.MediumList[i].MediumName;
                }
            }

            if (AppSettings.CollegeID == 0) {
                var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsRecognitionFeeList(AppSettings.AcdYrID, $scope.DrillDownRecognition.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs, $scope.DrillDownRecognition.CourseID, 0, $scope.DrillDownRecognition.MainGrpID, $scope.DrillDownRecognition.MediumID, $scope.DrillDownRecognition.CasteID, Feestatus);
            }
            else {
                var gender = "";
                var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListRecognitionFeeByCollege(AppSettings.AcdYrID, $scope.DrillDownRecognition.DistrictID, AppSettings.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownRecognition.CourseID, 0, $scope.DrillDownRecognition.MainGrpID, $scope.DrillDownRecognition.MediumID, $scope.DrillDownRecognition.CasteID, Feestatus);
            }
            TotalRecorddata.then(function (data) {
                if (data.length > 0) {
                    if (AppSettings.CollegeID == 0) {
                        $scope.DrillDownList = data;
                    }
                    else {
                        $scope.colPageAdmissionListForfirst = data;
                    }
                    $scope.SetDefault();
                } else {
                    alert("Data Not Found.");
                    $scope.DrillDownList = [];
                    $scope.colPageAdmissionListForfirst = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.DrillDownList = [];
        $scope.colPageAdmissionListForfirst = [];
        $scope.GetNotPaidRecord = function (obj) {
            $scope.colPageAdmissionList = [];
            var Feestatus = 1;
            var gender = "";
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListRecognitionFeeByCollege(AppSettings.AcdYrID, obj.CollegeDistrictID, AppSettings.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownRecognition.CourseID, 0, $scope.DrillDownRecognition.MainGrpID, $scope.DrillDownRecognition.MediumID, $scope.DrillDownRecognition.CasteID, Feestatus);
            TotalRecorddata.then(function (data) {
                $scope.colPageAdmissionList = data;
                $scope.SetDefault();
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.colPageAdmissionList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetPaidRecord = function (obj) {
            $scope.colPageAdmissionList = [];
            var Feestatus = 2;
            var gender = "";
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListRecognitionFeeByCollege(AppSettings.AcdYrID, obj.CollegeDistrictID, AppSettings.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownRecognition.CourseID, 0, $scope.DrillDownRecognition.MainGrpID, $scope.DrillDownRecognition.MediumID, $scope.DrillDownRecognition.CasteID, Feestatus);
            TotalRecorddata.then(function (data) {
                $scope.colPageAdmissionList = data;
                $scope.SetDefault();
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.colPageAdmissionList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetTotalRecord = function (obj) {
            $scope.colPageAdmissionList = [];
            var Feestatus = 0;
            var gender = "";
            $scope.gender = "";
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListRecognitionFeeByCollege(AppSettings.AcdYrID, obj.CollegeDistrictID, AppSettings.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownRecognition.CourseID, 0, $scope.DrillDownRecognition.MainGrpID, $scope.DrillDownRecognition.MediumID, $scope.DrillDownRecognition.CasteID, Feestatus);
            TotalRecorddata.then(function (data) {
                $scope.colPageAdmissionList = data;
                $scope.SetDefault();
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
            var Feestatus = 0;
            var gender = "M";
            $scope.gender = "M";
            $scope.colPageAdmissionList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListTESTByCollege(AppSettings.AcdYrID, obj.CollegeDistrictID, AppSettings.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownRecognition.CourseID, 0, $scope.DrillDownRecognition.MainGrpID, $scope.DrillDownRecognition.MediumID, $scope.DrillDownRecognition.CasteID);
            TotalRecorddata.then(function (data) {
                $scope.colPageAdmissionList = data;
                $scope.SetDefault();
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
            var Feestatus = 0;
            var gender = "F";
            $scope.gender = "F";
            $scope.colPageAdmissionList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListTESTByCollege(AppSettings.AcdYrID, obj.CollegeDistrictID, AppSettings.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownRecognition.CourseID, 0, $scope.DrillDownRecognition.MainGrpID, $scope.DrillDownRecognition.MediumID, $scope.DrillDownRecognition.CasteID);
            TotalRecorddata.then(function (data) {
                $scope.colPageAdmissionList = data;
                $scope.SetDefault();
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
            var Feestatus = 0;
            var gender = "O";
            $scope.gender = "O";
            $scope.colPageAdmissionList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListTESTByCollege(AppSettings.AcdYrID, obj.CollegeDistrictID, AppSettings.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownRecognition.CourseID, 0, $scope.DrillDownRecognition.MainGrpID, $scope.DrillDownRecognition.MediumID, $scope.DrillDownRecognition.CasteID);
            TotalRecorddata.then(function (data) {
                $scope.colPageAdmissionList = data;
                $scope.SetDefault();
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.colPageAdmissionList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetDrillDownStudentDetailsListByID = function (obj) {
            $scope.SingleRecordList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByID(obj.PreStudRegID, obj.AcdYrID);
            TotalRecorddata.then(function (data) {
                $scope.StudentReg = data[0];
                $scope.SetDefault();
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.StudentReg = [];
                }
            }, function (error) {
                alert(error);
            });
        }


        //col page
        $scope.GetColNotPaidRecord = function (obj) {
            $scope.studpageAdmissionList = [];
            var Feestatus = 1;
            var gender = "";
            if ($scope.gender != "") { gender = $scope.gender }
            else {
                gender = ""
            }
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID(AppSettings.AcdYrID, $scope.DrillDownRecognition.DistrictID, AppSettings.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownRecognition.CourseID, 0, $scope.DrillDownRecognition.MainGrpID, $scope.DrillDownRecognition.MediumID, $scope.DrillDownRecognition.CasteID, Feestatus);
            TotalRecorddata.then(function (data) {
                $scope.studpageAdmissionList = data;
                $scope.SetDefault();
                if (data.length > 0) {
                } else { alert("Data Not Found."); $scope.studpageAdmissionList = [];}
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetColPaidRecord = function (obj) {
            $scope.studpageAdmissionList = [];
            var Feestatus = 2;
            var gender = "";
            if ($scope.gender != "") { gender = $scope.gender }
            else {
                gender = ""
            }
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID(AppSettings.AcdYrID, $scope.DrillDownRecognition.DistrictID, AppSettings.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownRecognition.CourseID, 0, $scope.DrillDownRecognition.MainGrpID, $scope.DrillDownRecognition.MediumID, $scope.DrillDownRecognition.CasteID, Feestatus);
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
        $scope.GetColTotalRecord = function (obj) {
            $scope.studpageAdmissionList = [];
            var Feestatus = 0;
            var gender = "";
            if ($scope.gender != "") { gender = $scope.gender }
            else {
                gender = ""
            }
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID(AppSettings.AcdYrID, $scope.DrillDownRecognition.DistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownRecognition.CourseID, 0, $scope.DrillDownRecognition.MainGrpID, $scope.DrillDownRecognition.MediumID, $scope.DrillDownRecognition.CasteID, Feestatus);
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
            var Feestatus = 0;
            var gender = "";
            if ($scope.gender != "") { gender = $scope.gender }
            else {
                gender = "M"
            }
            $scope.studpageAdmissionList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID(AppSettings.AcdYrID, $scope.DrillDownRecognition.DistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownRecognition.CourseID, 0, $scope.DrillDownRecognition.MainGrpID, $scope.DrillDownRecognition.MediumID, $scope.DrillDownRecognition.CasteID, Feestatus);
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
            var Feestatus = 0;
            var gender = "";
            if ($scope.gender != "") { gender = $scope.gender }
            else {
                gender = "F"
            }
            $scope.studpageAdmissionList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID(AppSettings.AcdYrID, $scope.DrillDownRecognition.DistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownRecognition.CourseID, 0, $scope.DrillDownRecognition.MainGrpID, $scope.DrillDownRecognition.MediumID, $scope.DrillDownRecognition.CasteID, Feestatus);
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
            var Feestatus = 0;
            var gender = "";
            if ($scope.gender != "") { gender = $scope.gender }
            else {
                gender = "O"
            }
            $scope.studpageAdmissionList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID(AppSettings.AcdYrID, $scope.DrillDownRecognition.DistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownRecognition.CourseID, 0, $scope.DrillDownRecognition.MainGrpID, $scope.DrillDownRecognition.MediumID, $scope.DrillDownRecognition.CasteID, Feestatus);
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
        $scope.exportTableToExcel = function (tableid) {
            var url = 'data:application/vnd.ms-excel,' + encodeURIComponent($(tableid).html())
            location.href = url
            return false
        }
        $scope.SetDefault = function () {
            $scope.MngtTypName = $scope.MngtTypName;
            $scope.CourseName = $scope.CourseName;
            $scope.MainGrpName = $scope.MainGrpName;
            $scope.MediumName = $scope.MediumName;
            $scope.CasteName = $scope.CasteName;
            $scope.AcdYrName = $scope.AcdYrName;
            $scope.CollegeDistName = $scope.CollegeDistName;
        }
       
    });
});
