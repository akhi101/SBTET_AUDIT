define(['app'], function (app) {
    app.controller("CcicGenerateDatesheetController", function ($scope, $http, $localStorage, $state, AppSettings, CcicPreExaminationService, $timeout) {


        const $ctrl = this;
        $ctrl.$onInit = () => {
            //$scope.GetExamYearMonth();
            //$scope.ExamMonthYear = "";
            $scope.GetCourseDurationBatchData();
            $scope.gethours();
            $scope.getminutes();
        }


        var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
        getCcicCurrentAcademicYear.then(function (response) {

            $scope.GetCcicCurrentAcademicYear = response;

        },
            function (error) {
                alert("error while loading CurrentAcademicYear");
                var err = JSON.parse(error);

            });



        $scope.getAYBatchExamMonthYear = function (AcademicYearID, BaTch) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }

            if (BaTch == null || BaTch == undefined || BaTch == "") {
                return;

            }
            $scope.AcademicYearID = AcademicYearID;
          


            var getAYbatchexammonthyear = CcicPreExaminationService.GetAYBatchExamMonthYear(AcademicYearID, BaTch)
            getAYbatchexammonthyear.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetAYBatchExamMonthYearData = res.Table;
                }
                else {
                    $scope.GetAYBatchExamMonthYearData = [];
                }

            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });


        }
        $scope.GetCourseDurationBatchData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }



            $scope.AcademicYearID = AcademicYearID;


            var GetCurrentBatchData = CcicPreExaminationService.GetCurrentBatch(AcademicYearID);
            GetCurrentBatchData.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetCurrentBatch = res.Table;
                }
                else {
                    $scope.GetCurrentBatch = [];
                }


            },

                function (error) {
                    alert("error while loading CurrentBatch");
                    var err = JSON.parse(error);

                });



            var getCcicAcademicYearBatch = CcicPreExaminationService.GetCcicAcademicYearBatches(AcademicYearID);
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.GetCcicAcademicYearBatchesTable = res;
                }
                else {
                    $scope.GetCcicAcademicYearBatchesTable = [];
                }

            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });


        }
        var expanded = false;

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

        $scope.toggleAll = function () {
            var toggleStatus = $scope.isAllSelected;
            angular.forEach($scope.HolidaysDates, function (itm) { itm.selected = toggleStatus; });
            $scope.holidayarr = [];
            angular.forEach($scope.HolidaysDates, function (value, key) {
                if (value.selected === true) {
                    $scope.holidayarr.push({ "HolidayDate": moment(value.Dates).format("YYYY-MM-DD") })
                }
            });
        }

        $scope.loadHolidaydates = function () {
            //try {
            //    var res = JSON.parse(response);
            //}
            //catch (err) { }

            if ($scope.StartDate == null || $scope.StartDate == undefined) {
                return;
            }
            var startDate = moment($scope.StartDate).format("YYYY-MM-DD")
            var Holidaydates = CcicPreExaminationService.GetHolidaysForTimeTable(startDate, 30);
            Holidaydates.then(function (res) {
                if (res.Table.length > 0) {
                    $scope.HolidaysDates = res.Table;
                }

            }, function (error) {

            });
        }

        $scope.optionToggled = function () {
            $scope.isAllSelected = $scope.HolidaysDates.every(function (itm) { return itm.selected; })
            $scope.holidayarr = [];
            angular.forEach($scope.HolidaysDates, function (value, key) {
                if (value.selected === true) {
                    if (value.Day == "Sunday") {
                        var Holidays = "Sunday"
                    } else {
                        var Holidays = "Holiday"
                    }
                    $scope.holidayarr.push({ "HolidayDate": moment(value.Dates).format("YYYY-MM-DD") })
                }
            });
        }


        $scope.dayslot = [{ val: 'AM', lbl: 'AM' }, { val: 'PM', lbl: 'PM' }, { val: 'NOON', lbl: 'NOON' }];
        $scope.maxsoltsarr = [{ id: 1, lbl: "1" }];
        $scope.editslotarr = [{ id: 1, lbl: "1" }, { id: 2, lbl: "2" }];
        $scope.Backdayarr = [
            { id: 1, daylbl: "Day 1" },
            { id: 2, daylbl: "Day 2" },
            { id: 3, daylbl: "Day 3" }
        ];

        $scope.timeslotlist = [{ val: 'AN' },  { val: 'FN' }];



        $scope.changemaxslots = function (studentTypeId) {
            if (studentTypeId == "" || studentTypeId == undefined || studentTypeId == null || studentTypeId == 0) {
                return;
            }
            if (studentTypeId == 1) {
                $scope.maxsoltsarr = [{ id: 1, lbl: "1" }, { id: 2, lbl: "2" }]
            } else {

                $scope.maxsoltsarr = [{ id: 1, lbl: "1" }, { id: 2, lbl: "2" }]

            }

        }


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

            } else if (ele.value == "F1") {

                $("#Sthh" + ind).val("12");
                $("#Stmm" + ind).val("00");
                $("#Stamorpm" + ind).val("NOON");
                $("#Edhh" + ind).val("02");
                $("#Edmm" + ind).val("00");
                $("#Edamorpm" + ind).val("PM");
                $("#order" + ind).val(1);

                $scope.Fromhh({ value: "12" }, ind);
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

        $scope.slotarr = [];
        $scope.addSlots = function (noofslots) {
            if (isNaN(noofslots)) {
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
                $scope.slotarr.push({ Slotindex: i, SlotLabel: "", Sthh: "", Stmm: "", Stamorpm: "", Edhh: "", Edmm: "", Edamorpm: "", SlotOrder: "" });
            }
        }


        $scope.Removeslot = function (index) {
            if (window.confirm("Do you want to delete time slot")) {
                $scope.slotarr.splice(index, 1);
                $scope.NoofSlots = null;
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


        $scope.sessioninfo = [{ session: "SESSION 1", val: 1 }, { session: "SESSION 2", val: 2 }]


        $scope.GetExamMonthYearData = function (academicYear) {
            if (academicYear == null || academicYear == undefined || academicYear == "") {
                return;

            }

            $scope.academicYear = academicYear;
            var getCcicAcademicYearBatch = CcicPreExaminationService.GetExamMonthYears(academicYear)
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

       
        $scope.generateTimeTable = function () {
            if ($scope.academicYear == null || $scope.academicYear == '' || $scope.academicYear==undefined) {
                alert('Please Select Academic Year');
                return;
            }
            if ($scope.monthyear == null || $scope.monthyear == '' || $scope.monthyear == undefined) {
                alert('Please Select Exam Month Year');
                return;
            }
            if ($scope.StartDate == null || $scope.StartDate == '' || $scope.StartDate == undefined) {
                alert('Please Select Start Date');
                return;
            }
            //if ($scope.isAllSelected == null || $scope.isAllSelected == '' || $scope.isAllSelected == undefined) {
            //    alert('Please Select Holiday Dates');
            //    return;
            //}
            $scope.timeslotarr = [];

            //var obj = { "FromHH": $scope.Sthh, "FromMM": $scope.Stmm, "FromAmOrPm": $scope.Stamorpm, "ToHH": $scope.Edhh, "ToMM": $scope.Edmm, "ToAmOrPm": $scope.Edamorpm };
            //console.log(obj)
            //slotarr.push(obj);

            for (var i = 0; i < $scope.slotarr.length; i++) {
                var obj = {
                   
                    "FromHH": $scope.slotarr[i].Sthh, "FromMM": $scope.slotarr[i].Stmm, "FromAmOrPm": $scope.slotarr[i].Stamorpm, "ToHH": $scope.slotarr[i].Edhh, "ToMM": $scope.slotarr[i].Edmm, "ToAmOrPm": $scope.slotarr[i].Edamorpm,
                    
                }
                $scope.timeslotarr.push(obj);
            }

            if ($scope.slotarr.length <= 0) {
                alert("Select Time Slots");
                return;
            }
            var startDate = moment($scope.StartDate).format("YYYY-MM-DD")
            var generatett = CcicPreExaminationService.GenerateTimeTable($scope.holidayarr, $scope.academicYear, $scope.monthyear, $scope.timeslotarr, startDate, $scope.UserName);
            generatett.then(function (res) {

                try {
                    var response = JSON.parse(res)
                }
                catch (err) { }

                if (res[0].ResponceCode == '200') {
                    alert(res[0].ResponceDescription);
                    $scope.pdfbutton = true;
                    $scope.excelbutton = true;
                }
                else if (res[0].ResponceCode == '400') {
                    alert(res[0].ResponceDescription);
                }
                else {
                    alert('Error');
                }

            }, function (error) {

            });

        }


        $scope.setTimeTabledata = function () {
            var startDate = moment($scope.StartDate).format("YYYY-MM-DD")
            var setTimeTableData = CcicPreExaminationService.setTimeTableData(parseInt($scope.academicYear), parseInt($scope.monthyear),startDate);
            setTimeTableData.then(function (dat) {
                try {
                    var dat = JSON.parse(dat)
                }
                catch (err) { }
                if (dat.Table[0].ResponceCode == '200') {
                    alert(dat.Table[0].ResponceDescription);
                    $scope.verifyTimeTableGeneration($scope.academicYear, $scope.monthyear);
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

        $scope.verifyTimeTableGeneration = function () {
            var gettimetablebutton = CcicPreExaminationService.VerifyTimeTableGeneration($scope.academicYear, $scope.monthyear);
            gettimetablebutton.then(function (dat) {
                try {
                    var dat = JSON.parse(dat)
                }
                catch (err) { }
                if (dat[0].ResponseCode == '200') {
                    //alert(dat[0].ResponceDescription);
                    $scope.pdfbutton = true;
                    $scope.excelbutton = true;
                } else {
                    //alert(dat[0].ResponseDescription);
                    //$scope.ResultNotFound = true;
                    //$scope.ResultFound = false;
                    $scope.LoadImg = false;
                }

            }, function (error) {
                $scope.ResultNotFound = true;
                $scope.ResultFound = false;
                $scope.LoadImg = false;
            });

        }

        const download = (path, filename) => {
            // Create a new link
            const anchor = document.createElement('a');
            anchor.href = path;
            anchor.download = filename;

            // Append to the DOM
            document.body.appendChild(anchor);

            // Trigger `click` event
            anchor.click();

            // Remove element from DOM
            document.body.removeChild(anchor);
        };
        $scope.getpdfTimeTableData = function () {
            $scope.Loading1 = true;
            $scope.NoData = false;
            var DataType = 1;
            var getdata = CcicPreExaminationService.GetTimeTableDataPdf(DataType, $scope.academicYear, $scope.monthyear);
            getdata.then(function (res) {
                if (res == null) {
                    $scope.Loading1 = false;
                    alert("No Time Table Present");
                }

                if (res.length > 0) {
                    if (res.length > 4) {
                        $scope.Loading1 = false;
                        $scope.nodata = true;
                        //window.location.href + '/Reports/' + res + '.pdf';
                        window.location.href
                        //window.open(location,'_blank')
                        var url = window.location.origin + '/Reports/' + res + '.pdf';
                        console.log(url)
                        download(url, 'TimeTable_' + $scope.CourseCode + '.pdf');
                        //window.open(url, '_blank'); 
                        $scope.nodata = false;

                    } else {
                        $scope.Loading1 = false;
                        $scope.nodata = true;
                        alert("No Time Table Present");
                    }
                }
                else {
                    $scope.Loading1 = false;
                    $scope.nodata = true;
                    alert("No Time Table Present");
                }

            },

                function (error) {
                    $scope.loading = false;
                    $scope.nodata = true;
                    alert("No Time Table Present");
                    var err = JSON.parse(error);
                });

        }



        $scope.getTimeTableExcel = function () {
            $scope.loading = true;
            var DataType = 2;
            var exceldownload = CcicPreExaminationService.GetCcicTimeTableExcel(DataType, $scope.academicYear, $scope.monthyear);
            exceldownload.then(function (res) {
                var response = JSON.parse(res);
                console.log(response)
                if (response[0].ResponceCode == '200') {
                    $scope.loading = false;

                    var location = response[0].file;
                    window.location.href = location;
                    $scope.Error1 = false;
                    $scope.Noresult = false;
                } else if (response[0].ResponceCode == '400') {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = false;
                    $scope.Error1 = true;
                    $scope.ErrMsg1 = response[0].ResponceDescription;
                    alert($scope.ErrMsg1)
                } else {
                    $scope.loading = false;
                    $scope.Data = false
                    alert("No Data Found");
                    $scope.Noresult = true;
                    $scope.Error1 = false;

                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        }

    })
})

      
