define(['app'], function (app) {
    app.controller("CenterConstitutionReportController", function ($scope, $state, $localStorage, AppSettings, BasicDistrictsService) {
        $scope.CenterConstitutionReport = {};
        var authData = $localStorage.authorizationData;
       // AppSettings.SysUsrGrpID = authData.SysUserGrpID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;

        var PageNm = $state.current.name.split(".")[1] + "List";
        var ConstitutionReportRightsdata = [];
        ConstitutionReportRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ConstitutionReportRightsdata.length; i++) {
            if (ConstitutionReportRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.CenterConstitutionReport.PreZoneCntrID == 0) {
                    if (ConstitutionReportRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ConstitutionReportRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ConstitutionReportRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        $scope.reportTypes = [
            { ReportTypeName: 'General Theory', ReportType: '1' },
            { ReportTypeName: 'General Practical', ReportType: '2' },
            { ReportTypeName: 'Vocational Practical', ReportType: '3' },
            { ReportTypeName: 'Bridge Vocational Practical', ReportType: '4' },
            { ReportTypeName: 'Bridge Theory', ReportType: '5' }
        ];

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.CenterConstitutionReport.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
        }, function (Castdata, status, headers, config) {
            alert(error);
        });

        
            $scope.PrintCenterConstitutionReport = function () {
                if (CheckValidation() == true) {
                    var Urlstring = "api/PreZoneCenter/GenerateConstitutionReport/?DistrictID=" + $scope.CenterConstitutionReport.DistrictID + "&ExamInstID=" + AppSettings.ExamInstID + "&ReportType=" + $scope.CenterConstitutionReport.ReportType;
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



                            var datasetName1 = "dsCenterConstitutionRep";
                            if (data[0].length == 0) {
                                reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                                reportModel._refreshReport();
                                alert("Data Not Found");
                                return;
                            }
                            reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                            reportModel._refreshReport();
                        }
                    });
                }
            }

            $("#reportviewer").ejReportViewer(
                {
                    isResponsive: true,
                    reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                    processingMode: ej.ReportViewer.ProcessingMode.Local,
                    reportPath: "RptCenterConstitution.rdlc",
                    dataSources: [{ value: [], name: "dsCenterConstitutionRep" }],
                    toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                    reportError: function (args) {
                        if (args.dataSources != undefined) {
                            alert("Error...Some error occured in processing report");
                        }
                    }
                });
        
        
           

   

        
        function CheckValidation() {
            if (($scope.CenterConstitutionReport.DistrictID == undefined) || ($scope.CenterConstitutionReport.DistrictID == "")) {
                $scope.CenterConstitutionReport.DistrictID = 0;
                return true;
            }
            if (($scope.CenterConstitutionReport.ReportType == undefined) || ($scope.CenterConstitutionReport.ReportType == "")) {
                alert("Select Report Type");
                return false;
            }
            else {
                return true;
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('CenterManagemnet');
        }
        
    });
});
