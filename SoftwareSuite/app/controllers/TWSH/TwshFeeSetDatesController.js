define(['app'], function (app) {
    app.controller("TwshFeeSetDatesController", function ($scope, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {

        $scope.getTwshFeeDates = [];
        $scope.endDisable = true;
        $scope.fineDisable = true;
        $scope.tatkalDisable = true;
        $scope.premiumtatkalDisable = true;
        //   $scope.Student.id = 1;
        //var data = {};
        //$scope.$emit('showLoading', data);

        var AcademicYearsActive = TwshStudentRegService.GetTwshAcademicYears();
        AcademicYearsActive.then(function (response) {

            //  $scope.years = response.Table[0];
            $scope.Acayears = response.Table;

        },
            function (error) {
                alert("error while loading Academic Year");
            });

        $scope.getExamMonthYearsData = function (year) {

            //let academicId = $scope.years.AcademicID;

            var EmYears = TwshStudentRegService.GetTwshExamMonthYearbyID(year);
            EmYears.then(function (response) {
                console.log(response)
                try {
                    var Res = JSON.parse(response)
                }
                catch { error }
                $scope.ExamMonthYears = Res.Table;
            },
                function (error) {
                    alert("error while loading semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }

        var ApprovalLists = TwshStudentRegService.getTwshFeeDates();
        ApprovalLists.then(function (response) {
            if (response.Table.length > 0) {
                $scope.result = true;
                $scope.Noresult = false
                $scope.getTwshFeeDate = response.Table;
                for (var j = 0; j < $scope.getTwshFeeDate.length; j++) {
                    $scope.getTwshFeeDate[j].FromDate = $scope.getTwshFeeDate[j].FromDate.replace("T", " ");
                    $scope.getTwshFeeDate[j].ToDate = $scope.getTwshFeeDate[j].ToDate.replace("T", " ");
                    $scope.getTwshFeeDate[j].FineDate = $scope.getTwshFeeDate[j].FineDate.replace("T", " ")
                    $scope.getTwshFeeDate[j].TatkalDate = $scope.getTwshFeeDate[j].TatkalDate.replace("T", " ")
                    $scope.getTwshFeeDates.push($scope.getTwshFeeDate[j])
                }
               
                for (var j = 1; j < response.Table.length + 1; j++) {
                   
                    $scope['edit' + j] = true;
                    $scope.edit = false
                }
            } else {
                $scope.result = false;
                $scope.Noresult = true;
            }
        }, function (error) {
            $scope.result = false;
            $scope.Noresult = true;

        });

        $scope.EditTwshDate = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
                ele1[j].style['-webkit-appearance'] = "auto";
                ele1[j].style['-moz-appearance'] = "auto";
            }
            $scope['edit' + ind] = false;

        }

        $scope.GetDates = function () {
            $scope.getTwshFeeDates = [];
            var ApprovalLists = TwshStudentRegService.getTwshFeeDates();
            ApprovalLists.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.result = true;
                    $scope.Noresult = false
                    $scope.getTwshFeeDate = response.Table;
                    for (var j = 0; j < $scope.getTwshFeeDate.length; j++) {
                        $scope.getTwshFeeDate[j].FromDate = $scope.getTwshFeeDate[j].FromDate.replace("T", " ");
                        $scope.getTwshFeeDate[j].ToDate = $scope.getTwshFeeDate[j].ToDate.replace("T", " ");
                        $scope.getTwshFeeDate[j].FineDate = $scope.getTwshFeeDate[j].FineDate.replace("T", " ")
                        $scope.getTwshFeeDate[j].TatkalDate = $scope.getTwshFeeDate[j].TatkalDate.replace("T", " ")
                        $scope.getTwshFeeDates.push($scope.getTwshFeeDate[j])
                    }
                    for (var j = 1; j < response.Table.length + 1; j++) {

                        $scope['edit' + j] = true;
                        $scope.edit = false
                    }
                } else {
                    $scope.result = false;
                    $scope.Noresult = true;
                }
            }, function (error) {
                $scope.result = false;
                $scope.Noresult = true;
              
            });
        }

        var GetExamYearMonth = TwshStudentRegService.getTwshExamMonthYears();
        GetExamYearMonth.then(function (response) {
            $scope.getExamYearMonth = response.Table;
           
        },
                function (error) {
                  
                    var err = JSON.parse(error);         
                });


        //var AcademicYearsActive = AssessmentService.GetAcademicYearsActive();
        //AcademicYearsActive.then(function (response) {
        //    $scope.years = response.Table[0];

        //},
        //function (error) {
        //    alert("error while loading Academic Year");
        //});

     
        //var GetExamYearMonth = PreExaminationService.getExamYearMonth();
        //GetExamYearMonth.then(function (response) {
        //    console.log(response);
        //    $scope.getExamYearMonth = response.Table;
        //},
        //        function (error) {
        //            alert("error while loading semesters");
        //            var err = JSON.parse(error);
        //            //    console.log(err.Message);          
        //        });


        //$scope.changeSem = function (data) {

        //    var val = JSON.parse(data);
        //    if ($scope.studentTypeId == 2) {
        //        $scope.semesterId = val.semid;
        //        $scope.current_schemeid1 = val.current_schemeid;
        //    } else {
        //        $scope.semesterId = val.semid;
        //        $scope.current_schemeid1 = val.current_schemeid;

        //    }

     

        //$scope.changeScheme = function () {
        //    $scope.current_schemeid;
        //    var GetExamYearMonth = PreExaminationService.getExamsMonthYear($scope.studentTypeId, $scope.semesterId, $scope.current_schemeid);
        //    GetExamYearMonth.then(function (response) {
        //        var resp = JSON.parse(response);
        //        console.log(resp);
        //        $scope.getExamYearMonth = resp.Table;
        //    },
        //            function (error) {

        //                var err = JSON.parse(error);
        //                console.log(err.Message);
        //            });
        //}



        //$scope.changeSemester = function (data) {
        //    var val = JSON.parse(data)
        //    $scope.semesterId = val.semid;
        //    $scope.current_schemeid1 = val.current_schemeid;
        //    $scope.changeSem(data);
        //}

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }


        today = yyyy + '-' + mm + '-' + dd;

        $scope.today = today;

        $scope.changeStuentType = function (studentTypeId) {

            $scope.studentTypeId = studentTypeId

            if ($scope.studentTypeId == 2) {
                $scope.BacklogSemesters();
            } else {
                $scope.RegularSemesters();

            }
        }



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

        $scope.SetTatkalDateFormat = function (TatkalDate) {
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
            hrs = '23'; min = '59'; sec = '59';
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            var date = [year, month, day].join('-');
            premiumtatkalDisable = false;
            $scope.pretatkal = [year, month, day].join('-');
            $scope.premiumtatkalDisable = false;
            var time = [hrs, min, sec].join(':');
            $scope.TatkalDate = date + ' ' + time;
            //   $scope.TatkalDate1 = date + ' ' + time;
            //    $scope.tatkal = date + ' ' + time

        };

        $scope.SetFineDates = function (EndDate) {
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

            $scope.End_date1 = indiaTime.toLocaleString();
            var tomorrow = new Date($scope.End_date1);
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
            //   $scope.EndDate = date + ' ' + time;
            $scope.EndDate1 = date + ' ' + time;
            $scope.fineDisable = false;
            $scope.fine = [year, month, day].join('-');

            document.getElementById("datetimepicker3").setAttribute("min", $scope.fine);

        };


        $scope.SetTatkalDates = function (FineDate) {
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

            $scope.End_date1 = indiaTime.toLocaleString();
            var tomorrow = new Date($scope.End_date1);
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
            //  $scope.FineDate = date + ' ' + time;
            $scope.FineDate1 = date + ' ' + time;

            //    $scope.tatkal = date + ' ' + time

            document.getElementById("datetimepicker4").setAttribute("min", $scope.tatkal);

        };

        $scope.SetTatkalDateFormats = function (TatkalDate) {
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
            $scope.End_date1 = indiaTime.toLocaleString();
            var tomorrow = new Date($scope.End_date1);
            tomorrow.setDate(tomorrow.getDate() + 1);

            var date = new Date(tomorrow.toLocaleString());
            month = '' + (date.getMonth() + 1);
            day = '' + date.getDate();
            year = date.getFullYear();
            hrs = '23'; min = '59'; sec = '59';
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            var date = [year, month, day].join('-');
            $scope.premiumtatkalDisable = false;
            var time = [hrs, min, sec].join(':');
            $scope.TatkalDate = date + ' ' + time;
            $scope.TatkalDate1 = date + ' ' + time;
            //    $scope.tatkal = date + ' ' + time

        };


        $scope.SetPremiumTatkalDateFormats = function (PremiumTatkalDate) {
            if (PremiumTatkalDate !== null && PremiumTatkalDate !== undefined) {
                var d = PremiumTatkalDate.toISOString().slice(0, 10).split('-');
                d[2] = parseInt(d[2]);
                d[2] = d[2] + 2; // offset time zone recovery
                var day = d[2];
                if (d[0].length === 4) {
                    var End_date = d[0] + "-" + d[1] + "-" + d[2];
                }
            }
            var indiaTime = new Date(PremiumTatkalDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            indiaTime = new Date(indiaTime);
            $scope.End_date1 = indiaTime.toLocaleString();
            var tomorrow = new Date($scope.End_date1);
            tomorrow.setDate(tomorrow.getDate() + 1);

            var date = new Date(tomorrow.toLocaleString());
            month = '' + (date.getMonth() + 1);
            day = '' + date.getDate();
            year = date.getFullYear();
            hrs = '23'; min = '59'; sec = '59';
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            var date = [year, month, day].join('-');
            var time = [hrs, min, sec].join(':');
            $scope.PremiumTatkalDate = date + ' ' + time;
            $scope.PremiumTatkalDate1 = date + ' ' + time;
            //    $scope.tatkal = date + ' ' + time
            alert($scope.PremiumTatkalDate)
        };

        $scope.submit = function () {
           
                var FromDate = moment($scope.StartDate).format("YYYY-MM-DD HH:mm:ss.SSS");
                var ToDate = moment($scope.EndDate).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
                var FineDate = moment($scope.FineDate).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
            var TatkalDate = moment($scope.TatkalDate).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
            var PremiumTatkalDate = moment($scope.PremiumTatkalDate).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
            var Fee = $scope.feeAmount;
                var Fee = $scope.feeAmount;
                var LateFee = $scope.lateFee;
                var TatkalFee = $scope.tatkalFee;
                var PremiumTatkalFee = $scope.PremiumTatkalFee;
            var certificateFee = $scope.certificateFee;
            if ($scope.year == null || $scope.year == '' || $scope.year == undefined) {
                alert("Please Select Academic Year")
                return
            }
            if ($scope.ExamMonthYear == null || $scope.ExamMonthYear == '' || $scope.ExamMonthYear == undefined) {
                    alert("Please Select Exam Month Year")
                    return
                }
                if (FromDate == null || FromDate == '' || FromDate == undefined) {
                    alert("Please Select From Date")
                    return
                }
                if (ToDate == null || ToDate == '' || ToDate == undefined) {
                    alert("Please Select To Date")
                    return
                }
                if (FineDate == null || FineDate == '' || FineDate == undefined) {
                    alert("Please Select Fine Date")
                    return
                }
                if (TatkalDate == null || TatkalDate == '' || TatkalDate == undefined) {
                    alert("Please Select Tatkal Date")
                    return
            }
            if (PremiumTatkalDate == null || PremiumTatkalDate == '' || PremiumTatkalDate == undefined) {
                alert("Please Select Premium Tatkal Date")
                return
            }
                if (Fee == null || Fee == '' || Fee == undefined) {
                    alert("Please Enter Fee")
                    return
                }
                if (LateFee == null || LateFee == '' || LateFee == undefined) {
                    alert("Please Enter Late Fee")
                    return
                }
                if (TatkalFee == null || TatkalFee == '' || TatkalFee == undefined) {
                    alert("Please Enter Tatkal Fee")
                    return
                }
                if ($scope.PremiumTatkalFee == null || $scope.PremiumTatkalFee == '' || $scope.PremiumTatkalFee == undefined) {
                    alert("Please Enter Premium Tatkal Fee")
                    return
                }
                if (certificateFee == null || certificateFee == '' || certificateFee == undefined) {
                    alert("Please Enter Certificate Fee")
                    return
                }
              
            var setFeePaymentDates = TwshStudentRegService.TwshsetStudentFeepayments($scope.year, $scope.ExamMonthYear, FromDate, ToDate, FineDate, TatkalDate, PremiumTatkalDate, Fee, LateFee, TatkalFee, $scope.PremiumTatkalFee, certificateFee);
            setFeePaymentDates.then(function (response) {
                $scope.StartDate = '';
                $scope.EndDate = '';
                $scope.FineDate = '';
                $scope.TatkalDate = '';
                $scope.feeAmount = '';
                $scope.lateFee = '';
                $scope.tatkalFee = '';               
                $scope.certificateFee = '';
                $scope.PremiumTatkalFee = '';
                $scope.ExamMonthYearId = '';
                alert("Fee Payment Dates are Defined successfully");
                $scope.GetDates();
                //var getFeeDates = TwshStudentRegService.getStudentFeeDates();
                //getFeeDates.then(function (response) {
                //    if (response.Table.length > 0) {

                //        $scope.FeeDates = response.Table;
                //        $scope.loading = false;
                //        $scope.result = true;
                //        $scope.Noresult = false;

                //    } else {
                //        $scope.loading = false;
                //        $scope.Noresult = true;
                //        $scope.result = false;
                //        alert("Error while Inserting Data");
                //    }
                //},
                //function (error) {
                //    $scope.loading = false;
                //    $scope.Noresult = true;
                //    $scope.result = false;
                //    $scope.FeeDates = [];
                //    alert("Error while Inserting Data");
                //    console.log(error);
                //});
                // $scope.GetMarksEntryDatesList();
            }, function (error) {
                let err = JSON.parse(error);
            });
        };

        $scope.UpdateTwshDate = function (data) {
            var FromDate = moment(data.FromDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            var ToDate = moment(data.ToDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            var FineDate = moment(data.FineDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            var TatkalDate = moment(data.TatkalDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            var PremiumTatkalDate = moment(data.PremiumTatkalDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            if (data.ExamMonthYearId == null || data.ExamMonthYearId == '' || data.ExamMonthYearId == undefined) {
                alert("Please Select Exam Month Year")
                return
            }
            if (data.FromDate == null || data.FromDate == '' || data.FromDate == undefined) {
                alert("Please Select From Date")
                return
            }
            if (data.ToDate == null || data.ToDate == '' || data.ToDate == undefined) {
                alert("Please Select To Date")
                return
            }
            if (data.FineDate == null || data.FineDate == '' || data.FineDate == undefined) {
                alert("Please Select Fine Date")
                return
            }
            if (data.TatkalDate == null || data.TatkalDate == '' || data.TatkalDate == undefined) {
                alert("Please Select Tatkal Date")
                return
            }
            if (data.PremiumTatkalDate == null || data.PremiumTatkalDate == '' || data.PremiumTatkalDate == undefined) {
                alert("Please Select Premium Tatkal Date")
                return
            }
            if (data.Fee == null || data.Fee == '' || data.Fee == undefined) {
                alert("Please Enter Fee")
                return
            }
            if (data.LateFee == null || data.LateFee == '' || data.LateFee == undefined) {
                alert("Please Enter Late Fee")
                return
            }
            if (data.TatkalFee == null || data.TatkalFee == '' || data.TatkalFee == undefined) {
                alert("Please Enter Tatkal Fee")
                return
            }
            if (data.PremiumTatkalFee == null || data.PremiumTatkalFee == '' || data.PremiumTatkalFee == undefined) {
                alert("Please Enter Premium Tatkal Fee")
                return
            }
            if (data.CertificateFee == null || data.CertificateFee == '' || data.CertificateFee == undefined) {
                alert("Please Enter Certificate Fee")
                return
            }

            var UpdateFeePaymentDates = TwshStudentRegService.TwshUpdateStudentFeepayments(data.Id, data.AcademicYearId, data.ExamMonthYearId, FromDate, ToDate, FineDate, TatkalDate, PremiumTatkalDate, data.Fee, data.LateFee, data.TatkalFee, data.PremiumTatkalFee, data.CertificateFee);
            UpdateFeePaymentDates.then(function (response) {
                if (response[0].ResponceCode=='200'){
                $scope.StartDate = '';
                $scope.EndDate = '';
                $scope.FineDate = '';
                $scope.TatkalDate = '';
                $scope.feeAmount = '';
                $scope.lateFee = '';
                $scope.tatkalFee = '';
                $scope.certificateFee = '';
                $scope.PremiumTatkalFee = '';
                $scope.ExamMonthYearId = '';
                alert(response[0].RespoceDescription);
                $scope.GetDates();
                } else if (response[0].ResponceCode == '400') {
                    alert(response[0].RespoceDescription);
                }
            }, function (error) {
                let err = JSON.parse(error);
            });
        };


        //var getFeeDates = PreExaminationService.getStudentFeeDates();
        //getFeeDates.then(function (response) {
        //    if (response.Table.length > 0) {
        //        $scope.loading = false;
        //        $scope.Noresult = false;
        //        $scope.result = true;
        //        $scope.FeeDates = response.Table;
        //        $scope.$emit('hideLoading', data);

        //    } else {
        //        $scope.loading = false;
        //        $scope.Noresult = true;
        //        $scope.result = false;
        //        $scope.$emit('hideLoading', data);
        //        //   alert("No Student found ");
        //    }
        //},
        //function (error) {
        //    $scope.loading = false;
        //    $scope.Noresult = true;
        //    $scope.result = false;
        //    $scope.FeeDates = [];
        //    $scope.$emit('hideLoading', data);
        //    alert("Error while Inserting Data");
        //    console.log(error);
        //});

        $scope.setFeeDateStatus = function (Id) {

            var SetStatus = TwshStudentRegService.TwshSetFeeDateStatus(Id);

            SetStatus.then(function (res) {
                var res = JSON.parse(res)
                if (res.Table[0].ResponceCode == '400') {
                    alert(res.Table[0].ResponceDescription)

                    //$scope.clearDefaults();
                } else {
                    alert(res.Table[0].ResponceDescription)
                    $scope.GetDates();

                    //$scope.clearDefaults();
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }
    })
})