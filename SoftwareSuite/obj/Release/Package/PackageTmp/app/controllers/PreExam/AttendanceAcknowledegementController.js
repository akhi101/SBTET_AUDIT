define(['app'], function (app) {
    app.controller("AttendanceAcknowledegementController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService) {
        $scope.PracticalMarkEntryAcknowledgementReport = { PrePractCntrID: $stateParams.PrePractCntrID, ExamID: $stateParams.ExamID, AttendanceDate: $stateParams.AttendanceDate };
        $scope.PracticalMarkEntryAcknowledgementReport.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PracticalMarkEntryAcknowledgementReportRightsdata = [];
        PracticalMarkEntryAcknowledgementReportRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PracticalMarkEntryAcknowledgementReportRightsdata.length; i++) {
            if (PracticalMarkEntryAcknowledgementReportRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PracticalMarkEntryAcknowledgementReport.OtherCenterID == 0) {
                    if (PracticalMarkEntryAcknowledgementReportRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PracticalMarkEntryAcknowledgementReportRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PracticalMarkEntryAcknowledgementReportRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.isupdatableDisable = false;
        $scope.PrintPracticalAcknowledgement = function () {

            //var ThCentreID = 291;
            //var ExamInstID = 103;
            //var ExamID = 1;


            var ThCentreID = $scope.PracticalMarkEntryAcknowledgementReport.PrePractCntrID;
            var ExamInstID = AppSettings.ExamInstID;
            var ExamID = $scope.PracticalMarkEntryAcknowledgementReport.ExamID;
            var AttendanceDate = $scope.PracticalMarkEntryAcknowledgementReport.AttendanceDate;


            //if (CheckValidation() == true) {GetPracticalAwardListAcknowledgeMentReport   GetVocPracticalAwardListAcknowledgeMentReport
            var Urlstring = "api/AttendanceEntry/GetAttendanceAcknowledegement/?ExamID=" + ExamID + "&ExamInstID=" + ExamInstID + "&ThCentreID=" + ThCentreID + "&AttendanceDate=" + AttendanceDate + "";
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
                    var datasetName1 = "dsAttendanceEntryAcknoeledgement";
                    //var datasetName2 = "dsPracticalStatusDetail";, value: [], name: datasetName2 , value: data[0][0].PracticalStatusDetail, name: datasetName2
                    if (data[0].length == 0) {
                        reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                        reportModel._refreshReport();
                        alert("Data Not Found");
                        return;
                    }
                    //data[0][0].CollegeName = CollegeName;RptPracticalAwardListAcknowledgementReport
                    reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                    reportModel._refreshReport();
                }
            });
            //}
        }
        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptAttendanceEntryAcknoeledgementReport.rdlc",
                dataSources: [{ value: [], name: "dsAttendanceEntryAcknoeledgement" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
        $scope.PrintPracticalAcknowledgement();
        function CheckValidation() {
            return true;
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $scope.isupdatableDisable = false;
            $state.go('PreExam');
        }


        //var PrePractCntrID = $scope.PracticalMarkEntryAcknowledgementReport.PrePractCntrID;
        //var ExmSubID = $scope.PracticalMarkEntryAcknowledgementReport.ExmSubID;
        //var BatchNo = $scope.PracticalMarkEntryAcknowledgementReport.BatchNo;
        //var ExamID = $scope.PracticalMarkEntryAcknowledgementReport.ExamID;
        //var PrDate = $scope.PracticalMarkEntryAcknowledgementReport.PrDate;


    });

});
