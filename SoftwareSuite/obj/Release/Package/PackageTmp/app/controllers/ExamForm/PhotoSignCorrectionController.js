define(['app'], function (app) {
    app.controller("PhotoSignCorrectionController", function ($scope, $state, $http, $stateParams, AppSettings, PhotoSignCorrectionService) {
        $scope.PhotoSignCorrection = {};
        $scope.TempPhotoSignCorrection = {};
        $scope.UpdatedPhotoPath = "";
        $scope.UpdatedSignPath = "";

        var PageNm = $state.current.name.split(".")[1];
        var PhotoSignCorrectionRightsdata = [];
        PhotoSignCorrectionRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PhotoSignCorrectionRightsdata.length; i++) {
            if (PhotoSignCorrectionRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PhotoSignCorrection.ExmFrmID == 0) {
                    if (PhotoSignCorrectionRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PhotoSignCorrectionRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PhotoSignCorrectionRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.Updateddisable = false;
        $scope.StudentPhoto = "";
        $scope.StudentSign = "";
        $scope.tempStudentPhoto = "";
        $scope.tempStudentSign = "";
        document.getElementById("StudentPhoto").src = "../../../contents/img/photoimages.png";
        document.getElementById("StudentSign").src = "../../../contents/img/photoimages.png";

        $scope.editvalue = false;
        $scope.SavePhotoSignCorrection = function () {
            $scope.isupdatableDisable = true;
            $scope.PhotoSignCorrection.CreLoginID = AppSettings.LoggedUserId;
            $scope.PhotoSignCorrection.UpdLoginID = AppSettings.LoggedUserId;
            $scope.PhotoSignCorrection.AcdYrID = AppSettings.AcdYrID;
            $scope.PhotoSignCorrection.ExamInstID = AppSettings.ExamInstID;
            var getPromise = PhotoSignCorrectionService.AddPhotoSignAtDIEO($scope.PhotoSignCorrection);
            getPromise.then(function (data) {
                if (data.length > 0) {
                } else {
                    $scope.PhotoSignCorrectionBill = [];
                }
                $scope.SaveStudentRegPhotoSign();
                $scope.isupdatableDisable = false;
                alert("Saved successfully.");
            }, function (error) {
                $scope.isupdatableDisable = false;
                alert(error);
            });

        }

        $scope.Submit = function () {
            var StudPhotoList = PhotoSignCorrectionService.GetPhotoSignAtDIEO($scope.PhotoSignCorrection.PRNNo, AppSettings.LoggedUserId);
            StudPhotoList.then(function (StudPhotodata, status, headers, config, error) {
                if (StudPhotodata.length > 0) {
                    if (StudPhotodata[0].ErrorMessage == "Record Not Found") {
                        alert("Record Not Found. Please Check PRN Number Or Contact Administrator.");
                        return;
                    }
                    $scope.PhotoSignCorrection.PreStudRegID = StudPhotodata[0].PreStudRegID;
                    if (StudPhotodata[0].PhotoPath == null) {
                        $scope.StudentPhoto = "../../../contents/img/photoimages.png";
                    } else {
                        $scope.StudentPhoto = StudPhotodata[0].PhotoPath;
                        $scope.tempStudentPhoto = $scope.StudentPhoto;
                    }
                    if (StudPhotodata[0].SignPath == null) {
                        $scope.StudentSign = "../../../contents/img/photoimages.png";
                    } else {
                        $scope.StudentSign = StudPhotodata[0].SignPath;
                        $scope.tempStudentSign = $scope.StudentSign;
                    }
                }
            });
        }

        $scope.AddPhotoSignAtDIEO = function () {
            if ($scope.PhotoSignCorrection.PreStudRegID == undefined) {
                $scope.PhotoSignCorrection.PreStudRegID = 0;
            }
            if ($scope.PhotoSignCorrection.PreStudRegID != 0) {
                if (($scope.StudentPhoto != "") && ($scope.StudentSign != "")) {
                    if ((($scope.Photofile[0] != undefined) && ($scope.StudentPhoto != "")) || (($scope.Signfile[0] != undefined) && ($scope.StudentSign != ""))) {
                        if (($scope.Photofile[0] != undefined) && ($scope.StudentPhoto != "") && ($scope.Signfile[0] == undefined)) {
                            var fd = new FormData();
                            fd.append("file", $scope.Photofile[0]);
                            var url = AppSettings.WebApiUrl + "api/ExamForms/AddPhotoAtDIEO/?PreStudRegID=" + $scope.PhotoSignCorrection.PreStudRegID + "&CollegeID=" + AppSettings.CollegeID + "&CreLoginID=" + AppSettings.LoggedUserId;
                            $http.post(url, fd, {
                                headers: { 'Content-Type': undefined },
                                transformRequest: angular.identity
                            }).then(function (data) {
                                alert("Photo Uploaded Successfully");
                                $scope.isupdatableDisable = true;
                                $scope.viewDisable = false;
                                $scope.RollEditDisable = false;
                            })
                                .catch(function (data, status, headers, config) {
                                    alert(data.data.error);
                                    $scope.RollEditDisable = false;
                                });
                        } else {
                            if (($scope.Signfile[0] != undefined) && ($scope.StudentSign != "") && ($scope.Photofile[0] == undefined)) {
                                var fd = new FormData();
                                fd.append("file", $scope.Signfile[0]);
                                var url = AppSettings.WebApiUrl + "api/ExamForms/AddSignAtDIEO/?PreStudRegID=" + $scope.PhotoSignCorrection.PreStudRegID + "&CollegeID=" + AppSettings.CollegeID + "&CreLoginID=" + AppSettings.LoggedUserId;
                                $http.post(url, fd, {
                                    headers: { 'Content-Type': undefined },
                                    transformRequest: angular.identity
                                }).then(function (data) {
                                    alert("Signature Uploaded Successfully");
                                    $scope.isupdatableDisable = true;
                                    $scope.viewDisable = false;
                                })
                                    .catch(function (data, status, headers, config) {
                                        alert(data.data.error);
                                        $scope.RollEditDisable = false;
                                    });
                            } else {
                                var fd = new FormData();
                                fd.append("file", $scope.Photofile[0]);
                                var url = AppSettings.WebApiUrl + "api/ExamForms/AddPhotoAtDIEO/?PreStudRegID=" + $scope.PhotoSignCorrection.PreStudRegID + "&CollegeID=" + AppSettings.CollegeID + "&CreLoginID=" + AppSettings.LoggedUserId + "";
                                $http.post(url, fd, {
                                    headers: { 'Content-Type': undefined },
                                    transformRequest: angular.identity
                                }).then(function (data) {
                                    if (($scope.Signfile[0] != undefined) && ($scope.StudentSign != "")) {
                                        var fd = new FormData();
                                        fd.append("file", $scope.Signfile[0]);
                                        var url = AppSettings.WebApiUrl + "api/ExamForms/AddSignAtDIEO/?PreStudRegID=" + $scope.PhotoSignCorrection.PreStudRegID + "&CollegeID=" + AppSettings.CollegeID + "&CreLoginID=" + AppSettings.LoggedUserId + "";
                                        $http.post(url, fd, {
                                            headers: { 'Content-Type': undefined },
                                            transformRequest: angular.identity
                                        }).then(function (data) {
                                            alert("Photo and Signature Uploaded Successfully");
                                            $scope.isupdatableDisable = true;
                                            $scope.viewDisable = false;
                                        })
                                            .catch(function (data, status, headers, config) {
                                                alert(data.data.error);
                                                $scope.RollEditDisable = false;
                                            });
                                    } else {
                                        $scope.RollEditDisable = false;
                                    }
                                })
                                    .catch(function (data, status, headers, config) {
                                        alert(data.data.error);
                                        $scope.RollEditDisable = false;
                                    });
                            }
                        }
                    }
                }
                else {
                    $scope.RollEditDisable = false;
                }
            }
        }

        $scope.StudentPhoto = [];
        $scope.Photofile = [];
        var DeletePhoto = false;
        var DeleteSign = false;
        $scope.RemovePhoto = function () {
            DeletePhoto = true;
            $scope.StudentPhoto = [];
            $scope.Photofile = [];
        }
        $scope.SelectPhotoUploadFile = function () {
            $('#PhotoUpload').trigger('click');
            DeletePhoto = false;
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
                        alert("Please Upload a photo upto 50 KB");
                        $("#StudentPhoto").val("");
                        $scope.StudentPhoto = [];
                        $scope.StudentPhoto = null;
                        return;
                    }
                } else {
                    alert("Photo not valid format");
                    return;
                }
            } else {
                alert("Please Select Photo");
                return;
            }
        }
        $scope.PhotoIsLoaded = function (e) {
            $scope.$apply(function () {
                $scope.StudentPhoto = [];
                $scope.StudentPhoto.push(e.target.result);
                $scope.StudentPhoto = e.target.result;
            });
        }
        $scope.StudentSign = [];
        $scope.Signfile = [];
        $scope.SelectSignUploadFile = function () {
            $('#SignUpload').trigger('click');
            DeleteSign = false;
        }

        $scope.RemoveSign = function () {
            DeleteSign = true;
            $scope.StudentSign = [];
            $scope.Signfile = [];
        }
        $scope.SignUpload = function (element) {
            var reader = new FileReader();
            if (element.value != '') {
                reader.onload = $scope.SignIsLoaded;
                var extn = element.files[0].type.split("/").pop();
                if ((extn == "jpeg") || (extn == "png") || (extn == "gif") || (extn == "jpg") || (extn == "bmp")) {
                    reader.readAsDataURL(element.files[0]);
                    $scope.Signfile = [];
                    var filesize = element.files[0].size;  // in bytes
                    if (filesize <= 20000) {
                        $scope.Signfile.push(element.files[0]);
                    }
                    else {
                        alert("Please Upload a Sign upto 20 KB");
                        $("#StudentPhoto").val("");
                        $scope.StudentSign = [];
                        $scope.StudentSign = null;
                        return;
                    }
                } else {
                    alert("Sign not valid format");
                    return;
                }
            } else {
                alert("Please Select Sign");
                return;
            }
        }
        $scope.SignIsLoaded = function (e) {
            $scope.$apply(function () {
                $scope.StudentSign = [];
                $scope.StudentSign.push(e.target.result);
                $scope.StudentSign = e.target.result;
            });
        }
        $scope.uploadPhoto = function (files) {
            var fd = new FormData();
            fd.append("file", files[0]);
            var url = AppSettings.WebApiUrl + "api/ExamForms/PostStudentRegPhoto/?PreStudRegID=" + $scope.PhotoSignCorrection.PreStudRegID + "&ExmFrmID=" + $scope.PhotoSignCorrection.ExmFrmID + "&CollegeID=" + AppSettings.CollegeID + "&ExamID=" + $scope.PhotoSignCorrection.ExamID + "&CreLoginID=" + AppSettings.LoggedUserId;
            $http.post(url, fd, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            }).then(function (data) {
                alert("Uploaded Photo Successfully");
            })
                .catch(function (data, status, headers, config) {
                    alert(data);
                    $scope.file = "";
                });
        };
        $scope.uploadSign = function (files) {
            var fd = new FormData();
            fd.append("file", files[0]);
            var url = AppSettings.WebApiUrl + "api/ExamForms/PostStudentRegSign/?PreStudRegID=" + $scope.PhotoSignCorrection.PreStudRegID + "&SSCHallTicket=" + $scope.StudentRegPhotoSign.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
            $http.post(url, fd, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            }).then(function (data) {
                alert("Uploaded Photo Successfully");
            })
                .catch(function (data, status, headers, config) {
                    alert(data);
                    $scope.file = "";
                });
        };

        $scope.Exit = function () {
            RedirectToListPage();
        }

        function RedirectToListPage() {
            $state.go('Exam.ExamFormNRList', { CourseID: $scope.PhotoSignCorrection.CourseID, ExamID: $scope.PhotoSignCorrection.ExamID, MainGrpID: $scope.PhotoSignCorrection.MainGrpID, MediumID: $scope.PhotoSignCorrection.MediumID });
        }
    });
});