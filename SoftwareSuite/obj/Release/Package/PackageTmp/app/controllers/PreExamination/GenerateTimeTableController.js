define(['app'], function (app) {
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
    app.controller("GenerateTimeTableController", function ($scope, $http, $localStorage, $state, AppSettings, StudentResultService, PreExaminationService, Excel, $timeout) {
        $scope.ExamMonthYears = [];
        $scope.StudentType = [];
        $scope.ExamDates = [];      
        $scope.studentTypeId = "";    
        $scope.ResultNotFound = false;
        $scope.ResultFound = false;
        $scope.LoadImg = false;
        $scope.gentmetbl = false;
        $scope.schemeinfo = [];
        $scope.seminfo = [];    
        $scope.examtypeinfo = [];
        $scope.arr = [];
        $scope.semarr = [];
        var authData = $localStorage.authorizationData;

        $scope.sessioninfo = [{ session: "SESSION 1", val: 1 }, { session: "SESSION 2", val: 2 }]

        $scope.C18tanList = [{ Name: "Only C18 Subjects", val: 1 }, { Name: "C18 Tantalized Subjects", val: 2 }]


        const $ctrl = this;
        $ctrl.$onInit = () => {           
            $scope.GetAcademicData();
            //$scope.GetExamYearMonth();
        }     

        $scope.Exams = [
            { id: 1, exam: "Mid 1" },
            { id: 2, exam: "Mid 2" },
            { id: 10, exam: "Semester" }
        ];
       
        //$scope.GetExamYearMonth = function () {
        //    var ApprovalLists = PreExaminationService.getExamYearMonths();
        //    ApprovalLists.then(function (response) {
        //        $scope.MonthAndYear = response.Table;

        //    }, function (error) {
        //       // alert("error while loading Academic Year");

        //    });
        //}

        $scope.GetAcademicData = function () {
            var GetMonthYear = PreExaminationService.GetMonthYear()
            GetMonthYear.then(function (response) {

                $scope.GetExamMonthYear = response.Table;


            },
                function (error) {
                  //  alert("data is not loaded");

                });
        }
      

        //get schemes data for dropdown
        var SCHEMESEMINFO = StudentResultService.GetSchemeDataForResults();
      
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {
                $scope.schemeinfo = data;
            }
        }, function (error) {
          //  alert("unable to load Schemes");
        });

        $scope.loadSemExamTypes = function (schemeid) {
            if ((schemeid == null)) {
                return false;
            }
            $scope.seminfo = [];
            //  $scope.examtypeinfo = [];
            var SemExamInfo = StudentResultService.GetExamTypeForResults(schemeid);
            SemExamInfo.then(function (data) {

                if (data.Table.length > 0) {
                    $scope.seminfo = data.Table;                 
                }

            }, function (error) {
              //  alert("unable to load semester");
            });
        }
        $scope.ChangeSession = function () {
            PreExaminationService.GetExamMonthYearByAcademicYear($scope.selAcademicYear, $scope.selSession).then(function (res) {
                $scope.MonthAndYear = res.Table;
            }, function (error) {
                // alert("error while loading Exam Month Years");
                console.log(error);
            });
        }

        $scope.ChangeExamMonthYear = function () {
          
            var LoadExamTypeBysem = PreExaminationService.GetExamTypeByMonthYear($scope.monthyear);
            LoadExamTypeBysem.then(function (response) {
                var response = JSON.parse(response)
                if (response.length > 0) {
                    $scope.StudentType = response;
                } else {
                    $scope.StudentType = [];
                    //  alert("No Student found on this Record");
                }
            }, function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });
        }
        $scope.DetailsFound = false;
       

       

        var expanded = false;



        $scope.showsemCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxessem");
            if (!expanded) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99; 
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.closesemCheckbox = function () {
            var checkboxes = document.getElementById("checkboxessem");
            if (!expanded) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }


        $scope.toggleAllsem = function () {
            var toggleStatus = $scope.isAllSelectedsem;
            angular.forEach($scope.seminfo, function (itm) { itm.selected = toggleStatus; });
            $scope.semarr = [];
            angular.forEach($scope.seminfo, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.semid })
                }
            });
        }

        $scope.optionToggledsem = function () {
            $scope.isAllSelectedsem = $scope.seminfo.every(function (itm) { return itm.selected; })
            $scope.semarr = [];
            angular.forEach($scope.seminfo, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.semid })
                }
            });
        }

        $scope.toggleAll = function () {
            var toggleStatus = $scope.isAllSelected;
            angular.forEach($scope.holdate, function (itm) { itm.selected = toggleStatus; });
            $scope.arr = [];
            angular.forEach($scope.holdate, function (value, key) {
                if (value.selected === true) {                   
                    $scope.arr.push({ "HolidayDate": moment(value.Dates).format("YYYY-MM-DD") })
                }
            });          
        }


        $scope.showCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxes");
            if (!expanded) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.closeCheckbox = function () {
            var checkboxes = document.getElementById("checkboxes");
            if (!expanded) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }
        $scope.optionToggled = function () {
            $scope.isAllSelected = $scope.holdate.every(function (itm) { return itm.selected; })
            $scope.arr = [];
            angular.forEach($scope.holdate, function (value, key) {
                if (value.selected === true) {
                    if (value.Day == "Sunday") {
                        var Holidays = "Sunday"
                    } else {
                        var Holidays = "Holiday"
                    }
                    $scope.arr.push({ "HolidayDate": moment(value.Dates).format("YYYY-MM-DD"),"Day":Holidays })
                }
            });          
        }

        $scope.loadHolidaydates = function () {
            if ($scope.StartDate == null || $scope.StartDate == undefined) {                
                return;
            }
              var startDate = moment($scope.StartDate).format("YYYY-MM-DD")
            var Holidaydates = PreExaminationService.GetHolidaysForTimeTable(startDate,30);
            Holidaydates.then(function (data) {
                if (data.Table.length > 0) {
                    $scope.holdate = data.Table;
                }

            }, function (error) {
              
            });
        }

        //$scope.getTimeTableData = function () {
          
        //    if ($scope.studentTypeId == null || $scope.studentTypeId == undefined || $scope.studentTypeId == "") {
        //        alert("Select student type.");
        //        return;
        //    }
        //    if ($scope.scheme == null || $scope.scheme == undefined || $scope.scheme == "") {
        //        alert("Select scheme.");
        //        return;
        //    }          
        //    if ($scope.examtype == null || $scope.examtype == undefined || $scope.examtype == "") {
        //        alert("Select exam type");
        //        return;
        //    }
        //    if ($scope.StartDate == null || $scope.StartDate == undefined || $scope.StartDate == "") {
        //        alert("Select Start Date");
        //        return;
        //    }
        //    if (($scope.examtype == 1 || $scope.examtype == 2) && ($scope.FnSthh == null || $scope.FnSthh == undefined || $scope.FnSthh == "")) {
        //        alert("Select FN start hours");
        //        return;
        //    }
        //    if (($scope.examtype == 1 || $scope.examtype == 2) && ($scope.FnStmm == null || $scope.FnStmm == undefined || $scope.FnStmm == "")) {
        //        alert("Select FN start minutes");
        //        return;
        //    }
        //    if (($scope.examtype == 1 || $scope.examtype == 2) && ($scope.FnStamorpm == null || $scope.FnStamorpm == undefined || $scope.FnStamorpm == "")) {
        //        alert("Select FN start session(AM or PM)");
        //        return;
        //    }
        //    if (($scope.examtype == 1 || $scope.examtype == 2) && ($scope.FnEdhh == null || $scope.FnEdhh == undefined || $scope.FnEdhh == "")) {
        //        alert("Select FN end hours");
        //        return;
        //    }
        //    if (($scope.examtype == 1 || $scope.examtype == 2) && ($scope.FnEdmm == null || $scope.FnEdmm == undefined || $scope.FnEdmm == "")) {
        //        alert("Select FN end minutes");
        //        return;
        //    }
        //    if (($scope.examtype == 1 || $scope.examtype == 2) && ($scope.FnEdamorpm == null || $scope.FnEdamorpm == undefined || $scope.FnEdamorpm == "")) {
        //        alert("Select FN end session(AM or PM)");
        //        return;
        //    }
        //    if (($scope.examtype == 1 || $scope.examtype == 2) && ($scope.AnSthh == null || $scope.AnSthh == undefined || $scope.AnSthh == "")) {
        //        alert("Select AN start hours");
        //        return;
        //    }
        //    if (($scope.examtype == 1 || $scope.examtype == 2) && ($scope.AnStmm == null || $scope.AnStmm == undefined || $scope.AnStmm == "")) {
        //        alert("Select AN start minutes");
        //        return;
        //    }
        //    if (($scope.examtype == 1 || $scope.examtype == 2) && ($scope.AnStamorpm == null || $scope.AnStamorpm == undefined || $scope.AnStamorpm == "")) {
        //        alert("Select AN start session(AM or PM)");
        //        return;
        //    }
        //    if (($scope.examtype == 1 || $scope.examtype == 2) && ($scope.AnEdhh == null || $scope.AnEdhh == undefined || $scope.AnEdhh == "")) {
        //        alert("Select AN end hours");
        //        return;
        //    }
        //    if (($scope.examtype == 1 || $scope.examtype == 2) && ($scope.AnEdmm == null || $scope.AnEdmm == undefined || $scope.AnEdmm == "")) {
        //        alert("Select AN end minutes");
        //        return;
        //    }
        //    if (($scope.examtype == 1 || $scope.examtype == 2) && ($scope.AnEdamorpm == null || $scope.AnEdamorpm == undefined || $scope.AnEdamorpm == "")) {
        //        alert("Select AN end session(AM or PM)");
        //        return;
        //    }
        //    $scope.FnSthh, $scope.FnStmm, $scope.FnStamorpm, $scope.FnEdhh, $scope.FnEdmm, $scope.FnEdamorpm, $scope.AnSthh, $scope.AnStmm, $scope.AnStamorpm, $scope.AnEdhh, $scope.AnEdmm, $scope.AnEdamorpm 
        //    var FnSthh = $scope.FnSthh == undefined ? "10" : $scope.FnSthh
        //    var FnStmm = $scope.FnStmm == undefined ? "00" : $scope.FnStmm
        //    var FnStamorpm = $scope.FnStamorpm == undefined ? "AM" : $scope.FnStamorpm        
        //    var FnEdhh = $scope.FnEdhh == undefined ? "11" : $scope.FnEdhh
        //    var FnEdmm = $scope.FnEdmm == undefined ? "00" : $scope.FnEdmm
        //    var FnEdamorpm = $scope.FnEdamorpm == undefined ? "AM" : $scope.FnEdamorpm
        //    var AnSthh = $scope.AnSthh == undefined ? "02" : $scope.AnSthh          
        //    var AnStmm = $scope.AnStmm == undefined ? "00" : $scope.AnStmm
        //    var AnStamorpm = $scope.AnStamorpm == undefined ? "PM" : $scope.AnStamorpm
        //    var AnEdhh = $scope.AnEdhh == undefined ? "03" : $scope.AnEdhh
        //    var AnEdmm = $scope.AnEdmm == undefined ? "00" : $scope.AnEdmm
        //    var AnEdamorpm = $scope.AnEdamorpm == undefined ? "PM" : $scope.AnEdamorpm
        //    $scope.ResultNotFound = false;
        //    $scope.ResultFound = false;
        //    $scope.LoadImg = true;

        //    if ($scope.semarr.length <= 0) {                          0 
        //        alert('select Semester.')00..

         
        //        return;
        //    }
        //    var setholidays = PreExaminationService.SetHolidaysForTimeTable($scope.arr);
        //    setholidays.then(function (dat) {              
        //        var startDate = moment($scope.StartDate).format("YYYY-MM-DD")
        //        var getTimeTableData = PreExaminationService.getTimeTableData(parseInt($scope.studentTypeId), parseInt($scope.sem.semid), parseInt($scope.scheme.schemeid), parseInt($scope.examtype), startDate, Fns, Ans);
        //            getTimeTableData.then(function (data) {                      
        //                if (data.Table.length > 0 && data.Table.length > 0) {
        //                    var Timetbldata = data.Table;

        //                    $scope.timetabledata = [];
        //                    var BranchList = [];                          
        //                    for (var i = 0; i < data.Table1.length; i++) {
        //                        if (!BranchList.includes(data.Table1[i].branchid)) {
        //                            BranchList.push(data.Table1[i].branchid);
        //                            var SemesterList = [];
        //                            for (var j = 0; j < data.Table2.length; j++) {
        //                                if (!SemesterList.includes(data.Table2[j].semid)) {
        //                                    SemesterList.push(data.Table2[j].semid);
        //                                    var temp = {};
        //                                    temp.BranchId = data.Table1[i].branchid;
        //                                    temp.SemId = data.Table2[j].semid;
        //                                    temp.TimeTablebranch = [];
        //                                    for (var k = 0; k < Timetbldata.length; k++) {
        //                                        if (Timetbldata[k].semid == temp.SemId && Timetbldata[k].branchid == temp.BranchId) {
        //                                            temp.TimeTablebranch.push(Timetbldata[k]);
        //                                        }
        //                                    }
        //                                    $scope.timetabledata.push(temp);                                           
        //                                }
        //                            }
        //                        }                             
        //                    }                           

        //                    $scope.ResultNotFound = false;
        //                    $scope.ResultFound = true;
        //                    $scope.LoadImg = false;
        //            }

        //            }, function (error) {
        //                    $scope.ResultNotFound = true;
        //                    $scope.ResultFound = false;
        //                    $scope.LoadImg = false;
        //            });               
            //    var getTimeTableData = PreExaminationService.getpdfTimeTableData(parseInt($scope.studentTypeId), $scope.semarr, parseInt($scope.scheme.schemeid), parseInt($scope.examtype), startDate, FnSthh, FnStmm, FnStamorpm, FnEdhh, FnEdmm, FnEdamorpm, AnSthh, AnStmm, AnStamorpm, AnEdhh, AnEdmm, AnEdamorpm);
            //    getTimeTableData.then(function (data) {

            //        if (data.length > 0) {
            //            if (data.length > 4) {                        
            //              window.location.href = '/Reports/' + data + '.pdf';
            //            } else {
            //                alert("Timetable not Present");
            //            }
            //        } else {
            //            alert("Timetable not Present");
            //        }
            //            $scope.ResultNotFound = false;
            //            $scope.ResultFound = false;
            //            $scope.LoadImg = false;
                  

            //    }, function (error) {
            //        $scope.ResultNotFound = true;
            //        $scope.ResultFound = false;
            //        $scope.LoadImg = false;
            //    });
               

            //}, function (error) {
            //        $scope.ResultNotFound = true;
            //        $scope.ResultFound = false;
            //        $scope.LoadImg = false;
            //});

            

          //  }




      $scope.SetholidaysandTimeTable=function()  {


            var setholidays = PreExaminationService.SetHolidaysForTimeTable($scope.arr);
            setholidays.then(function (dat) {              
                var startDate = moment($scope.StartDate).format("YYYY-MM-DD")
                var getTimeTableData = PreExaminationService.getTimeTableData(parseInt($scope.studentTypeId), parseInt($scope.sem.semid), parseInt($scope.scheme.schemeid), parseInt($scope.examtype), startDate, Fns, Ans);
                    getTimeTableData.then(function (data) {                      
                        if (data.Table.length > 0 && data.Table.length > 0) {
                            var Timetbldata = data.Table;

                            $scope.timetabledata = [];
                            var BranchList = [];                          
                            for (var i = 0; i < data.Table1.length; i++) {
                                if (!BranchList.includes(data.Table1[i].branchid)) {
                                    BranchList.push(data.Table1[i].branchid);
                                    var SemesterList = [];
                                    for (var j = 0; j < data.Table2.length; j++) {
                                        if (!SemesterList.includes(data.Table2[j].semid)) {
                                            SemesterList.push(data.Table2[j].semid);
                                            var temp = {};
                                            temp.BranchId = data.Table1[i].branchid;
                                            temp.SemId = data.Table2[j].semid;
                                            temp.TimeTablebranch = [];
                                            for (var k = 0; k < Timetbldata.length; k++) {
                                                if (Timetbldata[k].semid == temp.SemId && Timetbldata[k].branchid == temp.BranchId) {
                                                    temp.TimeTablebranch.push(Timetbldata[k]);
                                                }
                                            }
                                            $scope.timetabledata.push(temp);
                                            console.log($scope.timetabledata)
                                        }
                                    }
                                }                             
                            }                           

                            $scope.ResultNotFound = false;
                            $scope.ResultFound = true;
                            $scope.LoadImg = false;
                    }

                    }, function (error) {
                            $scope.ResultNotFound = true;
                            $scope.ResultFound = false;
                            $scope.LoadImg = false;
                    });               
                var getTimeTableData = PreExaminationService.getpdfTimeTableData(parseInt($scope.studentTypeId), $scope.semarr, parseInt($scope.scheme.schemeid), parseInt($scope.examtype), startDate, FnSthh, FnStmm, FnStamorpm, FnEdhh, FnEdmm, FnEdamorpm, AnSthh, AnStmm, AnStamorpm, AnEdhh, AnEdmm, AnEdamorpm);
                getTimeTableData.then(function (data) {

                    if (data.length > 0) {
                        if (data.length > 4) {                        
                          window.location.href = '/Reports/' + data + '.pdf';
                        } else {
                            alert("Timetable not Present");
                        }
                    } else {
                        alert("Timetable not Present");
                    }
                        $scope.ResultNotFound = false;
                        $scope.ResultFound = false;
                        $scope.LoadImg = false;


                }, function (error) {
                    $scope.ResultNotFound = true;
                    $scope.ResultFound = false;
                    $scope.LoadImg = false;
                });


            }, function (error) {
                    $scope.ResultNotFound = true;
                    $scope.ResultFound = false;
                    $scope.LoadImg = false;
            });



        }



        $scope.setTimetableData = function () {
            if ($scope.selAcademicYear == null || $scope.selAcademicYear == undefined || $scope.selAcademicYear == "") {
                alert("Select Academic Year.");
                return;
            }
            if ($scope.selSession == undefined || $scope.selSession == null || $scope.selSession == "") {
                alert("Select Session");
                return;
            }
            if ($scope.monthyear == null || $scope.monthyear == undefined || $scope.monthyear == "") {
                alert("Select Month and Year.");
                return;
            }
            if ($scope.SelStudentType == null || $scope.SelStudentType == undefined || $scope.SelStudentType == "") {
                alert("Select student type.");
                return;
            }
            if ($scope.selscheme == null || $scope.selscheme == undefined || $scope.selscheme == "") {
                alert("select Scheme.");
                return;
            }
            if ($scope.examtype == null || $scope.examtype == undefined || $scope.examtype == "") {
                alert("Select exam type");
                return;
            }
            if ($scope.StartDate == null || $scope.StartDate == undefined || $scope.StartDate == "") {
                alert("Select Start Date");
                return;
            }

            if ($scope.isonlyC18 == null || $scope.isonlyC18 == undefined || $scope.isonlyC18 == "") {
                alert("Select  C18 Subjects drop down.");
                return;
            }
            if ($scope.semarr.length <= 0 && $scope.SelStudentType =='1') {
                alert('Select Semester.')
                return;
            }

            if ($scope.arr.length <= 0) {
                if (window.confirm("Do you want to proceed with out selecting hoidays")) {
                } else {
                    return;
                }
            }
            $scope.ResultNotFound = false;
            $scope.ResultFound = false;
            $scope.LoadImg = true;
                  

            var setholidays = PreExaminationService.SetHolidaysForTimeTable($scope.arr, parseInt($scope.selAcademicYear), parseInt($scope.selSession), parseInt($scope.monthyear), parseInt($scope.SelStudentType), parseInt($scope.examtype));
            setholidays.then(function (dat) {
                if (dat[0].ResponceCode == '200') {
                    alert(dat[0].ResponceDescription);
                  //  $scope.LoadImg = false;
                              
                    $scope.ResultFound = true;
                    $scope.setTimeTabledata();
                } else {
                    alert('Something Went Wrong');
                    $scope.ResultNotFound = true;
                    $scope.ResultFound = false;
                    $scope.LoadImg = false;
                }               

            }, function (error) {
                $scope.ResultNotFound = true;
                $scope.ResultFound = false;
                $scope.LoadImg = false;
            }); 

        }

        $scope.setTimeTabledata = function () {
            var startDate = moment($scope.StartDate).format("YYYY-MM-DD")
            var setTimeTableData = PreExaminationService.setTimeTableData(parseInt($scope.selAcademicYear), parseInt($scope.selSession), parseInt($scope.monthyear), parseInt($scope.SelStudentType), parseInt($scope.selscheme), $scope.semarr, parseInt($scope.examtype), startDate, $scope.isonlyC18);
            setTimeTableData.then(function (dat) {
                try { var dat = JSON.parse(dat)} catch (err) { }
                if (dat.Table[0].ResponceCode == '200') {
                    alert(dat.Table[0].ResponceDescription);
                    $scope.getpdfTimeTableData();
                } else {
                    alert(dat.Table[0].ResponceDescription);
                    $scope.ResultNotFound = true;
                    $scope.ResultFound = false;
                    $scope.LoadImg = false;
                }

            }, function (error) {
                $scope.ResultNotFound = true;
                $scope.ResultFound = false;
                $scope.LoadImg = false;
            });

        }

        $scope.getTimeTableData = function () {
            if ($scope.selAcademicYear == null || $scope.selAcademicYear == undefined || $scope.selAcademicYear == "") {
                alert("Select Academic Year.");
                return;
            }
            if ($scope.monthyear == null || $scope.monthyear == undefined || $scope.monthyear == "") {
                alert("Select Month and Year.");
                return;
            }
            if ($scope.SelStudentType == null || $scope.SelStudentType == undefined || $scope.SelStudentType == "") {
                alert("Select student type.");
                return;
            }
          
            if (($scope.examtype == null || $scope.examtype == undefined || $scope.examtype == "")) {
                alert("Select Exam");
                return;
            }
           
            var getTimeTableData = PreExaminationService.getTimeTabledata(parseInt($scope.selAcademicYear), parseInt($scope.monthyear), parseInt($scope.SelStudentType), parseInt($scope.examtype), parseInt($scope.selscheme));
            getTimeTableData.then(function (data) {
                try { var data = JSON.parse(data) }catch(err){ }
                if (data.Table.length > 0 && data.Table.length > 0) {
                    var Timetbldata = data.Table;

                    $scope.timetabledata = [];
                    var BranchList = [];
                    for (var i = 0; i < data.Table1.length; i++) {
                        if (!BranchList.includes(data.Table1[i].branchid)) {
                            BranchList.push(data.Table1[i].branchid);
                            var SemesterList = [];
                            for (var j = 0; j < data.Table2.length; j++) {
                                if (!SemesterList.includes(data.Table2[j].semid)) {
                                    SemesterList.push(data.Table2[j].semid);
                                    var temp = {};
                                    temp.BranchId = data.Table1[i].branchid;
                                    temp.SemId = data.Table2[j].semid;
                                    temp.TimeTablebranch = [];
                                    for (var k = 0; k < Timetbldata.length; k++) {
                                        if (Timetbldata[k].semid == temp.SemId && Timetbldata[k].branchid == temp.BranchId) {
                                            temp.TimeTablebranch.push(Timetbldata[k]);
                                        }
                                    }
                                    $scope.timetabledata.push(temp);
                                }
                            }
                        }
                    }

                    $scope.ResultNotFound = false;
                    $scope.ResultFound = true;
                    $scope.LoadImg = false;
                } else {
                    $scope.ResultNotFound = true;
                    $scope.ResultFound = false;
                    $scope.LoadImg = false;
                }

                    }, function (error) {
                            $scope.ResultNotFound = true;
                            $scope.ResultFound = false;
                            $scope.LoadImg = false;
                    }); 
        }
        $scope.PublishTimetable = function () {
            if ($scope.monthyear == null || $scope.monthyear == undefined || $scope.monthyear == "") {
                alert("Select Month and Year.");
                return;
            }
            if ($scope.SelStudentType == null || $scope.SelStudentType == undefined || $scope.SelStudentType == "") {
                alert("Select student type.");
                return;
            }


            var PublishTimetabledata = PreExaminationService.PublishTimetable(parseInt($scope.monthyear), parseInt($scope.SelStudentType));
            PublishTimetabledata.then(function (data) {

                try { var response = JSON.parse(data) } catch (err) { }
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription);

                } else {
                    alert('Something Went Wrong')

                }
            }, function (error) {

            });
        }


        $scope.getpdfTimeTableData = function () {
            $scope.LoadImg = true;
            $scope.gentmetbl = true;
            var DataTypeId=1
            var getpdfTimeTableData = PreExaminationService.TimeTablePdfAdmin(parseInt($scope.selAcademicYear), parseInt($scope.monthyear), parseInt($scope.SelStudentType), parseInt($scope.examtype), parseInt($scope.selscheme), DataTypeId);
            getpdfTimeTableData.then(function (data) {
                $scope.gentmetbl = false;
                if (data.length > 0) {
                    if (data.length > 4) {
                       
                        $scope.LoadImg = false;
                        var location = '/Reports/' + data + '.pdf';
                   
                        var url = window.location.origin+location ;
                      
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
                $scope.ResultFound = false;
                $scope.LoadImg = false;
            });
      
        }

        $scope.PrintTimeTable = function () {

            var divName = "idtoDivPrintAdmin";
            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;          
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
            document.title = 'TimeTable' + $scope.scheme.scheme;
            window.print();
            document.body.removeChild($printSection);
          
        };
        $scope.exportTimetableToExcel = function (tableid) {
            var DataTypeId = 2
            $scope.gentmetbl = true;
            var getpdfTimeTableData = PreExaminationService.TimeTableXlsxAdmin(parseInt($scope.selAcademicYear), parseInt($scope.monthyear), parseInt($scope.SelStudentType), parseInt($scope.examtype), parseInt($scope.selscheme), DataTypeId);
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

        $scope.exportTimetableEdepToExcel = function (tableid) {
            var DataTypeId = 3
            $scope.gentmetbl = true;
            var getpdfTimeTableData = PreExaminationService.TimeTableEdepXlsx(parseInt($scope.selAcademicYear), parseInt($scope.monthyear), parseInt($scope.SelStudentType), parseInt($scope.examtype), parseInt($scope.selscheme), DataTypeId);
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