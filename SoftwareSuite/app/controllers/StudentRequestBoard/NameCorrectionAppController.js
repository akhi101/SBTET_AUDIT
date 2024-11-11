define(['app'], function (app) {
	app.controller("NameCorrectionAppController", function ($http, $scope, $state, $stateParams, AppSettings, NameCorrectionAppService) {
		$scope.NameCorrectionApp = { NameCorID: $stateParams.NameCorID };
		var PageNm = $state.current.name.split(".")[1] + "List";
		var NameCorrectionAppRightsdata = [];
		NameCorrectionAppRightsdata = AppSettings.UserRights;
		for (var i = 0; i < NameCorrectionAppRightsdata.length; i++) {
			if (NameCorrectionAppRightsdata[i].GridFormToOpen == PageNm) {
				if (NameCorrectionAppRightsdata[i].isaddable == 'Y') {
					$scope.RollEditDisable = false;
				} else {
					$scope.RollEditDisable = true;
				}
			}
        }
        var UserGrp = "";
        if (AppSettings.SysUsrGrpID == 2) {
            UserGrp = "A";
            $scope.Approver1 = true;
            $scope.ApproverRemarks = true;
            
        } else {
            UserGrp = "O";
            $scope.Approver1 = false;
            $scope.ShowAstertisk = true;
        }
		$scope.SaveUploadDoc1 = function () {
			if ($scope.Upload1 != undefined) {
				var fd = new FormData();
				fd.append("file", $scope.Upload1[0]);
				var url = AppSettings.WebApiUrl + "api/ReqNameCorrection/PostDwFilePath/?NameCorID=" + $scope.NameCorrectionApp.NameCorID + "";
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
		var NameCorrectionAppddata = NameCorrectionAppService.GetReqNameCorrectionByID($scope.NameCorrectionApp.NameCorID);
		NameCorrectionAppddata.then(function (data) {
            $scope.NameCorrectionApp = data[0];
            if (AppSettings.SysUsrGrpID == 4) {
                if (data[0].ReqStatus == 'P') { $scope.NameCorrectionApp.ReqStatus = "0"; }
                if (data[0].ReqStatus == 'A' || data[0].ReqStatus == 'R') {
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = false;
                    $scope.StatusDisable = true;
                    $scope.ShowSubmit = false;
                    $scope.ApproverRemarks = true;
                }
                else {
                    $scope.ShowLevel1 = false;
                    $scope.ShowLevel2 = false;
                    $scope.StatusDisable = false;
                    $scope.ShowSubmit = true;
                    $scope.ApproverRemarks = false;
                }

            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'P') { $scope.NameCorrectionApp.ReqStatus1 = "0"; }
                if (data[0].ReqStatus == 'A' || data[0].ReqStatus == 'R') {
                    $scope.ApproverRemarks = true;
                }
                else {
                    $scope.ApproverRemarks = true;
                }
            }

            if (data[0].AStudName == null) {
                $scope.CandidateName = false;
            }
            else {
                $scope.CandidateName = true;
            }
            if (data[0].AFatherName == null) {
                $scope.FatherName = false;
            }
            else {
                $scope.FatherName = true;
            }
            if (data[0].AMotherName == null) {
                $scope.MotherName = false;
            }
            else {
                $scope.MotherName = true;
            }
            if (data[0].AGender == null) {
                $scope.Gender = false;
            }
            else {
                $scope.Gender = true;
            }
            if (data[0].AMediumName == null) {
                $scope.MediumName = false;
            }
            else {
                $scope.MediumName = true;
            }
            if (AppSettings.SysUsrGrpID == 4) {
                if (data[0].ReqStatus == 'A' || data[0].ReqStatus == 'R') {
                    $scope.ApproverRemarks = true;
                }
                else {
                    $scope.ApproverRemarks = false;
                }
                if (data[0].ReqStatus == 'A' || data[0].ReqStatus == 'R') {
                    $scope.ShowSubmit = false;
                }
                else {
                    $scope.ShowSubmit = true;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'A' || data[0].ReqStatus1 == 'R') {
                    $scope.ShowSubmit = false;
                    $scope.Status1Disable = true;
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = true;
                }
                else {
                    $scope.ShowSubmit = true;
                    $scope.Status1Disable = false;
                    $scope.ShowLevel1 = false;
                    $scope.ShowLevel2 = false;
                }
            }
		}, function (error) {
			alert(error);
            });
        $scope.ChangeTextArea = function (str, type) {
            if (type == "StudName") {
                if (str == 'A') { $scope.ShowCandidate.ReqRemark1StudName = "Approved"; }
                else if (str == 'R') { $scope.ShowCandidate.ReqRemark1StudName = "Rejected"; }
            }
            else if (type == "FatherName") {
                if (str == 'A') { $scope.NameCorrectionApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.NameCorrectionApp.ProcessRemark1 = "Rejected"; }
            }
            else if (type == "MotherName") {
                if (str == 'A') { $scope.NameCorrectionApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.NameCorrectionApp.ProcessRemark1 = "Rejected"; }
            }
            else if (type == "Gender") {
                if (str == 'A') { $scope.NameCorrectionApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.NameCorrectionApp.ProcessRemark1 = "Rejected"; }
            }
            else if (type == "Medium") {
                if (str == 'A') { $scope.NameCorrectionApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.NameCorrectionApp.ProcessRemark1 = "Rejected"; }
            }
        };

		$scope.SaveNameCorrectionApp = function () {
			$scope.RollEditDisable = true;
            $scope.NameCorrectionApp.ProcessbyID = AppSettings.LoggedUserId;
            if (AppSettings.SysUsrGrpID == 4) {
                if (($scope.NameCorrectionApp.ReqStatus == undefined) || ($scope.NameCorrectionApp.ReqStatus == "") || ($scope.NameCorrectionApp.ReqStatus == 0)) {
                    alert("Select Request Status");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (($scope.NameCorrectionApp.ProcessRemark == undefined) || ($scope.NameCorrectionApp.ProcessRemark == "")) {
                    alert("Enter Process Remark");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (($scope.NameCorrectionApp.ReqStatus1 == undefined) || ($scope.NameCorrectionApp.ReqStatus1 == "") || ($scope.NameCorrectionApp.ReqStatus1 == 0)) {
                    alert("Select Request Status1");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (($scope.NameCorrectionApp.ProcessRemark1 == undefined) || ($scope.NameCorrectionApp.ProcessRemark1 == "")) {
                    alert("Enter Process Remark1");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
            }
			$scope.NameCorrectionApp.UserGrp = UserGrp;
			var getPromise = NameCorrectionAppService.UpdateNameCorrectionApp($scope.NameCorrectionApp);
            getPromise.then(function (data) {
                alert('Submitted Successfully!!')
                RedirectToListPage();
				//var fd = new FormData();
				//fd.append("file", $scope.Upload1[0]);
				//var url = AppSettings.WebApiUrl + "api/ReqNameCorrection/PostDwFilePath/?NameCorID=" + $scope.NameCorrectionApp.NameCorID + "";
				//$http.post(url, fd, {
				//	headers: { 'Content-Type': undefined },
				//	transformRequest: angular.identity
				//}).then(function (data) {
				//	//$scope.UploadFiles = false;
				//	alert("Saved Successfully");
				//	RedirectToListPage();
				//}).catch(function (data, status, headers, config) {
				//	alert("Upload error");
				//});
				////if (confirm("Do you want add more files?")) {
				////}
				////else {
				////    RedirectToListPage();
				////}
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

