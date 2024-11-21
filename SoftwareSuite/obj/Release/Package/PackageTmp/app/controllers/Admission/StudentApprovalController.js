define(['app'], function (app) {
    app.controller("StudentApprovalController", function ($http, $scope, $state, $stateParams, AppSettings, StudentRegService) {
        $scope.StudentApproval = { StudRegID: $stateParams.StudRegID };
        var PageNm = $state.current.name.split(".")[1] + "List";

        var MotherTongueList = StudentRegService.GetMotherTongueList();
        MotherTongueList.then(function (MotherTonguedata, status, headers, config, error) {
            $scope.MotherTongueList = MotherTonguedata;
            var OccupationList = StudentRegService.GetOccupationList();
            OccupationList.then(function (Occupationdata, status, headers, config, error) {
                $scope.OccupationList = Occupationdata;
                var CommunityList = StudentRegService.GetCommunityList();
                CommunityList.then(function (Communitydata, status, headers, config, error) {
                    $scope.CommunityList = Communitydata;
                    var CasteList = StudentRegService.GetCasteList();
                    CasteList.then(function (Castedata, status, headers, config, error) {
                        $scope.CasteList = Castedata;
                        var SubCastList = StudentRegService.GetSubCastListByCasteID(0);
                        SubCastList.then(function (SubCastdata, status, headers, config, error) {
                            $scope.SubCastList = SubCastdata;
                            $scope.SubCasteDisable = true;
                            var MediumList = StudentRegService.GetMediumList(AppSettings.CollegeID, AppSettings.AcdYrID);
                            MediumList.then(function (Mediumdata, status, headers, config, error) {
                                $scope.MediumList = Mediumdata;
                                var SecondLangList = StudentRegService.GetSecondLangList(AppSettings.CollegeID, $scope.StudentApproval.StudRegID);
                                SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                                    $scope.SecondLangList = SecondLangdata;
                                    var WithdrawlReasonList = StudentRegService.GetWithdrawlReasonList();
                                    WithdrawlReasonList.then(function (WithdrawlReasondata, status, headers, config, error) {
                                        $scope.WithdrawlReasonList = WithdrawlReasondata;
                                        var IncGrList = StudentRegService.GetIncGrList();
                                        IncGrList.then(function (IncGrListdata, status, headers, config, error) {
                                            $scope.IncGrList = IncGrListdata;
                                            var MandalList = StudentRegService.GetMandalListByDistrict(0);
                                            MandalList.then(function (MandalListdata, status, headers, config, error) {
                                                $scope.MandalList = MandalListdata;
                                                $scope.MandalDisable = true;
                                                var MandalList = StudentRegService.GetMandalListByDistrict(0);
                                                MandalList.then(function (MandalListdata, status, headers, config, error) {
                                                    $scope.MandalListP = MandalListdata;
                                                    $scope.MandalDisableP = true;
                                                    var StateList = StudentRegService.GetStateList();
                                                    StateList.then(function (StateListdata, status, headers, config, error) {
                                                        $scope.StateList = StateListdata;
                                                        var DistrictList = StudentRegService.GetDistrictListByStateID(0);
                                                        DistrictList.then(function (DistrictsListdata, status, headers, config, error) {
                                                            $scope.DistrictList = DistrictsListdata;
                                                            $scope.DistrictListP = DistrictsListdata;
                                                            $scope.DistrictDisable = true;
                                                            $scope.DistrictDisableP = true;
                                                            var ExamList = StudentRegService.GetBasicExamList(0);
                                                            ExamList.then(function (ExamListdata, status, headers, config, error) {
                                                                $scope.ExamList = ExamListdata;
                                                                var MainGroupList = StudentRegService.GetMainGroupListForStudAdmission(AppSettings.CollegeID, $scope.StudentApproval.StudRegID);
                                                                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                                                                    $scope.MainGroupList = MainGroupListdata;
                                                                    var PhysDisbList = StudentRegService.GetPhysDisbList();
                                                                    PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
                                                                        $scope.PhysDisbList = PhysDisbListdata;
                                                                        var SpclConsList = StudentRegService.GetSpclConsList();
                                                                        SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                                                                            $scope.SpclConsList = SpclConsListdata;
                                                                            if ($scope.StudentApproval.StudRegID != 0) {
                                                                                var StudentRegdata = StudentRegService.GetStudentRegById($scope.StudentApproval.StudRegID);
                                                                                StudentRegdata.then(function (data) {
                                                                                    $scope.StudentApproval = data[0];
                                                                                    $("#Nationality").val($scope.StudentApproval.Nationality);
                                                                                    $("#BirthDate").ejDatePicker({ value: $scope.StudentApproval.BirthDate });
                                                                                    $("#AdmDate").ejDatePicker({ value: $scope.StudentApproval.AdmDate });
                                                                                    $("#Dateofwithdrawal").ejDatePicker({ value: $scope.StudentApproval.Dateofwithdrawal });
                                                                                }, function (error) {
                                                                                    alert(error);
                                                                                });
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
                                                            }, function (error) {
                                                                alert(error);
                                                            });
                                                        }, function (error) {
                                                            alert(error);
                                                        });
                                                    }, function (error) {
                                                        alert(error);
                                                    });
                                                }, function (error) {
                                                    alert(error);
                                                });
                                            }, function (error) {
                                                alert(error);
                                            });
                                        }, function (error) {
                                            alert(error);
                                        });
                                    }, function (error) {
                                        alert(error);
                                    });
                                }, function (error) {
                                    alert(error);
                                });
                            }, function (error) {
                                alert(error);
                            });
                        }, function (error) {
                            alert(error);
                        });
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }, function (error) {
            alert(error);
        });
        $scope.CloseStudentApproval = function () {
            $state.go('Admission.StudentApprovalList');
        }
        $scope.openCalendarBirthDate = function () {
            $scope.StudentReg.BirthDateIsOpen = true;
        }
        $scope.FirsttabPanActiveClass = "tab-pane active";
        $scope.SecondtabPanActiveClass = "tab-pane";
        $scope.ThirdtabPanActiveClass = "tab-pane";
        $scope.FourthtabPanActiveClass = "tab-pane";
        function CheckValidation() {
            return true;
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission.StudentApprovalList');
        }
        //var DeletePhoto = false;
        //var DeleteSign = false;
        //$scope.SelectPhotoUploadFile = function () {
        //    $('#PhotoUpload').trigger('click');
        //    DeletePhoto = false;
        //}
        //$scope.PhotoUpload = function (element) {
        //    var reader = new FileReader();
        //    reader.onload = $scope.PhotoIsLoaded;
        //    var extn = element.files[0].type.split("/").pop();
        //    if ((extn == "jpeg") || (extn == "png") || (extn == "gif") || (extn == "jpg") || (extn == "bmp")) {
        //        reader.readAsDataURL(element.files[0]);
        //        $scope.Photofile = [];
        //        var filesize = element.files[0].size;  // in bytes
        //        if (filesize <= 100000) {
        //            $scope.Photofile.push(element.files[0]);
        //        }
        //        else {
        //            alert("Please select photo size below 100 kb");
        //            return;
        //        }
        //    }
        //}
        //$scope.PhotoIsLoaded = function (e) {
        //    $scope.$apply(function () {
        //        $scope.StudentPhoto = [];
        //        $scope.StudentPhoto.push(e.target.result);
        //        $scope.StudentPhoto = e.target.result;
        //    });
        //}
        //$scope.StudentSign = [];
        //$scope.Signfile = [];
        //$scope.SelectSignUploadFile = function () {
        //    $('#SignUpload').trigger('click');
        //    DeleteSign = false;
        //}
        //$scope.SignUpload = function (element) {
        //    var reader = new FileReader();
        //    reader.onload = $scope.SignIsLoaded;
        //    var extn = element.files[0].type.split("/").pop();
        //    if ((extn == "jpeg") || (extn == "png") || (extn == "gif") || (extn == "jpg") || (extn == "bmp")) {
        //        reader.readAsDataURL(element.files[0]);
        //        $scope.Signfile = [];
        //        var filesize = element.files[0].size;  // in bytes
        //        if (filesize <= 100000) {
        //            $scope.Signfile.push(element.files[0]);
        //        }
        //        else {
        //            alert("Please select photo size below 100 kb");
        //            return;
        //        }
        //    }
        //}
        //$scope.SignIsLoaded = function (e) {
        //    $scope.$apply(function () {
        //        $scope.StudentSign = [];
        //        $scope.StudentSign.push(e.target.result);
        //        $scope.StudentSign = e.target.result;
        //    });
        //}
        //$scope.PhotoRollDisable = false;
        //$scope.SaveStudentPhotoSign = function (element) {
        //    $scope.StudentReg.Signfile = $scope.Signfile;
        //    $scope.StudentReg.Photofile = $scope.Photofile;
        //    var PhotoSignList = StudentRegService.PostStudentRegPhoto($scope.StudentReg);
        //    PhotoSignList.then(function (PhotoSignList, status, headers, config, error) {
        //    }, function (PhotoSignList, status, headers, config) {
        //        alert(error);
        //    });
        //}
        //$scope.uploadPhoto = function (files) {
        //    var fd = new FormData();
        //    fd.append("file", files[0]);
        //    var url = AppSettings.WebApiUrl + "api/StudentReg/PostStudentRegPhoto/?StudRegID=" + $scope.StudentReg.StudRegID + "&SSCHallTicket=" + $scope.StudentReg.SSCHallTicket + "&UpdLoginID=" + AppSettings.UpUserId;
        //    $http.post(url, fd, {
        //        headers: { 'Content-Type': undefined },
        //        transformRequest: angular.identity
        //    }).then(function (data) {
        //        alert("Upload Photo Successfully");
        //    })
        //        .catch(function (data, status, headers, config) {
        //            alert(data);
        //            $scope.file = "";
        //        });
        //};
        //$scope.uploadSign = function (files) {
        //    var fd = new FormData();
        //    fd.append("file", files[0]);
        //    var url = AppSettings.WebApiUrl + "api/StudentReg/PostStudentRegSign/?StudRegID=" + $scope.StudentReg.StudRegID + "&SSCHallTicket=" + $scope.StudentReg.SSCHallTicket + "&UpdLoginID=" + AppSettings.UpUserId;
        //    $http.post(url, fd, {
        //        headers: { 'Content-Type': undefined },
        //        transformRequest: angular.identity
        //    }).then(function (data) {
        //        alert("Upload Photo Successfully");
        //    })
        //        .catch(function (data, status, headers, config) {
        //            alert(data);
        //            $scope.file = "";
        //        });
        //};
    });
});

