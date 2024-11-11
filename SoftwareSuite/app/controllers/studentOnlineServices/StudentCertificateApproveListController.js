define(['app'], function (app) {
    app.controller("StudentCertificateApproveListController", function ($scope, $q, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService,Excel, $timeout) {
      //  $scope.ApprovalData = [{ "Scheme": "C16", "ApprovalPending": "10", "Approved": "15", "SentToCollege": "20", "Rejected": "5" }]
        var authData = $localStorage.authorizationData;

        $scope.UserTypeId = authData.SystemUserTypeId;
        var data = {};
        $scope.$emit('showLoading', data);
        $scope.Data = false;
        $scope.Nodata = false;

        var ApproveList = PreExaminationService.GetInternApproveList($scope.UserTypeId);
        ApproveList.then(function (response) {
            var response = JSON.parse(response);
            console.log(response.Table.length);
            if (response.Table.length > 0) {
                $scope.$emit('hideLoading', data);
                $scope.ApprovalData = response.Table;
                $scope.Data = true;
                $scope.Nodata = false;
                var ApprovalPending = 0
                var Approved = 0;
                //var SentToCollege = 0;
                var Rejected = 0;

                for (var i = 0; i < $scope.ApprovalData.length; i++) {
                    if ($scope.ApprovalData[i].ApprovalPending != null)
                        ApprovalPending = ApprovalPending + $scope.ApprovalData[i].ApprovalPending;
                    if ($scope.ApprovalData[i].Approved != null)
                        Approved = Approved + $scope.ApprovalData[i].Approved;
                   
                    if ($scope.ApprovalData[i].Rejected != null)
                        Rejected = Rejected + $scope.ApprovalData[i].Rejected;

                }

                $scope.ApprovalPending = ApprovalPending;
                $scope.Approved = Approved;
               
                $scope.Rejected = Rejected;

           
        } else {
                $scope.$emit('hideLoading', data);
              
        $scope.Data = false;
        $scope.Nodata = true;
    }       
},
        function (error) {
            $scope.$emit('hideLoading', data);
          
            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });


        $scope.ApprovedList = function () {
           
        }

        $scope.DownloadExcel = function (tableid) {            
            var exportHref = Excel.tableToExcel(tableid, 'InterimCount');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "InterimData.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();

            }, 100);
        }


        $scope.ApprovePending = function (Scheme, count) {
            if (count >= 1) {
                $scope.ApproveType = 0;

                $localStorage.CertificateData = {
                    ApproveType: $scope.ApproveType,
                    Scheme: Scheme
                }

                $state.go('Dashboard.PostExam.StudentCertificateApproveListDetails');
            }
        }
        $scope.ApprovedList = function (Scheme, count) {
            if (count >= 1) {
                $scope.ApproveType = 1;
                $localStorage.CertificateData = {
                    ApproveType: $scope.ApproveType,
                    Scheme: Scheme
                }
                $state.go('Dashboard.PostExam.StudentCertificateApproveListDetails');
            }
        }

        
        $scope.RejectedList = function (Scheme, count) {
            if (count >= 1) {
                $scope.ApproveType = 2;
                $localStorage.CertificateData = {
                    ApproveType: $scope.ApproveType,
                    Scheme: Scheme
                }
                $state.go('Dashboard.PostExam.StudentCertificateApproveListDetails');
            }
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