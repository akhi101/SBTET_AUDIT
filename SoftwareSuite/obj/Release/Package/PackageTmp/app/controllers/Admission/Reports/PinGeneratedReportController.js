define(['app'], function (app) {
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

    app.controller("PinGeneratedReportController", function ($scope, $state, $stateParams, $localStorage, AppSettings, ReportService, $uibModal, Excel, $timeout, $rootScope) {
        var authData = $localStorage.authorizationData;
        $scope.userType = authData.SystemUserTypeId;

        $scope.PinGeneratedStats = [];
        $scope.PinReportFound = false;
        var data = {};
        $scope.$emit('showLoading', data);



        $scope.searchtxt = "";
        $scope.DownloadExcelResult = function (tableId) {

            var exportHref = Excel.tableToExcel(tableId, 'PinGeneratedReport');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.download = "PinGenerationReport.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }
        if ($scope.userType == 1 || $scope.userType == 5 || $scope.userType == 1000 || $scope.userType == 1014 || $scope.userType == 1015 || $scope.userType == 1009 || $scope.userType == 1002 || $scope.userType == 1007 || $scope.userType == 1013) {
            var AcademicId = authData.AcademicId == null || authData.AcademicId == undefined || authData.AcademicId == "" ? 7 : authData.AcademicId;
            var PinGeneratedInfo = ReportService.GetPinGeneratedReportInfo(AcademicId);
            PinGeneratedInfo.then(function (data) {
                if (data.length > 0) {
                    $scope.PinReportFound = true;
                    $scope.$emit('hideLoading', data);
                    // $scope.LoadImg = false;
                    $scope.PinGeneratedStats = data;
                    $scope.filteredData = $scope.PinGeneratedStats;
                }
                else {
                    alert("Data Not Found");

                    $scope.$emit('hideLoading', data);
                    $scope.PinReportFound = false;
                    //  $scope.LoadImg = false;
                    $scope.PinGeneratedStats = [];
                    return;
                }
            }, function (error) {
                alert("error");
                $scope.$emit('hideLoading', data);
            });

        }



    });
    app.$inject = ['$scope'];
});

