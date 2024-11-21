define(['app'], function (app) {
    app.controller("ExamFormsRepeaterListController", function ($scope, $state, AppSettings, ExamFormsRepeaterService, ExamFormsApprovalService, BasicCourseService, BasicExamService) {
        $scope.ExamFormsRepeaterList = {};
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
        $scope.ForBoardDisable = true;
        if (AppSettings.CollegeID == 0) {
            $scope.ForBoardDisable = false;
            var DistrictList = ExamFormsApprovalService.GetDistrictListByStateID(1);
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function (error) {
                alert(error);
            });
        } else {
            $scope.ExamFormsRepeaterList.CollegeID = AppSettings.CollegeID;
        }
        $scope.FillMandal = function (DistrictID) {
            if ((DistrictID > 0) || (DistrictID != undefined)) {
                $scope.CourseList = [];
                $scope.BranchList = [];
                $scope.ExamList = [];
                $scope.CollegeList = [];
                $scope.MandalList = [];
                $scope.MandalDisable = false;
                $scope.CollegeDisable = false;
                var MandalList = ExamFormsApprovalService.GetMandalListByDistrict(DistrictID);
                MandalList.then(function (MandalListdata, status, headers, config, error) {
                    $scope.MandalList = MandalListdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillCollege = function (MandalID) {
            if ((MandalID > 0) || (MandalID != undefined)) {
                $scope.CourseList = [];
                $scope.BranchList = [];
                $scope.ExamList = [];
                $scope.CollegeList = [];
                var CollegeList = ExamFormsApprovalService.GetCollegeListByDistrictAndMandal($scope.ExamFormsRepeaterList.DistrictID, MandalID);
                CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                    if (CollegeListdata.length == 0) {
                        $scope.CollegeList = [];
                        alert("There is no college in this mandal");
                        return;
                    } else {
                        $scope.CollegeList = CollegeListdata;
                        $scope.GovtColEnroll.CollegeID = "";
                    }
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillCollData = function (CollegeID) {
            if (CollegeID != null) {
                $scope.CourseList = [];
                $scope.BranchList = [];
                $scope.ExamList = [];
                var CourseList = ExamFormsApprovalService.GetCourseListForRegStud($scope.ExamFormsRepeaterList.CollegeID);
                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
            }, function (error) {
                alert(error);
            });
        }
        //var AcdYearList = ExamFormsRepeaterService.GetBasicAcademicYearListForExamForm();
        //AcdYearList.then(function (AcdYeardata, status, headers, config, error) {
        //    $scope.AcdYearList = AcdYeardata;
        //}, function (AcdYeardata, status, headers, config) {
        //    alert(error);
        //});
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            $scope.BranchList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = BasicExamService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                    var BranchList = ExamFormsRepeaterService.GetBasicBranchListByCourseID(CourseID);
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
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormsRepeaterList.DistrictID == undefined) || ($scope.ExamFormsRepeaterList.DistrictID == "")) {
                    alert("Select District");
                    return false;
                }
                if (($scope.ExamFormsRepeaterList.CollegeID == undefined) || ($scope.ExamFormsRepeaterList.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsRepeaterList.CourseID == undefined) || ($scope.ExamFormsRepeaterList.CourseID == "")) {
                alert("Select stream");
                return;
            }
            if (($scope.ExamFormsRepeaterList.ExamID == undefined) || ($scope.ExamFormsRepeaterList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            var ExamFormData = ExamFormsRepeaterService.GetExamFormsRepeaterList(AppSettings.AcdYrID, $scope.ExamFormsRepeaterList.CollegeID, $scope.ExamFormsRepeaterList.CourseID, $scope.ExamFormsRepeaterList.ExamID, $scope.ExamFormsRepeaterList.BranchID);
            ExamFormData.then(function (data, status, headers, config, error) {
                if (data.length == 0) {
                    alert("Data not found");
                    $scope.ExamFormsRepeaterListData = [];
                    return;
                } else {
                    $scope.ExamFormsRepeaterListData = data;
                }
            }, function (data, status, headers, config) {
                alert(error);
            });
        }

        var gridColumns = [
            { field: "ExmFrmID", headerText: "ExmFrmID", textAlign: ej.TextAlign.Right, visible: false },
            { field: "Formno", headerText: "Form no", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "Fathername", headerText: "Father Name", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "MotherName", headerText: "Mother Name", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "SSCHallTicket", headerText: "SSC Hall Ticket", textAlign: ej.TextAlign.Left, width: 100 }
        ];
        $scope.ExamFormsRepeaterListData = [];
        $("#GridExamFormsRepeater").ejGrid({
            dataSource: $scope.ExamFormsRepeaterListData,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Add, ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
            editSettings: { allowAdding: true },
            toolbarClick: function (args) {
                if (args.itemName == "Add") {
                    args.cancel = true;
                    AddNew();
                }
                if (args.itemName == "Excel Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToExcelUrl);
                }
                if (args.itemName == "Word Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToWordUrl);
                }
                if (args.itemName == "PDF Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToPdfUrl);
                }
            },
            columns: gridColumns
        });
        // Add new Record
        function AddNew() {
            if (($scope.ExamFormsRepeaterList.CourseID == undefined) || ($scope.ExamFormsRepeaterList.CourseID == "")) {
                alert("Select stream");
                return;
            }
            if (($scope.ExamFormsRepeaterList.ExamID == undefined) || ($scope.ExamFormsRepeaterList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.ExamFormsRepeaterList.BranchID == undefined) || ($scope.ExamFormsRepeaterList.BranchID == "")) {
                alert("Select Branch");
                return;
            }
            $state.go('Exam.ExamFormsRepeater', { ExmFrmID: 0, CourseID: $scope.ExamFormsRepeaterList.CourseID, CollegeID: $scope.ExamFormsRepeaterList.CollegeID, ExamID: $scope.ExamFormsRepeaterList.ExamID, BranchID: $scope.ExamFormsRepeaterList.BranchID });
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Exam.ExamFormsRepeater', { ExmFrmID: sender.data.ExmFrmID, CourseID: $scope.ExamFormsRepeaterList.CourseID, CollegeID: $scope.ExamFormsRepeaterList.CollegeID, ExamID: $scope.ExamFormsRepeaterList.ExamID, BranchID: $scope.ExamFormsRepeaterList.BranchID });
            }
        }
        
    });
});