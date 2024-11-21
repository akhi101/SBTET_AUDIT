define(['app'], function (app) {
    app.controller("ElectiveMappedReportController", function ($scope, $http, $localStorage, $state, $location, $window, $stateParams, AppSettings, PreExaminationService, Excel, $timeout) {
        var authdata = $localStorage.authorizationData;
        $scope.userType = authdata.SystemUserTypeId
        if ($scope.userType == 1) {
            var ClgCode = '';

        } else if ($scope.userType == 2) {
            var ClgCode = authdata.College_Code
            var userId = authdata.SysUserID;
        } else if ($scope.userType == 3) {
            var ClgCode = authdata.userName
            var BranchCode = authdata.BranchCode;
        } else {
          
        }
        var data = {};
        $scope.$emit('showLoading', data);
        var loadData2 = PreExaminationService.getElectiveMappedReport($scope.userType, ClgCode, BranchCode)
        loadData2.then(function (response) {
            var response = JSON.parse(response)
            if (response.Table[0].ResponceCode=='200') {
                $scope.$emit('hideLoading', data);
                console.log(response)
                $scope.MappedReport = response.Table1;
                //console.log($scope.subjectList1)
                $scope.loading = false;
                $scope.Data = true;
            } else {
                // $scope.Examtypes = [];
                $scope.$emit('hideLoading', data);
                $scope.loading = false;
                $scope.Data = false

                alert("No Data Found");
            }

        },
            function (error) {
                $scope.$emit('hideLoading', data);
                $scope.loading = false;
                $scope.Data = false;
                alert("error while loading Semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
            });

        $scope.OpenDetails = function (collegeCode) {
            localStorage.setItem('ElectiveCollegeCode', collegeCode)
         
            $state.go('Dashboard.Academic.ElectiveMappingSubjectReport')
        }

        $scope.DownloadtoExcel = function () {
            var loadData1 = PreExaminationService.getElectiveMappedReportExcel(1, '', '')
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

        $scope.DownloadSubjectWiseElectiveMappedReportExcel = function () {
            var loadData1 = PreExaminationService.getSubjectWiseElectiveMappedReportExcel(1, '', '')
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