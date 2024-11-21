define(['app'], function (app) {
    app.controller("CcicFeePaymentReportController", function ($scope, $localStorage, $state, CcicPreExaminationService, Excel, $timeout) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var UserTypeID = parseInt(authData.UserTypeID);
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        $scope.InstitutionID = authData.InstitutionID;
        $scope.allItemsSelected = false;
        $scope.btndisable = false;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getCcicCurrentAcademicYear();
            $scope.feePaymentType();
        }




        $scope.ChangeAcaYr = function (AcademicYearID) {
            $scope.AcademicYearID = AcademicYearID;
            $scope.GetExamMonthYearData(AcademicYearID);
        }

        $scope.ChangeExmmonthYr = function (ExamMonthYear) {
            $scope.ExamMonthYearID = ExamMonthYear;
        }

        $scope.ChangeFeeType = function (FeePaymentType) {
            $scope.FeePaymentTypeID = FeePaymentType;
        }







        $scope.getCcicCurrentAcademicYear = function () {
            var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicFeePaymentAcademicYear();
            getCcicCurrentAcademicYear.then(function (response) {

                $scope.GetCcicCurrentAcademicYear = response;

            },
                function (error) {
                    alert("error while loading CurrentAcademicYear");
                    var err = JSON.parse(error);

                });
        }

        $scope.GetExamMonthYearData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }

            $scope.AcademicYearID = AcademicYearID;
            var getCcicAcademicYearBatch = CcicPreExaminationService.GetExamMonthYears(AcademicYearID)
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetExamMonthYear = res.Table;
                }
                else {
                    $scope.GetExamMonthYear = [];
                }
                for (var j = 1; j < res.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });

        }

        $scope.feePaymentType = function () {
            var LoadfeepaymentType = CcicPreExaminationService.GetFeePaymentType($scope.InstitutionID);
            LoadfeepaymentType.then(function (response) {
                try {
                    var Res = JSON.parse(response)
                }
                catch {

                }
                if (Res.length > 0) {
                    $scope.FeePaymentTypeData = Res;

                } else {
                    $scope.FeePaymentTypeData = [];
                }
            },
                function (error) {
                    alert("error while Data");
                    //console.log(error);
                });

        }

        $scope.getFeePaymentReport = function () {
            //$scope.ExamPayment = null;
            $scope.loading = true;
            var DataType = 1;
            var getdata = CcicPreExaminationService.GetFeePaymentReport(DataType,$scope.InstitutionID, $scope.AcademicYearID, $scope.ExamMonthYearID, $scope.FeePaymentTypeID, $scope.UserName);
            getdata.then(function (Usersdata) {

                if (Usersdata.Table.length > 0 && Usersdata.Table1[0].StatusCode == '200') {
                    $scope.isShowResults = true;
                    $scope.dataBackLog = false;

                    for (var i = 0; i < Usersdata.length; i++) {
                        Usersdata[i].isChecked = false;
                    }

                    $scope.PaymentReport = Usersdata.Table;
                    $scope.loading = false;
                    $scope.NoData = false;
                }
                else if (Usersdata.Table.length <= 0 && Usersdata.Table1[0].StatusCode == '400') {
                    alert(Usersdata.Table1[0].StatusDescription);
                    $scope.NoData = true;
                    $scope.PaymentReport = [];
                    $scope.loading = false;
                    $scope.AcademicModules = [];
                    //alert("No Data Found");
                }

            }, function (err) {
                $scope.isShowResults = false;
            });


        }

        $scope.removeTFromDatetime = function (PaymentDate) {
            if (PaymentDate && typeof PaymentDate === 'string') {
                return PaymentDate.replace('T', ' ');
            }
            return PaymentDate;
        };

        //$scope.DownloadExcel = function (tableid) {
        //    var exportHref = Excel.tableToExcel(tableid, 'AdminReports');
        //    $timeout(function () {
        //        var a = document.createElement('a');
        //        a.href = exportHref;
        //        a.remove();
        //        a.download = "FeePaymentReport.xlsx";
        //        document.body.appendChild(a);
        //        a.click();
        //        a.remove();

        //    }, 100);
        //}

        $scope.FeePaymentReportExcel = function () {
            $scope.loading = true;
            var DataType = 2;
            var feePaymentReportExcel = CcicPreExaminationService.GetFeePaymentReportExcel(DataType,$scope.InstitutionID, $scope.AcademicYearID, $scope.ExamMonthYearID, $scope.FeePaymentTypeID, $scope.UserName);
            feePaymentReportExcel.then(function (res) {
                $scope.loading = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = res;
                    } else {
                        alert("No FeePayment Excel Report Present")
                    }
                } else {
                    alert("No FeePayment Report Present")
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        };


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