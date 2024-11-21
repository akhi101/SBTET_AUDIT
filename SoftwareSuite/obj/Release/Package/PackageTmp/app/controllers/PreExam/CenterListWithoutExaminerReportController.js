define(['app'], function (app) {
    app.controller("CenterListWithoutExaminerReportController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, preExaminerAppointmentsService, BasicDistrictsService) {
        //$("#LoadImg").attr("src", AppSettings.LoadingImage);
        //$scope.LoadImg = false;
        $scope.isdisableDistrict = false;
        $scope.CenterListWithoutExaminer = {};
        //var BasicDistrictList = BasicDistrictsService.GetBasicDistrictList();
        //BasicDistrictList.then(function (Districtdata, status, headers, config, error) {
        //    $scope.BasicDistrictList = Districtdata;
        //}, function (error) {
        //    alert(error);
        //});


        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByUserId(AppSettings.LoggedUserId);
        BasicDistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.BasicDistrictList = Districtdata;

            if (AppSettings.SysUsrGrpID == 7) {
                $scope.CenterListWithoutExaminer.DistrictID = "" + Districtdata[0].DistrictID + ""; 
                $scope.isdisableDistrict = true;
            }
            else {
                $scope.isdisableDistrict = false;
            }
        }, function (error) {
            alert(error);
        });

        $scope.GetCenterListWithoutExaminerAppointment = function () {
            if (CheckValidation() == true) {
                // $scope.LoadImg = true;
                var Urlstring = "";
                if ($scope.CenterListWithoutExaminer.DistrictID == undefined || $scope.CenterListWithoutExaminer.DistrictID == "") {
                    $scope.CenterListWithoutExaminer.DistrictID = 0;
                }
                if ($scope.CenterListWithoutExaminer.ZoneType == undefined || $scope.CenterListWithoutExaminer.ZoneType == "") {
                    $scope.CenterListWithoutExaminer.ZoneType = 2;
                }

                Urlstring = "api/PreExaminerAppointments/GetCenterListofExaminerisNotAppointed/?DistrictID=" + $scope.CenterListWithoutExaminer.DistrictID + "&ExamInstID=" + AppSettings.ExamInstID + "&ZoneType=" + $scope.CenterListWithoutExaminer.ZoneType + "";
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
                        var datasetName1 = "dsCenterListWithoutExaminer";
                        if (data[0].length == 0) {
                            reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                            reportModel._refreshReport();
                            alert("Data Not Found");
                            return;
                        }
                        reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                        reportModel._refreshReport();
                        // $scope.LoadImg = false;
                    }
                });
            }

        }

        function CheckValidation() {
            if ($scope.CenterListWithoutExaminer.ZoneType == undefined || $scope.CenterListWithoutExaminer.ZoneType == "") {
                alert("Please Select Zone Type");
                return false;
            }
            return true;
        }

        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('PreExam');
        }

        $("#container").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptCenterListWithoutExaminerReport.rdlc",
                dataSources: [{ value: [], name: "dsCenterListWithoutExaminer" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});