define(['app'], function (app) {
	app.controller("MigrCertAppController", function ($http, $scope, $state, $stateParams, AppSettings, MigrCertAppService) {
        $scope.MigrCertApp = { MigrCertID: $stateParams.MigrCertID };
		
        var UserGrp = "";
        if (AppSettings.SysUsrGrpID == 11) {
            UserGrp = "A";
            $scope.Approver1 = true;
            $scope.ApproverRemarks = true;
            $scope.PrintShow = true;
            $scope.ShowAstertisk = false;
        } else {
            UserGrp = "O";
            $scope.Approver1 = false;
            $scope.PrintShow = false;
            $scope.ShowAstertisk = true;
        }

		var MigrCertAppddata = MigrCertAppService.GetReqMigrCertByID($scope.MigrCertApp.MigrCertID);
		MigrCertAppddata.then(function (data) {
            $scope.MigrCertApp = data[0];
            if (AppSettings.SysUsrGrpID == 4) {
                if (data[0].ReqStatus == 'P') { $scope.MigrCertApp.ReqStatus = "0";}
                if (data[0].ReqStatus == 'A' || data[0].ReqStatus == 'R') {
                    $scope.ApproverRemarks = true;
                    $scope.ShowSubmit = false;
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = false;
                    $scope.ShowPrint = false;
                }
                else {
                    $scope.ApproverRemarks = false;
                    $scope.ShowSubmit = true;
                    $scope.ShowLevel1 = false;
                    $scope.ShowLevel2 = false;
                    $scope.ShowPrint = false;
                }
            }
            else if (AppSettings.SysUsrGrpID == 11) {
                if (data[0].ReqStatus1 == 'P') { $scope.MigrCertApp.ReqStatus1 = "0"; }
                if ((data[0].ReqStatus1 == 'R') || (data[0].ReqStatus1 == '0'))
                {
                    $scope.PrintShow = false;
                }
                if (data[0].ReqStatus1 == 'A' || data[0].ReqStatus1 == 'R') {
                    $scope.ShowSubmit = false;
                    $scope.Status1Disable = true;
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                }
                else {
                    $scope.ShowSubmit = true;
                    $scope.Status1Disable = false;
                    $scope.ShowLevel2 = false;
                }
                if ((data[0].ReqStatus1 == 'A') && (data[0].DigiSignBy != null && data[0].DigiSignBy != "null" && data[0].DigiSignBy != "")) {
                    $scope.PrintShow = false;
                }
                //else { $scope.PrintShow = false; }
            }
		}, function (error) {
			alert(error);
            });

        $scope.ChangeTextArea = function (str, type) {
            if (type == "ReqStatus") {
                if (str == 'A') { $scope.MigrCertApp.ProcessRemark = "Approved"; }
                else if (str == 'R') { $scope.MigrCertApp.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'A') { $scope.MigrCertApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.MigrCertApp.ProcessRemark1 = "Rejected"; }
            }
        };
		$scope.SaveMigrCertApp = function () {
			$scope.RollEditDisable = true;
            $scope.MigrCertApp.ProcessbyID = AppSettings.LoggedUserId;
            if (AppSettings.SysUsrGrpID == 4) {
                if (($scope.MigrCertApp.ReqStatus == undefined) || ($scope.MigrCertApp.ReqStatus == "") || ($scope.MigrCertApp.ReqStatus == 0)) {
                    alert("Select Accept/Reject At Level 1");
                    $scope.RollEditDisable = false;
                    return;
                }
                if (($scope.MigrCertApp.ProcessRemark == undefined) || ($scope.MigrCertApp.ProcessRemark == "")) {
                    alert("Enter Process Remark at Level 1");
                    $scope.RollEditDisable = false;
                    return;
                }
                else {
                    $scope.MigrCertApp.UserGrp = UserGrp;
                    var getPromise = MigrCertAppService.UpdateMigrCertApp($scope.MigrCertApp);
                    getPromise.then(function (data) {
                        alert("Submitted Successfully.");
                    });
                }
            }
            else if (AppSettings.SysUsrGrpID == 11) {
                if (($scope.MigrCertApp.ReqStatus1 == undefined) || ($scope.MigrCertApp.ReqStatus1 == "") || ($scope.MigrCertApp.ReqStatus1 == 0)) {
                    alert("Select  Accept/Reject At Level 2");
                    $scope.RollEditDisable = false;
                    return;
                }
                if (($scope.MigrCertApp.ProcessRemark1 == undefined) || ($scope.MigrCertApp.ProcessRemark1 == "")) {
                    alert("Enter Process Remark at level 2");
                    $scope.RollEditDisable = false;
                    return;
                }
                if ($scope.MigrCertApp.ReqStatus1 == 'A') {
                    $scope.MigrCertApp.UserGrp = UserGrp;
                    var getPromise = MigrCertAppService.UpdateMigrCertApp($scope.MigrCertApp);
                    getPromise.then(function (data) {
                        $scope.PrintShow = true;
                        alert("Submitted Successfully, You Can Proceed With Digital Sign.");
                    });
                }
                else if ($scope.MigrCertApp.ReqStatus1 == 'R') {
                    $scope.MigrCertApp.UserGrp = UserGrp;
                    var getPromise = MigrCertAppService.UpdateMigrCertApp($scope.MigrCertApp);
                    getPromise.then(function (data) {
                        $scope.PrintShow = false;
                        alert("Submitted Successfully.");
                    });
                }
            }
			
		}
        $scope.PrintMigrCertApp = function () {
            var getPromise = MigrCertAppService.GetCertPdf($scope.MigrCertApp.FormNo);
            getPromise.then(function (data) {
                $state.go('StudentRequestBoard.AddSign', { PdfPath: data[0].DigiSignPDFURL, PdfPhysicalPath: data[0].PDFPhysicalFilePath, FormNo: $scope.MigrCertApp.FormNo, ReqType: 'Migration_Certificate' });
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

