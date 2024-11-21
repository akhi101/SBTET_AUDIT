define(['app'], function (app) {
    app.controller("PreCenterAuthController", function ($scope, $state, $window, $stateParams, AppSettings, BasicDistrictsService, PreZoneCenterService) {
        $scope.PreCenterAuth = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        varPreCenterAuthRightsdata = [];
        var UsrGrpID = 0;
        $scope.LoadImg = "";
        $scope.ShowPdf = false;
        $scope.ShowDigiSign = false;
        $scope.DigiSignPDFURL = "";
        $scope.DigiSignDisable = false;
        $scope.HidelabelnextLevelStatus = true;
        PreCenterAuthRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreCenterAuthRightsdata.length; i++) {
            if (PreCenterAuthRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreCenterAuth.PreZoneCntrID == 0) {
                    if (PreCenterAuthRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreCenterAuthRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreCenterAuthRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        if (AppSettings.SysUsrGrpID == 9) {
            UsrGrpID = 7;
            $scope.PreCenterAuth.BtnText = "Forward";
        } else if (AppSettings.SysUsrGrpID == 2) {
            UsrGrpID = 9;
            $scope.PreCenterAuth.BtnText = "Forward";
        } else if (AppSettings.SysUsrGrpID == 11) {
            UsrGrpID = 2;
            $scope.PreCenterAuth.BtnText = "Forward";
        } else if (AppSettings.SysUsrGrpID == 23) {
            UsrGrpID = 11;
            $scope.PreCenterAuth.BtnText = "Approve";
        }
        //else if (AppSettings.SysUsrGrpID == 23) {
        //    UsrGrpID = 11;
        //}
        if (AppSettings.SysUsrGrpID == 23) {
            $scope.HidelabelnextLevelStatus = false;
        }
        else {
            $scope.HidelabelnextLevelStatus = true;
        }

        $scope.reportTypes = [
            { ReportTypeName: 'General Theory', ReportType: '1' },
            { ReportTypeName: 'General Practical', ReportType: '2' },
            { ReportTypeName: 'Vocational Practical', ReportType: '3' },
            { ReportTypeName: 'Bridge Vocational Practical', ReportType: '4' },
            { ReportTypeName: 'Bridge Theory', ReportType: '5' }
        ];
        ////var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByUserGroupId(AppSettings.DistrictIDs, UsrGrpID, AppSettings.SysUsrGrpID);


        var BasicDistrictList = [];
        if (AppSettings.SysUsrGrpID != 23) {
            BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByUserGroupId(AppSettings.DistrictIDs, UsrGrpID, AppSettings.SysUsrGrpID);
        } else {
            BasicDistrictList = BasicDistrictsService.GetDistrictListForCOE(AppSettings.ExamInstID, $scope.PreCenterAuth.ReportType);
        }
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
        }, function (DistrictData, status, headers, config) {
            alert(error);
            });

        $scope.GetZoneDistrictList = function ()
        {
            var BasicDistrictList = [];
            if (AppSettings.SysUsrGrpID != 23) {
                BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByUserGroupId(AppSettings.DistrictIDs, UsrGrpID, AppSettings.SysUsrGrpID);
                $scope.GetPreCentreAuthData();
            } else {
                BasicDistrictList = BasicDistrictsService.GetDistrictListForCOE(AppSettings.ExamInstID, $scope.PreCenterAuth.ReportType);
                $scope.GetPreCentreAuthData();
            }
            BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                $scope.BasicDistrictList = DistrictData;
            }, function (DistrictData, status, headers, config) {
                alert(error);
                });
        }

        $scope.PrintZoneDetails = function () {
            if (CheckValidation() == true) {
                var DistrictID = $scope.PreCenterAuth.DistrictID
                var Urlstring = "api/PreZoneCenter/GetZoneDetails/?DistrictID=" + DistrictID + "&ExamInstID=" + AppSettings.ExamInstID + "&ReportType=" + $scope.PreCenterAuth.ReportType;
                $.ajax({
                    url: AppSettings.WebApiUrl + Urlstring,
                    dataType: "json",
                    type: "GET",
                    processData: false,
                    crossDomain: true,
                    async: false,
                    timeout: 5000,
                    success: function (result) {
                        var data = [];
                        data.push(result);
                        var reportModel = $("#reportviewer").data('ejReportViewer');
                        //var datasetName1 = "ZoneDetails";
                        if (data[0].length == 0) {
                            reportModel.model.dataSources = [{ value: [], name: $scope.DsName  }];
                            reportModel._refreshReport();
                            alert("Data Not Found");
                            return;
                        }
                        reportModel.model.dataSources = [{ value: data[0], name: $scope.DsName  }];
                        reportModel._refreshReport();
                    }
                });
            }
        }
        $scope.GetPreCentreAuthData = function () {
            if ($scope.PreCenterAuth.DistrictID == undefined) {
                $scope.PreCenterAuth.DistrictID = "";
            }
            if ($scope.PreCenterAuth.DistrictID != "") {
                var getPromise = PreZoneCenterService.GetPreCentreAuthData(AppSettings.ExamInstID, AppSettings.LoggedUserId, $scope.PreCenterAuth.DistrictID, AppSettings.SysUsrGrpID, $scope.PreCenterAuth.ReportType);
                getPromise.then(function (data) {
                    $scope.ShowPdf = false;


                    $scope.PreCenterAuth.SUPRemark = data[0].SUPRemark;
                    $scope.PreCenterAuth.AuthRemark = data[0].AuthRemark;
                    $scope.PreCenterAuth.JSRemark = data[0].JSRemark;
                    $scope.PreCenterAuth.COERemark = data[0].COERemark;

                    if ((data[0].PrevLvl == "A") && (data[0].CurrLvl == "R") && (data[0].NextLvl == "R")) {
                        $scope.isupdatableDisable = false;
                        if (AppSettings.SysUsrGrpID == 9) {
                            $scope.PreCenterAuth.StatusRemark =  "Previous Level Approved";
                        } else
                        {
                            $scope.PreCenterAuth.StatusRemark = data[0].StatusRemark;// "Previous Level Approved";
                        }
                        
                        $scope.PreCenterAuth.StatusRemarkTitleNxtLevel = "Next Level Not Approved";
                    } else {
                        $scope.isupdatableDisable = true;
                        if ((data[0].NextLvl == "A")) {
                            $scope.PreCenterAuth.StatusRemarkTitleNxtLevel = "Next Level Approved";
                        }
                        else {
                            $scope.PreCenterAuth.StatusRemarkTitleNxtLevel = "Next Level Not Approved";
                        }
                        if ((data[0].PrevLvl == "R")) {
                            $scope.PreCenterAuth.StatusRemark = "Previous Level Not Approved";
                        }
                        else {
                            //$scope.PreCenterAuth.StatusRemark = data[0].StatusRemark;

                            if (AppSettings.SysUsrGrpID == 9) {
                                $scope.PreCenterAuth.StatusRemark = "Previous Level Approved";
                            } else {
                                $scope.PreCenterAuth.StatusRemark = data[0].StatusRemark;// "Previous Level Approved";
                            }

                        }
                    }
                    if (AppSettings.SysUsrGrpID == 23) {
                        $scope.PreCenterAuth.StatusRemarkTitleNxtLevel = "";
                    }
                    if ((data[0].CurrLvl == "A") && (AppSettings.SysUsrGrpID == 23)) {
                        var getPromise = PreZoneCenterService.GetPreCentreAuthDigiSign(AppSettings.ExamInstID, AppSettings.LoggedUserId, $scope.PreCenterAuth.DistrictID, $scope.PreCenterAuth.ReportType);
                        getPromise.then(function (data) {
                            $scope.getRptTypeChange($scope.PreCenterAuth.ReportType);
                            if (data[0].DigiSignBy != "" && data[0].DigiSignBy != undefined && data[0].DigiSignBy != null) {
                                $scope.DigiSignPDFURL = data[0].DigiSignPDFURL;
                                $scope.ShowPdf = true;
                                $scope.ShowDigiSign = false;
                            }
                            else {
                                $scope.ShowPdf = false;
                                $scope.ShowDigiSign = true;
                            }
                        }, function (error) {
                            alert(error);
                        });
                    }
                    else {
                        $scope.getRptTypeChange($scope.PreCenterAuth.ReportType);
                        $scope.ShowDigiSign = false;
                    }
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.SubmitApproval = function () {
            Update("A");
        }
        $scope.SubmitReject = function () {
            Update("R");
        }
        var Update = function (Flg) {
            if (CheckValidation() == true) {
                if ($scope.PreCenterAuth.Remark == undefined) {
                    alert("Enter Remark");
                    return;
                }
                if (AppSettings.SysUsrGrpID == 23) {
                    $scope.PreCenterAuth.ApprFwd = "approve";
                } else { $scope.PreCenterAuth.ApprFwd = "forward"; }
                var isConfirmed = confirm("Are you sure to " + $scope.PreCenterAuth.ApprFwd + " this record ?");
                if (isConfirmed) {
                    var getPromise = PreZoneCenterService.GetUpdatePreCenterAuth(Flg, $scope.PreCenterAuth.Remark, AppSettings.ExamInstID, AppSettings.LoggedUserId, $scope.PreCenterAuth.DistrictID, UsrGrpID, AppSettings.SysUsrGrpID, $scope.PreCenterAuth.ReportType);
                    getPromise.then(function (data) {
                        if (Flg == "R") {
                            alert("Rejected successfully");
                        } else {
                            alert("Approved successfully");
                            $scope.isupdatableDisable = true;
                            if (AppSettings.SysUsrGrpID == 23) {
                                $scope.ShowDigiSign = true;
                            }
                            else {
                                $scope.ShowDigiSign = false;
                            }
                        }
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        $scope.RollEditDisable = false;
                        alert(error);
                    });
                }

            }
        }
        function CheckValidation() {
            if (($scope.PreCenterAuth.DistrictID == undefined) || ($scope.PreCenterAuth.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            else {
                return true;
            }
        }
        //varPreCenterAuth = [];
        $scope.Exit = function () {
            //RedirectToListPage();
            $state.go('CenterManagemnet');
        }
        function RedirectToListPage() {
            $state.go('CenterManagemnet.PreCenterAuth');
        }
        $scope.PreCenterAuth.ReportType = 1;
        $scope.ReportName = "RptZoneDetailCenterList.rdlc"
        $scope.getRptTypeChange = function (ReportType) {
            if ((ReportType == 1) || (ReportType == 5)) {
                $scope.ReportName = "RptZoneDetailCenterList.rdlc";
                $scope.DsName = "ZoneDetails";
            } else if (ReportType == 2) {
                $scope.ReportName = "RptZoneDetailCenterListGenPract.rdlc";
                $scope.DsName = "dsZoneDetailsGenPract";
            } else if (ReportType == 3) {
                $scope.ReportName = "RptZoneDetailCenterListVOCPract.rdlc";
                $scope.DsName = "ZoneDetails";
            } else if (ReportType == 4) {
                $scope.ReportName = "RptZoneDetailCenterListVOCBridgePract.rdlc";
                $scope.DsName = "ZoneDetails";
            }
            $("#reportviewer").ejReportViewer(
                {
                    isResponsive: true,
                    reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                    processingMode: ej.ReportViewer.ProcessingMode.Local,
                    reportPath: $scope.ReportName,
                    dataSources: [{ value: [], name: $scope.DsName }],
                    toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                    reportError: function (args) {
                        if (args.dataSources != undefined) {
                            alert("Error...Some error occured in processing report");
                        }
                    }
                });
        }
        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: $scope.ReportName,
                dataSources: [{ value: [], name: $scope.DsName }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });

        $scope.DigiSign = function () {
            $scope.DigiSignDisable = true;
            if (CheckValidation() == true) {
                $scope.LoadImg = true;
                var DistrictID = $scope.PreCenterAuth.DistrictID;
                var getPromise = PreZoneCenterService.GetZoneDetailsPDF(DistrictID, AppSettings.ExamInstID, $scope.PreCenterAuth.ReportType);
                getPromise.then(function (data) {
                    if (data > 0) {
                        var url = AppSettings.PreZoneDigiSign + "ExamInstID=" + AppSettings.ExamInstID + "&SysUserID=" + AppSettings.LoggedUserId + "&DistrictID=" + DistrictID + "&ReportType=" + $scope.PreCenterAuth.ReportType;
                        $window.open(url, '_blank');
                    } else {
                        alert("Pdf Generation Error.");
                        $scope.DigiSignDisable = false;
                    }
                    $scope.LoadImg = false;
                }, function (error) {
                    alert(error);
                    $scope.DigiSignDisable = false;
                    $scope.LoadImg = false;
                });
            }
        };
    });
});
