define(['app'], function (app) {
    app.controller("MarksMemoApprovalController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService, $uibModal, Excel, $timeout) {

        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;
        var data = {};
        $scope.$emit('showLoading', data);
        $scope.Data = false;
        $scope.Nodata = false;


        //window.setTimeout(function () {
        //    window.location.reload();
        //}, 3000);

        var ApproveList = PreExaminationService.GetDuplicateMarksMemoApprovalList($scope.UserTypeId);
        ApproveList.then(function (response) {
            var response = JSON.parse(response)
            console.log(response);
            if (response.Table.length > 0) {
                $scope.$emit('hideLoading', data);

                $scope.Data = true;
                $scope.Nodata = false;
                $scope.ApprovalData = response.Table;
                var ApprovalPending = 0
                var Approved = 0;
                var SentToCollege = 0;
                var Rejected = 0;
                var ForCertificatePrint = 0;
                var Printed = 0;

                for (var i = 0; i < response.Table.length; i++) {
                    if (response.Table[i].ApprovalPending != null)
                        ApprovalPending = ApprovalPending + response.Table[i].ApprovalPending;
                    if (response.Table[i].Approved != null)
                        Approved = Approved + response.Table[i].Approved;
                    if (response.Table[i].SentToCollege != null)
                        SentToCollege = SentToCollege + response.Table[i].SentToCollege;
                    if (response.Table[i].Rejected != null)
                        Rejected = Rejected + response.Table[i].Rejected;
                    if (response.Table[i].ForCertificatePrint != null)
                        ForCertificatePrint = ForCertificatePrint + response.Table[i].ForCertificatePrint;
                    if (response.Table[i].Printed != null)
                        Printed = Printed + response.Table[i].Printed;

                }

                $scope.ApprovalPending = ApprovalPending;
                $scope.Approved = Approved;
                $scope.SentToCollege = SentToCollege;
                $scope.Rejected = Rejected;
                $scope.ForCertificatePrint = ForCertificatePrint;
                $scope.Printed = Printed;
            } else {
                $scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
            }

            $scope.DownloadtoExcel = function () {
                var CertificateFeePaymentReports = PreExaminationService.CertificateFeePaymentReports($scope.Scheme);
                CertificateFeePaymentReports.then(function (res) {

                    if (res.length > 0) {
                        if (res.length > 4) {
                            window.location.href = res;
                        } else {
                            alert("No Excel Report Present")
                        }
                    } else {
                        alert("No Report Present")
                    }
                }, function (err) {
                    $scope.LoadImg = false;
                    alert("Error while loading");
                });

            }


        },
        function (error) {
            $scope.$emit('hideLoading', data);

            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
        });


        $scope.DownloadExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'MarksMemosCount');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "MarksMemosCount.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();

            }, 100);
        }

        $scope.ApprovePending = function (Scheme) {
            $scope.ApproveType = 0;
            //localStorage.setItem('ApproveType', $scope.ApproveType)
            $localStorage.CertificateData = {
                ApproveType: $scope.ApproveType,
                Scheme: Scheme
            }

            $state.go('Dashboard.PostExam.MarksMemoApprovalDetails');
        }
        $scope.ApprovedList = function (Scheme) {
            $scope.ApproveType = 1;
            $localStorage.CertificateData = {
                ApproveType: $scope.ApproveType,
                Scheme: Scheme
            }
            $state.go('Dashboard.PostExam.MarksMemoApprovalDetails');
        }

        $scope.SendToCollege = function (Scheme) {
            $scope.ApproveType = 3;
            $localStorage.CertificateData = {
                ApproveType: $scope.ApproveType,
                Scheme: Scheme
            }
            $state.go('Dashboard.PostExam.MarksMemoApprovalDetails');
        }

        $scope.PrintData = function (Scheme) {
            $scope.ApproveType = 4;
            $localStorage.CertificateData = {
                ApproveType: $scope.ApproveType,
                Scheme: Scheme
            }
            $state.go('Dashboard.PostExam.MarksMemoApprovalDetails');
        }

        $scope.RejectedList = function (Scheme) {
            $scope.ApproveType = 2;
            $localStorage.CertificateData = {
                ApproveType: $scope.ApproveType,
                Scheme: Scheme
            }
            $state.go('Dashboard.PostExam.MarksMemoApprovalDetails');
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