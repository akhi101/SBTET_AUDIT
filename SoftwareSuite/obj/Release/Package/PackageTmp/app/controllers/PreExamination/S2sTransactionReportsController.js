define(['app'], function (app) {
    app.controller("S2sTransactionReportsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService, Excel, $timeout, MarksEntryService) {
        var $ctrl = this;
        $scope.StudentType = [];
        $scope.Student = {};
        $scope.datatransactionReports1 = false;
        $ctrl.$onInit = () => {
            //alert();
          //  $("#menu3").click();
          //  $('#menu3').click(function ()
        }

        var LoadExamTypeBysem = MarksEntryService.getStudentType();
        LoadExamTypeBysem.then(function (response) {

            if (response.Table.length > 0) {

                $scope.StudentType = response.Table;

            } else {
                $scope.StudentType = [];

            }
        },


            function (error) {
                alert("error while Data");
                console.log(error);
            });
    
        //$scope.getData = function(){
        var DataTypeId = 1;
        var StudentTypeId = 1;
        //var fromdate = moment($scope.StartDate).format("DD/MM/YYYY HH:mm:ss");
        //var Todate = moment($scope.EndDate).format("DD/MM/YYYY HH:mm:ss");
    
        //var fromdate = '';
        //var Todate = '';
        var StartDate = '';
        var EndDate = '';
        var GetTransaction = PreExaminationService.GetS2SPaymentReports(DataTypeId, StudentTypeId, StartDate, EndDate);
        GetTransaction.then(function (response) {
            console.log(response)
            $scope.transactionReports1 = response.Table;
            $scope.datatransactionReports1 = true;
            //$scope.transactionReports1 = [];
        
            //$scope.transactionReports1.push({ rows: response.Table, cols: Object.keys(response.Table[0]) });
           
        }, function (err) {
            //   $scope.isShowResults = false;
            console.log(err);
        });
        //}

        //var DataTypeId = 2;
        //var StudentTypeId = 1;
        //var StartDate = "01-11-2019";
        //var EndDate = "13-11-2019";
        //var GetTransaction1 = PreExaminationService.GetS2SPaymentReports(DataTypeId, StudentTypeId, StartDate, EndDate);
        //GetTransaction1.then(function (response) {
        //    console.log(response)
        //   $scope.transactionReports2 = response.Table;
        //}, function (err) {
        //    //   $scope.isShowResults = false;
        //    console.log(err);
        //});

        //var DataTypeId = 3;
        //var StudentTypeId = 1;
        //var StartDate = "01-11-2019";
        //var EndDate = "13-11-2019";
        //var GetTransaction2 = PreExaminationService.GetS2SPaymentReports(DataTypeId, StudentTypeId, StartDate, EndDate);
        //GetTransaction2.then(function (response) {
        //    console.log(response)
        //    $scope.transactionReports3 = response.Table;
        //}, function (err) {
        //    //   $scope.isShowResults = false;
        //    console.log(err);
        //});

        //var DataTypeId = 4;
        //var StudentTypeId = 1;
        //var StartDate = "01-11-2019";
        //var EndDate = "13-11-2019";
        //var GetTransaction3 = PreExaminationService.GetS2SPaymentReports(DataTypeId, StudentTypeId, StartDate, EndDate);
        //GetTransaction3.then(function (response) {
        //    console.log(response)
        // //   $scope.transactionReports4 = response.Table; transactionReports4
        //    $scope.transactionReports4 = [];
        //    //  $scope.ExamPayment = response;
        //    $scope.transactionReports4.push({ rows: response.Table, cols: Object.keys(response.Table[0]) });
        //}, function (err) {
        //    //   $scope.isShowResults = false;
        //    console.log(err);
        //});
      
            var DataTypeId = 5;
            var StudentTypeId = 1;
            var StartDate = "01-11-2019";
            var EndDate = "13-11-2019";
            var GetTransaction4 = PreExaminationService.GetS2SPaymentReports(DataTypeId, StudentTypeId, StartDate, EndDate);
            GetTransaction4.then(function (response) {
                console.log(response)
              
            }, function (err) {
          
                console.log(err);
            });

            $scope.DownloadtoExcel = function (tableid) {
                var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
                $timeout(function () {
                    var a = document.createElement('a');
                    a.href = exportHref;
                    a.remove();
                    a.download = "collegesReport.xls";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                }, 100);
            }

 
      $scope.getData = function () {
        var DataTypeId = 6;
        var StudentTypeId = $scope.Student.id;
        var fromdate = moment($scope.StartDate).format("DD-MM-YYYY");
        var Todate = moment($scope.EndDate).format("DD-MM-YYYY");
        var GetTransaction5 = PreExaminationService.GetS2SPaymentReports(DataTypeId, StudentTypeId, fromdate, Todate);
        GetTransaction5.then(function (response) {
            if (response != null && response.length > 1) {
                var location = window.location.origin
                window.location.href = '/Reports' + response;
                $scope.NoResult = false;

                //$scope.data6 = true;
                //$scope.transactionReports2 = [];
                //$scope.transactionReports2.push({ rows: response.Table, cols: Object.keys(response.Table[0]) });
            }
            else{
                alert("Error Generating The Report");
                $scope.NoResult = true;
            }
        }, function (err) {
            $scope.data6 = false;
            console.log(err);
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