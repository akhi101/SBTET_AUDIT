define(['app'], function (app) {
    app.controller("SystemUserAuditTrailReportController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, SystemUserService) {

        //$scope.FromDate = new Date();
        //$scope.ToDate = new Date();
       
        $("#FromDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MM/yyyy" });
        $("#ToDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MM/yyyy" });

        $("#FromDate").ejDatePicker({ value: new Date() });
        $("#ToDate").ejDatePicker({value: new Date()});

        $scope.Print = function () {
            if (CheckValidation() == true) {
                if (($scope.SysUserID == undefined) || ($scope.SysUserID == "")) {
                    alert("Select User");
                    return;
                }


                if ($("#FromDate").val() != "") { $scope.FromDate = $("#FromDate").val(); }
                if ($("#ToDate").val() != "") { $scope.ToDate = $("#ToDate").val(); }
                if ($scope.SysUserID == undefined) {
                    $scope.SysUserID = 0;
                }
                if ($scope.SysUserID == "") {
                    $scope.SysUserID = 0;
                }
               
                var Urlstring = "api/SystemEntityRights/GetAuditTrailDetailReportByUserID/?SysUserID=" + $scope.SysUserID + "&TypeFlag=" + $scope.TypeFlag + "&FromDate=" + $scope.FromDate + "&ToDate=" + $scope.ToDate + "";
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
                        var datasetName1 = "dsSysUserAuditTrailReport";
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
        $scope.FillSystemUserByTypeFlag = function (TypeFlag) {
            var SysUserList = SystemUserService.GetSystemUserListForAuditTrailReport(TypeFlag);
            SysUserList.then(function (SysUserdata, status, headers, config, error) {
                $scope.SysUserList = SysUserdata;
            }, function (error) {
                alert(error);
            });
        }
        //var SysUserList = SystemUserService.GetSystemUserListForAuditTrailReport();
        //SysUserList.then(function (SysUserdata, status, headers, config, error) {
        //    $scope.SysUserList = SysUserdata;
        //}, function (error) {
        //    alert(error);
        //});

        function CheckValidation() {

            if ($scope.TypeFlag == undefined || $scope.TypeFlag == "") {
                alert("Please Select User Type");
                return false;
            }
            if (($scope.SysUserID == undefined)) {
                alert("Please Select User Name");
                return false;
            }
            //if (($scope.FromDate == undefined) || ($scope.FromDate == "")) {
            //    alert("Please Select User Name");
            //    return false;
            //}
            //if (($scope.ToDate == undefined) || ($scope.ToDate == "")) {
            //    alert("Please Select User Name");
            //    return false;
            //}
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
                reportPath: "RptSysUserAuditTrailReport.rdlc",
                dataSources: [{ value: [], name: "dsSysUserAuditTrailReport" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});