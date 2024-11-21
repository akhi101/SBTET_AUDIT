define(['app'], function (app) {
    app.controller("StudentDashboardController", function ($scope, $localStorage, AppSettings, $state, $uibModal, IVCPreExaminationService, IVCAdminService, IVCRegistrationService) {
        var authData = $localStorage.authorizationData;
        $scope.SessionID = $localStorage.SessionID;
        $scope.RegistrationId = authData.UserID;
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getFeeData();
            $scope.getStudentApplicationData();
            $scope.getStudentDetails();
            $scope.getStates();
            $scope.getCasteCategory();
            $scope.getRegions();
            $scope.getMinorities();
            $scope.getTenthYears();
            $scope.getQualifiedExams();
            $scope.ViewOmr = false;
            $scope.ViewResults = false;
            $scope.omr = false;
            $scope.Results = false;
            //$scope.SubmitButton = true;
            $scope.FeePayment = true;
            $scope.Tabs = true;
            $scope.PhoneNo = true;
            $scope.Class = true;
            $scope.CASTECATEGORYFOUND = false;
            $scope.CASTECERTNUMBERFOUND = false;
            $scope.EWSNUMBERFOUND = false;
            $scope.AADHARFOUND = false;

            $scope.ThirdCard = true;
            $scope.PreviewDisable = true;
            $scope.StudentPhoto1 = false;
            $scope.StudentSign1 = false;


            $scope.RegionID = 1;
            $scope.qualifiedExamID = 1;
            $scope.MinorityID = 1;
            $scope.CasteCategory = 1;
            $scope.CancelSSCButton = true;


            $scope.Handicaped = "false";
            $scope.NCC = "false";
            $scope.Sports = "false";
            $scope.CAP = "false";
            $scope.PMCares = "false";
            $scope.AppearforBiology = "false";
            $scope.FeePaymentStatus = '1';
            $scope.personaltab = true;
            $scope.nextbutton = true;
            $scope.communicationtab = true;
            $scope.categorytab = true;
            $scope.specialcategorytab = true;
            $scope.studydetailstab = true;
            $scope.photosigntab = true;
            $scope.previewtab = true;
            $scope.halltickettab = true;
            $scope.submitbutton = true;
            $scope.printbutton = false;
            $scope.modifybutton = true;
            $scope.submitlabel = true;
            $scope.feetab = true;

        }

        $scope.class1 = "active";
        $scope.class2 = "";
        $scope.class3 = "";
        $scope.class4 = "";
        $scope.class5 = "";
        $scope.class6 = "";
        $scope.class7 = "";
        $scope.class8 = "";
        $scope.class9 = "";

        $scope.EWSCertificateValues = [{ "Id": "Yes", "value": true }, { "Id": "No", "value": false }]

        $scope.getTenthYears = function () {
            var tenthyr = IVCAdminService.GetTenthYears();
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

        $scope.getQualifiedExams = function () {
            var qualifiedexam = IVCAdminService.GetQualifiedExams();
            qualifiedexam.then(function (response) {
                try {
                    var res = JSON.parse(response)

                }
                catch (err) { }
                if (res.Table.length > 0) {
                    $scope.QualifiedExamsData = res.Table;
                }
                else {
                    $scope.QualifiedExamsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getRegions = function () {
            var getcategory = IVCRegistrationService.GetRegions();
            getcategory.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.GetRegionsData = res.Table;

            },
                function (error) {
                    alert("error while loading Regions");
                    //var err = JSON.parse(error);

                });
        }

        $scope.getMinorities = function () {
            var getcategory = IVCRegistrationService.GetMinorities();
            getcategory.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.GetMinoritiesData = res.Table;

            },
                function (error) {
                    alert("error while loading Regions");
                    //var err = JSON.parse(error);

                });
        }
        $scope.CancelSSC = function () {
            $scope.SSCBUTTONCLICK = false;
            $scope.ENTEREDSSCHALLTICKET = false;
            $scope.ENTEREDYEAR = false;
            $scope.ENTEREDSSCTYPE = false;
            $scope.SELECTEDQUALIFIEDEXAM = false;
            $scope.GETSSCDETAILSBUTTON = false;
            $scope.CNAME = null;
            $scope.FNAME = null;
            $scope.MNAME = null;
            $scope.DOB_DATE = '';
            $scope.Gender = null;
            $scope.StudentPhoto = "";
            $scope.StudentPhoto1 = null;
            $scope.StudentSign = false;
            $scope.StudentSign1 = null;
            $scope.CandidateNamefound = false;
            $scope.FatherNameFound = false;
            $scope.MotherNamefound = false;
            $scope.CandidateNameDOBfound = false;
            $scope.Genderfound = false;
        }

        $scope.CancelCasteDetails = function () {
            if ($scope.CasteCategory == 1 && $scope.EwsCertificate == true) {
                $scope.CasteCategoryFound = false;
                $scope.AadharFound = false;
                $scope.EwsCertificateFound = false;
                $scope.EwsNumberFound = false;
                $scope.EWSVerified = false;
                $scope.EWSNotVerified = false;
                $scope.EWSBUTTON = true;
            }
            else if (($scope.CasteCategory == 2 || $scope.CasteCategory == 3 || $scope.CasteCategory == 4 || $scope.CasteCategory == 5 || $scope.CasteCategory == 6 || $scope.CasteCategory == 7 || $scope.CasteCategory == 8) && $scope.CasteVerified == true) {
                $scope.CasteCategoryFound = false;
                $scope.AadharFound = false;
                $scope.CasteCertificateNumberFound = false;
                $scope.CasteVerified = false;
                $scope.CasteNotVerified = false;
                $scope.CasteVerifyButton = true;
            }

        }

        $scope.ChangeEwsCategory = function (EwsCertificate) {
            if (EwsCertificate == false) {
                $scope.EWSBUTTON = false;
                $scope.EWSCERTNUMBER = false;
                $scope.EWSNumber = "";
                $scope.EWSNotVerified = false;
                $scope.CasteNotVerified = false;
            }
            else {
                $scope.EWSBUTTON = true;
                $scope.EWSCERTNUMBER = true;
                $scope.EWSNumber = '';
            }
        }
        $scope.ChangeCaste = function (CasteCategory) {

            if (CasteCategory == 1) {
                $scope.CasteVerified = false;
                $scope.CasteNotVerified = false;
                $scope.CasteVerifyButton = false;
                $scope.Aadhaar = "";
                $scope.CasteCertificateNumber = "";
                $scope.EWSNumber = '';
                $scope.EwsCertificate = null;
                $scope.CasteCategoryFound = false;
                $scope.AadharFound = false;
                $scope.EwsCertificateFound = false;
                $scope.EwsNumberFound = false;
                $scope.CasteCertificateNumberFound = false;
                $scope.CasteCertificateNumber = '';
            }

            if (CasteCategory == 2 || CasteCategory == 3 || CasteCategory == 4 || CasteCategory == 5 ||
                CasteCategory == 6 || CasteCategory == 7 || CasteCategory == 8) {
                $scope.CasteVerified = false;
                $scope.CasteNotVerified = false;
                $scope.EWSNotVerified = false;
                $scope.EWSVerified = false;
                $scope.CasteVerifyButton = true;
                $scope.Aadhaar = "";
                $scope.CasteCertificateNumber = "";
                $scope.EWSNumber = '';
                $scope.EWSCERTNUMBER = false;
                $scope.EwsCertificate = null;
                $scope.CasteCategoryFound = false;
                $scope.AadharFound = false;
                $scope.EWSBUTTON = false
                $scope.EwsCertificateFound = false;
                $scope.EwsNumberFound = false;
                $scope.CasteCertificateNumberFound = false;
                $scope.CasteCertificateNumber = '';
            }


            $scope.CasteCategory = CasteCategory;

            if ($scope.CasteCategory == 1) {
                $scope.ChangedCategory = 'OC'
            }
            if ($scope.CasteCategory == 2) {
                $scope.ChangedCategory = 'BC_A'
            }
            if ($scope.CasteCategory == 3) {
                $scope.ChangedCategory = 'BC_B'
            }
            if ($scope.CasteCategory == 4) {
                $scope.ChangedCategory = 'BC_C'
            }
            if ($scope.CasteCategory == 5) {
                $scope.ChangedCategory = 'BC_D'
            }
            if ($scope.CasteCategory == 6) {
                $scope.ChangedCategory = 'BC_E'
            }
            if ($scope.CasteCategory == 7) {
                $scope.ChangedCategory = 'SC'
            }
            if ($scope.CasteCategory == 8) {
                $scope.ChangedCategory = 'ST'
            }

        }

        $scope.getCasteCategory = function () {
            var getcategory = IVCRegistrationService.GetCategories();
            getcategory.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.GetCasteData = res.Table;
                $scope.verifycastebutton = true;

            },
                function (error) {
                    alert("error while loading Caste Category");
                    //var err = JSON.parse(error);

                });
        }

        $scope.VerifyEWS = function () {
            //$scope.CasteNum = "EWS022100145491";
            //$scope.Aadhaar = "206866388949";
            //$scope.CasteNum = "CND022222366793";
            if ($scope.EwsCertificate == "" || $scope.EwsCertificate == null || $scope.EwsCertificate == undefined) {
                alert("Please Select EWS Category")
                return
            }

            if ($scope.EWSNumber == "" || $scope.EWSNumber == null || $scope.EWSNumber == undefined) {
                alert("Please Enter EWS Number")
                return
            }
            $scope.Loader2 = true;
            $scope.userid = "MEESEVA";
            var ewsdetails = IVCAdminService.GetIVCEWSVerification($scope.EWSNumber, $scope.userid);
            ewsdetails.then(function (res) {
                if (res.errorcode == 200) {
                    $scope.Loader2 = false;
                    $scope.Data = res.EwsDetails
                    $scope.Status = res.EwsDetails.status;
                    alert("EWS Verified Successfully")
                    $scope.EWSVerified = true;
                    $scope.EWSBUTTON = false;
                    $scope.CancelCasteButton = true;
                    $scope.CasteCategoryFound = $scope.CasteCategory != "" ? true : false;
                    $scope.AadharFound = $scope.Aadhaar != "" ? true : false;
                    $scope.CasteCertificateNumberFound = $scope.CasteCertificateNumber != "" ? true : false;
                    $scope.EwsCertificateFound = $scope.EwsCertificate != "" ? true : false;
                    $scope.EwsNumberFound = $scope.EWSNumber != "" ? true : false;

                } else {
                    $scope.Loader2 = false;
                    alert("EWS Details Not Found,Continue to Fill Application")
                    $scope.EWSNotVerified = true;
                    $scope.EwsCertificate = false;
                    $scope.EWSVerified = false;
                    $scope.EWSBUTTON = false;
                    //$scope.CancelCasteButton = true;
                    $scope.CasteCategoryFound = true;
                    $scope.AadharFound = true;
                    $scope.CasteCertificateNumberFound = true;
                    $scope.EwsCertificateFound = true;
                    $scope.EwsNumberFound = true;
                    $scope.EWSBUTTON = false;

                }



            }, function (error) {
                alert('Unable to load Captcha')
                $scope.EWSVerified = false;
                $scope.EWSNotVerified = true;
                $scope.EWSBUTTON = false;
                //$scope.CancelCasteButton = false;
                $scope.Loader2 = false;
            });
        }


        $scope.GetCasteDetails = function () {
            //$scope.CasteNum = "EWS022100145491";
            //$scope.Aadhaar = "206866388949";
            //$scope.CasteNum = "CND022222366793";
            if ($scope.Aadhaar == "" || $scope.Aadhaar == null || $scope.Aadhaar == undefined) {
                alert("Please Enter Correct Aadhar Number")
                return
            }

            if ($scope.CasteCertificateNumber == "" || $scope.CasteCertificateNumber == null || $scope.CasteCertificateNumber == undefined) {
                alert("Please Enter Caste Certificate Number")
                return
            }
            $scope.Loader1 = true;
            $scope.Userid = "MEESEVA";
            var captcha = IVCAdminService.GetCasteDetails($scope.CasteCertificateNumber, $scope.Userid);
            captcha.then(function (res) {
                if (res.errorcode == 200) {
                    $scope.Loader1 = false;
                    $scope.Data = res.caste_details

                    $scope.Aadhaar_Number = res.caste_details.aadhaar_number
                    $scope.Category_Name = res.caste_details.subtribe

                    let str = $scope.Aadhaar_Number;
                    var aadhaar = str[8] + str[9] + str[10] + str[11];
                    let str1 = $scope.Aadhaar;
                    var aadhaar1 = str1[8] + str1[9] + str1[10] + str1[11];

                    let str2 = $scope.Category_Name;
                    var castecategory = str2[0] + str2[1] + str2[2];
                    if ($scope.ChangedCategory == null || $scope.ChangedCategory == "" || $scope.ChangedCategory == undefined) {
                        $scope.ChangedCategory = $scope.RegistrationCasteName;
                    }
                    let str3 = $scope.ChangedCategory;
                    var castecategory1 = str3[0] + str3[1] + str3[3];
                    if (aadhaar == aadhaar1 && castecategory == castecategory1) {
                        alert("Caste Verified Successfully")
                        $scope.CasteVerified = true;
                        $scope.CasteNotVerified = false;
                        $scope.CasteCategoryFound = $scope.CasteCategory != "" ? true : false;
                        $scope.AadharFound = $scope.Aadhaar != "" ? true : false;
                        $scope.CasteCertificateNumberFound = $scope.CasteCertificateNumber != "" ? true : false;
                        $scope.CasteVerifyButton = false;
                    }

                    else {
                        alert("Aadhaar Number or Selected Category Not Matched with Caste Certificate");
                        $scope.Loader1 = false;
                        $scope.CasteNotVerified = true;
                        $scope.CasteVerified = false;
                        $scope.CasteCategoryFound = false;
                        $scope.AadharFound = false;
                        $scope.CasteCertificateNumberFound = false;
                        $scope.CasteVerifyButton = true;
                    }
                }

                else {
                    $scope.Loader1 = false;
                    alert("Caste Details Not Found, Continue to Fill Application")
                    $scope.CasteNotVerified = true;
                    $scope.CasteVerified = false;
                    $scope.CasteCategoryFound = false;
                    $scope.AadharFound = false;
                    $scope.CasteCertificateNumberFound = false;
                    $scope.CasteVerifyButton = true;
                }

                //var jsonOutput = xml2json(res);

                //if (response[0].ResponceCode == '200') {
                //    //alert(response[0].ResponceDescription)
                //    //$scope.CaptchaText = "";
                //    //$scope.GetCatcha = response[0].Captcha
                //    //var captcha = JSON.parse(response[0].Captcha)
                //    //$scope.CaptchaImage = captcha[0].Image;
                //} else {
                //    alert(response[0].ResponceDescription)
                //    $scope.CaptchaText = "";
                //    $scope.GetCatcha = response[0].Captcha
                //    var captcha = JSON.parse(response[0].Captcha)
                //    $scope.CaptchaImage = captcha[0].Image;
                //}

            }, function (error) {
                alert('Unable to load Data')
                $scope.Loader1 = false;
                $scope.CasteNotVerified = true;
                $scope.CasteVerified = false;
                $scope.CasteCategoryFound = false;
                $scope.AadharFound = false;
                $scope.CasteCertificateNumberFound = false;
                $scope.CasteVerifyButton = true;
            });
        }

        $scope.getFeeData = function () {
            var feedata = IVCAdminService.GetStudentFeeData($scope.RegistrationId);
            feedata.then(function (response) {

                var res = JSON.parse(response);
                $scope.StudentData = res.Table[0];
                $scope.RegistrationNumber = $scope.StudentData.RegistrationNumber
                $scope.CasteCategoryID = res.Table[0].CasteCategoryID
                $scope.CasteVerifyStatus = res.Table[0].CasteVerified
                //if ($scope.CasteCategoryID == 7 || $scope.CasteCategoryID == 8) {
                //    $scope.CasteVerifyStatus = true;
                //}
                $scope.getDashboardStatus($scope.RegistrationNumber);
            }, function (error) {

            });
        }

        $scope.getDashboardStatus = function (RegistrationNumber) {
            $scope.RegistrationNumber = RegistrationNumber;
            var getdashboardstatus = IVCAdminService.GetDashboardStatus($scope.RegistrationId);
            getdashboardstatus.then(function (response) {

                var res = JSON.parse(response)
                $scope.PersonalStatus = res.Table[0].HeaderStatus
                $scope.CommunicationStatus = res.Table1[0].HeaderStatus
                $scope.CategoryStatus = res.Table2[0].HeaderStatus
                $scope.SpecialCategoryStatus = res.Table3[0].HeaderStatus
                $scope.StudyStatus = res.Table4[0].HeaderStatus
                $scope.PreviewStatus = res.Table5[0].HeaderStatus
                $scope.FeePaymentStatus = res.Table6[0].HeaderStatus
                //$scope.HtStatus = res.Table8[0].HeaderStatus
                //$scope.HallticketGenerated = $scope.HtStatus

                if ($scope.PreviewStatus == 1) {
                    $scope.personaltab = false;
                    $scope.nextbutton = false;
                    $scope.communicationtab = false;
                    $scope.categorytab = false;
                    $scope.specialcategorytab = false;
                    $scope.studydetailstab = false;
                    $scope.previewtab = true;
                    $scope.halltickettab = true;
                    $scope.submitbutton = false;
                    $scope.printbutton = true;
                    $scope.modifybutton = false;
                    $scope.submitlabel = false;
                    $scope.feetab = true;


                    $scope.class1 = ""
                    $scope.class2 = ""
                    $scope.class3 = ""
                    $scope.class4 = ""
                    $scope.class5 = ""
                    $scope.class6 = ""
                    $scope.class7 = "active"


                }
                else if ($scope.PreviewStatus == 0) {
                    $scope.personaltab = true;
                    $scope.nextbutton = true;
                    $scope.communicationtab = true;
                    $scope.categorytab = true;
                    $scope.specialcategorytab = true;
                    $scope.studydetailstab = true;
                    $scope.photosigntab = true;
                    $scope.previewtab = true;
                    $scope.halltickettab = true;
                    $scope.submitbutton = true;
                    $scope.printbutton = false;
                    $scope.modifybutton = true;
                    $scope.submitlabel = true;
                    $scope.feetab = true;
                }
                //else if ($scope.HallticketGenerated == '1') {
                //    $scope.personaltab = false;
                //    $scope.nextbutton = false;
                //    $scope.communicationtab = false;
                //    $scope.categorytab = false;
                //    $scope.specialcategorytab = false;
                //    $scope.studydetailstab = false;
                //    $scope.photosigntab = false;
                //    $scope.previewtab = true;
                //    $scope.halltickettab = true;
                //    $scope.submitbutton = false;
                //    $scope.printbutton = true;
                //    $scope.modifybutton = false;
                //    $scope.submitlabel = false;
                //    $scope.feetab = true;
                    //$scope.getHallticket($scope.RegistrationNumber);
                    //$scope.verifyDates();
                //    $scope.verifyResultDates();
                //}

            });
        }

        $scope.getStudentApplicationData = function () {
            var applicationstatus = IVCAdminService.GetStudentApplicationData($scope.RegistrationId);
            applicationstatus.then(function (response) {
                try {
                    var res = JSON.parse(response)
                    $scope.RegistrationMobile = res.Table[0].RegistrationMobile;
                    $scope.RegistrationEmail = res.Table[0].RegistrationEmail;

                }
                catch (err) { }
            }, function (error) {
                alert('Unable to load Status')
            });
        }

        $scope.getStudentDetails = function () {
            //$scope.loading = true;
            $scope.nodata = false;
            var getstddetails = IVCAdminService.GetStudentDetails($scope.RegistrationId);
            getstddetails.then(function (res) {

                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }
                if (res.Table.length > 0) {
                    $scope.PersonalDetails = res.Table[0];
                    $scope.RegistrationNumber = $scope.PersonalDetails.RegistrationNumber
                    $scope.qualifiedExamID = $scope.PersonalDetails.SSCBoardID
                    $scope.qualifiedExamName = $scope.PersonalDetails.SSCBoardName
                    $scope.passedoutYear = $scope.PersonalDetails.TenthYear
                    $scope.sscHallticket = $scope.PersonalDetails.TenthHallticketNumber
                    $scope.CNAME = $scope.PersonalDetails.StudentName
                    $scope.MNAME = $scope.PersonalDetails.MotherName
                    $scope.Gender = $scope.PersonalDetails.Gender
                    $scope.FNAME = $scope.PersonalDetails.FatherName
                    $scope.sscType = $scope.PersonalDetails.ExaminationType
                    $scope.DOB_DATE = $scope.PersonalDetails.DateofBirth
                    $scope.SSCVerified = $scope.PersonalDetails.SSCVerified
                    $scope.SSCMemo = $scope.PersonalDetails.SSCMemo;
                    $scope.PhotoUpdate = true
                    $scope.NewStudentPhoto = res.Table[0].StudentPhoto;
                    $scope.StudentPhoto = null;
                    $scope.StudentPhoto = $scope.NewStudentPhoto;
                    if ($scope.StudentPhoto == "" || $scope.StudentPhoto == undefined || $scope.StudentPhoto == null) {
                        $scope.Addphoto = true
                    } else {
                        $scope.Addphoto = false
                    }

                    $scope.NewStudentSign = res.Table[0].StudentSignature;
                    $scope.StudentSign = null;
                    $scope.StudentSign = $scope.NewStudentSign
                    if ($scope.StudentSign == "" || $scope.StudentSign == undefined || $scope.StudentSign == null) {
                        $scope.AddSign = true
                    } else {
                        $scope.AddSign = false
                    }
                    if (res.Table[0].SSCPhoto == true) {
                        $scope.StudentPhoto1 = true
                    } else {
                        $scope.StudentPhoto1 = false
                    }
                    if (res.Table[0].SSCSign == true) {
                        $scope.StudentSign1 = true
                    } else {
                        $scope.StudentSign1 = false
                    }

                    if ($scope.qualifiedExamID == 1) {
                        $scope.ssclabel = true;
                    }

                    $scope.toDataURL($scope.PersonalDetails.StudentPhoto, function (res) {
                        if ($scope.PersonalDetails.StudentPhoto == "") {
                            $scope.StudentPhotoConvert = "";
                        }
                        else {
                            $scope.StudentPhotoConvert = res.replace(/^data:image\/[a-z]+;base64,/, "");
                        }
                    })

                    $scope.toDataURL($scope.PersonalDetails.StudentSign, function (res) {
                        if ($scope.PersonalDetails.StudentSign == "") {
                            $scope.StudentSignConvert = "";
                        }
                        else {
                            $scope.StudentSignConvert = res.replace(/^data:image\/[a-z]+;base64,/, "");
                        }
                    })

                    $scope.toDataURL($scope.PersonalDetails.SSCMemo, function (res) {
                        if ($scope.PersonalDetails.SSCMemo == "") {
                            $scope.SSCMemoConvert = "";
                        }
                        else {
                            $scope.SSCMemoConvert = res.replace(/^data:image\/[a-z]+;base64,/, "");
                        }
                    })
                }


                if (res.Table.length <= 0) {
                    if ($scope.qualifiedExamID == 1) {
                        $scope.ssclabel = true;
                    }
                    else {
                        $scope.ssclabel = false;
                    }
                    $scope.DOB_DATE = null;
                }

                if ($scope.SSCVerified == true && $scope.qualifiedExamID == 1) {
                    $scope.SSCBUTTONCLICK = true;
                    $scope.ENTEREDSSCHALLTICKET = true;
                    $scope.ENTEREDYEAR = true;
                    $scope.ENTEREDSSCTYPE = true;
                    $scope.SELECTEDQUALIFIEDEXAM = true;
                    $scope.CandidateNamefound = $scope.CNAME != "" ? true : false;
                    $scope.FatherNameFound = $scope.FNAME != "" ? true : false;
                    $scope.MotherNamefound = $scope.MNAME != "" ? true : false;
                    $scope.CandidateNameDOBfound = $scope.DOB_DATE != "" ? true : false;
                    $scope.Genderfound = $scope.Gender != "" ? true : false;
                    $scope.GETSSCDETAILSBUTTON = true;
                    $scope.CancelSSCButton = true;
                    $scope.Calender = true;



                }

                if (($scope.qualifiedExamID == 2 || $scope.qualifiedExamID == 3 || $scope.qualifiedExamID == 4
                    || $scope.qualifiedExamID == 5 || $scope.qualifiedExamID == 6 || $scope.qualifiedExamID == 7
                    || $scope.qualifiedExamID == 8 || $scope.qualifiedExamID == 9 || $scope.qualifiedExamID == 10
                ) && $scope.SSCVerified == false) {
                    $scope.SSCBUTTONCLICK = true;
                    $scope.CancelSSCButton = false;
                }


                if (res.Table1.length <= 0) {
                    $scope.Email = $scope.RegistrationEmail;
                    $scope.MobileNumber = $scope.RegistrationMobile;

                }

                if (res.Table1.length > 0) {
                    var CommunicationDetails = res.Table1[0];
                    $scope.CommunicationDetails = res.Table1[0];
                    $scope.PrevData = res.Table1[0];
                    $scope.MobileNumber = CommunicationDetails.MobileNumber
                    $scope.AltMobileNumber = CommunicationDetails.AlternateMobileNumber

                    $scope.HouseNo = CommunicationDetails.HouseNumber
                    $scope.Landmark = CommunicationDetails.Landmark
                    $scope.Locality = CommunicationDetails.Locality

                    $scope.StateName = CommunicationDetails.StateName

                    $scope.State = CommunicationDetails.StateID
                    $scope.Pincode = CommunicationDetails.Pincode
                    $scope.State = $scope.CommunicationDetails.StateID
                    $scope.StreetNo = CommunicationDetails.StreetName
                    $scope.Village = CommunicationDetails.Village
                    $scope.Email = CommunicationDetails.Email

                    $scope.PreviewDistrictName = $scope.PreviewDistrictName;
                    $scope.PreviewMandalName = $scope.MandalName;

                    $scope.District = $scope.CommunicationDetails.DistrictID

                    $scope.Mandal = $scope.CommunicationDetails.MandalID

                    $scope.getAddressDistricts($scope.CommunicationDetails.StateID)
                    $scope.getAddressMandals($scope.CommunicationDetails.DistrictID)
                    $scope.DistrictName = $scope.CommunicationDetails.DistrictName
                    $scope.MandalName = $scope.CommunicationDetails.MandalName

                }

                var CategoryDetails = res.Table2[0];
                if (res.Table2.length > 0) {

                    if (CategoryDetails.CasteCategoryID == 1) {
                        if (CategoryDetails.EWSVerified == false) {
                            $scope.CasteCategory = CategoryDetails.CasteCategoryID
                            $scope.CasteCategoryName = CategoryDetails.CasteCategoryName
                            $scope.Aadhaar = CategoryDetails.AadharNumber
                            $scope.EWSCERTNUMBER = CategoryDetails.EWSNumber != "" ? true : false;
                            $scope.EwsCertificate = CategoryDetails.EWS
                            $scope.EWSNumber = CategoryDetails.EWSNumber
                            $scope.EWSVerified = false;
                            $scope.EWSNotVerified = true;
                            $scope.EWSBUTTON = true;
                        }
                        else if (CategoryDetails.EWSVerified == true) {
                            $scope.CasteCategory = CategoryDetails.CasteCategoryID
                            $scope.CasteCategoryName = CategoryDetails.CasteCategoryName
                            $scope.Aadhaar = CategoryDetails.AadharNumber
                            $scope.EwsCertificate = CategoryDetails.EWS
                            $scope.EWSCERTNUMBER = true;
                            $scope.EWSNumber = CategoryDetails.EWSNumber
                            $scope.EWSVerified = CategoryDetails.EWSVerified
                            $scope.CasteCategoryFound = true;
                            $scope.AadharFound = CategoryDetails.AadharNumber != "" ? true : false;
                            $scope.EwsCertificateFound = true;
                            $scope.EwsNumberFound = true;

                        }
                        if (CategoryDetails.EWS == false) {
                            $scope.EWSBUTTON = false;
                            $scope.EWSNotVerified = false;
                        }

                    }
                    else if (CategoryDetails.CasteCategoryID == 2 || CategoryDetails.CasteCategoryID == 3 || CategoryDetails.CasteCategoryID == 4 ||
                        CategoryDetails.CasteCategoryID == 5 || CategoryDetails.CasteCategoryID == 6) {
                        if (CategoryDetails.CasteVerified == false) {
                            $scope.CasteCategory = CategoryDetails.CasteCategoryID;
                            $scope.CasteCategoryName = CategoryDetails.CasteCategoryName
                            $scope.Aadhaar = CategoryDetails.AadharNumber;
                            $scope.CasteCertificateNumber = CategoryDetails.CasteCertificateNumber;
                            $scope.CasteCategoryFound = false;
                            $scope.AadharFound = false;
                            $scope.CasteCertificateNumberFound = false;
                            $scope.CasteNotVerified = true;
                            $scope.CancelCasteButton = false;
                            $scope.CasteVerifyButton = true;
                        }
                        else if (CategoryDetails.CasteVerified == true) {
                            $scope.CasteCategory = CategoryDetails.CasteCategoryID;
                            $scope.CasteCategoryName = CategoryDetails.CasteCategoryName
                            $scope.Aadhaar = CategoryDetails.AadharNumber;
                            $scope.CasteCertificateNumber = CategoryDetails.CasteCertificateNumber;
                            $scope.CasteCategoryFound = true;
                            $scope.AadharFound = true;
                            $scope.CasteCertificateNumberFound = true;
                            $scope.CasteNotVerified = false;
                            $scope.CasteVerified = true;
                            $scope.CancelCasteButton = false;
                            $scope.CasteVerifyButton = false;

                        }
                    }
                    else if (CategoryDetails.CasteCategoryID == 7 || CategoryDetails.CasteCategoryID == 8) {
                        if (CategoryDetails.CasteVerified == false) {
                            $scope.CasteCategory = CategoryDetails.CasteCategoryID;
                            $scope.CasteCategoryName = CategoryDetails.CasteCategoryName
                            $scope.Aadhaar = CategoryDetails.AadharNumber;
                            $scope.CasteCertificateNumber = CategoryDetails.CasteCertificateNumber;
                            $scope.CasteVerified = CategoryDetails.CasteVerified;
                            $scope.CasteCategoryFound = false;
                            $scope.AadharFound = false;
                            $scope.CasteCertificateNumberFound = false;
                            $scope.CasteNotVerified = true;
                            $scope.CancelCasteButton = false;
                            $scope.CasteVerifyButton = true;
                        }


                        else if (CategoryDetails.CasteVerified == true) {
                            $scope.CasteCategory = CategoryDetails.CasteCategoryID;
                            $scope.CasteCategoryName = CategoryDetails.CasteCategoryName
                            $scope.Aadhaar = CategoryDetails.AadharNumber;
                            $scope.CasteCertificateNumber = CategoryDetails.CasteCertificateNumber;
                            $scope.CasteCategoryFound = true;
                            $scope.AadharFound = true;
                            $scope.CasteCertificateNumberFound = true;
                            $scope.CasteNotVerified = false;
                            $scope.CasteVerified = true;
                            $scope.CancelCasteButton = false;
                            $scope.CasteVerifyButton = false;

                        }

                    }
                    if (($scope.CasteCategory == 1 && $scope.EWSVerified == true) || (($scope.CasteCategory == 2 || $scope.CasteCategory == 3 || $scope.CasteCategory == 4 ||
                        $scope.CasteCategory == 5 || $scope.CasteCategory == 6) && $scope.CasteVerified == true)) {
                        $scope.CancelCasteButton = true;
                    }

                    else if (($scope.CasteCategory == 7 || $scope.CasteCategory == 8) && $scope.CasteVerified == true && $scope.FeePaymentStatus == 1) {
                        $scope.CancelCasteButton = false;
                    }
                    else if (($scope.CasteCategory == 7 || $scope.CasteCategory == 8) && $scope.CasteVerified == true && $scope.FeePaymentStatus == 0) {
                        $scope.CancelCasteButton = true;
                    }
                    else {
                        $scope.CancelCasteButton = false;
                    }
                }
               


                if (res.Table3.length > 0) {
                    var SpecialCategoryDetails = res.Table3[0];

                    $scope.CAP = SpecialCategoryDetails.CAP
                    $scope.MinorityID = SpecialCategoryDetails.MinorityID
                    $scope.RegionName = SpecialCategoryDetails.RegionName
                    $scope.MinorityName = SpecialCategoryDetails.MinorityName
                    $scope.NCC = SpecialCategoryDetails.NCC
                    $scope.Handicaped = SpecialCategoryDetails.PH
                    $scope.RegionID = SpecialCategoryDetails.RegionID
                    $scope.Sports = SpecialCategoryDetails.SportsAndGames

                    $scope.PreviewCAP = $scope.CAP;
                    $scope.PreviewNCC = $scope.NCC;
                    $scope.PreviewHandicaped = $scope.Handicaped;
                    $scope.PreviewSports = $scope.Sports;

                   
                    if ($scope.CAP == true) {
                        $scope.CAP = 'true'

                    }
                    if ($scope.CAP == false) {
                        $scope.CAP = 'false'
                    }
                    
                    if ($scope.NCC == true) {
                        $scope.NCC = 'true'

                    }
                    if ($scope.NCC == false) {
                        $scope.NCC = 'false'
                    }
                    if ($scope.Handicaped == true) {
                        $scope.Handicaped = 'true'

                    }
                    if ($scope.Handicaped == false) {
                        $scope.Handicaped = 'false'
                    }
                  
                    if ($scope.Sports == true) {
                        $scope.Sports = 'true'

                    }
                    if ($scope.Sports == false) {
                        $scope.Sports = 'false'
                    }


                }



                if (res.Table4.length > 0) {
                    $scope.StudyDetails = res.Table4[0];
                    $scope.IVCYear = $scope.StudyDetails.IVCYear
                    $scope.IVCCourseID = $scope.StudyDetails.IVCCourseID
                    $scope.IVCCourseName = $scope.StudyDetails.IVCCourseName
                    $scope.PassedAttempt = $scope.StudyDetails.PassedInSingleAttempt
                    $scope.LEPCourseID1 = $scope.StudyDetails.LEPCourseID1
                    $scope.LEPCourseName1 = $scope.StudyDetails.LEPCourseName1
                    $scope.LEPCourseID2 = $scope.StudyDetails.LEPCourseID2
                    $scope.LEPCourseName2 = $scope.StudyDetails.LEPCourseName2
                    $scope.OneYearMarks = $scope.StudyDetails.FirstYearMarks
                    $scope.TwoYearMarks = $scope.StudyDetails.SecondYearMarks
                    $scope.OneYearEngMarks = $scope.StudyDetails.FirstYearEnglishMarks
                    $scope.TwoYearEngMarks = $scope.StudyDetails.SecondYearEnglishMarks
                    $scope.BridgeCourseMarks = $scope.StudyDetails.BridgeCourseMarks
                    $scope.BridgePassed = $scope.StudyDetails.BridgeCoursePassed
                    $scope.IVCMemo = $scope.StudyDetails.IVCMemo
                    $scope.BridgeCourseMemo = $scope.StudyDetails.BridgeCourseMemo     


                    $scope.PreviewIVCYear = $scope.IVCYear;
                    $scope.PreviewIVCCourseName = $scope.IVCCourseName;
                    $scope.PreviewPassedAttempt = $scope.PassedAttempt;
                    $scope.PreviewLEPCourseName1 = $scope.LEPCourseName1;
                    $scope.PreviewLEPCourseName2 = $scope.LEPCourseName2;
                    $scope.PreviewOneYearMarks = $scope.OneYearMarks;
                    $scope.PreviewTwoYearMarks = $scope.TwoYearMarks;
                    $scope.PreviewOneYearEngMarks = $scope.OneYearEngMarks;
                    $scope.PreviewTwoYearEngMarks = $scope.TwoYearEngMarks;
                    $scope.PreviewBridgeCourseMarks = $scope.BridgeCourseMarks;
                    $scope.PreviewBridgePassed = $scope.BridgePassed;


                    //$scope.IVCYear = $scope.StudyDetails.IVCYear
                    $scope.getIVCCourses1($scope.StudyDetails.IVCYear)
                    $scope.getLEPCourses10($scope.StudyDetails.IVCCourseID)
                    $scope.getLEPCourses20($scope.StudyDetails.LEPCourseID1)

                    if ($scope.PassedAttempt == true) {
                        $scope.PassedAttempt = 'true'

                    }
                    if ($scope.PassedAttempt == false) {
                        $scope.PassedAttempt = 'false'
                    }

                    if ($scope.BridgePassed == true) {
                        $scope.BridgePassed = 'true'

                    }
                    if ($scope.BridgePassed == false) {
                        $scope.BridgePassed = 'false'
                    }

                    $scope.toDataURL($scope.StudyDetails.IVCMemo, function (res) {
                        if ($scope.StudyDetails.IVCMemo == "") {
                            $scope.IVCMemoConvert = "";
                        }
                        else {
                            $scope.IVCMemoConvert = res.replace(/^data:image\/[a-z]+;base64,/, "");
                        }
                    })

                    $scope.toDataURL($scope.StudyDetails.BridgeCourseMemo, function (res) {
                        if ($scope.StudyDetails.BridgeCourseMemo == "") {
                            $scope.BridgeCourseMemoConvert = "";
                        }
                        else {
                            $scope.BridgeCourseMemoConvert = res.replace(/^data:image\/[a-z]+;base64,/, "");
                        }
                    })



                }




                //if (res.Table6.length > 0) {

                //    $scope.HallticketGenerated = res.Table6[0].HallticketGenerated;


                //} else {
                //    $scope.PhotoUpdate = false;
                //    //$scope.loading = false;
                //    //$scope.nodata = true;
                //    $scope.StudentDetailsData = [];

                //    //$scope.loading = false;
                //    //$scope.nodata = true;

                //}
             $scope.Preview();

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });

        }


        $scope.Preview = function () {
            $scope.PreviewDisable = false;
            $scope.array = []
            if ($scope.OneYearMarks != null && $scope.OneYearMarks != undefined && $scope.OneYearMarks != "") {
                var obj = {}
                var obj = { One: $scope.OneYearMarks, Two: $scope.TwoYearMarks, Three: $scope.OneYearEngMarks, Four: $scope.TwoYearEngMarks, Five: $scope.BridgeCourseMarks, Class: "Class 1" }
                $scope.array.push(obj)
            }
        }      

        $scope.checkDate = function (DOB_DATE) {
            var currentDate = new Date();
            if ($scope.PersonalDetails != undefined) {
                var birthdate = new Date(DOB_DATE);
                if (birthdate > currentDate) {
                    alert('Selected Date Should not be Future!')
                    $scope.DOB_DATE = $scope.PersonalDetails.DateofBirth;
                    return;
                } else {
                    $scope.DOB_DATE = moment(DOB_DATE).format("DD/MM/YYYY");
                }
            }
            else if ($scope.PersonalDetails == undefined) {
                var birthdate = new Date(DOB_DATE);
                if (birthdate > currentDate) {
                    alert('Selected Date Should not be Future!')
                    $scope.DOB_DATE = null;
                    return;
                } else {
                    $scope.DOB_DATE = moment(DOB_DATE).format("DD/MM/YYYY");
                }
            }

        };
        $scope.BackTab = function (Type) {

            if (Type == 1) {
                $scope.class1 = "active";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 2) {
                $scope.class1 = "";
                $scope.class2 = "active";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 3) {
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "active";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 4) {
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "active";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 5) {
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "active";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            }
            else if (Type == 6) {
                if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus === 1) {
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "active";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    $scope.class9 = "";
                    $scope.omr = false;
                    $scope.Results = false;
                } else {
                    alert("Please Fill All Details for Preview")
                }

            }
            else if (Type == 9) {
                if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus === 1 && $scope.PhotoStatus == 1 && $scope.PreviewStatus == 1 && $scope.FeePaymentStatus == 1) {
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    $scope.class9 = "active";
                    $scope.omr = false;
                    $scope.Results = false;
                }
                else if ($scope.FeePaymentStatus == 0) {
                    alert("Please Pay the Registration Fee")
                }
                else {
                    alert('Please Submit the Application')
                }
            }

            else if (Type == 10) {
                if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus === 1 && $scope.PhotoStatus == 1 && $scope.PreviewStatus == 1 && $scope.FeePaymentStatus == 1) {
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    $scope.class9 = "";
                    $scope.class10 = "active";
                    $scope.omr = true;
                    $scope.Results = false;

                }
                else if ($scope.FeePaymentStatus == 0) {
                    alert("Please Pay the Registration Fee")
                }
                else {
                    alert('Please Submit the Application')
                }
            }

            else if (Type == 11) {
                if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus === 1 && $scope.PhotoStatus == 1 && $scope.PreviewStatus == 1 && $scope.FeePaymentStatus == 1) {
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    $scope.class9 = "";
                    $scope.class10 = "";
                    $scope.class11 = "active";
                    $scope.Results = true;
                    $scope.omr = false;

                }
                else if ($scope.FeePaymentStatus == 0) {
                    alert("Please Pay the Registration Fee")
                }
                else {
                    alert('Please Submit the Application')
                }
            }

        }

        $scope.NextTab = function (Type) {
            if (Type == 1) {
                $scope.class1 = "";
                $scope.class2 = "active";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";

            } else if (Type == 'PersonalDetails') {

                $scope.savePersonalDetails();
            } else if (Type == 'CommunicationDetails') {

                $scope.saveCommunicationDetails();


            } else if (Type == 'CategoryDetails') {

                $scope.saveCategoryDetails();

            } else if (Type == 'SpecialCategoryDetails') {
                $scope.saveSpecialCategoryDetails();
            } else if (Type == 'StudyDetails') {
                $scope.saveStudyDetails();

            } else if (Type == 'PhotoSignatureDetails') {
                $scope.savePhotoSignatureDetails();

            } else if (Type == 7) {
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "active";

            }

        }

        $scope.getQualifiedExam = function (data) {
            //$scope.qualifiedExamID = data.QualifiedExamID;
            //$scope.qualifiedExamName = data.QualifiedExamName;
            if ($scope.qualifiedExamID == 1) {
                $scope.SSCBUTTONCLICK = false;
                $scope.ssclabel = true;
                $scope.CancelSSCButton = true;
            }
            else if ($scope.qualifiedExamID == 2 || $scope.qualifiedExamID == 3
                || $scope.qualifiedExamID == 4 || $scope.qualifiedExamID == 5
                || $scope.qualifiedExamID == 6 || $scope.qualifiedExamID == 7
                || $scope.qualifiedExamID == 8 || $scope.qualifiedExamID == 9
                || $scope.qualifiedExamID == 10) {
                $scope.CancelSSCButton = false;
                $scope.SSCBUTTONCLICK = true;
                $scope.ssclabel = false;
                $scope.Calender = false;
                $scope.DOB_TEXT = '';
            }
            else {
                $scope.SSCBUTTONCLICK = true;
                $scope.ssclabel = false;
                $scope.Calender = false;
                $scope.DOB_TEXT = '';

            }
        }

     
        $scope.getSSCDetails = function (sscHallticket, passedoutYear, sscType) {
            if (sscHallticket == '' || sscHallticket == null || sscHallticket == undefined) {
                alert("Please Enter Tenth Hallticket Number");
                return;
            }
            if (passedoutYear == '' || passedoutYear == null || passedoutYear == undefined) {
                alert("Please Enter Tenth Passed / Appearing Year");
                return;
            }

            if (sscType == '' || sscType == null || sscType == undefined) {
                alert("Please Enter Examination Stream");
                return;
            }

            $scope.loading = true;
            $scope.ENTEREDSSCHALLTICKET = true;
            $scope.ENTEREDYEAR = true;
            $scope.ENTEREDSSCTYPE = true;
            $scope.SELECTEDQUALIFIEDEXAM = true;
            $scope.GETSSCDETAILSBUTTON = true;
            var reqData = {
                RollNo: sscHallticket,
                Year: passedoutYear,
                Stream: sscType
            };

            if (passedoutYear == '2023') {

                var sscdetails = IVCPreExaminationService.getSSCNewDetails(reqData);
                sscdetails.then(function (res) {
                    if (res) {

                        let resdata = JSON.parse(res)
                        if (resdata.Status == 200) {
                            $scope.loading = false;
                            $scope.SSCBUTTONCLICK = true;
                            $scope.CancelButton = true;
                            $scope.CNAME = resdata.Name;
                            $scope.SSCVerified = true;
                            $scope.CandidateNamefound = $scope.CNAME != "" ? true : false;
                            $scope.FNAME = resdata.FatherName;
                            $scope.FatherNameFound = $scope.FNAME != "" ? true : false;
                            $scope.MNAME = resdata.MotherName;
                            $scope.MotherNamefound = $scope.MNAME != "" ? true : false;

                            $scope.Gender = resdata.Sex == "B" || resdata.Sex == "M" ? "M" : resdata.Sex == "G" || resdata.Sex == "F" ? "F" : "";
                            $scope.Genderfound = $scope.Gender != "" ? true : false;


                            $scope.DOB_DATE = resdata.DateOfBirth;
                            $scope.DOB_TEXT = resdata.DateOfBirth;
                            //$scope.DOB_DATE = moment(resdata.DateOfBirth)
                            //$scope.DOB_DATE = resdata.DateOfBirth
                            $scope.CandidateNameDOBfound = $scope.DOB_DATE != "" ? true : false;
                            $scope.Calender = true;



                        } else {
                            $scope.SSCVerified = false;
                            $scope.loading = false;
                            $scope.SSCBUTTONCLICK = false;
                            alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                            $scope.Calender = false;
                            $scope.GETSSCDETAILSBUTTON = false;
                            $scope.SELECTEDQUALIFIEDEXAM = false;
                            $scope.ENTEREDSSCHALLTICKET = false;
                            $scope.ENTEREDYEAR = false;
                            $scope.ENTEREDSSCTYPE = false;


                        }

                    } else {
                        $scope.SSCVerified = false;
                        $scope.loading = false;
                        $scope.SSCBUTTONCLICK = false;
                        alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                        $scope.Calender = false;
                        $scope.GETSSCDETAILSBUTTON = false;
                        $scope.SELECTEDQUALIFIEDEXAM = false;
                        $scope.ENTEREDSSCHALLTICKET = false;
                        $scope.ENTEREDYEAR = false;
                        $scope.ENTEREDSSCTYPE = false;



                    }


                }, function (err) {
                    $scope.SSCVerified = false;
                    $scope.loading = false;
                    $scope.SSCBUTTONCLICK = false;
                    alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                    $scope.Calender = false;
                    $scope.GETSSCDETAILSBUTTON = false;
                    $scope.SELECTEDQUALIFIEDEXAM = false;
                    $scope.ENTEREDSSCHALLTICKET = false;
                    $scope.ENTEREDYEAR = false;
                    $scope.ENTEREDSSCTYPE = false;
                })

                var sscimagedata = IVCPreExaminationService.getSSCNewImageDetails(reqData);
                sscimagedata.then(function (res) {
                    if (res) {

                        let resdata = JSON.parse(res)
                        if (resdata.Table) {
                            $scope.CancelButton = true;
                            //let StudentPhoto = $scope.StudentPhoto == null || $scope.StudentPhoto == undefined || $scope.StudentPhoto == '' ? true : false;
                            //let StudentSign = $scope.StudentSign == null || $scope.StudentSign == undefined || $scope.StudentSign == '' ? true : false;
                            $scope.StudentPhoto = resdata.Table.PHOTO;
                            $scope.StudentPhotoFound = $scope.StudentPhoto != "" ? true : false;
                            $scope.StudentSign = resdata.Table.SIGN;
                            $scope.StudentSignFound = $scope.StudentSign != "" ? true : false;

                            if ($scope.StudentPhoto != "" || $scope.StudentPhoto != null || $scope.StudentPhoto != undefined) {
                                $scope.StudentPhoto1 = true;
                            }
                            else if ($scope.StudentPhoto == "" || $scope.StudentPhoto == null || $scope.StudentPhoto == undefined) {
                                $scope.StudentPhoto1 = false;
                            }

                            if ($scope.StudentSign != "" || $scope.StudentSign != null || $scope.StudentSign != undefined) {
                                $scope.StudentSign1 = true;
                            }
                            else if ($scope.StudentSign == "" || $scope.StudentSign == null || $scope.StudentSign == undefined) {
                                $scope.StudentSign1 = false;
                            }


                        } else {
                            $scope.loading = false;
                            alert("Photo and Sign not found, Continue to fill Application");



                        }

                    } else {
                        $scope.loading = false;
                        alert("Photo and Sign not found, Continue to fill Application");

                    }


                }, function (err) {
                    $scope.loading = false;
                    alert("Photo and Sign not found, Continue to fill Application");

                })
            }
            else {

                var sscdetails = IVCPreExaminationService.getSSCDetails(reqData);
                sscdetails.then(function (res) {
                    if (res) {

                        let resdata = JSON.parse(res)
                        if (resdata.Status == 200) {
                            $scope.loading = false;
                            $scope.SSCBUTTONCLICK = true;
                            $scope.CancelButton = true;
                            $scope.CNAME = resdata.Name;
                            $scope.SSCVerified = true;
                            $scope.CandidateNamefound = $scope.CNAME != "" ? true : false;
                            $scope.FNAME = resdata.FatherName;
                            $scope.FatherNameFound = $scope.FNAME != "" ? true : false;
                            $scope.MNAME = resdata.MotherName;
                            $scope.MotherNamefound = $scope.MNAME != "" ? true : false;

                            $scope.Gender = resdata.Sex == "B" || resdata.Sex == "M" ? "M" : resdata.Sex == "G" || resdata.Sex == "F" ? "F" : "";
                            $scope.Genderfound = $scope.Gender != "" ? true : false;


                            $scope.DOB_DATE = resdata.DateOfBirth;
                            $scope.DOB_TEXT = resdata.DateOfBirth;
                            //$scope.DOB_DATE = moment(resdata.DateOfBirth)
                            //$scope.DOB_DATE = resdata.DateOfBirth
                            $scope.CandidateNameDOBfound = $scope.DOB_DATE != "" ? true : false;
                            $scope.Calender = true;



                        } else {
                            $scope.SSCVerified = false;
                            $scope.loading = false;
                            $scope.SSCBUTTONCLICK = false;
                            alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                            $scope.Calender = false;
                            $scope.GETSSCDETAILSBUTTON = false;
                            $scope.SELECTEDQUALIFIEDEXAM = false;
                            $scope.ENTEREDSSCHALLTICKET = false;
                            $scope.ENTEREDYEAR = false;
                            $scope.ENTEREDSSCTYPE = false;


                        }

                    } else {
                        $scope.SSCVerified = false;
                        $scope.loading = false;
                        $scope.SSCBUTTONCLICK = false;
                        alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                        $scope.Calender = false;
                        $scope.GETSSCDETAILSBUTTON = false;
                        $scope.SELECTEDQUALIFIEDEXAM = false;
                        $scope.ENTEREDSSCHALLTICKET = false;
                        $scope.ENTEREDYEAR = false;
                        $scope.ENTEREDSSCTYPE = false;



                    }


                }, function (err) {
                    $scope.SSCVerified = false;
                    $scope.loading = false;
                    $scope.SSCBUTTONCLICK = false;
                    alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                    $scope.Calender = false;
                    $scope.GETSSCDETAILSBUTTON = false;
                    $scope.SELECTEDQUALIFIEDEXAM = false;
                    $scope.ENTEREDSSCHALLTICKET = false;
                    $scope.ENTEREDYEAR = false;
                    $scope.ENTEREDSSCTYPE = false;
                })

                var sscimagedata = IVCPreExaminationService.getSSCImageDetails(reqData);
                sscimagedata.then(function (res) {
                    if (res) {

                        let resdata = JSON.parse(res)
                        if (resdata.Table) {
                            $scope.CancelButton = true;
                            //let StudentPhoto = $scope.StudentPhoto == null || $scope.StudentPhoto == undefined || $scope.StudentPhoto == '' ? true : false;
                            //let StudentSign = $scope.StudentSign == null || $scope.StudentSign == undefined || $scope.StudentSign == '' ? true : false;
                            $scope.StudentPhoto = resdata.Table.PHOTO;
                            $scope.StudentPhotoFound = $scope.StudentPhoto != "" ? true : false;
                            $scope.StudentSign = resdata.Table.SIGN;
                            $scope.StudentSignFound = $scope.StudentSign != "" ? true : false;

                            if ($scope.StudentPhoto != "" || $scope.StudentPhoto != null || $scope.StudentPhoto != undefined) {
                                $scope.StudentPhoto1 = true;
                            }
                            else if ($scope.StudentPhoto == "" || $scope.StudentPhoto == null || $scope.StudentPhoto == undefined) {
                                $scope.StudentPhoto1 = false;
                            }

                            if ($scope.StudentSign != "" || $scope.StudentSign != null || $scope.StudentSign != undefined) {
                                $scope.StudentSign1 = true;
                            }
                            else if ($scope.StudentSign == "" || $scope.StudentSign == null || $scope.StudentSign == undefined) {
                                $scope.StudentSign1 = false;
                            }


                        } else {
                            $scope.loading = false;
                            alert("Photo and Sign not found, Continue to fill Application");



                        }

                    } else {
                        $scope.loading = false;
                        alert("Photo and Sign not found, Continue to fill Application");

                    }


                }, function (err) {
                    $scope.loading = false;
                    alert("Photo and Sign not found, Continue to fill Application");

                })
            }

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


        $scope.uploadSSCMemo = function () {
            var input = document.getElementById("stdMemoFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 50000 && fileSize >= 5000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdMemoImg').attr('src', e.target.result);

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
                            $scope.SSCMemo = base64Image;
                            $scope.SSCMemoConvert = $scope.SSCMemo.replace(/^data:image\/[a-z]+;base64,/, "");

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 5000) {
                alert("file size should not be less than 5KB");
                $('#stdMemoFile').val('');
                return;
            } else if (fileSize >= 50000) {
                alert("file size should not be greater than 50KB");
                $('#stdMemoFile').val('');
                return;
            } else {
                alert("file size should be between 5KB and 50KB");
                $('#stdMemoFile').val('');
                return;
            }
        }

        $scope.uploadIVCMemo = function () {
            var input = document.getElementById("ivcMemoFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 50000 && fileSize >= 5000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#ivcMemoImg').attr('src', e.target.result);

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
                            $scope.IVCMemo = base64Image;
                            $scope.IVCMemoConvert = $scope.IVCMemo.replace(/^data:image\/[a-z]+;base64,/, "");

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 5000) {
                alert("file size should not be less than 5KB");
                $('#ivcMemoFile').val('');
                return;
            } else if (fileSize >= 50000) {
                alert("file size should not be greater than 50KB");
                $('#ivcMemoFile').val('');
                return;
            } else {
                alert("file size should be between 5KB and 50KB");
                $('#ivcMemoFile').val('');
                return;
            }
        }


        $scope.uploadBridgeCourseMemo = function () {
            var input = document.getElementById("bcMemoFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 50000 && fileSize >= 5000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#bcMemoImg').attr('src', e.target.result);

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
                            $scope.BridgeCourseMemo = base64Image;
                            $scope.BridgeCourseMemoConvert = $scope.BridgeCourseMemo.replace(/^data:image\/[a-z]+;base64,/, "");

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 5000) {
                alert("file size should not be less than 5KB");
                $('#bcMemoFile').val('');
                return;
            } else if (fileSize >= 50000) {
                alert("file size should not be greater than 50KB");
                $('#bcMemoFile').val('');
                return;
            } else {
                alert("file size should be between 5KB and 50KB");
                $('#bcMemoFile').val('');
                return;
            }
        }


        $scope.getStates = function () {

            var getstates = IVCAdminService.GetStates();
            getstates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.StatesData = res.Table;

            },
                function (error) {
                    alert("error while loading States");
                    //var err = JSON.parse(error);

                });
        }



        $scope.getAddressDistricts = function () {

            $scope.DistrictName = '';
            $scope.MandalName = '';
            var DataType = 2;//Get Districts by State ID
            var getdistrict = IVCAdminService.GetDistrictsbyState(DataType, $scope.State);
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.DistrictsData = res.Table;
                }
                else {
                    $scope.DistrictsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getAddressMandals = function () {

            var getmandal = IVCAdminService.GetMandalsbyDistrict($scope.District);
            getmandal.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.MandalsData = res.Table;
                }
                else {
                    $scope.MandalsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }


        $scope.getIVCCourses = function () {
            $scope.IVCCourseID = null;
            $scope.LEPCourseID1 = null;
            $scope.LEPCourseID2 = null;
            $scope.LEPCoursesData1 = [];
            $scope.LEPCoursesData2 = [];
            //let courseobj = [];
            //courseobj = { "IVCYearID": $scope.IVCYear.TenthYearID, "IVCYearName": $scope.IVCYear.TenthYear }
            var getcourse = IVCAdminService.GetIVCCourses($scope.IVCYear);
            getcourse.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.IVCCoursesData = res.Table;
                }
                else {
                    alert("data not found");

                }

            },
                function (error) {
                    //alert("data not found");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getIVCCourses1 = function () {
            //let courseobj = [];
            //courseobj = { "IVCYearID": $scope.IVCYear.TenthYearID, "IVCYearName": $scope.IVCYear.TenthYear }
            var getcourse = IVCAdminService.GetIVCCourses($scope.IVCYear);
            getcourse.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.IVCCoursesData = res.Table;
                }
                else {
                    alert("data not found");

                }

            },
                function (error) {
                    //alert("data not found");
                    //    var err = JSON.parse(error);
                });
        }

     
        $scope.getLEPCourses1 = function () {
            $scope.LEPCourseID1 == null;
            $scope.LEPCourseID2 == null;
            var getcourse = IVCAdminService.GetLEPCourses($scope.IVCCourseID);
            getcourse.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.LEPCoursesData1 = res.Table;
                    
                }
                else {
                    alert("data not found");

                }

            },
                function (error) {
                    //alert("data not found");
                    //    var err = JSON.parse(error);
                });
        }

       
        $scope.getLEPCourses10 = function () {
            var getcourse = IVCAdminService.GetLEPCourses($scope.IVCCourseID);
            getcourse.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.LEPCoursesData1 = res.Table;

                }
                else {
                    alert("data not found");

                }

            },
                function (error) {
                    //alert("data not found");
                    //    var err = JSON.parse(error);
                });
        }
        $scope.getLEPCourses2 = function () {
            $scope.LEPCourseID2 = null;
            var getcourse = IVCAdminService.GetLEPCourses($scope.IVCCourseID);
            getcourse.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.LEPCoursesData2 = res.Table;


                    if ($scope.LEPCourseID1 != "" && $scope.LEPCourseID1 != null && $scope.LEPCourseID1 != undefined) {
                        $scope.LEPCoursesData2 = $scope.LEPCoursesData2.filter((ele) => { return ele.LEPCourseID != $scope.LEPCourseID1 })
                    }
                }
                else {
                    alert("data not found");

                }

            },
                function (error) {
                    //alert("data not found");
                    //    var err = JSON.parse(error);
                });

                
                
        }

        $scope.getLEPCourses20 = function () {

            var getcourse = IVCAdminService.GetLEPCourses($scope.IVCCourseID);
            getcourse.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.LEPCoursesData2 = res.Table;


                    if ($scope.LEPCourseID1 != "" && $scope.LEPCourseID1 != null && $scope.LEPCourseID1 != undefined) {
                        $scope.LEPCoursesData2 = $scope.LEPCoursesData2.filter((ele) => { return ele.LEPCourseID != $scope.LEPCourseID1 })
                    }
                }
                else {
                    alert("data not found");

                }

            },
                function (error) {
                    //alert("data not found");
                    //    var err = JSON.parse(error);
                });



        }

        $scope.savePersonalDetails = function () {
            $scope.tabsbutton = true;
            if ($scope.qualifiedExamID == null || $scope.qualifiedExamID == undefined || $scope.qualifiedExamID == "") {
                alert("Please Select Qualified Exam");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.sscHallticket == null || $scope.sscHallticket == undefined || $scope.sscHallticket == "") {
                alert("Please Enter Hallticket Number");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.passedoutYear == null || $scope.passedoutYear == undefined || $scope.passedoutYear == "") {
                alert("Please Enter Passedout Year");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.sscType == null || $scope.sscType == undefined || $scope.sscType == "") {
                alert("Please Select SSC Type");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.CNAME == null || $scope.CNAME == undefined || $scope.CNAME == "") {
                alert("Please Enter Student Name");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.FNAME == null || $scope.FNAME == undefined || $scope.FNAME == "") {
                alert("Please Enter Father Name");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.MNAME == null || $scope.MNAME == undefined || $scope.MNAME == "") {
                alert("Please Enter Mother Name");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.DOB_DATE == null || $scope.DOB_DATE == undefined || $scope.DOB_DATE == "") {
                alert("Please Select DateofBirth");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.Gender == null || $scope.Gender == undefined || $scope.Gender == "") {
                alert("Please Select Gender");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.StudentPhoto == null || $scope.StudentPhoto == undefined || $scope.StudentPhoto == "") {
                alert("Please Select Student Photo");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.StudentSign == null || $scope.StudentSign == undefined || $scope.StudentSign == "") {
                alert("Please Select Student Signature");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.SSCMemo == null || $scope.SSCMemo == undefined || $scope.SSCMemo == "") {
                alert("Please Select SSC Memo");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.PhotoUpdate == false) {

                if ($scope.StudentPhoto1 == true) {
                    $scope.StudentPhoto = $scope.StudentPhoto
                } else {
                    $scope.StudentPhoto = $scope.StudentPhotoConvert
                }
                if ($scope.StudentSign1 == true) {
                    $scope.StudentSign = $scope.StudentSign
                } else {

                    $scope.StudentSign = $scope.StudentSignConvert
                }
                if ($scope.SSCMemo1 == true) {
                    $scope.SSCMemo = $scope.SSCMemo
                } else {

                    $scope.SSCMemo = $scope.SSCMemoConvert
                }
            } else {
                var photovalue = $("#stdPhotoFile").val();
                if (photovalue == null || photovalue == "" || photovalue == undefined) {
                    $scope.Addphoto = false
                    $scope.StudentPhoto = $scope.StudentPhoto
                } else {
                    $scope.Addphoto = true
                    $scope.StudentPhoto = $scope.StudentPhotoConvert
                }
                var SignValue = $("#stdSignFile").val();
                if (SignValue == null || SignValue == "" || SignValue == undefined) {
                    $scope.AddSign = false
                    $scope.StudentSign = $scope.StudentSign
                } else {
                    $scope.AddSign = true
                    $scope.StudentSign = $scope.StudentSignConvert
                }
                var MemoValue = $("#stdMemoFile").val();
                if (MemoValue == null || MemoValue == "" || MemoValue == undefined) {
                    $scope.AddMemo = false
                    $scope.SSCMemo = $scope.SSCMemo
                } else {
                    $scope.AddMemo = true
                    $scope.SSCMemo = $scope.SSCMemoConvert
                }

                if ($scope.qualifiedExamID == 2 || $scope.qualifiedExamID == 3
                    || $scope.qualifiedExamID == 4 || $scope.qualifiedExamID == 5
                    || $scope.qualifiedExamID == 6 || $scope.qualifiedExamID == 7
                    || $scope.qualifiedExamID == 8 || $scope.qualifiedExamID == 9
                    || $scope.qualifiedExamID == 10) {
                    $scope.SSCVerified = false;
                    $scope.tabsbutton = false;
                }
                if ($scope.SSCVerified == true) {
                    var reg = "[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}";
                    const regex = '^(?:(?:31(\-)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\-)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\-)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$'
                    if ($scope.DOB_DATE != null && $scope.DOB_DATE !== undefined) {
                        //var datechange = moment($scope.DOB_DATE).format("DD/MM/YYYY");
                        var datechange = $scope.DOB_DATE;
                        if (datechange == null || datechange == undefined || datechange == "" || datechange == "Invalid date") {
                            $scope.DOB_DATE = $scope.DOB_DATE;
                        }
                        //else {
                        //    var d = datechange.slice(0, 10).split('/');
                        //    var d = datechange.slice(0, 10).split('-');
                        //    if (d[2].length === 4) {
                        //        $scope.DOB_DATE = d[0] + "/" + d[1] + "/" + d[2];
                        //        //$scope.DOB_DATE = d[0] + "-" + d[1] + "-" + d[2];
                        //    }
                        //}
                        $scope.DOB_DATE = $scope.DOB_DATE;
                        $scope.tabsbutton = false;
                    }
                }
                else {
                    var reg = "[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}";
                    const regex = '^(?:(?:31(\-)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\-)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\-)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$'
                    if ($scope.DOB_DATE != null && $scope.DOB_DATE !== undefined) {
                        //var datechange = moment($scope.DOB_DATE).format("DD/MM/YYYY");
                        var datechange = $scope.DOB_DATE;
                        if (datechange == null || datechange == undefined || datechange == "" || datechange == "Invalid date") {
                            $scope.DOB_DATE = $scope.DOB_DATE;
                        } else {
                            var d = datechange.slice(0, 10).split('/');
                            if (d[2].length === 4) {
                                $scope.DOB_DATE = d[0] + "/" + d[1] + "/" + d[2];
                            }
                        }
                    }
                    $scope.DOB_TEXT = '';
                    $scope.tabsbutton = false;

                }
                let SSCHallTicket = ($scope.sscHallticket == null || $scope.sscHallticket == undefined || $scope.sscHallticket == '') ? '' : $scope.sscHallticket;
                let PassedOutYear = ($scope.passedoutYear == null || $scope.passedoutYear == undefined || $scope.passedoutYear == '') ? '' : $scope.passedoutYear;
                let SscType = ($scope.sscType == null || $scope.sscType == undefined || $scope.sscType == '') ? '' : $scope.sscType;
                let StudentName = ($scope.CNAME == null || $scope.CNAME == undefined || $scope.CNAME == '') ? '' : $scope.CNAME;
                let FatherName = ($scope.FNAME == null || $scope.FNAME == undefined || $scope.FNAME == '') ? '' : $scope.FNAME;
                let MotherName = ($scope.MNAME == null || $scope.MNAME == undefined || $scope.MNAME == '') ? '' : $scope.MNAME;
                let DateofBirth = ($scope.DOB_DATE == null || $scope.DOB_DATE == undefined || $scope.DOB_DATE == '') ? '' : $scope.DOB_DATE;
                let Gender = ($scope.Gender == null || $scope.Gender == undefined || $scope.Gender == '') ? '' : $scope.Gender;
                let isSSCVerified = ($scope.SSCVerified == null || $scope.SSCVerified == undefined || $scope.SSCVerified == '') ? false : true;
                var paramObj = {
                    "RegistrationID": $scope.RegistrationId,
                    "RegistrationNumber": $scope.RegistrationNumber,
                    "SSCBoardID": $scope.qualifiedExamID,
                    "TenthHallticketNumber": SSCHallTicket,
                    "TenthYear": PassedOutYear,
                    "ExaminationType": SscType,
                    "StudentName": StudentName,
                    "FatherName": FatherName,
                    "MotherName": MotherName,
                    "DateofBirth": DateofBirth,
                    "Gender": Gender,
                    "SSCVerified": isSSCVerified,
                    "DateofBirthText": $scope.DOB_TEXT,
                    "StudentPhoto": $scope.StudentPhoto,
                    "StudentSignature": $scope.StudentSign,
                    "SSCMemo": ($scope.SSCMemoConvert == undefined || $scope.SSCMemoConvert == null) ? '' : $scope.SSCMemoConvert,
                    "SSCPhoto": ($scope.StudentPhotoConvert == undefined || $scope.StudentPhotoConvert == null) ? '' : $scope.StudentPhotoConvert,
                    "SSCSign": ($scope.StudentSignConvert == undefined || $scope.StudentSignConvert == null) ? '' : $scope.StudentSignConvert,
                    "SscPhotoType": $scope.Addphoto,
                    "SscSignType": $scope.AddSign,
                    "PhotoUpdate": $scope.PhotoUpdate

                }
                $scope.tabsbutton = true;
                $scope.loader1 = true;
                var savepersonaldetails = IVCAdminService.AddStudentPersonalDetails(paramObj);
                savepersonaldetails.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    }
                    catch (err) { }

                    if (res.Table[0].StatusCode == '200') {
                        $scope.loader1 = false;
                        $scope.tabsbutton = false;
                        alert(res.Table[0].StatusDescription);
                        $scope.getDashboardStatus($scope.RegistrationNumber)
                        $scope.getStudentDetails();
                        //var DataType = 7
                        //var VerifyDate = AdminService.VerifyHtDates(DataType);
                        //VerifyDate.then(function (response) {
                        //    try {
                        //        var res = JSON.parse(response)

                        //    }
                        //    catch (err) { }
                        //    if (res[0].ResponseCode == '200') {
                        //        $scope.getDashboardStatus($scope.RegistrationNumber);
                        //    }
                        //    else if (res[0].ResponseCode == '400') {
                        //        $scope.GETDashboardStatus($scope.RegistrationNumber);
                        //    }

                        //},
                        //    function (error) {
                        //        alert("error while Verifying Dates")
                        //        //var err = JSON.parse(error);

                        //    });
                        $scope.class1 = "";
                        $scope.class2 = "active";
                        $scope.class3 = "";
                        $scope.class4 = "";
                        $scope.class5 = "";
                        $scope.class6 = "";
                        $scope.class7 = "";
                        $scope.class8 = "";
                        $scope.class9 = "";
                        //$scope.loading = false;




                    } else if (res.Table[0].StatusCode == '400') {
                        $scope.loader1 = false;
                        $scope.tabsbutton = false;
                        $scope.getDashboardStatus($scope.RegistrationNumber)
                        alert(res[0].StatusDescription);
                        $scope.getStudentDetails();




                    }


                },

                    function (error) {

                        var err = JSON.parse(error);
                    })

            }
        }

        $scope.saveCommunicationDetails = function () {
            $scope.tabsbutton = true;
            if ($scope.MobileNumber == null || $scope.MobileNumber == undefined || $scope.MobileNumber == "") {
                alert("Please Enter MobileNumber");
                $scope.tabsbutton = false;
                return;
            }
            //if ($scope.AltMobileNumber == null || $scope.AltMobileNumber == undefined || $scope.AltMobileNumber == "") {
            //    alert("Please Enter Alternate MobileNumber");
            //    return;
            //}
            if ($scope.HouseNo == null || $scope.HouseNo == undefined || $scope.HouseNo == "") {
                alert("Please Enter House Number / Building Name");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.StreetNo == null || $scope.StreetNo == undefined || $scope.StreetNo == "") {
                alert("Please Enter Street Number / Name");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.Village == null || $scope.Village == undefined || $scope.Village == "") {
                alert("Please Enter Village / Town / City");
                $scope.tabsbutton = false;
                return;
            }

            //if ($scope.Landmark == null || $scope.Landmark == undefined || $scope.Landmark == "") {
            //    alert("Please Enter Landmark");
            //    return;
            //}

            //if ($scope.Pincode == null || $scope.Pincode == undefined || $scope.Pincode == "") {
            //    alert("Please Enter Pincode");
            //    return;
            //}
            if ($scope.State == null || $scope.State == undefined || $scope.State == "") {
                alert("Please Select State");
                $scope.tabsbutton = false;
                return;
            }


            if ($scope.State == 1) {
                if ($scope.District == null || $scope.District == undefined || $scope.District == "") {
                    alert("Please Select District");
                    $scope.tabsbutton = false;
                    return;
                }
                if ($scope.Mandal == null || $scope.Mandal == undefined || $scope.Mandal == "") {
                    alert("Please Select Mandal");
                    $scope.tabsbutton = false;
                    return;
                }
            }
            else if ($scope.State == 2 || $scope.State == 3) {
                if ($scope.DistrictName == null || $scope.DistrictName == undefined || $scope.DistrictName == "") {
                    alert("Please Enter District Name");
                    $scope.tabsbutton = false;
                    return;
                }
                if ($scope.MandalName == null || $scope.MandalName == undefined || $scope.MandalName == "") {
                    alert("Please Enter Mandal Name");
                    $scope.tabsbutton = false;
                    return;
                }
            }

            let MobileNumber = ($scope.MobileNumber == null || $scope.MobileNumber == undefined || $scope.MobileNumber == '') ? '' : $scope.MobileNumber;
            let AlternateMobile = ($scope.AltMobileNumber == null || $scope.AltMobileNumber == undefined || $scope.AltMobileNumber == '') ? '' : $scope.AltMobileNumber;
            let Email = ($scope.Email == null || $scope.Email == undefined || $scope.Email == '') ? '' : $scope.Email;
            let HouseNo = ($scope.HouseNo == null || $scope.HouseNo == undefined || $scope.HouseNo == '') ? '' : $scope.HouseNo;
            let StreetNo = ($scope.StreetNo == null || $scope.StreetNo == undefined || $scope.StreetNo == '') ? '' : $scope.StreetNo;
            let Locality = ($scope.Locality == null || $scope.Locality == undefined || $scope.Locality == '') ? '' : $scope.Locality;
            let Landmark = ($scope.Landmark == null || $scope.Landmark == undefined || $scope.Landmark == '') ? '' : $scope.Landmark;
            let Village = ($scope.Village == null || $scope.Village == undefined || $scope.Village == '') ? '' : $scope.Village;
            let Districtname = ($scope.DistrictName == null || $scope.DistrictName == undefined || $scope.DistrictName == '') ? '' : $scope.DistrictName;
            let MandalName = ($scope.MandalName == null || $scope.MandalName == undefined || $scope.MandalName == '') ? '' : $scope.MandalName;
            let DistrictID = ($scope.District == null || $scope.District == undefined || $scope.District == '') ? '' : $scope.District;
            let MandalID = ($scope.Mandal == null || $scope.Mandal == undefined || $scope.Mandal == '') ? '' : $scope.Mandal;
            let Pincode = ($scope.Pincode == null || $scope.Pincode == undefined || $scope.Pincode == '') ? '' : $scope.Pincode;



            var paramObj = {
                "RegistrationID": $scope.RegistrationId,
                "RegistrationNumber": $scope.RegistrationNumber,
                "MobileNumber": MobileNumber,
                "AlternateMobileNumber": AlternateMobile,
                "Email": Email,
                "HouseNumber": HouseNo,
                "StreetName": StreetNo,
                "Locality": Locality,
                "Landmark": Landmark,
                "Village": Village,
                "StateID": $scope.State,
                "DistrictID": DistrictID,
                "DistrictName": Districtname,
                "MandalID": MandalID,
                "MandalName": MandalName,
                "Pincode": Pincode,

            }
            $scope.tabsbutton = true;
            $scope.loader2 = true;
            var savecommunicationdetails = IVCAdminService.AddStudentCommunicationDetails(paramObj);
            savecommunicationdetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.tabsbutton = false;
                    $scope.loader2 = false;
                    alert(res[0].StatusDescription);
                    //var DataType = 7
                    //var VerifyDate = AdminService.VerifyHtDates(DataType);
                    //VerifyDate.then(function (response) {
                    //    try {
                    //        var res = JSON.parse(response)

                    //    }
                    //    catch (err) { }
                    //    if (res.Table[0].ResponseCode == '200') {
                    //        $scope.getDashboardStatus($scope.RegistrationNumber);
                    //    }
                    //    else if (res.Table[0].ResponseCode == '400') {
                    //        $scope.GETDashboardStatus($scope.RegistrationNumber);
                    //    }

                    //},
                    //    function (error) {
                    //        alert("error while Verifying Dates")
                    //        //var err = JSON.parse(error);

                    //    });
                    $scope.getDashboardStatus($scope.RegistrationNumber)
                    $scope.getStudentDetails();
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "active";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    //$scope.loading = false;




                } else if (res[0].StatusCode == '400') {
                    $scope.getDashboardStatus($scope.RegistrationNumber)
                    $scope.tabsbutton = false;
                    $scope.loader2 = false;
                    alert(res[0].StatusDescription);
                    $scope.getStudentDetails();



                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.saveCategoryDetails = function () {
            $scope.tabsbutton = true;
            if ($scope.CasteCategory == null || $scope.CasteCategory == undefined || $scope.CasteCategory == "") {
                alert("Please Select Category");
                $scope.tabsbutton = false;
                return;
            }

            //if ($scope.Aadhaar == null || $scope.Aadhaar == undefined || $scope.Aadhaar == "") {
            //    alert("Please Enter Aadhaar Number");
            //    return;
            //}

            //if ($scope.CasteCertificateNumber == null || $scope.CasteCertificateNumber == undefined || $scope.CasteCertificateNumber == "") {
            //    alert("Please Enter Caste Certificate Number");
            //    return;
            //}

            if ($scope.EwsCertificate == true && $scope.EWSVerified == false && $scope.EWSNotVerified == false) {
                alert("Please Verify EWS Status");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.CasteCategory != 1 && $scope.CasteVerified == false && $scope.CasteNotVerified == false) {
                alert("Please Verify Caste Status");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.CasteCategory == 1) {
                if ($scope.EwsCertificate != false && $scope.EwsCertificate != true) {
                    alert("Please Select EWS Category");
                    $scope.tabsbutton = false;
                    return;
                }
            }

            if ($scope.EwsCertificate == 1) {
                if ($scope.EWSNumber == null || $scope.EWSNumber == undefined || $scope.EWSNumber == "") {
                    alert("Please Enter EWS Number");
                    $scope.tabsbutton = false;
                    return;
                }
            }

            let Aadhaar = ($scope.Aadhaar == null || $scope.Aadhaar == undefined || $scope.Aadhaar == '') ? '' : $scope.Aadhaar;
            let CasteCategory = ($scope.CasteCategory == null || $scope.CasteCategory == undefined || $scope.CasteCategory == '') ? '' : $scope.CasteCategory;
            let CasteCertificateNumber = ($scope.CasteCertificateNumber == null || $scope.CasteCertificateNumber == undefined || $scope.CasteCertificateNumber == '') ? '' : $scope.CasteCertificateNumber;
            let CasteVerified = ($scope.CasteVerified == null || $scope.CasteVerified == undefined || $scope.CasteVerified == '') ? '' : $scope.CasteVerified;
            let EwsCertificate = ($scope.EwsCertificate == null || $scope.EwsCertificate == undefined || $scope.EwsCertificate == '') ? '' : $scope.EwsCertificate;
            let EWSNumber = ($scope.EWSNumber == null || $scope.EWSNumber == undefined || $scope.EWSNumber == '') ? '' : $scope.EWSNumber;
            let EWSVerified = ($scope.EWSVerified == null || $scope.EWSVerified == undefined || $scope.EWSVerified == '') ? '' : $scope.EWSVerified;

            var paramObj = {
                "RegistrationID": $scope.RegistrationId,
                "RegistrationNumber": $scope.RegistrationNumber,
                "CasteCategoryID": CasteCategory,
                "AadharNumber": Aadhaar,
                "CasteCertificateNumber": CasteCertificateNumber,
                "CasteVerified": CasteVerified,
                "EWS": EwsCertificate,
                "EWSNumber": EWSNumber,
                "EWSVerified": EWSVerified,

            }
            $scope.tabsbutton = true;
            $scope.loader3 = true;
            var savecategorydetails = IVCAdminService.AddStudentCategoryDetails(paramObj);
            savecategorydetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.tabsbutton = false;
                    $scope.loader3 = false;
                    alert(res[0].StatusDescription);
                    //var DataType = 7
                    //var VerifyDate = AdminService.VerifyHtDates(DataType);
                    //VerifyDate.then(function (response) {
                    //    try {
                    //        var res = JSON.parse(response)

                    //    }
                    //    catch (err) { }
                    //    if (res[0].ResponseCode == '200') {
                    //        $scope.getDashboardStatus($scope.RegistrationNumber);
                    //    }
                    //    else if (res[0].ResponseCode == '400') {
                    //        $scope.GETDashboardStatus($scope.RegistrationNumber);
                    //    }

                    //},
                    //    function (error) {
                    //        alert("error while Verifying Dates")
                    //        //var err = JSON.parse(error);

                    //    });
                    $scope.getStudentDetails();
                    $scope.getDashboardStatus($scope.RegistrationNumber)
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "active";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    $scope.class9 = "";




                } else if (res[0].StatusCode == '400') {
                    $scope.tabsbutton = false;
                    $scope.loader3 = false;
                    $scope.CasteNotVerified = false;
                    $scope.getDashboardStatus($scope.RegistrationNumber);
                    //$scope.getStudentFeeData();

                    alert(res[0].StatusDescription);

                    //if ($scope.RegistrationCasteVerified == 1) {
                    //    $scope.CasteCategoryFound = true;
                    //    $scope.AadharFound = true;
                    //    $scope.CasteCertificateNumberFound = true;
                    //    $scope.CasteNotVerified = false;
                    //    $scope.CasteVerified = true;
                    //    $scope.CasteVerifyButton = false;
                    //}
                    //else {
                    //    $scope.CasteCategoryFound = false;
                    //    $scope.AadharFound = false;
                    //    $scope.CasteCertificateNumberFound = false;
                    //    $scope.CasteNotVerified = true;
                    //    $scope.CasteVerified = false;
                    //    $scope.CasteVerifyButton = true;
                    //}

                    //$scope.getStudentDetails();




                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.saveSpecialCategoryDetails = function () {
            $scope.tabsbutton = true;
            if ($scope.RegionID == null || $scope.RegionID == undefined || $scope.RegionID == "") {
                alert("Please Select Region");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.MinorityID == null || $scope.MinorityID == undefined || $scope.MinorityID == "") {
                alert("Please Select Minority");
                $scope.tabsbutton = false;
                return;
            }
            //if ($scope.Assistance_Urdu == null || $scope.Assistance_Urdu == undefined || $scope.Assistance_Urdu == "") {
            //    alert("Please Select Assistance in Urdu");
            //    $scope.tabsbutton = false;
            //    return;
            //}
            if ($scope.Handicaped == null || $scope.Handicaped == undefined || $scope.Handicaped == "") {
                alert("Please Select Physically Handicaped");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.NCC == null || $scope.NCC == undefined || $scope.NCC == "") {
                alert("Please Select NCC");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.Sports == null || $scope.Sports == undefined || $scope.Sports == "") {
                alert("Please Select Sports");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.CAP == null || $scope.CAP == undefined || $scope.CAP == "") {
                alert("Please Select CAP");
                $scope.tabsbutton = false;
                return;
            }
            //if ($scope.PMCares == null || $scope.PMCares == undefined || $scope.PMCares == "") {
            //    alert("Please Select PM Cares");
            //    $scope.tabsbutton = false;
            //    return;
            //}
            //if ($scope.AppearforBiology == null || $scope.AppearforBiology == undefined || $scope.AppearforBiology == "") {
            //    alert("Please Select Appear for Biology");
            //    $scope.tabsbutton = false;
            //    return;
            //}


            let Region = ($scope.RegionID == null || $scope.RegionID == undefined || $scope.RegionID == '') ? '' : $scope.RegionID;
            let Minority = ($scope.MinorityID == null || $scope.MinorityID == undefined || $scope.MinorityID == '') ? '' : $scope.MinorityID;
            //let Assistance_Urdu = ($scope.Assistance_Urdu == null || $scope.Assistance_Urdu == undefined || $scope.Assistance_Urdu == '') ? '' : $scope.Assistance_Urdu;
            let Handicaped = ($scope.Handicaped == null || $scope.Handicaped == undefined || $scope.Handicaped == '') ? '' : $scope.Handicaped;
            let NCC = ($scope.NCC == null || $scope.NCC == undefined || $scope.NCC == '') ? '' : $scope.NCC;
            let Sports = ($scope.Sports == null || $scope.Sports == undefined || $scope.Sports == '') ? '' : $scope.Sports;
            let CAP = ($scope.CAP == null || $scope.CAP == undefined || $scope.CAP == '') ? '' : $scope.CAP;
            //let PMCares = ($scope.PMCares == null || $scope.PMCares == undefined || $scope.PMCares == '') ? '' : $scope.PMCares;
            //let AppearforBiology = ($scope.AppearforBiology == null || $scope.AppearforBiology == undefined || $scope.AppearforBiology == '') ? '' : $scope.AppearforBiology;

            var paramObj = {
                "RegistrationID": $scope.RegistrationId,
                "RegistrationNumber": $scope.RegistrationNumber,
                "RegionID": Region,
                "MinorityID": Minority,
                //"AssistanceinUrdu": Assistance_Urdu,
                "PH": Handicaped,
                "NCC": NCC,
                "SportsAndGames": Sports,
                "CAP": CAP,
                //"PMCares": PMCares,
                //"AppearedForBiology": AppearforBiology,

            }
            $scope.tabsbutton = true;
            $scope.loader4 = true;
            var savespecialcategorydetails = IVCAdminService.AddStudentSpecialCategoryDetails(paramObj);
            savespecialcategorydetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.loader4 = false;
                    $scope.tabsbutton = false;
                    alert(res[0].StatusDescription);
                    //var DataType = 7
                    //var VerifyDate = AdminService.VerifyHtDates(DataType);
                    //VerifyDate.then(function (response) {
                    //    try {
                    //        var res = JSON.parse(response)

                    //    }
                    //    catch (err) { }
                    //    if (res[0].ResponseCode == '200') {
                    //        $scope.getDashboardStatus($scope.RegistrationNumber);
                    //    }
                    //    else if (res[0].ResponseCode == '400') {
                    //        $scope.GETDashboardStatus($scope.RegistrationNumber);
                    //    }

                    //},
                    //    function (error) {
                    //        alert("error while Verifying Dates")
                    //        //var err = JSON.parse(error);

                    //    });
                    $scope.getStudentDetails();
                    $scope.getDashboardStatus($scope.RegistrationNumber)
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "active";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    $scope.class9 = "";
                    //$scope.loading = false;




                } else if (res[0].StatusCode == '400') {
                    $scope.getDashboardStatus($scope.RegistrationNumber)
                    $scope.loader4 = false;
                    $scope.tabsbutton = false;
                    alert(res[0].StatusDescription);
                    $scope.getStudentDetails();




                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }



        $scope.saveStudyDetails = function () {
            $scope.tabsbutton = true;
            if ($scope.IVCYear == null || $scope.IVCYear == undefined || $scope.IVCYear == "") {
                alert("Please Select IVC Year");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.IVCCourseID == null || $scope.IVCCourseID == undefined || $scope.IVCCourseID == "") {
                alert("Please Select Inter Vocational Course");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.PassedAttempt == null || $scope.PassedAttempt == undefined || $scope.PassedAttempt == "") {
                alert("Please Select passed in Single Attempt");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.LEPCourseID1 == null || $scope.LEPCourseID1 == undefined || $scope.LEPCourseID1 == "") {
                alert("Please Select Applied for Lateral Entry Preference 1");
                $scope.tabsbutton = false;
                return;
            }
            //if ($scope.LEPCourseID2 == null || $scope.LEPCourseID2 == undefined || $scope.LEPCourseID2 == "") {
            //    alert("Please Select Applied for Lateral Entry Preference 2");
            //    $scope.tabsbutton = false;
            //    return;
            //}
            if ($scope.OneYearMarks == null || $scope.OneYearMarks == undefined || $scope.OneYearMarks == "") {
                alert("Please Enter Aggregate Marks Obtained in inter 1st Year");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.TwoYearMarks == null || $scope.TwoYearMarks == undefined || $scope.TwoYearMarks == "") {
                alert("Please Enter Aggregate Marks Obtained in inter 2nd Year");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.OneYearEngMarks == null || $scope.OneYearEngMarks == undefined || $scope.OneYearEngMarks == "") {
                alert("Please Enter Marks Obtained in inter 1st Year English");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.TwoYearEngMarks == null || $scope.TwoYearEngMarks == undefined || $scope.TwoYearEngMarks == "") {
                alert("Please Enter Marks Obtained in inter 2nd Year English");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.BridgeCourseMarks == null || $scope.BridgeCourseMarks == undefined || $scope.BridgeCourseMarks == "") {
                alert("Please Enter Marks secured in Bridge course");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.BridgePassed == null || $scope.BridgePassed == undefined || $scope.BridgePassed == "") {
                alert("Please Select Whether passed in the bridge course");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.IVCMemo == null || $scope.IVCMemo == undefined || $scope.IVCMemo == "") {
                alert("Please Select IVC Memo");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.BridgeCourseMemo == null || $scope.BridgeCourseMemo == undefined || $scope.BridgeCourseMemo == "") {
                alert("Please Select Bridge Course Memo");
                $scope.tabsbutton = false;
                return;
            }



            var paramObj = {
                "RegistrationID": $scope.RegistrationId,
                "RegistrationNumber": $scope.RegistrationNumber,
                "IVCYear": $scope.IVCYear,
                "IVCCourseID": $scope.IVCCourseID,
                "PassedInSingleAttempt": $scope.PassedAttempt,
                "LEPCourseID1": $scope.LEPCourseID1,
                "LEPCourseID2": $scope.LEPCourseID2,
                "FirstYearMarks": $scope.OneYearMarks,
                "SecondYearMarks": $scope.TwoYearMarks,
                "FirstYearEnglishMarks": $scope.OneYearEngMarks,
                "SecondYearEnglishMarks": $scope.TwoYearEngMarks,
                "BridgeCourseMarks": $scope.BridgeCourseMarks,
                "BridgeCoursePassed": $scope.BridgePassed,
                "IVCMemo": ($scope.IVCMemoConvert == undefined || $scope.IVCMemoConvert == null) ? '' : $scope.IVCMemoConvert,
                "BridgeCourseMemo": ($scope.BridgeCourseMemoConvert == undefined || $scope.BridgeCourseMemoConvert == null) ? '' : $scope.BridgeCourseMemoConvert
                

            }
            $scope.tabsbutton = true;
            $scope.loader6 = true;
            var savestudydetails = IVCAdminService.AddStudentStudyDetails(paramObj);
            savestudydetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.Table[0].StatusCode == '200') {
                    $scope.tabsbutton = false;
                    $scope.loader6 = false;
                    alert(res.Table[0].StatusDescription);
                    //var DataType = 7
                    //var VerifyDate = AdminService.VerifyHtDates(DataType);
                    //VerifyDate.then(function (response) {
                    //    try {
                    //        var res = JSON.parse(response)

                    //    }
                    //    catch (err) { }
                    //    if (res[0].ResponseCode == '200') {
                    //        $scope.getDashboardStatus($scope.RegistrationNumber);
                    //    }
                    //    else if (res[0].ResponseCode == '400') {
                    //        $scope.GETDashboardStatus($scope.RegistrationNumber);
                    //    }

                    //},
                    //    function (error) {
                    //        alert("error while Verifying Dates")
                    //        //var err = JSON.parse(error);

                    //    });
                    $scope.getStudentDetails();
                    $scope.getDashboardStatus($scope.RegistrationNumber);
                    if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus == 1) {
                        $scope.class1 = "";
                        $scope.class2 = "";
                        $scope.class3 = "";
                        $scope.class4 = "";
                        $scope.class5 = "";
                        $scope.class6 = "active";
                        $scope.class7 = "";
                        $scope.class8 = "";
                    } else {
                        alert("Please Fill All Details for Preview")
                    }
                    //$scope.loading = false;




                } else if (res.Table[0].StatusCode == '400') {
                    $scope.tabsbutton = false;
                    $scope.loader6 = false;
                    alert(res.Table[0].StatusDescription);
                    $scope.getDashboardStatus($scope.RegistrationNumber)
                    $scope.loading = false;
                    $scope.getStudentDetails();



                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }



        $scope.Submit = function () {

             if ($scope.qualifiedExamID == 1 && $scope.SSCVerified == 0) {
                alert('SSC-TS Students should get details from SSC Board in Personal Details Tab and then Submit the Application')
                return;
            }

            else {
                $scope.modalInstance = $uibModal.open({
                    templateUrl: "/app/views/IVC/Popups/StudentApplicationSubmitPopup.html",
                    size: 'small',
                    scope: $scope,
                    backdrop: 'static',
                    //windowClass: 'modal-fit-att',
                    backdrop: false,
                });

            }

            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        $scope.ConfirmSubmit = function () {
            $scope.tabsbutton = true;
            var submitapplication = IVCAdminService.SetApplicationSubmit($scope.RegistrationId);
            submitapplication.then(function (response) {
                try {
                    var res = JSON.parse(response)
                }
                catch (err) { }
                if (res[0].StatusCode == '200') {
                    $scope.loader8 = false;
                    $scope.tabsbutton = false;
                    alert(res[0].StatusDescription);
                    $scope.modalInstance.close();
                    $scope.getDashboardStatus();
                    if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus == 1) {
                        $scope.class1 = "";
                        $scope.class2 = "";
                        $scope.class3 = "";
                        $scope.class4 = "";
                        $scope.class5 = "";
                        $scope.class6 = "";
                        $scope.class7 = "active";
                        $scope.class8 = "";
                        $scope.class9 = "";
                    } else {
                        alert("Please Fill all the Details")
                        $scope.class1 = "active";
                        $scope.class2 = "";
                        $scope.class3 = "";
                        $scope.class4 = "";
                        $scope.class5 = "";
                        $scope.class6 = "";
                        $scope.class7 = "";
                        $scope.class8 = "";
                        $scope.class9 = "";
                    }


                } else if (res[0].StatusCode == '400') {
                    $scope.loader8 = false;
                    $scope.tabsbutton = false;
                    alert(res[0].StatusDescription)
                }
            },
                function (error) {
                    //alert("error while Verifying Dates")
                    //var err = JSON.parse(error);

                });
        }

      
    })
})