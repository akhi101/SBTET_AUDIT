define(['app'], function (app) {
    app.controller("FacultyMappingReportController", function ($scope, $http, $localStorage, StudentWiseService, $state, $stateParams, AppSettings, Excel, $timeout, $uibModal, AcademicService, PreExaminationService) {
        var authData = $localStorage.authorizationData;
        //console.log(authData)
        var ccode = "";
        $scope.UserTypeId = authData.SystemUserTypeId
        if ($scope.UserTypeId == 1) {
            $scope.CollegeCode = 'Admin'
            ccode = 'Admin'
        } else if ($scope.UserTypeId == 1010) {
            $scope.CollegeCode = 'ASIT'
            ccode = 'Admin'
        }
        else if ($scope.UserTypeId == 5) {
            $scope.CollegeCode = 'Helpdesk'
            ccode = 'Admin'
        }else if ($scope.UserTypeId == 1000) {
            $scope.CollegeCode = 'SECRETARY'
            ccode = 'Admin'
        } else if ($scope.UserTypeId == 1009) {
            $scope.CollegeCode = 'COE'
            ccode = 'Admin'
        } else if ($scope.UserTypeId == 1014) {
            $scope.CollegeCode = 'DS_Academic'
            ccode = 'Admin'
        
    } else if ($scope.UserTypeId == 1002) {
        $scope.CollegeCode = 'DS_PostExam'
        ccode = 'Admin'
        } else if ($scope.UserTypeId == 1011) {
            $scope.CollegeCode = 'AS_Preexam'
            ccode = 'Admin'
        } else if ($scope.UserTypeId == 1012) {
            $scope.CollegeCode = 'DS_Preexam'
            ccode = 'Admin'
        } else {
            $scope.CollegeCode = authData.College_Code
            ccode = authData.College_Code
            $scope.CollegeCode = ccode;
        }

        if ($scope.UserTypeId == 2) {


            $scope.Submit = function () {
                $scope.loading = true;
                var getReport = AcademicService.getAdminSyllabusReports($scope.scheme,$scope.AcademicYear, $scope.semester, $scope.CollegeCode);
                getReport.then(function (response) {
                    var response = JSON.parse(response)
                    if (response.Table.length > 0) {
                        //  $scope.FacultyMappingReport = response.Table;
                        $scope.loading = false;
                        $scope.FacultyMappingReport1 = response.Table1;
                        $scope.data1 = true;
                        $scope.data = false;
                        console.log(response)
                        $scope.Noresult = false;
                    } else {
                        $scope.loading = false;
                        $scope.Noresult = true;
                        $scope.data1 = false;
                        $scope.data = false;
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
        }


        $scope.Submit = function () {
            if ($scope.UserTypeId != 2 && $scope.UserTypeId != 3) {
            $scope.CollegeCode = 'Admin'
            //ccode = 'Admin'
        } 
            $scope.loading = true;
            console.log(parseInt($scope.AcademicYear), $scope.semesterarr, $scope.CollegeCode)
            var getReport = AcademicService.getAdminSyllabusReports(parseInt($scope.AcademicYear), $scope.semester, $scope.CollegeCode);
            getReport.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table.length > 0) {
                    $scope.loading = false;
                    $scope.FacultyMappingReport = response.Table;
                    $scope.data = true;
                    $scope.Noresult = false;
                    console.log(response)

                } else {
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.data1 = false;
                    $scope.data = false;
                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.data = false;
                    $scope.Noresult = true;
                    alert("error while loading Report");
                    var err = JSON.parse(error);
                    $scope.result = false;
                    console.log(err.Message);
                });
        }

        $scope.Shifts = [{ "Id": 1, "Shift": 'Shift 1' },
        { "Id": 2, "Shift": 'Shift 2' }]

        var getScheme = AcademicService.getScheme();
        getScheme.then(function (response) {
            $scope.GetSemester = response.Table;

        },
            function (error) {
                alert("error while loading Report");

            });

        $scope.GetFactultyMappingExcel = function () {

            $scope.reload = true;

            var loadData1 = PreExaminationService.GetFacultyMappingExcel($scope.AcademicYear, $scope.semesterarr, $scope.CollegeCode)
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

        $scope.openDetails = function (CollegeCode) {
            $scope.CollegeCode = CollegeCode
            $scope.loading = true;
            var getReport = AcademicService.getAdminSyllabusReports($scope.AcademicYear, $scope.semesterarr, CollegeCode);
            getReport.then(function (response) {
                var response = JSON.parse(response)

                if (response.Table.length > 0) {
                    $scope.loading = false;
                    //  $scope.FacultyMappingReport = response.Table;
                    $scope.FacultyMappingReport1 = response.Table1;
                    $scope.Noresult = false;
                    $scope.data1 = true;
                    $scope.data = false;
                    console.log(response)

                } else {
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.data1 = false;
                    $scope.data = false;
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

        $scope.goBack = function () {
            $scope.Submit()
            $scope.data1 = false;
            $scope.data = true;
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

        //var getsems = PreExaminationService.GetAllSemesters();
        //getsems.then(function (res) {
        //    //var res = JSON.parse(res);
        //    $scope.ActiveSems = res.Table;

        //}, function (err) {
        //    $scope.LoadImg = false;
        //    alert("Error while loading");
        //});

        //----------------------semester Multi Select Start--------------------------------//
        var semesterexpand = false;
        $scope.showsemesterCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxessemester");
            if (!semesterexpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                semesterexpand = true;
            } else {
                checkboxes.style.display = "none";
                semesterexpand = false;
            }
        }

        $scope.closesemesterCheckbox = function () {
            var checkboxes = document.getElementById("checkboxessemester");
            if (!semesterexpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                semesterexpand = true;
            } else {
                checkboxes.style.display = "none";
                semesterexpand = false;
            }
        }

        $scope.toggleAllsemester = function () {
            var toggleStatus = $scope.isAllSelectedsemesters;
            angular.forEach($scope.ActiveSems, function (itm) { itm.selected = toggleStatus; });
            $scope.semesterarr = [];
            angular.forEach($scope.ActiveSems, function (value, key) {
                if (value.selected === true) {
                    $scope.semesterarr.push({ "SemId": value.semid })
                }
            });
        }


        var SCHEMESEMINFO = StudentWiseService.GetSchemeDataForResults();
        $scope.pin = "";
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {
                $scope.schemeinf = []
                $scope.schemeinfo = data;
                //$scope.schemeinfo = [{ schemeid: 5, scheme: "C18" }, { schemeid: 2, scheme: "ER91" }, { schemeid: 9, scheme: "C21" }, { schemeid: 10, scheme: "ER2020" }]

                for (var i = 0; i < $scope.schemeinfo.length; i++) {
                    if ($scope.schemeinfo[i].ActiveFlag == true) {
                        $scope.schemeinf.push($scope.schemeinfo[i]);

                    }
                }
            }
        }, function (error) {
            alert(error);
        });

        $scope.ChangeSemester = function () {
            var LoadActiveSemesters = PreExaminationService.getActiveSemester();
            LoadActiveSemesters.then(function (response) {
                $scope.ActiveSems = [];
                $scope.ActiveSemesters = response.Table;
                console.log($scope.ActiveSemesters)
                //   $scope.ActiveSemesters = [{ semid: 2, sem: "2SEM" }, { semid: 4, sem: "4SEM" }]
                // $scope.ActiveSemesters = [{ semid: 1, sem: "1SEM" }, { semid: 2, sem: "2SEM" }, { semid: 3, sem: "3SEM" }, { semid: 4, sem: "4SEM" }, { semid: 5, sem: "5SEM" }]
                for (var i = 0; i < $scope.ActiveSemesters.length; i++) {
                    if ($scope.ActiveSemesters[i].current_schemeid == $scope.scheme) {
                        $scope.ActiveSems.push($scope.ActiveSemesters[i]);
                        $scope.Selectedshift = $scope.ActiveSemesters[i].AySession
                    }
                }
                // console.log( $scope.ActiveSems )
            }, function (error) {
                alert("error while loading semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
            });
        }




        $scope.optionToggledsemester = function () {
            $scope.isAllSelectedsemesters = $scope.ActiveSems.every(function (itm) { return itm.selected; })
            $scope.semesterarr = [];
            angular.forEach($scope.ActiveSems, function (value, key) {
                if (value.selected === true) {
                    $scope.semesterarr.push({ "SemId": value.semId })
                }
            });
            console.log($scope.semesterarr)
        }

        //----------------------semester Multi Select End--------------------------------//
        

    })
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
})