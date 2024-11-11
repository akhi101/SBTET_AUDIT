define(['app'], function(app) {
    app.controller("ExamFormsDioListController", function($scope, $state, AppSettings, ExamFormsDioService, ExamFormsApprovalService, BasicCourseService, BasicExamService) {
        $scope.ExamFormsDioList = {};
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
            DistrictList.then(function(Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function(error) {
                alert(error);
            });
        } else {
            $scope.ExamFormsDioList.CollegeID = AppSettings.CollegeID;
        }

        $scope.FillMandal = function(DistrictID) {
            if ((DistrictID > 0) || (DistrictID != undefined)) {
                $scope.CourseList = [];
                $scope.BranchList = [];
                $scope.ExamList = [];
                $scope.CollegeList = [];
                $scope.MandalList = [];
                $scope.MandalDisable = false;
                $scope.CollegeDisable = false;
                var MandalList = ExamFormsApprovalService.GetMandalListByDistrict(DistrictID);
                MandalList.then(function(MandalListdata, status, headers, config, error) {
                    $scope.MandalList = MandalListdata;
                }, function(error) {
                    alert(error);
                });
            }
        }
        $scope.FillCollege = function(MandalID) {
            if ((MandalID > 0) || (MandalID != undefined)) {
                $scope.CourseList = [];
                $scope.BranchList = [];
                $scope.ExamList = [];
                $scope.CollegeList = [];
                var CollegeList = ExamFormsApprovalService.GetCollegeListByDistrictAndMandal($scope.ExamFormsDioList.DistrictID, MandalID);
                CollegeList.then(function(CollegeListdata, status, headers, config, error) {
                    if (CollegeListdata.length == 0) {
                        $scope.CollegeList = [];
                        alert("There is no college in this mandal");
                        return;
                    } else {
                        $scope.CollegeList = CollegeListdata;
                        $scope.ExamFormsDioBridgeCourseList.CollegeID = "";
                    }
                }, function(error) {
                    alert(error);
                });
            }
        }
        $scope.FillCollData = function(CollegeID) {
            if (CollegeID != null) {
                $scope.CourseList = [];
                $scope.BranchList = [];
                $scope.ExamList = [];
                var CourseList = ExamFormsApprovalService.GetCourseListForRegStud($scope.ExamFormsDioList.CollegeID);
                CourseList.then(function(BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                    $scope.ExamFormsDioList.CourseID = "" + $scope.CourseList[0].CourseID + "";
                    $scope.FillCoursePart($scope.ExamFormsDioList.CourseID);
                }, function(error) {
                    alert(error);
                });
            }
        }
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function(BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
                $scope.ExamFormsDioList.CourseID = "" + $scope.CourseList[0].CourseID + "";
                $scope.FillCoursePart($scope.ExamFormsDioList.CourseID);
            }, function(error) {
                alert(error);
            });
        }
        var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(0);
        CourseList.then(function(BasicCoursedata, status, headers, config, error) {
            $scope.CourseList = BasicCoursedata;
            $scope.ExamFormsDioList.CourseID = "" + $scope.CourseList[0].CourseID + "";
            $scope.FillCoursePart($scope.ExamFormsDioList.CourseID);
        }, function(error) {
            alert(error);
        });
        $scope.FillCoursePart = function(CourseID) {
            $scope.ExamList = [];
            $scope.BranchList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = ExamFormsDioService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function(BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                    var BranchList = ExamFormsDioService.GetBasicBranchListByCourseID(CourseID);
                    BranchList.then(function(BasicBranchdata, status, headers, config, error) {
                        $scope.BranchList = BasicBranchdata;
                    }, function(error) {
                        alert(error);
                    });
                }, function(error) {
                    alert(error);
                });
            }
        }
        $scope.Show = function() {
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormsDioList.DistrictID == undefined) || ($scope.ExamFormsDioList.DistrictID == "")) {
                    alert("Select District");
                    return false;
                }
                if (($scope.ExamFormsDioList.CollegeID == undefined) || ($scope.ExamFormsDioList.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsDioList.CourseID == undefined) || ($scope.ExamFormsDioList.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamFormsDioList.ExamID == undefined) || ($scope.ExamFormsDioList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.ExamFormsDioList.BranchID == undefined) || ($scope.ExamFormsDioList.BranchID == "")) {
                $scope.ExamFormsDioList.BranchID = 0;
            }
            var ExamFormData = ExamFormsDioService.GetExamFormsDioList(AppSettings.ExamInstID, $scope.ExamFormsDioList.CollegeID, $scope.ExamFormsDioList.CourseID, $scope.ExamFormsDioList.ExamID, $scope.ExamFormsDioList.BranchID);
            ExamFormData.then(function(data, status, headers, config, error) {
                if (data.length == 0) {
                    alert("Data not found");
                    $scope.ExamFormsDioListData = [];
                    return;
                } else {
                    $scope.ExamFormsDioListData = data;
                }
            }, function(data, status, headers, config) {
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
        $scope.ExamFormsDioListData = [];
        $("#GridExamFormsDio").ejGrid({
            dataSource: $scope.ExamFormsDioListData,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Add, ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PrintGrid, ej.Grid.ToolBarItems.Search] },
            editSettings: { allowAdding: true },
            toolbarClick: function(args) {
                if (args.itemName == "Add") {
                    args.cancel = true;
                    AddNew();
                }
                this.model["apiUrlAndApiName"] = AppSettings.WebApiUrl + "api/ExamFormsDio/GetExamFormsDioList/?ExamInstID=" + AppSettings.ExamInstID + "&CollegeID=" + $scope.ExamFormsDioList.CollegeID + "&CourseID=" + $scope.ExamFormsDioList.CourseID + "&ExamID=" + $scope.ExamFormsDioList.ExamID + "&BranchID=" + $scope.ExamFormsDioList.BranchID + "";
                this.model["ModelName"] = "ExamFormsDio";
                this.model["ModelName1"] = "CoreExamin.Exam.ExamFormsDio, ExamAPI";
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
            //if (($scope.ExamFormsDioList.AcdYrID == undefined) || ($scope.ExamFormsDioList.AcdYrID == "")) {
            //    alert("Select Academic Year");
            //    return;
            //}
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormsDioList.DistrictID == undefined) || ($scope.ExamFormsDioList.DistrictID == "")) {
                    alert("Select District");
                    return false;
                }
                if (($scope.ExamFormsDioList.CollegeID == undefined) || ($scope.ExamFormsDioList.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormsDioList.CourseID == undefined) || ($scope.ExamFormsDioList.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamFormsDioList.ExamID == undefined) || ($scope.ExamFormsDioList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.ExamFormsDioList.BranchID == undefined) || ($scope.ExamFormsDioList.BranchID == "")) {
                alert("Select Branch");
                return;
            }
            $state.go('Exam.ExamFormsDio', { ExmFrmID: 0, CourseID: $scope.ExamFormsDioList.CourseID, CollegeID: $scope.ExamFormsDioList.CollegeID, ExamID: $scope.ExamFormsDioList.ExamID, BranchID: $scope.ExamFormsDioList.BranchID });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Exam.ExamFormsDio', { ExmFrmID: sender.data.ExmFrmID, CourseID: $scope.ExamFormsDioList.CourseID, CollegeID: $scope.ExamFormsDioList.CollegeID, ExamID: $scope.ExamFormsDioList.ExamID, BranchID: $scope.ExamFormsDioList.BranchID });
            }
        }
        //var ExamFormsDiodata = ExamFormsDioService.GetExamFormsDioList();
        //ExamFormsDiodata.then(function (data) {
        //    $scope.ExamFormsDioListData = data;
        //}, function (error) {
        //    alert(error);
        //});
    });
});