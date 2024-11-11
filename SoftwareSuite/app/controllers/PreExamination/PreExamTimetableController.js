define(['app'], function (app) {
    app.controller("PreExamTimetableController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, StudentResultService, PreExaminationService) {

       
            var GetMonthYear = PreExaminationService.GetMonthYear()
            GetMonthYear.then(function (response) {

                $scope.GetExamMonthYear = response.Table;


            },
                function (error) {
                    alert("data is not loaded");

                });
        


            $scope.GetTimeTableDetails = function () {
                $scope.selAcademicYear = 43;
            if ($scope.selAcademicYear == null || $scope.selAcademicYear == undefined || $scope.selAcademicYear == "") {
                alert("Select Academic Year.");
                return;
            }

        
            $scope.GetMasterSessions = [];
            $scope.ReportFound = false;
            $scope.Noreports = false;

            var SchemeSem = PreExaminationService.GetPrincipalTimetable($scope.selAcademicYear);
            SchemeSem.then(function (data) {
                //try { var data = JSON.parse(data) } catch (err) { }

                if (data.Table.length > 0) {
                    $scope.ReportFound = true;
                    $scope.Noreports = false;
                    $scope.GetMasterschemeSem = data.Table;
                    for (var j = 1; j < data.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                } else {
                    $scope.ReportFound = false;
                    $scope.Noreports = true;
                }
            }, function (error) {
                $scope.GetMasterschemeSem = [];
                $scope.ReportFound = fale;
                $scope.Noreports = true;
            });


            }
            $scope.GetExamYearMonth = function (selAcademicYear) {
                var ApprovalLists = PreExaminationService.GetExamMonthYearAcademicYear(selAcademicYear);
                ApprovalLists.then(function (response) {
                    $scope.MonthAndYear = response.Table;

                }, function (error) {
                    alert("error while loading Academic Year");

                });
            }

            $scope.Exams = [
              { id: 1, exam: "Mid 1" },
              { id: 2, exam: "Mid 2" },
              { id: 10, exam: "Semester" }
            ];

            var LoadExamTypeBysem = PreExaminationService.getStudentType();
            LoadExamTypeBysem.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.StudentType = response.Table;
                } else {
                    $scope.StudentType = [];
                    alert("No Student found on this Record");
                }
            },
                function (error) {
                    alert("error while loading Student Types");

                });

            var SCHEMESEMINFO = StudentResultService.GetSchemeDataForResults();
            SCHEMESEMINFO.then(function (data) {
                if (data.length > 0) {
                    $scope.schemeinfo = data;
                }
            }, function (error) {
                alert("unable to load Schemes");
            });
            //$scope.GetTimetableExcel = function () {
            //    if ($scope.selAcademicYear == null || $scope.selAcademicYear == undefined || $scope.selAcademicYear == "") {
            //        alert("Select Academic Year.");
            //        return;
            //    }
            //    if ($scope.monthyear == null || $scope.monthyear == undefined || $scope.monthyear == "") {
            //        alert("Select Month/Year of Exam.");
            //        return;
            //    }
            //    var getpdfTimeTableExcel = PreExaminationService.GetPrincipalTimetableExcel($scope.monthyear);
            //    getpdfTimeTableExcel.then(function (data) {
            //        $scope.gentmetbl = false;
            //        if (data.length > 0) {
            //            if (data.length > 4) {
            //                $scope.Result = true;
            //                var location = data;
            //                window.location.href = location;

            //            } else {
            //                alert("Timetable not Found");
            //            }
            //        } else {
            //            alert("Timetable not Found");
            //        }
            //        //$scope.ResultNotFound = false;
            //        //$scope.ResultFound = false;
            //        $scope.LoadImg = false;


            //    }, function (error) {
            //        $scope.gentmetbl = false;
            //        $scope.ResultNotFound = true;
            //        $scope.Result = false;
            //        $scope.LoadImg = false;
            //    });
            //}

            //$scope.getpdfTimeTableData = function () {
            //    if ($scope.selAcademicYear == null || $scope.selAcademicYear == undefined || $scope.selAcademicYear == "") {
            //        alert("Select Academic Year.");
            //        return;
            //    }
            //    if ($scope.monthyear == null || $scope.monthyear == undefined || $scope.monthyear == "") {
            //        alert("Select Month/Year of Exam.");
            //        return;
            //    }
            //    var DataTypeId = 1;
            //    $scope.LoadImg = true;
            //    $scope.gentmetbl = true;
            //    var getpdfTimeTableData = PreExaminationService.GetPrincipalTimeTablePdf($scope.monthyear);
            //    getpdfTimeTableData.then(function (data) {
            //        $scope.gentmetbl = false;
            //        if (data.length > 0) {
            //            if (data.length > 4) {

            //                $scope.LoadImg = false;
            //                $scope.Result = true;
            //                var location = '/Reports/' + data + '.pdf';

            //                var url = window.location.origin + location;

            //                window.open(url);

            //            } else {
            //                $scope.LoadImg = false;
            //                alert("Timetable not Present");
            //            }
            //        } else {
            //            $scope.LoadImg = false;
            //            alert("Timetable not Present");
            //        }
            //        //$scope.ResultNotFound = false;
            //        //$scope.ResultFound = false;
            //        $scope.LoadImg = false;


            //    }, function (error) {
            //        $scope.gentmetbl = false;
            //        $scope.ResultNotFound = true;
            //        $scope.Result = false;
            //        $scope.LoadImg = false;
            //    });

        //}

            $scope.getpdfTimeTableData = function () {
                if ($scope.selAcademicYear1 == null || $scope.selAcademicYear1 == undefined || $scope.selAcademicYear1 == "") {
                    alert("Select Academic Year.");
                    return;
                }

                if ($scope.monthyear1 == null || $scope.monthyear1 == undefined || $scope.monthyear1 == "") {
                    alert("Select Month and Year.");
                    return; 00
                }
                if ($scope.SelStudentType1 == null || $scope.SelStudentType1 == undefined || $scope.SelStudentType1 == "") {
                    alert("Select student type.");
                    return;
                }
                if ($scope.selscheme1 == null || $scope.selscheme1 == undefined || $scope.selscheme1 == "") {
                    alert("select Scheme.");
                    return;
                }
                if ($scope.examtype1 == null || $scope.examtype1 == undefined || $scope.examtype1 == "") {
                    alert("Select exam type");
                    return;
                }
                var DataTypeId = 1;
                $scope.LoadImg = true;
                $scope.gentmetbl = true;
                //TimeTablePdfAdmin
                var getpdfTimeTableData = PreExaminationService.TimeTablePdf(parseInt($scope.selAcademicYear1), parseInt($scope.monthyear1), parseInt($scope.SelStudentType1), parseInt($scope.examtype1), parseInt($scope.selscheme1), DataTypeId);
                getpdfTimeTableData.then(function (data) {
                    $scope.gentmetbl = false;
                    if (data.length > 0) {
                        if (data.length > 4) {

                            $scope.LoadImg = false;
                            $scope.Result = true;
                            var location = '/Reports/' + data + '.pdf';

                            var url = window.location.origin + location;

                            window.open(url);

                        } else {
                            $scope.LoadImg = false;
                            alert("Timetable not Present");
                        }
                    } else {
                        $scope.LoadImg = false;
                        alert("Timetable not Present");
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


            $scope.exportTimetableToExcel = function (tableid) {
                if ($scope.selAcademicYear1 == null || $scope.selAcademicYear1 == undefined || $scope.selAcademicYear1 == "") {
                    alert("Select Academic Year.");
                    return;
                }

                if ($scope.monthyear1 == null || $scope.monthyear1 == undefined || $scope.monthyear1 == "") {
                    alert("Select Month and Year.");
                    return;
                }
                if ($scope.SelStudentType1 == null || $scope.SelStudentType1 == undefined || $scope.SelStudentType1 == "") {
                    alert("Select student type.");
                    return;
                }
                if ($scope.selscheme1 == null || $scope.selscheme1 == undefined || $scope.selscheme1 == "") {
                    alert("select Scheme.");
                    return;
                }
                if ($scope.examtype1 == null || $scope.examtype1 == undefined || $scope.examtype1 == "") {
                    alert("Select exam type");
                    return;
                }
                var DataTypeId = 2

                $scope.gentmetbl = true;
                //TimeTableXlsxAdmin
                var getpdfTimeTableData = PreExaminationService.TimeTableXlsx(parseInt($scope.selAcademicYear1), parseInt($scope.monthyear1), parseInt($scope.SelStudentType1), parseInt($scope.examtype1), parseInt($scope.selscheme1), DataTypeId);
                getpdfTimeTableData.then(function (data) {
                    $scope.gentmetbl = false;
                    if (data.length > 0) {
                        if (data.length > 4) {
                            $scope.Result = true;
                            var location = data;
                            window.location.href = location;

                        } else {
                            alert("Timetable not Present");
                        }
                    } else {
                        alert("Timetable not Present");
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
                //var exportHref = Excel.tableToExcel(tableid, 'TimeTable');
                //$timeout(function () {
                //    var a = document.createElement('a');
                //    a.href = exportHref;
                //    a.download = "TimeTable.xls";
                //    document.body.appendChild(a);
                //    a.click();
                //    a.remove();
                //}, 100);
            }

            $scope.exportTimetableEdepToExcel = function (tableid) {
                if ($scope.selAcademicYear1 == null || $scope.selAcademicYear1 == undefined || $scope.selAcademicYear1 == "") {
                    alert("Select Academic Year.");
                    return;
                }

                if ($scope.monthyear1 == null || $scope.monthyear1 == undefined || $scope.monthyear1 == "") {
                    alert("Select Month and Year.");
                    return;
                }
                if ($scope.SelStudentType1 == null || $scope.SelStudentType1 == undefined || $scope.SelStudentType1 == "") {
                    alert("Select student type.");
                    return;
                }
                if ($scope.selscheme1 == null || $scope.selscheme1 == undefined || $scope.selscheme1 == "") {
                    alert("select Scheme.");
                    return;
                }
                if ($scope.examtype1 == null || $scope.examtype1 == undefined || $scope.examtype1 == "") {
                    alert("Select exam type");
                    return;
                }

                var DataTypeId = 3
                $scope.gentmetbl = true;
                var getpdfTimeTableData = PreExaminationService.TimeTableEdepXlsx(parseInt($scope.selAcademicYear1), parseInt($scope.monthyear1), parseInt($scope.SelStudentType1), parseInt($scope.examtype1), parseInt($scope.selscheme1), DataTypeId);
                getpdfTimeTableData.then(function (data) {
                    $scope.gentmetbl = false;
                    if (data.length > 0) {
                        if (data.length > 4) {

                            var location = data;
                            window.location.href = location;

                        } else {
                            alert("Timetable not Present");
                        }
                    } else {
                        alert("Timetable not Present");
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
                //var exportHref = Excel.tableToExcel(tableid, 'TimeTable');
                //$timeout(function () {
                //    var a = document.createElement('a');
                //    a.href = exportHref;
                //    a.download = "TimeTable.xls";
                //    document.body.appendChild(a);
                //    a.click();
                //    a.remove();
                //}, 100);
            }

    })
})