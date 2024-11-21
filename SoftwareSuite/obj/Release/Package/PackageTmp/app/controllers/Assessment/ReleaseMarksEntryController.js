define(['app'], function (app) {
    app.controller("ReleaseMarksEntryController", function ($scope, $http, $localStorage, $state, $uibModal, $stateParams, AppSettings, StudentRegService, $uibModal, $timeout, PracticalsService,AssessmentService,MarksEntryService,PreExaminationService) {
        var authData = $localStorage.authorizationData;
       // console.log(authData)

        //$scope.userName = authData.userName;
        $scope.UserName = authData.userName;
        //var BranchCode = authData.userName;
        $scope.UserTypeId = authData.SystemUserTypeId;
        if ($scope.UserTypeId == 2) {
            $scope.College = authData.College_Code
            var Branch = PreExaminationService.getBranchsByCollegeCode($scope.College);
            Branch.then(function (response) {
                var response = JSON.parse(response);
                if (response.Table.length > 0) {
                    $scope.branchdata = response.Table;
                } else {
                    $scope.branchdata = [];
                    alert("No Student found on this Record");
                }
            },
                function (error) {
                    alert("error while loading Branchs");
                    console.log(error);
                });
        }
       

        var GetCollegeList = StudentRegService.GetColleges();
        GetCollegeList.then(function (data) {
            if (data.Table.length > 0) {
                $scope.GetCollegeList = data.Table;

            } else {
                alert("Colleges not found.");
                $scope.GetCollegeList = [];
            }

        }, function (error) {
            console.log(error);
            $scope.GetCollegeList = [];
        });

        $scope.setAcademicYear = function (years) {
            try {
                $scope.years = JSON.parse(years);
                $scope.GetExamMonthYearsData()
            } catch (err) { }

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


        $scope.LoadExamTypeBysem = function () {
            var LoadExamTypeBysem = MarksEntryService.getStudentType();
            LoadExamTypeBysem.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.StudentType = response.Table;
                    //$scope.SelectedStudent = response.Table[0].id;
                   // $scope.getSemistersSetData();
                } else {
                    $scope.StudentType = [];
                    alert("No Student found on this Record");

                }
            },
                function (error) {
                    alert("error while loading Student Types");

                });
        }

        $scope.getSemestersByScheme = function (schemeId) {
            $scope.schemeId = schemeId;
            $scope.UserSemesters = [];
            if ($scope.schemeId == undefined || $scope.schemeId == "") {
                return
            }
            var LoadSemByScheme = AssessmentService.getSemBySchemes($scope.SelStudent.id, $scope.schemeId)
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


        $scope.ChangeScheme = function () {
            var GetExamType = PreExaminationService.GetExamType($scope.SelScheme);
        GetExamType.then(function (data) {
            console.log(data)
            if (data.length > 0) {
                $scope.getExamTypes = data;
            } else {
                alert("Schemes not found.");
                $scope.getExamTypes = [];
            }

        }, function (error) {
            console.log(error);
            $scope.getExamTypes = [];
        });
        }


        var getSchemes = PreExaminationService.getSchemes();
        getSchemes.then(function (data) {
            console.log(data)
            if (data.Table.length > 0) {
                $scope.getSchemes = data.Table;
            } else {
                alert("Schemes not found.");
                $scope.getSchemes = [];
            }

        }, function (error) {
            console.log(error);
            $scope.getSchemes = [];
        });

        //var GetBranchList = StudentRegService.getActiveBranches();
        //GetBranchList.then(function (data) {
        //    if (data.Table.length > 0) {
        //        $scope.branchdata = data.Table

        //    } else {
        //        alert("Branches details not found.");
        //        $scope.branchdata = [];
        //    }

        //}, function (error) {
        //    console.log(error);
        //    $scope.branchdata = [];
        //});


        var GetSemesters = PreExaminationService.GetSemesters();
        GetSemesters.then(function (data) {
            console.log(data)
            if (data.Table.length > 0) {
                $scope.GetSemesters = data.Table;
            } else {
                alert("Branches details not found.");
                $scope.GetSemesters = [];
            }

        }, function (error) {
            console.log(error);
            $scope.GetSemesters = [];
        });
        

        var getSchemes = PreExaminationService.getSchemes();
        getSchemes.then(function (data) {
            console.log(data)
            if (data.Table.length > 0) {
                $scope.getSchemes = data.Table;
            } else {
                alert("Schemes not found.");
                $scope.getSchemes = [];
            }

        }, function (error) {
            console.log(error);
            $scope.getSchemes = [];
        });
  

        $scope.ChangeCollege = function () {
            var Branch = PreExaminationService.getBranchsByCollegeCode($scope.College);
            Branch.then(function (response) {
                var response = JSON.parse(response);
                if (response.Table.length > 0) {
                    $scope.branchdata = response.Table;
                } else {
                    $scope.branchdata = [];
                    alert("No Student found on this Record");
                }
            },
                function (error) {
                    alert("error while loading Branchs");
                    console.log(error);
                });
        }
        $scope.GetSubjectType = function () {
            var schemewiseExams = AssessmentService.getSchemeWiseExamTypes($scope.years.AcademicID, $scope.SelectedStudent, $scope.SelScheme, $scope.SelSemester, $scope.ExamMonthYear);
        schemewiseExams.then(function (response) {
            if (response.length > 0) {
                $scope.SubjectTypes = [];
                if (response.length > 0) {
                    //for (var i = 0; i < response.length; i++) {
                    //    var obj = {};
                    //    obj.SysModName = response[i].ExamType;
                    //    obj.SubjectTypeId = response[i].SubjectTypeId;
                    //    obj.ModuleRouteName = response[i].RouteName;
                    //    obj.ModuleImageClass = response[i].Class;
                    //    modulesList.push(obj);

                    //}
                    $scope.SubjectTypes = response;
                   
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

        $scope.GetSubjects = function () {
            if ($scope.SelBranch == null || $scope.SelBranch == undefined || $scope.SelBranch == '') {
                alert("Please Select Branch")
                return;
            }
            if ($scope.years.AcademicID == null || $scope.years.AcademicID == undefined || $scope.years.AcademicID == '') {
                alert("Please Select Academic Year")
                return;
            }
            if ($scope.SelScheme == null || $scope.SelScheme == undefined || $scope.SelScheme == '') {
                alert("Please Select Scheme")
                return;
            }
            if ($scope.SelSemester == null || $scope.SelSemester == undefined || $scope.SelSemester == '') {
                alert("Please Select Semester")
                return;
            }
            if ($scope.ExamMonthYear == null || $scope.ExamMonthYear == undefined || $scope.ExamMonthYear == '') {
                alert("Please Select Exam Month Year")
                return;
            }
            if ($scope.SelectedStudent == null || $scope.SelectedStudent == undefined || $scope.SelectedStudent == '') {
                alert("Please Select Student Type")
                return;
            }
           
            if ($scope.ExamType == null || $scope.ExamType == undefined || $scope.ExamType == '') {
                alert("Please Select Exam Type")
                return;
            }
            //$scope.years.AcademicID, $scope.SelectedStudent, $scope.SelScheme, $scope.SelSemester, $scope.ExamMonthYear
            var getSemSubjectsService = PracticalsService.getSemSubjects($scope.SelSemester, $scope.SelBranch, $scope.SelScheme, $scope.SubjectType, $scope.ExamType, $scope.College, $scope.SelectedStudent, $scope.years.AcademicID, $scope.ExamMonthYear);
            getSemSubjectsService.then(function (response) {
                $scope.getSemSubjectsResponse = [];
                if (response.Table !== undefined && response.Table.length > 0) {
                    $scope.LoadImgForSubject = false;
                    $scope.subjectDetailsView = true;
                    $scope.getSemSubjectsResponse = response.Table;
                }
                else {
                    $scope.LoadImgForSubject = false;
                    $scope.subjectDetailsView = false;
                    alert("no subjects");
                 //   $state.go("Dashboard.AssessmentDashboard.practicals");
                }
            }, function (error) {
                alert("some thing went wrong");
            });
        }
        
        $scope.Release = function (type, subid) {
            if (type != 0) {
           // CollegeCode, SemId, SchemeId, ExamTypeId, AcademicYearId, subid, ExamMonthYearId, UserName
            if ($scope.College == null || $scope.College == undefined || $scope.College == "") {
                alert("Please Select College")
                return;
            }
            if ($scope.years.AcademicID == null || $scope.years.AcademicID == undefined || $scope.years.AcademicID == '') {
                alert("Please Select Academic Year")
                return;
            }
            if ($scope.SelScheme == null || $scope.SelScheme == undefined || $scope.SelScheme == "") {
                alert("Please Select Scheme")
                return;
            }
            if ($scope.SelSemester == null || $scope.SelSemester == undefined || $scope.SelSemester == "") {
                alert("Please Select Semester")
                return;
            }
            if ($scope.ExamMonthYear == null || $scope.ExamMonthYear == undefined || $scope.ExamMonthYear == '') {
                alert("Please Select Exam Month Year")
                return;
            }
            if ($scope.SelectedStudent == null || $scope.SelectedStudent == undefined || $scope.SelectedStudent == '') {
                alert("Please Select Student Type")
                return;
            }
            if ($scope.ExamType == null || $scope.ExamType == undefined || $scope.ExamType == '') {
                alert("Please Select Exam Type")
                return;
            }
         
            $scope.loading = true;
                var getActiveList = PreExaminationService.ReleaseMarksEntry($scope.College, $scope.SelSemester, $scope.SelScheme, $scope.ExamType, $scope.years.AcademicID, subid, $scope.ExamMonthYear, $scope.UserName, $scope.UserTypeId);
            getActiveList.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    $scope.loading = false;
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetSubjects()
                } else if (response.Table[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetSubjects()
                }
                else {
                   alert('Something Went Wrong')
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }
            },
            function (error) {
                alert("error while Entering Marks");
                $scope.loading = false;
                $scope.Noresult = true;
                $scope.result = false;
                $scope.failResponse = response[0].ResponceDescription;
                $scope.StatisticalReports = [];
                var err = JSON.parse(error);
                console.log(err.Message);
            });
        }
        }
    })
})