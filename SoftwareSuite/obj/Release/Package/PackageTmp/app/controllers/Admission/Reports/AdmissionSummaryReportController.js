define(['app'], function (app) {
    app.controller("AdmissionSummaryReportController", function ($scope, $http, $localStorage, $state, AppSettings, AdmissionSummaryReportService) {
        $scope.DrillDownAdmission = {};
        $scope.adminuser = false;
        $scope.ifcoluser = false;
        $scope.Branch = "1,2";
        var AcdYrList = AdmissionSummaryReportService.GetCurrentAcademicYearForDrillDown();
        AcdYrList.then(function (AcdYrdata, status, headers, config, error) {
            $scope.AcdYrList = AcdYrdata;
        }, function (error) {
            alert(error);
        });
        var DistrictList = AdmissionSummaryReportService.GetDistrictListByStateID(1);
        DistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.DistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });
        var BasicManagementTypedata = AdmissionSummaryReportService.GetBasicManagementTypeList();
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

        $scope.VocGen = "G";

        $scope.changeVocGen = function (VocGen) {
            $scope.VocGen = VocGen;
            if ($scope.VocGen == "G") {
                $scope.Branch = "1,2";
            }
            else if ($scope.VocGen == "V") {
                $scope.Branch = "3";
            }
        }

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

                var TotalRecorddata = AdmissionSummaryReportService.GetDrillDownAdmissionReport(AppSettings.AcdYrID, AppSettings.CollegeID, $scope.Branch);

            TotalRecorddata.then(function (data) {
                if (data.length > 0) {
                    $scope.DrillDownList = data;
                    var SumEnglish = 0;
                    var SumTelugu = 0;
                    var SumHindi = 0;
                    var SumUrdu = 0;
                    var SumMarathi = 0;
                    var SumKanada = 0;
                    var SumOdisha = 0;

                    for (var i = 0; i < data.length; i++) {
                        SumEnglish += data[i]["English"];
                        SumTelugu += data[i]["Telugu"];
                        SumHindi += data[i]["Hindi"];
                        SumUrdu += data[i]["Urdu"];
                        SumMarathi += data[i]["Marathi"];
                        SumKanada += data[i]["Kanada"];
                        SumOdisha += data[i]["Odisha"];
                    }

                    var TotalAdmissions = 0;
                    TotalAdmissions = SumEnglish + SumTelugu + SumHindi + SumUrdu + SumMarathi + SumKanada + SumOdisha;

                    if (SumHindi>0) {
                        $scope.Hindi = true;
                        $scope.DrillDownList.SumHindi = SumHindi;
                    }
                    else {
                        $scope.Hindi = false;
                    }
                    if (SumEnglish>0) {
                        $scope.English = true;
                        $scope.DrillDownList.SumEnglish = SumEnglish;
                    }
                    else {
                        $scope.English = false;
                    }

                    if (SumTelugu>0) {
                        $scope.Telugu = true;
                        $scope.DrillDownList.SumTelugu = SumTelugu;
                    }
                    else {
                        $scope.Telugu = false;
                    }

                    if (SumUrdu>0) {
                        $scope.Urdu = true;
                        $scope.DrillDownList.TotalAdmissions = TotalAdmissions;
                    }
                    else {
                        $scope.Urdu = false;
                    }
                    $scope.DrillDownList.SumUrdu = SumUrdu;
                }
                else {
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
            var TotalRecorddata = AdmissionSummaryReportService.GetCandidateByCollege(AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, $scope.MngtTypIDs);
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