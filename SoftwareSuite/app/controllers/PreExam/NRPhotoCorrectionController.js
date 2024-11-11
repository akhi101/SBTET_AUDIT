define(['app'], function (app) {
    app.controller("NRPhotoCorrectionController", function ($scope, $http, $state, $localStorage, $stateParams, AppSettings, PreExamNRReportService, basicCourseService, basicExamService) {
        $scope.PhotoCorrectionData = {}; 
        $scope.ExamDisable = true;
        $scope.StudList = {}; 
        $scope.StudData = {}; 
        $scope.StudData.ReApplied = 0;
        $scope.ShowStudInfo = false; 
        $scope.ShowLoading = false;
        $scope.BrowseHide = false;
        $scope.ChallanID = "0";
        $scope.FeeAmount = "0";
        $scope.ApprovalStatus = "";
        $scope.ApprovalComment = "";
        $scope.SubmitFlag = false;
        $scope.ShowUpdate = false;
        $scope.ShowPayment = false;
        $scope.ShowStatus = false;
        $scope.GetStudentDisable = false;
        $scope.UpdateDisable = false;
        $scope.UpdateText = "Update";
        var NumRegex = /^[0-9]+$/; 
        $scope.PageNo = "";
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        $("#LoadImg").attr("src", AppSettings.LoadingImage);
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ListFormName == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        } 
        $scope.HTNOChange = function () {
            if (!NumRegex.test($scope.PhotoCorrectionData.HTNO) || $scope.PhotoCorrectionData.HTNO.length > 10) {
                $scope.PhotoCorrectionData.HTNO = $scope.PhotoCorrectionData.HTNO.slice(0, -1);
            }
        } 
        $scope.Payment = function () {
            var payurl = AppSettings.PaymentUrl + '?FormNo=' + 63 + "&ServiceID=" + 63 + "&FeeAmount=" + $scope.FeeAmount + "&ChallanID=" + $scope.ChallanID + "&CollegeID=" + AppSettings.CollegeID;
            window.open(payurl, '_Self');
        }; 
        $scope.GetStudentList = function () {
            $scope.StudList = [];
            $scope.StudData = [];
            $scope.Photofile = [];
            $scope.Signfile = [];
            $("#PhotoUpload").val(null);
            $("#SignUpload").val(null);
            $("#StudentPhoto").attr("src", "");
            $("#StudentSign").attr("src", "");
            if ($scope.PhotoCorrectionData.HTNO == undefined || $scope.PhotoCorrectionData.HTNO == "0") {
                alert("Please Enter HT NO.");
                $scope.ShowStudInfo = false;
                return;
            }
            if ($scope.PhotoCorrectionData.HTNO.toString().length > 10 || $scope.PhotoCorrectionData.HTNO.toString().length < 10 ) {
                alert("Please Enter Correct HT NO.");
                $scope.ShowStudInfo = false;
                return;
            }
            $scope.ShowLoading = true;
            $scope.GetStudentDisable = true;
            var StudData = PreExamNRReportService.getNRStudentsByCollege(AppSettings.CollegeID, $scope.PhotoCorrectionData.HTNO, AppSettings.ExamInstID);
            StudData.then(function (data) {
                if (data.length > 0) {
                    $scope.StudList = data;
                    $scope.ShowStudInfo = true;
                    $scope.ShowLoading = false;
                    $scope.GetStudentDisable = false;
                    $scope.StudData = $scope.StudList[0];
                    $scope.StudentPhoto = $scope.StudList[0].NewPhotoPath;
                    $scope.StudentSign = $scope.StudList[0].NewSignPath;
                    $scope.ChallanID = $scope.StudList[0].ChallanID;
                    $scope.FeeAmount = $scope.StudList[0].FeeAmount;
                    if (($scope.StudentPhoto != undefined && $scope.StudentPhoto != "" && $scope.StudentPhoto != null) || ($scope.StudentSign != undefined && $scope.StudentSign != "" && $scope.StudentSign != null)) {
                        $scope.BrowseHide = true;
                        $("#StudentPhoto").attr("src", $scope.StudentPhoto);
                        $("#StudentSign").attr("src", $scope.StudentSign);
                    }
                    else {
                        $scope.BrowseHide = false;
                        $scope.Photofile = [];
                        $scope.Signfile = [];
                        $("#PhotoUpload").val(null);
                        $("#SignUpload").val(null);
                        $("#StudentPhoto").attr("src", "");
                        $("#StudentSign").attr("src", "");
                    }
                    //if ($scope.SubmitFlag == true && $scope.StudList[0].ReAppCount == 0) {
                    //    $scope.Payment();
                    //}
                    if ($scope.StudList[0].RecordFlag == 0 && $scope.StudList[0].ActiveFlag == 0) {
                        $scope.ShowUpdate = true;
                        $scope.ShowPayment = false;
                        $scope.ShowStatus = false;
                    }
                    else if ($scope.StudList[0].RecordFlag != 0 && $scope.StudList[0].ActiveFlag == 0) {
                        $scope.ShowUpdate = false;
                        $scope.ShowPayment = true;
                        $scope.ShowStatus = false;
                    }
                    else if ($scope.StudList[0].RecordFlag != 0 && $scope.StudList[0].ActiveFlag != 0) {
                        $scope.ShowUpdate = false;
                        $scope.ShowPayment = false;
                        $scope.ShowStatus = true;
                    }
                    if ($scope.StudList[0].ReAppCount > 2) {
                        $scope.ShowUpdate = false;
                        $scope.ShowPayment = false;
                        $scope.ShowStatus = true;
                        $scope.ApprovalComment = "You Can't Apply.";
                    }
                    if ($scope.StudList[0].DieoApprovalFlag != undefined && $scope.StudList[0].DieoApprovalFlag != "" && $scope.StudList[0].DieoApprovalFlag != null) {
                        $scope.ApprovalStatus = "";
                        $scope.ApprovalComment = "";
                        if ($scope.StudList[0].DieoApprovalFlag == "P") {
                            $scope.ApprovalStatus = "Pending At DIEO";
                        }
                        else if ($scope.StudList[0].DieoApprovalFlag == "R") {
                            $scope.ApprovalStatus = "Rejected At DIEO";
                            $scope.ApprovalComment = "Comment: " + $scope.StudList[0].DieoComment;
                        }
                        else if ($scope.StudList[0].DieoApprovalFlag == "A") {
                            if ($scope.StudList[0].DSApprovalFlag == "P") {
                                $scope.ApprovalStatus = "Pending At DS";
                            }
                            else if ($scope.StudList[0].DSApprovalFlag == "A") {
                                $scope.ApprovalStatus = "Approved";
                            }
                            else if ($scope.StudList[0].DSApprovalFlag == "R") {
                                $scope.ApprovalStatus = "Rejected At DS";
                                $scope.ApprovalComment = "Comment: " + $scope.StudList[0].DsComment;
                            }
                        }
                    }
                    else {
                        $scope.ApprovalStatus = "";
                    }
                    if ($scope.StudList[0].DieoApprovalFlag == "R" || $scope.StudList[0].DSApprovalFlag == "R") {
                        $scope.ShowUpdate = true;
                        $scope.ShowPayment = false;
                        $scope.ShowStatus = true;
                        $scope.BrowseHide = false;
                        $scope.UpdateText = "Re-Apply";
                        $scope.Photofile = [];
                        $scope.Signfile = [];
                        $("#PhotoUpload").val(null);
                        $("#SignUpload").val(null);
                        $("#StudentPhoto").attr("src", "");
                        $("#StudentSign").attr("src", "");
                        $scope.StudData.ReApplied = 1;
                    }
                    else {
                        $scope.StudData.ReApplied = 0;
                        $scope.UpdateText = "Update";
                    }
                }
                else {
                    $scope.ShowLoading = false;
                    $scope.GetStudentDisable = false;
                    $scope.ShowStudInfo = false;
                    $scope.StudList = [];
                    $scope.StudData = [];
                    alert("Data Not Found");
                    return;
                }
            }, function (error) {
                alert(error);
                $scope.ShowLoading = false;
                $scope.GetStudentDisable = false;
                $scope.ShowStudInfo = false;
                $scope.StudList = [];
                $scope.StudData = [];
            });
        };
        $scope.PhotoIsLoaded = function (e) {
            $scope.$apply(function () {
                $scope.StudentPhoto = e.target.result;
            });
        }
        $scope.PhotoUpload = function (element) {
            var reader = new FileReader();
            if (element.value != '') {
                var extn = element.files[0].type.split("/").pop();
                if ((extn == "jpeg") || (extn == "png") || (extn == "gif") || (extn == "jpg") || (extn == "bmp")) {
                    $scope.Photofile = [];
                    var filesize = element.files[0].size;  // in bytes
                    if (filesize <= 50000) {
                        reader.onload = $scope.PhotoIsLoaded;
                        reader.readAsDataURL(element.files[0]);
                        $scope.Photofile.push(element.files[0]);
                    }
                    else {
                        alert("Please Upload a photo upto 50kb.");
                        $scope.Photofile = [];
                        $("#PhotoUpload").val(null);
                        $("#StudentPhoto").attr("src", "");
                        return;
                    }
                } else {
                    alert("Photo format is not valid.");
                    $scope.Photofile = [];
                    $("#PhotoUpload").val(null);
                    $("#StudentPhoto").attr("src", "");
                    return;
                }
            } else {
                alert("Please Select Photo.");
                $scope.Photofile = [];
                $("#PhotoUpload").val(null);
                $("#StudentPhoto").attr("src", "");
                return;
            }
        }
        $scope.SignIsLoaded = function (e) {
            $scope.$apply(function () {
                $scope.StudentSign = e.target.result;
            });
        }
        $scope.SignUpload = function (element) {
            var reader = new FileReader();
            if (element.value != '') {
                var extn = element.files[0].type.split("/").pop();
                if ((extn == "jpeg") || (extn == "png") || (extn == "gif") || (extn == "jpg") || (extn == "bmp")) {
                    $scope.Signfile = [];
                    var filesize = element.files[0].size;  // in bytes
                    if (filesize <= 20000) {
                        reader.onload = $scope.SignIsLoaded;
                        reader.readAsDataURL(element.files[0]);
                        $scope.Signfile.push(element.files[0]);
                    }
                    else {
                        alert("Please Upload a Sign upto 20kb");
                        $scope.Signfile = [];
                        $("#SignUpload").val(null);
                        $("#StudentSign").attr("src", "");
                        return;
                    }
                } else {
                    alert("Sign not valid format");
                    $scope.Signfile = [];
                    $("#SignUpload").val(null);
                    $("#StudentSign").attr("src", "");
                    return;
                }
            } else {
                alert("Please Select Sign");
                $scope.Signfile = [];
                $("#SignUpload").val(null);
                $("#StudentSign").attr("src", "");
                return;
            }
        } 
        $scope.Reload = function () {
            $scope.StudData = [];
            $scope.GetStudentList();
        };
        $scope.UpdateStudInfo = function () {
            $scope.ShowLoading = true;
            $scope.UpdateDisable = true;
            $scope.StudData.CreLoginID = AppSettings.LoggedUserId;
            if ($scope.StudData.PhotoPath == null || $scope.StudData.PhotoPath == undefined) {
                $scope.StudData.PhotoPath = "";
            }
            if ($scope.StudData.SignPath == null || $scope.StudData.SignPath == undefined) {
                $scope.StudData.SignPath = "";
            }
            if ($scope.StudData.PreStudRegID == undefined) { $scope.StudData.PreStudRegID = 0; }
            if ($scope.StudData.PreStudRegID != 0) {
                if (($scope.Photofile != undefined) && ($scope.Photofile.length > 0) && ($scope.StudentPhoto != "") && ($scope.StudentPhoto != null) && ($scope.Signfile != undefined) && ($scope.Signfile.length > 0) && ($scope.StudentSign != "") && ($scope.StudentSign != null)) {
                    var fd = new FormData();
                    fd.append("file", $scope.Photofile[0]);
                    var url = AppSettings.WebApiUrl + "api/NRDetail/PostUploadDoc/?PreStudRegID=" + $scope.StudData.PreStudRegID + "&DocType=P";
                    $http.post(url, fd, {
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    }).then(function (data) {
                        $scope.StudData.NewPhotoPath = data.data;
                        $scope.StudData.NewSignPath = "";
                        $scope.StudData.ValueName = "PhotoPath";
                        $scope.StudData.ValueDisplayName = "Photo";
                        var postStudData = PreExamNRReportService.postPhotoCorrectionData($scope.StudData);
                        postStudData.then(function (data) {
                            var fd = new FormData();
                            fd.append("file", $scope.Signfile[0]);
                            var url = AppSettings.WebApiUrl + "api/NRDetail/PostUploadDoc/?PreStudRegID=" + $scope.StudData.PreStudRegID + "&DocType=S";
                            $http.post(url, fd, {
                                headers: { 'Content-Type': undefined },
                                transformRequest: angular.identity
                            }).then(function (data) {
                                $scope.StudData.NewPhotoPath = "";
                                $scope.StudData.NewSignPath = data.data;
                                $scope.StudData.ValueName = "SignPath";
                                $scope.StudData.ValueDisplayName = "Sign";
                                var postStudData = PreExamNRReportService.postPhotoCorrectionData($scope.StudData);
                                postStudData.then(function (data) {
                                    $scope.ShowLoading = false;
                                    $scope.UpdateDisable = false;
                                    alert("Submitted Successfully");
                                    $scope.GetStudentList();
                                    $scope.SubmitFlag = true;
                                }, function (error) {
                                    $scope.UpdateDisable = false;
                                    $scope.ShowLoading = false;
                                    alert(error);
                                });
                            })
                                .catch(function (data, status, headers, config) {
                                    $scope.ShowLoading = false;
                                    $scope.UpdateDisable = false;
                                    alert(data.data.error);
                                });
                        }, function (error) {
                            $scope.UpdateDisable = false;
                            $scope.ShowLoading = false;
                            alert(error);
                        });
                    })
                        .catch(function (data, status, headers, config) {
                            $scope.ShowLoading = false;
                            $scope.UpdateDisable = false;
                            alert(data.data.error);
                        });
                }
                else if (($scope.Photofile != undefined) && ($scope.Photofile.length > 0) && ($scope.StudentPhoto != "") && ($scope.StudentPhoto != null)) {
                    var fd = new FormData();
                    fd.append("file", $scope.Photofile[0]);
                    var url = AppSettings.WebApiUrl + "api/NRDetail/PostUploadDoc/?PreStudRegID=" + $scope.StudData.PreStudRegID + "&DocType=P";
                    $http.post(url, fd, {
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    }).then(function (data) {
                        $scope.StudData.NewPhotoPath = data.data;
                        $scope.StudData.NewSignPath = "";
                        $scope.StudData.ValueName = "PhotoPath";
                        $scope.StudData.ValueDisplayName = "Photo";
                        var postStudData = PreExamNRReportService.postPhotoCorrectionData($scope.StudData);
                        postStudData.then(function (data) {
                            $scope.ShowLoading = false;
                            $scope.UpdateDisable = false;
                            alert("Submitted Successfully");
                            $scope.GetStudentList();
                            $scope.SubmitFlag = true;
                        }, function (error) {
                            $scope.UpdateDisable = false;
                            $scope.ShowLoading = false;
                            alert(error);
                        });

                    })
                        .catch(function (data, status, headers, config) {
                            $scope.ShowLoading = false;
                            $scope.UpdateDisable = false;
                            alert(data.data.error);
                        });
                }
                else if (($scope.Signfile != undefined) && ($scope.Signfile.length > 0) && ($scope.StudentSign != "") && ($scope.StudentSign != null)) {
                    var fd = new FormData();
                    fd.append("file", $scope.Signfile[0]);
                    var url = AppSettings.WebApiUrl + "api/NRDetail/PostUploadDoc/?PreStudRegID=" + $scope.StudData.PreStudRegID + "&DocType=S";
                    $http.post(url, fd, {
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    }).then(function (data) {
                        $scope.StudData.NewPhotoPath = "";
                        $scope.StudData.NewSignPath = data.data;
                        $scope.StudData.ValueName = "SignPath";
                        $scope.StudData.ValueDisplayName = "Sign";
                        var postStudData = PreExamNRReportService.postPhotoCorrectionData($scope.StudData);
                        postStudData.then(function (data) {
                            $scope.ShowLoading = false;
                            $scope.UpdateDisable = false;
                            alert("Submitted Successfully");
                            $scope.GetStudentList();
                            $scope.SubmitFlag = true;
                        }, function (error) {
                            $scope.UpdateDisable = false;
                            $scope.ShowLoading = false;
                            alert(error);
                        });
                    })
                        .catch(function (data, status, headers, config) {
                            $scope.ShowLoading = false;
                            $scope.UpdateDisable = false;
                            alert(data.data.error);
                        });
                }
                else {
                    alert("Please Select Photo/Sign to Update.");
                    $scope.ShowLoading = false;
                    $scope.UpdateDisable = false;
                    return;
                }
            }
        }
    });
});