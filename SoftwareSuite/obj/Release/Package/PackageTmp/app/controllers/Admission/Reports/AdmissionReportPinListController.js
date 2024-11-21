define(['app'], function (app) {
    app.controller("AdmissionReportPinListController", function ($scope, $state, $stateParams, $localStorage, AppSettings, PreExaminationService,StudentRegService, Excel,StudentRegService, RegisterAdmittedStudentService, $uibModal, $timeout) {
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;
            //$scope.DataFormatTypeId =$localStorage.AdmSublistData.DataFormatTypeId;
            //$scope.semid =$localStorage.AdmSublistData.semid;   
            //$scope.branchid =$localStorage.AdmSublistData.branchid;
            //console.log(authData)
        if (authData == undefined) {
            $state.go('login');
        } else {

            $scope.UserId = authData.SysUserID;
        }
      
        var localData = $localStorage.AdmReportData
      
        $scope.CollegeCode = localData.CollegeCode
        $scope.DataTypeId = localData.DataTypeId
        $scope.AcademicYear = localData.AcademicYear
        $scope.Branch = localData.Branch
        $scope.Category = localData.Category
        $scope.AdmissionType = localData.AdmissionType
        $scope.Scheme = localData.Scheme
        $scope.Handicaped = localData.Handicaped
        $scope.Sems = localData.Sems
        $scope.CollegeTypes = localData.CollegeTypes
        $scope.DataFormatTypeId = localData.DataFormatTypeId
        //$scope.GetDetails = function (AcademicYear) {
        $scope.loading = true;
      
        var getActiveList = PreExaminationService.AdmissionSubReportPinList($scope.CollegeCode, $scope.Branch, $scope.Sems ,$scope.AcademicYear,$scope.DataFormatTypeId, $scope.Category, $scope.AdmissionType
            , $scope.Scheme, $scope.Handicaped, $scope.DataTypeId);
        getActiveList.then(function (res) {
            try {
                var response = JSON.parse(res)
            } catch (err) {
                $scope.loading = false;
                $scope.Noresult = true;
                $scope.result = false;
            }
  
       

            if (response.Table.length > 0) {
                //console.log(response)
                $scope.$emit('hideLoading', data);
                $scope.filteredData = response.Table;
                $scope.loading = false;
                //$scope.$emit('hideLoading', data);
                $scope.Noresult = false;
                $scope.result = true;
                //var TransferedCount = 0

                //for (var i = 0; i < response.Table.length; i++) {
                //    if (response.Table[i].TransferedCount != null)
                //        TransferedCount = TransferedCount + response.Table[i].TransferedCount;
                //}
                //$scope.TransferedCount = TransferedCount;
            } else {
                $scope.$emit('hideLoading', data);
                $scope.loading = false;
                $scope.Noresult = true;
                $scope.result = false;
            }


        },
        function (error) {
            $scope.$emit('hideLoading', data);
            $scope.loading = false;
            $scope.Noresult = true;
            $scope.result = false;
        })
        //}

        //$scope.DownloadExcel = function () {
        //    var getExcelreport = AdmissionService.GetAdmissionReportsExcel($scope.AcademicYear);
        //    getExcelreport.then(function (data) {
        //        $scope.gentmetbl = false;
        //        if (data.length > 0) {
        //            if (data.length > 4) {

        //                var location = data;
        //                window.location.href = location;

        //            } else {
        //                alert("Data not Present");
        //            }
        //        } else {
        //            alert("Data not Present");
        //        }
        //        //$scope.ResultNotFound = false;
        //        //$scope.ResultFound = false;
        //        $scope.LoadImg = false;


        //    }, function (error) {
        //        $scope.gentmetbl = false;
        //        $scope.ResultNotFound = true;
        //        $scope.ResultFound = false;
        //        $scope.LoadImg = false;
        //    });
        //}

        $scope.DownloadtoExcel = function (tableid) {

            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "Admission_Sem_Wise_Sub_Report.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }
        $scope.DownloadtoExcel1 = function (tableid) {

            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "Admission_Branch_Wise_Sub_Report.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }

        var data = {};
        $scope.$emit('showLoading', data);
        var authData = $localStorage.authorizationData;
        AppSettings.College_Code = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;
        AppSettings.Schemeid = authData.SchemeId;
        $scope.Schemeid = authData.SchemeId;
        AppSettings.Semesterid = authData.SemesterId;
        AppSettings.Branchid = authData.BranchId;
        AppSettings.AcademicYearid = authData.AcdYrID;
        $scope.College_Code = authData.College_Code;
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
        //var StudentRegdata = StudentRegService.GetAdmissionPinReports($scope.College_Code, Branch, Semester, AcademicYear, dataFormatTypeId);
        //StudentRegdata.then(function (data) {
        //    $scope.$emit('hideLoading', data);
        //    //    $scope.LoadImg = false;
        //    $scope.StudentRegListFound = true;
        //    if (data.length > 0) {
        //        var SrNo = 1
        //        for (var i = 0; i < data.length; i++) {
        //            data[i].StuRegSrNo = SrNo;
        //            SrNo = SrNo + 1;
        //        }
        //        $scope.StudentRegList = data;
        //        console.log($scope.StudentRegList);
        //        let temp = [];
        //        temp = data;
        //        temp.forEach(function (student) {
        //            if (student.AttendeeId === null && student.PIN !== null && student.AadharVerfied === true) {
        //                student.AttendeeId = 'Generate AttendeeId';
        //            } else if (student.AttendeeId !== null && student.PIN !== null && student.AadharVerfied === false) {
        //                student.AttendeeId = 'Do Aadhaar kyc';
        //            } else if (student.AttendeeId === '' || student.AttendeeId === null) {
        //                student.AttendeeId = '-';
        //            } else if (student.AttendeeId !== '' || student.AttendeeId !== null) {
        //                student.AttendeeId = student.AttendeeId;
        //            }
        //            return student;
        //        });

        //        $scope.filteredData = temp;
        //        $scope.attendeeId = [];


        //    }
        //    else {
        //        alert("Data Not Found");
        //        $state.go('Dashboard.AdmissionDashboard.Admission');
        //        $scope.StudentRegList = [];
        //        $scope.$emit('hideLoading', data);
        //        return;

        //    }
        //}, function (error) {
        //    alert(error);
        //    $scope.$emit('hideLoading', data);
        //});
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

        //var GetDistricts = StudentRegService.getDistricts()
        //GetDistricts.then(function (data) {
        //    console.log(data);

        //    $scope.districts = data.Table
        //}, function (error) {
        //    alert(error);
        //});


        //$scope.updateMandals = function () {
        //    StudentRegService.GetMandalsForDistrict($scope.StudentReg.DistrictId).then(function (data) {
        //        $scope.mandals = data;
        //        console.log(data.Table);
        //    }, function (error) {
        //        alert(error);
        //    });
        //}

        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {

            window.localStorage.setItem("StudRegID", sender.StudentId);
            window.localStorage.setItem("RouteName", 1);
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
            $state.go('Dashboard.AdmissionDashboard.AdmissionReportPinList');

        };

        $scope.OpenCollegeInfo = function () {
            $state.go('Dashboard.Admission.CollegeInfo');
        };

        $scope.generateAttendeeId = function (studentId, attendeeId) {

            if (attendeeId == 'Generate AttendeeId') {
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
                            var attendee = JSON.parse(data);
                            // console.log(attendee);
                            if (attendee.respcode == "200") {
                                alert(attendee.respdesc + " Use the following Attendee Id for attendance: " + attendee.attdid);
                                $state.go('Dashboard.AdmissionDashboard.AdmissionReportPinList');
                                $scope.modalInstance.close();
                            } else if (attendee.respcode === "409") {
                                alert(attendee.respdesc + " with AtendeeId: " + attendee.attdid);
                            } else {
                                alert(attendee.respdesc);
                                $state.go('Dashboard.AdmissionDashboard.AdmissionReportPinList');
                            }
                        },
                        function (error) {
                            //alert("Error thrown by: ABAS");
                            // console.log(error);
                        }
                    );
                },
                   function (error) {
                       alert(error);
                   });
            }

        };

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

        $scope.showAadhaarModal = function (studentId) {

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
        };

        var location = window.location.origin;
        if (location == "https://sbtet.telangana.gov.in" || location == "http://sbtet.telangana.gov.in") {
            $scope.env = "P";
        } else {
            $scope.env = "PP";
        }


        $scope.generateRdFpRequest = function (uri) {
            var doc = document.implementation.createDocument("", "", null);
            var pidOptions = doc.createElement("PidOptions");

            var opts = doc.createElement("Opts");
            opts.setAttribute("fCount", "1");
            opts.setAttribute("fType", "0");
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
                        $scope.DoAadhaarKyc(data, "04");
                    }
                },
                function (err) {

                }
            );
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
            var getActiveList = PreExaminationService.AdmissionSubReportPinList($scope.CollegeCode, $scope.Branch, $scope.Sems, $scope.AcademicYear, $scope.DataFormatTypeId, $scope.Category, $scope.AdmissionType
            , $scope.Scheme, $scope.Handicaped, $scope.DataTypeId);
            getActiveList.then(function (res) {
                try {
                    var response = JSON.parse(res)
                } catch (err) {
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }



                if (response.Table.length > 0) {
                    //console.log(response)
                    $scope.$emit('hideLoading', data);
                    $scope.filteredData = response.Table;
                    $scope.loading = false;
                    //$scope.$emit('hideLoading', data);
                    $scope.Noresult = false;
                    $scope.result = true;
                    //var TransferedCount = 0

                    //for (var i = 0; i < response.Table.length; i++) {
                    //    if (response.Table[i].TransferedCount != null)
                    //        TransferedCount = TransferedCount + response.Table[i].TransferedCount;
                    //}
                    //$scope.TransferedCount = TransferedCount;
                } else {
                    $scope.$emit('hideLoading', data);
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }


            },
            function (error) {
                $scope.$emit('hideLoading', data);
                $scope.loading = false;
                $scope.Noresult = true;
                $scope.result = false;
            })
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
            var PIDOPTS = '<PidOptions ver=\"1.0\">' + '<Opts fCount=\"1\" fType=\"0\" iCount=\"0\" pCount=\"0\" format=\"0\" pidVer=\"2.0\" timeout=\"20000\" otp=\"\" wadh=\"E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=\" posh=\"\" env=\"' + $scope.env + '\"/>' + '</PidOptions>';
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
                            $scope.DoAadhaarKyc(data, "04");
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

        $scope.irisCapture = function () {
            var PIDOPTS = '<PidOptions ver=\"1.0\">' + '<Opts fCount=\"0\" fType=\"\" iCount=\"1\" iType=\"0\" pCount=\"\" pType=\"\" format=\"0\" pidVer=\"2.0\" timeout=\"15000\" otp=\"\" wadh=\"8QSrHOmcQhlyjiSpIgCi7o2ugs78w+4jhckNk1jeIJg=\" posh=\"\" env=\"' + $scope.env + '\"/>' + '</PidOptions>';
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
            if (StudPin !== null && StudPin !== '' && StudPin === 'undefined') {
                StudentRegService.GetAttendeeidbyPin(StudPin).then(function (response) {
                    // console.log(response);
                    if (response.length > 0) {
                        $scope.attendeId = response[0].attendeeid;
                    }
                }, function (err) {
                    let error = JSON.parse(err);
                    $scope.attendeId = 'undefined';
                    // console.log(error);
                });
            } else {
                $scope.attendeId = 'undefined';
            }
            return $scope.attendeId;
        }


        $scope.approveAadhaar = function () {
            var ret = confirm("Do you confirm that the Aadhaar Data matches with the Data given by student");
            if (ret) {
                StudentRegService.StudentAadhaarVerified($scope.aadhaarVerStu.StudentId, $scope.aadhaarVerStu.AadharNo).then(function (data) {
                    // console.log(data);

                    if (data.length > 0) {
                        let aadhaarVerStudPin = data[0].PIN == null || data[0].PIN == '' || data[0].PIN == 'undefined' ? $scope.PIN : data[0].PIN;
                        $scope.getattedIdbyPin(aadhaarVerStudPin);
                    //    alert("Student PIN: " + data[0].PIN + ", Status: " + data[0].RESULT);
                        $scope.attendeId = $scope.getattedIdbyPin(aadhaarVerStudPin);
                        if (data[0].PINSTATUS == 1 && ($scope.attendeId == null || $scope.attendeId == 'undefined')) {
                            alert("Student PIN: " + data[0].PIN + ", Status: " + data[0].RESULT);
                            $scope.aadhaarVerStu.PIN = data[0].PIN;
                            $scope.registerBmaAttendee();

                            $state.go('Dashboard.AdmissionDashboard.AdmissionReportPinList');
                        } else if (ret && $scope.PIN != null && (attendeeId === null || attendeeId == 'undefined')) {

                            $scope.registerBmaAttendee();
                            $state.go('Dashboard.AdmissionDashboard.AdmissionReportPinList');
                        } else if (ret && $scope.PIN != null && $scope.attendeId != null) {

                            alert("AttendeeId no: " + $scope.attendeId + "already exits with Student Pin no: " + data[0].PIN);
                            $state.go('Dashboard.AdmissionDashboard.AdmissionReportPinList');
                        }

                        else if (data[0].RESULT === "Aadhar number is already exists") {
                            alert(data[0].RESULT);
                            $state.go('Dashboard.AdmissionDashboard.AdmissionReportPinList');
                        }
                        else {

                            alert(data[0].RESULT);
                            $state.go('Dashboard.AdmissionDashboard.AdmissionReportPinList');
                        }

                    }
                }, function (err) {
                    console.log(err);
                });
            }
        };

        $scope.registerBmaAttendee = function () {

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
                    console.log(data);
                    var attendee = JSON.parse(data);
                    console.log(attendee);
                    if (attendee.respcode == "200") {
                        alert(attendee.respdesc + " Use the following Attendee Id for attendance: " + attendee.attdid);
                        $scope.attdid = attendee.attdid;
                        var Message = "Dear" + reqData.attdname + "your PIN: " + reqData.attdcode + "generated, Please mark attendance daily with attendee ID: " + $scope.attdid + ". If student fails to put minimum of 75% attendance they are not entitled to write Semester Examination- Secretary, SBTETTS";

                        //SMS service
                        var getPromise = StudentRegService.SendStudentDetailsASSms(Message, reqData.mobile)
                        getPromise.then(function (data) {
                            if (data.respcode == "200") {
                                alert("SMS is send to the registered mobile number");
                            }
                        }, function (err) {
                            alert("error");
                        });
                        $state.go('Dashboard.AdmissionDashboard.AdmissionReportPinList');
                        //$state.go('Dashboard');
                        $scope.modalInstance.close();
                    } else if (attendee.respcode == "409") {
                        alert(attendee.respdesc + " with AtendeeId: " + attendee.attdid);
                    } else {
                        alert(attendee.respdesc);
                        $state.go('Dashboard.AdmissionDashboard.AdmissionReportPinList');
                    }
                },
                function (error) {
                    console.log(error);
                }
            );
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

    })
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
})