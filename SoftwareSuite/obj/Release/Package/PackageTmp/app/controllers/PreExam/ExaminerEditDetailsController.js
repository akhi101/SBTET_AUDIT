define(['app'], function (app) {
    app.controller("ExaminerEditDetailsController", function ($scope, $http, $filter, $state, $localStorage, $stateParams, AppSettings, ExaminerDetailsEditService) {
        var authData = $localStorage.authorizationData;
        $scope.AcademicYearList = {};
        $scope.LoadImg = false;
        $scope.PreSerDate = moment().format('D MMM, YYYY');
       
        AppSettings.SysUserID = authData.SysUserID;
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
        $scope.AcdYrID = AppSettings.AcdYrID;
        var AcademicYearList = ExaminerDetailsEditService.GetAcademicYear();
        AcademicYearList.then(function (data) {
            $scope.AcademicYearList = data;
            $scope.GetCollegeData();
        }, function (error) {
            alert(error);
        });

        $scope.GetCollegeData = function () {
            $scope.LoadImg = true;
            var CollegeData = ExaminerDetailsEditService.GetCollegeData($scope.AcdYrID, AppSettings.DistrictIDs, AppSettings.SysUserID);
            CollegeData.then(function (data) {
                if (data.length > 0) {
                    $scope.ShowDIEODetail = true;
                    $scope.LoadImg = false;
                    $scope.CollegeData = data;
                }
                else {
                    alert("No College(s) Data Found.");
                    $scope.ShowDIEODetail = false;
                    $scope.LoadImg = false;
                }
            }, function (error) {
                alert(error);
            });
        };
        $scope.GetExaminerDetailsByColCode = function (obj) {
            $scope.Examinerdata = [];
            var ShowExaminerList = ExaminerDetailsEditService.GetExaminerDetailsByColCode(obj.ColCode);
            ShowExaminerList.then(function (data) {
                if (data.length > 0) {
                    $scope.ShowExaminerList = data;
                }
            }, function (error) {
                alert(error);
                $scope.ShowExaminerList = [];
            });
        }

        $("#Prdate").ejDatePicker({ maxDate: $scope.PreSerDate, allowEdit: true, dateFormat: "dd/MM/yyyy" });
        $("#Prdate1").ejDatePicker({ maxDate: $scope.PreSerDate, allowEdit: true, dateFormat: "dd/MM/yyyy" });

        var MediumList = ExaminerDetailsEditService.GetMediumList();
        MediumList.then(function (Mediumdata, status, headers, config, error) {
            $scope.MediumList = Mediumdata;
        }, function (error) {
            alert(error);
            });

        var EmpTypeList = ExaminerDetailsEditService.GetEmpTypeList();
        EmpTypeList.then(function (Empdata, status, headers, config, error) {
            $scope.EmpTypeList = Empdata;
        }, function (error) {
            alert(error);
        });

        var SubjectList = ExaminerDetailsEditService.GetBasicSubjectList();
        SubjectList.then(function (Subjectdata, status, headers, config, error) {
            $scope.SubjectList = Subjectdata;
        }, function (error) {
            alert(error);
        });

        $scope.GetExaminerDetailsByID = function (obj) {
            $scope.ExaminerdataByID = [];
            var ExaminerListData = ExaminerDetailsEditService.GetExaminerDetailsByID(obj.ExaminerID);
            ExaminerListData.then(function (data) {
                if (data.length > 0) {
                    $scope.ExaminerListData = data[0];
                    $scope.ExaminerListData.AStaffType = "0";
                    $scope.ExaminerListData.AEmpType = "0";
                    $scope.ExaminerListData.ASubName = "0";
                    $scope.ExaminerListData.AMediumName = "0";
                    $scope.ExaminerListData.AGender = "0";
                }
            }, function (error) {
                alert(error);
                $scope.ExaminerListData = [];
            });
        }


        $scope.UpdateExaminerData = function () {
            $scope.ExaminerListData.ADOB = $("#Prdate").val();
            $scope.ExaminerListData.ADOA = $("#Prdate1").val();
            if (CheckValidation() == true) {
                if (($scope.Photofile != undefined) && ($scope.Photofile.length > 0) && ($scope.StaffPhoto != "") && ($scope.StaffPhoto != null) && ($scope.Signfile != undefined) && ($scope.Signfile.length > 0) && ($scope.StaffSign != "") && ($scope.StaffSign != null)) {
                    var fd = new FormData();
                    fd.append("file", $scope.Photofile[0]);
                    var url = AppSettings.WebApiUrl + "api/ExaminerDetail/PostUploadDoc/?ExaminerID=" + $scope.ExaminerListData.ExaminerID + "&ColCode=" + $scope.ExaminerListData.ColCode + "&DocType=P";
                    $http.post(url, fd, {
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    }).then(function (data) {
                        $scope.ExaminerListData.APhotoPath = data.data;
                        var getPromise = ExaminerDetailsEditService.UpdateExaminerData($scope.ExaminerListData);
                        getPromise.then(function (data) {
                            var fd = new FormData();
                            fd.append("file", $scope.Signfile[0]);
                            var url = AppSettings.WebApiUrl + "api/ExaminerDetail/PostUploadDoc/?ExaminerID=" + $scope.ExaminerListData.ExaminerID + "&ColCode=" + $scope.ExaminerListData.ColCode + "&DocType=S";
                            $http.post(url, fd, {
                                headers: { 'Content-Type': undefined },
                                transformRequest: angular.identity
                            }).then(function (data) {
                                $scope.ExaminerListData.ASignPath = data.data;
                                var getPromise = ExaminerDetailsEditService.UpdateExaminerData($scope.ExaminerListData);
                                getPromise.then(function (data) {
                                    $scope.ShowLoading = false;
                                    alert("Submitted Successfully");
                                    location.reload();
                                }, function (error) {
                                    $scope.ShowLoading = false;
                                    alert(error);
                                });
                            })
                                .catch(function (data, status, headers, config) {
                                    $scope.ShowLoading = false;
                                    alert(data.data.error);
                                });
                        }, function (error) {
                            $scope.ShowLoading = false;
                            alert(error);
                        });
                    })
                        .catch(function (data, status, headers, config) {
                            $scope.ShowLoading = false;
                            alert(data.data.error);
                        });
                }
                else if (($scope.Photofile != undefined) && ($scope.Photofile.length > 0) && ($scope.StaffPhoto != "") && ($scope.StaffPhoto != null)) {
                    var fd = new FormData();
                    fd.append("file", $scope.Photofile[0]);
                    var url = AppSettings.WebApiUrl + "api/ExaminerDetail/PostUploadDoc/?ExaminerID=" + $scope.ExaminerListData.ExaminerID + "&ColCode=" + $scope.ExaminerListData.ColCode + "&DocType=P";
                    $http.post(url, fd, {
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    }).then(function (data) {
                        $scope.ExaminerListData.APhotoPath = data.data;
                        var getPromise = ExaminerDetailsEditService.UpdateExaminerData($scope.ExaminerListData);
                        getPromise.then(function (data) {
                            alert('Submitted Successfully!!');
                            location.reload();
                        }, function (error) {
                            $scope.UploadFiles = true;
                            alert(error);
                        });
                    })
                        .catch(function (data, status, headers, config) {
                            //$scope.ShowLoading = false;
                            //$scope.UpdateDisable = false;
                            alert(data.data.error);
                        });
                }
                else if (($scope.Signfile != undefined) && ($scope.Signfile.length > 0) && ($scope.StaffSign != "") && ($scope.StaffSign != null)) {
                    var fd = new FormData();
                    fd.append("file", $scope.Signfile[0]);
                    var url = AppSettings.WebApiUrl + "api/ExaminerDetail/PostUploadDoc/?ExaminerID=" + $scope.ExaminerListData.ExaminerID + "&ColCode=" + $scope.ExaminerListData.ColCode + "&DocType=S";
                    $http.post(url, fd, {
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    }).then(function (data) {
                        $scope.ExaminerListData.ASignPath = data.data;
                        var getPromise = ExaminerDetailsEditService.UpdateExaminerData($scope.ExaminerListData);
                        getPromise.then(function (data) {
                            alert('Submitted Successfully!!');
                            location.reload();
                        }, function (error) {
                            $scope.UploadFiles = true;
                            alert(error);
                        });
                    })
                        .catch(function (data, status, headers, config) {
                            //$scope.ShowLoading = false;
                            //$scope.UpdateDisable = false;
                            alert(data.data.error);
                        });
                }
                else if ((($scope.ExaminerListData.PhotoPathFlag == false) || ($scope.ExaminerListData.PhotoPathFlag == null) || ($scope.ExaminerListData.APhotoPath != null)) && (($scope.ExaminerListData.SignPathFlag == false) || ($scope.ExaminerListData.SignPathFlag == null) || ($scope.ExaminerListData.ASignPath != null))) {
                    var getPromise = ExaminerDetailsEditService.UpdateExaminerData($scope.ExaminerListData);
                    getPromise.then(function (data) {
                        alert('Submitted Successfully!!');
                        location.reload();
                    }, function (error) {
                        $scope.UploadFiles = true;
                        alert(error);
                    });
                }
                else {
                    alert('Please Select Photo/Sign to Upload');

                }
            }
            else {

            }
        }


        function RedirectToListPage() {
            location.reload();
        }

        //Photo Upload
        $scope.PhotoIsLoaded = function (e) {
            $scope.$apply(function () {
                $scope.StaffPhoto = e.target.result;
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
                        $("#StaffPhoto").attr("src", "");
                        return;
                    }
                } else {
                    alert("Photo format is not valid.");
                    $scope.Photofile = [];
                    $("#PhotoUpload").val(null);
                    $("#StaffPhoto").attr("src", "");
                    return;
                }
            } else {
                alert("Please Select Photo.");
                $scope.Photofile = [];
                $("#PhotoUpload").val(null);
                $("#StaffPhoto").attr("src", "");
                return;
            }
        }

        $scope.SignIsLoaded = function (e) {
            $scope.$apply(function () {
                $scope.StaffSign = e.target.result;
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
                        $("#StaffSign").attr("src", "");
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

        
        
        function CheckValidation() {
            if ($scope.ExaminerListData.ExaminerNameFlag == true) {
                if (($scope.ExaminerListData.AExaminerName == undefined) || ($scope.ExaminerListData.AExaminerName == "")) {
                    alert("Enter Update Examiner Name");
                    return false;
                }
                if ($scope.ExaminerListData.AExaminerName == $scope.ExaminerListData.ExaminerName) {
                    alert("Examiner Name Should not be Same");
                    return false;
                }
            }
            if ($scope.ExaminerListData.SurNameFlag == true) {
                if (($scope.ExaminerListData.ASurName == undefined) || ($scope.ExaminerListData.ASurName == "")) {
                    alert("Enter Update SurName ");
                    return false;
                }
                if ($scope.ExaminerListData.ASurName == $scope.ExaminerListData.SurName) {
                    alert("SurName Should not be Same");
                    return false;
                }
            }
            if ($scope.ExaminerListData.QualificationsFlag == true) {
                if (($scope.ExaminerListData.AQualification == undefined) || ($scope.ExaminerListData.AQualification == "")) {
                    alert("Enter Update Qualification ");
                    return false;
                }
                if ($scope.ExaminerListData.AQualification == $scope.ExaminerListData.Qualification) {
                    alert("Qualification Should not be Same");
                    return false;
                }
            }
            if ($scope.ExaminerListData.DesignationFlag == true) {
                if (($scope.ExaminerListData.ADesignation == undefined) || ($scope.ExaminerListData.ADesignation == "")) {
                    alert("Enter Update Designation");
                    return false;
                }
                if ($scope.ExaminerListData.ADesignation == $scope.ExaminerListData.Designation) {
                    alert("Designation Should not be Same");
                    return false;
                }
            }
            if ($scope.ExaminerListData.MobileNumberFlag == true) {
                if (($scope.ExaminerListData.AMobileNumber == undefined) || ($scope.ExaminerListData.AMobileNumber == "")) {
                    alert("Enter Update MobileNumber ");
                    return false;
                }
                if ($scope.ExaminerListData.AMobileNumber == $scope.ExaminerListData.MobileNumber) {
                    alert("MobileNumber Should not be Same");
                    return false;
                }
            }
            if ($scope.ExaminerListData.AadharNoFlag == true) {
                if (($scope.ExaminerListData.AAadharNo == undefined) || ($scope.ExaminerListData.AAadharNo == "")) {
                    alert("Enter Update AadharNo ");
                    return false;
                }
                if ($scope.ExaminerListData.AAadharNo == $scope.ExaminerListData.AadharNo) {
                    alert("AadharNo Should not be Same");
                    return false;
                }
            }
            //
            if ($scope.ExaminerListData.ColCodeFlag == true) {
                if (($scope.ExaminerListData.AColCode == undefined) || ($scope.ExaminerListData.AColCode == "")) {
                    alert("Enter Update College Code ");
                    return false;
                }
                if ($scope.ExaminerListData.AColCode == $scope.ExaminerListData.ColCode) {
                    alert("College Code Should not be Same");
                    return false;
                }
            }
            if ($scope.ExaminerListData.DOBFlag == true) {
                if (($scope.ExaminerListData.ADOB == undefined) || ($scope.ExaminerListData.ADOB == "")) {
                    alert("Select Update Date Of Birth ");
                    return false;
                }
                if ($scope.ExaminerListData.ADOB == $scope.ExaminerListData.DOB) {
                    alert("Date Of Birth Should not be Same");
                    return false;
                }
            }
            if ($scope.ExaminerListData.DOAFlag == true) {
                if (($scope.ExaminerListData.ADOA == undefined) || ($scope.ExaminerListData.ADOA == "")) {
                    alert("Select Update Appointment Date ");
                    return false;
                }
                if ($scope.ExaminerListData.ADOA == $scope.ExaminerListData.DOA) {
                    alert("Appointment Date Should not be Same");
                    return false;
                }
            }
            //
            if ($scope.ExaminerListData.StaffTypeFlag == true) {
                if (($scope.ExaminerListData.AStaffType == undefined) || ($scope.ExaminerListData.AStaffType == "0")) {
                    alert("Select Update StaffType ");
                    return false;
                }
                if ($scope.ExaminerListData.AStaffType == $scope.ExaminerListData.StaffType) {
                    alert("StaffType Should not be Same");
                    return false;
                }
            }
            if ($scope.ExaminerListData.EmpTypeFlag == true) {
                if (($scope.ExaminerListData.AEmpType == undefined) || ($scope.ExaminerListData.AEmpType == "0")) {
                    alert("Select Update Employee Type  ");
                    return false;
                }
                if ($scope.ExaminerListData.AEmpType == $scope.ExaminerListData.EmpType) {
                    alert("Employee Type Should not be Same");
                    return false;
                }
            }
            if ($scope.ExaminerListData.SubjectFlag == true) {
                if (($scope.ExaminerListData.ASubName == undefined) || ($scope.ExaminerListData.ASubName == "0")) {
                    alert("Select Update Subject ");
                    return false;
                }
                if ($scope.ExaminerListData.ASubName == $scope.ExaminerListData.SubjectID) {
                    alert("Subject Should not be Same");
                    return false;
                }
            }
            ////
            if ($scope.ExaminerListData.MediumFlag == true) {
                if (($scope.ExaminerListData.AMediumName == undefined) || ($scope.ExaminerListData.AMediumName == "0")) {
                    alert("Select Update Medium  ");
                    return false;
                }
                if ($scope.ExaminerListData.AMediumName == $scope.ExaminerListData.Medium) {
                    alert("Medium Should not be Same");
                    return false;
                }
            }
            if ($scope.ExaminerListData.ExpFlag == true) {
                if (($scope.ExaminerListData.AExperience == undefined) || ($scope.ExaminerListData.AExperience == "")) {
                    alert("Enter Update Experience ");
                    return false;
                }
                if ($scope.ExaminerListData.AExperience == $scope.ExaminerListData.Experience) {
                    alert("Experience Should not be Same");
                    return false;
                }
            }
            if ($scope.ExaminerListData.GenderFlag == true) {
                if (($scope.ExaminerListData.AGender == undefined) || ($scope.ExaminerListData.AGender == "0")) {
                    alert("Select Update Gender  ");
                    return false;
                }
                if ($scope.ExaminerListData.AGender == $scope.ExaminerListData.Gender) {
                    alert("Gender Should not be Same");
                    return false;
                }
            }
            if ((($scope.ExaminerListData.AAadharNo == undefined) || ($scope.ExaminerListData.AAadharNo == null)) && (($scope.ExaminerListData.AMobileNumber == undefined) || ($scope.ExaminerListData.AMobileNumber == null)) && (($scope.ExaminerListData.ADesignation == undefined) || ($scope.ExaminerListData.ADesignation == null))
                && (($scope.ExaminerListData.AExaminerName == undefined) || ($scope.ExaminerListData.AExaminerName == null)) && (($scope.ExaminerListData.ASurName == undefined) || ($scope.ExaminerListData.ASurName == null)) && (($scope.ExaminerListData.AQualification == undefined) || ($scope.ExaminerListData.AQualification == null))
                && (($scope.ExaminerListData.AStaffType == undefined) || ($scope.ExaminerListData.AStaffType == "0")) && (($scope.ExaminerListData.AColCode == undefined) || ($scope.ExaminerListData.AColCode == null)) && (($scope.ExaminerListData.AEmpType == undefined) || ($scope.ExaminerListData.AEmpType == "0"))
                && (($scope.ExaminerListData.ASubName == undefined) || ($scope.ExaminerListData.ASubName == "0")) && (($scope.ExaminerListData.AMediumName == undefined) || ($scope.ExaminerListData.AMediumName == "0")) && (($scope.ExaminerListData.AExperience == undefined) || ($scope.ExaminerListData.AExperience == null))
                && (($scope.ExaminerListData.ADOA == undefined) || ($scope.ExaminerListData.ADOA == '')) && (($scope.ExaminerListData.ADOB == undefined) || ($scope.ExaminerListData.ADOB == '')) && (($scope.ExaminerListData.AGender == undefined) || ($scope.ExaminerListData.AGender == "0"))) {
                //&& (($scope.ExaminerListData.APhotoPath == undefined) || ($scope.ExaminerListData.APhotoPath == null))
                //&& (($scope.ExaminerListData.ASignPath == undefined) || ($scope.ExaminerListData.ASignPath == null)) 
               // if ((($scope.ExaminerListData.AAadharNo == undefined) || ($scope.ExaminerListData.AAadharNo == null)) && (($scope.ExaminerListData.AMobileNumber == undefined) || ($scope.ExaminerListData.AMobileNumber == null))){
                if ((($scope.ExaminerListData.PhotoPathFlag == false) || ($scope.ExaminerListData.PhotoPathFlag == null)) && (($scope.ExaminerListData.SignPathFlag == false) || ($scope.ExaminerListData.SignPathFlag == null))) {
                    alert("Select Atleast One Update To Change");
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return true;
            }

            return true;
        }
    });
});