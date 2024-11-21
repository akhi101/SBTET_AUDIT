define(['app'], function (app) {
    app.controller("CcicCoursesCardsController", function ($scope, $uibModal, CcicStudentRegistrationService) {


        //validations for RegistrationformContoller
        $scope.Student_Name = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
        $scope.father_name = /^[a-zA-Z5-9]+$/;
        $scope.ph_numbr = /^\+?\d{10}$/;
        $scope.resendMobileOTP = false;


        $scope.ValidateEmail = function () {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)sendmail*$/.test($scope.Email)) {
                return (true)
            }
            alert("You have entered an invalid email address!")
            return (false)
        }

        $scope.ValidateMobileNumber = function () {
            if ($scope.StudentPhoneNumber == null || $scope.StudentPhoneNumber == undefined) {
                alert("Please Enter Mobile Number");
            }
            else if ($scope.StudentPhoneNumber.length != '10') {
                alert('Enter valid Mobile number');
            }
        }

        $scope.MailSent = true;
        $scope.ResendMail = false;
        $scope.phonenoupdated = false;
        $scope.Verified = false;
        $scope.MailVerified = false;
        $scope.MobileDisable = false;




        var count = 0;
        $scope.sendmail = function (StudentName, Email) {
            

            if (angular.isUndefined(StudentName) || StudentName == "" || StudentName == null) {
                alert('Please enter Student name');
                return;
            }

            if (angular.isUndefined(Email) || Email == "" || Email == null) {
                alert('please Enter Email');
                return;
            }

            if (count > 3) {
                $scope.ResendMail = false;
                
                return
            }
            count++;

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
                    alert("Otp Sending Failed")
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


        //To show Course Cards
        var location = window.location.origin;
        var getCourseList = CcicStudentRegistrationService.getCourseList();
        getCourseList.then(function (response) {
            $scope.Courseslist = [];

            if (response.length >= 0) {

                $scope.Courseslist = response;
                $scope.Courseslist = $scope.Courseslist.map(x => {
                    return {
                        CourseID: x.CourseID, CourseName: x.CourseName, CourseCode: x.CourseCode, CourseDuration: x.CourseDuration, CourseQualification: x.CourseQualification, CourseImg: location + "/CCIC_Courses_Imgs/" + x.CourseCode + ".jpg",
                        CourseID: x.CourseID, CourseName: x.CourseName, CourseCode: x.CourseCode, CourseDuration: x.CourseDuration, CourseQualification: x.CourseQualification, CoursePdf: location + "/CCIC_Courses_Pdfs/" + x.CourseCode + ".pdf"


                    }
                });

            }


            else {
                $scope.Courseslist = [];
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
            for (var i = 0; i < $scope.Courseslist.length; i++) {
                if ($scope.Courseslist[i].CourseID == CourseID) {
                    $scope.CourseListByInstitution.push({
                        CourseName: $scope.Courseslist[i].CourseName, CourseCode: $scope.Courseslist[i].CourseCode, CourseDuration: $scope.Courseslist[i].CourseDuration, CourseQualification: $scope.Courseslist[i].CourseQualification, CoursePdf: location + "/CCIC_Courses_Pdfs/" + $scope.Courseslist[i].CourseCode + ".pdf"

                    });
                }
            }

            $scope.closeModal2 = function () {
                $scope.modalInstance2.close();
            };
        }

        $scope.ShowInstitutions = function (CourseID) {
            $scope.Otp = false;
            $scope.NoOtp = false;
            //modal instance for Institutes Popup
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/CCIC/InstitutesPopup.html",
                size: 'lg',
                scope: $scope,
                windowClass: 'modal-fit',
                backdrop: 'static',
                keyboard: false
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            };
            $scope.selCourseID = CourseID;
            //to get Instituteslist by using CourseID(Courses Popup Controller)
            var getinstitutebycourse = CcicStudentRegistrationService.getInstitutionListByCourse(CourseID);
            getinstitutebycourse.then(function (response) {
                $scope.InstitutionListByCourse = [];
                if (response.length >= 0) {
                    $scope.InstitutionListByCourse = response;
                } else {
                    $scope.InstitutionListByCourse = [];
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });



        }


       

        
           
           
            $scope.ShowReg = function (dat) {
                //modal instance1 for registration form popup
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


                $scope.OtpSent = false;
                $scope.NoOtp = false;
                $scope.phonenoupdated = false;
                $scope.Verified = false;
                $scope.resendMobileOTP = false;
                $scope.MobileDisable = false;

                $scope.selInstitutionID = dat;
                $scope.closeModal1 = function () {
                    $scope.modalInstance1.close();
                };

               
               
            }

         

      
        //$state.go('index');
    });
});


