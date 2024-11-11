define(['app'], function (app) {
    app.directive('convertToNumber', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (val) {
                    return val != null ? parseInt(val, 10) : null;
                });
                ngModel.$formatters.push(function (val) {
                    return val != null ? '' + val : null;
                });
            }
        };
    });
    app.controller("PreAssmentController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MenuService, AdmissionService) {
        $scope.college = null;
        $scope.AcademicId = 0;
        $scope.Admission = {};
        var authData = $localStorage.authorizationData;
        console.log(authData);
        $scope.userName = authData.userName;
        AppSettings.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        $scope.CollegeID = authData.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.PrevAdmNo = authData.PrevAdmNo;
        AppSettings.TypeFlag = authData.TypeFlag;
        AppSettings.MngtTypID = authData.MngtTypID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
        AppSettings.SeqNo = authData.SeqNo;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        $scope.College_Code = authData.College_Code;
        $scope.College_Name = authData.College_Name;
        $scope.SystemUserTypeId = authData.SystemUserTypeId;
        $scope.BranchId = authData.BranchId;
        $scope.IsPrinciple = false;
        //   alert($scope.BranchId);
        // alert($scope.College_Code);
        if ((AppSettings.TypeFlag != 'B') && (AppSettings.TypeFlag != 'D')) {
            //AppSettings.CollegeCatName = $localStorage.CollegeData.CollegeCatName;
            //AppSettings.Clg_Type = $localStorage.CollegeData.Clg_Type;
            //AppSettings.college_name1 = $localStorage.CollegeData.college_name1;

            //var AcdYrClgCntList = MenuService.GetInsertAcdYrClg(AppSettings.CollegeID, AppSettings.AcdYrID, AppSettings.LoggedUserId);
            //AcdYrClgCntList.then(function (data, status, headers, config, error) {
            //}, function (error) {
            //    alert(error);
            //});

            $scope.college_name1 = AppSettings.college_name1;
        }

        //temporary validation
        //var temp = typeof $scope.College_Code;
        var regex = /^\d+$/;
        var temp = regex.test($scope.userName);
        if (temp && ($scope.CollegeID != "0" && $scope.CollegeID != "")) {
            $scope.IsPrinciple = true;
        }
        //if ($scope.SystemUserTypeId == "2") {
        //       $scope.IsPrinciple = true;
        //  }


        $scope.OpenReAdmissionList = function () {
            $state.go("Admission.ReAdmission");
        }


        $scope.OpenPinGeneratedReport = function () {
            $state.go("Admission.PinGeneratedReport");
        }
        if (AppSettings.UserRights.length == 0) { AppSettings.UserRights = authData.UserRights; }
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        var programsList = [];
        var RequestList = [];
        var ReportsList = [];
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ModuleRouteName == "Admission") {
                if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                }
                else {
                    if ((UsersRightsdata[i].ProgramType == "T") || (UsersRightsdata[i].ProgramType == "M")) {
                        if (UsersRightsdata[i].GridFormToOpen == 'PreYearAdmissionEntry') {
                            if ((AppSettings.PrevAdmNo == "") || (AppSettings.PrevAdmNo == undefined) || (AppSettings.PrevAdmNo == 0)) {
                                var obj = {};
                                obj.SysProgName = UsersRightsdata[i].SysProgName;
                                obj.SysProgID = UsersRightsdata[i].SysProgID;
                                obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                                obj.PrgImgClass = UsersRightsdata[i].PrgImgClass;
                                obj.IsActive = UsersRightsdata[i].IsActive;
                                programsList.push(obj);
                            } else {
                            }
                        } else {
                            if (UsersRightsdata[i].GridFormToOpen != 'CollegeInfo') {
                                var obj = {};
                                obj.SysProgName = UsersRightsdata[i].SysProgName;
                                obj.SysProgID = UsersRightsdata[i].SysProgID;
                                obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                                obj.PrgImgClass = UsersRightsdata[i].PrgImgClass;
                                obj.IsActive = UsersRightsdata[i].IsActive;
                                programsList.push(obj);
                            }
                        }
                    } else if (UsersRightsdata[i].ProgramType == "Q") {
                        var obj = {};
                        obj.SysProgName = UsersRightsdata[i].SysProgName;
                        obj.SysProgID = UsersRightsdata[i].SysProgID;
                        obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                        RequestList.push(obj);
                    } else if (UsersRightsdata[i].ProgramType == "R") {
                        var obj = {};
                        obj.SysProgName = UsersRightsdata[i].SysProgName;
                        obj.SysProgID = UsersRightsdata[i].SysProgID;
                        obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                        ReportsList.push(obj);
                    }
                }
            }
        }

        //   alert("Admission: " + programsList.length);
        $scope.programsList = programsList;
        $scope.RequestList = RequestList;
        $scope.ReportsList = ReportsList;

        $scope.OpenProgram = function (GridFormToOpen) {
            var strroute = 'Admission.' + GridFormToOpen;
            $state.go(strroute);
        }
        if (AppSettings.CollegeCatName == 'GOVERNMENT') {
            $scope.ShowGovtCollege = true;
        } else {
            $scope.ShowGovtCollege = false;
        }
        $scope.OpenDashboard = function () {
            $state.go('Dashboard')
        }
        $scope.MyProfile = function () {
            //$state.go('Admission.UserProfile');
        }
        $scope.GoToHome = function () {
            $state.go('Admission');
        }
        $scope.MyCollege = function () {

            $state.go('Admission.CollegeInfo');

        }
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

        //$scope.$on('onBeforeUnload', function (e, confirmation) {
        //    confirmation.message = "If you refresh or close browser, your session will expire and all data will be lost";
        //    e.preventDefault();
        //});
        //$scope.$on('onUnload', function (e) {
        //    delete $localStorage.authorizationData;
        //    sessionStorage.loggedIn = "no";
        //});
        $scope.OpenRegisterStudent = function () {
            //alert("hi");
            $state.go('StudentReg');
            //$state.go('login')
            //$state.go('StudentReg')
        }

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

        $scope.exportTableToExcel = function (tableid) {
            var url = 'data:application/vnd.ms-excel,' + encodeURIComponent($(tableid).html())
            location.href = url
            return false
        }
        var AcademicYears = AdmissionService.GetAcademicYearsActive(AppSettings.CollegeID);
        AcademicYears.then(function (data, status, headers, config, error) {
            $scope.AcademicYears = data.Table;
            //console.log($scope.AcademicYears);
            $scope.AcademicId = $scope.AcademicYears[0].AcademicId;
            AppSettings.AcademicId = $scope.AcademicYears[0].AcademicId;
            authData.AcademicId = $scope.AcademicYears[0].AcademicId;


        }, function (error) {
            alert(error);
        });
        if ($scope.CollegeID == 0) {
            $scope.LoadImg = true;
            $scope.StudentDetailsFound = false;
            $scope.CollegeDetailsFound = false;
            var CollegesInfo = AdmissionService.GetCollegesSchemeSemInfo(AppSettings.CollegeID);
            CollegesInfo.then(function (data) {
                if (data.Table.length > 0) {
                    debugger;
                    $scope.collegeinfo = data.Table;
                    $scope.college = $scope.collegeinfo[0].CollegeCode;
                    var AcademicYear = authData.AcdYrID;
                    var hodData = PreAssessmentService.GetDataForAdmissionDashboard(AppSettings.LoggedUserId, $scope.college, AcademicYear);
                    hodData.then(function (hodData, status, headers, config, error) {
                        $scope.hodData = hodData;
                        $scope.LoadImg = false;
                        $scope.StudentDetailsFound = true;
                        $scope.CollegeDetailsFound = true;
                        // alert(hodData.Table2[0].AcademicId);
                        $scope.Academic = hodData.Table1[0].AcademicId;
                        //  $scope.$digest();
                    }, function (error) {
                        alert("data not found");
                    });
                }

            }, function (error) {
                alert(error);
            });
        }
        else {
            var AcademicYearId;
            if (document.getElementById("AcademicYear") == null)
                AcademicYearId = 0;
            else
                AcademicYearId = document.getElementById("AcademicYear").value;
            //  alert(AcademicYearId);
            //alert("Academic Year " + document.getElementById("AcademicYear").value);
            $scope.LoadImg = true;
            $scope.StudentDetailsFound = false;
            $scope.CollegeDetailsFound = false;
            var hodData = AdmissionService.GetDataForAdmissionDashboard(AppSettings.LoggedUserId, $scope.College_Code, AcademicYearId);
            hodData.then(function (hodData, status, headers, config, error) {
                $scope.hodData = hodData;
                $scope.LoadImg = false;
                $scope.StudentDetailsFound = true;
                $scope.CollegeDetailsFound = true;
                //console.log(hodData);
                // $scope.Academic = hodData.Table2[0].AcademicId;
                // alert(hodData.Table[0].BankIfsc);
                var Intake = 0;
                var Allotted = 0;
                var Reported = 0;
                var DataNotUpdated = 0;
                var AadharNotUpdated = 0;
                for (var i = 0; i < hodData.Table1.length; i++) {
                    if (hodData.Table1[i].Intake != null)
                        Intake = Intake + hodData.Table1[i].Intake;
                    if (hodData.Table1[i].Allotted != null)
                        Allotted = Allotted + hodData.Table1[i].Allotted;
                    if (hodData.Table1[i].Reported != null)
                        Reported = Reported + hodData.Table1[i].Reported;
                    if (hodData.Table1[i].DataStatus != null)
                        DataNotUpdated = DataNotUpdated + hodData.Table1[i].DataStatus;
                    if (hodData.Table1[i].AadharVerified != null)
                        AadharNotUpdated = AadharNotUpdated + hodData.Table1[i].AadharVerified;
                }
                $scope.Intake = Intake;
                $scope.Allotted = Allotted;
                $scope.Reported = Reported;
                $scope.DataNotUpdated = DataNotUpdated;
                $scope.AadharNotUpdated = AadharNotUpdated;


                //  $scope.$digest();
            }, function (error) {
                alert(error);
            });
        }
        $scope.showDetails = function (Schemeid, Semesterid, Branchid) {
            //alert("scheme : "+Schemeid+" Semester : "+Semesterid+"Branch : "+Branchid +"Academic Year : "+AcademicYearid);
            var AcademicYearId = 0;

            //alert(document.getElementById("AcademicYear").value);
            if (document.getElementById("AcademicYear") == null || document.getElementById("AcademicYear").value == "? undefined:undefined ?")
                AcademicYearId = 0;
            else
                AcademicYearId = document.getElementById("AcademicYear").value;
            // alert("Academic Year : " + AcademicYearId);
            // alert("scheme : " + Schemeid + " Semester : " + Semesterid + "Branch : " + Branchid + "Academic Year : " + AcademicYearId);
            var collegecode = document.getElementById("CollegeName").value;
            //authData.College_Code = collegecode;
            authData.SchemeId = Schemeid;
            authData.SemesterId = Semesterid;
            authData.BranchId = Branchid;
            authData.AcdYrID = AcademicYearId;
            $state.go('Admission.StudentRegList');
            //$state.go('Admission.StudentRegList');
        }
        $scope.loadAdmissionData = function () {

            $scope.showData = 0;
            $scope.LoadImg = true;
            $scope.StudentDetailsFound = false;
            $scope.CollegeDetailsFound = false;
            // alert(document.getElementById("CollegeName"));
            var collegecode = document.getElementById("CollegeName").value;
            // alert(collegecode);
            // alert("in load admission" + collegecode);
            if ($scope.CollegeID !== 0) {
                $scope.college = $scope.College_Code;
            }
            else {
                if ($scope.college === null)
                    $scope.college = "001";
                else
                    $scope.college = collegecode;
            }

            //var AcademicYear = document.getElementById("AcademicYear").value;
            //if (AcademicYear !== undefined && AcademicYear !== null) {
            //    if (AcademicYear.includes("number")) {
            //        AcademicYear = AcademicYear.
            //    }
            //}
            // $scope.$digest();
            // var AcademicYear = $scope.AcademicId;
            var scope = angular.element(document.getElementById("AcademicYear")).scope();
            var AcademicYear = scope.AcademicId;

            // var AcademicYear = ;
            //if (AcademicYear === "" || AcademicYear.includes("undefined"))
            //    AcademicYear = 0;
            // alert(AcademicYear);




            if ($scope.college === "") {
                $scope.college = collegecode;
            }



            var hodData = AdmissionService.GetDataForAdmissionDashboard(AppSettings.LoggedUserId, $scope.college, AcademicYear);
            hodData.then(function (hodData, status, headers, config, error) {

                $scope.hodData = hodData;
                $scope.LoadImg = false;
                $scope.StudentDetailsFound = true;
                $scope.CollegeDetailsFound = true;
                // alert(hodData.Table2[0].AcademicId);

                $scope.Academic = hodData.Table1[0].AcademicId;
                //  $scope.$digest();
            }, function (error) {
                alert("data not found");
            });
        }
    });
});







