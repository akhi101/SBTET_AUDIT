define(['app'], function (app) {
    app.controller("StudentMobileAppResultController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, StudentResultService, Excel, $timeout) {
        $scope.examtype = "";
        $scope.sem = "";
        //
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetExamMonthYear();
            $scope.scheme = {
                schemeid: $stateParams.SchemeId
            }
            $scope.sem = {
                semid: $stateParams.SemYearId
            }
            $scope.SelStudentType = {
                id: $stateParams.StudentTypeId
            }

            $scope.monthyear = {
                Id: $stateParams.ExamMonthYearId
            }
            $scope.Pin = $stateParams.Pin;
            $scope.examtype = $stateParams.ExamTypeId;
        
            $scope.Submit();
        }

       
       
        // giving default selec values at the time of startup

        ////const $ctrl = this;
        ////$ctrl.$onInit = () => {
        ////    $scope.monthyear = { Id: 4 }
        ////    $scope.scheme = {
        ////        schemeid: '5'
        ////    }
        ////    $scope.SelStudentType = {
        ////        id: 1
        ////    }
        ////    $scope.sem = {
        ////        semid: 1
        ////    }
        ////     $scope.scheme = { schemeid: '5' };
        ////    $scope.loadSemExamTypes($scope.scheme);
        ////    $scope.loadExamTypes($scope.sem);

        ////}

        // get month and year of examination
        $scope.GetExamMonthYear = function () {
            var GetExamMonthYear = StudentResultService.GetExamMonthYear();
            $scope.seminfo = [];
            $scope.examtypeinfo = [];
            $scope.pin = "";
            $scope.showData = 0;
            GetExamMonthYear.then(function (res) {
                try {
                    var data = JSON.parse(res)
                } catch (err) { }

                if (data.Table.length > 0) {

                    $scope.MonthAndYear = data.Table;

                }
            }, function (error) {
                $scope.MonthAndYear = [];
            });
        }



        //get schemes data for dropdown
        ////var SCHEMESEMINFO = StudentResultService.GetSchemeDataForResults();
        ////$scope.seminfo = [];
        ////$scope.examtypeinfo = [];
        ////$scope.pin = "";
        ////$scope.showData = 0;
        ////SCHEMESEMINFO.then(function (data) {
        ////    if (data.length > 0) {

        ////        $scope.schemeinfo = data;

        ////    }
        ////}, function (error) {
        ////    alert("unable to load Schemes");
        ////});

        // student pass type 
        // $scope.SelStudentType = 2; 
        ////var LoadExamTypeBysem = StudentResultService.getStudentType();
        ////LoadExamTypeBysem.then(function (response) {
        ////    if (response.Table.length > 0) {
        ////        $scope.StudentType = response.Table;
        ////    } else {
        ////        $scope.StudentType = [];
        ////        alert("No Student found on this Record");
        ////    }
        ////},
        ////    function (error) {
        ////        alert("error while loading Student Types");

        ////    });

        // dropdown for sem exams
        ////$scope.loadSemExamTypes = function (scheme) {
        ////    $scope.seminfo = [];
        ////    $scope.examtypeinfo = [];
        ////    $scope.pin = "";
        ////    if ((scheme.schemeid == undefined) || (scheme.schemeid == "0") || (scheme.schemeid == "")) {

        ////        return false;
        ////    }
        ////    $scope.showData = 0;
        ////    var SemExamInfo = StudentResultService.GetExamTypeForResults(scheme.schemeid);
        ////    SemExamInfo.then(function (data) {
        ////        if (data.Table.length > 0) {
        ////            $scope.seminfo = data.Table;                  
        ////        }

        ////    }, function (error) {
        ////        alert("unable to load semester");
        ////    });
        ////}

        ////$scope.loadExamTypes = function (sem) {
        ////    $scope.examtypeinfo = [];
        ////    $scope.pin = "";
        ////    if (($scope.scheme.schemeid == undefined) || ($scope.scheme.schemeid == "0") || ($scope.scheme.schemeid == "")) {

        ////        return false;
        ////    }

        ////    if (($scope.sem.semid == undefined) || ($scope.sem.semid == "0") || ($scope.sem.semid == "")) {

        ////        return false;
        ////    }
        ////    $scope.showData = 0;
        ////    // Branch Information
        ////    var SemExamInfo = StudentResultService.GetExamTypeForResults($scope.scheme.schemeid);
        ////    SemExamInfo.then(function (data) {
        ////        if (data.Table.length > 0) {
        ////            $scope.examtypeinfo = data.Table1;

        ////        }

        ////    }, function (error) {
        ////        alert("cannot load exam Type");
        ////    });
        ////}


        //$scope.hidePreviousResult = function () {
        //    $scope.ResultFound = false;
        //    $scope.showData = 0;
        //    $scope.StudentWiseReportData = [];
        //    $scope.studentInfo = [];
        //    $scope.BranchSubjectGradeInfo = [];
        //    $scope.studentsubjecttotal = [];
        //},
            $scope.Submit = function () {

           
                if (($scope.monthyear.Id == undefined) || ($scope.monthyear.Id == "0") || ($scope.monthyear.Id == "")) {
                    alert("Select Exam Month Year ");
                    return false;
                }

                if (($scope.scheme.schemeid == undefined) || ($scope.scheme.schemeid == "0") || ($scope.scheme.schemeid == "")) {
                    alert("Select Scheme");
                    return false;
                }

                if ($scope.SelStudentType.id == 1) {
                    if (($scope.sem.semid == undefined) || ($scope.sem.semid == "0") || ($scope.sem.semid == "")) {
                        alert("Select Sem");
                        return false;
                    }
                    if (($scope.examtype == undefined) || ($scope.examtype == "0") || ($scope.examtype == "")) {
                        alert("Select Exam");
                        return false;
                    }
                }


                if (($scope.Pin == undefined) || $scope.Pin == "") {
                    alert("Enter Student Pin ");
                    return false;
            }

            
            $scope.StudentWiseReportData = [];
            $scope.studentInfo = [];
            $scope.BranchSubjectGradeInfo = [];
            $scope.studentsubjecttotal = [];
                $scope.showData = 0
                $scope.LoadImg = true;
                $scope.ResultNotFound = false;
                $scope.ResultFound = false;
                if ($scope.scheme.schemeid == '5') {
                    $scope.ResultFound = false;
                    $scope.LoadImg = true;
                    if (($scope.examtype == '1' || $scope.examtype == '2') && $scope.SelStudentType.id == 1) {
                        var resultdata = StudentResultService.GetC18MidStudentWiseReport($scope.sem.semid, $scope.Pin, $scope.scheme.schemeid, $scope.examtype);
                        resultdata.then(function (data) {
                            if (data.length > 0) {
                                if (data[0].studentWiseReport.length > 0) {
                                    $scope.showData = 1;
                                    $scope.LoadImg = false;
                                    $scope.ResultFound = true;
                                    $scope.studentInfo = [];
                                    $scope.StudentWiseReportData = [];
                                    $scope.ResultNotFound = false;
                                    $scope.semyear = data[0].studentInfo[0].Sem;
                                    $scope.pin = data[0].studentInfo[0].Pin;
                                    $scope.StudentWiseReportData = data[0].studentWiseReport;
                                    $scope.AcadamicYear = data[0].studentInfo[0].ExamMonthYear;
                                    $scope.studentInfo = data[0].studentInfo[0];
                                    $scope.LoadImg = false;

                                }
                                else {
                                    $scope.ResultFound = false;
                                    $scope.ResultNotFound = true;
                                    $scope.LoadImg = false;
                                }
                            }
                            else {
                                $scope.ResultFound = false;
                                $scope.ResultNotFound = true;
                                $scope.LoadImg = false;
                            }
                        }, function (error) {
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                        });
                    }
                    else if (($scope.examtype == '5' && $scope.SelStudentType.id == 1) || $scope.SelStudentType.id == 2) {
                        if ($scope.SelStudentType.id == 2) {
                            $scope.examtype = 5; // dummy values
                            $scope.sem = {
                                semid: 1 // dummy values
                            }

                        }
                        var resultdata = StudentResultService.GetStudentWiseReport($scope.SelStudentType.id, $scope.Pin, $scope.scheme.schemeid, $scope.examtype, $scope.monthyear.Id, $scope.sem.semid);
                        resultdata.then(function (data) {
                            if (data.length > 0) {
                                if (data[0].studentWiseReport.length > 0) {
                                    $scope.showData = 1;
                                    $scope.LoadImg = false;
                                    $scope.ResultFound = true;
                                    $scope.ResultNotFound = false;
                                    $scope.studentInfo = [];
                                    $scope.StudentWiseReportData = [];
                                    $scope.semyear = data[0].studentWiseReport[0].Semister;
                                    $scope.pin = $scope.Pin;
                                    $scope.StudentWiseReportData = data[0].studentWiseReport;
                                    if ($scope.examtype == '5' && $scope.SelStudentType.id == 1) {

                                        $scope.getTotalMarks = data[0].studentSubjectTotal[0].TotalSubjects;

                                        $scope.gettotalgradepoints = data[0].studentSubjectTotal[0].TotalSubjects;

                                        $scope.getMaxCredits = data[0].studentSubjectTotal[0].TotalCredits;

                                        $scope.getCreditsGained = data[0].studentSubjectTotal[0].TotalCreditsEarned;

                                        // $scope.getGradePointsGained = data[0].studentSubjectTotal[0].TotalGrades;
                                        $scope.LoadImg = false;
                                        $scope.Result = data[0].studentSubjectTotal[0].Result;

                                        $scope.SGPA = data[0].studentSGPACGPAInfo[0].SGPA;
                                        $scope.CGPA = data[0].studentSGPACGPAInfo[0].CGPA;

                                        $scope.SgpaTotalPoints = data[0].studentSGPACGPAInfo[0].SgpaTotalPoints;
                                        $scope.SgpaTotalCredits = data[0].studentSGPACGPAInfo[0].SgpaTotalCredits;

                                        $scope.studentInfo = data[0].studentInfo[0];
                                        $scope.BranchSubjectGradeInfo = data[0].branchSubjectGradeInfo;
                                        $scope.studentsubjecttotal = data[0].studentSubjectTotal;
                                        $scope.AcadamicYear = data[0].studentSubjectTotal[0].AcadamicYear;
                                        $scope.CgpaTotalPoints = data[0].studentSGPACGPAInfo[0].CgpaTotalPoints;
                                        $scope.CgpaTotalCredits = data[0].studentSGPACGPAInfo[0].CgpaTotalCredits;

                                        $scope.CumulativeMaxCredits = data[0].CumulativeGradeInfo[0].CumulativeMaxCredits;
                                        $scope.CumulativeCreditsGained = data[0].CumulativeGradeInfo[0].CumulativeCreditsGained;
                                        $scope.CumulativeGradePointsGained = data[0].CumulativeGradeInfo[0].CumulativeGradePointsGained;

                                    }
                                    else if ($scope.examtype == '5' && $scope.SelStudentType.id == 2) {
                                        if (data[0].C18SemInfo.length > 0 && data[0].studentWiseReport.length > 0) {
                                            $scope.studentInfo = data[0].studentInfo[0];

                                            $scope.BranchSubjectGradeInfo = data[0].branchSubjectGradeInfo;
                                            $scope.totalsems = data[0].C18SemInfo;
                                            $scope.newresultDisplayInfo = [];

                                            var SemesterList = [];

                                            for (var i = 0; i < data[0].C18SemInfo.length; i++) {
                                                if (!SemesterList.includes(data[0].C18SemInfo[i].SemId)) {
                                                    SemesterList.push(data[0].C18SemInfo[i].SemId);
                                                    var temp = {};
                                                    temp.Subjects = [];
                                                    temp.Semester = data[0].C18SemInfo[i].Semester;
                                                    temp.SemId = data[0].C18SemInfo[i].SemId;
                                                    for (var j = 0; j < data[0].studentWiseReport.length; j++) {
                                                        // var Subject = {};
                                                        if (data[0].studentWiseReport[j].SemId == temp.SemId) {

                                                            temp.Subjects.push(data[0].studentWiseReport[j]);
                                                        }
                                                    }

                                                    $scope.newresultDisplayInfo.push(temp);
                                                }
                                            }



                                            $scope.suppleGradeinfo = data[0].C18suppleGradeInfo;

                                            //$scope.getTotalMarks = data[0].studentSubjectTotal[0].TotalSubjects;

                                            //$scope.gettotalgradepoints = data[0].studentSubjectTotal[0].TotalSubjects;

                                            $scope.getMaxCredits = data[0].C18suppleGradeInfo[0].TotalCredits;

                                            $scope.getCreditsGained = data[0].C18suppleGradeInfo[0].CreditsGained;


                                            $scope.LoadImg = false;
                                            $scope.Result = data[0].C18suppleGradeInfo[0].Result;


                                            $scope.AcadamicYear = data[0].C18suppleGradeInfo[0].AcadamicYear;


                                            //  $scope.CumulativeMaxCredits = data[0].CumulativeGradeInfo[0].CumulativeMaxCredits;
                                            $scope.CumulativeCreditsGained = data[0].C18suppleGradeInfo[0].CumulativeCreditsGained;
                                            // $scope.CumulativeGradePointsGained = data[0].CumulativeGradeInfo[0].CumulativeGradePointsGained;
                                        }
                                        else {
                                            $scope.ResultFound = false;
                                            $scope.ResultNotFound = true;
                                            $scope.LoadImg = false;
                                        }

                                    }
                                    else {
                                        $scope.AcadamicYear = data[0].studentSubjectTotal[0].AcadamicYear;
                                        $scope.studentInfo = data[0].studentInfo[0];
                                        $scope.LoadImg = false;
                                        $scope.ResultFound = false;
                                        $scope.ResultNotFound = true;
                                    }


                                }
                                else {
                                    $scope.ResultFound = false;
                                    $scope.ResultNotFound = true;
                                    $scope.LoadImg = false;
                                }

                            }
                            else {
                                $scope.ResultFound = false;
                                $scope.ResultNotFound = true;
                                $scope.LoadImg = false;
                            }
                        }, function (error) {
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;

                        });
                    }


                }
                else if ($scope.scheme.schemeid == '3' || $scope.scheme.schemeid == '4' || $scope.scheme.schemeid == '2') {// for c16, ER91  regular result 
                    if ($scope.SelStudentType.id == 1) {
                        if ($scope.scheme.schemeid == '2') {

                            $scope.examtype = 5; // for er91
                        }

                        var ResultData = StudentResultService.GetOldStudentWiseReport($scope.SelStudentType.id, $scope.Pin, $scope.scheme.schemeid, $scope.examtype, $scope.monthyear.Id, $scope.sem.semid);
                        ResultData.then(function (data) {
                            if (data.Table.length > 0) {
                                $scope.showData = 1;
                                $scope.ResultFound = true;
                                $scope.ResultNotFound = false;
                                $scope.LoadImg = false;
                                $scope.studentInfo = [];
                                $scope.StudentWiseReportData = [];
                                if (data.Table.length > 0) {
                                    $scope.semyear = data.Table[0].Semister;
                                } else {
                                    $scope.semyear = data.Table1[0].Sem;
                                }
                                $scope.pin = $scope.Pin;
                                $scope.scheme = $scope.scheme;
                                $scope.AcadamicYear = data.Table1[0].AcadamicYear == null || angular.isUndefined(data.Table1[0].AcadamicYear) ? angular.isUndefined($scope.MonthAndYear.find(s => s.Id == $scope.monthyear.Id).ExamYearMonth) ? false : $scope.MonthAndYear.find(s => s.Id == $scope.monthyear.Id).ExamYearMonth : data.Table1[0].AcadamicYear;
                                $scope.studentInfo = data.Table1[0];
                                $scope.StudentWiseReportData = data.Table;
                                if (data.Table.length > 0) {
                                    $scope.Result = data.Table[0].Result;
                                    $scope.Total = data.Table[0].Total;
                                }
                                else {
                                    $scope.Result = "";
                                    $scope.Total = "";
                                }

                            }

                            else {
                                $scope.ResultFound = false;
                                $scope.ResultNotFound = true;
                                $scope.LoadImg = false;
                            }

                        }, function (error) {
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                            alert(error);
                        });

                    }
                    else if ($scope.SelStudentType.id == 2) {//for c16 backlog result{
                        if ($scope.SelStudentType.id == 2) {
                            $scope.examtype = 5; // dummy values
                            $scope.sem = {
                                semid: 1 // dummy values
                            }

                        }

                        var ResultData = StudentResultService.GetOldStudentWiseReport($scope.SelStudentType.id, $scope.Pin, $scope.scheme.schemeid, $scope.examtype, $scope.monthyear.Id, $scope.sem.semid);
                        ResultData.then(function (data) {
                            if (data.Table.length > 0 && data.Table1.length > 0 && data.Table2.length > 0) {
                                $scope.showData = 1;
                                $scope.ResultFound = true;
                                $scope.ResultNotFound = false;
                                $scope.LoadImg = false;
                                $scope.studentInfo = [];
                                $scope.StudentWiseReportData = [];


                                $scope.resultDisplayInfo = [];

                                var SemesterList = [];

                                for (var i = 0; i < data.Table2.length; i++) {
                                    if (!SemesterList.includes(data.Table2[i].SemId)) {
                                        SemesterList.push(data.Table2[i].SemId);
                                        var arr = {};
                                        arr.Subjects = [];
                                        arr.Semester = data.Table2[i].Semister;
                                        arr.SemId = data.Table2[i].SemId;
                                        for (var j = 0; j < data.Table.length; j++) {
                                            // var Subject = {};
                                            if (data.Table[j].SemId == arr.SemId) {

                                                arr.Subjects.push(data.Table[j]);
                                            }
                                        }

                                        $scope.resultDisplayInfo.push(arr);
                                        console.log($scope.resultDisplayInfo);
                                    }
                                }


                                if (data.Table.length > 0) {
                                    $scope.semyear = data.Table[0].Semister;
                                } else {
                                    $scope.semyear = data.Table1[0].Sem;
                                }
                                $scope.pin = $scope.Pin;
                                $scope.scheme = $scope.scheme;
                                $scope.AcadamicYear = data.Table1[0].AcadamicYear == null || angular.isUndefined(data.Table1[0].AcadamicYear) ? angular.isUndefined($scope.MonthAndYear.find(s => s.Id == $scope.monthyear.Id).ExamYearMonth) ? false : $scope.MonthAndYear.find(s => s.Id == $scope.monthyear.Id).ExamYearMonth : data.Table1[0].AcadamicYear;
                                $scope.studentInfo = data.Table1[0];
                                $scope.StudentWiseReportData = data.Table;
                                if (data.Table.length > 0) {
                                    $scope.Result = data.Table[0].Result;
                                    $scope.Total = data.Table[0].Total;
                                }
                                else {
                                    $scope.Result = "";
                                    $scope.Total = "";
                                }

                            }

                            else {
                                $scope.LoadImg = false;
                                $scope.ResultFound = false;
                                // $scope.ResultNotFound = true;
                                $scope.UnderMaintainance = true;

                            }

                        }, function (error) {
                            $scope.LoadImg = false;
                            $scope.ResultFound = false;
                            // $scope.ResultNotFound = true;
                            $scope.UnderMaintainance = true;

                            //  alert(error);
                        });
                    }


                }
                else if ($scope.scheme.schemeid == '8' || $scope.scheme.schemeid == '1') {// for C09 regular result 

                    if ($scope.SelStudentType.id == 1 && $scope.scheme.schemeid == '8') {

                        var ResultData = StudentResultService.Getc09StudentWiseReport($scope.SelStudentType.id, $scope.Pin, $scope.scheme.schemeid, $scope.examtype, $scope.monthyear.Id, $scope.sem.semid);
                        ResultData.then(function (data) {
                            try { var data = JSON.parse(data) } catch (err) { }

                            if (data.Table2.length > 0) {
                                $scope.showData = 1;
                                $scope.ResultFound = true;
                                $scope.ResultNotFound = false;
                                $scope.LoadImg = false;
                                $scope.studentInfo = [];
                                $scope.StudentWiseReportData = [];
                                if (data.Table2.length > 0) {
                                    $scope.semyear = data.Table2[0].Semister;
                                } else {
                                    $scope.semyear = data.Table1[0].Sem;
                                }
                                $scope.pin = $scope.Pin;
                                $scope.scheme = $scope.scheme;
                                $scope.AcadamicYear = data.Table1[0].AcadamicYear == null || angular.isUndefined(data.Table1[0].AcadamicYear) ? angular.isUndefined($scope.MonthAndYear.find(s => s.Id == $scope.monthyear.Id).ExamYearMonth) ? false : $scope.MonthAndYear.find(s => s.Id == $scope.monthyear.Id).ExamYearMonth : data.Table1[0].AcadamicYear;
                                $scope.studentInfo = data.Table1[0];
                                $scope.StudentWiseReportData = data.Table2;
                                if (data.Table1.length > 0) {
                                    $scope.Result = data.Table2[0].Result;
                                    $scope.Total = data.Table2[0].TotalMarks;
                                }
                                else {
                                    $scope.Result = "";
                                    $scope.Total = "";
                                }

                            }

                            else {
                                $scope.ResultFound = false;
                                $scope.ResultNotFound = true;
                                $scope.LoadImg = false;
                            }

                        }, function (error) {
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                            alert(error);
                        });

                    } else if ($scope.SelStudentType.id == 2) {
                        $scope.examtype = 8; // dummy values
                        $scope.sem = {
                            semid: 9 // dummy values
                        }
                        var ResultData = StudentResultService.GetOldStudentWiseReport($scope.SelStudentType.id, $scope.Pin, $scope.scheme.schemeid, $scope.examtype, $scope.monthyear.Id, $scope.sem.semid);
                        ResultData.then(function (data) {
                            if (data.Table.length > 0 && data.Table1.length > 0 && data.Table2.length > 0) {
                                $scope.showData = 1;
                                $scope.ResultFound = true;
                                $scope.ResultNotFound = false;
                                $scope.LoadImg = false;
                                $scope.studentInfo = [];
                                $scope.StudentWiseReportData = [];


                                $scope.resultDisplayInfo = [];

                                var SemesterList = [];

                                for (var i = 0; i < data.Table2.length; i++) {
                                    if (!SemesterList.includes(data.Table2[i].SemId)) {
                                        SemesterList.push(data.Table2[i].SemId);
                                        var arr = {};
                                        arr.Subjects = [];
                                        arr.Semester = data.Table2[i].Semister;
                                        arr.SemId = data.Table2[i].SemId;
                                        for (var j = 0; j < data.Table.length; j++) {
                                            // var Subject = {};
                                            if (data.Table[j].SemId == arr.SemId) {

                                                arr.Subjects.push(data.Table[j]);
                                            }
                                        }

                                        $scope.resultDisplayInfo.push(arr);
                                    }
                                }


                                if (data.Table.length > 0) {
                                    $scope.semyear = data.Table[0].Semister;
                                } else {
                                    $scope.semyear = data.Table1[0].Sem;
                                }
                                $scope.pin = $scope.Pin;
                                $scope.scheme = $scope.scheme;
                                $scope.AcadamicYear = data.Table1[0].AcadamicYear == null || angular.isUndefined(data.Table1[0].AcadamicYear) ? angular.isUndefined($scope.MonthAndYear.find(s => s.Id == $scope.monthyear.Id).ExamYearMonth) ? false : $scope.MonthAndYear.find(s => s.Id == $scope.monthyear.Id).ExamYearMonth : data.Table1[0].AcadamicYear;
                                $scope.studentInfo = data.Table1[0];
                                $scope.StudentWiseReportData = data.Table;
                                if (data.Table.length > 0) {
                                    $scope.Result = data.Table[0].Result;
                                    $scope.Total = data.Table[0].Total;
                                }
                                else {
                                    $scope.Result = "";
                                    $scope.Total = "";
                                }

                            }

                            else {
                                $scope.ResultFound = false;
                                $scope.ResultNotFound = true;
                                $scope.LoadImg = false;
                            }

                        }, function (error) {
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                            alert(error);
                        });
                    }

                }
                else if ($scope.SelStudentType.id == 2 && $scope.scheme.schemeid == '2') {
                    $scope.examtype = 5; // dummy values
                    // $scope.sem = {
                    //     semid: 9 // dummy values
                    // }
                    var ResultData = StudentResultService.GetOldStudentWiseReport($scope.SelStudentType.id, $scope.Pin, $scope.scheme.schemeid, $scope.examtype, $scope.monthyear.Id, $scope.sem.semid);
                    ResultData.then(function (data) {
                        if (data.Table.length > 0 && data.Table1.length > 0 && data.Table2.length > 0) {
                            $scope.showData = 1;
                            $scope.ResultFound = true;
                            $scope.ResultNotFound = false;
                            $scope.LoadImg = false;
                            $scope.studentInfo = [];
                            $scope.StudentWiseReportData = [];


                            $scope.resultDisplayInfo = [];

                            var SemesterList = [];

                            for (var i = 0; i < data.Table2.length; i++) {
                                if (!SemesterList.includes(data.Table2[i].SemId)) {
                                    SemesterList.push(data.Table2[i].SemId);
                                    var arr = {};
                                    arr.Subjects = [];
                                    arr.Semester = data.Table2[i].Semister;
                                    arr.SemId = data.Table2[i].SemId;
                                    for (var j = 0; j < data.Table.length; j++) {
                                        // var Subject = {};
                                        if (data.Table[j].SemId == arr.SemId) {

                                            arr.Subjects.push(data.Table[j]);
                                        }
                                    }

                                    $scope.resultDisplayInfo.push(arr);
                                }
                            }


                            if (data.Table.length > 0) {
                                $scope.semyear = data.Table[0].Semister;
                            } else {
                                $scope.semyear = data.Table1[0].Sem;
                            }
                            $scope.pin = $scope.Pin;
                            $scope.scheme = $scope.scheme;
                            $scope.AcadamicYear = data.Table1[0].AcadamicYear == null || angular.isUndefined(data.Table1[0].AcadamicYear) ? angular.isUndefined($scope.MonthAndYear.find(s => s.Id == $scope.monthyear.Id).ExamYearMonth) ? false : $scope.MonthAndYear.find(s => s.Id == $scope.monthyear.Id).ExamYearMonth : data.Table1[0].AcadamicYear;
                            $scope.studentInfo = data.Table1[0];
                            $scope.StudentWiseReportData = data.Table;
                            if (data.Table.length > 0) {
                                $scope.Result = data.Table[0].Result;
                                $scope.Total = data.Table[0].Total;
                            }
                            else {
                                $scope.Result = "";
                                $scope.Total = "";
                            }

                        }

                        else {
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                        }

                    }, function (error) {
                        $scope.ResultFound = false;
                        $scope.ResultNotFound = true;
                        $scope.LoadImg = false;
                        alert(error);
                    });
                }

                else {  // for c14, c,09,c16s result
                    if ($scope.SelStudentType.id == 2 && $scope.scheme.schemeid != '2') {
                        $scope.examtype = 5; // dummy values
                        $scope.sem = {
                            semid: 1 // dummy values
                        }

                    }


                    var ResultData = StudentResultService.GetOldStudentWiseReport($scope.SelStudentType.id, $scope.Pin, $scope.scheme.schemeid, $scope.examtype, $scope.monthyear.Id, $scope.sem.semid);
                    ResultData.then(function (data) {
                        if (data.Table.length > 0) {
                            $scope.showData = 1;
                            $scope.ResultFound = true;
                            $scope.ResultNotFound = false;
                            $scope.LoadImg = false;
                            $scope.studentInfo = [];
                            $scope.StudentWiseReportData = [];
                            if (data.Table.length > 0) {
                                $scope.semyear = data.Table[0].Semister;
                            } else {
                                $scope.semyear = data.Table1[0].Sem;
                            }
                            $scope.pin = $scope.Pin;
                            $scope.scheme = $scope.scheme;
                            $scope.AcadamicYear = data.Table1[0].AcadamicYear == null || angular.isUndefined(data.Table1[0].AcadamicYear) ? angular.isUndefined($scope.MonthAndYear.find(s => s.Id == $scope.monthyear.Id).ExamYearMonth) ? false : $scope.MonthAndYear.find(s => s.Id == $scope.monthyear.Id).ExamYearMonth : data.Table1[0].AcadamicYear;
                            $scope.studentInfo = data.Table1[0];
                            $scope.StudentWiseReportData = data.Table;
                            if (data.Table.length > 0) {
                                $scope.Result = data.Table[0].Result;
                                $scope.Total = data.Table[0].Total;
                            }
                            else {
                                $scope.Result = "";
                                $scope.Total = "";
                            }

                        }

                        else {
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.LoadImg = false;
                        }

                    }, function (error) {
                        $scope.ResultFound = false;
                        $scope.ResultNotFound = true;
                        $scope.LoadImg = false;
                        alert(error);
                    });


                }


            }

        $scope.DownloadPdfResult = function (tableid) {
            // alert(tableid + ":" + AppSettings.ExportToPdfUrl);
            //alert("pdf : " + tableid);
            html2canvas($('#idtoDivPrintAdmin'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("Table.pdf");
                }
            });
        }

        $scope.DownloadExcelResult = function (tableId) {
            var exportHref = Excel.tableToExcel(tableId, 'StudentResult');
            $timeout(function () { location.href = exportHref; }, 100);
        }

        $scope.PrintStudentResult = function () {

            var divName = "idtoDivPrintAdmin";
            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;
            $("#studentresult1").hide();
            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            //document.body.innerHTML = "";
            if (!$printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";
                document.body.appendChild($printSection);
            }
            $printSection.innerHTML = "";
            $printSection.appendChild(domClone);
            // alert($printSection.innerHTML);
            document.title = $scope.Pin;
            window.print();
            document.body.removeChild($printSection);
            $("#studentresult1").show();
        };


        $scope.PrintDashBoard = function () {
            var divName = "";
            if ($scope.adminuser == true) {
                divName = "idtoDivPrintAdmin";
            }
            else {
                divName = "DivIdToPrint";
            }

            var divToPrint = document.getElementById(divName);

            var newWin = window.open('', 'Print-Window');

            newWin.document.open();

            newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');

            newWin.document.close();

            setTimeout(function () { newWin.close(); }, 10);
        }

        $scope.DownloadPdfResultStudent = function (tableid) {

            // alert(tableid + ":" + AppSettings.ExportToPdfUrl);
            //alert("pdf : " + tableid);
            var height = $('#idtoDivPrintAdmin').height();
            var width = $('#idtoDivPrintAdmin').width();
            $('#idtoDivPrintAdmin').height('auto');
            var scaleBy = 5;
            var w = 1000;
            var h = 1000;
            var div = document.querySelector('#idtoDivPrintAdmin');
            var canvas = document.createElement('canvas');
            canvas.width = window.innerWidth * scaleBy;
            canvas.height = window.innerHeight * scaleBy;

            var context = canvas.getContext('2d');
            context.scale(scaleBy, scaleBy);
            html2canvas(div, {
                canvas: canvas,
                onrendered: function (canvas) {
                    thecanvas = canvas;
                    var data = thecanvas.toDataURL();
                    var docDefinition = {
                        // pageSize: { width: thecanvas.width, height: thecanvas.height },
                        content: [{
                            image: data,
                            width: 500
                        }],
                    };
                    pdfMake.createPdf(docDefinition).download("Table.pdf");
                    $('#idtoDivPrintAdmin').height(height);
                }
            });
        }

        $scope.stboclogin = function () {
            $state.go('login');
        }
    });


    app.factory('Excel', function ($window) {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId),
                    ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });
});
