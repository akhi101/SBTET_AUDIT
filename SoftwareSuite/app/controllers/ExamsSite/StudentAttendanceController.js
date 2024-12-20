define(['app'], function (app) {
    app.controller("StudentAttendanceController", function ($scope, $crypto, $http, $localStorage, $state, $window, $stateParams, AppSettings, $uibModal, PreExaminationService, SystemUserService) {
       

        // $scope.buttontext = "Show Full Attendance";

        $scope.ResultFound = false;
        $scope.ResultNotFound = false;
        $scope.LoadImg = false;

        const $ctrl = this;

        $ctrl.$onInit = () => {

            $scope.SessionCaptcha = sessionStorage.getItem('SessionCaptcha')

            var eKey = SystemUserService.GetEKey();
            eKey.then(function (res) {
                $scope.EKey = res;
                $scope.EncriptedSession = $crypto.encrypt($crypto.encrypt($scope.SessionCaptcha, 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
                $scope.GetCaptchaData()

            });


        }

        $scope.GetCaptchaData = function () {
            var captcha = PreExaminationService.GetCaptchaString($scope.EncriptedSession);
            captcha.then(function (response) {
                try {
                    var res = JSON.parse(response);
                    $scope.GetCatcha = res[0].Text;
                    $scope.CaptchaImage = res[0].Image;

                } catch (err) {
                    $scope.GetCatcha = ''
                }
            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }


      


        $scope.ValidateCaptchaText = function () {

            if ($scope.Studentpin == undefined || $scope.Studentpin == "") {
                alert("Enter Student PIN");
                $scope.loginbutton = false;
                return;
            };
            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                $scope.loginbutton = false;
                return;
            };
            var EncriptedCaptchaText = $crypto.encrypt($crypto.encrypt($scope.CaptchaText.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
            var Encstdpin = $crypto.encrypt($crypto.encrypt($scope.Studentpin.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
            var captcha = PreExaminationService.ValidateCaptchaText($scope.EncriptedSession, EncriptedCaptchaText, Encstdpin);

            
            captcha.then(function (res) {
                var response = JSON.parse(res)
                //var Data = JSON.parse(response[0])
                //var response = Data;
                if (response[0].ResponceCode == '200') {
                    //alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                    $scope.LoadImg = false;
                    $scope.DetailsNotFound = false;
                    $scope.DetailsFound = true;
                    $scope.getStudentDetails()
                    //  var resp = Data;


                } else {
                    alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)

                    $scope.CaptchaImage = captcha[0].Image;
                    $scope.Login.CaptchaText = "";
                    $scope.loginbutton = false;

                }

            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }











        /// recaptcha

        $scope.createCaptcha = function () {
            $scope.newCapchaCode = "";
            //document.getElementById('captcha').innerHTML = "";
            var charsArray =
                "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
            var lengthOtp = 6;
            var captcha = [];
            for (var i = 0; i < lengthOtp; i++) {
                //below code will not allow Repetition of Characters
                var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
                if (captcha.indexOf(charsArray[index]) == -1)
                    captcha.push(charsArray[index]);
                else i--;
            }
            var canv = document.createElement("canvas");
            canv.id = "captcha";
            canv.width = 150;
            canv.height = 50;
            var ctx = canv.getContext("2d");
            ctx.font = "25px Georgia";
            ctx.strokeText(captcha.join(""), 0, 30);

            //     var attr = document.createElement("a");
            //     attr.id = "attr";
            //    attr.title ="Please click here to reload captcha";

            //    var iattr = document.createElement("i");
            //    iattr.id = "iattr";
            //   iattr.className ="fa fa-refresh"; 
            //   var att = document.createAttribute("aria-hidden");       // Create a "class" attribute
            //     att.value = "true"; 
            //     iattr.setAttributeNode(att);
            //   document.getElementById("attr").appendChild(iattr);

            $scope.newCapchaCode = captcha.join("");
            //document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
            // document.getElementById("captcha").appendChild(attr); // adds the canvas to the body element
        }




        $window.validateRecaptcha = $scope.validateRecaptcha;


        $scope.keyLogin = function ($event) {
            if ($event.keyCode == 13) {
                $scope.getStudentDetails();
            }
        }




        $scope.ValidateAttendenceCaptcha = function () {

            if ($scope.Studentpin == undefined || $scope.Studentpin == "") {
                alert("Enter Student PIN");
                $scope.loginbutton = false;
                return;
            };
            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                $scope.loginbutton = false;
                return;
            };

            $scope.attendancedata = [];
            $scope.months = [];
            $scope.StudentData = [];
            $scope.filteredData = [];
            AttDataList = [];
            window.localStorage.setItem("pin", pin);
            var pin = pin;
            var days = [];
            var istr = "";
            for (var i = 1; i <= 31; i++) {
                if (i < 10)
                    istr = "0" + i;
                else
                    istr = "" + i;
                days.push(istr);
            }
            //  $scope.attName = name;
            $scope.days = days
            $scope.LoadImg = true;
            $scope.showbrancwiseattdata = false;
            var EncriptedCaptchaText = $crypto.encrypt($crypto.encrypt($scope.CaptchaText.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
            var Encstdpin = $crypto.encrypt($crypto.encrypt($scope.Studentpin.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
            var captcha = PreExaminationService.ValidateAttendenceCaptcha($scope.EncriptedSession, EncriptedCaptchaText, Encstdpin);
            captcha.then(function (res) {

                try {
                    var response = JSON.parse(res);
                } catch (err) {
                    var arr = { Table: [] }
                    var response = arr;
                    $scope.result = false;
                    alert("error while loading Data");
                }
                if (response[0].ResponceCode == '200') {
                    //alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                    var Data = JSON.parse(response[0].Data)
                    var response = Data;
                    if (response.Table.length > 0) {
                        $scope.result = true;
                        $scope.ResultFound = true;
                        $scope.ResultNotFound = false;
                        $scope.LoadImg = false;
                        $scope.StudentData = response.Table[0];
                        if ($scope.StudentData.semid == 8 || $scope.StudentData.semid == 9) {
                            $scope.StudentData.WorkingDaysForExams = 180;
                        }
                        //else if ($scope.StudentData.semid == 1) {
                        //    $scope.StudentData.WorkingDaysForExams = 85;
                        //}
                        else {
                            $scope.StudentData.WorkingDaysForExams = 90;
                        }
                        $scope.StudentData.AttdForExams = (($scope.StudentData.NumberOfDaysPresent / $scope.StudentData.WorkingDaysForExams) * 100).toFixed(0);

                        if (response.Table1.length > 0 && response.Table2.length > 0) {
                            $scope.attmonths = [];
                            $scope.filteredData = [];
                            $scope.filteredData = response.Table2;
                            $scope.data = $scope.filteredData;
                            $scope.totalattreport = response.Table1;
                            $scope.attendId = response.Table[0].AttendeeId;
                            $scope.attpin = response.Table[0].Pin;
                            $scope.attName = response.Table[0].Name;
                            var attbymonth = [];

                            var arr = $scope.totalattreport;
                            var finalarr = [];
                            for (var j = 0; j < response.Table2.length; j++) {
                                var attbymonth = [];
                                var temparr2 = [];
                                for (var i = 0; i < arr.length; i++) {
                                    if (arr[i].AttendanceMonth === response.Table2[j].AttendanceMonth) {
                                        attbymonth.push(arr[i]);
                                        temparr2.push(arr[i].Day);
                                    }
                                }

                                var attstatarr = [];
                                finalarr[j] = {};
                                finalarr[j].month = response.Table2[j].AttendanceMonth;
                                attstatarr[j] = {};
                                attbymonth.forEach(function (value) {
                                    var temparr1 = [];
                                    $scope.days.forEach(function (day, k) {
                                        if (value.Day == day && temparr2.includes(day)) {
                                            let att = {};
                                            att.day = value.Day;
                                            att.AttendeeId = value.AttendeeId;
                                            att.date = value.Date;
                                            att.month = value.AttendanceMonth;
                                            att.Status = value.Status;
                                            attstatarr[k] = att;
                                            temparr1.push(value.Day);
                                        } else if (value.Day != day && !temparr1.includes(day) && !temparr2.includes(day)) {
                                            let att = {};
                                            let D = value.Date.split('-');
                                            var dat = D[0] + '-' + D[1] + '-' + day;
                                            att.day = day;
                                            att.date = dat;
                                            att.AttendeeId = value.AttendeeId;
                                            att.month = value.AttendanceMonth;
                                            att.Status = "-";
                                            attstatarr[k] = att;
                                            temparr1.push(day);
                                        }

                                    });
                                    finalarr[j].attstat = attstatarr;
                                });
                                $scope.attendancedata = finalarr;



                            }
                            $scope.months = [];
                            $scope.filteredData = [];
                            AttDataList = [];
                            window.localStorage.setItem("pin", pin);
                            var pin = pin;
                            var days = [];
                            var istr = "";
                            for (var i = 1; i <= 31; i++) {
                                if (i < 10)
                                    istr = "0" + i;
                                else
                                    istr = "" + i;
                                days.push(istr);
                            }
                            // $scope.attName = name;
                            $scope.days = days
                            // $scope.LoadImg = true;
                            $scope.showbrancwiseattdata = false;
                        }
                    }

                    else {
                        $scope.result = false;
                        $scope.ResultFound = false;
                        $scope.ResultNotFound = true;
                        $scope.LoadImg = false;
                    }
                }
                else if (response[0].ResponceCode == '400') {
                    alert(response[0].ResponceDescription);
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.ResultFound = false;
                    $scope.ResultNotFound = true;
                    $scope.LoadImg = false;
                    alert("error while loading Data");
                    console.log(error);
                });
        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        };


        $scope.OpenAttendance = function () {
            $scope.showfullattendance = true;
            $scope.buttontext = "Hide";
            //$scope.modalInstance = $uibModal.open({
            //    templateUrl: "/app/views/Admission/Reports/StudentAttendanceReport.html",
            //    size: 'xlg',
            //    scope: $scope,
            //    windowClass: 'modal-fit-att',
            //    //backdrop: 'static',

            //});
        }
        $scope.printDetails = function (areatoprint) {

            // var divName = "idtoDivPrintAdmin";
            var divToPrint = document.getElementById(areatoprint);
            var temp = document.body.innerHTML;
            $("#studentAttendance1").hide();
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
            document.title = "Attendance Sheet" + $scope.Studentpin;
            window.print();
            document.body.removeChild($printSection);
            $("#studentAttendance1").show();

        }
    })
})