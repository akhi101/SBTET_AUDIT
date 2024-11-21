define(['app'], function (app) {
    app.controller("DiplomaFeePaymentController", function ($scope, $crypto, $http, $localStorage, $window, $state, PreExaminationService, $uibModal, PaymentService, SystemUserService) {
        $scope.secondClick = false;
        $scope.allItemsSelected = true;
        $scope.allItemsSelectedthing = true;
        $scope.PaymentDetails = {}
        var authData = $localStorage.authorizationData;
        //$scope.SystemUserTypeId = authData.SystemUserTypeId;
        $scope.LoadImg = false;
        $scope.DetailsFound = false;
        $scope.DetailsNotFound = false;
        $scope.DetainedDetailsFound = false;
        $scope.isBackLog = false;
        $scope.ispromotional = false;
        $scope.ChallanDisable = false;
        $scope.loader = false;
        $scope.PaymentStudent = [];


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


        $scope.ValidateCaptchaText = function (Pin, Studtype) {
            if (Studtype == "" || Studtype == undefined || Studtype == null) {
                alert("select Fee Type");
                return;
            }

            if (Pin == "" || Pin == undefined || Pin == null) {
                alert("Enter Pin");
                return;
            }
            if ($scope.Studentpin == undefined || $scope.Studentpin == "") {
                alert("Enter Student Pin");
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
                    $scope.getStudentDetails(Pin, Studtype)
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

            $scope.newCapchaCode = captcha.join("");
            //document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
        }

        $scope.OpenPage = function () {
           // window.open("https://sbtet.telangana.gov.in/index.html#!/index/FeeReciept", "_blank")
            $state.go('index.FeeReciept')
        }


        $window.validateRecaptcha = $scope.validateRecaptcha;


        $scope.keyLogin = function ($event) {
            if ($event.keyCode == 13) {
                $scope.getStudentDetails();
            }
        }

    




        var LoadExamTypeBysem = PreExaminationService.getStudentType();
        $scope.Sems = "";
        $scope.feepayingpins = "";
        $scope.noteChallan = false;
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
               
                var data = { id: 999, type: "Promotional"}
                $scope.StudentType.push(data);
              
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });

        PaymentStudent = [];
        PaymentStudentList = [];

        $scope.selectAll = function () {

            $scope.allItemsSelectedthing = true;


            if ($scope.isAllchecked == true) {

                $scope.isAllchecked = false;


                for (var i = 0; i < $scope.studentSubData.length; i++) {
                    $scope.studentSubData[i].isChecked = false;
                }

                dataPay.Amount = 0;
                $scope.studentLateFee = 0;
                $scope.studentTatkalFee = 0;
                $scope.studentPremiumTatkalFee = 0;
                PaymentStudent = [];
                PaymentStudentList = [];
                $scope.studentSubjectsSelected = PaymentStudentList.length;
                $scope.studentTotalFee = ($scope.studentExamFee) * (PaymentStudentList.length);
                if ($scope.FinalstudentTatkalFee > 0) {
                    $scope.studentTotalFee = $scope.FinalstudentTatkalFee;
                } else if ($scope.studentPremiumTatkalFee > 0) {
                    $scope.studentTotalFee = $scope.FinalstudentPremiumTatkalFee;
                }
            }
            else if ($scope.isAllchecked == false) {
                $scope.isAllchecked = true;
                for (var i = 0; i < $scope.studentSubData.length; i++) {
                    $scope.studentSubData[i].isChecked = true;
                }
                PaymentStudentList = [];
                PaymentStudent = [];


                for (var i = 0; i < $scope.studentSubData.length; i++) {
                    dataPay = {};

                    dataPay.Semester = $scope.studentSubData[i].Semester;
                    dataPay.Sem = $scope.studentSubData[i].SemId;

                    if ($scope.PaymentDetails.length > 0) {
                        dataPay.Amount = 0;
                        $scope.studentLateFee = 0;
                        $scope.studentTatkalFee = 0;
                        $scope.studentPremiumTatkalFee = 0;
                        $scope.ExamFee = 0;
                        for (var j = 0; j < $scope.PaymentDetails.length; j++) {
                            //dataPay.Amount += $scope.PaymentDetails[i].ExamFee + $scope.PaymentDetails[i].LateFee + $scope.PaymentDetails[i].TatkalFee;
                            $scope.studentLateFee += $scope.PaymentDetails[j].LateFee;
                            $scope.studentTatkalFee += $scope.PaymentDetails[j].TatkalFee;
                            $scope.studentPremiumTatkalFee += $scope.PaymentDetails[j].PremiumTatkalFee;
                            $scope.ExamFee += $scope.PaymentDetails[j].ExamFee;
                        }

                        //$scope.studentTotalFee = dataPay.Amount;
                    }
                    //dataPay.Amount = $scope.studentTotalFee;

                    if ($scope.studentTatkalFee > 0) {
                        dataPay.Amount = $scope.studentTatkalFee + $scope.ExamFee;
                        dataPay.isTatkalFee = true;
                        $scope.studentTotalFee = dataPay.Amount;
                    }
                    else if ($scope.studentLateFee > 0) {
                        dataPay.Amount = $scope.studentLateFee + $scope.ExamFee;
                        dataPay.isLateFee = false;
                        $scope.studentTotalFee = dataPay.Amount;
                    } else if ($scope.studentPremiumTatkalFee > 0) {
                        dataPay.Amount = $scope.studentPremiumTatkalFee + $scope.ExamFee;
                        dataPay.isPremiumTatkalFee = true;
                        $scope.studentTotalFee = dataPay.Amount;
                    }
                    else {
                        dataPay.Amount = $scope.ExamFee;
                        $scope.studentTotalFee = dataPay.Amount;
                        dataPay.isLateFee = false;
                        dataPay.isTatkalFee = false;
                        dataPay.isPremiumTatkalFee = false;
                    }


                    //$scope.studentSubjectsSelected;
                    dataPay.Pin = $scope.studPin;
                    //for (var j = 0; j < $scope.ActiveSemesters.length; j++) {
                    //    if ($scope.ActiveSemesters[j].semid == $scope.current_schemeid) {
                    //        dataPay.Semester = $scope.ActiveSemesters[j].semester;
                    //        Semester = $scope.ActiveSemesters[j].semester;
                    //        break;
                    //    }
                    //}
                    dataPay.UserName = "STUDENT";
                    dataPay.StudentTypeId = $scope.Studtype;
                    dataPay.Name = $scope.studentName;

                    //if ($scope.studentSubData[i].Condonation !== undefined)
                    //    dataPay.Condonation = $scope.ExamPayment[i].Condonation;
                    //else
                    //    dataPay.Condonation = "";
                    //dataPay.Penality = $scope.ExamPayment[i].Penality;
                    //dataPay.Tatkal = $scope.ExamPayment[i].Tatkal;
                    //dataPay.CertificateFee = $scope.ExamPayment[i].CertificateFee;
                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push($scope.studentSubData[i].Semester);
                    $scope.studentSubjectsSelected = PaymentStudentList.length;
                    //$scope.studentTotalFee = ($scope.studentExamFee) * (PaymentStudentList.length);
                    //if ($scope.FinalstudentTatkalFee > 0) {
                    //    //$scope.studentTotalFee = $scope.FinalstudentTatkalFee;
                    //}
                }
            }
            $scope.studentSubjectsSelected = PaymentStudentList.length;
            $scope.PaymentStudent = PaymentStudent;
            $scope.PaymentStudentList = PaymentStudentList;
            $scope.calculateTotalFee();
        };


        $scope.selectVAll = function () {

            if ($scope.allItemsSelectedthing == true) {


                if ($scope.isAllchecked == false) {

                    $scope.isAllchecked = false;


                    for (var i = 0; i < $scope.studentSubData.length; i++) {
                        $scope.studentSubData[i].isChecked = false;
                    }
                    PaymentStudent = [];
                    PaymentStudentList = [];
                }
                else if ($scope.isAllchecked == true) {
                    $scope.isAllchecked = true;
                    for (var i = 0; i < $scope.studentSubData.length; i++) {
                        $scope.studentSubData[i].isChecked = true;
                    }
                    PaymentStudentList = [];
                    PaymentStudent = [];
                    for (var i = 0; i < $scope.studentSubData.length; i++) {
                        dataPay = {};

                        dataPay.Semester = $scope.studentSubData[i].Semester;
                        dataPay.Sem = $scope.studentSubData[i].SemId;

                        if ($scope.PaymentDetails.length > 0) {
                            dataPay.Amount = 0;
                            $scope.studentLateFee = 0;
                            $scope.studentTatkalFee = 0;
                            $scope.PremiumTatkalFee = 0;
                            $scope.ExamFee = 0;
                            for (var j = 0; j < $scope.PaymentDetails.length; j++) {
                                //dataPay.Amount += $scope.PaymentDetails[i].ExamFee + $scope.PaymentDetails[i].LateFee + $scope.PaymentDetails[i].TatkalFee;
                                $scope.studentLateFee += $scope.PaymentDetails[j].LateFee;
                                $scope.studentTatkalFee += $scope.PaymentDetails[j].TatkalFee;
                                $scope.studentPremiumTatkalFee += $scope.PaymentDetails[j].PremiumTatkalFee;
                                $scope.ExamFee += $scope.PaymentDetails[j].ExamFee;
                            }

                            //$scope.studentTotalFee = dataPay.Amount;
                        }
                        //dataPay.Amount = $scope.studentTotalFee;

                        if ($scope.studentTatkalFee > 0) {
                            dataPay.Amount = $scope.studentTatkalFee + $scope.ExamFee;
                            dataPay.isTatkalFee = true;
                            $scope.studentTotalFee = dataPay.Amount;
                        } else if ($scope.studentPremiumTatkalFee > 0) {
                            dataPay.Amount = $scope.studentPremiumTatkalFee + $scope.ExamFee;
                            dataPay.isPremiumTatkalFee = true;
                            $scope.studentTotalFee = dataPay.Amount;
                        }
                        else if ($scope.studentLateFee > 0) {
                            dataPay.Amount = $scope.studentLateFee + $scope.ExamFee;
                            dataPay.isLateFee = false;
                            $scope.studentTotalFee = dataPay.Amount;
                        }
                        else {
                            dataPay.Amount = $scope.ExamFee;
                            $scope.studentTotalFee = dataPay.Amount;
                            dataPay.isLateFee = false;
                            dataPay.isTatkalFee = false;
                            dataPay.isPremiumTatkalFee = false;
                        }
                        //$scope.studentSubjectsSelected;
                        dataPay.Pin = $scope.studPin;
                        //for (var j = 0; j < $scope.ActiveSemesters.length; j++) {
                        //    if ($scope.ActiveSemesters[j].semid == $scope.current_schemeid) {
                        //        dataPay.Semester = $scope.ActiveSemesters[j].semester;
                        //        Semester = $scope.ActiveSemesters[j].semester;
                        //        break;
                        //    }
                        //}
                        dataPay.UserName = "STUDENT";
                        dataPay.StudentTypeId = $scope.Studtype;
                        dataPay.Name = $scope.studentName;
                        //if ($scope.studentSubData[i].Condonation !== undefined)
                        //    dataPay.Condonation = $scope.ExamPayment[i].Condonation;
                        //else
                        //    dataPay.Condonation = "";
                        //dataPay.Penality = $scope.ExamPayment[i].Penality;
                        //dataPay.Tatkal = $scope.ExamPayment[i].Tatkal;
                        //dataPay.CertificateFee = $scope.ExamPayment[i].CertificateFee;
                        PaymentStudent.push(dataPay);
                        PaymentStudentList.push($scope.studentSubData[i].Semester);


                        //for (var i = 0 ; i < PaymentStudent.length; i++) {
                        //    $scope.studentTotalFee = 0;
                        //    $scope.studentTotalFee +=  PaymentStudent.Amount;
                        //}
                    }
                }

            }
            if ($scope.allItemsSelectedthing == false) {
                $scope.allItemsSelectedthing = true;
            }
            $scope.PaymentStudent = PaymentStudent;
            $scope.PaymentStudentList = PaymentStudentList;
            $scope.calculateTotalFee();
        };


        $scope.selectEntity = function (data) {
            if (data != null) {
                if (!PaymentStudentList.includes(data.Semester)) {
                    dataPay = {};
                    dataPay.Semester = data.Semester;
                    dataPay.Sem = data.SemId;

                    if ($scope.PaymentDetails.length > 0) {
                        for (var i = 0; i < $scope.PaymentDetails.length; i++) {
                            if ($scope.PaymentDetails[i].Semester == data.Semester) {
                                $scope.studentLateFee += $scope.PaymentDetails[i].LateFee;
                                $scope.studentTatkalFee += $scope.PaymentDetails[i].TatkalFee;
                                $scope.studentPremiumTatkalFee += $scope.PaymentDetails[i].PremiumTatkalFee;
                                $scope.ExamFee += $scope.PaymentDetails[i].ExamFee;
                            }
                        }
                    }

                    if ($scope.studentTatkalFee > 0) {
                        dataPay.Amount = $scope.studentTatkalFee;
                        dataPay.isTatkalFee = true;
                        dataPay.isLateFee = false;
                        $scope.studentTotalFee = dataPay.Amount;
                    } else if ($scope.studentPremiumTatkalFee > 0) {
                        dataPay.Amount = $scope.studentPremiumTatkalFee;
                        dataPay.isPremiumTatkalFee = true;
                        dataPay.isLateFee = false;
                        dataPay.isTatkalFee = false;
                        $scope.studentTotalFee = dataPay.Amount;
                    }
                    else if ($scope.studentLateFee > 0) {
                        dataPay.Amount = $scope.studentLateFee + $scope.ExamFee;
                        dataPay.isLateFee = true;
                        dataPay.isTatkalFee = false;
                        $scope.studentTotalFee = dataPay.Amount;
                    }
                    else {
                        dataPay.Amount = $scope.ExamFee;
                        $scope.studentTotalFee = dataPay.Amount;
                        dataPay.isLateFee = false;
                        dataPay.isTatkalFee = false;
                    }
                    dataPay.Name = $scope.studentName;
                    dataPay.UserName = "STUDENT";
                    dataPay.StudentTypeId = $scope.Studtype;
                    dataPay.Name = $scope.studentName;
                    dataPay.Pin = $scope.studPin;
                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push(data.Semester);
                    $scope.studentSubjectsSelected = PaymentStudentList.length;
                    $scope.calculateTotalFee();
                }
                else if (PaymentStudentList.includes(data.Semester)) {
                    PaymentStudentList.remByVal(data.Semester);
                    PaymentStudent.remElementByVal(data.Semester);
                    $scope.studentSubjectsSelected = PaymentStudentList.length;
                    if ($scope.PaymentDetails.length > 0) {
                        for (var i = 0; i < $scope.PaymentDetails.length; i++) {
                            if ($scope.PaymentDetails[i].Semester == data.Semester) {
                                $scope.studentLateFee -= $scope.PaymentDetails[i].LateFee;
                                $scope.studentTatkalFee -= $scope.PaymentDetails[i].TatkalFee;
                                $scope.studentPremiumTatkalFee -= $scope.PaymentDetails[i].PremiumTatkalFee;
                                $scope.ExamFee -= $scope.PaymentDetails[i].ExamFee;
                            }
                        }
                    }

                    //dataPay.Amount = $scope.studentTotalFee;



                    if ($scope.studentTatkalFee > 0) {
                        dataPay.Amount = $scope.studentTatkalFee + $scope.ExamFee;
                        dataPay.isTatkalFee = true;
                        $scope.studentTotalFee = dataPay.Amount;
                    } else if ($scope.studentPremiumTatkalFee > 0) {
                        dataPay.Amount = $scope.studentPremiumTatkalFee + $scope.ExamFee;
                        dataPay.isstudentPremiumTatkalFee = true;
                        $scope.studentTotalFee = dataPay.Amount;
                    }
                    else if ($scope.studentLateFee > 0) {
                        dataPay.Amount = $scope.studentLateFee + $scope.ExamFee;
                        dataPay.isLateFee = false;
                        $scope.studentTotalFee = dataPay.Amount;
                    }
                    else {
                        dataPay.Amount = $scope.ExamFee;
                        $scope.studentTotalFee = dataPay.Amount;
                        dataPay.isLateFee = false;
                        dataPay.isTatkalFee = false;
                        dataPay.isstudentPremiumTatkalFee = false;
                    }

                    $scope.studentTotalFee = $scope.studentExamFee + $scope.studentLateFee + $scope.studentTatkalFee;
                    if (PaymentStudentList.length == 0) {
                        $scope.allItemsSelectedthing = false;
                        $scope.studentTotalFee = 0;
                    }
                    if ($scope.FinalstudentTatkalFee > 0) {
                        $scope.studentTotalFee = $scope.FinalstudentTatkalFee;
                    }
                    $scope.calculateTotalFee();
                }
                $scope.PaymentStudent = PaymentStudent;
                $scope.PaymentStudentList = PaymentStudentList;
            }


        };

        $scope.calculateTotalFee = function () {
            $scope.FinalExamFee = 0;
            $scope.FinalLateFee = 0;
            $scope.FinalTatkalFee = 0;
            $scope.FinalPremiumTatkalFee = 0;
            for (var j = 0; j < PaymentStudentList.length; j++) {
                for (var i = 0; i < $scope.PaymentDetails.length; i++) {
                    if ($scope.PaymentDetails[i].Semester == PaymentStudentList[j]) {
                        $scope.FinalExamFee += $scope.PaymentDetails[i].ExamFee;
                        $scope.FinalLateFee += $scope.PaymentDetails[i].LateFee;
                        $scope.FinalTatkalFee += $scope.PaymentDetails[i].TatkalFee;
                        $scope.FinalPremiumTatkalFee += $scope.PaymentDetails[i].PremiumTatkalFee;
                    }

                }
            }
            console.log($scope.FinalExamFee)
            $scope.FinalTotalFee = $scope.FinalExamFee + $scope.FinalLateFee + $scope.FinalTatkalFee + $scope.FinalPremiumTatkalFee;
        }

        Array.prototype.remByVal = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }

        Array.prototype.remElementByVal = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i].Semester === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }

        //var loadHallticket = PreExaminationService.GetExamMonthYearForHallticketandFeepayment(1,1);
        //loadHallticket.then(function (response) {
        //    if (response.Table[0].ResponceCode == '200') {
        //        $scope.GetExamMonthYear = [];
        //        $scope.GetExamMonthYear = response.Table1;
        //    } else {
        //        $scope.GetExamMonthYear = [];
        //        alert("No Exam Month Year found on this Record");
        //    }
        //},
        //    function (error) {
        //        alert("error while loading Exam Month Years");
        //        console.log(error);
        //    });

        $scope.changedVal = function () {
            $scope.DetailsFound = false;
            $scope.EncDataType = $crypto.encrypt($crypto.encrypt("1", 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
            $scope.EncstdStdTypeId = $crypto.encrypt($crypto.encrypt($scope.Student.id.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
            var loadHallticket = PreExaminationService.GetExamMonthYearForHallticketandFeepayment($scope.EncDataType, $scope.EncstdStdTypeId);
            loadHallticket.then(function (response) {
                if (response.Table[0].ResponceCode == '200') {
                    $scope.GetExamMonthYear = [];
                    $scope.GetExamMonthYear = response.Table1;
                } else {
                    $scope.GetExamMonthYear = [];
                    alert("No Exam Month Year found on this Record");
                }
            },
                function (error) {
                    alert("error while loading Exam Month Years");
                    console.log(error);
                });
        }


        $scope.ChangeData = function (data) {
            var Data = JSON.parse(data)
            $scope.ExamMonthYear = Data.Id
            $scope.ExamMonthYearName = Data.ExamYearMonth
           
        }

        $scope.validateAll = function (Pin, Studtype) {
            if (Studtype == "" || Studtype == undefined || Studtype == null) {
                alert("select Fee Type");
                return;
            }

            if (Pin == "" || Pin == undefined || Pin == null) {
                alert("Enter Pin");
                return;
            }
            if ($scope.Studentpin == undefined || $scope.Studentpin == "") {
                alert("Enter Student Pin");
                $scope.loginbutton = false;
                return;
            };
            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                $scope.loginbutton = false;
                return;
            };

            $scope.Studtype = Studtype;
            if (Studtype == "1") {
                $scope.isBackLog = false;
                $scope.ispromotional = false;
                if ($scope.Student === undefined) {
                    alert("Slelect Student Type");
                    return;
                }
                else if ($scope.Student !== undefined) {
                    $scope.LoadImg = true;
                    $scope.DetailsFound = false;
                    $scope.DetainedDetailsFound = false;
                    var StudtypeId = parseInt(Studtype);
                    $scope.EncriptedCaptchaText = $crypto.encrypt($crypto.encrypt($scope.CaptchaText.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
                    $scope.Encstdpin = $crypto.encrypt($crypto.encrypt($scope.Studentpin.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
                    $scope.EncstdStdTypeId = $crypto.encrypt($crypto.encrypt(StudtypeId.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
                    $scope.EncstdSysUserTypeId = $crypto.encrypt($crypto.encrypt("1", 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
                    if ($scope.SystemUserTypeId == 1) {
                        var studentDetails = PreExaminationService.ValidateStudentFeePaymentforAdminCaptcha($scope.EncriptedSession, $scope.EncriptedCaptchaText, $scope.Encstdpin, $scope.EncstdStdTypeId, $scope.EncstdSysUserTypeId);
                        studentDetails.then(function (res) {
                            $scope.LoadImg = false;
                            $scope.DetailsNotFound = false;
                            $scope.DetailsFound = true;
                            var response = JSON.parse(res)
                            if (response[0].ResponceCode == '200') {
                                $scope.CaptchaText = "";
                                $scope.GetCatcha = response[0].Captcha
                                var captcha = JSON.parse(response[0].Captcha)
                                $scope.CaptchaImage = captcha[0].Image;
                            var Data = JSON.parse(response[0])
                            var resp = Data;
                            if (resp.Table !== undefined && resp.Table[0].ResponceCode == '200') {

                                $scope.studPin = resp.Table1[0].Pin;
                                $scope.Photo = resp.Table1[0].Photo;
                                $scope.studentScheme = resp.Table1[0].Scheme;
                                $scope.studentBranch = resp.Table1[0].Branch;
                                $scope.studentSem = resp.Table1[0].Semester;
                                $scope.studentName = resp.Table1[0].Name;
                                $scope.studentFatherName = resp.Table1[0].FatherName;
                                $scope.studentattendance = resp.Table1[0].PresemptiveAttendance;
                                $scope.studentPaymentStatus = resp.Table1[0].Status;
                                $scope.FinalstudentTatkalFee = resp.Table1[0].TatkalFee;
                                $scope.studentTatkalFee = resp.Table1[0].TatkalFee;
                                $scope.FinalstudentPremiumTatkalFee = resp.Table1[0].PremiumTatkalFee;
                                $scope.studentPremiumTatkalFee = resp.Table1[0].PremiumTatkalFee;
                                $scope.studentCondonationFee = resp.Table1[0].Condonation;
                                $scope.FinalstudentLateFee = resp.Table1[0].LateFee;
                                $scope.studentLateFee = resp.Table1[0].LateFee;
                                $scope.studentExamFee = resp.Table1[0].ExamFee;
                                $scope.studentTotalFee = resp.Table1[0].TotalFee;
                                $scope.studentCertificateFee = resp.Table1[0].CertificateFee;
                                $scope.studentExamCenterName = resp.Table1[0].ExaminationCenter;
                                $scope.studentExamCenterCode = resp.Table1[0].ExaminationCenterCode;
                                $scope.studentSubData = resp.Table2;
                                $scope.DetailsNotFound = false;
                                $scope.LoadImg = false;

                            }
                            else if (resp.Table[0].ResponceCode == '400') {
                                if (resp.Table[0].ResponceDescription == 'Please Submit Feedback.') {
                                    alert(resp.Table[0].ResponceDescription);
                                    $state.go('index.StudentFeedback')
                                }
                                $scope.LoadImg = false;
                                $scope.DetailsFound = false;
                                $scope.DetailsNotFound = false;
                                $scope.DetainedDetailsFound = true;
                                $scope.DetainedDetailsFoundWithData = resp.Table[0].ResponceDescription;
                            }
                            else {

                                $scope.LoadImg = false;
                                $scope.DetailsFound = false;
                                $scope.DetailsNotFound = true;
                                alert(resp.Table[0].ResponceDescription);

                            }
                        }
                        else {
                        alert(response[0].ResponceDescription)
                        $scope.CaptchaText = "";
                        $scope.GetCatcha = response[0].Captcha
                        var captcha = JSON.parse(response[0].Captcha)
                        $scope.CaptchaImage = captcha[0].Image;
                        $scope.DetailsFound = false;

                    }

                        }, function (err) {
                            $scope.LoadImg = false;
                            $scope.DetailsFound = false;
                            $scope.DetailsNotFound = false;

                        });


                    } else {
                        $scope.EncEmMonthYr = $crypto.encrypt($crypto.encrypt($scope.ExamMonthYear.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
                        var studentDetails = PreExaminationService.ValidateStudentFeePaymentDetailsCaptcha($scope.EncriptedSession, $scope.EncriptedCaptchaText, $scope.Encstdpin, $scope.EncstdStdTypeId, $scope.EncEmMonthYr);
                        studentDetails.then(function (res) {
                            $scope.LoadImg = false;
                            $scope.DetailsNotFound = false;
                            $scope.DetailsFound = true;
                            var response = JSON.parse(res)
                            if (response[0].ResponceCode == '200') {
                                $scope.CaptchaText = "";
                                $scope.GetCatcha = response[0].Captcha
                                var captcha = JSON.parse(response[0].Captcha)
                                $scope.CaptchaImage = captcha[0].Image;
                                var Data = JSON.parse(response[0].Data)
                                var resp = Data;
                                if (resp.Table !== undefined && resp.Table[0].ResponceCode == '200') {

                                    $scope.studPin = resp.Table1[0].Pin;
                                    $scope.Photo = resp.Table1[0].Photo;
                                    $scope.studentScheme = resp.Table1[0].Scheme;
                                    $scope.studentBranch = resp.Table1[0].Branch;
                                    $scope.studentSem = resp.Table1[0].Semester;
                                    $scope.studentName = resp.Table1[0].Name;
                                    $scope.studentFatherName = resp.Table1[0].FatherName;
                                    $scope.studentattendance = resp.Table1[0].PresemptiveAttendance;
                                    $scope.studentPaymentStatus = resp.Table1[0].Status;
                                    $scope.FinalstudentTatkalFee = resp.Table1[0].TatkalFee;
                                    $scope.studentTatkalFee = resp.Table1[0].TatkalFee;
                                    $scope.FinalstudentPremiumTatkalFee = resp.Table1[0].PremiumTatkalFee;
                                    $scope.studentPremiumTatkalFee = resp.Table1[0].PremiumTatkalFee;
                                    $scope.studentCondonationFee = resp.Table1[0].Condonation;
                                    $scope.FinalstudentLateFee = resp.Table1[0].LateFee;
                                    $scope.studentLateFee = resp.Table1[0].LateFee;
                                    $scope.studentExamFee = resp.Table1[0].ExamFee;
                                    $scope.studentTotalFee = resp.Table1[0].TotalFee;
                                    $scope.studentCertificateFee = resp.Table1[0].CertificateFee;
                                    $scope.studentExamCenterName = resp.Table1[0].ExaminationCenter;
                                    $scope.studentExamCenterCode = resp.Table1[0].ExaminationCenterCode;
                                    $scope.studentSubData = resp.Table2;
                                    $scope.DetailsNotFound = false;
                                    $scope.LoadImg = false;

                                }
                                else if (resp.Table[0].ResponceCode == '400') {
                                    $scope.LoadImg = false;
                                    $scope.DetailsFound = false;
                                    $scope.DetailsNotFound = false;
                                    $scope.DetainedDetailsFound = true;
                                    if (resp.Table[0].ResponceDescription == 'Please Submit Feedback.') {
                                        alert(resp.Table[0].ResponceDescription);
                                        $state.go('index.StudentFeedback')
                                    }
                                    $scope.DetainedDetailsFoundWithData = resp.Table[0].ResponceDescription;
                                }
                                else {

                                    $scope.LoadImg = false;
                                    $scope.DetailsFound = false;
                                    $scope.DetailsNotFound = true;
                                    alert(resp.Table[0].ResponceDescription);

                                }
                            }
                            else {
                                alert(response[0].ResponceDescription)
                                $scope.CaptchaText = "";
                                $scope.GetCatcha = response[0].Captcha
                                var captcha = JSON.parse(response[0].Captcha)
                                $scope.CaptchaImage = captcha[0].Image;
                                $scope.DetailsFound = false;
                            }

                        }, function (err) {
                            $scope.LoadImg = false;
                            $scope.DetailsFound = false;
                            $scope.DetailsNotFound = false;

                        });



                    }


                }
            }

            else if (Studtype == "2") {
                $scope.isAllchecked = true;
                $scope.isBackLog = true;
                $scope.ispromotional = false;
                if ($scope.Student === undefined) {
                    alert("Slelect Student Type");
                    return;
                }

                else if ($scope.Student !== undefined) {
                    $scope.LoadImg = true;
                    $scope.DetailsFound = false;
                    $scope.DetainedDetailsFound = false;
                    var StudtypeId = parseInt(Studtype);

                    $scope.EncEmMonthYr = $crypto.encrypt($crypto.encrypt($scope.ExamMonthYear.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
                    var studentDetails = PreExaminationService.ValidateStudentFeePaymentDetailsCaptcha($scope.EncriptedSession, $scope.EncriptedCaptchaText, $scope.Encstdpin, $scope.EncstdStdTypeId, $scope.EncEmMonthYr);
                    studentDetails.then(function (resp) {
                        $scope.LoadImg = false;
                        $scope.DetailsNotFound = false;
                        $scope.DetailsFound = true;
                        var newDataTable = [];
                        var response = JSON.parse(resp)
                        if (response[0].ResponceCode == '200') {
                            $scope.CaptchaText = "";
                            $scope.GetCatcha = response[0].Captcha
                            var captcha = JSON.parse(response[0].Captcha)
                            $scope.CaptchaImage = captcha[0].Image;
                            var Data = JSON.parse(response[0])
                            var resp = Data;

                            if (resp.Table !== undefined && resp.Table[0].ResponceCode == '200') {

                                //var newDataTable = [];
                                var SemesterList = [];

                                for (var i = 0; i < resp.Table2.length; i++) {
                                    if (!SemesterList.includes(resp.Table2[i].yrsem)) {
                                        SemesterList.push(resp.Table2[i].yrsem);
                                        var temp = {};
                                        temp.Subjects = [];
                                        //var Subjects = {};
                                        temp.SemId = resp.Table2[i].semid;
                                        temp.Semester = resp.Table2[i].yrsem;
                                        temp.scheme = resp.Table2[i].scheme;
                                        temp.oldscheme = resp.Table2[i].OriginalScheme;
                                        temp.isChecked = true;

                                        for (var j = 0; j < resp.Table2.length; j++) {
                                            var Subject = {};
                                            if (resp.Table2[j].yrsem == temp.Semester) {
                                                Subject.SubjectCode = resp.Table2[j].sub1;
                                                Subject.bacSubjectCode = resp.Table2[j].sub2;
                                                Subject.SubjectName = resp.Table2[j].subname;
                                                Subject.scheme = resp.Table2[i].scheme;
                                                Subject.ExamDate = resp.Table2[j].ExamDate;
                                                Subject.ExamTime = resp.Table2[j].ExamTime;
                                                temp.Subjects.push(Subject);

                                            }
                                        }

                                        newDataTable.push(temp);
                                    }
                                }




                                $scope.studPin = resp.Table1[0].Pin;
                                $scope.Photo = resp.Table1[0].Photo;
                                $scope.studentScheme = resp.Table1[0].Scheme;
                                $scope.studentBranch = resp.Table1[0].Branch;
                                $scope.studentSem = resp.Table1[0].Semester;
                                $scope.studentName = resp.Table1[0].Name;
                                $scope.studentFatherName = resp.Table1[0].FatherName;
                                $scope.studentSubjectsSelected = resp.Table1[0].TotalSemSelect;
                                $scope.studentPaymentStatus = resp.Table1[0].Status;
                                $scope.FinalstudentTatkalFee = resp.Table1[0].TatkalFee;
                                $scope.studentTatkalFee = resp.Table1[0].TatkalFee;
                                $scope.studentPremiumTatkalFee = resp.Table1[0].PremiumTatkalFee;
                                $scope.FinalstudentPremiumTatkalFee = resp.Table1[0].PremiumTatkalFee;
                                $scope.studentCondonationFee = resp.Table1[0].Condonation;
                                $scope.FinalstudentLateFee = resp.Table1[0].LateFee;
                                $scope.studentLateFee = resp.Table1[0].LateFee;
                                $scope.studentExamFee = resp.Table1[0].ExamFee;
                                $scope.studentTotalFee = resp.Table1[0].TotalFee;
                                $scope.studentCertificateFee = resp.Table1[0].CertificateFee;
                                $scope.studentExamCenterName = resp.Table1[0].ExaminationCenter;
                                $scope.studentExamCenterCode = resp.Table1[0].ExaminationCenterCode;
                                $scope.PaymentDetails = resp.Table3;
                                $scope.studentSubData = newDataTable;
                                $scope.DetailsNotFound = false;
                                $scope.LoadImg = false;
                                $scope.selectVAll();

                                $scope.tableData = [];
                                //  $scope.ExamPayment = response;
                                $scope.tableData.push({ rows: resp.Table3, cols: Object.keys(resp.Table3[0]) });
                                $scope.calculateTotalFee();
                            }
                            else if (resp.Table !== undefined && resp.Table[0].ResponceCode == '400') {
                                $scope.LoadImg = false;
                                $scope.DetailsFound = false;
                                $scope.DetailsNotFound = false;
                                $scope.DetainedDetailsFound = true;
                                if (resp.Table[0].ResponceDescription == 'Please Submit Feedback.') {
                                    alert(resp.Table[0].ResponceDescription);
                                    $state.go('index.StudentFeedback')
                                }
                                $scope.DetainedDetailsFoundWithData = resp.Table[0].ResponceDescription;
                            }
                            else {
                                $scope.LoadImg = false;
                                $scope.DetailsFound = false;
                                $scope.DetailsNotFound = true;
                                alert(resp.Table[0].ResponceDescription);

                            }
                        }
                        else {
                            alert(response[0].ResponceDescription)
                            $scope.CaptchaText = "";
                            $scope.GetCatcha = response[0].Captcha
                            var captcha = JSON.parse(response[0].Captcha)
                            $scope.CaptchaImage = captcha[0].Image;
                            $scope.DetailsFound = false;
                        }

                    }, function (err) {
                        $scope.LoadImg = false;
                        $scope.DetailsFound = false;
                        $scope.DetailsNotFound = false;

                    });
                }
            }
            else if (Studtype == "999") {
                $scope.isBackLog = false;
                $scope.ispromotional = true;
                var StudtypeId = parseInt(Studtype);
                $scope.Encstdpin = $crypto.encrypt($crypto.encrypt($scope.Pin.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
                $scope.EncstdStdTypeId = $crypto.encrypt($crypto.encrypt(StudtypeId.toString(), 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
                var getData = PreExaminationService.getDataByPin(StudtypeId, Pin);
                getData.then(function (res) {
                    //$scope.feeCaptcha = "";
                    //$scope.createCaptcha();
                    if (res.Table) {
                        if (res.Table[0].ResponceCode == '200') {
                            $scope.getUserData = res.Table1[0];
                            $scope.result = true;

                            $scope.LoadImg = false;
                            $scope.DetailsNotFound = false;
                            $scope.DetailsFound = true;
                            $scope.DetainedDetailsFound = false;
                        } else if (res.Table[0].ResponceCode == '400') {
                            $scope.LoadImg = false;
                            $scope.DetailsFound = false;
                            $scope.DetailsNotFound = false;
                            $scope.DetainedDetailsFound = true;
                            alert(res.Table[0].ResponceDescription);
                            $scope.DetainedDetailsFoundWithData = res.Table[0].ResponceDescription;
                        }
                        else {

                            $scope.LoadImg = false;
                            $scope.DetailsFound = false;
                            $scope.DetailsNotFound = true;
                            alert(res.Table[0].ResponceDescription);

                        }
                    }
                }, function (error) {
                    $scope.LoadImg = false;
                    $scope.DetailsFound = false;
                    $scope.DetailsNotFound = false;
                    $scope.DetainedDetailsFound = true;

                    alert("Error while loading Data");
                    console.log(error);
                });

            }
        }



        $scope.Proceedtopayfine = function () {
            if ($scope.Student.id == 2) {
                if ($scope.UpdatedContactDetail == null || $scope.UpdatedContactDetail == "" || $scope.UpdatedContactDetail == undefined) {
                    alert("Please update the mobile number before you proceed.");
                    return;
                }
            }

            var College_Code = "admin";
            $scope.noteChallan = false;
            $scope.secondClick = false;
            //var marchantid = "TSSBTET"; // live
            var marchantid = "TSSBTET"; // test
            try {
                College_Code = authData.College_Code == null ? "admin" : authData.College_Code;
            } catch (err) {
            }
            var addInfo1 = College_Code;
            var addInfo3 = $scope.feepayingpins;
            var addInfo4 = "NA"//$scope.loadedScheme.Scheme;t
            var addInfo5 = "NA";//Semester;
            var addInfo6 = "SINGLE"//PaymentType;
            var addInfo7 = $scope.ExamMonthYearName;
            var amount = "";
            if ($scope.Student.id == 1) {
                addInfo5 = "REGULAR";
                amount = $scope.AmountDB.toFixed(2) == null || $scope.AmountDB.toFixed(2) == "" ? $scope.studentTotalFee.toFixed(2) : $scope.AmountDB.toFixed(2);

            }
            else if ($scope.Student.id == 2) {
                amount = $scope.FinalAmountDB.toFixed(2);
                addInfo5 = "BACKLOG";
                addInfo4 = $scope.Sems;
            }
            else if ($scope.Student.id == 999) {
                var addInfo3 = $scope.Studentpin;
                var addInfo4 = $scope.getUserData.CurrentSemester == null || $scope.getUserData.CurrentSemester == "" ? "NA" : $scope.getUserData.CurrentSemester;//previous sem;
                var addInfo5 = "PROMOTIONAL";
                var addInfo7 = $scope.getUserData.Scheme == null || $scope.getUserData.Scheme == "" ? "NA" : $scope.getUserData.Scheme;//Scheme;;
                var amount = $scope.AmountDB.toFixed(2) == null || $scope.AmountDB.toFixed(2) == "" ? $scope.studentTotalFee.toFixed(2) : $scope.AmountDB.toFixed(2);
                amount = $scope.FinalAmountDB.toFixed(2);
            }
            var subMarchantid = "TSDOFP";
            $localStorage.PaymentGatewayResponse = {};
            redirecturl = {
                redirecturl: "index.DiplomaFeePayment"
            }
            $localStorage.PaymentGatewayResponse = redirecturl;

            var location = window.location.origin;

           // PreExaminationService.RequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount, "studentType", "json");
            // $localStorage.assessment.redirecturl = 'Dashboard.AssessmentDashboard.Assessment.TheorySubjectList';
            //localhost:65321/Payment/BulkBillResponse
            //'sbtet.telangana.gov.in/API/Payment/BulkBillResponse'
            PreExaminationService.RequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount, 0, "json");
            var proceedfinePayment = PaymentService.getSomeValue(location + "/Payment/BulkBillResponse", $scope.challan);
            //var proceedfinePayment = PaymentService.getHashValue(location + "/Payment/BulkBillResponse", marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount);
            proceedfinePayment.then(function (resp) {
                if (resp != "" && resp != undefined) {
                    // var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg="
                    var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp   // live url
                    //var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg=KALYANTEST|429|NA|2|NA|NA|NA|INR|NA|R|kalyantest|NA|NA|F|8850062965|test-developer@candere.com|187|NA|NA|NA|NA|http://127.0.0.1/candere_repo/scheme/billdesk/response|9F4E06C08698DA6338428E2A36141826468E8E31C83F3B814F831AE6D6D27CFD";
                    //   var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // test url
                    window.location.replace(req);
                }
            }, function (err) {
                $scope.noteChallan = false;
                $scope.secondClick = true;
                console.log(err);
            });
        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }




        $scope.notedChallan = function () {
            if ($scope.noteChallan == true) {
                $scope.noteChallan = false;
            } else {
                $scope.noteChallan = true;
            }
        }


        $scope.isStudentContact = true;
        $scope.payNow = function () {
            $scope.ChallanDisable = true;
            $scope.loader = true;
            if ($scope.Student === undefined) {
                alert("Select Student Type");
                $scope.ChallanDisable = false;
                $scope.loader = false;
            }
            else if ($scope.Student !== undefined) {

                if ($scope.Student.id == 1) {

                    var PaymentStudent = [];
                    datajson = {};
                    datajson.Pin = $scope.studPin;
                    datajson.Semester = $scope.studentSubData[0].Semester + "(" + $scope.studentSubData[0].studentScheme + ")";
                    datajson.Amount = $scope.studentTotalFee.toFixed(2);
                    datajson.UserName = null;
                    datajson.StudentTypeId = $scope.Student.id;
                    PaymentStudent.push(datajson);
                }

                //UserName":"M_001","Pin":"123","Semester":"3sem(c18)","Amount":"100","IpAddress":""
                if (PaymentStudent === undefined) {
                    PaymentStudent = $scope.PaymentStudent;
                }



                if ($scope.Student.id == 1 || $scope.Student.id == 2) {
                    var getChallanDetails = PreExaminationService.getChanllanForExamFee(JSON.stringify(PaymentStudent).toString(), $scope.ExamMonthYear);
                    getChallanDetails.then(function (Usersdata) {
                        $scope.userJsonData = JSON.parse(Usersdata);
                        $scope.ChallanDisable = false;
                        $scope.loader = false;
                        if ($scope.Student.id == 1) {
                            if ($scope.userJsonData.Table.length > 0) {
                                if ($scope.userJsonData.Table1[0].ChalanaNumber !== undefined || $scope.userJsonData.Table[0].ChalanaNumber !== undefined) {
                                    var feepayingpins = "";
                                    var Sems = "";
                                    $scope.StudentVerData = $scope.userJsonData.Table;

                                    if ($scope.userJsonData.Table.length > 0 && $scope.Student.id == 2) {
                                        for (var i = 0; i < $scope.userJsonData.Table.length; i++) {
                                            Sems += $scope.userJsonData.Table[i].Semester + ",";
                                        }
                                        Sems = Sems.substring(0, Sems.length - 1);
                                        $scope.Sems = Sems;
                                    }


                                    if ($scope.userJsonData.Table1[0].StudentContact != null && $scope.userJsonData.Table1[0].StudentContact != "") {
                                        $scope.UpdatedContactDetail = $scope.userJsonData.Table1[0].StudentContact;
                                        if ($scope.UpdatedContactDetail.toString().length == 10) {
                                            $scope.isStudentContact = false;
                                            $scope.StundetContactbuttonDesable = true;
                                        }
                                    }
                                    else {
                                        $scope.UpdatedContactDetail = 0
                                    }
                                    if ($scope.userJsonData.Table.length > 0 && $scope.Student.id == 1) {
                                        //feepayingpins = $scope.userJsonData.Table[0].Pin;
                                        for (let i = 0; i < $scope.userJsonData.Table.length; i++) {
                                            feepayingpins += $scope.userJsonData.Table[i].Pin + ",";
                                        }
                                    }
                                    else if ($scope.userJsonData.Table.length > 0 && $scope.Student.id == 2) {
                                        feepayingpins = $scope.userJsonData.Table[0].Pin + ",";
                                    }

                                    feepayingpins = feepayingpins.substring(0, feepayingpins.length - 1);
                                    $scope.feepayingpins = feepayingpins;
                                    if ($scope.userJsonData.Table[0].ResponceCode == '400') {
                                       
                                        alert($scope.userJsonData.Table[0].ResponceDescription)
                                        return;
                                    }
                                    $scope.challan = $scope.userJsonData.Table[0].ChalanaNumber;
                                    $scope.AmountDB = $scope.userJsonData.Table1[0].TotalAmount;
                                    $scope.FinalAmountDB = $scope.userJsonData.Table1[0].TotalAmount;
                                    if ($scope.userJsonData.Table.length > 0) {
                                        $scope.modalInstance = $uibModal.open({
                                            templateUrl: "/app/views/DiplomaFeePaymentPopup.html",
                                            size: 'xlg',
                                            scope: $scope,
                                            windowClass: 'modal-fit-att',
                                            //backdrop: 'static',
                                            //keyboard: false
                                        });
                                    }
                                    else {
                                        $scope.noPaymentelected = false;
                                    }
                                }
                                else if ($scope.userJsonData.Table[0].ResponceCode !== undefined) {
                                    alert($scope.userJsonData.Table[0].Message);
                                }
                            }
                        }
                        else if ($scope.Student.id == 2) {
                            if ($scope.userJsonData.Table[0].ChalanaNumber !== undefined) {
                                var feepayingpins = "";
                                var Sems = "";
                                $scope.StudentVerData = $scope.userJsonData.Table;


                                if ($scope.userJsonData.Table.length > 0 && $scope.Student.id == 2) {
                                    for (var i = 0; i < $scope.userJsonData.Table.length; i++) {
                                        Sems += $scope.userJsonData.Table[i].Semester + ",";
                                    }
                                    Sems = Sems.substring(0, Sems.length - 1);
                                    $scope.Sems = Sems;
                                }


                                if ($scope.userJsonData.Table[0].StudentContact != null && $scope.userJsonData.Table[0].StudentContact != "") {
                                    $scope.UpdatedContactDetail = $scope.userJsonData.Table[0].StudentContact;
                                    if ($scope.UpdatedContactDetail.toString().length == 10) {
                                        $scope.isStudentContact = false;
                                        $scope.StundetContactbuttonDesable = true;
                                    }
                                }
                                else {
                                    $scope.UpdatedContactDetail = 0
                                }
                                if ($scope.userJsonData.Table.length > 0 && $scope.Student.id == 1) {
                                    //feepayingpins = $scope.userJsonData.Table[0].Pin;
                                    for (let i = 0; i < $scope.userJsonData.Table.length; i++) {
                                        feepayingpins += $scope.userJsonData.Table[i].Pin + ",";
                                    }
                                }
                                else if ($scope.userJsonData.Table.length > 0 && $scope.Student.id == 2) {
                                    feepayingpins = $scope.userJsonData.Table[0].Pin + ",";
                                }

                                feepayingpins = feepayingpins.substring(0, feepayingpins.length - 1);
                                $scope.feepayingpins = feepayingpins;
                                if ($scope.userJsonData.Table[0].ResponceCode == '400') {

                                    alert($scope.userJsonData.Table[0].ResponceDescription)
                                    return;
                                }
                                $scope.challan = $scope.userJsonData.Table[0].ChalanaNumber;
                                $scope.AmountDB = $scope.userJsonData.Table1[0].TotalAmount;
                                $scope.FinalAmountDB = $scope.userJsonData.Table1[0].TotalAmount;
                                if ($scope.userJsonData.Table.length > 0) {
                                    $scope.modalInstance = $uibModal.open({
                                        templateUrl: "/app/views/DiplomaFeePaymentPopup.html",
                                        size: 'xlg',
                                        scope: $scope,
                                        windowClass: 'modal-fit-att',
                                    });
                                }
                                else {
                                    $scope.noPaymentelected = false;
                                }
                            }
                            else if ($scope.userJsonData.Table[0].ResponceCode !== undefined) {
                                alert($scope.userJsonData.Table[0].Message);
                            }
                        }
                        else {

                            alert("Some thing Went Wrong");
                        }
                    }, function (err) {
                        $scope.ChallanDisable = false;
                        $scope.loader = false;
                        $scope.isShowResults = false;
                        console.log(err);
                    });
                }
                else if ($scope.Student.id == 999) {
                    var getChallanData = PreExaminationService.getChallanData($scope.Student.id, $scope.Studentpin, $scope.ExamMonthYear);
                    getChallanData.then(function (res) {
                        //   console.log(res)
                        $scope.ChallanDisable = false;
                        $scope.loader = false;
                        if (res.Table[0].ResponceCode == '200') {
                            $scope.StudentVerData = res.Table1
                            $scope.challan = res.Table1[0].ChalanaNumber;
                            $scope.FinalAmountDB = res.Table1[0].Amount;
                            $scope.AmountDB = res.Table1[0].Amount;
                            $scope.DetailsFound = true;
                            $scope.modalInstance = $uibModal.open({
                                templateUrl: "/app/views/PromotionalFeePaymentPopup.html",
                                size: 'xlg',
                                scope: $scope,
                                windowClass: 'modal-fit-att',
                            });
                        } else if (res.Table[0].ResponceCode == '400') {
                            $scope.ChallanDisable = false;
                            $scope.loader = false;
                            alert(res.Table[0].ResponceDescription);
                        }
                        else {
                            $scope.ChallanDisable = false;
                            $scope.loader = false;
                            $scope.DetailsFound = false;
                            //  $scope.DetainedDetailsFoundWithData = res.Table[0].ResponceDescription
                            alert("Error while loading Data");
                        }


                    },
                        function (error) {
                            $scope.ChallanDisable = false;
                            $scope.loader = false;
                            $scope.DetailsFound = false;
                            alert("Error while loading Data");
                            console.log(error);
                        });
                }

            }




            //backdrop: 'static',

            //});
            //else
            //    alert("Select any student to pay");
        }


        $scope.UpdateStudentContact = function (num) {

            if (num.toString().length == 10) {
                var UpdatedNumber = PreExaminationService.UpdateStudentsContact($scope.feepayingpins, num);
                UpdatedNumber.then(function (res) {
                    if (res[0].Response == '200') {
                        alert(res[0].Message);
                        $scope.UpdatedContactDetail = num;
                        $scope.isStudentContact = false;
                    } else {
                        alert(res[0].Message);
                    }

                }, function (err) {
                });
            }
        };


        $scope.StundetContactbuttonDesable = false;

        $scope.changeNumber = function (num) {
            if (num.toString().length == 10) {
                $scope.StundetContactbuttonDesable = true;
                $scope.isStudentContact = true;
            }
            else {
                $scope.StundetContactbuttonDesable = false;
                $scope.isStudentContact = false;
            }
        };

    });
});