define(['app'], function (app) {
    app.controller("PHExemptionAppController", function ($http, $scope, $state, $stateParams, AppSettings, PHExemptionAppService) {
        $scope.PHExemptionApp = { PHExceptionID: $stateParams.PHExceptionID };
        var ProcRegex = /^[0-9a-zA-Z\-.," '!]+$/;

        $scope.DigitalSignHide = true;
        $scope.SubmitHide = true;
        $scope.Approver1RemarkRO = true;
        $scope.Star1Hide = true;
        $scope.Approver2RemarkRO = true;
        $scope.Star2Hide = true;
        $scope.Approver3RemarkRO = true;
        $scope.Star3Hide = true;
        $scope.Approver4RemarkRO = true;
        $scope.Star4Hide = true;

        var UserGrp = "";
        if (AppSettings.SysUsrGrpID == 4) { //Sup
            UserGrp = "O";

        } else if (AppSettings.SysUsrGrpID == 2) {  //DS
            UserGrp = "A";
            
        }
        else if (AppSettings.SysUsrGrpID == 11) {   //JS
            UserGrp = "J";
            
        }
        else if (AppSettings.SysUsrGrpID == 111111) {   //COE
            UserGrp = "C";
        }
        $scope.CheckProcess = function () {
            if (AppSettings.SysUsrGrpID == 2) {
                if (!ProcRegex.test($scope.MediumChangeApp.ProcessRemark1)) {
                    $scope.MediumChangeApp.ProcessRemark1 = $scope.MediumChangeApp.ProcessRemark1.slice(0, -1);
                }
            }
            else {
                if (!ProcRegex.test($scope.MediumChangeApp.ProcessRemark)) {
                    $scope.MediumChangeApp.ProcessRemark = $scope.MediumChangeApp.ProcessRemark.slice(0, -1);
                }
            }
        }

        //$scope.PrintDisable = true;
        var PHExemptionAppdata = PHExemptionAppService.GetReqPHExceptionByID($scope.PHExemptionApp.PHExceptionID);
        PHExemptionAppdata.then(function (data) {
            $scope.PHExemptionAppdata = data[0];
            if (AppSettings.SysUsrGrpID == 4) {//
                if (data[0].ReqStatus == 'P') { $scope.PHExemptionApp.ReqStatus = "0"; }
                if (data[0].ReqStatus == 'A' || data[0].ReqStatus == 'R') {
                                          // After Show data SUP Approved/Rejected status (1st Year Study Student)
                        $scope.SubmitHide = true;
                        $scope.Approver1RemarkRO = true;
                        $scope.Star1Hide = true;
                        $scope.Approver2RemarkRO = true;
                        $scope.Star2Hide = true;
                        $scope.Approver3RemarkRO = true;
                        $scope.Star3Hide = true;
                        $scope.Approver4RemarkRO = true;
                        $scope.Star4Hide = true;
                }
                else {
                                                     //First time Approved/Rejectd SUP (1st year Study Student)
                        $scope.SubmitHide = false;

                        $scope.Star1Hide = false;
                        $scope.Approver1RemarkRO = false;

                        $scope.Status2Hide = true;
                        $scope.Status3Hide = true;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'P') { $scope.PHExemptionApp.ReqStatus1 = "0"; }
                if (data[0].ReqStatus1 == 'A' || data[0].ReqStatus1 == 'R') {
                                                                  //After Show data Approved/Rejected DS (1st Year Study Student)
                        $scope.SubmitHide = true;

                        $scope.Approver1RemarkRO = true;
                        $scope.Star1Hide = true;

                        $scope.Approver2RemarkRO = true;
                        $scope.Star2Hide = true;

                        $scope.Approver3RemarkRO = true;
                        $scope.Star3Hide = true;
                }
                else {
                                          //First Time Approved/Rejected DS (1st Year Study Student)
                        $scope.SubmitHide = false;
                        $scope.Star1Hide = true;
                        $scope.Approver1RemarkRO = true;

                        $scope.Star2Hide = false;
                        $scope.Approver2RemarkRO = false;
                }
            }
            else if (AppSettings.SysUsrGrpID == 11) {
                if (data[0].ReqStatus2 == 'P') { $scope.PHExemptionApp.ReqStatus2 = "0"; }
                if (data[0].ReqStatus2 == 'A' || data[0].ReqStatus2 == 'R') {
                        $scope.SubmitHide = true;
                        $scope.DigitalSignHide = false;
                        $scope.Approver1RemarkRO = true;    //After Show data Approved/Rejected JS (1st Year Study Student)
                        $scope.Star1Hide = true;

                        $scope.Approver2RemarkRO = true;
                        $scope.Star2Hide = true;

                        $scope.Approver3RemarkRO = true;
                        $scope.Star3Hide = true;
                }
                else {
                        $scope.SubmitHide = false;              //First Time Approved/Rejected JS 

                        $scope.Star1Hide = true;
                        $scope.Approver1RemarkRO = true;

                        $scope.Star2Hide = true;
                        $scope.Approver2RemarkRO = true;

                        $scope.Star3Hide = false;
                        $scope.Approver3RemarkRO = false;
                }
            }
            else if (AppSettings.SysUsrGrpID == 11111111) {
                if (data[0].ReqStatus3 == 'P') { $scope.PHExemptionApp.ReqStatus3 = "0"; }
                if (data[0].ReqStatus3 == 'A' || data[0].ReqStatus3 == 'R') {
                    $scope.SubmitHide = true;
                    $scope.DigitalSignHide = false;
                    $scope.Approver1RemarkRO = true;    //After Show data Approved/Rejected JS (1st Year Study Student)
                    $scope.Star1Hide = true;

                    $scope.Approver2RemarkRO = true;
                    $scope.Star2Hide = true;

                    $scope.Approver3RemarkRO = true;
                    $scope.Star3Hide = true;
                    $scope.Approver4RemarkRO = true;
                    $scope.Star4Hide = true;
                    if ($scope.PHExemptionApp.DigiSignBy == null) {     //Digital Sign check yes or no
                        $scope.DigitalSignHide = false;
                    }
                    else {
                        $scope.DigitalSignHide = true;
                    }
                }
                else {
                    $scope.SubmitHide = false;              //First Time Approved/Rejected JS 

                    $scope.Star1Hide = true;
                    $scope.Approver1RemarkRO = true;

                    $scope.Star2Hide = true;
                    $scope.Approver2RemarkRO = true;

                    $scope.Star3Hide = true;
                    $scope.Approver3RemarkRO = true;
                    $scope.Star4Hide = false;
                    $scope.Approver4RemarkRO = false;
                }
            }
            if (AppSettings.SysUsrGrpID == 2) {
                if ((data[0].ReqStatus1 == '0')) {
                    //$scope.ShowPrint = false;
                }
                else {
                    //$scope.ShowPrint = true;
                }
            }
            else { $scope.ShowPrint = false;}
            
            if ((data[0].ReqStatus1 == 'R') || (data[0].ReqStatus1 == '0')) {
               // $scope.ShowPrint = false;
            }
            else
            {
                //$scope.ShowPrint = true;
            }
            //Check Get Document for Disability Certificates
            if ($scope.PHExemptionApp.Upload1DisabilityCert == null) {
                $scope.disabilityCertHide = true;
            }
            else {
                $scope.disabilityCertHide = false;
            }
            //Check Get Document for Marks Memo
            if ($scope.PHExemptionApp.Upload2MarksMemo == null) {
                $scope.MarksMemoHide = true;
            }
            else {
                $scope.MarksMemoHide = false;
            }
           

        }, function (error) {
            alert(error);
        });
        $scope.ChangeTextArea = function (str, type) {
            if (type == "ReqStatus") {
                if (str == 'A') { $scope.PHExemptionApp.ProcessRemark = "Approved"; }
                else if (str == 'R') { $scope.PHExemptionApp.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'A') { $scope.PHExemptionApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.PHExemptionApp.ProcessRemark1 = "Rejected"; }
            }
            else if (type == "ReqStatus2") {
                if (str == 'A') { $scope.PHExemptionApp.ProcessRemark2 = "Approved"; }
                else if (str == 'R') { $scope.PHExemptionApp.ProcessRemark2 = "Rejected"; }
            }
            else if (type == "ReqStatus3") {
                if (str == 'A') { $scope.PHExemptionApp.ProcessRemark3 = "Approved"; }
                else if (str == 'R') { $scope.PHExemptionApp.ProcessRemark3 = "Rejected"; }
            }
        };

        $scope.SavePHeExemptionApp = function () {
            $scope.RollEditDisable = true;
            $scope.PHExemptionApp.ProcessbyID = AppSettings.LoggedUserId;
            if (AppSettings.SysUsrGrpID == 4) {
                if (($scope.PHExemptionApp.ReqStatus == undefined) || ($scope.PHExemptionApp.ReqStatus == "0")) {
                    alert("Select Accept / Reject at Level 1");
                    $scope.RollEditDisable = false;
                    //$scope.UploadFiles = true;
                    return;
                }
                if (($scope.PHExemptionApp.ProcessRemark == undefined) || ($scope.PHExemptionApp.ProcessRemark == "")) {
                    alert("Enter Process Remark at Level 1.");
                    $scope.RollEditDisable = false;
                    //$scope.UploadFiles = true;
                    return;
                }
                if (!ProcRegex.test($scope.PHExemptionApp.ProcessRemark)) {
                    alert("Invalid data in Process Remark at Level 1.");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (($scope.PHExemptionApp.ReqStatus1 == undefined) || ($scope.PHExemptionApp.ReqStatus1 == "0")) {
                    alert("Select Accept / Reject at Level 2");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (($scope.PHExemptionApp.ProcessRemark1 == undefined) || ($scope.PHExemptionApp.ProcessRemark1 == "")) {
                    alert("Enter Process Remark at Level 2.");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (!ProcRegex.test($scope.PHExemptionApp.ProcessRemark1)) {
                    alert("Invalid data in Process Remark at Level 2.");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }

            }
            else if (AppSettings.SysUsrGrpID == 11) {
                if (($scope.PHExemptionApp.ReqStatus2 == undefined) || ($scope.PHExemptionApp.ReqStatus2 == "0")) {
                    alert("Select Accept / Reject at Level 3");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (($scope.PHExemptionApp.ProcessRemark2 == undefined) || ($scope.PHExemptionApp.ProcessRemark2 == "")) {
                    alert("Enter Process Remark at Level 3.");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (!ProcRegex.test($scope.PHExemptionApp.ProcessRemark2)) {
                    alert("Invalid data in Process Remark at Level 3.");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
            }
            else if (AppSettings.SysUsrGrpID == 11111111) {
                if (($scope.PHExemptionApp.ReqStatus3 == undefined) || ($scope.PHExemptionApp.ReqStatus3 == "0")) {
                    alert("Select Accept / Reject at Level 4");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (($scope.PHExemptionApp.ProcessRemark3 == undefined) || ($scope.PHExemptionApp.ProcessRemark3 == "")) {
                    alert("Enter Process Remark at Level 4.");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (!ProcRegex.test($scope.PHExemptionApp.ProcessRemark3)) {
                    alert("Invalid data in Process Remark at Level 4.");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
            }
            var UserGrp = "";
            if (AppSettings.SysUsrGrpID == 4) { //Sup
                UserGrp = "O";
                //$scope.Approver2 = false;
                //$scope.Approver1 = false;
            } else if (AppSettings.SysUsrGrpID == 2) {  //DS
                UserGrp = "A";
                //$scope.Approver2 = false;
                //$scope.Approver1 = true;
                //$scope.FirstLoginStatus = true;
            }
            else if (AppSettings.SysUsrGrpID == 11) {   //JS
                UserGrp = "J";
                //$scope.FirstLoginStatus = true;
                //$scope.SecondLoginStatus = true;
                //$scope.Approver2 = true;
                //$scope.Approver1 = true;

            }
            else if (AppSettings.SysUsrGrpID == 11111) {   //JS
                UserGrp = "C";
            }

            $scope.PHExemptionApp.UserGrp = UserGrp;
            var getPromise = PHExemptionAppService.UpdatePHExemptionApp($scope.PHExemptionApp);
            getPromise.then(function (data) {
                if (AppSettings.SysUsrGrpID == 4) {
                    alert("Submitted Successfully");
                    RedirectToListPage();
                }
                else if (AppSettings.SysUsrGrpID == 2) {
                    $scope.ShowPrint = true;
                    $scope.ShowSubmit = true;
                    alert("Saved Successfully");
                    RedirectToListPage();
                }
                else if (AppSettings.SysUsrGrpID == 11) {
                    $scope.ShowPrint = true;
                    $scope.ShowSubmit = true;
                    alert("Saved Successfully");
                    RedirectToListPage();
                }
                else if (AppSettings.SysUsrGrpID == 111111) {
                    alert("Saved Successfully");
                    $scope.SubmitHide = true;
                    if ($scope.PHExemptionApp.ReqStatus3 == 'A') {
                        $scope.DigitalSignHide = false;
                    }
                    else {
                        $scope.DigitalSignHide = true;
                    }
                }
                
            }, function (error) {
                $scope.RollEditDisable = false;
                alert(error);
            });
        }
       
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('StudentRequestBoard.ServiceRequestDrillDownReport');
        }
        $scope.PrintPHExemptionApp = function () {
            var getPromise = AttendanceExemptionAppService.GetCertPdf($scope.PHExemptionApp.FormNo);
            getPromise.then(function (data) {
                $state.go('StudentRequestBoard.AddSign', { PdfPath: data[0].DigiSignPDFURL, PdfPhysicalPath: data[0].DigiSignPDFPhyPath, FormNo: $scope.PHExemptionApp.FormNo, ReqType: 'Medium_Change' });
            }, function (error) {
                alert(error);
            });
        }
        
    });
});

