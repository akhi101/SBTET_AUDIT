define(['app'], function (app) {
    app.controller("PreStudentRegController", function ($filter, $http, $scope, $state, $stateParams, AppSettings, PreStudentRegService) {
        $scope.PreStudentReg = { PreStudRegID: $stateParams.PreStudRegID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreStudentRegRightsdata = [];
        PreStudentRegRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreStudentRegRightsdata.length; i++) {
            if (PreStudentRegRightsdata[i].GridFormToOpen == PageNm) {
                if (PreStudentRegRightsdata[i].isupdatable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        $scope.PreDisable = true;
        $scope.RollEditDisable = true;
        $scope.FillSubCaste = function (CasteID) {
            $scope.SubCasteDisable = false;
            var SubCastList = PreStudentRegService.GetSubCastListByCasteID(CasteID);
            SubCastList.then(function (SubCastdata, status, headers, config, error) {
                $scope.SubCastList = SubCastdata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillDistrict = function (StateID) {
            $scope.DistrictDisable = false;
            var DistrictList = PreStudentRegService.GetDistrictListByStateID(StateID);
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillDistrictP = function (StateIDP) {
            $scope.DistrictDisableP = false;
            var DistrictList = PreStudentRegService.GetDistrictListByStateID(StateIDP);
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictListP = Districtdata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillMandal = function (DistrictID) {
            if ((DistrictID > 0) || (DistrictID != undefined)) {
                $scope.MandalDisable = false;
                var MandalList = PreStudentRegService.GetMandalListByDistrict(DistrictID);
                MandalList.then(function (MandalListdata, status, headers, config, error) {
                    $scope.MandalList = MandalListdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillMandalP = function (DistrictIDP) {
            if ((DistrictIDP > 0) || (DistrictIDP != undefined)) {
                $scope.MandalDisableP = false;
                var MandalList = PreStudentRegService.GetMandalListByDistrict(DistrictIDP);
                MandalList.then(function (MandalListdata, status, headers, config, error) {
                    $scope.MandalListP = MandalListdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $("#BirthDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#BirthDate").ejDatePicker("disable");
        $("#AdmDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#AdmDate").ejDatePicker("disable");
        $("#Dateofwithdrawal").ejDatePicker({ allowEdit: true, dateFormat: "dd/MMM/yyyy" });
        var MotherTongueList = PreStudentRegService.GetMotherTongueList();
        MotherTongueList.then(function (MotherTonguedata, status, headers, config, error) {
            $scope.MotherTongueList = MotherTonguedata;
            var OccupationList = PreStudentRegService.GetOccupationList();
            OccupationList.then(function (Occupationdata, status, headers, config, error) {
                $scope.OccupationList = Occupationdata;
                var CommunityList = PreStudentRegService.GetCommunityList();
                CommunityList.then(function (Communitydata, status, headers, config, error) {
                    $scope.CommunityList = Communitydata;
                    var CasteList = PreStudentRegService.GetCasteList();
                    CasteList.then(function (CasteList, status, headers, config, error) {
                        $scope.CasteList = CasteList;
                        var SubCastList = PreStudentRegService.GetSubCastList();
                        SubCastList.then(function (SubCastdata, status, headers, config, error) {
                            $scope.SubCastList = SubCastdata;
                            $scope.SubCasteDisable = true;
                            var MediumList = PreStudentRegService.GetMediumList(AppSettings.CollegeID, AppSettings.AcdYrID);
                            MediumList.then(function (Mediumdata, status, headers, config, error) {
                                $scope.MediumList = Mediumdata;
                                var SecondLangList = PreStudentRegService.GetSecondLangList(AppSettings.CollegeID, $scope.PreStudentReg.PreStudRegID);
                                SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                                    $scope.SecondLangList = SecondLangdata;
                                    var WithdrawlReasonList = PreStudentRegService.GetWithdrawlReasonList();
                                    WithdrawlReasonList.then(function (WithdrawlReasondata, status, headers, config, error) {
                                        $scope.WithdrawlReasonList = WithdrawlReasondata;
                                        var IncGrList = PreStudentRegService.GetIncGrList();
                                        IncGrList.then(function (IncGrListdata, status, headers, config, error) {
                                            $scope.IncGrList = IncGrListdata;
                                            var MandalList = PreStudentRegService.GetMandalListByDistrict(0);
                                            MandalList.then(function (MandalListdata, status, headers, config, error) {
                                                $scope.MandalList = MandalListdata;
                                                $scope.MandalDisable = true;
                                                var MandalList = PreStudentRegService.GetMandalListByDistrict(0);
                                                MandalList.then(function (MandalListdata, status, headers, config, error) {
                                                    $scope.MandalListP = MandalListdata;
                                                    $scope.MandalDisableP = true;
                                                    var StateList = PreStudentRegService.GetStateList();
                                                    StateList.then(function (StateListdata, status, headers, config, error) {
                                                        $scope.StateList = StateListdata;
                                                        var DistrictList = PreStudentRegService.GetDistrictsList();
                                                        DistrictList.then(function (DistrictsListdata, status, headers, config, error) {
                                                            $scope.DistrictList = DistrictsListdata;
                                                            $scope.DistrictListP = DistrictsListdata;
                                                            var ExamList = PreStudentRegService.GetExamList();
                                                            ExamList.then(function (ExamListdata, status, headers, config, error) {
                                                                $scope.ExamList = ExamListdata;
                                                                var MainGroupList = PreStudentRegService.GetMainGroupListForStudAdmission(AppSettings.CollegeID, $scope.PreStudentReg.PreStudRegID);
                                                                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                                                                    $scope.MainGroupList = MainGroupListdata;
                                                                    var PhysDisbList = PreStudentRegService.GetPhysDisbList();
                                                                    PhysDisbList.then(function (PhysDisbListdata, status, headers, config, error) {
                                                                        $scope.PhysDisbList = PhysDisbListdata;
                                                                        var SpclConsList = PreStudentRegService.GetSpclConsList();
                                                                        SpclConsList.then(function (SpclConsListdata, status, headers, config, error) {
                                                                            $scope.SpclConsList = SpclConsListdata;
                                                                            if ($scope.PreStudentReg.PreStudRegID != 0) {
                                                                                var PreStudentRegdata = PreStudentRegService.GetPreStudentRegById($scope.PreStudentReg.PreStudRegID);
                                                                                PreStudentRegdata.then(function (data) {
                                                                                    $scope.PreStudentReg = data[0];
                                                                                    $("#Nationality").val($scope.PreStudentReg.Nationality);
                                                                                    $("#BirthDate").ejDatePicker({ value: $scope.PreStudentReg.BirthDate });
                                                                                    $("#AdmDate").ejDatePicker({ value: $scope.PreStudentReg.AdmDate });
                                                                                    $("#Dateofwithdrawal").ejDatePicker({ value: $scope.PreStudentReg.Dateofwithdrawal });
                                                                                    $scope.PreStudentReg.MobileNo = $scope.PreStudentReg.MobileNo.replace(/^\s+|\s+$/g, '');
                                                                                    $scope.PreStudentReg.AadharNo = $scope.PreStudentReg.AadharNo.replace(/^\s+|\s+$/g, ''); 
                                                                                    //$scope.PreStudentReg.ExmFeesFlag = 'N';
                                                                                    //$scope.PreStudentReg.RecgFeesFlag = 'N';
                                                                                    //$scope.PreStudentReg.ScholarshipFlag = 'N';
                                                                                    //$scope.PreStudentReg.Handicaped = 'N';
                                                                                    //$scope.PreStudentReg.AdmCategory = 'Y';
                                                                                    //$scope.PreStudentReg.Classwithdrawal = 'Y';
                                                                                    if ($scope.PreStudentReg.SubCasteID == undefined) { $scope.SubCasteDisable = true; }
                                                                                    if ($scope.PreStudentReg.DistrictID == undefined) { $scope.DistrictDisable = true; }
                                                                                    if ($scope.PreStudentReg.DistrictIDP == undefined) { $scope.DistrictDisableP = true; }
                                                                                    if (($scope.PreStudentReg.Guardianname != "") && ($scope.PreStudentReg.Guardianname != undefined)) {
                                                                                        $scope.RelGaridanShow = true;
                                                                                    } else {
                                                                                        $scope.RelGaridanShow = false;
                                                                                    }
                                                                                    $scope.ExamDisable = true;
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
        $scope.SavePreStudentReg = function () {
            $scope.RollEditDisable = true;
            if ($scope.PreStudentReg.Handicaped == 'N') { $scope.PreStudentReg.PhysDisbID = 0; $scope.PreStudentReg.SpclConsID = 0; }
            if ($scope.PreStudentReg.PreStudRegID == undefined) { $scope.PreStudentReg.PreStudRegID = 0; }
            if ($("#Dateofwithdrawal").val() != "") { $scope.PreStudentReg.Dateofwithdrawal = $("#Dateofwithdrawal").val(); }
            if ($("#BirthDate").val() != "") { $scope.PreStudentReg.BirthDate = $("#BirthDate").val(); }
            if ($("#AdmDate").val() != "") { $scope.PreStudentReg.AdmDate = $("#AdmDate").val(); }
            if (CheckValidation() == true) {
                $scope.PreStudentReg.PreStudentRegShortName = "";
                if ($scope.PreStudentReg.PreStudRegID != 0) {
                    $scope.PreStudentReg.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = PreStudentRegService.UpdatePreStudentReg($scope.PreStudentReg);
                    getPromise.then(function (msg) {
                        $scope.RollEditDisable = true;
                        alert("Student profile updated successfully");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.RollEditDisable = false;
                        alert(error);
                    });
                }
            } else {
                $scope.RollEditDisable = false;
            }
        }
        $scope.DeletePreStudentReg = function () {
            var getData = PreStudentRegService.DeletePreStudentReg($scope.PreStudentReg.PreStudRegID);
            getData.then(function (CheckDepandancyMsg) {
                if (CheckDepandancyMsg == "") {
                    var getData = PreStudentRegService.DeletePreStudentReg($scope.PreStudentReg.PreStudRegID);
                    getData.then(function (msg) {
                        alert('Record Deleted');
                        RedirectToListPage();
                    }, function (error) {
                        alert(error);
                    });
                }
                else {
                    alert(CheckDepandancyMsg);
                    RedirectToListPage();
                }
            }, function (error) {
                alert(error);
            });
        }
        function FirstTabValidation() {
            if (($scope.PreStudentReg.AadharNo != "") && ($scope.PreStudentReg.AadharNo != undefined)) {
                if (($scope.PreStudentReg.AadharNo.length < 12) || ($scope.PreStudentReg.AadharNo.length > 12)) {
                    alert("Invalid Aadhaar No.");
                    return false;
                }
            }
            if (($scope.PreStudentReg.MobileNo == "") || ($scope.PreStudentReg.MobileNo == undefined)) {
                if (($scope.PreStudentReg.ParentCellno == undefined) || ($scope.PreStudentReg.ParentCellno == "")) {
                    alert("Enter Parent Mobile no. Or Student Mobile no.");
                    return false;
                }
            }
            if (($scope.PreStudentReg.MobileNo != "") && ($scope.PreStudentReg.MobileNo != undefined)) {
                if (($scope.PreStudentReg.MobileNo.length < 10) || ($scope.PreStudentReg.MobileNo.length > 10)) {
                    alert("Invalid Mobile no.");
                    return false;
                }
            }
            if (($scope.PreStudentReg.ParentCellno != "") && ($scope.PreStudentReg.ParentCellno != undefined)) {
                if (($scope.PreStudentReg.ParentCellno.length < 10) || ($scope.PreStudentReg.ParentCellno.length > 10)) {
                    alert("Invalid Parent Mobile no.");
                    return false;
                }
            }
            if ($scope.PreStudentReg.EmailId != "") {
                if (($scope.PreStudentReg.EmailId != "") || ($scope.PreStudentReg.EmailId != undefined)) {
                    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                    if (expr.test($scope.PreStudentReg.EmailId) == false) {
                        alert("Invalid Email address");
                        return false;
                    }
                }
            }
            if (($scope.PreStudentReg.Guardianname != undefined) && ($scope.PreStudentReg.Guardianname != "")) {
                if (($scope.PreStudentReg.RelwithGuardian == undefined) || ($scope.PreStudentReg.RelwithGuardian == "")) {
                    alert("Enter Relaion with Guardian");
                    return false;
                }
            }
            if (($scope.PreStudentReg.CasteID == undefined) || ($scope.PreStudentReg.CasteID == "")) {
                alert("Select Caste");
                return false;
            }
            if (($scope.PreStudentReg.MothTID == undefined) || ($scope.PreStudentReg.MothTID == "")) {
                alert("Select Mother Tongue");
                return false;
            }
            if (($scope.PreStudentReg.OcupID == undefined) || ($scope.PreStudentReg.OcupID == "")) {
                alert("Select Father's Ocupation");
                return false;
            }
            if (($scope.PreStudentReg.IncGrpID == undefined) || ($scope.PreStudentReg.IncGrpID == "")) {
                alert("Select Parent/Guardian Income");
                return false;
            }

            else {
                return true;
            }
        }
        function SecondTabValidation() {
            if (($scope.PreStudentReg.ExamID == undefined) || ($scope.PreStudentReg.ExamID == "")) {
                alert("Select Exam");
                return false;
            }
            if (($scope.PreStudentReg.MediumID == undefined) || ($scope.PreStudentReg.MediumID == "")) {
                alert("Select Medium");
                return false;
            }
            if (($scope.PreStudentReg.MainGrpID == undefined) || ($scope.PreStudentReg.MainGrpID == "")) {
                alert("Select Main Group");
                return false;
            }
            //if (($scope.PreStudentReg.SecondLangID == undefined) || ($scope.PreStudentReg.SecondLangID == "")) {
            //    alert("Select Second Languange");
            //    return false;
            //}
            else {
                return true;
            }
        }
        function ThirdTabValidation() {
            if (($scope.PreStudentReg.Houseno == undefined) || ($scope.PreStudentReg.Houseno == "")) {
                alert("Enter House no");
                return false;
            }
            if (($scope.PreStudentReg.Cityname == undefined) || ($scope.PreStudentReg.Cityname == "")) {
                alert("Enter City name");
                return false;
            }
            if (($scope.PreStudentReg.StateID == undefined) || ($scope.PreStudentReg.StateID == "")) {
                alert("Select State");
                return false;
            }
            if (($scope.PreStudentReg.Streetname == undefined) || ($scope.PreStudentReg.Streetname == "")) {
                alert("Enter Street name");
                return false;
            }
            if (($scope.PreStudentReg.DistrictID == undefined) || ($scope.PreStudentReg.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.PreStudentReg.HousenoP == undefined) || ($scope.PreStudentReg.HousenoP == "")) {
                alert("Enter House no");
                return false;
            }
            if (($scope.PreStudentReg.CitynameP == undefined) || ($scope.PreStudentReg.CitynameP == "")) {
                alert("Enter City name");
                return false;
            }
            if (($scope.PreStudentReg.StateIDP == undefined) || ($scope.PreStudentReg.StateIDP == "")) {
                alert("Select State");
                return false;
            }
            if (($scope.PreStudentReg.StreetnameP == undefined) || ($scope.PreStudentReg.StreetnameP == "")) {
                alert("Enter Street name");
                return false;
            }
            if (($scope.PreStudentReg.DistrictIDP == undefined) || ($scope.PreStudentReg.DistrictIDP == "")) {
                alert("Select District");
                return false;
            }
            else {
                return true;
            }
        }
        $scope.FirsttabPanActiveClass = "tab-pane active";
        $scope.SecondtabPanActiveClass = "tab-pane";
        $scope.ThirdtabPanActiveClass = "tab-pane";
        function CheckValidation() {
            if (FirstTabValidation() == false) {
                return false;
            } else if (SecondTabValidation() == false) {
                return false;
            }
            else if (ThirdTabValidation() == false) {
                return false;
            }
            else {
                return true;
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission.PreStudentRegList');
        }
        $scope.FirsttabPanActiveClassLi = "tab_custom_width active";
        $scope.SecondtabPanActiveClassLi = "tab_custom_width";
        $scope.ThirdtabPanActiveClassLi = "tab_custom_width"
        $scope.ContinueFirstPage = function () {
            if (FirstTabValidation() == false) {
                return false;
            } else {
                $scope.FirsttabPanActiveClassLi = "tab_custom_width";
                $scope.SecondtabPanActiveClassLi = "tab_custom_width active";
                $scope.ThirdtabPanActiveClassLi = "tab_custom_width";

                $scope.FirsttabPanActiveClass = "tab-pane";
                $scope.SecondtabPanActiveClass = "tab-pane active";
                $scope.ThirdtabPanActiveClass = "tab-pane";
            }
        }
        $scope.ContinueSecondPage = function () {
            if (SecondTabValidation() == false) {
                return false;
            } else {
                $scope.FirsttabPanActiveClassLi = "tab_custom_width";
                $scope.SecondtabPanActiveClassLi = "tab_custom_width";
                $scope.ThirdtabPanActiveClassLi = "tab_custom_width active";

                $scope.FirsttabPanActiveClass = "tab-pane";
                $scope.SecondtabPanActiveClass = "tab-pane";
                $scope.ThirdtabPanActiveClass = "tab-pane active";
            }
        }
        $scope.BackFirstPage = function () {
            $scope.ContinueSecondPageDisable = false;
            $scope.FirsttabPanActiveClassLi = "tab_custom_width active";
            $scope.SecondtabPanActiveClassLi = "tab_custom_width";
            $scope.ThirdtabPanActiveClassLi = "tab_custom_width";

            $scope.FirsttabPanActiveClass = "tab-pane active";
            $scope.SecondtabPanActiveClass = "tab-pane";
            $scope.ThirdtabPanActiveClass = "tab-pane";
        }
        $scope.BackSecondPage = function () {
            $scope.ContinueSecondPageDisable = false;
            $scope.FirsttabPanActiveClassLi = "tab_custom_width";
            $scope.SecondtabPanActiveClassLi = "tab_custom_width active";
            $scope.ThirdtabPanActiveClassLi = "tab_custom_width";

            $scope.FirsttabPanActiveClass = "tab-pane";
            $scope.SecondtabPanActiveClass = "tab-pane active";
            $scope.ThirdtabPanActiveClass = "tab-pane";
        }

        $scope.ContinueThirdPage = function () {
            if (ThirdTabValidation() == false) {
                return false;
            } else {
                $scope.FirsttabPanActiveClassLi = "tab_custom_width active";
                $scope.SecondtabPanActiveClassLi = "tab_custom_width";
                $scope.ThirdtabPanActiveClassLi = "tab_custom_width";

                $scope.FirsttabPanActiveClass = "tab-pane";
                $scope.SecondtabPanActiveClass = "tab-pane";
                $scope.ThirdtabPanActiveClass = "tab-pane";
            }
        }
        //Photo Sign
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
                reader.onload = $scope.PhotoIsLoaded;
                var extn = element.files[0].type.split("/").pop();
                if ((extn == "jpeg") || (extn == "png") || (extn == "gif") || (extn == "jpg") || (extn == "bmp")) {
                    reader.readAsDataURL(element.files[0]);
                    $scope.Photofile = [];
                    var filesize = element.files[0].size;  // in bytes
                    if (filesize <= 50000) {
                        $scope.Photofile.push(element.files[0]);
                    }
                    else {
                        alert("Please Upload a photo upto 20kb");
                        $("#StudentPhoto").val("");
                        $scope.StudentPhoto = [];
                        $scope.StudentPhoto = null;
                        return;
                    }
                }
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
            reader.onload = $scope.SignIsLoaded;
            var extn = element.files[0].type.split("/").pop();
            if ((extn == "jpeg") || (extn == "png") || (extn == "gif") || (extn == "jpg") || (extn == "bmp")) {
                reader.readAsDataURL(element.files[0]);
                $scope.Signfile = [];
                var filesize = element.files[0].size;  // in bytes
                if (filesize <= 100000) {
                    $scope.Signfile.push(element.files[0]);
                }
                else {
                    alert("Please select photo size below 20kb");
                    return;
                }
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
            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostPreStudentRegPhoto/?PreStudRegID=" + $scope.PreStudentReg.PreStudRegID + "&SSCHallTicket=" + $scope.PreStudentReg.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
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
            var url = AppSettings.WebApiUrl + "api/PreStudentReg/PostPreStudentRegSign/?PreStudRegID=" + $scope.PreStudentReg.PreStudRegID + "&SSCHallTicket=" + $scope.PreStudentReg.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
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
        $scope.GetCheckSamesAddress = function (address) {
            if (address == true) {
                $scope.PreStudentReg.HousenoP = $scope.PreStudentReg.Houseno;
                $scope.PreStudentReg.StreetnameP = $scope.PreStudentReg.Streetname;
                $scope.PreStudentReg.CitynameP = $scope.PreStudentReg.Cityname;
                $scope.PreStudentReg.DistrictIDP = $scope.PreStudentReg.DistrictID;
                $scope.PreStudentReg.StateIDP = $scope.PreStudentReg.StateID;
                $scope.PreStudentReg.MandalIDP = $scope.PreStudentReg.MandalID;
            } else {
                $scope.PreStudentReg.HousenoP = "";
                $scope.PreStudentReg.StreetnameP = "";
                $scope.PreStudentReg.CitynameP = "";
                $scope.PreStudentReg.DistrictIDP = "";
                $scope.PreStudentReg.StateIDP = "";
                $scope.PreStudentReg.MandalIDP = "";
            }
        }
        $(".navbar-side").toggleClass("collapsed");
    });
});

