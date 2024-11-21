define(['app'], function (app) {
    app.controller("ReportViewerController", function ($scope, $filter, $state, $stateParams, AppSettings, $location) {
        $scope.ReportViewerPara = { ReportName: $stateParams.ReportName, url: $stateParams.url, datasetName1: $stateParams.ds1, datasetName2: $stateParams.ds2, FromDate: $stateParams.FromDate, ToDate: $stateParams.ToDate };
        $("#container").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: $scope.ReportViewerPara.ReportName,
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
        $scope.reportLoaded = function () {
            $.ajax({
                url: AppSettings.WebApiUrl + $scope.ReportViewerPara.url,
                dataType: "json",
                type: "GET",
                processData: false,
                crossDomain: true,
                async: false,
                timeout: 5000,
                success: function (result) {
                    var data = [];
                    data.push(result);
                    if (data[0].length == 0) {
                        alert("Data Not Found");
                        return;
                    }
                    var reportModel = $("#container").data('ejReportViewer');
                    if ($scope.ReportViewerPara.ReportName == "RptStudStatusReport.rdlc") {
                        reportModel.model.dataSources = [{ value: data[0], name: $scope.ReportViewerPara.datasetName1 }];
                    }
                    if ($scope.ReportViewerPara.ReportName == "RptRecognitionFeeStatusReport.rdlc") {
                        reportModel.model.dataSources = [{ value: data[0], name: $scope.ReportViewerPara.datasetName1 }];
                    }
                    if ($scope.ReportViewerPara.ReportName == "RptStudentCastwiseCountReport.rdlc") {
                        reportModel.model.dataSources = [{ value: data[0], name: $scope.ReportViewerPara.datasetName1 }];
                    }
                    if ($scope.ReportViewerPara.ReportName == "RptAdmissionFormReport.rdlc") {
                        reportModel.model.dataSources = [{ value: data[0], name: $scope.ReportViewerPara.datasetName1 }];
                    }
                    if ($scope.ReportViewerPara.ReportName == "RptStudentEnrollFormReport.rdlc") {
                        reportModel.model.dataSources = [{ value: data[0], name: $scope.ReportViewerPara.datasetName1 },
                        { value: data[0][0].StudEnrolCol, name: $scope.ReportViewerPara.datasetName2 }];
                    }
                }
            });
        }
        $scope.Back = function () {
            var url = $location.url();
            var ParentRoute = $location.url().split('/');
            if ($scope.ReportViewerPara.ReportName == "RptStudStatusReport.rdlc") {
                $state.go("Admission.StudStatus");
            }
            if ($scope.ReportViewerPara.ReportName == "RptStudentCastwiseCountReport.rdlc") {
                $state.go("Admission.StudentCastWiseCount");
            }
            if ($scope.ReportViewerPara.ReportName == "RptRecognitionFeeStatusReport.rdlc") {
                $state.go("Admission.RecognitionFeeStatus");
            }
            if ($scope.ReportViewerPara.ReportName == "RptAdmissionFormReport.rdlc") {
                $state.go("Admission.AdmissionFormPrint");
            }
            if ($scope.ReportViewerPara.ReportName == "RptStudentEnrollFormReport.rdlc") {
                $state.go("GovtColEnrollList");
            }
            else {
                $state.go(ParentRoute[1]);
            }
        }
    });
});
