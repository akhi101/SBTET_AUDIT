define(['app'], function (app) {
    app.controller("StatisticalReportsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, AssessmentService, Excel, $timeout) {
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
        $scope.userType = authData.SystemUserTypeId;


        var getSemisters = AssessmentService.getSemistersSetData();
        getSemisters.then(function (response) {
            console.log(response)
            $scope.Semisters = response.Table;

        },
        function (error) {
            alert("error while loading semesters");
            var err = JSON.parse(error);
        //    console.log(err.Message);
        });
        $scope.OpenDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("Dashboard");
        }
        $scope.getReport = function () {
            $scope.loading = true;
            console.log($scope.selectedSem)
            var getActiveList = AssessmentService.getStatisticalReports($scope.selectedSem);
            getActiveList.then(function (response) {
                if (response.length > 0) {
                    $scope.StatisticalReports = response;
                    $scope.loading = false;
                    $scope.Noresult = false;
                    $scope.result = true;
                } else {
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }
                
            },
            function (error) {
                alert("error while loading Reports");
                $scope.loading = false;
                $scope.Noresult = true;
                $scope.result = false;
                $scope.StatisticalReports = [];
                var err = JSON.parse(error);
                console.log(err.Message);
            });
        }
        $scope.DownloadtoExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                $('#a').remove();
                a.download = "StatisticalReports.xls";
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