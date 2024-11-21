define(['app'], function (app) {
    app.controller("SessionWiseStrengthController", function ($scope, $http, $localStorage, $state, $location, $window, $stateParams, AppSettings, PreExaminationService, Excel, $timeout) {
      
        var loadHallticket = PreExaminationService.GetExamMonthYear();
        loadHallticket.then(function (response) {
            var response = JSON.parse(response)
            if (response.Table.length > 0) {
                $scope.GetExamMonthYear = [];
                $scope.GetExamMonthYear = response.Table;
            } else {
                $scope.GetExamMonthYear = [];
                alert("No Exam Month Year found");
            }
        },
            function (error) {
                alert("error while loading Exam Month Years");
                console.log(error);
            });

        var LoadExamTypeBysem = PreExaminationService.getStudentType();

        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentTypes = response.Table;
            } else {
                $scope.StudentTypes = [];
                alert("No Exam Types found.");
            }
        },
        function (error) {
            alert("error while loading Exam Types");
            console.log(error);
        });

        var LoadAcademicYears = PreExaminationService.GetAcademicYears();
        LoadAcademicYears.then(function (response) {
            if (response.Table.length > 0) {
                $scope.GetAcademicYears = response.Table;
            } else {
                $scope.GetAcademicYears = [];
                alert("No Exam Types found.");
            }
        },
        function (error) {
            alert("error while loading Exam Types");
            console.log(error);
        });


        $scope.GetDetails = function () {
            $scope.LoadImg = true;
            var loadDates = PreExaminationService.GetTotalDayWiseCharges($scope.monthyear, $scope.AcademicYear, $scope.ExaminationType);
            loadDates.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table.length > 0) {
                    console.log(response)
                    $scope.SessionStrengthReport = response.Table1
                   
                    $scope.RadioChange()
                } else {
                    $scope.Timetabledates = [];
                    alert("No Time Table Dates found");
                    $scope.LoadImg = false;
                }

            },
            function (error) {
                alert("error while loading Time Table Dates");
                $scope.LoadImg = false;
                console.log(error);
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