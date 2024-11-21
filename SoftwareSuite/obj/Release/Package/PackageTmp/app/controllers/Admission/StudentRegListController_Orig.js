define(['app'], function (app) {
    app.controller("StudentRegListController", function ($scope, $state,$localStorage, AppSettings, StudentRegService, RegisterAdmittedStudentService, $uibModal) {
        var authData = $localStorage.authorizationData;
        AppSettings.College_Code = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;

        $scope.College_Code = authData.College_Code;
        $scope.College_Name = authData.College_Name;
        $scope.StudentRegList = {};
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].GridFormToOpen == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        }
        var gridColumns = [
            { field: "StudentId", headerText: "S. No.", textAlign: ej.TextAlign.Right },
            //{ field: "AdmStatus", headerText: "Status", textAlign: ej.TextAlign.Left },
            //{ field: "RegularOrOpen", headerText: "Regular/Open", textAlign: ej.TextAlign.Left },
            //{ field: "AdmNo", headerText: "Enroll No.", textAlign: ej.TextAlign.Right },
            { field: "Name", headerText: "Student Name", textAlign: ej.TextAlign.Left },
            { field: "FatherName", headerText: "Father Name", textAlign: ej.TextAlign.Left },
            { field: "MotherName", headerText: "Mother Name", textAlign: ej.TextAlign.Left },
            { field: "DateOfBirth", headerText: "Birth Date", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Left },
            { field: "Gender", headerText: "Sex", textAlign: ej.TextAlign.Left },
            { field: "SSCHallTicketNo", headerText: "Hall Ticket No.", textAlign: ej.TextAlign.Right },
            //{ field: "CasteName", headerText: "Caste", textAlign: ej.TextAlign.Left },
            //{ field: "SubName", headerText: "Sec. Lang.", textAlign: ej.TextAlign.Left },
            //{ field: "MainGrpName", headerText: "Main Group", textAlign: ej.TextAlign.Left },
            //{ field: "MediumName", headerText: "Medium", textAlign: ej.TextAlign.Left },
            //{ field: "PassingYear", headerText: "Passing Year", textAlign: ej.TextAlign.Left },
            //{ field: "PassingMonth", headerText: "Passing Month", textAlign: ej.TextAlign.Left },
            //{ field: "StudRegID", headerText: "StudRegID", visible: false, textAlign: ej.TextAlign.Right },
            { field: "PIN", headerText: "PinNo", textAlign: ej.TextAlign.Right, width: 80 }
        ];
        $scope.StudentRegList = [];
        $("#StudentRegs").ejGrid({
            dataSource: $scope.StudentRegList,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
            toolbarClick: function (args) {
                debugger;
                if (args.itemName == "Add") {
                    args.cancel = true;
                    AddNew();
                }
                if (args.itemName == "Excel Export") {
                    args.cancel = true;
                    //this.export(AppSettings.ExportToExcelUrl);
                    alasql('SELECT * INTO XLSX("StudentList.xlsx",{headers:true}) FROM ?', [$scope.StudentRegList]);
                }
                if (args.itemName == "Word Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToWordUrl);
                }
                if (args.itemName == "PDF Export") {
                    args.cancel = true;
                    //this.export(AppSettings.ExportToPdfUrl);
                    var columns = [
                        { title: "S. No", dataKey: "StudentId" },
                        { title: "Name", dataKey: "Name" }
                    ];
                    var doc = new jsPDF('p', 'pt');
                    doc.autoTable(columns, $scope.StudentRegList);
                    doc.save('StudentList.pdf');
                }
            },
            columns: gridColumns
            //columns: ["StuRegSrNo", "SNO", "StudentID", "PINNo", "Name"]
        });
        // Add new Record
        function AddNew() {
            //if (RightForCurrentPage[0].RollAdd != 'Y') {
            //     alert("You Don't have Add Rights");
            //    return;
            // } else {
            $state.go('Admission.StudRegID', { 'StudRegID': 0 });
            //}
        }
        $scope.cancel = function () {

            alert("this");
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            window.localStorage.setItem("StudRegID", sender.data.StudentId);
            if (this.multiSelectCtrlRequest == false) {
              
                if (sender.data.PIN != "") {                   
                    //alert("PRN is generated, you can't edit record.");
                    //$state.go('Admission.StudentReg', { StudRegID: sender.data.StudRegID, CourseID: $scope.CourseID });
                    
                    //$state.go('Admission.StudentReg', { 'StudRegID': sender.data.StudRegID });
                    var modalInstance = $uibModal.open({
                        templateUrl: "/app/views/Admission/StudentReg.html",
                        //controller: "StudentRegController",
                        size: 'lg',
                    });
                } else {
                   
                    //$state.go('Admission.StudentReg', { StudRegID: sender.data.StudRegID, CourseID: $scope.CourseID });
                    //$state.go('Admission.StudentReg', { 'StudRegID': sender.data.StudRegID });
                    var modalInstance = $uibModal.open({
                        templateUrl: "/app/views/Admission/StudentReg.html",
                        //controller: "StudentRegController",
                        size: 'lg',
                    });
                }
            }
        }
        var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        //alert(AppSettings.CollegeID);
        var SearchByDropItems = RegisterAdmittedStudentService.GetSearchByDropItems(AppSettings.CollegeID);
        SearchByDropItems.then(function (SearchDropData, status, headers, config, error) {
            console.log(SearchDropData);
            $scope.SearchDropData = SearchDropData;
        }, function (error) {
            alert(error);
        })
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
        }
        var MainGroupList = StudentRegService.GetMainGroupListByCollegeId(AppSettings.CollegeID);
        MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
            $scope.MainGroupList = MainGroupListdata;
        }, function (error) {
            alert(error);
        });
        var MediumList = StudentRegService.GetBasicMediumListByCollegeId(AppSettings.CollegeID);
        MediumList.then(function (SecondLangdata, status, headers, config, error) {
            $scope.MediumList = SecondLangdata;
        }, function (error) {
            alert(error);
        });
        var SecondLangList = StudentRegService.GetBasicSubjectListForSecondLangaugeInRegStud1(AppSettings.CollegeID, 0, AppSettings.AcdYrID, 0);
        SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
            $scope.SecondLangList = SecondLangdata;
        }, function (error) {
            alert(error);
        });
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
            debugger;
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
            $state.go('Admission.StudentRegList');
        };

        $scope.OpenCollegeInfo = function () {
            $state.go('Admission.CollegeInfo');
        };


        //All Data Shows
        //var StudentRegdata = StudentRegService.FillStudentRegDetailsListAll(AppSettings.CollegeID);
        //StudentRegdata.then(function (data) {
        //    if (data.length > 0) {
        //        var SrNo = 1
        //        for (var i = 0; i < data.length; i++) {
        //            data[i].StuRegSrNo = SrNo;
        //            SrNo = SrNo + 1;
        //        }
        //        $scope.StudentRegList = data;
        //    }
        //    else {
        //        alert("Data Not Found");
        //        $scope.StudentRegList = [];
        //        return;
        //    }
        //}, function (error) {
        //    alert(error);
        //});
    });
    app.controller("StudentRegController", function ($filter, $http, $scope, $state, $stateParams, AppSettings, StudentRegService) {
      
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        //var studentID = $stateParams.StudRegID;
        var studentID = window.localStorage.StudRegID;
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].GridFormToOpen == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        }
        var StudentRegReq = StudentRegService.GetStudentRegById(studentID).then(function (data) {
            console.log(data);
            $scope.StudentReg = data[0];
        },
            function (error) {
                alert(error);
            });

        $scope.UpdateStudent = function () {
            StudentRegService.UpdateStudentReg($scope.StudentReg).then(function (data) {
                console.log(data);
            }, function (error) {
                alert(error);
            });
        }
        $scope.GenPin = function () {
            StudentRegService.GenPin(studentID).then(function (data, status, headers, config, error) {
                console.log(data);
                $scope.pinReply = data[0];
                $scope.StudentReg.PIN = $scope.pinReply.PIN;
                alert($scope.pinReply.Result);
            }, function (error) {
                alert(error);
            });
        };
    });
});