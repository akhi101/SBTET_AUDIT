define(['app'], function (app) {
    app.controller("PrincipalTransferReportController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, AcademicService, Excel, $timeout) {
        $scope.loading = false;
        var authdata = $localStorage.authorizationData;
        $scope.userType = authdata.SystemUserTypeId


        if ($scope.userType == 1) {
            var ClgCode = localStorage.getItem('collegeCode')

        } else if ($scope.userType == 2) {
            var ClgCode = authdata.College_Code
            var userId = authdata.SysUserID;
        } else if ($scope.userType == 3) {
            var ClgCode = authdata.userName
            var userId = authdata.SysUserID;
        } else {
            var ClgCode = localStorage.getItem('collegeCode')
            // var ClgCode = '99999';

        }


        var data = {};
        $scope.$emit('showLoading', data);
        var getActiveList = AcademicService.GetPrincipalTransferReport(ClgCode);
        getActiveList.then(function (response) {
            if (response.length > 0){
            //console.log(response)
            $scope.CollegeTransferedList = response;
            //  $scope.loading = false;
            $scope.$emit('hideLoading', data);
            $scope.Noresult = false;
            $scope.result = true;
            var Transfer_student = 0

            for (var i = 0; i < response.length; i++) {
                if (response[i].Transfer_student != null)
                    Transfer_student = Transfer_student + response[i].Transfer_student;
            }
            $scope.Transfer_student = Transfer_student;
            } else {
                $scope.$emit('hideLoading', data);
                //  $scope.loading = false;
                $scope.Noresult = true;
                $scope.result = false;
            }
        },
        function (error) {
            $scope.$emit('hideLoading', data);
            //  $scope.loading = false;
            $scope.Noresult = true;
            $scope.result = false;
        })

      
        $scope.openReport = function (collegeCode,Branch,Scheme,Semester) {
            localStorage.setItem('collegeCode', collegeCode)
            localStorage.setItem('Branch', Branch)
            localStorage.setItem('Scheme', Scheme)
            localStorage.setItem('Semester', Semester)
            $state.go('Dashboard.Academic.HodTransferReports')
        }

        $scope.DownloadExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'AdminReports');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "Collegewise_Transfer_List.xls";
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
    })
})