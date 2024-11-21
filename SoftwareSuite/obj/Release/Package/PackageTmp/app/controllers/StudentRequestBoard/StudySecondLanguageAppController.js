define(['app'], function (app) {
    app.controller("StudySecondLanguageAppController", function ($http, $scope, $state, $stateParams, AppSettings, StudySecondLanguageAppService) {
        $scope.StudySecondLanguageApp = { SSLChngID: $stateParams.SSLChngID };
        $scope.PrintDisable = true;
        var StudySecondLanguageAppdata = StudySecondLanguageAppService.GetReqStudySecondLanguageByID($scope.StudySecondLanguageApp.SSLChngID);
        StudySecondLanguageAppdata.then(function (data) {
            $scope.StudySecondLanguageApp = data[0];
            if (AppSettings.SysUsrGrpID == 4) {
                if (data[0].ReqStatus == 'P') { $scope.StudySecondLanguageApp.ReqStatus = "0"; }
                if (data[0].ReqStatus == 'A' || data[0].ReqStatus == 'R') {
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = false;
                    $scope.ShowSubmit = false;
                    $scope.Approver1Status = true;
                }
                else {
                    $scope.ShowLevel1 = false;
                    $scope.ShowLevel2 = false;
                    $scope.ShowSubmit = true;
                    $scope.Approver1Status = false;
                    $scope.showastertisk1 = true;
                    $scope.showastertisk2 = true;

                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'P') { $scope.StudySecondLanguageApp.ReqStatus1 = "0"; }
                if (data[0].ReqStatus1 == 'A' || data[0].ReqStatus1 == 'R') {
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                    $scope.ShowSubmit = false;
                    $scope.Approver1Status = true;
                    $scope.Approver2Status = true;
                    $scope.showastertisk1 = false;
                    $scope.showastertisk2 = false;
                }
                else {
                    $scope.ShowLevel2 = false;
                    $scope.ShowLevel1 = true;
                    $scope.ShowSubmit = true;
                    $scope.Approver1Status = true;
                    $scope.Approver2Status = false;
                    $scope.showastertisk1 = false;
                    $scope.showastertisk2 = false;
                }
            }
            $scope.StudySecondLanguageApp.Address = data[0].HousenoP + ' ' + data[0].StreetnameP;

            $scope.RequestStatus1 = true;
            $scope.RequestStatus2 = true;
            $scope.ProcessRemark1 = true;
            $scope.ProcessRemark2 = true;
            $scope.PrintButtonHide = true;
            $scope.DisableRequestStatus = true;
            $scope.ProcessRemarkRO = true;
            //$scope.RollEditDisable = true;

            if (AppSettings.SysUsrGrpID == 4) {
                UserGrp = "O";
                $scope.RequestStatus1 = false;
                $scope.RequestStatus2 = true;
                $scope.ProcessRemark1 = false;
                $scope.ProcessRemark2 = true;
                $scope.PrintButtonHide = true;
                $scope.DisableRequestStatus = false;
                $scope.ProcessRemarkRO = false;
                $scope.PrintButtonHide = true;
                //if ($scope.StudySecondLanguageApp.ReqStatus != 'P') {
                //    $scope.RollEditDisable = true;
                //}
                //else {
                //    $scope.RollEditDisable = false;
                //}
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                UserGrp = "A";
                $scope.RequestStatus1 = false;
                $scope.RequestStatus2 = false;
                $scope.ProcessRemark1 = false;
                $scope.ProcessRemark2 = false;
                $scope.PrintButtonHide = false;
                $scope.DisableRequestStatus = true;
                $scope.ProcessRemarkRO = true;
                if ($scope.StudySecondLanguageApp.ReqStatus1 == 'A') {
                    //$scope.RollEditDisable = true;
                    $scope.PrintButtonHide = false;
                }
                else {
                   // $scope.RollEditDisable = false;
                    $scope.PrintButtonHide = true;
                }
            }
        }, function (error) {
            alert(error);
        });

        


        $scope.SaveStudySecondLanguageApp = function () {
            $scope.RollEditDisable = true;
            $scope.StudySecondLanguageApp.ProcessbyID = AppSettings.LoggedUserId;
            var UserGrp = "";
            if (AppSettings.SysUsrGrpID == 2) {
                UserGrp = "A";
            } else {
                UserGrp = "O";
            }
            $scope.StudySecondLanguageApp.UserGrp = UserGrp;
            if (UserGrp == "O") {
                if (($scope.StudySecondLanguageApp.ReqStatus == undefined) || ($scope.StudySecondLanguageApp.ReqStatus == "")) {
                    alert("Select Status");
                    $scope.RollEditDisable = false;
                    return;
                }
                if (($scope.StudySecondLanguageApp.ProcessRemark == undefined) || ($scope.StudySecondLanguageApp.ProcessRemark == "")) {
                    alert("Enter Process Remark 1");
                    $scope.RollEditDisable = false;
                    return;
                }
            } else if (UserGrp=="A"){
                if (($scope.StudySecondLanguageApp.ReqStatus1 == undefined) || ($scope.StudySecondLanguageApp.ReqStatus1 == "")) {
                    alert("Select Status");
                    $scope.RollEditDisable = false;
                    return;
                }
                if (($scope.StudySecondLanguageApp.ProcessRemark1 == undefined) || ($scope.StudySecondLanguageApp.ProcessRemark1 == "")) {
                    alert("Enter Process Remark 2");
                    $scope.RollEditDisable = false;
                    return;
                }
            }            
            var getPromise = StudySecondLanguageAppService.UpdateStudySecondLanguageApp($scope.StudySecondLanguageApp);
            getPromise.then(function (data) {
                alert("Submitted Successfully");
                RedirectToListPage();
            }, function (error) {
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                alert(error);
            });
        }
        $scope.ChangeTextArea = function (str, type) {
            if (type == "ReqStatus") {
                if (str == 'A') { $scope.StudySecondLanguageApp.ProcessRemark = "Approved"; }
                else if (str == 'R') { $scope.StudySecondLanguageApp.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'A') { $scope.StudySecondLanguageApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.StudySecondLanguageApp.ProcessRemark1 = "Rejected"; }
            }
        };
        $scope.PrintStudySecondLanguage = function () {
            var getPromise = StudySecondLanguageAppService.GetCertPdf($scope.StudySecondLanguageApp.FormNo);
            getPromise.then(function (data) {
                $state.go('StudentRequestBoard.AddSign', { PdfPath: data[0].DigiSignPDFURL, PdfPhysicalPath: data[0].PDFPhysicalFilePath, FormNo: $scope.StudySecondLanguageApp.FormNo, ReqType: 'StudySecondLanguage' });
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

