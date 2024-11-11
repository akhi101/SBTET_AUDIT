define(['app'], function (app) {
    app.controller("WebsiteFeedbackReportController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MasterSettingsService, Excel, $timeout) {


        $scope.search = "";
        $scope.loading = true;
        $scope.error = false;
        $scope.data = false;
        var getcircular = MasterSettingsService.getWebsiteFeedbackReport();
        getcircular.then(function (response) {
            if (response.Table.length > 0) {
                console.log(response);
                $scope.FeedbackReport = response.Table;
                $scope.loading = false;
                $scope.data = true;
                $scope.error = false;

            } else {
                $scope.loading = false;
                $scope.data = false;
                $scope.error = true;
            }
        }, function (error) {

            console.log(error);
            $scope.loading = false;
            $scope.data = false;
            $scope.error = true;
        });


    

        $scope.DownloadExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'TableId');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "Website_Feedback_Report.xls";
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
});

