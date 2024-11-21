define(['app'], function (app) {
    app.controller("CollegeManagementLinkReportController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, BasicDistrictsService, BasicManagementTypeService) {
        $scope.BasicCollege = {};
        //$scope.PrintCollegeManagementLinkReport = function () {
        //    var DistrictID = $scope.BasicCollege.DistrictID;
        //    if ($scope.BasicCollege.DistrictID == "") {
        //        $scope.BasicCollege.DistrictID = 0;
        //    }
        //    if ($scope.BasicCollege.DistrictID == undefined) {
        //        $scope.BasicCollege.DistrictID = 0;
        //    }
        //    var Urlstring = "api/BasicCollege/GetCollegeManagementLinkReport/?DistrictID=" + $scope.BasicCollege.DistrictID + "" + "&MngtTypID=" + $scope.BasicCollege.MngtTypID + " ";
        //    var dataset1 = "dsCollegeManagementLink";
        //    $state.go('Masters.ReportViewerController', { ReportName: 'RptCollegeManagementLinkReport.rdlc', url: Urlstring, ds1: dataset1 });
        //}

        $scope.PrintCollegeManagementLinkReport = function () {

            $scope.BasicCollege.DistrictID = $scope.BasicCollege.DistrictID;
            $scope.BasicCollege.MngtTypID = $scope.BasicCollege.MngtTypID;

            if (CheckValidation() == true) {
                var Urlstring = "api/BasicCollege/GetCollegeManagementLinkReport/?DistrictID=" + $scope.BasicCollege.DistrictID + "" + "&MngtTypID=" + $scope.BasicCollege.MngtTypID + " ";
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
                        var datasetName1 = "dsCollegeManagementLink";
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

        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Masters');
        }
        var BasicDistrictsList = BasicDistrictsService.GetBasicDistrictListByCode();
        BasicDistrictsList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictsList = DistrictData;
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });
        var BasicManagementTypeList = BasicManagementTypeService.GetBasicManagementTypeList();
        BasicManagementTypeList.then(function (ManagementTypeData, status, headers, config, error) {
            $scope.BasicManagementTypeList = ManagementTypeData;
        }, function (ManagementTypeData, status, headers, config) {
            alert(error);
            });

        function CheckValidation() {
            if ($scope.BasicCollege.DistrictID == undefined) {
                alert(" Select District ");
                return false;
            }
            if ($scope.BasicCollege.MngtTypID == undefined) {
                alert(" Select Management Type ");
                return false;
            }
            else {
                return true;
            }
        }
        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptCollegeManagementLinkReport.rdlc",
                dataSources: [{ value: [], name: "dsCollegeManagementLink" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });


    });
});