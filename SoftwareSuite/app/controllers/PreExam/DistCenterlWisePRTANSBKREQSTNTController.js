define(['app'], function (app) {
    app.controller("DistCenterlWisePRTANSBKREQSTNTController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, preExaminerAppointmentsService, BasicDistrictsService) {

        $scope.GetDistrictCenerWisePRTAnsBookReqStatement = function () {
            if (CheckValidation() == true) {
                var Urlstring = "";
                if ($scope.DistrictWiseCount.DistrictID == undefined || $scope.DistrictWiseCount.DistrictID == "") {
                    $scope.DistrictWiseCount.DistrictID = 0;
                }

                Urlstring = "api/PreExaminerAppointments/GetCollegeWisePracticalAnswerBookRequirementStatement/?ExamInstID=" + AppSettings.ExamInstID + "&DistrictID=" + $scope.DistrictWiseCount.DistrictID + "";
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
                        var datasetName1 = "dsDistCollegeWisePracticalAnsBkReqSt";
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


                // var reportModel = $("#reportviewer").data('ejReportViewer');
                //reportModel.model.dataSources = [{ value: [], name: "dsDistrictWiseThAnsBookReqSt" }];
                //reportModel._refreshReport();

                // var Urlstring = "api/PreExaminerAppointments/GetDistrictWiseTheoryAnswerBookRequirementStatement/?ExamInstID=" + AppSettings.ExamInstID + "&DistrictID=" + $scope.DistrictID + "";
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
                //        var reportModel = $("#container").data('ejReportViewer');
                //        var datasetName1 = "dsDistrictWiseThAnsBookReqSt";
                //        if (data[0].length == 0) {
                //            reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                //            reportModel._refreshReport();
                //            alert("Data Not Found");
                //            return;
                //        }
                //        reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                //        reportModel._refreshReport();
                //    }
                //});

            }

        }

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictList();
        BasicDistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.BasicDistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });



        function CheckValidation() {
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
                reportPath: "RptDistColWisePracticalAnsBkReqSt.rdlc",
                dataSources: [{ value: [], name: "dsDistCollegeWisePracticalAnsBkReqSt" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});