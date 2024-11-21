define(['app'], function (app) {
    app.controller("GroupChangeAppController", function ($http, $scope, $state, $stateParams, AppSettings, GroupChangeAppService) {
        $scope.GroupChangeApp = { GrpChngID: $stateParams.GrpChngID };
        var ProcRegex = /^[0-9a-zA-Z\-.," '!]+$/;
        $scope.ShowSubmit = true;
        if (AppSettings.SysUsrGrpID == 2) {
            $scope.ViewAuth = true;
            $scope.ShowDigital = true;
            $scope.StatusDisable = true;
            $scope.ShowReq = false;
        } else {
            $scope.ViewAuth = false;
            $scope.ShowDigital = false;
            $scope.ShowReq = true;
        }
        $scope.CheckProcess = function () {
            if (AppSettings.SysUsrGrpID == 2) {
                if (!ProcRegex.test($scope.GroupChangeApp.ProcessRemark1)) {
                    $scope.GroupChangeApp.ProcessRemark1 = $scope.GroupChangeApp.ProcessRemark1.slice(0, -1);
                }
            }
            else {
                if (!ProcRegex.test($scope.GroupChangeApp.ProcessRemark)) {
                    $scope.GroupChangeApp.ProcessRemark = $scope.GroupChangeApp.ProcessRemark.slice(0, -1);
                }
            }
        }
        var GroupChangeAppddata = GroupChangeAppService.GetStudInfoByGrpChngId($scope.GroupChangeApp.GrpChngID);
        GroupChangeAppddata.then(function (data) {
            $scope.GroupChangeApp = data[0];
            if (AppSettings.SysUsrGrpID == 4) {
                if (data[0].ReqStatus == 'P') { $scope.GroupChangeApp.ReqStatus = "0"; }
                if (data[0].ReqStatus == 'A' || data[0].ReqStatus == 'R') {
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = false;
                    $scope.StatusDisable = true;
                    $scope.ShowSubmit = false;
                }
                else {
                    $scope.ShowLevel1 = false;
                    $scope.ShowLevel2 = false;
                    scope.StatusDisable = false;
                    $scope.ShowSubmit = true;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'P') { $scope.GroupChangeApp.ReqStatus1 = "0"; }
                if (data[0].ReqStatus1 == 'A' || data[0].ReqStatus1 == 'R') {
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                }
                else {
                    $scope.ShowLevel2 = false;
                    $scope.ShowLevel1 = true;
                }
            }
            if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'P') { $scope.GroupChangeApp.ReqStatus1 = "0"; }
                if (data[0].ReqStatus1 == '0' || data[0].ReqStatus1 == 'R') {
                    $scope.DigitalDisable = true;
                }
                else {
                    $scope.DigitalDisable = false;
                }
                if (data[0].ReqStatus1 == 'R') {
                    $scope.ShowDigital = false;
                }
                if (data[0].ReqStatus1 == 'A' || data[0].ReqStatus1 == 'R') {
                    $scope.Status1Disable = true;
                }
                else {
                    $scope.Status1Disable = false;
                }
                if (data[0].ReqStatus1 == 'A' || data[0].ReqStatus1 == 'R') {
                    $scope.ShowSubmit = false;
                }
                else {
                    $scope.ShowSubmit = true;
                }
                if (data[0].ReqStatus1 == 'A' && (data[0].DigiSignBy != null && data[0].DigiSignBy != "null" && data[0].DigiSignBy != "")) {
                    $scope.ShowDigital = false;
                }
            }
        }, function (error) {
            alert(error);
            });

        $scope.ChangeTextArea = function (str, type) {
            if (type == "ReqStatus") {
                if (str == 'A') { $scope.GroupChangeApp.ProcessRemark = "Approved"; }
                else if (str == 'R') { $scope.GroupChangeApp.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'A') { $scope.GroupChangeApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.GroupChangeApp.ProcessRemark1 = "Rejected"; }
            }
        };

        $scope.SaveGroupChangeApp = function () {
            $scope.RollEditDisable = true;
            $scope.GroupChangeApp.ProcessbyID = AppSettings.LoggedUserId;
            if (($scope.GroupChangeApp.ReqStatus == undefined) || ($scope.GroupChangeApp.ReqStatus == "")) {
                alert("Select Request Status");
                $scope.RollEditDisable = false;
                return;
            }
            if (($scope.GroupChangeApp.ProcessRemark == undefined) || ($scope.GroupChangeApp.ProcessRemark == "")) {
                alert("Enter Process Remark");
                $scope.RollEditDisable = false;
                return;
            }
            if ($scope.ViewAuth == true) {
                if (($scope.GroupChangeApp.ReqStatus1 == undefined) || ($scope.GroupChangeApp.ReqStatus1 == "")) {
                    alert("Select Request Status1");
                    $scope.RollEditDisable = false;
                    return;
                }
                if (($scope.GroupChangeApp.ProcessRemark1 == undefined) || ($scope.GroupChangeApp.ProcessRemark1 == "")) {
                    alert("Enter Process Remark1");
                    $scope.RollEditDisable = false;
                    return;
                }
            }
            var UserGrp = "";
            if (AppSettings.SysUsrGrpID == 2) {
                UserGrp = "A";
                $scope.GroupChangeApp.UserGrp = "A";
            } else {
                UserGrp = "O";
                $scope.GroupChangeApp.UserGrp = "O";
            }
            if (AppSettings.SysUsrGrpID == 2) {
                if (!ProcRegex.test($scope.GroupChangeApp.ProcessRemark1)) {
                    alert("Invalid data in Process Remark1.");
                    $scope.RollEditDisable = false;
                    return;
                }
            }
            else {
                if (!ProcRegex.test($scope.GroupChangeApp.ProcessRemark)) {
                    alert("Invalid data in Process Remark.");
                    $scope.RollEditDisable = false;
                    return;
                }
            }
            $scope.GroupChangeApp.UserGrp = UserGrp;
            var getPromise = GroupChangeAppService.UpdateGroupChangeApp($scope.GroupChangeApp);
            getPromise.then(function (data) {
                if (data == 1) {
                    alert("Submitted Successfully");
                    RedirectToListPage();
                }
                if (data == 2) {
                    alert("Submitted Successfully. Please click Digital Sign button to complete Digital Sign Process.");
                    $scope.DigitalDisable = false;
                    $scope.ShowSubmit = false;
                    //RedirectToListPage();
                }
                else {
                    //alert(data);
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.DigitalGroupChangeApp = function () {
            var getPromise = GroupChangeAppService.GetCertPdf($scope.GroupChangeApp.FormNo);
            getPromise.then(function (data) {
                $state.go('StudentRequestBoard.AddSign', { PdfPath: data[0].DigiSignPDFURL, PdfPhysicalPath: data[0].DigiSignPDFPhyPath, FormNo: $scope.GroupChangeApp.FormNo, ReqType: 'Group_Change' });
            }, function (error) {
                alert(error);
            });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('StudentRequestBoard.ServiceRequestDrillDownReport');
        }
    });
});

