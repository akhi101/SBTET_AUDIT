define(['app'], function (app) {
    app.controller("ExamFormsCorrectionApprovalListController", function ($scope, $localStorage, $stateParams, $state, AppSettings, ExamFormsApprovalService, ExamFormsCorrectionService) {
        $scope.ExamFormsCorrectionApprovalList = { AppUsrD: $stateParams.D, AppUsrB1: $stateParams.B1, AppUsrB2: $stateParams.B2 };
        $scope.User = "D";
        if ($stateParams.D == "") {
            $scope.User="D"
        } else if ($stateParams.B1 == "") {
            $scope.User = "B1"
        } else {
            $scope.User = "B2"
        }
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
        $scope.ExamDisable = true;
        if (AppSettings.CollegeID == 0) {
            $scope.ForBoardDisable = false;
            var DistrictList = ExamFormsApprovalService.GetDistrictListByStateID(1);
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function (error) {
                alert(error);
            });
        } else { $scope.ExamFormsCorrectionApprovalList.CollegeID = AppSettings.CollegeID; }
        $scope.FillMandal = function (DistrictID) {
            if ((DistrictID > 0) || (DistrictID != undefined)) {
                $scope.CourseList = [];
                $scope.ExamListData = [];
                $scope.MainGroupList = [];
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
                $scope.ExamListData = [];
                $scope.MainGroupList = [];
                $scope.CollegeList = [];
                var CollegeList = ExamFormsApprovalService.GetCollegeListByDistrictAndMandal($scope.ExamFormsCorrectionApprovalList.DistrictID, MandalID);
                CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                    if (CollegeListdata.length == 0) {
                        $scope.CollegeList = [];
                        alert("There is no college in this mandal");
                        return;
                    } else {
                        $scope.CollegeList = CollegeListdata;
                        $scope.ExamFormsCorrectionApprovalList.CollegeID = "";
                    }
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillCollData = function (CollegeID) {
            if (CollegeID != null) {
                $scope.CourseList = [];
                $scope.ExamListData = [];
                $scope.MainGroupList = [];

                var CourseList = ExamFormsApprovalService.GetCourseListForRegStud($scope.ExamFormsCorrectionApprovalList.CollegeID);
                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                    $scope.ExamFormsCorrectionApprovalList.CourseID = "" + $scope.CourseList[0].CourseID + "";
                    $scope.NFillCoursePart($scope.ExamFormsCorrectionApprovalList.CourseID);
                }, function (error) {
                    alert(error);
                });
            }
        }
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
                //$scope.ExamFormsCorrectionApprovalList.CourseID = "" + $scope.CourseList[0].CourseID + "";
                $scope.NFillCoursePart($scope.ExamFormsCorrectionApprovalList.CourseID);
            }, function (error) {
                alert(error);
            });
        }
        
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamListData = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = ExamFormsApprovalService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamDisable = false;
                    $scope.ExamListData = BasicExamdata;
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.NFillCoursePart = function (CourseID) {
            $scope.ExamListData = [];
            if ((CourseID != "") && (CourseID != null)) {
                if (CourseID != 0) {
                    var ExamList = ExamFormsApprovalService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                    ExamList.then(function (BasicExamdata, status, headers, config, error) {
                        $scope.ExamDisable = false;
                        $scope.ExamListData = BasicExamdata;
                    }, function (error) {
                        alert(error);
                    });
                }
            }
        }
        var gridColumns = [
            { field: "PreStudRegID", headerText: "PreStudRegID", textAlign: ej.TextAlign.Right, visible: false },
            { field: "PRNNo", headerText: "PRN No", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 200 },
            { field: "StudCatName", headerText: "Category[New]",  textAlign: ej.TextAlign.Left, width: 100 },
            { field: "FormFees", headerText: "Form Fee",  textAlign: ej.TextAlign.Left, width: 100 },
            { field: "BridgeCourseFees", headerText: "Bridge Fee",  textAlign: ej.TextAlign.Left, width: 100 },
            { field: "MainGrpName", headerText: "Group[New]",  textAlign: ej.TextAlign.Left, width: 100 },
            { field: "MediumName", headerText: "Medium[New]",  textAlign: ej.TextAlign.Left, width: 150 },
            { field: "SubName",headerText: "Second Lang.[New]",  textAlign: ej.TextAlign.Left, width: 150 },
            { field: "FirstYearSubjects", headerText: "1st Yr Subjects",  textAlign: ej.TextAlign.Left, width: 150 },
            { field: "ModifyFirstYearSubjects", headerText: "Modify 1st Yr Subjects",  textAlign: ej.TextAlign.Left, width: 150 },
            { field: "SecondYearSubjects", headerText: "2nd Yr Subjects",  textAlign: ej.TextAlign.Left, width: 150 },
            { field: "ModifySecondYearSubjects", headerText: "Modify 2nd Yr Subjects", textAlign: ej.TextAlign.Left, width: 150 },
        ];
        $scope.ExamFormsApprovalData = [];
        $("#GridCorrectionApp").ejGrid({
            dataSource: $scope.ExamFormsApprovalData,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ ej.Grid.ToolBarItems.Search] },
            editSettings: {  },
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
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
                $state.go('Exam.ExamFormsCorrectionApproval', { PreStudRegID: sender.data.PreStudRegID, User : $scope.User  });
            }
        }
        $scope.AppDisable = false;
        $scope.LoadImg = false;

        $scope.Show = function () {
            $scope.ExamFormsCorrectionApprovalList.TotalCondidate = "";
            $scope.ExamFormsCorrectionApprovalList.TotalFeeAmountSelected = "";
            $scope.ExamFormsCorrectionApprovalList.TotalCondidateCount = "";
            $scope.ExamFormsCorrectionApprovalList.TotalFeeAmount = "";
            $scope.headercheck = false;
            $scope.ExamFormsApprovalData = [];
            if (($scope.ExamFormsCorrectionApprovalList.CourseID == undefined) || ($scope.ExamFormsCorrectionApprovalList.CourseID == "")) {
                alert("Select stream");
                return;
            }
            if (($scope.ExamFormsCorrectionApprovalList.ExamID == undefined) || ($scope.ExamFormsCorrectionApprovalList.ExamID == "")) {
                alert("Select Year");
                return;
            }
            $scope.AppDisable = true;
            $scope.LoadImg = true;
            for (var i = 0; i < $scope.ExamListData.length; i++) {
                if ($scope.ExamListData[i].ExamID == $scope.ExamFormsCorrectionApprovalList.ExamID) {
                    $scope.SequenceNo = $scope.ExamListData[i].SequenceNo;
                }
            }
            var ExamFormData = ExamFormsCorrectionService.GetExamFormsCorrectionApprovalList(AppSettings.ExamInstID, AppSettings.CollegeID, $scope.ExamFormsCorrectionApprovalList.CourseID, $scope.ExamFormsCorrectionApprovalList.ExamID, $scope.User);
            ExamFormData.then(function (data, status, headers, config, error) {
                if (data.length == 0) {
                    alert("Data not found");
                    $scope.ExamFormsApprovalData = [];
                    $scope.AppDisable = false;
                    $scope.LoadImg = false;
                    return;
                } else {
                    $scope.ExamFormsApprovalData = data;
                    $scope.AppDisable = false;
                    $scope.LoadImg = false;
                    var totcnt = 0;
                    for (var i = 0; i < $scope.ExamFormsApprovalData.length; i++) {
                        totcnt = totcnt + 1;
                        $scope.ExamFormsApprovalData[i].srno = totcnt;
                    }
                    $scope.ExamFormsCorrectionApprovalList.TotalCondidateCount = totcnt;
                    $('#TotalCondidateCount').val(totcnt);
                }
            }, function (data, status, headers, config) {
                alert(error);
                $scope.AppDisable = false;
            });
        }
        $scope.FormsApproval = function () {
            if ($scope.ExamFormsApprovalData.length == 0) {
                alert("No data found");
                return;
            }
            var ExamForms = [];
            $scope.StudentCount = 0;
            for (var i = 0; i < $scope.ExamFormsApprovalData.length; i++) {
                if ($scope.ExamFormsApprovalData[i].CheckExmFrm == true) {
                    var obj = {};
                    $scope.StudentCount = $scope.StudentCount + 1;
                    obj.ExmFrmIDCorrection = $scope.ExamFormsApprovalData[i].ExmFrmIDCorrection;
                    obj.ExmFrmID = $scope.ExamFormsApprovalData[i].ExmFrmID;
                    obj.PreStudRegID = $scope.ExamFormsApprovalData[i].PreStudRegID;
                    ExamForms.push(obj);
                }
            }
            if (ExamForms.length == 0) {
                alert("No Rows Selected");
                return;
            }
            var ExamFormsdata = ExamFormsCorrectionService.PostCoorectionApprovalForms(ExamForms);
            ExamFormsdata.then(function (data) {
                alert("Updated Successfully");
                $scope.ExamFormsApprovalData = [];
                var tot = 0;
                $('#TotalCondidate').val(0);
                $('#TotalCondidateCount').val(0);
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetCheckStudent = function (obj) {
            var tot = 0;
            if (obj.CheckExmFrm == false) {
                if ($scope.headercheck == true) { $scope.headercheck = false; }
            }
            for (var i = 0; i < $scope.ExamFormsApprovalData.length; i++) {
                if ($scope.ExamFormsApprovalData[i].CheckExmFrm == true) {
                    tot = tot + 1;
                }
            }
            $('#TotalCondidate').val(tot);
            $scope.ExamFormsCorrectionApprovalList.TotalCondidate = tot;
            if ($scope.ExamFormsCorrectionApprovalList.TotalCondidate == $scope.ExamFormsCorrectionApprovalList.TotalCondidateCount) {
                $scope.headercheck = true;
            }
        }
        $scope.GetCheckStudentHeader = function (headercheck) {
            var tot = 0;
            $('#TotalCondidate').val(tot);
            $scope.ExamFormsCorrectionApprovalList.ExamFormsApprovalData = tot;
            for (var i = 0; i < $scope.ExamFormsApprovalData.length; i++) {
                if (headercheck == true) {
                    $scope.ExamFormsApprovalData[i].CheckExmFrm = true;
                    tot = tot + 1;
                }
                else {
                    $scope.ExamFormsApprovalData[i].CheckExmFrm = false;
                }
            }
            $('#TotalCondidate').val(tot);
            $scope.ExamFormsCorrectionApprovalList.TotalCondidate = tot;
        }
        $scope.GetEditApproval = function () {

        }
    });
});