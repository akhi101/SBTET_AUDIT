define(['app'], function (app) {
    app.controller("StudentTransferReportController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, AcademicService, Excel, $timeout) {

        $scope.loading = false;
        //var data = {};
        //$scope.$emit('showLoading', data);

        var getAcademicYear = AcademicService.getAcademicYears();
        getAcademicYear.then(function (response) {
            if (response.Table.length > 0) {
             
                $scope.getAcademicYears = response.Table;
              
            } else {
              
            }


        },
        function (error) {
            $scope.$emit('hideLoading', data);
         
        })

        $scope.DownloadtoExcel= function(){
            var loadData1 = AcademicService.getTransferReportExcel($scope.AcademicYear)
            loadData1.then(function (res) {

                var data = JSON.parse(res)
                if (data[0].file) {
                    //$scope.Result1 = true;
                    var location = data[0].file;
                    window.location.href = location;
                    $scope.Noresult1 = false;
                    $scope.loading1 = false;
                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.loading1 = false;
                        //$scope.Noresult1 = true;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.loading1 = false;
                        $scope.Noresult1 = true;
                        alert('Something Went Wrong')
                    }

            }, function (error) {
                console.log(error)
                $scope.loading1 = false;
                $scope.gentmetbl = false;
                //$scope.Noresult1 = true;
                $scope.Result1 = false;
                $scope.LoadImg1 = false;
            });
        }

        $scope.GetDetails = function () {
            $scope.loading = true;
            $scope.Noresult = false;
            $scope.result = false;
            var getActiveList = AcademicService.GetAdminTransferedReport($scope.AcademicYear);
            getActiveList.then(function (response) {
                if (response.Table.length > 0) {
                    //console.log(response)
                    $scope.CollegeTransferedList = response.Table;
                      $scope.loading = false;
                    //$scope.$emit('hideLoading', data);
                    $scope.Noresult = false;
                    $scope.result = true;
                    var TransferedCount = 0

                    for (var i = 0; i < response.Table.length; i++) {
                        if (response.Table[i].TransferedCount != null)
                            TransferedCount = TransferedCount + response.Table[i].TransferedCount;
                    }
                    $scope.TransferedCount = TransferedCount;
                } else {
                    //$scope.$emit('hideLoading', data);
                      $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }


            },
            function (error) {
                $scope.$emit('hideLoading', data);
                  $scope.loading = false;
                $scope.Noresult = true;
                $scope.result = false;
            })
        }

        $scope.DownloadExcel = function(){
            var getExcelreport = AcademicService.GetAdminTransferedReportExcel($scope.AcademicYear);
            getExcelreport.then(function (data) {
                $scope.gentmetbl = false;
                if (data.length > 0) {
                    if (data.length > 4) {

                        var location = data;
                        window.location.href = location;

                    } else {
                        alert("Data not Present");
                    }
                } else {
                    alert("Data not Present");
                }
                //$scope.ResultNotFound = false;
                //$scope.ResultFound = false;
                $scope.LoadImg = false;


            }, function (error) {
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.ResultFound = false;
                $scope.LoadImg = false;
            });
        }
        $scope.openReport = function (collegeCode) {
            localStorage.setItem('collegeCode', collegeCode)
            $state.go('Dashboard.Academic.PrincipalTransferReport')
        }
        $scope.DownloadExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'AdminReports');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "Admin_Transfer_Report.xls";
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
    })
})