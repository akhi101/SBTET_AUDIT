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
    app.factory('Excel', function ($window) {
        //alert("hello");
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId);
                ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });
    app.controller("AdmissionController", function ($scope, $http, $localStorage, $location, $state, $stateParams, AppSettings, MenuService, SystemUserService, AdmissionService, Excel, $timeout) {
        $scope.college = null;
        $scope.AcademicId = 0;
        $scope.Admission = {};
        var authData = $localStorage.authorizationData;
        // console.log(authData);
        var data = {};
        $scope.$emit('showLoading', data);
        $scope.College_Code = authData.College_Code;
    
        AppSettings.College_Name = authData.College_Name;
        $scope.College_Name = authData.College_Name;
        $scope.SystemUserTypeId = authData.SystemUserTypeId;
        $scope.BranchId = authData.BranchId;
        $scope.userType = authData.SystemUserTypeId;
        if ($scope.userType != 1) {
            $scope.college = authData.College_Code;
        }
        
        $scope.IsPrinciple = false;


        var regex = /^\d+$/;
        var temp = regex.test($scope.userName);
        if (temp && ($scope.CollegeID != "0" && $scope.CollegeID != "")) {
            $scope.IsPrinciple = true;
        }


        $scope.OpenReAdmissionList = function () {
            $state.go("Dadshboard.AdmissionDashboard.ReAdmission");
        }


        $scope.OpenStudentWise = function () {
            $state.go("StudentResult");
        }


        $scope.OpenPinGeneratedReport = function () {
            $state.go("Dadshboard.AdmissionDashboard.PinGeneratedReport");
        },

            $scope.GetAttendanceReport = function () {
            if ($scope.userType == '1' || $scope.userType == '5' || $scope.userType == '1002' || $scope.userType == '1007' || $scope.userType == '1009' || $scope.userType == '1000' || $scope.userType == '1013' || $scope.userType == '1011' || $scope.userType == '1012') {

                    $state.go("Dadshboard.AdmissionDashboard.AdminAttendanceReport");
                } else if ($scope.userType != '1') {

                    $state.go('Dadshboard.AdmissionDashboard.GetAttendanceReport');

                } else {


                }

            }

        //if(AppSettings.UserRights.length == 0) { AppSettings.UserRights = authData.UserRights; }
        //var UsersRightsdata = [];
        //UsersRightsdata = AppSettings.UserRights;
        //var programsList = [];
        //var RequestList = [];
        //var ReportsList = [];
        //for (var i = 0; i < UsersRightsdata.length; i++) {
        //    if (UsersRightsdata[i].ModuleRouteName == "Admission") {
        //        if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
        //        }
        //        else {
        //            if ((UsersRightsdata[i].ProgramType == "T") || (UsersRightsdata[i].ProgramType == "M")) {
        //                if (UsersRightsdata[i].GridFormToOpen == 'PreYearAdmissionEntry') {
        //                    if ((AppSettings.PrevAdmNo == "") || (AppSettings.PrevAdmNo == undefined) || (AppSettings.PrevAdmNo == 0)) {
        //                        var obj = {};
        //                        obj.SysProgName = UsersRightsdata[i].SysProgName;
        //                        obj.SysProgID = UsersRightsdata[i].SysProgID;
        //                        obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
        //                        obj.PrgImgClass = UsersRightsdata[i].PrgImgClass;
        //                        obj.IsActive = UsersRightsdata[i].IsActive;
        //                        programsList.push(obj);
        //                    } else {
        //                    }
        //                } else {
        //                    if (UsersRightsdata[i].GridFormToOpen != 'CollegeInfo') {
        //                        var obj = {};
        //                        obj.SysProgName = UsersRightsdata[i].SysProgName;
        //                        obj.SysProgID = UsersRightsdata[i].SysProgID;
        //                        obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
        //                        obj.PrgImgClass = UsersRightsdata[i].PrgImgClass;
        //                        obj.IsActive = UsersRightsdata[i].IsActive;
        //                        programsList.push(obj);
        //                    }
        //                }
        //            } else if (UsersRightsdata[i].ProgramType == "Q") {
        //                var obj = {};
        //                obj.SysProgName = UsersRightsdata[i].SysProgName;
        //                obj.SysProgID = UsersRightsdata[i].SysProgID;
        //                obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
        //                RequestList.push(obj);
        //            } else if (UsersRightsdata[i].ProgramType == "R") {
        //                var obj = {};
        //                obj.SysProgName = UsersRightsdata[i].SysProgName;
        //                obj.SysProgID = UsersRightsdata[i].SysProgID;
        //                obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
        //                ReportsList.push(obj);
        //            }
        //        }
        //    }
        //}

        //   alert("Admission: " + programsList.length);
        //$scope.programsList = programsList;
        //$scope.RequestList = RequestList;
        //$scope.ReportsList = ReportsList;

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
            $state.go('Dadshboard.AdmissionDashboard');
        }
        $scope.MyCollege = function () {
            $state.go('Admission.CollegeInfo');

        }
        $scope.OpenStudentSearchReport = function () {
            $state.go('Dadshboard.AdmissionDashboard.SearchStudent');

        },
            $scope.Transferstudent = function () {
                $state.go('Dadshboard.AdmissionDashboard.TransferStudent');

            },
            //$scope.Transferstudent = function () {
            //    $state.go('Admission.TransferStudent');

            //}
            $scope.logOut = function () {
                sessionStorage.loggedIn = "no";
                delete $localStorage.authorizationData;

                $scope.authentication = {
                    isAuth: false,
                    UserId: 0,
                    userName: ""
                };
                $state.go('login')
            },

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
            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.download = "Studentdetails.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }



        $scope.loadYears = function () {
            AppSettings.CollegeID = 0;
            var AcademicYears = AdmissionService.GetAcademicYearsActive(AppSettings.CollegeID);
            AcademicYears.then(function (data, status, headers, config, error) {
                $scope.AcademicYears = data.Table;

                //console.log($scope.AcademicYears);
                $scope.AcademicId = $scope.AcademicYears[0].AcademicId;
                AppSettings.AcademicId = $scope.AcademicYears[0].AcademicId;
                authData.AcademicId = $scope.AcademicYears[0].AcademicId;


                if ($scope.userType == '1' || $scope.userType == '5' || $scope.userType == '1002' || $scope.userType == '1007' || $scope.userType == '1009' || $scope.userType == '1000' || $scope.userType == '1013' || $scope.userType == '1011' || $scope.userType == '1012' || $scope.userType == '1014' || $scope.userType == '1015') {
                    //  $scope.LoadImg = true;
                    $scope.StudentDetailsFound = false;
                    $scope.CollegeDetailsFound = false;
                    if ($localStorage.collegeDetails !== undefined && $localStorage.collegeDetails.CollegeCode !== undefined) {
                        $scope.college = $localStorage.collegeDetails.CollegeCode
                    }
                    if ($localStorage.collegeDetails !== undefined && $localStorage.collegeDetails.AcademicYearId !== undefined) {
                        $scope.AcademicYearId = $localStorage.collegeDetails.AcademicYearId;
                    }
                    //var CollegesInfo = AdmissionService.GetCollegesSchemeSemInfo(AppSettings.CollegeID);
                    //CollegesInfo.then(function (data) {
                    //if (data.Table.length > 0) {
                    //    $scope.collegeinfo = data.Table;                          
                    //if ($scope.collegeinfo[0].CollegeCode != null) {
                    //    $scope.college = $scope.collegeinfo[0].CollegeCode;
                    //    AppSettings.College_Name = $scope.collegeinfo[0].college_name;
                    //} else {
                    //    $scope.college = authData.userName;
                    //    AppSettings.College_Name = authData.College_Name;
                    //}
                    var AcademicYearId = $scope.AcademicId;
                    authData.AcdYrID = AcademicYearId;
                    var hodData = AdmissionService.GetDataForAdmissionDashboard(authData.SysUserID, $scope.college.trim(), $scope.AcademicYearId);
                    hodData.then(function (hodData, status, headers, config, error) {
                        $scope.hodData = hodData;
                        console.log($scope.hodData);
                        //  $scope.LoadImg = false;
                        $scope.$emit('hideLoading', data);
                        $scope.StudentDetailsFound = true;
                        $scope.CollegeDetailsFound = true;
                        // alert(hodData.Table2[0].AcademicId);
                        if (hodData.Table[0].AcademicId == undefined) {
                            $scope.Academic = "";
                        } else {
                            $scope.Academic = hodData.Table[0].AcademicId;

                        }
                        var OnRoll = 0;
                        var Alloted = 0;
                        var AadharNotUpdated = 0;
                        var DataNotUpdated = 0;
                        var AttendeeIdNotGenerated = 0;
                        var AadharNotUpdated = 0;
                        var PinNotGenerated = 0;
                        var Intake = 0;
                        for (var i = 0; i < hodData.Table1.length; i++) {
                            if (hodData.Table1[i].OnRoll != null)
                                OnRoll = OnRoll + hodData.Table1[i].OnRoll;
                            if (hodData.Table1[i].Alloted != null)
                                Alloted = Alloted + hodData.Table1[i].Alloted;
                            if (hodData.Table1[i].AadharNotUpdated != null)
                                AadharNotUpdated = AadharNotUpdated + hodData.Table1[i].AadharNotUpdated;
                            if (hodData.Table1[i].DataNotUpdated != null)
                                DataNotUpdated = DataNotUpdated + hodData.Table1[i].DataNotUpdated;
                            if (hodData.Table1[i].AttendeeIdNotGenerated != null)
                                AttendeeIdNotGenerated = AttendeeIdNotGenerated + hodData.Table1[i].AttendeeIdNotGenerated;
                            if (hodData.Table1[i].PinNotGenerated != null)
                                PinNotGenerated = PinNotGenerated + hodData.Table1[i].PinNotGenerated;
                        }
                        $scope.OnRoll = OnRoll;
                        $scope.Alloted = Alloted;
                        $scope.AadharNotUpdated = AadharNotUpdated;
                        $scope.DataNotUpdated = DataNotUpdated;
                        $scope.AttendeeIdNotGenerated = AttendeeIdNotGenerated;
                        $scope.PinNotGenerated = PinNotGenerated;
                        //  $scope.$digest();
                    }, function (error) {
                        alert("data not found");
                        $scope.$emit('hideLoading', data);
                    });
                }

                //    }, function (error) {
                //        alert(error);
                //    });
                //}
                else {

                    var AcademicYearId;
                    if ($scope.AcademicId == null)
                        AcademicYearId = 0;
                    else
                        AcademicYearId = $scope.AcademicId;

                    if (AcademicYearId != null && AcademicYearId != '0') {
                        //   $scope.LoadImg = true;
                        $scope.StudentDetailsFound = false;
                        $scope.CollegeDetailsFound = false;

                        var hodData = AdmissionService.GetDataForAdmissionDashboard(authData.SysUserID, $scope.College_Code.trim(), AcademicYearId);
                        hodData.then(function (hodData, status, headers, config, error) {
                            $scope.hodData = hodData;
                            $scope.$emit('hideLoading', data);
                            //  $scope.LoadImg = false;
                            $scope.StudentDetailsFound = true;
                            $scope.CollegeDetailsFound = true;
                            //console.log(hodData);
                            // $scope.Academic = hodData.Table2[0].AcademicId;
                            // alert(hodData.Table[0].BankIfsc);
                            var OnRoll = 0;
                            var Alloted = 0;
                            var AadharNotUpdated = 0;
                            var DataNotUpdated = 0;
                            var AttendeeIdNotGenerated = 0;
                            var AadharNotUpdated = 0;
                            var PinNotGenerated = 0;
                            for (var i = 0; i < hodData.Table1.length; i++) {
                                if (hodData.Table1[i].OnRoll != null)
                                    OnRoll = Intake + OnRoll.Table1[i].OnRoll;
                                if (hodData.Table1[i].Alloted != null)
                                    Alloted = Alloted + hodData.Table1[i].Alloted;
                                if (hodData.Table1[i].AadharNotUpdated != null)
                                    AadharNotUpdated = AadharNotUpdated + hodData.Table1[i].AadharNotUpdated;
                                if (hodData.Table1[i].DataStatus != null)
                                    DataNotUpdated = DataNotUpdated + hodData.Table1[i].DataNotUpdated;
                                if (hodData.Table1[i].AttendeeIdNotGenerated != null)
                                    AttendeeIdNotGenerated = AttendeeIdNotGenerated + hodData.Table1[i].AttendeeIdNotGenerated;
                                if (hodData.Table1[i].PinNotGenerated != null)
                                    PinNotGenerated = PinNotGenerated + hodData.Table1[i].PinNotGenerated;
                            }
                            $scope.OnRoll = OnRoll;
                            $scope.Alloted = Alloted;
                            $scope.AadharNotUpdated = AadharNotUpdated;
                            $scope.DataNotUpdated = DataNotUpdated;
                            $scope.AttendeeIdNotGenerated = AttendeeIdNotGenerated;
                            $scope.PinNotGenerated = PinNotGenerated;
                        }, function (error) {
                            $scope.$emit('hideLoading', data);
                            alert(error);
                        });
                    } else {
                        alert('AcademicId is undefined');
                        $scope.$emit('hideLoading', data);
                    }
                }


            }, function (error) {
                $scope.$emit('hideLoading', data);
                alert(error);
            });
        }
        $scope.loadAdmissionDataByYear = function (AcademicYearId) {
            if ($scope.CollegeID == 0) {
                //   $scope.LoadImg = true;
                $scope.StudentDetailsFound = false;
                $scope.CollegeDetailsFound = false;
                var CollegesInfo = AdmissionService.GetCollegesSchemeSemInfo(AppSettings.CollegeID);
                CollegesInfo.then(function (data) {
                    if (data.Table.length > 0) {
                        $scope.collegeinfo = data.Table;
                        $scope.college = $scope.collegeinfo[0].CollegeCode.trim();
                        var AcademicYear = AcademicYearId;
                        var AcademicYear = $scope.AcademicId;
                        var hodData = AdmissionService.GetDataForAdmissionDashboard(authData.SysUserID, $scope.college, AcademicYearId);
                        hodData.then(function (hodData, status, headers, config, error) {
                            $scope.hodData = hodData;
                            //   $scope.LoadImg = false;
                            $scope.$emit('hideLoading', data);
                            $scope.StudentDetailsFound = true;
                            $scope.CollegeDetailsFound = true;
                            // alert(hodData.Table2[0].AcademicId);
                            $scope.Academic = hodData.Table[0].AcademicId;
                            //  $scope.$digest();
                        }, function (error) {
                            alert("data not found");
                            $scope.$emit('hideLoading', data);
                        });
                    } else {
                        alert("data not found");
                        $scope.$emit('hideLoading', data);
                    }

                }, function (error) {
                    alert(error);
                    $scope.$emit('hideLoading', data);
                });
            }
            else {

                var AcademicYearId;
                if (document.getElementById("AcademicYear") == null)
                    AcademicYearId = 0;
                else
                    AcademicYearId = document.getElementById("AcademicYear").value;

                if (AcademicYearId != null && AcademicYearId != '0') {
                    $scope.LoadImg = true;
                    $scope.StudentDetailsFound = false;
                    $scope.CollegeDetailsFound = false;
                    var hodData = AdmissionService.GetDataForAdmissionDashboard(authData.SysUserID, $scope.College_Code.trim(), AcademicYearId);
                    hodData.then(function (hodData, status, headers, config, error) {
                        $scope.hodData = hodData;
                        //  $scope.LoadImg = false;
                        $scope.$emit('hideLoading', data);
                        $scope.StudentDetailsFound = true;
                        $scope.CollegeDetailsFound = true;
                        //console.log(hodData);
                        // $scope.Academic = hodData.Table2[0].AcademicId;
                        // alert(hodData.Table[0].BankIfsc);

                        var OnRoll = 0;
                        var Alloted = 0;
                        var AadharNotUpdated = 0;
                        var DataNotUpdated = 0;
                        var AttendeeIdNotGenerated = 0;
                        var AadharNotUpdated = 0;
                        var PinNotGenerated = 0;
                        for (var i = 0; i < hodData.Table1.length; i++) {
                            if (hodData.Table1[i].OnRoll != null)
                                OnRoll = Intake + OnRoll.Table1[i].OnRoll;
                            if (hodData.Table1[i].Alloted != null)
                                Alloted = Alloted + hodData.Table1[i].Alloted;
                            if (hodData.Table1[i].AadharNotUpdated != null)
                                AadharNotUpdated = AadharNotUpdated + hodData.Table1[i].AadharNotUpdated;
                            if (hodData.Table1[i].DataStatus != null)
                                DataNotUpdated = DataNotUpdated + hodData.Table1[i].DataNotUpdated;
                            if (hodData.Table1[i].AttendeeIdNotGenerated != null)
                                AttendeeIdNotGenerated = AttendeeIdNotGenerated + hodData.Table1[i].AttendeeIdNotGenerated;
                            if (hodData.Table1[i].PinNotGenerated != null)
                                PinNotGenerated = PinNotGenerated + hodData.Table1[i].PinNotGenerated;
                        }
                        $scope.OnRoll = OnRoll;
                        $scope.Alloted = Alloted;
                        $scope.AadharNotUpdated = AadharNotUpdated;
                        $scope.DataNotUpdated = DataNotUpdated;
                        $scope.AttendeeIdNotGenerated = AttendeeIdNotGenerated;
                        $scope.PinNotGenerated = PinNotGenerated;
                        //  $scope.$digest();
                    }, function (error) {
                        alert(error);
                        $scope.$emit('hideLoading', data);
                    });
                } else {
                    // alert('AcademicId is undefined');
                    $scope.$emit('hideLoading', data);
                }
            }
        }

        $scope.DownloadtoExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "Studentdetails.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }

        $scope.DownloadtoPdf = function (tableid) {

            var hodData = AdmissionService.GetDataForAdmissionDashboard(authData.SysUserID, $scope.College_Code.trim(), 6);
            hodData.then(function (result) {
                if (result != "") {
                    $scope.tempDetails = {};
                    var file = new Blob([result.Table1], { type: 'application/pdf' });
                    var fileURL = URL.createObjectURL(file);
                    var date = new Date();
                    var fileName = "AdmissionSummary(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                }

            }, function () {



            });


            //var height = $(tableid).height();
            //$(tableid).height('auto');
            //var scaleBy = 5;
            //var w = 1000;
            //var h = 1000;

            //var div = document.querySelector(tableid);
            //var canvas = document.createElement('canvas');
            //canvas.width = w * scaleBy;
            //canvas.height = h * scaleBy;
            //canvas.style.width = w + 'px';
            //canvas.style.height = h + 'px';
            //var context = canvas.getContext('2d');
            //context.scale(scaleBy, scaleBy);
            //html2canvas(div, {
            //   // canvas: canvas,
            //    onrendered: function (canvas) {
            //        thecanvas = canvas;
            //        var data = thecanvas.toDataURL();

            //        var docDefinition = {
            //            content: [{
            //                image: data,
            //                width: 500
            //            }],
            //        };
            //        pdfMake.createPdf(docDefinition).download("Table.pdf");

            //    }
            //});
        }

        $scope.showDetails = function (dataTypeId, Schemeid, Semesterid, Branchid) {
            var AcademicYearId = 0;
            if ($scope.AcademicId == null || $scope.AcademicId == "? undefined:undefined ?")
                AcademicYearId = $scope.AcademicId;
            else
                AcademicYearId = $scope.AcademicId;
            var collegecode = $scope.college;
            if (collegecode == undefined || collegecode == null) {
                authData.College_Code = $scope.College_Code;
            } else {
                authData.College_Code = collegecode;
            } $scope.dataTypeId = dataTypeId;

            // AppSettings.College_Code = collegecode;
            authData.SchemeId = Schemeid;
            authData.SemesterId = Semesterid;
            authData.BranchId = Branchid;
            authData.AcdYrID = AcademicYearId;
            localStorage.setItem('dataTypeId', $scope.dataTypeId);
            localStorage.setItem('GetDataType', 'OnRole');

            $state.go('Dashboard.AdmissionDashboard.Admission.StudentRegList');
            //$state.go('Admission.StudentRegList');
        }

        $scope.DataNotUpdateds = function (dataTypeId, Schemeid, Semesterid, Branchid) {
            localStorage.removeItem('dataTypeId');
            var AcademicYearId = 0;

            if ($scope.AcademicId == null || $scope.AcademicId == "? undefined:undefined ?")
                AcademicYearId = $scope.AcademicId;
            else
                AcademicYearId = $scope.AcademicId;
            // alert("Academic Year : " + AcademicYearId);
            // alert("scheme : " + Schemeid + " Semester : " + Semesterid + "Branch : " + Branchid + "Academic Year : " + AcademicYearId);
            // var collegecode = document.getElementById("CollegeName").value;
            var collegecode = $scope.college;
            if (collegecode == undefined || collegecode == null) {
                authData.College_Code = $scope.College_Code;
            } else {
                authData.College_Code = collegecode;
            }
            //  $scope.dataTypeId = dataTypeId;
            // AppSettings.College_Code = collegecode;
            authData.SchemeId = Schemeid;
            authData.SemesterId = Semesterid;
            authData.BranchId = Branchid;
            authData.AcdYrID = AcademicYearId;
            localStorage.setItem('dataTypeId', dataTypeId);
            localStorage.setItem('GetDataType', 'DataNotUpdated');

            $state.go('Dashboard.AdmissionDashboard.Admission.StudentRegList');
            //$state.go('Admission.StudentRegList');
        }

        $scope.AadharNotVerified = function (Schemeid, Semesterid, Branchid) {
            //alert("scheme : "+Schemeid+" Semester : "+Semesterid+"Branch : "+Branchid +"Academic Year : "+AcademicYearid);
            var AcademicYearId = 0;

            //alert(document.getElementById("AcademicYear").value);
            if ($scope.AcademicId == null || $scope.AcademicId == "? undefined:undefined ?")
                AcademicYearId = $scope.AcademicId;
            else
                AcademicYearId = $scope.AcademicId;
            // alert("Academic Year : " + AcademicYearId);
            // alert("scheme : " + Schemeid + " Semester : " + Semesterid + "Branch : " + Branchid + "Academic Year : " + AcademicYearId);
            // var collegecode = document.getElementById("CollegeName").value;
            var collegecode = $scope.college;
            if (collegecode == undefined || collegecode == null) {
                authData.College_Code = $scope.College_Code;
            } else {
                authData.College_Code = collegecode;
            }

            // AppSettings.College_Code = collegecode;
            authData.SchemeId = Schemeid;
            authData.SemesterId = Semesterid;
            authData.BranchId = Branchid;
            authData.AcdYrID = AcademicYearId;
            localStorage.setItem('dataTypeId', $scope.dataTypeId);
            localStorage.setItem('GetDataType', 'AadharNotVerified');

            $state.go('Dashboard.AdmissionDashboard.Admission.StudentRegList');
            //$state.go('Admission.StudentRegList');
        }

        $scope.openNext = function (dataTypeId, Schemeid, Semesterid, Branchid) {
            alert(dataTypeId);
            authData.SchemeId = Schemeid;
            authData.SemesterId = Semesterid;
            authData.BranchId = Branchid;
            if ($scope.AcademicId == null || $scope.AcademicId == "? undefined:undefined ?")
                AcademicYearId = $scope.AcademicId;
            else
                AcademicYearId = $scope.AcademicId;
            authData.AcdYrID = AcademicYearId;
            $scope.dataTypeId = dataTypeId;
            localStorage.setItem('dataType', $scope.dataTypeId);
            $state.go('Dashboard.AdmissionDashboard.Admission.StudentRegList');

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



            var hodData = AdmissionService.GetDataForAdmissionDashboard($scope.SysUserID, $scope.college, AcademicYear);
            hodData.then(function (hodData, status, headers, config, error) {

                $scope.hodData = hodData;
                //   $scope.LoadImg = false;
                $scope.$emit('hideLoading', data);
                $scope.StudentDetailsFound = true;
                $scope.CollegeDetailsFound = true;
                // alert(hodData.Table2[0].AcademicId);

                $scope.Academic = hodData.Table[0].AcademicId;
                //  $scope.$digest();
            }, function (error) {
                $scope.$emit('hideLoading', data);
                alert("data not found");
            });
        }
    });
});







