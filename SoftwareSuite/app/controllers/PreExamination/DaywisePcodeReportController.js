define(['app'], function (app) {
    app.controller("DaywisePcodeReportController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $timeout, $uibModal, AcademicService, PreExaminationService) {
        var authData = $localStorage.authorizationData;
        //console.log(authData)
        var ccode = "";
        $scope.UserTypeId = authData.SystemUserTypeId
        


            $scope.Submit = function () {
                $scope.loading = true;
                var getReport = PreExaminationService.GetDaywisePcodeReport($scope.AcademicYear, $scope.ExamMonthYear, $scope.StudentType, $scope.Scheme, $scope.ExamType);
                getReport.then(function (res) {
                    try {
                        var response = JSON.parse(res)
                    }
                    catch {error }
                    if (response.length > 0) {
                        $scope.loading = false;
                        $scope.DayWisePcodeReportData = response;
                        $scope.Noresult = false;
                    } else {
                        $scope.loading = false;
                        $scope.Noresult = true;

                    }
                },
                    function (error) {
                        $scope.loading = false;
                        $scope.Noresult = true;
                        $scope.data1 = false;
                        $scope.data = false;
                        alert("error while loading Report");
                        var err = JSON.parse(error);
                        $scope.result = false;
                        console.log(err.Message);
                    });
            }
        


       

        

        $scope.getDaywisePcodeExcel = function () {

            $scope.reload = true;

            var loadData1 = PreExaminationService.GetDaywisePcodeExcel($scope.AcademicYear, $scope.ExamMonthYear, $scope.StudentType, $scope.Scheme, $scope.ExamType)
            loadData1.then(function (res) {

                var data = JSON.parse(res)
                if (data[0].file) {
                    $scope.Result = true;
                    var location = data[0].file;
                    window.location.href = location;
                    $scope.reload = false;
                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.reload = false;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.reload = false;
                        alert('Something Went Wrong')
                    }

            }, function (error) {
                $scope.reload = false;
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }

        

        $scope.DownloadtoExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "MappingReport.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }

        var GetMonthYear = PreExaminationService.GetMonthYear()
        GetMonthYear.then(function (response) {

            $scope.GetExamMonthYear = response.Table;


        },
            function (error) {
                alert("data is not loaded");

            });

        var Getexam = PreExaminationService.GetMonthYears()
        Getexam.then(function (response) {

            $scope.GetExamMonthYears = response.Table;


        },
            function (error) {
                alert("data is not loaded");

            });
     

        var getsems = PreExaminationService.GetAllSemesters();
        getsems.then(function (res) {
            //var res = JSON.parse(res);
            $scope.semestersData = res.Table;

        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });

        var getScheme = AcademicService.getScheme();
        getScheme.then(function (response) {
            $scope.GetSemester = response.Table;

        },
            function (error) {
                alert("error while loading Report");

            });

        var getStdtype = PreExaminationService.GetStudentTypes();
        getStdtype.then(function (response) {
            $scope.StudentTypes = response.Table;

        },
            function (error) {
                alert("error while loading Report");

            });

        var getexamtype = PreExaminationService.getExamTypesForExamCenters();
        getexamtype.then(function (response) {
            try {
                var Res = JSON.parse(response);
            }
            catch { error };
            $scope.ExamTypesData = Res.Table;

        },
            function (error) {
                alert("error while loading Report");

            });

       



    })
   
  
})