define(['app'], function (app) {
    app.controller("SubBillerReportController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService, MarksEntryService) {
        $scope.SubBillers = ['TSDOFP', 'TSCCIC', 'LATEFEE', 'TSTWSH', 'STUSERVICES'];
        $scope.ExcelView = false;
        $scope.isShowResults = false;
        $scope.RegularDisable = false;
        $scope.selectedSubBiller = "";

        $scope.GetReport = function () {
            if ($scope.selectedSubBiller == '' || $scope.selectedSubBiller == null || $scope.selectedSubBiller == undefined) {
                alert('Please select Sub Biller');
                return;
            }
            if ($scope.setFromDate == '' || $scope.setFromDate == null || $scope.setFromDate == undefined) {
                alert('Please select From Date');
                return;
            }
            if ($scope.setToDate == '' || $scope.setToDate == null || $scope.setToDate == undefined) {
                alert('Please select To Date');
                return;
            }
            $scope.LoadImg = true;
            $scope.isShowResults = true;
            var subBiller = $scope.selectedSubBiller;
            var fromdate = moment($scope.setFromDate).format("YYYY-MM-DD");
            var todate = moment($scope.setToDate).format("YYYY-MM-DD");
            PreExaminationService.GetSubBillerReport(subBiller, fromdate.toString(), todate.toString())
                .then(function (response) {
                    if (response != null && response.length > 1) {
                        var location = window.location.origin;
                        $scope.LoadImg = false;
                        window.location.href =  response;
                        $scope.NoResult = false;
                    } else {
                        $scope.LoadImg = false;
                        alert("Error Generating The Report");
                        $scope.NoResult = true;
                    }
                },
                    function (error) {
                        $scope.LoadImg = false;
                        alert("error data is not getting");
                        var err = JSON.parse(error);
                        console.log(err.Message);
                    });
        }
        $scope.Setdate = function () {
            if (Date.parse($scope.setFromDate) > Date.parse($scope.setToDate)) {
                alert("To Date Should Not Less Then From Date");
                $scope.setToDate = '';

                return false;
            }
        };
        $scope.Todate = function () {
            if (Date.parse($scope.setFromDate) > Date.parse($scope.setToDate)) {
                alert("To Date Should Not Less Then From Date");
                $scope.setFromDate = '';

                return false;
            }
        };

        $scope.printDetails = function (divName) {
            //     $('#myModal').modal('hide')
          
            //var printContents = document.getElementById(divName).innerHTML;

            //var originalContents = document.body.innerHTML;

            //document.body.innerHTML = originalContents;

            window.print();


            //document.body.innerHTML = originalContents;


            //window.print()
        }
        window.document.close();



        $scope.GetCount = function () {
            var Date = moment($scope.Date).format("YYYY-MM-DD");
            var daywiseCount = PreExaminationService.GetSubBillerDayWiseCount(Date);
            daywiseCount.then(function (Res) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                $scope.SubBillerCount = [];
                var TotalRecords = 0;
                var TotalAmountPayed = 0;
                var Success = 0;
                var SuccessAmount = 0;
                var Fail = 0;
                var FailAmount = 0;
                var Rejected = 0;
                var RejectedAmount = 0;

                if (Res.Table.length > 0) {
                    $scope.SubBillerCount = Res.Table;
                    for (var i = 0; i < Res.Table.length; i++) {
                        if (Res.Table[i].TotalRecords != null)
                            TotalRecords = TotalRecords + Res.Table[i].TotalRecords;
                        if (Res.Table[i].TotalAmountPayed != null)
                            TotalAmountPayed = TotalAmountPayed + Res.Table[i].TotalAmountPayed;
                        if (Res.Table[i].Success != null)
                            Success = Success + Res.Table[i].Success;
                        if (Res.Table[i].SuccessAmount != null)
                            SuccessAmount = SuccessAmount + Res.Table[i].SuccessAmount;
                        if (Res.Table[i].Fail != null)
                            Fail = Fail + Res.Table[i].Fail;
                        if (Res.Table[i].FailAmount != null)
                            FailAmount = FailAmount + Res.Table[i].FailAmount;
                        if (Res.Table[i].Rejected != null)
                            Rejected = Rejected + Res.Table[i].Rejected;
                        if (Res.Table[i].RejectedAmount != null)
                            RejectedAmount = RejectedAmount + Res.Table[i].RejectedAmount;
                    
                }
                $scope.TotalRecords = TotalRecords;
                $scope.TotalAmountPayed = TotalAmountPayed;
                $scope.Success = Success;
                $scope.SuccessAmount = SuccessAmount;
                $scope.Fail = Fail;
                $scope.FailAmount = FailAmount;
                $scope.Rejected = Rejected;
                $scope.RejectedAmount = RejectedAmount;
                $scope.loading = false;
                //$scope.$emit('hideLoading', data);
            }
                else {
                    $scope.loading = false;
                    $scope.SubBillerCount = [];
                    //$scope.$emit('hideLoading', data);
                    $scope.NoData = true;
                }
            },
            function (error) {
                //   alert("error while loading Notification");
                var err = JSON.parse(error);
            });
        }

        $scope.GetDayWiseReport = function (DataType,Data) {
            $scope.LoadImg = true;
            $scope.isShowResults = true;
            var subBiller = Data;
            var date = moment($scope.Date).format("YYYY-MM-DD");
            PreExaminationService.GetDayWiseSubBillerReport(DataType, subBiller, date.toString())
                .then(function (response) {
                    if (response != null && response.length > 1) {
                        var location = window.location.origin;
                        $scope.LoadImg = false;
                        window.location.href = '/Reports' + response;
                        $scope.NoResult = false;
                    } else {
                        $scope.LoadImg = false;
                        alert("Error Generating The Report");
                        $scope.NoResult = true;
                    }
                },
                    function (error) {
                        $scope.LoadImg = false;
                        alert("error data is not getting");
                        var err = JSON.parse(error);
                        console.log(err.Message);
                    });
        }



        $scope.DownloadtoExcel = function () {
            if ($scope.Date == '' || $scope.Date == null || $scope.Date == undefined) {
                alert('Please select Date');
                return;
            }

            $scope.LoadImg = true;
            $scope.isShowResults = true;
            var Date = moment($scope.Date).format("YYYY-MM-DD");
            PreExaminationService.GetDayWiseSubBillerCountExcel(Date.toString())
                .then(function (response) {
                    if (response != null && response.length > 1) {
                        var location = window.location.origin;
                        $scope.LoadImg = false;
                        window.location.href =  response;
                        $scope.NoResult = false;
                    } else {
                        $scope.LoadImg = false;
                        alert("Error Generating The Report");
                        $scope.NoResult = true;
                    }
                },
                    function (error) {
                        $scope.LoadImg = false;
                        alert("error data is not getting");
                        var err = JSON.parse(error);
                        console.log(err.Message);
                    });

        }



        $scope.printSubBillerCount = function () {

            var divName = "table-print";
            var $markstable = document.createElement("div");
            $markstable.innerHTML = '';
            $markstable.className = "Pay_Reciept";



            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;

            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            if ($printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";


                document.body.appendChild($printSection);

                var $ele1 = document.createElement("div");
                $ele1.className = "row";

                var $ele2 = document.createElement("div");
                $ele2.className = "col-lg-2 col-md-12";

                var $ele3 = document.createElement("div");
                $ele3.className = "col-lg-10 col-md-12";


                $ele1.appendChild($ele3);

                $printSection.appendChild($ele1);

                $printSection.appendChild($ele1);
                $printSection.appendChild($markstable);

            }

            window.print();


        };



    });
});