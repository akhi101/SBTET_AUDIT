define(['app'], function (app) {
    app.controller("AssessmentController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MarksEntryService, MenuService, AssessmentService, Excel, $timeout) {
        var authData = $localStorage.authorizationData;
        console.log(authData)
        $scope.ExamCategory = [];
        $scope.userName = authData.userName;
        $scope.College_Code = authData.College_Code;

        AppSettings.College_Name = authData.College_Name;
        $scope.College_Name = authData.College_Name;
        AppSettings.userName = authData.userName;
        $scope.BranchId = authData.BranchId;
        $scope.CollegeID = authData.CollegeID;
        $scope.userType = authData.SystemUserTypeId
        $scope.ShowSetDates = false;
        $scope.clg_reports = false;
        $scope.NoResult = false;
        $scope.responseData = false;
        //alert("Under Construction will be Resumed Soon")
        //$state.go("Dashboard.AssessmentDashboard")
        var selectedsemister = '';
        $scope.exams = [];
        if ($scope.userType == "1") {
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
        var AcademicYearsActive = AssessmentService.GetAcademicYearsActive();
        AcademicYearsActive.then(function (response) {
            $scope.yearslist = response.Table;
            //  $scope.years = response.Table[0];
            //if ($scope.years.AcademicID !== null && $scope.years.AcademicID !== 'undefined') {
            //    let academicId = $scope.years.AcademicID;


            //} else {
            //    $scope.MarksEntryData = [];

            //}
            $scope.GetExamMonthYearsData()
        },
            function (error) {
                alert("error");
            });

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

        $scope.setAcademicYear = function (years) {
            try {
                $scope.years = JSON.parse(years);
                $scope.GetExamMonthYearsData()
            } catch (err) { }

        }

        if ($scope.userType == '3') {

            var branchCode = authData.userName.split('_')[0];

            //getting Branch name from Branch Code

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




            // for getting Current Academic year

            var AcademicYearsActive = AssessmentService.GetAcademicYearsActive();
            AcademicYearsActive.then(function (response) {
                $scope.yearslist = response.Table;
              //  $scope.years = response.Table[0];
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
                try {
                    $scope.years = JSON.parse(years);
                } catch (err) { }
              
            }

            $scope.getSemestersByScheme = function (schemeId) {
                $scope.schemeId = schemeId;
                $scope.UserSemesters = [];
                if ($scope.schemeId == undefined || $scope.schemeId == "") {
                    return
                }
                var LoadSemByScheme = AssessmentService.getSemBySchemes($scope.SelectedStudent, $scope.schemeId)
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





            //loading Scheme related to sem
            $scope.LoadSchemeForSemester = function (selectedsem) {
                var schemeStatus = AssessmentService.getSchemeStatus();
                schemeStatus.then(function (response) {
                    var SchemesList = response.Table;
                    SchemesList.forEach(function (scheme) {
                        if (selectedsem.current_schemeid === scheme.SchemeID) {
                            $scope.loadedScheme = scheme;
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


            $scope.LoadExamTypeBysem = function () {
                var LoadExamTypeBysem = MarksEntryService.getStudentType();
                LoadExamTypeBysem.then(function (response) {
                    if (response.Table.length > 0) {
                        $scope.StudentType = response.Table;
                        //$scope.SelectedStudent = response.Table[0].id;
                        $scope.getSemistersSetData();
                    } else {
                        $scope.StudentType = [];
                        alert("No Student found on this Record");

                    }
                },
                    function (error) {
                        alert("error while loading Student Types");

                    });
            }

            //    get semester data for which dates are set 

            $scope.getSemistersSetData = function () {
                $scope.sems = [];
                $scope.selectedsem = "";
                var loadActiveSemister = AssessmentService.getSemistersSetData();
                loadActiveSemister.then(function (response) {
                    if (response.Table.length > 0) {

                        $scope.sems = response.Table;
                        // $scope.selectedsem = $scope.sems[0].semid;
                        //  $scope.selecsem = $scope.sems[0];
                        $scope.AssessmentmodulesList = [];

                        //  $scope.getExamCategory();

                    }

                }, function (error) {
                    alert("error no data");
                });
            }

            $scope.GetActiveSchemes = function (SelectedStudent) {
                //try {
                $scope.SelectedStudent = SelectedStudent;
                //} catch (ex) {
                //}
                $scope.schemeId = "";
                $scope.SemesterId = "";
                $scope.ExamCategory = [];
                $scope.getActiveSchemes = [];
                $scope.UserSemesters = [];
                             
                var LoadActiveSchemes = AssessmentService.getSchemes($scope.SelectedStudent);
                LoadActiveSchemes.then(function (response) {
                    $scope.getActiveSchemes = response;
                },
                    function (error) {
                        alert("error while loading Schemes");
                        var err = JSON.parse(error);
                        console.log(err.Message);
                        $scope.getActiveSchemes = [];
                    });
            }

            $scope.getExamCategory = function (student, selectedsem, ExamMonthYear) {

                // console.log(student)
               // $scope.SelectedStudent = JSON.parse(student);
                //// console.log($scope.SelectedStudent)
                // var LoadActiveSchemes = AssessmentService.getSchemes($scope.SelectedStudent);
                // LoadActiveSchemes.then(function (response) {
                //     $scope.getActiveSchemes = response;
                // },
                // function (error) {
                //     alert("error while loading Schemes");
                //     var err = JSON.parse(error);
                //     console.log(err.Message);
                // });           

                try {
                  //  $scope.SelectedStudent = JSON.parse(student);
                    $scope.selsem = JSON.parse(selectedsem);

                } catch (ex) {

                }
                if ($scope.SelectedStudent == 2 || $scope.SelectedStudent == 1) {
                    $scope.schemeId = $scope.schemeId;
                    $scope.SemesterId = $scope.selsem.semid;
                    $scope.StudentId = $scope.SelectedStudent;
                } else {
                    $scope.schemeId = $scope.selsem.current_schemeid;
                    $scope.SemesterId = $scope.selsem.semid;
                    $scope.StudentId = $scope.SelectedStudent;
                }

                if ($scope.years.AcademicID == undefined || $scope.years.AcademicID == "") {
                    alert("select Academic Year");
                    return;
                }

                if ($scope.schemeId == undefined || $scope.schemeId == "") {                    
                    return;
                }
                if ($scope.SemesterId == undefined || $scope.SemesterId=="") {
                    return;
                }
                if ($scope.StudentId != undefined && $scope.StudentId != "" && $scope.SemesterId != undefined && $scope.schemeId != "") {
                    $scope.LoadSchemeForSemester($scope.selsem);
                    $scope.ExamMonthYear=ExamMonthYear
                    var schemewiseExams = AssessmentService.getSchemeWiseExamTypes($scope.years.AcademicID, $scope.StudentId, $scope.schemeId, $scope.SemesterId, $scope.ExamMonthYear);
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
                            }
                        }
                        else {
                            $scope.ExamCategory = [];
                            alert("Marks entry Not Available for this semester");
                        }
                    }, function (error) {
                        $scope.ExamCategory = [];
                        alert("error while getting data");
                    });
                }

            }




            $scope.OpenAssessmentModule = function (RouteName) {
                if ($scope.years == undefined || $scope.years == null || $scope.years == "") {
                    alert('Select Academic year.');
                    return;
                }

               
                $localStorage.assessment = {};
                var Assesment = {
                    RouteName: RouteName.ModuleRouteName,
                    SubjectTypeId: RouteName.SysModID,
                    StudentTypeId: $scope.StudentId,
                    AcademicYearsActiveResponse: $scope.years,
                    selectedsem: $scope.selsem,
                    Scheme: $scope.schemeId,
                    branchName: $scope.branch,
                    branchCode: branchCode == null ? "" : branchCode,
                    loadedScheme: $scope.loadedScheme,
                    CollegeCode: $scope.College_Code,
                     ExamMonthYear: $scope.ExamMonthYear


                };
              
               

                $localStorage.assessment = Assesment;
                if (RouteName.ModuleRouteName == "Theory") {
                    var strroute = 'Dashboard.AssessmentDashboard.theory';
                } else if (RouteName.ModuleRouteName == "Practicals") {
                    var strroute = 'Dashboard.AssessmentDashboard.practicals';
                }
                else if (RouteName.ModuleRouteName == "Rubrics") {
                    var strroute = 'Dashboard.AssessmentDashboard.RubricsMarkEntry';
                }


                $state.go(strroute);
            }


            $scope.AssessmentmodulesList = [];
            $scope.getExamStatus = function (exam) {
                $scope.examId = exam.id;
                $scope.homeDashBoard = false;
            }

            $scope.selectedsem = {};




        }
        else if ($scope.userType == '2') {

            $scope.openBranchReport = function (data) {

                $localStorage.PrincipalReports = {};
               // $scope.College_Code, $scope.examTypeId, $scope.SelectedStudent1, $scope.years.AcademicID, JSON.stringify($scope.arr), $scope.ExamMonthYear
                var PrincipalReports = {
                    AcademicYearId: $scope.years.AcademicID,
                    examtypeid: $scope.examTypeId,
                    collegecode: $scope.College_Code,
                    branchid: data.branchid,
                    subid: data.subid,
                    semid: $scope.arr,
                    studentTypeId: $scope.SelectedStudent1,
                    ExamMonthYear: $scope.ExamMonthYear

                };
                $localStorage.PrincipalReports = PrincipalReports;

                $state.go('Dashboard.AssessmentDashboard.FinalReport')
            }

            $scope.GetActiveSchemes = function (SelectedStudent1) {
                //try {
                $scope.SelectedStudent1 = SelectedStudent1;
                //} catch (ex) {
                //}
                $scope.schemeId = "";
                $scope.SemesterId = "";
                $scope.ExamCategory = [];
                $scope.getActiveSchemes = [];
                $scope.UserSemesters = [];

                var LoadActiveSchemes = AssessmentService.getSchemes($scope.SelectedStudent1);
                LoadActiveSchemes.then(function (response) {
                    $scope.getActiveSchemes = response;
                },
                    function (error) {
                        alert("error while loading Schemes");
                        var err = JSON.parse(error);
                        console.log(err.Message);
                        $scope.getActiveSchemes = [];
                    });
            }

            $scope.getSemestersByScheme = function (schemeId) {
                $scope.schemeId = schemeId;
                $scope.UserSemesters = [];
                if ($scope.schemeId == undefined || $scope.schemeId == "") {
                    return
                }
                var LoadSemByScheme = AssessmentService.getSemBySchemes($scope.SelectedStudent1, $scope.schemeId)
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

            $scope.getSemistersSetData = function () {
                $scope.sems = [];
                $scope.selectedsem = "";
                var loadActiveSemister = AssessmentService.getSemistersSetData();
                loadActiveSemister.then(function (response) {
                    if (response.Table.length > 0) {

                        $scope.sems = response.Table;
                        // $scope.selectedsem = $scope.sems[0].semid;
                        //  $scope.selecsem = $scope.sems[0];
                        $scope.AssessmentmodulesList = [];

                        //  $scope.getExamCategory();

                    }

                }, function (error) {
                    alert("error no data");
                });
            }


           
            var LoadExamTypeBysem = MarksEntryService.getStudentType();
            LoadExamTypeBysem.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.StudentType = response.Table;
                    //$scope.SelectedStudent = response.Table[0].id;
                    $scope.getSemistersSetData();
                } else {
                    $scope.StudentType = [];
                    alert("No Student found on this Record");

                }
            },
                function (error) {
                    alert("error while loading Student Types");

                });


            //var AcademicYearsActive = AssessmentService.GetAcademicYearsActive();
            //AcademicYearsActive.then(function (response) {

            //    // $scope.AcademicYearsActive = response.Table[0].AcademicYear;
            //    $scope.yearslist = response.Table;
            //    $scope.years = response.Table[0];
              
            //    $scope.GetMarksEntryDatesList();
            //},
            //function (error) {
            //    alert("error while loading Academic Year");
            //});

            $scope.GetMarksEntryDatesList = function () {
                if ($scope.years.AcademicID !== null && $scope.years.AcademicID !== 'undefined') {
                    let academicId = $scope.years.AcademicID;
                    var getMarksEntryList = MarksEntryService.GetMarksEntryDates(academicId);
                    getMarksEntryList.then(function (response) {
                        if (response.length > 0) {
                            $scope.MarksEntryData = response;
                        }
                    },
                    function (error) {
                        alert("error while Getting Mark Entry Dates");
                        var err = JSON.parse(error);
                        console.log(err.Message);
                    });

                } else {
                    $scope.MarksEntryData = [];

                }


            }
            $scope.getSemestersByScheme = function(){
            $scope.ActiveSemesters =[]
            var LoadActiveSemesters = AssessmentService.getActiveSemester();
            LoadActiveSemesters.then(function (response) {
                $scope.ActiveSemesters = response.Table;
                var toggleStatus = true;
                angular.forEach($scope.ActiveSemesters, function (itm) { itm.selected = toggleStatus; });
                $scope.arr = [];
                angular.forEach($scope.ActiveSemesters, function (value, key) {
                    if (value.selected === true) {
                        $scope.arr.push({ "semid": value.semid })
                    }
                });
                //  console.log($scope.ActiveSemesters)
            },
            function (error) {
                alert("error while loading semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
                });
            }

            $scope.toggleAll = function (isAllSelectedSem) {
                $scope.isAllSelectedSem = isAllSelectedSem;
                var toggleStatus = $scope.isAllSelectedSem;
                angular.forEach($scope.ActiveSemesters, function (itm) { itm.selected = toggleStatus; });
                $scope.arr = [];
                angular.forEach($scope.ActiveSemesters, function (value, key) {
                    if (value.selected === true) {
                        $scope.arr.push({ "semid": value.semid })
                    }
                });

                setTimeout(function () { $scope.closeCheckbox() }, 3000);

            }

            $scope.optionToggled = function (mid1list) {
                $scope.isAllSelectedSem = $scope.ActiveSemesters.every(function (itm) { return itm.selected; })
                $scope.arr = [];
                angular.forEach($scope.ActiveSemesters, function (value, key) {
                    if (value.selected === true) {

                        $scope.arr.push({ "semid": value.semid })
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


            var getActiveExamTypes = AssessmentService.getActiveExamTypes();
            getActiveExamTypes.then(function (response) {
                $scope.ActiveExamTypes = response.Table;
                console.log($scope.ActiveExamTypes)
            },
            function (error) {
                alert("error while loading semesters");
                console.log(error);
            });
            $scope.examType = function (id) {
                $scope.examTypeId = id;

            }
            $scope.ChangeStudentType = function (studentTypeId) {     
                $scope.studentType = studentTypeId;
            }


            var getActiveExamTypes = AssessmentService.getActiveExamTypes();
            getActiveExamTypes.then(function (response) {
                $scope.ActiveExamTypes = response.Table;

            },
                function (error) {
                    alert("error while loading semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });


            $scope.getAssessmentReport = function (ExamMonthYear) {
                $scope.ExamMonthYear = ExamMonthYear;
                  $scope.loading = true;
                if ($scope.studentType == 2) {
                    $scope.examTypeId = 0;
                }
                //console.log($scope.examType);
                var getCollegeReports = AssessmentService.getCollegeAssessmentReports($scope.College_Code, $scope.examTypeId, $scope.SelectedStudent1, $scope.years.AcademicID, JSON.stringify($scope.arr), $scope.ExamMonthYear);
                getCollegeReports.then(function (response) {

                    if (response.length > 0) {
                        $scope.collegeReports = response;
                        $scope.responseData = true;
                        $scope.loading = false;
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
                            if (response[i].Detained != null)
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
                        $scope.loading = false;
                        $scope.NoResult = true;
                    }



                },
                function (error) {
                    $scope.collegeReports = [];
                    $scope.loading = false;
                    $scope.NoResult = true;
                    $scope.responseData = false;
                    // var err = JSON.parse(error);
                    console.log(error);
                });
            }


        }

        $scope.DownloadtoExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "BranchReport.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }
        $scope.OpenDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("Dashboard");
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

