define(['app'], function (app) {
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

    app.controller("SyllabusCoverageReportController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, AcademicService, $timeout, Excel, PreExaminationService) {
        var authData = $localStorage.authorizationData;

        $scope.Data = false;

        $scope.UserTypeId = authData.SystemUserTypeId;
        if ($scope.UserTypeId == 1 || $scope.UserTypeId == 5 || $scope.UserTypeId == 1011 || $scope.UserTypeId == 1012 || $scope.UserTypeId == 1000 || $scope.UserTypeId == 1013 || $scope.UserTypeId == 1014 || $scope.UserTypeId == 1015 || $scope.UserTypeId == 1007 || $scope.UserTypeId == 1002 || $scope.UserTypeId == 1009) {
            $scope.CollegeCode = null;
        } else if ($scope.UserTypeId == 2) {
            $scope.CollegeCode = authData.College_Code;
        } else if ($scope.UserTypeId == 3) {
            var branchCode = authData.userName.split('_')[0];
            $scope.CollegeCode = authData.College_Code;
        }
        var getUserTypes = AcademicService.GetUserTypes();
        getUserTypes.then(function (response) {
            // $scope.ActiveSemesters = response.Table;



            $scope.userTypes = response.Table
        },
            function (error) {
                alert("error while loading User Types");
                var err = JSON.parse(error);
                console.log(err.Message);
            });
        var GetMonthYear = PreExaminationService.GetMonthYear()
        GetMonthYear.then(function (response) {

            $scope.GetExamMonthYear = response.Table;


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
            angular.forEach($scope.semestersData, function (itm) { itm.selected = toggleStatus; });
            $scope.semesterarr = [];
            angular.forEach($scope.semestersData, function (value, key) {
                if (value.selected === true) {
                    $scope.semesterarr.push({ "SemId": value.SemId })
                }
            });
        }

        $scope.optionToggledsemester = function () {
            $scope.isAllSelectedsemesters = $scope.semestersData.every(function (itm) { return itm.selected; })
            $scope.semesterarr = [];
            angular.forEach($scope.semestersData, function (value, key) {
                if (value.selected === true) {
                    $scope.semesterarr.push({ "SemId": value.SemId })
                }
            });
            console.log($scope.semesterarr)
        }


        $scope.Shifts = [
            { "Id": 1, "name": "Shift 1" },
            { "Id": 2, "name": "Shift 2" },
        ]


        $scope.DownloadExcel = function () {
            var getExcelDta = AcademicService.getSyllabusReportExcel($scope.UserTypeId, $scope.AcademicYear, $scope.semesterarr, $scope.CollegeCode, branchCode);
            getExcelDta.then(function (data) {
                $scope.gentmetbl = false;

                if (data.length > 0) {
                    if (data.length > 4) {
                        $scope.Result = true;
                        var location = data;
                        window.location.href = location;

                    } else {
                        alert("Syllabus Coverage Report not Available");
                    }
                } else {
                    alert("Syllabus Coverage Report not Available");
                }
                //$scope.ResultNotFound = false;
                //$scope.ResultFound = false;
                $scope.LoadImg = false;


            }, function (error) {
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }

        $scope.DownloadtoExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'SyllabusCoverageReport');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "SyllabusCoverageReport.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }

        $scope.submit = function () {

            $scope.loading = true;
            var getData = AcademicService.getAdminSyllabusCoverageReport($scope.UserTypeId, $scope.AcademicYear, $scope.semesterarr, $scope.CollegeCode, branchCode);
            getData.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table.length > 0) {
                    $scope.getSyllabusReport = response.Table;
                    $scope.loading = false;
                    $scope.Data = true;
                    $scope.NoData = false;
                } else {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.NoData = true;
                    alert("No Data Found");
                }

            },
                function (error) {
                    alert("error while loading Syllabus Report");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.NoData = true;
                });


        }

        //$scope.submit = function () {
        //    $scope.loading = true;
        //    var getData = AcademicService.GetSyllabusReport($scope.UserTypeId, $scope.ShiftId, $scope.CollegeCode);
        //    getData.then(function (response) {
        //        console.log(response)
        //        if (response.Table1.length > 0) {
        //            $scope.getSyllabusReport = response.Table1;
        //            $scope.loading = false;
        //            $scope.Data = true;
        //            $scope.NoData = false;
        //        } else {
        //            $scope.loading = false;
        //            $scope.Data = false;
        //            $scope.NoData = true;
        //            alert("No Data Found");
        //        }

        //    },
        //   function (error) {
        //       alert("error while loading Syllabus Report");
        //       var err = JSON.parse(error);
        //       console.log(err.Message);
        //       $scope.loading = false;
        //       $scope.Data = false;
        //       $scope.NoData = true;
        //   });
        //}
        $scope.openDetails = function () {
            //$state.go('Dashboard.Academic.PrincipalSyllabusCoverageReport')
        }


    })
})
