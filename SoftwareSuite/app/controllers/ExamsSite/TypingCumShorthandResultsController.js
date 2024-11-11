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

    app.controller("TypingCumShorthandResultsController", function ($scope, $state, $stateParams, StudentResultService, Excel, $timeout, $rootScope) {
           
        $scope.searchResult = false;
        $scope.LoadImg = false;
        $scope.StudentDetailsFound = false;
        $scope.StudentHallTicket = "";

      
        $scope.DownloadExcelResult = function (tableId) {

            var exportHref = Excel.tableToExcel(tableId, '');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.download = "";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }

       


        $scope.CardYear ='';
        $scope.Submit = function () {
         //   $scope.searchResult = true;
            $scope.LoadImg = true;
            $scope.StudentDetailsFound = false;
            var GetTypeWritingShorthandinfo = StudentResultService.GetTypeWritingShorthandReport($scope.StudentHallTicket);
            GetTypeWritingShorthandinfo.then(function (response) {
                if(response.length>0){
                    $scope.LoadImg = false;
                    $scope.StudentDetailsFound = true;
                    $scope.report = response[0];
                    $scope.CardYear = response[0].MONTH_YEAR;
                }
               
            }, function (error) {
                $scope.LoadImg = false;
                $scope.StudentDetailsFound = false;
                console.log(error);
            });
        }

        $scope.PrintStudentResult = function () {

            var divName = "idtoDivPrintAdmin";
            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;
            $("#studentresult1").hide();
            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            //document.body.innerHTML = "";
            if (!$printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";
                document.body.appendChild($printSection);
            }
            $printSection.innerHTML = "";
            $printSection.appendChild(domClone);
            // alert($printSection.innerHTML);
            window.print();
            document.body.removeChild($printSection);
            $("#studentresult1").show();
        };
           
   
    });

});

