define(['app'], function (app) {
    app.controller("CcicInstiTableController", function ($scope, $uibModal, CcicStudentRegistrationService) {
        

        //validations for RegistrationformContoller
        $scope.user_name = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
        $scope.father_name = /^[a-zA-Z5-9]+$/;
        $scope.ph_numbr = /^\+?\d{10}$/;
        
        $scope.ValidateEmail = function () {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($scope.Email)) {
                return (true)
            }
            alert("You have entered an invalid email address!")
            return (false)
        }

        $scope.MailSent = true;
        $scope.ResendMail = false;
        $scope.phonenoupdated = false;
        $scope.Verified = false;
        $scope.MailVerified = false;
        $scope.MobileDisable = false;

        $scope.sendmail = function (StudentName, Email) {


            if (angular.isUndefined(StudentName) || StudentName == "" || StudentName == null) {
                alert('Please enter Student name');
                return;
            }

            if (angular.isUndefined(Email) || Email == "" || Email == null) {
                alert('please Enter Email');
                return;
            }



            $scope.MailSent = false;
            $scope.ResendMail = true;



            var sendmail = CcicStudentRegistrationService.SendMail(Email, $scope.selInstitutionID, $scope.selCourseID, StudentName)
            sendmail.then(function (response) {
                let res = response[0];
                if (res.StatusCode == '200') {
                    alert("mail sent successfully.");
                } else if (res.StatusCode == '400') {
                    alert(res.StatusDescription);
                    $scope.MailSent = true;
                    $scope.ResendMail = false;
                } else {
                    alert("Mail sending failed");
                    $scope.MailSent = true;
                    $scope.ResendMail = false;
                }

            }, function (err) {

                $scope.MailSent = true;
                $scope.ResendMail = false;
            });
        }

        $scope.VerifyMailOtp = function (StudentName, Email, MailOTP) {


            if (angular.isUndefined(StudentName) || StudentName == "" || StudentName == null) {
                alert('Please enter Student name');
                return;
            }

            if (angular.isUndefined(Email) || Email == "" || Email == null) {
                alert('please Enter Email');
                return;
            }
            if (angular.isUndefined(MailOTP) || MailOTP == "" || MailOTP == null) {
                alert('please Enter OTP.');
                return;
            }



            $scope.MailSent = false;
            $scope.ResendMail = true;



            var VerifyMailOtp = CcicStudentRegistrationService.VerifyMailOtp(Email, $scope.selInstitutionID, $scope.selCourseID, StudentName, MailOTP)
            VerifyMailOtp.then(function (response) {
                let res = response[0];
                if (res.ResponseCode == '200') {
                    alert(res.ResponseDescription);
                    $scope.MailVerified = true;
                    $scope.MailSent = true;
                } else if (res.ResponseCode == '400') {
                    alert(res.ResponseDescription);
                    $scope.MailSent = true;
                } else {
                    alert("otp verification failed, please try again.");
                    $scope.MailSent = true;
                    $scope.ResendMail = false;
                }

            }, function (err) {

                $scope.MailSent = true;
                $scope.ResendMail = false;
            });
        }


        $scope.SendSms = function (StudentName, MobileNumber) {


            if (angular.isUndefined(StudentName) || StudentName == "" || StudentName == null) {
                alert('Please enter Student name');
                return;
            }

            if (angular.isUndefined(MobileNumber) || MobileNumber == "" || MobileNumber == null) {
                alert('please Enter Mobile number');
                return;
            }

            $scope.OtpSent = false;
            $scope.ResendOtp = true;



            var SendSms = CcicStudentRegistrationService.SendSms(MobileNumber, $scope.selInstitutionID, $scope.selCourseID, StudentName)
            SendSms.then(function (response) {
                let res = response[0];

                if (res.StatusCode == '200') {
                    alert("Otp sent successfully.");
                } else if (res.StatusCode == '400') {
                    alert(res.StatusDescription);
                    $scope.OtpSent = true;
                    $scope.ResendOtp = false;

                } else {
                    alert("Otp sending failed ");
                    $scope.OtpSent = true;
                    $scope.ResendOtp = false;
                }

            }, function (err) {

                $scope.OtpSent = true;
                $scope.ResendOtp = false;
            });



        }




        $scope.VerifyMobileOtp = function (StudentName, MobileNumber, MobileOTP) {


            if (angular.isUndefined(StudentName) || StudentName == "" || StudentName == null) {
                alert('Please enter Student name');
                return;
            }

            if (angular.isUndefined(MobileNumber) || MobileNumber == "" || MobileNumber == null) {
                alert('please Enter Mobile Number');
                return;
            }
            if (angular.isUndefined(MobileOTP) || MobileOTP == "" || MobileOTP == null) {
                alert('please Enter OTP.');
                return;
            }



            $scope.OtpSent = false;
            $scope.ResendOtp = true;



            var VerifyMobileOtp = CcicStudentRegistrationService.VerifyMobileOtp(MobileNumber, $scope.selInstitutionID, $scope.selCourseID, StudentName, MobileOTP)
            VerifyMobileOtp.then(function (response) {
                let res = response[0];
                if (res.ResponseCode == '200') {
                    alert(res.ResponseDescription);
                    $scope.OtpVerified = true;
                    $scope.OtpSent = true;
                } else if (res.ResponseCode == '400') {
                    alert(res.ResponseDescription);
                    $scope.OtpSent = true;
                } else {
                    alert("otp verification failed, please try again.");
                    $scope.OtpSent = true;
                    $scope.ResendOtp = false;
                }

            }, function (err) {

                $scope.OtpSent = true;
                $scope.ResendOtp = false;
            });
        }

        
        var location = window.location.origin;
        var getInstitutionList = CcicStudentRegistrationService.getInstitutionList();
        getInstitutionList.then(function (response) {
            $scope.Institutionslist = [];
            if (response.length >= 0) {
                $scope.Institutionslist = response;
            } else {
                $scope.Institutionslist = [];
            }
        },
            function (error) {
                //   alert("error while loading Notification");
                var err = JSON.parse(error);
            });

        $scope.ShowCourseDetails = function (CourseID) {

            //modal instance2 for CourseDetailsPopup
            $scope.modalInstance2 = $uibModal.open({
                templateUrl: "/app/views/CCIC/CourseDetailsPopup.html",
                size: 'lg',
                scope: $scope,
                windowClass: 'modal-fit',
                backdrop: 'static',
                keyboard: false
            });

            $scope.CourseListByInstitution = [];
            for (var i = 0; i < $scope.CourseList.length; i++) {
                if ($scope.CourseList[i].CourseID == CourseID) {
                    $scope.CourseListByInstitution.push({
                        CourseName: $scope.CourseList[i].CourseName, CourseCode: $scope.CourseList[i].CourseCode, CourseDuration: $scope.CourseList[i].CourseDuration, CourseQualification: $scope.CourseList[i].CourseQualification, CoursePdf: location + "/CCIC_Courses_Pdfs/" + $scope.CourseList[i].CourseCode + ".pdf"

                    });
                }
            }

            $scope.closeModal2 = function () {
                $scope.modalInstance2.close();
            };

        }



   
        
        $scope.ShowCourses = function (InstitutionID) {
            $scope.Otp = false;
            $scope.NoOtp = false;

            //Modal instance for Courses Popup
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/CCIC/CoursesPopup.html",
                size: 'lg',
                scope: $scope,
                windowClass: 'modal-fit',
                backdrop: 'static',
                keyboard: false
            });


            $scope.closeModal = function () {
                $scope.modalInstance.close();
            };
           
            //Courses Popup Controller to get courses by using InstitutionID
            $scope.selInstitutionID = InstitutionID;
            var getcoursebyinstitute = CcicStudentRegistrationService.getCourseListByInstitution(InstitutionID);
            getcoursebyinstitute.then(function (response) {
                $scope.CourseList = [];
                if (response.length >= 0) {
                    $scope.CourseList = response;
                    $scope.CourseList = $scope.CourseList.map(x => {
                        return {
                            CourseID: x.CourseID, CourseName: x.CourseName, CourseCode: x.CourseCode, CourseDuration: x.CourseDuration, CourseQualification: x.CourseQualification, CourseImg: location + "/CCIC_Courses_Imgs/" + x.CourseCode + ".jpg",
                            CourseID: x.CourseID, CourseName: x.CourseName, CourseCode: x.CourseCode, CoursePdf: location + "/CCIC_Courses_Pdfs/" + x.CourseCode + ".pdf",

                        }
                    });

                } else {
                    $scope.CourseList = [];
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });


        }

  




        
            $scope.ShowReg = function (dat) {

                //modal instance1 for Registration Popup form
                $scope.modalInstance1 = $uibModal.open({
                    templateUrl: "/app/views/CCIC/CcicRegPopup.html",
                    size: 'lg',
                    scope: $scope,
                    windowClass: 'modal-fit',
                    backdrop: 'static',
                    keyboard: false
                });
                $scope.MailSent = true;
                $scope.ResendMail = false;


                $scope.OtpSent = true;
                $scope.NoOtp = false;
                $scope.phonenoupdated = false;
                $scope.Verified = false;
                $scope.MobileDisable = false;


               

                $scope.selCourseID = dat;
                $scope.closeModal1 = function () {
                    $scope.modalInstance1.close();
                };

               
            }

          
         

        //$state.go('index');
    });
});