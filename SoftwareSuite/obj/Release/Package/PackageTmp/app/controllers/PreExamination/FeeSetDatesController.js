define(['app'], function (app) {
    app.controller("FeeSetDatesController", function ($scope, $http, $localStorage, $state, AppSettings,$uibModal, AssessmentService, MarksEntryService, PreExaminationService, AdmissionService) {
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getFeeSetdate();
        }
        $scope.endDisable = true;
        $scope.fineDisable = true;
        $scope.tatkalDisable = true;
        //   $scope.Student.id = 1;
        var data = {};
        $scope.$emit('showLoading', data);
        var LoadExamTypeBysem = MarksEntryService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
                var data = { id: 999, type: "PromotionalFee" }
                $scope.StudentType.push(data);
                //   $scope.Student.id = response.Table[0].id
            } else {
                $scope.StudentType = [];
                //    alert("No Data Found");
            }
        },
        function (error) {
            alert("error while Data");
            console.log(error);
        });


        var AcademicYearsActive = AssessmentService.getFeeAcademicYearsActive();
        AcademicYearsActive.then(function (response) {
            $scope.years = response.Table[0];

        },
        function (error) {
            alert("error while loading Academic Year");
        });

        $scope.RegularSemesters = function () {
            var LoadActiveSemesters = PreExaminationService.getActiveSemester();
            LoadActiveSemesters.then(function (response) {
                $scope.ActiveSemesters = response.Table;
            },
                function (error) {
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }

        $scope.BacklogSemesters = function () {
            var LoadBacklogSemesters = PreExaminationService.getAllSemester();
            LoadBacklogSemesters.then(function (response) {
                $scope.ActiveSemesters = response.Table;
            },
                function (error) {
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }
        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }

        $scope.ApplicationLetter1 = "/contents/img/cesign.png";
        $scope.UploadApplication = function () {
            var input = document.getElementById("ApplicationLetter");
            var fileSize = input.files[0].size;

            //if (fileSize <= 3000000 && fileSize >= 700000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#ViewApplicationLetter').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', {
                            src: e.target.result
                        });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);

                            var base64Image1 = canvas.toDataURL("image/png");
                            $scope.ApplicationLetter1 = base64Image1;
                            var base64Img = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");
                            $scope.ApplicationLetter = base64Img;


                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            //} else if (fileSize <= 700000) {
            //    alert("file size should not be less than 700KB");
            //    $('#Aadhar').val('');
            //    return;
            //} else if (fileSize >= 3000000) {
            //    alert("file size should not be greater than 3MB");
            //    $('#Aadhar').val('');
            //    return;
            //} else {
            //    alert("file size should be between 1MB and 3MB");
            //    $('#Aadhar').val('');
            //    return;
            //}
        }

        var getSchemes = AdmissionService.GetSchemes();
        getSchemes.then(function (response) {
          
            $scope.getSchemes = response.Table;
        },
                function (error) {
                 
                    var err = JSON.parse(error);
                    //    console.log(err.Message);          
                });

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

        $scope.OpenSignaturePopup = function () {

            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/PreExamination/SignaturePopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',

            });
        }

        $scope.UploadSignature = function () {
            if ($scope.ApplicationLetter == null || $scope.ApplicationLetter == "" || $scope.ApplicationLetter == undefined) {
                alert('Please Upload Photo')
                return;
            }
            var Sign = MarksEntryService.UploadSign($scope.ApplicationLetter);
            Sign.then(function (res) {
               var response=JSON.parse(res)
               if (response[0].ResponceCode=='200') {
                  alert(response[0].ResponceDescription)
                } else {
                       alert("Something Went Wrong");
                }
            },
            function (error) {
                alert("error while Data");
                console.log(error);
            });
        }

        $scope.changeSem = function (data) {

            var val = JSON.parse(data);
            if ($scope.studentTypeId == 2) {
                $scope.semesterId = val.semid;
                $scope.current_schemeid1 = val.current_schemeid;
            } else {
                $scope.semesterId = val.semid;
                $scope.current_schemeid1 = val.current_schemeid;

            }
        
            var GetExamYearMonth = PreExaminationService.getExamsMonthYear($scope.studentTypeId, $scope.semesterId, $scope.current_schemeid1);
            GetExamYearMonth.then(function (response) {
                var resp = JSON.parse(response);
                console.log(resp);
                $scope.getExamYearMonth = resp.Table;
            },
                    function (error) {
                     
                        var err = JSON.parse(error);
                        console.log(err.Message);          
                    });
        }

        $scope.changeScheme = function () {
            $scope.current_schemeid;
            var GetExamYearMonth = PreExaminationService.getExamsMonthYear($scope.studentTypeId, $scope.semesterId, $scope.current_schemeid);
            GetExamYearMonth.then(function (response) {
                var resp = JSON.parse(response);
                console.log(resp);
                $scope.getExamYearMonth = resp.Table;
            },
                    function (error) {
                      
                        var err = JSON.parse(error);
                        console.log(err.Message);          
                    });
        }



        $scope.changeSemester = function (data) {
            var val = JSON.parse(data)
            $scope.semesterId = val.semid;
            $scope.current_schemeid1 = val.current_schemeid;
            $scope.changeSem(data);
        }

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
            var time = [hrs, min, sec].join(':');
            $scope.TatkalDate = date + ' ' + time;
            $scope.TatkalDate1 = date + ' ' + time;
            //    $scope.tatkal = date + ' ' + time

        };

        $scope.clickRadio = function (value) {
           
            $scope.FeeTimetable =value
        }

        $scope.clickRadio1 = function (value) {
            $scope.FeeAttendance = value
        }

        //$scope.clickRadio2 = function (value) {
        //    $scope.FeeForSelScheme = value
        //}


        $scope.submit = function (CurrentMonthYear) {
            //if ($scope.SetDatesForm.$valid) {
            if ($scope.FeeAttendance == '' || $scope.FeeAttendance == undefined || $scope.FeeAttendance == null) {
                alert("Please select Fee Payment With Timeteble or not")
                return;
            }
            if ($scope.FeeTimetable == '' || $scope.FeeTimetable == undefined || $scope.FeeTimetable == null) {
                alert("Please select Fee Payment With Presumptive Attendance or not")
                return;
            }

            //if ($scope.FeeForSelScheme == '' || $scope.FeeForSelScheme == undefined || $scope.FeeForSelScheme == null) {
            //    alert("Please select Fee Payment Only for c18 scheme or not.")
            //    return;
            //}
            if ($scope.studentTypeId == 1) {

                var Academicid = $scope.years.AcademicID;
                var Semid = $scope.semesterId;
                var FromDate = moment($scope.StartDate).format("YYYY-MM-DD HH:mm:ss.SSS");
                var ToDate = moment($scope.EndDate).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
                var FineDate = moment($scope.FineDate).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
                var TatkalDate = moment($scope.TatkalDate).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
                var Fee = $scope.feeAmount;
                var LateFee = $scope.lateFee;
                var CondonationFee = $scope.condonationalFee;
                var TatkalFee = $scope.tatkalFee;
                var StudentType = $scope.studentTypeId;
                var PresemptiveAttendedDays = $scope.attendedDays;
                var certificateFee = $scope.certificateFee;
                var maxWorkingDays = $scope.maxWorkingDays;
                var current_schemeid = $scope.current_schemeid1;
                var CurrentMonthYear = CurrentMonthYear;
                var CondonationPercent = $scope.CondonationPercent;
                var DetendPercent = $scope.DetendPercent;
                var IsAttendance = $scope.FeeAttendance;
                var FeeTimetable = $scope.FeeTimetable;
          
            } else {

                var Academicid = $scope.years.AcademicID;
                var Semid = $scope.semesterId;
                var FromDate = moment($scope.StartDate).format("YYYY-MM-DD HH:mm:ss.SSS");
                var ToDate = moment($scope.EndDate1).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
                var FineDate = moment($scope.FineDate1).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
                var TatkalDate = moment($scope.TatkalDate1).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
                var Fee = $scope.feeAmount1;
                var LateFee = $scope.lateFee1;
                var TatkalFee = $scope.tatkalFee1;
                var StudentType = $scope.studentTypeId;
                var CondonationFee = 0;
                var certificateFee = 0;
                var PresemptiveAttendedDays = 0;
                var maxWorkingDays = 0;
                var CondonationPercent =0;
                var DetendPercent = 0;
                var current_schemeid = $scope.current_schemeid;
                var CurrentMonthYear = $scope.CurrentMonthYear1;
                var IsAttendance = $scope.FeeAttendance;
                var FeeTimetable = $scope.FeeTimetable;

             
            }
            alert('Please wait for 10 min, Now Calculating the Presumptive Attendance % for Entered Semester.')

            var setFeePaymentDates = PreExaminationService.PostFeepaymentDates(StudentType, Semid, FromDate, ToDate, Fee, FineDate, LateFee, TatkalDate, TatkalFee, $scope.PremiumTatkalFee, CondonationFee,
                PresemptiveAttendedDays, maxWorkingDays, certificateFee, current_schemeid, CurrentMonthYear, CondonationPercent, DetendPercent, IsAttendance, FeeTimetable); //
            setFeePaymentDates.then(function (response) {
                $scope.StartDate = '';
                $scope.current_schemeid = '';
                $scope.EndDate = '';
                $scope.FineDate = '';
                $scope.TatkalDate = '';
                $scope.feeAmount = '';
                $scope.lateFee = '';
                $scope.condonationalFee = '';
                $scope.tatkalFee = '';
                $scope.StudentId = '';
                $scope.attendedDays = '';
                $scope.maxWorkingDays = '';
                $scope.certificateFee = '';
                alert("Fee Payment Dates are Defined successfully");
                $scope.getFeeSetdate();
                // $scope.GetMarksEntryDatesList();
            }, function (error) {
                let err = JSON.parse(error);
                console.log(err);
            });
        };


        $scope.UpdateTwshDate = function (data) {
            //if ($scope.SetDatesForm.$valid) {
            if ($scope.studentTypeId == 1) {

                var Academicid = $scope.years.AcademicID;
                var Semid = $scope.semesterId;
                var FromDate = moment($scope.StartDate).format("YYYY-MM-DD HH:mm:ss.SSS");
                var ToDate = moment($scope.EndDate).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
                var FineDate = moment($scope.FineDate).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
                var TatkalDate = moment($scope.TatkalDate).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
                var Fee = $scope.feeAmount;
                var LateFee = $scope.lateFee;
                var CondonationFee = $scope.condonationalFee;
                var TatkalFee = $scope.tatkalFee;
                var StudentType = $scope.studentTypeId;
                var PresemptiveAttendedDays = $scope.attendedDays;
                var certificateFee = $scope.certificateFee;
                var maxWorkingDays = $scope.maxWorkingDays;
                var current_schemeid = $scope.current_schemeid1;
                var CurrentMonthYear = CurrentMonthYear;
                var CondonationPercent = $scope.CondonationPercent;
                var DetendPercent = $scope.DetendPercent;
               
            } else {

                var Academicid = $scope.years.AcademicID;
                var Semid = $scope.semesterId;
                var FromDate = moment($scope.StartDate).format("YYYY-MM-DD HH:mm:ss.SSS");
                var ToDate = moment($scope.EndDate1).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
                var FineDate = moment($scope.FineDate1).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
                var TatkalDate = moment($scope.TatkalDate1).subtract(1, "days").format("YYYY-MM-DD HH:mm:ss.SSS");
                var Fee = $scope.feeAmount1;
                var LateFee = $scope.lateFee1;
                var TatkalFee = $scope.tatkalFee1;
                var StudentType = $scope.studentTypeId;
                var CondonationFee = 0;
                var certificateFee = 0;
                var PresemptiveAttendedDays = 0;
                var maxWorkingDays = 0;
                var CondonationPercent = 0;
                var DetendPercent = 0;
                var current_schemeid = $scope.current_schemeid;
                var CurrentMonthYear = $scope.CurrentMonthYear1;
            }
            alert('Please wait for 10 min, Now Calculating the Presumptive Attendance % for Entered Semester.')

            var setFeePaymentDates = PreExaminationService.PostFeepaymentDates(StudentType, Semid, FromDate, ToDate, Fee, FineDate, LateFee, TatkalDate, TatkalFee, $scope.PremiumTatkalFee, CondonationFee, PresemptiveAttendedDays, maxWorkingDays, certificateFee, current_schemeid, CurrentMonthYear, CondonationPercent, DetendPercent);
            setFeePaymentDates.then(function (response) {
                $scope.StartDate = '';
                $scope.current_schemeid = '';
                $scope.EndDate = '';
                $scope.FineDate = '';
                $scope.TatkalDate = '';
                $scope.feeAmount = '';
                $scope.lateFee = '';
                $scope.condonationalFee = '';
                $scope.tatkalFee = '';
                $scope.StudentId = '';
                $scope.attendedDays = '';
                $scope.maxWorkingDays = '';
                $scope.certificateFee = '';
                alert("Fee Payment Dates are Defined successfully");
                $scope.getFeeSetdate()
                // $scope.GetMarksEntryDatesList();
            }, function (error) {
                let err = JSON.parse(error);
                console.log(err);
            });
        };

        $scope.getFeeSetdate = function () {
            $scope.loading = true;
            $scope.Noresult = false;
            $scope.result = false;
            var getFeeDates = PreExaminationService.getStudentFeeDates();
            getFeeDates.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.loading = false;
                    $scope.Noresult = false;
                    $scope.result = true;
                    $scope.FeeDates = response.Table;
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

     
    });
});