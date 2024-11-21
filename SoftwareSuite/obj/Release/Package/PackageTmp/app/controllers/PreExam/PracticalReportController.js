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
    app.controller("PracticalReportController", function ($scope, $http, $localStorage, $state, AppSettings, MenuService, PracticalReportService, basicExamService, otherMarkEnrtyService, DrillDownService) {
        $scope.PracticalReport = {};
        $scope.otherMarkEnrtyDetail = [];
        var authData = $localStorage.authorizationData;
        $scope.ShowCandidate = {};
        $scope.PracticalReport.SessionType = "0";
        //$scope.PracticalReport.ExmSubID = "0";
        //$scope.PracticalReport.CourseID = "0";

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

        $scope.PsubjectID = "";
       
        var CourseList = PracticalReportService.GetBasicCourseList();
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
            $scope.PracticalReport.CourseID = "" + $scope.CourseList[0].CourseID + "";
            if ($scope.PracticalReport.CourseID == 1) {
                //$scope.PracticalReport.ExamId = "";
                $scope.ExamIDGen = false;
                $scope.ExamIDVoc = true;
            }
            else {
                //$scope.PracticalReport.ExamId = "0";
                $scope.ExamIDGen = true;
                $scope.ExamIDVoc = false;           
            }
          $scope.CoursePartChange($scope.PracticalReport.CourseID, $scope.PracticalReport.ExamId)
        }, function (error) {
            alert(error);
        });

        $scope.ChangeExamID = function (ExamId) {
            if (($scope.PracticalReport.ExamId != null) && ($scope.PracticalReport.ExamId != undefined) || ($scope.PracticalReport.ExamId != "")) {
                var PraticalList = PracticalReportService.GetCourseByPraticalDateList($scope.PracticalReport.CourseID, $scope.PracticalReport.ExamId);
                PraticalList.then(function (Praticaldata, status, headers, config, error) {
                    $scope.PraticalList = Praticaldata;
                    $scope.PracticalReport.PrDate = $scope.PraticalList[0].PrDate;
                    //$scope.GetBasicParticalSubjectList($scope.PracticalReport.PrDate);
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.CoursePartChange = function (CourseID, ExamId) {
            if (($scope.PracticalReport.CourseID != null) && ($scope.PracticalReport.CourseID != undefined) || ($scope.PracticalReport.CourseID != "")) {
                if ($scope.PracticalReport.CourseID == 1) {
                    //$scope.PracticalReport.ExamId = "";
                    $scope.ExamIDGen = false;
                    $scope.ExamIDVoc = true;
                }
                if ($scope.PracticalReport.CourseID == 2) {
                    //if ($scope.PracticalReport.CourseID == 2)
                    //$scope.PracticalReport.ExamId = "";
                    $scope.ExamIDGen = true;
                    $scope.ExamIDVoc = false;
                    //$scope.PracticalReport.ExamId = "3";
                }                
            }
        }


        $scope.GetBasicParticalSubjectList = function (PrDate) {
            //if ((PrDate != null) && (PrDate != undefined) && (PrDate != ""))
            if (($scope.PracticalReport.PrDate != null) && ($scope.PracticalReport.PrDate != undefined) || ($scope.PracticalReport.PrDate != ""))
            {    
                if (($scope.PracticalReport.SessionType != null) && ($scope.PracticalReport.SessionType != undefined) || ($scope.PracticalReport.SessionType != ""))
                    {
                    var SubjectList = PracticalReportService.GetBasicParticalSubjectList($scope.PracticalReport.CourseID, $scope.PracticalReport.ExamId, $scope.PracticalReport.PrDate, $scope.PracticalReport.SessionType);
                    SubjectList.then(function (Praticaldata, status, headers, config, error) {
                        $scope.SubjectList = Praticaldata;
                    }, function (error) {
                        alert(error);
                    });
                }
            }
        }

        $scope.MngtTypIDs = "";
        $scope.DrillDownList = [];
        $scope.colPageAdmissionListForfirst = [];
        $scope.Submit = function () {

            if (($scope.PracticalReport.CourseID == "") || ($scope.PracticalReport.CourseID == undefined)) {
                alert("Select Stream");
                return;
            }
            //if (($scope.otherMarkEnrtyDetail.ExmSubID == "") || ($scope.otherMarkEnrtyDetail.ExmSubID == undefined)) {
            //    alert("Select Subjects");
            //    return;
            //}

            if ($scope.adminuser == true || $scope.jsuser == true || $scope.coeuser == true) {
                var TotalRecorddata = PracticalReport.GetDrillDownStudentDetailsListENVandETH($scope.PracticalReport.ExamInstID, $scope.PracticalReport.ExmSubID);
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
            else if ($scope.dieouser == true) {
                var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListENVandETHByCollege($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, AppSettings.DistrictIDs);
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
            else {
                    var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListENVandETHByCollege($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, AppSettings.DistrictIDs);
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
        }
     
        $scope.GetTotalRecord = function (obj) {
            $scope.colPageAdmissionList = [];
            var gender = "";
            $scope.gender = "";
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListENVandETHByCollege($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, AppSettings.DistrictIDs);
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
                var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListENVandETHByCollegeByDistristCode($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, $scope.DistCode, $scope.type);
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
                    var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListENVandETHByCollegeWithType($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, $scope.DistCode, $scope.type);
                }
                else {
                    var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListENVandETHByCollegeByDistristCode($scope.Admission.ExamInstID, $scope.otherMarkEnrtyDetail.ExmSubID, $scope.DistCode, $scope.type);
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
    });
});







