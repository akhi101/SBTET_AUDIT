define(['app'], function (app) {
    app.controller("TestingTwshStudentRegController", function ($scope, $crypto, SystemUserService, $state, $localStorage, AppSettings, $uibModal, CbtStudentRegService) {

        $scope.PreviewData = false;
        $scope.EditData = false;
        $scope.ShowSubmitButton = true;
        $scope.isChecked = true;
        $scope.instructions = false;
        $scope.courseDetails = true;
        $scope.ExamAppearDetails = false;
        $scope.oldUser = false;
        $scope.oldUser2 = false;
        $scope.sscForm = false;
        $scope.applicationForm = false;
        $scope.usertype = -1;
        $scope.btndisable = false;
        $scope.otpbtndisable = false;
        $scope.certUpload = false;
        $scope.isqualified1 = false;
        $scope.isqualified2 = false;
        $scope.isqualified3 = false;
        $scope.applicationsuccess = false;
        $scope.ApplicationNo = "";
        $scope.SendOTPButton = true;
        $scope.EnterOTPButton = false;
        $scope.VerifyOTPButton = false;
        $scope.OtpVerified = false;
        $scope.ShowAadhaarDetail = false;
        $scope.verifybtndisable = false;
        $scope.QualifiedExam = false;
        $scope.PreviousExam = false;
        $scope.CheckBox = false;

 

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.SelectedCourse = { CourseID: 1 };
            $scope.LoadLanguage($scope.SelectedCourse);
            $scope.sellanguage = { LanguageId: 1 };
            $scope.LoadGrades($scope.SelectedCourse, $scope.sellanguage);
            $scope.ShowisSSC = false;
            //$scope.ShowReset1Button = false;
        }

        $scope.getTenthYears = function () {
            var tenthyr = CbtStudentRegService.GetTenthYears();
            tenthyr.then(function (response) {
                try {
                    var res = JSON.parse(response)

                }
                catch (err) { }
                if (res.Table.length > 0) {
                    $scope.TenthYearData = res.Table;
                }
                else {
                    $scope.TenthYearData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.Reset1 = function () {
            $scope.ShowSubmitButton = true;
            $scope.ShowReset1Button = false;
            $scope.DisableCourse = false;
            $scope.DisableLanguage = false;
            $scope.DisableGrade = false;
            $scope.DisableQualification = false;
            $scope.DisableSubmit = false;
            $scope.LoadQualificationinfo = [];
            $scope.ExamAppearDetails = false;
            $scope.Selgrade = null;
            $scope.yesBtn = null;
            $scope.noBtn = null;
            $scope.oldUser = false;
            $scope.preHallTicket = '';
            $scope.DisablePreviousButton = false;
            $scope.ShowAadhaarDetail = false;
            $scope.adhaarno = '';
            $scope.DisableAadhar = false;
            $scope.SendOTPButton = true;
            $scope.EnterOTPBox = false;
            $scope.adhaarOtp = '';
            $scope.VerifyOTPButton = false;
            $scope.verifybtndisable = false;
            $scope.OtpVerified = false;
            $scope.ShowisSSC = false;
            $scope.ISSSC = '';
            $scope.SscForm = false;
            $scope.sscHallticket = '';
            $scope.passedoutYear = '';
            $scope.sscType = null;
            $scope.SSCDetails = false;
            $scope.ShowGetSSCButton = false;
            $scope.DisableGetSSCButton = false;
            $scope.applicationForm = false;
            $scope.CandidateName = '';
            $scope.CandidateNamefound = false;
            $scope.FatherName = '';
            $scope.FatherNamefound = false;
            $scope.MotherName = '';
            $scope.MotherNamefound = false;
            $scope.CandidateNameDOB = null;
            $scope.Gender = null;
            $scope.Genderfound = false;
            $scope.District = null;
            $scope.examCenter = null;
            $scope.examCenterList = [];
            $scope.date1 = null;
            $scope.date2 = null;
            $scope.date3 = null;
            $scope.date4 = null;
            $scope.date5 = null;
            $scope.houseNo = '';
            $scope.street = '';
            $scope.village = '';
            $scope.mandal = '';
            $scope.district = '';
            $scope.pincode = '';
            $scope.mobileNO = '';
            $scope.email = '';


        }

        $scope.Reset2 = function () {
            $scope.DisableisSSC = false;
            $scope.SSCDetails = false;
            $scope.ShowReset2Button=false
            $scope.SscForm = true;
            $scope.sscHallticket = '';
            $scope.passedoutYear = '';
            $scope.sscType = null;
            $scope.SSCDetails = false;
            $scope.ShowGetSSCButton = true;
            $scope.DisableGetSSCButton = false;
            $scope.applicationForm = false;
            $scope.CandidateName = '';
            $scope.CandidateNamefound = false;
            $scope.FatherName = '';
            $scope.FatherNamefound = false;
            $scope.MotherName = '';
            $scope.MotherNamefound = false;
            $scope.CandidateNameDOB = null;
            $scope.Gender = null;
            $scope.Genderfound = false;
            $scope.District = null;
            $scope.examCenter = null;
            $scope.examCenterList = [];
            $scope.date1 = null;
            $scope.date2 = null;
            $scope.date3 = null;
            $scope.date4 = null;
            $scope.date5 = null;
            $scope.houseNo = '';
            $scope.street = '';
            $scope.village = '';
            $scope.mandal = '';
            $scope.district = '';
            $scope.pincode = '';
            $scope.mobileNO = '';
            $scope.email = '';


        }

        $scope.Reset3 = function () {

            $scope.oldUser = true;
            $scope.ExamAppearDetails = true;
            $scope.ShowPreviousHallTick = true;
            $scope.DisablePreHallTicket = false;
            $scope.preHallTicket = '';
            $scope.DisablePreviousButton = false;
            $scope.ShowResetButton3 = false;
            $scope.DisableReset3 = false;
            $scope.ShowAadhaarDetail = false;
            $scope.adhaarno = '';
            $scope.DisableAadhar = false;
            $scope.SendOTPButton = true;
            $scope.EnterOTPBox = false;
            $scope.adhaarOtp = '';
            $scope.VerifyOTPButton = false;
            $scope.verifybtndisable = false;
            $scope.OtpVerified = false;
            $scope.ShowisSSC = false;
            $scope.ISSSC = '';
            $scope.SscForm = false;
            $scope.sscHallticket = '';
            $scope.passedoutYear = '';
            $scope.sscType = null;
            $scope.SSCDetails = false;
            $scope.ShowGetSSCButton = false;
            $scope.DisableGetSSCButton = false;
            $scope.applicationForm = false;
            $scope.CandidateName = '';
            $scope.CandidateNamefound = false;
            $scope.FatherName = '';
            $scope.FatherNamefound = false;
            $scope.MotherName = '';
            $scope.MotherNamefound = false;
            $scope.CandidateNameDOB = null;
            $scope.Gender = null;
            $scope.Genderfound = false;
            $scope.District = null;
            $scope.examCenter = null;
            $scope.examCenterList = [];
            $scope.date1 = null;
            $scope.date2 = null;
            $scope.date3 = null;
            $scope.date4 = null;
            $scope.date5 = null;
            $scope.houseNo = '';
            $scope.street = '';
            $scope.village = '';
            $scope.mandal = '';
            $scope.district = '';
            $scope.pincode = '';
            $scope.mobileNO = '';
            $scope.email = '';
        }

        $scope.IsSsc = function (ISSSC) {
            if (ISSSC == 1) {
                $scope.ISSSC = ISSSC;
                $scope.SscForm = true;
                $scope.applicationForm = false;
                $scope.ShowGetSSCButton = true;
                $scope.ShowReset2Button = false;
            }
            else if (ISSSC == 0) {
                $scope.SscForm = false;
                $scope.applicationForm = true;
                $scope.ShowAadhaarDetail = true;
                $scope.ExamAppearDetails = true;
                $scope.ShowisSSC = true;

            }


        }



        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.EKey = res;
            console.log($scope.EKey)
            sessionStorage.Ekey = res;


        });


        $scope.inputType = 'password';
        $scope.eyeIcon = '👁️';


        $scope.toggleAadharVisibility = function () {
            $scope.inputType = ($scope.inputType === 'password') ? 'text' : 'password';
            $scope.eyeIcon = ($scope.inputType === 'password') ? '👁️' : '👀';
        };

        //$scope.LoadOnlineDist = function () {
        //    //--------Online Districts -----------
        //    var GetOnlineExamDist = CbtStudentRegService.GetOnlineExamDist();
        //    GetOnlineExamDist.then(function (res) {
        //        $scope.onlineDistricts = res;
        //        //  $scope.Districts = $scope.onlineDistricts;
        //    }, function (err) {
        //        $scope.onlineDistricts = [];
        //    });
        //}

        if ($localStorage.Twsh != "" && $localStorage.Twsh != undefined && $localStorage.Twsh != null) {

            $scope.usertype = $localStorage.Twsh.UserTypeId;
        }


        //$scope.fillApplication = function () {
        //    $scope.instructions = false;
        //    $scope.courseDetails = true;
        //},
        //    $scope.backtoInstructions = function () {
        //        $scope.courseDetails = false;
        //        $scope.instructions = true;
        //    },

       

      
        $scope.submitCourse = function (courseId, languageId, gradeId) {
            //$scope.tmpmode = '';
            $scope.ShowSubmitButton = false;
            $scope.ShowReset1Button = true;

            $scope.DisableCourse = true;
            $scope.DisableLanguage = true;
            $scope.DisableGrade = true;
            $scope.DisableQualification = true;
            $scope.DisableSubmit = true;

            if ($scope.courseinfo && $scope.languageinfo && $scope.LoadGradeinfo && courseId.Id && languageId.Id && gradeId.Id) {
                let coursestatus = $scope.courseinfo.find(s => s.Id == courseId.Id);
                let langstatus = $scope.languageinfo.find(s => s.Id == languageId.Id);
                let Gradestatus = $scope.LoadGradeinfo.find(s => s.Id == gradeId.Id);
                if (coursestatus && langstatus && Gradestatus) {

                    $scope.selectedcourse = coursestatus;
                    $scope.selectedlanguage = langstatus;
                    $scope.selectedgrade = Gradestatus;
                    $scope.TwshCourse = $scope.selectedcourse.CourseName;
                    $scope.TwshLanguage = $scope.selectedlanguage.LanguageName;
                    $scope.TwshGrade = $scope.selectedgrade.GradeName;

                } else {
                    $scope.selectedcourse = "";
                    $scope.selectedlanguage = "";
                    $scope.selectedgrade = "";
                    $scope.TwshCourse = "";
                    $scope.TwshLanguage = "";
                    $scope.TwshGrade = "";
                }
            }

            $scope.loader1 = true
            $scope.submitbutton1 = true


            $scope.ExamAppearDetails = true;
            $scope.Districts = [];
            var ExamDistricts = CbtStudentRegService.getExaminationDistricts($scope.CourseID, -1, $scope.GradeID);
            ExamDistricts.then(function (res) {
                $scope.offlineDistricts = res;

                $scope.loader1 = false
                $scope.submitbutton1 = false
            }, function (err) {
                $scope.offlineDistricts = [];
            });
           
        }

        

        


        $scope.clickRadio = function (twsh) {
            if (twsh === 'Yes') {
                $scope.AppearLastSession = 1;

                $scope.DisablePreHallTicket = false;
                $scope.ShowResetButton3 = false;
                $scope.oldUser = true;
                $scope.ExamAppearDetails = true;
                $scope.ShowPreviousHallTick = true;
                $scope.preHallTicket = '';
                $scope.DisablePreviousButton = false;
                $scope.ShowAadhaarDetail = false;
                $scope.adhaarno = '';
                $scope.DisableAadhar = false;
                $scope.SendOTPButton = true;
                $scope.EnterOTPBox = false;
                $scope.adhaarOtp = '';
                $scope.VerifyOTPButton = false;
                $scope.verifybtndisable = false;
                $scope.OtpVerified = false;
                $scope.ShowisSSC = false;
                $scope.ISSSC = '';
                $scope.SscForm = false;
                $scope.sscHallticket = '';
                $scope.passedoutYear = '';
                $scope.sscType = null;
                $scope.SSCDetails = false;
                $scope.ShowGetSSCButton = false;
                $scope.DisableGetSSCButton = false;
                $scope.applicationForm = false;
                $scope.CandidateName = '';
                $scope.CandidateNamefound = false;
                $scope.FatherName = '';
                $scope.FatherNamefound = false;
                $scope.MotherName = '';
                $scope.MotherNamefound = false;
                $scope.CandidateNameDOB = null;
                $scope.Gender = null;
                $scope.Genderfound = false;
                $scope.District = null;
                $scope.examCenter = null;
                $scope.examCenterList = [];
                $scope.date1 = null;
                $scope.date2 = null;
                $scope.date3 = null;
                $scope.date4 = null;
                $scope.date5 = null;
                $scope.houseNo = '';
                $scope.street = '';
                $scope.village = '';
                $scope.mandal = '';
                $scope.district = '';
                $scope.pincode = '';
                $scope.mobileNO = '';
                $scope.email = '';
            }
            else if (twsh === 'No') {
                $scope.AppearLastSession = 0;

                $scope.oldUser = false;
                $scope.SscForm = false;
                $scope.ExamAppearDetails = true;
                $scope.preHallTicket = '';
                $scope.ShowPreviousHallTick = false;
                $scope.ShowAadhaarDetail = true;
                $scope.adhaarno = '';
                $scope.DisableAadhar = false;
                $scope.SendOTPButton = true;
                $scope.EnterOTPBox = false;
                $scope.adhaarOtp = '';
                $scope.VerifyOTPButton = false;
                $scope.verifybtndisable = false;
                $scope.OtpVerified = false;

                $scope.applicationForm = false;
                $scope.CandidateName = '';
                $scope.CandidateNamefound = false;
                $scope.FatherName = '';
                $scope.FatherNamefound = false;
                $scope.MotherName = '';
                $scope.MotherNamefound = false;
                $scope.CandidateNameDOB = null;
                $scope.Gender = null;
                $scope.Genderfound = false;
                $scope.District = null;
                $scope.examCenter = null;
                $scope.examCenterList = [];
                $scope.date1 = null;
                $scope.date2 = null;
                $scope.date3 = null;
                $scope.date4 = null;
                $scope.date5 = null;
                $scope.houseNo = '';
                $scope.street = '';
                $scope.village = '';
                $scope.mandal = '';
                $scope.district = '';
                $scope.pincode = '';
                $scope.mobileNO = '';
                $scope.email = '';




            }


        }

        $scope.SendOtp = function (aadhaar) {
            if ($scope.adhaarno == '' || $scope.adhaarno == null) {
                alert("Aadhaar number Can't be Empty");
                return;
            }

            if ($scope.adhaarno.length != 12) {
                alert("Invalid Aadhaar number");
                return;
            }
            $scope.otpbtndisable = true;
            $scope.EnterOTPBox = true;
            $scope.SendOTPButton = false;
            $scope.VerifyOTPButton = true;
            var aadhaarenc = btoa(aadhaar);
            var sendotp = CbtStudentRegService.SendAadhaarOtp(aadhaarenc);
            sendotp.then(function (res) {
                try { var res = JSON.parse(res) } catch (err) { }

                if (res.ret == "y" || res.ret == "Y") {
                    $scope.otpbtndisable = false;
                    var resp = atob(res.responseXML);
                    $scope.EnterOTPBox = true;
                    $scope.SendOTPButton = false;
                    $scope.VerifyOTPButton = true;
                    $scope.Txnid = res.txn;
                    //    alert("OTP sent to Aadhaar registered mobile number")

                } else {
                    $scope.otpbtndisable = false;
                   // $scope.otpsent = true;
                    alert(res.errdesc)
                }
            }, function (err) {
                $scope.otpbtndisable = false;
                console.log(res);
            })
        }


       

        //$scope.VerifyOtp = function (aadhaar, aadharotp) {
     
        //    if (aadharotp == '' || aadharotp == null) {
        //        alert("OTP Can't be Empty");
        //        return;
        //    }
        //    $scope.verifybtndisable = true;
        //    if ($scope.Txnid != "" && $scope.Txnid != undefined && $scope.Txnid != null) {
        //        var aadhaarenc = btoa(aadhaar);
        //        var VerifyOtp = CbtStudentRegService.VerifyAadhaarOtp(aadhaarenc, aadharotp, $scope.Txnid);
        //        VerifyOtp.then(function (res) {
        //            if (res == true) {
        //                $scope.adhaarOtp = '';

        //                alert("Verfication success.");
        //                $scope.verifybtndisable = false;

                       
        //                $scope.DisableAadhar = true;
        //                $scope.verifybtndisable = false;
        //                $scope.OtpVerified = true;
        //                $scope.EnterOTPBox = false;
        //                $scope.VerifyOTPButton = false;
        //                $scope.OtpVerified = true;
        //                $scope.ShowisSSC = true;  
                        
        //            } else {
        //                alert('OTP MISMATCHED or NOT SENT')
        //                $scope.ShowAadhaarDetail = true;
        //                $scope.ExamAppearDetails = true;
        //                $scope.SscForm = false;
        //                $scope.ShowisSSC = true;
        //                $scope.applicationForm = false;
        //            }


        //        }, function (err) {
        //            $scope.verifybtndisable = false;
        //            console.log(res);
        //        });
        //    }
        //}


        $scope.VerifyOtp = function (aadhaar, adhaarOtp) {
            if (adhaarOtp == '123456') {
                alert("Verfication success.");
                $scope.DisableAadhar = true;
                $scope.verifybtndisable = false;
                $scope.OtpVerified = true;
                $scope.EnterOTPBox = false;
                $scope.VerifyOTPButton = false;
                $scope.OtpVerified = true;
                $scope.ShowisSSC = true;  
            }
            else {
                alert('OTP MISMATCHED or NOT SENT')
                $scope.ShowAadhaarDetail = true;
                $scope.ExamAppearDetails = true;
                $scope.SscForm = false;
                $scope.ShowisSSC = true;
                $scope.applicationForm = false;
            }
        }

        $scope.Continue = function () {
            if ($scope.adhaarno == '' || $scope.adhaarno == null) {
                alert("Aadhaar number Can't be Empty");
                return;
            }

            if ($scope.adhaarno.length != 12) {
                alert("Invalid Aadhaar number");
                return;
            }


            if ($scope.selectedgrade.CriteriaTypeId == 1) {
                $scope.ExamAppearDetails = false;
                $scope.oldUser = false;
                $scope.oldUser2 = false;
                $scope.sscForm = true;
                $scope.ShowAadhaarDetail = false;
                $scope.applicationForm = false;
            } else if ($scope.selectedgrade.CriteriaTypeId == 4 && ($scope.selectedgrade.QualificationGradeId == undefined || $scope.selectedgrade.QualificationGradeId == null)) {
                $scope.ExamAppearDetails = false;
                $scope.oldUser = false;
                $scope.oldUser2 = false;
                $scope.sscForm = false;
                $scope.ShowAadhaarDetail = false;
                $scope.applicationForm = true;
                $scope.isqualified1 = false;
                $scope.isqualified2 = false;
                $scope.isqualified3 = false;
            } else {
                $scope.ShowAadhaarDetail = false;
                $scope.ExamAppearDetails = false;
                $scope.oldUser = false;
                $scope.oldUser2 = false;
                $scope.sscForm = false;
                $scope.applicationForm = true;
                if ($scope.PreviousExam == true || $scope.QualifiedExam == true) {
                    $scope.isqualified1 = false;

                } else {
                    $scope.isqualified1 = true;

                }
                $scope.isqualified2 = false;
                if ($scope.QualifiedExam == true) {
                    $scope.isqualified3 = false;

                } else {
                    $scope.isqualified3 = true;

                }

            }

        }


        $scope.Aadhaarback = function () {
            $scope.ShowAadhaarDetail = false;
            $scope.ExamAppearDetails = true;
            $scope.oldUser = false;
            $scope.oldUser2 = false;
            $scope.sscForm = false;
            $scope.applicationForm = false;
            $scope.isqualified1 = false;
            $scope.isqualified2 = false;
            $scope.isqualified3 = false;
        }


        $scope.ShowApplication = function () {
            $scope.sscForm = false;
            $scope.applicationForm = true;
            $scope.isqualified1 = true;
            $scope.isqualified2 = false;
            $scope.isqualified3 = false;

        }
        $scope.ShowLowerApplication = function () {
            $scope.oldUser2 = false;
            $scope.ShowAadhaarDetail = true;
            $scope.applicationForm = false;
            $scope.isqualified1 = true;
            // $scope.isqualified2 = true;
            $scope.isqualified3 = true;

        }

        $scope.getBatches = function (ExamDateselect) {
            $scope.exambatchList = [];
            $scope.ExamDateselected = JSON.parse(ExamDateselect);
            var getBatches = CbtStudentRegService.getBatches($scope.ExamDateselected.Id, $scope.selectedcourse.Id, $scope.selectedgrade.Id);
            getBatches.then(function (res) {
                $scope.exambatchList = res;
            }, function (err) {
                $scope.exambatchList = [];
            })
        }

        $scope.checkDate = function (CandidateNameDOB) {
            var currentDate = new Date();
            var birthdate = new Date(CandidateNameDOB);
            if (birthdate > currentDate) {
                alert('Selected Date Should not be Future!')
                $scope.CandidateNameDOB = '';
                return;
            } else {
                $scope.CandidateNameDOB = CandidateNameDOB;
            }
        }


        $scope.getData = function () {
            var getappnumber = CbtStudentRegService.GetApplicationNumber();
            getappnumber.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.ApplicationData = res[0];
                    $scope.ApplicationNumber = $scope.ApplicationData.ApplicationNumber;
                    $scope.SaveData();
                }
                else {
                    $scope.ApplicationData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }
        
 
        $scope.SaveData = function () {
           

            $scope.maskedAadhaar = $scope.adhaarno.slice(0, 8).replace(/[0-9]/g, "X") + $scope.adhaarno.slice(-4);

            if (($scope.CandidateName == undefined || $scope.CandidateName == "" || $scope.CandidateName == null)) {
                alert("Please Enter Student Name .");
                return;
            }
            if (($scope.FatherName == undefined || $scope.FatherName == "" || $scope.FatherName == null)) {
                alert("Please Enter Father Name .");
                return;
            }
            if (($scope.MotherName == undefined || $scope.MotherName == "" || $scope.MotherName == null)) {
                alert("Please Enter Mother Name .");
                return;
            }
            if (($scope.CandidateNameDOB == undefined || $scope.CandidateNameDOB == "" || $scope.CandidateNameDOB == null)) {
                alert("Please Select Date Of Birth .");
                return;
            }
            if (($scope.Gender == undefined || $scope.Gender == "" || $scope.Gender == null)) {
                alert("Please Choose Gender.");
                return;
            }

            if (($scope.PhotoPath == undefined || $scope.PhotoPath == "" || $scope.PhotoPath == null)) {
                alert("Please Upload Photo.");
                return;
            }



            if (($scope.District == undefined || $scope.District == "" || $scope.District == null)) {
                alert("Please Enter District .");
                return;
            }

            if (($scope.examCenter == undefined || $scope.examCenter == "" || $scope.examCenter == null)) {
                alert("Please Enter Center .");
                return;
            }



            


            if (($scope.houseNo == undefined || $scope.houseNo == "" || $scope.houseNo == null)) {
                alert("Please Enter houseNo .");
                return;
            }


            if (($scope.street == undefined || $scope.street == "" || $scope.street == null)) {
                alert("Please Enter street .");
                return;
            }

            if (($scope.village == undefined || $scope.village == "" || $scope.village == null)) {
                alert("Please Enter village .");
                return;
            }

            //if (($scope.mandal == undefined || $scope.mandal == "" || $scope.mandal == null)) {
            //    alert("Please Enter mandal .");
            //    return;
            //}

            if (($scope.district == undefined || $scope.district == "" || $scope.district == null)) {
                alert("Please Enter district .");
                return;
            }


            if (($scope.pincode == undefined || $scope.pincode == "" || $scope.pincode == null)) {
                alert("Please Enter pincode .");
                return;
            }

            if (($scope.mobileNO == undefined || $scope.mobileNO == "" || $scope.mobileNO == null)) {
                alert("Please Enter mobileNO .");
                return;
            }



            var reg = "[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}";
            if ($scope.CandidateNameDOB != null && $scope.CandidateNameDOB !== undefined) {
                var datechange = moment($scope.CandidateNameDOB).format("DD/MM/YYYY HH:mm:ss");
                var d = datechange.slice(0, 10).split('/');
                if (d[2].length === 4) {
                    $scope.CandidateNameDOBchange = d[0] + "/" + d[1] + "/" + d[2];
                }
            }

            var selectedDist = JSON.parse($scope.District);
            $scope.examCenterDistrict = selectedDist.DistrictName;
            $scope.selectedexamCenter = JSON.parse($scope.examCenter);
            $scope.examCenterSel = $scope.selectedexamCenter.ExaminationCenterName;


                $scope.finalArray = arr.map(function (obj) {
                    return obj.date;
                });
                $scope.finalArray.forEach(function (dat) {
                    if (!$scope.availableDates.includes(dat)) {
                        alert("Examimation dates chosen was not valied,Please choose available dates displayed in the calender.");
                        return;
                    }
                });
                $scope.ExamDateSel = JSON.stringify($scope.finalArray).replace("/", "-");;
            
            
            var EncriptedAadhar = $crypto.encrypt($crypto.encrypt($scope.adhaarno, 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
            var req = {
                "ApplicationNumber": $scope.ApplicationNumber == null || $scope.ApplicationNumber == undefined ? "" : $scope.ApplicationNumber,
                "CourseID": $scope.CourseID == null || $scope.CourseID == undefined ? "" : $scope.CourseID,
                "LanguageID": $scope.LanguageID == null || $scope.LanguageID == undefined ? "" : $scope.LanguageID,
                "GradeID": $scope.GradeID == null || $scope.GradeID == undefined ? "" : $scope.GradeID,
                "QualificationID": $scope.QualificationID == null || $scope.QualificationID == undefined ? "" : $scope.QualificationID,
                "AppearLastSession": $scope.AppearLastSession == null || $scope.AppearLastSession == undefined ? "" : $scope.AppearLastSession,
                "LastSessionHallticket": $scope.preHallTicket == null || $scope.preHallTicket == undefined ? "" : $scope.preHallTicket,
                "AadhaarNumber": $scope.adhaarno == null || $scope.adhaarno == undefined ? "" : EncriptedAadhar,
                "SSCAppeared": $scope.ISSSC == null || $scope.ISSSC == undefined ? "" : $scope.ISSSC,
                "SSCHallticketNo": $scope.sscHallticket == null || $scope.sscHallticket == undefined ? "" : $scope.sscHallticket,
                "SSCPassedYear": $scope.passedoutYear == null || $scope.passedoutYear == undefined ? null : $scope.passedoutYear,
                "SSCPassedType": $scope.sscType == null || $scope.sscType == undefined ? "" : $scope.sscType,
                "SSCVerified": $scope.SSCVerified == null || $scope.SSCVerified == undefined ? "" : $scope.SSCVerified,
                "CandidateName": $scope.CandidateName == null || $scope.CandidateName == undefined ? "" : $scope.CandidateName,
                "FatherName": $scope.FatherName == null || $scope.FatherName == undefined ? "" : $scope.FatherName,
                "MotherName": $scope.MotherName == null || $scope.MotherName == undefined ? "" : $scope.MotherName,
                "DateOfBirth": $scope.CandidateNameDOBchange == null || $scope.CandidateNameDOBchange == undefined ? "" : $scope.CandidateNameDOBchange,
                "Gender": $scope.Gender == null || $scope.Gender == undefined ? "" : $scope.Gender,
                "ExamDistrictID": $scope.SelectedDistrictId == null || $scope.SelectedDistrictId == undefined ? "" : $scope.SelectedDistrictId,
                "ExamCenterID": $scope.SelectedExamCentreID == null || $scope.SelectedExamCentreID == undefined ? "" : $scope.SelectedExamCentreID,
                "ExamDateOption1": $scope.date1 == null || $scope.date1 == undefined ? "" : $scope.date1,
                "ExamDateOption2": $scope.date2 == null || $scope.date2 == undefined ? "" : $scope.date2,
                "ExamDateOption3": $scope.date3 == null || $scope.date3 == undefined ? "" : $scope.date3,
                "ExamDateOption4": $scope.date4 == null || $scope.date4 == undefined ? "" : $scope.date4,
                "ExamDateOption5": $scope.date5 == null || $scope.date5 == undefined ? "" : $scope.date5,
                "SelectedExamDate": $scope.SelectedExamDate == null || $scope.SelectedExamDate == undefined ? null : null,
                "HouseNumber": $scope.houseNo == null || $scope.houseNo == undefined ? "" : $scope.houseNo,
                "Street": $scope.street == null || $scope.street == undefined ? "" : $scope.street,
                "VillageTown": $scope.village == null || $scope.village == undefined ? "" : $scope.village,
                "Mandal": $scope.mandal == null || $scope.mandal == undefined ? "" : $scope.mandal,
                "District": $scope.district == null || $scope.district == undefined ? "" : $scope.district,
                "Pincode": $scope.pincode == null || $scope.pincode == undefined ? "" : $scope.pincode,
                "CandidateMobile": $scope.mobileNO == null || $scope.mobileNO == undefined ? "" : $scope.mobileNO,
                "CandidateEmail": $scope.email == null || $scope.email == undefined ? "" : $scope.email,
                "PhotoPath": ($scope.PhotoPathConvert == undefined || $scope.PhotoPathConvert == null) ? null : $scope.PhotoPathConvert,
                "Qualification1": ($scope.Qualification1Convert == undefined || $scope.Qualification1Convert == null) ? null : $scope.Qualification1Convert,
                "Qualification2": ($scope.Qualification2Convert == undefined || $scope.Qualification2Convert == null) ? null : $scope.Qualification2Convert,
                "ApplicationStatus": $scope.ApplicationStatus == null || $scope.ApplicationStatus == undefined ? 0 : $scope.ApplicationStatus,
                "HallTicketNumber": $scope.HallTicketNumber == null || $scope.HallTicketNumber == undefined ? null : $scope.HallTicketNumber,
                "Submitted": $scope.Submitted == null || $scope.Submitted == undefined ? 0 : $scope.Submitted
            }
            $scope.btndisable = true;
            var regstudent = CbtStudentRegService.AddCandidateDetails(req);
            regstudent.then(function (response) {
                var res = JSON.parse(response);
                if (res[0].ResponseCode == "200") {
                    alert(res[0].ResponseDescription);
                    //$scope.LoadImg = true;
                    //$scope.ShowCandidateDetails = false;
                    $scope.ApplicationNumber = res[0].ApplicationNumber;
                    $scope.CandidateID = res[0].CandidateID;
                    $scope.ApplicationStatus = res[0].ApplicationStatus;
                    $scope.ViewCandidateDetails();
                    //$localStorage.TempData1 = {
                    //    ApplicationNumber: $scope.ApplicationNumber,
                    //    CandidateID: $scope.CandidateID,
                    //    ApplicationStatus: $scope.ApplicationStatus

                    //};
                    //$state.go('index.ViewCandidateDetails');
                    //$scope.LoadImg = false;
                   

                } else if (res[0].ResponseCode == "400") {
                    alert(res[0].ResponseDescription);
                    $state.go('index.ViewCandidateDetails');

                }
            }, function (err) {
                $scope.btndisable = false;
            });
        }






        $scope.UpdateData = function () {


            $scope.maskedAadhaar = $scope.adhaarno.slice(0, 8).replace(/[0-9]/g, "X") + $scope.adhaarno.slice(-4);

            if (($scope.EditCandidateName == undefined || $scope.EditCandidateName == "" || $scope.EditCandidateName == null)) {
                alert("Please Enter Student Name .");
                return;
            }
            if (($scope.EditFatherName == undefined || $scope.EditFatherName == "" || $scope.EditFatherName == null)) {
                alert("Please Enter Father Name .");
                return;
            }
            if (($scope.EditMotherName == undefined || $scope.EditMotherName == "" || $scope.EditMotherName == null)) {
                alert("Please Enter Mother Name .");
                return;
            }
            if (($scope.EditCandidateNameDOB == undefined || $scope.EditCandidateNameDOB == "" || $scope.EditCandidateNameDOB == null)) {
                alert("Please Select Date Of Birth .");
                return;
            }
            if (($scope.EditGender == undefined || $scope.EditGender == "" || $scope.EditGender == null)) {
                alert("Please Choose Gender.");
                return;
            }

            if (($scope.EditPhotoPath == undefined || $scope.EditPhotoPath == "" || $scope.EditPhotoPath == null)) {
                alert("Please Upload Photo.");
                return;
            }



            if (($scope.EditDistrict == undefined || $scope.EditDistrict == "" || $scope.EditDistrict == null)) {
                alert("Please Select District .");
                return;
            }

            if (($scope.EditexamCenter == undefined || $scope.EditexamCenter == "" || $scope.EditexamCenter == null)) {
                alert("Please Select Center .");
                return;
            }






            if (($scope.EditHnoStreet == undefined || $scope.EditHnoStreet == "" || $scope.EditHnoStreet == null)) {
                alert("Please Enter houseNo .");
                return;
            }


            if (($scope.EditStreet == undefined || $scope.EditStreet == "" || $scope.EditStreet == null)) {
                alert("Please Enter street .");
                return;
            }

            if (($scope.EditVillageTown == undefined || $scope.EditVillageTown == "" || $scope.EditVillageTown == null)) {
                alert("Please Enter village .");
                return;
            }

            //if (($scope.mandal == undefined || $scope.mandal == "" || $scope.mandal == null)) {
            //    alert("Please Enter mandal .");
            //    return;
            //}

            if (($scope.EditDistrict == undefined || $scope.EditDistrict == "" || $scope.EditDistrict == null)) {
                alert("Please Enter district .");
                return;
            }


            if (($scope.EditPincode == undefined || $scope.EditPincode == "" || $scope.EditPincode == null)) {
                alert("Please Enter pincode .");
                return;
            }

            if (($scope.EditMobileNumber == undefined || $scope.EditMobileNumber == "" || $scope.EditMobileNumber == null)) {
                alert("Please Enter mobileNO .");
                return;
            }



            var reg = "[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}";
            if ($scope.EditCandidateNameDOB != null && $scope.EditCandidateNameDOB !== undefined) {
                var datechange = moment($scope.EditCandidateNameDOB).format("DD/MM/YYYY HH:mm:ss");
                var d = datechange.slice(0, 10).split('/');
                if (d[2].length === 4) {
                    $scope.EditCandidateNameDOBchange = d[0] + "/" + d[1] + "/" + d[2];
                }
            }

            //var selectedDist = JSON.parse($scope.District);
            //$scope.examCenterDistrict = selectedDist.DistrictName;
            //$scope.selectedexamCenter = JSON.parse($scope.examCenter);
            //$scope.examCenterSel = $scope.selectedexamCenter.ExaminationCenterName;


            $scope.finalArray = arr.map(function (obj) {
                return obj.date;
            });
            $scope.finalArray.forEach(function (dat) {
                if (!$scope.availableDates.includes(dat)) {
                    alert("Examimation dates chosen was not valied,Please choose available dates displayed in the calender.");
                    return;
                }
            });
            //$scope.ExamDateSel = JSON.stringify($scope.finalArray).replace("/", "-");;


            var EncriptedAadhar = $crypto.encrypt($crypto.encrypt($scope.adhaarno, 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
            var req = {
                "ApplicationNumber": $scope.ApplicationNumber == null || $scope.ApplicationNumber == undefined ? "" : $scope.ApplicationNumber,
                "CourseID": $scope.CourseID == null || $scope.CourseID == undefined ? "" : $scope.CourseID,
                "LanguageID": $scope.LanguageID == null || $scope.LanguageID == undefined ? "" : $scope.LanguageID,
                "GradeID": $scope.GradeID == null || $scope.GradeID == undefined ? "" : $scope.GradeID,
                "QualificationID": $scope.QualificationID == null || $scope.QualificationID == undefined ? "" : $scope.QualificationID,
                "AppearLastSession": $scope.AppearLastSession == null || $scope.AppearLastSession == undefined ? "" : $scope.AppearLastSession,
                "LastSessionHallticket": $scope.preHallTicket == null || $scope.preHallTicket == undefined ? "" : $scope.preHallTicket,
                "AadhaarNumber": $scope.adhaarno == null || $scope.adhaarno == undefined ? "" : EncriptedAadhar,
                "SSCAppeared": $scope.ISSSC == null || $scope.ISSSC == undefined ? "" : $scope.ISSSC,
                "SSCHallticketNo": $scope.sscHallticket == null || $scope.sscHallticket == undefined ? "" : $scope.sscHallticket,
                "SSCPassedYear": $scope.passedoutYear == null || $scope.passedoutYear == undefined ? null : $scope.passedoutYear,
                "SSCPassedType": $scope.sscType == null || $scope.sscType == undefined ? "" : $scope.sscType,
                "SSCVerified": $scope.SSCVerified == null || $scope.SSCVerified == undefined ? "" : $scope.SSCVerified,
                "CandidateName": $scope.EditCandidateName == null || $scope.EditCandidateName == undefined ? "" : $scope.EditCandidateName,
                "FatherName": $scope.EditFatherName == null || $scope.EditFatherName == undefined ? "" : $scope.EditFatherName,
                "MotherName": $scope.EditMotherName == null || $scope.EditMotherName == undefined ? "" : $scope.EditMotherName,
                "DateOfBirth": $scope.EditCandidateNameDOBchange == null || $scope.EditCandidateNameDOBchange == undefined ? "" : $scope.EditCandidateNameDOBchange,
                "Gender": $scope.EditGender == null || $scope.EditGender == undefined ? "" : $scope.EditGender,
                "ExamDistrictID": $scope.SelectedDistrictId == null || $scope.SelectedDistrictId == undefined ? "" : $scope.SelectedDistrictId,
                "ExamCenterID": $scope.SelectedExamCentreID == null || $scope.SelectedExamCentreID == undefined ? "" : $scope.SelectedExamCentreID,
                "ExamDateOption1": $scope.Editdate1 == null || $scope.Editdate1 == undefined ? "" : $scope.Editdate1,
                "ExamDateOption2": $scope.Editdate2 == null || $scope.Editdate2 == undefined ? "" : $scope.Editdate2,
                "ExamDateOption3": $scope.Editdate3 == null || $scope.Editdate3 == undefined ? "" : $scope.Editdate3,
                "ExamDateOption4": $scope.Editdate4 == null || $scope.Editdate4 == undefined ? "" : $scope.Editdate4,
                "ExamDateOption5": $scope.Editdate5 == null || $scope.Editdate5 == undefined ? "" : $scope.Editdate5,
                "SelectedExamDate": $scope.SelectedExamDate == null || $scope.SelectedExamDate == undefined ? null : null,
                "HouseNumber": $scope.EditHnoStreet == null || $scope.EditHnoStreet == undefined ? "" : $scope.EditHnoStreet,
                "Street": $scope.EditStreet == null || $scope.EditStreet == undefined ? "" : $scope.EditStreet,
                "VillageTown": $scope.EditVillageTown == null || $scope.EditVillageTown == undefined ? "" : $scope.EditVillageTown,
                "Mandal": $scope.EditMandal == null || $scope.EditMandal == undefined ? "" : $scope.EditMandal,
                "District": $scope.EditDistrict == null || $scope.EditDistrict == undefined ? "" : $scope.EditDistrict,
                "Pincode": $scope.EditPincode == null || $scope.EditPincode == undefined ? "" : $scope.EditPincode,
                "CandidateMobile": $scope.EditMobileNumber == null || $scope.EditMobileNumber == undefined ? "" : $scope.EditMobileNumber,
                "CandidateEmail": $scope.EditEmailID == null || $scope.EditEmailID == undefined ? "" : $scope.EditEmailID,
                "EditPhotoPath": ($scope.NewEditPhotoPathConvert == undefined || $scope.NewEditPhotoPathConvert == null) ? null : $scope.NewEditPhotoPathConvert,
                "EditQualification1": ($scope.NewEditQualification1Convert == undefined || $scope.NewEditQualification1Convert == null) ? null : $scope.NewEditQualification1Convert,
                "EditQualification2": ($scope.NewEditQualification2Convert == undefined || $scope.NewEditQualification2Convert == null) ? null : $scope.NewEditQualification2Convert,
                "ApplicationStatus": $scope.ApplicationStatus == null || $scope.ApplicationStatus == undefined ? 0 : $scope.ApplicationStatus,
                "HallTicketNumber": $scope.HallTicketNumber == null || $scope.HallTicketNumber == undefined ? null : $scope.HallTicketNumber,
                "Submitted": $scope.Submitted == null || $scope.Submitted == undefined ? 0 : $scope.Submitted
            }
            $scope.btndisable = true;
            var regstudent = CbtStudentRegService.UpdateCandidateDetails(req);
            regstudent.then(function (response) {
                var res = JSON.parse(response);
                if (res[0].ResponseCode == "200") {
                    alert(res[0].ResponseDescription);
                    //$scope.LoadImg = true;
                    //$scope.ShowCandidateDetails = false;
                    $scope.ApplicationNumber = res[0].ApplicationNumber;
                    $scope.CandidateID = res[0].CandidateID;
                    $scope.ApplicationStatus = res[0].ApplicationStatus;
                    $scope.ViewCandidateDetails();
                    //$localStorage.TempData1 = {
                    //    ApplicationNumber: $scope.ApplicationNumber,
                    //    CandidateID: $scope.CandidateID,
                    //    ApplicationStatus: $scope.ApplicationStatus

                    //};
                    //$state.go('index.ViewCandidateDetails');
                    //$scope.LoadImg = false;


                } else if (res[0].ResponseCode == "400") {
                    alert(res[0].ResponseDescription);
                    $state.go('index.ViewCandidateDetails');

                }
            }, function (err) {
                $scope.btndisable = false;
            });
        }



        $scope.ViewCandidateDetails = function () {
            var ViewCandidateDetail = CbtStudentRegService.GetViewCandidateDetails($scope.ApplicationNumber, $scope.CandidateID, $scope.ApplicationStatus);
            ViewCandidateDetail.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                $scope.PreviewData = [];
                if (res.length >= 0) {
                    $scope.loading = false;
                    $scope.PreviewData = res[0].Data;
                    $scope.PreviewData1 = JSON.parse($scope.PreviewData)
                    $scope.PreviewData = $scope.PreviewData1.Table[0];
                    $scope.ApplicationNumber = $scope.PreviewData1.Table[0].ApplicationNumber;
                    $scope.CourseName = $scope.PreviewData1.Table[0].CourseName;
                    $scope.LanguageName = $scope.PreviewData1.Table[0].LanguageName;
                    $scope.GradeName = $scope.PreviewData1.Table[0].GradeName;
                    $scope.QualificationDescription = $scope.PreviewData1.Table[0].QualificationDescription;
                    $scope.SSCHallticketNo = $scope.PreviewData1.Table[0].SSCHallticketNo;
                    $scope.SSCYear = $scope.PreviewData1.Table[0].SSCYear;
                    $scope.SSCPassType = $scope.PreviewData1.Table[0].SSCPassType;
                    $scope.PhotoPath = $scope.PreviewData1.Table[0].PhotoPath;
                    $scope.CandidateName = $scope.PreviewData1.Table[0].CandidateName;
                    $scope.FatherName = $scope.PreviewData1.Table[0].FatherName;
                    $scope.MotherName = $scope.PreviewData1.Table[0].MotherName;
                    $scope.DateOfBirth = $scope.PreviewData1.Table[0].DateOfBirth;
                    $scope.Gender = $scope.PreviewData1.Table[0].Gender;
                    $scope.HnoStreet = $scope.PreviewData1.Table[0].HnoStreet;
                    $scope.Street = $scope.PreviewData1.Table[0].Street;
                    $scope.VillageTown = $scope.PreviewData1.Table[0].VillageTown;
                    $scope.Pincode = $scope.PreviewData1.Table[0].Pincode;
                    $scope.District = $scope.PreviewData1.Table[0].District;
                    $scope.MobileNumber = $scope.PreviewData1.Table[0].MobileNumber;
                    $scope.EmailID = $scope.PreviewData1.Table[0].EmailID;
                    $scope.ExamDistrict = $scope.PreviewData1.Table[0].DistrictName;
                    $scope.ExamCentre = $scope.PreviewData1.Table[0].ExaminationCenterName;
                    $scope.ExamDateOption1 = $scope.PreviewData1.Table[0].ExamDateOption1;
                    $scope.ExamDateOption2 = $scope.PreviewData1.Table[0].ExamDateOption2;
                    $scope.ExamDateOption3 = $scope.PreviewData1.Table[0].ExamDateOption3;
                    $scope.ExamDateOption4 = $scope.PreviewData1.Table[0].ExamDateOption4;
                    $scope.ExamDateOption5 = $scope.PreviewData1.Table[0].ExamDateOption5;
                    $scope.Remarks = $scope.PreviewData1.Table[0].Remarks;
                    $scope.imagesrc = $scope.PreviewData.PhotoPath;
                    $scope.imagesrc1 = $scope.PreviewData.Qualification1;
                    $scope.imagesrc2 = $scope.PreviewData.Qualification2;
                    $scope.Aadhaar = JSON.parse(res[0].Aadhar);
                    $scope.maskedAadhaar = $scope.Aadhaar.slice(0, 8).replace(/[0-9]/g, "X") + $scope.Aadhaar.slice(-4);
                    $scope.courseDetails = false;
                    $scope.ExamAppearDetails = false;
                    $scope.ShowAadhaarDetail = false;
                    $scope.SscForm = false;
                    $scope.applicationForm = false;
                    $scope.EditapplicationForm = false;
                    $scope.PreviewData = true;

                    //$scope.$emit('hideLoading', data);

                } else {
                    $scope.loading = false;
                    $scope.PreviewData = [];
                    //$scope.$emit('hideLoading', data);

                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });
        }

        //$scope.ViewCandidateDetails = function (ApplicationNumber, CandidateID, ApplicationStatus) {
        //    $localStorage.TempData1 = {
        //        ApplicationNumber: ApplicationNumber,
        //        CandidateID: CandidateID,
        //        ApplicationStatus: ApplicationStatus

        //    };
        //    $state.go('index.ViewCandidateDetails');

        //}
        $scope.editData = function () {
            $scope.previewData = false;
            $scope.applicationForm = true;
            $scope.sscForm = false;
            $scope.ExamAppearDetails = false;
            if ($scope.IsBlind == 1) {
                $scope.CheckBox = true;
            }
            else {
                $scope.CheckBox = false;
            }
            

        }


        $scope.loadCourse = function () {
            $scope.courseinfo = [];
            $scope.languageinfo = [];
            var coursedetail = CbtStudentRegService.GetCBTCourses();
            coursedetail.then(function (req) {
                $scope.courseinfo = req
            }, function (err) {
                $scope.courseinfo = [];
                alert("no data found");
            });
        }

        $scope.LoadLanguage = function (SelectedCourse) {
            $scope.languageinfo = [];
            // course = JSON.parse(course);
            $scope.CourseID = SelectedCourse.CourseID;
            var coursedetail = CbtStudentRegService.getlanguages($scope.CourseID);
            coursedetail.then(function (req) {
                $scope.languageinfo = req
            }, function (err) {
                $scope.languageinfo = [];
                alert("no data found");
            });


        }

        $scope.LoadGrades = function (SelectedCourse,sellanguage) {
            $scope.LoadGradeinfo = [];

            $scope.LanguageID = sellanguage.LanguageId
            if (!angular.isUndefined($scope.CourseID) && !angular.isUndefined($scope.LanguageID)) {
                var coursedetail = CbtStudentRegService.getGrades(SelectedCourse.CourseID, $scope.LanguageID);
                coursedetail.then(function (req) {
                    $scope.LoadGradeinfo = req
                }, function (err) {
                    $scope.LoadGradeinfo = [];
                    alert("no data found");
                });
            }



        }


        $scope.LoadQualifications = function (SelGrade) {
            $scope.LoadQualificationinfo = [];  
            $scope.GradeID = SelGrade.GradeId
            if (!angular.isUndefined(SelGrade.GradeId)) {
                var coursedetail = CbtStudentRegService.getQualifications($scope.GradeID);
                coursedetail.then(function (req) {
                    $scope.LoadQualificationinfo = req;                    
                }, function (err) {
                    $scope.LoadQualificationinfo = [];
                    alert("no data found");
                });
            }
        }


        $scope.SelectedQualification = function (SelQualification) {
            $scope.QualificationID = SelQualification.QualificationID
            $scope.GradeQualificationID = SelQualification.GradeQualificationID
            if ($scope.GradeQualificationID==1) {
                $scope.QualificationName='8th'
            }
            else if ($scope.GradeQualificationID == 2) {
                $scope.QualificationName = 'SSC or Equivalent'
            }
            else if ($scope.GradeQualificationID == 3) {
                $scope.QualificationName = 'Lower Grade Exam'
            }
            else if ($scope.GradeQualificationID == 4) {
                $scope.QualificationName = 'Intermediate or Equivalent';
            }
            else if ($scope.GradeQualificationID == 5) {
                $scope.QualificationName = 'Typewriting English Higher';
            }
        }

        $scope.GetPreviousExamDetails = function (preHallTicket, Selgrade) {
            $scope.DisablePreHallTicket = true;
            $scope.DisablePreviousButton = true;
            if (preHallTicket == '' || preHallTicket == null) {
                alert("HallTicket number can't be Empty");
                $scope.DisablePreHallTicket = false;
                $scope.DisablePreviousButton = false;
                return;
            }
            // $scope.selectedgrade = JSON.parse(grade);
            var previousDetails = CbtStudentRegService.GetPreviousExamData(preHallTicket, Selgrade.GradeId);
            previousDetails.then(function (res) {
                var gradeinfo = $scope.selectedgrade;
                if (res.length > 0) {
                    if (res[0].Result == "Fail") {
                        $scope.ShowResetButton3 = true;
                        $scope.PreviousExam = false;
                        $scope.CandidateName = res[0].StudentName;
                        $scope.CandidateNamefound = $scope.CandidateName != "" ? true : false;
                        $scope.ShowAadhaarDetail = false;
                        $scope.applicationForm = true;
                        $scope.ExamAppearDetails = true;
                        $scope.oldUser = true;
                        $scope.oldUser2 = false;
                        $scope.sscForm = false;
                        $scope.isqualified1 = false;
                        $scope.isqualified2 = false;
                        $scope.isqualified3 = false;
                    } else if (res[0].Result == "Pass") {
                        $scope.PreviousExam = true;
                        $scope.ShowResetButton3 = false;
                        alert("Please Check your Hallticket No.");
                        $state.go("TWSH.OnlineApplication");
                    }

                }
                else if (res.length <= 0) {
                    $scope.ShowResetButton3 = true;
                    $scope.oldUser = true;
                    $scope.ShowAadhaarDetail = true;

                }
            }, function (err) {

            });
        }

        $scope.GetQualificationExamDetails = function (preHallTicket, grade) {
            if (preHallTicket == '' || preHallTicket == null) {
                alert("HallTicket number can't be Empty");
                return;
            }
            // $scope.selectedgrade = JSON.parse(grade);
            var previousDetails = CbtStudentRegService.GetQualifiedExamData(preHallTicket, $scope.selectedgrade.QualificationGradeId);
            previousDetails.then(function (res) {
                if (res.length > 0) {
                    if (res[0].Result == "Pass") {
                        $scope.QualifiedExam = true;
                        $scope.CandidateName = res[0].StudentName;
                        $scope.CandidateNamefound = $scope.CandidateName != "" ? true : false;
                        $scope.ShowAadhaarDetail = false;
                        $scope.applicationForm = true;
                        $scope.ExamAppearDetails = true;
                        $scope.oldUser2 = false;
                        $scope.sscForm = false;
                        $scope.isqualified1 = false;
                        $scope.isqualified2 = false;
                        $scope.isqualified3 = false;
                    } else {
                        if (res[0].Result == "Fail") {

                            alert("Eligibility Criteria not fullfilled.");
                            $state.go("TWSH.OnlineApplication");
                        }
                    }
                } else {
                    alert("Details Not found, Continue with filling the Application");
                    $scope.ShowAadhaarDetail = false;
                    $scope.applicationForm = true;
                    $scope.oldUser2 = false;
                    $scope.ExamAppearDetails = true;
                    $scope.isqualified1 = false;
                    $scope.isqualified2 = false;
                    $scope.isqualified3 = true;

                }
            }, function (err) {

            });
        }

        //var ExamCenters = CbtStudentRegService.getonlineExaminationCenters(1, 3);
        //ExamCenters.then(function (res) {
        //    $scope.availableDates = [];
        //    $scope.examCenterList = res.Table;
        //    $scope.OnlineExamDates = res.Table1;
        //    for (var i = 0; i < res.Table1.length; i++) {
        //        $scope.availableDates.push(res.Table1[i].Date);
        //    }
        //    $scope.showpicker = true;
        //}, function (err) {
        //    $scope.examCenterList = [];
        //    $scope.OnlineExamDates = [];
        //    alert("no data found");
        //    });





        $scope.LoadExamCenters = function (District) {

            $scope.examCenterList = [];
            try {
                var SelectedDistrictId = JSON.parse(District);
                // var course = JSON.parse($scope.course); 
            } catch (er) { }
            $scope.SelectedDistrictId = SelectedDistrictId.DistrictID;


           
                //-------------------Load online exam Centers-----------------------
            var ExamCenters = CbtStudentRegService.GetCBTExamcentersAndDates($scope.CourseID, $scope.SelectedDistrictId);
                ExamCenters.then(function (res) {
                    $scope.availableDates = [];
                    $scope.examCenterList = res.Table;
                    $scope.OnlineExamDates = res.Table1;
                    for (var i = 0; i < res.Table1.length; i++) {
                        $scope.availableDates.push(res.Table1[i].Date);
                    }

                }, function (err) {
                    $scope.examCenterList = [];
                    $scope.OnlineExamDates = [];
                    alert("no data found");
                });

            
            

        }





        $scope.SelectedExamCentre = function (examCenter) {

            try {
                var SelectedExamCentreID = JSON.parse(examCenter);
            }
            catch (er) { }
            $scope.SelectedExamCentreID = SelectedExamCentreID.Id;




        }


        $scope.EditLoadExamCenters = function (District) {

            $scope.examCenterList = [];
            try {
                var SelectedDistrictId = JSON.parse(District);
                // var course = JSON.parse($scope.course); 
            } catch (er) { }
            $scope.SelectedDistrictID = SelectedDistrictId;



            //-------------------Load online exam Centers-----------------------
            var ExamCenters = CbtStudentRegService.GetCBTExamcentersAndDates($scope.CourseID, $scope.SelectedDistrictID);
            ExamCenters.then(function (res) {
                $scope.availableDates = [];
                $scope.examCenterList = res.Table;
                $scope.OnlineExamDates = res.Table1;
                for (var i = 0; i < res.Table1.length; i++) {
                    $scope.availableDates.push(res.Table1[i].Date);
                }

            }, function (err) {
                $scope.examCenterList = [];
                $scope.OnlineExamDates = [];
                alert("no data found");
            });




        }


        $scope.EditSelectedExamCentre = function (examCenter) {

            try {
                var SelectedExamCentreID = JSON.parse(examCenter);
            }
            catch (er) { }
            $scope.SelectedExamCentreID = SelectedExamCentreID;




        }






        //$scope.getsscDetails = function (sscHallticket, passedoutYear, sscType) {
        //    if (sscHallticket == '' || sscHallticket == null) {
        //        alert("SSC HallTicket number can't be Empty");
        //        return;
        //    }
        //    if (passedoutYear == '' || passedoutYear == null) {
        //        alert("SSC passedout year can't be Empty");
        //        return;
        //    }


        //    var reqData = {
        //        RollNo: sscHallticket,
        //        Year: passedoutYear,
        //        Stream: sscType
        //    };
        //    var sscdetails = CbtStudentRegService.getSSCDetails(reqData);
        //    sscdetails.then(function (res) {
        //        if (res) {

        //            let resdata = JSON.parse(res)
        //            if (resdata.Status == 200) {
        //                $scope.applicationForm = true;
        //                $scope.CandidateName = resdata.Name;
        //                $scope.CandidateNamefound = $scope.CandidateName != "" ? true : false;
        //                $scope.FatherName = resdata.FatherName;
        //                $scope.FatherNamefound = $scope.FatherName != "" ? true : false;
        //                $scope.MotherName = resdata.MotherName;
        //                $scope.MotherNamefound = $scope.MotherName != "" ? true : false;
        //                $scope.SscRollNo = resdata.RollNo;
        //                $scope.SscRollNofound = $scope.SscRollNo != "" ? true : false;
        //                $scope.Gender = resdata.Sex == "B" || resdata.Sex == "M" ? "M" : resdata.Sex == "G" || resdata.Sex == "F" ? "F" : "";
        //                $scope.Genderfound = $scope.Gender != "" ? true : false;
        //                let date1 = resdata.DateOfBirth;
        //                let ch = date1.split('');
        //                var datelength = ch.length;
        //                //    var tempdate = "";
        //                //    var regex = "^[0-9]{1,6}$";
        //                //    if (datelength<=6) {
        //                //        if (parseInt(ch[4] + ch[5]) <= 99 && parseInt(ch[4] + ch[5]) > 80) {
        //                //            tempdate = ch[0] + ch[1] + "/" + ch[2] + ch[3] + "/19" + ch[4] + ch[5];
        //                //        } else {
        //                //            tempdate = ch[0] + ch[1] + "/" + ch[2] + ch[3] + "/20" + ch[4] + ch[5];
        //                //        }
        //                //    }
        //                //    else if (datelength <= 8 && datelength >= 6){
        //                //        tempdate = ch[0] + ch[1] + "/" + ch[2] + ch[3] + "/" + ch[4] + ch[5] + ch[6] + ch[7];
        //                //}

        //                //    else {
        //                //        tempdate = resdata.DateOfBirth;

        //                //    }
        //                //    $scope.CandidateNameDOB = tempdate;
        //                //    $scope.CandidateNameDOBchange = tempdate;
        //                //    $scope.CandidateNameDOBfound = $scope.CandidateNameDOB != "" ? true : false;

        //                $scope.sscForm = false;

        //            } else {
        //                alert("Details not found, Continue to fillApplication");
        //                $scope.applicationForm = true;
        //                $scope.sscForm = false;
        //                $scope.isqualified1 = true;
        //            }
        //        } else {
        //            alert("Details not found, Continue to fillApplication");
        //            $scope.applicationForm = true;
        //            $scope.sscForm = false;
        //            $scope.isqualified1 = true;
        //        }

        //    }, function (err) {
        //        alert("Details not found, Continue to fillApplication");
        //        $scope.applicationForm = true;
        //        $scope.sscForm = false;
        //        $scope.isqualified1 = true;
        //    })



        //}


        $scope.getsscDetails = function (sscHallticket, passedoutYear, sscType) {

            $scope.DisableGetSSCButton = true;
            $scope.SSCDetails = true;
            $scope.DisableisSSC = true;
            if (sscHallticket == '' || sscHallticket == null) {
                alert("SSC HallTicket number can't be Empty");
                return;
            }
            if (passedoutYear == '' || passedoutYear == null) {
                alert("SSC passedout year can't be Empty");
                return;
            }


            //var reqData = {
            //    RollNo: sscHallticket,
            //    Year: passedoutYear,
            //    Stream: sscType
            //};
            var sscdetails = CbtStudentRegService.TempGetSSCDetails($scope.sscHallticket, $scope.passedoutYear, $scope.sscType);
            sscdetails.then(function (resdata) {
                if (resdata.length > 0) {

                    //let resdata = JSON.parse(res)
                    /*if (resdata.Status == 200) {*/
                    $scope.applicationForm = true;
                    $scope.CandidateName = resdata[0].CNAME;
                    $scope.CandidateNamefound = $scope.CandidateName != "" ? true : false;
                    $scope.FatherName = resdata[0].FNAME;
                    $scope.FatherNamefound = $scope.FatherName != "" ? true : false;
                    $scope.MotherName = resdata[0].MNAME;
                    $scope.MotherNamefound = $scope.MotherName != "" ? true : false;
                    $scope.SscRollNo = resdata[0].TENTH_HT_NO;
                    $scope.SscRollNofound = $scope.SscRollNo != "" ? true : false;
                    $scope.Gender = resdata[0].Gender == "B" || resdata[0].Gender == "M" ? "M" : resdata[0].Gender == "G" || resdata[0].Gender == "F" ? "F" : "";
                    $scope.Genderfound = $scope.Gender != "" ? true : false;
                    //let date1 = resdata[0].DateOfBirth;
                    //let ch = date1.split('');
                    //var datelength = ch.length;
                    $scope.SscForm = true;
                    $scope.ShowReset2Button = true;
                    $scope.ShowGetSSCButton = false;
                    $scope.SSCDetails = true;
                    $scope.DisableisSSC = true;
                    $scope.SSCVerified = 1;

                }
                else if (resdata.length=0) {
                    $scope.applicationForm = true;
                    $scope.SscForm = true;
                    $scope.isqualified1 = true;
                    $scope.ShowReset2Button = true;
                    $scope.ShowGetSSCButton = false;
                    $scope.SSCDetails = true;
                    $scope.DisableisSSC = true;


                }

                   else {
                        alert("Details not found, Continue to fillApplication");
                        $scope.applicationForm = true;
                        $scope.SscForm = true;
                        $scope.isqualified1 = true;
                        $scope.ShowReset2Button = true;
                        $scope.ShowGetSSCButton = false;
                        $scope.SSCDetails = true;
                        $scope.DisableisSSC = true;


                    }
               

            }, function (err) {
                alert("Details not found, Continue to fillApplication");
                $scope.applicationForm = true;
                $scope.SscForm = false;
                $scope.isqualified1 = true;
                $scope.ShowReset2Button = true;
                $scope.ShowGetSSCButton = false;
                $scope.SSCDetails = true;
                $scope.DisableisSSC = true;

            })



        }
       
        //$scope.uploadPhoto = function () {
        //    var input = document.getElementById("stdPhotoFile");
        //    var fileSize = input.files[0].size;
        //    console.log(fileSize);
        //    if (fileSize <= 50000) {
        //        if (input.files && input.files[0]) {
        //            var reader = new FileReader();
        //            reader.readAsDataURL(input.files[0]);
        //            reader.onload = function (e) {
        //                $('#stdPhotoImg').attr('src', e.target.result);

        //                var canvas = document.createElement("canvas");
        //                var imageElement = document.createElement("img");

        //                imageElement.setAttribute = $('<img>', { src: e.target.result });
        //                var context = canvas.getContext("2d");
        //                imageElement.setAttribute.one("load", function () {
        //                    canvas.width = this.width;
        //                    canvas.height = this.height;
        //                    context.drawImage(this, 0, 0);
        //                    var base64Image = canvas.toDataURL("image/png");
        //                    $scope.userPhoto = base64Image;
        //                });


        //            }
        //            reader.onerror = function (e) {
        //                console.error("File could not be read! Code " + e.target.error.code);
        //            };

        //        }
        //    }
        //    else {
        //        alert("file size should be less then 50kb ");
        //        return;
        //    }
        //}



        $scope.uploadPhoto = function () {
            var input = document.getElementById("stdPhotoFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 50000 && fileSize >= 25000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdPhotoImg').attr('src', e.target.result);

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
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.PhotoPath = base64Image;
                            $scope.PhotoPathConvert = $scope.PhotoPath.replace(/^data:image\/[a-z]+;base64,/, "");

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 25000) {
                alert("Photo size should be greater than 25KB");
                $('#stdPhotoFile').val('');
                return;
            } else if (fileSize >= 50000) {
                alert("Photo size should be less than 50KB");
                $('#stdPhotoFile').val('');
                return;
            } else {
                alert("file size should be between 25KB and 50KB");
                $('#stdPhotoFile').val('');
                return;
            }
        }


        $scope.toDataURL = function (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        }

        var tempId = [];
        var arr = [];
        var finalarr = [];
        var finalarr1 = [];
        $scope.dates = function (date, option) {
            if (date != null && finalarr.includes(date) && !angular.isUndefined(date)) {
                alert("This day is already taken, Please choose another day");
                $("#datepicker" + option).datepicker('setDate', null);

            }


            if (arr.length > 0 && !angular.isUndefined(date)) {
                arr.map((obj) => {
                    if (obj.opt == option) {
                        obj.date = date;
                        tempId.push(option);
                    }
                    if (obj.opt != option && !tempId.includes(option)) {
                        arr.push({ "opt": option, "date": date });
                        tempId.push(option);
                    }
                });
            } else if (arr.length == 0 && !angular.isUndefined(date)) {
                arr.push({ "opt": option, "date": date });
            }

            if (!angular.isUndefined(date) && arr.length > 0) {
                finalarr = [];
                finalarr = arr.map(value => value.date);
            }

        }


        $scope.uploadQualCert = function () {
            var input = document.getElementById("QualifiedCertoFile");
            var fileSize = input.files[0].size;
            console.log(fileSize);
            if (fileSize <= 200000 && fileSize >= 100000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#QualifiedCert').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.Qualification1 = base64Image;
                            $scope.Qualification1Convert = $scope.Qualification1.replace(/^data:image\/[a-z]+;base64,/, "");
                        });

                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else if (fileSize <= 200000) {
                alert("file size should be less than 200KB");
                $('#QualifiedCertoFile').val('');
                return;
            } else if (fileSize >= 100000) {
                alert("file size should be greater than 100KB");
                $('#QualifiedCertoFile').val('');
                return;
            } else {
                alert("file size should be between 100KB and 200KB");
                $('#QualifiedCertoFile').val('');
                return;
            }
        }

        $scope.uploadSscCert = function () {
            var input = document.getElementById("stdSscCertFile");
            var fileSize = input.files[0].size;
            console.log(fileSize);
            if (fileSize <= 200000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdSscCert').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.Qualification2 = base64Image;
                            $scope.Qualification2Convert = $scope.Qualification2.replace(/^data:image\/[a-z]+;base64,/, "");
                        });

                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else if (fileSize <= 200000) {
                alert("file size should be less than 200KB");
                $('#stdSscCertFile').val('');
                return;
            }
            //else if (fileSize >= 100000) {
            //    alert("file size should greater than 100KB");
            //    $('#stdSscCertFile').val('');
            //    return;
            //}
            else {
                alert("file size should be between 100KB and 200KB");
                $('#stdSscCertFile').val('');
                return;
            }
        }






        $scope.uploadEditPhoto = function () {
            var input = document.getElementById("editstdPhotoFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 50000 && fileSize >= 25000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#editstdPhotoImg').attr('src', e.target.result);

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
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.NewEditPhotoPath = base64Image;
                            $scope.NewEditPhotoPathConvert = $scope.NewEditPhotoPath.replace(/^data:image\/[a-z]+;base64,/, "");

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 25000) {
                alert("Photo size should be greater than 25KB");
                $('#editstdPhotoFile').val('');
                return;
            } else if (fileSize >= 50000) {
                alert("Photo size should be less than 50KB");
                $('#editstdPhotoFile').val('');
                return;
            } else {
                alert("file size should be between 25KB and 50KB");
                $('#editstdPhotoFile').val('');
                return;
            }
        }



        $scope.uploadEditQualCert = function () {
            var input = document.getElementById("editQualifiedCertoFile");
            var fileSize = input.files[0].size;
            console.log(fileSize);
            if (fileSize <= 200000 && fileSize >= 100000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#editQualifiedCert').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.NewEditQualification1 = base64Image;
                            $scope.NewEditQualification1Convert = $scope.NewEditQualification1.replace(/^data:image\/[a-z]+;base64,/, "");
                        });

                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else if (fileSize <= 200000) {
                alert("file size should be less than 200KB");
                $('#editQualifiedCertoFile').val('');
                return;
            } else if (fileSize >= 100000) {
                alert("file size should be greater than 100KB");
                $('#editQualifiedCertoFile').val('');
                return;
            } else {
                alert("file size should be between 100KB and 200KB");
                $('#editQualifiedCertoFile').val('');
                return;
            }
        }

        $scope.uploadEditSscCert = function () {
            var input = document.getElementById("editstdSscCertFile");
            var fileSize = input.files[0].size;
            console.log(fileSize);
            if (fileSize <= 200000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#editstdSscCert').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.NewEditQualification2 = base64Image;
                            $scope.NewEditQualification2Convert = $scope.NewEditQualification2.replace(/^data:image\/[a-z]+;base64,/, "");
                        });

                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else if (fileSize <= 200000) {
                alert("file size should be less than 200KB");
                $('#editstdSscCertFile').val('');
                return;
            }
            //else if (fileSize >= 100000) {
            //    alert("file size should greater than 100KB");
            //    $('#stdSscCertFile').val('');
            //    return;
            //}
            else {
                alert("file size should be between 100KB and 200KB");
                $('#editstdSscCertFile').val('');
                return;
            }
        }



        $scope.Modify = function () {
            var EditCandidateDetail = CbtStudentRegService.GetCandidateDetails($scope.ApplicationNumber, $scope.CandidateID);
            EditCandidateDetail.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                $scope.EditData = [];
                if (res.length >= 0) {
                    $scope.loading = false;
                    $scope.EditData = res[0].Data;
                    $scope.EditData1 = JSON.parse($scope.EditData)
                    $scope.EditData = $scope.EditData1.Table[0];
                    $scope.EditApplicationNumber = $scope.EditData1.Table[0].ApplicationNumber;
                    $scope.EditCourseName = $scope.EditData1.Table[0].CourseName;
                    $scope.EditLanguageName = $scope.EditData1.Table[0].LanguageName;
                    $scope.EditGradeName = $scope.EditData1.Table[0].GradeName;
                    $scope.EditQualificationDescription = $scope.EditData1.Table[0].QualificationDescription;
                    $scope.EditSSCHallticketNo = $scope.EditData1.Table[0].SSCHallticketNo;
                    $scope.EditSSCYear = $scope.EditData1.Table[0].SSCYear;
                    $scope.EditSSCPassType = $scope.EditData1.Table[0].SSCPassType;
                    $scope.EditCandidateName = $scope.EditData1.Table[0].CandidateName;
                    $scope.EditFatherName = $scope.EditData1.Table[0].FatherName;
                    $scope.EditMotherName = $scope.EditData1.Table[0].MotherName;
                    $scope.EditCandidateNameDOB = $scope.EditData1.Table[0].DateOfBirth;
                    $scope.EditGender = $scope.EditData1.Table[0].Gender;
                    $scope.EditDistrictID = $scope.EditData1.Table[0].DistrictID;
                    $scope.EditExamCenterID = $scope.EditData1.Table[0].ExamCenterID;
                    $scope.EditexamCenter = $scope.EditData1.Table[0].ExaminationCenterName;
                    $scope.Editdate1 = $scope.EditData1.Table[0].ExamDateOption1;
                    $scope.Editdate2 = $scope.EditData1.Table[0].ExamDateOption2;
                    $scope.Editdate3 = $scope.EditData1.Table[0].ExamDateOption3;
                    $scope.Editdate4 = $scope.EditData1.Table[0].ExamDateOption4;
                    $scope.Editdate5 = $scope.EditData1.Table[0].ExamDateOption5;
                    $scope.EditHnoStreet = $scope.EditData1.Table[0].HnoStreet;
                    $scope.EditStreet = $scope.EditData1.Table[0].Street;
                    $scope.EditVillageTown = $scope.EditData1.Table[0].VillageTown;
                    $scope.EditPincode = $scope.EditData1.Table[0].Pincode;
                    $scope.EditDistrict = $scope.EditData1.Table[0].DistrictName;
                    $scope.EditMandal = $scope.EditData1.Table[0].Mandal;
                    $scope.EditMobileNumber = $scope.EditData1.Table[0].MobileNumber;
                    $scope.EditEmailID = $scope.EditData1.Table[0].EmailID;
                    $scope.EditRemarks = $scope.EditData1.Table[0].Remarks;
                    $scope.EditPhotoPath = $scope.EditData.PhotoPath;
                    $scope.EditQualification1 = $scope.EditData.Qualification1;
                    $scope.EditQualification2 = $scope.EditData.Qualification2;
                    $scope.Aadhaar = JSON.parse(res[0].Aadhar);
                    $scope.EditmaskedAadhaar = $scope.Aadhaar.slice(0, 8).replace(/[0-9]/g, "X") + $scope.Aadhaar.slice(-4);
                    var ExamCenters = CbtStudentRegService.GetCBTExamcentersAndDates($scope.CourseID, $scope.SelectedDistrictId);
                    ExamCenters.then(function (res) {
                        $scope.availableDates = [];
                        $scope.examCenterList = res.Table;
                        $scope.OnlineExamDates = res.Table1;
                        for (var i = 0; i < res.Table1.length; i++) {
                            $scope.availableDates.push(res.Table1[i].Date);
                        }

                    }, function (err) {
                        $scope.examCenterList = [];
                        $scope.OnlineExamDates = [];
                        alert("no data found");
                    });
                   
                    $scope.PreviewData = false;
                    $scope.courseDetails = false;
                    $scope.ExamAppearDetails = false;
                    $scope.ShowAadhaarDetail = false;
                    $scope.SscForm = false;
                    $scope.applicationForm = false;
                    $scope.EditapplicationForm = true;
                    $scope.toDataURL($scope.EditPhotoPath, function (res) {
                        if ($scope.EditPhotoPath == "") {
                            $scope.PhotoPathConvert = "";
                        }
                        else {
                            $scope.EditPhotoPathConvert = res.replace(/^data:image\/[a-z]+;base64,/, "");
                        }
                    })

                    $scope.toDataURL($scope.EditQualification1, function (res) {
                        if ($scope.EditQualification1 == "") {
                            $scope.Qualification1Convert = "";
                        }
                        else {
                            $scope.EditQualification1Convert = res.replace(/^data:image\/[a-z]+;base64,/, "");

                        }
                    })

                    $scope.toDataURL($scope.EditQualification2, function (res) {
                        if ($scope.EditQualification2 == "") {
                            $scope.Qualification2Convert = "";
                        }
                        else {
                            $scope.EditQualification2Convert = res.replace(/^data:image\/[a-z]+;base64,/, "");

                        }
                    })
                    //$scope.EditData = true;

                    //$scope.$emit('hideLoading', data);

                } else {
                    $scope.loading = false;
                    $scope.EditData = [];
                    //$scope.$emit('hideLoading', data);

                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });
        }


        $scope.SubmitApplication = function () {
            var SubmitcandDetails = CbtStudentRegService.SubmitCandidateDetails($scope.ApplicationNumber, $scope.CandidateID);
            SubmitcandDetails.then(function (response) {
                //try {
                //    var res = JSON.parse(response);
                //}
                //catch (err) { }

                if (response.Table[0].ResponceCode == '200') {
                    alert(response.Table[0].ResponceDescription);
                    $scope.ApplicationNo = response.Table1[0].ApplicationNumber;
                    $scope.PreviewData = false;
                    $scope.applicationsuccess = true;
                }

                else if (response.Table[0].ResponceCode == '400') {
                    alert(response.Table[0].ResponceDescription);
                }

                else {
                    alert('Something Went Wrong')
                }
            }, function (error) {
                var err = JSON.parse(error);
            });
        }

        $scope.openImage = function (imagesrc) {
            $scope.img = imagesrc;
            $scope.modalInstance = $uibModal.open({
                templateUrl: "app/views/CBT/Popups/ViewDocument.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',

            });

        }







        $scope.cancel = function () {
            $state.go("TWSH.Home");
        }
        $scope.payfee = function () {
            // $localStorage.Twsh = "";
            // var twsh = {
            //     ApplicationNo: $scope.ApplicationNo,
            // }
            AppSettings.applicationno = $scope.ApplicationNo;
            if ($localStorage.Twsh != undefined && $localStorage.Twsh != "") {
                $localStorage.Twsh.ApplicationNo = "";
                $localStorage.Twsh.ApplicationNo = $scope.ApplicationNo
            }

            // $localStorage.Twsh = twsh;
            $state.go("TWSH.FeePayment");
        }

    });

});