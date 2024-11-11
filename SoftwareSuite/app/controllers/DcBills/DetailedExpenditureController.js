define(['app'], function (app) {
    app.controller("DetailedExpenditureController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout,Excel , PreExaminationService) {
        $scope.hideTrue = false;
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

        $scope.ChangeData = function () {
            $scope.hideTrue = false;
        }

        $scope.GetDetails = function () {
            $scope.hideTrue = false;
            $scope.LoadImg = true;
            $scope.NoResult = false;          
            var loadDates = PreExaminationService.GetDcBillsAbstract($scope.monthyear, $scope.AcademicYear, $scope.ExaminationType);
            loadDates.then(function (res) {
                try {
                    var response = JSON.parse(res);
                    console.log(response)} catch (err) { }
                if (response.Table6.length > 0 || response.Table8.length > 0 || response.Table2.length > 0 || response.Table3.length > 0) {                
                    $scope.PracticalExpenditureReport = response.Table6;
                    $scope.PracticalStudentCount = response.Table5
                    if (response.Table5.length > 0) {
                        $scope.PracticalExpenditureReport = _.map($scope.PracticalExpenditureReport, function (item) {
                            return _.extend(item, _.findWhere($scope.PracticalStudentCount, { ExamCenterCode: item.ExamCenterCode, SubjectCode: item.SubjectCode }));
                        });
                    }
                
   
                    console.log($scope.PracticalExpenditureReport)

                    $scope.EventExpenditureReport = response.Table8;
                    $scope.TheoryExpenditureReport = response.Table2;
                    $scope.SeatingReport = response.Table3;
                   

                   
                 

               
                    if (response.Table3.length >0) {
                        $scope.EventExpenditureReport = _.map($scope.EventExpenditureReport, function (item) {
                            return _.extend(item, _.findWhere($scope.SeatingReport, { ExamCenterCode: item.ExamCenterCode }));
                        });
                    }
                    var NO_OF_STUDENTS = 0
                    var NoOfExternalExaminers = 0
                    var TotalPracticalAttenderCharges = 0
                    var TotalPracticalExternalPaperSettingCharges = 0
                    var TotalPracticalInternalPaperSettingCharges = 0
                    var TotalPracticalLocalConveyanceCharges = 0
                    var TotalPracticalPaperValuationCharges = 0
                    var TotalPracticalVivaChargesforSixthSem = 0
                    var TotalPracticalTechnicalAssistantCharges = 0
                    var TotalPracticalWatermanCumSweeperCharges = 0


                    for (var i = 0; i < $scope.PracticalExpenditureReport.length; i++) {
                        if ($scope.PracticalExpenditureReport[i].NO_OF_STUDENTS != null)
                            NO_OF_STUDENTS = NO_OF_STUDENTS + $scope.PracticalExpenditureReport[i].NO_OF_STUDENTS;
                        if ($scope.PracticalExpenditureReport[i].NoOfExternalExaminers != null)
                            NoOfExternalExaminers = NoOfExternalExaminers + $scope.PracticalExpenditureReport[i].NoOfExternalExaminers;
                        if ($scope.PracticalExpenditureReport[i].TotalPracticalAttenderCharges != null)
                            TotalPracticalAttenderCharges = TotalPracticalAttenderCharges + $scope.PracticalExpenditureReport[i].TotalPracticalAttenderCharges;
                        if ($scope.PracticalExpenditureReport[i].TotalPracticalExternalPaperSettingCharges != null)
                            TotalPracticalExternalPaperSettingCharges = TotalPracticalExternalPaperSettingCharges + $scope.PracticalExpenditureReport[i].TotalPracticalExternalPaperSettingCharges;
                        if ($scope.PracticalExpenditureReport[i].TotalPracticalInternalPaperSettingCharges != null)
                            TotalPracticalInternalPaperSettingCharges = TotalPracticalInternalPaperSettingCharges + $scope.PracticalExpenditureReport[i].TotalPracticalInternalPaperSettingCharges;
                        if ($scope.PracticalExpenditureReport[i].TotalPracticalLocalConveyanceCharges != null)
                            TotalPracticalLocalConveyanceCharges = TotalPracticalLocalConveyanceCharges + $scope.PracticalExpenditureReport[i].TotalPracticalLocalConveyanceCharges;
                        if ($scope.PracticalExpenditureReport[i].TotalPracticalPaperValuationCharges != null)
                            TotalPracticalPaperValuationCharges = TotalPracticalPaperValuationCharges + $scope.PracticalExpenditureReport[i].TotalPracticalPaperValuationCharges;
                        if ($scope.PracticalExpenditureReport[i].TotalPracticalVivaChargesforSixthSem != null)
                            TotalPracticalVivaChargesforSixthSem = TotalPracticalVivaChargesforSixthSem + $scope.PracticalExpenditureReport[i].TotalPracticalVivaChargesforSixthSem;
                        if ($scope.PracticalExpenditureReport[i].TotalPracticalTechnicalAssistantCharges != null)
                            TotalPracticalTechnicalAssistantCharges = TotalPracticalTechnicalAssistantCharges + $scope.PracticalExpenditureReport[i].TotalPracticalTechnicalAssistantCharges;
                        if ($scope.PracticalExpenditureReport[i].TotalPracticalWatermanCumSweeperCharges != null)
                            TotalPracticalWatermanCumSweeperCharges = TotalPracticalWatermanCumSweeperCharges + $scope.PracticalExpenditureReport[i].TotalPracticalWatermanCumSweeperCharges;

                    }

                    $scope.NO_OF_STUDENTS = Math.round(NO_OF_STUDENTS);
                    $scope.NoOfExternalExaminers = Math.round(NoOfExternalExaminers);
                    $scope.TotalPracticalAttenderCharges = Math.round(TotalPracticalAttenderCharges);
                    $scope.TotalPracticalExternalPaperSettingCharges = Math.round(TotalPracticalExternalPaperSettingCharges);
                    $scope.TotalPracticalInternalPaperSettingCharges = Math.round(TotalPracticalInternalPaperSettingCharges);
                    $scope.TotalPracticalLocalConveyanceCharges = Math.round(TotalPracticalLocalConveyanceCharges);
                    $scope.TotalPracticalPaperValuationCharges = Math.round(TotalPracticalPaperValuationCharges);
                    $scope.TotalPracticalVivaChargesforSixthSem = Math.round(TotalPracticalVivaChargesforSixthSem);
                    $scope.TotalPracticalTechnicalAssistantCharges = Math.round(TotalPracticalTechnicalAssistantCharges);
                    $scope.TotalPracticalWatermanCumSweeperCharges = Math.round(TotalPracticalWatermanCumSweeperCharges);
                    $scope.TotalPracticalAmount = Math.round(NO_OF_STUDENTS + NoOfExternalExaminers + TotalPracticalAttenderCharges + TotalPracticalExternalPaperSettingCharges + TotalPracticalInternalPaperSettingCharges + TotalPracticalLocalConveyanceCharges +
                        TotalPracticalPaperValuationCharges + TotalPracticalVivaChargesforSixthSem + TotalPracticalTechnicalAssistantCharges + TotalPracticalWatermanCumSweeperCharges);





                    var AoNotification = 0
                    var SeatclerkCharges = 0
                    var Superintendent = 0
                    var TotalSeatingCharges = 0

                    for (var i = 0; i < $scope.EventExpenditureReport.length; i++) {
                        if ($scope.EventExpenditureReport[i].AoNotification != null)
                            AoNotification = AoNotification + $scope.EventExpenditureReport[i].AoNotification;
                        if ($scope.EventExpenditureReport[i].SeatclerkCharges != null)
                            SeatclerkCharges = SeatclerkCharges + $scope.EventExpenditureReport[i].SeatclerkCharges;
                        if ($scope.EventExpenditureReport[i].Superintendent != null)
                            Superintendent = Superintendent + $scope.EventExpenditureReport[i].Superintendent;
                        if ($scope.EventExpenditureReport[i].TotalSeatingCharges != null)
                            TotalSeatingCharges = TotalSeatingCharges + $scope.EventExpenditureReport[i].TotalSeatingCharges;

                    }

                    $scope.AoNotification = Math.round(AoNotification);
                    $scope.SeatclerkCharges = Math.round(SeatclerkCharges);
                    $scope.Superintendent = Math.round(Superintendent);
                    $scope.TotalSeatingCharges = Math.round(TotalSeatingCharges);

                    var ChiefSuperintendent = 0
                    var DeliveryChargesPerDay = 0
                    var ExaminationClerk_TypingCharges = 0
                    var InternalFlyingSquadCharges = 0
                    var JointChiefSuperintendent = 0
                    var PoliceBandobasth = 0
                    var StudentStrength = 0
                    var TotalControlRoomCharges = 0
                    var TotalEDEPCharges = 0
                    var TotalInvigilatorcharges = 0
                    var TotalPrintingCharges = 0
                    var TotalTheoryAttenderCumWatermanCumSweeperChargesPerSubject = 0

                    for (var i = 0; i < $scope.TheoryExpenditureReport.length; i++) {
                        if ($scope.TheoryExpenditureReport[i].ChiefSuperintendent != null)
                            ChiefSuperintendent = ChiefSuperintendent + $scope.TheoryExpenditureReport[i].ChiefSuperintendent;
                        if ($scope.TheoryExpenditureReport[i].DeliveryChargesPerDay != null)
                            DeliveryChargesPerDay = DeliveryChargesPerDay + $scope.TheoryExpenditureReport[i].DeliveryChargesPerDay;
                        if ($scope.TheoryExpenditureReport[i].ExaminationClerk_TypingCharges != null)
                            ExaminationClerk_TypingCharges = ExaminationClerk_TypingCharges + $scope.TheoryExpenditureReport[i].ExaminationClerk_TypingCharges;
                        if ($scope.TheoryExpenditureReport[i].InternalFlyingSquadCharges != null)
                            InternalFlyingSquadCharges = InternalFlyingSquadCharges + $scope.TheoryExpenditureReport[i].InternalFlyingSquadCharges;
                        if ($scope.TheoryExpenditureReport[i].JointChiefSuperintendent != null)
                            JointChiefSuperintendent = JointChiefSuperintendent + $scope.TheoryExpenditureReport[i].JointChiefSuperintendent;
                        if ($scope.TheoryExpenditureReport[i].PoliceBandobasth != null)
                            PoliceBandobasth = PoliceBandobasth + $scope.TheoryExpenditureReport[i].PoliceBandobasth;
                        if ($scope.TheoryExpenditureReport[i].StudentStrength != null)
                            StudentStrength = StudentStrength + $scope.TheoryExpenditureReport[i].StudentStrength;
                        if ($scope.TheoryExpenditureReport[i].TotalControlRoomCharges != null)
                            TotalControlRoomCharges = TotalControlRoomCharges + $scope.TheoryExpenditureReport[i].TotalControlRoomCharges;
                        if ($scope.TheoryExpenditureReport[i].TotalEDEPCharges != null)
                            TotalEDEPCharges = TotalEDEPCharges + $scope.TheoryExpenditureReport[i].TotalEDEPCharges;
                        if ($scope.TheoryExpenditureReport[i].TotalInvigilatorcharges != null)
                            TotalInvigilatorcharges = TotalInvigilatorcharges + $scope.TheoryExpenditureReport[i].TotalInvigilatorcharges;
                        if ($scope.TheoryExpenditureReport[i].TotalPrintingCharges != null)
                            TotalPrintingCharges = TotalPrintingCharges + $scope.TheoryExpenditureReport[i].TotalPrintingCharges;
                        if ($scope.TheoryExpenditureReport[i].TotalTheoryAttenderCumWatermanCumSweeperChargesPerSubject != null)
                            TotalTheoryAttenderCumWatermanCumSweeperChargesPerSubject = TotalTheoryAttenderCumWatermanCumSweeperChargesPerSubject + $scope.TheoryExpenditureReport[i].TotalTheoryAttenderCumWatermanCumSweeperChargesPerSubject;
                    }

                    $scope.ChiefSuperintendent = Math.round(ChiefSuperintendent);
                    $scope.DeliveryChargesPerDay = Math.round(DeliveryChargesPerDay);
                    $scope.ExaminationClerk_TypingCharges = Math.round(ExaminationClerk_TypingCharges);
                    $scope.InternalFlyingSquadCharges = Math.round(InternalFlyingSquadCharges);
                    $scope.JointChiefSuperintendent = Math.round(JointChiefSuperintendent);
                    $scope.PoliceBandobasth = Math.round(PoliceBandobasth);
                    $scope.StudentStrength = Math.round(StudentStrength);
                    $scope.TotalControlRoomCharges = Math.round(TotalControlRoomCharges);
                    $scope.TotalEDEPCharges = Math.round(TotalEDEPCharges);
                    $scope.TotalInvigilatorcharges = Math.round(TotalInvigilatorcharges);
                    $scope.TotalPrintingCharges = Math.round(TotalPrintingCharges);
                    $scope.TotalTheoryAttenderCumWatermanCumSweeperChargesPerSubject = Math.round(TotalTheoryAttenderCumWatermanCumSweeperChargesPerSubject);
                    $scope.TotalTheoryAmount = Math.round(ChiefSuperintendent + DeliveryChargesPerDay + ExaminationClerk_TypingCharges + InternalFlyingSquadCharges + JointChiefSuperintendent + PoliceBandobasth +
                        StudentStrength + TotalControlRoomCharges + TotalEDEPCharges + TotalInvigilatorcharges + TotalPrintingCharges + TotalTheoryAttenderCumWatermanCumSweeperChargesPerSubject);

                
                    $scope.LoadImg = false;
                    $scope.NoResult = false;
                    $scope.hideTrue = true;
                } else {
                    $scope.TheoryExpenditureReport = [];
                    $scope.EventExpenditureReport = [];
                    $scope.PracticalExpenditureReport = [];
                    alert("Data not found");
                    $scope.LoadImg = false;
                    $scope.NoResult = true;    
                }
            },
            function (error) {
                alert("Data not found");
                console.log(error);
                $scope.LoadImg = false;
                $scope.NoResult = true;   
            });

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
            var exportHref = Excel.tableToExcel(tableid, Mnthyrlbl + '_' + Studlbl+'_'+'Theory_Expenditure');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();            
                a.download = Mnthyrlbl + '_' + Studlbl + '_' +"Theory_Expenditure.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }

        $scope.DownloadtoExcel1 = function (tableid) {
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
            var exportHref = Excel.tableToExcel(tableid, Mnthyrlbl + '_' + Studlbl + '_' +'Practical_Expenditure');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = Mnthyrlbl + '_' + Studlbl + '_' +"Practical_Expenditure.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }

        $scope.DownloadtoExcel2 = function (tableid) {
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
            var exportHref = Excel.tableToExcel(tableid, Mnthyrlbl + '_' + Studlbl + '_' +'Event_Expenditure');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = Mnthyrlbl + '_' + Studlbl + '_' +"Event_Expenditure.xls";
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