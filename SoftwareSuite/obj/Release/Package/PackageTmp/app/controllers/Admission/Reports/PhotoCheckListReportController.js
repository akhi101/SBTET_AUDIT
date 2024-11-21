define(['app'], function (app) {
    app.controller("PhotoCheckListReportController", function ($scope, $http, $state, $localStorage, $stateParams, AppSettings, DrillDownService, EditedByCollegeService) {
        $scope.PhotoCheckListReportData = {}; 
        $scope.PhotoCheckListStudData = {}; 
        $scope.StudData = {}; 
        $scope.ConfirmList = [];
        $scope.ConfirmData = {};
        var authData = $localStorage.authorizationData;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        $scope.ShowRadio = true; 
        $scope.ShowCollege = false; 
        $scope.ShowStudents = false; 
        $scope.ShowPrintCheckList = false; 
        $scope.ShowConfirmCheckList = false; 
        $scope.MainPageNo = 1; 
        $scope.CourseID = "0";
        $scope.ExamID = "0";
        $scope.UserTypeFlag = "C";
        $scope.ExamDisable = true;
        $scope.ShowLoading = false; 
        $scope.ShowUpdateLoad = false; 
        $scope.PageNo = "";
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ListFormName == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        }
        $scope.FillCoursePart = function (CourseID) {
            $scope.ChangeSelection();
            if (CourseID != "0") {
                $scope.ExamDisable = false;
                var ExamList = DrillDownService.GetBasicExamList(CourseID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                    $scope.ExamID = "0";
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.ExamDisable = true;
                $scope.ExamList = [];
                $scope.ExamID = "0";
            }
        };
        $scope.ConfirmChange = function (PreStudRegID, isChecked) {
            if (isChecked) {
                $scope.ConfirmList.push(PreStudRegID);
            }
            else {
                var index = $scope.ConfirmList.indexOf(PreStudRegID);
                if (index > -1) {
                    $scope.ConfirmList.splice(index, 1);
                }
            }
        };
        $scope.ChangeSelection = function () {
            $scope.ShowCollege = false;
            $scope.ShowStudents = false;
            $scope.ShowPrintCheckList = false;
            $scope.ShowConfirmCheckList = false; 
            $scope.ShowBack = false;
            $scope.MainPageNo = 1;
        };
        $scope.PageBack = function () {
            if ($scope.MainPageNo == 3) {
                $scope.ShowCollege = true;
                $scope.ShowStudents = false;
                $scope.ShowPrintCheckList = false;
                $scope.ShowConfirmCheckList = false; 
                $scope.MainPageNo = 2;
            }
            else if ($scope.MainPageNo == 2) {
                $scope.ShowRadio = true;
                $scope.ShowCollege = false;
                $scope.ShowPrintCheckList = false;
                $scope.ShowConfirmCheckList = false; 
                $scope.MainPageNo = 1;
            }
            if ($scope.MainPageNo == 1) {
                $scope.ShowBack = false;
            }
        };
        $scope.GetCheckListByDIEO = function () {
            if ($scope.CourseID == undefined || $scope.CourseID == "0") {
                alert("Please select Stream.");
                return;
            }
            if ($scope.ExamID == undefined || $scope.ExamID == "0") {
                alert("Please select Exam Year.");
                return;
            }
            $scope.ShowLoading = true;
            if (AppSettings.CollegeID == undefined || AppSettings.CollegeID == "0") {
                var PhotoCheckListReportData = DrillDownService.GetPhotoCheckListReportByDIEO($scope.ExamID, $scope.CourseID, AppSettings.DistrictIDs);
                PhotoCheckListReportData.then(function (data) {
                    if (data.length > 0) {
                        $scope.MainPageNo = 2;
                        $scope.ShowRadio = false;
                        $scope.ShowCollege = true;
                        $scope.ShowStudents = false;
                        $scope.ShowPrintCheckList = false;
                        $scope.ShowConfirmCheckList = false; 
                        $scope.ShowBack = true;
                        $scope.PhotoCheckListReportData = data;
                        $scope.ShowLoading = false;
                    }
                    else {
                        alert("Data Not Found");
                        $scope.PhotoCheckListReportData = [];
                        $scope.ShowLoading = false;
                        return;
                    }
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.PageNo = 1;
                $scope.GetCheckListByCollege(AppSettings.CollegeID);
            }
        }; 
        $scope.GetCheckListByCollege = function (CollegeID) {
            if ($scope.CourseID == undefined || $scope.CourseID == "0") {
                alert("Please select Stream.");
                return;
            }
            if ($scope.ExamID == undefined || $scope.ExamID == "0") {
                alert("Please select Exam Year.");
                return;
            }
            if (AppSettings.CollegeID == undefined || AppSettings.CollegeID == "0") {
                $scope.UserTypeFlag = "D";
            }
            else {
                $scope.UserTypeFlag = "C";
            }
            $scope.ShowLoading = true;
            $scope.ShowStudents = false;
            $scope.ShowConfirmCheckList = false; 
            var PhotoCheckListStudData = DrillDownService.GetPhotoCheckListReportByCollege(CollegeID, $scope.ExamID, $scope.CourseID, $scope.UserTypeFlag);
            $scope.CollegeID = CollegeID;
            PhotoCheckListStudData.then(function (data) {
                if (data.length > 0) {
                    $scope.ShowStudents = true;
                    $scope.ShowCollege = false;
                    $scope.ShowPrintCheckList = false;
                    $scope.ShowConfirmCheckList = true;
                    $scope.CurrDate = new Date();
                    $scope.PhotoCheckListStudData = {};
                    $scope.PhotoCheckListStudData = data;
                    if ($scope.StudIndex > -1) {
                        if ($scope.StudData.PhotoPath != undefined && $scope.StudData.PhotoPath != null) {
                            $scope.PhotoCheckListStudData[$scope.StudIndex].PhotoPath = $scope.PhotoCheckListStudData[$scope.StudIndex].PhotoPath + "?" + $scope.CurrDate;
                        }
                        if ($scope.StudData.SignPath != undefined && $scope.StudData.SignPath != null) {
                            $scope.PhotoCheckListStudData[$scope.StudIndex].SignPath = $scope.PhotoCheckListStudData[$scope.StudIndex].SignPath + "?" + $scope.CurrDate;
                        }
                    }
                    if (AppSettings.CollegeID != undefined && AppSettings.CollegeID != "0") {
                    $scope.MainPageNo = 1;
                    $scope.ShowBack = false;
                    }
                    else {
                        $scope.MainPageNo = 3;
                        $scope.ShowBack = true;
                        $scope.EditStudent = true;
                        $scope.ShowPrintCheckList = false;
                        //$scope.ShowConfirmCheckList = false;
                    }
                    var pageSize = 16;
                    var pageCount = data.length / pageSize;
                    $("#pagin").empty();
                    for (var i = 0; i < pageCount; i++) {
                        $("#pagin").append('<li><a>' + (i + 1) + '</a></li> ');
                    }
                    if ($scope.PageNo == undefined || $scope.PageNo == "") {
                        $("#pagin li").eq(0).find("a").addClass("current");
                    }
                    else {
                        $("#pagin li").eq($scope.PageNo - 1).find("a").addClass("current");
                    }
                    showPage = function (page) {
                        $scope.PageNo = page;
                        $(".line-content").hide();
                        $(".line-content").each(function (n) {
                            if (n >= pageSize * (page - 1) && n < pageSize * page)
                                $(this).show();
                        });
                    }
                    $("#pagin li a").click(function () {
                        $("#pagin li a").removeClass("current");
                        $(this).addClass("current");
                        showPage(parseInt($(this).text()))
                    });
                    $scope.ShowLoading = false;
                }
                else {
                    $scope.ShowLoading = false;
                    alert("Data Not Found");
                    $scope.PhotoCheckListStudData = [];
                    $scope.ShowStudents = false;
                    $scope.ShowPrintCheckList = false; 
                    $scope.ShowConfirmCheckList = false; 
                    return;
                }
            }, function (error) {
                alert(error);
            });
        };
        $scope.DoPaging = function () {
            if ($scope.PageNo != undefined && $scope.PageNo != "" && $scope.PageNo != 1) {
                showPage($scope.PageNo);
            }
            else {
                showPage(1);
            }
        };
        $scope.Exit = function () {
            if ($scope.CollegeID == undefined || $scope.CollegeID == "0") {
                $scope.GetCheckListByCollege(AppSettings.CollegeID);
            }
            else {
                $scope.GetCheckListByCollege($scope.CollegeID);
            }
        };
       
        if (AppSettings.CollegeID != undefined && AppSettings.CollegeID != "0") {
            $scope.ShowRadio = true;
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
        var CasteList = EditedByCollegeService.GetCasteList();
        CasteList.then(function (Castedata, status, headers, config, error) {
            $scope.CasteList = Castedata;
            var SubCastList = EditedByCollegeService.GetSubCastListByCasteID(0);
            SubCastList.then(function (SubCastdata, status, headers, config, error) {
                $scope.SubCastList = SubCastdata;
                $scope.SubCasteDisable = true;
            }, function (error) {
                alert(error);
            });
        }, function (error) {
            alert(error);
        });
        $scope.EditStud = function (index) {
            $scope.StudIndex = -1;
            $scope.StudIndex = index;
            $scope.StudData = $scope.PhotoCheckListStudData[index];
            $scope.StudData.Gender = $scope.StudData.Gender.substring(0, 1);
            if ($scope.StudData.SubCastID == "0") {
                $scope.FillSubCaste($scope.StudData.CasteID);
                $scope.StudData.SubCastID = "0";
            }
            if (AppSettings.MngtTypID == 21) {
                $scope.RollDeleteDisable = true;
            }
            if (($scope.StudData.Gender.substring(0, 1) == "O") || ($scope.StudData.Gender.substring(0, 1) == "")) {
                $scope.GenderDisable = false;
            }
            if ($scope.StudData.PhotoPath == null) {
                $scope.StudentPhoto = "../../../contents/img/photoimages.png";
            } else {
                $scope.StudentPhoto = $scope.StudData.PhotoPath;
            }
            if ($scope.StudData.SignPath == null) {
                $scope.StudentSign = "../../../contents/img/photoimages.png";
            } else {
                $scope.StudentSign = $scope.StudData.SignPath;
            }
        };
        $scope.RollEditDisable = false;
        $scope.RollDeleteDisable = false;
        $scope.DeleteEditedByCollege = function () {
            if (AppSettings.MngtTypID == 21) {
                alert("Only Private college student will be deleted");
                return;
            } else {
                $scope.ShowLoading = true;
                $scope.StudData.UpdLoginID = AppSettings.LoggedUserId;
                var getData = EditedByCollegeService.DeleteEditedByCollege($scope.StudData.PreStudRegID, $scope.StudData.UpdLoginID);
                getData.then(function (msg) {
                    alert('Record Deleted');
                    $scope.Reload();
                    $scope.ShowUpdateLoad = false;
                }, function (error) {
                    alert(error);
                    $scope.ShowUpdateLoad = false;
                });
            }
        }
        $scope.Reload = function () {
            $scope.StudData.CasteID = "0";
            $scope.StudData.SubCastID = "0";
            $scope.StudentPhoto = [];
            $scope.Photofile = [];
            $scope.StudentSign = [];
            $scope.Signfile = [];
            $scope.FillSubCaste($scope.StudData.SubCastID);
           if ($scope.CollegeID == undefined || $scope.CollegeID == "0") {
                $scope.GetCheckListByCollege(AppSettings.CollegeID);
            }
            else {
                $scope.GetCheckListByCollege($scope.CollegeID);
            }
            $("#myModal").modal("hide");
            $scope.RollEditDisable = false;
        };
        $scope.SaveEditedByCollege = function () {
            if ($scope.StudData.PhotoPath != undefined && $scope.StudData.PhotoPath != null) {
                $scope.StudData.PhotoPath = $scope.StudData.PhotoPath.replace("?" + $scope.CurrDate, "");
            }
            if ($scope.StudData.SignPath != undefined && $scope.StudData.SignPath != null) {
                $scope.StudData.SignPath = $scope.StudData.SignPath.replace("?" + $scope.CurrDate, "");
            }
            if ($scope.StudData.CasteID == undefined || $scope.StudData.CasteID == "0") {
                alert("Please select Caste.");
                return;
            }
            if ($scope.StudData.SubCastID == undefined || $scope.StudData.SubCastID == "0") {
                alert("Please select Sub-Caste.");
                return;
            }
            $scope.ShowUpdateLoad = true;
            $scope.RollEditDisable = true;
            $scope.StudData.UpdLoginID = AppSettings.LoggedUserId;
            if ($scope.StudData.PreStudRegID == undefined) { $scope.StudData.PreStudRegID = 0; }
            if ($scope.StudData.PreStudRegID != 0) {
                if ((($scope.Photofile[0] != undefined) && ($scope.StudentPhoto != "")) || (($scope.Signfile[0] != undefined) && ($scope.StudentSign != ""))) {
                    if (($scope.Photofile[0] != undefined) && ($scope.StudentPhoto != "") && ($scope.Signfile[0] == undefined)) {
                        var fd = new FormData();
                        fd.append("file", $scope.Photofile[0]);
                        var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegPhoto/?PreStudRegID=" + $scope.StudData.PreStudRegID + "&SSCHallTicket=" + $scope.StudData.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId + "&PicPath=" + $scope.StudData.PhotoPath;
                        $http.post(url, fd, {
                            headers: { 'Content-Type': undefined },
                            transformRequest: angular.identity
                        }).then(function (data) {
                            var getPromise = EditedByCollegeService.PostEditedByCollegeData($scope.StudData);
                            getPromise.then(function (data) {
                                $scope.ShowUpdateLoad = false;
                                alert("Updated Successfully");
                                $scope.Reload();
                            }, function (error) {
                                $scope.RollEditDisable = false;
                                $scope.ShowUpdateLoad = false;
                                alert(error);
                            });
                        })
                            .catch(function (data, status, headers, config) {
                                $scope.ShowUpdateLoad = false;
                                alert(data.data.error);
                                $scope.RollEditDisable = false;
                            });
                    } else {
                        if (($scope.Signfile[0] != undefined) && ($scope.StudentSign != "") && ($scope.Photofile[0] == undefined)) {
                            var fd = new FormData();
                            fd.append("file", $scope.Signfile[0]);
                            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegSign/?PreStudRegID=" + $scope.StudData.PreStudRegID + "&SSCHallTicket=" + $scope.StudData.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId + "&PicPath=" + $scope.StudData.SignPath;
                            $http.post(url, fd, {
                                headers: { 'Content-Type': undefined },
                                transformRequest: angular.identity
                            }).then(function (data) {
                                var getPromise = EditedByCollegeService.PostEditedByCollegeData($scope.StudData);
                                getPromise.then(function (data) {
                                    $scope.ShowUpdateLoad = false;
                                    alert("Updated Successfully");
                                    $scope.Reload();
                                }, function (error) {
                                    $scope.RollEditDisable = false;
                                    $scope.ShowUpdateLoad = false;
                                    alert(error);
                                });
                            })
                                .catch(function (data, status, headers, config) {
                                    $scope.ShowUpdateLoad = false;
                                    alert(data.data.error);
                                    $scope.RollEditDisable = false;
                                });
                        } else {
                            var fd = new FormData();
                            fd.append("file", $scope.Photofile[0]);
                            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegPhoto/?PreStudRegID=" + $scope.StudData.PreStudRegID + "&SSCHallTicket=" + $scope.StudData.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId + "&PicPath=" + $scope.StudData.PhotoPath;
                            $http.post(url, fd, {
                                headers: { 'Content-Type': undefined },
                                transformRequest: angular.identity
                            }).then(function (data) {
                                if (($scope.Signfile[0] != undefined) && ($scope.StudentSign != "")) {
                                    var fd = new FormData();
                                    fd.append("file", $scope.Signfile[0]);
                                    var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegSign/?PreStudRegID=" + $scope.StudData.PreStudRegID + "&SSCHallTicket=" + $scope.StudData.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId + "&PicPath=" + $scope.StudData.SignPath;
                                    $http.post(url, fd, {
                                        headers: { 'Content-Type': undefined },
                                        transformRequest: angular.identity
                                    }).then(function (data) {
                                        var getPromise = EditedByCollegeService.PostEditedByCollegeData($scope.StudData);
                                        getPromise.then(function (data) {
                                            $scope.ShowUpdateLoad = false;
                                            alert("Updated Successfully");
                                            $scope.Reload();
                                        }, function (error) {
                                            $scope.RollEditDisable = false;
                                            $scope.ShowUpdateLoad = false;
                                            alert(error);
                                        });
                                    })
                                        .catch(function (data, status, headers, config) {
                                            $scope.ShowUpdateLoad = false;
                                            alert(data.data.error);
                                            $scope.RollEditDisable = false;
                                        });
                                } else {
                                    $scope.ShowUpdateLoad = false;
                                    alert("Please Select Signature");
                                    $scope.RollEditDisable = false;
                                }
                            })
                                .catch(function (data, status, headers, config) {
                                    $scope.ShowUpdateLoad = false;
                                    alert(data.data.error);
                                    $scope.RollEditDisable = false;
                                });
                        }
                    }
                } else {
                    
                    var getPromise = EditedByCollegeService.PostEditedByCollegeData($scope.StudData);
                    getPromise.then(function (data) {
                        $scope.ShowUpdateLoad = false;
                        alert("Updated Successfully"); 
                        $scope.Reload();
                    }, function (error) {
                        $scope.ShowUpdateLoad = false;
                        $scope.RollEditDisable = false;
                        alert(error);
                    });
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
            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegPhoto/?PreStudRegID=" + $scope.StudData.PreStudRegID + "&SSCHallTicket=" + $scope.StudData.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
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
            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostStudentRegSign/?PreStudRegID=" + $scope.StudData.PreStudRegID + "&SSCHallTicket=" + $scope.StudData.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
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
        $scope.ConfirmStudList = function () {
            if ($scope.ConfirmList.length > 0) {
                $scope.ConfirmData.PreStudRegIDs = "";
                $scope.ConfirmData.StudConfirmFlag = "";
                for (var i = 0; i < $scope.ConfirmList.length; i++) {
                    $scope.ConfirmData.PreStudRegIDs += $scope.ConfirmList[i] + ',';
                }
                $scope.ConfirmData.PreStudRegIDs = $scope.ConfirmData.PreStudRegIDs.replace(/,\s*$/, "");
                if (AppSettings.CollegeID != undefined && AppSettings.CollegeID != "0") {
                    $scope.ConfirmData.StudConfirmFlag = "Y";//N
                }
                else {
                    $scope.ConfirmData.StudConfirmFlag = "Y";
                }
                var getPromise = DrillDownService.PostConfirmStudent($scope.ConfirmData);
                getPromise.then(function (data) {
                    if (data.Message == "S") {
                        alert("Confirmation Successful.");
                        $scope.Exit();
                    }
                    else if (data.Message == "F") {
                        alert("Confirmation Failed.");
                    }
                    else if (data.Message == "E") {
                        alert("Validations Failed.");
                    }
                }, function (error) {
                    alert(error);
                });
            }
            else {
                alert("Please select atleast one student to confirm.");
            }
        };


        $scope.PrintCheckList = function () {
            //var _url = AppSettings.WebApiUrl + 'api/DrillDownAdmission/GetPhotoCheckListReportPDFByCollege?CollegeID=' + $scope.PhotoCheckListStudData[0].CollegeID + '&CourseID=' + $scope.CourseID;
            //$http.get(_url).then(function (response) {
            //    if (response.headers('Content-type') == 'application/pdf') {
            //        var link = document.createElement('a');
            //        link.href = _url;
            //        link.click();
            //    }
            //});

            var PhotoCheckListReportData = DrillDownService.GetPhotoCheckListReportPDFByCollege($scope.PhotoCheckListStudData[0].CollegeID, $scope.ExamID, $scope.CourseID);
            PhotoCheckListReportData.then(function (results) {
                if (results.length > 0) {
                    var file = new Blob([results], { type: 'application/pdf' });
                    var fileURL = URL.createObjectURL(file);
                    var date = new Date();
                    var fileName = "PhotoCheckListReport(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                }
                else {
                    alert("Data Not Found");
                    return;
                }
            }, function (error) {
                alert(error);
            });
        };
    });
});