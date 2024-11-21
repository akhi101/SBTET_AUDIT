define(['app'], function (app) {
    app.controller("DistColWiseENVETHTHANSBKREQSTNTController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, preExaminerAppointmentsService, BasicDistrictsService) {
        $scope.DistrictWiseCount = {};
        $scope.GetCollegeWiseENVETHTHAnsBookReqStatement = function () {
            // $scope.DistrictWiseCount.DistrictID = 0;
            if (CheckValidation() == true) {
                //if ($scope.DistrictWiseCount.DistrictID == undefined || $scope.DistrictWiseCount.DistrictID == "") {
                //    $scope.DistrictWiseCount.DistrictID = 0;
                //}
                //var DistrictID = $scope.DistrictWiseCount.DistrictID;

                if ($scope.DistrictWiseCount.DistrictID == undefined || $scope.DistrictWiseCount.DistrictID == "") {
                    $scope.DistrictWiseCount.DistrictID = 0;
                }
                var Urlstring = "api/PreExaminerAppointments/GetCollegeWiseTheoryAnswerBookRequirementStatementOFENVANDETHSUBJECT/?ExamInstID=" + AppSettings.ExamInstID + "&DistrictID=" + $scope.DistrictWiseCount.DistrictID + "&EvalTypeID=" + $scope.DistrictWiseCount.EvalTypeID;
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
                        var datasetName1 = "dsDitCollegeWiseEnvEthAnsBkReqSt";
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

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictList();
        BasicDistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.BasicDistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });



        function CheckValidation() {

            //if ($scope.TypeFlag == undefined || $scope.TypeFlag == "") {
            //    alert("Please Select User Type");
            //    return false;
            //}
            if ($scope.DistrictWiseCount.EvalTypeID == undefined || $scope.DistrictWiseCount.EvalTypeID == "") {
                alert("Please Select Evaluation Type");
                return false;
            }
            if ($scope.DistrictWiseCount.DistrictID == undefined || $scope.DistrictWiseCount.DistrictID == "") {
                $scope.DistrictWiseCount.DistrictID = 0;
                return true;
            }
            //else {
            return true;
            //}
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
                reportPath: "RptDistColWiseEnvEthAnsBkReqSt.rdlc",
                dataSources: [{ value: [], name: "dsDitCollegeWiseEnvEthAnsBkReqSt" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});