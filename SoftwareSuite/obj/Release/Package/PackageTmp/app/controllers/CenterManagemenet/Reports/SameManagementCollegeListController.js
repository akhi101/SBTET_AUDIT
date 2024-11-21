define(['app'], function (app) {
    app.controller("SameManagementCollegeListController", function ($scope, $state, $stateParams, AppSettings, PreExamManagementNewService,BasicDistrictsService) {
        $scope.PreExamManagement = { };
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
            $scope.PreExamManagement.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            //$scope.GetCollegeData($scope.RptPracticalBatchList.DistrictID);
		}, function (DistrictData, status, headers, config) {
			alert(error);
            });
		$scope.PrintSameManagementCollegeList = function () {
			if (CheckValidation() == true) {
				var DistrictID = $scope.PreExamManagement.DistrictID
                var Urlstring = "api/PreZoneCenter/GetSameManagementCollegeListByDistrictID/?DistrictID=" + DistrictID + "&ExamInstID=" + AppSettings.ExamInstID + "&ExamMgntID=0";
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
			if (($scope.PreExamManagement.DistrictID == undefined) || ($scope.PreExamManagement.DistrictID == "")) {
				alert("Select District");
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
                reportPath: "RptSameManagementCollegeList.rdlc",
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
