define(['app'], function (app) {
    app.controller("EditStudentDetailsController", function ($scope,CcicSystemUserService, $localStorage, $state, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        var tempData1 = $localStorage.TempData1;
        $scope.InstitutionID = authData.InstitutionID;


        const $ctrl = this;
        $ctrl.$onInit = () => {
            //$scope.GetCcicCoursesByInstitution(authData.InstitutionID);
            $scope.Mode();
            $scope.nextbutton = false;
            $scope.sscdetbutton = false;
            $scope.coursedetails = true;
            $scope.showEducation = true;
            $scope.radiodisable = true;
            $scope.Modify();
            /*$scope.EditStudentDetails();*/
        }


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

        var data = {};
        $scope.$emit('showLoading', data);


        $scope.Blind = function (IsBlind) {
            if (IsBlind =='false') {
                $('#stdMedicalCertFile').val(null);

                $scope.stdMedicalCert = '';
                $scope.stdMedicalCert = null;
                $scope.EditData.BlindCertificate == '';
                //$scope.NewIsBlind = false;
                $scope.ShowCheckBox = false;
            }
            else if (IsBlind == 'true') {
                $('#stdMedicalCertFile').val(null);
                $scope.stdMedicalCert = '';
                $scope.stdMedicalCert = null;
                $scope.EditData.BlindCertificate == '';
                //$scope.NewIsBlind = true;
                $scope.ShowCheckBox = true;
            }
            else {
                $scope.ShowCheckBox = false;
            }
        }

        $scope.SelectCheckbox = function (Checkbox) {
            if (Checkbox == true) {
                $scope.Checkbox = true;
            }
            else {
                $scope.Checkbox = false;
            }
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
                            $scope.EditData.BlindCertificate = base64Image;
                            $scope.stdMedicalCertConvert = $scope.EditData.BlindCertificate.replace(/^data:image\/[a-z]+;base64,/, "");
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

        $scope.Mode = function () {

            if ($scope.SSC == 1) {
                $scope.sscHtLbl = 'SSC Hallticket Number';
                $scope.passYrLbl = 'Passedout Year';
                $scope.sscHtPhl = 'Hallticket No';
                //$scope.sscGetLbl = 'Get Details';
                $scope.SSCDetails = false;
                $scope.sscdetails = true;
                $scope.applicationForm = true;
                $scope.sscdetbutton = true;
                $scope.nextbutton = false;

                //$scope.sscdetbutton = true;




            } else {
                $scope.sscHtLbl = 'SSC or Equivalent RollNo';
                $scope.passYrLbl = 'Pass Year';
                $scope.sscHtPhl = 'SSC/Equivalent HallTicket no';
                //    $scope.sscGetLbl = 'Next';
                $scope.radiodisable = false;
                $scope.sscdetails = true;
                $scope.SSCDetails = false;
                $scope.applicationForm = true;
                $scope.nextbutton = true;
                $scope.sscdetbutton = false;

                

            }

            //$scope.cancel = true;
            //$scope.SscForm = true;
            ////$scope.applicationForm = false;

            //$scope.sscHallticket = null;
            //$scope.passedoutYear = null;
            //$scope.sscType = null;

        }

        $scope.Cancel = function () {
            $scope.Mode();
            //$scope.radiodisable = false;
            $scope.SSCDetails = false;
            $scope.radiodisable = false;
            $scope.SscForm = false;
            //$scope.mode = null;
            //$scope.SSCHallticketNumber = '';
            //$scope.SSCPassedYear = '';
            //$scope.SSCPassedType = '';
            $scope.sscdetails = false;



            //$scope.CNAME = '';
            //$scope.FNAME = '';
            //$scope.MNAME = '';
            //$scope.DOB_DATE = '';
            //$scope.SEX = '';
            //$scope.Aadhar = '';
            //$scope.houseNo = '';
            //$scope.street = '';
            //$scope.landmark = '';
            //$scope.village = '';
            //$scope.pincode = '';
            //$scope.district = '';
            //$scope.state = '';
            //$scope.mobileNO = '';
            //$scope.email = '';

            $scope.SscForm = true;
            $scope.applicationForm = true;
            $scope.continue = true;
            $scope.SSCDetails = false;






        }

      
            $scope.getsscDetails = function (SSCHallticketNumber, SSCPassedYear, SSCPassedType) {
                if (SSCHallticketNumber == '' || SSCHallticketNumber == null || SSCHallticketNumber == undefined) {
                alert("SSC HallTicket number can't be Empty");
                return;
            }
                if (SSCPassedYear == '' || SSCPassedYear == null || SSCPassedYear == undefined) {
                alert("SSC passedout year can't be Empty");
                return;
            }

                if (SSCPassedType == '' || SSCPassedType == null || SSCPassedType == undefined) {
                alert("Stream can't be Empty");
                return;
            }



            //$scope.SSCHallticketNumber = true;
            //$scope.SSCPassedYear = true;
            //$scope.SSCPassedType = true;
            $scope.Add = true;
            $scope.SSCDetails = true;
            $scope.Save = true;
            $scope.radiodisable = true;
            $scope.cancel = false;


            //$scope.Tenth_HNo = Tenth_HNo;
            //$scope.Tenth_Year = Tenth_Year;
            //$scope.Stream = Stream;
            var reqData = {
                RollNo: SSCHallticketNumber,
                Year: SSCPassedYear,
                Stream: SSCPassedType
            };

            var sscdetails = CcicPreExaminationService.getSSCDetails(reqData);
            sscdetails.then(function (res) {
                if (res) {

                    let resdata = JSON.parse(res)
                    if (resdata.Status == 200) {
                        $scope.applicationForm = true;

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
                        alert("Details not found, Continue to fillApplication");
                        $scope.applicationForm = true;
                        $scope.sscForm = false;
                        isSSCValidiated = false;
                        $scope.cancel = false;


                    }

                } else {
                    alert("Details not found, Continue to fillApplication");
                    $scope.applicationForm = true;
                    $scope.sscForm = false;
                    isSSCValidiated = false;
                    $scope.cancel = false;


                }


            }, function (err) {
                alert("Details not found, Continue to fillApplication");
                $scope.applicationForm = true;
                $scope.sscForm = false;
                isSSCValidiated = false;
            })


        }


        $scope.Next = function (SSCHallticketNumber, SSCPassedYear, SSCPassedType) {
            if (SSCHallticketNumber == '' || SSCHallticketNumber == null || SSCHallticketNumber == undefined) {
                alert("SSC HallTicket number can't be Empty");
                return;
            }
            if (SSCPassedYear == '' || SSCPassedYear == null || SSCPassedYear == undefined) {
                alert("SSC passedout year can't be Empty");
                return;
            }

            if (SSCPassedType == '' || SSCPassedType == null || SSCPassedType == undefined) {
                alert("Stream can't be Empty");
                return;
            }
            alert("Continue to fillApplication");
            $scope.cancel = false;
            $scope.radiodisable = true;
            $scope.sscdetails = true;
            $scope.Add = true;
            $scope.applicationForm = true;
            $scope.SSCDetails = false;
            $scope.sscForm = true;
            isSSCValidiated = false;

        }


      


        $scope.SubmitStdDetails = function () {
            var submitstddetails = CcicPreExaminationService.SubmitStdDetails($scope.ApplicationNumber, $scope.StudentId);
            submitstddetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $state.go('CcicDashboard.Academic.Enrollment');
                    $scope.coursedetails = true;
                    $scope.Course = null;
                    $scope.Qualification = null;
                    $scope.Experience = null;
                    $scope.ExperienceDescription = null;
                    $scope.GetCcicCourseExperienceInfo = [];
                    //$scope.hallticket = false;
                    //$scope.year = false;
                    //$scope.Ssc = false;

                    $scope.reset = false;
                    $scope.cancel = false;

                    $scope.continue = false;
                    $scope.SSCDetails = false;
                    $scope.Submitted3 = false;
                    //$scope.Save = false;
                    //$scope.Update = false;

                    $scope.showEducation = false;
                    $scope.SscForm = false;
                    //$scope.coursedetail = false;
                    isSSCValidiated = false;
                    $scope.ShowDetails = false;
                    $scope.radiodisable = false;
                    $scope.coursedetails = true;
                    $scope.LoadImg = false;
                    $scope.ApplicationNumber = '';
                    // $scope.Course = 6;


                    $scope.StudentSscCertificate = false;


                    $scope.mode = null;
                    //$scope.sscHallticket = null;
                    //$scope.passedoutYear = null;
                    //$scope.sscType = null;


                    $scope.CandidateName = null;
                    $scope.FatherName = null;
                    $scope.MotherName = null;
                    $scope.CandidateNameDOB = null;
                    $scope.Gender = null;
                    $scope.Aadhar = null;
                    $scope.houseNo = null;
                    $scope.street = null;
                    $scope.landmark = null;
                    $scope.village = null;
                    $scope.pincode = null;
                    $scope.district = null
                    $scope.state = null;
                    $scope.mobileNO = null;
                    $scope.email = null;

                }

                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                }

                else {
                    alert('Something Went Wrong')
                }
            }, function (error) {
                var err = JSON.parse(error);
            });
        }

        $scope.BlindValues = [{ "Id": "Yes", "value": true }, { "Id": "No", "value": false }]
        $scope.Modify = function () {

            $scope.loading = true;
            $scope.coursedetails = true;
            //$scope.sscdetails = true;
            $scope.radiodisable = true;

            var editstddetails = CcicPreExaminationService.GetStudentDetails(tempData1.ApplicationNumber, tempData1.StudentId);
            editstddetails.then(function (response) {
                try {
                    var editRes = JSON.parse(response);
                }
                catch (err) { }
                $scope.coursedetails = true;
                $scope.SscForm = true;
                $scope.showEducation = true;
                $scope.applicationForm = true;
                $scope.loading = false;
                /*$scope.EditData = editRes[0];*/
                $scope.EditData = editRes.Table[0];


                if ($scope.EditData.IsBlind == false) {
                    $scope.ShowCheckBox == false;
                }
                else if ($scope.EditData.IsBlind == true) {
                    $scope.ShowCheckBox == true;
                }


                $scope.ApplicationNumber = tempData1.ApplicationNumber;

                if ($scope.SSCValidated == 1) {
                    $scope.CandidateNamefound = true;
                    $scope.FatherNameFound = true;
                    $scope.MotherNamefound = true;
                    $scope.Genderfound = true;
                }
                else {

                    $scope.CandidateNamefound = false;
                    $scope.FatherNameFound = false;
                    $scope.MotherNamefound = false;
                    $scope.Genderfound = false;

                }
                
                $scope.toDataURL($scope.EditData.StudentPhoto, function (res) {
                    $scope.StudentPhotoConvert = res.replace(/^data:image\/[a-z]+;base64,/, "");
                })

                $scope.toDataURL($scope.EditData.StudentSign, function (res) {
                    $scope.StudentSignConvert = res.replace(/^data:image\/[a-z]+;base64,/, "");
                })


                $scope.toDataURL($scope.EditData.SSCCertificate, function (res) {
                    if ($scope.EditData.SSCCertificate == "") {
                        $scope.SSCCertificateConvert = "";
                    }
                    else {
                        $scope.SSCCertificateConvert = res.replace(/^data:image\/[a-z]+;base64,/, "");
                    }
                })

                $scope.toDataURL($scope.EditData.QualificationCertificate, function (res) {
                    if ($scope.EditData.QualificationCertificate == "") {
                        $scope.QualificationCertificateConvert = "";
                    }
                    else {
                        $scope.QualificationCertificateConvert = res.replace(/^data:image\/[a-z]+;base64,/, "");

                    }
                })

                $scope.toDataURL($scope.EditData.ExperienceCertificate, function (res) {
                    if ($scope.EditData.ExperienceCertificate == "") {
                        $scope.ExperienceCertificateConvert = "";
                    }
                    else {
                        $scope.ExperienceCertificateConvert = res.replace(/^data:image\/[a-z]+;base64,/, "");
                    }
                })

                $scope.toDataURL($scope.EditData.BlindCertificate, function (res) {
                    if ($scope.EditData.BlindCertificate == "") {
                        $scope.BlindCertificateConvert = "";
                    }
                    else {
                        $scope.BlindCertificateConvert = res.replace(/^data:image\/[a-z]+;base64,/, "");
                    }
                })

                $scope.$emit('hideLoading', data);
            }, function (error) {

                var err = JSON.parse(error);
            });

        }



        $scope.Update = function (data) {
            //console.log(data.DateOfBirth)
            if (data.StudentName == '' || data.StudentName == undefined || data.StudentName == null) {
                alert('Please Select CandidateName')
                return;
            }

            if (data.FatherName == '' || data.FatherName == undefined || data.FatherName == null) {
                alert('Please Select FatherName')
                return;
            }


            if (data.MotherName == '' || data.MotherName == undefined || data.MotherName == null) {
                alert('Please Select MotherName')
                return;
            }


            if (data.DateofBirth == '' || data.DateofBirth == undefined || data.DateofBirth == null) {
                alert('Please Select CandidateDOB')
                return;
            }

            if (data.Gender == '' || data.Gender == undefined || data.Gender == null) {
                alert('Please Select Gender')
                return;
            }

            //if ($scope.AadharNumber == '' || $scope.AadharNumber == undefined || $scope.AadharNumber == null) {
            //    alert('Please Select AadharNumber')
            //    return;
            //}

            if (data.HouseNumber == '' || data.HouseNumber == undefined || data.HouseNumber == null) {
                alert('Please Select houseNo')
                return;
            }

            if (data.Street == '' || data.Street == undefined || data.Street == null) {
                alert('Please Select street')
                return;
            }

            if (data.Landmark == '' || data.Landmark == undefined || data.Landmark == null) {
                alert('Please Select Landmark')
                return;
            }

            if (data.Village == '' || data.Village == undefined || data.Village == null) {
                alert('Please Select village')
                return;
            }


            if (data.Pincode == '' || data.Pincode == undefined || data.Pincode == null) {
                alert('Please Select Pincode')
                return;
            }

            if (data.District == '' || data.District == undefined || data.District == null) {
                alert('Please Select District')
                return;
            }

            if (data.AddressState == '' || data.AddressState == undefined || data.AddressState == null) {
                alert('Please Select State')
                return;
            }

            if (data.StudentMobile == '' || data.StudentMobile == undefined || data.StudentMobile == null) {
                alert('Please Select Mobile Number')
                return;
            }

            //if ($scope.StudentEmail == '' || $scope.StudentEmail == undefined || $scope.StudentEmail == null) {
            //    alert('Please Select Email')
            //    return;
            //}




       


            //if ($scope.StudentPhotoConvert == '' || $scope.StudentPhotoConvert == undefined || $scope.StudentPhotoConvert == null) {
            //    alert('Please Select StudentPhoto')
            //    return;
            //}

            //if ($scope.StudentSignConvert == '' || $scope.StudentSignConvert == undefined || $scope.StudentSignConvert == null) {
            //    alert('Please Select StudentSign')
            //    return;
            //}

            //if ($scope.SscCertificateConvert == '' || $scope.SscCertificateConvert == undefined || $scope.SscCertificateConvert == null) {
            //    alert('Please Select StudentSscCertificate')
            //    return;
            //}

            //if ($scope.QualificationCertificateConvert == '' || $scope.QualificationCertificateConvert == undefined || $scope.QualificationCertificateConvert == null) {
            //    alert('Please Select QualificationCertificate')
            //    return;
            //}

            //if ($scope.ExperienceCertificateConvert == '' || $scope.ExperienceCertificateConvert == undefined || $scope.ExperienceCertificateConvert == null) {
            //    alert('Please Select ExperienceCertificate')
            //    return;
            //}

            if (($scope.EditData.BlindCertificate == undefined || $scope.EditData.BlindCertificate == "" || $scope.EditData.BlindCertificate == null) && $scope.EditData.IsBlind == true) {
                alert("Please Upload Medical Certificate");
                return;
            }

            if ($scope.EditData.IsBlind == true) {
                $scope.ShowCheckBox = true;
            }
            else {
                $scope.ShowCheckBox = false;
            }

            if ($scope.EditData.IsBlind == true && ($scope.Checkbox == undefined || $scope.Checkbox == "" || $scope.Checkbox == null || $scope.Checkbox==false)) {
                alert("Please agree terms and conditions .");
                return;
            }
            $scope.LoadImg = true;


            let appNum = ($scope.ApplicationNumber == null || $scope.ApplicationNumber == undefined || $scope.ApplicationNumber == '') ? '' : $scope.ApplicationNumber;

            var paramObj = {
                "ApplicationNumber": appNum,
                "InstitutionID": authData.InstitutionID,
                "CourseID": parseInt(data.CourseID),
                "CourseQualificationID": data.CourseQualificationID,
                "CourseExperienceID": data.CourseExperienceID,
                "SSC": data.SSC,
                "SSCHallticketNumber": data.SSCHallticketNumber,
                "SSCPassedYear": data.SSCPassedYear,
                "SSCPassedType": data.SSCPassedType,
                "StudentName": data.StudentName,
                "FatherName": data.FatherName,
                "MotherName": data.MotherName,
                //"DateofBirth": moment(data.DateOfBirth).format("DD-MM-YYYY"),
                //"DateofBirth": data.DateofBirth,
                "DateofBirth": moment(data.DateofBirth).format("YYYY-MM-DD"),
                "SSCDateofBirth": "",
                "Gender": data.Gender,
                "AadharNumber": parseInt(data.AadharNumber),
                "HouseNumber": data.HouseNumber,
                "Street": data.Street,
                "Landmark": data.Landmark,
                "Village": data.Village,
                "Pincode": data.Pincode,
                "District": data.District,
                "AddressState": data.AddressState,
                "StudentMobile": data.StudentMobile,
                "StudentEmail": data.StudentEmail,
                "SSCValidated": data.SSCValidated,
                "UserName": $scope.UserName,
                "StudentPhoto": ($scope.StudentPhotoConvert == undefined || $scope.StudentPhotoConvert == null || $scope.StudentPhotoConvert == "") ? $scope.StudentPhotoConvert : $scope.StudentPhotoConvert,
                "StudentSign": ($scope.StudentSignConvert == undefined || $scope.StudentSignConvert == null || $scope.StudentSignConvert == "") ? $scope.StudentSignConvert : $scope.StudentSignConvert,
                "SSCCertificate": ($scope.SSCCertificateConvert == undefined || $scope.SSCCertificateConvert == null || $scope.SSCCertificateConvert == "") ? $scope.SSCCertificateConvert : $scope.SSCCertificateConvert,
                "QualificationCertificate": ($scope.QualificationCertificateConvert == undefined || $scope.QualificationCertificateConvert == null || $scope.QualificationCertificateConvert == "") ? $scope.QualificationCertificateConvert : $scope.QualificationCertificateConvert,
                "ExperienceCertificate": ($scope.ExperienceCertificateConvert == undefined || $scope.ExperienceCertificateConvert == null || $scope.ExperienceCertificateConvert == "") ? $scope.ExperienceCertificateConvert : $scope.ExperienceCertificateConvert,
                "BlindCertificate": ($scope.stdMedicalCertConvert == undefined || $scope.stdMedicalCertConvert == null) ? $scope.stdMedicalCertConvert : $scope.stdMedicalCertConvert,
                "IsBlind": ($scope.EditData.IsBlind == true) ? true : false
            };
            var updatestddetails = CcicPreExaminationService.UpdateStudentDetails(paramObj);
            updatestddetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {

                    $scope.LoadImg = true;
                    $scope.ApplicationNumber = res[0].ApplicationNumber;
                    $scope.StudentID = res[0].StudentID;
                    $state.go('CcicDashboard.Academic.ViewStudentDetails')
                    //$scope.PreviewStudentDetails(res[0].ApplicationNumber, res[0].StudentID);
                    alert(res[0].ResponseDescription);
                    $scope.ShowDetails = true;
                }

                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription)
                    $scope.LoadImg = false;
                    alert(res[0].ResponseDescription);
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

        $scope.PreviewStudentDetails = function () {
            var previewstddetails = CcicPreExaminationService.GetViewStudentDetails($scope.ApplicationNumber, $scope.StudentId);
            previewstddetails.then(function (response) {
                try {
                    var preRes = JSON.parse(response);

                }
                catch (err) { }
                $scope.LoadImg = false;
                $scope.ShowDetails = true;
                $scope.PreviewData = preRes[0];

            }, function (error) {
                $scope.LoadImg = false;
                var err = JSON.parse(error);
            });
        }
        $scope.uploadStudentPhoto = function () {
            var input = document.getElementById("stdPhotoFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 50000 && fileSize >= 5000) {
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
                alert("file size should not be greater than 50KB");
                $('#stdPhotoFile').val('');
                return;
            } else {
                alert("file size should be between 5KB and 50KB");
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

            if (fileSize <= 30000 && fileSize >= 3000) {
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
                alert("file size should not be greater than 30KB");
                $('#stdSignFile').val('');
                return;
            } else {
                alert("file size should be between 3KB and 30KB");
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
                            $scope.SSCCertificate = base64Image;
                            $scope.SSCCertificateConvert = $scope.SSCCertificate.replace(/^data:image\/[a-z]+;base64,/, "");

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
                            $scope.QualificationCertificate = base64Image;
                            $scope.QualificationCertificateConvert = $scope.QualificationCertificate.replace(/^data:image\/[a-z]+;base64,/, "");

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
                            $scope.ExperienceCertificate = base64Image;
                            $scope.ExperienceCertificateConvert = $scope.ExperienceCertificate.replace(/^data:image\/[a-z]+;base64,/, "");

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



    })
})