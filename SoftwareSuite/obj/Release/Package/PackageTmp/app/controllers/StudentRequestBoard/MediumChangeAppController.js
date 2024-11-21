define(['app'], function (app) {
    app.controller("MediumChangeAppController", function ($http, $scope, $state, $stateParams, AppSettings, MediumChangeAppService) {
        $scope.MediumChangeApp = { MedChngID: $stateParams.MedChngID };
        var ProcRegex = /^[0-9a-zA-Z\-.," '!]+$/;
        if (AppSettings.SysUsrGrpID == 2) {
            $scope.ViewAuth = true;
            $scope.ShowPrint = true;
            $scope.StatusDisable = true;
            $scope.showastertisk = true;
        } else {
            $scope.ViewAuth = false;
            $scope.ShowPrint = false;
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
        var MediumChangeAppddata = MediumChangeAppService.GetReqMediumChangeByID($scope.MediumChangeApp.MedChngID);
        MediumChangeAppddata.then(function (data) {
            $scope.MediumChangeApp = data[0];
            if (AppSettings.SysUsrGrpID == 4) {
                if (data[0].ReqStatus == 'P') { $scope.MediumChangeApp.ReqStatus = "0"; }
                if (data[0].ReqStatus == 'A' || data[0].ReqStatus == 'R') {
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = false;
                    $scope.StatusDisable = true;
                    $scope.ShowSubmit = false;
                }
                else {
                    $scope.ShowLevel1 = false;
                    $scope.ShowLevel2 = false;
                    $scope.StatusDisable = false;
                    $scope.ShowSubmit = true;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'P') { $scope.MediumChangeApp.ReqStatus1 = "0"; }
                if ((data[0].ReqStatus1 == 'R') || (data[0].ReqStatus1 == '0')) {
                    $scope.ShowPrint = false;
                }
                if (data[0].ReqStatus1 == 'A' || data[0].ReqStatus1 == 'R') {
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                    $scope.Status1Disable = true;
                    $scope.ShowSubmit = false;
                }
                else {
                    $scope.ShowLevel2 = false;
                    $scope.ShowLevel1 = true;
                    $scope.Status1Disable = false;
                    $scope.ShowSubmit = true;
                }
                if ((data[0].ReqStatus1 == 'A') && (data[0].DigiSignBy != null && data[0].DigiSignBy != "null" && data[0].DigiSignBy != "")) {
                    $scope.ShowPrint = false;
                }

            }
            //if (AppSettings.SysUsrGrpID == 2) {
            //    //if ((data[0].ReqStatus1 == 'R') || (data[0].ReqStatus1 == '0')) {
            //    //    $scope.ShowPrint = false;
            //    //}
            //    //else {
            //    //    $scope.ShowPrint = true;
            //    //}
               
            //}
            ///else { $scope.ShowPrint = false;}
            
           
        }, function (error) {
            alert(error);
        });
        $scope.ChangeTextArea = function (str, type) {
            if (type == "ReqStatus") {
                if (str == 'A') { $scope.MediumChangeApp.ProcessRemark = "Approved"; }
                else if (str == 'R') { $scope.MediumChangeApp.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'A') { $scope.MediumChangeApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.MediumChangeApp.ProcessRemark1 = "Rejected"; }
            }
        };

       
        $scope.SaveMediumChangeApp = function () {
            $scope.RollEditDisable = true;
            $scope.MediumChangeApp.ProcessbyID = AppSettings.LoggedUserId;
            if (($scope.MediumChangeApp.ReqStatus == undefined) || ($scope.MediumChangeApp.ReqStatus == "0")) {
                alert("Select Accept/Reject at Level 1");
                $scope.RollEditDisable = false;
                return;
            }
            if (($scope.MediumChangeApp.ProcessRemark == undefined) || ($scope.MediumChangeApp.ProcessRemark == "")) {
                alert("Enter Process Remark at Level 1");
                $scope.RollEditDisable = false;
                return;
            }
            if ($scope.ViewAuth == true) {
                if (($scope.MediumChangeApp.ReqStatus1 == undefined) || ($scope.MediumChangeApp.ReqStatus1 == "")) {
                    alert("Select Accept/Reject at Level 2");
                    $scope.RollEditDisable = false;
                    return;
                }
                if (($scope.MediumChangeApp.ProcessRemark1 == undefined) || ($scope.MediumChangeApp.ProcessRemark1 == "")) {
                    alert("Enter Process Remark at Level 2");
                    $scope.RollEditDisable = false;
                    return;
                }
            }

            var UserGrp = "";
            if (AppSettings.SysUsrGrpID == 2) {
                UserGrp = "A";
                $scope.MediumChangeApp.UserGrp = "A";
            } else {
                UserGrp = "O";
                $scope.MediumChangeApp.UserGrp = "O";
            }
            if (AppSettings.SysUsrGrpID == 2) {
                if (($scope.MediumChangeApp.ProcessRemark1 == undefined) || ($scope.MediumChangeApp.ProcessRemark1 == "")) {
                    alert("Enter Process Remark at Level 2");
                    $scope.RollEditDisable = false;
                    return;
                }
                else {
                    if (!ProcRegex.test($scope.MediumChangeApp.ProcessRemark1)) {
                        alert("Invalid data in Process Remark at Level 2.");
                        $scope.RollEditDisable = false;
                        return;
                    }
                }
            }
            else if (AppSettings.SysUsrGrpID == 4)  {
                if (!ProcRegex.test($scope.MediumChangeApp.ProcessRemark)) {
                    alert("Invalid data in Process Remark at Level 1.");
                    $scope.RollEditDisable = false;
                    return;
                }
            }
            $scope.MediumChangeApp.UserGrp = UserGrp;
            var getPromise = MediumChangeAppService.UpdateMediumChangeApp($scope.MediumChangeApp);
            getPromise.then(function (data) {
                if (AppSettings.SysUsrGrpID != 2) {
                    alert("Submitted Successfully");
                    RedirectToListPage();
                }
                else {
                    if (AppSettings.SysUsrGrpID == 2) {
                        if ($scope.MediumChangeApp.ReqStatus1 == 'A')
                        {
                        $scope.ShowPrint = true;
                        alert("Submitted Successfully, You Can Proceed With Digital Sign.");
                        }
                        else {
                        $scope.ShowPrint = false;
                        alert("Submitted Successfully");
                        }
                        return;
                    }
                    else {
                        alert("Saved Successfully");
                        RedirectToListPage();
                    }

                }
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
        $scope.PrintMediumChangeApp = function () {
            var getPromise = MediumChangeAppService.GetCertPdf($scope.MediumChangeApp.FormNo);
            getPromise.then(function (data) {
                $state.go('StudentRequestBoard.AddSign', { PdfPath: data[0].DigiSignPDFURL, PdfPhysicalPath: data[0].DigiSignPDFPhyPath, FormNo: $scope.MediumChangeApp.FormNo, ReqType: 'Medium_Change' });
            }, function (error) {
                alert(error);
            });
        }
        //$scope.PrintMediumChangeApp = function () {
        //    var fd = new FormData();
        //    var url = AppSettings.WebApiUrl + "api/ReqMediumChange/GenCertPDF/?FormNo=" + $scope.MediumChangeApp.FormNo + "";
        //    $http.post(url, fd, {
        //        headers: { 'Content-Type': undefined },
        //        transformRequest: angular.identity
        //    }).then(function (data) {
        //        $state.go('StudentRequestBoard.AddSign', { PdfPath: data.data[0].DwFilePath, PdfPhysicalPath: data.data[0].PDFPhysicalFilePath, FormNo: data.data[0].FormNo, ReqType: 'Medium_Change' });
        //    })
        //}
    });
});

