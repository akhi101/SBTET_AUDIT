define(['app'], function (app) {
    app.controller("StudentAuthenticationController", function ($filter, $http, $scope, $state, $stateParams, AppSettings, StudentRegService) {
        $scope.AdharPanel = true;
        $scope.StudentAuthentication = { StudRegID: $stateParams.StudRegID };
        var PageNm = $state.current.name.split(".")[1] + "";
        var StudentAuthenticationRightsdata = [];
        StudentAuthenticationRightsdata = AppSettings.UserRights;
        for (var i = 0; i < StudentAuthenticationRightsdata.length; i++) {
            if (StudentAuthenticationRightsdata[i].GridFormToOpen == PageNm) {
                if (StudentAuthenticationRightsdata[i].isupdatable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        var StudentRegdata = StudentRegService.GetStudentRegById($scope.StudentAuthentication.StudRegID);
        StudentRegdata.then(function (data) {
            $scope.StudentAuthentication = data[0];
            $scope.StudentAuthentication.AadharNo = $scope.StudentAuthentication.AadharNo.replace(/^\s+|\s+$/g, '');
        }, function (error) {
            alert(error);
            });
        $scope.SaveStudentAuthentication = function () {
            if (AppSettings.MngtTypID != 21) {
                if ($scope.StudentAuthentication.SecAadharVerify != 1) {
                    alert("Aadhaar verification is pending for selected group.");
                    return;
                }
                if ($scope.StudentAuthentication.CourseID == 1) {
                    if (!$scope.StudentAuthentication.SubAadharVerify > 0) {
                        alert("Aadhaar verification is pending for selected second language.");
                        return;
                    }
                }
            }
            $scope.RollEditDisable = true;
            if ($scope.StudentAuthentication.StudRegID == undefined) { $scope.StudentAuthentication.StudRegID = 0; }
            if ($scope.StudentAuthentication.StudRegID != 0) {
                var getPromise = StudentRegService.UpdateStudentRegAadharAuthenticate($scope.StudentAuthentication);
                getPromise.then(function (msg) {
                    $scope.RollEditDisable = true;
                    alert("Aadhaar Authentication Successful");
                    RedirectToListPage();
                }, function (error) {
                    $scope.RollEditDisable = false;
                    alert(error);
                });
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission.StudentAuthenticationList');
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
                        alert("Please Upload a Thumb upto 50kb");
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
                alert("Please Select Thumb");
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
                        alert("Please Upload a photo upto 50kb");
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
            var url = AppSettings.WebApiUrl + "api/StudentReg/PostStudentRegPhoto/?StudRegID=" + $scope.StudentAuthentication.StudRegID + "&SSCHallTicket=" + $scope.StudentAuthentication.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
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
            var url = AppSettings.WebApiUrl + "api/StudentReg/PostStudentRegSign/?StudRegID=" + $scope.StudentAuthentication.StudRegID + "&SSCHallTicket=" + $scope.StudentAuthentication.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
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

        //$scope.PutStudentAadhar = function () {
        //    if ($scope.StudentAuthentication.AadharStatus == 'N') {
        //        if (($scope.StudentAuthentication.AadharRemark == undefined) || ($scope.StudentAuthentication.AadharRemark == "")) {
        //            alert("Enter aadhar remark");
        //            return;
        //        }
        //    }
        //    $scope.StudentAuthentication.CollegeCatName = AppSettings.CollegeCatName;
        //    $scope.RollEditDisable = true;
        //    if ($scope.StudentAuthentication.AadharNo == undefined) { $scope.StudentAuthentication.AadharNo == ''; }
        //    if ($scope.StudentAuthentication.AadharNo != '') {
        //        $scope.StudentAuthentication.xmlPiddata = $("#txtPidData").val()
        //        var getPromise = StudentRegService.PutStudentAadhar($scope.StudentAuthentication);
        //        getPromise.then(function (data) {
        //            if (data == 'y') {
        //                $scope.RollEditDisable = true;
        //                $scope.SaveStudentAuthentication();
        //            } else if (data == 'n'){
        //                $scope.RollEditDisable = false;
        //                alert("Aadhaar Authentication Failed");
        //                return;
        //            }
        //            else {
        //                $scope.RollEditDisable = false;
        //                alert(data);
        //                return;
        //            }
        //        }, function (error) {
        //            $scope.RollEditDisable = false;
        //            alert(error);
        //        });
        //    }
        //}
        $scope.PostStudentAadhar = function () {
            if ($scope.StudentAuthentication.AadharStatus == 'N') {
                if (($scope.StudentAuthentication.AadharRemark == undefined) || ($scope.StudentAuthentication.AadharRemark == "")) {
                    alert("Enter aadhar remark");
                    return;
                }
            }
            $scope.StudentAuthentication.CollegeCatName = AppSettings.CollegeCatName;
            $scope.RollEditDisable = true;
            if ($scope.StudentAuthentication.AadharNo == undefined) { $scope.StudentAuthentication.AadharNo == ''; }
            if ($scope.StudentAuthentication.AadharNo != '') {
                $scope.StudentAuthentication.xmlPiddata = $("#txtPidData").val()
                var getPromise = StudentRegService.PostStudentAadhar($scope.StudentAuthentication);
                getPromise.then(function (data) {
                    if (data.status == 'y') {
                        $scope.AdharPanel = false;
                        $scope.RollEditDisable = true;
                        $scope.AaadhaarData = data;
                    } else if (data == 'n') {
                        $scope.RollEditDisable = false;
                        alert("Aadhaar Authentication Failed");
                        return;
                    }
                    else {
                        $scope.RollEditDisable = false;
                        alert(data);
                        return;
                    }
                }, function (error) {
                    $scope.RollEditDisable = false;
                    alert(error);
                });
            }
        }

    });
});

