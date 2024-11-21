define(['app'], function (app) {

    app.controller("TheoryMarksEntryController", function ($scope, $http, $localStorage, $uibModal, $state, $uibModal, $stateParams, PreExaminationService , AppSettings, MenuService, AssessmentService, MarksEntryService, PaymentService) {

        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.userName = authData.userName;
        var BranchCode = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        $scope.CollegeID = authData.CollegeID;
        $scope.College_Code = authData.College_Code;
        $scope.College_Name = authData.College_Name;
        $scope.BranchId = authData.BranchId;
        $scope.showcollegedetail = false;
        $scope.subjectDetailsView = false;
        $scope.LoadImgForPinList = true;
        $scope.studentsNotFound = true;
        $scope.subbtn = false;
        var issaved = true;
        var selectScheme = $localStorage.assessment.Scheme;
        $scope.SchemeId = $localStorage.assessment.Scheme;
        $scope.AcademicYearsActiveResponse = $localStorage.assessment.AcademicYearsActiveResponse;
        $scope.ExamMonthYear = $localStorage.assessment.ExamMonthYear;
        $scope.selectedsem = $localStorage.assessment.selectedsem;
        $scope.branch = $localStorage.assessment.branchName;
        var examtype = $localStorage.assessment.entryList;
        var branchName = $localStorage.assessment.branchName;
        $scope.subjectCode = $localStorage.assessment.selectSubjectDetails.Subject_Code;
        var SubjectCode = $localStorage.assessment.selectSubjectDetails.Subject_Code;
        var AcademicId = $localStorage.assessment.AcademicYearsActiveResponse.AcademicID;
        var semId = $localStorage.assessment.selectedsem.semid;
        var examId = $localStorage.assessment.entryListid;
        var branchCode = authData.userName.split('_')[0];
        var semName = $localStorage.assessment.selectedsem.sem;
        var collegeName = authData.College_Name;
        var examTypeId = $localStorage.assessment.entryListid
        var StudentTypeId = $localStorage.assessment.StudentTypeId
        $scope.StudentTypeId = $localStorage.assessment.StudentTypeId;
        var schemeid = parseInt($localStorage.assessment.Scheme);

        var getDatesAndPins = MarksEntryService.getDatesFineAmount(examId, semId, AcademicId, $scope.ExamMonthYear);
        getDatesAndPins.then(function (response) {
            if (response.length > 0) {
                var format = 'DD/MM/YYYY HH:mm:ss';
                let startdate = response[0].fromdate;
                let enddate = response[0].todate;
                let finedate = response[0].finedate;
                $scope.fineAmount = response[0].fine_ammount;

                var CurrentDate = moment();
                let beforeTime = moment(startdate, format);
                let fineTime = moment(enddate, format);
                let endTime = moment(finedate, format);

                //$scope.payFineAmount();
                if (CurrentDate.isBetween(beforeTime, fineTime)) {

                    var status = MarksEntryService.getSubmitStatus($scope.College_Code, branchCode, AcademicId, semId, examId, $scope.ExamMonthYear);
                    status.then(function (res) {
                        if (res.Table.length > 0) {
                            if (res.Table[0].isFinePayed == false) {


                            }

                        }

                    }, function (err) {
                        console.log(err);
                    });

                } else if (CurrentDate.isBetween(fineTime, endTime)) {
                    var status = MarksEntryService.getSubmitStatus($scope.College_Code, branchCode, AcademicId, semId, examId, $scope.ExamMonthYear);
                    status.then(function (res) {
                        if (res.Table.length > 0) {
                            if (res.Table[0].isFinePayed == true) {


                            } else {
                                alert("Last Date for marks entry is completed, please pay fine to continue for marks entry");
                                $state.go('Dashboard.AssessmentDashboard.TheorySubjectList');
                            }

                        }

                    }, function (err) {
                        console.log(err);
                    });

                } else if (CurrentDate.isBefore(beforeTime)) {
                    alert("Marks Entry is not scheduled.");
                    $state.go('Dashboard.AssessmentDashboard.TheorySubjectList');

                }

                else if (CurrentDate.isAfter(endTime)) {
                    alert("Last Date for marks entry is completed");
                    $state.go('Dashboard.AssessmentDashboard.TheorySubjectList');

                }

            }


        }, function (error) {

        });



        var loadedScheme = '';
        var schemeStatus = AssessmentService.getSchemeStatus(); // for getting the pin and marks list 
        schemeStatus.then(function (response) {
            var SchemesList = response.Table;
            SchemesList.forEach(function (scheme) {
                if (schemeid === scheme.SchemeID) {
                    loadedScheme = scheme;
                    $scope.loadedScheme = scheme;
                    // $scope.loadPinAndMarks();
                }
            });

        }, function (error) {
            alert("error");
        });

        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }


        var markslist = [];
        var previewlist = [];
        var NEMarksList = [];
        $scope.loadPinAndMarks = function () {
            markslist = [];
            previewlist = [];
            NEMarksList = [];
            $scope.subjectDetailsView = false;
            $scope.LoadImgForPinList = true;
            var Scheme = {};
            Schemeid = (loadedScheme == undefined || loadedScheme == '') ? $localStorage.assessment.selectedsem.current_schemeid : loadedScheme.SchemeID;
            var subid = $localStorage.assessment.selectSubjectDetails.subid;
            var subjectPinList = MarksEntryService.getSubjectPinList($scope.AcademicYearsActiveResponse.AcademicID, $scope.SchemeId, $localStorage.authorizationData.College_Code, semId, $localStorage.authorizationData.BranchId, subid, examTypeId, StudentTypeId, $scope.ExamMonthYear);
            subjectPinList.then(function (response) {
                if (response.Table.length > 0) {
                    //   console.log(response);
                    $scope.subjectDetailsView = true;
                    //var marksIdList = response
                    $scope.studentsNotFound = false;
                    $scope.LoadImgForPinList = false;
                    $scope.pinWise = response.Table;
                    NEMarksList = response;
                    PinIdlist = response.Table.map((obj) => { return { id: obj.id } });
                    markslist = response.Table.map((obj) => { if (obj.marks != null) { return { id: obj.id, marks: obj.marks, IndustryName: obj.IndustryName } } });
                    markslist = markslist.filter(function (element) { return element !== undefined; });
                    Induslist = response.Table.map((obj) => { if (obj.IndustryName != null) { return { id: obj.id, marks: obj.marks, IndustryName: obj.IndustryName } } });
                    Induslist = Induslist.filter(function (element) { return element !== undefined; });
                    $scope.SubjectName = response.Table1[0].SubjectName;
                    $scope.MaxMarks = response.Table1[0].maxmarks;
                    $scope.IndustryName = response.Table1[0].IndustryName;
                    $scope.Mobile = response.Table1[0].Mobile;
                    $scope.ExamDetails = response.Table1[0].ExamDetails;
                    $scope.Subject_Code = response.Table1[0].Subject_Code;
                    $scope.AbsentStudents = response.Table1[0].AbsentCount;
                    $scope.OtherStudents = response.Table1[0].OtherCount;
                    $scope.TotalStudents = response.Table1[0].Total;
                    response.Table.forEach(function (stud) {
                        if (stud.marks != null) {
                            previewlist.push(stud);
                        }

                    });

                    if (previewlist.length == $scope.pinWise.length) {
                        issaved = true;
                        $scope.subbtn = true;
                    }
                } else {
                    alert('No Pins available for the selected inputs.')
                    if (!angular.isUndefined(response.Table2) && response.Table2.length > 0) {
                        alert(response.Table2[0].ResponceDescription);
                    }

                }
            }, function (error) {
                $scope.pinWise = [];
                $scope.subjectDetailsView = false;
                $scope.studentsNotFound = true;
                $scope.LoadImgForPinList = false;
                let err = JSON.parse(error)
                console.log(err);

            });

        }

        $scope.getExamStatus = function (exam) {
            $scope.examName = exam;
            $scope.homeDashBoard = false;
        }
        $scope.editMarks = function (data) {
            let pin = data.pin;
            subid = $localStorage.assessment.selectSubjectDetails.subid;

            var editmarksentered = MarksEntryService.editMarksEntry($scope.College_Code, branchCode, semId, examId, subid, pin, $scope.ExamMonthYear);
            editmarksentered.then(function (res) {
                console.log(res);
                $scope.loadPinAndMarks();
            }, function (err) {
                console.log(err);
                alert("error occured while editin the marks");
            });

        }


        $scope.OpenDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("Dashboard");
        }

        var tempId = [];

        $scope.addData = function (id, marks) {
            return {
                id: id,
                marks: marks,
            };
        },

            $scope.FeedbackCheck = function (data) {
                if (data.IsFeedBackSubmitted == false) {
                    alert("Student Feedback Not Submitted")
                }
            }

        $scope.AddMarksById = function (data) {
            var isvalied = false;
            if (data.marks.length > $scope.MaxMarks.length) {
                alert("Marks Entered character length should not exceed maximum marks length.");
                $('#' + data.id).val('');
                return;
            }
            if (data.marks > $scope.MaxMarks) {
                alert("Marks Entered should not be greater than maximum marks.");
                $('#' + data.id).val('');
                if (markslist.length > 0) {
                    markslist.map((obj) => {
                        if (obj.id == data.id) {
                            obj.marks = '';
                        }
                    });
                }
                return;
            }
            const invalidChars = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;;
            if (invalidChars.test(data.marks)) {
                data.marks = data.marks.replace(invalidChars, "");
                return;
            }
            if (data.marks.includes(".")) {
                alert('Entered marks are not valid');
                $('#' + data.id).val('');
                return;
            }
            data.marks = data.marks.trim();
            if (data.marks != null && data.marks != "") {
                if (isNaN(data.marks)) {
                    if (data.marks.toUpperCase() == 'AB' || data.marks.toUpperCase() == 'MP' || data.marks.toUpperCase() == 'DC' || data.marks.toUpperCase() == 'TC' || data.marks.toUpperCase() == 'DT') {
                        isvalied = true;
                    } else {
                        isvalied = false;
                    }

                } else {
                    isvalied = true;
                }

            }
            if (data.marks != null && data.marks != "" && isvalied) {
                if (markslist.length > 0) {
                    markslist.map((obj) => {
                        if (obj.id == data.id) {
                            obj.marks = data.marks;
                            tempId.push(data.id);
                        }
                        if (obj.id != data.id && !tempId.includes(data.id)) {
                            var marksdata = $scope.addData(data.id, data.marks);
                            tempId.push(data.id);
                            markslist.push(marksdata);

                        }
                    });

                } else if (markslist.length == 0) {
                    var marksdata = $scope.addData(data.id, data.marks);
                    markslist.push(marksdata);
                }
            }
        },

            $scope.save = function (type) {
                $scope.SaveDisable = true;
                // if (semId == 6 && $scope.SchemeId == 5 && $scope.examTypeId == 4 || semId == 6 && $scope.SchemeId == 5 && $scope.examTypeId == 18) {
                //if ($scope.IndustryName == 1) {
                //var outArr = [];
                //        PinIdlist.forEach(function (value) {
                //            var existing = Induslist.filter(function (v, i) {
                //                return (v.id == value.id);
                //            });
                //            var existing2 = markslist.filter(function (v, i) {      
                //                return (v.id == value.id);
                //            });

                //            if (existing.length) {
                //              //  value.marks = existing[0].marks;
                //                value.IndustryName = existing[0].IndustryName;
                //                outArr.push(value)
                //            }
                //             if (existing2.length) {
                //                value.marks = existing2[0].marks;
                //               // value.IndustryName = "";
                //                outArr.push(value)
                //            }
                //            else if (existing.length) {
                //                value.marks = existing[0].marks;
                //                value.IndustryName = existing[0].IndustryName;
                //                outArr.push(value)
                //            } else {
                //                value.marks = "";
                //                value.IndustryName = "";
                //                outArr.push(value);
                //            }
                //        });
                //        outArr = outArr.filter(i => !(i.marks == "" && i.IndustryName == ""));
                //        markslist = outArr;
                //  }
                //}

                if (markslist != [] && markslist != '') {


                    var postmarks = MarksEntryService.PostStudentMarks(examId, $scope.SchemeId, markslist, StudentTypeId);
                    postmarks.then(function (response) {
                        $scope.SaveDisable = false;
                        //   console.log(response);
                        //alert('Marks are Saved Successfully');
                        issaved = true;
                        $scope.DataSaved(type)
                        //$scope.modalInstance.close();
                        $scope.loadPinAndMarks();
                    }, function (error) {
                        $scope.SaveDisable = false;
                        console.log(error);
                        // alert(error);
                    });
                } else {
                    $scope.SaveDisable = false;
                  //  $scope.modalInstance.close();
                    alert('No valid data Present');
                    $scope.loadPinAndMarks();

                }

            }
        $scope.back = function () {
            $state.go("Dashboard.AssessmentDashboard.TheorySubjectList");
        }
        $scope.submit = function (type) {
            $scope.SaveDisable = true;
            //var conf = confirm("Are you sure you want to submit the marks");
            //if (conf) {
            if (type == 1) {
                $scope.SaveDisable = false;
                $scope.modalInstance.close();
            } else {
                $scope.save(1)
                return;
            }

            subid = $localStorage.assessment.selectSubjectDetails.subid;
            let collegeCode = authData.College_Code;

            var submitMarks = MarksEntryService.SubmitMarksEntered(collegeCode, branchCode, AcademicId, semId, examId, subid, $scope.ExamMonthYear, $scope.Mobile);
            submitMarks.then(function (response) {
                //   console.log(response);
                $scope.SaveDisable = false;
                alert('Marks are Submited Successfully');
                $scope.modalInstance.close();
                $scope.loadPinAndMarks();
            }, function (error) {
                $scope.SaveDisable = false;
                console.log(error);
            });
            //}

        }

        $scope.OpenPopup1 = function (type) {
            if ($scope.StudentTypeId == 1) {
                $scope.OpenPopup(type)
            } else if ($scope.StudentTypeId == 2) {

                $scope.modalInstance = $uibModal.open({
                    templateUrl: "/app/views/Popups/AssessmentBacklogPopup.html",
                    size: 'xs',
                    scope: $scope,
                    windowClass: 'modal-fit-att',
                });
                $scope.closeModal = function () {

                    $scope.modalInstance.close();
                }
            }
        }

        $scope.OpenPopup = function (type, Mobile) {
            if ($scope.StudentTypeId == 2) {
                $scope.Mobile = Mobile
            }
            if (markslist.length != $scope.pinWise.length) {
                alert("Please Enter All Students Marks for Submit")
                return;
                $scope.modalInstance.close();
            }
            if (type == 1) {
                $scope.modalInstance.close();
            }
            if ($scope.Mobile == null || $scope.Mobile == undefined || $scope.Mobile == '') {
                alert("Please Update Mobile Number in Affiliation Portal");
                return;
            }
            $scope.SendOtp()
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/AssessmentPopup.html",
                size: 'xs',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });

            $scope.closeModal = function () {

                $scope.modalInstance.close();
            }
        }

        $scope.SendOtp = function () {
            if ($scope.Mobile != null && $scope.Mobile != undefined && $scope.Mobile.length == '10') {
                //if ($scope.OldSudent) {
                //    var Pin = $scope.PinNumber;
                //} else {
                //    var Pin = $scope.userData.Pin;
                //}
                $scope.Otp = true;
                $scope.NoOtp = false;
                $scope.loader = true
                $scope.Otpdisable = true;
                var GenerateOtpForMobile = PreExaminationService.GenerateOtpForMobileNo($scope.Mobile, $scope.Mobile, $scope.StudentTypeId, $scope.ExamDetails)
                GenerateOtpForMobile.then(function (response) {
                    try {
                        var detail = JSON.parse(response);
                    } catch (err) { }
                    if (detail.status == '200') {
                        alert(detail.description);
                        $scope.Otp = true;
                        $scope.NoOtp = false;
                        $scope.loader = false
                        $scope.Otpdisable = false;
                    } else {
                        alert(detail.description);
                        $scope.Otp = false;
                        $scope.NoOtp = true;
                        $scope.loader = false
                        $scope.Otpdisable = false;
                    }
                }, function (error) {
                    alert('error occured while sending OTP');
                    $scope.Otp = false;
                    $scope.NoOtp = true;
                    $scope.loader = false
                    $scope.Otpdisable = false;
                })

            } else if ($scope.Mobile == null || $scope.Mobile == undefined || $scope.Mobile == '') {
                if ($scope.StudentTypeId == 1) {
                    alert("Please Update Mobile Number in Affiliation Portal");
                    return;
                } else if ($scope.StudentTypeId == 2) {
                    alert("Please Faculty/Incharge Mobile Number");
                    return;
                }
            } else if ($scope.Mobile.length != '10') {
                alert('Enter valid Mobile number');
            } else {
                alert("Please Enter Mobile Number");
            }


        }
        $scope.counter = 0;
        $scope.ReSendOtp = function () {
            $scope.counter++;
            if ($scope.counter > 2) {
                $scope.limitexceeded = true;
                return;
            } else {
                //if ($scope.OldSudent) {
                //    var Pin = $scope.PinNumber;
                //} else {
                //    var Pin = $scope.userData.Pin;
                //}
                var GenerateOtpForMobileNoUpdate = PreExaminationService.GenerateOtpForMobileNo($scope.Mobile, $scope.Mobile, $scope.StudentTypeId)
                GenerateOtpForMobileNoUpdate.then(function (response) {
                    try {
                        var detail = JSON.parse(response);
                    } catch (err) { }
                    if (detail.status == '200') {
                        alert(detail.description);
                        $scope.Otp = true;
                        $scope.NoOtp = false;
                    } else {
                        alert(detail.description);
                        $scope.Otp = false;
                        $scope.NoOtp = true;
                    }
                }, function (error) {
                    alert('error occured while Resending OTP');
                    $scope.Otp = false;
                    $scope.NoOtp = true;
                });


            }
        }

        $scope.VerifyOtp = function (otp) {
            $scope.OTPdata = otp
            if ($scope.OTPdata == null || $scope.OTPdata == "" || $scope.OTPdata == undefined) {
                alert('Please Enter OTP.');
                return;
            }
            if ($scope.OTPdata.length != '6') {
                alert('Please Enter valid OTP.');
                return;
            }
            //if ($scope.OldSudent) {
            //    var Pin = $scope.PinNumber;
            //} else {
            //    var Pin = $scope.userData.Pin;
            //}
            var UpdateUserdata = PreExaminationService.UpdateUserdata($scope.Mobile, $scope.Mobile, $scope.OTPdata)
            UpdateUserdata.then(function (response) {

                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res.Table[0].StatusCode == '200') {
                    alert(res.Table[0].StatusDescription);
                    $scope.submit(1)
                    $scope.phonenoupdated = true;
                    $scope.Verified = true;

                } else {
                    alert(res.Table[0].StatusDescription);
                    $scope.phonenoupdated = false;
                    $scope.Verified = false;
                }
            }, function (error) {
                alert('error occured while updating Mobile number.');
                $scope.phonenoupdated = false;
                $scope.Verified = false;
            });


        }

        $scope.DataSaved = function (type) {
            if (type == 0) {
                $scope.modalInstance = $uibModal.open({
                    templateUrl: "/app/views/Popups/AssessmentSubmitPopup.html",
                    size: 'xs',
                    scope: $scope,
                    windowClass: 'modal-fit-att',
                });
                $scope.closeModal = function () {

                    $scope.modalInstance.close();
                }
            } else {
                $scope.OpenPopup()
            }



        }

            $scope.printMarksEntered = function () {
                if (issaved == false) {
                    alert('Save the marks before You Print');
                    return;
                }
                var divName = "idtoDivPrint";
                var $markstable = document.createElement("div");
                $markstable.innerHTML = '';
                $markstable.className = "table";

                var parsent = new DOMParser();
                var bl = parsent.parseFromString('<div id="divtitle">STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA</div>', "text/html");


                var parse = new DOMParser();
                var al = parse.parseFromString('<div id="divtop" ><span id="text-left"><label class="label-pad">College : </label>' + collegeName + '</span><span id="text-right"><label class="label-pad">Branch :</label>' + branchName + "(" + BranchCode + ")" + ' </span> </div>', "text/html");
                var parser = new DOMParser();
                var el = parser.parseFromString('<div id="divtoadd" ><span id="text-left"><label class="label-pad">Scheme : </label>' + $scope.loadedScheme.Scheme + '</span><span id="text-center"><label class="label-pad sem-pad"> Semester :</label>' + semName + "     " + '</span><span id="text-right"><label class="label-pad">Subject Code :</label>' + SubjectCode + '</span></div>', "text/html");
                var divToPrint = document.getElementById(divName);
                var temp = document.body.innerHTML;
                $("#markslist").hide();
                var domClone = divToPrint.cloneNode(true);
                var $printSection = document.getElementById("printSection");
                if (!$printSection) {
                    var $printSection = document.createElement("div");
                    $printSection.id = "printSection";
                    //var $ele1 = document.createElement("div");
                    //$ele1.className = "sbtet_img";             
                    var divToPrintheads = bl.getElementById("divtitle");
                    var divToPrintheaded = al.getElementById("divtop");
                    var divToPrinthead = el.getElementById("divtoadd");
                    $markstable.appendChild(divToPrintheads);
                    $markstable.appendChild(divToPrintheaded);
                    $markstable.appendChild(divToPrinthead);


                    document.body.appendChild($printSection);

                    var $ele1 = document.createElement("div");
                    $ele1.className = "row";

                    var $ele2 = document.createElement("div");
                    $ele2.className = "col-lg-2 col-md-12";

                    var $ele3 = document.createElement("div");
                    $ele3.className = "col-lg-10 col-md-12";

                    //var $titlelogo = document.createElement("div");               
                    //$titlelogo.className = "sbtet_img";

                    // var $img = document.createElement("img");
                    // $img.src = "../../../contents/img/big-logo.png";
                    // $img.className = "image";

                    //var $titlelabel = document.createElement("div");
                    //$titlelabel.className = "logo-name";

                    //var $title = document.createElement("h2");
                    //$title.innerHTML = "STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA";
                    //$titlelabel.className = "title-label";

                    //$titlelabel.appendChild($title);
                    //  $titlelogo.appendChild($img);

                    // $ele2.appendChild($titlelogo);
                    //$ele3.appendChild($titlelabel);

                    //  $ele1.appendChild($ele2);
                    $ele1.appendChild($ele3);

                    $printSection.appendChild($ele1);

                    $printSection.appendChild($ele1);
                    $printSection.appendChild($markstable);

                }
                $printSection.appendChild(domClone);
                // console.log($printSection.innerHTML);
                window.print();
                document.body.removeChild($printSection);
                $("#markslist").show();
                $scope.showcollegedetail = false;

            }

        $scope.logOut = function () {
            $scope.$emit("logout", authData.userName);
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;

            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
            $state.go('login')
        }


    });
});