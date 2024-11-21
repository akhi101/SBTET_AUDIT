define(['app'], function (app) {
    app.controller("DMFinalController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
        var data = {};
        $scope.$emit('showLoading', data);
        $scope.Pin = localStorage.getItem('MemoPin')
        $scope.SchemeId = localStorage.getItem('MemoScheme')
        $scope.Sem = localStorage.getItem('MemoSem')
        $scope.ExamMonthYear = localStorage.getItem('ExamMonthYear')
        $scope.SemId = localStorage.getItem('MemoSemId')
        $scope.ExamMonthYearId = localStorage.getItem('ExamMonthYearId')
        // alert($scope.MemoSem)
        $scope.rectangles = [];
        $scope.Date = new Date()
        //$scope.name = "Kothapally Nagateja";
        //$scope.college = "Govt Polytechnic Kothagudem";
        ////$scope.pin = '08007-AEI-022';
        //$scope.BranchYear = "III SEM C-05 DIPLOMA IN APPLIED ELECTRONICS & INSTRUMENTATION ENGG";
        //$scope.MonthYear = "HELD in OCT/NOV 2019"
        //$scope.Name = "Koppula Parameshwari";
        //$scope.father = "Koppula Bala Chandra Maha Raju";
        ////$scope.year = "3 Years full-time";
        //$scope.College = "Jagruthi Institute of Engg & Technology-Ibrahimpatnam,Ranga Reddy";
        //$scope.Institute = "Jagruthi Institute of Engg & Technology-Ibrahimpatnam,Ranga Reddy";
        //$scope.branch = "Electrical and Electronics Engineering";
        //$scope.MonthYear = "MAR/APR 2018";
        ////$scope.Pin = "15497-EE-037";
        ////$scope.class = "First Class(Distin)";
        //$scope.Promoted = 'PROMOTED'
        //$scope.Passed = '102,103'
        //$scope.mydate = "thirtyfirst";
        //$scope.myMonth = "May";
        //$scope.Course = "1 SEM C16s DIPLOMA IN  Electrical and Electronics Engineering ";
        $scope.today = new Date();

        //$scope.MemoPin= localStorage.getItem('MemoPin')
        //localStorage.setItem('MemoScheme')


        //$scope.ExamMonthYear = localStorage.getItem('ExamMonthYear')

        $scope.printForm = function () {
            document.title = 'Duplicate_Sem_Memo';
            window.print();
            // document.title = tempTitle;
        }


        //$scope.TheoryList = [
        //     { "Sub_Code": "AEI-301", "Sub_Name": "Engineering Mathematics-II", "Max_Marks": 80, "Marks_Awarded": 20 },
        ////   { "Sub_Code": "AEI-302", "Sub_Name": "Electronic Circuits-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 58, "Sessional": 15, "Total": 73, "Remarks": "P" },
        ////    { "Sub_Code": "AEI-303", "Sub_Name": "Circuits Theory", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 55, "Sessional": 18, "Total": 73, "Remarks": "P" },
        ////    { "Sub_Code": "AEI-304", "Sub_Name": "Digital Electronics", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 49, "Sessional": 14, "Total": 63, "Remarks": "P" },
        ////{ "Sub_Code": "AEI-305", "Sub_Name": "Process Instrumentation-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 71, "Sessional": 19, "Total": 90, "Remarks": "P" },
        //// { "Sub_Code": "AEI-306", "Sub_Name": "Process Instrumentation-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 71, "Sessional": 19, "Total": 90, "Remarks": "P" },
        //// { "Sub_Code": "AEI-307", "Sub_Name": "Process Instrumentation-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 71, "Sessional": 19, "Total": 90, "Remarks": "P" }
        //]


        //$scope.array = [
        //     { "Sub_Code": "AEI-301", "Sub_Name": "Engineering Mathematics-II", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 40, "Sessional": 11, "Total": 51, "Remarks": "P" },
        ////   { "Sub_Code": "AEI-302", "Sub_Name": "Electronic Circuits-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 58, "Sessional": 15, "Total": 73, "Remarks": "P" },
        ////    { "Sub_Code": "AEI-303", "Sub_Name": "Circuits Theory", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 55, "Sessional": 18, "Total": 73, "Remarks": "P" },
        ////    { "Sub_Code": "AEI-304", "Sub_Name": "Digital Electronics", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 49, "Sessional": 14, "Total": 63, "Remarks": "P" },
        ////{ "Sub_Code": "AEI-305", "Sub_Name": "Process Instrumentation-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 71, "Sessional": 19, "Total": 90, "Remarks": "P" },
        //// { "Sub_Code": "AEI-306", "Sub_Name": "Process Instrumentation-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 71, "Sessional": 19, "Total": 90, "Remarks": "P" },
        //// { "Sub_Code": "AEI-307", "Sub_Name": "Process Instrumentation-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 71, "Sessional": 19, "Total": 90, "Remarks": "P" }
        //]

        //$scope.labs = [
        //               { "Sub_Code": "AEI-306", "Sub_Name": "Electronic Circuits Lab-I", "End_total": 60, "Sess_total": 20, "req_total": 100, "End": 58, "Sessional": 38, "Total": 96, "Remarks": "P" },
        //    { "Sub_Code": "AEI-306", "Sub_Name": "Digital Electronics Lab", "End_total": 60, "Sess_total": 20, "req_total": 100, "End": 50, "Sessional": 37, "Total": 87, "Remarks": "P" },
        //     { "Sub_Code": "AEI-306", "Sub_Name": "Electronic Circuits Lab-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 40, "Sessional": 11, "Total": 51, "Remarks": "P" },
        //      { "Sub_Code": "AEI-306", "Sub_Name": "Electronic Circuits Lab-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 40, "Sessional": 11, "Total": 51, "Remarks": "P" },
        //       { "Sub_Code": "AEI-306", "Sub_Name": "Electronic Circuits Lab-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 40, "Sessional": 11, "Total": 51, "Remarks": "P" },
        //          { "Sub_Code": "AEI-306", "Sub_Name": "Electronic Circuits Lab-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 40, "Sessional": 11, "Total": 51, "Remarks": "P" },
        //   //{ "Sub_Code": "AEI-308", "Sub_Name": "Process Instrumentation Lab-I", "End_total": 60, "Sess_total": 40, "req_total": 100, "End": 54, "Sessional": 38, "Total": 92, "Remarks": "P" }
        //]


        //$scope.Subjects = $scope.array.concat($scope.labs);
        //if ($scope.Subjects.length == 1) {
        //    $scope.length1 = true;
        //} else if ($scope.Subjects.length == 2) {
        //    $scope.length2 = true;
        //}
        //else if ($scope.Subjects.length == 3) {
        //    $scope.length3 = true;
        //} else if ($scope.Subjects.length == 4) {
        //    $scope.length4 = true;
        //} else if ($scope.Subjects.length == 5) {
        //    $scope.length5 = true;
        //} else if ($scope.Subjects.length == 6) {
        //    $scope.length6 = true;
        //} else if ($scope.Subjects.length == 7) {
        //    $scope.length7 = true;
        //} else if ($scope.Subjects.length == 8) {
        //    $scope.length8 = true;
        //} else if ($scope.Subjects.length == 9) {
        //    $scope.length9 = true;
        //} else if ($scope.Subjects.length == 10) {
        //    $scope.length10 = true;
        //} else if ($scope.Subjects.length == 11) {
        //    $scope.length11 = true;
        //} else if ($scope.Subjects.length == 12) {
        //    $scope.length12 = true;
        //}
        //console.log($scope.Subjects);
        //var End_total = 0
        //var Sess_total = 0;
        //var req_total = 0;
        //var End = 0;
        //var Sessional = 0;
        //var Total = 0;


        //for (var i = 0; i < $scope.Subjects.length; i++) {
        //    if ($scope.Subjects[i].End_total != null)
        //        End_total = End_total + $scope.Subjects[i].End_total;
        //    if ($scope.Subjects[i].Sess_total != null)
        //        Sess_total = Sess_total + $scope.Subjects[i].Sess_total;

        //    if ($scope.Subjects[i].req_total != null)
        //        req_total = req_total + $scope.Subjects[i].req_total;

        //    if ($scope.Subjects[i].Total != null)
        //        Total = Total + $scope.Subjects[i].Total;

        //    if ($scope.Subjects[i].End != null)
        //        End = End + $scope.Subjects[i].End;
        //    if ($scope.Subjects[i].Sessional != null)
        //        Sessional = Sessional + $scope.Subjects[i].Sessional;


        //}
        //$scope.End_total = End_total;
        //$scope.Sess_total = Sess_total;
        //$scope.req_total = req_total;
        //$scope.Total = Total;
        //$scope.End = End;
        //$scope.Sessional = Sessional;
        //console.log($scope.Sessional)

        $scope.PrintData = function () {

            var Print = PreExaminationService.SetMemoSignedDate($scope.Pin, $scope.Sem, $scope.ExamMonthYear);
            Print.then(function (response) {
                window.print();
                console.log(response)
            },
        function (error) {

        })
        }
        //console.log($scope.SchemeId, $scope.SemId, $scope.ExamMonthYearId, $scope.Pin)
        var getmemodetails = PreExaminationService.GETMemoDataByPinForPrinting($scope.SchemeId, $scope.SemId, $scope.ExamMonthYearId, $scope.Pin);
        getmemodetails.then(function (response) {
            try { var response = JSON.parse(response) } catch (err) { }
            console.log(response)
            if ($scope.SchemeId == 'C16' || $scope.SchemeId == 'C14' || $scope.SchemeId == 'C16S' || $scope.SchemeId == 'C05' || $scope.SchemeId == 'C08' || $scope.SchemeId == 'ER91' || $scope.SchemeId == 'C18' || $scope.SchemeId == 'C09') {
                $scope.NoDetailsScheme = false;
                if (response.Table.length > 0) {
                    $scope.$emit('hideLoading', data);
                    $scope.ResultFound = true;
                    $scope.LoadImg = false;
                    $scope.ResultNotFound = false;
                    $scope.ODCstudData = response.Table[0];
                    $scope.Subjects = response.Table1;

                    $scope.TheorySubjects = [];
                    $scope.PracticalSubjects = [];
                    if ($scope.Subjects.length >= 1) {
                        for (var i = 0; i < $scope.Subjects.length; i++) {
                            if ($scope.Subjects[i].SubjectType == 'Theory') {
                                $scope.TheorySubjects.push($scope.Subjects[i])
                            } else if ($scope.Subjects[i].SubjectType == 'Practical') {
                                $scope.PracticalSubjects.push($scope.Subjects[i])
                            } else {
                                $scope.TheorySubjects.push($scope.Subjects[i])
                            }

                            //$scope.PracticalSubjects.push(PracticalSubjects)
                        }
                        console.log($scope.TheorySubjects)
                        console.log($scope.PracticalSubjects)
                    }
                    console.log($scope.TheorySubjects)
                    console.log($scope.PracticalSubjects)

                } else {
                    $scope.$emit('hideLoading', data);
                    $scope.ResultFound = false;
                    $scope.LoadImg = false;
                    $scope.ResultNotFound = true;
                    $scope.memostudData = [];
                }
                //if (response.Table[0].ResponceCode == '200') {
                //    $scope.ODCstudData = response.Table1[0];
                //    $scope.newresultDisplayInfo1 = response.Table2;
                //    $scope.ResultFound = true;
                //   // $scope.LoadImg = false;
                //    $scope.ResultNotFound = false;
                //    $scope.$emit('hideLoading', data);
                //}
                //else {


                //}
            } else {
                $scope.$emit('hideLoading', data);
                $scope.NoDetailsScheme = true;
                $scope.Result = false;
                var res = $scope.Pin.substring(0, 2);
                var tempval = angular.uppercase($scope.Pin)
                var exis = (tempval.includes("CCA") || tempval.includes("CCC") || tempval.includes("CCCM") || tempval.includes("CCEC")
                    || tempval.includes("CCEE") || tempval.includes("CCM") || tempval.includes("CCMET") || tempval.includes("CCPT"));

                if (res >= 75) {
                    alert("No Details Found for Particular Schemes(C-00,C-96,C-90,NC)");
                    $scope.PinNo = $scope.Pin
                    $scope.result = fa;
                    $scope.OldSudent = true;
                    $scope.NoDataFound = false;
                    $scope.NoData = false;

                } else if (res <= 04) {
                    alert("No Details Found for Particular Schemes(C-00,C-96,C-90,NC)");
                    $scope.result = true;
                    $scope.OldSudent = true;
                    $scope.PinNo = $scope.Pin
                    $scope.NoDataFound = false;
                    $scope.NoData = false;

                } else if (res == 05 && exis) {
                    alert("No Details Found for Particular Schemes(C-00,C-96,C-90,NC)");
                    $scope.Data = false;
                    $scope.OldSudent = false;
                    $scope.PinNo = $scope.Pin
                    $scope.NoDataFound = false;
                    $scope.NoData = false;

                } else {
                    $scope.ODCstudData = [];
                    $scope.Odcmarkstable = [];
                    $scope.ResultFound = false;
                    //   $scope.LoadImg = false;
                    $scope.ResultNotFound = true;
                    $scope.$emit('hideLoading', data);

                }

            }
            //else {
            //if (response.Table[0].ResponceCode == '200') {
            //    $scope.ODCstudData = response.Table1[0];
            //    $scope.newresultDisplayInfo1 = response.Table2;
            //    $scope.ResultFound = true;
            //    // $scope.LoadImg = false;

            //    $scope.$emit('hideLoading', data);
            //    $scope.ResultNotFound = false;
            //}
            //else {

            //    $scope.ODCstudData = [];
            //    $scope.Odcmarkstable = [];
            //    $scope.ResultFound = false;
            //    // $scope.LoadImg = false;
            //    $scope.$emit('hideLoading', data);
            //    $scope.ResultNotFound = true;

            //}

            //}
        }, function (err) {
            $scope.ResultFound = false;
            // $scope.LoadImg = false;
            $scope.$emit('hideLoading', data);
            $scope.ResultNotFound = true;

        })
        //var getmemodetails = PreExaminationService.getMarksMemoDataByPin($scope.Pin, $scope.Sem);
        //getmemodetails.then(function (response) {
        //    try { var response = JSON.parse(response) } catch (err) { }
        //    console.log(response)
        //    if ($scope.SchemeId == 'C16' || $scope.SchemeId == 'C16S' || $scope.SchemeId == 'C05' || $scope.SchemeId == 'C08' || $scope.SchemeId == 'ER91' || $scope.SchemeId == 'C18') {
        //        $scope.NoDetailsScheme = false;
        //        if (response.Table.length > 0) {

        //            $scope.$emit('hideLoading', data);
        //            $scope.ODCstudData = response.Table[0];
        //            $scope.TheorySubjects = response.Table1;
        //            $scope.PracticalSubjects = response.Table2;
        //            $scope.ResultFound = true;
        //            // $scope.LoadImg = false;
        //            $scope.ResultNotFound = false;

        //        }
        //        else {


        //        }
        //    } else {
        //        $scope.$emit('hideLoading', data);
        //        $scope.NoDetailsScheme = true;
        //        $scope.Result = false;
        //        var res = $scope.MemoPin.substring(0, 2);
        //        var tempval = angular.uppercase($scope.MemoPin)
        //        var exis = (tempval.includes("CCA") || tempval.includes("CCC") || tempval.includes("CCCM") || tempval.includes("CCEC")
        //            || tempval.includes("CCEE") || tempval.includes("CCM") || tempval.includes("CCMET") || tempval.includes("CCPT"));

        //        if (res >= 75) {
        //            $scope.$emit('hideLoading', data);
        //            alert("No Details Found for Particular Schemes(C-00,C-96,C-90,NC)");
        //            $scope.PinNo = $scope.MemoPin
        //            $scope.result = fa;
        //            $scope.OldSudent = true;
        //            $scope.NoDataFound = false;
        //            $scope.NoData = false;

        //        } else if (res <= 04) {
        //            $scope.$emit('hideLoading', data);
        //            alert("No Details Found for Particular Schemes(C-00,C-96,C-90,NC)");
        //            $scope.result = true;
        //            $scope.OldSudent = true;
        //            $scope.PinNo = $scope.Pin
        //            $scope.NoDataFound = false;
        //            $scope.NoData = false;

        //        } else if (res == 05 && exis) {
        //            $scope.$emit('hideLoading', data);
        //            alert("No Details Found for Particular Schemes(C-00,C-96,C-90,NC)");
        //            $scope.Data = false;
        //            $scope.OldSudent = false;
        //            $scope.PinNo = $scope.Pin
        //            $scope.NoDataFound = false;
        //            $scope.NoData = false;

        //        } else {
        //            $scope.$emit('hideLoading', data);
        //            $scope.ODCstudData = [];
        //            $scope.Odcmarkstable = [];
        //            $scope.ResultFound = false;
        //            //   $scope.LoadImg = false;
        //            $scope.ResultNotFound = true;
        //            $scope.$emit('hideLoading', data);

        //        }

        //    }
        //    //else {
        //    //if (response.Table[0].ResponceCode == '200') {
        //    //    $scope.ODCstudData = response.Table1[0];
        //    //    $scope.newresultDisplayInfo1 = response.Table2;
        //    //    $scope.ResultFound = true;
        //    //    // $scope.LoadImg = false;

        //    //    $scope.$emit('hideLoading', data);
        //    //    $scope.ResultNotFound = false;
        //    //}
        //    //else {

        //    //    $scope.ODCstudData = [];
        //    //    $scope.Odcmarkstable = [];
        //    //    $scope.ResultFound = false;
        //    //    // $scope.LoadImg = false;
        //    //    $scope.$emit('hideLoading', data);
        //    //    $scope.ResultNotFound = true;

        //    //}

        //    //}
        //}, function (err) {
        //    $scope.ResultFound = false;
        //    // $scope.LoadImg = false;
        //    $scope.$emit('hideLoading', data);
        //    $scope.ResultNotFound = true;

        //})
    })
})