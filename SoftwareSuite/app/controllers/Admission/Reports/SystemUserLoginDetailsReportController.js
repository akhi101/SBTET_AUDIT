define(['app'], function (app) {
    app.controller("SystemUserLoginDetailsReportController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, SystemUserService, BasicDistrictsService) {

        //$scope.FromDate = new Date();
        //$scope.ToDate = new Date();

        $("#FromDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MM/yyyy" });
        $("#ToDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MM/yyyy" });

        $("#FromDate").ejDatePicker({ value: new Date() });
        $("#ToDate").ejDatePicker({ value: new Date() });

        $scope.Print = function () {
            if (CheckValidation() == true) {
                if ($("#FromDate").val() != "") { $scope.FromDate = $("#FromDate").val(); }
                if ($("#ToDate").val() != "") { $scope.ToDate = $("#ToDate").val(); }
                if ($scope.DistrictID == undefined || $scope.DistrictID == "") {
                    $scope.DistrictID = 0;
                }
                var Urlstring = "api/SystemEntityRights/GetSystemUserLoginDetailReportByUserType/?TypeFlag=" + $scope.TypeFlag + "&FromDate=" + $scope.FromDate + "&ToDate=" + $scope.ToDate + "&DistrictID=" + $scope.DistrictID +"";
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
                        var reportModel = $("#container").data('ejReportViewer');
                        var datasetName1 = "dsSystemUserLoginDetails";
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
                //var Urlstring = "api/StudentReg/GetStudCastwiseCount/?CollegeID=" + AppSettings.CollegeID + "&CourseID=" + $scope.CourseID + "&ExamID=" + $scope.ExamID + "";
                //var dataset1 = "dsStudentCastwiseCount";
                //$state.go('Admission.ReportViewerController', { ReportName: 'RptStudentCastwiseCountReport.rdlc', url: Urlstring, ds1: dataset1 });
            }

        }
      
        if (AppSettings.SysUsrGrpID == 1) {
            $scope.UserTypeList = [
                { TypeFlagName: 'Select User Type', TypeFlag: '' },
                { TypeFlagName: 'Board User', TypeFlag: 'B' },
                { TypeFlagName: 'College User', TypeFlag: 'C' },
                { TypeFlagName: 'District User', TypeFlag: 'D' },
            ];
        }
        if (AppSettings.SysUsrGrpID == 7) {
            $scope.UserTypeList = [
                { TypeFlagName: 'Select User Type', TypeFlag: '' },
                { TypeFlagName: 'College User', TypeFlag: 'D' }
            ];
        }
        $scope.DisableDistrict = false;
        if (AppSettings.SysUsrGrpID == 1) {
            var DistrictList = BasicDistrictsService.GetBasicDistrictList();
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function (error) {
                alert(error);
                });
            $scope.DisableDistrict = true;
        }

        if (AppSettings.SysUsrGrpID == 7) {
            var DistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function (error) {
                alert(error);
                });
            $scope.DisableDistrict = false;
        }

        function CheckValidation() {

            if ($scope.TypeFlag == undefined || $scope.TypeFlag == "") {
                alert("Please Select User Type");
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
            $state.go('BoardReportList');
        }
        $("#container").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptSystemUserLoginDetails.rdlc",
                dataSources: [{ value: [], name: "dsSystemUserLoginDetails" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});