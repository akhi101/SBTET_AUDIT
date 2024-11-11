define(['app'], function (app) {
    app.controller("FinalReportsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MarksEntryService, AssessmentService, Excel, $timeout) {
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
        //  $scope.collegeCode = localStorage.getItem(collegeCode);
        var report = $localStorage.finalReport;

        $scope.CollegeCode = report.collegecode;
        $scope.examtypeid = report.examtypeid;
        $scope.ExamMonthYearId = report.ExamMonthYear;
        if ($scope.userType == 2) {
            var reportData =$localStorage.PrincipalReports
            studentTypeId: $scope.studentType
           // var semId = reportData.semid;
            $scope.studentTypeId = reportData.studentTypeId;
            $scope.SemsArray = reportData.semid
            $scope.AcademicID = reportData.AcademicYearId
            $scope.CollegeCode = reportData.collegecode
            $scope.ExamMonthYearId = reportData.ExamMonthYear
            $scope.examtypeid = reportData.examtypeid
            //AcademicYearId: $scope.years.AcademicID,
            //    examtypeid: $scope.examTypeId,
            //        collegecode: data.College_Code,
            //            branchid: data.branchid,
            //                subid: data.subid,
            //                    semid: JSON.stringify($scope.arr),
            //                        studentTypeId: $scope.SelectedStudent1,
            //                            ExamMonthYear: $scope.ExamMonthYear
        } else {
            $scope.SemsArray = report.SemsArray;
            $scope.studentTypeId = report.studentTypeId;
       
        }
      
        $scope.years = report.AcademicYearsActiveResponse;
       
     
        if ($scope.userType == 2 || $scope.userType == 5 || $scope.userType == 1 || $scope.userType == 1000 || $scope.userType == 1005 || $scope.userType == 1002 || $scope.userType == 1007 || $scope.userType == 1009 || $scope.userType == 1011 || $scope.userType == 1012) {
            $scope.access1 = true;
        }
        $scope.AcademicID = $scope.years.AcademicID;
        var data = {};
        $scope.$emit('showLoading', data);
        var getAdminReports = AssessmentService.getAdminReportsCollege($scope.examtypeid, $scope.CollegeCode, parseInt($scope.studentTypeId), parseInt($scope.years.AcademicID), JSON.stringify($scope.SemsArray), $scope.ExamMonthYearId);
        getAdminReports.then(function (response) {

            if (response.length > 0) {
                $scope.$emit('hideLoading', data);
                $scope.collegeReports = response;
                $scope.responseData = true;
                $scope.clg_reports = false;
                $scope.NoResult = false;
                var Total = 0
                var NotSubmitted = 0;
                var NotPosted = 0;
                var Absent = 0;
                var MallPractice = 0;
                var Detained = 0;
                var DisContinued = 0;
                var TcTaken = 0;

                for (var i = 0; i < response.length; i++) {
                    if (response[i].Total != null)
                        Total = Total + response[i].Total;
                    if (response[i].NotSubmitted != null)
                        NotSubmitted = NotSubmitted + response[i].NotSubmitted;
                    if (response[i].NotPosted != null)
                        NotPosted = NotPosted + response[i].NotPosted;
                    if (response[i].Absent != null)
                        Absent = Absent + response[i].Absent;
                    if (response[i].MallPractice != null)
                        MallPractice = MallPractice + response[i].MallPractice;
                    if (response[i].Detained != null)
                        Detained = Detained + response[i].Detained;
                    if (response[i].DisContinued != null)
                        DisContinued = DisContinued + response[i].DisContinued;
                    if (response[i].TcTaken != null)
                        TcTaken = TcTaken + response[i].TcTaken;
                }

                $scope.Total = Total;
                $scope.NotSubmitted = NotSubmitted;
                $scope.NotPosted = NotPosted;
                $scope.Absent = Absent;
                $scope.MallPractice = MallPractice;
                $scope.Detained = Detained;
                $scope.DisContinued = DisContinued;
                $scope.TcTaken = TcTaken;
            } else {
                $scope.$emit('hideLoading', data);
                $scope.collegeReports = [];
                $scope.responseData = false;
                $scope.clg_reports = false;
                $scope.NoResult = true;
            }
        },
        function (error) {
            $scope.$emit('hideLoading', data);
            var err = JSON.parse(error);
            // console.log(err.Message);
            $scope.collegeReports = [];
         
        });
        
        $scope.OpenReport = function () {
            $state.go("Dashboard.MarksSummary");
        }
        $scope.OpenDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("Dashboard");
        }
        $scope.openBranchReport = function (data) {
      
       
            $localStorage.branchReports = {}
            var branchReports = {               
                examtypeid: $scope.examtypeid,
                collegecode: data.CollegeCode,
                branchid: data.BranchId,
                subid: data.SubId,
                semid: data.SemId,
                AcademicYearsActiveResponse: $scope.years,
                studentTypeId: $scope.studentTypeId,
                ExamMonthYearId: $scope.ExamMonthYearId
            }
            $localStorage.branchReports = branchReports;
            $state.go("Dashboard.AssessmentDashboard.AdminReportSummary");
            
        }
        $scope.DownloadtoExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "BranchsReport.xls";
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