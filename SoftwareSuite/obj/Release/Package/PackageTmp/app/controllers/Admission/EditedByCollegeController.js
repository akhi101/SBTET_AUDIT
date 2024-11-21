define(['app'], function (app) {
    app.controller("EditedByCollegeController", function ($filter, $http, $scope, $state, $stateParams, AppSettings, EditedByCollegeService) {
        $scope.EditedByCollege = { PreStudRegID: $stateParams.PreStudRegID };
        var PageNm = $state.current.name.split(".")[1] + "";
        var EditedByCollegeRightsdata = [];
        EditedByCollegeRightsdata = AppSettings.UserRights;
        for (var i = 0; i < EditedByCollegeRightsdata.length; i++) {
            if (EditedByCollegeRightsdata[i].GridFormToOpen == PageNm) {
                if (EditedByCollegeRightsdata[i].isupdatable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        $scope.FillSubCaste = function (CasteID) {
            $scope.SubCasteDisable = false;
            var SubCastList = EditedByCollegeService.GetSubCastListByCasteID(CasteID);
            SubCastList.then(function (SubCastdata, status, headers, config, error) {
                $scope.SubCastList = SubCastdata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.StudentPhoto = "";
        $scope.StudentSign = "";
        document.getElementById("StudentPhoto").src = "../../../contents/img/photoimages.png";
        document.getElementById("StudentSign").src = "../../../contents/img/photoimages.png";
        $scope.GenderDisable = true;
        var CasteList = EditedByCollegeService.GetCasteList();
        CasteList.then(function (Castedata, status, headers, config, error) {
            $scope.CasteList = Castedata;
            var SubCastList = EditedByCollegeService.GetSubCastListByCasteID(0);
            SubCastList.then(function (SubCastdata, status, headers, config, error) {
                $scope.SubCastList = SubCastdata;
                $scope.SubCasteDisable = true;
                var StudentRegdata = EditedByCollegeService.GetStudentRegById($scope.EditedByCollege.PreStudRegID);
                StudentRegdata.then(function (data) {
                    $scope.EditedByCollege = data[0];
                    if (AppSettings.MngtTypID == 21) {
                        $scope.RollDeleteDisable = true;
                    }
                    if (($scope.EditedByCollege.Gender == "O") || ($scope.EditedByCollege.Gender == ""))  {
                        $scope.GenderDisable = false;
                    }
                    if (data[0].PhotoPath == null) {
                        $scope.StudentPhoto = "../../../contents/img/photoimages.png";
                    } else {
                        $scope.StudentPhoto = data[0].PhotoPath;
                    }
                    if (data[0].SignPath == null) {
                        $scope.StudentSign = "../../../contents/img/photoimages.png";
                    } else {
                        $scope.StudentSign = data[0].SignPath;
                    }
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }, function (error) {
            alert(error);
        });
        $scope.RollEditDisable = false;
        $scope.RollDeleteDisable = false;
        $scope.DeleteEditedByCollege = function () {
            if (AppSettings.MngtTypID == 21) {
                alert("Only Private college student will be deleted");
                return;
            } else {
                $scope.EditedByCollege.UpdLoginID = AppSettings.LoggedUserId;
                var getData = EditedByCollegeService.DeleteEditedByCollege($scope.EditedByCollege.PreStudRegID, $scope.EditedByCollege.UpdLoginID);
                getData.then(function (msg) {
                    alert('Record Deleted');
                    RedirectToListPage();
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.SaveEditedByCollege = function () {
            $scope.RollEditDisable = true;
            $scope.EditedByCollege.UpdLoginID = AppSettings.LoggedUserId;
            if ($scope.EditedByCollege.PreStudRegID == undefined) { $scope.EditedByCollege.PreStudRegID = 0; }
            if ($scope.EditedByCollege.PreStudRegID != 0) {
                if ((($scope.Photofile[0] != undefined) && ($scope.StudentPhoto != "")) || (($scope.Signfile[0] != undefined) && ($scope.StudentSign != ""))) {
                    if (($scope.Photofile[0] != undefined) && ($scope.StudentPhoto != "") && ($scope.Signfile[0] == undefined)) {
                        var fd = new FormData();
                        fd.append("file", $scope.Photofile[0]);
                        var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegPhoto/?PreStudRegID=" + $scope.EditedByCollege.PreStudRegID + "&SSCHallTicket=" + $scope.EditedByCollege.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
                        $http.post(url, fd, {
                            headers: { 'Content-Type': undefined },
                            transformRequest: angular.identity
                        }).then(function (data) {
                            var getPromise = EditedByCollegeService.PostEditedByCollegeData($scope.EditedByCollege);
                            getPromise.then(function (data) {
                                alert("Edited Successfully");
                                RedirectToListPage();
                            }, function (error) {
                                $scope.RollEditDisable = false;
                                alert(error);
                            });
                        })
                        .catch(function (data, status, headers, config) {
                            alert(data.data.error);
                            $scope.RollEditDisable = false;
                        });
                    } else {
                        if (($scope.Signfile[0] != undefined) && ($scope.StudentSign != "") && ($scope.Photofile[0] == undefined)) {
                            var fd = new FormData();
                            fd.append("file", $scope.Signfile[0]);
                            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegSign/?PreStudRegID=" + $scope.EditedByCollege.PreStudRegID + "&SSCHallTicket=" + $scope.EditedByCollege.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
                            $http.post(url, fd, {
                                headers: { 'Content-Type': undefined },
                                transformRequest: angular.identity
                            }).then(function (data) {
                                var getPromise = EditedByCollegeService.PostEditedByCollegeData($scope.EditedByCollege);
                                getPromise.then(function (data) {
                                    alert("Edited Successfully");
                                    RedirectToListPage();
                                }, function (error) {
                                    $scope.RollEditDisable = false;
                                    alert(error);
                                });
                            })
                            .catch(function (data, status, headers, config) {
                                alert(data.data.error);
                                $scope.RollEditDisable = false;
                            });
                        } else {
                            var fd = new FormData();
                            fd.append("file", $scope.Photofile[0]);
                            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegPhoto/?PreStudRegID=" + $scope.EditedByCollege.PreStudRegID + "&SSCHallTicket=" + $scope.EditedByCollege.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
                            $http.post(url, fd, {
                                headers: { 'Content-Type': undefined },
                                transformRequest: angular.identity
                            }).then(function (data) {
                                if (($scope.Signfile[0] != undefined) && ($scope.StudentSign != "")) {
                                    var fd = new FormData();
                                    fd.append("file", $scope.Signfile[0]);
                                    var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegSign/?PreStudRegID=" + $scope.EditedByCollege.PreStudRegID + "&SSCHallTicket=" + $scope.EditedByCollege.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
                                    $http.post(url, fd, {
                                        headers: { 'Content-Type': undefined },
                                        transformRequest: angular.identity
                                    }).then(function (data) {
                                        var getPromise = EditedByCollegeService.PostEditedByCollegeData($scope.EditedByCollege);
                                        getPromise.then(function (data) {
                                            alert("Edited Successfully");
                                            RedirectToListPage();
                                        }, function (error) {
                                            $scope.RollEditDisable = false;
                                            alert(error);
                                        });
                                    })
                                    .catch(function (data, status, headers, config) {
                                        alert(data.data.error);
                                        $scope.RollEditDisable = false;
                                    });
                                } else {
                                    alert("Please Select Signature");
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
                    var getPromise = EditedByCollegeService.PostEditedByCollegeData($scope.EditedByCollege);
                    getPromise.then(function (data) {
                        alert("Edited Successfully");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.RollEditDisable = false;
                        alert(error);
                    });
                }
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission.EditedByCollegeList');
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
                    if (filesize <= 20000) {
                        $scope.Signfile.push(element.files[0]);
                    }
                    else {
                        alert("Please Upload a Sign upto 20kb");
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
            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegPhoto/?PreStudRegID=" + $scope.EditedByCollege.PreStudRegID + "&SSCHallTicket=" + $scope.EditedByCollege.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
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
            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegSign/?PreStudRegID=" + $scope.EditedByCollege.PreStudRegID + "&SSCHallTicket=" + $scope.EditedByCollege.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
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
    });
});

