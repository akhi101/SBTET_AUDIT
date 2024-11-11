define(['app'], function (app) {
	app.controller("ReverifAppController", function ($http, $scope, $state, $stateParams, AppSettings, ReverifAppService) {
		$scope.ReverifApp = { ReVerifID: $stateParams.ReVerifID };
		var PageNm = $state.current.name.split(".")[1] + "List";
		var ReverifAppRightsdata = [];
		ReverifAppRightsdata = AppSettings.UserRights;
		for (var i = 0; i < ReverifAppRightsdata.length; i++) {
			if (ReverifAppRightsdata[i].GridFormToOpen == PageNm) {
				if (ReverifAppRightsdata[i].isaddable == 'Y') {
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
				var url = AppSettings.WebApiUrl + "api/ReqReverif/PostDwFilePath/?ReVerifID=" + $scope.ReverifApp.ReVerifID + "";
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
			var extn = element.files[0].name.split(".").pop();
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
		var ReverifAppddata = ReverifAppService.GetReqReverifByID($scope.ReverifApp.ReVerifID);
		ReverifAppddata.then(function (data) {
			$scope.ReverifApp = data[0];
		}, function (error) {
			alert(error);
		});
		$scope.SaveReverifApp = function () {
			$scope.RollEditDisable = true;
			$scope.ReverifApp.ProcessbyID = AppSettings.LoggedUserId;
			if (($scope.ReverifApp.ReqStatus == undefined) || ($scope.ReverifApp.ReqStatus == "")) {
				alert("Select Status");
				$scope.RollEditDisable = false;
				$scope.UploadFiles = true;
				return;
			}
			if (($scope.ReverifApp.ProcessRemark == undefined) || ($scope.ReverifApp.ProcessRemark == "")) {
				alert("Enter Process Remark");
				$scope.RollEditDisable = false;
				$scope.UploadFiles = true;
				return;
			}
			var UserGrp = "";
			if (AppSettings.SysUsrGrpID == 2) {
				UserGrp = "A";
			} else {
				UserGrp = "O";
			}
			$scope.ReverifApp.UserGrp = UserGrp;
			var getPromise = ReverifAppService.UpdateReverifApp($scope.ReverifApp);
			getPromise.then(function (data) {
				var fd = new FormData();
				fd.append("file", $scope.Upload1[0]);
				var url = AppSettings.WebApiUrl + "api/ReqReverif/PostDwFilePath/?ReVerifID=" + $scope.ReverifApp.ReVerifID + "";
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
		$scope.Exit = function () {
			RedirectToListPage();
		}
		function RedirectToListPage() {
			$state.go('StudentRequestBoard.ReverifAppList');
		}
	});
});

