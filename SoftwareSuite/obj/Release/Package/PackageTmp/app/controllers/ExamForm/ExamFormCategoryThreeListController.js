define(['app'], function (app) {
    app.controller("ExamFormCategoryThreeListController", function ($scope, $state, AppSettings, ExamFormCategoryThreeService, ExamFormsApprovalService, BasicCourseService, BasicExamService) {
        $scope.ExamFormCategoryThreeList = {};
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
            $scope.ExamFormCategoryThreeList.CollegeID = AppSettings.CollegeID;
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
                var CollegeList = ExamFormsApprovalService.GetCollegeListByDistrictAndMandal($scope.ExamFormCategoryThreeList.DistrictID, MandalID);
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
                var CourseList = ExamFormsApprovalService.GetCourseListForRegStud($scope.ExamFormCategoryThreeList.CollegeID);
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
        //var AcdYearList = ExamFormCategoryThreeService.GetBasicAcademicYearListForExamForm();
        //AcdYearList.then(function (AcdYeardata, status, headers, config, error) {
        //    $scope.AcdYearList = AcdYeardata;
        //}, function (AcdYeardata, status, headers, config) {
        //    alert(error);
        //});
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            $scope.BranchList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = ExamFormCategoryThreeService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                    var BranchList = ExamFormCategoryThreeService.GetBasicBranchListByCourseID(CourseID);
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
                if (($scope.ExamFormCategoryThreeList.DistrictID == undefined) || ($scope.ExamFormCategoryThreeList.DistrictID == "")) {
                    alert("Select District");
                    return false;
                }
                if (($scope.ExamFormCategoryThreeList.CollegeID == undefined) || ($scope.ExamFormCategoryThreeList.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormCategoryThreeList.CourseID == undefined) || ($scope.ExamFormCategoryThreeList.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamFormCategoryThreeList.ExamID == undefined) || ($scope.ExamFormCategoryThreeList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.ExamFormCategoryThreeList.BranchID == undefined) || ($scope.ExamFormCategoryThreeList.BranchID == "")) {
                $scope.ExamFormCategoryThreeList.BranchID = 0;
            }
            var ExamFormData = ExamFormCategoryThreeService.GetExamFormCategoryThreeList(AppSettings.ExamInstID, $scope.ExamFormCategoryThreeList.CollegeID, $scope.ExamFormCategoryThreeList.CourseID, $scope.ExamFormCategoryThreeList.ExamID, $scope.ExamFormCategoryThreeList.BranchID);
            ExamFormData.then(function (data, status, headers, config, error) {
                if (data.length == 0) {
                    alert("Data not found");
                    $scope.ExamFormCategoryThreeListData = [];
                    return;
                } else {
                    $scope.ExamFormCategoryThreeListData = data;
                }
            }, function (data, status, headers, config) {
                alert(error);
            });
        }

        var gridColumns = [
            { field: "ExmFrmID", headerText: "ExmFrmID", textAlign: ej.TextAlign.Right, visible: false },
            { field: "Formno", headerText: "Form no", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "PRNNo", headerText: "PRN No", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "MainGrpName", headerText: "Group", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "MediumName", headerText: "Medium", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "SubName", headerText: "Second Lang.", textAlign: ej.TextAlign.Left, width: 100 },
        ];
        $scope.ExamFormCategoryThreeListData = [];
        $("#GridExamFormsImprovment").ejGrid({
            dataSource: $scope.ExamFormCategoryThreeListData,
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
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormCategoryThreeList.DistrictID == undefined) || ($scope.ExamFormCategoryThreeList.DistrictID == "")) {
                    alert("Select District");
                    return false;
                }
                if (($scope.ExamFormCategoryThreeList.CollegeID == undefined) || ($scope.ExamFormCategoryThreeList.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormCategoryThreeList.CourseID == undefined) || ($scope.ExamFormCategoryThreeList.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamFormCategoryThreeList.ExamID == undefined) || ($scope.ExamFormCategoryThreeList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.ExamFormCategoryThreeList.BranchID == undefined) || ($scope.ExamFormCategoryThreeList.BranchID == "")) {
                alert("Select Branch");
                return;
            }
            $state.go('Exam.ExamFormCategoryThree', { ExmFrmID: 0, CourseID: $scope.ExamFormCategoryThreeList.CourseID, CollegeID: $scope.ExamFormCategoryThreeList.CollegeID, ExamID: $scope.ExamFormCategoryThreeList.ExamID, BranchID: $scope.ExamFormCategoryThreeList.BranchID });
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Exam.ExamFormCategoryThree', { ExmFrmID: sender.data.ExmFrmID, CourseID: $scope.ExamFormCategoryThreeList.CourseID, CollegeID: $scope.ExamFormCategoryThreeList.CollegeID, ExamID: $scope.ExamFormCategoryThreeList.ExamID, BranchID: $scope.ExamFormCategoryThreeList.BranchID });
            }
        }
        //var ExamFormsdata = ExamFormCategoryThreeService.GetExamFormCategoryThreeList();
        //ExamFormsdata.then(function (data) {
        //    $scope.ExamFormCategoryThreeListData = data;
        //}, function (error) {
        //    alert(error);
        //});
    });
});