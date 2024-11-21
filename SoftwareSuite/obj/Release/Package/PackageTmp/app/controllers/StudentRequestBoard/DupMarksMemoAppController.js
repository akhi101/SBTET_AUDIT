define(['app'], function (app) {
	app.controller("DupMarksMemoAppController", function ($http, $scope, $state, $stateParams, AppSettings, DupMarksMemoAppService) {
		$scope.DupMarksMemoApp = { DupMemoID: $stateParams.DupMemoID };
		var PageNm = $state.current.name.split(".")[1] + "List";
		var DupMarksMemoAppRightsdata = [];
		DupMarksMemoAppRightsdata = AppSettings.UserRights;
		for (var i = 0; i < DupMarksMemoAppRightsdata.length; i++) {
			if (DupMarksMemoAppRightsdata[i].GridFormToOpen == PageNm) {
				if (DupMarksMemoAppRightsdata[i].isaddable == 'Y') {
					$scope.RollEditDisable = false;
				} else {
					$scope.RollEditDisable = true;
				}
			}
        }
        

        $scope.Approver1StatusHide = true;
        $scope.Approver2StatusHide = true;
        $scope.Approver3StatusHide = true;

        $scope.Approver1RemarkTextHide = true;
        $scope.Approver2RemarkTextHide = true;
        $scope.Approver3RemarkTextHide = true;

        $scope.Approver1StatusDisable = true;
        $scope.Approver2StatusDisable = true;
        $scope.Approver3StatusDisable = true;

        $scope.Approver1RemarkTextRO = true;
        $scope.Approver2RemarkTextRO = true;
        $scope.Approver3RemarkTextRO = true;
        $scope.ShowDgitalSignature = false;


        if (AppSettings.SysUsrGrpID == 4) {
            UserGrp = "O";
            $scope.Approver1StatusHide = false;
            $scope.Approver2StatusHide = true;
            $scope.Approver3StatusHide = true;
            $scope.Approver1RemarkTextHide = false;
            $scope.Approver2RemarkTextHide = true;
            $scope.Approver3RemarkTextHide = true;

            $scope.Approver1StatusDisable = false;
            $scope.Approver2StatusDisable = true;
            $scope.Approver3StatusDisable = true;

            $scope.Approver1RemarkTextRO = false;
            $scope.Approver2RemarkTextRO = true;
            $scope.Approver3RemarkTextRO = true;
            $scope.ShowDgitalSignature = false;

        } else if (AppSettings.SysUsrGrpID == 2) {
            UserGrp = "A";
            $scope.Approver1StatusHide = false;
            $scope.Approver2StatusHide = false;
            $scope.Approver3StatusHide = true;
            $scope.Approver1RemarkTextHide = false;
            $scope.Approver2RemarkTextHide = false;
            $scope.Approver3RemarkTextHide = true;

            $scope.Approver1StatusDisable = true;
            $scope.Approver2StatusDisable = false;
            $scope.Approver3StatusDisable = true;

            $scope.Approver1RemarkTextRO = true;
            $scope.Approver2RemarkTextRO = false;
            $scope.Approver3RemarkTextRO = true;
            $scope.ShowDgitalSignature = false;

        } else {
            UserGrp = "J";
            $scope.Approver1StatusHide = false;
            $scope.Approver2StatusHide = false;
            $scope.Approver3StatusHide = false;
            $scope.Approver1RemarkTextHide = false;
            $scope.Approver2RemarkTextHide = false;
            $scope.Approver3RemarkTextHide = false;

            $scope.Approver1StatusDisable = true;
            $scope.Approver2StatusDisable = true;
            $scope.Approver3StatusDisable = false;

            $scope.Approver1RemarkTextRO = true;
            $scope.Approver2RemarkTextRO = true;
            $scope.Approver3RemarkTextRO = false;
            $scope.ShowDgitalSignature = false;
        }

        var DupMarksMemodata = DupMarksMemoAppService.GetReqDupMarksMemoByID($scope.DupMarksMemoApp.DupMemoID);
        DupMarksMemodata.then(function (data) {
            $scope.DupMarksMemoApp = data[0];

            if (AppSettings.SysUsrGrpID == 4) {
                if (data[0].ReqStatus == 'P') { $scope.DupMarksMemoApp.ReqStatus = "0"; }
                if (data[0].ReqStatus == 'A' || data[0].ReqStatus == 'R') {
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = false;
                    $scope.showSubmit = false;
                    $scope.Approver1StatusDisable = true;
                    $scope.Approver1RemarkTextRO = true;
                }
                else {
                    $scope.ShowLevel1 = false;
                    $scope.ShowLevel2 = false;
                    $scope.showSubmit = true;
                    $scope.Approver1StatusDisable = false;
                    $scope.Approver1RemarkTextRO = false;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'P') { $scope.DupMarksMemoApp.ReqStatus1 = "0"; }
                if (data[0].ReqStatus1 == 'A' || data[0].ReqStatus1 == 'R') {
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                    $scope.showSubmit = false;
                    $scope.Approver2StatusDisable = true;
                    $scope.Approver2RemarkTextRO = true;
                }
                else {
                    $scope.ShowLevel2 = false;
                    $scope.ShowLevel1 = true;
                    $scope.showSubmit = true;
                    $scope.Approver2StatusDisable = false;
                    $scope.Approver2RemarkTextRO = false;
                }
            }
            else if (AppSettings.SysUsrGrpID == 11) {
                if (data[0].ReqStatus2 == 'P') { $scope.DupMarksMemoApp.ReqStatus2 = "0"; }
                if ((data[0].ReqStatus2 == 'A') || (data[0].ReqStatus2 == 'R')) {
                    $scope.showSubmit = false;
                    $scope.ShowLevel3 = true;
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                    $scope.Approver3StatusDisable = true;
                    $scope.Approver3RemarkTextRO = true;
                    if (data[0].ReqStatus2 == 'A') {
                        $scope.ShowDgitalSignature = true;
                    }
                    else {
                        $scope.ShowDgitalSignature = false;
                    }
                }
                else {
                    $scope.showSubmit = true;
                    $scope.ShowLevel3 = false;
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                    $scope.Approver3StatusDisable = false;
                    $scope.Approver3RemarkTextRO = false;
                }
            }
            
        }, function (error) {
            alert(error);
        });

        $scope.ChangeTextArea = function (str, type) {
            if (type == "ReqStatus") {
                if (str == 'A') { $scope.DupMarksMemoApp.ProcessRemark = "Approved"; }
                else if (str == 'R') { $scope.DupMarksMemoApp.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'A') { $scope.DupMarksMemoApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.DupMarksMemoApp.ProcessRemark1 = "Rejected"; }
            }
            else if (type == "ReqStatus2") {
                if (str == 'A') { $scope.DupMarksMemoApp.ProcessRemark2 = "Approved"; }
                else if (str == 'R') { $scope.DupMarksMemoApp.ProcessRemark2 = "Rejected"; }
            }
        };


		var DupMarksMemoAppddata = DupMarksMemoAppService.GetReqDupMarksMemoByID($scope.DupMarksMemoApp.DupMemoID);
		DupMarksMemoAppddata.then(function (data) {
            $scope.DupMarksMemoApp = data[0];
            if (AppSettings.SysUsrGrpID == 4) {
                if (data[0].ReqStatus == 'P') { $scope.DupMarksMemoApp.ReqStatus = "0"; }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'P') { $scope.DupMarksMemoApp.ReqStatus1 = "0"; }
            }

		}, function (error) {
			alert(error);
            });

        $scope.DigiSignApp = function () {
            var getPromise = DupMarksMemoAppService.GetCertPdf($scope.DupMarksMemoApp.FormNo);
            getPromise.then(function (data) {
                $state.go('StudentRequestBoard.AddSign', { PdfPath: data[0].DigiSignPDFURL, PdfPhysicalPath: data[0].PDFPhysicalFilePath, FormNo: $scope.DupMarksMemoApp.FormNo, ReqType: 'DupMarksmemo' });
            }, function (error) {
                alert(error);
            });
        }

		$scope.SaveDupMarksMemoApp = function () {
            $scope.DupMarksMemoApp.ProcessbyID = AppSettings.LoggedUserId;
            var UserGrp = "";
            if (AppSettings.SysUsrGrpID == 4) {
                UserGrp = "O";
            } else if (AppSettings.SysUsrGrpID == 2) {
                UserGrp = "A";
            } else {
                UserGrp = "J";
            }
            if (AppSettings.SysUsrGrpID == 4) {
                if (($scope.DupMarksMemoApp.ReqStatus == undefined) || ($scope.DupMarksMemoApp.ReqStatus == "")) {
                    alert("Select Status");
                    return;
                }
                if (($scope.DupMarksMemoApp.ProcessRemark == undefined) || ($scope.DupMarksMemoApp.ProcessRemark == "")) {
                    alert("Enter Process Remark 1");
                    return;
                }
                else {
                    $scope.DupMarksMemoApp.UserGrp = UserGrp;
                    var getPromise = DupMarksMemoAppService.UpdateDupMarksMemoApp($scope.DupMarksMemoApp);
                    getPromise.then(function (data) {
                        $scope.ShowDgitalSignature = false;
                        $scope.RollEditDisable = true;
                        alert("Submitted Successfully");
                    });
                }
            }
             else if (AppSettings.SysUsrGrpID == 2) {
                if (($scope.DupMarksMemoApp.ProcessRemark1 == undefined) || ($scope.DupMarksMemoApp.ProcessRemark1 == "")) {
                    alert("Enter Process Remark 2");
                    return;
                }
                else {
                    $scope.DupMarksMemoApp.UserGrp = UserGrp;
                    var getPromise = DupMarksMemoAppService.UpdateDupMarksMemoApp($scope.DupMarksMemoApp);
                    getPromise.then(function (data) {
                        $scope.RollEditDisable = true;
                        $scope.ShowDgitalSignature = false;
                        alert("Submitted Successfully");
                    });
                }
            }
            else
            {
                if (($scope.DupMarksMemoApp.ProcessRemark2 == undefined) || ($scope.DupMarksMemoApp.ProcessRemark2 == "")) {
                    alert("Enter Process Remark 3");
                    return;
                }
                if ($scope.DupMarksMemoApp.ReqStatus2 == 'A') {
                    $scope.DupMarksMemoApp.UserGrp = UserGrp;
                    var getPromise = DupMarksMemoAppService.UpdateDupMarksMemoApp($scope.DupMarksMemoApp);
                    getPromise.then(function (data) {
                        $scope.RollEditDisable = true;
                        $scope.ShowDgitalSignature = true;
                        alert("Submitted Successfully,You Can Proceed To Digital Sign.");
                    });
                }
                else if ($scope.DupMarksMemoApp.ReqStatus2 == 'R') {
                    $scope.DupMarksMemoApp.UserGrp = UserGrp;
                    var getPromise = DupMarksMemoAppService.UpdateDupMarksMemoApp($scope.DupMarksMemoApp);
                    getPromise.then(function (data) {
                        $scope.RollEditDisable = true;
                        $scope.ShowDgitalSignature = false;
                        alert("Submitted Successfully");
                    });
                }
            }
                

			//$scope.DupMarksMemoApp.UserGrp = UserGrp;
			//var getPromise = DupMarksMemoAppService.UpdateDupMarksMemoApp($scope.DupMarksMemoApp);
   //         getPromise.then(function (data) {
   //             if ($scope.DupMarksMemoApp.ReqStatus2 == 'A') {
   //                 $scope.RollEditDisable = true;
   //                 $scope.ShowDgitalSignature = true;
   //                 alert("Submitted Successfully,You Can Proceed To Digital Sign.");
   //             }
   //             else {
   //                 $scope.ShowDgitalSignature = false;
   //                 alert("Submitted Successfully");
   //             }
   //             //alert("Submitted Successfully");
   //             //RedirectToListPage();
			//}, function (error) {
			//	alert(error);
			//});
		}
		$scope.Exit = function () {
			RedirectToListPage();
		}
		function RedirectToListPage() {
            $state.go('StudentRequestBoard.ServiceRequestDrillDownReport');
		}
	});
});