define(['app'], function (app) {
	app.controller("TCCertAppController", function ($http, $scope, $state, $stateParams, AppSettings, TCCertAppService) {
		$scope.TCCertApp = { TCCertID: $stateParams.TCCertID };
		var PageNm = $state.current.name.split(".")[1] + "List";
		var TCCertAppRightsdata = [];
		TCCertAppRightsdata = AppSettings.UserRights;
		for (var i = 0; i < TCCertAppRightsdata.length; i++) {
			if (TCCertAppRightsdata[i].GridFormToOpen == PageNm) {
				if (TCCertAppRightsdata[i].isaddable == 'Y') {
					$scope.RollEditDisable = false;
				} else {
					$scope.RollEditDisable = true;
				}
			}
		}
		$scope.PrintDisable = true;
		$scope.SaveUploadDoc1 = function () {
			if ($scope.Upload1 != undefined) {
				var fd = new FormData();
				fd.append("file", $scope.Upload1[0]);
				var url = AppSettings.WebApiUrl + "api/ReqTCCert/PostDwFilePath/?TCCertID=" + $scope.TCCertApp.TCCertID + "";
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
		var TCCertAppddata = TCCertAppService.GetReqTCCertByID($scope.TCCertApp.TCCertID);
		TCCertAppddata.then(function (data) {
			$scope.TCCertApp = data[0];
			if (data[0].ReqStatus1 == 'A') {
				$scope.PrintDisable = false;
			}
		}, function (error) {
			alert(error);
		});
		$scope.SaveTCCertApp = function () {
			$scope.RollEditDisable = true;
			$scope.TCCertApp.ProcessbyID = AppSettings.LoggedUserId;
			if (($scope.TCCertApp.ReqStatus == undefined) || ($scope.TCCertApp.ReqStatus == "")) {
				alert("Select Status");
				$scope.RollEditDisable = false;
				$scope.UploadFiles = true;
				return;
			}
			if (($scope.TCCertApp.ProcessRemark == undefined) || ($scope.TCCertApp.ProcessRemark == "")) {
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
			$scope.TCCertApp.UserGrp = UserGrp;
			var getPromise = TCCertAppService.UpdateTCCertApp($scope.TCCertApp);
			getPromise.then(function (data) {
				var fd = new FormData();
				fd.append("file", $scope.Upload1[0]);
				var url = AppSettings.WebApiUrl + "api/ReqTCCert/PostDwFilePath/?TCCertID=" + $scope.TCCertApp.TCCertID + "";
				$http.post(url, fd, {
					headers: { 'Content-Type': undefined },
					transformRequest: angular.identity
				}).then(function (data) {
					//$scope.UploadFiles = false;
					alert("Submitted Successfully");
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
		$scope.PrintTCCertApp = function () {
			var Urlstring = "api/ReqTCCert/GetReqTCCertReport/?AdmNo=" + $scope.TCCertApp.AdmNo + "";
			var dataset1 = "dsTCationCertificate";
			$state.go('StudentRequestBoard.ReportViewerController', { ReportName: 'rptTCationCertificate.rdlc', url: Urlstring, ds1: dataset1 });
		}
		$scope.Exit = function () {
			RedirectToListPage();
		}
		function RedirectToListPage() {
            $state.go('StudentRequestBoard.ServiceRequestDrillDownReport');
		}
	});
});

