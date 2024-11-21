define(['app'], function (app) {
    app.controller("DrillDownAdmissionPaymentController", function ($scope, $http, $localStorage, $state, AppSettings, MenuService, DrillDownService) {
        $scope.DrillDownAdmissionPayment = {};
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID,
        //drilldown coding
        $scope.export = function () {
            var doc = new jsPDF('p', 'pt', 'a4');
            var source = document.getElementById('alldata').innerHTML;
            var margins = {
                top: 10,
                bottom: 10,
                left: 10,
                width: 595
            };
            doc.fromHTML(
                source, // HTML string or DOM elem ref.
                margins.left,
                margins.top, {
                    'width': margins.width,
                    'elementHandlers': specialElementHandlers
                },
                function (dispose) {
                    // dispose: object with X, Y of the last line add to the PDF 
                    //          this allow the insertion of new lines after html
                    doc.save('Test.pdf');
                }, margins);
        }
        $scope.adminuser = false;
        $scope.ifcoluser = false;
        var AcdYrList = DrillDownService.GetCurrentAcademicYearForDrillDown();
        AcdYrList.then(function (AcdYrdata, status, headers, config, error) {
            $scope.AcdYrList = AcdYrdata;
        }, function (error) {
            alert(error);
        });
        var DistrictList = DrillDownService.GetDistrictListByStateID(1);
        DistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.DistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });
        var BasicManagementTypedata = DrillDownService.GetBasicManagementTypeList();
        BasicManagementTypedata.then(function (data) {
            $scope.BasicManagementTypeList = data;
            if (AppSettings.CollegeID != 0) {
                for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                    if ($scope.BasicManagementTypeList[i].MngtTypID == AppSettings.MngtTypID) {
                        $scope.BasicManagementTypeList[i].Selected = true;
                        $scope.ifcoluser = true;
                    }
                }
            }
        }, function (error) {
            alert(error);
        });
        var MediumList = DrillDownService.GetBasicMediumList();
        MediumList.then(function (SecondLangdata, status, headers, config, error) {
            $scope.MediumList = SecondLangdata;
        }, function (error) {
            alert(error);
        });
        var CasteList = DrillDownService.GetCasteList();
        CasteList.then(function (Castedata, status, headers, config, error) {
            $scope.CasteList = Castedata;
        }, function (error) {
            alert(error);
        });
        if (AppSettings.CollegeID != 0) {
            $scope.adminuser = false;
            var CourseList = DrillDownService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (Coursedata, status, headers, config, error) {
                $scope.CourseList = Coursedata;
            }, function (error) {
                alert(error);
            });
        } else {
            $scope.adminuser = true;
            var CourseList = DrillDownService.GetBasicCourseList();
            CourseList.then(function (Coursedata, status, headers, config, error) {
                $scope.CourseList = Coursedata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillCoursePart = function (CourseID) {
            if ((CourseID != null) && (CourseID != undefined) && (CourseID != "")) {
                var MainGroupList = DrillDownService.GetMainGroupListByCollegeId(AppSettings.CollegeID, CourseID, AppSettings.AcdYrID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupListdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillMedium = function (MainGrpID) {
            if ((MainGrpID != null) && (MainGrpID != undefined) && (MainGrpID != "")) {
                var BranchList = DrillDownService.GetBasicBranchListByGroup(MainGrpID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                    $scope.DrillDownAdmissionPayment.BranchID = BasicBranchdata[0].BranchID;
                    if (AppSettings.CollegeID != 0) {
                        var MediumList = DrillDownService.GetBasicMediumInRegStud(AppSettings.CollegeID, BasicBranchdata[0].BranchID, AppSettings.AcdYrID);
                        MediumList.then(function (SecondLangdata, status, headers, config, error) {
                            $scope.MediumList = SecondLangdata;
                        }, function (error) {
                            alert(error);
                        });
                    }
                }, function (error) {
                    alert(error);
                });
            }
        }
        $("#PaymentDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $scope.MngtTypIDs = "";
        $scope.Submit = function () {
            $scope.MngtTypIDs = "";
            for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                if ($scope.BasicManagementTypeList[i].Selected) {
                    if ($scope.MngtTypIDs == "") {
                        $scope.MngtTypIDs = $scope.BasicManagementTypeList[i].MngtTypID;
                    }
                    else {
                        $scope.MngtTypIDs = $scope.MngtTypIDs + ',' + $scope.BasicManagementTypeList[i].MngtTypID;
                    }
                }
            }
            if ($scope.MngtTypIDs == "") {
                alert("Select atleast single management type");
                return;
            }
            if (($scope.DrillDownAdmissionPayment.AcdYrID == "") || ($scope.DrillDownAdmissionPayment.AcdYrID == undefined)) {
                alert("Select Academic Year");
                return;
            }
            if (($scope.DrillDownAdmissionPayment.CourseID == "") || ($scope.DrillDownAdmissionPayment.CourseID == undefined)) {
                alert("Select Stream");
                return;
            }
            if (($scope.DrillDownAdmissionPayment.DistrictID == "") || ($scope.DrillDownAdmissionPayment.DistrictID == undefined) || ($scope.DrillDownAdmissionPayment.DistrictID == "ALL")) {
                $scope.DrillDownAdmissionPayment.DistrictID = 0;
            }
            if (($scope.DrillDownAdmissionPayment.CourseID == "") || ($scope.DrillDownAdmissionPayment.CourseID == undefined)) {
                $scope.DrillDownAdmissionPayment.CourseID = 0;
            }
            if (($scope.DrillDownAdmissionPayment.MainGrpID == "") || ($scope.DrillDownAdmissionPayment.MainGrpID == undefined)) {
                $scope.DrillDownAdmissionPayment.MainGrpID = 0;
            }
            if (($scope.DrillDownAdmissionPayment.MediumID == "") || ($scope.DrillDownAdmissionPayment.MediumID == undefined)) {
                $scope.DrillDownAdmissionPayment.MediumID = 0;
            }
            if (($scope.DrillDownAdmissionPayment.CasteID == "") || ($scope.DrillDownAdmissionPayment.CasteID == undefined)) {
                $scope.DrillDownAdmissionPayment.CasteID = 0;
            }

            $scope.MngtTypName = "ALL";
            $scope.CourseName = "ALL";
            $scope.MainGrpName = "ALL";
            $scope.MediumName = "ALL";
            $scope.CasteName = "ALL";
            $scope.AcdYrName = "ALL";
            $scope.CollegeDistName = "ALL";
            for (var i = 0; i < $scope.AcdYrList.length; i++) {
                if ($scope.AcdYrList[i].AcdYrID == $scope.DrillDownAdmissionPayment.AcdYrID) {
                    $scope.AcdYrName = $scope.AcdYrList[i].AcdYrName;
                }
            }
            for (var i = 0; i < $scope.DistrictList.length; i++) {
                if ($scope.DistrictList[i].DistrictID == $scope.DrillDownAdmissionPayment.DistrictID) {
                    $scope.CollegeDistName = $scope.DistrictList[i].DistName;
                }
            }
            for (var i = 0; i < $scope.CourseList.length; i++) {
                if ($scope.CourseList[i].CourseID == $scope.DrillDownAdmissionPayment.CourseID) {
                    $scope.CourseName = $scope.CourseList[i].CourseName;
                }
            }
            for (var i = 0; i < $scope.MainGroupList.length; i++) {
                if ($scope.MainGroupList[i].MainGrpID == $scope.DrillDownAdmissionPayment.MainGrpID) {
                    $scope.MainGrpName = $scope.MainGroupList[i].MainGrpName;
                }
            }
            for (var i = 0; i < $scope.MediumList.length; i++) {
                if ($scope.MediumList[i].MediumID == $scope.DrillDownAdmissionPayment.MediumID) {
                    $scope.MediumName = $scope.MediumList[i].MediumName;
                }
            }
            if ($("#PaymentDate").val() != "") { $scope.DrillDownAdmissionPayment.PaymentDate = $("#PaymentDate").val(); } else {
                $scope.DrillDownAdmissionPayment.PaymentDate = "";
            }

            if ($("#PaymentDate").val() != "") { $scope.DrillDownAdmissionPayment.PaymentDate = $("#PaymentDate").val(); }
            //$scope.DrillDownAdmissionPayment.PaymentDate = "17/Sep/2018";
            if (AppSettings.CollegeID == 0) {
                var TotalRecorddata = DrillDownService.GetDrillDownPaymentForAdmissionForDistrict(AppSettings.AcdYrID, $scope.DrillDownAdmissionPayment.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs, $scope.DrillDownAdmissionPayment.CourseID, 0, $scope.DrillDownAdmissionPayment.MainGrpID, $scope.DrillDownAdmissionPayment.MediumID, $scope.DrillDownAdmissionPayment.CasteID, $scope.DrillDownAdmissionPayment.PaymentDate);
            }
            else {
                var gender = "";
                //var TotalRecorddata = DrillDownService.GetDrillDownPaymentForAdmissionForCollege(AppSettings.AcdYrID, AppSettings.CollegeID, $scope.MngtTypIDs, $scope.DrillDownAdmissionPayment.CourseID, 0, $scope.DrillDownAdmissionPayment.MainGrpID, $scope.DrillDownAdmissionPayment.MediumID, $scope.DrillDownAdmissionPayment.CasteID, $scope.DrillDownAdmissionPayment.PaymentDate);
                var TotalRecorddata = DrillDownService.GetDrillDownPaymentForAdmissionForDistrict(AppSettings.AcdYrID, $scope.DrillDownAdmissionPayment.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs, $scope.DrillDownAdmissionPayment.CourseID, 0, $scope.DrillDownAdmissionPayment.MainGrpID, $scope.DrillDownAdmissionPayment.MediumID, $scope.DrillDownAdmissionPayment.CasteID, $scope.DrillDownAdmissionPayment.PaymentDate);
            }
            TotalRecorddata.then(function (data) {
                if (data.length > 0) {
                    if (AppSettings.CollegeID == 0) {
                        $scope.DrillDownList = data;
                    }
                    else {
                        $scope.colPageAdmissionListForfirst = data;
                    }
                } else {
                    alert("Data Not Found.");
                    $scope.DrillDownList = [];
                    $scope.colPageAdmissionListForfirst = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.DrillDownList = [];
        $scope.colPageAdmissionListForfirst = [];
        $scope.GetTotalRecord = function (obj) {
            $scope.colPageAdmissionList = [];
            var gender = "";
            $scope.gender = "";
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListTESTByCollege(AppSettings.AcdYrID, obj.CollegeDistrictID, AppSettings.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownAdmissionPayment.CourseID, 0, $scope.DrillDownAdmissionPayment.MainGrpID, $scope.DrillDownAdmissionPayment.MediumID, $scope.DrillDownAdmissionPayment.CasteID);
            TotalRecorddata.then(function (data) {
                $scope.colPageAdmissionList = data;
                $scope.SetDefault();
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.colPageAdmissionList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.gender = "";
        $scope.GetTotalAmount = function (obj) {
            var gender = "M";
            $scope.gender = "M";
            $scope.colPageAdmissionList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownPaymentForAdmissionForCollege(AppSettings.AcdYrID, obj.CollegeID, $scope.MngtTypIDs, $scope.DrillDownAdmissionPayment.CourseID, 0, $scope.DrillDownAdmissionPayment.MainGrpID, $scope.DrillDownAdmissionPayment.MediumID, $scope.DrillDownAdmissionPayment.CasteID, $scope.DrillDownAdmissionPayment.PaymentDate);  
            TotalRecorddata.then(function (data) {
                $scope.colPageAdmissionList = data;
                $scope.SetDefault();
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.colPageAdmissionList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetFemaleRecord = function (obj) {
            var gender = "F";
            $scope.gender = "F";
            $scope.colPageAdmissionList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListTESTByCollege(AppSettings.AcdYrID, obj.CollegeDistrictID, AppSettings.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownAdmissionPayment.CourseID, 0, $scope.DrillDownAdmissionPayment.MainGrpID, $scope.DrillDownAdmissionPayment.MediumID, $scope.DrillDownAdmissionPayment.CasteID);
            TotalRecorddata.then(function (data) {
                $scope.colPageAdmissionList = data;
                $scope.SetDefault();
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.colPageAdmissionList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetOtherRecord = function (obj) {
            var gender = "O";
            $scope.gender = "O";
            $scope.colPageAdmissionList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListTESTByCollege(AppSettings.AcdYrID, obj.CollegeDistrictID, AppSettings.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownAdmissionPayment.CourseID, 0, $scope.DrillDownAdmissionPayment.MainGrpID, $scope.DrillDownAdmissionPayment.MediumID, $scope.DrillDownAdmissionPayment.CasteID);
            TotalRecorddata.then(function (data) {
                $scope.colPageAdmissionList = data;
                $scope.SetDefault();
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.colPageAdmissionList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetDrillDownStudentDetailsListByID = function (obj) {
            $scope.SingleRecordList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByID(obj.PreStudRegID, obj.AcdYrID);
            TotalRecorddata.then(function (data) {
                $scope.StudentReg = data[0];
                $scope.SetDefault();
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.StudentReg = [];
                }
            }, function (error) {
                alert(error);
            });
        }


        //col page

        $scope.GetColTotalRecord = function (obj) {
            $scope.studpageAdmissionList = [];
            var gender = "";
            if ($scope.gender != "") { gender = $scope.gender }
            else {
                gender = ""
            }
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID(AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownAdmissionPayment.CourseID, 0, $scope.DrillDownAdmissionPayment.MainGrpID, $scope.DrillDownAdmissionPayment.MediumID, $scope.DrillDownAdmissionPayment.CasteID);
            TotalRecorddata.then(function (data) {
                $scope.studpageAdmissionList = data;
                $scope.SetDefault();
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.studpageAdmissionList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetColMaleRecord = function (obj) {
            var gender = "";
            if ($scope.gender != "") { gender = $scope.gender }
            else {
                gender = "M"
            }
            $scope.studpageAdmissionList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID(AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownAdmissionPayment.CourseID, 0, $scope.DrillDownAdmissionPayment.MainGrpID, $scope.DrillDownAdmissionPayment.MediumID, $scope.DrillDownAdmissionPayment.CasteID);
            TotalRecorddata.then(function (data) {
                $scope.studpageAdmissionList = data;
                $scope.SetDefault();
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.studpageAdmissionList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetColFemaleRecord = function (obj) {
            var gender = "";
            if ($scope.gender != "") { gender = $scope.gender }
            else {
                gender = "F"
            }
            $scope.studpageAdmissionList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID(AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownAdmissionPayment.CourseID, 0, $scope.DrillDownAdmissionPayment.MainGrpID, $scope.DrillDownAdmissionPayment.MediumID, $scope.DrillDownAdmissionPayment.CasteID);
            TotalRecorddata.then(function (data) {
                $scope.studpageAdmissionList = data;
                $scope.SetDefault();
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.studpageAdmissionList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetColOtherRecord = function (obj) {
            var gender = "";
            if ($scope.gender != "") { gender = $scope.gender }
            else {
                gender = "O"
            }
            $scope.studpageAdmissionList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID(AppSettings.AcdYrID, obj.CollegeDistrictID, obj.CollegeID, gender, $scope.MngtTypIDs, $scope.DrillDownAdmissionPayment.CourseID, 0, $scope.DrillDownAdmissionPayment.MainGrpID, $scope.DrillDownAdmissionPayment.MediumID, $scope.DrillDownAdmissionPayment.CasteID);
            TotalRecorddata.then(function (data) {
                $scope.studpageAdmissionList = data;
                $scope.SetDefault();
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.studpageAdmissionList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.exportTableToExcel = function (tableid) {
            var url = 'data:application/vnd.ms-excel,' + encodeURIComponent($(tableid).html())
            location.href = url
            return false
        }
        $scope.SetDefault = function () {
            $scope.MngtTypName = $scope.MngtTypName;
            $scope.CourseName = $scope.CourseName;
            $scope.MainGrpName = $scope.MainGrpName;
            $scope.MediumName = $scope.MediumName;
            $scope.CasteName = $scope.CasteName;
            $scope.AcdYrName = $scope.AcdYrName;
            $scope.CollegeDistName = $scope.CollegeDistName;
        }
    });
});







