define(['app'], function (app) {
    app.controller("StudentAttendanceReportController", function ($scope, $state, $stateParams, $localStorage, AppSettings, AttendanceService,$uibModal,$rootScope, Excel, $timeout) {
        var authdata = $localStorage.authorizationData;
        console.log(authdata);

        for (i = 0; i <= 30; i++) {
            $scope.days = i;
        }
               
        $scope.getstudentAttByPin = function(Pin){
            var pin = Pin;
            var getAttendancePinwise = AttendanceService.GetAttendenceDataByPinWise(pin);
            getAttendancePinwise.then(function (data) {
                if (data.Table.length > 0) {
                    var attendanceStas = [];                    
                   $scope.attmonths = [];
                    var attstatus_date = [];
                    var tempData =[];
                    $scope.filteredData = [];                  
                    data.Table.forEach(function (attData) {
                        if (!attmonths.includes(attData.AttdMonth)){
                            attmonths.push(attData.AttdMonth);                       
                        }
                    });
                    
                    var tempobj =  {
                        attid : data.Table[0].attdid,
                        pin : data.Table[0].attdcode                    
                    };
                       
                    attmonths.forEach(function (month) {
                        tempobj = tempobj.map((obj) => {            
                            obj.month = month;                            
                            data.Table.forEach(function (data) {                        
                                if (angular.equals(month, data.AttdMonth)) {
                                    attstatus_date.push(data.status,data.date);
                                }
                                obj.date_status= attstatus_date;                               
                            });                  
                            return obj;
                        });
                        tempData.push(tempobj);
                    });

                    console.log(tempData);
                    if (!$scope.days.includes(attData.AttdMonth)) {

                        if (filteredData.date !== undefined) {
                            if (filteredData.date !== null) {
                                var d = filteredData.date.split('-');
                            }
                            if (d !== undefined && d[2] !== null && d[2] !== undefined) {
                                   

                            }
                        }
                        $scope.days.push(attData.AttdMonth);                       
                    }
                });                   
                   
            //}
            },function (error) {

            });

        }




    });
        app.factory('Excel', function ($window) {
            //alert("hello");
            var uri = 'data:application/vnd.ms-excel;base64,',
                template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
                format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
            return {
                tableToExcel: function (tableId, worksheetName) {
                    debugger;
                    var table = $(tableId),
                        ctx = { worksheet: worksheetName, table: table.html() },
                        href = uri + base64(format(template, ctx));
                    return href;
                }
            };
        });  

    });