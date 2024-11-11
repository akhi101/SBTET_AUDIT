define(['app'], function (app) {
    app.controller("6thSemStudiedReportController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, AcademicService , Excel, $timeout) {

        var data = {};
        $scope.$emit('showLoading', data);

        var loadData2 = AcademicService.get6thSemStudiedReport()
        loadData2.then(function (response) {
            if (response.Table.length > 0) {
                $scope.$emit('hideLoading', data);
                $scope.Reports = response.Table;
                //console.log($scope.Reports)
                $scope.loading = false;
                $scope.Data1 = true;
            } else {
                // $scope.Examtypes = [];
                $scope.loading = false;
                $scope.Data1 = false
                $scope.$emit('hideLoading', data);
                alert("No Data Found");
            }

        },
            function (error) {
                $scope.loading = false;
                $scope.Data = false;
                $scope.$emit('hideLoading', data);
                alert("error while loading Semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
            });

        $scope.DownloadtoExcel = function (tableid) {
            var loadData1 = AcademicService.get6thSemStudiedReportExcel()
            loadData1.then(function (data) {
                //var data = JSON.parse(response)
                if (data.length > 4) {
                    $scope.Result = true;
                    var location = data;
                    window.location.href = location;

                } else {
                    alert("Subject Master not Found");
                }

                //$scope.ResultNotFound = false;
                //$scope.ResultFound = false;
                $scope.LoadImg = false;


            }, function (error) {
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
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