define(['app'], function (app) {
    app.controller("BranchOrSemFeeReportsController", function ($scope, $http, $localStorage, $state, $location, $window, $stateParams, AppSettings, PreExaminationService, AdmissionService,StudentResultService, Excel, $timeout) {
        $scope.Array = [{ "Id": "1", "Name": "Semester" },
               { "Id": "2", "Name": "Branch" }]
        $scope.loading = false;

        var getExamMonth = PreExaminationService.GetExamMonthYear();
        getExamMonth.then(function (response) {
            var response = JSON.parse(response)
            if (response.Table.length > 0) {
                $scope.MonthAndYear = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Exam Month Years");
                console.log(error);

            });

        var LoadExamTypeBysem = StudentResultService.getStudentType();
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

        $scope.GetDetails = function (DataTypeId) {
            $scope.loading = true;
            $scope.DataTypeId = DataTypeId
            var getActiveList = PreExaminationService.GetBranchSemFeeReports($scope.DataTypeId, $scope.SelStudentType, $scope.monthyear);
            getActiveList.then(function (response) {
                var response = JSON.parse(response)
                if (response.Table[0].ResponceCode == '200') {
                    //console.log(response)
                    $scope.CollegeTransferedList = response.Table1;
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
                $scope.loading = false;
                $scope.Noresult = true;
                $scope.result = false;
            })
        }

        $scope.ChangeData = function () {
           
            $scope.result = false;
            $scope.loading = false;
        }
        //$scope.DownloadExcel = function () {
        //    var getExcelreport = AdmissionService.GetAdmissionReportsExcel($scope.AcademicYear);
        //    getExcelreport.then(function (data) {
        //        $scope.gentmetbl = false;
        //        if (data.length > 0) {
        //            if (data.length > 4) {

        //                var location = data;
        //                window.location.href = location;

        //            } else {
        //                alert("Data not Present");
        //            }
        //        } else {
        //            alert("Data not Present");
        //        }
        //        //$scope.ResultNotFound = false;
        //        //$scope.ResultFound = false;
        //        $scope.LoadImg = false;


        //    }, function (error) {
        //        $scope.gentmetbl = false;
        //        $scope.ResultNotFound = true;
        //        $scope.ResultFound = false;
        //        $scope.LoadImg = false;
        //    });
        //}
        $scope.openReport = function (semid) {
            $localStorage.FeeReports = {
                Id: semid,
                DataTypeId: $scope.DataTypeId,
                StudentTypeId: $scope.SelStudentType,
                ExamMonthYearId: $scope.monthyear,
            }
            
            $state.go('Dashboard.PreExamination.BranchOrSemFeeSubReports')
        }
        $scope.DownloadExcel = function (tableid) {

            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "Branch_Fee_Reports.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }
        $scope.DownloadExcel1 = function (tableid) {

            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "Semester_Fee_Reports.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
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