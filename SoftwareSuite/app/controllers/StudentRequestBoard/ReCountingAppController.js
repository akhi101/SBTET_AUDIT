define(['app'], function (app) {
	app.controller("ReCountingAppController", function ($http, $scope, $state, $stateParams, AppSettings, ReCountingAppService) {
		$scope.ReCountingApp = { ReCntMrkID: $stateParams.ReCntMrkID };
		var PageNm = $state.current.name.split(".")[1] + "List";
		var ReCountingAppRightsdata = [];
		ReCountingAppRightsdata = AppSettings.UserRights;
		for (var i = 0; i < ReCountingAppRightsdata.length; i++) {
			if (ReCountingAppRightsdata[i].GridFormToOpen == PageNm) {
				if (ReCountingAppRightsdata[i].isaddable == 'Y') {
					$scope.RollEditDisable = false;
				} else {
					$scope.RollEditDisable = true;
				}
			}
		}
		$scope.SaveUploadDoc1 = function () {
			if ($scope.Upload1 != undefined) {
				var fd = new FormData();
				fd.append("file", $scope.Upload1[0]);
				var url = AppSettings.WebApiUrl + "api/ReqReCounting/PostDwFilePath/?ReCntMrkID=" + $scope.ReCountingApp.ReCntMrkID + "";
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
		var ReCountingAppddata = ReCountingAppService.GetReqReCountingByID($scope.ReCountingApp.ReCntMrkID);
		ReCountingAppddata.then(function (data) {
			$scope.ReCountingApp = data[0];
		}, function (error) {
			alert(error);
            });
        $scope.ReCountingApp.ReqStatus = "0";
		$scope.SaveReCountingApp = function () {
			$scope.RollEditDisable = true;
			$scope.ReCountingApp.ProcessbyID = AppSettings.LoggedUserId;
            if (($scope.ReCountingApp.ReqStatus == undefined) || ($scope.ReCountingApp.ReqStatus == "")) {
				alert("Select Status");
				$scope.RollEditDisable = false;
				$scope.UploadFiles = true;
				return;
            }
			//if (($scope.ReCountingApp.ProcessRemark == undefined) || ($scope.ReCountingApp.ProcessRemark == "")) {
			//	alert("Enter Process Remark");
			//	$scope.RollEditDisable = false;
			//	$scope.UploadFiles = true;
			//	return;
			//}
			var UserGrp = "";
			if (AppSettings.SysUsrGrpID == 2) {
				UserGrp = "A";
			} else {
				UserGrp = "O";
			}
			$scope.ReCountingApp.UserGrp = UserGrp;
			var getPromise = ReCountingAppService.UpdateReCountingApp($scope.ReCountingApp);
			getPromise.then(function (data) {
				var fd = new FormData();
				fd.append("file", $scope.Upload1[0]);
				var url = AppSettings.WebApiUrl + "api/ReqReCounting/PostDwFilePath/?ReCntMrkID=" + $scope.ReCountingApp.ReCntMrkID + "";
				$http.post(url, fd, {
					headers: { 'Content-Type': undefined },
					transformRequest: angular.identity
				}).then(function (data) {
					//$scope.UploadFiles = false;
					alert("Saved Successfully");
					RedirectToListPage();
				}).catch(function (data, status, headers, config) {
					alert("Upload error");
				});
				//if (confirm("Do you want add more files?")) {
				//}
				//else {
				//    RedirectToListPage();
				//}
			}, function (error) {
				$scope.RollEditDisable = false;
				$scope.UploadFiles = true;
				alert(error);
			});
        }
        $scope.ChangeTextArea = function (str, type) {
            if (type == "ReqStatus") {
                if (str == 'C') { $scope.ReCountingApp.ProcessRemark = "Approved"; }
                else if (str == 'N') { $scope.ReCountingApp.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'C') { $scope.ReCountingApp.ProcessRemark1 = "Approved"; }
                else if (str == 'N') { $scope.ReCountingApp.ProcessRemark1 = "Rejected"; }
            }
        };

		$scope.Exit = function () {
			RedirectToListPage();
		}
		function RedirectToListPage() {
			$state.go('StudentRequestBoard.ReCountingAppList');
		}
	});
});

