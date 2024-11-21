define(['app'], function (app) {
    app.controller("marksEntryReportsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MarksEntryService, AssessmentService, Excel, $timeout) {
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        $scope.College_Code = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;
        $scope.College_Name = authData.College_Name;
        AppSettings.userName = authData.userName;
        $scope.BranchId = authData.BranchId;
        $scope.CollegeID = authData.CollegeID;
        $scope.ShowSetDates = false;
        $scope.clg_reports = false;
        $scope.NoResult = false;
        $scope.responseData = false;
        $scope.userType = authData.SystemUserTypeId;

        $scope.OpenDashboard = function () {

            // $scope.homeDashBoard = true;
            $state.go("Dashboard");
        }

        $scope.GetExamMonthYearsData = function () {
            let academicId = $scope.years.AcademicID;
            var EmYears = AssessmentService.GetExamMonthYearAcademicYear(academicId);
            EmYears.then(function (response) {
                console.log(response)
                $scope.ExamMonthYears = response.Table;
            },
                function (error) {
                    alert("error while loading semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }

        if ($scope.userType == "1" || $scope.userType == "5" || $scope.userType == "1000" || $scope.userType == "1010" || $scope.userType == "1011" || $scope.userType == "1002" || $scope.userType == "1007" || $scope.userType == "1009" || $scope.userType == "1012") {
            $scope.access1 = true;
            $scope.access2 = false;
            $scope.access3 = false;
        } else if ($scope.userType == "2") {
            $scope.access2 = true;
            $scope.access1 = false;
            $scope.access3 = false;
        } else if ($scope.userType == "3") {
            $scope.access3 = true;
            $scope.access2 = false;
            $scope.access1 = false;

        }
        var regex = /^\d+$/;
        var temp = regex.test($scope.userName);
        var selectedsemister = '';
        $scope.exams = [];
        $localStorage.assessment = {};

        var LoadExamTypeBysem = MarksEntryService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });
        var LoadActiveSemesters = AssessmentService.getAllSemesters();
        LoadActiveSemesters.then(function (response) {
            $scope.AllSemesters = response.Table;

        },
            function (error) {
                alert("error while loading semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
            });



        //var AcademicYearsActive = AssessmentService.GetAcademicYearsActive();
        //AcademicYearsActive.then(function (response) {

        //    // $scope.AcademicYearsActive = response.Table[0].AcademicYear;
        //    $scope.years = response.Table[0];
        //    // $scope.GetMarksEntryDatesList();
        //},
        //    function (error) {
        //        alert("error while loading Academic Year");
        //    });

        // for getting Current Academic year

        var AcademicYearActive = AssessmentService.GetAcademicYearsActive();
        AcademicYearActive.then(function (response) {
            // $scope.years = response.Table[0];
            $scope.yearslist = response.Table;
            //if ($scope.years.AcademicID !== null && $scope.years.AcademicID !== 'undefined') {
            //    let academicId = $scope.years.AcademicID;


            //} else {
            //    $scope.MarksEntryData = [];

            //}
        },
            function (error) {
                alert("error");
            });

        $scope.setAcademicYears = function (years) {
            $scope.expanded = false
          
            try {
                $scope.years = JSON.parse(years);
                $scope.GetExamMonthYearsData()
               
            } catch (err) { }

        }

        $scope.sems = [];
        $scope.selsem = "";
        var loadActiveSemister = AssessmentService.getSemistersSetData();
        loadActiveSemister.then(function (response) {
            if (response.Table.length > 0) {

                $scope.sems = response.Table;
                var toggleStatus = true;
                angular.forEach($scope.AllSemesters, function (itm) { itm.selected = toggleStatus; });
                $scope.arr = [];
                angular.forEach($scope.AllSemesters, function (value, key) {
                    if (value.selected === true) {
                        $scope.arr.push({ "semid": value.SemId })
                    }
                });
                $scope.isAllSelectedSem = true;
               


            }
        });

     

        $scope.getSemestersByScheme = function (data) {
            var dat = JSON.parse(data)
            $scope.schemeId = dat.SchemeId
            $scope.scheme = dat.Scheme;
            var LoadSemByScheme = AssessmentService.getSemBySchemes($scope.StudentTypeId, $scope.schemeId)
            LoadSemByScheme.then(function (response) {
                if (response.length > 0) {
                    $scope.UserSemesters = response;
                } else {
                    // $scope.Examtypes = [];
                    alert("No Sem found on this Record");
                }


            },
                function (error) {
                    alert("error while loading Semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });

        }





        $scope.OpenAssessmentModule = function (RouteName) {

            $localStorage.assessment = {};
            var Assesment = {
                RouteName: RouteName,
                AcademicYearsActiveResponse: $scope.years,
                selectedsem: $scope.selsem,
                Scheme: $scope.scheme,
                SchemeId: $scope.schemeId,
                branchName: $scope.branch,
                AssessmentmodulesList: $scope.AssessmentmodulesList,
                branchCode: branchCode == null ? "" : branchCode,
                loadedScheme: $scope.loadedScheme,
                ExamMonthYear: $scope.ExamMonthYear
            };

            $localStorage.assessment = Assesment;
            if (RouteName == "Theory") {

                var strroute = 'Dashboard.AssessmentDashboard.TheoryEvents';
            } else if (RouteName == "Practicals") {

                var strroute = 'Dashboard.AssessmentDashboard.PracticalEvents';
            }
            else if (RouteName.ModuleRouteName == "Rubrics") {
                var strroute = 'Dashboard.AssessmentDashboard.RubricsSubjectStatus';
            }

            $state.go(strroute);
        }
        $scope.openSearchPin = function () {
            $state.go('Dashboard.SearchPin');
        }

        $scope.LoadSemisters = function () {

            var LoadActiveSemesters = AssessmentService.getActiveSemester();
            LoadActiveSemesters.then(function (response) {
                $scope.ActiveSemesters = response.Table;

            },
                function (error) {
                    alert("error while loading semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });

        }


        $scope.getSchemeCategory = function (StudentTypeId) {
        
            //console.log(student)
            //$scope.SelStudent = JSON.parse(student);
            //$scope.StudentTypeId = $scope.SelStudent.id
            $scope.StudentTypeId = StudentTypeId
            var LoadActiveSchemes = AssessmentService.getSchemes(StudentTypeId);
            LoadActiveSchemes.then(function (response) {
                $scope.getActiveSchemes = response;
            },
                function (error) {
                    alert("error while loading Schemes");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }


        $scope.getExamCategory = function (StudentTypeId,selsem,ExamMonthYear) {
            $scope.StudentTypeId = StudentTypeId;
          
            var sem = JSON.parse(selsem)
            $scope.selsem = sem
            $scope.Semester = sem.sem
            //$scope.SelStudent = JSON.parse(student);
            //// console.log($scope.StudentTypeId)
            // var LoadActiveSchemes = AssessmentService.getSchemes($scope.StudentTypeId);
            // LoadActiveSchemes.then(function (response) {
            //     $scope.getActiveSchemes = response;
            // },
            // function (error) {
            //     alert("error while loading Schemes");
            //     var err = JSON.parse(error);
            //     console.log(err.Message);
            // });
            try {
                $scope.SelStudent = JSON.parse(student);
                $scope.selsem = JSON.parse(selsem);
                $scope.Semester = JSON.parse(selsem.sem);

            } catch (ex) {

            }
            if ($scope.StudentTypeId == 2 || $scope.StudentTypeId == 1) {
                $scope.schemeId = $scope.schemeId;
                $scope.SemesterId = $scope.selsem.semid;
                $scope.StudentId = $scope.StudentTypeId;
            } else {
                $scope.schemeId = $scope.selsem.current_schemeid;
                $scope.SemesterId = $scope.selsem.semid;
                $scope.StudentId = $scope.StudentTypeId;
            }

            //if ($scope.selsem == undefined || $scope.selsem == "") {
            //    return;
            //}
            //if ($scope.SelStudent == undefined || $scope.SelStudent=="") {
            //    return;
            //}
            if ($scope.ExamMonthYear == null || $scope.ExamMonthYear == '') {
                $scope.ExamMonthYear = ExamMonthYear
            }
           
           
            if ($scope.StudentId != undefined && $scope.StudentId != "" && $scope.SemesterId != undefined && $scope.schemeId != "") {
                $scope.LoadSchemeForSemester($scope.selsem);
                var schemewiseExams = AssessmentService.getSchemeWiseExamTypes(parseInt($scope.years.AcademicID), $scope.StudentId, $scope.schemeId, $scope.SemesterId, $scope.ExamMonthYear);
                schemewiseExams.then(function (response) {

                    if (response.length > 0) {
                        var modulesList = [];
                        if (response.length > 0) {
                            for (var i = 0; i < response.length; i++) {
                                var obj = {};
                                obj.SysModName = response[i].ExamType;
                                obj.SysModID = response[i].SubjectTypeId;
                                obj.ModuleRouteName = response[i].RouteName;
                                obj.ModuleImageClass = response[i].Class;
                                modulesList.push(obj);

                            }
                            $scope.ExamCategory = modulesList;
                        } else {
                            $scope.ExamCategory = [];
                            alert("Marks Not Available for this semester");
                        }
                    }
                    else {
                        $scope.ExamCategory = [];
                        alert("Marks Not Available for this semester");
                    }
                }, function (error) {
                    $scope.ExamCategory = [];
                    alert("error while getting data");
                });
            }

        }


        $scope.setActiveSemisters = function (selsem) {

            $scope.AssessmentmodulesList = [];
            selsemister = selsem;
            var selecsem = selsem;
            var schemewiseExams = AssessmentService.getSchemewiseExams(selecsem.current_schemeid);
            schemewiseExams.then(function (response) {
                if (response.length > 0) {
                    $scope.nodata = false;
                    var ExamNameslist = [];
                    var totallist = [];
                    response.forEach(function (res) {
                        if (!ExamNameslist.includes(res.ExamType))
                            ExamNameslist.push(res.ExamType);

                    });

                    $scope.addData = function (id, name) {
                        return {
                            id: id,
                            examname: name
                        };
                    }



                    for (let i = 0; i < ExamNameslist.length; i++) {
                        var obj1 = [];
                        var examnamelist = [];
                        var assessmentRouteList = {};
                        response.forEach(function (res1) {
                            if (res1.ExamType === ExamNameslist[i]) {
                                obj1.push(res1);
                            }
                        });
                        var idList = [];
                        obj1.forEach(function (res) {
                            if (!idList.includes(res.examtypeid))
                                idList.push(res.examtypeid);
                            var temp = $scope.addData(res.examtypeid, res.ExamNames);
                            examnamelist.push(temp);
                        });
                        for (var j = 0; j < obj1.length; j++) {
                            obj1[j].ExamNames = examnamelist;
                        }
                        var finalnamelist = obj1;

                        assessmentRouteList['ExamNames'] = finalnamelist[0].ExamNames;
                        assessmentRouteList['SysModName'] = ExamNameslist[i];
                        assessmentRouteList['ModuleRouteName'] = ExamNameslist[i];
                        assessmentRouteList['SysModID'] = ExamNameslist[i];
                        assessmentRouteList['ModuleImageClass'] = finalnamelist[0].ModuleImageClass;
                        $scope.AssessmentmodulesList.push(assessmentRouteList);
                    }



                }
                else {
                    var ExamNameslist = [];
                    var totallist = [];
                    $scope.AssessmentmodulesList = [];
                    $scope.nodata = true;
                }
            }, function (error) {
                alert("error while getting data");
            });
        }



        //    }
        //    else {
        //            alert('your are not authorised to access this.')
        //            $state.go('Dashboard');
        //}
        //}
       
        //setTimeout(function () { $scope.closeCheckbox() }, 3000);
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        $scope.College_Code = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;
        $scope.College_Name = authData.College_Name;
        AppSettings.userName = authData.userName;
        $scope.BranchId = authData.BranchId;
        $scope.CollegeID = authData.CollegeID;
        $scope.ShowSetDates = false;

        //var regex = /^\d+$/;
        //var temp = regex.test($scope.userName);

        $scope.exams = [];
        $localStorage.assessment = {};
        if ($scope.userType == "1" || $scope.userType == "5" || $scope.userType == "1000" || $scope.userType == "1010" || $scope.userType == "1011" || $scope.userType == "1002" || $scope.userType == "1007" || $scope.userType == "1009" || $scope.userType == "1012") {

            var getActiveExamTypes = AssessmentService.getActiveExamTypes();
            getActiveExamTypes.then(function (response) {
                $scope.ActiveExamTypes = response.Table;

            },
                function (error) {
                    alert("error while loading semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
            $scope.examType = function (id) {
                $scope.examTypeId = id;

            }

            $scope.ChangeStudentType = function (studentTypeId) {

                $scope.studentType = studentTypeId;

            }
            //$scope.isAllSelectedSem = false;
            $scope.toggleAll = function (isAllSelectedSem) {
                $scope.isAllSelectedSem = isAllSelectedSem;
                var toggleStatus = $scope.isAllSelectedSem;
                angular.forEach($scope.AllSemesters, function (itm) { itm.selected = toggleStatus; });
                $scope.arr = [];
                angular.forEach($scope.AllSemesters, function (value, key) {
                    if (value.selected === true) {
                        $scope.arr.push({ "semid": value.SemId })
                    }
                });

                setTimeout(function () { $scope.closeCheckbox() }, 3000);

            }

            $scope.optionToggled = function (mid1list) {
                $scope.isAllSelectedSem = $scope.AllSemesters.every(function (itm) { return itm.selected; })
                $scope.arr = [];
                angular.forEach($scope.AllSemesters, function (value, key) {
                    if (value.selected === true) {

                        $scope.arr.push({ "semid": value.SemId })
                    }

                });

                //console.log($scope.sems)

            }
            var expanded = false;
            $scope.showCheckboxes = function () {
                var checkboxes = document.getElementById("checkboxes");
                if (!expanded) {
                    checkboxes.style.display = "block";
                    expanded = true;
                } else {
                    checkboxes.style.display = "none";
                    expanded = false;
                }
            }

            $scope.closeCheckbox = function () {
                var checkboxes = document.getElementById("checkboxes");
                if (!expanded) {
                    checkboxes.style.display = "block";
                    expanded = true;
                } else {
                    checkboxes.style.display = "none";
                    expanded = false;
                }
            }

            $scope.getReport = function (ExamMonthYear) {
                var checkboxes = document.getElementById("checkboxes");
                if (expanded) {
                    checkboxes.style.display = "none";
                    expanded = false;
                } 
                $scope.clg_reports = true;
                $scope.NoResult = false;
                $scope.responseData = false;
                //if ($scope.studentType == 2) {
                //    $scope.examTypeId = 0;
                //}

                $scope.ExamMonthYear = ExamMonthYear;
              
                //console.log($scope.examTypeId, parseInt($scope.studentType), parseInt($scope.years.AcademicID), $scope.arr)
                var getCollegeReports = AssessmentService.getAdminReport($scope.examTypeId, parseInt($scope.studentType), parseInt($scope.years.AcademicID), JSON.stringify($scope.arr), $scope.ExamMonthYear);
                getCollegeReports.then(function (response) {

                    if (response.length > 0) {
                        $scope.collegeReports = response;
                        $scope.responseData = true;
                        $scope.clg_reports = false;
                        $scope.NoResult = false;

                        var Total = 0
                        var NotSubmitted = 0;
                        var NotPosted = 0;
                        var Absent = 0;
                        var MallPractice = 0;
                        var Detained = 0;
                        var DisContinued = 0;
                        var TcTaken = 0;

                        for (var i = 0; i < response.length; i++) {
                            if (response[i].Total != null)
                                Total = Total + response[i].Total;
                            if (response[i].NotSubmitted != null)
                                NotSubmitted = NotSubmitted + response[i].NotSubmitted;
                            if (response[i].NotPosted != null)
                                NotPosted = NotPosted + response[i].NotPosted;
                            if (response[i].Absent != null)
                                Absent = Absent + response[i].Absent;
                            if (response[i].MallPractice != null)
                                MallPractice = MallPractice + response[i].MallPractice;
                            if (response[i].Detained != null)
                                Detained = Detained + response[i].Detained;
                            if (response[i].DisContinued != null)
                                DisContinued = DisContinued + response[i].DisContinued;
                            if (response[i].TcTaken != null)
                                TcTaken = TcTaken + response[i].TcTaken;
                        }

                        $scope.Total = Total;
                        $scope.NotSubmitted = NotSubmitted;
                        $scope.NotPosted = NotPosted;
                        $scope.Absent = Absent;
                        $scope.MallPractice = MallPractice;
                        $scope.Detained = Detained;
                        $scope.DisContinued = DisContinued;
                        $scope.TcTaken = TcTaken;
                    } else {
                        $scope.collegeReports = [];
                        $scope.responseData = false;
                        $scope.clg_reports = false;
                        $scope.NoResult = true;
                    }
                
            }, function (error) {
                $scope.collegeReports = [];
                $scope.responseData = false;
                $scope.clg_reports = false;
                $scope.NoResult = true;
                alert("error while getting data");
            });

            }
            $scope.openCollegeReport = function (collegecode) {
                
                $localStorage.finalReport = {}
                var finalReport = {
                    collegecode: collegecode,
                    examtypeid: $scope.examTypeId,
                    studentTypeId: $scope.studentType,
                    AcademicYearsActiveResponse: $scope.years,
                    access1: $scope.access1,
                    SemsArray: $scope.arr,
                    Semester: $scope.SemesterId,
                    ExamMonthYear: $scope.ExamMonthYear
                }
                $localStorage.finalReport = finalReport;

                $state.go("Dashboard.AssessmentDashboard.FinalReports");
            }
            $scope.DownloadtoExcel = function (tableid) {
                var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
                $timeout(function () {
                    var a = document.createElement('a');
                    a.href = exportHref;
                    a.remove();
                    a.download = "collegesReport.xls";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                }, 100);
            }

            $scope.DownloadtoExcel1 = function () {
                MarksEntryService.GetDetailedAssessmentReportExcel($scope.examTypeId, parseInt($scope.studentType), parseInt($scope.years.AcademicID), JSON.stringify($scope.arr), $scope.ExamMonthYear)
                    .then(function (response) {
                        if (response != null && response.length > 1) {
                            var location = window.location.origin;
                            $scope.LoadImg = false;
                            window.location.href = response;
                            $scope.NoResult = false;
                        } else {
                            $scope.LoadImg = false;
                            alert("Error Generating The Report");
                            $scope.NoResult = true;
                        }
                    },
                        function (error) {
                            $scope.LoadImg = false;
                            alert("error data is not getting");
                            var err = JSON.parse(error);
                            console.log(err.Message);
                        });
            }

        }
        if ($scope.CollegeID == 0) {


        }

        else if ($scope.CollegeID == "0" || $scope.CollegeID != "0" && $scope.CollegeID != "") {

            var branchCode = authData.userName.split('_')[0];


            // Getting Branch Name From Branch Code

            var branchNameDetails = AssessmentService.getbranchNameById(branchCode);
            branchNameDetails.then(function (response) {
                if (response.length > 0) {
                    $scope.branch = response[0].BranchName;
                    //$scope.branchName = response.;
                }
                else {
                    $scope.branch = '';
                }

            }, function (error) {
                alert("NOt Branch login");
            });




            //loading Scheme related to sem
            $scope.LoadSchemeForSemester = function (selsem) {
                var schemeStatus = AssessmentService.getSchemeStatus();
                schemeStatus.then(function (response) {
                    var SchemesList = response.Table;
                    SchemesList.forEach(function (scheme) {
                        if (selsem.current_schemeid === scheme.SchemeID) {
                            $scope.loadedScheme = scheme.Scheme;
                        }
                    });

                }, function (error) {
                    alert("error");
                });
            }
            $scope.OpenReport = function () {
                $state.go("Dashboard.MarksSummary");
            }

            // For getting Student Type into drop down

            var LoadExamTypeBysem = MarksEntryService.getStudentType();
            LoadExamTypeBysem.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.StudentType = response.Table;
                } else {
                    $scope.StudentType = [];
                    alert("No Student found on this Record");
                }
            },
                function (error) {
                    alert("error while loading Student Types");
                    console.log(error);
                });








            $scope.OpenAssessmentModule = function (RouteName) {
                $localStorage.assessment = {};
                var Assesment = {
                    RouteName: RouteName.ModuleRouteName,
                    SubjectTypeId: RouteName.SysModID,
                    StudentTypeId: $scope.StudentId,
                    AcademicYearsActiveResponse: $scope.years,
                    selectedsem: $scope.selsem,
                    //Scheme: $scope.schemeId,
                    branchName: $scope.branch,
                    branchCode: branchCode == null ? "" : branchCode,
                    loadedScheme: $scope.loadedScheme,
                    CollegeCode: $scope.College_Code,
                    SemId: $scope.SemesterId,
                    Scheme: $scope.scheme,
                    SchemeId: $scope.schemeId,
                    AcademicYearId: parseInt($scope.years.AcademicID),
                    ExamMonthYear: $scope.ExamMonthYear

                };


                //var Assesment = {
                //    RouteName: RouteName.ModuleRouteName,
                //    AcademicYearsActiveResponse: $scope.years,
                //    selsem: $scope.SemesterId,
                //    SubjectTypeId: RouteName.SysModID,
                //    StudentTypeId: $scope.StudentId,
                //    Scheme: $scope.schemeId,
                //    branchName: $scope.branch,
                //    branchCode: branchCode == null ? "" : branchCode,
                //    loadedScheme: $scope.loadedScheme
                //};

                $localStorage.assessment = Assesment;
                if (RouteName.ModuleRouteName == "Theory") {
                    var strroute = 'Dashboard.AssessmentDashboard.TheoryEvents';
                } else if (RouteName.ModuleRouteName == "Practicals") {
                    var strroute = 'Dashboard.AssessmentDashboard.PracticalEvents';
                }
                else if (RouteName.ModuleRouteName == "Rubrics") {
                    var strroute = 'Dashboard.AssessmentDashboard.RubricsSubjectStatus';
                }

                $state.go(strroute);
            }


            $scope.AssessmentmodulesList = [];
            $scope.getExamStatus = function (exam) {
                $scope.examId = exam.id;
                $scope.homeDashBoard = false;
            }




        }
        else {
            alert('your are not authorised to access this.')
            $state.go('Dashboard');
        }






        $scope.logOut = function () {
            $scope.$emit("logout", authData.userName);
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;


            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
            $state.go('login');
        }

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

});