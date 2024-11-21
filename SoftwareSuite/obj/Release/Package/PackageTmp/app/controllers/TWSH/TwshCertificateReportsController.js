define(['app'], function (app) {
    app.controller("TwshCertificateReportsController", function ($scope, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService, $timeout, Excel) {


        $scope.LoadImg = false;

        $scope.ExamTypes = [
            { Name: "Computer Based Test(CBT)", Id: 1 },
            { Name: "TypeMachine Based Test(TMBT)", Id: 2 }
        ];

        var GetExamYearMonth = TwshStudentRegService.getTwshExamMonthYears();
        GetExamYearMonth.then(function (res) {         
            $scope.getExamYearMonth = res.Table;
        },function (error) {
                var err = JSON.parse(error);
            });

        $scope.GetReport = function () {
            $scope.fromdate = moment($scope.FromDate).format("YYYY-MM-DD");
            $scope.todate = moment($scope.ToDate).format("YYYY-MM-DD");

            if (($scope.ExamMonthYearId == null || $scope.ExamMonthYearId == undefined || $scope.ExamMonthYearId == 0) && $scope.ExamMode == 2) {
                alert('select Exam Month Year');
                return;
            }
            if ($scope.ExamMode == null || $scope.ExamMode == undefined || $scope.ExamMode == 0) {
                alert('select Exam Mode.');
                return;
            }
            $scope.LoadImg = true;
            var GetInstituteReports = TwshStudentRegService.getTwshCertificateApplicationReport($scope.ExamMode, $scope.ExamMonthYearId, $scope.fromdate.toString(), $scope.todate.toString());
            GetInstituteReports.then(function (response) {
                if (response.Table[0].ResponseCode == "200") {
                    if (response.Table1.length > 0) {
                        $scope.data = true;
                        $scope.LoadImg = false;
                        $scope.InstituteReports = response.Table1;
                        var Applied = 0;
                        var FeeNotPaid = 0;
                        var FeePaid = 0;
                        for (count = 0; count < $scope.InstituteReports.length; count++) {
                            Applied += parseInt($scope.InstituteReports[count].Applied)
                            FeeNotPaid += parseInt($scope.InstituteReports[count].FeeNotPaid);
                            FeePaid += parseInt($scope.InstituteReports[count].FeePaid);
                        }

                        $scope.Applied = Applied;
                        $scope.FeeNotPaid = FeeNotPaid;
                        $scope.FeePaid = FeePaid;
                    } else {
                        $scope.LoadImg = false;
                        $scope.StatusMessage = "No Data Found";
                        $scope.showStatus = true;
                        $scope.statusclass = 'alert-danger';
                        $scope.data = false;
                    }
                } else {                  
                        $scope.LoadImg = false;
                        $scope.StatusMessage = "No Data Found";
                        $scope.showStatus = true;
                        $scope.statusclass = 'alert-danger';
                        $scope.data = false;
                }
            }, function (error) {
                $scope.LoadImg = false;
                $scope.StatusMessage = "No Data Found";
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.data = false;

            });
        }


        $scope.openDetails = function (gradeId) {

            localStorage.setItem('gradeId', gradeId)
            $state.go('TWSH.DetailedReports')
        }

        $scope.DownloadtoExcel = function (tableid) {

            var exportHref = Excel.tableToExcel(tableid, 'TWSH_Certificate_Report');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "TWSH_Certificate_Report.xls";
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