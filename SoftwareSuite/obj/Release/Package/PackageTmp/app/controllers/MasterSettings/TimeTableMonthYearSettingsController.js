define(['app'], function (app) {
    app.controller("TimeTableMonthYearSettingsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MasterPageService, StudentResultService, PreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName
        var expanded = false;
        $scope.ReportFound = false;
        $scope.Noreports = false;
        $scope.GetMasterMonthYear = [];
        $scope.schemeinfo = [];
        $scope.seminfo = [];
        $scope.Exams = [
            { id: 1, exam: "Mid 1" },
            { id: 2, exam: "Mid 2" },
            { id: 10, exam: "Semester" }
        ];
        $scope.dayslot = [{ val: 'AM', lbl: 'AM' }, { val: 'PM', lbl: 'PM' }, { val: 'NOON', lbl: 'NOON' }];
        $scope.maxsoltsarr = [{ id: 1, lbl: "1" }, { id: 2, lbl: "2" }, { id: 3, lbl: "3" }, { id: 4, lbl: "4" }]
        $scope.editslotarr = [{ id: 1, lbl: "1" }, { id: 2, lbl: "2" }, { id: 3, lbl: "3" }, { id: 4, lbl: "4" }];
        $scope.Backdayarr = [
            { id: 1, daylbl: "Day 1" },
            { id: 2, daylbl: "Day 2" },
            { id: 3, daylbl: "Day 3" }
        ];

        $scope.timeslotlist = [{ val: 'A1' },{ val: 'AN' }, { val: 'F1' }, { val: 'FN' }];
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetAcademicData();
            $scope.GetExamYearMonth();
            $scope.gethours();
            $scope.getminutes();
        }

        var SCHEMESEMINFO = StudentResultService.GetSchemeDataForResults();
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {
                $scope.schemeinfo = data;
            }
        }, function (error) {
            alert("unable to load Schemes");
        });

        var LoadActiveSemesters = PreExaminationService.getAllSemester();
        LoadActiveSemesters.then(function (response) {
            $scope.ActiveSemesters = response.Table;
        },
            function (error) {
                var err = JSON.parse(error);
                console.log(err.Message);
            });

        $scope.loadSemExamTypes = function (schemeid) {
            if ((schemeid == null)) {
                return false;
            }
                    
            var SemExamInfo = StudentResultService.GetExamTypeForResults(schemeid);
            SemExamInfo.then(function (data) {

                if (data.Table.length > 0) {
                    $scope.seminfo = data.Table;
                   
                }

            }, function (error) {
                alert("unable to load semester");
            });
        }

        $scope.changemaxslots = function (studentTypeId) {
            if (studentTypeId == "" || studentTypeId == undefined || studentTypeId == null || studentTypeId == 0) {
                return;
            }
            if (studentTypeId == 1) {
                $scope.maxsoltsarr = [{ id: 1, lbl: "1" }, { id: 2, lbl: "2" }, { id: 3, lbl: "3" }, { id: 4, lbl: "4" }]
            } else {

                $scope.maxsoltsarr = [{ id: 1, lbl: "1" }, { id: 2, lbl: "2" }, { id: 3, lbl: "3" }, { id: 4, lbl: "4" }]

            }

        }

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
        // time slot changes

        $scope.changeTimeslot = function (ele, ind) {
            $scope.slotarr.map((obj) => {
                if (obj.Slotindex == ind) {
                    obj.SlotLabel = ele.value;                 
                 
                }
            });

            if (ele.value == "FN") {              
                $("#Sthh" + ind).val("09");
                $("#Stmm" + ind).val("30");
                $("#Stamorpm" + ind).val("AM");
                $("#Edhh" + ind).val("11");
                $("#Edmm" + ind).val("30");
                $("#Edamorpm" + ind).val("AM");
                $("#order" + ind).val(1);

                $scope.Fromhh({ value: "09" }, ind);
                $scope.Frommm({ value: "30" }, ind);
                $scope.Fromamorpm({ value: "AM" }, ind);
                $scope.Tohh({ value: "11" }, ind);
                $scope.Tomm({ value: "30" }, ind);
                $scope.Toamorpm({ value: "AM" }, ind);
                $scope.changSequenceId({ value: 1 }, ind); 
              
            } else if (ele.value == "A1") {

                $("#Sthh" + ind).val("03");
                $("#Stmm" + ind).val("30");
                $("#Stamorpm" + ind).val("PM");
                $("#Edhh" + ind).val("04");
                $("#Edmm" + ind).val("30");
                $("#Edamorpm" + ind).val("PM");
                $("#order" + ind).val(1);

                $scope.Fromhh({ value: "03" }, ind);
                $scope.Frommm({ value: "30" }, ind);
                $scope.Fromamorpm({ value: "PM" }, ind);
                $scope.Tohh({ value: "04" }, ind);
                $scope.Tomm({ value: "30" }, ind);
                $scope.Toamorpm({ value: "PM" }, ind);
                $scope.changSequenceId({ value: 1 }, ind);

            }
            else if (ele.value == "F1") {

                $("#Sthh" + ind).val("12");
                $("#Stmm" + ind).val("00");
                $("#Stamorpm" + ind).val("NOON");
                $("#Edhh" + ind).val("02");
                $("#Edmm" + ind).val("00");
                $("#Edamorpm" + ind).val("PM");
                $("#order" + ind).val(1);

                $scope.Fromhh({ value: "12"}, ind);
                $scope.Frommm({ value: "00" }, ind);
                $scope.Fromamorpm({ value: "NOON" }, ind);
                $scope.Tohh({ value: "02" }, ind);
                $scope.Tomm({ value: "00" }, ind);
                $scope.Toamorpm({ value: "PM" }, ind);
                $scope.changSequenceId({ value: 1 }, ind);

            } else if (ele.value == "AN") {

                $("#Sthh" + ind).val("02");
                $("#Stmm" + ind).val("30");
                $("#Stamorpm" + ind).val("PM");
                $("#Edhh" + ind).val("04");
                $("#Edmm" + ind).val("30");
                $("#Edamorpm" + ind).val("PM");
                $("#order" + ind).val(1);


                $scope.Fromhh({ value: "02" }, ind);
                $scope.Frommm({ value: "30" }, ind);
                $scope.Fromamorpm({ value: "PM" }, ind);
                $scope.Tohh({ value: "04" }, ind);
                $scope.Tomm({ value: "30" }, ind);
                $scope.Toamorpm({ value: "PM" }, ind);
                $scope.changSequenceId({ value: 1 }, ind);            
            }
        }
          
            $scope.Fromhh = function (ele, ind) {
                $scope.slotarr.map((obj) => {
                    if (obj.Slotindex == ind) {
                        obj.Sthh = ele.value;
                    }
                });
            }
            $scope.Frommm = function (ele, ind) {
                $scope.slotarr.map((obj) => {
                    if (obj.Slotindex == ind) {
                        obj.Stmm = ele.value;
                    }
                });
            }
            $scope.Fromamorpm = function (ele, ind) {
                $scope.slotarr.map((obj) => {
                    if (obj.Slotindex == ind) {
                        obj.Stamorpm = ele.value;
                    }
                });
            }
            $scope.Tohh = function (ele, ind) {
                $scope.slotarr.map((obj) => {
                    if (obj.Slotindex == ind) {
                        obj.Edhh = ele.value;
                    }
                });
            }
            $scope.Tomm = function (ele, ind) {
                $scope.slotarr.map((obj) => {
                    if (obj.Slotindex == ind) {
                        obj.Edmm = ele.value;
                    }
                });
            }
            $scope.Toamorpm = function (ele, ind) {
                $scope.slotarr.map((obj) => {
                    if (obj.Slotindex == ind) {
                        obj.Edamorpm = ele.value;
                    }
                });
            }
            $scope.changSequenceId = function (ele, ind) {
                $scope.slotarr.map((obj) => {
                    if (obj.Slotindex == ind) {
                        obj.SlotOrder = ele.value;
                    }
                });
            } 

        //<-------------------------------------->



        $scope.slotarr = [];
        $scope.addSlots = function (noofslots) {
            if (isNaN(noofslots)){
                alert('Please enter valid input , only numbers are accepted');
                $scope.NoofSlots = "";
                return;
            }

            let slotlen = parseInt(noofslots)
            if (slotlen > 5) {
                alert('slots limit exceeded');
                return;
            }
            if (slotlen <= 0) {
                return;
            }
            $scope.slotarr = [];
            for (var i = 0; i < slotlen; i++) {
                $scope.slotarr.push({ Slotindex: i, SlotLabel: "", Sthh: "", Stmm: "", Stamorpm: "", Edhh: "", Edmm: "",Edamorpm :"", SlotOrder: "" });
            }
        }

       
        $scope.Removeslot = function (index) {
            if (window.confirm("Do you want to delete time slot")) {
                $scope.slotarr.splice(index, 1);
            }
        }

       
       

    




            $scope.gethours = function () {
                $scope.hoursarr = [];
                for (var i = 0; i < 13; i++)
                    if (i < 10) {
                        $scope.hoursarr.push({ "Harr": ("0" + i).toString() });
                    } else {
                        $scope.hoursarr.push({ "Harr": i.toString() });
                    }
            }

            $scope.getminutes = function () {
                $scope.mintuesarr = [];
                for (var i = 0; i < 60; i++)
                    if (i < 10) {
                        $scope.mintuesarr.push({ "Marr": ("0" + i).toString() });
                    } else {
                        $scope.mintuesarr.push({ "Marr": i.toString() });
                    }
            }

            $scope.GetExamYearMonth = function () {
                var ApprovalLists = PreExaminationService.getExamYearMonths();
                ApprovalLists.then(function (response) {
                    $scope.MonthAndYear = response.Table;

                }, function (error) {
                    alert("error while loading Academic Year");

                });
            }






            $scope.sessioninfo = [{ session: "SESSION 1", val: 1 }, { session: "SESSION 2", val: 2 }]



            $scope.GetAcademicData = function () {
                var GetMonthYear = PreExaminationService.GetMonthYear()
                GetMonthYear.then(function (response) {

                    $scope.GetExamMonthYear = response.Table;


                },
                    function (error) {
                        alert("data is not loaded");

                    });
            }
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

            $scope.GetDetails = function () {
                if ($scope.selAcademicYear == null || $scope.selAcademicYear == undefined || $scope.selAcademicYear == "") {
                    alert("Select Academic Year.");
                    return;
                }
                if ($scope.selSession == null || $scope.selSession == undefined || $scope.selSession == "") {
                    alert("Select Session.");
                    return;
                }
                $scope.GetMasterSessions = [];
                $scope.ReportFound = false;
                $scope.Noreports = false;

                var sessiodata = PreExaminationService.GetTimeTableMonthYearExamTypesSessions($scope.selSession, $scope.selAcademicYear);
                sessiodata.then(function (data) {
                    try { var data = JSON.parse(data) } catch (err) { }
                    if (data.length > 0) {
                        $scope.ReportFound = true;
                        $scope.Noreports = false;
                        $scope.GetMasterMonthYear = data;
                        for (var j = 1; j < data.length + 1; j++) {
                            $scope['edit' + j] = true;
                        }
                    } else {
                        $scope.ReportFound = false;
                        $scope.Noreports = true;
                    }
                }, function (error) {
                    $scope.GetMasterMonthYear = [];
                    $scope.ReportFound = fale;
                    $scope.Noreports = true;
                });


            }


            $scope.Editsemesterdat = function (data, ind) {

                var ele1 = document.getElementsByClassName("enabletable" + ind);
                for (var j = 0; j < ele1.length; j++) {
                    ele1[j].style['pointer-events'] = "auto";
                    ele1[j].style.border = "1px solid #ddd";
                    ele1[j].style['-webkit-appearance'] = "auto";
                    ele1[j].style['-moz-appearance'] = "auto";
                }
                $scope['edit' + ind] = false;

            }

            $scope.Updatesemesterdat = function (data, ind) {
                $scope['edit' + ind] = true;

                var ele2 = document.getElementsByClassName("enabletable" + ind);
                for (var j = 0; j < ele2.length; j++) {
                    ele2[j].style['pointer-events'] = "none";
                    ele2[j].style.border = "0";
                    ele2[j].style['-webkit-appearance'] = "none";
                    ele2[j].style['-moz-appearance'] = "none";
                }

                var datatypeid = 2;

                if (data.AcademicYearId == null || data.AcademicYearId == undefined || data.AcademicYearId == "") {
                    alert("Select Academic Year.");
                    return;
                }

                if (data.SessionId == null || data.SessionId == undefined || data.SessionId == "") {
                    alert("Select Session.");
                    return;
                }
                if (data.ExamMonthYearId == null || data.ExamMonthYearId == undefined || data.ExamMonthYearId == "") {
                    alert("Select Month and Year.");
                    return;
                }
                if (data.StudentTypeId == null || data.StudentTypeId == undefined || data.StudentTypeId == "") {
                    alert("Select Student Type");
                    return;
                }
                if (data.ExamTypeId == null || data.ExamTypeId == undefined || data.ExamTypeId == "") {
                    alert("Enter Exam.");
                    return;
                }    
                
                if (data.SequenceId == null || data.SequenceId == undefined || data.SequenceId == "") {
                    alert("select  order.");
                    return;
                }  

                var json = {
                    "Id": data.Id, "ExamMonthYearId": parseInt(data.ExamMonthYearId), "AcademicYearId": parseInt(data.AcademicYearId), "ExamTypeId": parseInt(data.ExamTypeId), "SessionId": parseInt(data.SessionId),
                    "FromHH": data.FromHH, "FromMM": data.FromMM, "FromAmOrPm": data.FromAmOrPm, "ToHH": data.ToHH, "ToMM": data.ToMM, "ToAmOrPm": data.ToAmOrPm,
                    "SessionLabel": data.SlotLabel, "StudentTypeId": parseInt(data.StudentTypeId), "SequenceId": parseInt(data.SequenceId), "schemeid": parseInt(data.SchemeId), "Semid": data.SemId, "dayid": parseInt(data.DayId)
                }
              
                var SetTimeTableMonthYearExamTypesSessions = PreExaminationService.SetTimeTableMonthYearExamTypesSessions(datatypeid, json)
                SetTimeTableMonthYearExamTypesSessions.then(function (response) {
                    try { var response = JSON.parse(response) } catch (err) { }
                    if (response[0].ResponceCode == '200') {
                        alert(response[0].ResponceDescription);

                    } else {
                        alert(response[0].ResponceDescription);

                    }
                },
                    function (error) {
                        alert("something Went Wrong")


                    });
            }


   
        $scope.Submit = function () {

                var datatypeid = 1;

                if ($scope.selAcademicYear == null || $scope.selAcademicYear == undefined || $scope.selAcademicYear == "") {
                    alert("Select Academic Year.");
                    return;
                }
                if ($scope.selSession == null || $scope.selSession == undefined || $scope.selSession == "") {
                    alert("Select Session.");
                    return;
                }
                if ($scope.monthyear == null || $scope.monthyear == undefined || $scope.monthyear == "") {
                    alert("Select Month and Year.");
                    return;
                }
                if ($scope.SelStudentType == null || $scope.SelStudentType == undefined || $scope.SelStudentType == "") {
                    alert("Select Student Type");
                    return;
                }
                if ($scope.examtype == null || $scope.examtype == undefined || $scope.examtype == "") {
                    alert("Enter Exam.");
                    return;
                }

                 if ($scope.SelStudentType == "2" && ($scope.DayId == null || $scope.DayId == undefined || $scope.DayId == "")) {
                    alert("Select Day.");
                    return;
                }
                if ($scope.semarr.length <= 0) {
                    alert('Select Semester.')
                    return;
                }

              
                if ($scope.slotarr.length <= 0) {
                    alert("Select Slots");
                    return;
                }

            var day = $scope.DayId == undefined || $scope.DayId == null || $scope.DayId == "" ? 1 : parseInt($scope.DayId);
            for (var k = 0; k < $scope.slotarr.length; k++) {
                if ($scope.slotarr[k].Sthh == "" || $scope.slotarr[k].Sthh == undefined || $scope.slotarr[k].Sthh == null) { alert("please start time hours"); return; }
                if ($scope.slotarr[k].Stmm == "" || $scope.slotarr[k].Stmm == undefined || $scope.slotarr[k].Stmm == null) { alert("please start time minutes"); return; }
                if ($scope.slotarr[k].Stamorpm == "" || $scope.slotarr[k].Stamorpm == undefined || $scope.slotarr[k].Stamorpm == null) { alert("please start time (AM/PM)"); return; }
                if ($scope.slotarr[k].Edhh == "" || $scope.slotarr[k].Edhh == undefined || $scope.slotarr[k].Edhh == null) { alert("please end time hours"); return; }
                if ($scope.slotarr[k].Edmm == "" || $scope.slotarr[k].Edmm == undefined || $scope.slotarr[k].Edmm == null) { alert("please end time miutes"); return; }
                if ($scope.slotarr[k].Edamorpm == "" || $scope.slotarr[k].Edamorpm == undefined || $scope.slotarr[k].Edamorpm == null) { alert("please end time (AM/PM)"); return; }
                if ($scope.slotarr[k].SlotLabel == "" || $scope.slotarr[k].SlotLabel == undefined || $scope.slotarr[k].SlotLabel == null) { alert("please enter Time slot "); return; }
                if ($scope.slotarr[k].SlotOrder == "" || $scope.slotarr[k].SlotOrder == undefined || $scope.slotarr[k].SlotOrder == null) { alert("please select Order"); return; }
            }

            var finalarr = [];                   
            
            for (var j = 0; j < $scope.semarr.length; j++) {
                for (var i = 0; i < $scope.slotarr.length; i++) {
                    var obj = {
                        "Id": 0, "ExamMonthYearId": parseInt($scope.monthyear), "AcademicYearId": parseInt($scope.selAcademicYear), "ExamTypeId": parseInt($scope.examtype), "SessionId": parseInt($scope.selSession),
                        "FromHH": $scope.slotarr[i].Sthh, "FromMM": $scope.slotarr[i].Stmm, "FromAmOrPm": $scope.slotarr[i].Stamorpm, "ToHH": $scope.slotarr[i].Edhh, "ToMM": $scope.slotarr[i].Edmm, "ToAmOrPm": $scope.slotarr[i].Edamorpm,
                        "SessionLabel": $scope.slotarr[i].SlotLabel, "StudentTypeId": parseInt($scope.SelStudentType), "SequenceId": parseInt($scope.slotarr[i].SlotOrder), "schemeid": parseInt($scope.selscheme), "Semid": $scope.semarr[j].semid, "dayid": day
                    }
                    finalarr.push(obj);
                }
            }
         

            var json = finalarr;
            var SetTimeTableMonthYearExamTypes = PreExaminationService.SetTimeTableMonthYearExamTypesSessions(datatypeid, json)
                SetTimeTableMonthYearExamTypes.then(function (response) {
                    try { var response = JSON.parse(response) } catch (err) { }
                    if (response[0].ResponceCode == '200') {
                        alert(response[0].ResponceDescription);
                    } else {
                        alert(response[0].ResponceDescription);

                    }
                }, function (error) {
                    alert("something Went Wrong");


                });
            }


        });
});