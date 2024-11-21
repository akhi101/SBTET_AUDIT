define(['app'], function (app) {
    app.controller("RptZoneDetailCenterListController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService, preExaminerAppointmentsService) {
        $scope.RptZoneDetailCenterList = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        varRptZoneDetailCenterListRightsdata = [];
        RptZoneDetailCenterListRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptZoneDetailCenterListRightsdata.length; i++) {
            if (RptZoneDetailCenterListRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.RptZoneDetailCenterList.PreZoneCntrID == 0) {
                    if (RptZoneDetailCenterListRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (RptZoneDetailCenterListRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (RptZoneDetailCenterListRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        $scope.ReportFormat = "R";

        $scope.reportTypes = [
            { ReportTypeName: 'General Theory', ReportType: '1' },
            { ReportTypeName: 'General Practical', ReportType: '2' },
            { ReportTypeName: 'Vocational Practical', ReportType: '3' },
            { ReportTypeName: 'Bridge Vocational Practical', ReportType: '4' },
            { ReportTypeName: 'Bridge Theory', ReportType: '5' }
        ];

        $scope.RptZoneDetailCenterList.ReportType = '1';
        $scope.RptZoneDetailCenterList.ReportName = "RptZoneDetailCenterList.rdlc";

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.RptZoneDetailCenterList.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            //$scope.GetCollegeData($scope.RptPracticalBatchList.DistrictID);
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });



        $scope.PrintZoneDetails = function () {
            if ($scope.ReportFormat == "R") {
                if (CheckValidation() == true) {
                    //var ReportName = "";
                    if (($scope.RptZoneDetailCenterList.ReportType == 1) || ($scope.RptZoneDetailCenterList.ReportType == 5)) {
                        $scope.RptZoneDetailCenterList.ReportName = "RptZoneDetailCenterList.rdlc";
                        $scope.RptZoneDetailCenterList.dsName = "ZoneDetails";
                    } else if ($scope.RptZoneDetailCenterList.ReportType == 2) {
                        $scope.RptZoneDetailCenterList.ReportName = "RptZoneDetailCenterListGenPract.rdlc";
                        $scope.RptZoneDetailCenterList.dsName = "dsZoneDetailsGenPract";
                    } else if ($scope.RptZoneDetailCenterList.ReportType == 3) {
                        $scope.RptZoneDetailCenterList.ReportName = "RptZoneDetailCenterListVOCPract.rdlc";
                        $scope.RptZoneDetailCenterList.dsName = "ZoneDetails";
                    } else if ($scope.RptZoneDetailCenterList.ReportType == 4) {
                        $scope.RptZoneDetailCenterList.ReportName = "RptZoneDetailCenterListVOCBridgePract.rdlc";
                        $scope.RptZoneDetailCenterList.dsName = "ZoneDetails";
                    }
                    var DistrictID = $scope.RptZoneDetailCenterList.DistrictID
                    var Urlstring = "api/PreZoneCenter/GetZoneDetails/?DistrictID=" + DistrictID + "&ExamInstID=" + AppSettings.ExamInstID + "&ReportType=" + $scope.RptZoneDetailCenterList.ReportType;
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
                            if (data[0].length == 0) {
                                reportModel.model.dataSources = [{ value: [], name: $scope.RptZoneDetailCenterList.dsName }];
                                reportModel._refreshReport();
                                alert("Data Not Found");
                                return;
                            }
                            //$("#reportviewer").ejReportViewer(
                            //    {
                            //        reportPath: $scope.RptZoneDetailCenterList.ReportName,
                            //    });
                            reportModel.model.dataSources = [{ value: data[0], name: $scope.RptZoneDetailCenterList.dsName }];
                            reportModel._refreshReport();
                        }
                    });
                }
            }
            else {
                if (CheckValidation() == true) {
                    var reportModel = $("#reportviewer").data('ejReportViewer');
                    var datasetName1 = "ZoneDetails";
                    reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                    reportModel._refreshReport();

                    var DistrictID = $scope.RptZoneDetailCenterList.DistrictID;
                    var ReportType = $scope.RptZoneDetailCenterList.ReportType;

                    preExaminerAppointmentsService.GetZoneDetailsText(DistrictID, AppSettings.ExamInstID, ReportType).then(function (results) {
                        if (results != "") {
                            $scope.RptZoneDetailCenterList = {};
                            var file = new Blob([results], { type: 'application/txt' });
                            var fileURL = URL.createObjectURL(file);
                            var date = new Date();
                            var fileName = "ZoneDetails(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").txt";
                            var a = document.createElement("a");
                            document.body.appendChild(a);
                            a.href = fileURL;
                            a.download = fileName;
                            a.click();
                            //$scope.LoadImg = false;
                        } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                    }, function (error) {
                        //$scope.DFormReportDetail = {};
                        alert(error.statusText);
                        $scope.LoadImg = false;
                    });


                    //var Urlstring = "api/PreZoneCenter/GetZoneDetailsText/?DistrictID=" + DistrictID + "&ExamInstID=" + AppSettings.ExamInstID + "&ReportType=" + $scope.RptZoneDetailCenterList.ReportType;
                    //$.ajax({
                    //    url: AppSettings.WebApiUrl + Urlstring,
                    //    dataType: "json",
                    //    type: "GET",
                    //    processData: false,
                    //    crossDomain: true,
                    //    async: false,
                    //    timeout: 5000,
                    //    success: function (result) {
                    //        var data = [];
                    //        data.push(result);
                    //        //var reportModel = $("#reportviewer").data('ejReportViewer');
                    //        //var datasetName1 = "ZoneDetails";
                    //        if (data[0].length == 0) {
                    //            //reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                    //            //reportModel._refreshReport();
                    //            alert("Data Not Found");
                    //            return;
                    //        }
                    //        if (result != "") {
                    //            $scope.RptZoneDetailCenterList = {};
                    //            var file = new Blob([result], { type: 'application/txt' });
                    //            var fileURL = URL.createObjectURL(file);
                    //            var date = new Date();
                    //            var fileName = "ZoneDetails(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").txt";
                    //            var a = document.createElement("a");
                    //            document.body.appendChild(a);
                    //            a.href = fileURL;
                    //            a.download = fileName;
                    //            a.click();
                    //        }
                    //        //reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                    //        //reportModel._refreshReport();
                    //    }
                    //    //, function(error) {
                    //    //    //$scope.DFormReportDetail = {};
                    //    //    alert(error.statusText);
                    //    //    $scope.LoadImg = false;
                    //    //}
                    
                    //});
                }


            }
        }

        //$scope.PrintZoneDetails = function () {
        //    if (CheckValidation() == true) {
        //        var DistrictID = $scope.RptZoneDetailCenterList.DistrictID
        //        var Urlstring = "api/PreZoneCenter/GetZoneDetails/?DistrictID=" + DistrictID + "&ExamInstID=" + AppSettings.ExamInstID + "&ReportType=" + $scope.RptZoneDetailCenterList.ReportType;
        //        $.ajax({
        //            url: AppSettings.WebApiUrl + Urlstring,
        //            dataType: "json",
        //            type: "GET",
        //            processData: false,
        //            crossDomain: true,
        //            async: false,
        //            timeout: 5000,
        //            success: function (result) {
        //                var data = [];
        //                data.push(result);
        //                var reportModel = $("#reportviewer").data('ejReportViewer');
        //                var datasetName1 = "ZoneDetails";
        //                if (data[0].length == 0) {
        //                    reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
        //                    reportModel._refreshReport();
        //                    alert("Data Not Found");
        //                    return;
        //                }
        //                reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
        //                reportModel._refreshReport();
        //            }
        //        });
        //    }
        //}

        function CheckValidation() {
            if (($scope.RptZoneDetailCenterList.DistrictID == undefined) || ($scope.RptZoneDetailCenterList.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.RptZoneDetailCenterList.ReportType == undefined) || ($scope.RptZoneDetailCenterList.ReportType == "")) {
                alert("Select Report Type");
                return false;
            }

            else {
                return true;
            }
        }
        //varRptZoneDetailCenterList = [];
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('CenterManagemnet');
        }
        $scope.getRptTypeChange = function (ReportType) {
            if ((ReportType == 1) || (ReportType == 5)) {
                $scope.RptZoneDetailCenterList.ReportName = "RptZoneDetailCenterList.rdlc";
                $scope.RptZoneDetailCenterList.DsName = "ZoneDetails";
            } else if (ReportType == 2) {
                $scope.RptZoneDetailCenterList.ReportName = "RptZoneDetailCenterListGenPract.rdlc";
                $scope.RptZoneDetailCenterList.DsName = "dsZoneDetailsGenPract";
            } else if (ReportType == 3) {
                $scope.RptZoneDetailCenterList.ReportName = "RptZoneDetailCenterListVOCPract.rdlc";
                $scope.RptZoneDetailCenterList.DsName = "ZoneDetails";
            } else if (ReportType == 4) {
                $scope.RptZoneDetailCenterList.ReportName = "RptZoneDetailCenterListVOCBridgePract.rdlc";
                $scope.RptZoneDetailCenterList.DsName = "ZoneDetails";
            }
            $("#reportviewer").ejReportViewer(
                {
                    isResponsive: true,
                    reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                    processingMode: ej.ReportViewer.ProcessingMode.Local,
                    reportPath: $scope.RptZoneDetailCenterList.ReportName,
                    dataSources: [{ value: [], name: $scope.RptZoneDetailCenterList.dsName }],
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
                //reportPath: "RptZoneDetailCenterListNew.rdlc",
                reportPath: $scope.RptZoneDetailCenterList.ReportName, 
                dataSources: [{ value: [], name: "" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
