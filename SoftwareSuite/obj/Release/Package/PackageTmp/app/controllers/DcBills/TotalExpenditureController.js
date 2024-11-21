define(['app'], function (app) {
    app.controller("TotalExpenditureController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal,Excel, $timeout, PreExaminationService) {

        $scope.percent = 0.8
        $scope.search = '';
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
            $scope.NoData = false;
            $scope.LoadImg = true;
            $scope.FinalList = [];
            var loadDates = PreExaminationService.GetDcBillsAbstract($scope.monthyear, $scope.AcademicYear, $scope.ExaminationType);
            loadDates.then(function (res) {
                var response = JSON.parse(res)
                    console.log(response)
                if (response.Table4.length > 0 || response.Table9.length > 0 || response.Table7.length > 0 || response.Table10.length > 0) {
                   
                    $scope.CollegeWiseReport = response.Table7;
                    $scope.EventwiseReport = response.Table9;
                    $scope.Eventrep = response.Table3;
                    $scope.DaywiseReport = response.Table4;
                    $scope.BanksReport = response.Table10;
                    $scope.RadioChange();
                    $scope.LoadImg = false;
                    $scope.NoData = false;
                } else {
                    $scope.CollegeWiseReport = [];
                    $scope.DaywiseReport= [];
                    $scope.BanksReport = [];
                    alert("No data found");
                    $scope.LoadImg = false;
                    $scope.NoData = true;
                }
            },
            function (error) {
                alert("No data found");
                $scope.LoadImg = false;
                $scope.NoData = true;
            });

          
         
        }
        


        $scope.RadioChange = function (SubId, Score, DescriptionId, position) {
            $scope.FinalList = [];
            var mergedList = _.map($scope.BanksReport, function (item) {               
                return _.extend(item, _.findWhere($scope.EventwiseReport, { ExamCenterCode: item.ExamCenterCode }));
            }); 
            
            var mergedList4 = _.map($scope.Eventrep, function (item) {
                return _.extend(item, _.findWhere(mergedList, { ExamCenterCode: item.ExamCenterCode }));
            });
            var mergedList5 = _.map($scope.CollegeWiseReport, function (item) {
                return _.extend(item, _.findWhere(mergedList4, { ExamCenterCode: item.ExamCenterCode }));
            });
            var mergedList2 = _.map(mergedList5, function (item) {
                return _.extend(item, _.findWhere(mergedList, { ExamCenterCode: item.ExamCenterCode }));
            }); 

            var mergedList3 = _.map($scope.DaywiseReport, function (item) {
                return _.extend(item, _.findWhere(mergedList, { ExamCenterCode: item.ExamCenterCode }));
            });
            if ($scope.DaywiseReport.length > 0 && $scope.CollegeWiseReport.length > 0) {
                $scope.FinalList = _.map(mergedList2, function (item) {
                    return _.extend(item, _.findWhere(mergedList3, { ExamCenterCode: item.ExamCenterCode }));
                });
                console.log($scope.FinalList)
                } else if ($scope.DaywiseReport.length <= 0) {
                    $scope.FinalList = mergedList2;
                } else if ($scope.CollegeWiseReport.length <= 0) {
                $scope.FinalList = mergedList3;
               
                } else {
                    $scope.FinalList = [];
                }
           
            var TotalSessionalAmount = 0
            var TotalPracticalAmount = 0
            var TotalSeatingCharges = 0
            var TotalEventwiseAmount = 0
          
            for (var i = 0; i < $scope.FinalList.length; i++) {
                if ($scope.FinalList[i].TotalSessionalAmount != null)
                    TotalSessionalAmount = TotalSessionalAmount + $scope.FinalList[i].TotalSessionalAmount;
                if ($scope.FinalList[i].TotalPracticalAmount != null)
                    TotalPracticalAmount = TotalPracticalAmount + $scope.FinalList[i].TotalPracticalAmount;
                if ($scope.FinalList[i].TotalSeatingCharges != null)
                    TotalSeatingCharges = TotalSeatingCharges + $scope.FinalList[i].TotalSeatingCharges;
                
                if ($scope.FinalList[i].TotalEventwiseAmount != null)
                    TotalEventwiseAmount = TotalEventwiseAmount + $scope.FinalList[i].TotalEventwiseAmount;
               
            }

            $scope.TotalSessionalAmount = Math.round(TotalSessionalAmount);
            $scope.TotalPracticalAmount = Math.round(TotalPracticalAmount);
            $scope.TotalSeatingCharges = Math.round(TotalSeatingCharges);
            $scope.TotalEventwiseAmount = Math.round(TotalEventwiseAmount) + Math.round(TotalSeatingCharges);
            $scope.TotalAmount = Math.round(TotalSessionalAmount + TotalPracticalAmount + TotalEventwiseAmount + TotalSeatingCharges);
            $scope.TotalPercentage = Math.round($scope.TotalAmount * $scope.percent);

            console.log($scope.TotalPercentage)
           
            $scope.LoadImg = false;

            if ($scope.FinalList.length<=0) {
                $scope.NoData = true;
            }
                     
        }
        $scope.DownloadtoExcel = function (tableid) {
            var Mnthyrlbl = "";
            var Studlbl = "";
             $scope.GetExamMonthYear.forEach(function (item) {
                if ($scope.monthyear == item.Id) {
                    Mnthyrlbl = item.ExamYearMonth;
                }
            });
            $scope.StudentTypes.forEach(function (item1) {
                if ($scope.ExaminationType == item1.id) {
                    Studlbl = item1.type;
                }
            }); 
            var exportHref = Excel.tableToExcel(tableid, Mnthyrlbl + '_' + Studlbl + '_' + "TotalExpenditure.xls");
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = Mnthyrlbl + '_' + Studlbl + '_' +"TotalExpenditure.xls";
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
    });
})