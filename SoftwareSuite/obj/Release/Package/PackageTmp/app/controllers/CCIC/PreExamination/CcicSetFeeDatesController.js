define(['app'], function (app) {
    app.controller("CcicSetFeeDatesController", function ($scope, $localStorage, $uibModal, CcicPreExaminationService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var UserTypeID = parseInt(authData.UserTypeID);
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getCcicCurrentAcademicYear();
            $scope.endDisable = true;
            $scope.fineDisable = true;
            $scope.tatkalDisable = true;
            $scope.premiumtatkalDisable = true;
        }
        var data = {};

        $scope.getCcicCurrentAcademicYear = function () {
            var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
            getCcicCurrentAcademicYear.then(function (response) {

                $scope.GetCcicCurrentAcademicYear = response;

            },
                function (error) {
                    alert("error while loading CurrentAcademicYear");
                    var err = JSON.parse(error);

                });
        }

        //var getaffcourses = CcicPreExaminationService.GetAffiliatedCourses();
        //getaffcourses.then(function (response) {
        //    if (response.length > 0) {
        //        $scope.CoursesData = response;

        //    } else {
        //        $scope.CoursesData = [];
        //        alert("No Data Found");
        //    }
        //},
        //    function (error) {
        //        alert("error while loading Data");
        //        console.log(error);
        //    });

        //var getaffcourses = CcicPreExaminationService.GetAffiliatedCourses();
        //getaffcourses.then(function (res) {
        //    //var res = JSON.parse(res);
        //    $scope.CoursesData = res;
        //    $scope.isAllSelectedcourses = false;
        //    var toggleStatus = $scope.isAllSelectedcourses;
        //    angular.forEach($scope.CoursesData, function (itm) { itm.selected = toggleStatus; });
        //    $scope.coursearr = [];
        //    angular.forEach($scope.CoursesData, function (value, key) {
        //        if (value.selected === true) {
        //            $scope.coursearr.push({ "CourseID": value.CourseID })
        //        }
        //    });
        //}, function (err) {
        //    $scope.LoadImg = false;
        //    alert("Error while loading");
        //});

        $scope.SetStartDate = function () {

            document.getElementById("datetimepicker1").setAttribute("min", today);

        };
        $scope.SetEndDate = function (StartDate) {

            if (StartDate !== null && StartDate !== undefined) {
                var d = StartDate.toISOString().slice(0, 10).split('-');
                d[2] = parseInt(d[2]);
                // d[2] = d[2] + 2; // offset time zone recovery
                var day = d[2];
                if (d[0].length === 4) {
                    var Start_date = d[0] + "-" + d[1] + "-" + d[2];
                }
            }
            //var date = new Date(Start_date);
            var indiaTime = new Date(StartDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            indiaTime = new Date(indiaTime);

            $scope.tomorrow = indiaTime.toLocaleString();
            //var time = indiaTime.toLocaleTimeString();
            //console.log(time);


            var tomorrow = new Date($scope.tomorrow);
            tomorrow.setDate(tomorrow.getDate() + 1);

            var dates = new Date(tomorrow.toLocaleString());
            //var time = new Date(tomorrow.toLocaleTimeString())
            //console.log(time)
            month = '' + (dates.getMonth() + 1);
            day = '' + dates.getDate();
            year = dates.getFullYear();


            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            $scope.endDisable = false;
            $scope.enD = [year, month, day].join('-');

            document.getElementById("datetimepicker2").setAttribute("min", $scope.enD);

        };
        $scope.SetFineDate = function (EndDate) {
            if (EndDate !== null && EndDate !== undefined) {
                var d = EndDate.toISOString().slice(0, 10).split('-');
                d[2] = parseInt(d[2]);
                d[2] = d[2] + 2; // offset time zone recovery
                var day = d[2];
                if (d[0].length === 4) {
                    var End_date = d[0] + "-" + d[1] + "-" + d[2];
                }
            }
            var indiaTime = new Date(EndDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            indiaTime = new Date(indiaTime);

            $scope.End_date = indiaTime.toLocaleString();
            var tomorrow = new Date($scope.End_date);
            tomorrow.setDate(tomorrow.getDate() + 1);

            var date = new Date(tomorrow.toLocaleString());
            month = '' + (date.getMonth() + 1);
            day = '' + date.getDate();
            year = date.getFullYear();

            hrs = '23';
            min = '59';
            sec = '59';

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            var date = [year, month, day].join('-');
            var time = [hrs, min, sec].join(':');
            $scope.EndDate = date + ' ' + time;
            //  $scope.EndDate1 = date + ' ' + time;
            $scope.fineDisable = false;
            $scope.fine = [year, month, day].join('-');

            document.getElementById("datetimepicker3").setAttribute("min", $scope.fine);

        };


        $scope.SetTatkalDate = function (FineDate) {
            if (FineDate !== null && FineDate !== undefined) {
                var d = FineDate.toISOString().slice(0, 10).split('-');
                d[2] = parseInt(d[2]);
                d[2] = d[2] + 2; // offset time zone recovery
                var day = d[2];
                if (d[0].length === 4) {
                    var End_date = d[0] + "-" + d[1] + "-" + d[2];
                }
            }
            var indiaTime = new Date(FineDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            indiaTime = new Date(indiaTime);

            $scope.End_date = indiaTime.toLocaleString();
            var tomorrow = new Date($scope.End_date);
            tomorrow.setDate(tomorrow.getDate() + 1);

            var date = new Date(tomorrow.toLocaleString());
            month = '' + (date.getMonth() + 1);
            day = '' + date.getDate();
            year = date.getFullYear();
            hrs = '23';
            min = '59';
            sec = '59';

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            var date = [year, month, day].join('-');
            var time = [hrs, min, sec].join(':');
            $scope.tatkalDisable = false;
            $scope.tatkal = [year, month, day].join('-');
            $scope.FineDate = date + ' ' + time;
            //   $scope.FineDate1 = date + ' ' + time;

            //    $scope.tatkal = date + ' ' + time

            document.getElementById("datetimepicker4").setAttribute("min", $scope.tatkal);

        };

        $scope.SetPremiumTatkalDate = function (TatkalDate) {
            if (TatkalDate !== null && TatkalDate !== undefined) {
                var d = TatkalDate.toISOString().slice(0, 10).split('-');
                d[2] = parseInt(d[2]);
                d[2] = d[2] + 2; // offset time zone recovery
                var day = d[2];
                if (d[0].length === 4) {
                    var End_date = d[0] + "-" + d[1] + "-" + d[2];
                }
            }
            var indiaTime = new Date(TatkalDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            indiaTime = new Date(indiaTime);

            $scope.End_date = indiaTime.toLocaleString();
            var tomorrow = new Date($scope.End_date);
            tomorrow.setDate(tomorrow.getDate() + 1);

            var date = new Date(tomorrow.toLocaleString());
            month = '' + (date.getMonth() + 1);
            day = '' + date.getDate();
            year = date.getFullYear();
            hrs = '23';
            min = '59';
            sec = '59';

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            var date = [year, month, day].join('-');
            var time = [hrs, min, sec].join(':');
            $scope.premiumtatkalDisable = false;
            $scope.premiumtatkal = [year, month, day].join('-');
            $scope.TatkalDate = date + ' ' + time;
            //   $scope.FineDate1 = date + ' ' + time;

            //    $scope.tatkal = date + ' ' + time

            document.getElementById("datetimepicker5").setAttribute("min", $scope.premiumtatkal);

        };




        //----------------------Course Multi Select Start--------------------------------//
        var courseexpand = false;
        $scope.showcourseCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxescourse");
            if (!courseexpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                courseexpand = true;
            } else {
                checkboxes.style.display = "none";
                courseexpand = false;
            }
        }

        $scope.closecourseCheckbox = function () {
            var checkboxes = document.getElementById("checkboxescourse");
            if (!courseexpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                courseexpand = true;
            } else {
                checkboxes.style.display = "none";
                courseexpand = false;
            }
        }

        $scope.toggleAllcourse = function () {
            var toggleStatus = $scope.isAllSelectedcourses;
            angular.forEach($scope.CoursesData, function (itm) { itm.selected = toggleStatus; });
            $scope.coursearr = [];
            angular.forEach($scope.CoursesData, function (value, key) {
                if (value.selected === true) {
                    $scope.coursearr.push({ "CourseID": value.CourseID })
                }
            });
        }

        $scope.optionToggledcourse = function () {
            $scope.isAllSelectedcourses = $scope.CoursesData.every(function (itm) { return itm.selected; })
            $scope.coursearr = [];
            angular.forEach($scope.CoursesData, function (value, key) {
                if (value.selected === true) {
                    $scope.coursearr.push({ "CourseID": value.CourseID })
                }
            });
        }

        //----------------------Course Multi Select End--------------------------------//
        $scope.changeExamMonthYr = function (ExamMonthYearID) {

            $scope.ExamMonthYearID = ExamMonthYearID;

            //if ($scope.ExamMonthYearID == 2) {
            //    $scope.BacklogSemesters();
            //} else {
            //    $scope.RegularSemesters();

            //}
        }

        $scope.ChangeAcaYr = function (AcademicYearID) {
            $scope.AcademicYearID = AcademicYearID;
            $scope.GetExamMonthYearData(AcademicYearID);
            $scope.getFeeSetdate(AcademicYearID);


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

        $scope.getFeeSetdate = function (AcademicYearID) {
            $scope.loading = true;
            $scope.Noresult = false;
            $scope.result = false;
            var DataType = 1;
            var FeePaymentDateID=0 //(Optional)
            var getFeeDates = CcicPreExaminationService.GetFeePaymentDates(DataType, AcademicYearID, FeePaymentDateID);
            getFeeDates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.length>0){
                    $scope.loading = false;
                    $scope.Noresult = false;
                    $scope.result = true;
                    $scope.FeeDates = res;
                    coursearr = response;
                    $scope.$emit('hideLoading', data);

                } else {
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                    $scope.$emit('hideLoading', data);
                    //   alert("No Student found ");
                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                    $scope.FeeDates = [];
                    $scope.$emit('hideLoading', data);
                    alert("Error while Inserting Data");
                    console.log(error);
                });

        }

        $scope.Submit = function () {
            if ($scope.AcademicYear == null || $scope.AcademicYear == "" || $scope.AcademicYear == undefined) {
                alert("Please Select Academic Year");
                return;
            }
            if ($scope.monthyear == null || $scope.monthyear == "" || $scope.monthyear == undefined) {
                alert("Please Select Exam Month Year");
                return;
            }
            if ($scope.StartDate == null || $scope.StartDate == "" || $scope.StartDate == undefined) {
                alert("Please Select Start Date");
                return;
            }
            if ($scope.EndDate == null || $scope.EndDate == "" || $scope.EndDate == undefined) {
                alert("Please Select Last Date without Fine");
                return;
            }
            if ($scope.FineDate == null || $scope.FineDate == "" || $scope.FineDate == undefined) {
                alert("Please Select Last Date with Fine");
                return;
            }
            if ($scope.TatkalDate == null || $scope.TatkalDate == "" || $scope.TatkalDate == undefined) {
                alert("Please Select Tatkal End Date");
                return;
            }
            if ($scope.PremiumTatkalDate == null || $scope.PremiumTatkalDate == "" || $scope.PremiumTatkalDate == undefined) {
                alert("Please Select Premium Tatkal End Date");
                return;
            }
            if ($scope.ExaminationFee == null || $scope.ExaminationFee == "" || $scope.ExaminationFee == undefined) {
                alert("Please Enter Examination Fee");
                return;
            }
            if ($scope.LateFee == null || $scope.LateFee == "" || $scope.LateFee == undefined) {
                alert("Please Enter Late Fee");
                return;
            }
            if ($scope.TatkalFee == null || $scope.TatkalFee == "" || $scope.TatkalFee == undefined) {
                alert("Please Enter Tatkal Fee");
                return;
            }
            if ($scope.PremiumTatkalFee == null || $scope.PremiumTatkalFee == "" || $scope.PremiumTatkalFee == undefined) {
                alert("Please Enter Premium Tatkal Fee");
                return;
            }
            if ($scope.CertificateFee == null || $scope.CertificateFee == "" || $scope.CertificateFee == undefined) {
                alert("Please Enter Certificate Fee");
                return;
            }
            $scope.loading = true;

            var ParamObj = {
                "DataType": 1,
                "FeePaymentDateID": 0,
                "AcademicYearID" : $scope.AcademicYear,
                "ExamMonthYearID": $scope.monthyear,
                "StartDate" : moment($scope.StartDate).format("YYYY-MM-DD"),
                "LastDatewithoutFine" : moment($scope.EndDate).subtract(1, "days").format("YYYY-MM-DD"),
                "LastDatewithFine" : moment($scope.FineDate).subtract(1, "days").format("YYYY-MM-DD"),
                "TatkalEndDate" : moment($scope.TatkalDate).subtract(1, "days").format("YYYY-MM-DD"),
                "PremiumTatkalEndDate" : moment($scope.PremiumTatkalDate).format("YYYY-MM-DD"),
                "ExaminationFee" : $scope.ExaminationFee,
                "LateFee" : $scope.LateFee,
                "TatkalFee" : $scope.TatkalFee,
                "PremiumTatkalFee" : $scope.PremiumTatkalFee,
                "CertificateFee": $scope.CertificateFee,
                "Active": 0,
                "UserName": authData.UserName

            }
            var setFeePaymentDates = CcicPreExaminationService.AddFeePaymentDates(ParamObj)
            setFeePaymentDates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].StatusCode == '200') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.$emit('hideLoading', data);
                    $scope.getFeeSetdate();
                } else if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.$emit('hideLoading', data);
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })


        }


        $scope.Edit = function (FeePaymentDateID) {
            var DataType = 2;
            var AcademicYearID=0 //(Optional)
            var editfeepaymentdates = CcicPreExaminationService.EditFeePaymentDates(DataType,AcademicYearID,FeePaymentDateID);
            editfeepaymentdates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.length > 0) {
                    $scope.EditData = res;
                }
                else {
                    $scope.EditData = [];
                }


            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });



            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/SetFeeDatesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                //windowClass: 'modal-fit-att',
            });

        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }


        $scope.updateFeePaymentDates = function (data) {
            $scope.loading = true;

            var ParamObj = {
                "DataType": 2,
                "FeePaymentDateID": data[0].FeePaymentDateID,
                "AcademicYearID": data[0].AcademicYearID,
                "ExamMonthYearID": data[0].ExamMonthYearID,
                "StartDate": moment(data[0].StartDate).format("YYYY-MM-DD"),
                "LastDatewithoutFine": moment(data[0].LastDatewithoutFine).format("YYYY-MM-DD"),
                "LastDatewithFine": moment(data[0].LastDatewithFine).format("YYYY-MM-DD"),
                "TatkalEndDate": moment(data[0].TatkalEndDate).format("YYYY-MM-DD"),
                "PremiumTatkalEndDate": moment(data[0].PremiumTatkalEndDate).format("YYYY-MM-DD"),
                "ExaminationFee": data[0].ExaminationFee,
                "LateFee": data[0].LateFee,
                "TatkalFee": data[0].TatkalFee,
                "PremiumTatkalFee": data[0].PremiumTatkalFee,
                "CertificateFee": data[0].CertificateFee,
                "Active": data[0].Active,
                "UserName": authData.UserName

            }
            var updatefeepaymentdates = CcicPreExaminationService.UpdateFeePaymentDates(ParamObj)
            updatefeepaymentdates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].StatusCode == '200') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.modalInstance.close();
                    $scope.$emit('hideLoading', data);
                    $scope.getFeeSetdate($scope.AcademicYearID);
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })


        }





    })
})


