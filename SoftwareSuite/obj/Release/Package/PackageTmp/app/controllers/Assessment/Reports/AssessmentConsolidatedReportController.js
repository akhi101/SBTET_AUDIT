define(['app'], function (app) {
    app.controller("AssessmentConsolidatedReportController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, StudentResultService, StudentRegService, PreExaminationService, AssessmentService, StudentWiseService) {
        var authData = $localStorage.authorizationData;

        if (authData == undefined) {
            $state.go('login');
        } else {

            $scope.UserId = authData.SysUserID;
        }

        $scope.UserTypeId = authData.SystemUserTypeId;
        if ($scope.UserTypeId == 3) {
            $scope.SelBranch = authData.BranchId
            $scope.SelectedCollege = authData.College_Code;
        }

        var AcademicYears = PreExaminationService.GetAcademicYears();
        AcademicYears.then(function (response) {
            if (response.Table.length > 0) {
                $scope.GetAcademicYears = response.Table;
            } else {
                $scope.GetAcademicYears = [];
                alert("No Academic Years Found");
            }
        },
            function (error) {
                alert("error while loading Academic Years");
                console.log(error);
            });

        $scope.loadSemExamTypes = function (data) {
            var res = JSON.parse(data)

            $scope.Schemeid = res.schemeid
            //if (dataType == 1) {
            $scope.Scheme = res.scheme
            //} else if (dataType == 2) {
            //    $scope.NrScheme1 = res.scheme
            //} else if (dataType == 3) {
            //    $scope.PostScheme = res.scheme

            //} else if (dataType == 4) {
            //    $scope.Wantingsscheme1 = res.scheme
            //} else if (dataType == 5) {
            //    $scope.UploadScheme1 = res.scheme

            //} else if (dataType == 6) {
            //    $scope.Resultsscheme1 = res.scheme
            //} else if (dataType == 7) {
            //    $scope.Logicscheme1 = res.scheme
            //} else if (dataType == 8) {
            //    $scope.Deployscheme1 = res.scheme
            //}
            var getExamType = PreExaminationService.getActiveExamTypesByScheme($scope.Scheme);
            getExamType.then(function (response) {
                var response = JSON.parse(response);
                if (response.Table.length > 0) {
                    $scope.getExamTypes = response.Table;
                } else {
                    $scope.StudentType = [];
                    alert("No Student found on this Record");
                }
            },
                function (error) {
                    alert("error while loading Exam Month Years");
                    console.log(error);
                });

        }

        $scope.GetExamMonthYearsData = function (AcademicYear) {
           // let academicId = $scope.years.AcademicID;
            var EmYears = AssessmentService.GetExamMonthYearAcademicYear(AcademicYear);
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

        $scope.sems = [];

        var loadActiveSemister = PreExaminationService.getAllSemester();
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

        var SCHEMESEMINFO = StudentResultService.GetSchemeDataForResults();
        $scope.seminfo = [];
        $scope.examtypeinfo = [];
        $scope.pin = "";
        $scope.showData = 0;
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {

                $scope.schemeinfo = data;

            }
        }, function (error) {
            alert("unable to load Schemes");
        });

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

        $scope.ChangeCollege = function () {
            var Branch = PreExaminationService.getBranchsByCollegeCode($scope.SelectedCollege);
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

        $scope.GetReport = function () {

            $scope.loading = true;
            $scope.Noresult = false
           
            var loadData1 = PreExaminationService.GetAsssessmentConsolidatedReport($scope.AcademicYear, $scope.ExamMonthYear ,$scope.SelectedCollege, $scope.SelBranch, $scope.Schemeid, $scope.SelSem, $scope.ExamTypeId)
            loadData1.then(function (res) {
                var data = JSON.parse(res)
                if (data[0].ResponceCode == '200') {
                    $scope.Noresult = false
                    $scope.loading = false;
                    var location = data[0].file;
                    window.location.href = location;

                } else if (data[0].ResponceCode == '404') {
                    $scope.Noresult = true
                    $scope.loading = false;
                    alert(data[0].ResponceDescription);
                }
                else if (data[0].ResponceCode == '400') {
                    $scope.Noresult = true
                    $scope.loading = false;
                    alert(data[0].ResponceDescription);
                } else {
                    $scope.Noresult = true
                    $scope.loading = false;
                    alert('Something Went Wrong')
                }

            }, function (error) {
                $scope.Noresult = true
                $scope.loading = false;
            });
        }

    })
})