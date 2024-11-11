define(['app'], function (app) {
	app.controller("EquiCertAppController", function ($http, $scope, $state, $stateParams, AppSettings, EquiCertAppService) {
        $scope.EquiCertApp = { EquiCertID: $stateParams.EquiCertID };
        //var ProcRegex = /^[0-9a-zA-Z\-\/_ ]+$/;
        var ProcRegex = /^[0-9a-zA-Z\-.," '!]+$/;
        var CharRegex = /^[a-zA-Z\ ]+$/;

		var PageNm = $state.current.name.split(".")[1] + "List";
		var EquiCertAppdata = [];
		EquiCertAppdata = AppSettings.UserRights;
		for (var i = 0; i < EquiCertAppdata.length; i++) {
			if (EquiCertAppdata[i].GridFormToOpen == PageNm) {
				if (EquiCertAppdata[i].isupdatable == 'Y') {
					$scope.RollEditDisable = false;
				}
				else {
					$scope.RollEditDisable = true;
				}
			}
        }
        $scope.Approver1RemarkValues = true;
        $scope.Approver1RemarkText = true;
        $scope.Approver2RemarkValues = true;
        $scope.Approver2RemarkText = true;
        $scope.Approver1RemarkRO = true;
        $scope.Approver2RemarkTextRO = true;
        $scope.DigitalSignHide = true;

        if (AppSettings.SysUsrGrpID == 21) {
            UserGrp = "O";
            $scope.Approver1RemarkValues = false;
            $scope.Approver1RemarkText = false;
            $scope.Approver2RemarkValues = true;
            $scope.Approver2RemarkText = true;

            $scope.Approver1RemarkRO = false;
            $scope.Approver2RemarkTextRO = false;
            $scope.DigitalSignHide = true;

        }
        else if (AppSettings.SysUsrGrpID == 17) {
            UserGrp = "A";
            $scope.Approver1RemarkValues = false;
            $scope.Approver1RemarkText = false;
            $scope.Approver2RemarkValues = false;
            $scope.Approver2RemarkText = false;

            $scope.Approver1RemarkRO = true;
            $scope.Approver2RemarkTextRO = true;
            $scope.DigitalSignHide = true;
        }






		$scope.PrintDisable = true;
		var EquiCertAppddata = EquiCertAppService.GetReqEquiCertByID($scope.EquiCertApp.EquiCertID);
        EquiCertAppddata.then(function (data) {
            $scope.EquiCertApp = data[0];
            if (AppSettings.SysUsrGrpID == 21) {
                if (data[0].ReqStatus == 'P') { $scope.EquiCertApp.ReqStatus = "0"; }
                if (data[0].ReqStatus == 'A' || data[0].ReqStatus == 'R') {
                    $scope.ShowLevel1 = true;
                    $scope.ShowLevel2 = false;
                    $scope.Approver1RemarkRO = true;
                    $scope.ShowSubmit = false;
                    $scope.StarShow = false;

                }
                else {
                    $scope.ShowLevel1 = false;
                    $scope.ShowLevel2 = false;
                    $scope.Approver1RemarkRO = false;
                    $scope.ShowSubmit = true;
                    $scope.StarShow = true;

                }
            }
            else if (AppSettings.SysUsrGrpID == 17) {
                if (data[0].ReqStatus1 == 'P') { $scope.EquiCertApp.ReqStatus1 = "0"; }
                if (data[0].ReqStatus1 == 'A' || data[0].ReqStatus1 == 'R') {
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                    $scope.Approver2RemarkRO = true;
                    $scope.ShowSubmit = false;
                    $scope.Star1Show = false;
                    if (data[0].ReqStatus1 == 'A') {
                        $scope.DigitalSignHide = false;
                    }
                    else {
                        $scope.DigitalSignHide = true;
                    }
                }
                else {
                    $scope.ShowLevel2 = false;
                    $scope.ShowLevel1 = true;
                    $scope.Approver2RemarkRO = false;
                    $scope.ShowSubmit = true;
                    $scope.Star1Show = true;
                    $scope.DigitalSignHide = true;
                }
            }

            if (data[0].ReqStatus1 == 'A') {
                $scope.PrintDisable = false;
            }
            //start
            if (AppSettings.SysUsrGrpID == 17) {
                if ((data[0].ReqStatus1 == 'P')) {
                    $scope.ShowPrint = false;
                }
                else {
                    $scope.ShowPrint = true;
                }
            }
            else { $scope.ShowPrint = false; }

            if ((data[0].ReqStatus1 == 'R') || (data[0].ReqStatus1 == 'P')) {
                $scope.digisign = true;
            }
            else {
                $scope.digisign = false;
            }
            ///end
            $scope.EquiCertApp.UploadDoc1 = data[0].UploadDoc1;//10th Marks Memo
            $scope.EquiCertApp.UploadDoc2 = data[0].UploadDoc2;//12th Marks Memo
            $scope.EquiCertApp.UploadDoc3 = data[0].UploadDoc3;//12th Transfer Cert
            $scope.EquiCertApp.UploadDoc4 = data[0].UploadDoc4; //10th Migartion Cert

            $scope.EquiCertApp.UploadDoc5 = data[0].UploadDoc5;//Passport
            $scope.EquiCertApp.UploadDoc6 = data[0].UploadDoc6;//Embassy
            $scope.EquiCertApp.UploadDoc7 = data[0].UploadDoc7;//Affidavit



            $scope.EquiCertApp.BoardLocation = data[0].BoardLocation;
            if ($scope.EquiCertApp.BoardLocation == 'F') {
                $scope.PasPortAndEmbasyShow = true;
            }
            else {
                $scope.PasPortAndEmbasyShow = false;
            }


            if ($scope.EquiCertApp.UploadDoc7 == null) {//No File Not display in Affidavit
                $scope.AffidavitShow = false;
            }
            else {
                $scope.AffidavitShow = true;
            }
            if (($scope.EquiCertApp.UploadDoc5 == null) || ($scope.EquiCertApp.UploadDoc6 == null)) {//No File Not display in Passport and Embassy
                $scope.PasPortAndEmbasyShow = false;
            }
            else {
                $scope.PasPortAndEmbasyShow = true;
            }
            


        }, function (error) {
            alert(error);
        });
        $scope.ChangeTextArea = function (str, type) {
            if (type == "ReqStatus") {
                if (str == 'A') { $scope.EquiCertApp.ProcessRemark = "Approved"; }
                else if (str == 'R') { $scope.EquiCertApp.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'A') { $scope.EquiCertApp.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.EquiCertApp.ProcessRemark1 = "Rejected"; }
            }
        };
		$scope.SaveUploadDoc1 = function () {
            if ($scope.UploadDoc1 != undefined) {
				var fd = new FormData();
                fd.append("file", $scope.UploadDoc1[0]);
				var url = AppSettings.WebApiUrl + "api/ReqEquiCert/PostDwFilePath/?EquiCertID=" + $scope.EquiCertApp.EquiCertID + "";
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
                $scope.UploadDoc1 = [];
				var filesize = element.files[0].size;  // in bytes
				if (filesize <= 200000) {
                    $scope.UploadDoc1.push(element.files[0]);
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
		$scope.SaveEquiCertApp = function () {
			$scope.RollEditDisable = true;
			$scope.EquiCertApp.ProcessbyID = AppSettings.LoggedUserId;
			if (($scope.EquiCertApp.ReqStatus == undefined) || ($scope.EquiCertApp.ReqStatus == "0")) {
				alert("Select Status");
				$scope.RollEditDisable = false;
				$scope.UploadFiles = true;
				return;
            }
            if (($scope.EquiCertApp.ProcessRemark == undefined) || ($scope.EquiCertApp.ProcessRemark == "")) {
                alert("Enter Process Remark");
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                return;
            }
            if (!ProcRegex.test($scope.EquiCertApp.ProcessRemark)) {
                alert("Invalid data in Process Remark.");
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                return;
            }
            if (AppSettings.SysUsrGrpID == 17) {
                if (($scope.EquiCertApp.ReqStatus1 == undefined) || ($scope.EquiCertApp.ReqStatus1 == "0")) {
                    alert("Select Status");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                //if (($scope.EquiCertApp.ProcessRemark1 == undefined) || ($scope.EquiCertApp.ProcessRemark1 == "")) {
                //    alert("Enter Process Remark1");
                //    $scope.RollEditDisable = false;
                //    $scope.UploadFiles = true;
                //    return;
                //}
                if (($scope.EquiCertApp.ProcessRemark1 == undefined) || ($scope.EquiCertApp.ProcessRemark1 == "")) {
                    alert("Enter Process Remark1");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (!ProcRegex.test($scope.EquiCertApp.ProcessRemark1)) {
                    alert("Invalid data in Process Remark1.");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
            }
			//if (($scope.EquiCertApp.ProcessRemark == undefined) || ($scope.EquiCertApp.ProcessRemark == "")) {
			//	alert("Enter Process Remark");
			//	$scope.RollEditDisable = false;
			//	$scope.UploadFiles = true;
			//	return;
			//}
			//var UserGrp = "";
			//if (AppSettings.SysUsrGrpID == 2) {
			//	UserGrp = "A";
			//} else {
			//	UserGrp = "O";
			//}
            var UserGrp = "";
            $scope.Approver1Remarks = true;
            if (AppSettings.SysUsrGrpID == 21) {
                UserGrp = "O";
                $scope.Approver1Remarks = true;
            }
            else if (AppSettings.SysUsrGrpID == 17) {
                UserGrp = "A";
                $scope.Approver1Remarks = false;
                $scope.Approver1RemarkRO = true;
                $scope.Approver1RemarkTextRO = true;
            } 
			$scope.EquiCertApp.UserGrp = UserGrp;
			var getPromise = EquiCertAppService.UpdateEquiCertApp($scope.EquiCertApp);
            getPromise.then(function (data) {
                if ($scope.Upload1 != undefined) {
                    var fd = new FormData();
                    fd.append("file", $scope.Upload1[0]);
                    var url = AppSettings.WebApiUrl + "api/ReqEquiCert/PostDwFilePath/?EquiCertID=" + $scope.EquiCertApp.EquiCertID + "";
                    $http.post(url, fd, {
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    }).then(function (data) {
                        alert("Saved Successfully");
                        RedirectToListPage();
                    }).catch(function (data, status, headers, config) {
                        alert("Upload error");
                    });

                } else {
                    if (AppSettings.SysUsrGrpID == 17) {
                        
                        alert("Saved Successfully");
                        if ($scope.ReqStatus1 == 'A') {
                            $scope.ShowSubmit = false;
                            $scope.DigitalSignHide = false;
                        }
                        else if ($scope.ReqStatus1 == 'R'){
                            $scope.ShowSubmit = false;
                            $scope.DigitalSignHide = true;
                        }
                        return;
                    }
                    else {
                        alert("Saved Successfully");
                        RedirectToListPage();
                    }
                }
			}, function (error) {
				$scope.RollEditDisable = false;
				$scope.UploadFiles = true;
				alert(error);
			});
        }

        
        $scope.PrintEquiCertApp = function () {
            var getPromise = EquiCertAppService.GetCertPdf($scope.EquiCertApp.FormNo);
            getPromise.then(function (data) {
                $state.go('StudentRequestBoard.AddSign', { PdfPath: data[0].DigiSignPDFURL, PdfPhysicalPath: data[0].PDFPhysicalFilePath, FormNo: $scope.EquiCertApp.FormNo, ReqType: 'Equivalency' });
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

