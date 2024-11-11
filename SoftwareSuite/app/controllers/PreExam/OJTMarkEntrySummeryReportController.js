define(['app'], function (app) {
    app.filter('total', function () {
        return function (input, property) {
            var i = input instanceof Array ? input.length : 0;
            if (typeof property === 'undefined' || i === 0) {
                return i;
            } else if (isNaN(input[0][property])) {
                throw 'filter total can count only numeric values';
            } else {
                var total = 0;
                while (i--)
                    total += input[i][property];
                return total;
            }
        };
    })
    app.controller("OJTMarkEntrySummeryReportController", function ($scope, $http, $localStorage, $state, AppSettings, MenuService, basicExamService, otherMarkEnrtyService, DrillDownService) {
        $scope.Admission = {};
        $scope.otherMarkEnrtyDetail = [];
        var authData = $localStorage.authorizationData;
        $scope.ShowCandidate = {};
        $scope.userName = authData.userName;
        $scope.adminuser = false;
        $scope.dieouser = false;
        $scope.supuser = false;
        $scope.dsuser = false;
        $scope.jsuser = false;
        $scope.coeuser = false;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        $scope.LoggedCollegeID = AppSettings.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.SysUsrGrpID = authData.SysUserID;
        if (authData.SysUsrGrpID == "1") {
            $scope.adminuser = true;
        }
        if (authData.SysUsrGrpID == "7") {
            $scope.dieouser = true;
        }
        if (authData.SysUsrGrpID == "9") {
            $scope.supuser = true;
        }
        if (authData.SysUsrGrpID == "2") {
            $scope.dsuser = true;
        }
        if (authData.SysUsrGrpID == "11") {
            $scope.jsuser = true;
        }
        if (authData.SysUsrGrpID == "23") {
            $scope.coeuser = true;
        }
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
        $scope.logOut = function () {
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;
            var InsertLoginList = MenuService.GetUpdateLogoutInfo(AppSettings.LoggedUserId, $scope.userName);
            InsertLoginList.then(function (Districtdata, status, headers, config, error) {
            }, function (error) {
                alert(error);
            });
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
            $state.go('login')
        }

        $("#LoadImg").attr("src", AppSettings.LoadingImage);
        $scope.LoadImg = false;


        //drilldown coding
        $scope.examTimeTableSubjects = [];

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

        var CourseList = DrillDownService.GetBasicCourseList();
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
            $scope.Admission.CourseID = "" + $scope.CourseList[1].CourseID + "";
            $scope.FillCoursePart($scope.Admission.CourseID);
        }, function (error) {
            alert(error);
        });

        $scope.FillCoursePart = function (CourseID) {
            if ((CourseID != null) && (CourseID != undefined) && (CourseID != "")) {
                var MainGroupList = DrillDownService.GetMainGroupListByCollegeId(AppSettings.CollegeID, CourseID, AppSettings.AcdYrID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupListdata;
                    basicExamService.getBasicExamListByCourseID(2).then(function (results) {
                        $scope.basicExams = results;
                       // $scope.Admission.ExamID = results[0].ExamID;
                        $scope.Admission.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                            //otherMarkEnrtyService.GetOnTheJobTrngExamSubListForMarkEntry($scope.Admission.ExamID).then(function (results) {
                            //$scope.examTimeTableSubjects = results;
                            //$scope.otherMarkEnrtyDetail.ExmSubID = "" + $scope.examTimeTableSubjects[0].ExmSubID + "";
                        //});
                    });
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.FillExamSubject = function (ExamID) {
            if ((ExamID != null) && (ExamID != undefined) && (ExamID != "")) {
                otherMarkEnrtyService.GetOnTheJobTrngExamSubListForMarkEntry($scope.Admission.ExamID).then(function (results) {
                            $scope.examTimeTableSubjects = results;
                            //$scope.otherMarkEnrtyDetail.ExmSubID = "" + $scope.examTimeTableSubjects[0].ExmSubID + "";
                });
            }
        }


        $scope.FillMedium = function (MainGrpID) {
            if ((MainGrpID != null) && (MainGrpID != undefined) && (MainGrpID != "")) {
                var BranchList = DrillDownService.GetBasicBranchListByGroup(MainGrpID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                    $scope.Admission.BranchID = BasicBranchdata[0].BranchID;
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
        $scope.MngtTypIDs = "";
        $scope.DrillDownList = [];
        $scope.colPageAdmissionListForfirst = [];
        $scope.Submit = function () {
            $scope.LoadImg = true;
            if (($scope.Admission.CourseID == "") || ($scope.Admission.CourseID == undefined)) {
                alert("Select Stream");
                return;
            }
            if (($scope.otherMarkEnrtyDetail.ExmSubID == "") || ($scope.otherMarkEnrtyDetail.ExmSubID == undefined)) {
                alert("Select Subjects");
                return;
            }

            if ($scope.adminuser == true || $scope.jsuser == true || $scope.coeuser == true) {
                var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListOJT($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, $scope.Admission.ExamID);
                TotalRecorddata.then(function (data) {
                    if (data.length > 0) {
                        if (AppSettings.CollegeID == 0) {
                            $scope.DrillDownList = data;
                            $scope.LoadImg = false;
                        }
                        else {
                            $scope.colPageAdmissionListForfirst = data;
                            $scope.LoadImg = false;
                        }
                    } else {
                        alert("Data Not Found.");
                        $scope.DrillDownList = [];
                        $scope.colPageAdmissionListForfirst = [];
                        $scope.LoadImg = false;
                    }
                }, function (error) {
                    alert(error);
                    $scope.LoadImg = false;
                });
            }
            else if ($scope.dieouser == true) {
                var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListForOJTByCollege($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, AppSettings.DistrictIDs, $scope.Admission.ExamID);
                TotalRecorddata.then(function (data) {
                    $scope.colPageAdmissionList = data;
                    $scope.SetDefault();
                    if (data.length > 0) {
                        $scope.LoadImg = false;
                    } else {
                        alert("Data Not Found.");
                        $scope.colPageAdmissionList = [];
                        $scope.LoadImg = false;
                    }
                }, function (error) {
                    alert(error);
                    $scope.LoadImg = false;
                });
            }
            else {
                var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListForOJTByCollege($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, AppSettings.DistrictIDs, $scope.Admission.ExamID);
                TotalRecorddata.then(function (data) {
                    if (data.length > 0) {
                        if (AppSettings.CollegeID == 0) {
                            $scope.DrillDownList = data;
                            $scope.LoadImg = false;
                        }
                        else {
                            $scope.colPageAdmissionListForfirst = data;
                            $scope.LoadImg = false;
                        }
                    } else {
                        alert("Data Not Found.");
                        $scope.DrillDownList = [];
                        $scope.colPageAdmissionListForfirst = [];
                        $scope.LoadImg = false;
                    }
                }, function (error) {
                    alert(error);
                    $scope.LoadImg = false;
                });
            }
        }

        $scope.GetTotalRecord = function (obj) {
            $scope.colPageAdmissionList = [];
            var gender = "";
            $scope.gender = "";
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListForOJTByCollege($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, AppSettings.DistrictIDs, $scope.Admission.ExamID);
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
        $scope.GetTotalRecord_ds = function (obj, type) {
            $scope.type = type;
            $scope.DistCode = obj.DistCode
            $scope.colPageAdmissionList = [];
            if ($scope.DistCode != "" && $scope.type != "") {
                if ($scope.dieouser == true) {
                    var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListENVandETHByCollegeWithForDieo($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, AppSettings.DistrictIDs, $scope.type);
                }
                else {
                    var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListOJTByCollegeByDistristCode($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, $scope.DistCode, $scope.Admission.ExamID);
                }
            }
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


        $scope.GetTotalRecord_js = function (obj, type) {
            $scope.type = type;
            $scope.DistCode = obj.DistCode
            $scope.colPageAdmissionList = [];
            if ($scope.DistCode != "" && $scope.type != "") {
                //var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListENVandETHByCollegeByDistristCode($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, $scope.DistCode);
                //GetDrillDownStudentDetailsListENVandETHByCollegeWithType
                //var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListENVandETHByCollegeWithType($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, $scope.DistCode, $scope.type);
                var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListOJTByCollegeByDistristCodeWithType($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, $scope.DistCode, $scope.type, $scope.Admission.ExamID,obj.CollegeID);
                //var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListENVandETHByCollegeByDistristCode($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, $scope.DistCode);
            }
            else {

                var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListOJTByCollegeByDistristCode($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, $scope.DistCode, $scope.Admission.ExamID);
            }

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
        $scope.GetTotalRecord_coe = function (obj, type) {
            $scope.type = type;
            $scope.DistCode = obj.DistCode
            $scope.colPageAdmissionList = [];
            if ($scope.DistCode != "" && $scope.type != "") {
                var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListOJTByCollegeByDistristCode($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, $scope.DistCode, $scope.Admission.ExamID);
            }
            else {
                var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListOJTByCollegeByDistristCodeWithType($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, AppSettings.DistrictIDs, $scope.type, $scope.Admission.ExamID);
            }
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

        var type = "";
        $scope.GetColTotalRecord = function (obj, type) {
            $scope.studpageAdmissionList = [];
            $scope.type = type;
            $scope.DistCode = obj.DistCode
            if ($scope.type != "") {
                if ($scope.dsuser == true && type == 0) {
                    var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListOJTByCollegeWithType($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, $scope.DistCode, $scope.type, $scope.Admission.ExamID);
                }
                else {
                    var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListOJTByCollegeByDistristCodeWithType($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, $scope.DistCode, $scope.type, $scope.Admission.ExamID, obj.CollegeID);

                }
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

        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $scope.isupdatableDisable = false;
            $state.go('PreExam');
        }
    });
});







