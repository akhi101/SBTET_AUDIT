define(['app'], function (app) {
    app.controller("StudentRegListController", function ($scope, $crypto, SystemUserService, $state, $stateParams, $localStorage, AppSettings, StudentRegService, RegisterAdmittedStudentService, $uibModal, Excel, $timeout, $rootScope) {
        var data = {};
        $scope.Loading = false;
        $scope.$emit('showLoading', data);

        // var reply ="<?xml version=\"1.0\"?>\n<PidData><Resp errCode=\"0\" errInfo=\"SUCCESS\" fCount=\"0\" fType=\"0\" iCount=\"1\" iType=\"0\" pCount=\"0\" pType=\"0\" nmPoints=\"000\" qScore=\"100\"/><DeviceInfo dpId=\"INTEGRA.IMSPL\" rdsId=\"IMS.WIN.004\" rdsVer=\"1.0.1\" dc=\"cbd481c5-1744-4704-9aa4-18938131ff4f\" mi=\"IMS.MK2120UL.W\" mc=\"MIIERzCCAy+gAwIBAgIGAYlo1aZNMA0GCSqGSIb3DQEBCwUAMHkxHTAbBgNVBAMTFEJIQVNLQVIgSllPVEkgUEhVS0FOMRIwEAYDVQQIEwlLQVJOQVRBS0ExDzANBgNVBAsTBklNRkFTVDEmMCQGA1UEChMdSW50ZWdyYSBNaWNybyBTeXN0ZW1zIFB2dCBMdGQxCzAJBgNVBAYTAklOMB4XDTIzMDcxODExNDkzOFoXDTIzMDgxNTExNDkzOFowbzESMBAGA1UEBxMJQmFuZ2Fsb3JlMQ4wDAYDVQQKEwVJTVNQTDESMBAGA1UECxMJUkRTZXJ2aWNlMSgwJgYDVQQDEx9JbnRlZ3JhIE1pY3JvIFN5c3RlbXMgUHZ0LiBMdGQuMQswCQYDVQQGEwJJTjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAL/k1e6t//jgMcYE64TV9fuHBrDSduJ5bxzxEHzHIsRyVOWQKsN+pfDNnn/Ldp7BbCtRv3gbpJQrg6+/RYI5Hym/SfC6DZKlyxFztGb/Isdh4Http8gASEcc7ol3/JpK9hQlzg2KoIlKD/+WIcVO7BIjyN/hVRX0hq+ui5Ty18ValXnemhr3DtADsVbHvx2yO04jSiR1Wj046x6u7j6C8yj3D5xHlbkZeaVGfklIyXXhpzarRBP5bY5SuRmdepyxXVSbXCAV+N8XehO0mDjgqadfHuZVZZtHEpr4+H6xwCM4lod0J6LTV0nFFCzCCNwoVnj4/10Y8VURL34jbNaqAu8CAwEAAaOB3jCB2zCBuQYDVR0jBIGxMIGugBSjehwdlAqtKouupP/HTIfZlE+hpqGBj6SBjDCBiTELMAkGA1UEBhMCSU4xEjAQBgNVBAgTCUtBUk5BVEFLQTESMBAGA1UEBxMJQmFuZ2Fsb3JlMQ4wDAYDVQQKEwVVSURBSTEmMCQGA1UEAxMdVUlEQUlfUkVHSVNURVJFRF9ERVZJQ0VTXzIwMzAxGjAYBgNVBAsTEVRFQ0hOT0xPR1lfQ0VOVEVSggQBMa6SMB0GA1UdDgQWBBQi+kHxweWFthEFq4TJU39cJHCf+DANBgkqhkiG9w0BAQsFAAOCAQEA2eP00exXKFCvyAtAeM6NwlBpbyIIzmeKhAf5rSBMPXj/eXjV7SB5GmrncyzEfE65EoWMCYI3PxptBxN3fsYGEYdI9jeNpyymz/8TAbucuA6pjCUMEXhg3CKo141VepL4p/gxBxbpq7JKPZKAKFM3+zKNpZJ0y6l8FwQTSgYnzSS7CYtt9kL4Q5sosF4EIu5yc6POF0w1k+1YI2h25wSgh/PbdOOWkvAlL2H5o7x5HmaS4fltdyGEz0JgkHnKGvxyDg7c48tKDuQtmkgPOcEsPzX16OW3z1wI8Xbk9MtlR8dvr/DSsktFL/kFITgNK5e0LGueN5XOzQwBpVPrKhPCsQ==\"/><Skey ci=\"20250923\">YOe61YzyOT15AMFt6XABEnzptTJHuViDqSOj9SP+bTsA3KpptRTEjl98Ng0JDt0ShDkR+D/ue/pnrVub+mqd7Jdl8z5kiU1otqsdykknRTm6SJWI18dHGxkFaROjt1oRQz+WabiZ0SozEWf+21nehzqrPTZX/Mc8ELdUYDYzWam4/MG7HvloQ3yhODs/ZRMnNI1NuLNSesSiOJkNDIghAy//ub9vVleCidmDjf1572EdW6DgsHSa5QfTz7a0PuCd73Nx4BtY6HgC/DGx/pELm5fmaaskIHLEGmYhhWB0i8Lk/Kaw0PzCaD6wWPuH5lA9JZ+Kelzvi8/TifOiWYn2Jg==</Skey><Hmac>Dlebh/Skcrsq4vmJY6GhOh0nvbIgQ86Iuj+erc+B7DFhcaqb8BCVlKruseMrGhL3</Hmac><Data type=\"X\">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</Data></PidData>\n"
        // response=reply.substring(reply.indexOf("?>") + 2).trim();
        // console.log(response);
        //   console.log(XmlString)
        var authData = $localStorage.authorizationData;
        // console.log(authData)
        AppSettings.College_Code = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;
        AppSettings.Schemeid = authData.SchemeId;
        $scope.Schemeid = authData.SchemeId;
        AppSettings.Semesterid = authData.SemesterId;
        AppSettings.Branchid = authData.BranchId;
        AppSettings.AcademicYearid = authData.AcdYrID;
        $scope.College_Code = authData.College_Code;
        $scope.BranchCode = authData.BranchCode;
        $scope.College_Name = authData.College_Name;
        $scope.SystemUserTypeId = authData.SystemUserTypeId;
        $scope.StudentRegList = {};
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        //for (var i = 0; i < UsersRightsdata.length; i++) {
        //    if (UsersRightsdata[i].GridFormToOpen == PageNm) {
        //        var obj = {};
        //        obj.isaddable = UsersRightsdata[i].isaddable;
        //        RightForCurrentPage.push(obj);
        //    }
        //}

        //var eKey = SystemUserService.GetEKey();
        //eKey.then(function (res) {
        //    $scope.EKey = res;
        //    sessionStorage.Ekey = res;

        //});

        $scope.inputType = 'password';
        $scope.eyeIcon = '👁️';


        $scope.toggleAadharVisibility = function () {
            $scope.inputType = ($scope.inputType === 'password') ? 'text' : 'password';
            $scope.eyeIcon = ($scope.inputType === 'password') ? '👁️' : '👀';
        };

        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }

        $scope.StudentRegList = [];

        var SchemeID1 = 5;
        var SemID1 = 1;
        var BranchID1 = 1;
        var SectionID1 = 1;
        var ShiftId1 = 1;
        var AcademicYearId1 = 5;
        //   $scope.LoadImg = true;
        $scope.StudentRegListFound = false;
        // alert("college code : " + $scope.College_Code +" App sett college code : "+AppSettings.CollegeCode);
        var CollegeCode, Scheme, Semester, Branch, AcademicYear;
        if ($scope.College_Code == "") {
            var CollegeCode = AppSettings.College_Code;
            Scheme = AppSettings.Schemeid;
            Semester = AppSettings.Semesterid;
            var Branch = AppSettings.Branchid;
            AcademicYear = AppSettings.AcademicYearid;
            $scope.College_Code = CollegeCode;
        }
        else {
            Scheme = AppSettings.Schemeid;
            Semester = AppSettings.Semesterid;
            Branch = AppSettings.Branchid;
            AcademicYear = AppSettings.AcademicYearid;
        }


        var dataFormatTypeId = localStorage.getItem('dataTypeId');
        var GetDataType = localStorage.getItem('GetDataType');


        var StudentRegdata = {};
        //  if (GetDataType === undefined || GetDataType == null || GetDataType == 'OnRole') {
        // StudentRegdata = StudentRegService.GetStudentRegListByCollegeCourseBranch($scope.College_Code, $scope.Schemeid, Semester, Branch, 1, 1, AcademicYear);
        var StudentRegdata = StudentRegService.GetAdmissionPinReports($scope.College_Code, Branch, Semester, AcademicYear, dataFormatTypeId);
        StudentRegdata.then(function (data) {
            $scope.$emit('hideLoading', data);
            //    $scope.LoadImg = false;
            $scope.StudentRegListFound = true;
            if (data.length > 0) {
                var SrNo = 1
                for (var i = 0; i < data.length; i++) {
                    data[i].StuRegSrNo = SrNo;
                    SrNo = SrNo + 1;
                }
                $scope.StudentRegList = data;
                console.log($scope.StudentRegList);
                let temp = [];
                temp = data;
                temp.forEach(function (student) {
                    if (student.AttendeeId === null && student.PIN !== null && student.AadharVerfied === true) {
                        student.AttendeeId = 'Generate AttendeeId';
                    } else if (student.AttendeeId !== null && student.PIN !== null && student.AadharVerfied === false) {
                        student.AttendeeId = 'Do Aadhaar kyc';
                    } else if (student.AttendeeId === '' || student.AttendeeId === null) {
                        student.AttendeeId = '-';
                    } else if (student.AttendeeId !== '' || student.AttendeeId !== null) {
                        student.AttendeeId = student.AttendeeId;
                    }
                    return student;
                });

                $scope.filteredData = temp;
                $scope.attendeeId = [];


            }
            else {
                alert("Data Not Found");
                $state.go('Dashboard.AdmissionDashboard.Admission');
                $scope.StudentRegList = [];
                $scope.$emit('hideLoading', data);
                return;

            }
        }, function (error) {
            alert(error);
            $scope.$emit('hideLoading', data);
        });
        //     }
        //else if (GetDataType == 'DataNotUpdated') {
        //    var StudentRegdata = StudentRegService.GetAdmissionPinReports($scope.College_Code, Branch, Semester, AcademicYear, dataFormatTypeId);
        //  //  StudentRegdata = StudentRegService.GetStudentRegListByCollegeCourseBranchDataNotUpdated($scope.College_Code, $scope.Schemeid, Semester, Branch, 1, 1, AcademicYear);
        //    StudentRegdata.then(function (data) {

        //        $scope.LoadImg = false;
        //        $scope.StudentRegListFound = true;
        //        if (data.length > 0) {
        //            var SrNo = 1
        //            for (var i = 0; i < data.length; i++) {
        //                data[i].StuRegSrNo = SrNo;
        //                SrNo = SrNo + 1;
        //            }
        //            $scope.StudentRegList = data;
        //            console.log($scope.StudentRegList);
        //            let temp = [];
        //            temp = data;
        //            temp.forEach(function (student) {
        //                if (student.AttendeeId === null && student.PIN !== null && student.AadharVerfied === true) {
        //                    student.AttendeeId = 'Generate AttendeeId';
        //                } else if (student.AttendeeId !== null && student.PIN !== null && student.AadharVerfied === false) {
        //                    student.AttendeeId = 'Do Aadhaar kyc';
        //                } else if (student.AttendeeId === '' || student.AttendeeId === null) {
        //                    student.AttendeeId = '-';
        //                } else if (student.AttendeeId !== '' || student.AttendeeId !== null) {
        //                    student.AttendeeId = student.AttendeeId;
        //                }
        //                return student;
        //            });

        //            $scope.filteredData = temp;
        //            $scope.attendeeId = [];




        //            //        debugger;
        //            //        var len = data.length;
        //            //        for (let i = 0 ; i < len; i++) {
        //            //        if ($scope.filteredData[i].AttendeeId == null && $scope.filteredData[i].PIN != null) {
        //            //            $scope.attendeeId += "<a ng-click='showAadhaarModal(x.StudentId)'> Generate Attende ID </a>"
        //            //        }
        //            //    else if ($scope.filteredData[i].AttendeeId == null && $scope.filteredData[i].PIN == null) {
        //            //        $scope.attendeeId += '-'
        //            //    }
        //            //    else {
        //            //        $scope.attendeeId += $scope.filteredData[i].AttendeeId
        //            //    }
        //            //}
        //            // console.log($scope.filteredData);
        //        }
        //        else {
        //            alert("Data Not Found");
        //            $scope.StudentRegList = [];
        //            return;
        //        }
        //    }, function (error) {
        //        alert(error);
        //    });
        //}
        //else if (GetDataType == 'AadharNotVerified') {
        //    StudentRegdata = StudentRegService.GetStudentRegListByCollegeCourseBranchAadharNotVerified($scope.College_Code, $scope.Schemeid, Semester, Branch, 1, 1, AcademicYear);
        //    StudentRegdata.then(function (data) {

        //        $scope.LoadImg = false;
        //        $scope.StudentRegListFound = true;
        //        if (data.length > 0) {
        //            var SrNo = 1
        //            for (var i = 0; i < data.length; i++) {
        //                data[i].StuRegSrNo = SrNo;
        //                SrNo = SrNo + 1;
        //            }
        //            $scope.StudentRegList = data;
        //            console.log($scope.StudentRegList);
        //            let temp = [];
        //            temp = data;
        //            temp.forEach(function (student) {
        //                if (student.AttendeeId === null && student.PIN !== null && student.AadharVerfied === true) {
        //                    student.AttendeeId = 'Generate AttendeeId';
        //                } else if (student.AttendeeId !== null && student.PIN !== null && student.AadharVerfied === false) {
        //                    student.AttendeeId = 'Do Aadhaar kyc';
        //                } else if (student.AttendeeId === '' || student.AttendeeId === null) {
        //                    student.AttendeeId = '-';
        //                } else if (student.AttendeeId !== '' || student.AttendeeId !== null) {
        //                    student.AttendeeId = student.AttendeeId;
        //                }
        //                return student;
        //            });

        //            $scope.filteredData = temp;
        //            $scope.attendeeId = [];


        //        }
        //        else {
        //            alert("Data Not Found");
        //            $scope.StudentRegList = [];
        //            return;
        //        }
        //    }, function (error) {
        //        alert(error);
        //    });
        //} else if (GetDataType == 'AadharNotVerified') {
        //    StudentRegdata = StudentRegService.GetStudentRegListByCollegeCourseBranchAadharNotVerified($scope.College_Code, $scope.Schemeid, Semester, Branch, 1, 1, AcademicYear);
        //    StudentRegdata.then(function (data) {

        //        $scope.LoadImg = false;
        //        $scope.StudentRegListFound = true;
        //        if (data.length > 0) {
        //            var SrNo = 1
        //            for (var i = 0; i < data.length; i++) {
        //                data[i].StuRegSrNo = SrNo;
        //                SrNo = SrNo + 1;
        //            }
        //            $scope.StudentRegList = data;
        //            console.log($scope.StudentRegList);
        //            let temp = [];
        //            temp = data;
        //            temp.forEach(function (student) {
        //                if (student.AttendeeId === null && student.PIN !== null && student.AadharVerfied === true) {
        //                    student.AttendeeId = 'Generate AttendeeId';
        //                } else if (student.AttendeeId !== null && student.PIN !== null && student.AadharVerfied === false) {
        //                    student.AttendeeId = 'Do Aadhaar kyc';
        //                } else if (student.AttendeeId === '' || student.AttendeeId === null) {
        //                    student.AttendeeId = '-';
        //                } else if (student.AttendeeId !== '' || student.AttendeeId !== null) {
        //                    student.AttendeeId = student.AttendeeId;
        //                }
        //                return student;
        //            });

        //            $scope.filteredData = temp;
        //            $scope.attendeeId = [];


        //        }
        //        else {
        //            alert("Data Not Found");
        //            $scope.StudentRegList = [];
        //            return;
        //        }
        //    }, function (error) {
        //        alert(error);
        //    });

        //   }

        // Add new Record
        function AddNew() {
            //if (RightForCurrentPage[0].RollAdd != 'Y') {
            //     alert("You Don't have Add Rights");
            //    return;
            // } else {
            $state.go('Admission.StudRegID', { 'StudRegID': 0 });
            //}
        }

        $scope.editStudent = function (stuId) {
            window.localStorage.setItem("StudRegID", sender.data.StudentId);
            $localStorage.setItem("StudRegID", sender)
            if (this.multiSelectCtrlRequest == false) {

                if (sender.data.PIN != "") {
                    $rootScope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/Admission/StudentReg.html",
                        size: 'lg',
                    });
                } else {
                    $rootScope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/Admission/StudentReg.html",
                        size: 'lg',
                    });
                }
            }
        }

        $scope.search = "";

        var GetDistricts = StudentRegService.getDistricts()
        GetDistricts.then(function (data) {
            console.log(data);

            $scope.districts = data.Table
        }, function (error) {
            alert(error);
        });


        $scope.updateMandals = function () {
            StudentRegService.GetMandalsForDistrict($scope.StudentReg.DistrictId).then(function (data) {
                $scope.mandals = data;
                console.log(data.Table);
            }, function (error) {
                alert(error);
            });
        }

        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {

            window.localStorage.setItem("RouteName", 2);
            window.localStorage.setItem("StudRegID", sender.StudentId);
            $state.go("Dashboard.AdmissionDashboard.Admission.StudentReg");
        }

        //alert(AppSettings.CollegeID);

        $scope.FillCoursePart = function (SchemeID) {
            $scope.ExamList = [];
            $scope.BranchList = [];
            if (SchemeID != "") {
                var ExamList = RegisterAdmittedStudentService.GetBasicExamList(SchemeID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;

                    var BranchList = RegisterAdmittedStudentService.GetBasicBranchListForRegStud(SchemeID, AppSettings.CollegeID);
                    BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                        $scope.BranchList = BasicBranchdata;
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.Show = function () {
            if (($scope.SchemeID == undefined) || ($scope.SchemeID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.SemID == undefined) || ($scope.SemID == "")) {
                $scope.SemID = 0;
                alert("Select Year");
                return;
            }
            var StudentRegdata = StudentRegService.FillStudentRegDetailsList(AppSettings.CollegeID, $scope.SchemeID, $scope.SemID, $scope.BranchID, $scope.SectionID, $scope.ShiftID);
            StudentRegdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }

                    $scope.StudentRegList = data;
                }
                else {
                    alert("Data Not Found");
                    $scope.StudentRegList = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.WithPhoto = "N";
        $scope.ShowByPhoto = function () {
            var StudentRegdata = StudentRegService.FillStudentRegDetailsListByAdmNoOrPhoto(AppSettings.CollegeID, $scope.WithPhoto, $scope.AdmNo);
            StudentRegdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.StudentRegList = data;
                }
                else {
                    alert("Data Not Found");
                    $scope.StudentRegList = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        };



        $scope.ShowByGroupAndMedium = function () {
            if (($scope.MainGrpID == undefined) || ($scope.MainGrpID == "")) {
                $scope.MainGrpID = 0;
            }
            if (($scope.MediumID == undefined) || ($scope.MediumID == "")) {
                $scope.MediumID = 0;
            }
            if (($scope.SubjectID == undefined) || ($scope.SubjectID == "")) {
                $scope.SubjectID = 0;
            }
            var StudentRegdata = StudentRegService.FillStudentRegDetailsListByGroupAndMedium(AppSettings.CollegeID, $scope.MainGrpID, $scope.MediumID, $scope.SubjectID);
            StudentRegdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.StudentRegList = data;
                    // console.log(data);
                }
                else {
                    alert("Data Not Found");
                    $scope.StudentRegList = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.ShowAll = function () {

            var StudentRegdata = StudentRegService.FillStudentRegDetailsListAll(AppSettings.CollegeID == '0' ? '001' : AppSettings.CollegeID);
            StudentRegdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.StudentRegList = data;
                }
                else {
                    alert("Data Not Found");
                    $scope.StudentRegList = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }

        $scope.OpenStudentList = function () {
            $state.go('Dashboard.AdmissionDashboard.Admission.StudentRegList');

        };

        $scope.OpenCollegeInfo = function () {
            $state.go('Dashboard.Admission.CollegeInfo');
        };

        $scope.generateAttendeeId = function (studentId, attendeeId) {

            if (attendeeId == 'Generate AttendeeId') {
                var data = {};
                $scope.$emit('showLoading', data);
                StudentRegService.GetStudentRegById(studentId).then(function (data) {
                    $scope.bmaStu = data[0];
                    var g = '';
                    if ($scope.bmaStu.Gender === 1) {
                        g = 'M';
                    } else if ($scope.bmaStu.Gender === 2) {
                        g = 'F';
                    } else {
                        g = 'T';
                    }
                    var reqData = {
                        orgcode: $scope.bmaStu.CollegeCode,
                        orgname: AppSettings.College_Name,
                        branch: AppSettings.Branchid,
                        semester: $scope.bmaStu.SemId,
                        aadhaarno: $scope.bmaStu.AadharNo,
                        attdname: $scope.bmaStu.Name,
                        attdcode: $scope.bmaStu.PIN,
                        category: 50,
                        designation: 2,
                        gender: g,
                        email: $scope.bmaStu.EmailId,
                        mobile: $scope.bmaStu.StudentContact
                    };
                    StudentRegService.RegisterBmaAttendee(reqData).then(
                        function (data) {
                            // console.log(data);
                            try {
                                $scope.$emit('hideLoading', data);
                                var attendee = JSON.parse(data);
                            }
                            catch (err) {
                                $scope.$emit('hideLoading', data);
                                var attendee = data;
                            }

                            // console.log(attendee);
                            if (attendee.respcode == "200") {
                                $scope.$emit('hideLoading', data);
                                alert(attendee.respdesc + " Use the following Attendee Id for attendance: " + attendee.attdid);
                                $scope.GetStudentDetailsForAdmission()
                                $state.go('Dashboard.AdmissionDashboard.Admission.StudentRegList');
                                $scope.modalInstance.close();
                            } else if (attendee.respcode === "409") {
                                $scope.GetStudentDetailsForAdmission()
                                $scope.modalInstance.close();
                                $scope.$emit('hideLoading', data);
                                alert(attendee.respdesc + " with AtendeeId: " + attendee.attdid);
                               
                            } else {
                                $scope.GetStudentDetailsForAdmission()
                                $scope.modalInstance.close();
                                $scope.$emit('hideLoading', data);
                                alert(attendee.respdesc);
                           
                                $state.go('Dashboard.AdmissionDashboard.Admission.StudentRegList');
                            }
                        },
                        function (error) {
                            $scope.$emit('hideLoading', data);
                            $scope.GetStudentDetailsForAdmission()
                            //alert("Error thrown by: ABAS");
                            // console.log(error);
                        }
                    );
                },
                    function (error) {
                        $scope.$emit('hideLoading', data);
                        $scope.GetStudentDetailsForAdmission()
                        alert(error);
                    });
            } else {

            }

        };

        $scope.GetStudentDetailsForAdmission = function () {
            var StudentRegdata = StudentRegService.GetAdmissionPinReports($scope.College_Code, Branch, Semester, AcademicYear, dataFormatTypeId);
            StudentRegdata.then(function (data) {
                $scope.$emit('hideLoading', data);
                //    $scope.LoadImg = false;
                $scope.StudentRegListFound = true;
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.StudentRegList = data;
                    console.log($scope.StudentRegList);
                    let temp = [];
                    temp = data;
                    temp.forEach(function (student) {
                        if (student.AttendeeId === null && student.PIN !== null && student.AadharVerfied === true) {
                            student.AttendeeId = 'Generate AttendeeId';
                        } else if (student.AttendeeId !== null && student.PIN !== null && student.AadharVerfied === false) {
                            student.AttendeeId = 'Do Aadhaar kyc';
                        } else if (student.AttendeeId === '' || student.AttendeeId === null) {
                            student.AttendeeId = '-';
                        } else if (student.AttendeeId !== '' || student.AttendeeId !== null) {
                            student.AttendeeId = student.AttendeeId;
                        }
                        return student;
                    });

                    $scope.filteredData = temp;
                    $scope.attendeeId = [];


                }
                else {
                    alert("Data Not Found");
                    $state.go('Dashboard.AdmissionDashboard.Admission');
                    $scope.StudentRegList = [];
                    $scope.$emit('hideLoading', data);
                    return;

                }
            }, function (error) {
                alert(error);
                $scope.$emit('hideLoading', data);
            });
        }


        $scope.GeneratePin = function (studentId) {

            StudentRegService.GeneratePin(studentId).then(function (data) {
                //$scope.aadhaarVerStu = data[0];
                if (data.length > 0) {
                    var Result = data[0].Result
                    var PIN = data[0].PIN
                    alert('Pin' + ':' + PIN + ' ' + Result)
                    $scope.GetList()
                } else {
                    alert('Something Went Wrong')
                }

            },
                function (error) {
                    alert(error);
                });
        }

        $scope.showAadhaarModal = function (studentId, Pin) {
            //if ($scope.SystemUserTypeId == 3 || $scope.SystemUserTypeId == 2) {
            //    if ($scope.BranchCode != 'PH') {
            //        if (Pin == null || Pin == '' || Pin == undefined) {
            //            alert("Pin Generation Disabled")
            //            return;
            //        }
            //    }
            //}
            $scope.aadhaarPhoto = "";
            $scope.aadhaarName = "";
            $scope.aadhaarDob = "";
            $scope.aadhaarGender = "";
            $scope.aadhaarAddr = "";
            $scope.disableApprove = true;

            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Admission/AadhaarKyc.html",
                size: 'lg',
                scope: $scope,
                windowClass: 'modal-fit',
                backdrop: 'static',
                keyboard: false
            });

            StudentRegService.GetStudentRegById(studentId).then(function (data) {
                $scope.aadhaarVerStu = data[0];
                $scope.AadharNo = data[0].AadharNo;
                $scope.AadhaarData = false
                if ($scope.AadharNo.length == '12') {
                    $scope.AadhaarData = true
                } else {
                    $scope.AadhaarData = false
                }
                //console.log("student data" + data);
            },
                function (error) {
                    alert(error);
                });
            //if ($scope.selectedRd === "")
            //    $scope.discoverRd('STARTEK');
        };

        $scope.generateRdRequest = function () {
            if ($scope.selectedRd === "") {
                alert("Please Select a Biometric Device");
            } else if ($scope.selectedRd === "STARTEK") {
                $scope.generateRdFpRequest($scope.startekUrl);
            } else if ($scope.selectedRd === "MANTRA") {

                $scope.mantraCapture();
            } else if ($scope.selectedRd === "IRIS") {
                $scope.irisCapture();
            }
            else if ($scope.selectedRd === "RDS") {
                $scope.Capture();
            }
        };

        var location = window.location.origin;
        if (location == "https://sbtet.telangana.gov.in" || location == "https://www.sbtet.telangana.gov.in") {
            $scope.env = "P";
        } else {
            $scope.env = "PP";
        }


        $scope.generateRdFpRequest = function (uri) {
            var doc = document.implementation.createDocument("", "", null);
            var pidOptions = doc.createElement("PidOptions");

            var opts = doc.createElement("Opts");
            opts.setAttribute("fCount", "1");
            opts.setAttribute("fType", "2");
            opts.setAttribute("iCount", "0");
            opts.setAttribute("pCount", "0");
            opts.setAttribute("format", "0");
            opts.setAttribute("pidVer", "2.0");
            opts.setAttribute("timeout", "20000");
            opts.setAttribute("otp", "");
            opts.setAttribute("posh", "UNKNOWN");
            opts.setAttribute("env", $scope.env);
            opts.setAttribute("wadh", "E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=");
            pidOptions.appendChild(opts);

            var demo = doc.createElement("Demo");
            pidOptions.appendChild(demo);

            var custOpts = doc.createElement("CustOpts");
            var param = doc.createElement("Param");
            param.setAttribute("name", "ValidationKey");
            param.setAttribute("value", "");
            custOpts.appendChild(param);
            pidOptions.appendChild(custOpts);
            // console.log(pidOptions);
            var xmlText = new XMLSerializer().serializeToString(pidOptions);
            var rdCapReq = StudentRegService.ReqRdFpKyc(uri, xmlText).then(
                function (data) {
                    var xml = (new DOMParser()).parseFromString(data, "text/xml");
                    if (xml.getElementsByTagName("Resp")[0].attributes.errCode.value !== "0") {
                        alert(xml.getElementsByTagName("Resp")[0].attributes.errInfo.value);
                    } else {
                        $scope.DoAadhaarKyc(data, "25");
                    }
                },
                function (err) {

                }
            );
        }
        var PortNumber = 11100;
        var port = 11100;
        $scope.RDS_Discover = function () {
            var PortNumber = 11100;
            var port = 11100;
            var url = "http://127.0.0.1:" + PortNumber;
            var xhr = new XMLHttpRequest();
            xhr.open('RDSERVICE', url, true);
            xhr.setRequestHeader("Content-Type", "text/plain");

            xhr.onload = function () {
                var status = xhr.status;
                if (status == 200) {
                    console.log("RD Service Found " + port);
                    console.log(xhr.response);
                }
                else if (PortNumber < 11121) {
                    PortNumber++;
                    $scope.RDS_Discover();
                }
            };

            xhr.onerror = function () {
                if (PortNumber < 11121) {
                    PortNumber++;
                    $scope.RDS_Discover();
                }
                else {
                    console.log(xhr.response);
                }
            };
            xhr.ontimeout = function () {
                if (PortNumber < 11121) {
                    PortNumber++;
                    $scope.RDS_Discover();
                }
                else {
                    alert("ONTIMEOUT");
                }
            };
            xhr.send();
        }


        $scope.discoverIrisService = function () {
            var url = "";
            var primaryUrl = "";
            //if (window.location.protocol != "https:") {
            //    primaryUrl = "http://localhost"
            //}
            //else {
            primaryUrl = "https://localhost"
            //}
            $scope.irisUrl = "";
            var tempcount = 0;
            var url = "";
            for (var i = 11100; i <= 11120; i++) {
                if ($scope.irisUrl !== "")
                    return;
                var verb = "RDSERVICE";
                var err = "";
                var res;
                $.support.cors = true;
                var httpStaus = false;
                var jsonstr = "";
                var data = new Object();
                var obj = new Object();
                var xmlstr = '';
                var RDurl = primaryUrl + ":" + i.toString();
                $.ajax({
                    type: "RDSERVICE",
                    async: false,
                    crossDomain: true,
                    url: RDurl,
                    contentType: "text/xml; charset=utf-8",
                    processData: false,
                    cache: false,
                    async: false,
                    //crossDomain: true,
                    success: function (data) {
                        try {
                            xmlstr = data.xml ? data.xml : (new XMLSerializer()).serializeToString(data);
                            data = xmlstr;
                            var xmlDoc = $.parseXML(data);
                            var $xml = $(xmlDoc);
                            var Name = $xml.find('RDService').attr('status');
                            var info = $xml.find('RDService').attr('info');

                            if ("Biomatiques Iris (Model: EPI-1000)" == info) {
                                // console.log(data);
                                url = RDurl;
                                $scope.irisUrl = RDurl;
                                // console.log(url);
                                i = 11300;
                            }
                            httpStaus = true;
                            res = { httpStaus: httpStaus, data: data };
                            tempcount++;
                        }
                        catch (e) {
                            //alert(e.Message);
                        }
                    },
                    error: function (jqXHR, ajaxOptions, thrownError) {
                        //    res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
                    }
                });
            }
            return res;
        }

        $scope.GetList = function () {
            var StudentRegdata = {};
            //  if (GetDataType === undefined || GetDataType == null || GetDataType == 'OnRole') {
            // StudentRegdata = StudentRegService.GetStudentRegListByCollegeCourseBranch($scope.College_Code, $scope.Schemeid, Semester, Branch, 1, 1, AcademicYear);
            var StudentRegdata = StudentRegService.GetAdmissionPinReports($scope.College_Code, Branch, Semester, AcademicYear, dataFormatTypeId);
            StudentRegdata.then(function (data) {
                $scope.$emit('hideLoading', data);
                //    $scope.LoadImg = false;
                $scope.StudentRegListFound = true;
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.StudentRegList = data;
                    console.log($scope.StudentRegList);
                    let temp = [];
                    temp = data;
                    temp.forEach(function (student) {
                        if (student.AttendeeId === null && student.PIN !== null && student.AadharVerfied === true) {
                            student.AttendeeId = 'Generate AttendeeId';
                        } else if (student.AttendeeId !== null && student.PIN !== null && student.AadharVerfied === false) {
                            student.AttendeeId = 'Do Aadhaar kyc';
                        } else if (student.AttendeeId === '' || student.AttendeeId === null) {
                            student.AttendeeId = '-';
                        } else if (student.AttendeeId !== '' || student.AttendeeId !== null) {
                            student.AttendeeId = student.AttendeeId;
                        }
                        return student;
                    });

                    $scope.filteredData = temp;
                    $scope.attendeeId = [];


                }
                else {
                    alert("Data Not Found");
                    $state.go('Dashboard.AdmissionDashboard.Admission');
                    $scope.StudentRegList = [];
                    $scope.$emit('hideLoading', data);
                    return;

                }
            }, function (error) {
                alert(error);
                $scope.$emit('hideLoading', data);
            });
        }

        $scope.discoverStartekService = function () {
            var url = "";
            var primaryUrl = "";
            if (window.location.protocol != "https:") {
                primaryUrl = "http://localhost"
            }
            else {
                primaryUrl = "https://localhost"
            }
            $scope.startekUrl = "";
            var tempcount = 0;
            var url = "";
            for (var i = 11100; i <= 11120; i++) {
                if ($scope.startekUrl !== "")
                    return;
                var verb = "RDSERVICE";
                var err = "";
                var res;
                $.support.cors = true;
                var httpStaus = false;
                var jsonstr = "";
                var data = new Object();
                var obj = new Object();
                var xmlstr = '';
                var RDurl = primaryUrl + ":" + i.toString();
                $.ajax({
                    type: "RDSERVICE",
                    async: false,
                    crossDomain: true,
                    url: RDurl,
                    contentType: "text/xml; charset=utf-8",
                    processData: false,
                    cache: false,
                    async: false,
                    //crossDomain: true,
                    success: function (data) {
                        try {
                            xmlstr = data.xml ? data.xml : (new XMLSerializer()).serializeToString(data);
                            data = xmlstr;
                            var xmlDoc = $.parseXML(data);
                            var $xml = $(xmlDoc);
                            var Name = $xml.find('RDService').attr('status');
                            var info = $xml.find('RDService').attr('info');

                            if (info.includes("FM220")) {
                                // console.log(data);
                                url = RDurl;
                                $scope.startekUrl = RDurl;
                                // console.log(url);
                                i = 11300;
                            }
                            httpStaus = true;
                            res = { httpStaus: httpStaus, data: data };
                            tempcount++;
                        }
                        catch (e) {
                            //alert(e.Message);
                        }
                    },
                    error: function (jqXHR, ajaxOptions, thrownError) {
                        //    res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
                    }
                });
            }
            return res;
        }

        $scope.discoverMantraService = function () {
            var url = "";
            var primaryUrl = "";
            // if (window.location.protocol != "https:") {
            //     primaryUrl = "http://localhost"
            //   }
            //  else {
            primaryUrl = "http://localhost"

            //  }
            $scope.mantraUrl = "";
            var tempcount = 0;
            var url = "";
            for (var i = 11100; i <= 11120; i++) {
                if ($scope.mantraUrl !== "")
                    return;
                var verb = "RDSERVICE";
                var err = "";
                var res;
                $.support.cors = true;
                var httpStaus = false;
                var jsonstr = "";
                var data = new Object();
                var obj = new Object();
                var xmlstr = '';
                var RDurl = primaryUrl + ":" + i.toString();
                $.ajax({
                    type: "RDSERVICE",
                    async: false,
                    crossDomain: true,
                    url: RDurl,
                    contentType: "text/xml; charset=utf-8",
                    processData: false,
                    cache: false,
                    async: false,
                    //crossDomain: true,
                    success: function (data) {
                        try {
                            if (data.includes("Mantra")) {
                                // console.log(data);
                                url = RDurl;
                                $scope.mantraUrl = RDurl;
                                // console.log(url);
                                i = 11300;
                            }
                            httpStaus = true;
                            res = { httpStaus: httpStaus, data: data };
                            tempcount++;
                        }
                        catch (e) {
                            //alert(e.Message);
                        }
                    },
                    error: function (jqXHR, ajaxOptions, thrownError) {
                        //    res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
                    }
                });
            }
            return res;
        }

        $scope.selectedRd = "";

        $scope.mantraCapture = function () {
            var PIDOPTS = '<PidOptions ver=\"1.0\">' + '<Opts fCount=\"1\" fType=\"2\" iCount=\"0\" pCount=\"0\" format=\"0\" pidVer=\"2.0\" timeout=\"20000\" otp=\"\" wadh=\"E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=\" posh=\"\" env=\"' + $scope.env + '\"/>' + '</PidOptions>';
            $.ajax({
                type: "CAPTURE",
                async: false,
                crossDomain: true,
                url: $scope.mantraUrl + "/rd/capture",
                contentType: "text/xml; charset=utf-8",
                data: PIDOPTS,
                processData: false,
                cache: false,
                success: function (data) {
                    try {
                        var xml = (new DOMParser()).parseFromString(data, "text/xml");
                        if (xml.getElementsByTagName("Resp")[0].attributes.errCode.value !== "0") {
                            alert(xml.getElementsByTagName("Resp")[0].attributes.errInfo.value);
                        } else {
                            $scope.DoAadhaarKyc(data, "25");
                        }

                        httpStaus = true;
                        res = { httpStaus: httpStaus, data: data };
                        tempcount++;
                    }
                    catch (e) {
                        //Alert(e.Message);
                    }
                },
                error: function (jqXHR, ajaxOptions, thrownError) {
                    //    res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
                }
            });
        };

        $scope.DeviceInfo = function () {
            var url = "http://127.0.0.1:" + PortNumber + "/rd/info";
            var deviceInfoDC = null;
            var xhr = new XMLHttpRequest();
            xhr.open('DEVICEINFO', url, true);
            xhr.onload = function () {
                var status = xhr.status;
                if (status == 200) {
                    if (xhr.responseText != undefined && xhr.responseText != "") {
                        if (window.DOMParser) {
                            parser = new DOMParser();
                            xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
                        }
                        else // Internet Explorer
                        {
                            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                            xmlDoc.async = false;
                            xmlDoc.loadXML(xhr.responseText);
                        }
                        for (var i = 0; i < xmlDoc.getElementsByTagName("DeviceInfo")[0].attributes.length; i++) {
                            if (xmlDoc.getElementsByTagName("DeviceInfo")[0].attributes[i].name == "dc") {
                                deviceInfoDC = xmlDoc.getElementsByTagName("DeviceInfo")[0].attributes[i].value;
                                alert(xmlDoc.getElementsByTagName("DeviceInfo")[0].attributes[i].value);
                            }
                        }
                    }
                } else {
                }
            };
            xhr.onloadend = function () {
                alert("onloadend");
                console.log(xhr.response);
            };
            xhr.onresponse = function () {
                alert("On Response")
                console.log(xhr.response);
            };
            xhr.onerror = function () {
                alert("ONERROR");
                console.log(xhr.response);
            };
            xhr.ontimeout = function () {
                alert("ONTIMEOUT");
                console.log(xhr.response);
            };
            xhr.abort = function () {
                alert("ONABORT");
                console.log(xhr.response);
            };
            xhr.oncompleted = function () {
                alert("ONcompleted");
                console.log(xhr.response);
            };
            xhr.send();
        }

        $scope.Capture = function () {
            var url = "http://127.0.0.1:" + PortNumber + "/rd/capture";
            // var PIDOPTS = "<PidOptions ver=\"1.0\"><Opts fCount=\"\" fType=\"\" "
            // + "iCount=\"" + "1" + "\" iType=\"0\" "
            // //    + "pCount=\"" + "0" + "\" " + (("1".equals(0)) ? "pType=\"0\" " : "pType=\"\" ")
            // + "format=\"0\" pidVer=\"2.0\" "
            // + "timeout=\"" + "15000" + "\" otp=\"\" wadh=\"E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=\" posh=\"" + "UNKNOWN" + "\" env=\"" + "P" + "\"/>"
            // //	            + "<Demo>"
            // //	            + "</Demo>"
            // + "<CustOpts> "
            // + "</CustOpts>"
            // + "</PidOptions>";
            //    var PIDOPTS = "<PidOptions ver=\"1.0\"><Opts fCount=\"1\" fType=\"0\"" 
            //        +  " iCount=\"" + "1" + "\" iType=\"0\" "
            //        //    + "pCount=\"" + "0" + "\" " + (("1".equals(0)) ? "pType=\"0\" " : "pType=\"\" ")
            //        + "format=\"0\" pidVer=\"2.0\" "
            //        + "timeout=\"" + "15000" + "\" otp=\"\" wadh=\"8QSrHOmcQhlyjiSpIgCi7o2ugs78w+4jhckNk1jeIJg=\" posh=\"" + "UNKNOWN" + "\" env=\"" + "P" + "\"/>"
            //        //	            + "<Demo>"
            //        //	            + "</Demo>"
            //        + "<CustOpts> "
            //        + "</CustOpts>"
            //        + "</PidOptions>";    

            var environment = "P";
            var icount = "1";
            var PIDOPTS = "<PidOptions ver=\"1.0\"><Opts fCount=\"\" fType=\"\" "
                + "iCount=\"" + icount + "\" iType=\"0\" "
                //  + "pCount=\"" + pCount + "\" " + (("1".equals(pCount)) ? "pType=\"0\" " : "pType=\"\" ")
                + "format=\"0\" pidVer=\"2.0\" "
                + "timeout=\"" + 15000 + "\" otp=\"\" wadh=\"8QSrHOmcQhlyjiSpIgCi7o2ugs78w+4jhckNk1jeIJg=\" posh=\"" + "\" env=\"" + environment + "\"/>"
                //	            + "<Demo>"
                //	            + "</Demo>"
                + "<CustOpts> "
                + "</CustOpts>"
                + "</PidOptions>";
            var xhr = new XMLHttpRequest();
            xhr.open('CAPTURE', url, true);
            xhr.onload = function (data) {

                reply = data.target.response;
                console.log("Server Reply: " + reply);
                // var status = xhr.status;
                //  xmlstr = reply.xml ? reply.xml : (new XMLSerializer()).serializeToString(reply);
                respons = reply.substring(reply.indexOf("?>") + 2).trim();
                console.log(respons);
                var datas = (new DOMParser()).parseFromString(reply, "text/xml");
                console.log(datas)
                if (datas.getElementsByTagName("Resp")[0].attributes.errCode.value !== "0") {
                    alert(datas.getElementsByTagName("Resp")[0].attributes.errInfo.value);
                } else {

                    $scope.DoAadhaarKyc(respons, "06");
                }
                //if (status == 200) {
                //    alert(xhr.responseText);
                //    console.log(xhr.response);
                //} else {
                //    $scope.DoAadhaarKyc(data, "25");
                //}

            };
            xhr.onloadend = function () {
                alert("onloadend");
                console.log(xhr.response);
            };
            xhr.onresponse = function () {
                alert("On Response")
                console.log(xhr.response);
            };
            xhr.onerror = function () {
                alert("ONERROR");
                console.log(xhr.response);
            };
            xhr.ontimeout = function () {
                alert("ONTIMEOUT");
                console.log(xhr.response);
            };
            xhr.abort = function () {
                alert("ONABORT");
                console.log(xhr.response);
            };
            xhr.oncompleted = function () {
                alert("ONcompleted");
                console.log(xhr.response);
            };
            xhr.send(PIDOPTS);
        }



        $scope.irisCapture = function () {
            var PIDOPTS = '<PidOptions ver=\"1.0\">' + '<Opts fCount=\"0\" fType=\"2\" iCount=\"1\" iType=\"0\" pCount=\"\" pType=\"\" format=\"0\" pidVer=\"2.0\" timeout=\"15000\" otp=\"\" wadh=\"8QSrHOmcQhlyjiSpIgCi7o2ugs78w+4jhckNk1jeIJg=\" posh=\"\" env=\"' + $scope.env + '\"/>' + '</PidOptions>';
            $.ajax({
                type: "CAPTURE",
                async: false,
                crossDomain: true,
                url: $scope.irisUrl + "/BISPL/capture",
                contentType: "text/xml; charset=utf-8",
                data: PIDOPTS,
                processData: false,
                cache: false,
                //async: false,
                //crossDomain: true,
                success: function (data) {
                    try {
                        xmlstr = data.xml ? data.xml : (new XMLSerializer()).serializeToString(data);
                        // var xml = xmlstr;

                        var xml = (new DOMParser()).parseFromString(xmlstr, "text/xml");
                        if (xml.getElementsByTagName("Resp")[0].attributes.errCode.value !== "0") {
                            alert(xml.getElementsByTagName("Resp")[0].attributes.errInfo.value);
                        } else {
                            $scope.DoAadhaarKyc(xmlstr, "06");
                        }

                        httpStaus = true;
                        res = { httpStaus: httpStaus, data: data };
                        tempcount++;
                    }
                    catch (e) {
                        //Alert(e.Message);
                    }
                },
                error: function (jqXHR, ajaxOptions, thrownError) {
                    //    res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
                }
            });
        };


        $scope.discoverRd = function (type) {

            $scope.selectedRd = type;
            alert('Discovering ' + type + ' Service');
            switch (type) {
                case "STARTEK":
                    $scope.discoverStartekService();
                    break;
                case "MANTRA":
                    $scope.discoverMantraService();
                    if ($scope.mantraUrl === "") {
                        alert("Unable to find Mantra RD Service");
                    }
                    break;
                case "IRIS":
                    $scope.discoverIrisService();
                case "RDS":
                    $scope.RDS_Discover()
                    break;
            }
        }

        $scope.DoAadhaarKyc = function (data, serType) {
            $scope.aadhaarPhoto = "test";
            $scope.aadhaarName = "";
            $scope.aadhaarDob = "";
            $scope.aadhaarGender = "";
            $scope.aadhaarAddr = "";
            $scope.disableApprove = true;
            StudentRegService.DoAadhaarKyc($scope.aadhaarVerStu.AadharNo, data, serType).then(function (data) {
                //console.log(data);
                try {
                    data = JSON.parse(data);
                } catch (err) {
                    //Do Nothing
                }

                if (data.err !== "000") {
                    alert(data.errdesc)
                    return;
                }

                var xml = (new DOMParser()).parseFromString(atob(data.responseXML), "text/xml");
                var photoStr = "data:image/png;base64," + xml.children[0].children[1].children[3].innerHTML;
                var poi = xml.children[0].children[1].children[0].attributes;
                var poa = xml.children[0].children[1].children[1].attributes;

                $scope.aadhaarPhoto = photoStr;
                $scope.aadhaarName = poi.getNamedItem("name").value;

                try {
                    $scope.aadhaarDob = poi.getNamedItem("dob").value;
                    $scope.aadhaarGender = poi.getNamedItem("gender").value;
                    $scope.aadhaarAddr = poa.getNamedItem("house").value + "," + poa.getNamedItem("loc").value + "," + poa.getNamedItem("vtc").value + "," + poa.getNamedItem("dist").value + "," + poa.getNamedItem("state").value + "," + poa.getNamedItem("country").value + "," + poa.getNamedItem("pc").value;
                } catch (err) {

                }
                $scope.disableApprove = false;
                alert("Aadhaar Successfully Verified");
                // $state.go('Admission.StudentRegList');
            }, function (err) {

            });
        };

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        };

        $scope.irisUrl = "";
        $scope.startekUrl = "";
        $scope.mantraUrl = "";


        $scope.getattedIdbyPin = function (StudPin) {
            $scope.Loading = true;
            if (StudPin !== null && StudPin !== '' && StudPin === 'undefined') {
                StudentRegService.GetAttendeeidbyPin(StudPin).then(function (response) {
                    // console.log(response);
                    if (response.length > 0) {
                        $scope.Loading = false;
                        $scope.attendeId = response[0].attendeeid;
                    }
                }, function (err) {
                    $scope.Loading = false;
                    let error = JSON.parse(err);
                    $scope.attendeId = 'undefined';
                    // console.log(error);
                });
            } else {
                $scope.Loading = false;
                $scope.attendeId = 'undefined';
            }
            $scope.Loading = false;
            return $scope.attendeId;
        }


        $scope.approveAadhaar = function () {
            //var EncriptedAadhar = $crypto.encrypt($crypto.encrypt($scope.aadhaarVerStu.AadharNo, 'HBSBP9214EDU00TS'), $scope.EKey) + '$$@@$$' + $scope.EKey;
            $scope.Loading = true;
            var ret = confirm("Do you confirm that the Aadhaar Data matches with the Data given by student");
            if (ret) {
                StudentRegService.StudentAadhaarVerified($scope.aadhaarVerStu.StudentId, $scope.aadhaarVerStu.AadharNo).then(function (data) {
                    // console.log(data);

                    if (data.length > 0) {
                        let aadhaarVerStudPin = data[0].PIN == null || data[0].PIN == '' || data[0].PIN == 'undefined' ? $scope.PIN : data[0].PIN;
                        // $scope.Loading = false;
                        $scope.getattedIdbyPin(aadhaarVerStudPin);
                        // alert("Student PIN: " + data[0].PIN + ", Status: " + data[0].RESULT);
                        $scope.attendeId = $scope.getattedIdbyPin(aadhaarVerStudPin);
                        if (data[0].PINSTATUS == 1 && ($scope.attendeId == null || $scope.attendeId == 'undefined')) {
                            alert("Student PIN: " + data[0].PIN + ", Status: " + data[0].RESULT);
                            //   $scope.Loading = false;
                            $scope.aadhaarVerStu.PIN = data[0].PIN;
                            $scope.registerBmaAttendee();

                            $state.go('Dashboard.AdmissionDashboard.Admission.StudentRegList');
                        } else if (ret && $scope.PIN != null && (attendeeId === null || attendeeId == 'undefined')) {
                            //    $scope.Loading = false;
                            $scope.registerBmaAttendee();
                            $state.go('Dashboard.AdmissionDashboard.Admission.StudentRegList');
                        } else if (ret && $scope.PIN != null && $scope.attendeId != null) {
                            $scope.Loading = false;
                            alert("AttendeeId no: " + $scope.attendeId + "already exits with Student Pin no: " + data[0].PIN);
                            $state.go('Dashboard.AdmissionDashboard.Admission.StudentRegList');
                        }

                        else if (data[0].RESULT === "Aadhar number is already exists") {
                            $scope.Loading = false;
                            alert(data[0].RESULT);
                            $state.go('Dashboard.AdmissionDashboard.Admission.StudentRegList');
                        }
                        else {
                            $scope.Loading = false;
                            alert(data[0].RESULT);
                            $state.go('Dashboard.AdmissionDashboard.Admission.StudentRegList');
                        }

                    }
                }, function (err) {
                    $scope.Loading = false;
                    console.log(err);
                });
            }
        };

        $scope.registerBmaAttendee = function () {
            $scope.Loading = true;
            var g = '';
            if ($scope.aadhaarVerStu.Gender === 1) {
                g = 'M';
            } else if ($scope.aadhaarVerStu.Gender === 2) {
                g = 'F';
            } else {
                g = 'T';
            }
            var reqData = {
                orgcode: $scope.aadhaarVerStu.CollegeCode,
                orgname: AppSettings.College_Name,
                branch: AppSettings.Branchid,
                semester: $scope.aadhaarVerStu.SemId,
                aadhaarno: $scope.aadhaarVerStu.AadharNo,
                attdname: $scope.aadhaarVerStu.Name,
                attdcode: $scope.aadhaarVerStu.PIN,
                category: 50,
                designation: 2,
                gender: g,
                email: $scope.aadhaarVerStu.EmailId,
                mobile: $scope.aadhaarVerStu.StudentContact
            };
            StudentRegService.RegisterBmaAttendee(reqData).then(
                function (data) {
                    //    console.log(data);
                    var attendee = data;
                    //  console.log(attendee);
                    if (attendee.respcode == "200") {
                        alert(attendee.respdesc + " Use the following Attendee Id for attendance: " + attendee.attdid);

                        $scope.attdid = attendee.attdid;
                        var Message = "Dear" + reqData.attdname + "your PIN: " + reqData.attdcode + "generated, Please mark attendance daily with attendee ID: " + $scope.attdid + ". If student fails to put minimum of 75% attendance they are not entitled to write Semester Examination- Secretary, SBTETTS";

                        //SMS service
                        //var getPromise = StudentRegService.SendStudentDetailsASSms(Message, reqData.mobile)
                        //getPromise.then(function (data) {
                        //    if (data.respcode == "200") {
                        alert("SMS sent to the registered mobile number");
                        $scope.Loading = false;
                        $scope.GetStudentDetailsForAdmission()
                        //    }
                        //}, function (err) {
                        //    alert("error");
                        //    $scope.GetStudentDetailsForAdmission()
                        //});
                        //  $state.go('Dashboard.AdmissionDashboard.Admission.StudentRegList');
                        //$state.go('Dashboard');
                        $scope.modalInstance.close();
                    } else if (attendee.respcode == "409") {
                        $scope.Loading = false;
                        alert(attendee.respdesc + " with AtendeeId: " + attendee.attdid);
                        $scope.modalInstance.close();
                        $scope.GetStudentDetailsForAdmission()
                    } else {
                        $scope.Loading = false;
                        alert(attendee.respdesc);
                        $scope.modalInstance.close();
                        $state.go('Dashboard.AdmissionDashboard.Admission.StudentRegList');
                        $scope.GetStudentDetailsForAdmission()
                    }
                },
                function (error) {
                    $scope.Loading = false;
                    console.log(error);
                }
            );
            $scope.Loading = false;
        };


        //for exporting tables

        $scope.DownloadtoExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "Studentdetails.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }


        $scope.DownloadtoPdf = function (tableid) {
            // alert(tableid + ":" + AppSettings.ExportToPdfUrl);
            ////alert("pdf : " + tableid);
            var height = $(tableid).height();
            $(tableid).height('auto');
            var scaleBy = 5;
            var w = 1000;
            var h = 1000;
            debugger;
            var div = document.querySelector(tableid);
            var canvas = document.createElement('canvas');
            canvas.width = w * scaleBy;
            canvas.height = h * scaleBy;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            var context = canvas.getContext('2d');
            context.scale(scaleBy, scaleBy);
            html2canvas(div, {
                //canvas: canvas,
                onrendered: function (canvas) {
                    thecanvas = canvas;
                    var pdf = new jsPDF('p', 'pt', 'a4');
                    var options = {
                        pagesplit: true
                    };

                    pdf.addHTML($(tableid), options, function () {
                        pdf.save("test.pdf");
                    });
                    var data = thecanvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500
                        }],
                    };
                    pdfMake.createPdf(docDefinition).download("Table.pdf");

                }
            });
        }

        // On Load Calls

    });
    app.factory('Excel', function ($window) {
        //alert("hello");
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId);
                ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });
});