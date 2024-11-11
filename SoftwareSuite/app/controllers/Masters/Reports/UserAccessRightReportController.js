define(['app'], function (app) {
    app.controller("UserAccessRightReportController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, SystemUserGroupService ) {
        $scope.UserAccessRightReportReport = {};

        //$scope.PrintUserAccessRightReportListReport = function () {
        //    if ($scope.SystemUserGroup.SysUsrGrpID == undefined) {
        //        $scope.SystemUserGroup.SysUsrGrpID = 0;
        //    }
        //    //$scope.InterestList.DateFrom = $filter('date')($scope.InterestList.DateFrom,"dd/MMM/yyyy");
        //    //$scope.InterestList.DateTo = $filter('date')($scope.InterestList.DateTo,"dd/MMM/yyyy");ExamSubjectListReport
        //    var Urlstring = "api/SystemEntityRights/GetUserGroupRightsDetailsReport/?SysUsrGrpID=" + $scope.SystemUserGroup.SysUsrGrpID + "";
        //    var dataset1 = "dsUserAccessRightsList";
        //    $state.go('Masters.ReportViewerController', { ReportName: 'RptUserAccessRightsList.rdlc', url: Urlstring, ds1: dataset1 });
        //}

        $scope.PrintUserAccessRightReportListReport = function () {
            $scope.SystemUserGroup.SysUsrGrpID = $scope.SystemUserGroup.SysUsrGrpID;
            if (CheckValidation() == true) {
                var Urlstring = "api/SystemEntityRights/GetUserGroupRightsDetailsReport/?SysUsrGrpID=" + $scope.SystemUserGroup.SysUsrGrpID + "";
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
                        var datasetName1 = "dsUserAccessRightsList";
                        if (data[0].length == 0) {
                            reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                            reportModel._refreshReport();
                            alert("Data Not Found");
                            return;
                        }
                        //data[0][0].CollegeName = CollegeName;
                        reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                        reportModel._refreshReport();
                    }
                });
            }
        }

        function CheckValidation() {
            if ($scope.SystemUserGroup.SysUsrGrpID == undefined) {
                alert(" Select User Group ");
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
            $state.go('Masters');
        }
        var SystemUserGroupList = SystemUserGroupService.GetSystemUserGroupList();
        SystemUserGroupList.then(function (SystemUserGroupData, status, headers, config, error) {
            $scope.SystemUserGroupList = SystemUserGroupData;
        }, function (SystemUserGroupData, status, headers, config) {
            alert(error);
            });

        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptUserAccessRightsList.rdlc",
                dataSources: [{ value: [], name: "dsUserAccessRightsList" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });


    });
});