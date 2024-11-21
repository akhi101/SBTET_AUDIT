define(['app'], function (app) {
    app.controller("StudSerListController", function ($scope, $state, $localStorage, $stateParams, AppSettings, StudSerListService, $window) {
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        AppSettings.AcdYrID = authData.AcdYrID;
        $scope.DigiFiles = [];
        $("#AddBulkDigiSign").hide();
        $scope.StudReqTypeData = { DistrictIDs: AppSettings.DistrictIDs, ServiceID: $stateParams.ServiceID, SelectedAcdYrID: $stateParams.SelectedAcdYrID, SysUsrGrpID: AppSettings.SysUsrGrpID, ColumnNo:$stateParams.ColumnNo, CallingFrom:$stateParams.CallingFrom, ServiceName:$stateParams.ServiceName }; 
        var gridColumns = [
            { headerTemplateID: "#headerTemplate", template: true, templateID: "#checkboxTemplate", textAlign: ej.TextAlign.Center, width: 25 },
            { field: "SrNo", headerText: "S No", textAlign: ej.TextAlign.Left, width: 25 },
            //{ field: "ServiceName", headerText: "Service Name", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "FormNo", headerText: "Form No", textAlign: ej.TextAlign.Left, width: 55 },
            { field: "RollNo", headerText: "Hall Ticket No", textAlign: ej.TextAlign.Left, width: 60 },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 130 },
            { field: "FatherName", headerText: "Father Name", textAlign: ej.TextAlign.Left, width: 130 },
            { field: "MobileNo", headerText: "Mobile No", textAlign: ej.TextAlign.Left, width: 60 },
            { field: "ExamYear", headerText: "Year", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "AppliedDate", headerText: "Applied Date", textAlign: ej.TextAlign.Left, width: 60 },
            { field: "RequestStatus", headerText: "Application Status", visible: true, textAlign: ej.TextAlign.Left, width: 70 },
            { field: "ViewCertificate", headerText: "View Certificate", textAlign: ej.TextAlign.Center, width: 70 },
            //{ field: "ReqStatus1", headerText: "ReqStatus1", visible: true, textAlign: ej.TextAlign.Left, width: 80 },
        ];
        $scope.StudSerListdata = [];
        if ($stateParams.ColumnNo == 8) {
            $("#StudSerList").ejGrid({
                dataSource: $scope.StudSerListdata,
                allowPaging: false,
                allowSearching: true,
                allowScrolling: true,
                allowFiltering: false,
                toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Search] },
                columns: gridColumns
            });
        }
        else {
            $("#StudSerList").ejGrid({
                dataSource: $scope.StudSerListdata,
                allowPaging: true,
                pageSettings: { pageSize: 10 },
                allowSearching: true,
                allowScrolling: true,
                allowFiltering: false,
                toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Search] },
                columns: gridColumns
            });
        }
       
        $scope.doubleclick = function doubleclick(sender, args) {
            if (sender.data.ServiceName == 'Duplicate Marks Memo') {
                $state.go('StudentRequestBoard.DupMarksMemoApp', { DupMemoID: sender.data.CertID });
            }
            else if (sender.data.ServiceName == 'Eligibility Certificate') {
                if (sender.data.EleventhBoardID != 0 && sender.data.EleventhBoardID != undefined) {
                    $state.go('StudentRequestBoard.EligCertAppSecond', { EligCertID: sender.data.CertID });
                }
                else {
                    $state.go('StudentRequestBoard.EligCertAppFirst', { EligCertID: sender.data.CertID });
                }
            }
            else if (sender.data.ServiceName == 'Equivalency Certificate') {
                $state.go('StudentRequestBoard.EquiCertApp', { EquiCertID: sender.data.CertID });
            }
            else if (sender.data.ServiceName == 'Migration Certificate') {
                $state.go('StudentRequestBoard.MigrCertApp', { MigrCertID: sender.data.CertID });
            }
            else if (sender.data.ServiceName == 'Duplicate/Triplicate Pass Certificate') {
                $state.go('StudentRequestBoard.DupTripPassCertApp', { PassCertID: sender.data.CertID });
            }
            else if (sender.data.ServiceName == 'Name Correction') {
                $state.go('StudentRequestBoard.NameCorrectionApp', { NameCorID: sender.data.CertID });
            }
            else if (sender.data.ServiceName == 'Transcripts') {
                $state.go('StudentRequestBoard.TranscriptsApp', { TrnSrptID: sender.data.CertID });
            }
            else if (sender.data.ServiceName == 'Counter Signature') {
                $state.go('StudentRequestBoard.CounterSignatureApp', { CountSignID: sender.data.CertID });
            }
            else if (sender.data.ServiceName == 'True Extracts of Marks Memo') {
                $state.go('StudentRequestBoard.TrueExMarksMemoApp', { TrueExMrkID: sender.data.CertID });
            }
            else if (sender.data.ServiceName == 'Group Change') {
                $state.go('StudentRequestBoard.GroupChangeApp', { GrpChngID: sender.data.CertID });
            }
            else if (sender.data.ServiceName == 'Medium Change') {
                $state.go('StudentRequestBoard.MediumChangeApp', { MedChngID: sender.data.CertID });
            }
            else if (sender.data.ServiceName == 'Study of 2nd Language At Own Risk') {
                $state.go('StudentRequestBoard.StudySecondLanguageApp', { SSLChngID: sender.data.CertID });
            }
            else if (sender.data.ServiceName == 'TC Admission Request') {
                $state.go('StudentRequestBoard.TCAdmissionApp', { TCAdmissionID: sender.data.CertID });
            }
            else if (sender.data.ServiceName == 'ReAdmission') {
                $state.go('StudentRequestBoard.ReAdmissionApp', { ReAdmissionID: sender.data.CertID });
            }
            else if (sender.data.ServiceName == 'Attendance Exemption') {
                $state.go('StudentRequestBoard.AttendanceExemptionApp', { AttendExID: sender.data.CertID });
            }
        }
        $scope.EditData = "N";
        var EditData = false;
        LoadData();
        $scope.ChangeRequestType = function () {
            if ($scope.EditData == 'Y')
                EditData = true;
            else if ($scope.EditData == 'N')
                EditData = false;
            else
                return;
            LoadData();
        }
        function LoadData() {
            var StudSerListdata = StudSerListService.FillStudSerListDetailsList(AppSettings.SysUsrGrpID, AppSettings.LoggedUserId, $scope.StudReqTypeData.ServiceID, EditData, AppSettings.DistrictIDs, $scope.StudReqTypeData.SelectedAcdYrID, $scope.StudReqTypeData.ColumnNo, $scope.StudReqTypeData.CallingFrom, $scope.StudReqTypeData.ServiceName); 
            StudSerListdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].SrNo = SrNo;
                        SrNo = SrNo + 1;
                        if (AppSettings.SysUsrGrpID == "21") {
                            if (data[i].ReqStatus2 != undefined) {
                                data[i].RequestStatus = data[i].ReqStatus2;
                            }
                            else if (data[i].ReqStatus1 != undefined) {
                                data[i].RequestStatus = data[i].ReqStatus1;
                            }
                            else {
                                data[i].RequestStatus = data[i].ReqStatus;
                            }
                        }
                        else if (AppSettings.SysUsrGrpID == "11") {
                            if (data[i].ReqStatus2 != undefined) {
                                data[i].RequestStatus = data[i].ReqStatus2;
                            }
                            else if (data[i].ReqStatus1 != undefined) {
                                data[i].RequestStatus = data[i].ReqStatus1;
                            }
                            else {
                                data[i].RequestStatus = data[i].ReqStatus;
                            }
                        }
                        else if (AppSettings.SysUsrGrpID == "17") {
                            if (data[i].ReqStatus2 != undefined) {
                                data[i].RequestStatus = data[i].ReqStatus2;
                            }
                            else if (data[i].ReqStatus1 != undefined) {
                                data[i].RequestStatus = data[i].ReqStatus1;
                            }
                            else {
                                data[i].RequestStatus = data[i].ReqStatus;
                            }
                        }
                        else if (AppSettings.SysUsrGrpID == "4") {
                            if (data[i].ReqStatus2 != undefined) {
                                data[i].RequestStatus = data[i].ReqStatus2;
                            }
                            else if (data[i].ReqStatus1 != undefined) {
                                data[i].RequestStatus = data[i].ReqStatus1;
                            }
                            else {
                                data[i].RequestStatus = data[i].ReqStatus;
                            }
                        }
                        else if (AppSettings.SysUsrGrpID == "2") {
                            if (data[i].ReqStatus2 != undefined) {
                                data[i].RequestStatus = data[i].ReqStatus2;
                            }
                            else if (data[i].ReqStatus1 != undefined) {
                                data[i].RequestStatus = data[i].ReqStatus1;
                            }
                            else {
                                data[i].RequestStatus = data[i].ReqStatus;
                            }
                        }
                        else if (AppSettings.SysUsrGrpID == "1") {
                            if (data[i].ReqStatus2 != undefined) {
                                data[i].RequestStatus = data[i].ReqStatus2;
                            }
                            else if (data[i].ReqStatus1 != undefined) {
                                data[i].RequestStatus = data[i].ReqStatus1;
                            }
                            else {
                                data[i].RequestStatus = data[i].ReqStatus;
                            }
                        }

                        if (data[i].RequestStatus == "P") {
                            data[i].RequestStatus = "Process";
                        }
                        else if (data[i].RequestStatus == "A") {
                            data[i].RequestStatus = "Approved";
                        }
                        else if (data[i].RequestStatus == "R") {
                            data[i].RequestStatus = "Rejected";
                        }
                        else if (data[i].RequestStatus == "C") {
                            data[i].RequestStatus = "Reapplied";
                        }
                        //if (EditData) {
                        //    if (data[i].DigiSignBy != null) {
                        //        //data[i].ViewCertificate = "<a target='blank' style='color: blue;text-decoration:underline;' href='http://202.62.85.196:173/FileUploadPath/Eligibility/Signed/" + data[i].FormNo + "_EligibilityCertficate.pdf'>Signed PDF</a>";
                        //    }
                        //    else { }
                        //}

                        if (data[i].DigiSignBy != null) {
                            data[i].ViewCertificate = "<a target='blank' style='color: blue;text-decoration:underline;' href='" + data[i].DigiSignPDFURL + "'>Signed PDF</a>";
                            data[i].ViewCertificate = data[i].ViewCertificate.replace('Approved', 'Signed');
                        }
                        //else {
                        //    data[i].ViewCertificate = "Pending Signature";
                        //}
                    }
                    $scope.StudSerListdata = data;
                    var gridObj = $("#StudSerList").ejGrid("instance");
                    gridObj.gotoPage(1);
                }
                else {
                    alert("Data Not Found");
                    $scope.StudSerListdata = [];
                    return;
                } 
            }, function (error) {
                alert(error);
            });
        }
        function checkChange(e) {
            gridObj = $("#StudSerList").data("ejGrid");
            var rowCheck = $(".rowCheckbox:checked");
            if (rowCheck.length == $scope.StudSerListdata.length) {
                $("#headchk").ejCheckBox({ "checked": true });
            }
            else {
                $("#headchk").ejCheckBox({ "checked": false });
            }
            if (rowCheck.length <= 0) {
                $("#AddBulkDigiSign").hide();
            }
            if (e.isChecked == true) {
                $scope.DigiFiles.push(gridObj.model.selectedRecords[0].FormNo);
                $("#AddBulkDigiSign").show();
            }
            else if (e.isChecked == false) {
                var index = $scope.DigiFiles.indexOf(gridObj.model.selectedRecords[0].FormNo);
                if (index > -1) {
                    $scope.DigiFiles.splice(index, 1);
                }
            }
        }
        function headCheckChange(e) {
            $("#StudSerList .rowCheckbox").ejCheckBox({ "change": checkChange });
            gridObj = $("#StudSerList").data("ejGrid");
            if ($("#headchk").is(':checked')) {
                $(".rowCheckbox").ejCheckBox({ "checked": true });
                $scope.DigiFiles = [];
                for (var i = 0; i < $scope.StudSerListdata.length; i++) {
                    $scope.DigiFiles.push($scope.StudSerListdata[i].FormNo);
                }
                $("#AddBulkDigiSign").show();
            }
            else {
                $(".rowCheckbox").ejCheckBox({ "checked": false });
                $scope.DigiFiles = [];
                $("#AddBulkDigiSign").hide();
            }
        }
        $scope.refreshTemplate = function (args) {
            $("#StudSerList .rowCheckbox").ejCheckBox({ "change": checkChange });
            $("#headchk").ejCheckBox({ visible: false, "change": headCheckChange });
            if ($scope.StudReqTypeData.ColumnNo != 8) {
                $("#StudSerList .rowCheckbox").ejCheckBox("disable");
                $("#headchk").ejCheckBox("disable");
            }
        }
        $scope.actioncomplete = function (args) {
            $("#headchk").ejCheckBox({ width: 100, visible: false });
        }
        $scope.AddBulkDigiSign = function () {
            if ($scope.DigiFiles.length > 0) {
                var FormNo = "";
                for (var i = 0; i < $scope.DigiFiles.length; i++) { 
                    FormNo += $scope.DigiFiles[i] + ',';
                }
                var url = AppSettings.DigiSign + FormNo.replace(/,\s*$/, "");
                $window.open(url, '_blank');
            }
            else {
                alert("Please select atlesat one record for digital sign.");
            }
        };
    });
});