define(['app'], function (app) {
    app.controller("ExamFormsImprovementListController", function ($scope, $state, AppSettings, ExamFormsImprovementService, ExamFormsApprovalService, BasicCourseService, BasicExamService) {
        $scope.ExamFormsImprovementList = {};
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
            $scope.ExamFormsImprovementList.CollegeID = AppSettings.CollegeID;
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
                var CollegeList = ExamFormsApprovalService.GetCollegeListByDistrictAndMandal($scope.ExamFormsImprovementList.DistrictID, MandalID);
                CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                    if (CollegeListdata.length == 0) {
                        $scope.CollegeList = [];
                        alert("There is no college in this mandal");
                        return;
                    } else {
                        $scope.CollegeList = CollegeListdata;
                        $scope.ExamFormsImprovementList.CollegeID = "";
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
                var CourseList = ExamFormsApprovalService.GetCourseListForRegStud($scope.ExamFormsImprovementList.CollegeID);
                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                    $scope.ExamFormsImprovementList.CourseID = "" + $scope.CourseList[0].CourseID + "";
                    $scope.FillCoursePart($scope.ExamFormsImprovementList.CourseID);
                }, function (error) {
                    alert(error);
                });
            }
        }
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
                $scope.ExamFormsImprovementList.CourseID = "" + $scope.CourseList[0].CourseID + "";
                $scope.FillCoursePart($scope.ExamFormsImprovementList.CourseID);
            }, function (error) {
                alert(error);
            });
        }
        //var AcdYearList = ExamFormsImprovementService.GetBasicAcademicYearListForExamForm();
        //AcdYearList.then(function (AcdYeardata, status, headers, config, error) {
        //    $scope.AcdYearList = AcdYeardata;
        //}, function (AcdYeardata, status, headers, config) {
        //    alert(error);
        //});
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            $scope.BranchList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = ExamFormsImprovementService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                    var BranchList = ExamFormsImprovementService.GetBasicBranchListByCourseID(CourseID);
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
                if (($scope.ExamFormsImprovementList.DistrictID == undefined) || ($scope.ExamFormsImprovementList.DistrictID == "")) {
                    alert("Select District");
                    return false;
                }
                if (($scope.ExamFormsImprovementList.CollegeID == undefined) || ($scope.ExamFormsImprovementList.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsImprovementList.CourseID == undefined) || ($scope.ExamFormsImprovementList.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamFormsImprovementList.ExamID == undefined) || ($scope.ExamFormsImprovementList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.ExamFormsImprovementList.BranchID == undefined) || ($scope.ExamFormsImprovementList.BranchID == "")) {
                $scope.ExamFormsImprovementList.BranchID = 0;
            }
            var ExamFormData = ExamFormsImprovementService.GetExamFormsImprovementList(AppSettings.ExamInstID, $scope.ExamFormsImprovementList.CollegeID, $scope.ExamFormsImprovementList.CourseID, $scope.ExamFormsImprovementList.ExamID, $scope.ExamFormsImprovementList.BranchID);
            ExamFormData.then(function (data, status, headers, config, error) {
                if (data.length == 0) {
                    alert("Data not found");
                    $scope.ExamFormsImprovementListData = [];
                    return;
                } else {
                    $scope.ExamFormsImprovementListData = data;
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
        $scope.ExamFormsImprovementListData = [];
        $("#GridExamFormsImprovment").ejGrid({
            dataSource: $scope.ExamFormsImprovementListData,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Add, ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PrintGrid, ej.Grid.ToolBarItems.Search] },
            editSettings: { allowAdding: true },
            toolbarClick: function (args) {
                if (args.itemName == "Add") {
                    args.cancel = true;
                    AddNew();
                }
                this.model["apiUrlAndApiName"] = AppSettings.WebApiUrl + "api/ExamForms/GetExamFormsImprovementList/?ExamInstID=" + AppSettings.ExamInstID + "&CollegeID=" + $scope.ExamFormsList.CollegeID + "&CourseID=" + $scope.ExamFormsList.CourseID + "&ExamID=" + $scope.ExamFormsList.ExamID + "&BranchID=" + $scope.ExamFormsList.BranchID + "";
                this.model["ModelName"] = "ExamForms";
                this.model["ModelName1"] = "CoreExamin.Exam.ExamForms, ExamAPI";
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
                if (($scope.ExamFormsImprovementList.DistrictID == undefined) || ($scope.ExamFormsImprovementList.DistrictID == "")) {
                    alert("Select District");
                    return false;
                }
                if (($scope.ExamFormsImprovementList.CollegeID == undefined) || ($scope.ExamFormsImprovementList.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsImprovementList.CourseID == undefined) || ($scope.ExamFormsImprovementList.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamFormsImprovementList.ExamID == undefined) || ($scope.ExamFormsImprovementList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.ExamFormsImprovementList.BranchID == undefined) || ($scope.ExamFormsImprovementList.BranchID == "")) {
                alert("Select Branch");
                return;
            }
            var SequenceNo = "";
            for (var i = 0; i < $scope.ExamList.length; i++) {
                if ($scope.ExamList[i].ExamID == $scope.ExamFormsImprovementList.ExamID) {
                    SequenceNo = $scope.ExamList[i].SequenceNo;
                }
            }
            if (SequenceNo == "1") {
                var ExamFormList = ExamFormsImprovementService.GetReexamFlagForFirstYr(AppSettings.ExamInstID, $scope.ExamFormsImprovementList.ExamID);
                ExamFormList.then(function (ExamFormdata, status, headers, config, error) {
                    if (ExamFormdata == "Y") {
                        $state.go('Exam.ExamFormsImprovement', { ExmFrmID: 0, CourseID: $scope.ExamFormsImprovementList.CourseID, CollegeID: $scope.ExamFormsImprovementList.CollegeID, ExamID: $scope.ExamFormsImprovementList.ExamID, BranchID: $scope.ExamFormsImprovementList.BranchID });
                    } else {
                        alert("You can not fill up Improvement form (Category 2) for the 1st Year in the Regular Exam");
                        return;
                    }
                }, function (ExamFormdata, status, headers, config) {
                    alert(error);
                });
            } else {
                $state.go('Exam.ExamFormsImprovement', { ExmFrmID: 0, CourseID: $scope.ExamFormsImprovementList.CourseID, CollegeID: $scope.ExamFormsImprovementList.CollegeID, ExamID: $scope.ExamFormsImprovementList.ExamID, BranchID: $scope.ExamFormsImprovementList.BranchID });
            }
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Exam.ExamFormsImprovement', { ExmFrmID: sender.data.ExmFrmID, CourseID: $scope.ExamFormsImprovementList.CourseID, CollegeID: $scope.ExamFormsImprovementList.CollegeID, ExamID: $scope.ExamFormsImprovementList.ExamID, BranchID: $scope.ExamFormsImprovementList.BranchID });
            }
        }
        //var ExamFormsdata = ExamFormsImprovementService.GetExamFormsImprovementList();
        //ExamFormsdata.then(function (data) {
        //    $scope.ExamFormsImprovementListData = data;
        //}, function (error) {
        //    alert(error);
        //});
    });
});