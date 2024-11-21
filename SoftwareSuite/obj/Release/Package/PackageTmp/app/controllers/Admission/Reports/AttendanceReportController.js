define(['app'], function (app) {
    app.controller("AttendanceReportController", function ($scope, $state, $stateParams, $localStorage, AppSettings,AdmissionService, AttendanceService, Excel, $timeout) {
        var authData = $localStorage.authorizationData;       
        $scope.userType = authData.SystemUserTypeId;
       // console.log(authData);
          var college_Code = authData.College_Code;       
        var AcademicId = authData.AcademicId == null || authData.AcademicId == undefined || authData.AcademicId == "" ? 6 : authData.AcademicId;
        $scope.AttendanceReportStats = [];
        /// $scope.LoadImg = true;
        var data = {};
        $scope.$emit('showLoading', data);
        $scope.AttendanceDetailsFound = false;
        //var regex = /^\d+$/;$localStorage.CollegeAttendanceReports.collegecode
       
       
        if ($scope.userType == 3 ) {
            let tempBranch = authData.userName.split("_");
            let Branch = tempBranch[0];
             var AttendanceReport = AttendanceService.GetAttendenceDataByBranch(college_Code,AcademicId,Branch);
        AttendanceReport.then(function (data) {
            $scope.LoadImg = false;
            $scope.AttendanceDetailsFound = true;
            if (data.length > 0) {
                $scope.$emit('hideLoading', data);
                $scope.AttendanceReportStats = data;
                $scope.filteredData = $scope.AttendanceReportStats;
            }
            else {
                $scope.$emit('hideLoading', data);
             //   $scope.LoadImg = false;
                $scope.AttendanceDetailsFound = false;
                alert("Data Not Found");
                $scope.AttendanceReportStats = [];
                return;
            }
        }, function (error) {
            alert("error");
        });
        } else if ($scope.userType == 1 || $scope.userType == 1014) {
            let AcademicId = authData.AcademicId ==undefined ||authData.AcademicId ==null ||authData.AcademicId == ""?6:authData.AcademicId;
            let college_Code =$localStorage.CollegeAttendanceReports.collegecode;

        var AttendanceReport = AttendanceService.GetAttendenceDataByCollege(college_Code,AcademicId);
        AttendanceReport.then(function (data) {
            //   $scope.LoadImg = false;
            $scope.$emit('hideLoading', data);
            $scope.AttendanceDetailsFound = true;
            if (data.length > 0) {
                $scope.AttendanceReportStats = data;
                $scope.filteredData = $scope.AttendanceReportStats;
            }
            else {
                //   $scope.LoadImg = false;
                $scope.$emit('hideLoading', data);
                $scope.AttendanceDetailsFound = false;
                alert("Data Not Found");
                $scope.AttendanceReportStats = [];
                return;
            }
        }, function (error) {
            alert("error");
            $scope.$emit('hideLoading', data);
        });

        } else if($scope.userType == 2 ){
            var AttendanceReport = AttendanceService.GetAttendenceDataByCollege(college_Code, AcademicId);
            AttendanceReport.then(function (data) {
                $scope.LoadImg = false;
                $scope.AttendanceDetailsFound = true;
                if (data.length > 0) {
                    $scope.$emit('hideLoading', data);
                    $scope.AttendanceReportStats = data;
                    $scope.filteredData = $scope.AttendanceReportStats;
                }
                else {
                    $scope.LoadImg = false;
                    $scope.$emit('hideLoading', data);
                    $scope.AttendanceDetailsFound = false;
                    alert("Data Not Found");
                    $scope.AttendanceReportStats = [];
                    return;
                }
            }, function (error) {
                $scope.$emit('hideLoading', data);
                alert("error");
            });
        }


        $scope.search = "";

        $scope.DownloadtoExcel = function (tableid){
            var exportHref = Excel.tableToExcel(tableid, 'AttendanceReport');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "AttendanceReport.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        },

        $scope.getAttendanceBranchWise = function (scheme, Semester, Branch, percent) {
            AppSettings.Scheme = scheme;
            AppSettings.Semid = Semester;
            AppSettings.BranchCode = Branch;
            AppSettings.percentage = percent;
            authData.SchemeId = scheme;
            authData.SemesterId = Semester;
            authData.BranchCode = Branch;
            authData.percentage = percent;
            $scope.AttendanceReportStats = [];
            $scope.filteredData = $scope.AttendanceReportStats;

            $state.go("Dashboard.AdmissionDashboard.GetAttendanceReportBranchWise");
        }





        $scope.loadYears = function () {

            var AcademicYears = AdmissionService.GetAcademicYearsActive(AppSettings.CollegeID);
            AcademicYears.then(function (data, status, headers, config, error) {
                $scope.AcademicYears = data.Table;

                //console.log($scope.AcademicYears);
                $scope.AcademicId = $scope.AcademicYears[0].AcademicId;
                AppSettings.AcademicId = $scope.AcademicYears[0].AcademicId;
                authData.AcademicId = $scope.AcademicYears[0].AcademicId;
                      

            }, function (error) { alert(error); });
        }


        $scope.loadAttendanceData = function () {
           
            $scope.LoadImg = true;
            $scope.AttendanceDetailsFound = false;
            $scope.AttendanceReportStats = [];
            var collegecode = document.getElementById("CollegeName").value;
           
           
            //if ($scope.CollegeID !== 0) {
            //    $scope.college = $scope.College_Code;
            //}
            //else {
            //    if ($scope.college === null)
            //        $scope.college = "001";
            //    else
            //        $scope.college = collegecode;
            //}

            var scope = angular.element(document.getElementById("AcademicYear")).scope();
            var AcademicYear = scope.AcademicId;

           
            if ($scope.college === "") {
                $scope.college = collegecode;
            }
            let college_Code = collegecode;
            let AcademicId = authData.AcademicId == null || authData.AcademicId == undefined || authData.AcademicId == "" ? 6 : authData.AcademicId;

            var AttendanceReport = AttendanceService.GetAttendenceDataByCollege(college_Code, AcademicId);
            AttendanceReport.then(function (data) {
                $scope.LoadImg = false;
                $scope.AttendanceDetailsFound = true;
                if (data.length > 0) {
                    $scope.AttendanceReportStats = data;
                    $scope.filteredData = $scope.AttendanceReportStats;
                }
                else {
                    $scope.LoadImg = false;
                    $scope.AttendanceDetailsFound = false;
                    alert("Data Not Found");
                   
                    $scope.AttendanceReportStats = [];
                    return;
                }
            }, function (error) {
                alert("error");
            });
           
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
               
                var table = $(tableId),
                    ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });  

});