define(['app'], function (app) {
    app.controller("DaywiseNrReportsController", function ($scope, $http, $localStorage, $state, $location, $window, $stateParams, AppSettings, PreExaminationService, Excel, $timeout) {
       
        $scope.loading = false;

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


        var getExamMonth = PreExaminationService.GetExamMonthYear();
        getExamMonth.then(function (response) {
            var response = JSON.parse(response)
            if (response.Table.length > 0) {
                $scope.MonthAndYear = response.Table;
            } else {
                $scope.MonthAndYear = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Exam Month Years");
                console.log(error);

            });

        var LoadExamTypeBysem = PreExaminationService.getStudentType();
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

        $scope.GetDetails = function () {
            $scope.loading = true;
            $scope.Noresult = false;
            $scope.result = false;
           
            var getActiveList = PreExaminationService.GetDayWiseNrReports($scope.monthyear, $scope.AcademicYear, $scope.SelStudentType);
            getActiveList.then(function (res) {
                var response = JSON.parse(res)

                console.log(response)
                if (response.Table.length>0) {
                    //console.log(response)
                    //$scope.CollegeTransferedList = response.Table;
                    $scope.tableData = [];
                    //  $scope.ExamPayment = response;
                    $scope.tableData.push({ rows: response.Table, cols: Object.keys(response.Table[0]) });
                    console.log($scope.tableData)
                    $scope.loading = false;
                    //$scope.$emit('hideLoading', data);
                    $scope.Noresult = false;
                    $scope.result = true;

                } else {
                    //$scope.$emit('hideLoading', data);
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }


            },
            function (error) {
                $scope.$emit('hideLoading', data);
                $scope.tableData = [];
                $scope.loading = false;
                $scope.Noresult = true;
                $scope.result = false;
            })
        }



        $scope.DownloadExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'SessionWiseNrCounts');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "SessionWiseNrCounts.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
            //var getExcelreport = PreExaminationService.GetDayWiseNrReportsExcel($scope.monthyear, $scope.AcademicYear, $scope.SelStudentType);
            //getExcelreport.then(function (data) {
            //    $scope.gentmetbl = false;
            //    if (data.length > 0) {
            //        if (data.length > 4) {

            //            var location = data;
            //            window.location.href = location;

            //        } else {
            //            alert("Data not Present");
            //        }
            //    } else {
            //        alert("Data not Present");
            //    }
            //    //$scope.ResultNotFound = false;
            //    //$scope.ResultFound = false;
            //    $scope.LoadImg = false;


            //}, function (error) {
            //    $scope.gentmetbl = false;
            //    $scope.ResultNotFound = true;
            //    $scope.ResultFound = false;
            //    $scope.LoadImg = false;
            //});
        }
        $scope.openReport = function (semid) {
            $localStorage.FeeReports = {
                Id: semid,
                DataTypeId: $scope.DataTypeId,
                StudentTypeId: $scope.SelStudentType,
                ExamMonthYearId: $scope.monthyear,
            }

            $state.go('Dashboard.PreExamination.BranchOrSemFeeSubReports')
        }


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