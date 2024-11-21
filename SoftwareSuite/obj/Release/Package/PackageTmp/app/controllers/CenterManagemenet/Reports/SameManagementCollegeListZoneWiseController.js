define(['app'], function (app) {
    app.controller("SameManagementCollegeListZoneWiseController", function ($scope, $state, $stateParams, AppSettings, PreZoneService, PreExamManagementNewService, BasicDistrictsService) {
        $scope.SameManagementCollegeListZoneWise = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ReportOfPreZoneRightsdata = [];
        ReportOfPreZoneRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ReportOfPreZoneRightsdata.length; i++) {
            if (ReportOfPreZoneRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ReportOfPreZone.PreZoneCntrID == 0) {
                    if (ReportOfPreZoneRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ReportOfPreZoneRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ReportOfPreZoneRightsdata[i].isdeletable == 'Y') {
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
            $scope.SameManagementCollegeListZoneWise.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            $scope.GetPreZoneData($scope.SameManagementCollegeListZoneWise.DistrictID);
        }, function (Castdata, status, headers, config) {
            alert(error);
        });


        $scope.GetPreZoneData = function (DistrictID) {
            if (DistrictID != "") {
                var PreZoneList = PreZoneService.GetPreZoneListByDistrictId(DistrictID,AppSettings.ExamInstID,1);
                PreZoneList.then(function (PreZoneData, status, headers, config, error) {
                    $scope.PreZoneList = PreZoneData;
                }, function (PreZoneData, status, headers, config) {
                    alert(error);
                });
                var PreExamManagementList = PreExamManagementNewService.GetPreExamManagementListByDistrictId(DistrictID);
                PreExamManagementList.then(function (PreExamManagementData, status, headers, config, error) {
                    $scope.PreExamManagementList = PreExamManagementData;
                }, function (PreExamManagementData, status, headers, config) {
                    alert(error);
                });
            }
        }
        $scope.PrintSameManagementCollegeList = function () {
            if (CheckValidation() == true) {
                var ZoneID = $scope.SameManagementCollegeListZoneWise.ZoneID
                var Urlstring = "api/PreZoneCenter/GetSameManagementCollegeListByDistrictID/?DistrictID=" + $scope.SameManagementCollegeListZoneWise.DistrictID + "&ExamMgntID=" + $scope.SameManagementCollegeListZoneWise.ExamMgntID + "&ZoneID=" + $scope.SameManagementCollegeListZoneWise.ZoneID + "&ExamInstID=" + AppSettings.ExamInstID  ;
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
                        var datasetName1 = "dsSameManagementCollege";
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
        function CheckValidation() {       
            //$scope.SameManagementCollegeListZoneWise.ZoneID = 0;
            

            if (($scope.SameManagementCollegeListZoneWise.ZoneID == undefined) || ($scope.SameManagementCollegeListZoneWise.ZoneID == "")) {
                alert("Select Zone");
                //$scope.SameManagementCollegeListZoneWise.ZoneID = 0;
                return false;
                
            }
            //else {
            //    return true;
            //}
            if (($scope.SameManagementCollegeListZoneWise.ExamMgntID == undefined) || ($scope.SameManagementCollegeListZoneWise.ExamMgntID == "")) {
                alert("Select Zone");
                $scope.SameManagementCollegeListZoneWise.ExamMgntID = 0;
                return false;                
            }
            else {
                return true;
            }
        }
        //var ReportOfPreZone = [];
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('CenterManagemnet');
        }
        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptSameManagementCollegeListZoneWise.rdlc",
                dataSources: [{ value: [], name: "dsSameManagementCollege" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
