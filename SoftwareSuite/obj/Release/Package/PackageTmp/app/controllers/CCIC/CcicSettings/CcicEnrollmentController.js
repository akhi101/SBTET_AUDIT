define(['app'], function (app) {
    app.controller("CcicEnrollmentController", function ($scope, $crypto, $localStorage, $state, CcicPreExaminationService, CcicSystemUserService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;



        const $ctrl = this;
        $ctrl.$onInit = () => {

            $scope.GetCcicCoursesByInstitution(authData.InstitutionID);
            $scope.SscForm = false;
            $scope.continuebutton = true;


        }

        $scope.loading = false;

        var eKey = CcicSystemUserService.GetEKey();
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

        //$scope.StuName = function () {

        //    if (/^(\s)*[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])*))*(\s)*$/.test($scope.CNAME)){
        //        return true;
        //    }
        //    else {
        //        alert("Invalid Studentname")
        //        return (false)
        //    }
        //}

        //$scope.FatName = function () {

        //    if (/^(\s)*[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])*))*(\s)*$/.test($scope.FNAME)) {
        //        return true;
        //    }
        //    else {
        //        alert("Invalid Fathername")
        //        return (false)
        //    }
        //}

        //$scope.MotName = function () {

        //    if (/^(\s)*[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])*))*(\s)*$/.test($scope.MNAME)) {
        //        return true;
        //    }
        //    else {
        //        alert("Invalid Mothername")
        //        return (false)
        //    }
        //}
        //$scope.father_name = /^[a-zA-Z5-9]+$/;
        $scope.ph_numbr = /^\+?\d{10}$/;
        $scope.resendMobileOTP = false;

        $scope.checkDate = function (DOB_DATE) {
            var currentDate = new Date();
            var birthdate = new Date(DOB_DATE);
            if (birthdate > currentDate) {
                alert('Selected Date Should not be Future!')
                $scope.DOB_DATE = null;
                return;
            } else {
                $scope.DOB_DATE = DOB_DATE;
            }


        };

        $scope.Blind = function (IsBlind) {
            if (IsBlind == 0) {
                $('#stdMedicalCertFile').val(null);

                $scope.stdMedicalCert = '';
                $scope.stdMedicalCert = null;
                $scope.IsBlind = IsBlind;
                $scope.CheckBox = false;
            }
            else if (IsBlind == 1) {
                $scope.IsBlind = IsBlind;
                $scope.CheckBox = true;
            }
            else {
                $scope.CheckBox = false;
            }
        }


        $scope.ValidateEmail = function () {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)sendmail*$/.test($scope.email)) {
                return (true)
            }
            alert("You have entered an invalid email address!")
            return (false)
        }

        $scope.ValidateMobileNumber = function () {

            if (/^[6-9]\d{9}$/gi.test($scope.mobileNO)) {
                return (true)
            }

            else if ($scope.mobileNO == null || $scope.mobileNO == undefined) {
                alert("Please Enter Mobile Number");
                return (false)
            }
            else if ($scope.mobileNO.length != '10') {
                alert('Enter valid Mobile number');
                return (false)
            }
            else {
                alert('Enter valid Mobile number');
                return (false)
            }

        }

        $scope.coursedetails = true;



        $scope.Mode = function () {

            if ($scope.mode == 1) {
                $scope.getsscbutton = true;
                $scope.sscHtLbl = 'SSC Hallticket Number';
                $scope.passYrLbl = 'Passedout Year';
                $scope.sscHtPhl = 'Hallticket No';

            } else if ($scope.mode == 2) {
                $scope.nextbutton = true;
                $scope.sscHtLbl = ' SSC or Equivalent RollNo';
                $scope.passYrLbl = 'Pass Year';
                $scope.sscHtPhl = 'SSC/Equivalent HallTicket no';
            }

            $scope.cancel = true;
            $scope.SscForm = true;
            $scope.applicationForm = false;

            $scope.sscHallticket = null;
            $scope.passedoutYear = null;
            $scope.sscType = null;

        }

        $scope.Next = function (sscHallticket, passedoutYear, sscType) {
            if (sscHallticket == '' || sscHallticket == null || sscHallticket == undefined) {
                alert("SSC HallTicket number can't be Empty");
                return;
            }
            if (passedoutYear == '' || passedoutYear == null || passedoutYear == undefined) {
                alert("SSC passedout year can't be Empty");
                return;
            }

            if (sscType == '' || sscType == null || sscType == undefined) {
                alert("Stream can't be Empty");
                return;
            }
            alert("Continue to fillApplication");
            $scope.nextbutton = false;
            $scope.cancel = false;
            $scope.radiodisable = true;
            $scope.Add = true;
            $scope.applicationForm = true;
            $scope.SSCDetails = false;
            $scope.sscForm = true;
            isSSCValidiated = false;

        }


        $scope.GetCcicCoursesByInstitution = function (InstitutionID) {

            var GetCcicCoursesByInstitution = CcicPreExaminationService.GetCcicCoursesByInstitution(InstitutionID);
            GetCcicCoursesByInstitution.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.GetCcicCoursesByInstitution = res;
                }
                else {
                    $scope.GetCcicCoursesByInstitution = [];
                }

                $scope.AffiliatedInsttitutionCourses = res;


            },
                function (error) {
                    alert("error while loading Courses");
                    var err = JSON.parse(error);

                });
        }

        $scope.GetCcicCourseQualifications = function (CourseID) {


            var getCcicCourseQualifications = CcicPreExaminationService.GetCcicCourseQualifications(CourseID);
            getCcicCourseQualifications.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.GetCcicCourseQualificationInfo = res;
                }
                else {
                    $scope.GetCcicCourseQualificationInfo = [];
                }

                $scope.CourseQualifications = res;

            },
                function (error) {
                    alert("error while loading Qualifications");
                    var err = JSON.parse(error);

                });

        }


        $scope.GetCcicCourseExperience = function (CourseQualificationDetails) {
            try {
                var CourseQualificationDetails = JSON.parse(CourseQualificationDetails);
            }
            catch (err) { }


            $scope.StudentCertificateType = CourseQualificationDetails.Qualification;
            $scope.isExperienced = CourseQualificationDetails.Experience;
            if ($scope.StudentCertificateType == 'SSC/10th Class or Its Equivalent') {
                $scope.StudentSscCertificate = false;

            }
            else {
                $scope.StudentSscCertificate = true;
            }
            $scope.CourseQualificationId = CourseQualificationDetails.CourseQualificationsID;

            var getCcicCourseExperience = CcicPreExaminationService.GetCcicCourseExperience($scope.CourseQualificationId);
            getCcicCourseExperience.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.GetCcicCourseExperienceInfo = res;
                }
                else {
                    $scope.GetCcicCourseExperienceInfo = [];
                }



            },
                function (error) {
                    alert("error while loading Experience");
                    var err = JSON.parse(error);

                });
        }



        $scope.uploadMedicalCert = function () {
            var input = document.getElementById("stdMedicalCertFile");
            var fileSize = input.files[0].size;
            console.log(fileSize);
            if (fileSize <= 200000 && fileSize >= 100000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdMedicalCert').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.stdMedicalCert = base64Image;
                            $scope.stdMedicalCertConvert = $scope.stdMedicalCert.replace(/^data:image\/[a-z]+;base64,/, "");
                        });

                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else if (fileSize <= 200000) {
                alert("file size should not be less than 200KB");
                $('#stdMedicalCertFile').val('');
                return;
            } else if (fileSize >= 100000) {
                alert("file size should not be greater than 100KB");
                $('#stdMedicalCertFile').val('');
                return;
            } else {
                alert("file size should be between 100KB and 200KB");
                $('#stdMedicalCertFile').val('');
                return;
            }
        }



        $scope.Reset = function () {
            $scope.continuebutton = true;
            $scope.reset = false;
            $scope.Course = null;
            $scope.Qualification = null;
            $scope.Experience = null;
            $scope.ExperienceDescription = '';
            $scope.GetCcicCourseExperienceInfo = [];
            $scope.radiodisable = false;
            $scope.SSCDetails = false;


            $scope.mode = null;
            $scope.sscHallticket = '';
            $scope.passedoutYear = '';
            $scope.sscType = '';


            $scope.CNAME = '';
            $scope.FNAME = '';
            $scope.MNAME = '';
            $scope.DOB_DATE = '';
            $scope.SEX = '';

            $scope.CandidateNamefound = false;
            $scope.FatherNameFound = false;
            $scope.MotherNamefound = false;
            $scope.Genderfound = false;

            $scope.Aadhar = '';
            $scope.houseNo = '';
            $scope.street = '';
            $scope.landmark = '';
            $scope.village = '';
            $scope.pincode = '';
            $scope.district = '';
            $scope.state = '';
            $scope.mobileNO = '';
            $scope.email = '';

            $scope.StudentPhoto = '';
            $scope.StudentSign = '';
            $scope.StudentSscCertificate = '';
            $scope.stdCertificateType = '';
            $scope.isExperienced = '';

            $scope.continue = false;
            $scope.showEducation = false;
            $scope.applicationForm = false;
            $scope.SscForm = false;



        }

        $scope.Cancel = function () {
            $scope.nextbutton = true;
            $scope.getsscbutton = true;
            //$scope.radiodisable = false;
            $scope.SSCDetails = false;
            $scope.radiodisable = false;
            $scope.SscForm = false;
            //$scope.mode = null;
            $scope.sscHallticket = '';
            $scope.passedoutYear = '';
            $scope.sscType = '';



            $scope.CNAME = '';
            $scope.FNAME = '';
            $scope.MNAME = '';
            $scope.DOB_DATE = '';
            $scope.SEX = '';

            $scope.CandidateNamefound = false;
            $scope.FatherNameFound = false;
            $scope.MotherNamefound = false;
            $scope.Genderfound = false;
            $scope.Aadhar = '';
            $scope.houseNo = '';
            $scope.street = '';
            $scope.landmark = '';
            $scope.village = '';
            $scope.pincode = '';
            $scope.district = '';
            $scope.state = '';
            $scope.mobileNO = '';
            $scope.email = '';

            $scope.SscForm = true;
            $scope.applicationForm = false;
            $scope.continue = true;
            $scope.SSCDetails = false;






        }

        $scope.Cancel3 = function () {

            $scope.radiodisable = false;
            $scope.mode = null;

            $scope.SscForm = true;

            $scope.applicationForm = false;



            $scope.CNAME = '';
            $scope.FNAME = '';
            $scope.MNAME = '';
            $scope.DOB_DATE = '';
            $scope.SEX = '';
            $scope.Aadhar = '';
            $scope.houseNo = '';
            $scope.street = '';
            $scope.landmark = '';
            $scope.village = '';
            $scope.pincode = '';
            $scope.district = '';
            $scope.state = '';
            $scope.mobileNO = '';
            $scope.email = '';


            $scope.Submitted3 = false;
        }

        $scope.Continue = function () {

       
            var VerifyDate = CcicPreExaminationService.VerifyEnrollmentDate($scope.Course);
            VerifyDate.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch { err}
                if (res[0].ResponseCode == '200') {
                    if ($scope.Course == '' || $scope.Course == undefined || $scope.Course == null) {
                        alert('Please Select Course')
                        return;
                    }

                    if ($scope.Qualification == '' || $scope.Qualification == undefined || $scope.Qualification == null) {
                        alert('Please Select Qualification')
                        return;
                    }

                    if ($scope.GetCcicCourseExperienceInfo.length > 0 && ($scope.Experience == null || $scope.Experience == undefined || $scope.Experience == '')) {
                        alert('Please Select Experience')
                        return;
                    }


                    $scope.continuebutton = false;
                    $scope.continue = true;
                    alert('Please Scroll down to fill Details')
                    $scope.showEducation = true;

                } else {
                    alert('Enrollment Dates Are Not Found')
                    return;
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })

            

        }


        $scope.Modify = function (ApplicationNumber, StudentId) {

            $localStorage.TempData1 = {
                ApplicationNumber: ApplicationNumber,
                StudentId: StudentId



            };

            $state.go('CcicDashboard.Academic.EditStuDetails');


        }

        $scope.SaveNext = function () {
            if ($scope.CNAME == '' || $scope.CNAME == undefined || $scope.CNAME == null) {
                alert('Please Select CandidateName')
                return;
            }

            if ($scope.FNAME == '' || $scope.FNAME == undefined || $scope.FNAME == null) {
                alert('Please Select FatherName')
                return;
            }


            if ($scope.MNAME == '' || $scope.MNAME == undefined || $scope.MNAME == null) {
                alert('Please Select MotherName')
                return;
            }


            if ($scope.DOB_DATE == '' || $scope.DOB_DATE == undefined || $scope.DOB_DATE == null) {
                alert('Please Select CandidateDOB')
                return;
            }

            if ($scope.SEX == '' || $scope.SEX == undefined || $scope.SEX == null) {
                alert('Please Select Gender')
                return;
            }
            if ($scope.IsBlind == '' || $scope.IsBlind == undefined || $scope.IsBlind == null) {
                alert('Please Select IsBlind ')
                return;
            }

            if ($scope.houseNo == '' || $scope.houseNo == undefined || $scope.houseNo == null) {
                alert('Please Select houseNo')
                return;
            }

            if ($scope.street == '' || $scope.street == undefined || $scope.street == null) {
                alert('Please Select street')
                return;
            }

            if ($scope.village == '' || $scope.village == undefined || $scope.village == null) {
                alert('Please Select village')
                return;
            }

            if ($scope.mobileNO == '' || $scope.mobileNO == undefined || $scope.mobileNO == null) {
                alert('Please Select Mobile Number')
                return;
            }

            if ($scope.pincode == '' || $scope.pincode == undefined || $scope.pincode == null) {
                alert('Please Select Pincode')
                return;
            }

            //if ($scope.district == '' || $scope.district == undefined || $scope.district == null) {
            //    alert('Please Select District')
            //    return;
            //}


            //if ($scope.state == '' || $scope.state == undefined || $scope.state == null) {
            //    alert('Please Select State')
            //    return;
            //}


            //if ($scope.email == '' || $scope.email == undefined || $scope.email == null) {
            //    alert('Please Select Email')
            //    return;
            //}



            if ($scope.StudentPhoto == '' || $scope.StudentPhoto == undefined || $scope.StudentPhoto == null) {
                alert('Please Select StudentPhoto')
                return;
            }


            if ($scope.StudentSign == '' || $scope.StudentSign == undefined || $scope.StudentSign == null) {
                alert('Please Select StudentSign')
                return;
            }


            if ($scope.stdCertificateType == '' || $scope.stdCertificateType == undefined || $scope.stdCertificateType == null) {
                alert('Please Select Qualification Certificate')
                return;
            }
            if (($scope.stdMedicalCert == undefined || $scope.stdMedicalCert == "" || $scope.stdMedicalCert == null) && $scope.IsBlind == 1) {
                alert("Please Upload Medical Certificate");
                return;
            }

            if ($scope.IsBlind == 1) {
                $scope.CheckBox = true;
            }
            else {
                $scope.CheckBox = false;
            }

            if ($scope.IsBlind == 1 && ($scope.Checkbox == undefined || $scope.Checkbox == "" || $scope.Checkbox == null)) {
                alert("Please agree terms and conditions .");
                return;
            }
            var getappnumber = CcicPreExaminationService.GetApplicationNumber();
            getappnumber.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.ApplicationData = res[0];
                    $scope.ApplicationNumber = $scope.ApplicationData.ApplicationNumber
                    $scope.AddDetails();
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

        $scope.AddDetails = function () {
            $scope.Change = false;
            $scope.Add = true;



            //if ($scope.StudentSscCertificate == '' || $scope.StudentSscCertificate == undefined || $scope.StudentSscCertificate == null) {
            //    alert('Please Select SSC Certificate')
            //    return;
            //}


            /*console.log($scope.stdPhoto);*/
            isSSC = $scope.mode == 1 ? 1 : 0;
            $scope.LoadImg = true;
            $scope.continue = false;
            $scope.showEducation = false;
            $scope.applicationForm = false;
            $scope.SscForm = false;
            $scope.coursedetails = false;
            $scope.ShowDetails = false;


            //var EncriptedAadhar = $crypto.encrypt($crypto.encrypt($scope.Aadhar, 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
            let sscHallticket = ($scope.sscHallticket == null || $scope.sscHallticket == undefined || $scope.sscHallticket == '') ? '' : $scope.sscHallticket;

            let passedoutYear = ($scope.passedoutYear == null || $scope.passedoutYear == undefined || $scope.passedoutYear == '') ? '' : parseInt($scope.passedoutYear);
            let sscType = ($scope.sscType == null || $scope.sscType == undefined || $scope.sscType == '') ? '' : $scope.sscType;

            let CourseExp = ($scope.Experience == null || $scope.Experience == undefined || $scope.Experience == '') ? null : parseInt($scope.Experience);
            //let SscCer = ($scope.stdSscCertificate == null || $scope.stdSscCertificate == undefined || $scope.stdSscCertificate == '') ? '' : $scope.stdSscCertificate;
            //let StdCerType = ($scope.stdCertificateType == null || $scope.stdCertificateType == undefined || $scope.stdCertificateType == '') ? '' : $scope.stdCertificateType;
            //let StdExpCer = ($scope.stdExperienceCertificate == null || $scope.stdExperienceCertificate == undefined || $scope.stdExperienceCertificate == '') ? '' : $scope.stdExperienceCertificate;
            let appNum = ($scope.ApplicationNumber == null || $scope.ApplicationNumber == undefined || $scope.ApplicationNumber == '') ? '' : $scope.ApplicationNumber;
            let MName = ($scope.MNAME == null || $scope.MNAME == undefined || $scope.MNAME == '') ? '' : $scope.MNAME;
            let Aadhar = ($scope.Aadhar == null || $scope.Aadhar == undefined || $scope.Aadhar == '') ? '' : $scope.Aadhar;
            var paramObj = {
                "ApplicationNumber": appNum,
                "InstitutionID": authData.InstitutionID,
                "CourseID": parseInt($scope.Course),
                "CourseQualificationID": $scope.CourseQualificationId,
                "CourseExperienceID": CourseExp,
                "SSC": isSSC,
                "SSCHallticketNumber": sscHallticket,
                "SSCPassedYear": passedoutYear,
                "SSCPassedType": sscType,
                "StudentName": $scope.CNAME,
                "FatherName": $scope.FNAME,
                "MotherName": MName,
                //"DateofBirth": moment($scope.DOB_DATE).format("DD-MM-YYYY"),
                //"DateofBirth": $scope.DOB_DATE,
                "DateofBirth": moment($scope.DOB_DATE).format("YYYY-MM-DD"),
                "SSCDateofBirth": "",
                "Gender": $scope.SEX,
                "AadharNumber": Aadhar,
                "HouseNumber": $scope.houseNo,
                "Street": $scope.street,
                "Landmark": $scope.landmark,
                "Village": $scope.village,
                "Pincode": $scope.pincode,
                "District": $scope.district,
                "AddressState": $scope.state,
                "StudentMobile": $scope.mobileNO,
                "StudentEmail": $scope.email,
                "SSCValidated": isSSCValidiated,
                "UserName": $scope.UserName,
                "StudentPhoto": ($scope.StudentPhotoConvert == undefined || $scope.StudentPhotoConvert == null) ? '' : $scope.StudentPhotoConvert,
                "StudentSign": ($scope.StudentSignConvert == undefined || $scope.StudentSignConvert == null) ? '' : $scope.StudentSignConvert,
                "SSCCertificate": ($scope.StudentSscCertificateConvert == undefined || $scope.StudentSscCertificateConvert == null) ? '' : $scope.StudentSscCertificateConvert,
                "QualificationCertificate": ($scope.stdCertificateTypeConvert == undefined || $scope.stdCertificateTypeConvert == null) ? '' : $scope.stdCertificateTypeConvert,
                "ExperienceCertificate": ($scope.isExperiencedConvert == undefined || $scope.isExperiencedConvert == null) ? '' : $scope.isExperiencedConvert,
                "BlindCertificate": ($scope.stdMedicalCertConvert == undefined || $scope.stdMedicalCertConvert == null) ? '' : $scope.stdMedicalCertConvert,
                "IsBlind": ($scope.IsBlind == 1) ? true : false

            };
            var addstddetails = CcicPreExaminationService.AddStudentDetails(paramObj);
            addstddetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {

                    $scope.LoadImg = true;
                    $scope.ApplicationNumber = res[0].ApplicationNumber;
                    $scope.StudentId = res[0].StudentID;
                    $scope.ApplicationStatus = res[0].ApplicationStatus;
                    $scope.ViewStudentDetails(res[0].ApplicationNumber, res[0].StudentID, res[0].ApplicationStatus);
                    /* $state.go('CcicDashboard.Academic.ViewStudentDetails')*/
                    //$scope.PreviewStudentDetails(res[0].ApplicationNumber, res[0].StudentID);
                    alert(res[0].ResponseDescription);
                }

                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.LoadImg = false;
                    $state.go('CcicDashboard.Academic.ViewStudentDetails');
                }

                else {
                    alert('Something Went Wrong')
                    $scope.LoadImg = false;
                }



            }, function (error) {

                var err = JSON.parse(error);
            })

            $scope.continue = false;
            $scope.showEducation = false;
            $scope.applicationForm = false;
            $scope.SscForm = false;
            $scope.coursedetails = false;

        }



        $scope.ViewStudentDetails = function (ApplicationNumber, StudentId, ApplicationStatus) {
            $localStorage.TempData1 = {
                ApplicationNumber: ApplicationNumber,
                StudentId: StudentId,
                ApplicationStatus: ApplicationStatus

            }
            $state.go('CcicDashboard.Academic.ViewStudentDetails');

        }

        $scope.uploadStudentPhoto = function () {
            var input = document.getElementById("stdPhotoFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 100000 && fileSize >= 5000) {
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
                            $scope.StudentPhoto = base64Image;
                            $scope.StudentPhotoConvert = $scope.StudentPhoto.replace(/^data:image\/[a-z]+;base64,/, "");

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 5000) {
                alert("file size should not be less than 5KB");
                $('#stdPhotoFile').val('');
                return;
            } else if (fileSize >= 50000) {
                alert("file size should not be greater than 100KB");
                $('#stdPhotoFile').val('');
                return;
            } else {
                alert("file size should be between 5KB and 100KB");
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


        $scope.uploadStudentSign = function () {
            var input = document.getElementById("stdSignFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 50000 && fileSize >= 3000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdSignImg').attr('src', e.target.result);

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
                            $scope.StudentSign = base64Image;
                            $scope.StudentSignConvert = $scope.StudentSign.replace(/^data:image\/[a-z]+;base64,/, "");

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 5000) {
                alert("file size should not be less than 3KB");
                $('#stdSignFile').val('');
                return;
            } else if (fileSize >= 50000) {
                alert("file size should not be greater than 50KB");
                $('#stdSignFile').val('');
                return;
            } else {
                alert("file size should be between 3KB and 50KB");
                $('#stdSignFile').val('');
                return;
            }
        }


        $scope.uploadStudentSscCertificate = function () {
            var input = document.getElementById("stdSscCertificateFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 2000000 && fileSize >= 100000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdSscCertificateImg').attr('src', e.target.result);

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
                            $scope.StudentSscCertificate = base64Image;
                            $scope.StudentSscCertificateConvert = $scope.StudentSscCertificate.replace(/^data:image\/[a-z]+;base64,/, "");

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 100000) {
                alert("file size should not be less than 100KB");
                $('#stdSscCertificateFile').val('');
                return;
            } else if (fileSize >= 2000000) {
                alert("file size should not be greater than 2MB");
                $('#stdSscCertificateFile').val('');
                return;
            } else {
                alert("file size should be between 100KB and 2MB");
                $('#stdSscCertificateFile').val('');
                return;
            }
        }



        $scope.uploadStudentCertificateType = function () {
            var input = document.getElementById("stdCertificateTypeFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 2000000 && fileSize >= 100000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdCertificateTypeImg').attr('src', e.target.result);

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
                            $scope.stdCertificateType = base64Image;
                            $scope.stdCertificateTypeConvert = $scope.stdCertificateType.replace(/^data:image\/[a-z]+;base64,/, "");

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 100000) {
                alert("file size should not be less than 100KB");
                $('#stdCertificateTypeFile').val('');
                return;
            } else if (fileSize >= 2000000) {
                alert("file size should not be greater than 2MB");
                $('#stdCertificateTypeFile').val('');
                return;
            } else {
                alert("file size should be between 100KB and 2MB");
                $('#stdCertificateTypeFile').val('');
                return;
            }
        }

        $scope.uploadStudentExperienceCertificate = function () {
            var input = document.getElementById("stdExperienceCertificateFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 2000000 && fileSize >= 100000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdExperienceCertificateImg').attr('src', e.target.result);

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
                            $scope.isExperienced = base64Image;
                            $scope.isExperiencedConvert = $scope.isExperienced.replace(/^data:image\/[a-z]+;base64,/, "");

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 100000) {
                alert("file size should not be less than 100KB");
                $('#stdExperienceCertificateFile').val('');
                return;
            } else if (fileSize >= 2000000) {
                alert("file size should not be greater than 2MB");
                $('#stdExperienceCertificateFile').val('');
                return;
            } else {
                alert("file size should be between 100KB and 2MB");
                $('#stdExperienceCertificateFile').val('');
                return;
            }
        }


        $scope.getsscDetails = function (sscHallticket, passedoutYear, sscType) {
            if (sscHallticket == '' || sscHallticket == null || sscHallticket == undefined) {
                alert("SSC HallTicket number can't be Empty");
                return;
            }
            if (passedoutYear == '' || passedoutYear == null || passedoutYear == undefined) {
                alert("SSC passedout year can't be Empty");
                return;
            }

            if (sscType == '' || sscType == null || sscType == undefined) {
                alert("Stream can't be Empty");
                return;
            }

            $scope.loading = true;

            $scope.hallticket = true;
            $scope.year = true;
            $scope.Ssc = true;
            $scope.Add = true;
            $scope.SSCDetails = true;
            $scope.Save = true;
            $scope.radiodisable = true;
            $scope.cancel = false;


            //$scope.Tenth_HNo = Tenth_HNo;
            //$scope.Tenth_Year = Tenth_Year;
            //$scope.Stream = Stream;
            var reqData = {
                RollNo: sscHallticket,
                Year: passedoutYear,
                Stream: sscType
            };

            var sscdetails = CcicPreExaminationService.getSSCDetails(reqData);
            sscdetails.then(function (res) {
                if (res) {

                    let resdata = JSON.parse(res)
                    if (resdata.Status == 200) {
                        $scope.getsscbutton = false;
                        $scope.applicationForm = true;
                        $scope.loading = false;
                        $scope.LoadImg = false;
                        isSSCValidiated = true;


                        $scope.CNAME = resdata.Name;
                        $scope.CandidateNamefound = $scope.CNAME != "" ? true : false;
                        $scope.FNAME = resdata.FatherName;
                        $scope.FatherNameFound = $scope.FNAME != "" ? true : false;
                        $scope.MNAME = resdata.MotherName;
                        $scope.MotherNamefound = $scope.MNAME != "" ? true : false;

                        $scope.SEX = resdata.Sex == "B" || resdata.Sex == "M" ? "M" : resdata.Sex == "G" || resdata.Sex == "F" ? "F" : "";
                        $scope.Genderfound = $scope.SEX != "" ? true : false;
                        let date1 = resdata.DateOfBirth;
                        let ch = date1.split('');
                        var datelength = ch.length;
                        //    var tempdate = "";                             
                        //    var regex = "^[0-9]{1,6}$";
                        //    if (datelength<=6) {                      
                        //        if (parseInt(ch[4] + ch[5]) <= 99 && parseInt(ch[4] + ch[5]) > 80) {
                        //            tempdate = ch[0] + ch[1] + "/" + ch[2] + ch[3] + "/19" + ch[4] + ch[5];
                        //        } else {
                        //            tempdate = ch[0] + ch[1] + "/" + ch[2] + ch[3] + "/20" + ch[4] + ch[5];
                        //        }
                        //    }
                        //    else if (datelength <= 8 && datelength >= 6){                               
                        //        tempdate = ch[0] + ch[1] + "/" + ch[2] + ch[3] + "/" + ch[4] + ch[5] + ch[6] + ch[7];                               
                        //}          

                        //    else {
                        //        tempdate = resdata.DateOfBirth;                        

                        //    }                           
                        //    $scope.DOB_DATE = tempdate;
                        //    $scope.DOB_DATEChange = tempdate;
                        //    $scope.CandidateNameDOBfound = $scope.CandidateNameDOB != "" ? true : false;

                        $scope.sscForm = false;
                        $scope.cancel = false;

                    } else {
                        $scope.getsscbutton = false;
                        $scope.loading = false;
                        alert("Details not found, Continue to fillApplication");
                        $scope.applicationForm = true;
                        $scope.sscForm = false;
                        isSSCValidiated = false;
                        $scope.cancel = false;


                    }

                } else {
                    $scope.getsscbutton = false;
                    $scope.loading = false;
                    alert("Details not found, Continue to fillApplication");
                    $scope.applicationForm = true;
                    $scope.sscForm = false;
                    isSSCValidiated = false;
                    $scope.cancel = false;


                }


            }, function (err) {
                $scope.getsscbutton = false;
                $scope.loading = false;
                alert("Details not found, Continue to fillApplication");
                $scope.applicationForm = true;
                $scope.sscForm = false;
                isSSCValidiated = false;
            })


        }


    })
})
