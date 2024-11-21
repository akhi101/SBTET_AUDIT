define(['app'], function (app) {
    app.controller("AdminReportSummaryController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, AssessmentService, Excel, $timeout) {
        $scope.responseData = false;
        $scope.clg_reports = false;
        $scope.NoResult = true;
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        $scope.College_Code = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;
        $scope.College_Name = authData.College_Name;
        AppSettings.userName = authData.userName;
        $scope.BranchId = authData.BranchId;
        $scope.CollegeID = authData.CollegeID;
        $scope.ShowSetDates = false;
        $scope.clg_reports = false;
        $scope.NoResult = false;
        $scope.responseData = false;
        $scope.userType = authData.SystemUserTypeId
        var branchReports = $localStorage.branchReports;

        $scope.CollegeCode = branchReports.collegecode;
        $scope.examtypeid = branchReports.examtypeid;
        $scope.branchid = branchReports.branchid;
        $scope.SubId = branchReports.subid;
        $scope.SemId = branchReports.semid;
        $scope.studentTypeId = branchReports.studentTypeId;
        $scope.years = branchReports.AcademicYearsActiveResponse;
        $scope.ExamMonthYearId= branchReports.ExamMonthYearId,
        $scope.access1 = branchReports.access1;
        $scope.OpenReport = function () {
            $state.go("Dashboard.MarksSummary");
        }
        $scope.OpenDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("Dashboard");
        }
        if ($scope.studentType == 2) {
            $scope.examtypeid = 0;
        }
        var getAdminBranchReports = AssessmentService.getAdminBranchReports($scope.examtypeid, $scope.CollegeCode, $scope.branchid, $scope.SubId, $scope.SemId, $scope.studentTypeId, parseInt($scope.years.AcademicID), $scope.ExamMonthYearId);
        getAdminBranchReports.then(function (response) {

            if (response.length > 0) {

                $scope.collegeReports = response;
                $scope.issixthsem = $scope.SemId
                $scope.responseData = true;
                $scope.clg_reports = false;
                $scope.NoResult = false;
            } else {
                $scope.collegeReports = [];
                $scope.responseData = false;
                $scope.clg_reports = false;
                $scope.NoResult = true;
            }
        },
            function (error) {

                var err = JSON.parse(error);

                $scope.collegeReports = [];

            });
        $scope.OpenReport = function () {
            $state.go("Dashboard.MarksSummary");
        }
        $scope.OpenDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("Dashboard");
        }
        $scope.DownloadtoExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                $('#a').remove();
                a.download = "StudentsReport.xls";
                document.body.appendChild(a);
                a.click();
                $('#a').remove();
            }, 100);
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
})