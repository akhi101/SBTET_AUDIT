define(['app'], function (app) {
    app.controller("DrillDownController", function ($scope, $state, AppSettings, DrillDownService) {
        $scope.DrillDown = {}
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ListFormName == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        }
        var gridColumns = [
            { field: "CollegeDistrictID", headerText: "CollegeDistrictID", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "CollegeDistName", headerText: "Dist. Name", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "AcdYrID", headerText: "AcdYrID", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "Total", headerText: "Total", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "Male", headerText: "Male", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "Female", headerText: "Female", textAlign: ej.TextAlign.Left, width: 50 }
        ];
        var _grid = "";
        var _index = "";
        var _CollegeDistrictID = 0;
        var _AcdYrID = 0;
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
        var BasicManagementTypedata = DrillDownService.GetBasicManagementTypeList();
        BasicManagementTypedata.then(function (data) {
            $scope.BasicManagementTypeList = data;
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
            var CourseList = DrillDownService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (Coursedata, status, headers, config, error) {
                $scope.CourseList = Coursedata;
            }, function (error) {
                alert(error);
            });
        } else {
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
        $scope.strMngtTypID = "";
        $scope.Submit = function () {
            $scope.strMngtTypID = "";
            for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                if ($scope.BasicManagementTypeList[i].Selected) {
                    if ($scope.strMngtTypID == "") {
                        $scope.strMngtTypID = $scope.BasicManagementTypeList[i].MngtTypID;
                    }
                    else {
                        $scope.strMngtTypID = $scope.strMngtTypID + $scope.BasicManagementTypeList[i].MngtTypID;
                    }
                }
            }
            if ($scope.strMngtTypID == "") {
                alert("Select atleast single management type"); 
                return;
            }
            if (($scope.DrillDown.AcdYrID == "") || ($scope.DrillDown.AcdYrID == undefined)) {
                alert("Select Academic Year");
                return;
            }
            if (($scope.DrillDown.DistrictID == "") || ($scope.DrillDown.DistrictID == undefined)) {
                alert("Select District");
                return;
            }
            if (($scope.DrillDown.CourseID == "") || ($scope.DrillDown.CourseID == undefined)) {
                alert("Select Stream");
                return;
            }
            if (($scope.DrillDown.MainGrpID == "") || ($scope.DrillDown.MainGrpID == undefined)) {
                $scope.DrillDown.MainGrpID = 0;
            }
            if (($scope.DrillDown.MediumID == "") || ($scope.DrillDown.MediumID == undefined)) {
                $scope.DrillDown.MediumID = 0;
            }
            if (($scope.DrillDown.CasteID == "") || ($scope.DrillDown.CasteID == undefined)) {
                $scope.DrillDown.CasteID = 0;
            }
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListTESTByCollege(AppSettings.AcdYrID, $stateParams.CollegeDistrictID, $stateParams.Gender);
            TotalRecorddata.then(function (data) {
                if (data.length > 0) {
                    $scope.DrillDownList = data;
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetTotalRecord = function (obj) {
            $scope.colpageDrillDownList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID($stateParams.CollegeDistrictID, obj.CollegeID, "", obj.AcdYrID);
            TotalRecorddata.then(function (data) {
                $scope.colpageDrillDownList = data;
                $scope.ColPage = data[0];
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });
            //$state.go('Admission.DrillDownDistrictwiseList', { CollegeDistrictID: obj.CollegeDistrictID, Gender: "" });
        }
        $scope.GetMaleRecord = function (obj) {
            var _male = "M";
            $scope.colpageDrillDownList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID($stateParams.CollegeDistrictID, obj.CollegeID, _male, obj.AcdYrID);
            TotalRecorddata.then(function (data) {
                $scope.colpageDrillDownList = data;
                $scope.ColPage = data[0];
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });
            //$state.go('Admission.DrillDownDistrictwiseList', { CollegeDistrictID: obj.CollegeDistrictID, Gender: _male });
        }
        $scope.GetFemaleRecord = function (obj) {
            var _female = "F";
            $scope.colpageDrillDownList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID($stateParams.CollegeDistrictID, obj.CollegeID, _male, obj.AcdYrID);
            TotalRecorddata.then(function (data) {
                $scope.colpageDrillDownList = data;
                $scope.ColPage = data[0];
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });
           // $state.go('Admission.DrillDownDistrictwiseList', { CollegeDistrictID: obj.CollegeDistrictID, Gender: _female });
        }
        $scope.GetDrillDownStudentDetailsListByID = function (obj) {            
            $scope.SingleRecordList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByID(obj.PreStudRegID, obj.AcdYrID);
            TotalRecorddata.then(function (data) {
                $scope.StudentReg = data[0];
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });
        }




        //col page

        $scope.GetColTotalRecord = function (obj) {
            $scope.colpageDrillDownList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID($stateParams.CollegeDistrictID, obj.CollegeID, "", obj.AcdYrID);
            TotalRecorddata.then(function (data) {
                $scope.studpageDrillDownList = data;
                $scope.StudPage = data[0];
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetColMaleRecord = function (obj) {
            var _male = "M";
            $scope.colpageDrillDownList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID($stateParams.CollegeDistrictID, obj.CollegeID, _male, obj.AcdYrID);
            TotalRecorddata.then(function (data) {
                $scope.studpageDrillDownList = data;
                $scope.StudPage = data[0];
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetColFemaleRecord = function (obj) {
            var _female = "F";
            $scope.colpageDrillDownList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID($stateParams.CollegeDistrictID, obj.CollegeID, _male, obj.AcdYrID);
            TotalRecorddata.then(function (data) {
                $scope.studpageDrillDownList = data;
                $scope.StudPage = data[0];
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });
        }


        $scope.exportTableToExcel = function (tableid){
            //$('button').click(function () {
                var url = 'data:application/vnd.ms-excel,' + encodeURIComponent($(tableid).html())
                location.href = url
                return false
            //})
        }
    });
});