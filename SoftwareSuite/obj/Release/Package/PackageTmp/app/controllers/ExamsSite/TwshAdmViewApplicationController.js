define(['app'], function (app) {
    app.controller("TwshAdmViewApplicationController", function ($scope, $filter, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
        var authData = $localStorage.Twsh;
        //$scope.userId = authData.UserId;
        $scope.yesBtn = 'Application';
        $scope.AppValue = true;
        $scope.editStudentData = false;
        //$scope.UserId = $localStorage.Twsh == undefined || $localStorage.Twsh == "" ? -1 : $localStorage.Twsh.UserId; //---- for private candidate  UserId = -1

        //$scope.LoadExamCenters = function () {
        //    var ExamCenters = TwshStudentRegService.getExaminationCenters(parseInt($scope.UserId), $scope.DistrictId, $scope.CourseId, $scope.GradeId);
        //    ExamCenters.then(function (req) {
        //        $scope.examCenterList = req
        //    }, function (err) {
        //        $scope.examCenterList = [];
        //        alert("no data found");
        //    });

        //}

        $scope.Districts = [];

        $scope.loadDistricts = function () {
            if ($scope.tmpmode == 1) {
                var GetOnlineExamDist = TwshStudentRegService.GetOnlineExamDist();
                GetOnlineExamDist.then(function (res) {
                    $scope.Districts = res;
                }, function (err) {
                    $scope.Districts = [];
                });

            } else {
                var ExamDistricts = TwshStudentRegService.getExaminationDistricts($scope.CourseId, parseInt($scope.UserId), $scope.GradeId);
                ExamDistricts.then(function (res) {
                    $scope.Districts = res;
                }, function (err) {
                    $scope.Districts = [];
                });

            }
        }

        $scope.LoadExamCenters = function (DistrictId) {

            $scope.examCenterList = [];
            try {
                $scope.SelectedDistrictId = JSON.parse(DistrictId);
                // var course = JSON.parse($scope.course); 
            } catch (er) { }


            if ($scope.tmpmode == 1) {
                //-------------------Load online exam Centers-----------------------
                var ExamCenters = TwshStudentRegService.getonlineExaminationCenters($scope.CourseId, $scope.SelectedDistrictId.Id);
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

            } else if ($scope.tmpmode == 2) {
                //-----------------load offline Exam Centers----------------------
                var ExamCenters = TwshStudentRegService.getExaminationCenters(parseInt($scope.UserId), $scope.SelectedDistrictId.Id, $scope.CourseId, $scope.GradeId);
                ExamCenters.then(function (req) {
                    $scope.examCenterList = req
                }, function (err) {
                    $scope.examCenterList = [];
                    alert("no data found");
                });
            }

        }


        $scope.getDetails = function () {
            var reg = "[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}";
            if ($scope.CandidateNameDOB != null && $scope.CandidateNameDOB !== undefined && !$scope.CandidateNameDOBfound && !(reg == $scope.CandidateNameDOBfound)) {
                var datechange = moment($scope.CandidateNameDOB).format("DD/MM/YYYY HH:mm:ss");
                var d = datechange.slice(0, 10).split('/');
                if (d[2].length === 4) {
                    $scope.CandidateNameDOBchange = d[0] + "/" + d[1] + "/" + d[2];
                }
            }
            $scope.loader1 = true;
            $scope.getbutton1 = true;
            var GetApplicationData = TwshStudentRegService.getStudentApplicationData($scope.ApplicationNo);
            GetApplicationData.then(function (response) {

                if (response.length > 0) {
                    $scope.loader1 = false;
                    $scope.getbutton1 = false;
                    $scope.getData = true;
                    $scope.editStudentData = false;
                    $scope.showStatus = false;
                    var ApplicationDetails = response;
                    $scope.DateOfBirth = ApplicationDetails[0].DateOfBirth;
                    $scope.CourseShortName = ApplicationDetails[0].CourseShortName;
                    $scope.ExaminationCenterName = ApplicationDetails[0].ExaminationCenterName;
                    $scope.ExamDate = ApplicationDetails[0].ExamDate;
                    $scope.UserId = ApplicationDetails[0].userid == null ? '-1' : ApplicationDetails[0].userid;;
                    $scope.GradeName = ApplicationDetails[0].GradeName;
                    //$scope.UserId = ApplicationDetails[0].InstitutionId == null ? '-1' : ApplicationDetails[0].InstitutionId;
                    $scope.Name = ApplicationDetails[0].StudentName;
                    $scope.VillageTown = ApplicationDetails[0].VillageTown;
                    $scope.FatherName = ApplicationDetails[0].FatherName;
                    $scope.MotherName = ApplicationDetails[0].MotherName;
                    //$scope.FatherName = ApplicationDetails[0].FatherName;
                    $scope.DateOfBirth = ApplicationDetails[0].DateOfBirth;
                    $scope.CandidateNameDOB1 = ApplicationDetails[0].DateOfBirth;
                    $scope.Gender = ApplicationDetails[0].Gender;
                    $scope.ApplicationNumber = ApplicationDetails[0].ApplicationNumber;
                    $scope.GradeName = ApplicationDetails[0].GradeName;
                    $scope.IsBlind = ApplicationDetails[0].IsBlind;
                    $scope.EmailId = ApplicationDetails[0].EmailId;
                    $scope.HnoStreet = ApplicationDetails[0].HnoStreet;
                    $scope.DistrictName = ApplicationDetails[0].DistrictName;
                    $scope.CategoryCode = ApplicationDetails[0].CategoryCode;
                    $scope.StudentPhoneNumber = ApplicationDetails[0].StudentPhoneNumber;
                    $scope.ExamDate = ApplicationDetails[0].ExamDate;
                    $scope.ExamBatch = ApplicationDetails[0].ExamBatch;
                    $scope.UserUploadPhoto = ApplicationDetails[0].Photo;
                    $scope.ExaminationCenterName = ApplicationDetails[0].ExaminationCenterName;
                    $scope.tmpmode = ApplicationDetails[0].ExamMode;
                    $scope.LanguageName = ApplicationDetails[0].LanguageName;
                    $scope.IsEligible = ApplicationDetails[0].IsEligible;
                    $scope.IsRejected = ApplicationDetails[0].isrejected;
                    $scope.IsReleased = ApplicationDetails[0].isreleased;
                    $scope.IsFeePaid = ApplicationDetails[0].IsFeePaid;
                    $scope.CourseId = ApplicationDetails[0].CourseId;
                    $scope.LanguageId = ApplicationDetails[0].LanguageId;
                    $scope.GradeId = ApplicationDetails[0].GradeId;
                    $scope.ExamCenterId = ApplicationDetails[0].ExamCenterId;
                    $scope.RejectedRemarks = ApplicationDetails[0].RejectedRemarks;
                    $scope.ReleasedRemarks = ApplicationDetails[0].ReleasedRemarks;

                    $scope.GetExamDates()
                    $scope.loadDistricts();

                } else {
                    $scope.loader1 = false;
                    $scope.getbutton1 = false;
                    $scope.getData = false;
                    $scope.StatusMessage = "No data found!";
                    $scope.showStatus = true;
                    $scope.statusclass = "alert-danger";
                    ApplicationDetails[0] = [];
                }

            }, function (error) {
                $scope.getData = false;
                $scope.StatusMessage = "No data found!";
                $scope.showStatus = true;
                $scope.statusclass = "alert-danger";
                ApplicationDetails[0] = [];
            });
        }

        $scope.getDetailsByMobile = function (mobile, dob) {

            var reg = "[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}";
            if ($scope.dateOfBirth != null && $scope.dateOfBirth !== undefined && !$scope.dateOfBirthFound && !(reg == $scope.dateOfBirthFound)) {
                var datechange = moment($scope.dateOfBirth).format("DD/MM/YYYY HH:mm:ss");
                var d = datechange.slice(0, 10).split('/');
                if (d[2].length === 4) {
                    $scope.CandidateDob = d[0] + "/" + d[1] + "/" + d[2];
                }
            }

            $scope.loader2 = true;
            $scope.getbutton2 = true;
            var GetDetailsByMobileDetails = TwshStudentRegService.getDetailsByMobileNumber($scope.MobileNo);
            GetDetailsByMobileDetails.then(function (response) {

                if (response.length > 0) {
                    $scope.loader2 = false;
                    $scope.getbutton2 = false;
                    $scope.getData = true;
                    $scope.showStatus = false;
                    $scope.editStudentData = false;
                    var ApplicationDetails = response;
                    $scope.Name = ApplicationDetails[0].StudentName;
                    $scope.FatherName = ApplicationDetails[0].FatherName;
                    $scope.MotherName = ApplicationDetails[0].MotherName;
                    $scope.DateOfBirth = ApplicationDetails[0].DateOfBirth;
                    $scope.CandidateNameDOB1 = ApplicationDetails[0].DateOfBirth;
                    $scope.Gender = ApplicationDetails[0].Gender;
                    $scope.ApplicationNumber = ApplicationDetails[0].ApplicationNumber;
                    $scope.GradeName = ApplicationDetails[0].GradeName;
                    // $scope.UserId = ApplicationDetails[0].InstitutionId == null ? '-1' : ApplicationDetails[0].InstitutionId;
                    $scope.UserId = ApplicationDetails[0].userid == null ? '-1' : ApplicationDetails[0].userid;
                    $scope.IsBlind = ApplicationDetails[0].IsBlind;
                    $scope.EmailId = ApplicationDetails[0].EmailId;
                    $scope.HnoStreet = ApplicationDetails[0].HnoStreet;
                    $scope.tmpmode = ApplicationDetails[0].ExamMode;
                    $scope.DistrictName = ApplicationDetails[0].DistrictName;
                    $scope.CategoryCode = ApplicationDetails[0].CategoryCode;
                    $scope.StudentPhoneNumber = ApplicationDetails[0].StudentPhoneNumber;
                    $scope.ExamDate = ApplicationDetails[0].ExamDate;
                    $scope.ExamBatch = ApplicationDetails[0].ExamBatch;
                    $scope.Photo = ApplicationDetails[0].Photo;
                    $scope.ExaminationCenterName = ApplicationDetails[0].ExaminationCenterName;
                    $scope.DistrictName = ApplicationDetails[0].DistrictName;
                    $scope.LanguageName = ApplicationDetails[0].LanguageName;
                    $scope.IsEligible = ApplicationDetails[0].IsEligible;
                    $scope.IsRejected = ApplicationDetails[0].isrejected;
                    $scope.IsReleased = ApplicationDetails[0].isreleased;                    $scope.IsFeePaid = ApplicationDetails[0].IsFeePaid;
                    $scope.CourseId = ApplicationDetails[0].CourseId;
                    $scope.LanguageId = ApplicationDetails[0].LanguageId;
                    $scope.GradeId = ApplicationDetails[0].GradeId;
                    $scope.ExamCenterId = ApplicationDetails[0].ExamCenterId;
                    $scope.RejectedRemarks = ApplicationDetails[0].RejectedRemarks;
                    $scope.ReleasedRemarks = ApplicationDetails[0].ReleasedRemarks;
                    $scope.GetExamDates()
                    $scope.loadDistricts();

                } else {
                    $scope.loader2 = false;
                    $scope.getbutton2 = false;
                    $scope.getData = false;
                    $scope.StatusMessage = "No data found!";
                    $scope.showStatus = true;
                    $scope.statusclass = "alert-danger";
                    //  ApplicationDetails[0] = [];
                }

            },
                function (error) {
                    $scope.loader2 = false;
                    $scope.getbutton2 = false;
                    $scope.getData = false;
                    $scope.StatusMessage = "No data found!";
                    $scope.showStatus = true;
                    $scope.statusclass = "alert-danger";
                    ApplicationDetails[0] = [];
                });
        }
        $scope.editData = function () {
            $scope.editbutton = true;
            $scope.loader3 = true;
                var GetDetailsByMobileDetails = TwshStudentRegService.getStudentDetails($scope.ApplicationNumber);
                GetDetailsByMobileDetails.then(function (response) {
                    //console.log(response)
                    //console.log(response.Table[0].ResponseCode)
                    if (response.Table[0].ResponseCode == '200') {
                        //alert()
                        $scope.userPhotos = "";
                        $scope.getData = false;
                        $scope.editStudentData = true;
                        $scope.editbutton = false;
                        $scope.loader3 = false;
                        $scope.ApplicatioNo = response.Table1[0].ApplicationNumber;
                        $scope.EmailId = response.Table1[0].EmailId;
                        $scope.HnoStreet = response.Table1[0].HnoStreet;
                        $scope.VillageTown = response.Table1[0].VillageTown;
                        $scope.tmpmode = response.Table1[0].ExamMode
                        $scope.userPhotos = response.Table1[0].Photo;
                        $scope.DistrictId = response.Table1[0].DistrictId;
                        $scope.SelectedDistrictId = {
                            Id: response.Table1[0].DistrictId
                        }
                        $scope.ExamCenterId = response.Table1[0].ExamCenterId;
                        $scope.Photo = response.Table1[0].Photo;
                        $scope.DistrictName = response.Table1[0].DistrictName;
                        $scope.stdSscCert = response.Table1[0].File1;
                        $scope.StdinterCert = response.Table1[0].File2;
                        $scope.IsBlind = response.Table1[0].IsBlind == false ? '0' : '1';
                        $scope.ExamDateselect = response.Table1[0].ExamDate;
                        $scope.ExamDate = response.Table1[0].ExamDate;
                        $scope.exambatch = response.Table1[0].ExamBatch;


                    } else {

                        alert(response.Table[0].ResponseDescription);
                        $scope.editbutton = false;
                        $scope.loader3 = false;
                        $scope.userPhotos = "";
                        $scope.getData = true;
                        $scope.editStudentData = false;
                        $scope.ApplicatioNo = "";
                        $scope.EmailId = "";
                        $scope.HnoStreet = "";
                        $scope.VillageTown = "";
                        $scope.tmpmode = "";
                        $scope.userPhotos = "";
                        $scope.DistrictId = "";
                        $scope.Photo = "";
                        $scope.DistrictName = "";
                        $scope.stdSscCert = "";
                        $scope.StdinterCert = "";
                    }



                }, function (error) {


                });
            

        }
        $scope.UpdateData = function () {
            if ($scope.tmpmode == 1) {
                //if (arr.length < 5) {
                //    alert("choose all exam dates");
                //    return;
                //}     

                //$scope.finalArray = arr.map(function (obj) {

                //    return obj.date;
                //});

                $scope.finalArray = arr.map(function (obj) {

                    //var datechange = moment(obj.date).format("DD/MM/YYYY HH:mm:ss");
                    //    var d = datechange.slice(0, 10).split('/');
                    //    if (d[2].length === 4) {
                    //        obj.date = d[0] + "/" + d[1] + "/" + d[2];
                    //    }

                    var myDate = new Date();
                    myDate = $filter('date')(obj.date, "dd-MM-yyyy");

                    return myDate;
                });

                $scope.ExamDate = JSON.stringify($scope.finalArray).replace("/", "-");
                //console.log('$scope.finalArray=', $scope.finalArray);
                //console.log('$scope.ExamDate=', $scope.ExamDate);
            }

            if ($scope.IsFeePaid == 0 && $scope.tmpmode == 2) {
                $scope.ExamDate = $scope.ExamDateselected.ExamDate;
            }

            //console.log('ApplicatioNo = ', $scope.ApplicatioNo, 'userPhotos = ', $scope.userPhotos, 'stdSscCert = ',$scope.stdSscCert,
            //    'StdinterCert = ', $scope.StdinterCert, 'SelectedDistrictId = ', $scope.SelectedDistrictId.Id, 'HnoStreet = ', $scope.HnoStreet, 'VillageTown = ', $scope.VillageTown, 'EmailId = ', $scope.EmailId, 'ExamDate = ',$scope.ExamDate,
            //    'Name = ', $scope.Name, 'FatherName = ', $scope.FatherName, 'MotherName = ', $scope.MotherName, 'Gender = ', $scope.Gender, 'CandidateNameDOB1 = ', $scope.CandidateNameDOB1, 'IsBlind = ', $scope.IsBlind, 'GradeId = ', $scope.GradeId, 'exambatch = ', $scope.exambatch, 'ExamCenterId = ', $scope.ExamCenterId,
            //    'StudentPhoneNumber = ',$scope.StudentPhoneNumber);
            if ($scope.Name == '' || $scope.Name == undefined || $scope.Name ==null) {
                alert('Please Enter Student Name');
                return;
            }
            if ($scope.FatherName == '' || $scope.FatherName == undefined || $scope.FatherName == null) {
                alert('Please Enter Father Name');
                return;
            }
            if ($scope.MotherName == '' || $scope.MotherName == undefined || $scope.MotherName == null) {
                alert('Please Enter Mother Name');
                return;
            }
            if ($scope.Gender == '' || $scope.Gender == undefined || $scope.Gender == null) {
                alert('Please select Gender');
                return;
            }
            if ($scope.CandidateNameDOB1 == '' || $scope.CandidateNameDOB1 == undefined || $scope.CandidateNameDOB1 == null) {
                alert('Please select Date of Birth');
                return;
            }

            if ($scope.IsBlind == '' || $scope.IsBlind == undefined || $scope.IsBlind == null) {
                alert('Please select IsBlind');
                return;
            }

            if ($scope.SelectedDistrictId.Id == '' || $scope.SelectedDistrictId.Id == undefined || $scope.SelectedDistrictId.Id == null) {
                alert('Please select Exam District');
                return;
            }

            if ($scope.ExamCenterId == '' || $scope.ExamCenterId == undefined || $scope.ExamCenterId == null) {
                alert('Please select Exam Center');
                return;
            }

            if ($scope.ExamDate == '' || $scope.ExamDate == undefined || $scope.ExamDate == null) {
                alert('Please select Exam Date');
                return;
            }


            if ($scope.exambatch == '' || $scope.exambatch == undefined || $scope.exambatch == null) {
                alert('Please select Exam Batch')
            }

            if ($scope.HnoStreet == '' || $scope.HnoStreet == undefined || $scope.HnoStreet == null) {
                alert('Please Enter HnoStreet')
            }


            if ($scope.VillageTown == '' || $scope.VillageTown == undefined || $scope.VillageTown == null) {
                alert('Please Enter Village/Town')
            }

            if ($scope.StudentPhoneNumber == '' || $scope.StudentPhoneNumber == undefined || $scope.StudentPhoneNumber == null) {
                alert('Please Enter  StudentPhoneNumber')
            }

          


            var UpdateData = TwshStudentRegService.updatStudentDetails($scope.ApplicatioNo, $scope.userPhotos, $scope.stdSscCert,
                $scope.StdinterCert, $scope.SelectedDistrictId.Id, $scope.HnoStreet, $scope.VillageTown, $scope.EmailId, $scope.ExamDate,
                $scope.Name, $scope.FatherName, $scope.MotherName, $scope.Gender, $scope.CandidateNameDOB1, $scope.IsBlind, $scope.GradeId, $scope.exambatch, $scope.ExamCenterId,
                $scope.StudentPhoneNumber);
            UpdateData.then(function (response) {
                console.log(response)
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription);
                }
                else if (response[0].ResponceCode == '400') {
                    alert(response[0].ResponceDescription);
                }
                //$scope.StatusMessage = "Student Details updated Successfully";
                //$scope.showStatus = true;
                //$scope.statusclass = "alert-success";
                $scope.getData = false;
                $scope.editStudentData = false;

            }, function (error) {


            });
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

        $scope.offlineExamDates = [];
        $scope.GetExamDates = function () {

            var getexamdates = TwshStudentRegService.getExamDates($scope.CourseId, $scope.GradeId)
            getexamdates.then(function (resp) {
                $scope.ExamDates = resp;
            }, function (err) {
                $scope.ExamDates = []
            });
        }
        $scope.getBatches = function (ExamDateselect) {
            $scope.exambatchList = [];
            $scope.ExamDateselected = JSON.parse(ExamDateselect);
            var getBatches = TwshStudentRegService.getBatches($scope.ExamDateselected.Id, $scope.CourseId, $scope.GradeId);
            getBatches.then(function (res) {
                $scope.exambatchList = res;
            }, function (err) {
                $scope.exambatchList = [];
            })
        }

        $scope.openStudentList = function () {
            $state.go('TWSH.ViewAuthorization')
        }
        $scope.clickRadio = function (value) {

            if (value === 'Application') {
                $scope.MobileValue = false;
                $scope.AppValue = true;
            } else {
                $scope.AppValue = false;
                $scope.MobileValue = true;
            }
        }

        $scope.uploadPhoto = function () {
            var input = document.getElementById("stdPhotoFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 50000) {
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

                            $scope.userPhotos = base64Image;

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else {
                alert("file size should be less then 50kb ");
                return;
            }
        }

        $scope.uploadSscCert = function () {
            var input = document.getElementById("stdSscCertFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 300000) {
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

                            // var data = base64Image.replace(/^data:image\/\w+;base64,/, "");

                            $scope.stdSscCert = base64Image;
                        });

                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else {
                alert("file size should be less then 300kb. ");
                return;
            }
        }

        $scope.uploadInterCert = function () {
            var input = document.getElementById("StdinterCertoFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 300000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#StdinterCert').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");

                            // var data = base64Image.replace(/^data:image\/\w+;base64,/, "");

                            $scope.StdinterCert = base64Image;
                        });

                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else {
                alert("file size should be less then 300kb. ");
                return;
            }
        }
    })
})