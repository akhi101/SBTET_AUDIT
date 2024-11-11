define(['app'], function (app) {
    app.controller("CategoryDetailsController", function ($scope, $http, $localStorage, $state, AppSettings, AdmissionService, Excel, $timeout) {
        console.log($localStorage.categoryData);
        $scope.loading = false;
        var data = {};
        $scope.$emit('showLoading', data);

        $scope.DataFormatTypeId = $localStorage.categoryData.DataFormatTypeId;
        $scope.CollegeCode = $localStorage.categoryData.CollegeCode;
        $scope.SemId = $localStorage.categoryData.SemId;
        $scope.BranchId = $localStorage.categoryData.BranchId;
        $scope.SchemeId = $localStorage.categoryData.SchemeId;
        $scope.Gender = $localStorage.categoryData.Gender;

        
        var getActiveList = AdmissionService.getStudentCategoryPinList($scope.DataFormatTypeId, $scope.CollegeCode, $scope.SemId, $scope.BranchId, $scope.SchemeId, $scope.Gender);
        getActiveList.then(function (response) {
            if (response.length > 0) {
                $scope.CategoryDetails = response;
                $scope.$emit('hideLoading', data);
           // $scope.loading = false;
            $scope.Noresult = false;
            $scope.result = true;

            } else {
                $scope.loading = false;
                $scope.Noresult = true;
                $scope.result = false;
            }
        },
        function (error) {
            $scope.$emit('hideLoading', data);
         //   $scope.loading = false;
            $scope.Noresult = true;
            $scope.result = false;
        })

      

        $scope.DownloadtoExcel = function (tableid) {

            var exportHref = Excel.tableToExcel(tableid, 'studentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                $('#a').remove();
                a.download = "CategoryReports.xls";
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