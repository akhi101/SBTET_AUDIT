define(['app'], function (app) {
    app.controller("DioApprovalController", function ($scope, $state, $stateParams, $window, AppSettings, BasicDistrictsService, PreZoneService, PreZoneCenterService) {
        $scope.DioApproval = {};
        //if ($stateParams.T == "") {
        //    $scope.DioApproval.ZoneType = 1;
        //}
        //if ($stateParams.G == "") {
        //    $scope.DioApproval.ZoneType = 2;
        //}
        //if ($stateParams.V == "") {
        //    $scope.DioApproval.ZoneType = 3;
        //}
        //if ($stateParams.B == "") {
        //    $scope.DioApproval.ZoneType = 4;
        //}
        $scope.reportTypes = [
            { ReportTypeName: 'General Theory', ReportType: '1' },
            { ReportTypeName: 'General Practical', ReportType: '2' },
            { ReportTypeName: 'Vocational Practical', ReportType: '3' },
            { ReportTypeName: 'Bridge Vocational Practical', ReportType: '4' },
            { ReportTypeName: 'Bridge Theory', ReportType: '5' }
        ];
        var PageNm = $state.current.name.split(".")[1] + "List";
        varDioApprovalRightsdata = [];
        DioApprovalRightsdata = AppSettings.UserRights;
        for (var i = 0; i < DioApprovalRightsdata.length; i++) {
            if (DioApprovalRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.DioApproval.PreZoneCntrID == 0) {
                    if (DioApprovalRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (DioApprovalRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (DioApprovalRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
        }, function (DistrictData, status, headers, config) {
            alert(error);
            });
        $scope.LoadImg = false;
        $scope.PrintZoneDetails = function () {
            if (CheckValidation() == true) {
                $scope.LoadImg = true;
                var DistrictID = $scope.DioApproval.DistrictID
                //var ReportName = "";
                //var DsName = "";
                //if (($scope.DioApproval.ReportType == 1) || ($scope.DioApproval.ReportType == 5)) {
                //    ReportName = "RptZoneDetailCenterList.rdlc";
                //    DsName = "ZoneDetails";
                //} else if ($scope.DioApproval.ReportType == 2) {
                //    ReportName = "RptZoneDetailCenterListGenPract.rdlc";
                //    DsName = "dsZoneDetailsGenPract";
                //} else if ($scope.DioApproval.ReportType == 3) {
                //    ReportName = "RptZoneDetailCenterListVOCPract.rdlc";
                //    DsName = "ZoneDetails";
                //} else if ($scope.DioApproval.ReportType == 4) {
                //    ReportName = "RptZoneDetailCenterListVOCBridgePract.rdlc";
                //    DsName = "ZoneDetails";
                //}
                var Urlstring = "api/PreZoneCenter/GetZoneDetails/?DistrictID=" + DistrictID + "&ExamInstID=" + AppSettings.ExamInstID + "&ReportType=" + $scope.DioApproval.ReportType;
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
                            reportModel.model.dataSources = [{ value: [], name: $scope.DsName }];
                            reportModel._refreshReport();
                            alert("Data Not Found");
                            $scope.LoadImg = false;
                            return;
                        }
                        $scope.LoadImg = false;
                        //$("#reportviewer").ejReportViewer(
                        //    {
                        //        reportPath: ReportName,
                        //    });
                        reportModel.model.dataSources = [{ value: data[0], name: $scope.DsName }];
                        reportModel._refreshReport();
                    }
                });
            }
        }
        $scope.GetPreCentreAuthData = function () {
            if ($scope.DioApproval.DistrictID == undefined) {
                $scope.DioApproval.DistrictID = "";
            }
            if ($scope.DioApproval.DistrictID != "") {
                var getPromise = PreZoneCenterService.GetPreCentreAuthData(AppSettings.ExamInstID, AppSettings.LoggedUserId, $scope.DioApproval.DistrictID, AppSettings.SysUsrGrpID, $scope.DioApproval.ReportType);
                getPromise.then(function (data) {
                    if (data > 0) {
                        $scope.isupdatableDisable = true;
                    } else {
                        $scope.isupdatableDisable = false;
                    }
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.SubmitApproval = function () {
            if (CheckValidation() == true) {
                var isConfirmed = confirm("Are you sure to forward this record ?");
                if (isConfirmed) {
                    var getPromise = PreZoneService.GetUpdateDioApproval(AppSettings.ExamInstID, AppSettings.LoggedUserId, $scope.DioApproval.DistrictID, AppSettings.SysUsrGrpID, $scope.DioApproval.ReportType);
                    getPromise.then(function (data) {
                        if (data == "Reject") {
                            alert("Approval Rejected,some work is pending please check it....");
                        } else {
                            alert("Approval Accepted");
                        }
                        RedirectToListPage();
                    }, function (error) {
                        $scope.RollEditDisable = false;
                        alert(error);
                    });
                }

            }
        }
        function CheckValidation() {
            if (($scope.DioApproval.ReportType == undefined) || ($scope.DioApproval.ReportType == "")) {
                alert("Select Report Type");
                return false;
            }
            if (($scope.DioApproval.DistrictID == undefined) || ($scope.DioApproval.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            else {
                return true;
            }
        }
        //varDioApproval = [];
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('CenterManagemnet');
        }
        $scope.DioApproval.ReportType = 1;
        $scope.ReportName = "RptZoneDetailCenterList.rdlc";
        //$scope.DsName = "ZoneDetails";
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
            if (CheckValidation() == true) {
                $scope.LoadImg = true;
                var DistrictID = $scope.DioApproval.DistrictID;
                var ReportName = "";
                if (($scope.DioApproval.ReportType == 1) || ($scope.DioApproval.ReportType == 5)) {
                    ReportName = "RptZoneDetailCenterList.rdlc";
                } else if ($scope.DioApproval.ReportType == 2) {
                    ReportName = "RptZoneDetailCenterListGenPract.rdlc";
                } else if ($scope.DioApproval.ReportType == 3) {
                    ReportName = "RptZoneDetailCenterListVOCPract.rdlc";
                } else if ($scope.DioApproval.ReportType == 4) {
                    ReportName = "RptZoneDetailCenterListVOCBridgePract.rdlc";
                }
                var getPromise = PreZoneCenterService.GetZoneDetailsPDF(DistrictID, AppSettings.ExamInstID, $scope.DioApproval.ReportType);
                    getPromise.then(function (data) {
                        if (data > 0) {
                            var url = AppSettings.PreZoneDigiSign + DistrictID;
                            $window.open(url, '_blank');
                        } else {
                            alert("Pdf Generation Error.");
                        }
                        $scope.LoadImg = false;
                    }, function (error) {
                        alert(error);
                        $scope.LoadImg = false;
                    });
            }
        }
    });
});
