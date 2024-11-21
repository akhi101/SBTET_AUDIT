define(['app'], function (app) {
	app.controller("TrueExMarksMemoAppController", function ($http, $scope, $state, $stateParams, AppSettings, TrueExMarksMemoAppService) {
		$scope.TrueExMarksMemoApp = { TrueExMrkID: $stateParams.TrueExMrkID };
        var ProcNameRegex = /^[a-zA-Z_ ]+$/;
        var UserGrp = "";
        if (AppSettings.SysUsrGrpID == 4) {
            UserGrp = "O";
            $scope.Approver2 = false;
            $scope.Approver1 = false;
        } else if (AppSettings.SysUsrGrpID == 2) {
            UserGrp = "A";
            $scope.Approver2 = false;
            $scope.Approver1 = true;
            $scope.FirstLoginStatus = true;
            $scope.showastertisk = true;
        }
        else if (AppSettings.SysUsrGrpID == 11) {
            UserGrp = "J";
            $scope.FirstLoginStatus = true;
            $scope.SecondLoginStatus = true;
            $scope.Approver2 = true;
            $scope.Approver1 = true;
            $scope.showastertisk = true;
            $scope.showastertisk1 = true;
        }
		$scope.UploadFiles = true;
		var TrueExMarksMemoAppddata = TrueExMarksMemoAppService.GetReqTrueExMarksMemoByID($scope.TrueExMarksMemoApp.TrueExMrkID);
		TrueExMarksMemoAppddata.then(function (data) {
            $scope.TrueExMarksMemoApp = data[0];
            if (AppSettings.SysUsrGrpID == 4) {
                if (data[0].ReqStatus == 'P') { $scope.TrueExMarksMemoApp.ReqStatus = "0"; }
                if ((data[0].ReqStatus == 'A') || (data[0].ReqStatus == 'R')) {
                    $scope.SubmitTrueEx = false;
                    $scope.FirstLoginStatus = true;
                    $scope.ShowStar1 = false;
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = false;
                }
                else {
                    $scope.SubmitTrueEx = true;
                    $scope.FirstLoginStatus = false;
                    $scope.ShowStar1 = true;
                    $scope.ShowLevel1 = false;
                    $scope.ShowLevel2 = false;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'P') { $scope.TrueExMarksMemoApp.ReqStatus1 = "0"; }
                if ((data[0].ReqStatus1 == 'A') || (data[0].ReqStatus1 == 'R')) {
                    $scope.SubmitTrueEx = false;
                    $scope.FirstLoginStatus = true;
                    $scope.SecondLoginStatus = true;
                    $scope.ShowStar2 = false;
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                }
                else {
                    $scope.SubmitTrueEx = true;
                    $scope.SecondLoginStatus = false;
                    $scope.ShowStar2 = true;
                    $scope.ShowLevel2 = false;
                }
            }
            else if (AppSettings.SysUsrGrpID == 11) {
                if (data[0].ReqStatus2 == 'P') { $scope.TrueExMarksMemoApp.ReqStatus2 = "0"; }
                if ((data[0].ReqStatus2 == 'A') || (data[0].ReqStatus2 == 'R')) {
                    $scope.SubmitTrueEx = false;
                    $scope.FirstLoginStatus = true;
                    $scope.SecondLoginStatus = true;
                    $scope.ThirdLoginStatus = true;
                    $scope.ShowStar3 = false;
                    $scope.ShowLevel3 = true;
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                }
                else {
                    $scope.SubmitTrueEx = true;
                    $scope.ThirdLoginStatus = false;
                    $scope.ShowStar3 = true;
                    $scope.ShowLevel2 = false;
                    $scope.ShowLevel1 = false;
                }
            }
		}, function (error) {
			alert(error);
            });

        $scope.ChangeTextArea = function (str, type) {
            if (type == "ReqStatus") {
                if (str == 'A') { $scope.TrueExMarksMemoApp.ProcessRemark = "Approved"; }
                else if (str == 'R') { $scope.TrueExMarksMemoApp.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'A') { $scope.TrueExMarksMemoApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.TrueExMarksMemoApp.ProcessRemark1 = "Rejected"; }
            }
            else if (type == "ReqStatus2") {
                if (str == 'A') { $scope.TrueExMarksMemoApp.ProcessRemark2 = "Approved"; }
                else if (str == 'R') { $scope.TrueExMarksMemoApp.ProcessRemark2 = "Rejected"; }
            }
        };

		$scope.SaveTrueExMarksMemoApp = function () {
			$scope.RollEditDisable = true;
            $scope.TrueExMarksMemoApp.ProcessbyID = AppSettings.LoggedUserId;
            if (AppSettings.SysUsrGrpID == 4) {
                if (($scope.TrueExMarksMemoApp.ReqStatus == undefined) || ($scope.TrueExMarksMemoApp.ReqStatus == "0")) {
                    alert("Select Status1");
                    $scope.RollEditDisable = false;
                    return;
                }
                if (($scope.TrueExMarksMemoApp.ProcessRemark == undefined) || ($scope.TrueExMarksMemoApp.ProcessRemark == "")) {
                    alert("Enter Process Remark1");
                    $scope.RollEditDisable = false;
                    return;
                }
                //if (($scope.TrueExMarksMemoApp.ProcessRemark == undefined) || ($scope.TrueExMarksMemoApp.ProcessRemark == "")) {
                //    alert("Process Remark Can Contain Only a-z,A-Z");
                //    return false;
                //}
                if (!ProcNameRegex.test($scope.TrueExMarksMemoApp.ProcessRemark)) {
                    alert("Process Remark1 Can Contain Only a-z,A-Z");
                    $scope.RollEditDisable = false;
                    return false;
                }
            }
                else if (AppSettings.SysUsrGrpID == 2) {
                    if (($scope.TrueExMarksMemoApp.ReqStatus1 == undefined) || ($scope.TrueExMarksMemoApp.ReqStatus1 == "0")) {
                        alert("Select Status2");
                        $scope.RollEditDisable = false;
                        return;
                    }
                    if (($scope.TrueExMarksMemoApp.ProcessRemark1 == undefined) || ($scope.TrueExMarksMemoApp.ProcessRemark1 == "")) {
                        alert("Enter Process Remark2");
                        $scope.RollEditDisable = false;
                        return;
                    }
                    //if (($scope.TrueExMarksMemoApp.ProcessRemark1 == undefined) || ($scope.TrueExMarksMemoApp.ProcessRemark1 == "")) {
                    //    alert("Process Remark2 Can Contain Only a-z,A-Z");
                    //    return false;
                    //}
                    if (!ProcNameRegex.test($scope.TrueExMarksMemoApp.ProcessRemark1)) {
                        alert("Process Remark2 Can Contain Only a-z,A-Z");
                        $scope.RollEditDisable = false;
                        return false;
                    }
                }
                else if (AppSettings.SysUsrGrpID == 11) {
                    if (($scope.TrueExMarksMemoApp.ReqStatus2 == undefined) || ($scope.TrueExMarksMemoApp.ReqStatus2 == "0")) {
                        alert("Select Status3");
                        $scope.RollEditDisable = false;
                        return;
                    }
                    if (($scope.TrueExMarksMemoApp.ProcessRemark2 == undefined) || ($scope.TrueExMarksMemoApp.ProcessRemark2 == "")) {
                        alert("Enter Process Remark3");
                        $scope.RollEditDisable = false;
                        return;
                    }
                    //if (($scope.TrueExMarksMemoApp.ProcessRemark2 == undefined) || ($scope.TrueExMarksMemoApp.ProcessRemark2 == "")) {
                    //    alert("Process Remark3 Can Contain Only a-z,A-Z");
                    //    return false;
                    //}
                    if (!ProcNameRegex.test($scope.TrueExMarksMemoApp.ProcessRemark2)) {
                        alert("Process Remark3 Can Contain Only a-z,A-Z");
                        $scope.RollEditDisable = false;
                        return false;
                    }
                }

			$scope.TrueExMarksMemoApp.UserGrp = UserGrp;
			var getPromise = TrueExMarksMemoAppService.UpdateTrueExMarksMemoApp($scope.TrueExMarksMemoApp);
			getPromise.then(function (data) {
					alert("Submitted Successfully");
					RedirectToListPage();
            }, function (error) {
				$scope.RollEditDisable = false;
				alert(error);
			});
		}
		$scope.Exit = function () {
			RedirectToListPage();
		}
		function RedirectToListPage() {
           // $state.go('StudentRequestBoard.StudSerList', { ServiceID: '09', ServiceName: 'True Extracts of Marks Memo' });
            $state.go('StudentRequestBoard.ServiceRequestDrillDownReport');
		}
	});
});

