define(['app'], function (app) {
    app.controller("DrillDownAdmissionController", function ($scope, $http, $localStorage, $state, AppSettings, DrillDownAdmissionService) {
        $scope.DrillDownAdmission = {};
        $scope.adminuser = false;
        $scope.ifcoluser = false;
        var AcdYrList = DrillDownAdmissionService.GetCurrentAcademicYearForDrillDown();
        AcdYrList.then(function (AcdYrdata, status, headers, config, error) {
            $scope.AcdYrList = AcdYrdata;
        }, function (error) {
            alert(error);
        });
        var DistrictList = DrillDownAdmissionService.GetDistrictListByStateID(1);
        DistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.DistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });
        var BasicManagementTypedata = DrillDownAdmissionService.GetBasicManagementTypeList();
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
                    if ($scope.BasicManagementTypeList[i].MngtTypID == 21) {
                        $scope.BasicManagementTypeList[i].Selected = true;
                        $scope.ifcoluser = false;
                    }
                }
            }
        }, function (error) {
            alert(error);
            });

        $("select#AcdYrID")[0].selectedIndex = 1;

        if ((AppSettings.SysUsrGrpID == 1) || (AppSettings.SysUsrGrpID == 7)) {
            $scope.adminUserMgmtType = true;
        }
        else {
            $scope.adminUserMgmtType = false;
        }

        if (AppSettings.SysUsrGrpID == 1) {
            $scope.adminUserDistricts = true;
        }
        else {
            $scope.adminUserDistricts = false;
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
            if (($scope.DrillDownAdmission.AcdYrID == "") || ($scope.DrillDownAdmission.AcdYrID == undefined)) {
                alert("Select Academic Year");
                return;
            }
            if (($scope.DrillDownAdmission.DistrictID == "") || ($scope.DrillDownAdmission.DistrictID == undefined)) {
                $scope.DrillDownAdmission.DistrictID = 0;
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
                if ($scope.AcdYrList[i].AcdYrID == $scope.DrillDownAdmission.AcdYrID) {
                    $scope.AcdYrName = $scope.AcdYrList[i].AcdYrName;
                }
            }
            for (var i = 0; i < $scope.DistrictList.length; i++) {
                if ($scope.DistrictList[i].DistrictID == $scope.DrillDownAdmission.DistrictID) {
                    $scope.CollegeDistName = $scope.DistrictList[i].DistName;
                }
            }
            //var TotalRecorddata = DrillDownAdmissionService.GetDrillDownAdmissionReport(AppSettings.AcdYrID, $scope.DrillDownAdmission.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs);

            if (AppSettings.CollegeID == 0) {
                var TotalRecorddata = DrillDownAdmissionService.GetDrillDownAdmissionReport(AppSettings.AcdYrID, $scope.DrillDownAdmission.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs);
            }
            else {
                var gender = "";
                var TotalRecorddata = DrillDownAdmissionService.GetDrillDownAdmissionReportByCollege(AppSettings.AcdYrID, $scope.DrillDownAdmission.DistrictID, AppSettings.CollegeID, $scope.MngtTypIDs);
            }
            TotalRecorddata.then(function (data) {
                if (data.length > 0) {
                    $scope.DrillDownList = data;
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

        $scope.GetCandidates = function (obj) {
            $scope.colPageAdmissionList = [];
            var TotalRecorddata = DrillDownAdmissionService.GetCandidateByCollege(AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, $scope.MngtTypIDs);
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
    });
});