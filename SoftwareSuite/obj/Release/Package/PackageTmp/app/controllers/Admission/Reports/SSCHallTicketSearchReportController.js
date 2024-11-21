define(['app'], function (app) {
    app.controller("SSCHallTicketSearchReportController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, StudentRegService, PreStudentRegService) {
        $scope.SSCHallTicketSearchReport = {};
        $scope.candidateinfo = true;
        $scope.PreDisable = true;

        var gridColumns = [
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left },
            { field: "Fathername", headerText: "Father Name", textAlign: ej.TextAlign.Left },
            { field: "ColName", headerText: "College Name", textAlign: ej.TextAlign.Left },
            { field: "principal_name", headerText: "Principal Name", textAlign: ej.TextAlign.Left },
            { field: "principal_mobile_no", headerText: "Mobile No", textAlign: ej.TextAlign.Right },
            { field: "BoardName", headerText: "Board Name", textAlign: ej.TextAlign.Right },
            { field: "PreStudRegID", headerText: "PreStudRegID", visible: false, textAlign: ej.TextAlign.Left, width: 0 },
            { field: "PRNNo", headerText: "PRNNo", visible: false, textAlign: ej.TextAlign.Left, width: 0 },
        ];
        $scope.PreStudentRegdata = [];
        $("#PreStudentRegs").ejGrid({
            dataSource: $scope.PreStudentRegdata,
            allowResizeToFit: true,
            allowSelection: false,
            editSettings: { allowEditing: false},
            columns: gridColumns
        });
        $scope.doubleclick = function doubleclick(sender, args) {
            $scope.SSCHallTicketSearchReportWithPRN = [];
            $scope.SSCHallTicketSearchReport = [];
            $scope.SSCHallTicketSearchReportWithPRN = $filter('filter')($scope.SSCHallTicketSearchReportMainData, { PRNNo: sender.data.PRNNo })[0];
            $scope.AdmNo = $scope.SSCHallTicketSearchReportWithPRN.AdmNo
            $scope.SSCHallTicketSearchReport.LstInstName = $scope.SSCHallTicketSearchReportWithPRN.LstInstName
            $scope.SSCHallTicketSearchReport.SSCHallTicket = $scope.SSCHallTicketSearchReportWithPRN.SSCHallTicket
            $scope.SSCHallTicketSearchReport.PRNNo = $scope.SSCHallTicketSearchReportWithPRN.PRNNo
            $scope.SSCHallTicketSearchReport.StudName = $scope.SSCHallTicketSearchReportWithPRN.StudName
            $scope.SSCHallTicketSearchReport.Fathername = $scope.SSCHallTicketSearchReportWithPRN.Fathername
            $scope.SSCHallTicketSearchReport.MotherName = $scope.SSCHallTicketSearchReportWithPRN.MotherName
            $scope.SSCHallTicketSearchReport.Nationality = $scope.SSCHallTicketSearchReportWithPRN.Nationality
            $scope.SSCHallTicketSearchReport.BirthDate = $scope.SSCHallTicketSearchReportWithPRN.BirthDate
            $scope.SSCHallTicketSearchReport.CasteName = $scope.SSCHallTicketSearchReportWithPRN.CasteName
            $scope.SSCHallTicketSearchReport.SubCastName = $scope.SSCHallTicketSearchReportWithPRN.SubCastName
            $scope.SSCHallTicketSearchReport.Gender = $scope.SSCHallTicketSearchReportWithPRN.Gender
            $scope.SSCHallTicketSearchReport.MothTName = $scope.SSCHallTicketSearchReportWithPRN.MothTName
            $scope.SSCHallTicketSearchReport.IdentiMarks = $scope.SSCHallTicketSearchReportWithPRN.IdentiMarks
            $scope.SSCHallTicketSearchReport.IdentiMarks2 = $scope.SSCHallTicketSearchReportWithPRN.IdentiMarks2
            $scope.SSCHallTicketSearchReport.OcupName = $scope.SSCHallTicketSearchReportWithPRN.OcupName
            $scope.SSCHallTicketSearchReport.IncGrpame = $scope.SSCHallTicketSearchReportWithPRN.IncGrpame
            $scope.SSCHallTicketSearchReport.Guardianname = $scope.SSCHallTicketSearchReportWithPRN.Guardianname
            $scope.SSCHallTicketSearchReport.GradePoints = $scope.SSCHallTicketSearchReportWithPRN.GradePoints
            $scope.SSCHallTicketSearchReport.MobileNo = $scope.SSCHallTicketSearchReportWithPRN.MobileNo

            $scope.SSCHallTicketSearchReport.ParentCellNo = $scope.SSCHallTicketSearchReportWithPRN.ParentCellNo
            $scope.SSCHallTicketSearchReport.EmailId = $scope.SSCHallTicketSearchReportWithPRN.EmailId
            $scope.SSCHallTicketSearchReport.AadharNo = $scope.SSCHallTicketSearchReportWithPRN.AadharNo
            $scope.SSCHallTicketSearchReport.AdmDate = $scope.SSCHallTicketSearchReportWithPRN.AdmDate
            $scope.SSCHallTicketSearchReport.ExmName = $scope.SSCHallTicketSearchReportWithPRN.ExmName
            $scope.SSCHallTicketSearchReport.ScholarshipFlag = $scope.SSCHallTicketSearchReportWithPRN.ScholarshipFlag
            $scope.SSCHallTicketSearchReport.ScholarshipFlag = $scope.SSCHallTicketSearchReportWithPRN.ScholarshipFlag
            $scope.SSCHallTicketSearchReport.MediumName = $scope.SSCHallTicketSearchReportWithPRN.MediumName
            $scope.SSCHallTicketSearchReport.SubName = $scope.SSCHallTicketSearchReportWithPRN.SubName
            $scope.SSCHallTicketSearchReport.MainGrpName = $scope.SSCHallTicketSearchReportWithPRN.MainGrpName

            $scope.SSCHallTicketSearchReport.Houseno = $scope.SSCHallTicketSearchReportWithPRN.Houseno
            $scope.SSCHallTicketSearchReport.streetName = $scope.SSCHallTicketSearchReportWithPRN.streetName
            $scope.SSCHallTicketSearchReport.cityname = $scope.SSCHallTicketSearchReportWithPRN.cityname
            $scope.SSCHallTicketSearchReport.DistName = $scope.SSCHallTicketSearchReportWithPRN.DistName
            $scope.SSCHallTicketSearchReport.StateName = $scope.SSCHallTicketSearchReportWithPRN.StateName
        }
        $("#BirthDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#BirthDate").ejDatePicker("disable");
        $("#AdmDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#AdmDate").ejDatePicker("disable");
        $scope.SSCHallTicketSearchReportMainData = [];
        $scope.ShowSSCHallTicketData = function () {
            if ($scope.SSCHallTicketSearchReport.SSCHallTicket == undefined || $scope.SSCHallTicketSearchReport.SSCHallTicket == "")
            {
                alert("Enter Enter SSC Hall Ticket Number");
                return;
            }
            var SSCDataList = StudentRegService.GetSSCHallTicketData($scope.SSCHallTicketSearchReport.SSCHallTicket);
            SSCDataList.then(function (data, status, headers, config, error) {
                if (data.length > 0) {
                    $scope.PreStudentRegdata = data;
                    $scope.SSCHallTicketSearchReport = data[0];
                    $scope.SSCHallTicketSearchReportMainData = data;
                    $scope.AdmNo = $scope.SSCHallTicketSearchReport.AdmNo;
                    $scope.candidateinfo = false;
                    $("#Nationality").val($scope.SSCHallTicketSearchReport.Nationality);
                    $("#BirthDate").ejDatePicker({ value: $scope.SSCHallTicketSearchReport.BirthDate });
                    $("#AdmDate").ejDatePicker({ value: $scope.SSCHallTicketSearchReport.AdmDate });
                    $("#Dateofwithdrawal").ejDatePicker({ value: $scope.SSCHallTicketSearchReport.Dateofwithdrawal });
                } else {
                    alert("Data not found");
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('BoardReportList');
        }
    });
});