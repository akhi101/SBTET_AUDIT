define(['app'], function (app) {
    app.controller("ReAdmissionAppController", function ($http, $scope, $state, $stateParams, AppSettings, ReAdmissionService) {
        $scope.ReAdmissionApp = { ReAdmissionID: $stateParams.ReAdmissionID };
     
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
        $scope.ApproverRemarksDisable = true;
        $scope.StatusDisable = true;
        if (AppSettings.SysUsrGrpID == 4) {
            UserGrp = "O";
            $scope.ApproverStatus = false;
            $scope.ApproverRemarks = false;
            $scope.Approver1Status = true;
            $scope.Approver1Remarks = true;

            $scope.ApproverRemarksDisable = false;
            $scope.StatusDisable = false;
        }
        else if (AppSettings.SysUsrGrpID == 2) {
            UserGrp = "A";
            $scope.ApproverStatus = false;
            $scope.ApproverRemarks = false;
            $scope.Approver1Status = false;
            $scope.Approver1Remarks = false;
            $scope.ApproverRemarksDisable = true;
            $scope.StatusDisable = true;
        }
        $scope.PrintDisable = true;
        var ReAdmissionAppddata = ReAdmissionService.GetReqReAdmissionByID($scope.ReAdmissionApp.ReAdmissionID);
        ReAdmissionAppddata.then(function (data) {
            $scope.ReAdmissionApp = data[0];

            if ($scope.ReAdmissionApp.AdmNo == null) {
                $scope.ReAdmissionApp.AdmNo = $scope.ReAdmissionApp.AdmNoA;
            }
            if ($scope.ReAdmissionApp.AcdYrName == null) {
                $scope.ReAdmissionApp.AcdYrName = $scope.ReAdmissionApp.AcdYrNameA;
            }
            if ($scope.ReAdmissionApp.MotherName == null) {
                $scope.ReAdmissionApp.MotherName = $scope.ReAdmissionApp.MotherNameA;
            }

            if (AppSettings.SysUsrGrpID == 4) {
                if (data[0].ReqStatus == 'P') {
                    $scope.ReAdmissionApp.ReqStatus = "0";
                    $scope.DigitalHide = true;
                    $scope.DigitalDisable = true;
                    $scope.SubmitHide = false;
                    $scope.ApproverRemarksDisable = false;
                    $scope.StatusDisable = false;
                }
                else if ((data[0].ReqStatus == 'A') || (data[0].ReqStatus == 'R')) {
                    $scope.DigitalHide = true;
                    $scope.DigitalDisable = true;
                    $scope.SubmitHide = true;
                    $scope.ApproverRemarksDisable = true;
                    $scope.StatusDisable = true;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'P') {
                    $scope.ReAdmissionApp.ReqStatus1 = "0";
                    $scope.DigitalHide = true;
                    $scope.DigitalDisable = true;
                    $scope.SubmitHide = false;
                    $scope.Approver1RemarksDisable = false;
                    $scope.Status1Disable = false;
                }
                else if ((data[0].ReqStatus1 == 'A') || (data[0].ReqStatus1 == 'R')) {
                    $scope.DigitalHide = false;
                    $scope.DigitalDisable = false;
                    $scope.SubmitHide = true;
                    $scope.ReqStatus1 = true;
                    $scope.Approver1RemarksDisable = true;
                    $scope.Status1Disable = true;

                    if ((data[0].DigiSignBy != undefined) && (data[0].DigiSignBy != "")) {
                        $scope.DigitalHide = true;
                    }
                }
            }
        }, function (error) {
            alert(error);
        });
        $scope.ChangeTextArea = function (str, type) {
            if (type == "ReqStatus") {
                if (str == 'A') { $scope.ReAdmissionApp.ProcessRemark = "Approved"; }
                else if (str == 'R') { $scope.ReAdmissionApp.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'A') { $scope.ReAdmissionApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.ReAdmissionApp.ProcessRemark1 = "Rejected"; }
            }
        };
        //$scope.UploadFiles = true;
        $scope.SaveReAdmission = function () {
            $scope.RollEditDisable = true;
            $scope.ReAdmissionApp.ProcessbyID = AppSettings.LoggedUserId;
            if (($scope.ReAdmissionApp.ReqStatus == undefined) || ($scope.ReAdmissionApp.ReqStatus == "")) {
                alert("Select Status");
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                return;
            }
            if (($scope.ReAdmissionApp.ProcessRemark == undefined) || ($scope.ReAdmissionApp.ProcessRemark == "")) {
                alert("Enter Process Remark");
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                return;
            }

            if (AppSettings.SysUsrGrpID == 2) {
                UserGrp = "A";
                if (($scope.ReAdmissionApp.ProcessRemark1 == undefined) || ($scope.ReAdmissionApp.ProcessRemark1 == "")) {
                    alert("Enter Process Remark1");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
            } 
            $scope.ReAdmissionApp.UserGrp = UserGrp;
            var getPromise = ReAdmissionService.UpdateReAdmissionApp($scope.ReAdmissionApp);
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
        $scope.DigitalReAdmissionApp = function () {
            var getPromise = ReAdmissionService.GetCertPdf($scope.ReAdmissionApp.FormNo);
            getPromise.then(function (data) {
                $state.go('StudentRequestBoard.AddSign', { PdfPath: data[0].DigiSignPDFURL, PdfPhysicalPath: data[0].DigiSignPDFPhyPath, FormNo: $scope.ReAdmissionApp.FormNo, ReqType: 'ReAdmission' });
            }, function (error) {
                alert(error);
            });
        }
    });
});

