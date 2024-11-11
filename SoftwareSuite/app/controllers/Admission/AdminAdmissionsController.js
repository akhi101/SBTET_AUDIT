define(['app'], function (app) {
    app.controller("AdminAdmissionsController", function ($scope, $http, $localStorage, $state, AppSettings, AdmissionService, Excel, $timeout) {
        var authData = $localStorage.authorizationData;
        $scope.loading = true;
        $scope.userType = authData.SystemUserTypeId
        $scope.userName = authData.userName;

        AppSettings.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        //alert("College Id" + authData.CollegeID);
        AppSettings.CollegeID = authData.CollegeID;
        $scope.CollegeID = authData.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.PrevAdmNo = authData.PrevAdmNo;
        AppSettings.TypeFlag = authData.TypeFlag;
        AppSettings.MngtTypID = authData.MngtTypID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID,
        AppSettings.SeqNo = authData.SeqNo,
        AppSettings.UserRights = authData.UserRights,
        AppSettings.DistrictIDs = authData.DistrictIDs;
        AppSettings.College_Code = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;
        $scope.College_Name = authData.College_Name
        $scope.College_Code = authData.College_Code;
        $scope.userType = authData.SystemUserTypeId
       // $scope.ChangePassword = {};
        $scope.shownewpassword = false;
        var data = {};
        $scope.$emit('showLoading', data);
        var GetColleges = AdmissionService.GetAdmissionReports()
        GetColleges.then(function (response) {
           
            if (response.Table.length > 0) {
                $scope.loading = false;
                $scope.NoResult = false;
                $scope.Result = true;
                $scope.AttendanceReports = response.Table;
                $scope.AcademicYearId = response.Table1[0].CurrentAcademicYearId;
                $scope.$emit('hideLoading', data);
            }

            else {
                $scope.loading = false;
                $scope.Result = false;
                $scope.NoResult = true;
                $scope.$emit('hideLoading', data);
            }
        }, function (error) {
            $scope.Result = false;
            $scope.loading = false;
            $scope.NoResult = true;
            $scope.AttendanceReports = []
            $scope.$emit('hideLoading', data);
            alert("error");
           
        });

        $scope.openCollegeAdmissions = function (data) {
            
            $localStorage.collegeDetails = {
                CollegeCode: data.CollegeCode,             
                AcademicYearId: $scope.AcademicYearId
            }
           // console.log($localStorage.collegeDetails)
          $state.go('Dashboard.AdmissionDashboard.Admission')
        }

        $scope.DownloadtoExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                $('#a').remove();
                a.download = "CollegeList.xls";
                document.body.appendChild(a);
                a.click();
                $('#a').remove();
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