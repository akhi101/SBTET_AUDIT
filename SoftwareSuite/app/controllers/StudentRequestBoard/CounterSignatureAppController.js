define(['app'], function (app) {
    app.controller("CountSignatureAppController", function ($http, $scope, $state, $stateParams, AppSettings, CounterSignatureAppService) {
        $scope.CountSignApp = { CountSignID: $stateParams.CountSignID };
        var ProcRegex = /^[0-9a-zA-Z]+$/;
        $scope.ShowSubmit = true;
        if (AppSettings.SysUsrGrpID == 2) {
            $scope.ViewAuth = true;
            $scope.ShowPrint = true;
            $scope.StatusDisable = true;
            $scope.ShowReq = false;
        } else {
            $scope.ViewAuth = false;
            $scope.ShowPrint = false;
            $scope.ShowReq = true;
        }

        $scope.CheckProcess = function () {
            if (AppSettings.SysUsrGrpID == 2) {
                if (!ProcRegex.test($scope.CountSignApp.ProcessRemark1)) {
                    $scope.CountSignApp.ProcessRemark1 = $scope.CountSignApp.ProcessRemark1.slice(0, -1);
                }
            }
            else {
                if (!ProcRegex.test($scope.CountSignApp.ProcessRemark)) {
                    $scope.CountSignApp.ProcessRemark = $scope.CountSignApp.ProcessRemark.slice(0, -1);
                }
            }
        }

        var CounterSignaturedata = CounterSignatureAppService.GetReqCounterSignatureByID($scope.CountSignApp.CountSignID);
        CounterSignaturedata.then(function (data) {
            $scope.CountSignApp = data[0];
            if (AppSettings.SysUsrGrpID == 4) {
                if (data[0].ReqStatus == 'P') { $scope.CountSignApp.ReqStatus = "0"; }
                if (data[0].ReqStatus == 'A' || data[0].ReqStatus == 'R') {
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = false;
                    $scope.StatusDisable = true;
                    $scope.ShowSubmit = false;
                }
                else {
                    $scope.ShowLevel1 = false;
                    $scope.ShowLevel2 = false;
                    $scope.StatusDisable = false;
                    $scope.ShowSubmit = true;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                if (data[0].ReqStatus1 == 'P') { $scope.CountSignApp.ReqStatus1 = "0"; }
                if (data[0].ReqStatus1 == 'P' || data[0].ReqStatus1 == 'R') {
                    $scope.PrintDisable = true;
                }
                else {
                    $scope.PrintDisable = false;
                }
                if (data[0].ReqStatus1 == 'R') {
                    $scope.ShowPrint = false;
                }
                if (data[0].ReqStatus1 == 'A' || data[0].ReqStatus1 == 'R') {
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                    $scope.Status1Disable = true;
                    $scope.ShowSubmit = false;
                }
                else {
                    $scope.ShowLevel2 = false;
                    $scope.ShowLevel1 = true;
                    $scope.Status1Disable = false;
                    $scope.ShowSubmit = true;
                }
            }
            $scope.CountSignApp.UploadDoc1 = data[0].UploadDoc1;
            $scope.CountSignApp.UploadDoc2 = data[0].UploadDoc2;
            
        }, function (error) {
            alert(error);
        });

       
        //var CounterSignaturedata = CounterSignatureAppService.GetReqCounterSignatureByID($scope.CountSignApp.CountSignID);
        //CounterSignaturedata.then(function (data) {
        //    $scope.CountSignApp = data[0];
        //    $scope.CountSignApp.UploadDoc1 = data[0].UploadDoc1;
        //    $scope.CountSignApp.UploadDoc2 = data[0].UploadDoc2;
        //}, function (error) {
        //    alert(error);
        //    });
      
     
		//$scope.PrintDisable = true;
		$scope.SaveUploadDoc1 = function () {
			if ($scope.Upload1 != undefined) {
				var fd = new FormData();
				fd.append("file", $scope.Upload1[0]);
                var url = AppSettings.WebApiUrl + "api/ReqCounterSignature/PostDwFilePath/?CountSignID=" + $scope.CountSignApp.CountSignID + "";
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

        $scope.SaveUploadDoc2 = function () {
            if ($scope.Upload2 != undefined) {
                var fd = new FormData();
                fd.append("file", $scope.Upload2[0]);
                var url = AppSettings.WebApiUrl + "api/ReqCounterSignature/PostDwFilePath/?CountSignID=" + $scope.CountSignApp.CountSignID + "";
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
        $scope.FileUpload2 = function (element) {
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
		//$scope.UploadFiles = true;
        var CountSignAppddata = CounterSignatureAppService.GetReqCounterSignatureByID($scope.CountSignApp.CountSignID);
		CountSignAppddata.then(function (data) {
            $scope.CountSignApp = data[0];
            
		}, function (error) {
			alert(error);
            });

        

        $scope.SaveCountSignApp = function () {
			$scope.RollEditDisable = true;
            $scope.CountSignApp.ProcessbyID = AppSettings.LoggedUserId;
            var UserGrp = "";
            if (AppSettings.SysUsrGrpID == 4) {
                UserGrp = "O";
                if (($scope.CountSignApp.ReqStatus == undefined) || ($scope.CountSignApp.ReqStatus == "0")) {
                    alert("Select Status");
                    $scope.RollEditDisable = false;
                    return;
                }
                if (($scope.CountSignApp.ProcessRemark == undefined) || ($scope.CountSignApp.ProcessRemark == "")) {
                    alert("Enter Process Remarks.");
                    $scope.RollEditDisable = false;
                    return;
                }
            }
            else if (AppSettings.SysUsrGrpID == 2) {
                UserGrp = "A";
                if (($scope.CountSignApp.ReqStatus1 == undefined) || ($scope.CountSignApp.ReqStatus1 == "P") || ($scope.CountSignApp.ReqStatus1 == "0")) {
                    alert("Select Status");
                    $scope.RollEditDisable = false;
                    return;
                }
                if (($scope.CountSignApp.ProcessRemark1 == undefined) || ($scope.CountSignApp.ProcessRemark1 == "")) {
                    alert("Enter Process Remarks");
                    $scope.RollEditDisable = false;
                    return;
                }
            }        	
			
			$scope.CountSignApp.UserGrp = UserGrp;
            var getPromise = CounterSignatureAppService.UpdateCounterSignatureApp($scope.CountSignApp);
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
                if (str == 'A') { $scope.CountSignApp.ProcessRemark = "Approved"; }
                else if (str == 'R') { $scope.CountSignApp.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'A') { $scope.CountSignApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.CountSignApp.ProcessRemark1 = "Rejected"; }
            }
        };
		//$scope.PrintMigrCertApp = function () {
		//	var Urlstring = "api/ReqMigrCert/GetReqMigrCertReport/?AdmNo=" + $scope.CountSignApp.AdmNo + "";
		//	var dataset1 = "dsMigrationCertificate";
		//	$state.go('StudentRequestBoard.ReportViewerController', { ReportName: 'rptMigrationCertificate.rdlc', url: Urlstring, ds1: dataset1 });
		//}
		$scope.Exit = function () {
			RedirectToListPage();
		}
		function RedirectToListPage() {
            $state.go('StudentRequestBoard.ServiceRequestDrillDownReport');
		}
	});
});

