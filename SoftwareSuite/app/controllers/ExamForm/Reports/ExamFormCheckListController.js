define(['app'], function (app) {
    app.controller("ExamFormCheckListController", function ($scope, $state, AppSettings, ExamFormsService, ExamFormsApprovalService,BasicCourseService, BasicExamService) {
        $scope.ExamFormCheckList = {};
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        $scope.ForBoardDisable = true;
        $scope.ExamFormCheckList.ApprovalType = "A";

        //if ($scope.ExamFormCheckList.ExmFrmType == undefined || $scope.ExamFormCheckList.ExmFrmType == "") {
        //    $scope.ExamFormCheckList.ExmFrmType = "R";
        //}

        if (AppSettings.CollegeID == 0) {
            $scope.ForBoardDisable = false;
            var DistrictList = ExamFormsApprovalService.GetDistrictListByStateID(1);
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function (error) {
                alert(error);
            });
        } else {
            $scope.ExamFormCheckList.CollegeID = AppSettings.CollegeID;
        }
        var CourseList = BasicCourseService.GetBasicCourseList();
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (Coursedata, status, headers, config) {
            alert(error);
            });
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
                var CollegeList = ExamFormsApprovalService.GetCollegeListByDistrictAndMandal($scope.ExamFormCheckList.DistrictID, MandalID);
                CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                    if (CollegeListdata.length == 0) {
                        $scope.CollegeList = [];
                        alert("There is no college in this mandal");
                        return;
                    } else {
                        $scope.CollegeList = CollegeListdata;
                        $scope.ExamFormCheckList.CollegeID = "";
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
                var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(CollegeID);
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

        //$scope.SetExMFrmType = function () {
        //    if ($scope.ExamFormCheckList.ExmFrmType == undefined || $scope.ExamFormCheckList.ExmFrmType == "") {
        //        $scope.ExamFormCheckList.ExmFrmType = "R";
        //    }
        //    else {
        //        $scope.ExamFormCheckList.ExmFrmType = "B";
        //    }
        //}

        $scope.Print = function () {
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormCheckList.CollegeID == undefined) || ($scope.ExamFormCheckList.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormCheckList.CourseID == undefined) || ($scope.ExamFormCheckList.CourseID == "")) {
                alert("Select stream");
                return;
            }
            if (($scope.ExamFormCheckList.ExamID == undefined) || ($scope.ExamFormCheckList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.ExamFormCheckList.BranchID == undefined) || ($scope.ExamFormCheckList.BranchID == "")) {
                $scope.ExamFormCheckList.BranchID = 0;
            }
            if (($scope.ExamFormCheckList.ExmFrmType == undefined) || ($scope.ExamFormCheckList.ExmFrmType == "")) {
                alert("Select Exam Form Type");
                return;
            }
            //if ($("#ApprovalFromDate").val() == "") {
            //    alert("Select From Date");
            //    return;
            //}
            //if ($("#ApprovalToDate").val() == "") {
            //    alert("Select To Date");
            //    return;
            //}
            //if ($("#ApprovalFromDate").val() != "") { $scope.ApprovalFromDate = $("#ApprovalFromDate").val(); }
            //if ($("#ApprovalToDate").val() != "") { $scope.ApprovalToDate = $("#ApprovalToDate").val(); }
            //if ($scope.ExamFormCheckList.ApprovalFromDate > $scope.ExamFormCheckList.ApprovalToDate) {
            //    alert("Select To Date must be greater than From Date");
            //    return;
            //}
            //var Urlstring = "api/ExamForms/GetExamFormCheckList/?AcdYrID=" + AppSettings.AcdYrID + "&CollegeID=" + $scope.ExamFormCheckList.CollegeID + "&CourseID=" + $scope.ExamFormCheckList.CourseID + "&ExamID=" + $scope.ExamFormCheckList.ExamID + "&BranchID=" + $scope.ExamFormCheckList.BranchID + "&" +
              //  "ApprovalType=" + $scope.ExamFormCheckList.ApprovalType + "&ApprovalFromDate=" + $scope.ExamFormCheckList.ApprovalFromDate + "&ApprovalToDate=" + $scope.ExamFormCheckList.ApprovalToDate + "";
            //var Urlstring = "api/ExamForms/GetExamFormCheckList/?ExamInstID=" + AppSettings.ExamInstID + "&CollegeID=" + $scope.ExamFormCheckList.CollegeID + "&CourseID=" + $scope.ExamFormCheckList.CourseID + "&ExamID=" + $scope.ExamFormCheckList.ExamID + "&BranchID=" + $scope.ExamFormCheckList.BranchID + "&ApprovalType=" + $scope.ExamFormCheckList.ApprovalType + "";
            var Urlstring = "api/ExamForms/GetExamFormCheckListRegBridge/?ExamInstID=" + AppSettings.ExamInstID + "&CollegeID=" + $scope.ExamFormCheckList.CollegeID + "&CourseID=" + $scope.ExamFormCheckList.CourseID + "&ExamID=" + $scope.ExamFormCheckList.ExamID + "&BranchID=" + $scope.ExamFormCheckList.BranchID + "&ApprovalType=" + $scope.ExamFormCheckList.ApprovalType + "&ExmFrmType=" + $scope.ExamFormCheckList.ExmFrmType + "";
            $.ajax({
                url: AppSettings.WebApiUrl + Urlstring,
                dataType: "json",
                type: "GET",
                processData: false,
                crossDomain: true,
                async: false,
                timeout: 5000,
                success: function (result) {
                    var data = [];
                    data.push(result);
                    var reportModel = $("#container").data('ejReportViewer');
                    var datasetName1 = "dsExamFormCheckList";
                    if (data[0].length == 0) {
                        reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                        reportModel._refreshReport();
                        alert("Data Not Found");
                        return;
                    }
                    reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                    reportModel._refreshReport();
                }
            });
        }
        $("#container").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptExamFormCheckList.rdlc",
                dataSources: [{ value: [], name: "dsExamFormCheckList" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});