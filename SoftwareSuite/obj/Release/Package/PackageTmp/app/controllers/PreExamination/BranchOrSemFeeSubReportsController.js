define(['app'], function (app) {
    app.controller("BranchOrSemFeeSubReportsController", function ($scope, $http, $localStorage, $state, $location, $window, $stateParams, AppSettings, PreExaminationService, Excel, $timeout) {

        $scope.Array = [{ "Id": "1", "Name": "Semester" },
              { "Id": "2", "Name": "Branch" }]

        var FeeReports = $localStorage.FeeReports
        console.log(FeeReports)
        $scope.Id = FeeReports.Id
        $scope.DataType = FeeReports.DataTypeId
        $scope.StudentTypeId = FeeReports.StudentTypeId
        $scope.ExamMonthYearId = FeeReports.ExamMonthYearId

        $scope.DataTypeId = localStorage.getItem('DataTypeId')
        //$scope.GetDetails = function (AcademicYear) {
        $scope.loading = true;
        console.log($scope.DataType, $scope.StudentTypeId, $scope.ExamMonthYearId, $scope.Id)
        var getActiveList = PreExaminationService.GetBranchSemSubFeeReports($scope.DataType, $scope.StudentTypeId, $scope.ExamMonthYearId, $scope.Id);
        getActiveList.then(function (res) {
            var response = JSON.parse(res)
            if (response.Table[0].ResponceCode == '200') {
                //console.log(response)
                $scope.CollegeTransferedList = response.Table1;
                $scope.loading = false;
                //$scope.$emit('hideLoading', data);
                $scope.Noresult = false;
                $scope.result = true;
                //var TransferedCount = 0

                //for (var i = 0; i < response.Table.length; i++) {
                //    if (response.Table[i].TransferedCount != null)
                //        TransferedCount = TransferedCount + response.Table[i].TransferedCount;
                //}
                //$scope.TransferedCount = TransferedCount;
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
        //}

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
        $scope.DownloadExcel = function (tableid) {

            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "Branch_Fee_Sub_Reports.xls";
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
                a.download = "Semester_Fee_Sub_Reports.xls";
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