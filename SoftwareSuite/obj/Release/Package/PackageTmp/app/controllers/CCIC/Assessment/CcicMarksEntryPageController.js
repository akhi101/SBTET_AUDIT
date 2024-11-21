define(['app'], function (app) {
    app.controller("CcicMarksEntryPageController", function ($scope, $http, $state, $localStorage, $uibModal, CcicAssessmentService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var InstitutionID = authData.InstitutionID;
        var tmpdata1 = $localStorage.TempData1;
        $scope.InstitutionName = authData.InstitutionName;
        $scope.AcademicYearID = tmpdata1.AcademicYearID;
        $scope.ExamMonthYearID = tmpdata1.ExamMonthYearID;
        $scope.InstitutionID = tmpdata1.InstitutionID;
        $scope.CourseID = tmpdata1.CourseID;
        $scope.ExamTypeID = tmpdata1.ExamTypeID;
        $scope.ExamTypeName = tmpdata1.ExamTypeName;
        $scope.SubjectID = $localStorage.SubjectDetails.SubjectID;
        var issaved = true;




        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }


        $scope.loadPinAndMarks = function () {
            markslist = [];
            previewlist = [];
            var subjectPinList = CcicAssessmentService.getCcicSubjectPinList($scope.AcademicYearID, $scope.ExamMonthYearID, $scope.InstitutionID, $scope.CourseID, $scope.ExamTypeID, $scope.SubjectID);
            subjectPinList.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch { error }
                if (res.Table.length > 0) {
                    //   console.log(response);
                    $scope.subjectDetailsView = true;
                    //var marksIdList = response
                    $scope.studentsNotFound = false;
                    $scope.LoadImgForPinList = false;
                    $scope.pinWise = res.Table;
                    $scope.Submitted = res.Table[0].Submitted;
                    $scope.MaxMarks = res.Table1[0].MaxMarks;
                    $scope.CourseName = res.Table1[0].CourseName;
                    $scope.AcademicYear = res.Table1[0].AcademicYear;
                    $scope.ExamMonthYear = res.Table1[0].ExamMonthYear;
                    $scope.SubjectCode = res.Table1[0].SubjectCode;
                    $scope.SubjectName = res.Table1[0].SubjectName;
                    markslist = res.Table.map((obj) => { if (obj.Marks != null) { return { MarksEntryDataID: obj.MarksEntryDataID, Marks: obj.Marks } } });
                    markslist = markslist.filter(function (element) { return element !== undefined; });
                }

                if (previewlist.length == $scope.pinWise.length) {
                    issaved = true;
                    $scope.subbtn = true;
                }
                //else {
                //        alert('No Pins available for the selected inputs.')
                //        if (!angular.isUndefined(res) && res.length > 0) {
                //            alert(res[0].ResponceDescription);
                //        }
                //    }
            }, function (error) {
                $scope.pinWise = [];
                $scope.subjectDetailsView = false;
                $scope.studentsNotFound = true;
                $scope.LoadImgForPinList = false;
                let err = JSON.parse(error)
                console.log(err);

            });

        }

        var tempId = [];

        var tempId1 = [];
        $scope.AddMarksById = function (data) {
            var isvalied = false;
            //if (data.Marks == '') {
            //    alert("Please  Enter Marks")
            //    return;
            //    $('#' + data.MarksEntryDataID).val('');
            //    if (markslist.length >= 0) {
            //        markslist.map((obj) => {
            //            if (obj.MarksEntryDataID == data.MarksEntryDataID) {
            //                obj.Marks = '';
            //                obj.MarksEntryDataID = '';
            //                isvalied = false;
            //            }
            //        });
            //    }
            //    return;
            //}
            if (data.Marks.length > $scope.MaxMarks.length) {
                alert("Marks Entered character length should not exceed maximum marks length.");
                $('#' + data.MarksEntryDataID).val('');
                return;
                isvalied = false;
            }
            if (data.Marks > $scope.MaxMarks) {
                alert("Marks Entered should not be greater than maximum marks.");
                $('#' + data.MarksEntryDataID).val('');
                if (markslist.length > 0) {
                    markslist.map((obj) => {
                        if (obj.MarksEntryDataID == data.MarksEntryDataID) {
                            obj.Marks = '';
                            obj.MarksEntryDataID = '';
                            isvalied = false;
                        }
                    });
                }
                return;
            }
            if (data.Marks.includes(".")) {
                alert('Entered marks are not valid');
                $('#' + data.MarksEntryDataID).val('');
                return;
            }
            data.Marks = data.Marks.trim();
            if (data.Marks != null && data.Marks != "") {
                if (isNaN(data.Marks)) {
                    if (data.Marks.toUpperCase() == 'AB' || data.Marks.toUpperCase() == 'MP') {
                        //$('#' + data.MarksEntryDataID).val('');
                        //if (markslist.length >= 0) {
                        //    markslist.map((obj) => {
                        //        if (obj.MarksEntryDataID == data.MarksEntryDataID) {
                        //            obj.Marks = data.Marks;
                        //        }
                        //    });
                        //}
                        isvalied = true;
                    } else {
                        //$('#' + data.MarksEntryDataID).val('');
                        //if (markslist.length >= 0) {
                        //    markslist.map((obj) => {
                        //        if (obj.MarksEntryDataID == data.MarksEntryDataID) {
                        //            obj.Marks = data.Marks;
                        //        }
                        //    });
                        //}
                        isvalied = false;
                    }

                } else {
                    isvalied = true;
                }
            }
            if (data.Marks != null && data.Marks != "" && isvalied) {
                if (markslist.length > 0) {
                    markslist.map((obj) => {
                        if (obj.MarksEntryDataID == data.MarksEntryDataID) {
                            obj.Marks = data.Marks;
                            tempId.push(data.MarksEntryDataID);
                        }
                        if (obj.MarksEntryDataID != data.MarksEntryDataID && !tempId.includes(data.MarksEntryDataID)) {
                            var marksdata = $scope.addData(data.MarksEntryDataID, data.Marks);
                            tempId.push(data.MarksEntryDataID);
                            markslist.push(marksdata);

                        }
                    });

                } else if (markslist.length == 0) {
                    var marksdata = $scope.addData(data.MarksEntryDataID, data.Marks);
                    markslist.push(marksdata);

                }

            }

        },


            //$scope.editMarks = function (data) {
            //    let pin = data.pin;
            //    subid = $localStorage.assessment.selectSubjectDetails.subid;

            //    var editmarksentered = MarksEntryService.editMarksEntry($scope.College_Code, branchCode, semId, examId, subid, pin, $scope.ExamMonthYear);
            //    editmarksentered.then(function (res) {
            //        console.log(res);
            //        $scope.loadPinAndMarks();
            //    }, function (err) {
            //        console.log(err);
            //        alert("error occured while editing the marks");
            //    });

            //}



            //var tempId = [];

            //var tempId1 = [];

            $scope.addData = function (MarksEntryDataID, Marks) {
                return {
                    MarksEntryDataID: MarksEntryDataID,
                    Marks: Marks,
                };
            },



            $scope.DataSaved = function (type) {

                if (type == 0) {
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/CCIC/Popups/MarksEntrySubmitPopup.html",
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

        $scope.OpenPopup = function (type) {

            if (markslist.length != $scope.pinWise.length) {
                alert("Please Enter All Students Marks for Submit")
                return;
                $scope.modalInstance.close();
            }
            if (type == 1) {
                $scope.modalInstance.close();
            }
            else {
                $scope.SubmitMarks(0);
            }
            //if ($scope.Mobile == null || $scope.Mobile == undefined || $scope.Mobile == '') {
            //    alert("Please Update Mobile Number in Affiliation Portal");
            //    return;
            //}
            //$scope.SendOtp()


        }

        $scope.save = function (type) {
            $scope.SaveDisable = true;
            if (markslist == [] || markslist== '' || markslist== null) {
                alert('No Data Present');
                $scope.SaveDisable = false;
                return;
            }
            //else if (markslist[0].Marks == [] || markslist[0] == '' || markslist[0] == null) {
            //    alert('No Data Present');
            //    $scope.SaveDisable = false;
            //    return;
            //}
            if (markslist != [] && markslist != '') {


                var postmarks = CcicAssessmentService.PostStudentMarks(markslist, $scope.UserName);
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
                //$scope.modalInstance.close();
                alert('No valid data Present');
                $scope.loadPinAndMarks();

            }

        }


        $scope.SubmitMarks = function (type) {
            $scope.SaveDisable = true;
 
            if (markslist == [] || markslist == '' || markslist == null) {
                alert('No Data Present');
                $scope.SaveDisable = false;
                return;
            }
            //else if (markslist[0].Marks == [] || markslist[0] == '' || markslist[0] == null) {
            //    alert('No Data Present');
            //    $scope.SaveDisable = false;
            //    return;
            //}
            if (type == 1) {
                $scope.SaveDisable = false;
                $scope.modalInstance.close();
            }

            else if (type == 0) {
                $scope.SaveDisable = true;


                if (markslist != [] && markslist != '') {


                    var postmarks = CcicAssessmentService.PostStudentMarks(markslist, $scope.UserName);
                    postmarks.then(function (response) {
                        $scope.SaveDisable = false;
                        //   console.log(response);
                        //alert('Marks are Saved Successfully');
                        issaved = true;
                        //$scope.DataSaved(type)
                        //$scope.modalInstance.close();
                        //$scope.loadPinAndMarks();
                    }, function (error) {
                        $scope.SaveDisable = false;
                        console.log(error);
                        // alert(error);
                    });
                    if (markslist.length != $scope.pinWise.length) {
                        alert("Please Enter All Students Marks for Submit");
                        $scope.SaveDisable = false;
                        return;
                        //$scope.modalInstance.close();
                    }
                    else if (markslist.length == $scope.pinWise.length) {
                        var submitMarks = CcicAssessmentService.SubmitMarksEntered($scope.AcademicYearID, $scope.ExamMonthYearID, $scope.InstitutionID, $scope.CourseID, $scope.ExamTypeID, $scope.SubjectID);
                        submitMarks.then(function (response) {
                            $scope.SaveDisable = false;
                            alert('Marks are Submited Successfully');
                            //$scope.modalInstance.close();
                            $scope.loadPinAndMarks();
                        }, function (error) {
                            $scope.SaveDisable = false;
                            console.log(error);
                        });
                    }
                } else {
                    $scope.SaveDisable = false;
                    //$scope.modalInstance.close();
                    alert('No valid data Present');
                    //$scope.loadPinAndMarks();

                }
               

            }

            else {
                $scope.save(1)
                return;
                $scope.SaveDisable = false;

            }
        }
        $scope.back = function () {
            $state.go("CcicDashboard.Assessment.SubjectList");
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
            var bl = parsent.parseFromString('<div id="divtitle">STATE BOARD OF TECHNICAL EDUCATION AND TRAINING TELANGANA</div>', "text/html")
            var parse = new DOMParser();
            var al = parse.parseFromString('<div id="divtop" ><span id="text-left"><label class="label-pad">Institution : </label>' + $scope.InstitutionCode + '-' + $scope.InstitutionName + '</span><span id="text-right"> </div>', "text/html");
            var parser = new DOMParser();
            var el = parser.parseFromString('<div id="divtoadd" ><label class="label-pad">Course :</label>' + $scope.CourseName + ' </span></div>', "text/html");
            var parser = new DOMParser();
            var fl = parser.parseFromString('<div id="divtoaddmore" ><span id="text-left"><label class="label-pad">Subject : </label>' + $scope.SubjectCode + '-' + $scope.SubjectName + '</span></div>', "text/html");
            var parser = new DOMParser();
            var gl = parser.parseFromString('<div id="divtoaddMore" ><span id="text-left"><label class="label-pad">Exam Type : </label>' + $scope.ExamTypeName + '</span></div>', "text/html");
            var parser = new DOMParser();
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
                var divToPrintheadmore = fl.getElementById("divtoaddmore");
                var divToPrintheadMore = gl.getElementById("divtoaddMore");
                $markstable.appendChild(divToPrintheads);
                $markstable.appendChild(divToPrintheaded);
                $markstable.appendChild(divToPrinthead);
                $markstable.appendChild(divToPrintheadmore);
                $markstable.appendChild(divToPrintheadMore);


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
            //$scope.$emit("logout", authData.UserName);
            sessionStorage.loggedIn = "no";
            var GetCcicUserLogout = CcicSystemUserService.PostCcicUserLogout($scope.UserName, $scope.SessionID);

            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;

            $scope.authentication = {
                isAuth: false,
                UserID: 0,
                UserName: ""
            };
            $state.go('CcicLogin');
        }

    });
});