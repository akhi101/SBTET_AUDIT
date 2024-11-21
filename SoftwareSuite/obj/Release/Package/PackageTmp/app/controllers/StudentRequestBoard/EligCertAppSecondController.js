define(['app'], function (app) {
	app.controller("EligCertAppSecondController", function ($http, $scope, $state, $stateParams, AppSettings, EligCertAppService) {
		$scope.EligCertAppSecond = { EligCertID: $stateParams.EligCertID };
		var PageNm = $state.current.name.split(".")[1] + "List";
		var EligCertAppSecondRightsdata = [];
		EligCertAppSecondRightsdata = AppSettings.UserRights;
		for (var i = 0; i < EligCertAppSecondRightsdata.length; i++) {
			if (EligCertAppSecondRightsdata[i].GridFormToOpen == PageNm) {
				if (EligCertAppSecondRightsdata[i].isupdatable == 'Y') {
					$scope.RollEditDisable = false;
				}
				else {
					$scope.RollEditDisable = true;
				}
			}
		}
		var EligCertAppSeconddata = EligCertAppService.GetReqEligCertByID($scope.EligCertAppSecond.EligCertID);
		EligCertAppSeconddata.then(function (data) {
			$scope.EligCertAppSecond = data[0];
			$scope.EligCertAppSecond.UploadDoc1 = data[0].UploadDoc1;
			$scope.EligCertAppSecond.UploadDoc2 = data[0].UploadDoc2;
			$scope.EligCertAppSecond.UploadDoc3 = data[0].UploadDoc3;
		}, function (error) {
			alert(error);
		});
		var UserGrp = "";
		if (AppSettings.SysUsrGrpID == 2) {
			UserGrp = "A";
		} else {
			UserGrp = "O";
		}
		$scope.EligCertAppSecond.UserGrp = UserGrp;
		$scope.SaveUploadDoc1 = function () {
			if ($scope.Upload1 != undefined) {
				var fd = new FormData();
				fd.append("file", $scope.Upload1[0]);
				var url = AppSettings.WebApiUrl + "api/ReqEligCert/PostDwFilePath/?EligCertID=" + $scope.EligCertAppSecond.EligCertID + "";
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
		$scope.SaveEligCertAppSecond = function () {
			$scope.RollEditDisable = true;
			$scope.EligCertAppSecond.ProcessbyID = AppSettings.LoggedUserId;
			if (($scope.EligCertAppSecond.ReqStatus == undefined) || ($scope.EligCertAppSecond.ReqStatus == "")) {
				alert("Select Status");
				return;
			}
			if (($scope.EligCertAppSecond.ProcessRemark == undefined) || ($scope.EligCertAppSecond.ProcessRemark == "")) {
				alert("Enter Process Remark");
				return;
			}
			var UserGrp = "";
			if (AppSettings.SysUsrGrpID == 2) {
				UserGrp = "A";
			} else {
				UserGrp = "O";
			}
			$scope.EligCertAppSecond.UserGrp = UserGrp;
			var getPromise = EligCertAppService.UpdateEligCertApp($scope.EligCertAppSecond);
			getPromise.then(function (data) {
				var fd = new FormData();
				fd.append("file", $scope.Upload1[0]);
				var url = AppSettings.WebApiUrl + "api/ReqEligCert/PostDwFilePath/?EligCertID=" + $scope.EligCertAppSecond.EligCertID + "";
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
				//	RedirectToListPage();
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
			$state.go('StudentRequestBoard.EligCertAppList');
		}
	});
});

