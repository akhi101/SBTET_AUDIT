define(['app'], function (app) {
    app.controller("ExamFormsListController", function ($scope, $state, AppSettings, ExamFormsService, ExamFormsApprovalService,BasicCourseService, BasicExamService) {
        $scope.ExamFormsList = {};
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
            $scope.ExamFormsList.CollegeID = AppSettings.CollegeID;
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
                var CollegeList = ExamFormsApprovalService.GetCollegeListByDistrictAndMandal($scope.ExamFormsList.DistrictID, MandalID);
                CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                    if (CollegeListdata.length == 0) {
                        $scope.CollegeList = [];
                        alert("There is no college in this mandal");
                        return;
                    } else {
                        $scope.CollegeList = CollegeListdata;
                        $scope.ExamFormsBridgeCourseList.CollegeID = "";
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
                var CourseList = ExamFormsApprovalService.GetCourseListForRegStud($scope.ExamFormsList.CollegeID);
                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                    $scope.ExamFormsList.CourseID = "" + $scope.CourseList[0].CourseID + "";
                    $scope.FillCoursePart($scope.ExamFormsList.CourseID);
                }, function (error) {
                    alert(error);
                });
            }
        }
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
                $scope.ExamFormsList.CourseID = "" + $scope.CourseList[0].CourseID + "";
                $scope.FillCoursePart($scope.ExamFormsList.CourseID);
            }, function (error) {
                alert(error);
            });
        } 
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            $scope.BranchList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = ExamFormsService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                    var BranchList = ExamFormsService.GetBasicBranchListByCourseID(CourseID);
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
                if (($scope.ExamFormsList.DistrictID == undefined) || ($scope.ExamFormsList.DistrictID == "")) {
                    alert("Select District");
                    return false;
                }
                if (($scope.ExamFormsList.CollegeID == undefined) || ($scope.ExamFormsList.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsList.CourseID == undefined) || ($scope.ExamFormsList.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamFormsList.ExamID == undefined) || ($scope.ExamFormsList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.ExamFormsList.BranchID == undefined) || ($scope.ExamFormsList.BranchID == "")) {
                $scope.ExamFormsList.BranchID = 0;
            }
            var ExamFormData = ExamFormsService.GetExamFormsList(AppSettings.ExamInstID, $scope.ExamFormsList.CollegeID, $scope.ExamFormsList.CourseID, $scope.ExamFormsList.ExamID, $scope.ExamFormsList.BranchID);
            ExamFormData.then(function (data, status, headers, config, error) {
                if (data.length == 0) {
                    alert("Data not found");
                    $scope.ExamFormsListData = [];
                    return;
                } else {
                    $scope.ExamFormsListData = data;
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
            { field: "StudCatName", headerText: "Category", textAlign: ej.TextAlign.Left, width: 100 },
        ];
        $scope.ExamFormsListData = [];
        $("#GridExamForms").ejGrid({
            dataSource: $scope.ExamFormsListData,
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
                this.model["apiUrlAndApiName"] = AppSettings.WebApiUrl + "api/ExamForms/GetExamFormsList/?ExamInstID=" + AppSettings.ExamInstID + "&CollegeID=" + $scope.ExamFormsList.CollegeID + "&CourseID=" + $scope.ExamFormsList.CourseID + "&ExamID=" + $scope.ExamFormsList.ExamID + "&BranchID=" + $scope.ExamFormsList.BranchID + "";
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
            //if (RightForCurrentPage[0].isaddable != 'Y') {
            //     alert("You Don't have Add Rights");
            //    return;
            // } else {
            //if (($scope.ExamFormsList.AcdYrID == undefined) || ($scope.ExamFormsList.AcdYrID == "")) {
            //    alert("Select Academic Year");
            //    return;
            //}
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormsList.DistrictID == undefined) || ($scope.ExamFormsList.DistrictID == "")) {
                    alert("Select District");
                    return false;
                }
                if (($scope.ExamFormsList.CollegeID == undefined) || ($scope.ExamFormsList.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsList.CourseID == undefined) || ($scope.ExamFormsList.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamFormsList.ExamID == undefined) || ($scope.ExamFormsList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.ExamFormsList.BranchID == undefined) || ($scope.ExamFormsList.BranchID == "")) {
                alert("Select Branch");
                return;
            }
            $state.go('Exam.ExamForms', { ExmFrmID: 0, CourseID: $scope.ExamFormsList.CourseID, CollegeID: $scope.ExamFormsList.CollegeID , ExamID: $scope.ExamFormsList.ExamID, BranchID: $scope.ExamFormsList.BranchID });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Exam.ExamForms', { ExmFrmID: sender.data.ExmFrmID, CourseID: $scope.ExamFormsList.CourseID, CollegeID: $scope.ExamFormsList.CollegeID, ExamID: $scope.ExamFormsList.ExamID, BranchID: $scope.ExamFormsList.BranchID });
            }
        }
        //var ExamFormsdata = ExamFormsService.GetExamFormsList();
        //ExamFormsdata.then(function (data) {
        //    $scope.ExamFormsListData = data;
        //}, function (error) {
        //    alert(error);
        //});
    });
});