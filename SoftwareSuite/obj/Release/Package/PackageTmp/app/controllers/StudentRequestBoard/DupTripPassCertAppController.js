define(['app'], function (app) {
    app.controller("DupTripPassCertAppController", function ($http, $scope, $state, $stateParams, AppSettings, DupTripPassCertAppService) {
        $scope.DupTripPassCertApp = { PassCertID: $stateParams.PassCertID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var DupTripPassCertAppRightsdata = [];
        DupTripPassCertAppRightsdata = AppSettings.UserRights;
        for (var i = 0; i < DupTripPassCertAppRightsdata.length; i++) {
            if (DupTripPassCertAppRightsdata[i].GridFormToOpen == PageNm) {
                if (DupTripPassCertAppRightsdata[i].isaddable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        //$scope.Approver1RemarkValues = true;
        //$scope.Approver1RemarkText = true;
        //$scope.Approver2RemarkValues = true;
        //$scope.Approver2RemarkText = true;
        //$scope.Approver1RemarkRO = true;
        //$scope.Approver2RemarkTextRO = true;
        //$scope.ShowPrint = false;
        //if (AppSettings.SysUsrGrpID == 4) {
        //    UserGrp = "O";
        //    //$scope.Approver1RemarkValues = false;
        //    $scope.Approver1RemarkText = false;
        //    $scope.Approver2RemarkValues = true;
        //    $scope.Approver2RemarkText = true;

        //    $scope.Approver1RemarkRO = false;
        //    $scope.Approver2RemarkTextRO = false;
        //    $scope.ShowPrint = false;
        //} else if (AppSettings.SysUsrGrpID == 2) {
        //    UserGrp = "A";
        //    //$scope.Approver1RemarkValues = false;
        //    $scope.Approver1RemarkText = false;
        //    $scope.Approver2RemarkValues = false;
        //    $scope.Approver2RemarkText = false;

        //    $scope.Approver1RemarkRO = true;
        //    $scope.Approver2RemarkTextRO = true;
        //    $scope.ShowPrint = false;
        //} else {
        //    UserGrp = "J";
        //   // $scope.Approver1RemarkValues = false;
        //    $scope.Approver1RemarkText = false;
        //    $scope.Approver2RemarkValues = true;
        //    $scope.Approver2RemarkText = true;

        //    $scope.Approver1RemarkRO = false;
        //    $scope.Approver2RemarkTextRO = false;
        //    $scope.ShowPrint = true;
        //}
        
        $scope.SaveUploadDoc1 = function () {
            if ($scope.Upload1 != undefined) {
                var fd = new FormData();
                fd.append("file", $scope.Upload1[0]);
                var url = AppSettings.WebApiUrl + "api/ReqDupTripPassCert/PostDwFilePath/?PassCertID=" + $scope.DupTripPassCertApp.PassCertID + "";
                $http.post(url, fd, {
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                }).then(function (data) {
                    alert("Upload Successfully");
                    RedirectToListPage();
                })
                    .catch(function (data, status, headers, config) {
                        alert("Upload error");
                    });
            } else {
                alert("No file selected");
                return;
            }
        }
        $scope.FileUpload1 = function (element) {
            var reader = new FileReader();
            var extn = element.files[0].type.split("/").pop();
            if (extn == "pdf") {
                reader.readAsDataURL(element.files[0]);
                $scope.Upload1 = [];
                var filesize = element.files[0].size;  // in bytes
                if (filesize <= 200000) {
                    $scope.Upload1.push(element.files[0]);
                }
                else {
                    alert("Please select file size below 200 kb");
                    return;
                }
            } else {
                alert("Please upload pdf file only");
                return;
            }
        }
        $scope.UploadFiles = true;
        var DupTripPassCertAppddata = DupTripPassCertAppService.GetReqDupTripPassCertByID($scope.DupTripPassCertApp.PassCertID);
        DupTripPassCertAppddata.then(function (data) {
            $scope.DupTripPassCertApp = data[0];

            if (AppSettings.SysUsrGrpID == 4) {
                if (data[0].ReqStatus == 'P') { $scope.DupTripPassCertApp.ReqStatus = "0"; }
                if (data[0].ReqStatus == 'A' || data[0].ReqStatus == 'R') {
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = false;
                    $scope.showSubmit = false;
                    $scope.Approver1 = false;
                    $scope.Approver2 = false;
                    $scope.Approverdisable = true;

                    $scope.DisableProcessRemark = true;
                    $scope.DisableProcessRemark1 = true;
                    $scope.DisableProcessRemark2 = true;
                }
                else {
                    $scope.ShowLevel1 = false;
                    $scope.ShowLevel2 = false;
                    $scope.showSubmit = true;
                    $scope.Approverdisable = false;

                    $scope.DisableProcessRemark = false;
                    $scope.DisableProcessRemark1 = true;
                    $scope.DisableProcessRemark2 = true;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'P') { $scope.DupTripPassCertApp.ReqStatus1 = "0"; }
                if (data[0].ReqStatus1 == 'A' || data[0].ReqStatus1 == 'R') {
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                    $scope.showSubmit = false;
                    $scope.Approverdisable = true;
                    $scope.Approver1disable = true;
                    $scope.Approver1 = true;
                    $scope.DisableProcessRemark = true;
                    $scope.DisableProcessRemark1 = true;
                    $scope.DisableProcessRemark2 = true;
                }
                else {
                    $scope.ShowLevel2 = false;
                    $scope.ShowLevel1 = true;
                    $scope.Approver1 = true;
                    $scope.Approver2 = false;
                    $scope.showSubmit = true;
                    $scope.Approverdisable = true;
                    $scope.Approver1disable = false;
                    $scope.DisableProcessRemark = true;
                    $scope.DisableProcessRemark1 = false;
                    $scope.DisableProcessRemark2 = true;
                }
            }
            else if (AppSettings.SysUsrGrpID == 11) {
                if (data[0].ReqStatus2 == 'P') { $scope.DupTripPassCertApp.ReqStatus2 = "0"; }
                if (data[0].ReqStatus2 == 'A') {
                    $scope.showSubmit = false;
                    $scope.ShowLevel3 = true;
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                    $scope.Approver1 = true;
                    $scope.Approver2 = true;
                    $scope.Approverdisable = true;
                    $scope.Approver1disable = true;
                    $scope.Approver2disable = true;
                    $scope.Approver3RemarkTextRO = true;
                    $scope.ShowPrint = true;

                    $scope.DisableProcessRemark = true;
                    $scope.DisableProcessRemark1 = true;
                    $scope.DisableProcessRemark2 = true;
                }
                else if ((data[0].ReqStatus2 == 'P') || (data[0].ReqStatus2 == '0')) {
                    $scope.showSubmit = true;
                    $scope.ShowLevel3 = false;
                    $scope.Approverdisable = true;
                    $scope.Approver1disable = true;
                    $scope.Approver2disable = false;
                    $scope.Approver3RemarkTextRO = false;
                    $scope.Approver1 = true;
                    $scope.Approver2 = true;
                    $scope.Approver3 = true;
                    $scope.DisableProcessRemark = true;
                    $scope.DisableProcessRemark1 = true;
                    $scope.DisableProcessRemark2 = false;
                }
                else if ((data[0].ReqStatus2 == 'R')) {
                    $scope.showSubmit = false;
                    $scope.ShowLevel3 = true;
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                    $scope.Approver1 = true;
                    $scope.Approver2 = true;
                    $scope.Approver3RemarkTextRO = true;
                    $scope.Approverdisable = true;
                    $scope.Approver1disable = true;
                    $scope.Approver2disable = true;
                    $scope.DisableProcessRemark = true;
                    $scope.DisableProcessRemark1 = true;
                    $scope.DisableProcessRemark2 = true;
                }
            }

            var StudList = DupTripPassCertAppService.GetStudentMarksInfo($scope.DupTripPassCertApp.HallTicketNo);
            StudList.then(function (Studdata, status, headers, config, error) {
                $scope.DupTripPassCertAppMarks = Studdata[0];

            }, function (error) {
                alert(error);
            });
        }, function (error) {
            alert(error);
        });

        $scope.DigiSignApp = function () {
            var getPromise = DupTripPassCertAppService.GetCertPdf($scope.DupTripPassCertApp.FormNo);
            getPromise.then(function (data) {
                $state.go('StudentRequestBoard.AddSign', { PdfPath: data[0].DigiSignPDFURL, PdfPhysicalPath: data[0].PDFPhysicalFilePath, FormNo: $scope.DupTripPassCertApp.FormNo, ReqType: 'DupTriplicate' });
            }, function (error) {
                alert(error);
            });
        }

        $scope.ChangeTextArea = function (str, type) {
            if (type == "ReqStatus") {
                if (str == 'A') { $scope.DupTripPassCertApp.ProcessRemark = "Approved"; }
                else if (str == 'R') { $scope.DupTripPassCertApp.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'A') { $scope.DupTripPassCertApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.DupTripPassCertApp.ProcessRemark1 = "Rejected"; }
            }
            else if (type == "ReqStatus2") {
                if (str == 'A') { $scope.DupTripPassCertApp.ProcessRemark2 = "Approved"; }
                else if (str == 'R') { $scope.DupTripPassCertApp.ProcessRemark2 = "Rejected"; }
            }
        };
        $scope.SaveDupTripPassCertApp = function () {
            $scope.RollEditDisable = true;
            $scope.DupTripPassCertApp.ProcessbyID = AppSettings.LoggedUserId;
            if (AppSettings.SysUsrGrpID == 4) {
                if (($scope.DupTripPassCertApp.ReqStatus == undefined) || ($scope.DupTripPassCertApp.ReqStatus == "") || ($scope.DupTripPassCertApp.ReqStatus == "0")) {
                    alert("Select Status");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (($scope.DupTripPassCertApp.ProcessRemark == undefined) || ($scope.DupTripPassCertApp.ProcessRemark == "")) {
                    alert("Enter Process Remark");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
            } else if (AppSettings.SysUsrGrpID == 2) {
                if (($scope.DupTripPassCertApp.ReqStatus1 == undefined) || ($scope.DupTripPassCertApp.ReqStatus1 == "") || ($scope.DupTripPassCertApp.ReqStatus1 == "0")) {
                    alert("Select Status");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (($scope.DupTripPassCertApp.ProcessRemark1 == undefined) || ($scope.DupTripPassCertApp.ProcessRemark1 == "")) {
                    alert("Enter Process Remark");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
            } else {
                if (($scope.DupTripPassCertApp.ReqStatus2 == undefined) || ($scope.DupTripPassCertApp.ReqStatus2 == "") || ($scope.DupTripPassCertApp.ReqStatus2 == "0")) {
                    alert("Select Status");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (($scope.DupTripPassCertApp.ProcessRemark2 == undefined) || ($scope.DupTripPassCertApp.ProcessRemark2 == "")) {
                    alert("Enter Process Remark");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
            }
            var UserGrp = "";
            if (AppSettings.SysUsrGrpID == 4) {
                UserGrp = "O";
            } else if (AppSettings.SysUsrGrpID == 2) {
                UserGrp = "A";
            } else {
                UserGrp = "J"
            }
            $scope.DupTripPassCertApp.UserGrp = UserGrp;
            var getPromise = DupTripPassCertAppService.UpdateDupTripPassCertApp($scope.DupTripPassCertApp);
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
    });
});