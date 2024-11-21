define(['app'], function (app) {
    app.controller("ExamFormStudentCountController", function ($scope, $state, AppSettings, ExamFormsService, ExamFormsApprovalService, BasicCourseService, BasicExamService) {
        $scope.ExamFormStudentCount = {};
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        $scope.ForBoardDisable = true;
        $scope.ExamFormStudentCount.ApprovalType = "A";

        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptExamFormStudentCount.rdlc",
                dataSources: [{ value: [], name: "dsExamFormStudentCount" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });

        if (AppSettings.CollegeID == 0) {
            $scope.ForBoardDisable = false;
            var DistrictList = ExamFormsApprovalService.GetDistrictListByStateID(1);
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function (error) {
                alert(error);
            });
        } else {
            $scope.ExamFormStudentCount.CollegeID = AppSettings.CollegeID;
        }
        //$("#ApprovalFromDate").ejDatePicker({ dateFormat: "dd/MMM/yyyy" });
        //$("#ApprovalToDate").ejDatePicker({ dateFormat: "dd/MMM/yyyy" });
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
                var CollegeList = ExamFormsApprovalService.GetCollegeListByDistrictAndMandal($scope.ExamFormStudentCount.DistrictID, MandalID);
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
                var CourseList = ExamFormsApprovalService.GetCourseListForRegStud($scope.ExamFormStudentCount.CollegeID);
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
        $scope.Print = function () {
            if (AppSettings.CollegeID == 0) {
                if (($scope.ExamFormStudentCount.CollegeID == undefined) || ($scope.ExamFormStudentCount.CollegeID == "")) {
                    alert("Select College");
                    return false;
                }
            }
            if (($scope.ExamFormStudentCount.CourseID == undefined) || ($scope.ExamFormStudentCount.CourseID == "")) {
                alert("Select stream");
                return;
            }
            if (($scope.ExamFormStudentCount.ExamID == undefined) || ($scope.ExamFormStudentCount.ExamID == "")) {
                alert("Select Exam");
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
            //if ($scope.ExamFormStudentCount.ApprovalFromDate > $scope.ExamFormStudentCount.ApprovalToDate) {
            //    alert("Select To Date must be greater than From Date");
            //    return;
            //}
            //var Urlstring = "api/ExamForms/GetExamFormStudentCount/?AcdYrID=" + AppSettings.AcdYrID + "&CollegeID=" + $scope.ExamFormStudentCount.CollegeID + "&CourseID=" + $scope.ExamFormStudentCount.CourseID + "&ExamID=" + $scope.ExamFormStudentCount.ExamID + "&BranchID=" + $scope.ExamFormStudentCount.BranchID + "&" +
            //  "ApprovalType=" + $scope.ExamFormStudentCount.ApprovalType + "&ApprovalFromDate=" + $scope.ExamFormStudentCount.ApprovalFromDate + "&ApprovalToDate=" + $scope.ExamFormStudentCount.ApprovalToDate + "";
            var Urlstring = "api/ExamForms/GetExamFormStudentCount/?ExamInstID=" + AppSettings.ExamInstID + "&CollegeID=" + $scope.ExamFormStudentCount.CollegeID + "&CourseID=" + $scope.ExamFormStudentCount.CourseID + "&ExamID=" + $scope.ExamFormStudentCount.ExamID + "&BranchID=" + $scope.ExamFormStudentCount.BranchID + "&ApprovalType=" + $scope.ExamFormStudentCount.ApprovalType + "";
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
                    var reportModel = $("#reportviewer").data('ejReportViewer');
                    var datasetName1 = "dsExamFormStudentCount";
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

    });
});