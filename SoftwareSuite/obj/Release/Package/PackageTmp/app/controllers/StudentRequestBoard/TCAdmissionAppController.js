define(['app'], function (app) {
    app.controller("TCAdmissionAppController", function ($http, $scope, $state, $stateParams, AppSettings, TCAdmissionAppService) {
        $scope.TCAdmissionApp = { TCAdmissionID: $stateParams.TCAdmissionID };
        var UserGrp = "";
        if (AppSettings.SysUsrGrpID == 2) {
            UserGrp = "A";
        }
        else {
            UserGrp = "O";
        }

        $scope.ApproverStatus = true;
        $scope.Approver1Status = true;
        $scope.ApproverRemarks = true;
        $scope.Approver1Remarks = true;
        $scope.Approver1RemarksRead = true;
        $scope.Approver1StatusRead = true;
        $scope.DigitalHide = true;
        $scope.SubmitHide = true;
        if (AppSettings.SysUsrGrpID == 4) {
            UserGrp = "O";
            $scope.ApproverStatus = false;
            $scope.ApproverRemarks = false;
            $scope.Approver1Status = true;
            $scope.Approver1Remarks = true;

            $scope.Approver1RemarksRead = false;
            $scope.Approver1StatusRead = false;
            $scope.DigitalHide = true;
        }
        else if (AppSettings.SysUsrGrpID == 2) {
            UserGrp = "A";
            $scope.ApproverStatus = false;
            $scope.ApproverRemarks = false;
            $scope.Approver1Status = false;
            $scope.Approver1Remarks = false;

            $scope.Approver1RemarksRead = true;
            $scope.Approver1StatusRead = true;
            $scope.DigitalHide = true;
        }
        $scope.DigitalDisable = true;
        var TCAdmissionAppddata = TCAdmissionAppService.GetReqTCAdmissionByID($scope.TCAdmissionApp.TCAdmissionID);
        TCAdmissionAppddata.then(function (data) {
            $scope.TCAdmissionApp = data[0];
            if (AppSettings.SysUsrGrpID == 4) {
                if (data[0].ReqStatus == 'P') {
                    $scope.TCAdmissionApp.ReqStatus = "0";
                    $scope.DigitalHide = true;
                    $scope.DigitalDisable = true;
                    $scope.SubmitHide = false;
                    $scope.ShowLevel1 = false;
                    $scope.ShowLevel2 = false;
                }
                else if (data[0].ReqStatus == 'A') {
                    $scope.DigitalHide = true;
                    $scope.DigitalDisable = true;
                    $scope.SubmitHide = true;
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = false;
                }
                else if (data[0].ReqStatus == 'R') {
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = false;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'P') {
                    $scope.TCAdmissionApp.ReqStatus1 = "0";
                    $scope.DigitalHide = true;
                    $scope.DigitalDisable = true;
                    $scope.SubmitHide = false;
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = false;
                }
                else if (data[0].ReqStatus1 == 'A') {
                    $scope.DigitalHide = false;
                    $scope.DigitalDisable = false;
                    $scope.SubmitHide = true;
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = true;
                    if ((data[0].ReqStatus1 == 'A') || (data[0].ReqStatus1 == 'R')) {
                        $scope.ReqStatus1 = true;
                        $scope.Status1Disable = true;
                    }
                    else {
                        $scope.ReqStatus1 = true;
                        $scope.Status1Disable = true;
                    }

                    if ((data[0].DigiSignBy == undefined) || (data[0].DigiSignBy == null)) {
                        $scope.DigitalHide = false;
                    }
                    else {
                        $scope.DigitalHide = true;
                    }
                }
                else if (data[0].ReqStatus1 == 'R') {
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = true;
                }
            }
        }, function (error) {
            alert(error);
        });
        $scope.ChangeTextArea = function (str, type) {
            if (type == "ReqStatus") {
                if (str == 'A') { $scope.TCAdmissionApp.ProcessRemark = "Approved"; }
                else if (str == 'R') { $scope.TCAdmissionApp.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'A') { $scope.TCAdmissionApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.TCAdmissionApp.ProcessRemark1 = "Rejected"; }
            }
        };
        $scope.UploadFiles = true;
        $scope.SaveTCAdmissionApp = function () {
            $scope.RollEditDisable = true;
            $scope.TCAdmissionApp.ProcessbyID = AppSettings.LoggedUserId;
            if (($scope.TCAdmissionApp.ReqStatus == undefined) || ($scope.TCAdmissionApp.ReqStatus == "")) {
                alert("Select Status");
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                return;
            }
            if (($scope.TCAdmissionApp.ProcessRemark == undefined) || ($scope.TCAdmissionApp.ProcessRemark == "")) {
                alert("Enter Process Remark");
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                return;
            }

            if (AppSettings.SysUsrGrpID == 2) {
                UserGrp = "A";
                if (($scope.TCAdmissionApp.ProcessRemark1 == undefined) || ($scope.TCAdmissionApp.ProcessRemark1 == "")) {
                    alert("Enter Process Remark1");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
            } 
            $scope.TCAdmissionApp.UserGrp = UserGrp;           

            var getPromise = TCAdmissionAppService.UpdateTCAdmissionApp($scope.TCAdmissionApp);
            getPromise.then(function (data) {
                alert("Submitted Successfully");
                RedirectToListPage();
            }, function (error) {
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                alert(error);
            });
        }
       
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('StudentRequestBoard.ServiceRequestDrillDownReport');
        }
        $scope.DigitalTCAdmissionApp = function () {
            var getPromise = TCAdmissionAppService.GetCertPdf($scope.TCAdmissionApp.FormNo);
            getPromise.then(function (data) {
                $state.go('StudentRequestBoard.AddSign', { PdfPath: data[0].DigiSignPDFURL, PdfPhysicalPath: data[0].DigiSignPDFPhyPath, FormNo: $scope.TCAdmissionApp.FormNo, ReqType: 'TCAdmission' });
            }, function (error) {
                alert(error);
            });
        }
    });
});

