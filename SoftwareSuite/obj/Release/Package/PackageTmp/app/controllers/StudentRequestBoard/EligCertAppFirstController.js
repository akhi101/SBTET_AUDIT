define(['app'], function (app) {
    app.controller("EligCertAppFirstController", function ($http, $scope, $state, $stateParams, AppSettings, EligCertAppService) {
        $scope.EligCertAppFirst = { EligCertID: $stateParams.EligCertID };
        var ProcRegex = /^[0-9a-zA-Z\-.," '!]+$/;

        var PageNm = $state.current.name.split(".")[1] + "List";
        var EligCertAppFirstRightsdata = [];
        EligCertAppFirstRightsdata = AppSettings.UserRights;
        for (var i = 0; i < EligCertAppFirstRightsdata.length; i++) {
            if (EligCertAppFirstRightsdata[i].GridFormToOpen == PageNm) {
                if (EligCertAppFirstRightsdata[i].isupdatable == 'Y') {
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

        if (AppSettings.SysUsrGrpID == 21){
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
        var EligCertAppFirstdata = EligCertAppService.GetReqEligCertByID($scope.EligCertAppFirst.EligCertID);
        EligCertAppFirstdata.then(function (data) {
            $scope.EligCertAppFirst = data[0];

            if (AppSettings.SysUsrGrpID == 21) {
                if (data[0].ReqStatus == 'P') { $scope.EligCertAppFirst.ReqStatus = "0"; }
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
                if (data[0].ReqStatus1 == 'P') { $scope.EligCertAppFirst.ReqStatus1 = "0"; }
                if (data[0].ReqStatus1 == 'A' || data[0].ReqStatus1 == 'R') {
                    //Approved/Rejected
                    $scope.ShowLevel2 = true;
                    $scope.ShowLevel1 = true;
                    $scope.Approver2RemarkRO = true;
                    $scope.ShowSubmit = false;
                    $scope.Star1Show = false;
                    if ($scope.EligCertAppFirst.DigiSignBy == null) {
                        $scope.DigitalSignHide = false;
                    }
                    else {
                        $scope.DigitalSignHide = true;
                    }

                    if ($scope.EligCertAppFirst.ReqStatus1 == 'R') {
                        $scope.DigitalSignHide = true;
                    }
                    else {
                        $scope.DigitalSignHide = false;
                    }
                }
                else {
                    //new apply
                    $scope.ShowLevel2 = false;
                    $scope.ShowLevel1 = true;
                    $scope.Approver2RemarkRO = false;
                    $scope.ShowSubmit = true;
                    $scope.Star1Show = true;
                    $scope.DigitalSignHide = true;
                }
            }
            ///start
            if (AppSettings.SysUsrGrpID == 17) {
                if ((data[0].ReqStatus1 == 'P')) {
                    $scope.ShowPrint = false;
                }
                else {
                    $scope.ShowPrint = true;
                }
            }
            else { $scope.ShowPrint = false; }

            //if ((data[0].ReqStatus1 == 'R') || (data[0].ReqStatus1 == 'P')) {
            //    $scope.DigitalSignHide = true;
            //}
            //else {
            //    $scope.DigitalSignHide = false;
            //}
            ///end

            $scope.EligCertAppFirst.UploadDoc1 = data[0].UploadDoc1;
            $scope.EligCertAppFirst.UploadDoc2 = data[0].UploadDoc2;
            $scope.EligCertAppFirst.UploadDoc3 = data[0].UploadDoc3;

            $scope.EligCertAppFirst.PassportCopy = data[0].PassportCopy;
            $scope.EligCertAppFirst.EmbassyAIUCopy = data[0].EmbassyAIUCopy;


            if ($scope.EligCertAppFirst.ExmName == "I Year") {
                document.getElementById('BoardName').innerHTML = '10th Board Name :';
                document.getElementById('ExaminationName').innerHTML = '10th Examination Name :';
                document.getElementById('ExamPassYearMonth').innerHTML = '10th Passed Year & Month :';
                document.getElementById('UploadTC').innerHTML = '10th Transfer Certificate';
                document.getElementById('UploadMigration').innerHTML = '10th Migration Certificate';
            } else {
                document.getElementById('BoardName').innerHTML = '11th Board Name :';
                document.getElementById('ExaminationName').innerHTML = '11th Examination Name :';
                document.getElementById('ExamPassYearMonth').innerHTML = '11th Passed Year & Month :';
                document.getElementById('UploadMigration').innerHTML = ' 11th Marks Memo';
                document.getElementById('UploadTC').innerHTML = ' 11th Transfer Certificate';
            }

            $scope.EligCertAppFirst.BoardLocation = data[0].BoardLocation;
            //$scope.EligCertAppFirst.PlaceofExam = data[0].PlaceofExam;
            if ($scope.EligCertAppFirst.BoardLocation == 'F') {
                $scope.EmbassyAIULetterHide = false;
                $scope.PassportHide = false;
            }
            else {
                $scope.EmbassyAIULetterHide = true;
                $scope.PassportHide = true;

            }
            if ($scope.EligCertAppFirst.PassportCopy == null) {
                $scope.PassportHide = true;
            }
            else {
                $scope.PassportHide = false;
                document.getElementById('UploadPassport').innerHTML = ' Passport';

            }
            if ($scope.EligCertAppFirst.EmbassyAIUCopy == null) {
                $scope.EmbassyAIULetterHide = true;
            }
            else {
                $scope.EmbassyAIULetterHide = false;
                document.getElementById('EmbassyAIULetterHide').innerHTML = ' Embassy Letter/AIU Letter';

            }
        }, function (error) {
            alert(error);
        });
       
        
        $scope.SaveUploadDoc1 = function () {
            if ($scope.Upload1 != undefined) {
                var fd = new FormData();
                fd.append("file", $scope.Upload1[0]);
                var url = AppSettings.WebApiUrl + "api/ReqEligCert/PostDwFilePath/?EligCertID=" + $scope.EligCertAppFirst.EligCertID + "";
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
        $scope.SaveUploadDoc2 = function () {
            if ($scope.UploadDoc2 != undefined) {
                var fd = new FormData();
                fd.append("file", $scope.Upload2[0]);
                var url = AppSettings.WebApiUrl + "api/ReqEligCert/PostDwFilePath/?EligCertID=" + $scope.EligCertAppFirst.EligCertID + "";
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
        $scope.FileUpload2 = function (element) {
            var reader = new FileReader();
            var extn = element.files[0].type.split("/").pop();
            if (extn == "pdf") {
                reader.readAsDataURL(element.files[0]);
                $scope.Upload2 = [];
                var filesize = element.files[0].size;  // in bytes
                if (filesize <= 200000) {
                    $scope.Upload2.push(element.files[0]);
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
        $scope.SaveUploadDoc3 = function () {
            if ($scope.UploadDoc2 != undefined) {
                var fd = new FormData();
                fd.append("file", $scope.Upload3[0]);
                var url = AppSettings.WebApiUrl + "api/ReqEligCert/PostDwFilePath/?EligCertID=" + $scope.EligCertAppFirst.EligCertID + "";
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
        $scope.FileUpload3 = function (element) {
            var reader = new FileReader();
            var extn = element.files[0].type.split("/").pop();
            if (extn == "pdf") {
                reader.readAsDataURL(element.files[0]);
                $scope.Upload3 = [];
                var filesize = element.files[0].size;  // in bytes
                if (filesize <= 200000) {
                    $scope.Upload3.push(element.files[0]);
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
        $scope.SavePassportCopy = function () {
            if ($scope.PassportCopy != undefined) {
                var fd = new FormData();
                fd.append("file", $scope.PassportCopy[0]);
                var url = AppSettings.WebApiUrl + "api/ReqEligCert/PostDwFilePath/?EligCertID=" + $scope.EligCertAppFirst.EligCertID + "";
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
        $scope.FilePassportCopy = function (element) {
            var reader = new FileReader();
            var extn = element.files[0].type.split("/").pop();
            if (extn == "pdf") {
                reader.readAsDataURL(element.files[0]);
                $scope.PassportCopy = [];
                var filesize = element.files[0].size;  // in bytes
                if (filesize <= 200000) {
                    $scope.PassportCopy.push(element.files[0]);
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
        $scope.SaveEmbassyAIUCopy = function () {
            if ($scope.EmbassyAIUCopy != undefined) {
                var fd = new FormData();
                fd.append("file", $scope.EmbassyAIUCopy[0]);
                var url = AppSettings.WebApiUrl + "api/ReqEligCert/PostDwFilePath/?EligCertID=" + $scope.EligCertAppFirst.EligCertID + "";
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
        $scope.FileEmbassyAIUCopy = function (element) {
            var reader = new FileReader();
            var extn = element.files[0].type.split("/").pop();
            if (extn == "pdf") {
                reader.readAsDataURL(element.files[0]);
                $scope.EmbassyAIUCopy = [];
                var filesize = element.files[0].size;  // in bytes
                if (filesize <= 200000) {
                    $scope.EmbassyAIUCopy.push(element.files[0]);
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
        $scope.SaveEligCertAppFirst = function () {
            $scope.RollEditDisable = true;
            $scope.EligCertAppFirst.ProcessbyID = AppSettings.LoggedUserId;
            if (($scope.EligCertAppFirst.ReqStatus == undefined) || ($scope.EligCertAppFirst.ReqStatus == "0")) {
                alert("Select Status");
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                return;
            }
            if (($scope.EligCertAppFirst.ProcessRemark == undefined) || ($scope.EligCertAppFirst.ProcessRemark == "")) {
                alert("Enter Process Remark.");
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                return;
            }
            if (!ProcRegex.test($scope.EligCertAppFirst.ProcessRemark)) {
                alert("Invalid data in Process Remark.");
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                return;
            }

            if (AppSettings.SysUsrGrpID == 17) {
                if (($scope.EligCertAppFirst.ReqStatus1 == undefined) || ($scope.EligCertAppFirst.ReqStatus1 == "0")) {
                    alert("Select Status");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (($scope.EligCertAppFirst.ProcessRemark1 == undefined) || ($scope.EligCertAppFirst.ProcessRemark1 == "")) {
                    alert("Enter Process Remark1.");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }
                if (!ProcRegex.test($scope.EligCertAppFirst.ProcessRemark1)) {
                    alert("Invalid data in Process Remark1.");
                    $scope.RollEditDisable = false;
                    $scope.UploadFiles = true;
                    return;
                }

            }
            
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
                if ($scope.EligCertAppFirst.ReqStatus1 == 'A') {
                    $scope.DigitalSignHide = false;
                }
                else {
                    $scope.DigitalSignHide = true;
                }
            } else {
                UserGrp = "S";
            }
            $scope.EligCertAppFirst.UserGrp = UserGrp;
            var getPromise = EligCertAppService.UpdateEligCertApp($scope.EligCertAppFirst);
            getPromise.then(function (data) {
                $scope.ShowCertificate = data;
                if ($scope.Upload1 != undefined) {
                    var fd = new FormData();
                    fd.append("file", $scope.Upload1[0]);
                    var url = AppSettings.WebApiUrl + "api/ReqEligCert/PostDwFilePath/?EligCertID=" + $scope.EligCertAppFirst.EligCertID + "";
                    $http.post(url, fd, {
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    }).then(function (data) {
                        alert("Saved Successfully");
                        RedirectToListPage();
                    })
                } else {

                    if (AppSettings.SysUsrGrpID == 17) {
                        $scope.ShowPrint = true;
                        $scope.ShowSubmit = true;
                        alert("Saved Successfully");
                        return;
                    }
                    else {
                        alert("Saved Successfully");
                        RedirectToListPage();
                    }
                }
            }, function (error) {
                $scope.RollEditDisable = false;
                alert(error);
            });
        }

        $scope.ChangeTextArea = function (str, type) {
            if (type == "ReqStatus") {
                if (str == 'A') { $scope.EligCertAppFirst.ProcessRemark = "Approved"; }
                else if (str == 'R') { $scope.EligCertAppFirst.ProcessRemark = "Rejected"; }
            }
            else if (type == "ReqStatus1") {
                if (str == 'A') { $scope.EligCertAppFirst.ProcessRemark1 = "Approved"; }
                else if (str == 'R') { $scope.EligCertAppFirst.ProcessRemark1 = "Rejected"; }
            }
        };

        $scope.PrintEligCertAppFirst = function () {
            var getPromise = EligCertAppService.GetCertPdf($scope.EligCertAppFirst.FormNo);
            getPromise.then(function (data) {
                $state.go('StudentRequestBoard.AddSign', { PdfPath: data[0].DigiSignPDFURL, PdfPhysicalPath: data[0].PDFPhysicalFilePath, FormNo: $scope.EligCertAppFirst.FormNo, ReqType: 'Eligibility' });
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