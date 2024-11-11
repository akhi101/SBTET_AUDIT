define(['app'], function (app) {
    app.controller("PreStudentRegPhotoSignController", function ($filter, $http, $scope, $state, $stateParams, AppSettings, PreStudentRegService) {
        $scope.PreStudentRegPhotoSign = { PreStudRegID: $stateParams.PreStudRegID };
        var PageNm = $state.current.name.split(".")[1] + "";
        var StudentRegPhotoSignRightsdata = [];
        StudentRegPhotoSignRightsdata = AppSettings.UserRights;
        for (var i = 0; i < StudentRegPhotoSignRightsdata.length; i++) {
            if (StudentRegPhotoSignRightsdata[i].GridFormToOpen == PageNm) {
                if (StudentRegPhotoSignRightsdata[i].isupdatable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        $scope.StudentPhoto = "";
        $scope.StudentSign = "";
        $scope.StudentPhoto = "";
        $scope.StudentSign = "";
        document.getElementById("StudentPhoto").src = "../../../contents/img/photoimages.png";
        document.getElementById("StudentSign").src = "../../../contents/img/photoimages.png";
        var StudentRegdata = PreStudentRegService.GetPreStudentRegById($scope.PreStudentRegPhotoSign.PreStudRegID);
        StudentRegdata.then(function (data) {
            $scope.PreStudentRegPhotoSign = data[0];
            $scope.StudentPhoto = data[0].PhotoPath;
            $scope.StudentSign = data[0].SignPath;
        }, function (error) {
            alert(error);
            });
        $scope.SaveStudentRegPhotoSign = function () {
            $scope.RollEditDisable = true;
            if ($scope.PreStudentRegPhotoSign.PreStudRegID == undefined) { $scope.PreStudentRegPhotoSign.PreStudRegID = 0; }
            if ($scope.PreStudentRegPhotoSign.PreStudRegID != 0) {
                if ((($scope.Photofile[0] != undefined) && ($scope.StudentPhoto != "")) || (($scope.Signfile[0] != undefined) && ($scope.StudentSign != ""))) {
                    if (($scope.Photofile[0] != undefined) && ($scope.StudentPhoto != "") && ($scope.Signfile[0] == undefined)) {
                        var fd = new FormData();
                        fd.append("file", $scope.Photofile[0]);
                        var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegPhoto/?PreStudRegID=" + $scope.PreStudentRegPhotoSign.PreStudRegID + "&SSCHallTicket=" + $scope.PreStudentRegPhotoSign.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
                        $http.post(url, fd, {
                            headers: { 'Content-Type': undefined },
                            transformRequest: angular.identity
                        }).then(function (data) {
                            alert("Photo Uploaded Successfully");
                            $scope.RollEditDisable = false;
                            RedirectToListPage();
                        })
                            .catch(function (data, status, headers, config) {
                                alert(data.data.error);
                                $scope.RollEditDisable = false;
                            });
                    } else {
                        if (($scope.Signfile[0] != undefined) && ($scope.StudentSign != "") && ($scope.Photofile[0] == undefined)) {
                            var fd = new FormData();
                            fd.append("file", $scope.Signfile[0]);
                            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegSign/?PreStudRegID=" + $scope.PreStudentRegPhotoSign.PreStudRegID + "&SSCHallTicket=" + $scope.PreStudentRegPhotoSign.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
                            $http.post(url, fd, {
                                headers: { 'Content-Type': undefined },
                                transformRequest: angular.identity
                            }).then(function (data) {
                                alert("Signature Uploaded Successfully");
                                RedirectToListPage();
                            })
                                .catch(function (data, status, headers, config) {
                                    alert(data.data.error);
                                    $scope.RollEditDisable = false;
                                });
                        } else {
                            var fd = new FormData();
                            fd.append("file", $scope.Photofile[0]);
                            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegPhoto/?PreStudRegID=" + $scope.PreStudentRegPhotoSign.PreStudRegID + "&SSCHallTicket=" + $scope.PreStudentRegPhotoSign.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
                            $http.post(url, fd, {
                                headers: { 'Content-Type': undefined },
                                transformRequest: angular.identity
                            }).then(function (data) {
                                if (($scope.Signfile[0] != undefined) && ($scope.StudentSign != "")) {
                                    var fd = new FormData();
                                    fd.append("file", $scope.Signfile[0]);
                                    var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegSign/?PreStudRegID=" + $scope.PreStudentRegPhotoSign.PreStudRegID + "&SSCHallTicket=" + $scope.PreStudentRegPhotoSign.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
                                    $http.post(url, fd, {
                                        headers: { 'Content-Type': undefined },
                                        transformRequest: angular.identity
                                    }).then(function (data) {
                                        alert("Photo and Signature Uploaded Successfully");
                                        RedirectToListPage();
                                    })
                                    .catch(function (data, status, headers, config) {
                                        alert(data.data.error);
                                        $scope.RollEditDisable = false;
                                    });
                                } else {
                                    alert("please select Signature");
                                    $scope.RollEditDisable = false;
                                }
                            })
                            .catch(function (data, status, headers, config) {
                                alert(data.data.error);
                                $scope.RollEditDisable = false;
                            });
                        }
                    }
                    
                } else {
                    alert("please select Photo And Signature");
                    $scope.RollEditDisable = false;
                }
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission.PreStudentRegPhotoSignList');
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
                        alert("Please Upload a photo upto 50kb");
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
                    if (filesize <= 50000) {
                        $scope.Signfile.push(element.files[0]);
                    }
                    else {
                        alert("Please Upload a Sign upto 50kb");
                        $("#StudentPhoto").val("");
                        $scope.StudentPhoto = [];
                        $scope.StudentPhoto = null;
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
            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegPhoto/?PreStudRegID=" + $scope.PreStudentRegPhotoSign.PreStudRegID + "&SSCHallTicket=" + $scope.PreStudentRegPhotoSign.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
            $http.post(url, fd, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            }).then(function (data) {
                alert("Upload Photo Successfully");
            })
                .catch(function (data, status, headers, config) {
                    alert(data);
                    $scope.file = "";
                });
        };
        $scope.uploadSign = function (files) {
            var fd = new FormData();
            fd.append("file", files[0]);
            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegSign/?PreStudRegID=" + $scope.PreStudentRegPhotoSign.PreStudRegID + "&SSCHallTicket=" + $scope.PreStudentRegPhotoSign.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
            $http.post(url, fd, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            }).then(function (data) {
                alert("Upload Photo Successfully");
            })
                .catch(function (data, status, headers, config) {
                    alert(data);
                    $scope.file = "";
                });
        };
    });
});

